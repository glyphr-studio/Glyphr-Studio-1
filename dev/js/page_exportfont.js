// start of file
/**
	Page > Export Font
	HTML and associated functions for this page.
**/


	function loadPage_exportfont(){
		// debug("LOADING PAGE >> loadPage_exportfont");
		var content = '<h1 class="pagetitle">Export Font</h1><div class="pagecontent textpage">';

		content += '<h2>Warning</h2>'+
			'Not all Glyphr Studio Project features are available in exported font file formats. '+
			'Exported files will not contain the following information:<br>'+
			'<ul>'+
			'<li><b>Components</b> will be unlinked and converted to stand-alone outlines.</li>'+
			'<li><b>Kern Groups</b> will be split apart into single-glyph pairs.</li>'+
			'<li><b>Glyphr Studio Project Settings</b>, like grid preferences, will be lost.</li>'+
			'</ul>'+
			'If you want to retain these features, be sure to also save a Glyphr Studio Project File.<br><br>';

		content += '<table><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportotf', 'size':60, 'color':_UI.colors.blue.l55, 'hovercolor':false})+'</td><td style="padding-left:20px;">'+
			'</td><td><h2>OTF Font</h2>'+
			'Open Type Fonts are font files that can be installed on any computer, then used for things like word processing or graphics.<br><br>'+
			'<button class="buttonsel" onclick="ioOTF_exportOTFfont();">Export OTF Font</button>'+
			'</td></tr></table>';

		content += '<br><table><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportsvg', 'size':60, 'color':_UI.colors.blue.l55, 'hovercolor':false})+'</td><td style="padding-left:20px;">'+
			'</td><td><h2>SVG Font</h2>'+
			'Scalable Vector Graphics Fonts are text-file-based fonts that some browsers can use natively to display web page text.  You can also convert SVG Fonts to any other kind of font using free online services.<br><br>'+
			'<button class="buttonsel" onclick="ioSVG_exportSVGfont();">Export SVG Font</button>'+
			'</td></tr></table><br><br><br>';

		content += '</div>';

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

// end of file