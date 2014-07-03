//-------------------
// Navigation
//-------------------

	function navigate(nap){
		// debug(">>> NAVIGATE STARTED - to " + _UI.navhere + ", nav primary: " + nap);

		if(_UI.loadsampleproject && _UI.sampleproject){
			//debug("NAVIGATE - using sample project");
			importGlyphrProjectFromText(_UI.sampleproject);
		}

		if(_UI.navhere === 'firstrun'){
			makeLayout_Firstrun();
		} else if (_UI.popout){
			if(_UI.navhere === 'character edit'){
				makeLayout_PopOut();
			} else {
				popIn();
				makeLayout_PopIn(nap);
			}
		} else {
			makeLayout_PopIn(nap);
		}

		loadPageContent();
		document.body.focus();
		// debug(">>> NAVIGATED - to " + _UI.navhere);
	}


	function update_NavPanels() {
		//debug("UPDATE_NAVPANELS");
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

	function popOut(){
		_UI.popout = window.open('', 'glyphr_popout');
		//debug("POPOUT - opened window, _UI.popout is " + _UI.popout);
		var pop = _UI.popout;
		var popdoc = _UI.popout.document;

		//debug("POPOUT - getting css:\n" + document.styleSheets[0]);

		// Init window properties
        popdoc.write('<!doctype html>'+
			'<html>'+
			'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
				'<title>Glyphr Studio - Canvas</title>'+
			'</head>'+
			'<body>'+
				'<div id="secondaryScreenLayout"><div id="mainwrapper"></div></div>'+
				'<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>'+
			'</body>'+
			'</html>');

		// Main Screen
		document.title = 'Glyphr Studio - Tools';
        document.body.classList.add('poppedOut');

        // Second Screen
        popdoc.head.appendChild(document.styleSheets[0].ownerNode.cloneNode(true));
		pop.onBeforeUnload = popIn;
        pop.clickTool = clickTool;
        pop.viewZoom = viewZoom;
        pop.setView = setView;
        pop.popIn = popIn;
        pop.toggleKeyboardTips = toggleKeyboardTips;
		popdoc.getElementById("mainwrapper").style.overflowY = "hidden";
		navigate();
	}

	function makeLayout_PopOut(){
		//debug("MAKELAYOUT_POPOUT - start");

		var pol = '<div id="popout_pagenav"></div>';
		pol += '<div id="popout_charchooser"></div>';
		pol += '<div id="popout_history"></div>';
		pol += '<div id="popout_layerchooser"></div>';
		pol += '<div id="popout_actions"></div>';
		pol += '<div id="popout_attributes"></div></td>';
		// but a save icon somewhere

		document.getElementById('primaryScreenLayout').innerHTML = pol;
		//debug("MAKELAYOUT_POPOUT primaryscreenlayout.innerhtml:\n" + document.getElementById('primaryScreenLayout').innerHTML);
		makeAndDraw_NavPanels_PopOut();
		//debug("MAKELAYOUT_POPOUT - end");
	}

	function makeAndDraw_NavPanels_PopOut(){
		//debug("MAKEANDDRAW_NAVPANELS_POPOUT");
		//debug("\t\t primaryscreenlayout.innerhtml:\n" + document.getElementById('primaryScreenLayout').innerHTML);

		document.getElementById('popout_pagenav').innerHTML = makePanel_PageNav();

		if(_UI.navhere == "character edit") {
			document.getElementById('popout_charchooser').innerHTML = makePanel_CharChooser();
			drawPanel_CharChooser();
		}
		if(_UI.navhere == "linked shapes") {
			document.getElementById('popout_charchooser').innerHTML = makePanel_LinkedShapeChooser();
			drawPanel_LinkedShapeChooser();
		}
		document.getElementById('popout_history').innerHTML = makePanel_History();

		document.getElementById('popout_layerchooser').innerHTML = makePanel_LayerChooser();
		drawPanel_LayerChooser();

		document.getElementById('popout_actions').innerHTML = makePanel_Actions(true);

		if(_UI.navhere == "test drive"){
			document.getElementById('popout_attributes').innerHTML = makePanel_TestDriveOptions();
		} else {
			document.getElementById('popout_attributes').innerHTML = makePanel_Attributes();
			if(_UI.navhere == "linked shapes") drawUsedinThumbs();
		}

		updateSaveIcon();
	}



//-------------------
// Layout - pop IN
//-------------------

	function popIn(){
		try { _UI.popout.close(); } catch (e) {}
        document.body.classList.remove("poppedOut");
		_UI.popout = false;
		navigate();
	}

	function makeLayout_PopIn(nap){
		// debug("MAKELAYOUT_POPIN");

		var pil = '<div id="mainwrapper"></div>';
		pil += '<div id="navarea_tabs" onMouseOver="mouseoutcec();"></div>';
		pil += '<div id="navarea_panel" onMouseOver="mouseoutcec();"></div>';
		document.getElementById('primaryScreenLayout').innerHTML = pil;

		mouseoutcec();

		var nh = _UI.navhere;

		if(nap){
			_UI.navprimaryhere = nap;
		} else {

			_UI.navprimaryhere = "npNav";
			if(nh==="character edit" || nh==="linked shapes" || nh==="import svg") _UI.navprimaryhere = "npChar";
			else if(nh==="test drive") _UI.navprimaryhere = "npAttributes";
		}

		// pages with redraw() call makeAndDraw_NavPanels_PopIn
		if(!(nh==="character edit" || nh==="linked shapes" || nh==="test drive")){
			makeAndDraw_NavPanels_PopIn();
			document.getElementById("mainwrapper").style.overflowY = "scroll";
		} else {
			document.getElementById("mainwrapper").style.overflowY = "hidden";
		}
	}

	function makeAndDraw_NavPanels_PopIn(){
		//debug("MAKEANDDRAW_NAVPANELS_POPIN - navhere:" + _UI.navhere + " navprimaryhere:" + _UI.navprimaryhere);

		document.getElementById("navarea_tabs").innerHTML = makePanel_NavTabs();
		updateSaveIcon();

		var nt = document.getElementById("navarea_panel");
		nt.innerHTML = "";

		if((_UI.navhere!=="character edit")&&(_UI.navhere!=="linked shapes")&&(_UI.navhere!=="test drive")&&(_UI.navhere!=="import svg")) {
				_UI.navprimaryhere = "npNav";
				nt.innerHTML = makePanel_PageNav();
				return;
		}

		switch(_UI.navprimaryhere){
			case "npNav":
				nt.innerHTML = makePanel_PageNav();
				break;

			case "npChar":
				if(_UI.navhere === "character edit") {
					nt.innerHTML = makePanel_CharChooser('selectChar');
					drawPanel_CharChooser();
				}
				if(_UI.navhere === "import svg"){
					nt.innerHTML = makePanel_CharChooser('importSVG_selectChar');
					drawPanel_CharChooser();
				}
				if(_UI.navhere === "linked shapes") {
					nt.innerHTML = makePanel_LinkedShapeChooser();
					drawPanel_LinkedShapeChooser();
				}
				break;

			case "npLayers":
				nt.innerHTML = makePanel_LayerChooser();
				drawPanel_LayerChooser();
				break;

			case "npAttributes":
				if(_UI.navhere === "test drive"){
					nt.innerHTML = makePanel_TestDriveOptions();
				} else {
					nt.innerHTML = makePanel_Attributes();
					nt.innerHTML += makePanel_Actions();
					if(_UI.navhere == "linked shapes") drawUsedinThumbs();
				}
				break;

			case "npHistory":
				nt.innerHTML = makePanel_History();
				break;
			case "npSave":
				saveGlyphrProjectFile();
				break;
		}
	}




//-------------------
// Shared stuff
//-------------------

	function getEditDocument(){
		if(_UI.popout){
			return _UI.popout.document;
		} else {
			return document;
		}
	}

	function loadPageContent(){
		switch(_UI.navhere){
			case "firstrun":			loadPage_firstrun();		break;
			case "font settings":		loadPage_fontsettings();	break;
			case "project settings":	loadPage_projectsettings();	break;
			case "open project":		loadPage_openproject();		break;
			case "export font":			loadPage_exportfont();		break;
			case "import svg":			loadPage_importsvg();		break;
			case "help":				loadPage_help();			break;
			case "about":				loadPage_about();			break;
			case "test drive":			loadPage_testdrive();		break;
			case "linked shapes":		loadPage_linkedshapes();	break;
			case "character edit":		loadPage_charedit();		break;
		}
	}

	function updateSaveIcon(){
		var fill = _UI.colors.g9;
		if(!_UI.projectsaved) fill = "white";
		document.getElementById('npSave').innerHTML = makeIcon({'name': 'button_npSave', 'color': fill, 'hovercolor':'white'});
	}


	function makePanel_NavTabs(){
		var navarr = [];
		navarr.push("npNav");

		if(_UI.navhere==="character edit"){
			navarr.push("npAttributes");
			navarr.push("npLayers");
			navarr.push("npChar");
			navarr.push("npHistory");
		}

		if(_UI.navhere==="linked shapes"){
			navarr.push("npAttributes");
			navarr.push("npChar");
			navarr.push("npHistory");
		}

		if(_UI.navhere==="test drive"){
			navarr.push("npAttributes");
		}

		if(_UI.navhere==="import svg"){
			navarr.push("npChar");
		}

		var newsub = "";
		var nfill = 'white';
		var nhover = 'white';

		if(_UI.navprimaryhere === 'npNav'){
			nfill = _UI.colors.accent;
			nhover = _UI.colors.accent;
		}

		newsub += "<button class='primarynavbutton' id='npNav' onclick='_UI.navprimaryhere=\"npNav\"; makeAndDraw_NavPanels_PopIn();'>";
		newsub += makeIcon({'name': 'button_npNav', 'color': nfill, 'hovercolor': nhover});
		newsub += "</button>";

		for(var i=1; i<navarr.length; i++){
			if(_UI.navprimaryhere == navarr[i]){
				nfill = _UI.colors.accent;
				nhover = _UI.colors.accent;
			} else {
				nfill = _UI.colors.g9;
				nhover = 'white';
			}
			newsub += "<button class='primarynavbutton' id='"+navarr[i]+"' onclick='_UI.navprimaryhere=\""+navarr[i]+"\"; makeAndDraw_NavPanels_PopIn();'>";
			newsub += makeIcon({'name': ('button_'+navarr[i]), 'color': nfill, 'hovercolor':nhover});
			newsub += "</button>";
		}

		newsub += "<button class='primarynavbutton' id='npSave' onclick='saveGlyphrProjectFile();'>";
		newsub += makeIcon({'name': 'button_npSave', 'color':_UI.colors.g9, 'hovercolor':'white'});
		newsub += "</button>";

		// Debug Dumps
		if(_UI.debug){
			newsub += "<div style='position:absolute; bottom:20px; left:10px;'>Console<br>Dump<br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='debug(_UI);'>UI</button><br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='debug(_GP.projectsettings);'>PS</button><br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='debug(_GP.opentypeproperties);'>OTP</button><br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='debug(_GP.fontchars);'>FC</button><br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='debug(_GP.linkedshapes);'>LS</button><br><br>";
			newsub += "<button class='buttonsel' style='width:50px; padding:0px; 4px;' onclick='console.clear();'>clear</button><br>";
			newsub += "</div>";
		}

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
		navarr.push("import svg");
		navarr.push("export font");
		navarr.push("_");
		navarr.push("help");
		navarr.push("about");
		navarr.push("_");
		navarr.push("bug");
		navarr.push("feat");

		var newsub = "<h1 class='paneltitle' style='margin-bottom:4px;'>Glyphr Studio</h1>";

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
				newsub += ("<button class='"+bc+"' onclick='_UI.navhere=\""+navarr[i]+"\"; _UI.selectedshape=-1; navigate();'>"+navarr[i]+"</button>");
			}
		}

		if(_UI.popout) {
			newsub += "<div class='popoutsave'>";
			newsub += "<button class='primarynavbutton' id='npSave' style='margin-left:12px;' onclick='saveGlyphrProjectFile();'></button>";
			newsub += "<button title='one screen mode' class='tool' style='background-color:transparent; position:relative; top:-15px;' onclick='popIn();'>"+makeToolButton({'name':'tool_popIn'})+"</button>";
			newsub += "</div>";
		}

		return newsub;
	}
