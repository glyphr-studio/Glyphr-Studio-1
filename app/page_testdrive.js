
	function loadPage_testdrive(){
		debug("LOADING PAGE >> loadPage_testdrive");
		
		update_NavPanels();
		
		var content = "<div class='pagecontent'><h1>Test Drive</h1>" + 
			"<textarea id='tdtextarea' onkeyup='updateTestdriveCanvas()'></textarea><br>" + 
			"<canvas id='tdcanvas'></canvas><br>" + 
			"<div id='genimg' style='display:none;'></div></div>";

		document.getElementById("mainwrapper").innerHTML = content;
		document.getElementById("tdtextarea").focus();
		
		_UI.testdrivecanvas = document.getElementById("tdcanvas");
		_UI.testdrivecanvas.width = 800;
		_UI.testdrivecanvas.height = 700;	
		_UI.testdrivectx = _UI.testdrivecanvas.getContext("2d");
		
		if(_UI.navprimaryhere == "npAttributes") changefontscale(100);
	}

	function makePanel_TestDriveOptions(){
		if(_UI.navprimaryhere != "npAttributes") return;
		
		var content = "<h1>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>";
			
		return content;
	}

	function updateTestdriveCanvas(){
		var text = document.getElementById("tdtextarea").value;
		var tctx = _UI.testdrivectx;
		var ps = _GP.projectsettings;
		var scale = _UI.testdrive_fontscale;
		var contentArray = text.split("");
		var textEm = (_GP.projectsettings.upm*scale);
		var currx = _UI.testdrive_padsize;
		var curry = _UI.testdrive_padsize + (ps.ascent*scale);
		var cc;

		tctx.clearRect(0,0,5000,5000);
		if(_UI.testdrive_showhorizontals) drawLine(curry);
		
		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				// reset X val
				currx = _UI.testdrive_padsize;
				
				// calc Y val
				curry += (textEm);
				curry += ((document.getElementById("linegap").value*1)*scale);
				
				// draw baseline
				if(_UI.testdrive_showhorizontals) drawLine(curry);
			} else {
				cc = getCharFromText(contentArray[k]);
				if(cc){
					if(_UI.testdrive_showcharbox){
						tctx.fillStyle = "transparent";
						tctx.strokeStyle = _UI.colors.accent;
						tctx.lineWidth = 1;
						
						tctx.strokeRect(
							currx.makeCrisp(), 
							(curry.makeCrisp()-(ps.ascent*scale)), 
							round(cc.charwidth*scale), 
							round(textEm)
						);
					}

					currx += cc.drawCharToArea(tctx, {"dz" : _UI.testdrive_fontscale, "dx" : currx, "dy" : curry});
					currx += (document.getElementById("charspacing").value*1*scale);
				}					
			}
		}
	}

	function drawLine(y){
		//debug("TESTDRIVE - Drawing h line at " + y);
		y = y.makeCrisp();
		_UI.testdrivectx.strokeStyle = _UI.colors.accent;
		_UI.testdrivectx.beginPath();
		_UI.testdrivectx.lineWidth = 1;	
		_UI.testdrivectx.moveTo(0,y);
		_UI.testdrivectx.lineTo(_UI.testdrivecanvas.width,y);
		_UI.testdrivectx.stroke();
		_UI.testdrivectx.closePath();
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
		content += "<tr><td> line gap <span class='unit'>(em units)</span> </td><td><input class='input' id='linegap' type='text' value='"+_GP.projectsettings.linegap+"' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing <span class='unit'>(em units)</span> </td><td><input class='input' id='charspacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> show character boxes </td><td><input type='checkbox'" + (_UI.testdrive_showcharbox? " checked " : "") + " onchange='_UI.testdrive_showcharbox = this.checked; updateTestdriveCanvas();'></td></tr>";
		content += "<tr><td> show baseline </td><td><input type='checkbox'" + (_UI.testdrive_showhorizontals? " checked " : "") + " onchange='_UI.testdrive_showhorizontals = this.checked; updateTestdriveCanvas();'></td></tr>";
		
		content += "<tr><td colspan=2><input type='button' class='button' value='generate png file' onclick='createimg();'></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		_UI.testdrive_fontscale = (newval/_GP.projectsettings.upm);
		document.getElementById("roughptsize").innerHTML = (newval*0.75);
	}

	function createimg(){
		var imgd = document.getElementById('tdcanvas').toDataURL();

		var win = window.open(document.location.href, "Glyphr Test Drive"); 
		
		win.document.write('<!DOCTYPE html><html>'+
		'<head><title>Glyphr - Test Drive Image</title></head>'+
		'<body style="padding:40px; text-align:center;">'+
		'<img src="' + imgd + '" title="Glyphr Test Drive" style="border:1px solid #f6f6f6;">'+
		'</html>');
	}
