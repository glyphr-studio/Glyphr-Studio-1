// start of file

	function loadPage_importsvg(){
		// debug("LOADING PAGE >> loadpage_importsvg");
		var chname = getSelectedCharName();
		var content = "<div class='pagecontent textpage'><h1>Import SVG</h1>" +
		"<h2 id='importsvgselecttitle'>Target character: "+chname+"</h2>"+

		"<table style='margin-top:16px;'><tr><td style='width:50%;'>"+
			"<table><tr><td>"+
				checkUI("_UI.importsvg.scale") +
			"</td><td style='vertical-align:middle; padding:3px 0px 2px 4px;'>"+
				"<label for='scale'>Scale the imported SVG outlines</label>"+
			"</td></tr><tr><td>"+
				checkUI("_UI.importsvg.move") +
			"</td><td style='vertical-align:middle; padding:3px 0px 2px 4px;'>"+
				"<label for='move'>Move the imported SVG outlines</label>"+
			"</td></tr></table>"+
		"</td><td style='width:50%; padding-top:4px;'>"+
			"Enter the height metrics for this character:<br>"+

			"<table style='margin-top:10px;'><tr><td style='width:20px;vertical-align:middle;'>"+
				checkUI("_UI.importsvg.ascender")+
			"</td><td class='svgscaleoption'>"+
				"<label for='ascender'>Ascender</label>"+
			"</td><td style='padding-left:30px;' rowspan='3'>"+

				"<table><tr><td colspan='2'>"+
					"For rounded characters:"+
				"</td></tr><tr><td>"+
					checkUI("_UI.importsvg.overshoot_top")+
				"</td><td style='vertical-align:middle; padding:4px 0px 2px 8px;'>"+
					"<label for='overshoot_top'>top overshoot</label>"+
				"</td></tr><tr><td>"+
					checkUI("_UI.importsvg.overshoot_bottom")+
				"</td><td style='vertical-align:middle; padding:4px 0px 2px 8px;'>"+
					"<label for='overshoot_bottom'>bottom overshoot</label>"+
				"</td></tr></table>"+


			"</tr><tr><td style='vertical-align:middle;'>"+
				"<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUtJREFUeNpiYKAyYKRE88x5iwWA1H4gDkxPin0AEmOi0EHzgdgAiOspdiHQdQFAaj2SkCPQlQdYzly89p9Uw/7+/ctw+fJlMI0EQK48QJaXHzx4gG4YA9TrpIfhhw8fwBhdGORlkg389esX2HVYQCEw/C5gGPjt2zdyvNoINGwBjAM38O3btwy3bt3CaeirV68YPn/+jCImLCzMADSsAVmMCeYymO13797FcAXIq8+ePUMR4+LiYpCVlcWwGGwgyGX4wgndq8zMzAzKyspgGquBAgICGDH5/PlznF5VU1NjYGNjwxo0LCBCQUEBHo4wAPIiyAWPHz9G0QBSC/IuLsCETyG6YWJiYuCIwAeY0L2Cy3ZQsGCLBLwGgryIzVAQHxYsJBmILQZBtLy8PNYYJcpAEADFIMilMMPxRQLWWMYGQIYYGBiQXBIBBBgAnLmHKqNtApUAAAAASUVORK5CYII='>"+
			"</td><td class='svgscaleoption'>"+
				"<span style='color:"+_UI.colors.g4+";'>X Height</span>"+
			"</td></tr><tr><td style='vertical-align:middle;'>"+
				checkUI("_UI.importsvg.descender")+
			"</td><td class='svgscaleoption'>"+
				"<label for='descender'>Descender</label><br>"+
			"</td></tr></table>"+

		"</td></tr></table>"+

		"<h2 style='margin-bottom:10px;'>SVG Code</h2>"+
		"<div id='droptarget' style='width:100%; height:auto; margin-bottom:0px; padding:8px;'>drop a .svg file here, or paste code below</div>"+
		"<textarea id='svgcode' onchange='importSVG_codeAreaChange();'>"+

		(_UI.importsvg.svgcode ? _UI.importsvg.svgcode : "") +

		"</textarea><br><br>"+

		"<button class='buttonsel' style='display:inline; padding-left:60px; padding-right:60px;' onclick='importSVG_importCode();'>Import SVG</button>"+
		"<button style='display:inline; margin-left:60px; padding-left:20px; padding-right:20px;' onclick='_UI.navhere=\"character edit\"; navigate();'>go to character edit</button>"+
		"<button style='display:inline; margin-left:10px; padding-left:20px; padding-right:20px;' onclick='pullundoq();'>undo</button>"+
		"<button style='display:inline; margin-left:10px; padding-left:20px; padding-right:20px;' onclick='importSVG_clearCode();'>clear code</button>"+

		'<div id="svgerrormessagebox">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="svgerrormessageleftbar"><button class="svgerrormessageclosebutton" onclick="document.getElementById(\'svgerrormessagebox\').style.display=\'none\';">&times;</button></td>' +
		'<td id="svgerrormessagecontent"></td>' +
		'</tr></table></div>'+
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		//importSVG_selectChar("0x0061");

		getEditDocument().getElementById("droptarget").addEventListener('dragover', handleDragOver, false);
		getEditDocument().getElementById("droptarget").addEventListener('drop', importSVG_handleDrop, false);
	}

	function importSVG_codeAreaChange() {
		document.getElementById("droptarget").innerHTML = "drop a .svg file here, or paste code below";
		_UI.importsvg.svgcode = document.getElementById('svgcode').value;
		//debug("IMPORTSVG_CODEAREACHANGE - code: " + _UI.importsvg.svgcode);
	}

	function importSVG_handleDrop(evt){
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var dt = document.getElementById("droptarget");

		dt.innerHTML = "Loading File...";

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				document.getElementById('svgcode').value = reader.result;
				_UI.importsvg.svgcode = reader.result;
				dt.innerHTML = "Loaded " + theFile.name;
				importSVG_closeErrorMessage();
			};
		})(f);

		reader.readAsText(f);
	}


	function importSVG_clearCode() {
		document.getElementById('droptarget').innerHTML = 'drop a .svg file here, or paste code below';
		document.getElementById('svgcode').value = '';
		document.getElementById('svgcode').focus();
		_UI.importsvg.svgcode = false;
		importSVG_closeErrorMessage();
	}

	function importSVG_selectChar(cid){
		//debug("IMPORTSVG_SELECTCHAR - selecting " + cid);
		selectChar(cid, true);
		document.getElementById('importsvgselecttitle').innerHTML = "Target character: "+getSelectedCharName();
		update_NavPanels();
	}

	function importSVG_importCode() {
		var svgin = document.getElementById('svgcode').value;
		//debug("IMPORTSVG_IMPORTCODE - svgin is " + JSON.stringify(svgin));
		importSVG_closeErrorMessage();

		var tempchar = ioSVG_convertTagsToChar(svgin);

		// Flip and Scale
		tempchar.flipNS();
		var so = _UI.importsvg;
		var gp = _GP.projectsettings;

		//debug("IMPORTSVG_IMPORTCODE - scale / move " + so.scale + " / " + so.move);

		if(so.scale || so.move){
			var totalheight = (so.ascender? gp.ascent : gp.xheight)*1;
			var finaltop = (so.ascender? gp.ascent : gp.xheight)*1;
			var ovs = gp.overshoot*1;

			if(so.descender) totalheight += (gp.upm - gp.ascent)*1;
			if(so.overshoot_bottom) totalheight += ovs;
			if(so.overshoot_top){
				totalheight += ovs;
				finaltop += ovs;
			}

			if(so.scale) tempchar.setCharSize(false, totalheight, true);
			if(so.move) tempchar.setCharPosition(0, finaltop);
		}

		// Add new Char Shapes
		tempchar.sendShapesTo(getSelectedCharID());
		putundoq("Imported Paths from SVG to character "+getSelectedCharName());

		update_NavPanels();
	}

	function importSVG_errorMessage(msg) {
		console.error("Import SVG Error - " + msg);
		var msgcon = document.getElementById('svgerrormessagecontent');
		var msgbox = document.getElementById('svgerrormessagebox');
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
	}

	function importSVG_closeErrorMessage(){
		document.getElementById('svgerrormessagecontent').innerHTML = "";
		document.getElementById('svgerrormessagebox').style.display = 'none';
	}

// end of file