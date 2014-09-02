// start of file

	function loadPage_testdrive(){
		// debug("LOADING PAGE >> loadPage_testdrive");

		update_NavPanels();

		var content = "<div class='pagecontent'><h1>Test Drive</h1>" +
			"<textarea id='tdtextarea' onkeyup='_UI.testdrive.sampletext=this.value; redraw_TestDrive()'>"+_UI.testdrive.sampletext+"</textarea><br>" +
			"<canvas id='tdcanvas'></canvas><br>" +
			"<div id='genimg' style='display:none;'></div></div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		document.getElementById("tdtextarea").focus();

		_UI.testdrive.canvas = document.getElementById("tdcanvas");
		_UI.testdrive.canvas.width = 800;
		_UI.testdrive.canvas.height = 700;
		_UI.testdrive.ctx = _UI.testdrive.canvas.getContext("2d");

		redraw_TestDrive();
	}

	function makePanel_TestDriveAttributes(){
		if(_UI.navprimaryhere != "npAttributes") return;

		var content = "<h1 class='paneltitle'>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>";

		return content;
	}

	function redraw_TestDrive(){
		//debug("redraw_TestDrive");
		var td = _UI.testdrive;
		var ps = _GP.projectsettings;

		if(_UI.navprimaryhere == "npAttributes") changefontscale(td.fontsize);
		document.getElementById("tdtextarea").value = td.sampletext;

		var contentArray = td.sampletext.split("");
		var tctx = td.ctx;
		var scale = td.fontscale;
		var pad = td.padsize;
		var textEm = (ps.upm*scale);
		var pagepadding = 10;
		var currx = pagepadding;
		var curry = pagepadding + (ps.ascent*scale);
		var cc;

		tctx.clearRect(0,0,5000,5000);
		if(td.showhorizontals) drawLine(curry);

		//debug("\t contentarray.length: " + contentArray.length);

		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				// reset X val
				currx = pagepadding;

				// calc Y val
				curry += (textEm);
				curry += ((td.linegap*1)*scale);

				// draw baseline
				if(td.showhorizontals) drawLine(curry);
			} else {
				cc = getChar(charToHex(contentArray[k]));
				if(cc){
					if(td.showcharbox){
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

					currx += cc.drawCharToArea(tctx, {"dz" : td.fontscale, "dx" : currx, "dy" : curry});
					currx += (td.padsize*1*scale);
					//debug("\t done drawing " + cc.charname);
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
		content += "<br><h3>character sets</h3>";
		content += makeTDButton("abcdefghijklmnopqrstuvwxyz");
		content += makeTDButton("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		content += makeTDButton("0123456789");
		content += makeTDSymbolButton();

		return content;
	}

	function makeTDButton(text){
		return "<button onclick='_UI.testdrive.sampletext=\""+text+"\";redraw_TestDrive();'>"+text+"</button><br>";
	}

	function makeTDSymbolButton(){
		return "<button onclick='document.getElementById(\"tdtextarea\").value=\"!\\\"#$%&&#39;()*+,-./:;\\\<=\\\>?@[\\\\]^_`{|}~\";redraw_TestDrive();'>!\"#$%&&#39;()*+,-./:;\<=\>?@[\\]^_`{|}~</button><br>";
	}

	function drawTDOptions(){
		if(!_UI.testdrive.linegap) _UI.testdrive.linegap = _GP.projectsettings.linegap;
		if(!_UI.testdrive.padsize) _UI.testdrive.padsize = _GP.projectsettings.defaultlsb;

		var content = "<table class='detail'>";
		content += "<tr><td> font size <span class='unit'>(px)</span> </td><td><input class='input' type='text' value='"+_UI.testdrive.fontsize+"' onchange='changefontscale(this.value); redraw_TestDrive();'>"+spinner()+"</td></tr>";
		content += "<tr><td> 96dpi font size <span class='unit'>(pt)</span> </td><td id='roughptsize'>75</td></tr>";
		content += "<tr><td> line gap <span class='unit'>(em units)</span> </td><td><input class='input' type='text' value='"+_UI.testdrive.linegap+"' onchange='_UI.testdrive.linegap=this.value*1; redraw_TestDrive();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing <span class='unit'>(em units)</span> </td><td><input class='input' type='text' value='"+_UI.testdrive.padsize+"' onchange='_UI.testdrive.padsize=this.value*1; redraw_TestDrive();'>"+spinner()+"</td></tr>";
		content += "<tr><td> <label for='showcharbox'>show character boxes</label> </td><td>" + checkUI("_UI.testdrive.showcharbox",true) + "</td></tr>";
		content += "<tr><td> <label for='showhorizontals'>show baseline</label> </td><td>" + checkUI("_UI.testdrive.showhorizontals",true) + "</td></tr>";

		content += "<tr><td colspan=2><button onclick='createimg();'>generate png file</button></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		_UI.testdrive.fontsize = newval*1;
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

// end of file