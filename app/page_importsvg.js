	function loadPage_importsvg(){
		debug("LOADING PAGE >> loadpage_importsvg");
		var content = "<div class='pagecontent'><h1>Import SVG</h1>" +
		"<table><tr><td><h2>Select a character</h2><div id='importsvgcharchooser'></div></td>"+
		"<td><h2 style='margin-bottom:10px;'>Scale options</h2>"+
		"<input type='checkbox' checked onchange='_UI.importsvg.scale=this.checked;'>Scale imported SVG path<br>"+
		"<div style='padding-left:20px;' disabled='"+_UI.importsvg.scale+"'>"+
		"<input type='checkbox' onchange='_UI.importsvg.ascender=this.checked;'>Has ascender<br>"+
		"<input type='checkbox' onchange='_UI.importsvg.descender=this.checked;'>Has descender<br>"+
		"</div><br>"+
		"<h2>Paste SVG code</h2>"+
		"<textarea id='svgcode'></textarea><br>"+
		"<input type='button' class='button buttonsel' value='Import SVG' onclick='importSVG_importCode();'>"+
		"</td></tr></table>"+
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		
		importSVG_selectChar("0x0061");
	}

	function importSVG_selectChar(cid){
		debug("IMPORTSVG_SELECTCHAR - selecting " + cid);
		selectChar(cid, true);
		document.getElementById('importsvgcharchooser').innerHTML = makeGenericCharChooserContent('importSVG_selectChar');
		drawGenericCharChooserContent();
	}

	function importSVG_importCode() {
		
	}