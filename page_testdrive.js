
	function updatetestdrive(){

		var content = "<div class='pagecontent'><h1>Test Drive</h1>" + 
			"<textarea id='tdtextarea' onkeyup='updateTestdriveCanvas()'></textarea><br>" + 
			"<canvas id='tdcanvas'></canvas><br>" + 
			"<div id='genimg' style='display:none;'></div></div>";

		document.getElementById("mainpane").innerHTML = content;
		document.getElementById("tdtextarea").focus();
		
		tdc = document.getElementById("tdcanvas");
		tdc.width = 800;
		tdc.height = 700;	
		tdctx = tdc.getContext("2d");
		
		if(uistate.navprimaryhere == "npAttributes") changefontscale(100);
	}

	function updatetestdriveoptions(){
		if(uistate.navprimaryhere != "npAttributes") return;
		
		var content = "<h1>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>"
			
		return content;
	}

	var tdFontScale = 0;
	var showcharbox = false;
	var showhorizontals = false;
	var padsize = 10;

	function updateTestdriveCanvas(){
		var text = document.getElementById("tdtextarea").value;
		tdctx.clearRect(0,0,5000,5000);
		var contentArray = text.split("");
		var textEm = (GlyphrProject.settings.upm*tdFontScale);
		var currx = padsize;
		var curry = padsize + textEm;
		
		showhorizontals? drawLine(padsize+textEm) : false;
		
		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				currx = padsize;
				curry += ((textEm+(textEm*GlyphrProject.settings.descender)));
				curry += (document.getElementById("linespacing").value*1);
				showhorizontals? drawLine(curry) : false;
			} else {
				currx += drawCharToArea(tdctx, charToUnicode[contentArray[k]], tdFontScale, currx, curry);
				currx += (document.getElementById("charspacing").value*1);
				
			}
		}
	}

	function drawLine(y){
		//debug("TESTDRIVE - Drawing h line at " + y);
		y = y.makeCrisp();
		tdctx.strokeStyle = color_accent;
		tdctx.beginPath();
		tdctx.lineWidth = 1;	
		tdctx.moveTo(0,y);
		tdctx.lineTo(tdc.width,y);
		tdctx.stroke();
		tdctx.closePath();
	}

	function drawCharToArea(lctx, charcode, size, offsetX, offsetY){
		var fs = GlyphrProject.settings;
		var tc = GlyphrProject.fontchars[charcode];
		var shapelayers = tc.charglyphdata;
		var width = 0;
		debug("DRAWCHARTOAREA - starting " + charcode);
		
		if(isNaN(charcode)){
			//assumes one shape per ss
			shapelayers = [GlyphrProject.seedshapes[charcode].shape];
		} else {
			width = (tc.charwidth*tdFontScale);
			if(tc.isautowide){ 
				debug("---------------- for " + tc.charname + " isautowide=false, adding kern width " + (fs.upm*fs.kerning*tdFontScale) + " to width " + width);
				width += (fs.upm*fs.kerning*tdFontScale); 
			}
		}
		
		if(showcharbox){
			lctx.fillStyle = "transparent";
			lctx.strokeStyle = color_accent;
			lctx.lineWidth = 1;
			var trailspace = 0;
			if(tc.isautowide) trailspace = GlyphrProject.settings.upm*GlyphrProject.settings.kerning*tdFontScale;
			
			lctx.strokeRect(offsetX.makeCrisp(), (offsetY.makeCrisp()-(fs.upm*tdFontScale)), Math.round((tc.charwidth*tdFontScale)+trailspace), Math.round((fs.upm*tdFontScale) + (fs.descender*fs.upm*tdFontScale)));
		}	
		
		var sh = {};
		for(var j=0; j<shapelayers.length; j++) {
			sh = shapelayers[j];
			debug("---------------- starting shape " + sh.name);
			sh.drawShapeToArea(lctx, size, offsetX, offsetY);
		}
		
		debug("---------------- done with " + charcode);
		
		return width;
	}

	function drawSampletextButtons(){
		var content = "<h3>pangrams</h3>";
		content += makeTDButton("the five boxing wizards jump quickly");    
		content += makeTDButton("pack my box with five dozen liquor jugs");
		content += makeTDButton("the quick brown fox jumps over a lazy dog");
		content += makeTDButton("amazingly few discotheques provide jukeboxes");
		content += makeTDButton("quick enemy movement will jeopardize six of the gunboats");
		content += "<h3>character sets</h3>";
		content += makeTDButton("abcdefghijklmnopqrstuvwxyz");
		content += makeTDButton("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		content += makeTDButton("0123456789");
		content += makeTDSymbolButton();
		
		return content;
	}

	function makeTDButton(text){
		return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\""+text+"\";updateTestdriveCanvas();' value='"+text+"'><br>";
	}

	function makeTDSymbolButton(){
		//return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\"!&quot;#$%&&#39;()*+,-./:;&lt;=&gt;?@[\]^_`{|}~\";updateTestdriveCanvas();' value='!&quot;#$%&&#39;()*+,-./:;&lt;=&gt;?@[\]^_`{|}~'><br>";
		return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\"!\\\"#$%&&#39;()*+,-./:;\\\<=\\\>?@[\\\\]^_`{|}~\";updateTestdriveCanvas();' value='!\"#$%&&#39;()*+,-./:;\<=\>?@[\\]^_`{|}~'><br>";
	}

	function drawTDOptions(){
		var content = "<table class='detail'>";
		content += "<tr><td> font size (px): </td><td><input class='input' type='text' value='100' onchange='changefontscale(this.value); updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> 96dpi font size (pt): </td><td id='roughptsize'>75</td></tr>";
		content += "<tr><td> line spacing (px): </td><td><input class='input' id='linespacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing (px): </td><td><input class='input' id='charspacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> show character boxes: </td><td><input type='checkbox' onchange='showcharbox = this.checked; updateTestdriveCanvas();'></td></tr>";
		content += "<tr><td> show baseline: </td><td><input type='checkbox' onchange='showhorizontals = this.checked; updateTestdriveCanvas();'></td></tr>";
		
		content += "<tr><td colspan=2><input type='button' class='button' value='generate png file' onclick='createimg();'></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		tdFontScale = (newval/GlyphrProject.settings.upm);
		document.getElementById("roughptsize").innerHTML = (newval*.75);
	}

	function createimg(){
		var imgd = document.getElementById('tdcanvas').toDataURL();

		var win = window.open(document.location.href, "Glyphr Test Drive"); 
		
		win.document.write('<!DOCTYPE html><html>'+
		'<head><title>Glyphr - Test Drive Image</title></head>'+
		'<body style="padding:40px; text-align:center;">'+
		'<img src="' + imgd + '" title="Glyphr Test Drive" style="border:1px solid #f6f6f6;">'+
		'</html>');

	/*
		var cpng = new Image();Canvas2Image.saveAsPNG(document.getElementById("tdcanvas"), true);
		document.getElementById("genimg").innerHTML = "";
		document.getElementById("genimg").appendChild(cpng);
		openDialog(document.getElementById("genimg").innerHTML);	
	*/
	}
