// start of file
/**
	Page > Font Settings
	HTML and associated functions for this page.
**/


	function loadPage_fontsettings(){
		// debug("LOADING PAGE >> loadPage_fontsettings");
		// SETTINGS
		var ps = _GP.projectsettings;
		var meta = _GP.metadata;

		var content = "<h1 class='pagetitle'>Font Settings</h1><div class='pagecontent textpage'>";

		content += "<h2>Font Name</h2>";
		content += "<input type='text' style='width:300px; padding:8px; font-size:1.2em; margin-bottom:20px;' value='"+meta.font_family+"' onchange='_GP.metadata.font_family = this.value;'/><br>";

		content += "<h2>Glyph Proportions</h2>";

		content += "<h3>Key Metrics</h3>"+
					"<table class='settingstable'>"+
					"<tr><td>Ascent height: </td><td><input type='number' value='"+ps.ascent+"' onchange='_GP.projectsettings.ascent = Math.abs(parseInt(this.value));'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Cap height: </td><td><input type='number' value='"+ps.capheight+"' onchange='_GP.projectsettings.capheight = Math.abs(parseInt(this.value));'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>x Height: </td><td><input type='number' id='metric-xheight' value='"+ps.xheight+"' onchange='_GP.projectsettings.xheight = Math.abs(parseInt(this.value));'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Descent height: </td><td><input type='number' id='metric-des' value='"+ps.descent+"' onchange='_GP.projectsettings.descent = Math.abs(parseInt(this.value))*-1;'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td><b>Total Units per Em: </b></td><td><input type='number' value='"+ps.upm+"' onchange='_GP.projectsettings.upm = Math.abs(parseInt(this.value));'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";
/*
		content += "<h3>Line Gap</h3>" +
					"This is the amount of vertical space between glyphs on separate lines. This is recomended to be 20% to 25% of the total Units per Em."+
					"<table class='settingstable'>"+
					"<tr><td>Line Gap: </td><td><input type='number' value='"+ps.linegap+"' onchange='_GP.projectsettings.linegap = this.value;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";
*/
		content += "<h3>Default Side Bearings</h3>" +
					"Side Bearings are the amount of blank space that is added to the left or right of glyphs when they are displayed.  This metric can be set individually per glyph, but will default to this value if not set. "+
					"<table class='settingstable'>"+
					"<tr><td>Left Side Bearing: </td><td><input type='number' value='"+ps.defaultlsb+"' onchange='_GP.projectsettings.defaultlsb = Math.abs(parseInt(this.value)) || 0;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"<tr><td>Right Side Bearing: </td><td><input type='number' value='"+ps.defaultrsb+"' onchange='_GP.projectsettings.defaultrsb = Math.abs(parseInt(this.value)) || 0;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";




		// GLYPHS
		content += "<h1>Glyph Ranges</h1>"+
					"Glyph ranges are based on the <a href='http://en.wikipedia.org/wiki/Unicode' target='_blank'>Unicode Standard</a>, which assigns a <a href='http://en.wikipedia.org/wiki/Hexadecimal' target='_blank'>hexadecimal number</a> to all possible glyphs in a font. ";

		content += "<br><br><h3>Standard Glyph Ranges&ensp;"+helpUI(unicodeInputHelp())+"</h3>"+
					"The most common glyph sets are built into Glyphr Studio, and can be toggled with the checkboxes below.";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.glyphrange.basiclatin", ps.glyphrange.basiclatin)+"</td>"+
					"<td><label for='basiclatin'><b>Basic Latin</b> - Unicode glyphs 0x0020 through 0x007E</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='glyphrangepreview'>";
					var bl = _UI.basiclatinorder;
					for(var t=0; t<bl.length; t++){ content += (hexToChars(bl[t]) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td style='vertical-align:top;'>"+checkUI("_GP.projectsettings.glyphrange.latinsuppliment", ps.glyphrange.latinsuppliment)+"</td>"+
					"<td><label for='latinsuppliment'><b>Latin Suppliment</b> - Unicode glyphs 0x00A0 through 0x00FF</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='glyphrangepreview'>";
					for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){ content += (decToHTML(s) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.glyphrange.latinextendeda", ps.glyphrange.latinextendeda)+"</td>"+
					"<td><label for='latinextendeda'><b>Latin Extended-A</b> - Unicode glyphs 0x0100 through 0x017F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='glyphrangepreview'>";
					for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){ content += (hexToChars(a) + " "); }
		content += "</div></td></tr></table>";


		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.glyphrange.latinextendedb", ps.glyphrange.latinextendedb)+"</td>"+
					"<td><label for='latinextendedb'><b>Latin Extended-B</b> - Unicode glyphs 0x0180 through 0x024F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='glyphrangepreview'>";
					for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){ content += (hexToChars(b) + " "); }
		content += "</div></td></tr></table>";

		content += "<br><h3>Custom Glyph Ranges&ensp;"+helpUI(unicodeInputHelp())+"</h3>"+
					"Additional glyph ranges above 0x024F can be included here. "+
					"A nice overview of glyph ranges can be found at <a href='https://en.wikipedia.org/wiki/Unicode_block' target='_blank'>Wikipedia's Unicode Block page</a>.<br>" +
					"Custom glyph ranges are inclusive, must be unique (non-overlapping), must be greater than 0x024F and less than 0xFFFF.<br><br>"+
					"<table class='settingstable'><tr><td>"+checkUI("_GP.projectsettings.glyphrange.filternoncharpoints", ps.glyphrange.filternoncharpoints)+"</td><td><label for='filternoncharpoints'>Filter out reserved Unicode code points.</label></td></tr></table>"+
					"<table class='settingstable'><tr>"+
					"<td>begin:<br><input type='text' id='customrangebegin'></td>"+
					"<td>end:<br><input type='text' id='customrangeend'></td>"+
					"<td><br><button onclick='addCustomGlyphRange();'>Add Range</button></td>"+
					"<td><br><div id='customrangeerror'>bad range input</div></td>"+
					"</tr></table>"+
					"<div id='customrangetable'></div><br><br>";


		// METADATA
		content += '<br><h1>Font Metadata</h1>';

		content += '<table class="settingstable metadatatable">';
		for(var m in meta){ if(meta.hasOwnProperty(m) && m!== 'font_family'){
			if(meta[m] === '{{sectionbreak}}'){
				content += '<tr><td colspan="3"><p style="margin-bottom:10px;">';
				if(m === 'shared'){
					content += '<h2>Shared</h2>';
					content += 'These properties are shared between all font file formats.';
				} else if (m === 'otf'){
					content += '<h2>OTF</h2>';
					content += 'These properties will be saved with Open Type files when they are exported.';
				} else if (m === 'svg'){
					content += '<h2>SVG</h2>';
					content += 'These properties are based on the CSS @font-face standard.  More information can be found at the W3C\'s <a href=\'http://www.w3.org/TR/CSS2/fonts.html\' target=\'_blank\'>Fonts Page</a> and their <a href=\'http://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#select\' target=\'_blank\'>CSS @font-face Page</a>.';
				}
				content += '</p></td></tr>';
			} else {
				meta[m] = meta[m] || '""';
				content += '<tr>';
				content += '<td class="propname" style="padding-top:8px;">' + m.replace(/_/g, '-') + '</td>';
				content += '<td><input type="text" value="'+escapeTableValue(meta[m])+'" onchange="_GP.metadata.'+m+' = removeEmptyStringInputs(this.value);"/></td>';
				content += '<td class="prophelp" style="padding-top:8px;">'+_UI.metadatahelp[m]+'</td>';
				content += '</tr>';
			}
		}}
		content += '</table>';


		// Finish and show table
		content += '</div>';
		getEditDocument().getElementById('mainwrapper').innerHTML = content;
		updateCustomRangeTable();
	}

	function removeEmptyStringInputs(val) {
		if(val === '""' || val === "''") return '';
		else return trim(val);
	}

	function escapeTableValue(val) {
		// debug('\n escapeTableValue - START');
		// debug('\t typeof val = ' + typeof val);
		// debug(val);

		if(typeof val === 'string'){
			if(val === '""' || val === "''") return '';
			if(val.indexOf("'") > -1){
				// debug('\t replacing single quotes');
				// val = val.replace(/'/g, '\x27');
				val = val.replace(/'/g, '&apos;');
			}
			if(val.indexOf('"') > -1) {
				// debug('\t replacing double quotes');
				// val = val.replace(/"/g, '\x22');
				val = val.replace(/"/g, '&quot;');
			}
		}

		// debug('\t returning ' + JSON.stringify(val));
		return val;
	}

// end of file