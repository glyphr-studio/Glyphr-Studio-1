 // start of file
/**
	Page > Project Settings
	Project Settings are any settings that are 
	specific to Glyphr Studio, and are not a part 
	of any font metadata.
	HTML and associated functions for this page.
**/


	function loadPage_projectsettings(){
		// debug("LOADING PAGE >> loadPage_projectsettings");
		var ps = _GP.projectsettings;

		var content = '<h1 class="pagetitle">Project Settings</h1><div class="pagecontent textpage">';

		content += '<h1>Project Name</h1>'+
					'The Font Name and the Project name can be different, but they start out the same.  The Font Name can be changed on the Font Settings page.'+
					'<table class="settingstable">'+
					'<tr><td>Project Name:</td><td><input type="text" style="width:100%" value="' + ps.name + '" onchange="_GP.projectsettings.name = this.value;" /></td></tr>'+
					'</table>';

		content += "<h1>Grids and Guides</h1>";
		content += "<h2>Grid System</h2>";
		content += "Defining a grid system to use while editing glyphs in this font makes stuff a whole " +
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " +
					"divide evenly into the Units per Em.<br>" +
					"<table class='settingstable'>"+
					"<tr><td>Units per Em:</td><td><input type='number' disabled='disabled' value='" + ps.upm + "'/></td><td><span class='unit'>(total)</span></td></tr>"+
					"<tr><td>Grid Divisions</td><td><input type='number' value='"+ps.griddivisions+"' onchange='updateGridDivisions(this.value);'/></td><td><span class='unit'>(number)</span></td></tr>"+
					"<tr><td>Grid Square Size:</td><td><input type='number' id='metirc-ssize' disabled='disabled' value='" + (ps.upm/ps.griddivisions) + "'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table>";

		content += "<h2>Overshoot</h2>"+
					"Round letters usually extend a little above the x height line and below the baseline. " +
					"A light guideline will show this overshoot distance.<br>" +
					"<table class='settingstable'>"+
					"<tr><td>Overshoot:</td><td><input type='number' value='"+ps.overshoot+"' onchange='_GP.projectsettings.overshoot = this.value;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table>";

		content += '<h1>UI Behavior</h1>'+
					'<table class="settingstable">'+

					"<tr><td class='uicolumn'>"+checkUI("_GP.projectsettings.glyphrange.filternoncharpoints", ps.glyphrange.filternoncharpoints)+"</td>"+
					"<td><label for='filternoncharpoints'>Hide Unicode Control Points (non-glyph characters like printing codes)</label></td></tr>"+
					
					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.renderpointssnappedtogrid', ps.renderpointssnappedtogrid)+'</td>'+
					'<td class="longlabel"><label for="renderpointssnappedtogrid">Render shape outlines with their points snapped to a 1em grid.<br>(required for .otf export - Project Files will still store decimal values)</label></td></tr>'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.showkeyboardtipsicon', ps.showkeyboardtipsicon)+'</td>'+
					'<td><label for="showkeyboardtipsicon" style="position:relative; top:-6px;">Show the &nbsp;<span style="position:relative; top:6px; height:22px;">'+makeIcon({'name':'keyboard', 'size':50, 'width':22, 'height':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+'</span>&nbsp; button on the edit canvas.</label></td></tr>'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.stoppagenavigation', ps.stoppagenavigation)+'</td>'+
					'<td><label for="stoppagenavigation">Show a confirmation message if you attempt to close an unsaved project.</label></td></tr>'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.formatsavefile', ps.formatsavefile)+'</td>'+
					'<td><label for="formatsavefile">Format the Glyphr Project text file for easy reading.  This may increase the file size by 2x.</label></td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.spinnervaluechange)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.spinnervaluechange=r; this.value=r;" style="width:25px;"/></td>'+
					'<td>Spinner Button and Keyboard Nudge increment or decrement value.</td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.pointsize)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.pointsize=r; this.value=r;" style="width:25px;"/></td>'+
					'<td>Path Point and Handle size.</td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.colors.gridtransparency || 95)+'" onchange="var r=Math.max(1, Math.min(99, Math.round(parseInt(this.value)))); r=r||95; this.value=r; updateGridLightness(r);" style="width:25px;"/></td>'+
					'<td>% Grid lightness on the edit canvas.</td></tr>'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.snaptogrid', ps.snaptogrid)+'</td>'+
					'<td><label for="snaptogrid">Snap to grid.</label></td></tr>'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.snaptoguides', ps.snaptoguides)+'</td>'+
					'<td><label for="snaptoguides">Snap to guides.</label></td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.snapdistance)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.snapdistance=r; this.value=r;" style="width:25px;"/></td>'+
					'<td>Snap distance/proximity.<span class="unit">(screen pixels)</span></td></tr>'+

					'</table>';

		
		content += '<h1>Export Options</h1>'+
					'<table class="settingstable">'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.combineshapesonexport', ps.combineshapesonexport)+'</td>'+
					'<td class="longlabel"><label for="combineshapesonexport">Combine all glyph shapes<br>Sometimes fonts behave better if there are less path outlines in a glyph.  This option will combine all overlapping shapes with the same winding into as few shapes as possible.</label></td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.maxcombineshapesonexport)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||30; _GP.projectsettings.maxcombineshapesonexport=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>'+
					'<td class="longlabel">Maximum shapes to attempt to combine<br>Combining glyph shapes is a time-intensive process.  If a glyph has more than this number of shapes, combine will not be attempted, and overlapping shapes will be exported as-is.</td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.svgprecision)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||3; _GP.projectsettings.svgprecision=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>'+
					'<td class="longlabel">SVG Decimal Precision<br>Number of decimal places to round point data.</td></tr>'+

					'</table>';


		content += '</div>';

		getEditDocument().getElementById('mainwrapper').innerHTML = content;
	}

	function updateGridLightness(l) {
		l = l || 95;
		_GP.projectsettings.colors.gridtransparency = l;
	}

	function updateGridDivisions(val){
		var ps = _GP.projectsettings;
		ps.griddivisions = Math.min(ps.upm, Math.max(1, val));
		document.getElementById('metirc-ssize').value = round((ps.upm / ps.griddivisions), 3);
	}

// end of file