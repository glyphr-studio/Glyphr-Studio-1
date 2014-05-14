
	function loadPage_testdrive(){
		debug("LOADING PAGE >> loadPage_testdrive");

		update_NavPanels();

		var content = "<div class='pagecontent'><h1>Test Drive</h1>" +
			"<textarea id='tdtextarea' onkeyup='updateTestdriveCanvas()'></textarea><br>" +
			"<canvas id='tdcanvas'></canvas><br>" +
			"<div id='genimg' style='display:none;'></div></div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		document.getElementById("tdtextarea").focus();

		_UI.testdrive.canvas = document.getElementById("tdcanvas");
		_UI.testdrive.canvas.width = 800;
		_UI.testdrive.canvas.height = 700;
		_UI.testdrive.ctx = _UI.testdrive.canvas.getContext("2d");

		if(_UI.navprimaryhere == "npAttributes") changefontscale(100);
	}

	function makePanel_TestDriveOptions(){
		if(_UI.navprimaryhere != "npAttributes") return;

		var content = "<h1 class='paneltitle'>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>";

		return content;
	}

	function updateTestdriveCanvas(){
		var text = document.getElementById("tdtextarea").value;
		var tctx = _UI.testdrive.ctx;
		var ps = _GP.projectsettings;
		var scale = _UI.testdrive.fontscale;
		var contentArray = text.split("");
		var textEm = (_GP.projectsettings.upm*scale);
		var currx = _UI.testdrive.padsize;
		var curry = _UI.testdrive.padsize + (ps.ascent*scale);
		var cc;

		tctx.clearRect(0,0,5000,5000);
		if(_UI.testdrive.showhorizontals) drawLine(curry);

		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				// reset X val
				currx = _UI.testdrive.padsize;

				// calc Y val
				curry += (textEm);
				curry += ((document.getElementById("linegap").value*1)*scale);

				// draw baseline
				if(_UI.testdrive.showhorizontals) drawLine(curry);
			} else {
				cc = getChar(charToHex(contentArray[k]));
				if(cc){
					if(_UI.testdrive.showcharbox){
						tctx.fillStyle = "transparent";
						tctx.strokeStyle = _UI.colors.accent;
						tctx.lineWidth = 1;

						tctx.strokeRect(
							currx.makeCrisp(),
							(curry.makeCrisp()-(ps.ascent*scale)),
							round(cc.advancewidth*scale),
							round(textEm)
						);
					}

					currx += cc.drawCharToArea(tctx, {"dz" : _UI.testdrive.fontscale, "dx" : currx, "dy" : curry});
					currx += (document.getElementById("charspacing").value*1*scale);
				}
			}
		}
	}

	function drawLine(y){
		//debug("TESTDRIVE - Drawing h line at " + y);
		y = y.makeCrisp();
		_UI.testdrive.ctx.strokeStyle = _UI.colors.accent;
		_UI.testdrive.ctx.beginPath();
		_UI.testdrive.ctx.lineWidth = 1;
		_UI.testdrive.ctx.moveTo(0,y);
		_UI.testdrive.ctx.lineTo(_UI.testdrive.canvas.width,y);
		_UI.testdrive.ctx.stroke();
		_UI.testdrive.ctx.closePath();
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
		return "<button onclick='document.getElementById(\"tdtextarea\").value=\""+text+"\";updateTestdriveCanvas();'>"+text+"</button><br>";
	}

	function makeTDSymbolButton(){
		return "<button onclick='document.getElementById(\"tdtextarea\").value=\"!\\\"#$%&&#39;()*+,-./:;\\\<=\\\>?@[\\\\]^_`{|}~\";updateTestdriveCanvas();'>!\"#$%&&#39;()*+,-./:;\<=\>?@[\\]^_`{|}~</button><br>";
	}

	function drawTDOptions(){
		var content = "<table class='detail'>";
		content += "<tr><td> font size <span class='unit'>(px)</span> </td><td><input class='input' type='text' value='100' onchange='changefontscale(this.value); updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> 96dpi font size <span class='unit'>(pt)</span> </td><td id='roughptsize'>75</td></tr>";
		content += "<tr><td> line gap <span class='unit'>(em units)</span> </td><td><input class='input' id='linegap' type='text' value='"+_GP.projectsettings.linegap+"' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing <span class='unit'>(em units)</span> </td><td><input class='input' id='charspacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> show character boxes </td><td><input type='checkbox'" + (_UI.testdrive.showcharbox? " checked " : "") + " onchange='_UI.testdrive.showcharbox = this.checked; updateTestdriveCanvas();'></td></tr>";
		content += "<tr><td> show baseline </td><td><input type='checkbox'" + (_UI.testdrive.showhorizontals? " checked " : "") + " onchange='_UI.testdrive.showhorizontals = this.checked; updateTestdriveCanvas();'></td></tr>";

		content += "<tr><td colspan=2><button onclick='createimg();'>generate png file</button></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		_UI.testdrive.fontscale = (newval/_GP.projectsettings.upm);
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
