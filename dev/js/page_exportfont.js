 // start of file

	function loadPage_exportfont(){
		// debug("LOADING PAGE >> loadPage_exportfont");
		var content = '<h1 class="pagetitle">Export Font</h1><div class="pagecontent textpage">';

		content += '<br><table><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportsvg', 'size':60, 'color':_UI.colors.blue.l55, 'hovercolor':false})+'</td><td style="padding-left:20px;">'+
			'</td><td><h2>SVG Font</h2>'+
			'Scalable Vector Graphics Fonts are text-file-based fonts that some browsers can use natively to display web page text.  You can also convert SVG Fonts to any other kind of font using free online services.<br><br>'+
			'<button class="buttonsel" onclick="ioSVG_exportSVGfont();">Export SVG Font</button>'+
			'</td></tr></table><br><br><br>';

		content += '<table><tr><td style="padding-top:10px;">'+makeIcon({'name':'nav_exportotf', 'size':60, 'color':_UI.colors.gray.l80, 'hovercolor':false})+'</td><td style="padding-left:20px;">'+
			'</td><td><h2>OTF Font &emsp;<i>coming soon!</i></h2>'+
			'Open Type Fonts are font files that can be installed on any computer, then used for things like word processing or graphics.<br><br>'+
			'Exporting OTF Fonts will be available in the next release of Glyphr Studio!'+
			'</td></tr></table>';

		content += '</div>';

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

// end of file