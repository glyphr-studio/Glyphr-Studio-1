// start of file
/**
	Page > Project Settings
	Project Settings are any settings that are 
	specific to Glyphr Studio, and are not a part 
	of any font metadata.
	HTML and associated functions for this page.
**/

function loadPage_projectsettings() {
	// debug("LOADING PAGE >> loadPage_projectsettings");
	var ps = _GP.projectsettings;

	var content =
		'<h1 class="pagetitle">Project Settings</h1><div class="pagecontent textpage">';

	content +=
		'<h1>Project name</h1>' +
		'The Font Name and the Project name can be different, but they start out the same.  The Font Name can be changed on the Font Settings page.' +
		'<table class="settingstable">' +
		'<tr><td>Project Name:</td><td><input type="text" style="width:100%" value="' +
		ps.name +
		'" onchange="_GP.projectsettings.name = this.value;" /></td></tr>' +
		'</table>';

	// UI Options
	content +=
		'<h1>UI behavior</h1>' +
		'<table class="settingstable">' +
		'<tr><td class="uicolumn">' +
		checkUI(
			'_GP.projectsettings.glyphrange.filternoncharpoints',
			ps.glyphrange.filternoncharpoints
		) +
		'</td>' +
		'<td><label for="filternoncharpoints">Hide unassigned code points and control points (non-glyph characters like printing codes).</label></td></tr>' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.markoverlappingpointsdistance +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||-1; _GP.projectsettings.markoverlappingpointsdistance=r; this.value=r;" style="width:25px;"/></td>' +
		'<td>Highlight path points that are close together or overlapping.<br>Enter a distance in Em units for how close points need to be to highlight.<br>Use -1 to turn highlight off.</td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI(
			'_GP.projectsettings.showkeyboardtipsicon',
			ps.showkeyboardtipsicon
		) +
		'</td>' +
		'<td><label for="showkeyboardtipsicon" style="position:relative; top:-6px;">Show the &nbsp;<span style="position:relative; top:6px; height:22px;">' +
		makeIcon({
			name: 'keyboard',
			size: 50,
			width: 22,
			height: 22,
			color: 'rgb(76, 81, 86)',
			hovercolor: 'rgb(76, 81, 86)',
		}) +
		'</span>&nbsp; button on the edit canvas.</label></td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI('_GP.projectsettings.stoppagenavigation', ps.stoppagenavigation) +
		'</td>' +
		'<td><label for="stoppagenavigation">Show a confirmation message if you attempt to close an unsaved project.</label></td></tr>' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.spinnervaluechange +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.spinnervaluechange=r; this.value=r;" style="width:25px;"/></td>' +
		'<td>Spinner Button and Keyboard Nudge increment or decrement value.</td></tr>' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.pointsize +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.pointsize=r; this.value=r;" style="width:25px;"/></td>' +
		'<td>Path Point and Handle size.</td></tr>' +
		'</table>';

	// Grids and Guides
	content += '<h1>Guidelines and grid</h1>';

	// Guidelines
	content += '<h2>Guidelines</h2>';
	content +=
		'There are default horizontal and vertical guidelines for font key metrics. You can also create custom guidelines. These guidelines can either be visual indicators, or act as snapping points.' +
		'<table class="settingstable">' +
		'<tr><td class="uicolumn">' +
		checkUI('_GP.projectsettings.snaptoguides', ps.snaptoguides) +
		'</td>' +
		'<td><label for="snaptoguides">Snap Path Points to guides.</label></td></tr>' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.snapdistance +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.snapdistance=r; this.value=r;" style="width:25px;"/></td>' +
		'<td>Snap distance/proximity.<span class="unit">(screen pixels)</span></td></tr>' +
		'</table>';

	content +=
		'<h2>Overshoot guidelines</h2>' +
		'Round letters usually extend a little above the x height line and below the baseline. ' +
		'A light guideline will show this overshoot distance.<br>' +
		'<table class="settingstable">' +
		'<tr><td>Overshoot:</td><td><input type="number" value="' +
		ps.overshoot +
		'" onchange="_GP.projectsettings.overshoot = this.value;"></td><td><span class="unit">(em units)</span></td></tr>' +
		'</table>';

	// Grid
	content += '<h2>Grid</h2>';
	content +=
		'Defining a grid system to use while editing glyphs in this font makes stuff a whole ' +
		'lot easier.  This number is the number of vertical and horizontal divisions to use, it should ' +
		'divide evenly into the Units per Em.<br>' +
		'<table class="settingstable">' +
		'<tr><td>Units per Em:</td><td><input type="number" disabled="disabled" value="' +
		ps.upm +
		'"/></td><td><span class="unit">(total)</span></td></tr>' +
		'<tr><td>Grid Divisions</td><td><input type="number" value="' +
		ps.griddivisions +
		'" onchange="updateGridDivisions(this.value);"/></td><td><span class="unit">(number)</span></td></tr>' +
		'<tr><td>Grid Square Size:</td><td><input type="number" id="metirc-ssize" disabled="disabled" value="' +
		ps.upm / ps.griddivisions +
		'"/></td><td><span class="unit">(em units)</span></td></tr>' +
		'</table>';
	content +=
		'<table class="settingstable">' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		(ps.colors.gridtransparency || 95) +
		'" onchange="var r=Math.max(1, Math.min(99, Math.round(parseInt(this.value)))); r=r||95; this.value=r; updateGridLightness(r);" style="width:25px;"/></td>' +
		'<td>% Grid lightness on the edit canvas.</td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI('_GP.projectsettings.snaptogrid', ps.snaptogrid) +
		'</td>' +
		'<td><label for="snaptogrid">Snap Path Points to grid lines.</label></td></tr>' +
		'<tr><td class="uicolumn">' +
		'</table>';

	// Point rounding
	content +=
		'<h1>Point rounding</h1>' +
		'OTF Fonts require only using whole numbers for point values. If you have a special use case, you can select to export decimal values to OTF files. But, be warned, this will almost certainly cause your OTF file to be unusable. For SVG Fonts, they can get large if every number is a decimal with 18 digits. SVG Data defaults to 3 decimal places for exported files.<br><br>' +
		'Project Files will <b>always</b> store decimal values at full precision. These options allow you to control how data is displayed on the edit canvas, and how it is exported to different formats. ';
	content +=
		'<h2>Edit canvas</h2>' +
		'<table class="settingstable">' +
		'<tr><td class="uicolumn" style="width: 50px;">' +
		checkUI(
			'_GP.projectsettings.marknonintegerpoints',
			ps.marknonintegerpoints
		) +
		'</td>' +
		'<td><label for="marknonintegerpoints">Highlight path points that contain decimal values.</label></td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI(
			'_GP.projectsettings.renderpointssnappedtogrid',
			ps.renderpointssnappedtogrid
		) +
		'</td>' +
		'<td><label for="renderpointssnappedtogrid">Render shape outlines with their points rounded to whole numbers.</label></td></tr>' +
		'</table>';
	content +=
		'<h2>Rounding for export</h2>' +
		'<table class="settingstable">' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.svgprecision +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||3; _GP.projectsettings.svgprecision=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>' +
		'<td>SVG Decimal Precision for exported files.</td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI('_GP.projectsettings.roundotfvalues', ps.roundotfvalues) +
		'</td>' +
		'<td><label for="roundotfvalues">Round OTF Font values.</label><br><span class="inlinewarning">&nbsp;Warning: Unchecking this box will almost certainly result in a corrupted OTF file.&nbsp;</span></td></tr>' +
		'</table>';

	// Export options
	content +=
		'<h1>Export options</h1>' +
		'In addition to these options, please also see the "Rounding for export" options in the previous section. ' +
		'<table class="settingstable">' +
		'<tr><td class="uicolumn">' +
		checkUI('_GP.projectsettings.formatsavefile', ps.formatsavefile) +
		'</td>' +
		'<td><label for="formatsavefile">Format the Glyphr Project text file for easy reading.  This may increase the file size by 2x.</label></td></tr>' +
		'<tr><td class="uicolumn">' +
		checkUI(
			'_GP.projectsettings.combineshapesonexport',
			ps.combineshapesonexport
		) +
		'</td>' +
		'<td class="longlabel"><label for="combineshapesonexport">Combine all glyph shapes.</label><br>Sometimes fonts behave better if there are less path outlines in a glyph.  This option will combine all overlapping shapes with the same winding into as few shapes as possible.</td></tr>' +
		'<tr><td class="uicolumn"><input type="text" value="' +
		ps.maxcombineshapesonexport +
		'" onchange="var r=Math.round(parseInt(this.value)); r=r||30; _GP.projectsettings.maxcombineshapesonexport=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>' +
		'<td class="longlabel">Maximum shapes to attempt to combine.<br>Combining glyph shapes is a time-intensive process.  If a glyph has more than this number of shapes, combine will not be attempted, and overlapping shapes will be exported as-is.</td></tr>' +
		'</table>';

	content += '</div>';

	var wrapper = getEditDocument().getElementById('mainwrapper');
	wrapper.innerHTML = content;
}

function updateGridLightness(l) {
	l = l || 95;
	_GP.projectsettings.colors.gridtransparency = l;
}

function updateGridDivisions(val) {
	var ps = _GP.projectsettings;
	ps.griddivisions = Math.min(ps.upm, Math.max(1, val));
	document.getElementById('metirc-ssize').value = round(
		ps.upm / ps.griddivisions,
		3
	);
}
