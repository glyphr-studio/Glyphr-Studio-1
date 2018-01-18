// start of file
/**
	Page > Export Font
	HTML and associated functions for this page.
**/


	function loadPage_exportfont(){
		// debug("LOADING PAGE >> loadPage_exportfont");
		var content = '<h1 class="pagetitle">Export Font</h1><div class="pagecontent textpage">';
		var ps = _GP.projectsettings;

		content += '<h1 style="color:'+_UI.colors.error.medium+';">Warning</h1>'+
			'Not all Glyphr Studio Project features are available in exported font file formats. '+
			'Exported files will not contain the following information:<br>'+
			'<ul>'+
			'<li><b>Components</b> will be unlinked and converted to stand-alone outlines.</li>'+
			'<li><b>Kern Groups</b> will be split apart into single-glyph pairs.</li>'+
			'<li><b>Glyphr Studio Project Settings</b>, like grid preferences, will be lost.</li>'+
			'</ul>'+
			'If you want to retain these features, be sure to also save a Glyphr Studio Project File.';

		content += '<h1>Export Options</h1>'+
					'<table class="settingstable">'+

					'<tr><td class="uicolumn">'+checkUI('_GP.projectsettings.combineshapesonexport', ps.combineshapesonexport)+'</td>'+
					'<td class="longlabel"><label for="combineshapesonexport">Combine all glyph shapes<br>Sometimes fonts behave better if there are less path outlines in a glyph.  This option will combine all overlapping shapes with the same winding into as few shapes as possible.</label></td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.maxcombineshapesonexport)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||30; _GP.projectsettings.maxcombineshapesonexport=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>'+
					'<td class="longlabel">Maximum shapes to attempt to combine<br>Combining glyph shapes is a time-intensive process.  If a glyph has more than this number of shapes, combine will not be attempted, and overlapping shapes will be exported as-is.</td></tr>'+

					'<tr><td class="uicolumn"><input type="text" value="'+(ps.svgprecision)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||3; _GP.projectsettings.svgprecision=r; this.value=r;" style="width:40px; padding-left:4px; margin-top:0px;"/></td>'+
					'<td class="longlabel">SVG Decimal Precision<br>Number of decimal places to round point data.</td></tr>'+

					'</table>';

		content += '<table style="margin-top:20px;"><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportotf', 'size':60, 'color':_UI.colors.blue.l35, 'hovercolor':false})+'</td><td style="padding-left:10px;">'+
			'</td><td><h2>OTF Font</h2>'+
			'Open Type Fonts are font files that can be installed on any computer, then used for things like word processing or graphics.<br>'+
			'<button class="buttonsel" style="padding:6px 12px; font-size:1.1em; margin-top:10px;" onclick="showToast(\'Exporting OTF font file...\'); setTimeout(ioOTF_exportOTFfont, 500);">Export OTF Font</button>'+
			'</td></tr></table>';

		content += '<table style="margin-top:20px;"><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportsvg', 'size':60, 'color':_UI.colors.blue.l35, 'hovercolor':false})+'</td><td style="padding-left:10px;">'+
			'</td><td><h2>SVG Font</h2>'+
			'Scalable Vector Graphics Fonts are text-file-based fonts that some browsers can use natively to display web page text.  You can also convert SVG Fonts to any other kind of font using free online services.<br>'+
			'<button class="buttonsel" style="padding:6px 12px; font-size:1.1em; margin-top:10px;" onclick="showToast(\'Exporting SVG font file...\'); setTimeout(ioSVG_exportSVGfont, 500);">Export SVG Font</button>'+
			'</td></tr></table>';

		content += '<br><br>';
		content += '</div>';

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

// end of file