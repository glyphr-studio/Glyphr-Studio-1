// start of file
/**
	Page > Test Drive
	HTML and associated functions for this page.
**/


	/*
		loadPage_testdrive
		This function is called by the overall Navigate function, and populates
		page-level HTML.
	*/
	function loadPage_testdrive(){
		// debug("LOADING PAGE >> loadPage_testdrive");

		update_NavPanels();

		var content = '<h1 class="pagetitle">Test Drive</h1><div class="pagecontent">' +
			'<textarea id="tdtextarea" onkeyup="_UI.testdrive.sampletext=this.value; redraw_TestDrive()">'+_UI.testdrive.sampletext+'</textarea><br>' +
			'<canvas id="tdcanvas"></canvas><br>' +
			'<div id="genimg" style="display:none;"></div>'+
			'<canvas id="glypheditcanvas" style="display:none;"></canvas>'+
			'</div>';

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		document.getElementById("tdtextarea").focus();

		var td = _UI.testdrive;
		td.canvas = document.getElementById('tdcanvas');
		td.canvas.width = 800;
		td.canvas.height = 700;
		td.ctx = td.canvas.getContext('2d');

		td.glyphseq = new GlyphSequence({
			glyphstring: td.sampletext,
			linegap: td.linegap,
			maxes: {
				xmin: 10,
				xmax: 790,
				ymin: 10 + (_GP.projectsettings.ascent * td.fontscale),
				ymax: false
			},
			scale: td.fontscale,
			drawPageExtras: drawTestDrivePageExtras,
			drawLineExtras: drawTestDriveLineExtras,
			drawGlyphExtras: drawTestDriveGlyphExtras,
			drawGlyph: drawTestDriveGlyph,
		});

		td.cache = {};

		redraw_TestDrive();
	}

	/*
		makePanel_TestDriveAttributes
		This function is called by the overall Redraw function, and it loads content to
		the left panel - usually options for the Edit Canvas.
	*/
	function makePanel_TestDriveAttributes(){
		if(_UI.current_panel !== 'npAttributes') return;

		var content = '<div class="navarea_header">';
		content += '<h1 class="panelsupertitle">TEST DRIVE</h1>';
		content += '<h1 class="paneltitle">controls</h1>';

		content += '</div><div class="panel_section">';
		content += '<h2>options</h2><div>' + drawTDOptions() + '</div>';
		content += '</div><div class="panel_section">';
		content += '<h2>sample text</h2><div>' + drawSampletextButtons() + '</div>';
		content += '</td></tr></table></div>';

		return content;
	}


	/*
		readraw_TestDrive
		This function is called by the overall Redraw to update the canvas, or whatever
		content is in the main Content Area
	*/
	function redraw_TestDrive(){
		// debug("\n redraw_TestDrive - START");
		_UI.redrawing = true;

		var td = _UI.testdrive;
		var ps = _GP.projectsettings;

		if(_UI.current_panel === 'npAttributes') changefontscale(td.fontsize);
		document.getElementById('tdtextarea').value = td.sampletext;

		td.glyphseq.setString(td.sampletext);
		var scale = td.fontscale;

		td.ctx.clearRect(0,0,5000,5000);
		td.glyphseq.draw();

		_UI.redrawing = false;
	}

	function drawTestDrivePageExtras(maxes, scale) {
		// debug('\n drawTestDrivePageExtras - START');
		var tdc = _UI.testdrive.canvas;

		// var top = (maxes.ymin - (_GP.projectsettings.ascent * scale)) || 0;
		var top = maxes.ymin || 0;
		var bottom = (maxes.ymax === Infinity)? tdc.height : (maxes.ymax || tdc.height);
		var left = maxes.xmin || 0;
		var right = (maxes.xmax === Infinity)? tdc.width : (maxes.xmax || tdc.width);
		var width = right - left;
		var height = bottom - top;
		var ctx = _UI.testdrive.ctx;

		// debug(`\t new t/b/l/r: ${top} / ${bottom} / ${left} / ${right}`);

		if(_UI.testdrive.showpageextras){
			ctx.fillStyle = 'transparent';
			ctx.strokeStyle = _UI.colors.green.l85;
			ctx.lineWidth = 1;

			ctx.strokeRect(
				left.makeCrisp(),
				top.makeCrisp(),
				round(width),
				round(height)
			);
		}

		// debug(' drawTestDrivePageExtras - END\n');
	}

	function drawTestDriveLineExtras(chardata) {
		// debug('\n drawTestDriveLineExtras - START');
		// debug('\t at ' + (chardata.view.dy * chardata.view.dz));
		if(_UI.testdrive.showlineextras){
			drawHorizontalLine(chardata.view.dy*chardata.view.dz, _UI.testdrive.ctx, _UI.colors.green.l85);
		}
		// debug(' drawTestDriveLineExtras - END\n');
	}

	function drawTestDriveGlyphExtras(chardata) {
		// debug('\n drawTestDriveGlyphExtras - START');
		if(_UI.testdrive.showglyphextras){
			var ctx = _UI.testdrive.ctx;
			var drawwidth = chardata.width * chardata.view.dz;
			var drawheight = _GP.projectsettings.upm * chardata.view.dz;
			var drawy = (chardata.view.dy - _GP.projectsettings.ascent) * chardata.view.dz;
			var drawx = chardata.view.dx * chardata.view.dz
			var drawk = chardata.kern * chardata.view.dz * -1;

			// debug(`\t drawing ${chardata.char}`);
			// debug(`\t scaled view \t ${json(scaledview, true)}`);

			if(chardata.kern){
				ctx.fillStyle = 'orange';
				ctx.globalAlpha = 0.3;
				ctx.fillRect(
					drawx + drawwidth - drawk,
					drawy,
					drawk,
					drawheight
				);
				ctx.globalAlpha = 1;
			}

			ctx.fillStyle = 'transparent';
			ctx.strokeStyle = _UI.colors.blue.l85;
			ctx.lineWidth = 1;

			ctx.strokeRect(
				drawx.makeCrisp(),
				drawy.makeCrisp(),
				round(drawwidth),
				round(drawheight)
			);

		}

		// debug(' drawTestDriveGlyphExtras - END\n');
	}

	function drawTestDriveGlyph(chardata) {
		// debug('\n drawTestDriveGlyph - START');

		var td = _UI.testdrive;
		var glyph = chardata.glyph;
		var showlineextras = td.showlineextras || false;
		var flattenglyphs = td.flattenglyphs || false;
		var ctx = _UI.testdrive.ctx;
		var view = clone(chardata.view, 'drawTestDriveGlyph');
		view.dx *= view.dz;
		view.dy *= view.dz;
		
		// debug(`\t drawing ${chardata.char}`);
		// debug(`\t view \t ${json(view, true)}`);

		setTimeout(function(){
			if(glyph){
				if(flattenglyphs){
						if(!_UI.testdrive.cache.hasOwnProperty(chardata.char)){
							_UI.testdrive.cache[chardata.char] = (new Glyph(clone(glyph, 'drawTestDriveGlyph'))).combineAllShapes(true);
						}

						_UI.testdrive.cache[chardata.char].drawGlyph(ctx, view, 1, true);

				} else {
					glyph.drawGlyph(ctx, view, 1, true);
				}
			}
		}, 10);

		// debug(' drawTestDriveGlyph - END\n');
	}

	function drawSampletextButtons(){
		var content = '<h3>pangrams</h3>';
		content += makeTDButton('the five boxing wizards jump quickly');
		content += makeTDButton('pack my box with five dozen liquor jugs');
		content += makeTDButton('the quick brown fox jumps over a lazy dog');
		content += makeTDButton('amazingly few discotheques provide jukeboxes');
		content += makeTDButton('quick enemy movement will<br>jeopardize six of the gunboats');
		content += '<br><h3>glyph sets</h3>';
		content += makeTDButton('abcdefghijklmnopqrstuvwxyz');
		content += makeTDButton('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		content += makeTDButton('0123456789');
		content += makeTDSymbolButton();
		content += makeTDPermutationButtons();

		return content;
	}

	function makeTDButton(text){
		var val = text.replace('<br>', ' ');
		return '<button class="sampletext" onclick="_UI.testdrive.sampletext=\''+val+'\';redraw_TestDrive();">'+text+'</button><br>';
	}

	function makeTDSymbolButton(){
		var sym = ['&#x21;','&#x22;','&#x23;','&#x24;','&#x25;','&#x26;','&#x27;','&#x28;','&#x29;','&#x2A;','&#x2B;','&#x2C;','&#x2D;','&#x2E;','&#x2F;','&#x3A;','&#x3B;','&#x3C;','&#x3D;','&#x3E;','&#x3F;','&#x40;','&#x5B;','&#x5C;','&#x5D;','&#x5E;','&#x5F;','&#x60;','&#x7B;','&#x7C;','&#x7D;','&#x7E;'];
		
		var re = '<button class="sampletext" onclick="clickTDSymbolButton();">';
		re += sym.join('');
		re += '</button><br>';

		return re;
	}

	function clickTDSymbolButton() {
		var sym = [0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F, 0x40, 0x5B, 0x5C, 0x5D, 0x5E, 0x5F, 0x60, 0x7B, 0x7C, 0x7D, 0x7E];
		
		var con = '';
		for(var s=0; s<sym.length; s++) con += String.fromCharCode(sym[s]);

		_UI.testdrive.sampletext = con;

		redraw_TestDrive();
	}

	function makeTDPermutationButtons(){
		var re = '<button class="sampletext" onclick="clickTDPermutationButton(true);">All upper case letter permutations</button><br>';
		re += '<button class="sampletext" onclick="clickTDPermutationButton(false);">All lower case letter permutations</button><br>';
		
		return re;
	}
	
	function clickTDPermutationButton(upper) {
		var seq = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if(!upper) seq = seq.toLowerCase();
		var con = '';

		for(var first = 0; first < seq.length; first++){
			for(var second = 0; second < seq.length; second++){
				con += seq.charAt(first) + seq.charAt(second) + ' ';
			}
			con += '\n';
		}

		_UI.testdrive.sampletext = con;

		redraw_TestDrive();
	}

	function drawTDOptions(){
		if(!_UI.testdrive.linegap) _UI.testdrive.linegap = _GP.projectsettings.linegap;
		if(!isval(_UI.testdrive.padsize)) _UI.testdrive.padsize = _GP.projectsettings.defaultlsb;

		var flattenmessage = "<h1>Combine Glyphs Shapes</h1>"+
			"In <a href=# onclick=navToProjectSettings()>Project Settings &rsaquo; Export Options</a> you have the option to combine all glyph shapes.<br>"+
			"Having glyphs with many overlapping paths in a font can sometimes cause issues.<br>"+
			"So, this setting will flatten each glyph as it&prime;s exported to your font.<br><br>"+
			"Selecting this option in Test Drive here will <i>preview</i> how your glyph shapes will be <br>"+
			"combined. This preview will not change your designs in Glyphr Studio. There is a<br>"+
			"Combine Shapes action in Glyph Edit if you wish to permanently combine shapes.<br><br>"+
			"As a warning, this process is time intensive, so the first time you type a letter<br>"+
			"it may take a few seconds to render.";

		var content = '<table class="detail">';
		content += '<tr><td> font size <span class="unit">(px)</span> </td><td><input type="number" value="'+_UI.testdrive.fontsize+'" onchange="changefontscale(this.value); redraw_TestDrive();"></td></tr>';
		content += '<tr><td> 96dpi font size <span class="unit">(pt)</span> </td><td><input type="number" disabled="disabled" id="roughptsize" valu="75"/></td></tr>';
		content += '<tr><td> line gap <span class="unit">(em units)</span> </td><td><input type="number" value="'+_UI.testdrive.linegap+'" onchange="changelinegap(this.value); redraw_TestDrive();"></td></tr>';
		// content += '<tr><td> glyph spacing <span class="unit">(em units)</span> </td><td><input type="number" value="'+_UI.testdrive.padsize+'" onchange="_UI.testdrive.padsize=this.value*1; redraw_TestDrive();"></td></tr>';
		content += '<tr><td> <label for="showglyphextras">show glyph boxes</label> </td><td>' + checkUI("_UI.testdrive.showglyphextras", _UI.testdrive.showglyphextras, true) + "</td></tr>";
		content += '<tr><td> <label for="showlineextras">show baseline</label> </td><td>' + checkUI("_UI.testdrive.showlineextras", _UI.testdrive.showlineextras, true) + "</td></tr>";
		content += '<tr><td> <label for="showpageextras">show page borders</label> </td><td>' + checkUI("_UI.testdrive.showpageextras", _UI.testdrive.showpageextras, true) + "</td></tr>";

		content += '<tr><td> <label for="flattenglyphs">preview combine glyph shapes</label>' + helpUI(flattenmessage) + ' </td><td>' + checkUI("_UI.testdrive.flattenglyphs", _UI.testdrive.flattenglyphs, false) + "</td></tr>";

		content += '<tr><td colspan=2><button onclick="createimg();">generate png file</button></td></tr>';
		content += '</table>';
		return content;
	}

	function navToProjectSettings() {
		_UI.current_page = 'project settings';
		navigate();
	}

	function changefontscale(newval){
		var td = _UI.testdrive;

		td.fontsize = newval*1;
		td.fontscale = (newval/_GP.projectsettings.upm);
		td.glyphseq.setScale(td.fontscale);
		td.glyphseq.setMaxes({
			xmin: 10,
			xmax: 790,
			ymin: 10 + (_GP.projectsettings.ascent * td.fontscale),
			ymax: false
		});
		document.getElementById('roughptsize').value = (newval*0.75);
		document.getElementById('tdtextarea').style.fontSize = ((newval*0.75) + 'pt');
	}

	function changelinegap(newval) {
		var td = _UI.testdrive;

		td.linegap = newval * 1;
		td.glyphseq.setLineGap(td.linegap);
	}

	function createimg(){
		var imgd = document.getElementById('tdcanvas').toDataURL();

		var win = window.open(document.location.href, 'Glyphr Test Drive');

		win.document.write('<!DOCTYPE html><html>'+
		'<head><title>Glyphr - Test Drive Image</title></head>'+
		'<body style="padding:40px; text-align:center;">'+
		'<img src="' + imgd + '" title="Glyphr Test Drive" style="border:1px solid #f6f6f6;">'+
		'</html>');
	}

// end of file