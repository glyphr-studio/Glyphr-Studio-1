//-------------------
// Navigation
//-------------------

	function navigate(nap){
		debug(">>> NAVIGATE STARTED - to " + _UI.navhere + ", nav primary: " + nap);

		if (_UI.navhere == 'firstrun'){ makeLayout_Firstrun(); }
		else if (_UI.popout){ makeLayout_PopOut();	}
		else { makeLayout_PopIn(nap); }

		loadPageContent();
		document.body.focus();
		debug(">>> NAVIGATE FINISHED - to " + _UI.navhere);
	}


	function update_NavPanels() {
		debug("UPDATE_NAVPANELS");
		if (_UI.popout){ makeAndDraw_NavPanels_PopOut(); }
		else { makeAndDraw_NavPanels_PopIn(); }
	}

//-------------------
// Layout - First Run
//-------------------
	function makeLayout_Firstrun(){
		document.getElementById('primaryScreenLayout').innerHTML = '<div id="mainwrapper"></div>';
	}


//-------------------
// Layout - pop OUT
//-------------------

	function makeLayout_PopOut(){
		debug("MAKELAYOUT_POPOUT - start");

		var pol = '<table class="popout_table"><tr>';
		pol += '<td id="popout_pagenav" class="popout_column" width="10%"></td>';
		pol += '<td id="popout_charchooser" class="popout_column" width="50%"></td>';
		pol += '<td id="popout_layerchooser" class="popout_column" width="20%"></td>';
		//pol += '<td id="popout_actions" class="popout_column" width="20%"></td>';
		pol += '<td id="popout_attributes" class="popout_column" width="20%"></td>';
		pol += '</tr></table>';

		// but a save icon somewhere

		document.getElementById('primaryScreenLayout').innerHTML = pol;
		debug("MAKELAYOUT_POPOUT primaryscreenlayout.innerhtml:\n" + document.getElementById('primaryScreenLayout').innerHTML);
		makeAndDraw_NavPanels_PopOut();

		debug("MAKELAYOUT_POPOUT - end");
	}

	function makeAndDraw_NavPanels_PopOut(){
		debug("MAKEANDDRAW_NAVPANELS_POPOUT");
		debug("\t\t primaryscreenlayout.innerhtml:\n" + document.getElementById('primaryScreenLayout').innerHTML);

		document.getElementById('popout_pagenav').innerHTML = makePanel_PageNav();

		if(_UI.navhere == "character edit") {
			document.getElementById('popout_charchooser').innerHTML = makePanel_CharChooser();
			drawPanel_CharChooser();
		}
		if(_UI.navhere == "linked shapes") {
			document.getElementById('popout_charchooser').innerHTML = makePanel_LinkedShapeChooser();
			drawPanel_LinkedShapeChooser();
		}

		document.getElementById('popout_layerchooser').innerHTML = makePanel_LayerChooser();
		drawPanel_LayerChooser();

		if(_UI.navhere == "test drive"){
			document.getElementById('popout_attributes').innerHTML = makePanel_TestDriveOptions();
		} else {
			document.getElementById('popout_attributes').innerHTML = makePanel_Attributes();
			drawPanel_Attributes();
		}
	}



//-------------------
// Layout - pop IN
//-------------------

	function makeLayout_PopIn(nap){
		debug("MAKELAYOUT_POPIN");

		var pil = '<div id="mainwrapper"></div>';
		pil += '<div id="navarea_tabs" onMouseOver="mouseoutcec();"></div>';
		pil += '<div id="navarea_panel" onMouseOver="mouseoutcec();"></div>';
		document.getElementById('primaryScreenLayout').innerHTML = pil;

		mouseoutcec();

		var nh = _UI.navhere;

		_UI.navprimaryhere = nap || "npChar";
		if(nh=="test drive") _UI.navprimaryhere = "npAttributes";

		// pages with redraw() call makeAndDraw_NavPanels_PopIn
		if(!(nh=="character edit" || nh=="linked shapes" || nh=="test drive")){
			makeAndDraw_NavPanels_PopIn();
			document.getElementById("mainwrapper").style.overflowY = "scroll";
		} else {
			document.getElementById("mainwrapper").style.overflowY = "hidden";
		}
	}


	function makeAndDraw_NavPanels_PopIn(){
		debug("MAKEANDDRAW_NAVPANELS_POPIN");

		document.getElementById("navarea_tabs").innerHTML = makePanel_NavTabs();
		drawPanel_NavTabs();

		var nt = document.getElementById("navarea_panel");
		nt.innerHTML = "";

		if((_UI.navhere!="character edit")&&(_UI.navhere!="linked shapes")&&(_UI.navhere!="test drive")) {
				_UI.navprimaryhere = "npNav";
				nt.innerHTML = makePanel_PageNav();
				return;
		}

		switch(_UI.navprimaryhere){
			case "npNav":
				nt.innerHTML = makePanel_PageNav();
				break;

			case "npChar":
				if(_UI.navhere == "character edit") {
					nt.innerHTML = makePanel_CharChooser();
					drawPanel_CharChooser();
				}
				if(_UI.navhere == "linked shapes") {
					nt.innerHTML = makePanel_LinkedShapeChooser();
					drawPanel_LinkedShapeChooser();
				}
				break;

			case "npLayers":
				nt.innerHTML = makePanel_LayerChooser();
				drawPanel_LayerChooser();
				break;

			case "npAttributes":
				if(_UI.navhere == "test drive"){
					nt.innerHTML = makePanel_TestDriveOptions();
				} else {
					nt.innerHTML = makePanel_Attributes();
					drawPanel_Attributes();
				}
				break;

			case "npSave":
				triggerProjectFileDownload();
				break;
		}
	}




//-------------------
// Shared stuff
//-------------------

	function loadPageContent(){
		switch(_UI.navhere){
			case "firstrun":			loadPage_firstrun();		break;
			case "font settings":		loadPage_fontsettings();	break;
			case "project settings":	loadPage_projectsettings();	break;
			case "open project":		loadPage_openproject();		break;
			case "export font":			loadPage_exportfont();		break;
			case "help":				loadPage_help();			break;
			case "about":				loadPage_about();			break;
			case "test drive":			loadPage_testdrive();		break;
			case "linked shapes":		loadPage_linkedshapes();	break;
			case "character edit":		loadPage_charedit();		break;
		}
	}

	function popOut(){
		_UI.popout = window.open('', 'glyphr_popout');
		debug("POPOUT - opened window, _UI.popout is " + _UI.popout);

		var td = _UI.popout.document;

		// Init window properties
		td.title = 'glyphr - canvas';
		_UI.popout.onBeforeUnload = popIn;
		td.body.innerHTML = '<h1>hello, world</h1>';

		// Adjust current properties
		document.title = 'glyphr - controls';

		debug("POPOUT - finished and _UI.popout is " + _UI.popout);
		navigate();
	}

	function popIn(){
		_UI.popout = false;
		navigate();
	}

	function drawPanel_NavTabs(){
		var ngray = _UI.colors.g9;
		var nselect = _UI.colors.accent;
		var fill = ngray;

		fill = (_UI.navprimaryhere == "npNav") ? nselect : ngray;
		var pncanvas = document.getElementById("npNav");
		var pnctx = pncanvas.getContext("2d");
		pncanvas.width = 50;
		pncanvas.height = 50;
		draw_primaryNav_navigate(pnctx, fill);

		if(_UI.navhere=="character edit"){
			fill = (_UI.navprimaryhere == "npChar") ? nselect : ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);

			fill = (_UI.navprimaryhere == "npLayers") ? nselect : ngray;
			pncanvas = document.getElementById("npLayers");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_layers(pnctx, fill);

			fill = (_UI.navprimaryhere == "npAttributes") ? nselect : ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}

		if(_UI.navhere=="linked shapes"){
			fill = (_UI.navprimaryhere == "npChar") ? nselect : ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);

			fill = (_UI.navprimaryhere == "npAttributes") ? nselect : ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}

		if(_UI.navhere=="test drive"){
			fill = (_UI.navprimaryhere == "npAttributes") ? nselect : ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}

		updateSaveIcon();
	}


	function updateSaveIcon(){
		var fill = _UI.colors.g9;
		if(!_UI.projectsaved) fill = "white";
		pncanvas = document.getElementById("npSave");
		pnctx = pncanvas.getContext("2d");
		pncanvas.width = 50;
		pncanvas.height = 50;
		draw_primaryNav_save(pnctx, fill);
	}


	function makePanel_NavTabs(){
		var navarr = [];
		navarr.push("npNav");

		if(_UI.navhere=="character edit"){
			navarr.push("npAttributes");
			navarr.push("npLayers");
			navarr.push("npChar");
		}

		if(_UI.navhere=="linked shapes"){
			navarr.push("npAttributes");
			navarr.push("npChar");
		}

		if(_UI.navhere=="test drive"){
			navarr.push("npAttributes");
		}

		var newsub = "";
		var bc = "primarynavbutton";

		for(var i=0; i<navarr.length; i++){
			newsub += ("<canvas class='"+bc+"' id='"+navarr[i]+"' onclick='_UI.navprimaryhere=\""+navarr[i]+"\";makeAndDraw_NavPanels_PopIn();'></canvas>");
		}

		newsub += ("<canvas class='"+bc+"' id='npSave' onclick='triggerProjectFileDownload();'></canvas>");

		return newsub;
	}


	function makePanel_PageNav(){
		var navarr = [];
		navarr.push("character edit");
		navarr.push("linked shapes");
		navarr.push("test drive");
		navarr.push("_");
		navarr.push("font settings");
		navarr.push("project settings");
		navarr.push("_");
		navarr.push("open project");
		navarr.push("export font");
		navarr.push("_");
		navarr.push("help");
		navarr.push("about");
		navarr.push("_");
		navarr.push("bug");
		navarr.push("feat");

		var newsub = "<h1>navigate</h1>";

		for(var i=0; i<navarr.length; i++){
			var bc = "navtargetbutton";
			if(navarr[i] == _UI.navhere) { bc = "navtargetbuttonsel"; }

			if(navarr[i]=="_"){
				newsub += "<div style='height:10px;'></div>";
			} else if (navarr[i] == "bug"){
				newsub += ("<a href='javascript:sendBugEmail()' style='font-size:1.1em; padding:4px 0px 4px 0px; font-style:italic;'>report an issue</a><br>");
			} else if (navarr[i] == "feat"){
				newsub += ("<a href='mailto:mail@glyphrstudio.com&subject=Feature%20Request' style='font-size:1.1em; padding:4px 0px 4px 0px; font-style:italic;'>request a feature</a><br>");
			} else {
				newsub += ("<input type='button' class='"+bc+"' value='"+navarr[i]+"' onclick='_UI.navhere=\""+navarr[i]+"\"; _UI.selectedshape=-1; navigate();'>");
			}
		}

		return newsub;
	}
