// start of file

	function loadPage_importsvg(){
		// debug("LOADING PAGE >> loadpage_importsvg");
		var chname = getSelectedCharName();
		var content = "<h1 class='pagetitle'>Import SVG</h1><div class='pagecontent textpage'>" +
		"<h2 id='importsvgselecttitle'>Target character: "+chname+"</h2>"+

		"<table style='margin-top:16px;'><tr><td style='width:50%;'>"+
			"<table><tr><td>"+
				checkUI("_UI.importsvg.scale") +
			"</td><td style='padding:0px 0px 8px 5px;'>"+
				"<label for='scale'>Scale the imported SVG outlines</label>"+
			"</td></tr><tr><td>"+
				checkUI("_UI.importsvg.move") +
			"</td><td style='padding:0px 0px 8px 5px;'>"+
				"<label for='move'>Move the imported SVG outlines</label>"+
			"</td></tr></table>"+
		"</td><td style='width:50%; padding-top:4px;'>"+
			"Enter the height metrics for this character:<br>"+

			"<table style='margin-top:10px;'><tr>"+
			"<td style='width:20px; padding-top:10px;'>"+
				checkUI("_UI.importsvg.ascender")+
			"</td><td class='svgscaleoption'>"+
				"<label for='ascender'>Ascender</label>"+
			"</td><td style='padding-left:30px;' rowspan='3'>"+

				"<table><tr><td colspan='2'>"+
					"For rounded characters:"+
				"</td></tr><tr><td>"+
					checkUI("_UI.importsvg.overshoot_top")+
				"</td><td style='padding:0px 0px 8px 8px;'>"+
					"<label for='overshoot_top'>top overshoot</label>"+
				"</td></tr><tr><td>"+
					checkUI("_UI.importsvg.overshoot_bottom")+
				"</td><td style='padding:0px 0px 8px 8px;'>"+
					"<label for='overshoot_bottom'>bottom overshoot</label>"+
				"</td></tr></table>"+


			"</tr><tr><td style='padding-top:10px;'>"+
				"<input type='checkbox' disabled checked/>"+
			"</td><td class='svgscaleoption'>"+
				"<span style='color:"+_UI.colors.gray_40+";'>X Height</span>"+
			"</td></tr><tr><td style='padding-top:10px;'>"+
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
		"<button style='display:inline; margin-left:10px; padding-left:20px; padding-right:20px;' onclick='history_pull();'>undo</button>"+
		"<button style='display:inline; margin-left:10px; padding-left:20px; padding-right:20px;' onclick='importSVG_clearCode();'>clear code</button>"+

		makeErrorMessageBox() +
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
				closeErrorMessageBox();
			};
		})(f);

		reader.readAsText(f);
	}


	function importSVG_clearCode() {
		document.getElementById('droptarget').innerHTML = 'drop a .svg file here, or paste code below';
		document.getElementById('svgcode').value = '';
		document.getElementById('svgcode').focus();
		_UI.importsvg.svgcode = false;
		closeErrorMessageBox();
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
		closeErrorMessageBox();

		var tempchar = ioSVG_convertTagsToChar(svgin);

		if(!tempchar) return;
		
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
		history_put("Imported Paths from SVG to character "+getSelectedCharName());

		update_NavPanels();
	}

// end of file