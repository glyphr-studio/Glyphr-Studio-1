
	function updatetestdrive(){

		var content = "<div class='pagecontent'><h1>Test Drive</h1>" + 
			"<textarea id='tdtextarea' onkeyup='updateTestdriveCanvas()'></textarea><br>" + 
			"<canvas id='tdcanvas'></canvas><br>" + 
			"<div id='genimg' style='display:none;'></div></div>";

		document.getElementById("mainpane").innerHTML = content;
		document.getElementById("tdtextarea").focus();
		
		uistate.testdrivecanvas = document.getElementById("tdcanvas");
		uistate.testdrivecanvas.width = 800;
		uistate.testdrivecanvas.height = 700;	
		uistate.testdrivectx = uistate.testdrivecanvas.getContext("2d");
		
		if(uistate.navprimaryhere == "npAttributes") changefontscale(100);
	}

	function updatetestdriveoptions(){
		if(uistate.navprimaryhere != "npAttributes") return;
		
		var content = "<h1>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>"
			
		return content;
	}

	function updateTestdriveCanvas(){
		var text = document.getElementById("tdtextarea").value;
		var tctx = uistate.testdrivectx;
		var ps = _G.projectsettings;
		var scale = uistate.testdrive_fontscale;
		var contentArray = text.split("");
		var textEm = (_G.projectsettings.upm*scale);
		var currx = uistate.testdrive_padsize;
		var curry = uistate.testdrive_padsize + (ps.ascent*scale);
		
		tctx.clearRect(0,0,5000,5000);
		uistate.testdrive_showhorizontals? drawLine(curry) : false;
		
		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				// reset X val
				currx = uistate.testdrive_padsize;
				
				// calc Y val
				curry += (textEm);
				curry += ((document.getElementById("linegap").value*1)*scale);
				
				// draw baseline
				uistate.testdrive_showhorizontals? drawLine(curry) : false;
			} else {
				if(uistate.testdrive_showcharbox){
					tctx.fillStyle = "transparent";
					tctx.strokeStyle = uistate.colors.accent;
					tctx.lineWidth = 1;
					
					tctx.strokeRect(
						currx.makeCrisp(), 
						(curry.makeCrisp()-(ps.ascent*scale)), 
						Math.round(_G.fontchars[charToUnicode[contentArray[k]]].charwidth*scale), 
						Math.round(textEm)
					);
				}

				currx += drawCharToArea(tctx, charToUnicode[contentArray[k]], uistate.testdrive_fontscale, currx, curry);
				currx += (document.getElementById("charspacing").value*1*scale);
					
			}
		}
	}

	function drawLine(y){
		//debug("TESTDRIVE - Drawing h line at " + y);
		y = y.makeCrisp();
		uistate.testdrivectx.strokeStyle = uistate.colors.accent;
		uistate.testdrivectx.beginPath();
		uistate.testdrivectx.lineWidth = 1;	
		uistate.testdrivectx.moveTo(0,y);
		uistate.testdrivectx.lineTo(uistate.testdrivecanvas.width,y);
		uistate.testdrivectx.stroke();
		uistate.testdrivectx.closePath();
	}

	function drawCharToArea(lctx, charcode, size, offsetX, offsetY){
		var ps = _G.projectsettings;
		var tc = _G.fontchars[charcode];
		var sl = tc.charshapes;
		var width = 0;
		debug("DRAWCHARTOAREA - starting " + charcode + " \t offsetx: " + offsetX + " \t offsety: " + offsetY + " \t size (zoom): " +size);
		
		if(isNaN(charcode)){
			//assumes one shape per ss
			sl = [_G.linkedshapes[charcode].shape];
		} else {
			width = (tc.charwidth*size);
			if(tc.isautowide){ 
				debug("---------------- for " + tc.charname + " isautowide=false, adding left side bearing width " + ps.defaultlsb + " to width " + width);
				width += ps.defaultlsb; 
			}
		}
		
		var sh = {};
		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			debug("---------------- starting shape " + sh.name);
			sh.drawShapeToArea_Stack(lctx, size, offsetX, offsetY);
		}
		lctx.fillStyle = _G.projectsettings.color_glyphfill;
		lctx.closePath();
		lctx.fill("nonzero");

		debug("---------------- done with " + charcode + "\n");
		
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
		content += "<tr><td> font size <span class='unit'>(px)</span> </td><td><input class='input' type='text' value='100' onchange='changefontscale(this.value); updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> 96dpi font size <span class='unit'>(pt)</span> </td><td id='roughptsize'>75</td></tr>";
		content += "<tr><td> line gap <span class='unit'>(em units)</span> </td><td><input class='input' id='linegap' type='text' value='"+_G.projectsettings.linegap+"' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing <span class='unit'>(em units)</span> </td><td><input class='input' id='charspacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> show character boxes </td><td><input type='checkbox' onchange='uistate.testdrive_showcharbox = this.checked; updateTestdriveCanvas();'></td></tr>";
		content += "<tr><td> show baseline </td><td><input type='checkbox' onchange='uistate.testdrive_showhorizontals = this.checked; updateTestdriveCanvas();'></td></tr>";
		
		content += "<tr><td colspan=2><input type='button' class='button' value='generate png file' onclick='createimg();'></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		uistate.testdrive_fontscale = (newval/_G.projectsettings.upm);
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
