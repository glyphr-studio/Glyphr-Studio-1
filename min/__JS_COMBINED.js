
//------------------------------
// GLOBAL UI VARIABLES
//------------------------------
// These are NOT SAVED with the project

	var _UI = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npChar",
		"thisGlyphrStudioVersion" : "Beta 3.2 - 0.3.2.min",
		"projectsaved": true,
		"colors" : {
			"accent" :		"rgb(0,170,225)",	//os accent base color
			"accent_light": "rgb(165,222,240)",	//os light accent base color
			"offwhite" :	"rgb(250,252,255)",	// Off White
			"g9" :			"rgb(229,234,239)",	// 90% gray
			"g8" :			"rgb(204,209,214)",	// 80% gray
			"g7" :			"rgb(178,183,188)",	// 70% gray
			"g6" :			"rgb(153,158,163)",	// 60% gray
			"g5" :			"rgb(127,134,137)",	// 50% gray
			"g4" :			"rgb(102,107,112)",	// 40% gray
			"g3" :			"rgb(76,81,86)",	// 30% gray
			"g2" :			"rgb(51,56,61)",	// 20% gray
			"g1" :			"rgb(25,30,35)"		// 10% gray
		},

		// Shared edit pages
		"popout" : false,
		"selectedtool" : "pathedit",	// pathedit, shapemove, pantool, newrect, newoval, newpath
		"redrawing" : false,
		"thumbsize" : 50,
		"thumbgutter" : 5,
		"showgrid" : true,		// display the grid
		"showguides" : true,		// display guides
		"clipboardshape" : false,
		"chareditcanvas" : false,
		"chareditcanvassize" : 2000,			// How big the viewport canvas is
		"chareditctx" : false,
		"ishereghostcanvas" : false,
		"ishereghostctx" : false,
		"defaultview" : {
			"dx" : 200,		// X offset for the canvas origin
			"dy" : 500,		// Y offset for the canvas origin
			"dz" : 0.5,		// Zoom or scale of the canvas
		},
		"views" : {},	// Holds the unique views per char & linkedshape
		"thumbview" : {},

		// page: linked shapes
		"shownlinkedshape" : "id0",
		"linkedshapecurrstate" : {},
		"linkedshapeundoq" : [],

		// page: charedit
		"selectedchar" : 97,
		"selectedshape" : -1,
		"charundoq" : [],
		"charcurrstate" : {},
		"selectchardrawarr" : [],
		"shapelayers" : [],
		"debugpoints" : [false,false],
		"locid": 0,
		"locarr": [],
		"checkid": 0,
		"checkarr": [],

		// page: test drive
		"testdrivectx" : false,
		"testdrivecanvas" : false,
		"testdrive_fontscale" : 0,
		"testdrive_showcharbox" : false,
		"testdrive_showhorizontals" : false,
		"testdrive_padsize" : 10,

		// Saveas TTX
		"fontmetrics" : {
			"xmax" : 0,
			"xmin" : 0,
			"ymax" : 0,
			"ymin" : 0,
			"hhea_ascent" : 0,
			"hhea_descent" : 0
		},


		// default project properties
		// These WILL BE saved with the project, but stored in the global _GP variable
		"default_GP" : {
			"projectsettings": {
				"name": "My Font",
				"debug": true,				// global debug console switch
				"version": 0,				// console version
				"linkedshapecounter": 0,	// private counter for ss id

				// Grid stuff
				"upm": 1000,			// Units Per Em - (emsize) how tall normal cap letters are
				"ascent": 700,			// ascender
				"linegap": 250,
				"griddivisions": 10,	// how many squares of grid per emsize
				"xheight": 400,			// lowercase letter height
				"overshoot": 10,		// overshoot for round glyphs
				"defaultlsb": 10,		// default left space

				// UI stuff
				"pointsize" : 5,						// square points size - SHOULD BE ODD
				"spinnervaluechange" : 1,				// how much spinner controls change a value
				"stoppagenavigation" : false,			// asks to save on window close or refresh
				"quickpathupdating" : false,			// does not redraw path while drag resizing
				"showoutline" : false,					// outline shapes when drawing
				"showfill" : true,						// fill shapes when drawing
				"color_glyphfill" : "rgb(0,0,0)",		//shape base color
				"color_glyphoutline" : "rgb(0,0,0)",	//shape outline color
				"color_grid" : "rgb(240,240,240)",		//grid base color
				"color_guideline" : "rgb(204,79,34)"	//guide base color
			},

			"fontchars" : [],

			"linkedshapes" : {},

			"opentypeproperties" : {
				"head" : [
					{"key": "created", "val": "" },
					{"key": "fontRevision", "val": "1.0" }
				],
				"os_2": [
					{"key": "usWeightClass", "val": "500"},
					{"key": "usWidthClass", "val": "5"}
				],
				"name": [
					{"key": "Copyright notice", "val": ("Copyright " + new Date().getFullYear())},
					{"key": "Font Family name", "val": "My Font"},
					{"key": "Font Subfamily name", "val": ""},
					{"key": "Unique font identifier", "val": "My Font 1.0"},
					{"key": "Full Font name", "val": "My Font"},
					{"key": "Version string", "val": "Version 1.0"},
					{"key": "Postscript name", "val": "My Font"},
					null,
					{"key": "Manufacturer name", "val": ""},
					{"key": "Designer's name", "val": ""},
					{"key": "Description", "val": ""},
					{"key": "Vendor URL", "val": ""},
					{"key": "Designer's URL", "val": ""},
					{"key": "License Description", "val": "Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)"},
					{"key": "License URL", "val": "http://creativecommons.org/licenses/by-sa/3.0/"}
				],
				"post": [
					{"key": "italicAngle", "val": "0.0"},
					{"key": "underlinePosition", "val": "-75"},
					{"key": "underlineThickness", "val": "50"}
				],
				"cff": [
					{"key": "Notice", "val": ""},
					{"key": "FullName", "val": "My Font"},
					{"key": "FamilyName", "val": "My Font"},
					{"key": "Weight", "val": "500"},
				]
			}
		}
	};

	_UI.colors.text_dark = _UI.colors.g1;
	_UI.colors.text_light = _UI.colors.g8;
	_UI.colors.button_disabled = _UI.colors.g4;
	_UI.colors.button_resting = _UI.colors.g8;
	_UI.colors.button_selected = _UI.colors.accent;



/**
	MAIN FILE OF CONTROLORIZATION
**/


	function setup() {
		_GP = clone(_UI.default_GP);
		insertGlobalDOMElements();
		drawLogo();
		navigate();
		//debug("MAIN SETUP() - END");
	}



	function insertGlobalDOMElements(){

		var dialogbox = '<div id="dialog_box">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><input type="button" class="dialogCloseButton" value="&times;" onclick="closeDialog();"></td>' +
		'<td id="dialogRightContent"></td>' +
		'</tr></table></div>' +
		'<div id="dialog_bg" onclick="closeDialog();"></div>';

		var logocanvas = '<canvas id="logocanvas" height="60" width="190"><h3>Hey there!</h3>You\'ll need a modern browser that supports HTML5 in order for this to work.</canvas>';

		var ihgc = '<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';

		document.body.innerHTML = '<div id="primaryScreenLayout"></div>';
		document.body.innerHTML += dialogbox;
		document.body.innerHTML += logocanvas;
		document.body.innerHTML += ihgc;
	}



//-------------------
// Debug
//-------------------

	function debug(message, force){
		if(_GP.projectsettings.debug | force){ console.log(message); }
	}

	/*
	function stack(a){
		if(_GP.projectsettings.debug){
			console.log(Date.now()+"\t%c::function: " + a.callee.name + "("+a.length+")", "color:rgb(0,100,0)");
		}
	}
	*/



//-------------------
// Dialog Box
//-------------------
	function closeDialog(){
		document.getElementById('dialog_box').style.display='none';
		document.getElementById('dialog_bg').style.display='none';
		document.getElementById('dialogRightContent').innerHTML = "<b>Error: unspecified dialog box content.</b>";
		document.body.focus();
	}

	function openDialog(content){
		document.body.focus();
		document.getElementById('dialogRightContent').innerHTML = content;
		document.getElementById('dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}


//-------------------
// Project Saved Sate
//-------------------
	function setProjectAsSaved(){
		_UI.projectsaved = true;
		window.onbeforeunload = null;
		document.title = 'glyphr';
		updateSaveIcon();
	}

	function setProjectAsUnsaved(){

		_UI.projectsaved = false;

		if(_GP.projectsettings.stoppagenavigation){
			window.onbeforeunload = function() {
				return "\n\nUnless you specifically saved your data, all your progress will be lost.\n\n";
			};
		}

		document.title = 'glyphr ❖';
		updateSaveIcon();
	}


//-------------------
// Undo Queue
//-------------------
	function putundoq(calledfrom){
		var uqo = {};
		uqo.name = calledfrom;
		uqo.date = new Date().getTime();

		if(_UI.navhere == "character edit"){
			uqo.state = clone(_UI.charcurrstate);
			_UI.charundoq.push(uqo);
			_UI.charcurrstate = clone(_GP.fontchars);
		} else if (_UI.navhere == "linked shapes"){
			uqo.state = clone(_UI.linkcurrstate);
			_UI.linkedshapeundoq.push(uqo);
			_UI.linkcurrstate = clone(_GP.linkedshapes);
		}

		setProjectAsUnsaved();

		/*
		var uqdebug = "<b>Put Undo Queue</b><br>";
		for(var i=0; i<_UI.charundoq.length; i++){
			uqdebug += i + ". ";
			uqdebug += undoq[i].nav + " - ";
			uqdebug += undoq[i].name + "<br>";
		}
		//debug(uqdebug);
		*/
	}

	function pullundoq(){
		//debug("PULLUNDOQ - Undo Pressed, undoq: " + undoq);
		var uqo;

		if(_UI.navhere == "character edit"){
			if(_UI.charundoq.length > 0){
				uqo = _UI.charundoq.pop();
				_GP.fontchars = uqo.state;
				_UI.charcurrstate = clone(_GP.fontchars);
				redraw("pullundoq");
			}
		} else if (_UI.navhere == "linked shapes"){
			if(_UI.linkedshapeundoq.length > 0){
				uqo = _UI.linkedshapeundoq.pop();
				_GP.linkedshapes = uqo.state;
				_UI.linkcurrstate = clone(_GP.linkedshapes);
				redraw("pullundoq");
			}
		}

		if(_UI.charundoq.length === 0 && _UI.linkedshapeundoq.length === 0){
			setProjectAsSaved();
		}
	}


//-------------------
// JavaScript Prototypes
//-------------------
	// returns a full new copy of any object
	function clone(cobj){
		var newObj = (cobj instanceof Array) ? [] : {};
		for (var i in cobj) {
			if (cobj[i] && typeof cobj[i] == "object") {
				newObj[i] = clone(cobj[i]);
			} else newObj[i] = cobj[i];
		} return newObj;
	}

	// rounds a number to include a .5 so it draws nicely on canvas
	// true = +0.5, false = -0.5
	Number.prototype.makeCrisp = function(dir){
		var mul = dir? 1 : -1;
		return round(this) + (0.5 * mul);
	};


	function round(num, dec){
		dec = isval(dec)? dec : 0;

		return Number(Math.round(num+'e'+dec)+'e-'+dec);

		/*var na = num.toString().split(".");
		if(na.length == 2) {
			var right = na[1].substring(0,dec) + "." + na[1].substring(dec+1);
			right = round(right);
			num = ((na[0] + "." + right) * 1);
		}
		return (num*1);
		*/
	}

	// returns the length of an associative array
	function aalength(aa){
		var len = 0;
		for(var key in aa){	len++; }
		return len;
	}

	function strSan(val){
		return val.replace(/[<>'"\\]/g,"");
	}

	function isval(val){
		return ((typeof val !== "undefined") && (val !== null));
	}





//-------------------
// BUG EMAIL
//-------------------
	function sendBugEmail(){
		var dcon = "<h1>Report an issue</h1>";
		dcon += "Hey, sorry you ran into some wonky stuff!<br>Letting us know about your problem will help us fix it for everybody.<br>";
		dcon += "To send us an email, click the link below.<br><br>Thanks!<br><br><br>";
		dcon += "<a href='mailto:mail@glyphrstudio.com&subject=Issue%20Report&body="+genEmailContent()+"' class='button' style='padding:10px;' onclick='closeDialog();'>Send an issue email to the Glyphr team</a><br>";
		dcon += "<br>";
		openDialog(dcon);
	}

	function genEmailContent(){
		var con = "Sorry about the issue – so we can fix it, please explain step by step how to re-create the issue you ran into. If there was a JavaScript Error message or line number, include that too.%0A%0A%0A%0A";
		con += "Thank you!%0A%09The Glyphr Team%0A%0A";
		con += "___________________________________________%0A%0A";
		con += "Glyphr Studio Version %09%09" + _UI.thisGlyphrStudioVersion + "%0A";
		//con += "appCodeName %09%09" + navigator.appCodeName + "%0A";
		con += "appName %09%09" + navigator.appName + "%0A";
		//con += "appVersion %09%09" + navigator.appVersion + "%0A";
		con += "language %09%09" + navigator.language + "%0A";
		con += "platform %09%09" + navigator.platform + "%0A";
		con += "systemLanguage %09%09" + navigator.systemLanguage + "%0A";
		con += "userLanguage %09%09" + navigator.userLanguage + "%0A";
		con += "userAgent %09%09" + encodeURIComponent(navigator.userAgent) + "%0A";

		//debug(con);

		return con;
	}




//-------------------
// COLORS
//-------------------

	function shiftColor(c, percent, lighter){
		percent = Math.max(0,Math.min(percent,1));
		var val = {};

		if(c.charAt(0)=="#"){
			c = c.substring(1,7);
			val.r = parseInt(c.substring(0,2),16);
			val.g = parseInt(c.substring(2,4),16);
			val.b = parseInt(c.substring(4,6),16);
		} else if (c.substring(0,4) == "rgb("){
			c = c.split("(")[1].split(")")[0].split(",");
			val.r = c[0];
			val.g = c[1];
			val.b = c[2];
		} else {
			val.r = 0;
			val.g = 0;
			val.b = 0;
		}

		val.r = Math.max(0,Math.min(val.r,255));
		val.g = Math.max(0,Math.min(val.g,255));
		val.b = Math.max(0,Math.min(val.b,255));

		if(lighter){
			val.r = round(((255-(val.r*1))*percent)+(val.r*1));
			val.g = round(((255-(val.g*1))*percent)+(val.g*1));
			val.b = round(((255-(val.b*1))*percent)+(val.b*1));
		} else {
			val.r = round((val.r*1)-(val.r*percent));
			val.g = round((val.g*1)-(val.g*percent));
			val.b = round((val.b*1)-(val.b*percent));
		}

		return "rgb("+val.r+","+val.g+","+val.b+")";
	}//-------------------
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


	function popOut(){
		_UI.popout = window.open('', 'glyphr_popout');
		//debug("POPOUT - opened window, _UI.popout is " + _UI.popout);

		var popdoc = _UI.popout.document;

		// Init window properties
		_UI.popout.onBeforeUnload = popIn;
		popdoc.head.innerHTML = '<title>Glyphr Studio - Edit Canvas</title>'+
			'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
			'<link rel="icon" type="image/x-icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAEBSURBVDhPY/RbdPM/AwWACUqTDbC6IEpdkEFTkotBT5YbzL/0+CvD9effGJbdfA/mIwMMA5odpOEa67c9BtONXrJgGmRQ7YGnYDYMoBgAsjncTBSs8cLb71BRCDAQ5gQbtPLUaxSXoIQBSDNIAbpmEACJgeRAapABxYGIYgDMBpBz0QFIDN12EEAxAOQ3UECB/LoxVg2sCYRBbJj/0QELlIaDtZffgaMMFI3IoQ8Su/bmB5iPDFAMANkEA/6Lb0FZCACKJXSA4gWQTSBnYtMMCxeQGmSA4gKY0zdCoxPmZC0RDnAAwryCDDBSIsimYF0hMBs5KYMAKHzQ08hA50YGBgDfrn7dJSRJxAAAAABJRU5ErkJggg==">'+
			'<link rel="stylesheet" type="text/css" href="glyphr.css" />';
		popdoc.body.innerHTML = '<div id="secondaryScreenLayout"><div id="mainwrapper"></div></div>';
		popdoc.body.innerHTML += '<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';

		// Adjust current properties
		document.title = 'Glyphr Studio - Controls';

		//debug("POPOUT - finished and _UI.popout is " + _UI.popout);
		navigate();
	}

	function makeLayout_PopOut(){
		debug("MAKELAYOUT_POPOUT - start");

		var pol = '<div id="popout_pagenav"></div>';
		pol += '<div id="popout_charchooser"></div>';
		pol += '<div id="popout_layerchooser"></div>';
		pol += '<div id="popout_actions"><h1>ACTIONS</h1></div>';
		pol += '<div id="popout_attributes"></div></td>';
		// but a save icon somewhere

		document.getElementById('primaryScreenLayout').innerHTML = pol;
		//debug("MAKELAYOUT_POPOUT primaryscreenlayout.innerhtml:\n" + document.getElementById('primaryScreenLayout').innerHTML);
		makeAndDraw_NavPanels_PopOut();

		debug("MAKELAYOUT_POPOUT - end");
	}

	function makeAndDraw_NavPanels_PopOut(){
		debug("MAKEANDDRAW_NAVPANELS_POPOUT");
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

	function popIn(){
		_UI.popout = false;
		navigate();
	}

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
			case "help":				loadPage_help();			break;
			case "about":				loadPage_about();			break;
			case "test drive":			loadPage_testdrive();		break;
			case "linked shapes":		loadPage_linkedshapes();	break;
			case "character edit":		loadPage_charedit();		break;
		}
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

//------------------------------
// GLOBAL PROJECT VARIABLES
//------------------------------
// These ARE saved with the project

	var _GP = {};

	function setOTprop(tname, tkey, tval){
		if(_GP.opentypeproperties[tname]){
			var ot = _GP.opentypeproperties[tname];
			for(var i=0; i<ot.length; i++){
				//debug("SETOTPROP: checking " + ot[i].key + " == " + tkey);
				if(ot[i].key == tkey) {
					ot[i].val = tval;
					return;
				}
			}
			console.log("SETOTPROP ERROR: could not find " + tkey + " in " + tname);
		} else {
			console.log("SETOTPROP ERROR: could not find table" + tname);
		}
	}

	function getOTprop(tname, tkey){
		if(_GP.opentypeproperties[tname]){
			var ot = _GP.opentypeproperties[tname];
			for(var i=0; i<ot.length; i++){
				//debug("SETOTPROP: checking " + ot[i].key + " == " + tkey);
				if(ot[i].key == tkey) {
					return ot[i].val;
				}
			}
			console.log("GETOTPROP ERROR: could not find " + tkey + " in " + tname);
		} else {
			console.log("GETOTPROP ERROR: could not find table" + tname);
		}

		return "|| RETURN VALUE ERROR ||";
	}
//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){
		this.objtype = 'char';

		this.isautowide = isval(oa.isautowide)? oa.isautowide:true;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing:false;
		this.charwidth = isval(oa.charwidth)? oa.charwidth:0;
		this.charname = oa.charname || "ERROR_CHARNAME";
		this.charvalue = oa.charvalue || "ERROR_CHARVALUE";
		this.cmapcode = oa.cmapcode || "ERROR_CMAPCODE";

		//this.hints = oa.hints || {};
		//this.counters = oa.counters || {};
		this.charshapes = [];
		var lc = 0;
		var cs = 0;
		if(oa.charshapes && oa.charshapes.length){
			for(var i=0; i<oa.charshapes.length; i++) {
				if(oa.charshapes[i].link){
					//debug("CHAR - hydrating " + oa.charshapes[i].name);
					this.charshapes[i] = new LinkedShapeInstance(oa.charshapes[i]);
					lc++;
				} else {
					//debug("CHAR - hydrating " + oa.charshapes[i].name);
					this.charshapes[i] = new Shape(oa.charshapes[i]);
					cs++;
				}
			}
		}

		if(this.isautowide) this.calcCharWidth();
		//debug("CHAR - finished " + this.charname + "\tlinks:" + lc + "\tshapes:" + cs);
	}



//-------------------------------------------------------
// CHAR METHODS
//-------------------------------------------------------

	Char.prototype.calcCharMaxes = function(){

		var maxes = {
			"xmax" : this.charwidth,
			"xmin" : 0,
			"ymax" : 0,
			"ymin" : 0
		};
		var sh, tss;

		for(var jj=0; jj<this.charshapes.length; jj++) {
			sh = this.charshapes[jj];
			if(sh.link){
				tss = _GP.linkedshapes[sh.link].shape;
				if(sh.uselinkedshapexy) {
					maxes.xmin = Math.min(tss.path.leftx, maxes.xmin);
					maxes.ymax = Math.max(tss.path.topy, maxes.ymax);
					maxes.ymin = Math.min(tss.path.bottomy, maxes.ymin);
				} else {
					maxes.xmin = Math.min((tss.path.leftx + sh.xpos), maxes.xmin);
					maxes.ymax = Math.max((tss.path.topy + sh.ypos), maxes.ymax);
					maxes.ymin = Math.min((tss.path.bottomy + sh.ypos), maxes.ymin);
				}
			} else {
				maxes.xmin = Math.min(sh.path.leftx, maxes.xmin);
				maxes.ymax = Math.max(sh.path.topy, maxes.ymax);
				maxes.ymin = Math.min(sh.path.bottomy, maxes.ymin);
			}
		}

		return maxes;
	};

	Char.prototype.calcCharWidth = function(){
		if(!this.isautowide) return;
		//debug("CALCCHARWIDTH");
		this.charwidth = 0;
		var sh, tss;
		if(this.charshapes){
			for(var jj=0; jj<this.charshapes.length; jj++) {
				sh = this.charshapes[jj];
				if(sh.link){
					tss = _GP.linkedshapes[sh.link].shape;
					if(sh.uselinkedshapexy) {
						this.charwidth = Math.max(this.charwidth, tss.path.rightx);
					} else {
						this.charwidth = Math.max(this.charwidth, (tss.path.rightx + sh.xpos));
					}
				} else {
					this.charwidth = Math.max(this.charwidth, sh.path.rightx);
				}
			}
		}
	};

	Char.prototype.drawCharToArea = function(lctx, view){
		var ps = _GP.projectsettings;
		var sl = this.charshapes;
		var cc = this.getCharNumber();

		//debug("DRAWCHARTOAREA - starting " + cc);

		var width = (this.charwidth*view.dz);
		if(this.isautowide){
			//debug("---------------- for " + this.charname + " isautowide=false, adding left side bearing width " + (ps.defaultlsb*view.dz) + " to width " + width);
			if(this.leftsidebearing === false){
				width += (ps.defaultlsb * view.dz);
			} else {
				width += (this.leftsidebearing * view.dz);
			}
		}

		var sh = {};
		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			if(sh.visible) {
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
						//debug("DRAWCHARTOAREA - uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
					} else {
						var ns = clone(_GP.linkedshapes[sh.link].shape);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape before\n" + JSON.stringify(ns));
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
						sh = ns;
					}
				}
				//debug("DRAWCHARTOAREA - drawing path of char " + this.charname);
				sh.path.drawPathToArea(lctx, view);
			}
		}
		lctx.fillStyle = _GP.projectsettings.color_glyphfill;
		lctx.closePath();
		lctx.fill("nonzero");

		return width;
	};

	Char.prototype.getCharNumber = function(){ return parseInt(this.cmapcode.slice(2), 16); };

	function getCharFromText(c){
		if(c === " ") return _GP.fontchars[32];
		var tc;
		for(var num=0; num<_GP.fontchars.length; num++){
			tc = _GP.fontchars[num];
			if(tc && tc.charvalue === c) return tc;
		}
		console.error("GETCHARFROMTEXT - could not find " + c);
		return false;
	}

//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------
	function updateCurrentCharWidth() {
		if(_UI.navhere == 'character edit'){
			_GP.fontchars[_UI.selectedchar].calcCharWidth();
		} else if (_UI.navhere == 'linked shapes' && _GP.linkedshapes[_UI.shownlinkedshape]) {
			var lsarr = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) _GP.fontchars[lsarr[c]].calcCharWidth();
		}
	}

	function createNewFontcharsArray(){
		return [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
			new Char({"charname":"SPACE", "charvalue":"(space)", "cmapcode":"0x20", "isautowide":false, "charwidth":200}),
			new Char({"charname":"EXCLAMATION MARK", "charvalue":"!", "cmapcode":"0x21"}),
			new Char({"charname":"QUOTATION MARK", "charvalue":'"', "cmapcode":"0x22"}),
			new Char({"charname":"NUMBER SIGN", "charvalue":"#", "cmapcode":"0x23"}),
			new Char({"charname":"DOLLAR SIGN", "charvalue":"$", "cmapcode":"0x24"}),
			new Char({"charname":"PERCENT SIGN", "charvalue":"%", "cmapcode":"0x25"}),
			new Char({"charname":"AMPERSAND", "charvalue":"&", "cmapcode":"0x26"}),
			new Char({"charname":"APOSTROPHE", "charvalue":"'", "cmapcode":"0x27"}),
			new Char({"charname":"LEFT PARENTHESIS", "charvalue":"(", "cmapcode":"0x28"}),
			new Char({"charname":"RIGHT PARENTHESIS", "charvalue":")", "cmapcode":"0x29"}),
			new Char({"charname":"ASTERISK", "charvalue":"*", "cmapcode":"0x2a"}),
			new Char({"charname":"PLUS SIGN", "charvalue":"+", "cmapcode":"0x2b"}),
			new Char({"charname":"COMMA", "charvalue":",", "cmapcode":"0x2c"}),
			new Char({"charname":"HYPHEN-MINUS", "charvalue":"-", "cmapcode":"0x2d"}),
			new Char({"charname":"FULL STOP", "charvalue":".", "cmapcode":"0x2e"}),
			new Char({"charname":"SOLIDUS", "charvalue":"/", "cmapcode":"0x2f"}),
			new Char({"charname":"DIGIT ZERO", "charvalue":"0", "cmapcode":"0x30"}),
			new Char({"charname":"DIGIT ONE", "charvalue":"1", "cmapcode":"0x31"}),
			new Char({"charname":"DIGIT TWO", "charvalue":"2", "cmapcode":"0x32"}),
			new Char({"charname":"DIGIT THREE", "charvalue":"3", "cmapcode":"0x33"}),
			new Char({"charname":"DIGIT FOUR", "charvalue":"4", "cmapcode":"0x34"}),
			new Char({"charname":"DIGIT FIVE", "charvalue":"5", "cmapcode":"0x35"}),
			new Char({"charname":"DIGIT SIX", "charvalue":"6", "cmapcode":"0x36"}),
			new Char({"charname":"DIGIT SEVEN", "charvalue":"7", "cmapcode":"0x37"}),
			new Char({"charname":"DIGIT EIGHT", "charvalue":"8", "cmapcode":"0x38"}),
			new Char({"charname":"DIGIT NINE", "charvalue":"9", "cmapcode":"0x39"}),
			new Char({"charname":"COLON", "charvalue":":", "cmapcode":"0x3a"}),
			new Char({"charname":"SEMICOLON", "charvalue":";", "cmapcode":"0x3b"}),
			new Char({"charname":"LESS-THAN SIGN", "charvalue":"<", "cmapcode":"0x3c"}),
			new Char({"charname":"EQUALS SIGN", "charvalue":"=", "cmapcode":"0x3d"}),
			new Char({"charname":"GREATER-THAN SIGN", "charvalue":">", "cmapcode":"0x3e"}),
			new Char({"charname":"QUESTION MARK", "charvalue":"?", "cmapcode":"0x3f"}),
			new Char({"charname":"COMMERCIAL AT", "charvalue":"@", "cmapcode":"0x40"}),
			new Char({"charname":"LATIN CAPITAL LETTER A", "charvalue":"A", "cmapcode":"0x41"}),
			new Char({"charname":"LATIN CAPITAL LETTER B", "charvalue":"B", "cmapcode":"0x42"}),
			new Char({"charname":"LATIN CAPITAL LETTER C", "charvalue":"C", "cmapcode":"0x43"}),
			new Char({"charname":"LATIN CAPITAL LETTER D", "charvalue":"D", "cmapcode":"0x44"}),
			new Char({"charname":"LATIN CAPITAL LETTER E", "charvalue":"E", "cmapcode":"0x45"}),
			new Char({"charname":"LATIN CAPITAL LETTER F", "charvalue":"F", "cmapcode":"0x46"}),
			new Char({"charname":"LATIN CAPITAL LETTER G", "charvalue":"G", "cmapcode":"0x47"}),
			new Char({"charname":"LATIN CAPITAL LETTER H", "charvalue":"H", "cmapcode":"0x48"}),
			new Char({"charname":"LATIN CAPITAL LETTER I", "charvalue":"I", "cmapcode":"0x49"}),
			new Char({"charname":"LATIN CAPITAL LETTER J", "charvalue":"J", "cmapcode":"0x4a"}),
			new Char({"charname":"LATIN CAPITAL LETTER K", "charvalue":"K", "cmapcode":"0x4b"}),
			new Char({"charname":"LATIN CAPITAL LETTER L", "charvalue":"L", "cmapcode":"0x4c"}),
			new Char({"charname":"LATIN CAPITAL LETTER M", "charvalue":"M", "cmapcode":"0x4d"}),
			new Char({"charname":"LATIN CAPITAL LETTER N", "charvalue":"N", "cmapcode":"0x4e"}),
			new Char({"charname":"LATIN CAPITAL LETTER O", "charvalue":"O", "cmapcode":"0x4f"}),
			new Char({"charname":"LATIN CAPITAL LETTER P", "charvalue":"P", "cmapcode":"0x50"}),
			new Char({"charname":"LATIN CAPITAL LETTER Q", "charvalue":"Q", "cmapcode":"0x51"}),
			new Char({"charname":"LATIN CAPITAL LETTER R", "charvalue":"R", "cmapcode":"0x52"}),
			new Char({"charname":"LATIN CAPITAL LETTER S", "charvalue":"S", "cmapcode":"0x53"}),
			new Char({"charname":"LATIN CAPITAL LETTER T", "charvalue":"T", "cmapcode":"0x54"}),
			new Char({"charname":"LATIN CAPITAL LETTER U", "charvalue":"U", "cmapcode":"0x55"}),
			new Char({"charname":"LATIN CAPITAL LETTER V", "charvalue":"V", "cmapcode":"0x56"}),
			new Char({"charname":"LATIN CAPITAL LETTER W", "charvalue":"W", "cmapcode":"0x57"}),
			new Char({"charname":"LATIN CAPITAL LETTER X", "charvalue":"X", "cmapcode":"0x58"}),
			new Char({"charname":"LATIN CAPITAL LETTER Y", "charvalue":"Y", "cmapcode":"0x59"}),
			new Char({"charname":"LATIN CAPITAL LETTER Z", "charvalue":"Z", "cmapcode":"0x5a"}),
			new Char({"charname":"LEFT SQUARE BRACKET", "charvalue":"[", "cmapcode":"0x5b"}),
			new Char({"charname":"REVERSE SOLIDUS", "charvalue":"\\", "cmapcode":"0x5c"}),
			new Char({"charname":"RIGHT SQUARE BRACKET", "charvalue":"]", "cmapcode":"0x5d"}),
			new Char({"charname":"CIRCUMFLEX ACCENT", "charvalue":"^", "cmapcode":"0x5e"}),
			new Char({"charname":"LOW LINE", "charvalue":"_", "cmapcode":"0x5f"}),
			new Char({"charname":"GRAVE ACCENT", "charvalue":"`", "cmapcode":"0x60"}),
			new Char({"charname":"LATIN SMALL LETTER A", "charvalue":"a", "cmapcode":"0x61"}),
			new Char({"charname":"LATIN SMALL LETTER B", "charvalue":"b", "cmapcode":"0x62"}),
			new Char({"charname":"LATIN SMALL LETTER C", "charvalue":"c", "cmapcode":"0x63"}),
			new Char({"charname":"LATIN SMALL LETTER D", "charvalue":"d", "cmapcode":"0x64"}),
			new Char({"charname":"LATIN SMALL LETTER E", "charvalue":"e", "cmapcode":"0x65"}),
			new Char({"charname":"LATIN SMALL LETTER F", "charvalue":"f", "cmapcode":"0x66"}),
			new Char({"charname":"LATIN SMALL LETTER G", "charvalue":"g", "cmapcode":"0x67"}),
			new Char({"charname":"LATIN SMALL LETTER H", "charvalue":"h", "cmapcode":"0x68"}),
			new Char({"charname":"LATIN SMALL LETTER I", "charvalue":"i", "cmapcode":"0x69"}),
			new Char({"charname":"LATIN SMALL LETTER J", "charvalue":"j", "cmapcode":"0x6a"}),
			new Char({"charname":"LATIN SMALL LETTER K", "charvalue":"k", "cmapcode":"0x6b"}),
			new Char({"charname":"LATIN SMALL LETTER L", "charvalue":"l", "cmapcode":"0x6c"}),
			new Char({"charname":"LATIN SMALL LETTER M", "charvalue":"m", "cmapcode":"0x6d"}),
			new Char({"charname":"LATIN SMALL LETTER N", "charvalue":"n", "cmapcode":"0x6e"}),
			new Char({"charname":"LATIN SMALL LETTER O", "charvalue":"o", "cmapcode":"0x6f"}),
			new Char({"charname":"LATIN SMALL LETTER P", "charvalue":"p", "cmapcode":"0x70"}),
			new Char({"charname":"LATIN SMALL LETTER Q", "charvalue":"q", "cmapcode":"0x71"}),
			new Char({"charname":"LATIN SMALL LETTER R", "charvalue":"r", "cmapcode":"0x72"}),
			new Char({"charname":"LATIN SMALL LETTER S", "charvalue":"s", "cmapcode":"0x73"}),
			new Char({"charname":"LATIN SMALL LETTER T", "charvalue":"t", "cmapcode":"0x74"}),
			new Char({"charname":"LATIN SMALL LETTER U", "charvalue":"u", "cmapcode":"0x75"}),
			new Char({"charname":"LATIN SMALL LETTER V", "charvalue":"v", "cmapcode":"0x76"}),
			new Char({"charname":"LATIN SMALL LETTER W", "charvalue":"w", "cmapcode":"0x77"}),
			new Char({"charname":"LATIN SMALL LETTER X", "charvalue":"x", "cmapcode":"0x78"}),
			new Char({"charname":"LATIN SMALL LETTER Y", "charvalue":"y", "cmapcode":"0x79"}),
			new Char({"charname":"LATIN SMALL LETTER Z", "charvalue":"z", "cmapcode":"0x7a"}),
			new Char({"charname":"LEFT CURLY BRACKET", "charvalue":"{", "cmapcode":"0x7b"}),
			new Char({"charname":"VERTICAL LINE", "charvalue":"|", "cmapcode":"0x7c"}),
			new Char({"charname":"RIGHT CURLY BRACKET", "charvalue":"}", "cmapcode":"0x7d"}),
			new Char({"charname":"TILDE", "charvalue":"~", "cmapcode":"0x7e"})
		];
	}

//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------

	function Coord(oa){
		this.objtype = "coord";

		this.x = oa.x || 0;
		this.y = oa.y || 0;
		this.xlock = oa.xlock || false;
		this.ylock = oa.yllock || false;
	}
//-------------------------------------------------------
// LINKED SHAPE OBJECT
//-------------------------------------------------------

	function LinkedShape(oa){
		this.objtype = "linkedshape";

		this.shape = (oa && oa.shape)? new Shape(oa.shape) : new Shape({"name":"New Linked Shape"});
		this.usedin = oa.usedin || [];
	}



//-------------------------------------------------------
// LINKED SHAPE INSTANCE OBJECT
//-------------------------------------------------------

	function LinkedShapeInstance(oa){
		this.objtype = "linkedshapeinstance";

		this.link = oa.link || getFirstLinkedShape();
		this.uselinkedshapexy = (isval(oa.uselinkedshapexy)? oa.uselinkedshapexy : true);

		this.name = oa.name || "new linkedshape instance";
		this.xpos = oa.xpos || 0;
		this.ypos = oa.ypos || 0;
		this.xlock = isval(oa.xlock)? oa.xlock : false;
		this.ylock = isval(oa.ylock)? oa.ylock : false;
		this.visible = isval(oa.visible)? oa.visible : true;

		// shape settings that don't apply to linkedshapeinstance
		this.path = false;
		this.hlock = false;
		this.wlock = false;

		//debug("LINKEDSHAPEINSTANCE - end");
	}



//-------------------------------------------------------
// LINKED SHAPE INSTANCE METHODS
//-------------------------------------------------------


//	Insert Linked Shape
	function insertLinkedShapeDialog(){
		if(aalength(_GP.linkedshapes)>0){
			var content = "Choose a Linked Shape to insert as a layer in this character:";
			content += generateSSThumbs();
			content += "<div style='display:block;'><input type='button' class='button' value='cancel' onclick='closeDialog();'></div>";
			openDialog(content);
			drawSSThumbs();
		} else {
			openDialog("<div class='dialoglargetext'>No Linked Shapes exist.  First, create some Linked Shapes, then you can insert them into characters.</div>");
		}
	}

	function insertLinkedShape(ssid){
		//debug("INSERTLINKEDSHAPE - adding linked shape (id) " + ssid + " to char (id) " + _UI.selectedchar);
		var ns = new LinkedShapeInstance({"link":ssid, "xpos":100, "ypos":100});

		//debug("INSERT LINKED SHAPE - JSON: \t" + JSON.stringify(ns));
		addShape(ns);

		_GP.fontchars[_UI.selectedchar].calcCharWidth();

		addToUsedIn(ssid, _UI.selectedchar);

		closeDialog();
		putundoq("insert linked shape from charedit");
		redraw("insertLinkedShape");
	}

	function generateSSThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		for(var ssid in _GP.linkedshapes){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas class='ssthumb' id='thumb"+ssid+"' onclick='insertLinkedShape(\""+ssid+"\");' height="+_UI.thumbsize+"' width="+_UI.thumbsize+"></canvas>";
			re += "</td></tr><tr><td>";
			re += _GP.linkedshapes[ssid].shape.name;
			re += "</td></tr></table>";
			//debug("GENERATESSTHUMBS - created canvas 'thumb"+ssid+"'");
		}
		re += "</div>";
		return re;
	}

	function drawSSThumbs(){
		var tctx = {};
		for(var ssid in _GP.linkedshapes){
			tctx = document.getElementById(("thumb"+ssid)).getContext("2d");
			//debug("DRAWSSTHUMBS - factor: " + factor + " yoffset: " + yoffset);
			_GP.linkedshapes[ssid].shape.drawShapeToArea(tctx, _UI.thumbview);
			//debug("DRAWSSTHUMBS - drawCharToArea canvas 'thumb"+ssid+"'");
		}
	}


//	UsedIn Array Stuff
	function addToUsedIn(ssid, charid){
		//debug("ADDTOUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = _GP.linkedshapes[ssid].usedin;
		uia.push(""+charid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(ssid, charid){
		//debug("REMOVEFROMUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = _GP.linkedshapes[ssid].usedin;
		var charindex = uia.indexOf(""+charid);
		if(charindex != -1){
			uia.splice(charindex, 1);
		}

	}


//	Detials
	function linkedShapeInstanceDetails(s){
		//debug("LINKEDSHAPEINSTANCEDETAILS - start of function");
		content = "<tr><td colspan=3><h3>linked shape</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> name </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().name = this.value; putundoq(\"shape name\"); redraw(\"linkedShapeInstanceDetails\");'></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use linked shape position</td><td>"+checkUI("ss().uselinkedshapexy="+!s.uselinkedshapexy+"; putundoq(\"use linked shape position\"); redraw(\"linkedShapeInstanceDetails\");", s.uselinkedshapexy)+"</td></tr>";
		if(!s.uselinkedshapexy){
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><h3 style='font-size:.9em; color:rgb(153,158,163);'>x & y values are relative to the linked shape position</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; x </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.xpos + "' onchange='ss().xpos = (this.value*1); putundoq(\"linkedshape xpos\"); redraw(\"linkedShapeInstanceDetails\");'>"+spinner()+"</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; y </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.ypos + "' onchange='ss().ypos = (this.value*1); putundoq(\"linkedshape ypos\"); redraw(\"linkedShapeInstanceDetails\");'>"+spinner()+"</td></tr>";
		}
		content += "<tr><td class='leftcol'>&nbsp;</td><td> linked shape name </td><td>" + _GP.linkedshapes[s.link].shape.name + "</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><input type='button' class='button' value='edit this linked shape' onclick='goToEditLinkedShape(\""+s.link+"\");'/></td></tr>";
		return content;
	}

	function goToEditLinkedShape(ssid){
		_UI.shownlinkedshape = ssid;
		_UI.navhere = "linked shapes";
		navigate();
	}

	function clickSelectLinkedShape(x,y){
		//debug("CLICKSELECTLinkedShape() - checking x:" + x + " y:" + y);

		if(_GP.linkedshapes[_UI.shownlinkedshape].shape.isHere(x,y)){
			_UI.selectedshape = _UI.shownlinkedshape;
			//debug("CLICKSELECTLinkedShape() - selecting shape " + _UI.shownlinkedshape);

			_UI.navprimaryhere = 'npAttributes';
			return true;
		}

		_UI.selectedshape = -1;
		//debug("CLICKSELECTLinkedShape() - deselecting, setting to -1");

		return false;
	}


//	---------------------------
//	Linked Shape Paridy Functions
//	---------------------------
	LinkedShapeInstance.prototype.drawShape_Stack = function(lctx){
		//debug("DRAWLINKEDSHAPE on \n " + JSON.stringify(this));
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_GP.linkedshapes[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	};

	LinkedShapeInstance.prototype.drawShape_Single = function(lctx){
		//debug("DRAWLINKEDSHAPE");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_GP.linkedshapes[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	};

	LinkedShapeInstance.prototype.genPostScript = function(lastx, lasty){
		//debug("GENLINKEDPOSTSCRIPT");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			return _GP.linkedshapes[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	};

	LinkedShapeInstance.prototype.drawShapeToArea = function(lctx, view){
		//debug("DRAWLINKEDSHAPETOAREA - size/offsetx/offsety: " + size +"/"+ offsetX +"/"+ offsetY);
		if(this.uselinkedshapexy){
			//debug("--------------------- uselinkedshapexy=true, calling drawShapeToArea for linkedshape.");
			_GP.linkedshapes[this.link].shape.drawShapeToArea(lctx, view);
		} else {
			//debug("--------------------- uselinkedshapexy=false, calling updatepathposition with FORCE.");
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += " HAS BEEN MOVED";
			ns.drawShapeToArea(lctx, view);
		}
	};

	LinkedShapeInstance.prototype.drawSelectOutline = function(onlycenter){
		//_GP.linkedshapes[this.link].shape.drawSelectOutline();

		if(this.uselinkedshapexy){
			_GP.linkedshapes[this.link].shape.drawSelectOutline(onlycenter);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.drawSelectOutline(onlycenter);
		}
	};

	LinkedShapeInstance.prototype.draw8points = function(onlycenter){
		//_GP.linkedshapes[this.link].shape.draw8points(onlycenter);
	};

	LinkedShapeInstance.prototype.isHere = function(x,y){
		//debug("ISLINKEDSHAPEHERE - checking " + x + "," + y);
		if(this.uselinkedshapexy){
			return _GP.linkedshapes[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	};

	LinkedShapeInstance.prototype.isOverHandle = function(){ return false; };



//	------------------------------
//	Generic Linked Shape Functions
//	------------------------------

	function getFirstLinkedShape(){
		for(var ssid in _GP.linkedshapes){
			return ssid;
		}

		return "[ERROR] - LINKEDSHAPES array has zero keys";
	}

	function generateNewSSID(){
		_GP.projectsettings.linkedshapecounter++;
		return ("id"+_GP.projectsettings.linkedshapecounter);
	}
//  -----------------------------------
//  PATH OBJECT
//  -----------------------------------

	function Path(oa){
		this.objtype = "path";

		//debug("NEW PATH: oa = \n" + JSON.stringify(oa));

		// declare attributes
		this.pathpoints = false;
		if(oa.pathpoints && oa.pathpoints.length){
			this.pathpoints = [];
			//debug("NEW PATH : Hydrating Path Points, length " + oa.pathpoints.length);
			for (var i = 0; i < oa.pathpoints.length; i++) {
				this.pathpoints[i] = new PathPoint(oa.pathpoints[i]);
			}
		}
		this.clockwise = isval(oa.clockwise)? oa.clockwise : findClockwise(this.pathpoints);
		// internal
		this.topy = isval(oa.topy)? oa.topy : -1;
		this.bottomy = isval(oa.bottomy)? oa.bottomy : -1;
		this.leftx = isval(oa.leftx)? oa.leftx : -1;
		this.rightx = isval(oa.rightx)? oa.rightx : -1;

		// Setup the object
		this.selectPathPoint(false);
		if(this.pathpoints) this.calcMaxes();

		//debug("Path() - created new path: " + this.pathpoints);
	}




//  -----------------------------------
//  PATH METHODS
//  -----------------------------------


	// Selected Point - returns the selected point object
	Path.prototype.sp = function(wantindex, calledby){
		//debug("SP - Called By : " + calledby);

		if(!this.pathpoints) {
			//debug("SP - returning false, this.pathpoints = " + JSON.stringify(this.pathpoints));
			return false;
		}

		for(var p=0; p<this.pathpoints.length; p++){
			var thisp = this.pathpoints[p];
			if(thisp.selected){
				if(wantindex){
					return p;
				} else {
					return thisp;
				}
			}
		}

		return false;
	};

	Path.prototype.drawPath = function(lctx) {
		//if(lctx == _UI.chareditctx)	debug("DRAWPATH");

		if(this.pathpoints === false || this.pathpoints.length < 2) return;
		var pp, np, pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy;

		lctx.moveTo(sx_cx(this.pathpoints[0].P.x), sy_cy(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			pp = this.pathpoints[cp];
			np = this.pathpoints[(cp+1) % this.pathpoints.length];

			/*
			if(lctx == _UI.chareditctx)	{
				debug("  point " + cp);
				debug("\n  pp\n" + JSON.stringify(pp));
				debug("  np\n" + JSON.stringify(np));
			}
			*/

			if(pp.type == "symmetric") { pp.makeSymmetric("H1"); }
			else if (pp.type == "flat") { pp.makeFlat("H1"); }

			pph2x = (pp.useh2? sx_cx(pp.H2.x) : sx_cx(pp.P.x));
			pph2y = (pp.useh2? sy_cy(pp.H2.y) : sy_cy(pp.P.y));
			nxh1x = (np.useh1? sx_cx(np.H1.x) : sx_cx(np.P.x));
			nxh1y = (np.useh1? sy_cy(np.H1.y) : sy_cy(np.P.y));
			nxppx = sx_cx(np.P.x);
			nxppy = sy_cy(np.P.y);

			//if(lctx == _UI.chareditctx)	debug("  curve " + pph2x +" "+ pph2y +" "+ nxh1x +" "+ nxh1y +" "+ nxppx +" "+ nxppy);
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy);
		}
	};

	Path.prototype.drawPathToArea = function(lctx, view){
		var tempv = clone(getView("Path.drawPathToArea"));
		setView(view);
		this.drawPath(lctx);

		setView(tempv);
	};

	Path.prototype.genPathPostScript = function(lastx, lasty){
		if(!this.pathpoints) return {"re":"", "lastx":lastx, "lasty":lasty};

		var p1, p2, p1h2x, p1h2y, p2h1x, p2h1y, p2ppx, p2ppy;
		var trr = "";

		var re = "" + (this.pathpoints[0].P.x - lastx) + " " + (this.pathpoints[0].P.y - lasty) + " rmoveto ";

		//debug("GENPATHPOSTSCRIPT:\n\t " + re);

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			p2 = this.pathpoints[(cp+1) % this.pathpoints.length];

			p1h2x = p1.useh2? (p1.H2.x - p1.P.x) : 0;
			p1h2y = p1.useh2? (p1.H2.y - p1.P.y) : 0;
			p2h1x = p2.useh1? (p2.H1.x - (p1.useh2? p1.H2.x : p1.P.x)) : (p2.P.x - (p1.useh2? p1.H2.x : p1.P.x));
			p2h1y = p2.useh1? (p2.H1.y - (p1.useh2? p1.H2.y : p1.P.y)) : (p2.P.y - (p1.useh2? p1.H2.y : p1.P.y));
			p2ppx = (p2.P.x - (p2.useh1? p2.H1.x : p2.P.x));
			p2ppy = (p2.P.y - (p2.useh1? p2.H1.y : p2.P.y));

			trr = "\t\t\t\t" + p1h2x + " " + p1h2y + " " + p2h1x + " " + p2h1y + " " + p2ppx + " " + p2ppy + " rrcurveto \n";

			//debug("\t " + trr);

			re += trr;
		}

		return {
			"re" : re,
			"lastx" : p2.P.x,
			"lasty" : p2.P.y
			};
	};

	Path.prototype.isOverControlPoint = function(x, y){
		var a = this.pathpoints;
		var hp = _GP.projectsettings.pointsize/getView("Path.isOverControlPoint").dz;

		for(var k=a.length-1; k>=0; k--){
			if( ((a[k].P.x+hp) > x) && ((a[k].P.x-hp) < x) && ((a[k].P.y+hp) > y) && ((a[k].P.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning P1, selectedpoint: " + k);
				return 'P';
			}

			if( ((a[k].H1.x+hp) > x) && ((a[k].H1.x-hp) < x) && ((a[k].H1.y+hp) > y) && ((a[k].H1.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning H1, selectedpoint: " + k);
				return 'H1';
			}

			if( ((a[k].H2.x+hp) > x) && ((a[k].H2.x-hp) < x) && ((a[k].H2.y+hp) > y) && ((a[k].H2.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning H2, selectedpoint: " + k);
				return 'H2';
			}
		}

		this.selectPathPoint(0);
		//debug("ISOVERCONTROLPOINT() - Returning FALSE");
		return false;
	};

	Path.prototype.updatePathSize = function(dw, dh){
		//debug("UPDATEPATHSIZE - Change Size: dw/dh "+dw+" , "+dh);

		var ps = _GP.projectsettings;

		var s = ss("updatePathPosition");
		dw = s.wlock? 0 : false;
		dh = s.hlock? 0 : false;

		if(s.wlock && s.hlock) return;

		var oldw = this.rightx - this.leftx;
		var oldh = this.topy - this.bottomy;
		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x =   round( ((pp.P.x  - this.leftx) * ratiodw) + this.leftx  );
			pp.H1.x =  round( ((pp.H1.x - this.leftx) * ratiodw) + this.leftx  );
			pp.H2.x =  round( ((pp.H2.x - this.leftx) * ratiodw) + this.leftx  );
			pp.P.y =   round( ((pp.P.y  - this.bottomy) * ratiodh) + this.bottomy  );
			pp.H1.y =  round( ((pp.H1.y - this.bottomy) * ratiodh) + this.bottomy  );
			pp.H2.y =  round( ((pp.H2.y - this.bottomy) * ratiodh) + this.bottomy  );
		}

		this.calcMaxes();
	};

	Path.prototype.updatePathPosition = function(dx, dy, force){
		force = isval(force)? force : false;
		//debug("UPDATEPATHPOSITION - dx,dy,force "+dx+","+dy+","+force+" - pathpoints length: " + this.pathpoints.length);

		for(var d=0; d<this.pathpoints.length; d++){
			var pp = this.pathpoints[d];
			//debug("-------------------- pathPoint #" + d);
			pp.updatePointPosition("P",dx,dy,force);
		}

		this.calcMaxes();
	};

	function findClockwise(parr){
		var j,k,z;
		var count = 0;

		if (parr.length < 3) return 0;

		for (var i=0; i<parr.length; i++) {
			j = (i + 1) % parr.length;
			k = (i + 2) % parr.length;
			z  = (parr[j].P.x - parr[i].P.x) * (parr[k].P.y - parr[j].P.y);
			z -= (parr[j].P.y - parr[i].P.y) * (parr[k].P.x - parr[j].P.x);

			if (z < 0) count--;
			else if (z > 0) count++;
		}

		// negative = clockwise
		// positive = counterclockwise

		//debug("FINDCLOCKWISE returning " + count);
		return count;
	}

	Path.prototype.reversePath = function(){
		var HT = {};
		if(this.pathpoints){
			for (var i = 0; i < this.pathpoints.length; i++) {
				HT = this.pathpoints[i].H1;
				this.pathpoints[i].H1 = this.pathpoints[i].H2;
				this.pathpoints[i].H2 = HT;
				if(this.pathpoints[i].useh1 !== this.pathpoints[i].useh2){
					this.pathpoints[i].useh1 = !this.pathpoints[i].useh1;
					this.pathpoints[i].useh2 = !this.pathpoints[i].useh2;
				}
			}
			this.pathpoints.reverse();
			this.clockwise *= -1;
		}
	};

	Path.prototype.flipNS = function(){
		var ly = this.topy;
		var lx = this.leftx;

		var mid = ((this.topy - this.bottomy)/2)+this.bottomy;
		//debug("FLIPNS - calculating mid: (b-t)/2 + t = mid: " + this.bottomy +","+ this.topy + ","+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}

		this.setTopY(ly);
		this.setLeftX(lx);

		this.reversePath();
	};

	Path.prototype.flipEW = function(){
		var ly = this.topy;
		var lx = this.leftx;

		var mid = ((this.rightx - this.leftx)/2)+this.leftx;
		//debug("flipEW - calculating mid: (b-t)/2 + t = mid: " + this.rightx +","+ this.leftx +","+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}

		this.setTopY(ly);
		this.setLeftX(lx);

		this.reversePath();
	};

	Path.prototype.setTopY = function(newvalue){
		var delta = ((newvalue*1) - ss("setTopY").path.topy);
		this.updatePathPosition(0,delta,true);
	};

	Path.prototype.setLeftX = function(newvalue){
		var delta = ((newvalue*1) - ss("SetLeftX").path.leftx);
		this.updatePathPosition(delta,0,true);
	};

	Path.prototype.addPathPoint = function(newpp, addtostart){
		//debug("ADDPATHPOINT - new point? " + newpp);

		if(!newpp) {
			// No pathpoint passed to function - make a new one
			newpp = new PathPoint({});

			if(addtostart){
				//Adds new pathpoint to start of path
				if(this.pathpoints.length > 0){
					var firstpp = this.pathpoints[0];

					newpp.P.x = firstpp.P.x-200;
					newpp.P.y = firstpp.P.y-200;
					newpp.H1.x = newpp.P.x;
					newpp.H1.y = newpp.P.y-100;
					newpp.H2.x = newpp.P.x+100;
					newpp.H2.y = newpp.P.y;
				}

				this.pathpoints.unshift(newpp);
				this.selectPathPoint(0);
			} else {
				// Adds new pathpoint to end of path
				if(this.pathpoints.length > 0){
					var lastpp = this.pathpoints[this.pathpoints.length-1];

					newpp.P.x = lastpp.P.x+200;
					newpp.P.y = lastpp.P.y+200;
					newpp.H1.x = newpp.P.x;
					newpp.H1.y = newpp.P.y-100;
					newpp.H2.x = newpp.P.x+100;
					newpp.H2.y = newpp.P.y;
				}

				this.pathpoints.push(newpp);
				this.selectPathPoint(this.pathpoints.length-1);
			}
		} else {
			// Function was passed a new path point
			this.pathpoints.push(newpp);
			this.selectPathPoint(this.pathpoints.length-1);
		}

		this.calcMaxes();
	};

	Path.prototype.insertPathPoint = function() {

		var p1i = this.sp(true, "insert path point");
		var p1 = (p1i === false ? this.pathpoints[0] : this.pathpoints[p1i]);

		if(this.pathpoints.length > 1){
			var p2 = this.pathpoints[(p1i+1)%this.pathpoints.length];

			var newPx = (p1.P.x*0.125) + (p1.H2.x*0.375) + (p2.H1.x*0.375) + (p2.P.x*0.125);
			var newPy = (p1.P.y*0.125) + (p1.H2.y*0.375) + (p2.H1.y*0.375) + (p2.P.y*0.125);

			var newpp = new PathPoint({"P":new Coord({"x":newPx, "y":newPy}), "type":"flat"});
			// Handles (tangents)

			var newH2x = ((p2.H1.x - p2.P.x) / 2) + p2.P.x;
			var newH2y = ((p2.P.y - p2.H1.y) / 2) + p2.H1.y;

			//debug("INSERTPATHPOINT - before makepointedto " + JSON.stringify(newpp));

			newpp.makePointedTo(newH2x, newH2y, 100);
			var tempH2 = newpp.H2;
			newpp.H2 = newpp.H1;
			newpp.H1 = tempH2;
			newpp.makeSymmetric("H2");

			//debug("INSERTPATHPOINT - afters makepointedto " + JSON.stringify(newpp));


			this.pathpoints.splice((p1i+1)%this.pathpoints.length, 0, newpp);
			this.selectPathPoint((p1i+1)%this.pathpoints.length);

		}

		this.calcMaxes();
	};

	Path.prototype.deletePathPoint = function(){
		var pp = this.pathpoints;

		if(pp.length > 1){
			for(var j=0; j<pp.length; j++){
				if(pp[j].selected){
					pp.splice(j, 1);
					if(j>0) {
						pp[j-1].selected = true;
					} else {
						pp[0].selected = true;
					}
				}
			}
			this.calcMaxes();
		} else {
			_UI.selectedtool = "pathedit";
			deleteShape();
		}
	};

	Path.prototype.selectPathPoint = function(index){
		// FOR NOW, ONLY ONE POINT SELECTED
		//debug("SELECTPATHPOINT - passed " + index + " length " + this.pathpoints.length + " mod " +(index%this.pathpoints.length));
		for(var j=0; j<this.pathpoints.length; j++){
			this.pathpoints[j].selected = false;
		}

		if(index === false){
			return;
		} else {
			index = (index == -1)? (this.pathpoints.length-1) : Math.abs(index);
			this.pathpoints[index%this.pathpoints.length].selected = true;
			//debug("SELECTPATHPOINT - selecting point " + index%this.pathpoints.length));
		}
	};

//	----------------------------------
//	Calc Maxes Stuff
//	----------------------------------

	Path.prototype.calcMaxes = function(){
		//console.time("CalcMaxes_NEW");

		this.topy = (_UI.chareditcanvassize*-1);
		this.bottomy = _UI.chareditcanvassize;
		this.leftx = _UI.chareditcanvassize;
		this.rightx = (_UI.chareditcanvassize*-1);

		var pp1, pp2, pp1h2x, pp1h2y, pp2h1x, pp2h1y, tbounds;

		for(var s=0; s<this.pathpoints.length; s++){
			pp1 = this.pathpoints[s];
			pp2 = this.pathpoints[(s+1)%this.pathpoints.length];
			pp1h2x = (pp1.useh2? pp1.H2.x : pp1.P.x);
			pp1h2y = (pp1.useh2? pp1.H2.y : pp1.P.y);
			pp2h1x = (pp2.useh1? pp2.H1.x : pp2.P.x);
			pp2h1y = (pp2.useh1? pp2.H1.y : pp2.P.y);

			tbounds = getBounds(pp1.P.x, pp1.P.y, pp1h2x, pp1h2y, pp2h1x, pp2h1y, pp2.P.x, pp2.P.y);

			this.rightx = Math.max(this.rightx, tbounds.maxx);
			this.topy = Math.max(this.topy, tbounds.maxy);
			this.leftx = Math.min(this.leftx, tbounds.minx);
			this.bottomy = Math.min(this.bottomy, tbounds.miny);
		}

		updateCurrentCharWidth();
		//console.timeEnd("CalcMaxes_NEW");
	};

	function getBounds(x1, y1, cx1, cy1, cx2, cy2, x2, y2){
		var bounds = {
			"minx" : Math.min(x1,x2),
			"miny" : Math.min(y1,y2),
			"maxx" : Math.max(x1,x2),
			"maxy" : Math.max(y1,y2)
		};

		var dcx0 = cx1 - x1;
		var dcy0 = cy1 - y1;
		var dcx1 = cx2 - cx1;
		var dcy1 = cy2 - cy1;
		var dcx2 = x2 - cx2;
		var dcy2 = y2 - cy2;

		var numerator, denominator, quadroot, root, t1, t2;

		if(cx1<bounds["minx"] || cx1>bounds["maxx"] || cx2<bounds["minx"] || cx2>bounds["maxx"]) {
			// X bounds
			if(dcx0+dcx2 != 2*dcx1) { dcx1+=0.01; }
			numerator = 2*(dcx0 - dcx1);
			denominator = 2*(dcx0 - 2*dcx1 + dcx2);
			quadroot = (2*dcx1-2*dcx0)*(2*dcx1-2*dcx0) - 2*dcx0*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkXbounds(bounds, getBezierValue(t1, x1, cx1, cx2, x2)); }
			if(0<t2 && t2<1) { checkXbounds(bounds, getBezierValue(t2, x1, cx1, cx2, x2)); }
		}

		// Y bounds
		if(cy1<bounds["miny"] || cy1>bounds["maxy"] || cy2<bounds["miny"] || cy2>bounds["maxy"]) {
			if(dcy0+dcy2 != 2*dcy1) { dcy1+=0.01; }
			numerator = 2*(dcy0 - dcy1);
			denominator = 2*(dcy0 - 2*dcy1 + dcy2);
			quadroot = (2*dcy1-2*dcy0)*(2*dcy1-2*dcy0) - 2*dcy0*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkYbounds(bounds, getBezierValue(t1, y1, cy1, cy2, y2)); }
			if(0<t2 && t2<1) { checkYbounds(bounds, getBezierValue(t2, y1, cy1, cy2, y2)); }
		}

		return bounds;
	}

	function checkXbounds(bounds, value) {
		if(bounds["minx"] > value) { bounds["minx"] = value; }
		else if(bounds["maxx"] < value) { bounds["maxx"] = value; }
	}

	function checkYbounds(bounds, value) {
		if(bounds["miny"] > value) { bounds["miny"] = value; }
		else if(bounds["maxy"] < value) { bounds["maxy"] = value; }
	}

	function getBezierValue(t, p0, p1, p2, p3) {
		var mt = (1-t);
		return (mt*mt*mt*p0) + (3*mt*mt*t*p1) + (3*mt*t*t*p2) + (t*t*t*p3);
	}

//-------------------------------------------------------
// PATH POINT OBJECT
//-------------------------------------------------------

	function PathPoint(oa){
		this.objtype = "pathpoint";

		this.P = oa.P? new Coord(oa.P) : new Coord({"x":100, "y":100});
		this.H1 = oa.H1? new Coord(oa.H1) : new Coord({"x":0, "y":0});
		this.H2 = oa.H2? new Coord(oa.H2) : new Coord({"x":200, "y":200});

		this.type = oa.type || "corner";		// corner, flat, symmetric
		this.selected = oa.selected || false;
		this.useh1 = (isval(oa.useh1)? oa.useh1 : true);
		this.useh2 = (isval(oa.useh2)? oa.useh2 : true);

		//debug("PATHPOINT was passed " + JSON.stringify(oa));
	}




//-------------------------------------------------------
// PATH POINT METHODS
//-------------------------------------------------------


	PathPoint.prototype.makeFlat = function(move){
		//debug("MAKEFLAT - move " + move + " starts as " + JSON.stringify(this));

		//figure out length (hypotenuse) of H1
		var adj1 = this.P.x-this.H1.x;
		var opp1 = this.P.y-this.H1.y;
		var hyp1 = Math.sqrt( (adj1*adj1) + (opp1*opp1) );
		var angle1 = Math.acos(adj1 / hyp1);
		//debug("MAKEFLAT adj1 opp1 hyp1 angle1 " + adj1 + " / " + opp1 + " / " + hyp1 + " / " + angle1);

		//figure out length (hypotenuse) of H2
		var adj2 = this.P.x-this.H2.x;
		var opp2 = this.P.y-this.H2.y;
		var hyp2 = Math.sqrt( (adj2*adj2) + (opp2*opp2) );
		var angle2 = Math.acos(adj2 / hyp2);
		//debug("MAKEFLAT adj2 opp2 hyp2 angle2 " + adj2 + " / " + opp2 + " / " + hyp2 + " / " + angle2);

		if(angle1==angle2){
			//debug("MAKEFLAT - Equal Angles, returning");
			return;
		}

		if(isNaN(angle1) || isNaN(angle2)) {
			//debug("MAKEFLAT - NaN found, returning");
			return;
		}

		//new values
		var newHx, newHy, mod, newadj1, newadj2;

		switch(move){
			case "H1" :
				//modifier
				mod = (this.H1.y > this.P.y)? -1 : 1;

				//get new x and y for H2
				newadj2 = Math.cos(angle1) * hyp2;
				newopp2 = Math.tan(angle1) * newadj2;

				//Set values
				newHx =  (this.P.x + (newadj2));
				newHy = (this.P.y + (newopp2*mod));
				//debug("MAKEFLAT move H1 - compute x/y " + newHx + " / " + newHy);
				this.H2.x = newHx;
				this.H2.y = newHy;
				break;

			case "H2" :
				//modifier
				mod = (this.H2.y > this.P.y)? -1 : 1;

				//get new x and y for H2
				newadj1 = Math.cos(angle2) * hyp1;
				newopp1 = Math.tan(angle2) * newadj1;

				//Set values
				newHx =  (this.P.x + (newadj1));
				newHy = (this.P.y + (newopp1*mod));
				//debug("MAKEFLAT move H2 - compute x/y " + newHx + " / " + newHy);
				this.H1.x = newHx;
				this.H1.y = newHy;
				break;
		}

		this.roundAll();
		//debug("MAKEFLAT - returns " + JSON.stringify(this));
	};

	PathPoint.prototype.makeSymmetric = function(move){
		//debug("MAKESYMETRIC - move " + move + " starts as " + JSON.stringify(this));
		switch(move){
			case "H1" :
				this.H2.x = ((this.P.x - this.H1.x) + this.P.x);
				this.H2.y = ((this.P.y - this.H1.y) + this.P.y);
				break;
			case "H2" :
				this.H1.x = ((this.P.x - this.H2.x) + this.P.x);
				this.H1.y = ((this.P.y - this.H2.y) + this.P.y);
				break;
		}

		this.roundAll();
		//debug("MAKESYMETRIC - returns " + JSON.stringify(this));
	};

	PathPoint.prototype.makePointedTo = function(px, py, length){
		//figure out angle
		var adj1 = this.P.x-px;
		var opp1 = this.P.y-py;
		var hyp1 = Math.sqrt( (adj1*adj1) + (opp1*opp1) );
		var angle1 = Math.acos(adj1 / hyp1);

		//debug("MAKEPOINTEDTO - x/y/l " + px + " " + py + " " + length + " - Before H1x/y " + this.H1.x + " " + this.H1.y);
		this.H1.x = this.P.x - Math.cos(angle1)*length;
		this.H1.y = this.P.y - Math.sin(angle1)*length;
		//debug("MAKEPOINTEDTO - after H1x/y " + this.H1.x + " " + this.H1.y);
		this.makeFlat("H1");
		//debug("MAKEPOINTEDTO - after makesymmetric H1x/y " + this.H1.x + " " + this.H1.y);

		this.roundAll();
	};

	PathPoint.prototype.resetHandles = function(){
		this.type = "flat";
		this.H2.x = this.P.x - 100;
		this.H2.y = this.P.y;
		this.H1.x = this.P.x + 100;
		this.H1.y = this.P.y;
	};

	PathPoint.prototype.setPointPosition = function(controlpoint, nx, ny){
		var dx = 0;
		var dy = 0;

		switch(controlpoint){
			case "P":
				if(!this.P.xlock && !isNaN(nx)){
					dx = (this.P.x - nx);
					this.P.x = nx;
					this.H1.x -= dx;
					this.H2.x -= dx;
				}
				if(!this.P.ylock && !isNaN(ny)){
					dy = (this.P.y - ny);
					this.P.y = ny;
					this.H1.y -= dy;
					this.H2.y -= dy;
				}
				break;

			case "H1":
				if(!this.H1.xlock && !isNaN(nx)){
					this.H1.x = nx;
				}
				if(!this.H1.ylock && !isNaN(ny)){
					this.H1.y = ny;
				}
				break;

			case "H2":
				if(!this.H2.xlock && !isNaN(nx)){
					this.H2.x = nx;
					if(this.type == "symmetric"){ this.makeSymmetric("H2"); }
					else if (this.type == "flat") { this.makeFlat("H2"); }
				}
				if(!this.H2.ylock && !isNaN(ny)){
					this.H2.y = ny;
					if(this.type == "symmetric"){ this.makeSymmetric("H1"); }
					else if (this.type == "flat") { this.makeFlat("H1"); }
				}
				break;
		}

		this.roundAll();

	};

	PathPoint.prototype.updatePointPosition = function(controlpoint, dx,dy, force){
		//debug("UPDATEPOINTPOSITION - cp / dx / dy / force: " + controlpoint + " / " + dx + " / " + dy + " / " + force);
		var lockx = (_UI.selectedtool=='pathedit'? this.P.xlock : false);
		var locky = (_UI.selectedtool=='pathedit'? this.P.ylock : false);

		if(isval(force)){
			if(force){
				lockx = false;
				locky = false;
			}
		}

		switch(controlpoint){
			case "P":
				if(!lockx) this.P.x += dx;
				if(!locky) this.P.y += dy;
				if(!lockx) this.H1.x += dx;
				if(!locky) this.H1.y += dy;
				if(!lockx) this.H2.x += dx;
				if(!locky) this.H2.y += dy;
				break;

			case "H1" :
				this.H1.x += dx;
				this.H1.y += dy;
				if(this.type == "symmetric"){ this.makeSymmetric("H1"); }
				else if (this.type == "flat") { this.makeFlat("H1"); }
				break;

			case "H2" :
				this.H2.x += dx;
				this.H2.y += dy;
				if(this.type == "symmetric"){ this.makeSymmetric("H2"); }
				else if (this.type == "flat") { this.makeFlat("H2"); }
				break;
		}

		this.roundAll();
	};

	PathPoint.prototype.roundAll = function(){
		this.P.x = round(this.P.x);
		this.P.y = round(this.P.y);
		this.H1.x = round(this.H1.x);
		this.H1.y = round(this.H1.y);
		this.H2.x = round(this.H2.x);
		this.H2.y = round(this.H2.y);
	};

	PathPoint.prototype.drawPoint = function(c) {
		var ps = _GP.projectsettings.pointsize +1;
		var hp = ps/2;
		_UI.chareditctx.fillStyle = c? c : _UI.colors.accent;

		_UI.chareditctx.fillRect((sx_cx(this.P.x)-hp).makeCrisp(), (sy_cy(this.P.y)-hp).makeCrisp(), ps, ps);
		_UI.chareditctx.strokeRect((sx_cx(this.P.x)-hp).makeCrisp(), (sy_cy(this.P.y)-hp).makeCrisp(), ps, ps);
	};

	PathPoint.prototype.drawDirectionalityPoint = function(c, next){
		_UI.chareditctx.fillStyle = c? c : _UI.colors.accent;
		_UI.chareditctx.strokeStyle = _UI.colors.accent;
		_UI.chareditctx.lineWidth = 1;
		var begin = {"x":this.P.x, "y":this.P.y};
		var end = {"x":this.H2.x, "y":this.H2.y};

		if(!this.useh2) {
			end = {"x":next.P.x, "y":next.P.y};
		}

		var ps = (_GP.projectsettings.pointsize*0.75);
		var arrow = [
			[(ps*3), 0],
			[ps, ps],
			[-ps, ps],
			[-ps, -ps],
			[ps, -ps]
		];
		var rotatedarrow = [];
		var ang = Math.atan2((end.y-begin.y),(end.x-begin.x))*-1;

		for(var a in arrow){
			rotatedarrow.push([
				//round((arrow[a][0] * Math.cos(ang)) - (arrow[a][1] * Math.sin(ang))),
				//round((arrow[a][0] * Math.sin(ang)) + (arrow[a][1] * Math.cos(ang)))
				((arrow[a][0] * Math.cos(ang)) - (arrow[a][1] * Math.sin(ang))),
				((arrow[a][0] * Math.sin(ang)) + (arrow[a][1] * Math.cos(ang)))
			]);
		}

		//debug("DRAWPOINT arrow = " + JSON.stringify(arrow) + "  - rotatedarrow = " + JSON.stringify(rotatedarrow));

		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));

		for(var p in rotatedarrow){
			if (p > 0) {
				_UI.chareditctx.lineTo((rotatedarrow[p][0] + sx_cx(this.P.x)), (rotatedarrow[p][1] + sy_cy(this.P.y)));
			}
		}

		_UI.chareditctx.lineTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));
		_UI.chareditctx.fill();
		_UI.chareditctx.stroke();

		// Exact Middle Point
		_UI.chareditctx.fillStyle = _UI.colors.accent;
		_UI.chareditctx.fillRect((sx_cx(this.P.x).makeCrisp()), (sy_cy(this.P.y).makeCrisp()), 1, 1);

	};

	PathPoint.prototype.drawHandles = function(drawH1, drawH2) {
		_UI.chareditctx.fillStyle = _UI.colors.accent;
		_UI.chareditctx.lineWidth = 1;
		var hp = _GP.projectsettings.pointsize/2;

		if(drawH1 && this.useh1){
			_UI.chareditctx.beginPath();
			_UI.chareditctx.arc(sx_cx(this.H1.x), sy_cy(this.H1.y), hp, 0, Math.PI*2, true);
			_UI.chareditctx.closePath();
			_UI.chareditctx.fill();

			_UI.chareditctx.beginPath();
			_UI.chareditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			_UI.chareditctx.lineTo(sx_cx(this.H1.x), sy_cy(this.H1.y));
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();
		}

		if(drawH2 && this.useh2){
			_UI.chareditctx.beginPath();
			_UI.chareditctx.arc(sx_cx(this.H2.x), sy_cy(this.H2.y), hp, 0, Math.PI*2, true);
			_UI.chareditctx.closePath();
			_UI.chareditctx.fill();

			_UI.chareditctx.beginPath();
			_UI.chareditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			_UI.chareditctx.lineTo(sx_cx(this.H2.x), sy_cy(this.H2.y));
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();
		}
	};
//-------------------------------------------------------
// SHAPE OBJECT
//-------------------------------------------------------

	function Shape(oa){
		this.objtype = "shape";

		// common settings
		this.name = oa.name || "new shape";
		this.xpos = isval(oa.xpos)? oa.xpos : 0;		// these are used for stroke-independend position & size
		this.ypos = isval(oa.ypos)? oa.ypos : 400;
		this.path = isval(oa.path)? new Path(oa.path) : rectPathFromCorners(false);
		this.visible = isval(oa.visible)? oa.visible : true;
		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;

		// not settable defaults
		this.link = false;
		this.uselinkedshapexy = false;

		//debug("Just created a SHAPE: " + JSON.stringify(this));
	}





//-------------------------------------------------------
// SHAPE METHODS
//-------------------------------------------------------


//	-----`
//	Draw
//	-----

	Shape.prototype.drawShape_Single = function(lctx){
		//debug("DRAWSHAPE_SINGLE");
		//this.checkPath();

		if(this.visible){
			lctx.fillStyle = _GP.projectsettings.color_glyphfill;
			if(lctx == _UI.ishereghostctx) { lctx.fillStyle = "rgba(0,0,255,0.2)"; }

			// Draw the appropriate stuff for each shape's fill & border
			lctx.beginPath();
			this.path.drawPath(lctx);
			lctx.closePath();
			lctx.fill();
		}
	};


	Shape.prototype.drawShape_Stack = function(lctx){
		//debug("DRAWSHAPE_STACK");
		if(this.visible){
			if(this.link){
				_GP.linkedshapes[this.link].shape.drawShape_Stack(lctx);
				return;
			}

			if((this.path.rightx == -1) && (lctx == _UI.chareditctx) && (_UI.selectedtool != "newpath")) this.path.calcMaxes();

			this.path.drawPath(lctx);
		}
	};

	Shape.prototype.drawShapeToArea = function(lctx, view){
		//debug("DRAWSHAPETOAREA");
		if(this.visible){
			//debug("drawShapeToArea for shape: " + this.name + " view=" + JSON.stringify(view));
			lctx.fillStyle = _GP.projectsettings.color_glyphfill;
			lctx.beginPath();
			this.path.drawPathToArea(lctx, view);
			lctx.closePath();
			lctx.fill();
		}
	};

	Shape.prototype.checkPath = function() {
		debug("CHECKPATH - checking " + this.name + "\n" + JSON.stringify(this.path));

		for(var pp = 0; pp < this.path.pathpoints.length; pp++){
			var tp = this.path.pathpoints[pp];
			if(!(tp.P.x)) debug(this.name + " p" + pp + ".P.x is " + tp.P.x);
			if(!(tp.P.y)) debug(this.name + " p" + pp + ".P.y is " + tp.P.y);

			if(!(tp.H1.x)) debug(this.name + " p" + pp + ".H1.x is " + tp.H1.x);
			if(!(tp.H1.y)) debug(this.name + " p" + pp + ".H1.y is " + tp.H1.y);

			if(!(tp.H2.x)) debug(this.name + " p" + pp + ".H2.x is " + tp.H2.x);
			if(!(tp.H2.y)) debug(this.name + " p" + pp + ".H2.y is " + tp.H2.y);
		}
	};

	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var v = getView("sx_cx");
		var canvasx = v.dx;
		canvasx += (sx*v.dz);
		return canvasx;
	}

	function sy_cy(sy){
		var v = getView("sy_cy");
		var canvasy = v.dy;
		canvasy -= (sy*v.dz);
		return canvasy;
	}

	Shape.prototype.drawSelectOutline = function(onlycenter){
		//debug("DRAWSELECTOUTLINE - onlycenter: " + onlycenter);

		var hp = (_GP.projectsettings.pointsize/2);
		_UI.chareditctx.lineWidth = 1;
		_UI.chareditctx.strokeStyle = _UI.colors.accent;

		if((_UI.selectedtool=="newrect")||(_UI.selectedtool=="shaperesize")){
			_UI.chareditctx.fillStyle = "transparent";

			//draw bounding box and 8points
			var lx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.leftx)		: sx_cx(this.path.leftx);
			var rx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.rightx)		: sx_cx(this.path.rightx);
			var ty = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.topy)		: sy_cy(this.path.topy);
			var by = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.bottomy)	: sy_cy(this.path.bottomy);

			var x = (lx).makeCrisp(true);
			var y = (ty).makeCrisp(true);
			var w = Math.ceil(rx-lx);
			var h = Math.ceil(by-ty);

			_UI.chareditctx.strokeStyle = _UI.colors.accent;
			_UI.chareditctx.strokeRect(x,y,w,h);
			if(_UI.selectedtool=="shaperesize"){ this.draw8points(onlycenter);}

		} else if ((_UI.selectedtool == "pathedit")||(_UI.selectedtool=="newpath")){
			// Draw Path Points
			var sep = this.path.sp(true, "DRAWSELECTOUTLINE");
			var pp = this.path.pathpoints;

			// Draw path selection outline
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _UI.colors.accent;

			_UI.chareditctx.beginPath();
			this.path.drawPath(_UI.chareditctx);
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();

			if(sep !== false){
				// Draw Handles
				//debug("DRAWSELECTOUTLINE - new path added, sep=" + sep + " pathpoints: " + JSON.stringify(this.path.pathpoints))
				pp[sep].drawHandles(true, true);

				// Draw prev/next handles
				if(sep>0){ pp[sep-1].drawHandles(false, true); }
				else { pp[pp.length-1].drawHandles(false, true); }

				pp[(sep+1) % pp.length].drawHandles(true, false);
			}

			// Draw points
			for(var s=0; s<pp.length; s++){
				var c = _UI.colors.accent;
				if(this.path.sp(false) && pp[s].selected){ c = "white"; }
				if(s == pp.length-1) pp[s].drawDirectionalityPoint(c, pp[0]);
				else pp[s].drawDirectionalityPoint(c, pp[s+1]);

				//debug("DRAWSELECTOUTLINE() - drew point " + s + " - selected: " + pp[s].selected);
			}

		} else if ((_UI.selectedtool=="newoval")){
			_UI.chareditctx.strokeStyle = _UI.colors.accent;
			var tpdso = ovalPathFromCorners(_UI.eventhandlers.temppathdragshape);

			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _UI.colors.accent;

			_UI.chareditctx.beginPath();
			tpdso.drawPath(_UI.chareditctx);
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();
		}
	};

	function rectPathFromCorners(cdata){
		//Default Shape size
		var lx = 0;
		var ty = _GP.projectsettings.ascent;
		var rx = (_GP.projectsettings.upm / _GP.projectsettings.griddivisions);
		var by = 0;

		if(cdata){
			lx = cdata.leftx;
			ty = cdata.topy;
			rx = cdata.rightx;
			by = cdata.bottomy;
		}

		var qw = round((rx-lx)/4);
		var qh = round((ty-by)/4);

		// First Point
		var Pul = new Coord({"x":lx, "y":ty});
		var H1ul = new Coord({"x":lx, "y":(ty-qh)});
		var H2ul = new Coord({"x":(lx+qw), "y":ty});

		// Second Point
		var Pur = new Coord({"x":rx, "y":ty});
		var H1ur = new Coord({"x":(rx-qw), "y":ty});
		var H2ur = new Coord({"x":rx, "y":(ty-qh)});

		// Third Point
		var Plr = new Coord({"x":rx, "y":by});
		var H1lr = new Coord({"x":rx, "y":(by+qh)});
		var H2lr = new Coord({"x":(rx-qw), "y":by});

		// Fourth Point
		var Pll = new Coord({"x":lx, "y":by});
		var H1ll = new Coord({"x":(lx+qw), "y":by});
		var H2ll = new Coord({"x":lx, "y":(by+qh)});

		var patharr = [];
		patharr[0] = new PathPoint({"P":Pul, "H1":H1ul, "H2":H2ul});
		patharr[1] = new PathPoint({"P":Pur, "H1":H1ur, "H2":H2ur});
		patharr[2] = new PathPoint({"P":Plr, "H1":H1lr, "H2":H2lr});
		patharr[3] = new PathPoint({"P":Pll, "H1":H1ll, "H2":H2ll});

		var rp = new Path({"pathpoints":patharr, "leftx":lx, "rightx":rx, "topy":ty, "bottomy":by});
		//debug("RETURNING PATH: " + JSON.stringify(rp));

		return rp;
	}

	function ovalPathFromCorners(cdata){
		var lx = cdata.leftx;
		var ty = cdata.topy;
		var rx = cdata.rightx;
		var by = cdata.bottomy;

		var hw = round((rx-lx)/2);
		var hh = round((ty-by)/2);
		var hwd = round(hw*0.448);
		var hhd = round(hh*0.448);

		// First Point - Top
		var Pt = new Coord({"x":(lx+hw), "y":ty});
		var H1t = new Coord({"x":(lx+hwd), "y":ty});
		var H2t = new Coord({"x":(rx-hwd), "y":ty});

		// Second Point - Right
		var Pr = new Coord({"x":rx, "y":(by+hh)});
		var H1r = new Coord({"x":rx, "y":(ty-hhd)});
		var H2r = new Coord({"x":rx, "y":(by-hhd)});

		// Third Point - Bottom
		var Pb = new Coord({"x":(lx+hw), "y":by});
		var H1b = new Coord({"x":(rx-hwd), "y":by});
		var H2b = new Coord({"x":(lx+hwd), "y":by});

		// Fourth Point - Left
		var Pl = new Coord({"x":lx, "y":(by+hh)});
		var H1l = new Coord({"x":lx, "y":(by+hhd)});
		var H2l = new Coord({"x":lx, "y":(ty-hhd)});

		var patharr = [];
		patharr[0] = new PathPoint({"P":Pt, "H1":H1t, "H2":H2t, "type":"symmetric"});
		patharr[1] = new PathPoint({"P":Pr, "H1":H1r, "H2":H2r, "type":"symmetric"});
		patharr[2] = new PathPoint({"P":Pb, "H1":H1b, "H2":H2b, "type":"symmetric"});
		patharr[3] = new PathPoint({"P":Pl, "H1":H1l, "H2":H2l, "type":"symmetric"});

		return new Path({"pathpoints":patharr});
	}

	Shape.prototype.draw8points = function(onlycenter){
		//if(this.link) { return; }
		//debug("DRAW8POINTS - onlycenter: " + onlycenter);

		var ps = _GP.projectsettings.pointsize+1;
		var hp = ps/2;

		var lx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.leftx)		: sx_cx(this.path.leftx);
		var rx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.rightx)	: sx_cx(this.path.rightx);
		var ty = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.topy)		: sy_cy(this.path.topy);
		var by = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.bottomy)	: sy_cy(this.path.bottomy);

		var bleftx = (lx-hp).makeCrisp(true);
		var bmidx = (lx+((rx-lx)/2)-hp).makeCrisp(true);
		var brightx = (rx-hp).makeCrisp(true);
		var btopy = (ty-hp).makeCrisp(true);
		var bmidy = (ty+((by-ty)/2)-hp).makeCrisp(true);
		var bbottomy = (by-hp).makeCrisp(true);

		onlycenter? _UI.chareditctx.fillStyle = _UI.colors.accent : "white";

		if(!onlycenter){
			//upper left
			if(canResize("nw")){
				_UI.chareditctx.fillRect(bleftx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, btopy, ps, ps);
			}

			//top
			if(canResize("n")){
				_UI.chareditctx.fillRect(bmidx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(bmidx, btopy, ps, ps);
			}

			//upper right
			if(canResize("ne")){
				_UI.chareditctx.fillRect(brightx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, btopy, ps, ps);
			}

			// right
			if(canResize("e")){
				_UI.chareditctx.fillRect(brightx, bmidy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, bmidy, ps, ps);
			}

			//lower right
			if(canResize("se")){
				_UI.chareditctx.fillRect(brightx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, bbottomy, ps, ps);
			}

			//bottom
			if(canResize("s")){
				_UI.chareditctx.fillRect(bmidx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(bmidx, bbottomy, ps, ps);
			}

			//lower left
			if(canResize("sw")){
				_UI.chareditctx.fillRect(bleftx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, bbottomy, ps, ps);
			}

			//left
			if(canResize("w")){
				_UI.chareditctx.fillRect(bleftx, bmidy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, bmidy, ps, ps);
			}

		}

		//Center Dot
		_UI.chareditctx.fillRect(bmidx, bmidy, ps, ps);
		_UI.chareditctx.strokeRect(bmidx, bmidy, ps, ps);
	};

	Shape.prototype.genPostScript = function(lastx, lasty){
		return this.path? this.path.genPathPostScript(lastx, lasty) : {"re":"", "lastx":lastx, "lasty":lasty};
	};


//	-----------------
//	Button Functions
//	-----------------
	function addShape(newshape){
		//debug("ADDSHAPE - was passed:\n" + JSON.stringify(newshape));
		if(newshape){
			if(newshape.link){
				_UI.selectedtool = "shaperesize";
			} else if(newshape.path && (_UI.selectedtool == "shapemove")) {
				deubg("ADDSHAPE triggered as true: newshape.path && _UI.selectedtool == shapemove \n >> NOT calling calcmaxes, okay?");
				//newshape.path.calcMaxes();
			}
		} else {
			//debug("ADDSHAPE - passed null, creating new shape.");
			newshape = new Shape({});
			newshape.name = ("layer " + _UI.shapelayers.length);
		}

		if(_UI.navhere == "character edit") {
			_UI.selectedshape = _UI.shapelayers.length;
			_UI.navprimaryhere = 'npAttributes';
		}
		_UI.shapelayers.push(newshape);
		updateCurrentCharWidth();

		//debug("ADDSHAPE - returns:\n" + JSON.stringify(newshape));
		return newshape;
	}

	function addBasicShape(type){
		var hd = 50;
		var th = 500;
		var tw = 300;
		var newshape = new Shape({});
		var parr = false;
		var shapetype = "layer ";

		if(type == "oval"){
			var p1 = new PathPoint({"P":new Coord({"x":0,"y":(th/2)}), "H1":new Coord({"x":0,"y":hd}), "H2":new Coord({"x":0,"y":(th-hd)}), "type":"symmetric"});
			var p2 = new PathPoint({"P":new Coord({"x":(tw/2),"y":th}), "H1":new Coord({"x":hd,"y":th}), "H2":new Coord({"x":(tw-hd),"y":th}), "type":"symmetric"});
			var p3 = new PathPoint({"P":new Coord({"x":tw,"y":(th/2)}), "H1":new Coord({"x":tw,"y":(th-hd)}), "H2":new Coord({"x":tw,"y":hd}), "type":"symmetric"});
			var p4 = new PathPoint({"P":new Coord({"x":(tw/2),"y":0}), "H1":new Coord({"x":(tw-hd),"y":0}), "H2":new Coord({"x":hd,"y":0}), "type":"symmetric"});
			parr = [p1,p2,p3,p4];
			shapetype = "oval ";
		} else {
			var p1 = new PathPoint({"P":new Coord({"x":0,"y":0}), "H1":new Coord({"x":hd,"y":0}), "H2":new Coord({"x":0,"y":hd})});
			var p2 = new PathPoint({"P":new Coord({"x":0,"y":th}), "H1":new Coord({"x":0,"y":(th-hd)}), "H2":new Coord({"x":hd,"y":th})});
			var p3 = new PathPoint({"P":new Coord({"x":tw,"y":th}), "H1":new Coord({"x":(tw-hd),"y":th}), "H2":new Coord({"x":tw,"y":(th-hd)})});
			var p4 = new PathPoint({"P":new Coord({"x":tw,"y":0}), "H1":new Coord({"x":tw,"y":hd}), "H2":new Coord({"x":(tw-hd),"y":0})});
			parr = [p1,p2,p3,p4];
			shapetype = "rect ";
		}

		newshape.path = new Path({"pathpoints":parr});
		newshape.name = (shapetype + _UI.shapelayers.length);

		if(_UI.navhere == "character edit") { _UI.selectedshape = _UI.shapelayers.length; }
		_UI.shapelayers.push(newshape);
		updateCurrentCharWidth();
	}

	function deleteShape(){
		if(_UI.shapelayers[_UI.selectedshape].link){
			removeFromUsedIn(_UI.shapelayers[_UI.selectedshape].link, _UI.selectedchar);
		}

		if((_UI.shapelayers.length > 0) && (_UI.selectedshape >= 0)){
			_UI.shapelayers.splice(_UI.selectedshape, 1);
			if(_UI.shapelayers.length == _UI.selectedshape) {
				_UI.selectedshape = _UI.selectedshape-1;
			}
		} else {
			//debug("DELETESHAPES - no shapes left");
		}

		if((_UI.selectedshape >= 0) && (_UI.shapelayers[_UI.selectedshape].link)){
			//debug("DELETESHAPE - newly selected shape is linkedshape, changing tool");
			_UI.selectedtool = "shaperesize";
		}
		updateCurrentCharWidth();
	}

	function clickSelectShape(x,y){
		//debug("CLICKSELECTShape() - checking x:" + x + " y:" + y);

		if(_UI.navhere == "linked shapes"){
			return clickSelectLinkedShape(x,y);
		}
		var ts;
		for(var j=(_UI.shapelayers.length-1); j>=0; j--){
			ts = _UI.shapelayers[j];
			//debug("CLICKSELECTShape() - Checking shape " + j);

			if(ts.isHere(x,y)){
				if(!ts.link) ts.path.selectPathPoint(false);
				if(j != _UI.selectedshape){
					//debug("CLICKSELECTShape() - selecting shape " + j);
					_UI.selectedshape = j;

					if(ts.link){
						//debug("CLICKSELECTSHAPE - detected this.link, setting _UI.selectedtool = shaperesize");
						_UI.selectedtool = "shaperesize";
					}
				}

				_UI.navprimaryhere = 'npAttributes';
				return true;
			}
		}
		_UI.selectedshape = -1;
		//debug("CLICKSELECTShape() - deselecting, setting to -1");
		return false;
	}

	Shape.prototype.isHere = function(x,y){
		var imageData;
		_UI.ishereghostctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		this.drawShape_Single(_UI.ishereghostctx);
		imageData = _UI.ishereghostctx.getImageData(x, y, 1, 1);
		//debug("ISHERE? alpha = " + imageData.data[3] + "  returning: " + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	}

	Shape.prototype.isOverHandle = function(px,py){
		//debug("ISOVERHANDLE() - checking x:" + px + " y:" + py);

		// Translation Fidelity - converting passed canvas values to saved value system
		var hp = _GP.projectsettings.pointsize/2;
		var leftxb = sx_cx(this.path.leftx) -hp;
		var midxb = Math.floor(sx_cx(this.path.leftx)+((sx_cx(this.path.rightx)-sx_cx(this.path.leftx))/2)-hp)+.5;
		var rightxb = sx_cx(this.path.rightx) -hp;

		var topyb = sy_cy(this.path.topy)-hp;
		var midyb = Math.floor(sy_cy(this.path.topy)+((sy_cy(this.path.bottomy)-sy_cy(this.path.topy))/2)-hp)+.5;
		var bottomyb = sy_cy(this.path.bottomy) -hp;

		// upper left
		if(canResize("nw")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "nw-resize";
				//debug("ISOVERHANDLE() -  upper left");
				return "nw";
			}
		}

		// top
		if(canResize("n")){
			if( ((px > midxb) && (px < midxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "n-resize";
				//debug("ISOVERHANDLE() -  top");
				return "n";
			}
		}

		// upper right
		if(canResize("ne")){
			if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "ne-resize";
				//debug("ISOVERHANDLE() - upper right");
				return "ne";
			}
		}

		// right
		if(canResize("e")){
			if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > midyb) && (py < midyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "e-resize";
				//debug("ISOVERHANDLE() - right");
				return "e";
			}
		}

		// lower right
		if(canResize("se")){
				if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "se-resize";
				//debug("ISOVERHANDLE() - lower right");
				return "se";
			}
		}

		// bottom
		if(canResize("s")){
			if( ((px > midxb) && (px < midxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "s-resize";
				//debug("ISOVERHANDLE() - bottom");
				return "s";
			}
		}

		// lower left
		if(canResize("sw")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "sw-resize";
				//debug("ISOVERHANDLE() - lower left");
				return "sw";
			}
		}

		// left
		if(canResize("w")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > midyb) && (py < midyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "w-resize";
					//debug("ISOVERHANDLE() - left");
				return "w";
			}
		}

		//debug("ISOVERHANDLE() - Returning FALSE");
		document.body.style.cursor = "default";
		return false;
	}


//	-------------------------
//	Random Support Functions
//	-------------------------
	function ss(req){
		//req? true : req="[probably a dynamically-generated page control]";
		//debug("SS() - Requested by: " + req + " - CURRENT _UI.selectedshape = " + _UI.selectedshape);

		if(_UI.navhere == "linked shapes"){
			//debug("SS() - LINKEDSHAPE - Requested by: " + req + " - returning shownlinkedshape: " + _UI.shownlinkedshape);
			return _GP.linkedshapes[_UI.shownlinkedshape].shape;
		}

		if(_UI.selectedshape != -1){
			if((_UI.selectedshape >= 0)&&(_UI.selectedshape < _UI.shapelayers.length)) {
				// Charedit Selected Shape
				//debug("SS() - CHAREDIT - returning shape object for position " + _UI.selectedshape);
				return _UI.shapelayers[_UI.selectedshape];
			} else {
				// Out of bounds Selected Shape
				//debug("SS() - Selected Shape outside of expected boundary. _UI.selectedshape: " + _UI.selectedshape);
				_UI.selectedshape = -1;
				return false;
			}
		} else {
			// -1 = "no shape selected"
			//debug("SS() - setting _UI.selectedshape = -1, returning false");
			return false;
		}
	}

	Shape.prototype.changeShapeName = function(sn){
		sn = strSan(sn);
		//debug("CHANGESHAPENAME - sanitized name: " + sn);
		if(sn != ""){
			this.name = sn;
			putundoq("shape name");
		} else {
			openDialog("<h2>Invalid shape name</h2><br>Shape names must only contain alphanumeric characters or spaces.<br>");
		}

		redraw("Shape Name");
	}

function loadPage_about(){
	debug("LOADING PAGE >> loadPage_about");
	var content = "<div class='pagecontent textpage'><h1>About Glyphr Studio</h1>" +
	"<h2 style='margin-bottom:12px;'>"+_UI.thisGlyphrStudioVersion+"</h2>" +
	"For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>" +
	"Any questions? Hit up <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out." +
	"<br><br>" +
	"The currently opened project was created with: " + _GP.projectsettings.version + "<br>" +
	"Glyphr projects may be incompatible with different Beta versions of Glyphr Studio.<br><br>" +
	"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
	"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
	"this license and it's freeness stays intact." +
	"<br><br>";

	getEditDocument().getElementById("mainwrapper").innerHTML = content;
}
//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){
		//stack(arguments);

		debug("LOADING PAGE >> loadPage_charedit");
		getEditDocument().getElementById("mainwrapper").innerHTML = charedit_content();

		setupEditCanvas();
		setupGhostCanvas();

		initEventHandlers();

		_UI.selectedtool = "pathedit";
		_UI.selectedshape = -1;

		redraw("loadPage_charedit");
	}

	function charedit_content(){
		//stack(arguments);

		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		return re;
	}

	function setupGhostCanvas(){
		//stack(arguments);

		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.chareditcanvassize;
		_UI.ishereghostcanvas.width = _UI.chareditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = "cyan";
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = "transparent";
	}

	function setupEditCanvas(){
		//stack(arguments);

		_UI.chareditcanvas = getEditDocument().getElementById("chareditcanvas");
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext("2d");
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;
	}

	function resetCursor() { getEditDocument().body.style.cursor = 'default'; }


//-------------------
// VIEW
//-------------------

	function setView(oa){
		//stack(arguments);

		var sc = _UI.selectedchar;
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			//debug("SETVIEW - char " + sc + " has no existing view, setting to default.");
			v[sc] = getView("setView");
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

		//debug("SETVIEW - passed " + JSON.stringify(oa) + " selectedchar " + _UI.selectedchar + " VIEWS is\n" + JSON.stringify(_UI.views));
	}

	function getView(calledby){
		////stack(arguments);
		//debug("GETVIEW - called by " + calledby);

		var sc = _UI.selectedchar;
		var v = _UI.views;

		if(isval(v[sc])){
			//debug("GETVIEW - char " + sc + " HAS an existing value, returning \n" + JSON.stringify(v[sc]));
			return clone(v[sc]);
		} else {
			//debug("GETVIEW - char " + sc + " HAS NO EXISTING value, returning default");
			return clone(_UI.defaultview);
		}
	}

	function viewZoom(zfactor){
		//stack(arguments);

		setView({"dz" : (getView("viewZoom").dz*=zfactor)});
		redraw("viewZoom");
	}

	function resetThumbView(){
		//stack(arguments);

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			"dx" : _UI.thumbgutter,
			"dy" : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			"dz" : zoom
		};

		//debug("RESETTHUMBVIEW - set to \n" + JSON.stringify(_UI.thumbview));
	}



//-------------------
// REDRAW
//-------------------
	function redraw(calledby){
		//stack(arguments);
		//debug(Date.now()+"\t:: REDRAW - Called By: " + calledby + " - Selected Char: " + _UI.selectedchar + " - Navhere: " + _UI.navhere);
		if(_UI.navhere == "linked shapes") {
			_UI.redrawing = false;
			linkedshapesredraw("redraw");
			return;
		}

		if(_UI.redrawing){
			// this is totally a hack
			//debug("REDRAW - RETURNING because _UI.redrawing = " + _UI.redrawing);
			return;
		}

		_UI.redrawing = true;


		var sc = _GP.fontchars[_UI.selectedchar];
		_UI.chareditctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		grid();

		// load char info
		_UI.shapelayers = sc.charshapes;
		sc.drawCharToArea(_UI.chareditctx, getView("Redraw"));

		// Finish up
		var s = ss("Redraw");
		if(s) {
			s.drawSelectOutline(s.link !== false);
			if(s.link){
				_UI.selectedtool = "shaperesize";
			}
		}

		update_NavPanels();

		updatetools();

		_UI.redrawing = false;
		//debug(Date.now()+"\t:: REDRAW DONE - Called By: " + calledby);
	}




//-------------------
// Update Canvas Tools
//-------------------
	function updatetools(){
		//stack(arguments);

		var pointselectclass = "";
		var pointselectclickable = true;
		var s = ss("Charedit: UpdateTools");
		if(_UI.navhere == "linked shapes") {
			if(!_GP.linkedshapes[_UI.selectedshape]) { s = false; }
		}

		if(_UI.selectedtool=='pathedit'){
			pointselectclass = "buttonsel tool";
		} else if (s.link){
			pointselectclass = "buttondis tool";
			pointselectclickable = false;
		} else {
			pointselectclass = "button tool";
		}

		var content = "";
		content += "<div title='edit path' class='" + pointselectclass + "' " + (pointselectclickable? "onclick='clicktool(\"pathedit\");'":"") + "/><canvas id='patheditbuttoncanvas'></canvas></div>";
		content += "<div title='move & resize shape' class='" + (_UI.selectedtool=='shaperesize'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"shaperesize\");'/><canvas id='shaperesizebuttoncanvas'></canvas></div>";

		if(_UI.navhere == "character edit"){
			content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
			content += "<div title='new rectangle shape' class='" + (_UI.selectedtool=='newrect'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newrect\");'/><canvas id='newrectbuttoncanvas'></canvas></div>";
			content += "<div title='new oval shape' class='" + (_UI.selectedtool=='newoval'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newoval\");'/><canvas id='newovalbuttoncanvas'></canvas></div>";
			content += "<div title='new path shape' class='" + (_UI.selectedtool=='newpath'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newpath\");'/><canvas id='newpathbuttoncanvas'></canvas></div>";
		}

		content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
		content += "<div title='scroll and pan' class='" + (_UI.selectedtool=='pan'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"pan\");'/><canvas id='panbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: in' class='button tool' onclick='viewZoom(1.1);'><canvas id='zoominbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: out' class='button tool' onclick='viewZoom(.9);'><canvas id='zoomoutbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: one to one' class='button tool' onclick='setView({\"dz\":1});redraw(\"updatetools\");'><canvas id='zoom1to1buttoncanvas'></canvas></div>";
		content += "<div title='zoom: full em' class='button tool' onclick='setView(clone(_UI.defaultview)); redraw(\"updatetools\");'><canvas id='zoomembuttoncanvas'></canvas></div>";
		content += "<div title='zoom level' class='tool out'>" + round(getView("updatetools").dz*100, 2) + "%</div>";
		//content += "<div title='two screen mode' class='button tool' onclick='popOut();'>^^</div>";

		try {
			getEditDocument().getElementById("toolsarea").innerHTML = content;
		} catch(err) {
			console.error("UPDATETOOLS - innerHTML update error caught");
		}

		// Draw the buttons
		var tempctx;
		var tempcanvas;
		var bh = 19;
		var bw = 16;

		// Path Edit
		tempcanvas = getEditDocument().getElementById("patheditbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "pathedit"){ drawPathEditButton(tempctx, "white", "black"); }
		else if (!pointselectclickable) { drawPathEditButton(tempctx, "rgb(80,80,80)", "rgb(80,80,80)"); }
		else { drawPathEditButton(tempctx, "transparent", _UI.colors.accent); }

		// Shape Resize
		tempcanvas = getEditDocument().getElementById("shaperesizebuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 3px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "shaperesize"){ drawShapeResizeButton(tempctx, "white", "black"); }
		else { drawShapeResizeButton(tempctx, "transparent", _UI.colors.accent); }

		// Pan
		tempcanvas = getEditDocument().getElementById("panbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "pan"){ drawPanButton(tempctx, "white", "black"); }
		else { drawPanButton(tempctx, _UI.colors.accent, "transparent"); }

		// Zoom In
		tempcanvas = getEditDocument().getElementById("zoominbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		drawZoomInButton(tempctx, _UI.colors.accent, "transparent");

		// Zoom Out
		tempcanvas = getEditDocument().getElementById("zoomoutbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		drawZoomOutButton(tempctx, _UI.colors.accent, "transparent");

		// Zoom 1:1
		tempcanvas = getEditDocument().getElementById("zoom1to1buttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		drawZoom1to1Button(tempctx, _UI.colors.accent, "transparent");

		// Zoom Em
		tempcanvas = getEditDocument().getElementById("zoomembuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "4px 4px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		drawZoomEmButton(tempctx, _UI.colors.accent, "transparent");

		if(_UI.navhere == "character edit"){
			// New Rectangle
			tempcanvas = getEditDocument().getElementById("newrectbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newrect") { drawNewRectButton(tempctx, "white", "black"); }
			else { drawNewRectButton(tempctx, "transparent", _UI.colors.accent); }

			// New Oval
			tempcanvas = getEditDocument().getElementById("newovalbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newoval"){ drawNewOvalButton(tempctx, "white", "black"); }
			else { drawNewOvalButton(tempctx, "transparent", _UI.colors.accent); }

			// New Path
			tempcanvas = getEditDocument().getElementById("newpathbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newpath"){ drawNewPathButton(tempctx, "white", "black"); }
			else { drawNewPathButton(tempctx, "transparent", _UI.colors.accent); }
		}
	}

	function clicktool(ctool){
		//stack(arguments);

		_UI.selectedtool = ctool;
		var s = ss("clicktool");

		//debug("CLICKTOOL - was passed: " + ctool + " and _UI.selectedtool now is: " + _UI.selectedtool);
		_UI.eventhandlers.eh_addpath.firstpoint = true;
		if((ctool=="newrect")||(ctool=="newoval")){
			_UI.selectedshape = -1;
		} else if (ctool=="newpath"){
			_UI.selectedshape = -1;
		} else if(ctool=="pathedit"){
			if(s) {s.path.selectPathPoint(0);}
			//debug("CLICKTOOL() - setting selectPathPoint = 0");
		} else if (ctool == "shapemove"){
			if(s){s.path.calcMaxes();}
		}

		redraw("clicktool");
	}

//-------------------
// Drawing Grid
//-------------------


	function grid(){
		//stack(arguments);

		var ps = _GP.projectsettings;
		var v = getView("grid");

		//debug("GRID: v:" + JSON.stringify(v));

		_UI.chareditctx.fillStyle = _UI.colors.offwhite;
		_UI.chareditctx.fillRect(0,0,99999,99999);

		var zupm = (ps.upm * v.dz);
		var gutter = ((_UI.chareditcanvassize*v.dz) - zupm)/2;
		var zasc = (ps.ascent * v.dz);
		// background white square

		var xs = {};
		xs.xmax = _UI.chareditcanvassize;
		xs.xmin = 0;
		xs.ymax = _UI.chareditcanvassize;
		xs.ymin = 0;
		//debug("GRID: zupm:" + zupm + " gutter:" + gutter + " zasc:" + zasc + " xs:" + JSON.stringify(xs));

		_UI.chareditctx.fillStyle = "white";
		_UI.chareditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

		// Grids
		var mline = v.dy - (ps.ascent*v.dz);
		var xline = v.dy - (ps.xheight*v.dz);
		var dline = v.dy - ((ps.ascent - ps.upm)*v.dz);
		var overshootsize = (ps.overshoot*v.dz);
		var lgline = dline + overshootsize + (ps.linegap*v.dz);

		//debug("GRID:\nascent / xheight / descent = "+ ps.ascent+ "/" + ps.xheight+ "/" + (ps.ascent-ps.upm));

		if(_UI.showgrid || _UI.showguides){
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _GP.projectsettings.color_grid;

			if(_UI.showgrid){
				var gsize = ((ps.upm/ps.griddivisions)*v.dz);
				//debug("GRID - gridsize set as: " + gsize);

				for(var i=v.dx; i<xs.xmax-1; i+=gsize){ vertical(i, xs.ymin, xs.ymax); }
				vertical(xs.xmax+1, xs.ymin, xs.ymax);
				for(var j=v.dx; j>=xs.xmin; j-=gsize){ vertical(j, xs.ymin, xs.ymax); }

				for(var k=v.dy; k<xs.ymax-1; k+=gsize){ horizontal(k, xs.xmin, xs.xmax); }
				horizontal(xs.ymax, xs.xmin, xs.xmax+1);
				for(var p=v.dy; p>=xs.ymin; p-=gsize){ horizontal(p, xs.xmin, xs.xmax); }

			}

			if(_UI.showguides){
				// Minor Guidelines - Overshoots
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, 0.8, true);
				horizontal(xline-overshootsize, xs.xmin, xs.xmax);
				horizontal(mline-overshootsize, xs.xmin, xs.xmax);
				horizontal(v.dy+overshootsize, xs.xmin, xs.xmax);
				horizontal(dline+overshootsize, xs.xmin, xs.xmax);

				// Right hand Em Square and Line Gap
				//vertical(v.dx+(ps.upm*v.dz), xs.ymin, xs.ymax);
				horizontal(lgline, xs.xmin, xs.xmax);

				// Char Width
				if(_UI.navhere == 'character edit'){
					var sc = _GP.fontchars[_UI.selectedchar];
					vertical(v.dx - (v.dz*(sc.leftsidebearing || _GP.projectsettings.defaultlsb)), xs.xmin, xs.xmax);
					vertical(v.dx + (v.dz*sc.charwidth), xs.xmin, xs.xmax);
				}

				// major guidelines - xheight, top (emzize)
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, 0.5, true);
				horizontal(xline, xs.xmin, xs.xmax);
				//_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, .2, true);
				horizontal(mline, xs.xmin, xs.xmax);
				horizontal(dline, xs.xmin, xs.xmax);


				// Out of bounds triangle
				_UI.chareditctx.fillStyle = _GP.projectsettings.color_guideline;
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(v.dx, v.dy);
				_UI.chareditctx.lineTo(v.dx, v.dy+(_GP.projectsettings.pointsize*2));
				_UI.chareditctx.lineTo(v.dx-(_GP.projectsettings.pointsize*2), v.dy);
				_UI.chareditctx.closePath();
				_UI.chareditctx.fill();

				// Origin Lines
				_UI.chareditctx.strokeStyle = _GP.projectsettings.color_guideline;
				horizontal(v.dy, xs.xmin, xs.xmax);
				vertical(v.dx, xs.ymin, xs.ymax);
			}
		}
	}

	function horizontal(y, xmin, xmax){
		y = y.makeCrisp();
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(xmin,y);
		_UI.chareditctx.lineTo(xmax,y);
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}

	function vertical(x, ymin, ymax){
		x = x.makeCrisp();
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(x,ymin);
		_UI.chareditctx.lineTo(x,ymax+1);
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}
	function loadPage_exportfont(){
		debug("LOADING PAGE >> loadPage_exportfont");
		var content = "<div class='pagecontent textpage'><h1>Export Font</h1>" +
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " +
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " +
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " +
		"program icon, and an OTF font will be generated.<br><br>" +
		"<input type='button' class='buttonsel' value='Generate TTX XML File' onclick='triggerTTXFileDownload()'></input>" +
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}
	function loadPage_fontsettings(){
		debug("LOADING PAGE >> loadPage_fontsettings");
		// SETTINGS
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		content += "<p style='margin-bottom:20px;'>These properties are used by the Glyphr project while you are designing this font.  By default, these are the same as some of the OpenType settings below." +
					"<br><i>Values will be saved as you change them</i>.</p>";

		content += "<h3>Character Proportions</h3>";
		content += "Glyphr projects export OpenType fonts with PostScript outlines.  Characters in this kind of font have a total height of 1000 Em units. "+
					"The baseline is the one main dividing line for each character, with the ascent and descent above it and below it. " +
					"Some characters, like p and y, fall below the baseline into the descent.<br>" +
					"<table class='fontmetricstable'>"+
					"<tr><td>Ascent height: </td><td><input type='text' value='"+ps.ascent+"' onchange='updateAscender(this.value);'>"+spinner()+"</td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Descent height: </td><td><input type='text' id='metric-des' disabled='disabled' value='"+(ps.ascent - ps.upm)+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Total Units per Em: </td><td><input type='text' disabled='disabled' value='"+ps.upm+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>Default Left Side Bearing</h3>" +
					"This is the amount of blank space that is added to the left of characters when they are displayed.  This metric can be set individually per character, but will default to this value if not set. "+
					"<table class='fontmetricstable'>"+
					"<tr><td>Left Side Bearing: </td><td><input type='text' value='"+ps.defaultlsb+"' onchange='_GP.projectsettings.lsb = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		content += "<h3>Line Gap</h3>" +
					"This is the amount of vertical space between characters on separate lines. This is recomended to be 20% to 25% of the total Units per Em."+
					"<table class='fontmetricstable'>"+
					"<tr><td>Line Gap: </td><td><input type='text' value='"+ps.linegap+"' onchange='_GP.projectsettings.linegap = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		// METADATA
		content += "<br><h1>OpenType Properties</h1>" +
			"<p style='margin-bottom:20px;'>These properties will be saved directly to the various OpenType tables when the font is exported to TTX format.  More information about all of these properties can be found in the <a href='http://www.microsoft.com/typography/otspec/otff.htm#otttables' target=_new>OpenType Specification</a>." +
			"<br><i>Values will be saved as you change them</i>.</p>";



		content += "<h2>Tables</h2>";

		var otp = _GP.opentypeproperties;


		// NAME TABLE
		content += "<h3>name</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var i=0; i<otp.name.length; i++){
			if(i!=7){
				content += "<tr><td class='propname'>" + otp.name[i].key + "</td><td><input type='text' value='" + otp.name[i].val + "' onchange='_GP.opentypeproperties.name[" + i + "].val = this.value;' /></td></tr>";
			}
		}
		content += "</table>";


		// HEAD TABLE
		content += "<h3>head</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var j=0; j<otp.head.length; j++){
			content += "<tr><td class='propname'>" + otp.head[j].key + "</td><td><input type='text' value='" + otp.head[j].val + "' onchange='setOTprop(\"head\", \"" + otp.head[j].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// OS/2 TABLE
		content += "<h3>os/2</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var k=0; k<otp.os_2.length; k++){
			content += "<tr><td class='propname'>" + otp.os_2[k].key + "</td><td><input type='text' value='" + otp.os_2[k].val + "' onchange='setOTprop(\"os_2\", \"" + otp.os_2[k].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// POST TABLE
		content += "<h3>post</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var m=0; m<otp.post.length; m++){
			content += "<tr><td class='propname'>" + otp.post[m].key + "</td><td><input type='text' value='" + otp.post[m].val + "' onchange='setOTprop(\"post\", \"" + otp.post[m].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// CFF TABLE
		content += "<h3>cff</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var n=0; n<otp.cff.length; n++){
			content += "<tr><td class='propname'>" + otp.cff[n].key + "</td><td><input type='text' value='" + otp.cff[n].val + "' onchange='setOTprop(\"cff\", \"" + otp.cff[n].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";



		content += "</div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

	function updateAscender(val){
		var ps = _GP.projectsettings;
		ps.ascent = Math.max(0, Math.min(ps.upm, round(val)));
		document.getElementById('metric-des').value = (ps.ascent - ps.upm);
	}function loadPage_help(){
	debug("LOADING PAGE >> loadPage_help");
	var content = "<div class='textpage pagecontent'><a name='top'></a>";
	content += "<h1>Help</h1><p>Peruse the document, but if you have any other questions, you can email <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out.</p><h3>jump to a section</h3><p><a href='#nav_and_layout'>Navigation and Layout</a></p><p>Editing: &nbsp; <a href='#page_char_edit_and_linked_shapes'>Character Edit and Linked Shape Pages</a> &nbsp;<a href='#shape_editing'>Shape Editing</a> &nbsp;<a href='#edit_canvas_tools'>Canvas Tools</a> &nbsp;<br/>Attributes Panels: &nbsp; <a href='#attributes_character'>Character</a> &nbsp;<a href='#attributes_shape'>Shape</a> &nbsp;<a href='#attributes_path_point'>Path Point</a> &nbsp;<a href='#attributes_linked_shape'>Linked Shape</a> &nbsp;</p><p>Other Pages: &nbsp; <a href='#page_test_drive'>Test Drive</a> &nbsp;<a href='#page_font_settings'>Font Settings</a> &nbsp;<a href='#page_project_settings'>Project Settings</a> &nbsp;<a href='#page_open_project'>Open Project</a> &nbsp;<a href='#page_export_font'>Export Font</a> &nbsp;<a href='#page_about'>About</a> &nbsp;</p><br/><a name = 'nav_and_layout'></a><h2>Navigation and Layout</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Glyphr Studio work space has three vertical areas: from left to right, the Navigation Bar, the Panel, and the Main Content area.  Selecting an icon in the Navigation Bar will update the Panel and the Main Content areas.  The top option in the Navigation Bar displays all the main pages in the Panel, allowing you to navigate around Glyphr Studio.</p><p>Some of the pages have additional Navigation Bar icons - like Attributes, Layers, and Character Selection - that are specific to character editing, or other activities.</p><p>The bottom-most icon in the Navigation Bar is a save icon - it does not actually navigate anywhere, but instead is just an omnipresent shortcut to save your Glyphr Project.  When there are changes that have not been saved, the save icon becomes slightly highlighted, and a diamond icon ❖ will be added to the browser title.</p><br/><a name = 'page_char_edit_and_linked_shapes'></a><h2>Character Edit and Linked Shapes pages</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Character Edit and Linked Shapes pages have many shape editing controls in common.  Linked Shapes are single outlines that can be inserted into many characters of a font.  Updating the Linked Shape will also update all the Linked Shape instances.  Characters in your font can have many shapes (both linked and not), so there is an added concept of Layers on the Character Edit page.</p><p>Linked Shapes are individual shapes that can be added to many Characters. Any time the Linked Shape is edited, all the Characters that use that Linked Shape are updated. There are many individual letter forms that are shared across characters in a single font - for example the round o form of the letters b, d, g, o, p, q. Linked Shapes were designed to make it easy to keep similar letter forms consistent across a font.</p><p>Creating new Linked Shapes, and adding a Linked Shape to a character can be done through the Actions list in the Attributes Panel. The Linked Shapes page is very similar to the Character Edit page. Each Linked Shape is just a single Shape, so there are no shape layers, or add shape buttons. The Linked Shapes page also displays all the shapes that use the current Linked Shape - they are displayed as a thumbnail in the lower left, and update as the Linked Shape is edited. Clicking on one of these thumbnails will navigate to the Character Edit page for that character.</p><br/><a name = 'shape_editing'></a><h2>Shape Editing</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Shape Editing concepts can be found on the Character Edit and Linked Shape pages.  In general, a font is just a collection of data, which can be represented hierarchically as:</p><p>Font<br/>- Character<br/>-- Shape<br/>--- Path<br/>---- Path Point<br/>----- Point and Handles<br/></p><p>This data, along with metadata and attributes for each, can be edited either in the Attributes Panel, or interactively using the Edit Canvas in the Content Area.</p><p>Many of these attributes can be locked by selecting the small lock icon to the left of the attribute.  This will stop this attribute from accidentally being changed, and in most cases, will limit what can be done on the Edit Canvas.</p><p>Unless otherwise noted, most attributes are in Em units.</p><br/><a name = 'edit_canvas_tools'></a><h2>Edit Canvas Tools</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>In the Upper Left hand side of the Edit Canvas there are 10 tools. The currently selected tool has a blue background. The tools, from left to right, are:<ul>	<li><b>Point Select</b> - Selects and edits individual Path Points and Handles. It cannot move or resize shapes.</li>	<li><b>Shape Select</b> - Selects, moves, and resizes shapes. It cannot edit the individual path points.</li>	<li><b>New Rectangle / New Oval</b> - Click and drag to draw new Rectangles or Ovals.</li>	<li><b>New Path</b> - Draws a new path. Single clicking will create Path Points that do not have handles.  Clicking and dragging will add a Path Point where the click began, and also a symmetrical handle where the click ends.  To stop adding new Path Points, either click the first Path Point, or click off the Edit Canvas.</li>	<li><b>Pan Tool</b> - Moves the canvas up/down/left/right.<br/>The Keyboard Shortcut for this tool is the Spacebar.</li>	<li><b>Zoom In / Zoom Out</b> - The plus / minus buttons will increase or decrease the size of the Edit Canvas.<br/>The Keyboard Shortcut for this tool is the Mouse Scroll Wheel.</li>	<li><b>1:1 Button</b> - Sets the Zoom level where 1 Pixel = 1 Em Unit.</li>	<li><b>M Button (Em Square Button)</b> - Sets the Zoom level to display the entire Em square area </li>	<li><b>Zoom Percent</b> - Displays the current zoom level (read only).</li></ul></p><br/><a name = 'attributes_character'></a><h2>Attributes Panel - Character</h2>(Character Edit Page)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p>When no shape is selected, the Attributes Panel shows attributes for the currently selected Character.<ul>	<li><b>Auto Width</b> - When selected, the width of the character will be calculated automatically based on the farthest right edge of all the Shapes in that character.</li>	<li><b>Width (em units)</b> - If Auto Width is set, this is a read-only attribute for how wide the character is in Em Units.  If Auto Width is not set, a width can be set manually for the character.</li>	<li><b>Width (em %)</b> - Read only display of how wide the character is as compared to the Em square.</li>	<li><b>Use Default Left Side Bearing</b> - When selected, the global default Left Side Bearing will be used for this character.  The Default Left Side Bearing can be updated in on the Font Settings page.  When not selected, the Left Side Bearing can be set manually for this character.</li>	<li><b>Left Side Bearing</b> - If Use Default Left Side Bearing is selected, this displays the inherited value.  If Use Default Left Side Bearing is not selected, this is where a custom value can be entered.</li>	<li><b>Number of Shapes</b> - A read only count of the number of shapes in this character.</li></ul></p><br/><a name = 'attributes_shape'></a><h2>Attributes Panel - Shape</h2>(Character Edit and Linked Shape Pages)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Name</b> - Any name you want to give this shape.</li>	<li><b>X/Y</b> - The shape's coordinates, as defined by the blue bounding box's upper left corner. </li>	<li><b>Height / Width</b> - Overall size dimensions of the shape. </li>	<li><b>Direction</b> - he clockwise or counterclockwise direction of Path Points along a Path determine if that path will additively or subtractively overlap with other Shapes in the character.</li></ul></p><br/><a name = 'attributes_path_point'></a><h2>Attributes Panel - Path Point </h2>(Character Edit and Linked Shape Pages)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Selected Point</b> - Displays which point is currently selected. 0 is the first Path Point.</li>	<li><b>Point Type</b> - Each Path Point has two handles that control the curve of the path before and after it. There are three kinds of Point Types: Corner (Handles can be anywhere), Flat (Handles will be in line with each other), and Symmetric (Handles will be in-line with each other and equidistant from the Path Point).</li>	<li><b>Point X/Y</b> - The Path Point's coordinates. </li>	<li><b>Use Handle 1/2</b> - Deselecting this will remove the handle, such that it will not impact the curvature of the path.</li>	<li><b>Handle 1 X/Y & Handle 2 X/Y</b> - The Handle's coordinates. </li></ul></p><br/><a name = 'attributes_linked_shape'></a><h2>Attributes Panel - Linked Shape Instance</h2>(Linked Shape Page)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Name</b> - Any name you want to give this Linked Shape Instance.  Can be different than the Linked Shape itself.</li>	<li><b>Use Linked Shape Position</b> - By default, a Linked Shape Instance is locked to the position of the Linked Shape.  Unchecking this option will give you the option to move the Linked Shape Instance.</li>	<li><b>ΔX / ΔY</b> - When Use Linked Shape Position is unselected, these coordinates are used to move the Linked Shape Instance to a new location.  These are delta values, meaning they are relative to the original Linked Shape.</li>	<li><b>Linked Shape Name</b> - A read-only value of the Linked Shape that this Linked Shape Instance is linked to.</li>	<li><b>Edit This Linked Shape (action button)</b> - This will navigate to the Linked Shapes page, and allow you to make changes to the original Linked Shape.</li></ul></p><br/><a name = 'page_test_drive'></a><h2>Test Drive Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Test Drive page is where your font can be tried out in real time. Typing in the upper textbox will display that same text in your font face in the lower box.</p><p>In the Attributes Panel, there is a list of Pangram buttons that will populate the upper textbox with sentences that contain all the letters of the alphabet. Similarly, there are buttons that will populate the upper textbox with certain character sets.</p><p>The Options area lets you change how your font is drawn to the lower box, including options for Font Size, Line Spacing, and Character Spacing.</p><p>The 'Generate PNG File' button will launch a new tab with an image of whatever is displayed in the lower box. Right-click the image to save the PNG file.</p><br/><a name = 'page_font_settings'></a><h2>Font Settings Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Font settings deal with global attributes that affect all characters in your font.  Glyphr Studio uses the properties in the Font Settings section to display and edit shapes:<ul>	<li><b>Character Proportions</b> - Characters have a total height of 1000 Units, called Em Units.  The baseline of that character splits the upper and lower portions of the character vertically.  Input an Ascent Height, and the Descent Height will be calculated automatically.</li>	<li><b>Default Left Side Bearing</b> - All characters a small amount of space to their left that separates them from another character to their left.  Individual Left Side Bearings can be edited in the Attributes Panel of that character.  But, to make things easier, if a specific Left Side Bearing is not set, this Default Left Side Bearing will be applied.</li>	<li><b>Line Gap</b> - This is the space between the bottom of the Em square of one line, and the top of the Em square of characters on a line underneath.</li></ul>Open Type Properties are a set of font metadata that is saved with the font file.  They include things like Font Name, Version Number, and other descriptive information.</p><br/><a name = 'page_project_settings'></a><h2>Project Settings Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>This information does not necessarily have a direct effect on the Font itself, but is used to help with designing your font.  This information is saved when a Glyphr Project is saved, and will be imported when a saved project is loaded.  Viewing the Grids and Guides can be toggled from the Actions section of the Attribute Panel.<ul>	<li><b>Project Name</b> - Initially, this project name is used as the Font Name as well.  But, the Glyphr Project can have a different name from the Font itself, which can be edited here.</li>	<li><b>Grid System</b> - This can be helpful in visualizing shape dimensions, it draws a light gray grid across the Edit Canvas.  Input a number of divisions per Em.</li>	<li><b>X Height</b> - another main dividing line within a character is the 'x height'.  It is a shorthand way of describing the average height of lowercase letters in a font.</li>	<li><b>Overshoot</b> - Usually rounded shapes extend a small amount past guide lines, so rounded shapes visually appear to line up with squared shapes.  This will draw a light overshoot guideline past the Cap Height, X Height, and Baseline guidelines.</li></ul></p><br/><a name = 'page_open_project'></a><h2>Open Project Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>There are two options for opening a new Glyphr Project: loading a previously-saved Glyphr Project file, or starting a new font from scratch. To load an existing Glyphr Project file, drag and drop the file onto the area indicated. To start a new project from scratch, edit the Project Name. The Font Name can be edited at any time from the Font Metadata page.</p><p>Loading or starting a new Glyphr Project will delete the current Glyphr Project, so be sure to save your existing project before loading or starting a new one.</p><br/><a name = 'page_export_font'></a><h2>Export Font Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>This page has information about TTX, a program used to turn font files into XML, and XML files back into fonts.  Glyphr uses TTX as an intermediary step to create a font file.  Glyphr will generate a TTX XML file for you, which you can then use to generate an OpenType font file.</p><p>More information can be found at <a href='http://www.glyphrstudio.com/ttx' target=_new>glyphrstudio.com/ttx</a></p><br/><a name = 'page_about'></a><h2>About Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Displays various information about the currently loaded Glyphr Project, and the current Glyphr Studio being used.  Glyphr Projects created with different versions of Glyphr Studio may not play nicely together.</p>";
	content += "</div>";
	getEditDocument().getElementById("mainwrapper").innerHTML = content;
}



	function loadPage_linkedshapes(){
		debug("LOADING PAGE >> loadPage_linkedshapes");
		getEditDocument().getElementById("mainwrapper").innerHTML = linkedshapes_content();

		setupEditCanvas();
		setupGhostCanvas();

		initEventHandlers();
		grid();
		document.onkeypress = keypress;

		_UI.selectedshape = -1;
		linkedshapesredraw("loadPage_linkedshapes");
	}

	function linkedshapes_content(){
		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		re += '<table class="charedittable" cellspacing=0 cellpadding=0 border=0><tr>';
		re += '<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>';
		re += '<tr><td id="actionsarea"> [ERROR: Uninitialized content] </td>';
		re += '</tr></table>';

		return re;
	}

	function makePanel_LinkedShapeChooser(){
		var re = "<h1>linked shapes</h1>";
		re += "<div class='subnavunit'>";
		re += "<table class='layertable'>";
		for(var ssid in _GP.linkedshapes){
			//debug("LINKEDSHAPES_SUBNAV - making button for " + ssid);
			re += makeLinkedShapeSubNavButton(ssid);
		}
		re += "</table>";

		re += "<h1>actions</h1>";
		re += "<table class='actionsgrid'><tr><td><h3>linked shape</h3>";
		re += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"Create New Linked Shape\");navigate();'><br>";
		re += "<input class='"+(aalength(_GP.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";
		re += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";
		re += "</td> &nbsp; </td></td> &nbsp; </td></tr></table>";

		return re;
	}

	function drawPanel_LinkedShapeChooser(){
		//debug("drawPanel_LinkedShapeChooser - start");
		var ps = _GP.projectsettings;
		var tctx = {};
		var tele = false;
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.ascent*factor));
		for(var ssid in _GP.linkedshapes){
			tele = document.getElementById(("layerthumb"+ssid));
			tctx = tele.getContext("2d");
			tele.style.backgroundColor = _UI.colors.offwhite;
			if(ssid==_UI.shownlinkedshape) tele.style.backgroundColor = "rgb(255,255,255)";
			_GP.linkedshapes[ssid].shape.drawShapeToArea(tctx, {"dz" : factor, "dx" : _UI.thumbgutter, "dy" : yoffset});
		}
		//debug("drawPanel_LinkedShapeChooser - end");
	}

	function makeLinkedShapeSubNavButton(ssid){
		//debug("makeLinkedShapeSubNavButton passed ssid:" + ssid + " and SS JASON: \n" + JSON.stringify(_GP.linkedshapes.id0));
		var re = "";

		if(ssid==_UI.shownlinkedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='makeLinkedShapeSelected(\"" + ssid + "\");'>";
		re += "<td class='layerthumb'><canvas id='layerthumb"+ssid+"' height='"+_UI.thumbsize+"' width='"+_UI.thumbsize+"'></canvas></td>";
		re += "<td class='layername'>" + _GP.linkedshapes[ssid].shape.name + "</td></tr>";

		return re;
	}

	function makeLinkedShapeSelected(ssid){
		//debug("MAKELINKEDSHAPESELECTED - ssid: " + ssid);
		_UI.shownlinkedshape = ssid;
		_UI.selectedshape = ssid;
		_UI.shapelayers = [_GP.linkedshapes[ssid].shape];
		navigate('npAttributes');
	}


//-------------------
// REDRAW
//-------------------

	function linkedshapesredraw(calledby){
		//debug(Date.now()+"\t:: LINKEDSHAPESREDRAW Called By: " + calledby + " - Shown Linked Shape: " + _UI.shownlinkedshape + " - Selected Shape: " + _UI.selectedshape);

		if(_UI.redrawing){
			// this is totally a hack
			debug("LINKEDSHAPESREDRAW - RETURNING because _UI.redrawing = " + _UI.redrawing);
			return;
		}

		_UI.redrawing = true;

		_UI.chareditctx.clearRect(0,0,5000,5000);
		grid();
		vertical(_UI.chareditcanvassize.makeCrisp());

		_GP.linkedshapes[_UI.shownlinkedshape].shape.drawShape_Single(_UI.chareditctx);

		if(_GP.linkedshapes[_UI.selectedshape]) {
			_GP.linkedshapes[_UI.selectedshape].shape.drawSelectOutline();
		}

		update_NavPanels();

		updatetools();
		_UI.redrawing = false;
		//debug(Date.now()+"\t:: LINKEDSHAPESREDRAW DONE - Called By: " + calledby);
	}


//-------------------
// Update Details
//-------------------
	function linkedShapeCharDetails(){
		var content = "";

		if(_GP.linkedshapes[_UI.shownlinkedshape].usedin.length > 0){
			content += "<table style='margin-top:10px;'><tr><td colspan=3><h3>characters that use this linked shape</h3>";
			content += generateUsedinThumbs();
			content += "</td></tr></table>";
		} else {
			content += "<table><tr><td>&nbsp;</td><td colspan=2><br><i>this linked shape is not currently being used by any characters. <a href='#' onclick='showAddSSToCharDialog();'>add this linked shape to a character now</a>.</i></td></tr></table>";
		}

		//debug("LINKEDSHAPECHARDETAILS - returning html:\n" + content);
		return content;
	}

	function generateUsedinThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		var ui = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		var unique = ui.filter(function(elem, pos) { return ui.indexOf(elem) == pos;});

		for(var k=0; k<unique.length; k++){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas id='thumb"+unique[k]+"' class='ssusedinthumb' height="+_UI.thumbsize+"' width="+_UI.thumbsize+" onclick='goToEditChar("+(unique[k]*1)+");'></canvas>";
			re += "</td></tr><tr><td>";
			re += _GP.fontchars[(unique[k]*1)].charvalue;
			re += "</td></tr></table>";
			//debug("GENERATEUSEDINTHUMBS - created canvas 'thumb"+unique[k]+"'");
		}
		re += "</div>";
		return re;
	}

	function goToEditChar(chid){
		_UI.selectedshape = -1;
		_UI.selectedchar = chid;
		_UI.navhere = "character edit";
		_UI.navprimaryhere = "npAttributes";
		navigate();
	}

	function drawUsedinThumbs(){
		var ps = _GP.projectsettings;
		var ui = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		//debug("DRAWUSEDINTHUMBS - start, drawing " + ui.length);
		var tctx = {};
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.ascent*factor));

		//debug("DRAWUSEDINTHUMBS - used in array is " + JSON.stringify(ui));

		for(var k=0; k<ui.length; k++){
			//debug("DRAWUSEDINTHUMBS - getting thumb " + ui[k]);
			tctx = document.getElementById(("thumb"+ui[k])).getContext("2d");
			_GP.fontchars[ui[k]].drawCharToArea(tctx, {"dz" : factor, "dx" : _UI.thumbgutter, "dy" : yoffset});
			//debug(" - drawCharToArea canvas 'thumb"+ui[k]+"'");
		}
	}



//-------------------
// Update Actions
//-------------------
	function updatelinkedshapeactions(){
		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";

		var s = ss("Update Actions");

		var allactions = "<td><h3>*</h3>";
			allactions += "<input class='"+(_UI.linkedshapeundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((_UI.linkedshapeundoq.length > 0) ? (" " + _UI.linkedshapeundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "<input class='button' type='button' value='Copy' onclick='copyShape()'><br>";
			allactions += "</td>";

		var linkedshapeactions = "<td><h3>linked shape</h3>";
			linkedshapeactions += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"Create New Linked Shape\");navigate();'><br>";
			linkedshapeactions += "<input class='"+(aalength(_GP.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";
			linkedshapeactions += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";

		var shapeactions = "";
			if(_UI.eventhandlers.temppathdragshape && _UI.selectedtool=="pathedit"){
			shapeactions += "<td><h3>shape</h3>";
			shapeactions += "<input class='button' type='button' value='Flip Horizontal' onclick='ss().path.flipEW();putundoq(\"Flip Shape Horizontal\");redraw(\"updatelinkedshapeactions\");'><br>";
			shapeactions += "<input class='button' type='button' value='Flip Vertical' onclick='ss().path.flipNS();putundoq(\"Flip Shape Vertical\");redraw(\"updatelinkedshapeactions\");'><br>";
			shapeactions += "</td>";
			}

		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='_UI.showgrid? _UI.showgrid=false : _UI.showgrid=true; redraw(\"updatelinkedshapeactions\");'><br>";
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='_UI.showguides? _UI.showguides=false : _UI.showguides=true; redraw(\"updatelinkedshapeactions\");'><br>";
			canvasactions += "</td>";

		var pointactions = "<td><h3>path point</h3>";
			pointactions += "<input class='button' type='button' value='Insert' onclick='ss().path.insertPathPoint(); putundoq(\"Insert Path Point\"); redraw(\"updatelinkedshapeactions\");'><br>";
			pointactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='ss().path.deletePathPoint(); putundoq(\"Delete Path Point\"); redraw(\"updatelinkedshapeactions\");'><br>";
			pointactions += "<input class='button' type='button' value='Reset Handles' onclick='ss().path.sp().resetHandles(); putundoq(\"Reset Path Point\"); redraw(\"updatelinkedshapeactions\");'><br>";
			pointactions += "</td>";

		// Put it all together
		content += allactions;
		content += linkedshapeactions;
		content += shapeactions;

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		else { content += "<td><h3>&nbsp;</h3></td>"; }

		content += "</tr><tr>";
		content += canvasactions;

		content += "</td></tr></table>";
		return content;
	}

	function addLinkedShape(){
		var newid = generateNewSSID();
		var newname = ("linkedshape " + _GP.projectsettings.linkedshapecounter);

		_UI.shownlinkedshape = newid;
		_UI.selectedshape = newid;

		_GP.linkedshapes[newid] = new LinkedShape({"name":newname});

		//debug("Added New Linked Shape: " + newid + " JSON=" + JSON.stringify(_GP.linkedshapes));
	}

	function deleteLinkedShapeConfirm(){
		var content = "Are you sure you want to delete this linked shape?<br>";
		var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the linked shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _GP.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This linked shape is not currently being used by any characters.<br>";
		}

		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><input type='button' value='permanently delete this linked shape' onclick='deleteLinkedShape();'> &nbsp; <input type='button' value='cancel' onclick='closeDialog();'>";

		openDialog(content);
	}

	function deleteLinkedShape(){
		//debug("DELETELINKEDSHAPE - deleting " + _UI.shownlinkedshape);
		closeDialog();
		if(aalength(_GP.linkedshapes)>1){
			// find & delete all linked shape instances
			var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = _GP.fontchars[uia[cui]].charshapes;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #_UI.shapelayers " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .link " + tc[sl].link + " checking against " + _UI.shownlinkedshape);
					if(tc[sl].link == _UI.shownlinkedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}

			// delete linkedshape and switch selection
			delete _GP.linkedshapes[_UI.shownlinkedshape];
			_UI.shownlinkedshape = getFirstLinkedShape();
			_UI.selectedshape = _UI.shownlinkedshape;
			//debug("DELETELINKEDSHAPE - delete complete, new shownlinkedshape = " + shownlinkedshape);

			navigate();
		} else {
			alert("Error: deleting the last linked shape should not have been an allowed action.");
		}
	}

	function pasteLinkedShape(){
		if(_UI.clipboardshape){
			_GP.linkedshapes[_UI.shownlinkedshape].shape = _UI.clipboardshape;
		}
	}

	function showAddSSToCharDialog(msg){
		var content = "<table style='width:756px'><tr><td>";
		content += msg? msg : "There is currently " + _GP.linkedshapes[_UI.shownlinkedshape].usedin.length + " instances of '" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "' being used.<br><br>";
		content += "Select the character into which you would like to insert this linked shape:<br><br></td></tr>";
		content += "<tr><td>";
		content += makeGenericCharChooserContent("insertLinkedShapeToChar");
		content += "</td></tr>";
		content += "<tr><td><br><input type='button' class='button' value='done' onclick='closeDialog();'/></td></tr></table>";
		openDialog(content);
		drawGenericCharChooserContent();
	}

	function insertLinkedShapeToChar(chid){
		var temschar = _UI.selectedchar;
		selectchar(chid, true);
		insertLinkedShape(_UI.shownlinkedshape);
		_UI.selectedchar = temschar;
		putundoq("Insert Linked Shape to Character");
		closeDialog();
		showAddSSToCharDialog("The LinkedShape '" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "' was successfully inserted into character " + _GP.fontchars[chid].charname + ".<br><br>");
	}




	function loadPage_openproject(){
		debug("LOADING PAGE >> loadPage_openproject");
		var ct = "<div class='pagecontent textpage'><h1>Open Project</h1>" +
		"<h2>But wait!</h2>If you open a new project, your current project will be lost.  Be sure to download a Glyphr " +
		"project file if you want to save your current project.<br><br>" +
		"<input type='button' class='button'style='padding:10px;' value='Save current project' onclick='triggerProjectFileDownload();'/><br><br>" +
		"<h2>Okay, now...</h2>";

		ct += importOrCreateNew();
		ct += "</div>";


		getEditDocument().getElementById("mainwrapper").innerHTML = ct;
		getEditDocument().getElementById("droptarget").addEventListener('dragover', handleDragOver, false);
		getEditDocument().getElementById("droptarget").addEventListener('drop', handleDrop, false);
	}

	function loadPage_firstrun(){
		debug("LOADING PAGE >> loadPage_firstrun");
		var ct = "<div class='splashscreen textpage'><canvas id='splashscreencanvas' height=494 width=800></canvas>";
		ct += "<div class='splashver'>"+_UI.thisGlyphrStudioVersion+"<br><br>";
		ct += "For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>";
		ct += "Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
			"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
			"this license and it's freeness stays intact.";
		ct += "</div>";
		ct += importOrCreateNew();
		ct += "</div>";

		var mp = getEditDocument().getElementById("mainwrapper");
		mp.innerHTML = ct;
		mp.style.marginLeft = "0px";
		getEditDocument().getElementById("droptarget").addEventListener('dragover', handleDragOver, false);
		getEditDocument().getElementById("droptarget").addEventListener('drop', handleDrop, false);

		drawSplashScreen();
	}

	function handleDrop(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var fcontent = "";

		document.getElementById("droptarget").innerHTML = "Loading File...";
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				fcontent = JSON.parse(reader.result);
				if(fcontent.projectsettings.version){
					hydrateGlyphrProject(fcontent);
					//debug("Loading project; " + _GP.projectsettings.name);
				} else {
					document.getElementById("droptarget").innerHTML = "drop file here...";
					alert("File does not appear to be a Glyphr Project, try again...");
				}
			};
		})(f);

		reader.readAsText(f);

	}

	function hydrateGlyphrProject(data) {
		_GP = clone(_UI.default_GP);

		// Project Settings
		if(data.projectsettings) _GP.projectsettings = clone(data.projectsettings);

		// Open Type Properties
		if(data.opentypeproperties) _GP.opentypeproperties = clone(data.opentypeproperties);

		// Linked Shapes
		for (var ssid in data.linkedshapes) {
			if(data.linkedshapes.hasOwnProperty(ssid)){
				_GP.linkedshapes[ssid] = new LinkedShape(data.linkedshapes[ssid]);
			}
		}

		// Characters
		for (var i = 0; i < data.fontchars.length; i++) {
			if(data.fontchars[i]){
				_GP.fontchars[i*1] = new Char(data.fontchars[i]);
			}
		}

		//debug("\n\nHDRYATEGLYPHRPROJECT: PASSED \n" + JSON.stringify(data));
		//debug("\n\nHDRYATEGLYPHRPROJECT: HYDRATED \n" + JSON.stringify(_GP));

		finalizeGlyphrProject();
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}


	function importOrCreateNew(){
		var con = "<table style='width:100%;'><tr><td style='padding-right:50px; width:45%;'>"+
						"<h3>Load an existing Glyphr Project</h3>"+
						"<div id='droptarget'>drop file here...</div>"+
					"</td><td style='width:9%'>&nbsp;</td>"+
					"</td><td style='width:45%;'>"+
						"<h3>Start a new Glyphr Project</h3>"+
						"Project name: &nbsp; <input id='newprojectname' type='text' value='My Font'/><br>"+
						"<input type='button' class='buttonsel' value=' Start a new font from scratch ' onclick='newGlyphrProject()'><br><br>"+
					"</td></tr></table>";

		return con;
	}

	function newGlyphrProject(){
		var fn = document.getElementById("newprojectname").value;
		fn = (fn? fn : "My Font");

		_GP = clone(_UI.default_GP);

		_GP.projectsettings.name = fn;
		_GP.opentypeproperties.name[1].val = fn;
		_GP.opentypeproperties.name[3].val = (fn + " 1.0");
		_GP.opentypeproperties.name[4].val = fn;
		_GP.opentypeproperties.name[6].val = fn;
		setOTprop("cff", "FullName", fn);
		setOTprop("cff", "FamilyName", fn);

		setOTprop("head", "created", ttxDateString());
		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;

		_GP.fontchars = createNewFontcharsArray();

		_GP.linkedshapes = {};
		_GP.linkedshapes["id0"] = new LinkedShape({"shape": new Shape({})});

		finalizeGlyphrProject();
	}




	function finalizeGlyphrProject(){
		//debug("FINALIZEGLYPHRPROJECT - start of function");
		_UI.charcurrstate = clone(_GP.fontchars);
		_UI.linkcurrstate = clone(_GP.linkedshapes);

		if(!isval(_GP.projectsettings.linkedshapecounter)){
			_GP.projectsettings.linkedshapecounter = 0;
		}

		_UI.selectedchar = 97;
		_UI.shownlinkedshape = getFirstLinkedShape();

		resetThumbView();

		_UI.navhere = "character edit";
		navigate();
	}
	function loadPage_projectsettings(){
		debug("LOADING PAGE >> loadPage_projectsettings");
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Project Settings</h1>";
		content += "These project and interface settings will be saved with your Glyphr project file.";

		content += "<h2>Project Name</h2>"+
					"The Font Name and the Project name can be different, but they start out the same.  The Font Name details can be changed on the Font Settings page."+
					"<table class='fontmetricstable'>"+
					"<tr><td>Project Name:</td><td><input type='text' style='width:100%' value='" + ps.name + "' onchange='_GP.projectsettings.name = this.value;' /></td></tr>"+
					"</table><br>";

		content += "<h2>Grids and Guides</h2>";
		content += "<h3>Grid System</h3>";
		content += "Defining a grid system to use while editing characters in this font makes stuff a whole " +
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " +
					"divide evenly into the Units per Em.<br>" +
					"<table class='fontmetricstable'>"+
					"<tr><td>Units per Em:</td><td><input type='text' disabled='disabled' value='" + ps.upm + "'/></td><td><span class='unit'>(total)</span></td></tr>"+
					"<tr><td>Grid Divisions</td><td><input type='text' value='"+ps.griddivisions+"' onchange='updateGridDivisions(this.value);'/>"+spinner()+"</td><td><span class='unit'>(number)</span></td></tr>"+
					"<tr><td>Grid Square Size:</td><td><input type='text' id='metirc-ssize' disabled='disabled' value='" + (ps.upm/ps.griddivisions) + "'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>x Height</h3>";
		content += "X-height is the distance between the baseline, and the top of lowercase letters.<br>"+
					"<table class='fontmetricstable'>"+
					"<tr><td>x Height: </td><td><input type='text' id='metric-xheight' value='"+ps.xheight+"' onchange='_GP.projectsettings.xheight = this.value'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>Overshoot</h3>";
		content += "Round letters usually extend a little above the x height line and below the baseline. " +
					"A light guideline will show this overshoot distance.<br>" +
					"<table class='fontmetricstable'>"+
					"<tr><td>Overshoot:</td><td><input type='text' value='"+ps.overshoot+"' onchange='_GP.projectsettings.overshoot = this.value);'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		content += "</div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

	function updateGridDivisions(val){
		var ps = _GP.projectsettings;
		ps.griddivisions = Math.min(ps.upm, Math.max(1, val));
		document.getElementById('metirc-ssize').value = (ps.upm / ps.griddivisions);
	}
	function loadPage_testdrive(){
		debug("LOADING PAGE >> loadPage_testdrive");

		update_NavPanels();

		var content = "<div class='pagecontent'><h1>Test Drive</h1>" +
			"<textarea id='tdtextarea' onkeyup='updateTestdriveCanvas()'></textarea><br>" +
			"<canvas id='tdcanvas'></canvas><br>" +
			"<div id='genimg' style='display:none;'></div></div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		document.getElementById("tdtextarea").focus();

		_UI.testdrivecanvas = document.getElementById("tdcanvas");
		_UI.testdrivecanvas.width = 800;
		_UI.testdrivecanvas.height = 700;
		_UI.testdrivectx = _UI.testdrivecanvas.getContext("2d");

		if(_UI.navprimaryhere == "npAttributes") changefontscale(100);
	}

	function makePanel_TestDriveOptions(){
		if(_UI.navprimaryhere != "npAttributes") return;

		var content = "<h1>settings</h1><h2>sample text</h2><div>" + drawSampletextButtons() + "</div>";
			content += "<br><h2>options</h2><div>" + drawTDOptions() + "</div>";
			content += "</td></tr></table></div>";

		return content;
	}

	function updateTestdriveCanvas(){
		var text = document.getElementById("tdtextarea").value;
		var tctx = _UI.testdrivectx;
		var ps = _GP.projectsettings;
		var scale = _UI.testdrive_fontscale;
		var contentArray = text.split("");
		var textEm = (_GP.projectsettings.upm*scale);
		var currx = _UI.testdrive_padsize;
		var curry = _UI.testdrive_padsize + (ps.ascent*scale);
		var cc;

		tctx.clearRect(0,0,5000,5000);
		if(_UI.testdrive_showhorizontals) drawLine(curry);

		for(var k=0; k<contentArray.length; k++){
			if(contentArray[k] == "\n"){
				// reset X val
				currx = _UI.testdrive_padsize;

				// calc Y val
				curry += (textEm);
				curry += ((document.getElementById("linegap").value*1)*scale);

				// draw baseline
				if(_UI.testdrive_showhorizontals) drawLine(curry);
			} else {
				cc = getCharFromText(contentArray[k]);
				if(cc){
					if(_UI.testdrive_showcharbox){
						tctx.fillStyle = "transparent";
						tctx.strokeStyle = _UI.colors.accent;
						tctx.lineWidth = 1;

						tctx.strokeRect(
							currx.makeCrisp(),
							(curry.makeCrisp()-(ps.ascent*scale)),
							round(cc.charwidth*scale),
							round(textEm)
						);
					}

					currx += cc.drawCharToArea(tctx, {"dz" : _UI.testdrive_fontscale, "dx" : currx, "dy" : curry});
					currx += (document.getElementById("charspacing").value*1*scale);
				}
			}
		}
	}

	function drawLine(y){
		//debug("TESTDRIVE - Drawing h line at " + y);
		y = y.makeCrisp();
		_UI.testdrivectx.strokeStyle = _UI.colors.accent;
		_UI.testdrivectx.beginPath();
		_UI.testdrivectx.lineWidth = 1;
		_UI.testdrivectx.moveTo(0,y);
		_UI.testdrivectx.lineTo(_UI.testdrivecanvas.width,y);
		_UI.testdrivectx.stroke();
		_UI.testdrivectx.closePath();
	}

	function drawSampletextButtons(){
		var content = "<h3>pangrams</h3>";
		content += makeTDButton("the five boxing wizards jump quickly");
		content += makeTDButton("pack my box with five dozen liquor jugs");
		content += makeTDButton("the quick brown fox jumps over a lazy dog");
		content += makeTDButton("amazingly few discotheques provide jukeboxes");
		content += makeTDButton("quick enemy movement will jeopardize six of the gunboats");
		content += "<h3>character sets</h3>";
		content += makeTDButton("abcdefghijklmnopqrstuvwxyz");
		content += makeTDButton("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		content += makeTDButton("0123456789");
		content += makeTDSymbolButton();

		return content;
	}

	function makeTDButton(text){
		return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\""+text+"\";updateTestdriveCanvas();' value='"+text+"'><br>";
	}

	function makeTDSymbolButton(){
		//return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\"!&quot;#$%&&#39;()*+,-./:;&lt;=&gt;?@[\]^_`{|}~\";updateTestdriveCanvas();' value='!&quot;#$%&&#39;()*+,-./:;&lt;=&gt;?@[\]^_`{|}~'><br>";
		return "<input type='button' class='button' onclick='document.getElementById(\"tdtextarea\").value=\"!\\\"#$%&&#39;()*+,-./:;\\\<=\\\>?@[\\\\]^_`{|}~\";updateTestdriveCanvas();' value='!\"#$%&&#39;()*+,-./:;\<=\>?@[\\]^_`{|}~'><br>";
	}

	function drawTDOptions(){
		var content = "<table class='detail'>";
		content += "<tr><td> font size <span class='unit'>(px)</span> </td><td><input class='input' type='text' value='100' onchange='changefontscale(this.value); updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> 96dpi font size <span class='unit'>(pt)</span> </td><td id='roughptsize'>75</td></tr>";
		content += "<tr><td> line gap <span class='unit'>(em units)</span> </td><td><input class='input' id='linegap' type='text' value='"+_GP.projectsettings.linegap+"' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> character spacing <span class='unit'>(em units)</span> </td><td><input class='input' id='charspacing' type='text' value='0' onchange='updateTestdriveCanvas();'>"+spinner()+"</td></tr>";
		content += "<tr><td> show character boxes </td><td><input type='checkbox'" + (_UI.testdrive_showcharbox? " checked " : "") + " onchange='_UI.testdrive_showcharbox = this.checked; updateTestdriveCanvas();'></td></tr>";
		content += "<tr><td> show baseline </td><td><input type='checkbox'" + (_UI.testdrive_showhorizontals? " checked " : "") + " onchange='_UI.testdrive_showhorizontals = this.checked; updateTestdriveCanvas();'></td></tr>";

		content += "<tr><td colspan=2><input type='button' class='button' value='generate png file' onclick='createimg();'></td></tr>";
		content += "</table>";
		return content;
	}

	function changefontscale(newval){
		_UI.testdrive_fontscale = (newval/_GP.projectsettings.upm);
		document.getElementById("roughptsize").innerHTML = (newval*0.75);
	}

	function createimg(){
		var imgd = document.getElementById('tdcanvas').toDataURL();

		var win = window.open(document.location.href, "Glyphr Test Drive");

		win.document.write('<!DOCTYPE html><html>'+
		'<head><title>Glyphr - Test Drive Image</title></head>'+
		'<body style="padding:40px; text-align:center;">'+
		'<img src="' + imgd + '" title="Glyphr Test Drive" style="border:1px solid #f6f6f6;">'+
		'</html>');
	}

//-------------------
// Actions Panel
//-------------------
	function makePanel_Actions(){
		//stack(arguments);

		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";

		var s = ss("Update Actions");

		var allactions = "<td><h3>universal</h3>";
			allactions += "<input  class='"+(_UI.charundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((_UI.charundoq.length > 0) ? (" " + _UI.charundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "<input class='button' type='button' value='add new shape' onclick='addShape();putundoq(\"Add Shape\");redraw(\"updateactions\");'><br>";
			allactions += "<input class='button' type='button' value='add linked shape' onclick='insertLinkedShapeDialog();'><br>";
			allactions += "<input class='"+(_UI.clipboardshape? "button": "buttondis")+"' type='button' value='Paste' onclick='pasteShape();putundoq(\"Paste Shape\");redraw(\"updateactions\");'><br>";

			allactions += "</td>";

		var shapeactions = "<td><h3>shape</h3>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Copy' onclick='copyShape()'><br>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Flip Horizontal' onclick='ss().path.flipEW();putundoq(\"Flip Shape Horizontal\");redraw(\"updateactions\");'><br>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Flip Vertical' onclick='ss().path.flipNS();putundoq(\"Flip Shape Vertical\");redraw(\"updateactions\");'><br>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='deleteShape();putundoq(\"Delete Shape\");redraw(\"updateactions\");'><br>";

			shapeactions += "</td>";

		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Up' onclick='moveupShape();putundoq(\"Move Shape Layer Up\");'><br>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Down' onclick='movedownShape();putundoq(\"Move Shape Layer Down\");'><br>";
			layeractions += "</td>";

		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='_UI.showgrid? _UI.showgrid=false : _UI.showgrid=true; redraw(\"updateactions\");'><br>";
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='_UI.showguides? _UI.showguides=false : _UI.showguides=true; redraw(\"updateactions\");'><br>";
			canvasactions += "</td>";

		var pointactions = "<td><h3>path point</h3>";
			pointactions += "<input class='button' type='button' value='Insert' onclick='ss().path.insertPathPoint(); putundoq(\"Insert Path Point\"); redraw(\"updateactions\");'><br>";
			pointactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='ss().path.deletePathPoint(); putundoq(\"Delete Path Point\"); redraw(\"updateactions\");'><br>";
			pointactions += "<input class='button' type='button' value='Reset Handles' onclick='ss().path.sp().resetHandles(); putundoq(\"Reset Path Point\"); redraw(\"updateactions\");'><br>";
			pointactions += "</td>";

		// Put it all together

		content += allactions;

		if(_UI.shapelayers.length > 0){ content += shapeactions; }
		else { content += "<td> &nbsp; </td>";}

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(ispointsel){ content += pointactions; }
		else { content += "<td> &nbsp; </td>";}

		content += "</tr><tr>";

		content += canvasactions;

		if(_UI.shapelayers.length > 1){ content += layeractions; }

		content += "</td></tr></table><br><br>";

		return content;
	}

	function updateLayerActions(){
		//stack(arguments);

		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";

		var s = ss("Update Actions");
		var allactions = "<td><h3>shape</h3>";
			allactions += "<input class='button' type='button' value='add new shape' onclick='addShape();putundoq(\"Add Shape\");redraw(\"updateLayerActions\");'><br>";
			allactions += "<input class='button' type='button' value='add linked shape' onclick='insertLinkedShapeDialog();'><br>";

		var shapeactions = "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='deleteShape();putundoq(\"Delete Shape\");redraw(\"updateLayerActions\");'><br>";

		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Up' onclick='moveupShape();putundoq(\"Move Shape Layer Up\");'><br>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Down' onclick='movedownShape();putundoq(\"Move Shape Layer Down\");'><br>";
			layeractions += "</td>";

		content += allactions;

		if(_UI.shapelayers.length > 0){ content += shapeactions; }
		content += "</td>";

		if(_UI.shapelayers.length > 1){ content += layeractions; }

		content += "<td> &nbsp; </td></tr></table>";

		return content;
	}

//-------------------
// Copy Paste
//-------------------
	function copyShape(){
		//stack(arguments);

		if(_UI.navhere == "linked shapes"){
			_UI.clipboardshape = {
				"s":_GP.linkedshapes[_UI.shownlinkedshape].shape,
				"c":_UI.shownlinkedshape
			};
		} else if (_UI.navhere == "character edit"){
			var s = ss("copy shape");
			if(s.link) s = _GP.linkedshapes[s.link].shape;
			if(s){
				_UI.clipboardshape = {
					"s":s,
					"c":_UI.selectedchar
				};
				//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape.s.name);
			}
			redraw("copyShape");
		}
	}

	function pasteShape(){
		//stack(arguments);

		if(_UI.clipboardshape){
			var newshape = clone(_UI.clipboardshape.s);
			if(_UI.clipboardshape.c != _UI.selectedchar) newshape.path.updatePathPosition(20,20,true);

			var newname = newshape.name;
			var newsuffix = " (copy)";
			var n = newshape.name.lastIndexOf("(copy");

			if(n > 0){
				var suffix = newname.substring(n+5);
				newname = newname.substring(0,n);
				if(suffix == ")"){
					newsuffix = "(copy 2)";
				} else {
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(1);
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(0, suffix.length-1);
					//debug("PASTESHAPE - suffix " + suffix);
					newsuffix = "(copy " + (parseInt(suffix)+1) + ")";
					//debug("PASTESHAPE - newsuffix " + newsuffix);
				}
			}
			newshape.name = newname + newsuffix;

			if(newshape.link){
				addToUsedIn(newshape.link, _UI.selectedchar);
				//debug("PASTESHAPE - pasted a linkedshape, added " + _UI.selectedchar + " to usedin array.");
			}

			addShape(newshape);
		}
	}


//-------------------
// Move up / down
//-------------------
	function moveupShape(){
		//stack(arguments);

		var s = ss("Move Up Shape");

		if(s && (_UI.selectedshape < (_UI.shapelayers.length-1))){
			var tempshape = _UI.shapelayers[_UI.selectedshape+1];
			_UI.shapelayers[_UI.selectedshape+1] = _UI.shapelayers[_UI.selectedshape];
			_UI.shapelayers[_UI.selectedshape] = tempshape;
			_UI.selectedshape++;
			redraw("moveupShape");
		}
	}

	function movedownShape(){
		//stack(arguments);

		var s = ss("Move Down Shape");

		if(s && (_UI.selectedshape > 0)){
			var tempshape = _UI.shapelayers[_UI.selectedshape-1];
			_UI.shapelayers[_UI.selectedshape-1] = _UI.shapelayers[_UI.selectedshape];
			_UI.shapelayers[_UI.selectedshape] = tempshape;
			_UI.selectedshape--;
			redraw("movedownShape");
		}
	}


//-------------------
// Generic Spinner Control
//-------------------
	function spinner(){
		//stack(arguments);

		var content ="";
		content += "<input type='button' value='&#9652;' class='button spinnerbutton' onclick='inc(this);'>";  //&and;
		content += "<input type='button' value='&#9662;' class='button spinnerbutton' onclick='dec(this);'>";  //&or;
		return content;
	}

	function inc(obj){
		//stack(arguments);

		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) + _GP.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			//putundoq("Up Spinner");
		}
	}

	function dec(obj){
		//stack(arguments);

		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) - _GP.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			//putundoq("Down Spinner");
		}
	}

//-------------------
// Panel Attributes
//-------------------
	function makePanel_Attributes(){
		//stack(arguments);

		//debug("UPDATECHAREDITDETAILS");

		var s = ss("update details");

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		var content = "";
		if(_UI.navhere == "linked shapes"){
			content = "<h1>" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "</h1>";
		} else {
			content = "<h1>attributes</h1>";
		}

		_UI.locarr = [];
		_UI.checkarr = [];

		content += "<table class='detail'>";

		//debug("UPDATEDETAILS - _UI.selectedshape: " + _UI.selectedshape + " - s.name: " + s.name + " - navhere: " + _UI.navhere);
		if (_UI.navhere == "character edit"){
			//debug("UPDATEDETAILS - detected navhere = character edit");
			if(s && s.link){
				// linked shape selected
				//debug("UPDATEDETAILS: linked shape selected");
				content += linkedShapeInstanceDetails(s);
			} else if (s){
				// regular shape selected
				//debug("UPDATEDETAILS: regular shape selected");
				content += shapeDetails(s);
				if(ispointsel){ content += pointDetails(s); }
			} else {
				// no shape selected
				//debug("UPDATEDETAILS: no shape selected");
				content += charDetails();
			}

			content += "</table><br>";
			content += makePanel_Actions();

		} else if (_UI.navhere == "linked shapes"){
			//debug("UPDATEDETAILS - detected navhere = linked shapes");
			if (s){
				content += shapeDetails(s);
				if(ispointsel){
					content += pointDetails(s);
				}
			}
			content += linkedShapeCharDetails();
			content += "</table><br>";
			content += updatelinkedshapeactions();
		}

		return content;
	}

	function drawPanel_Attributes(){
		var s = ss("update details");

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		if(ispointsel) drawPointButtons(s);

		// draw UsedInThumbs for LinkedShapes
		if(_UI.navhere == "linked shapes") drawUsedinThumbs();

		// draw locks
		//debug("UPDATEDETAILS - starting drawing locks, locarr.length = " + _UI.locarr.length);
		var obj, thislocid, thischeckid, color;

		for(var j=0; j<_UI.locarr.length; j++){
			thislocid = ("locid"+j);
			obj = document.getElementById(thislocid);
			//debug("UPDATEDETAILS - drawing lock id " + thislocid + " obj = " + obj);
			if(obj){
				obj.height = 11;
				obj.width = 11;
				color = _UI.locarr[j]? _UI.colors.button_selected : _UI.colors.button_resting;
				drawLockButton(obj, color);
			}
		}
		_UI.locid = 0;


		//draw checks
		for(var k=0; k<_UI.checkarr.length; k++){
			thischeckid = ("checkid"+k);
			obj = document.getElementById(thischeckid);
			if(obj){
				//debug("Drawing Check with ID: " + thischeckid + ", obj: " + obj + " passed: " + _UI.checkarr[k]);
				obj.height = 15;
				obj.width=15;
				drawCheckbox(obj, _UI.checkarr[k]);
			}
		}
		_UI.checkid = 0;
	}

	function charDetails(s){
		//stack(arguments);

		var sc = _GP.fontchars[_UI.selectedchar];
		var content = "";

		content += "<tr><td colspan=3><h3>character "+sc.charvalue+"</h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td style='margin-top:0px; padding-top:0px;'> auto width </td>"+
					"<td class='rightcol'>"+checkUI("_GP.fontchars[_UI.selectedchar].isautowide="+!sc.isautowide+"; redraw(\"charDetails\");", sc.isautowide)+"</td>"+
					"</tr>";

		if(!sc.isautowide){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> width <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(sc.charwidth) + "' onchange='_GP.fontchars[_UI.selectedchar].charwidth = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
					"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> width <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					rounddec(sc.charwidth) + "'/></td>"+
					"</tr>";
		}

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> width <span class='unit'>(em %)</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					rounddec(sc.charwidth/_GP.projectsettings.upm) + "'/></td>"+
					"</tr>";

		content += "<tr><td colspan=3>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td style='margin-top:0px; padding-top:0px;'> use default left side bearing </td>"+
					"<td class='rightcol'>"+checkUI("_GP.fontchars[_UI.selectedchar].leftsidebearing="+!sc.leftsidebearing+"; redraw(\"charDetails\");", !sc.leftsidebearing)+"</td>"+
					"</tr>";

		if(sc.leftsidebearing){
			if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					sc.leftsidebearing + "' onchange='_GP.fontchars[_UI.selectedchar].leftsidebearing = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
					"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					rounddec(_GP.projectsettings.defaultlsb) + "'/></td>"+
					"</tr>";
		}

		content += "<tr><td colspan=3>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> number of shapes </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					_UI.shapelayers.length + "'/></td>"+
					"</tr>";

		return content;

	}

	function shapeDetails(s){
		//stack(arguments);

		//debug("SHAPEDETAILS - Drawing Shape Details");
		var content = "";
		content += "<tr><td colspan=2><h3>shape</h3></td><td style='width:200px'>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td style='margin-top:0px; padding-top:0px;'> name </td>"+
					"<td class='rightcol' style='margin-top:0px; padding-top:0px; padding-right:10px;'>"+
					"<input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().changeShapeName(this.value);'></td>"+
					"</tr>";

		if(!_UI.eventhandlers.temppathdragshape){
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td>"+
					"<td> shape x </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.xlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setLeftX(this.value); putundoq(\"Shape X Position\"); redraw(\"shapeDetails - X Position\");}'")+
					" value='" + rounddec(s.path.leftx) + "' >" + (s.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td>"+
					"<td> shape y </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.ylock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setTopY(this.value); putundoq(\"Shape Y Position\"); redraw(\"shapeDetails - Y Position\");}'")+
					" value='" + rounddec(s.path.topy) + "' >" + (s.ylock? "" : spinner()) + "</td>"+
					"</tr>";

			var cw = (s.path.rightx-s.path.leftx);
			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td>"+
					"<td> width </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.wlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.updatePathSize((this.value-"+cw+"),0); putundoq(\"Shape Width\"); redraw(\"shapeDetails - Width\");}'")+
					" value='" + rounddec(cw) + "' >" + (s.wlock? "" : spinner()) + "</td>"+
					"</tr>";

			var ch = (s.path.topy-s.path.bottomy);
			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td>"+
					"<td> height </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.hlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.updatePathSize(0,(this.value-"+ch+")); ss().path.updatePathPosition(0,((this.value-"+ch+")*-1),true); putundoq(\"Shape Height\"); redraw(\"shapeDetails - Height\");}'")+
					" value='" + rounddec(ch) + "' >" + (s.hlock? "" : spinner()) + "</td>"+
					"</tr>";

		} else {
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td>"+
					"<td> x </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.leftx) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td>"+
					"<td> y </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.topy) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td>"+
					"<td> width </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.rightx-_UI.eventhandlers.temppathdragshape.leftx) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td>"+
					"<td> height </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.topy-_UI.eventhandlers.temppathdragshape.bottomy) + "'>&nbsp;</td>"+
					"</tr>";
		}

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> direction </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled'"+
					" value='"+(s.path.clockwise===0?"unknown":(s.path.clockwise>0?"counterclockwise":"clockwise"))+"'/>"+
					"<input type='button' onclick='ss().path.reversePath();putundoq(\"Reverse Path Direction\");redraw(\"shapeDetails - Clockwise\");' value='"+(s.path.clockwise>0?"&#8635":"&#8634")+";' class='button spinnerbutton' style='width:40px;'/></td>"+
					"</tr>";

		//debug("<b>SHAPE DETAILS OUTPUT:<b><br><textarea rows=9 cols=3000>" + content + "</textarea>");
		return content;
	}

	function pointDetails(s){
		//stack(arguments);

		var tp = s.path.sp();
		var content = "";
		content += "<tr><td colspan=3><h3>path point</h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> selected point </td>"+
					"<td class='rightcol'><input class='input' type='text' value='" + s.path.sp(true) + "' onchange='ss().path.selectPathPoint(this.value); redraw(\"pointDetails\");'>"+spinner()+"</td>"+
					"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td><td> point type </td><td class='rightcol'>  ";
		content += "<canvas class='canvasbutton' title='point type: corner' onclick='ss().path.sp().type = \"corner\"; putundoq(\"Point Type: Corner\"); redraw(\"pointDetails\");' id='pointcornercanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: flat' onclick='ss().path.sp().type = \"flat\"; putundoq(\"Point Type: Flat\"); redraw(\"pointDetails\");' id='pointflatcanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: symmetric' onclick='ss().path.sp().type = \"symmetric\"; putundoq(\"Point Type: Symmetric\"); redraw(\"pointDetails\");' id='pointsymmetriccanvas'></canvas>";
		content += "</td></tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.xlock",tp.P.xlock)+"</td>"+
					"<td> point x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.P.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"P\", round(this.value), \"null\"); putundoq(\"Point X Position\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.P.x) + "' >" + (tp.P.xlock? "" : spinner()) + "</td>"+
					"</tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.ylock",tp.P.ylock)+"</td>"+
					"<td> point y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.P.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"P\", \"null\", round(this.value)); putundoq(\"Point Y Position\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.P.y) + "' >" + (tp.P.ylock? "" : spinner()) + "</td>"+
					"</tr>";

		content += "<tr><td colspan=3><h3>handle 1 <span class='unit'>(before the point)</span></h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> use handle 1 </td>"+
					"<td class='rightcol'>"+checkUI("ss().path.sp().useh1="+!tp.useh1+"; putundoq(\"Use H1\"); ss().path.calcMaxes(); redraw(\"pointDetails\");", tp.useh1)+"</td>"+
					"</tr>";

		if(tp.useh1){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.xlock",tp.H1.xlock)+"</td>"+
					"<td> handle 1 x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H1.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H1\", round(this.value), \"null\"); putundoq(\"H1 X Position\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H1.x) + "' >" + (tp.H1.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.ylock",tp.H1.ylock)+"</td>"+
					"<td> handle 1 y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H1.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H1\", \"null\", round(this.value)); putundoq(\"H1 Y Position\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H1.y) + "' >" + (tp.H1.ylock? "" : spinner()) + "</td>"+
					"</tr>";
		}

		content += "<tr><td colspan=3><h3>handle 2 <span class='unit'>(after the point)</span></h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> use handle 2 </td>"+
					"<td class='rightcol'>"+checkUI("ss().path.sp().useh2="+!tp.useh2+"; putundoq(\"Use H2\"); ss().path.calcMaxes(); redraw(\"pointDetails\");", tp.useh2)+"</td>"+
					"</tr>";

		if(tp.useh2){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.xlock",tp.H2.xlock)+"</td>"+
					"<td> handle 2 x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H2.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H2\", round(this.value), \"null\"); putundoq(\"H2 X Position\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H2.x) + "' >" + (tp.H2.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.ylock",tp.H2.ylock)+"</td>"+
					"<td> handle 2 y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H2.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H2\", \"null\", round(this.value)); putundoq(\"H2 Y Position y\"); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H2.y) + "' >" + (tp.H2.ylock? "" : spinner()) + "</td>"+
					"</tr>";
		}

		return content;
	}

	function drawPointButtons(s){
		//stack(arguments);

		//debug("DRAWPOINTBUTTONS");
		var tp = s.path.sp();
		var tempctx;
		var tempcanvas;
		var color;

		tempcanvas = document.getElementById("pointcornercanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='corner'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointCornerButton(tempctx, color);

		tempcanvas = document.getElementById("pointflatcanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='flat'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointFlatButton(tempctx, color);

		tempcanvas = document.getElementById("pointsymmetriccanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='symmetric'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointSymmetricButton(tempctx, color);
	}

	// Helper Functions

	function lockUI(varname, islocked){
		//stack(arguments);

		//debug("LOCKUI - making html for varname " + varname + " was passed " + islocked + ", and locarr is now: [" + _UI.locarr + "]");
		var re = "<canvas id='locid"+_UI.locid+"' ";
		_UI.locarr[_UI.locid] = islocked;
		_UI.locid = ((_UI.locid*1)+1);
		//re += " onclick='debug(\"--CLICKED ON " + varname + " LOCK-- changing to \"+"+!islocked+"); "+varname+" = " + !islocked + "; redraw();'></canvas>";
		re += " onclick='"+varname+" = " + !islocked + "; redraw(\"lockUI\");'></canvas>";

		return re;
	}

	function checkUI(onclick, ischecked){
		//stack(arguments);

		//debug("CHECKUI - making html for checkarr[" + _UI.checkid + "] = " + ischecked + ", and checkarr is now: [" + _UI.checkarr + "]");
		var re = "<canvas id='checkid"+_UI.checkid+"' ";
		_UI.checkarr[_UI.checkid] = ischecked;
		_UI.checkid = ((_UI.checkid*1)+1);
		re += " onclick='"+onclick+"'></canvas>";
		return re;
	}

	function rounddec(num){
		//stack(arguments);

		num = (num? num : 0);
		var numsplit = num.toString().split(".");
		if(numsplit.length == 1){
			return numsplit;
		} else {
			return "" + numsplit[0] + "." + numsplit[1].substr(0,3);
		}
	}


//-------------------
// Panel Char Select
//-------------------

	function makePanel_CharChooser(){
		var con = "<h1>character edit</h1>";
		con += makeGenericCharChooserContent();
		return con;
	}

	function makeGenericCharChooserContent(fname) {
		//stack(arguments);

		var ccon = "<div class='charselectarea'>";
		fname = fname? fname : "selectchar";
		_UI.selectchardrawarr = [];

		//Capitol Letters
		for(var i=65; i<91; i++){ccon += buildbutton(i, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		//Lowercase Letters
		for(var j=97; j<123; j++){ccon += buildbutton(j, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		// Numbers
		for(var k=48; k<58; k++){ccon += buildbutton(k, fname);}

		// Symbols
		for(var k=33; k<48; k++){ccon += buildbutton(k, fname);}
		for(var m=58; m<65; m++){ccon += buildbutton(m, fname);}
		for(var n=91; n<97; n++){ccon += buildbutton(n, fname);}
		for(var p=123; p<127; p++){ccon += buildbutton(p, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		// Space
		ccon += buildbutton(32, fname);
		ccon += "</div>";

		//debug("makePanel_CharChooser - _UI.selectchardrawarr.length = " + _UI.selectchardrawarr.length);
		return ccon;
	}

	function drawGenericCharChooserContent(){
		//stack(arguments);
		//debug("\n+++++++++++++++++++++\nONE\n+++++++++++++++++++++\n\t"+JSON.stringify(_GP.linkedshapes['id1']));

		var ps = _GP.projectsettings;
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.ascent*factor));

		//debug("drawGenericCharChooserContent - _UI.selectchardrawarr: " + _UI.selectchardrawarr);

		for(var sc=0; sc<_UI.selectchardrawarr.length; sc++){
			var tc = _UI.selectchardrawarr[sc];
			//debug("---------------------- i: " + sc + " id: " + tc);
			var scan = document.getElementById("cs"+tc);
			scan.width = _UI.thumbsize;
			scan.height = _UI.thumbsize;
			var sctx = scan.getContext("2d");

			_GP.fontchars[tc].drawCharToArea(sctx, {"dz": factor, "dx" : _UI.thumbgutter, "dy" : yoffset});
		}
		//debug("\n+++++++++++++++++++++\nTWO\n+++++++++++++++++++++\n\t"+JSON.stringify(_GP.linkedshapes['id1']));
	}

	function drawPanel_CharChooser(){drawGenericCharChooserContent();}


	function buildbutton(index, fname){
		//stack(arguments);

		var onc = (fname + "(" + index + ");");
		var rv = "<div class='charselectbuttonwrapper' onclick='"+onc+"' title='"+_GP.fontchars[index].charname+"'>";
		var issel = _GP.fontchars[index].charvalue == _GP.fontchars[_UI.selectedchar].charvalue;
		issel = issel & (_UI.navhere != "linked shapes");

		if(_GP.fontchars[index].charshapes[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";}
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			_UI.selectchardrawarr.push(index);
		} else {
			if(issel) {rv += "<div class='charselectbuttonsel'";}
			else {rv += "<div class='charselectbutton'";}

			if(index == 32) rv += " style='font-size:13px; padding-top:15px;'";	// SPACE needs to be smaller font size

			rv += ">";

			var bv = _GP.fontchars[index].charvalue;
			if(bv == "'") bv = "&#39";

			rv += (bv+"</div>");
		}

		rv += "</div>";

		return rv;
	}

	function selectchar(c, dontnavigate){
		//stack(arguments);

		//debug("SELECTCHAR - Selecting " + _GP.fontchars[c].charvalue + " from value " + c);
		_UI.selectedchar = c;
		_UI.shapelayers = _GP.fontchars[c].charshapes;
		_UI.selectedshape = -1;

		//debug("SELECTCHAR: shapelayers is now " + JSON.stringify(_UI.shapelayers));
		if(!dontnavigate){
			//debug("SELECTCHAR: selecting " + _GP.fontchars[c].charvalue + " and navigating.");
			navigate('npAttributes');
		}
	}

//-------------------
// Layers Panel
//-------------------
	function makePanel_LayerChooser(){
		//stack(arguments);

		var content = "<h1>shapes</h1>";
		content += "<div style='height:7px; display:block;'></div>";

		if(_UI.shapelayers.length > 0){
			content += "<table class='layertable'>";
			for(var i=(_UI.shapelayers.length-1); i>=0; i--){
				if(i==_UI.selectedshape){
					content += "<tr class='layersel'";
				} else {
					content += "<tr class='layer'";
				}
				content += " onclick='_UI.selectedshape = " + i + "; redraw(\"updatelayers\");'>";

				content += "<td class='layerthumb'><canvas id='layerthumb"+i+"' height='"+_UI.thumbsize+"' width='"+_UI.thumbsize+"'></canvas></td>";

				content += "<td class='layername'>" + _UI.shapelayers[i].name ;
				if(_UI.shapelayers[i].link) { content += "<span class='layernote'>[linked to "+_GP.linkedshapes[_UI.shapelayers[i].link].shape.name+"]</span>"; }
				content += "</td></tr>";
			}
			content += "</table>";
		} else {
			content += "<div style='margin-left:10px; font-style:oblique;'>No shapes exist yet.<br><br></div>";
		}

		if(_UI.clipboardshape){
			content += "<br>Clipboard: " + _UI.clipboardshape.s.name;
		}

		content += updateLayerActions();

		return content;
	}

	function drawPanel_LayerChooser() {
		// Update the thumbs
		if(_UI.shapelayers.length > 0){
			var tctx = {};
			var tele = false;
			for(var j=(_UI.shapelayers.length-1); j>=0; j--){
				tele = document.getElementById(("layerthumb"+j));
				tctx = tele.getContext("2d");
				tele.style.backgroundColor = _UI.colors.offwhite;
				if(j == _UI.selectedshape) tele.style.backgroundColor = "rgb(255,255,255)";
				//debug("UPDATELAYERS - drawing layer " + j);
				_UI.shapelayers[j].drawShapeToArea(tctx, _UI.thumbview);
			}
		}
	}



//-------------------
// Logos
//-------------------
	function drawLogo() {
		logoctx = document.getElementById("logocanvas").getContext("2d");
		logoctx.clearRect(0,0,3000,3000);

		// Main Logo
		logoctx.strokeStyle = _UI.colors.accent;

		logoctx.beginPath();
		logoctx.moveTo(37, 41);
		logoctx.lineTo(37, 2);
		logoctx.lineTo(40.8, 2);
		logoctx.lineWidth = 4;
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(2, 30);
		logoctx.bezierCurveTo(2, 43.3, 31, 43.3, 31, 30);
		logoctx.bezierCurveTo(31, 11, 2, 11, 2, 30);
		logoctx.closePath();
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(31, 30);
		logoctx.lineTo(31, 46);
		logoctx.bezierCurveTo(31, 59.3, 2, 59.3, 2, 46);
		logoctx.lineTo(6, 46);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(72, 30);
		logoctx.bezierCurveTo(72, 43.3, 43, 43.3, 43, 30);
		logoctx.lineTo(43, 16);
		logoctx.lineTo(47, 16);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(47, 46);
		logoctx.lineTo(43, 46);
		logoctx.bezierCurveTo(43, 59.3, 72, 59.3, 72, 46);
		logoctx.lineTo(72, 30);
		logoctx.lineTo(72, 14);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(107, 30);
		logoctx.bezierCurveTo(107, 43.3, 78, 43.3, 78, 30);
		logoctx.bezierCurveTo(78, 11, 107, 11, 107, 30);
		logoctx.closePath();
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(78, 30);
		logoctx.lineTo(78, 56);
		logoctx.lineTo(81.9, 56);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(142, 42);
		logoctx.lineTo(142, 30);
		logoctx.bezierCurveTo(142, 11, 113, 11, 113, 30);
		logoctx.lineTo(113, 40);
		logoctx.lineTo(117, 40);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(113, 28);
		logoctx.lineTo(113, 2);
		logoctx.lineTo(116.9, 2);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(177, 30);
		logoctx.bezierCurveTo(177, 11, 148, 11, 148, 30);
		logoctx.lineTo(148, 40);
		logoctx.lineTo(152, 40);
		logoctx.stroke();

		// Beta Logo
		logoctx.fillStyle = _UI.colors.accent_light;

		logoctx.beginPath();
		logoctx.moveTo(148, 49);
		logoctx.lineTo(149, 49);
		logoctx.lineTo(149, 48);
		logoctx.lineTo(148, 48);
		logoctx.lineTo(148, 49);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(148, 46);
		logoctx.lineTo(148, 47);
		logoctx.lineTo(149, 47);
		logoctx.lineTo(149, 46);
		logoctx.lineTo(148, 46);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(161, 47);
		logoctx.lineTo(161, 46);
		logoctx.lineTo(160, 46);
		logoctx.lineTo(160, 47);
		logoctx.lineTo(161, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(146, 44);
		logoctx.lineTo(146, 51);
		logoctx.lineTo(163, 51);
		logoctx.lineTo(163, 44);
		logoctx.lineTo(146, 44);
		logoctx.closePath();

		logoctx.moveTo(150, 47);
		logoctx.lineTo(149, 47);
		logoctx.lineTo(149, 48);
		logoctx.lineTo(150, 48);
		logoctx.lineTo(150, 49);
		logoctx.lineTo(149, 49);
		logoctx.lineTo(149, 50);
		logoctx.lineTo(148, 50);
		logoctx.lineTo(147, 50);
		logoctx.lineTo(147, 45);
		logoctx.lineTo(148, 45);
		logoctx.lineTo(149, 45);
		logoctx.lineTo(149, 46);
		logoctx.lineTo(150, 46);
		logoctx.lineTo(150, 47);
		logoctx.closePath();

		logoctx.moveTo(154, 46);
		logoctx.lineTo(152, 46);
		logoctx.lineTo(152, 47);
		logoctx.lineTo(153, 47);
		logoctx.lineTo(153, 48);
		logoctx.lineTo(152, 48);
		logoctx.lineTo(152, 49);
		logoctx.lineTo(154, 49);
		logoctx.lineTo(154, 50);
		logoctx.lineTo(152, 50);
		logoctx.lineTo(151, 50);
		logoctx.lineTo(151, 45);
		logoctx.lineTo(152, 45);
		logoctx.lineTo(154, 45);
		logoctx.lineTo(154, 46);
		logoctx.closePath();

		logoctx.moveTo(158, 46);
		logoctx.lineTo(157, 46);
		logoctx.lineTo(157, 50);
		logoctx.lineTo(156, 50);
		logoctx.lineTo(156, 46);
		logoctx.lineTo(155, 46);
		logoctx.lineTo(155, 45);
		logoctx.lineTo(158, 45);
		logoctx.lineTo(158, 46);
		logoctx.closePath();

		logoctx.moveTo(162, 50);
		logoctx.lineTo(161, 50);
		logoctx.lineTo(161, 48);
		logoctx.lineTo(160, 48);
		logoctx.lineTo(160, 50);
		logoctx.lineTo(159, 50);
		logoctx.lineTo(159, 46);
		logoctx.lineTo(160, 46);
		logoctx.lineTo(160, 45);
		logoctx.lineTo(161, 45);
		logoctx.lineTo(161, 46);
		logoctx.lineTo(162, 46);
		logoctx.lineTo(162, 50);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(164, 45);
		logoctx.lineTo(164, 46);
		logoctx.lineTo(165, 46);
		logoctx.lineTo(165, 45);
		logoctx.lineTo(164, 45);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(168, 45);
		logoctx.lineTo(168, 46);
		logoctx.lineTo(169, 46);
		logoctx.lineTo(169, 45);
		logoctx.lineTo(168, 45);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(167, 46);
		logoctx.lineTo(167, 47);
		logoctx.lineTo(168, 47);
		logoctx.lineTo(168, 46);
		logoctx.lineTo(167, 46);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(166, 47);
		logoctx.lineTo(166, 48);
		logoctx.lineTo(168, 48);
		logoctx.lineTo(168, 47);
		logoctx.lineTo(166, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(164, 49);
		logoctx.lineTo(164, 50);
		logoctx.lineTo(165, 50);
		logoctx.lineTo(165, 49);
		logoctx.lineTo(164, 49);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(165, 50);
		logoctx.lineTo(165, 51);
		logoctx.lineTo(168, 51);
		logoctx.lineTo(168, 50);
		logoctx.lineTo(165, 50);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(168, 47);
		logoctx.lineTo(168, 50);
		logoctx.lineTo(169, 50);
		logoctx.lineTo(169, 47);
		logoctx.lineTo(168, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(165, 44);
		logoctx.lineTo(165, 45);
		logoctx.lineTo(168, 45);
		logoctx.lineTo(168, 44);
		logoctx.lineTo(165, 44);
		logoctx.closePath();
		logoctx.fill();


	}

	function drawSplashScreen(){
		ssctx = document.getElementById("splashscreencanvas").getContext("2d");
		ssctx.clearRect(0,0,3000,3000);

		// splashScreen/BG
		ssctx.fillStyle = _UI.colors.accent;
		ssctx.save();
		ssctx.beginPath();
		ssctx.moveTo(800.0, 494.0);
		ssctx.lineTo(0.0, 494.0);
		ssctx.lineTo(0.0, 0.0);
		ssctx.lineTo(800.0, 0.0);
		ssctx.lineTo(800.0, 494.0);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/LOGO
		ssctx.strokeStyle = _UI.colors.offwhite;

		// splashScreen/LOGO/Path
		ssctx.save();
		ssctx.beginPath();
		ssctx.moveTo(260.2, 219.6);
		ssctx.lineTo(260.2, 121.3);
		ssctx.lineTo(270.6, 121.3);
		ssctx.lineWidth = 10.5;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(167.0, 188.6);
		ssctx.bezierCurveTo(167.0, 224.8, 244.7, 224.8, 244.7, 188.6);
		ssctx.bezierCurveTo(244.7, 136.8, 167.0, 136.8, 167.0, 188.6);
		ssctx.closePath();
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(244.7, 188.6);
		ssctx.lineTo(244.7, 224.8);
		ssctx.bezierCurveTo(244.7, 261.1, 167.0, 261.1, 167.0, 224.8);
		ssctx.lineTo(177.4, 224.8);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(368.9, 188.6);
		ssctx.lineTo(368.9, 250.7);
		ssctx.lineTo(379.3, 250.7);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(446.6, 188.6);
		ssctx.bezierCurveTo(446.6, 224.8, 368.9, 224.8, 368.9, 188.6);
		ssctx.bezierCurveTo(368.9, 136.8, 446.6, 136.8, 446.6, 188.6);
		ssctx.closePath();
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(565.7, 214.5);
		ssctx.lineTo(555.3, 214.5);
		ssctx.lineTo(555.3, 188.6);
		ssctx.bezierCurveTo(555.3, 136.8, 633.0, 136.8, 633.0, 188.6);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(353.4, 147.2);
		ssctx.lineTo(353.4, 224.8);
		ssctx.bezierCurveTo(353.4, 261.1, 275.7, 261.1, 275.7, 224.8);
		ssctx.lineTo(286.1, 224.8);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(275.7, 188.6);
		ssctx.bezierCurveTo(275.7, 224.8, 353.3, 224.8, 353.3, 188.6);
		ssctx.lineWidth = 10.2;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(275.7, 189.8);
		ssctx.lineTo(275.7, 152.3);
		ssctx.lineTo(286.1, 152.3);
		ssctx.lineWidth = 10.5;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(472.5, 121.3);
		ssctx.lineTo(462.1, 121.3);
		ssctx.lineTo(462.1, 214.5);
		ssctx.lineTo(472.5, 214.5);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(462.1, 188.6);
		ssctx.bezierCurveTo(462.1, 136.8, 539.8, 136.8, 539.8, 188.6);
		ssctx.lineTo(539.8, 219.6);
		ssctx.stroke();

		// splashScreen/STUDIO

		ssctx.restore();

		// splashScreen/STUDIO/Compound Path
		ssctx.save();
		ssctx.fillStyle = _UI.colors.accent_light;
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(554.2, 240.1);
		ssctx.bezierCurveTo(553.2, 240.1, 552.4, 240.0, 551.6, 239.8);
		ssctx.bezierCurveTo(550.9, 239.6, 550.3, 239.3, 549.6, 239.0);
		ssctx.lineTo(549.6, 236.6);
		ssctx.lineTo(549.8, 236.6);
		ssctx.bezierCurveTo(550.4, 237.2, 551.1, 237.7, 551.9, 238.0);
		ssctx.bezierCurveTo(552.6, 238.3, 553.4, 238.5, 554.1, 238.5);
		ssctx.bezierCurveTo(555.2, 238.5, 555.9, 238.2, 556.5, 237.8);
		ssctx.bezierCurveTo(557.0, 237.4, 557.3, 236.8, 557.3, 236.1);
		ssctx.bezierCurveTo(557.3, 235.5, 557.1, 235.1, 556.8, 234.7);
		ssctx.bezierCurveTo(556.6, 234.4, 556.1, 234.1, 555.5, 233.9);
		ssctx.bezierCurveTo(555.1, 233.8, 554.7, 233.7, 554.3, 233.6);
		ssctx.bezierCurveTo(554.0, 233.6, 553.5, 233.4, 553.0, 233.3);
		ssctx.bezierCurveTo(552.5, 233.2, 552.1, 233.0, 551.7, 232.8);
		ssctx.bezierCurveTo(551.3, 232.6, 550.9, 232.4, 550.6, 232.1);
		ssctx.bezierCurveTo(550.4, 231.7, 550.1, 231.4, 550.0, 231.0);
		ssctx.bezierCurveTo(549.8, 230.5, 549.7, 230.1, 549.7, 229.5);
		ssctx.bezierCurveTo(549.7, 228.4, 550.2, 227.4, 551.1, 226.6);
		ssctx.bezierCurveTo(551.9, 225.9, 553.1, 225.5, 554.5, 225.5);
		ssctx.bezierCurveTo(555.3, 225.5, 556.0, 225.6, 556.7, 225.7);
		ssctx.bezierCurveTo(557.4, 225.9, 558.1, 226.1, 558.7, 226.4);
		ssctx.lineTo(558.7, 228.6);
		ssctx.lineTo(558.5, 228.6);
		ssctx.bezierCurveTo(558.1, 228.2, 557.5, 227.9, 556.8, 227.6);
		ssctx.bezierCurveTo(556.1, 227.3, 555.4, 227.1, 554.6, 227.1);
		ssctx.bezierCurveTo(553.7, 227.1, 553.0, 227.3, 552.5, 227.7);
		ssctx.bezierCurveTo(551.9, 228.1, 551.7, 228.6, 551.7, 229.3);
		ssctx.bezierCurveTo(551.7, 229.9, 551.8, 230.4, 552.1, 230.7);
		ssctx.bezierCurveTo(552.5, 231.1, 552.9, 231.4, 553.5, 231.5);
		ssctx.bezierCurveTo(553.9, 231.6, 554.4, 231.7, 555.0, 231.9);
		ssctx.bezierCurveTo(555.6, 232.0, 556.0, 232.1, 556.4, 232.3);
		ssctx.bezierCurveTo(557.4, 232.6, 558.1, 233.0, 558.5, 233.6);
		ssctx.bezierCurveTo(559.0, 234.2, 559.2, 234.9, 559.2, 235.8);
		ssctx.bezierCurveTo(559.2, 236.4, 559.1, 236.9, 558.9, 237.4);
		ssctx.bezierCurveTo(558.6, 238.0, 558.3, 238.4, 557.9, 238.8);
		ssctx.bezierCurveTo(557.5, 239.2, 557.0, 239.5, 556.4, 239.7);
		ssctx.bezierCurveTo(555.8, 240.0, 555.1, 240.1, 554.2, 240.1);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(564.4, 239.8);
		ssctx.lineTo(564.4, 227.4);
		ssctx.lineTo(559.7, 227.4);
		ssctx.lineTo(559.7, 225.7);
		ssctx.lineTo(571.0, 225.7);
		ssctx.lineTo(571.0, 227.4);
		ssctx.lineTo(566.3, 227.4);
		ssctx.lineTo(566.3, 239.8);
		ssctx.lineTo(564.4, 239.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(577.4, 240.1);
		ssctx.bezierCurveTo(576.5, 240.1, 575.8, 240.0, 575.2, 239.8);
		ssctx.bezierCurveTo(574.6, 239.6, 574.0, 239.3, 573.6, 238.8);
		ssctx.bezierCurveTo(573.1, 238.3, 572.8, 237.7, 572.6, 237.1);
		ssctx.bezierCurveTo(572.4, 236.4, 572.3, 235.5, 572.3, 234.5);
		ssctx.lineTo(572.3, 225.7);
		ssctx.lineTo(574.1, 225.7);
		ssctx.lineTo(574.1, 234.5);
		ssctx.bezierCurveTo(574.1, 235.2, 574.2, 235.7, 574.3, 236.2);
		ssctx.bezierCurveTo(574.3, 236.6, 574.5, 237.0, 574.7, 237.4);
		ssctx.bezierCurveTo(575.0, 237.7, 575.3, 238.0, 575.8, 238.2);
		ssctx.bezierCurveTo(576.2, 238.4, 576.7, 238.5, 577.4, 238.5);
		ssctx.bezierCurveTo(577.9, 238.5, 578.5, 238.4, 578.9, 238.2);
		ssctx.bezierCurveTo(579.4, 238.0, 579.7, 237.7, 580.0, 237.4);
		ssctx.bezierCurveTo(580.2, 237.0, 580.4, 236.6, 580.5, 236.2);
		ssctx.bezierCurveTo(580.5, 235.7, 580.6, 235.2, 580.6, 234.6);
		ssctx.lineTo(580.6, 225.7);
		ssctx.lineTo(582.5, 225.7);
		ssctx.lineTo(582.5, 234.5);
		ssctx.bezierCurveTo(582.5, 235.5, 582.4, 236.3, 582.2, 237.0);
		ssctx.bezierCurveTo(582.0, 237.7, 581.6, 238.3, 581.1, 238.8);
		ssctx.bezierCurveTo(580.7, 239.3, 580.1, 239.6, 579.5, 239.8);
		ssctx.bezierCurveTo(578.9, 240.0, 578.2, 240.1, 577.4, 240.1);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(596.3, 232.8);
		ssctx.bezierCurveTo(596.3, 234.1, 596.0, 235.2, 595.5, 236.3);
		ssctx.bezierCurveTo(595.0, 237.3, 594.3, 238.1, 593.4, 238.7);
		ssctx.bezierCurveTo(592.7, 239.1, 591.9, 239.4, 591.2, 239.6);
		ssctx.bezierCurveTo(590.5, 239.7, 589.5, 239.8, 588.4, 239.8);
		ssctx.lineTo(585.1, 239.8);
		ssctx.lineTo(585.1, 225.7);
		ssctx.lineTo(588.4, 225.7);
		ssctx.bezierCurveTo(589.7, 225.7, 590.7, 225.8, 591.5, 226.0);
		ssctx.bezierCurveTo(592.2, 226.2, 592.9, 226.5, 593.4, 226.9);
		ssctx.bezierCurveTo(594.3, 227.5, 595.0, 228.2, 595.5, 229.2);
		ssctx.bezierCurveTo(596.0, 230.2, 596.3, 231.4, 596.3, 232.8);
		ssctx.closePath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(594.3, 232.8);
		ssctx.bezierCurveTo(594.3, 231.7, 594.1, 230.8, 593.8, 230.0);
		ssctx.bezierCurveTo(593.4, 229.2, 592.9, 228.6, 592.2, 228.2);
		ssctx.bezierCurveTo(591.7, 227.9, 591.1, 227.7, 590.6, 227.5);
		ssctx.bezierCurveTo(590.0, 227.4, 589.3, 227.3, 588.4, 227.3);
		ssctx.lineTo(587.0, 227.3);
		ssctx.lineTo(587.0, 238.2);
		ssctx.lineTo(588.4, 238.2);
		ssctx.bezierCurveTo(589.3, 238.2, 590.0, 238.1, 590.6, 238.0);
		ssctx.bezierCurveTo(591.3, 237.9, 591.8, 237.6, 592.3, 237.3);
		ssctx.bezierCurveTo(593.0, 236.8, 593.5, 236.2, 593.8, 235.5);
		ssctx.bezierCurveTo(594.1, 234.8, 594.3, 233.9, 594.3, 232.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(603.2, 239.8);
		ssctx.lineTo(597.7, 239.8);
		ssctx.lineTo(597.7, 238.4);
		ssctx.lineTo(599.5, 238.4);
		ssctx.lineTo(599.5, 227.2);
		ssctx.lineTo(597.7, 227.2);
		ssctx.lineTo(597.7, 225.7);
		ssctx.lineTo(603.2, 225.7);
		ssctx.lineTo(603.2, 227.2);
		ssctx.lineTo(601.4, 227.2);
		ssctx.lineTo(601.4, 238.4);
		ssctx.lineTo(603.2, 238.4);
		ssctx.lineTo(603.2, 239.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(615.5, 227.4);
		ssctx.bezierCurveTo(616.0, 228.0, 616.4, 228.7, 616.7, 229.7);
		ssctx.bezierCurveTo(617.0, 230.6, 617.2, 231.6, 617.2, 232.8);
		ssctx.bezierCurveTo(617.2, 233.9, 617.0, 235.0, 616.7, 235.9);
		ssctx.bezierCurveTo(616.4, 236.8, 616.0, 237.6, 615.5, 238.2);
		ssctx.bezierCurveTo(614.9, 238.9, 614.2, 239.3, 613.5, 239.6);
		ssctx.bezierCurveTo(612.7, 240.0, 611.9, 240.1, 610.9, 240.1);
		ssctx.bezierCurveTo(610.0, 240.1, 609.1, 240.0, 608.4, 239.6);
		ssctx.bezierCurveTo(607.6, 239.3, 606.9, 238.8, 606.4, 238.2);
		ssctx.bezierCurveTo(605.9, 237.6, 605.4, 236.8, 605.1, 235.9);
		ssctx.bezierCurveTo(604.9, 235.0, 604.7, 233.9, 604.7, 232.8);
		ssctx.bezierCurveTo(604.7, 231.6, 604.9, 230.6, 605.2, 229.7);
		ssctx.bezierCurveTo(605.4, 228.8, 605.9, 228.0, 606.4, 227.4);
		ssctx.bezierCurveTo(606.9, 226.7, 607.6, 226.3, 608.4, 225.9);
		ssctx.bezierCurveTo(609.1, 225.6, 610.0, 225.4, 610.9, 225.4);
		ssctx.bezierCurveTo(611.9, 225.4, 612.8, 225.6, 613.5, 225.9);
		ssctx.bezierCurveTo(614.3, 226.3, 614.9, 226.7, 615.5, 227.4);
		ssctx.closePath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(615.2, 232.8);
		ssctx.bezierCurveTo(615.2, 231.9, 615.1, 231.0, 614.9, 230.3);
		ssctx.bezierCurveTo(614.7, 229.6, 614.4, 229.0, 614.1, 228.5);
		ssctx.bezierCurveTo(613.7, 228.0, 613.2, 227.7, 612.7, 227.4);
		ssctx.bezierCurveTo(612.2, 227.2, 611.6, 227.1, 610.9, 227.1);
		ssctx.bezierCurveTo(610.3, 227.1, 609.7, 227.2, 609.2, 227.4);
		ssctx.bezierCurveTo(608.7, 227.7, 608.2, 228.0, 607.8, 228.5);
		ssctx.bezierCurveTo(607.4, 229.0, 607.2, 229.6, 607.0, 230.3);
		ssctx.bezierCurveTo(606.8, 231.0, 606.7, 231.9, 606.7, 232.8);
		ssctx.bezierCurveTo(606.7, 234.6, 607.0, 236.0, 607.8, 237.0);
		ssctx.bezierCurveTo(608.6, 238.0, 609.6, 238.5, 610.9, 238.5);
		ssctx.bezierCurveTo(612.3, 238.5, 613.3, 238.0, 614.1, 237.0);
		ssctx.bezierCurveTo(614.8, 236.0, 615.2, 234.6, 615.2, 232.8);
		ssctx.closePath();
		ssctx.fill();
		ssctx.restore();
		ssctx.restore();

	}



//	---------------------
//	NAVIGATION
//	---------------------

	function draw_primaryNav_navigate(lctx, fill){

		lctx.fillStyle = fill;
		lctx.strokeStyle = fill;

		// navigate/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(24.0, 0.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 0.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 0.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 0.0);
		lctx.closePath();
		lctx.lineWidth = 0.3;
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(10.0, 10.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(15.0, 20.0);
		lctx.lineTo(10.0, 10.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(10.0, 38.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(20.0, 33.0);
		lctx.lineTo(10.0, 38.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 48.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 48.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 24.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(48.0, 24.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(0.0, 24.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(0.0, 24.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(48.0, 24.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(24.0, 48.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(0.0, 24.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(20.0, 15.0);
		lctx.lineTo(10.0, 10.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(20.0, 15.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(15.0, 28.0);
		lctx.lineTo(10.0, 38.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(15.0, 28.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(28.0, 33.0);
		lctx.lineTo(38.0, 38.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(28.0, 33.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(33.0, 20.0);
		lctx.lineTo(38.0, 10.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(33.0, 20.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(29.0, 19.0);
		lctx.lineTo(38.0, 10.0);
		lctx.lineTo(28.0, 15.0);
		lctx.lineTo(29.0, 19.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(38.0, 38.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(33.0, 28.0);
		lctx.lineTo(38.0, 38.0);
		lctx.closePath();
		lctx.stroke();
		lctx.restore();
	}

	function draw_primaryNav_character(lctx, fill){

		lctx.fillStyle = fill;
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(13.6, 17.2);
		lctx.lineTo(13.6, 19.6);
		lctx.lineTo(8.9, 19.6);
		lctx.lineTo(8.9, 17.9);
		lctx.bezierCurveTo(7.6, 19.2, 6.2, 19.8, 4.6, 19.8);
		lctx.bezierCurveTo(3.4, 19.8, 2.3, 19.4, 1.4, 18.6);
		lctx.bezierCurveTo(0.5, 17.8, 0.0, 16.7, 0.0, 15.5);
		lctx.bezierCurveTo(0.0, 14.2, 0.5, 13.2, 1.5, 12.3);
		lctx.bezierCurveTo(2.4, 11.5, 3.6, 11.1, 5.0, 11.1);
		lctx.bezierCurveTo(6.2, 11.1, 7.5, 11.5, 8.7, 12.2);
		lctx.lineTo(8.7, 10.9);
		lctx.bezierCurveTo(8.7, 10.2, 8.6, 9.7, 8.5, 9.3);
		lctx.bezierCurveTo(8.3, 8.9, 8.0, 8.6, 7.5, 8.3);
		lctx.bezierCurveTo(7.1, 8.0, 6.4, 7.8, 5.7, 7.8);
		lctx.bezierCurveTo(4.3, 7.8, 3.3, 8.4, 2.7, 9.4);
		lctx.lineTo(0.2, 8.7);
		lctx.bezierCurveTo(1.3, 6.6, 3.3, 5.6, 6.1, 5.6);
		lctx.bezierCurveTo(7.1, 5.6, 8.0, 5.7, 8.7, 6.0);
		lctx.bezierCurveTo(9.5, 6.3, 10.0, 6.6, 10.4, 7.1);
		lctx.bezierCurveTo(10.7, 7.5, 11.0, 8.0, 11.1, 8.5);
		lctx.bezierCurveTo(11.2, 9.0, 11.3, 9.8, 11.3, 10.9);
		lctx.lineTo(11.3, 17.2);
		lctx.lineTo(13.6, 17.2);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(8.7, 14.5);
		lctx.bezierCurveTo(7.5, 13.6, 6.3, 13.2, 5.2, 13.2);
		lctx.bezierCurveTo(4.4, 13.2, 3.8, 13.4, 3.3, 13.8);
		lctx.bezierCurveTo(2.8, 14.2, 2.6, 14.8, 2.6, 15.5);
		lctx.bezierCurveTo(2.6, 16.1, 2.8, 16.6, 3.2, 17.1);
		lctx.bezierCurveTo(3.7, 17.5, 4.2, 17.7, 5.0, 17.7);
		lctx.bezierCurveTo(6.3, 17.7, 7.5, 17.2, 8.7, 16.1);
		lctx.lineTo(8.7, 14.5);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(16.0, 19.6);
		lctx.lineTo(16.0, 17.2);
		lctx.lineTo(18.4, 17.2);
		lctx.lineTo(18.4, 2.4);
		lctx.lineTo(16.0, 2.4);
		lctx.lineTo(16.0, 0.0);
		lctx.lineTo(21.0, 0.0);
		lctx.lineTo(21.0, 7.9);
		lctx.bezierCurveTo(22.4, 6.3, 24.0, 5.6, 26.0, 5.6);
		lctx.bezierCurveTo(27.8, 5.6, 29.4, 6.2, 30.7, 7.5);
		lctx.bezierCurveTo(32.0, 8.8, 32.6, 10.5, 32.6, 12.6);
		lctx.bezierCurveTo(32.6, 14.6, 32.0, 16.3, 30.7, 17.7);
		lctx.bezierCurveTo(29.5, 19.1, 27.9, 19.8, 26.0, 19.8);
		lctx.bezierCurveTo(24.9, 19.8, 23.9, 19.6, 23.0, 19.1);
		lctx.bezierCurveTo(22.1, 18.6, 21.4, 18.1, 21.0, 17.5);
		lctx.lineTo(21.0, 19.6);
		lctx.lineTo(16.0, 19.6);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(21.1, 12.8);
		lctx.bezierCurveTo(21.1, 14.2, 21.6, 15.3, 22.4, 16.2);
		lctx.bezierCurveTo(23.3, 17.0, 24.3, 17.4, 25.4, 17.4);
		lctx.bezierCurveTo(26.6, 17.4, 27.6, 17.0, 28.5, 16.1);
		lctx.bezierCurveTo(29.4, 15.2, 29.8, 14.0, 29.8, 12.5);
		lctx.bezierCurveTo(29.8, 11.1, 29.4, 10.0, 28.5, 9.2);
		lctx.bezierCurveTo(27.7, 8.4, 26.6, 8.0, 25.5, 8.0);
		lctx.bezierCurveTo(24.4, 8.0, 23.3, 8.4, 22.5, 9.2);
		lctx.bezierCurveTo(21.6, 10.1, 21.1, 11.2, 21.1, 12.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(47.6, 5.8);
		lctx.lineTo(47.6, 10.9);
		lctx.lineTo(45.2, 10.9);
		lctx.bezierCurveTo(45.1, 9.9, 44.6, 9.2, 44.0, 8.7);
		lctx.bezierCurveTo(43.3, 8.1, 42.5, 7.9, 41.6, 7.9);
		lctx.bezierCurveTo(40.4, 7.9, 39.4, 8.3, 38.7, 9.2);
		lctx.bezierCurveTo(37.9, 10.0, 37.5, 11.1, 37.5, 12.5);
		lctx.bezierCurveTo(37.5, 13.8, 37.9, 14.9, 38.6, 15.9);
		lctx.bezierCurveTo(39.3, 16.9, 40.4, 17.4, 41.7, 17.4);
		lctx.bezierCurveTo(43.6, 17.4, 44.9, 16.5, 45.8, 14.7);
		lctx.lineTo(48.0, 15.7);
		lctx.bezierCurveTo(46.8, 18.4, 44.6, 19.8, 41.6, 19.8);
		lctx.bezierCurveTo(39.4, 19.8, 37.7, 19.1, 36.5, 17.6);
		lctx.bezierCurveTo(35.3, 16.1, 34.6, 14.4, 34.6, 12.5);
		lctx.bezierCurveTo(34.6, 10.4, 35.3, 8.7, 36.7, 7.4);
		lctx.bezierCurveTo(38.0, 6.1, 39.6, 5.4, 41.3, 5.4);
		lctx.bezierCurveTo(42.9, 5.4, 44.1, 5.8, 45.2, 6.7);
		lctx.lineTo(45.2, 5.8);
		lctx.lineTo(47.6, 5.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(7.8, 33.0);
		lctx.lineTo(5.1, 36.0);
		lctx.lineTo(6.9, 36.0);
		lctx.lineTo(6.9, 38.4);
		lctx.lineTo(0.3, 38.4);
		lctx.lineTo(0.3, 36.0);
		lctx.lineTo(2.3, 36.0);
		lctx.lineTo(6.3, 31.4);
		lctx.lineTo(2.4, 27.2);
		lctx.lineTo(0.6, 27.2);
		lctx.lineTo(0.6, 24.8);
		lctx.lineTo(7.0, 24.8);
		lctx.lineTo(7.0, 27.2);
		lctx.lineTo(5.3, 27.2);
		lctx.lineTo(7.7, 29.8);
		lctx.lineTo(10.1, 27.2);
		lctx.lineTo(8.7, 27.2);
		lctx.lineTo(8.7, 24.8);
		lctx.lineTo(15.2, 24.8);
		lctx.lineTo(15.2, 27.2);
		lctx.lineTo(12.9, 27.2);
		lctx.lineTo(9.2, 31.4);
		lctx.lineTo(13.4, 36.0);
		lctx.lineTo(15.2, 36.0);
		lctx.lineTo(15.2, 38.4);
		lctx.lineTo(8.7, 38.4);
		lctx.lineTo(8.7, 36.0);
		lctx.lineTo(10.6, 36.0);
		lctx.lineTo(7.8, 33.0);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(25.0, 38.2);
		lctx.lineTo(20.5, 27.2);
		lctx.lineTo(18.3, 27.2);
		lctx.lineTo(18.3, 24.8);
		lctx.lineTo(25.0, 24.8);
		lctx.lineTo(25.0, 27.2);
		lctx.lineTo(23.4, 27.2);
		lctx.lineTo(26.3, 34.7);
		lctx.lineTo(29.2, 27.2);
		lctx.lineTo(27.4, 27.2);
		lctx.lineTo(27.4, 24.8);
		lctx.lineTo(34.0, 24.8);
		lctx.lineTo(34.0, 27.2);
		lctx.lineTo(32.0, 27.2);
		lctx.lineTo(25.2, 44.5);
		lctx.lineTo(20.7, 44.5);
		lctx.lineTo(20.7, 42.2);
		lctx.lineTo(23.4, 42.2);
		lctx.lineTo(25.0, 38.2);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(36.3, 38.4);
		lctx.lineTo(36.3, 36.2);
		lctx.lineTo(44.8, 27.0);
		lctx.lineTo(39.2, 27.0);
		lctx.lineTo(39.2, 29.6);
		lctx.lineTo(36.9, 29.6);
		lctx.lineTo(36.9, 24.8);
		lctx.lineTo(48.0, 24.8);
		lctx.lineTo(48.0, 27.2);
		lctx.lineTo(39.4, 36.2);
		lctx.lineTo(45.7, 36.2);
		lctx.lineTo(45.7, 33.4);
		lctx.lineTo(48.0, 33.4);
		lctx.lineTo(48.0, 38.4);
		lctx.lineTo(36.3, 38.4);
		lctx.closePath();
		lctx.fill();
	}

	function draw_primaryNav_layers(lctx, fill){

		lctx.fillStyle = fill;

		// shapes/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(24.0, 21.0);
		lctx.lineTo(0.0, 10.5);
		lctx.lineTo(24.0, 0.0);
		lctx.lineTo(48.0, 10.5);
		lctx.lineTo(24.0, 21.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 30.0);
		lctx.lineTo(0.0, 19.5);
		lctx.lineTo(8.0, 16.0);
		lctx.lineTo(24.0, 23.0);
		lctx.lineTo(40.0, 16.0);
		lctx.lineTo(48.0, 19.5);
		lctx.lineTo(24.0, 30.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 39.0);
		lctx.lineTo(0.0, 28.5);
		lctx.lineTo(8.0, 25.0);
		lctx.lineTo(24.0, 32.0);
		lctx.lineTo(40.0, 25.0);
		lctx.lineTo(48.0, 28.5);
		lctx.lineTo(24.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 48.0);
		lctx.lineTo(0.0, 37.5);
		lctx.lineTo(8.0, 34.0);
		lctx.lineTo(24.0, 41.0);
		lctx.lineTo(40.0, 34.0);
		lctx.lineTo(48.0, 37.5);
		lctx.lineTo(24.0, 48.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}

	function draw_primaryNav_attributes(lctx, fill){

		lctx.fillStyle = fill;

		// newAttributes/Check
		lctx.beginPath();
		lctx.moveTo(1.0, 7.0);
		lctx.lineTo(8.0, 14.0);
		lctx.lineTo(17.0, 3.0);
		lctx.lineTo(14.0, 0.0);
		lctx.lineTo(8.0, 8.0);
		lctx.lineTo(4.0, 4.0);
		lctx.lineTo(1.0, 7.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 43.0);
		lctx.lineTo(0.0, 43.0);
		lctx.lineTo(0.0, 44.0);
		lctx.lineTo(19.0, 44.0);
		lctx.lineTo(19.0, 43.0);
		lctx.lineTo(19.0, 43.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 35.0);
		lctx.lineTo(0.0, 35.0);
		lctx.lineTo(0.0, 36.0);
		lctx.lineTo(19.0, 36.0);
		lctx.lineTo(19.0, 35.0);
		lctx.lineTo(19.0, 35.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 39.0);
		lctx.lineTo(0.0, 39.0);
		lctx.lineTo(0.0, 40.0);
		lctx.lineTo(19.0, 40.0);
		lctx.lineTo(19.0, 39.0);
		lctx.lineTo(19.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 26.0);
		lctx.lineTo(0.0, 26.0);
		lctx.lineTo(0.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 26.0);
		lctx.lineTo(19.0, 26.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 18.0);
		lctx.lineTo(0.0, 18.0);
		lctx.lineTo(0.0, 19.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(19.0, 18.0);
		lctx.lineTo(19.0, 18.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 22.0);
		lctx.lineTo(0.0, 22.0);
		lctx.lineTo(0.0, 23.0);
		lctx.lineTo(19.0, 23.0);
		lctx.lineTo(19.0, 22.0);
		lctx.lineTo(19.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 10.0);
		lctx.lineTo(19.0, 10.0);
		lctx.lineTo(19.0, 11.0);
		lctx.lineTo(48.0, 11.0);
		lctx.lineTo(48.0, 10.0);
		lctx.lineTo(48.0, 10.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 2.0);
		lctx.lineTo(19.0, 2.0);
		lctx.lineTo(19.0, 3.0);
		lctx.lineTo(48.0, 3.0);
		lctx.lineTo(48.0, 2.0);
		lctx.lineTo(48.0, 2.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 6.0);
		lctx.lineTo(19.0, 6.0);
		lctx.lineTo(19.0, 7.0);
		lctx.lineTo(48.0, 7.0);
		lctx.lineTo(48.0, 6.0);
		lctx.lineTo(48.0, 6.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 16.0);
		lctx.lineTo(23.0, 29.0);
		lctx.lineTo(48.0, 29.0);
		lctx.lineTo(48.0, 16.0);
		lctx.lineTo(23.0, 16.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 25.0);
		lctx.lineTo(30.0, 20.0);
		lctx.lineTo(35.0, 25.0);
		lctx.lineTo(25.0, 25.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 25.0);
		lctx.lineTo(36.0, 20.0);
		lctx.lineTo(46.0, 20.0);
		lctx.lineTo(41.0, 25.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 33.0);
		lctx.lineTo(23.0, 46.0);
		lctx.lineTo(48.0, 46.0);
		lctx.lineTo(48.0, 33.0);
		lctx.lineTo(23.0, 33.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 42.0);
		lctx.lineTo(30.0, 37.0);
		lctx.lineTo(35.0, 42.0);
		lctx.lineTo(25.0, 42.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 42.0);
		lctx.lineTo(36.0, 37.0);
		lctx.lineTo(46.0, 37.0);
		lctx.lineTo(41.0, 42.0);
		lctx.closePath();
		lctx.fill();
	}

	function draw_primaryNav_save(lctx, fill){

		lctx.fillStyle = fill;

		// save/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(32.0, 16.0);
		lctx.lineTo(36.0, 16.0);
		lctx.lineTo(36.0, 18.0);
		lctx.lineTo(32.0, 18.0);
		lctx.lineTo(32.0, 16.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 12.0);
		lctx.lineTo(20.0, 12.0);
		lctx.lineTo(20.0, 23.0);
		lctx.lineTo(18.0, 23.0);
		lctx.lineTo(18.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(28.0, 12.0);
		lctx.lineTo(30.0, 12.0);
		lctx.lineTo(30.0, 23.0);
		lctx.lineTo(28.0, 23.0);
		lctx.lineTo(28.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 22.0);
		lctx.lineTo(30.0, 22.0);
		lctx.lineTo(30.0, 24.0);
		lctx.lineTo(18.0, 24.0);
		lctx.lineTo(18.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(21.0, 27.0);
		lctx.lineTo(30.0, 27.0);
		lctx.lineTo(30.0, 32.0);
		lctx.lineTo(21.0, 32.0);
		lctx.lineTo(21.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(29.0, 27.0);
		lctx.lineTo(29.0, 28.0);
		lctx.lineTo(18.0, 28.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 31.0);
		lctx.lineTo(29.0, 31.0);
		lctx.lineTo(29.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 31.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(17.0, 34.0);
		lctx.lineTo(14.0, 31.0);
		lctx.lineTo(14.0, 14.0);
		lctx.lineTo(36.0, 14.0);
		lctx.lineTo(36.0, 12.0);
		lctx.lineTo(12.0, 12.0);
		lctx.lineTo(12.0, 31.8);
		lctx.lineTo(16.2, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 34.0);
		lctx.lineTo(17.0, 34.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(36.0, 12.0);
		lctx.lineTo(34.0, 12.0);
		lctx.lineTo(34.0, 14.0);
		lctx.lineTo(34.0, 34.0);
		lctx.lineTo(34.0, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 12.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}


//	---------------------
//	TOOLS
//	---------------------

function drawNewPathButton(lctx, bgcolor, outlinecolor){
	// newPath/BG
	lctx.fillStyle = bgcolor;

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 8.0);
	lctx.lineTo(11.0, 8.0);
	lctx.lineTo(11.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline
	lctx.fillStyle = outlinecolor;

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(8.0, 11.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 12.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewOvalButton(lctx, bgcolor, outlinecolor){
	// newOval/BG
	lctx.fillStyle = bgcolor;

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(4.0, 2.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(2.0, 4.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 7.0);
	lctx.lineTo(10.0, 7.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Group
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline
	lctx.fillStyle = outlinecolor;

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(8.0, 0.0);
	lctx.lineTo(8.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 11.0);
	lctx.lineTo(4.0, 11.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 7.0);
	lctx.lineTo(0.0, 7.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.lineTo(12.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewRectButton(lctx, bgcolor, outlinecolor){
	// newRect/BG
	lctx.fillStyle = bgcolor;

	// newRect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(11.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline
	lctx.fillStyle = outlinecolor;

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(12.0, 0.0);
	lctx.lineTo(12.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(12.0, 1.0);
	lctx.lineTo(12.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}


function drawShapeResizeButton(lctx, bgcolor, outlinecolor){

	// FILLS
	lctx.fillStyle = bgcolor;

	// shapeMove/Path
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();


	// OUTLINES
	lctx.fillStyle = outlinecolor;

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(3.0, 12.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();


	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(14.0, 3.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(11.0, 0.0);
	lctx.lineTo(11.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(13.0, 14.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();
}

function drawPathEditButton(lctx, bgcolor, outlinecolor){

	// shapeSelect/BG
	lctx.fillStyle = bgcolor;

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 18.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(8.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 18.0);
	lctx.lineTo(8.0, 18.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(9.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 14.0);
	lctx.lineTo(5.0, 14.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 16.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 12.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(9.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 12.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 16.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(2.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 3.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 15.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 13.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline
	lctx.fillStyle = outlinecolor;

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 17.0);
	lctx.lineTo(0.0, 17.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(7.0, 6.0);
	lctx.lineTo(7.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(12.0, 12.0);
	lctx.lineTo(12.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 19.0);
	lctx.lineTo(7.0, 19.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 19.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 17.0);
	lctx.lineTo(1.0, 17.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(6.0, 14.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(5.0, 16.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 16.0);
	lctx.lineTo(7.0, 16.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(6.0, 18.0);
	lctx.lineTo(6.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(7.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(8.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 16.0);
	lctx.lineTo(10.0, 16.0);
	lctx.lineTo(10.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 16.0);
	lctx.closePath();
	lctx.fill();
}


function drawPanButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(5.0, 3.0);
	lctx.lineTo(5.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 2.0);
	lctx.lineTo(6.0, 2.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 1.0);
	lctx.lineTo(7.0, 1.0);
	lctx.lineTo(7.0, 0.0);
	lctx.lineTo(9.0, 0.0);
	lctx.lineTo(9.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 13.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(13.0, 8.0);
	lctx.lineTo(13.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 4.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 5.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(14.0, 9.0);
	lctx.lineTo(14.0, 5.0);
	lctx.lineTo(13.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 6.0);
	lctx.lineTo(14.0, 8.0);
	lctx.lineTo(15.0, 8.0);
	lctx.lineTo(15.0, 6.0);
	lctx.lineTo(14.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(3.0, 8.0);
	lctx.lineTo(3.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 5.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 6.0);
	lctx.lineTo(2.0, 8.0);
	lctx.lineTo(1.0, 8.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.closePath();
	lctx.fill();

}

function drawZoomInButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(7.0, 3.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(9.0, 13.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoomOutButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoom1to1Button(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(12.0, 3.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(12.0, 5.0);
	lctx.lineTo(12.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

}

function drawZoomEmButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.save();
	lctx.beginPath();
	lctx.moveTo(1.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(1.0, 11.0);
	lctx.lineTo(1.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(12.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(8.0, 4.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(6.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(14.0, 11.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 12.0);
	lctx.lineTo(14.0, 12.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(14.0, 1.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();
}



//	----------------------
//	POINT TYPES
//	----------------------

function drawPointCornerButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointCorner/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(5.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 13.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 13.0);
	lctx.closePath();
	lctx.fill();


}

function drawPointFlatButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointFlat/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

}

function drawPointSymmetricButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointSymmetric/Path

	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 13.0);
	lctx.lineTo(11.0, 13.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(13.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

}



//	-----------------------
//	LOCK, SPINNER, CHECKBOX
//	-----------------------

function drawLockButton(obj, c) {
	//debug("DRAWLOCKBUTTON obj/c: " + obj + "," + c);

	var lctx = obj.getContext('2d');
	lctx.fillStyle = c;

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 4.0);
	lctx.lineTo(6.0, 4.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(5.0, 1.0);
	lctx.lineTo(5.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(5.0, 0.0);
	lctx.lineTo(5.0, 1.0);
	lctx.closePath();
	lctx.fill();

	//debug("END OF DRAWLOCKBUTTON");
}

function drawCheckbox(obj, ischecked) {
	var lctx = obj.getContext('2d');

	//Box
	lctx.fillStyle = _UI.colors.text_light;
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(0.0, 15.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	if(ischecked){
		//Check
		lctx.fillStyle = _UI.colors.accent;
		lctx.beginPath();
		lctx.moveTo(0.0, 9.0);
		lctx.lineTo(5.5, 15.0);
		lctx.lineTo(15.0, 3.5);
		lctx.lineTo(13.0, 0.0);
		lctx.lineTo(5.5, 11.0);
		lctx.lineTo(2.0, 6.5);
		lctx.lineTo(0.0, 9.0);
		lctx.closePath();
		lctx.fill();
	}
}


	_UI.eventhandlers = {
		"temppathdragshape" : false,
		"mousex" : 0,
		"mousey" : 0,
		"ismouseovercec" : false,
		"corner" : false,
		"toolhandoff" : false,
		"lastx" : -100,
		"lasty" : -100,
		"firstx" : -100,
		"firsty" : -100,
		"uqhaschanged" : false,
		"eh_shapesel" : false,
		"eh_shaperesize" : false,
		"eh_pantool" : false,
		"eh_addpath" : false,
		"lastTool" : "pathedit",
		"iskeydown" : false
	};

	function initEventHandlers() {
		var tool = new pathedit();
		_UI.eventhandlers.eh_addrectoval = new newbasicShape();
		_UI.eventhandlers.eh_shapesel = new pathedit();
		_UI.eventhandlers.eh_shaperesize = new shaperesize();
		_UI.eventhandlers.eh_pantool = new pantool();
		_UI.eventhandlers.eh_addpath = new newPath();
		_UI.eventhandlers.eh_addrectoval = new newbasicShape();

		// Mouse Event Listeners
		_UI.chareditcanvas.addEventListener('mousedown', ev_canvas, false);
		_UI.chareditcanvas.addEventListener('mousemove', ev_canvas, false);
		_UI.chareditcanvas.addEventListener('mouseup',   ev_canvas, false);
		_UI.chareditcanvas.onmouseover = mouseovercec;
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.addEventListener('wheel', mousewheel, false);
		document.getElementById("navarea_panel").addEventListener('wheel', function(ev){ev.stopPropagation();}, false);


		// Document Key Listeners
		getEditDocument().onkeypress = keypress;
		getEditDocument().onkeydown = keydown;
		getEditDocument().onkeyup = keyup;
		// The general-purpose event handler.
		function ev_canvas (ev) {

			//debug("EVENTHANDLER - Raw mouse event x/y = " + ev.layerX + " / " + ev.layerY);
			mouseovercec();

			// Fixes a Chrome cursor problem
			document.onselectstart = function () { return false; };

			if (ev.layerX || ev.layerX) {
				// Firefox
				_UI.eventhandlers.mousex = ev.layerX;
				_UI.eventhandlers.mousey = ev.layerY;
			}

			if (ev.offsetX || ev.offsetX) {
				// IE, Chrome, (Opera?)
				_UI.eventhandlers.mousex = ev.offsetX;
				_UI.eventhandlers.mousey = ev.offsetY;
			}

			//debug("EV_CANVAS offsetx / offsety / layerx / layery: " +  ev.offsetX + " " + ev.offsetY + " " + ev.layerX + " " + ev.layerY);

			resetCursor();

			// Switch Tool function
			switch(_UI.selectedtool){
				case "pathedit" :
					tool = _UI.eventhandlers.eh_shapesel;
					break;
				case "shaperesize" :
					tool = _UI.eventhandlers.eh_shaperesize;
					break;
				case "pan" :
					document.body.style.cursor = "move";
					tool = _UI.eventhandlers.eh_pantool;
					break;
				case "newpath" :
					document.body.style.cursor = "crosshair";
					tool = _UI.eventhandlers.eh_addpath;
					break;
				case "newrect" :
				case "newoval" :
					document.body.style.cursor = "crosshair";
					tool = _UI.eventhandlers.eh_addrectoval;
					break;
			}

			// Call the event handler of the tool.
			tool[ev.type](ev);
		}
	}


	// ---------------------------------------------------------
	// new path - adds many points to a new path
	// ---------------------------------------------------------
	function newPath(){
		this.dragging = false;
		this.firstpoint = true;
		this.currpt = {};

		this.mousedown = function (ev) {
			//debug("NEWPATH MOUSEDOWN");
			var newpoint = new PathPoint({"P":new Coord({"x":cx_sx(_UI.eventhandlers.mousex), "y":cy_sy(_UI.eventhandlers.mousey)}), "H1":new Coord({"x":cx_sx(_UI.eventhandlers.mousex-100), "y":cy_sy(_UI.eventhandlers.mousey)}), "H2":new Coord({"x":cx_sx(_UI.eventhandlers.mousex+100), "y":cy_sy(_UI.eventhandlers.mousey)}), "type":"flat", "selected":true, "useh1":false, "useh2":false});

			if(this.firstpoint) {
				//debug("NEWPATH MOUSEDOWN - tool.firstpoint=true, making a new path");
				//alert("EVENTHANDLER - NewPath mousedown - tool.firstpoint=true, making a new path");

				// make a new path with one point
				var newpath = new Path({"pathpoints":[newpoint]});
				//debug("NEWPATH MOUSEDOWN - after new path is made.");

				// make a new shape with the new path
				var newshape = addShape(new Shape({"name": ("path "+(_UI.shapelayers.length+1)), "path": newpath}));
				newshape.path.selectPathPoint(0);
				//debug("NEWPATH MOUSEDOWN - end of firstpoint, new shape added with new path with single point.");

			} else {
				//debug("NEWPATH MOUSEDOWN - after firstpoint, placing another point");
				var currpath = ss("Event Handler New Path").path;
				var ccp = currpath.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey));
				//debug("NEWPATH MOUSEDOWN - after creating ccp: " + ccp);
				if((ccp=="P")&&(currpath.pathpoints.length > 1)){
					var p = currpath.pathpoints[0];
					var hp = _GP.projectsettings.pointsize/getView("Event Handler newPath mousedown").dz;
					if( ((p.P.x+hp) > cx_sx(_UI.eventhandlers.mousex)) && ((p.P.x-hp) < cx_sx(_UI.eventhandlers.mousex)) && ((p.P.y+hp) > cy_sy(_UI.eventhandlers.mousey)) && ((p.P.y-hp) < cy_sy(_UI.eventhandlers.mousey)) ){
						//clicked on an existing control point in this path
						//if first point - close the path
						_UI.selectedtool = "pathedit";
						_UI.eventhandlers.eh_shapesel.moving = true;
						_UI.eventhandlers.eh_shapesel.controlpoint = "H2";
						_UI.eventhandlers.toolhandoff = true;
						this.dragging = false;
						this.firstmove = false;
						_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
						_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
						currpath.clockwise = findClockwise(currpath.pathpoints);
						redraw("Event Handler newPath mousedown");
						return;
					}
				}

				currpath.addPathPoint(newpoint, false);
				//debug("NEWPATH MOUSEDOWN - after AddPathPoint");
			}

			this.currpt = ss("Event Handler New Path").path.sp(false, "Event Handler New Path");
			this.firstpoint = false;
			this.dragging = true;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;

			//debug("NEWPATH MOUSEDOWN - end of function, this.currpt:\n" + JSON.stringify(newpoint));
		};

		this.mouseup = function () {
			//debug("NEWPATH MOUSEUP");
			this.dragging = false;
			this.firstmove = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;
			updateCurrentCharWidth();
			// For new shape tools, mouse up always adds to the undo-queue
			putundoq("New Path tool");

			redraw("Event Handler newPath mouseup");
		};

		this.mousemove = function (ev) {
			//debug("NEWPATH MOUSEMOVE");
			if(this.dragging){
				//avoid really small handles
				//debug("NEWPATH MOUSEMOVE - ps*2 = " + (_GP.projectsettings.pointsize*2) + " x / y: " + Math.abs(this.currpt.P.x-cx_sx(_UI.eventhandlers.mousex)) + " / " + Math.abs(this.currpt.P.y-cy_sy(_UI.eventhandlers.mousey)) );
				if( (Math.abs(this.currpt.P.x-cx_sx(_UI.eventhandlers.mousex)) > (_GP.projectsettings.pointsize*2)) || (Math.abs(this.currpt.P.y-cy_sy(_UI.eventhandlers.mousey)) > (_GP.projectsettings.pointsize*2)) ){
					//debug("NEWPATH MOUSEMOVE - dragging H2, this.currpt:\n" + JSON.stringify(this.currpt));
					this.currpt.useh1 = true;
					this.currpt.useh2 = true;
					this.currpt.H2.x = cx_sx(_UI.eventhandlers.mousex);
					this.currpt.H2.y = cy_sy(_UI.eventhandlers.mousey);
					this.currpt.makeSymmetric("H2");
				} else {
					//debug("NEWPATH MOUSEMOVE - no handle created yet");
				}
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;

				redraw("Event Handler newPath mousemove");
			}
		};
	}


	// ---------------------------------------------------------
	// new basic shape - adds many points to a new path
	// ---------------------------------------------------------
	function newbasicShape(){

		this.mousedown = function (ev) {

			var newshape = new Shape({"visible":false});
			newshape.name = (_UI.selectedtool=="newrect")? ("rect " + (_UI.shapelayers.length+1)) : ("oval " + (_UI.shapelayers.length+1));
			newshape = addShape(newshape);
			//debug("NEWBASICSHAPE MOUSEDOWN - just added the new shape");
			// these rely on ss();
			newshape.path.setLeftX(cx_sx(_UI.eventhandlers.mousex));
			newshape.path.setTopY(cy_sy(_UI.eventhandlers.mousey));


			_UI.eventhandlers.temppathdragshape = {
				"leftx": cx_sx(_UI.eventhandlers.mousex),
				"rightx": cx_sx(_UI.eventhandlers.mousex),
				"topy": cy_sy(_UI.eventhandlers.mousey),
				"bottomy": cy_sy(_UI.eventhandlers.mousey)
			};

			this.dragging = true;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			_UI.eventhandlers.firstx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.firsty = _UI.eventhandlers.mousey;

			redraw("Event Handler newbasicshape mousedown");
			//debug("NEWBASICSHAPE MOUSEDOWN - after REDRAW");
		};

		this.mouseup = function () {

			var s = ss("eventHandler - newbasicshape mouseup");

			// prevent really small shapes
			if ( (Math.abs(_UI.eventhandlers.lastx - _UI.eventhandlers.firstx) < _GP.projectsettings.pointsize) &&
				(Math.abs(_UI.eventhandlers.lasty - _UI.eventhandlers.firsty) < _GP.projectsettings.pointsize) ){

				_UI.eventhandlers.temppathdragshape = {
					"leftx": s.path.leftx,
					"rightx": s.path.rightx,
					"topy": s.path.topy,
					"bottomy": s.path.bottomy
				};
			}

			if(_UI.selectedtool=="newrect"){
				//debug("NEWBASICSHAPE MOUSEUP - reading TPDS lx-ty-rx-by: " + lx + " : " + ty + " : " + rx + " : " + by);
				s.path = rectPathFromCorners(_UI.eventhandlers.temppathdragshape);
				//debug("NEWBASICSHAPE MOUSEUP - resulting path P1x/y P3x/y: " + s.path.pathpoints[0].P.x + " : " + s.path.pathpoints[0].P.y + " : " + s.path.pathpoints[2].P.x + " : " + s.path.pathpoints[2].P.y);
			} else {
				s.path = ovalPathFromCorners(_UI.eventhandlers.temppathdragshape);
			}

			s.visible = true;

			this.dragging = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;
			_UI.eventhandlers.firstx = -100;
			_UI.eventhandlers.firsty = -100;
			_UI.eventhandlers.temppathdragshape = false;
			updateCurrentCharWidth();
			putundoq("New Basic Shape tool");
			_UI.eventhandlers.uqhaschanged = false;

			clicktool("pathedit");
		};

		this.mousemove = function (ev) {
			if(this.dragging){
				var s = ss("eventHandler - newbasicshape mousemove");
				evHanShapeResize(s, "se");
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw("Event Handler newbasicshape mousemove");
				//debug("NEWBASICSHAPE MOUSEMOVE past redraw");
			}
		};
	}


	// ---------------------------------------------------------
	// Path Edit - selects points and moves points and handles
	// ---------------------------------------------------------
	function pathedit(){
		this.moving = false;
		this.controlpoint = false;

		this.mousedown = function (ev) {
			//debug("mouse down: " + _UI.eventhandlers.mousex + ":" + _UI.eventhandlers.mousey);
			var s = ss("Path Edit - Mouse Down");
			this.controlpoint = s? s.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey)) : false;
			if(this.controlpoint){
				this.moving = true;
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			} else if (clickSelectShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				//clickSelectShape checks to switch the tool if need be.
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			} else {
				if(s){s.path.calcMaxes();}
				clickEmptySpace();
			}
			redraw("Event Handler pathedit mousedown");
		};

		this.mouseup = function () {
			this.moving = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;

			if(_UI.eventhandlers.uqhaschanged) {
				ss("Path Edit - Mouse Up").path.calcMaxes();
				updateCurrentCharWidth();
				putundoq("Path Edit tool");
				_UI.eventhandlers.uqhaschanged = false;
				redraw("Event Handler pathedit mouseup");
			}
		};

		this.mousemove = function (ev) {
			if (this.moving) {
				var s = ss("Path Edit - Mouse Move");
				var sp = s.path.sp();
				if(_UI.eventhandlers.toolhandoff){
					sp.H2.x = cx_sx(_UI.eventhandlers.mousex);
					sp.H2.y = cy_sy(_UI.eventhandlers.mousey);
					_UI.eventhandlers.toolhandoff = false;
				}
				// Moving points if mousedown
				var dx = 0;
				var dy = 0;
				var dz = getView("Event Handler pathedit mousemove").dz;
				switch (this.controlpoint){
					case "P":
						if(!sp.P.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.P.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						break;
					case "H1":
						if(!sp.H1.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.H1.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						break;
					case "H2":
						if(!sp.H2.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.H2.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						break;
				}
				sp.updatePointPosition(this.controlpoint, dx, dy);

				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw("Event Handler pathedit mousemove");
			}
		};
	}


	// --------------------------------------------------
	// Shape Resize - resizes whole shapes
	// --------------------------------------------------
	function shaperesize(){
		this.dragging = false;
		this.resizing = false;
		_UI.eventhandlers.corner = false;

		this.mousedown = function (ev) {
			//debug("SHAPERESIZE TOOL: mouse down: " + _UI.eventhandlers.mousex + ":" + _UI.eventhandlers.mousey);
			var s = ss("eventHandler - mousedown");
			_UI.eventhandlers.corner = s? s.isOverHandle(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey) : false;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.firstx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			_UI.eventhandlers.firsty = _UI.eventhandlers.mousey;

			if (_UI.eventhandlers.corner){
				//debug("SHAPERESIZE TOOL: clicked on _UI.eventhandlers.corner: " + _UI.eventhandlers.corner);
				this.resizing = true;
				this.dragging = false;
				if(_GP.projectsettings.quickpathupdating){
					_UI.eventhandlers.temppathdragshape = {
						"leftx": s.path.leftx,
						"rightx": s.path.rightx,
						"topy": s.path.topy,
						"bottomy": s.path.bottomy
					};

					s.hidden = true;
				}
			} else if (clickSelectShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				this.dragging = true;
				this.resizing = false;
				redraw("Event Handler shaperesize mousedown");
			} else {
				clickEmptySpace();
			}
		};

		this.mouseup = function () {
			//debug("Mouse Up");
			resetCursor();
			var s = ss("eventHandler - mouseup");
			if(_UI.eventhandlers.temppathdragshape){
				_UI.eventhandlers.temppathdragshape = false;
				s.hidden = false;
				_UI.eventhandlers.lastx = _UI.eventhandlers.firstx;
				_UI.eventhandlers.lasty = _UI.eventhandlers.firsty;
				evHanShapeResize(s, _UI.eventhandlers.corner);
			}

			if(this.resizing) s.path.calcMaxes();
			updateCurrentCharWidth();

			this.dragging = false;
			this.resizing = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;
			_UI.eventhandlers.firstx = -100;
			_UI.eventhandlers.firsty = -100;
			if(_UI.eventhandlers.uqhaschanged) putundoq("Path Edit tool");
			_UI.eventhandlers.uqhaschanged = false;
			redraw("Event Handler shaperesize mouseup");
			//debug("EVENTHANDLER - after shaperesize Mouse Up REDRAW");
		};

		this.mousemove = function (ev) {
			var s = ss("eventHandler - shaperesize mousemove");
			//debug("<b><i>SHAPERESIZE TOOL</i></b> - ss returned s.link: " + s.link);
			var didstuff = false;
			var dz = getView("Event Handler shaperesize mousemove").dz;
			if(s.link){
				//debug("SHAPERESIZE dragging linked shape");
				if(this.dragging && !s.uselinkedshapexy){
					//debug("SHAPERESIZE, this.dragging=" + this.dragging + " && !s.uselinkedshapexy=" + !s.uselinkedshapexy);
					s.xpos += round((_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz);
					s.ypos += round((_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz);
					didstuff = true;
					resetCursor();
				}
			} else {
				//debug("SHAPERESIZE dragging normal shape");
				if (this.dragging) {
					// Moving shapes if mousedown
					var dx = s.xlock? 0 : dx = round((_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz);
					var dy = s.ylock? 0 : dy = round((_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz);

					s.path.updatePathPosition(dx, dy);
					resetCursor();
					didstuff = true;
				} else if (this.resizing){
					// Resizing shapes if mousedown over handle
					evHanShapeResize(s, _UI.eventhandlers.corner);
					didstuff = true;
				}

				//Translation fidelity, passing raw canvas values
				if(s) s.isOverHandle(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey);
			}

			if(didstuff){
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw("Event Handler shaperesize mousemove");
			}
		};
	}


	// --------------------------------------------------
	// Pan - moves the canvas view
	// --------------------------------------------------
	function pantool(){
		this.dragging = false;
		this.deltax = 0;
		this.deltay = 0;

		this.mousedown = function (ev) {
			//debug("PAN TOOL - mouse down: " + _UI.eventhandlers.mousex + ":" + _UI.eventhandlers.mousey);
			var v = getView("Event Handler pantool mousedown");
			this.deltax = (_UI.eventhandlers.mousex-v.dx);
			this.deltay = (_UI.eventhandlers.mousey-v.dy);
			this.dragging = true;
		};

		this.mouseup = function () {
			//debug("PAN TOOL - Mouse Up");
			this.dragging = false;
			this.deltax = 0;
			this.deltay = 0;
		};

		this.mousemove = function (ev) {
			if (this.dragging) {
				// Moving shapes if mousedown
				setView({"dx" : (_UI.eventhandlers.mousex-this.deltax), "dy" : (_UI.eventhandlers.mousey-this.deltay)});
				redraw("Event Handler pantool mousemove");
			}
		};
	}


	// Helper Functions

	//convert canvas x-y inputs to saved shape x-y
	function cx_sx(cx){
		var v = getView("cx_sx");
		return round((cx-v.dx)/(v.dz));
	}

	function cy_sy(cy){
		var v = getView("cy_sy");
		return round((v.dy-cy)/(v.dz));
	}

	function clickEmptySpace(){
		var s = ss("Click Empty Space");
		if(s) {
			s.path.selectPathPoint(false);
			s.path.calcMaxes();
		}
		_UI.selectedshape = -1;
	}

	function evHanShapeResize(s, pcorner){

		var mx = cx_sx(_UI.eventhandlers.mousex);
		var my = cy_sy(_UI.eventhandlers.mousey);
		var lx = cx_sx(_UI.eventhandlers.lastx);
		var ly = cy_sy(_UI.eventhandlers.lasty);
		var dh, dw;

		switch(pcorner){
			case "nw":
				if(canResize("nw")){
					dh = (my-ly);
					dw = (mx-lx);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(dw,dh,(dw*-1),(dh*-1));
					} else {
						s.path.updatePathSize((dw*-1),dh);
						s.path.updatePathPosition(dw,0);
					}
				}
				break;

			case "n":
				if(canResize("n")){
					dh = (my-ly);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(0,dh,0,(dh*-1));
					} else {
						s.path.updatePathSize(0, dh);
						//s.path.updatePathPosition(0, 0);
					}
				}
				break;

			case "ne":
				if(canResize("ne")){
					dh = (my-ly);
					dw = (mx-lx);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(0,dh,dw,(dh*-1));
					} else {
						s.path.updatePathSize(dw,dh);
						//s.path.updatePathPosition(0,0);
					}
				}
				break;

			case "e":
				if(canResize("e")){
					dw = (mx-lx);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(0,0,dw,0);
					} else {
						s.path.updatePathSize(dw, 0);
						//s.path.updatePathPosition(0, 0);
					}
				}
				break;

			case "se":
				if(canResize("se")){
					dh = (ly-my)*-1;
					dw = (mx-lx);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(0,0,dw,dh);
					} else {
						s.path.updatePathSize(dw, (dh*-1));
						s.path.updatePathPosition(0, dh);
					}
				}
				break;

			case "s":
				if(canResize("s")){
					dh = (ly-my)*-1;
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(0,0,0,dh);
					} else {
						s.path.updatePathSize(0, (dh*-1));
						s.path.updatePathPosition(0, dh);
					}
				}
				break;

			case "sw":
				if(canResize("sw")){
					dw = (mx-lx);
					dh = (ly-my)*-1;
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(dw,0,(dw*-1),dh);
					} else {
						s.path.updatePathSize((dw*-1),(dh*-1));
						s.path.updatePathPosition(dw,dh);
					}
				}
				break;

			case "w":
				if(canResize("w")){
					dw = (mx-lx);
					if(_UI.eventhandlers.temppathdragshape){
						updateTPDS(dw,0,(dw*-1),0);
					} else {
						s.path.updatePathSize((dw*-1), 0);
						s.path.updatePathPosition(dw, 0);
					}
				}
				break;
		}

		//if(!_UI.eventhandlers.temppathdragshape) s.path.calcMaxes();

		//debug("EVHANSHAPERESIZE - Done lx/rx/ty/by: " + s.path.leftx + "," + s.path.rightx + "," + s.path.topy + "," + s.path.bottomy);
	}

	function updateTPDS(dx,dy,dw,dh){
		//debug("UPDATETPDS dx/dy/dw/dh = "+dx+" "+dy+" "+dw+" "+dh);
		_UI.eventhandlers.temppathdragshape.leftx += round(dx);
		_UI.eventhandlers.temppathdragshape.topy += round(dy);
		_UI.eventhandlers.temppathdragshape.rightx += round(dw+dx);
		_UI.eventhandlers.temppathdragshape.bottomy += round(dh+dy);
	}

	function canResize(pc){
		var s = ss("canResize");
		switch(pc){
			case "nw": return (!s.ylock && !s.hlock && !s.xlock && !s.wlock);
			case "n":  return (!s.ylock && !s.hlock);
			case "ne": return (!s.ylock && !s.hlock && !s.wlock);
			case "e":  return (!s.wlock);
			case "se": return (!s.hlock && !s.wlock);
			case "s":  return (!s.hlock);
			case "sw": return (!s.hlock && !s.xlock && !s.wlock);
			case "w":  return (!s.xlock && !s.wlock);
		}
		return true;
	}

	function mousewheel(event){
		var delta = event.detail? event.detail*(-120) : event.wheelDelta;	//cross browser
		var canscroll = ((_UI.navhere == "character edit") || (_UI.navhere == "linked shapes"));
		canscroll = canscroll && (document.getElementById('dialog_box').style.display != 'block');

		if(canscroll){
		//debug("MOUSEWHEEL: canscroll=true and delta=" + delta );
			if(delta > 0){ viewZoom(1.1); }
			else { viewZoom(0.9); }
		}
	}

	function mouseovercec() {
		//debug("MOUSEOVERCEC");
		_UI.eventhandlers.ismouseovercec = true;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () { return false; };
	}

	function mouseoutcec() {
		//debug("MOUSEOUTCEC");
		_UI.eventhandlers.ismouseovercec = false;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {};
		resetCursor();
	}

	function keydown(event){
		//debug("Key Down: " + event.keyCode);
		if(event.keyCode == 32 && _UI.eventhandlers.ismouseovercec){
			if(!_UI.eventhandlers.iskeydown){
				//debug("KEYDOWN - pressed 32 spacebar");
				_UI.eventhandlers.lastTool = _UI.selectedtool;
				_UI.selectedtool = "pan";
				_UI.eventhandlers.iskeydown = true;
				document.body.style.cursor = "move";
				redraw("Event Handler - Keydown Spacebar for pan toggle");
			}
		}
	}

	function keyup(event){
		//debug("Key Up: " + event.keyCode);
		if(event.keyCode == 32 && _UI.eventhandlers.ismouseovercec){
			//debug("KEYUP - releaseing 32 spacebar");
			_UI.selectedtool = _UI.eventhandlers.lastTool;
			_UI.eventhandlers.iskeydown = false;
			resetCursor();
			redraw("Event Handler - Keyup Spacebar for pan toggle");
		}
	}

	function keypress(event){
		//debug("Key Pressed: " + event.keyCode);
		/*
		//debug("Key Pressed: " + event.keyCode);
		var s = ss("keypress event");
		var changed = false;
		if(s){
			if(_UI.selectedtool == "pathedit"){
				switch(event.keyCode){
					case 54:	//NumPad 6 Right
						s.path.updatePathPosition(1,0);
						changed = "NumPad 6 Right";
						break;
					case 52:	//NumPad 4 Left
						s.path.updatePathPosition(-1,0);
						changed = "NumPad 4 Left";
						break;
					case 50:	//NumPad 2 Down
						s.path.updatePathPosition(0,1);
						changed = "NumPad 2 Down";
						break;
					case 56:	//NumPad 8 Up
						s.path.updatePathPosition(0,-1);
						changed = "NumPad 8 Up";
						break;
				}
			} else if (_UI.selectedtool == "pointselect"){
				var p = s.path.sp(false, "KEYPRESS");
				if(p){
					switch(event.keyCode){
						case 54:	//NumPad 6 Right
							p.updatePointPosition("P",1,0);
							changed = "NumPad 6 Right";
							break;
						case 52:	//NumPad 4 Left
							p.updatePointPosition("P",-1,0);
							changed = "NumPad 4 Left";
							break;
						case 50:	//NumPad 2 Down
							p.updatePointPosition("P",0,1);
							changed = "NumPad 2 Down";
							break;
						case 56:	//NumPad 8 Up
							p.updatePointPosition("P",0,-1);
							changed = "NumPad 8 Up";
							break;
					}
				}
			}

			if(changed){
				putundoq("Keypress : " + changed);
				redraw("Keypress");
			}
		}
		*/
	}



//	-------------------------
//	Save GLYPHR JSON
//	-------------------------

	function triggerProjectFileDownload(){

		var jsonString = JSON.stringify(_GP, undefined, '\t');
		jsonString = jsonString.replace(/\n/g, '\r\n');
		var fblob = new Blob([jsonString], {"type":"text/plain;charset=utf-8", "endings":"native"});
		var fname =  _GP.projectsettings.name + " - Glyphr Project - " + genDateStampSuffix() + ".txt";

		try {
			// IE
			window.navigator.msSaveBlob(fblob, fname);
		} catch (err) {
			// Others
			var link = document.createElement('a');
			//window.URL = window.URL || window.webkitURL;
			link.href = window.URL.createObjectURL(fblob);
			//link.onclick = ("alert("+window.URL.createObjectURL(fblob)+");");
			link.download = fname;

			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, false);
			link.dispatchEvent(event);
		}

		setProjectAsSaved();
	}

	function genDateStampSuffix(){
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();

		return (""+yr+"."+mo+"."+day+"-"+hr+"."+min+"."+sec);
	}

//	------------------------
//	Save as a TTX XML
//	------------------------

	function triggerTTXFileDownload(){
		var ttxstring = generateTTXXML();
		ttxstring = ttxstring.replace(/\n/g, '\r\n');
		var blob = new Blob([ttxstring], { type: "text/plain;charset=utf-8" });

		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = "TTX Data - " + _GP.projectsettings.name + " - " + genDateStampSuffix() + ".ttx";
		link.click();
	}

	function generateTTXXML(){
		var maxes = calcFontMaxes();
		var con = '<?xml version="1.0" encoding="ISO-8859-1"?>\n';
		con += '<ttFont sfntVersion="OTTO" ttLibVersion="2.3">\n\n';
		con += genTable_glyphorder({});
		con += genTable_head({});
		con += genTable_hhea(maxes);
		con += genTable_maxp({});
		con += genTable_os_2(maxes);
		con += genTable_name({});
		con += genTable_cmap({});
		con += genTable_post({});
		con += genTable_cff({});
		con += genTable_hmtx({});
		con += '</ttFont>';

		return con;
	}

	function calcFontMaxes(){
		var fm = _UI.fontmetrics;
		var cm = {};

		for(var c=0; c<_GP.fontchars.length; c++){
			if(_GP.fontchars[c] && _GP.fontchars[c].charshapes){
				cm = _GP.fontchars[c].calcCharMaxes();
				fm.xmax = Math.max(cm.xmax, fm.xmax);
				fm.xmin = Math.min(cm.xmin, fm.xmin);
				fm.ymax = Math.max(cm.ymax, fm.ymax);
				fm.ymin = Math.min(cm.ymin, fm.ymin);
			}
		}

		var proportion = (fm.ymax / (fm.ymax-fm.ymin));
		var total = fm.ymax + Math.abs(fm.ymin) + _GP.projectsettings.linegap;
		fm.hhea_ascent = round(total*proportion);
		fm.hhea_descent = (fm.hhea_ascent - total);

		debug("CALCFONTMAXES - returns " + JSON.stringify(fm));
	}


	function genTable_glyphorder(oa){
		var con = '<GlyphOrder>\n';
		con += '\t<GlyphID name=".notdef"/>\n';

		var count = 0;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			con += '\t<GlyphID name="' + _GP.fontchars[tc].charname + '"/>\n';
			count++;
		}

		//debug("EXPORT TTX - Loop Count = " + count);

		con += '</GlyphOrder>\n\n';
		return con;
	}

	function genTable_head(oa){
		var con = '<head>\n';
		//con += '<!-- Most of this table will be recalculated by the compiler -->';
		con += '\t<tableVersion value="1.0"/>\n';
		con += '\t<fontRevision value="' + getOTprop("head","fontRevision") + '"/>\n';	// VAR VERSION
		con += '\t<checkSumAdjustment value="0xfd4639aa"/>\n';
		con += '\t<magicNumber value="0x5f0f3cf5"/>\n';
		con += '\t<flags value="00000000 00000011"/>\n';
		con += '\t<unitsPerEm value="' + _GP.projectsettings.upm + '"/>\n';		// VAR UPM?
		con += '\t<created value="' + getOTprop("head","created") + '"/>\n';			// VAR CREATED DA\nTE
		con += '\t<modified value="' + ttxDateString() + '"/>\n';				// COMPUTED SAVE DATE
		con += '\t<xMin value="-100"/>\n';											// COMPUTED
		con += '\t<yMin value="-100"/>\n';											// COMPUTED
		con += '\t<xMax value="4048"/>\n';											// COMPUTED
		con += '\t<yMax value="4048"/>\n';											// COMPUTED
		con += '\t<macStyle value="00000000 00000000"/>\n';
		con += '\t<lowestRecPPEM value="3"/>\n';
		con += '\t<fontDirectionHint value="2"/>\n';
		con += '\t<indexToLocFormat value="0"/>\n';
		con += '\t<glyphDataFormat value="0"/>\n';

		con += '</head>\n\n';
		return con;
	}

	function ttxDateString(){
		var d = new Date();
		var t = (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
		d = d.toDateString().split(" ");
		d.splice(3,0,t);
		var re = d.join(" ");
		//debug("TTXDATESTRING :  resulted " + re);
		return re;
	}

	function genTable_hhea(oa){
		var fm = _UI.fontmetrics;
		var con = '<hhea>\n';
		con += '\t<tableVersion value="1.0"/>\n';
		con += '\t<ascent value="'+fm.hhea_ascent+'"/>\n';		// 700		// COMPUTED - OS_2 winAscender
		con += '\t<descent value="'+fm.hhea_descent+'"/>\n';	// -300		// COMPUTED - OS_2 winDescender
		con += '\t<lineGap value="0"/>\n';						// 0		// COMPUTED - 0
		con += '\t<advanceWidthMax value="1000"/>\n';			//			// COMPUTED - max advance width from hmtx table
		con += '\t<minLeftSideBearing value="'+fm.xmin+'"/>\n';	// -123		// COMPUTED - min lsb from hmtx
		con += '\t<minRightSideBearing value="0"/>\n';			// -124		// COMPUTED - MIN(advance width - lsb - (xMax-xMin))
		con += '\t<xMaxExtent value="1000"/>\n';				//			// COMPUTED - MAX(lsb + (xMax - xMin))
		// italics
		con += '\t<caretSlopeRise value="1"/>\n';
		con += '\t<caretSlopeRun value="0"/>\n';
		con += '\t<caretOffset value="0"/>\n';
		// reserved = 0
		con += '\t<reserved0 value="0"/>\n';
		con += '\t<reserved1 value="0"/>\n';
		con += '\t<reserved2 value="0"/>\n';
		con += '\t<reserved3 value="0"/>\n';
		con += '\t<metricDataFormat value="0"/>\n';

		// # entries in the hmtx table: GLYPH COUNT!!!
		con += '\t<numberOfHMetrics value="95"/>\n';

		con += '</hhea>\n\n';
		return con;
	}

	function genTable_maxp(oa){
		var con = '<maxp>\n';
		con += '\t<tableVersion value="0x5000"/>\n';

		//GLYPH COUNT!!
		con += '\t<numGlyphs value="95"/>\n';

		con += '</maxp>\n\n';
		return con;
	}

	function genTable_os_2(oa){
		var gp = _GP.projectsettings;
		var fm = _UI.fontmetrics;

		var con = '<OS_2>\n';
		con += '\t<version value="3"/>\n';
		con += '\t<xAvgCharWidth value="2100"/>\n';			// COMPUTED
		con += '\t<usWeightClass value="' + getOTprop("os_2","usWeightClass") + '"/>\n';	// VAR weight class
		con += '\t<usWidthClass value="' + getOTprop("os_2","usWidthClass") + '"/>\n';		// VAR width class
		con += '\t<fsType value="00000000 00001000"/>\n';

		// Subscript
		con += '\t<ySubscriptXSize value="650"/>\n';
		con += '\t<ySubscriptYSize value="600"/>\n';
		con += '\t<ySubscriptXOffset value="0"/>\n';
		con += '\t<ySubscriptYOffset value="75"/>\n';
		con += '\t<ySuperscriptXSize value="650"/>\n';
		con += '\t<ySuperscriptYSize value="600"/>\n';
		con += '\t<ySuperscriptXOffset value="0"/>\n';
		con += '\t<ySuperscriptYOffset value="350"/>\n';
		con += '\t<yStrikeoutSize value="50"/>\n';
		con += '\t<yStrikeoutPosition value="384"/>\n';
		con += '\t<sFamilyClass value="0"/>\n';
		con += '\t<panose>\n';								// http://www.monotypeimaging.com/ProductsServices/pan1.aspx
			con += '\t\t<bFamilyType value="2"/>\n';			// 2 = Latin
			con += '\t\t<bSerifStyle value="0"/>\n';			// 0 = 'any' ...
			con += '\t\t<bWeight value="0"/>\n';
			con += '\t\t<bProportion value="0"/>\n';
			con += '\t\t<bContrast value="0"/>\n';
			con += '\t\t<bStrokeVariation value="0"/>\n';
			con += '\t\t<bArmStyle value="0"/>\n';
			con += '\t\t<bLetterForm value="0"/>\n';
			con += '\t\t<bMidline value="0"/>\n';
			con += '\t\t<bXHeight value="0"/>\n';
		con += '\t</panose>\n';
		con += '\t<ulUnicodeRange1 value="00000000 00000000 00000000 00000001"/>\n';
		con += '\t<ulUnicodeRange2 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<ulUnicodeRange3 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<ulUnicodeRange4 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<achVendID value=""/>\n';
		con += '\t<fsSelection value="00000000 00000000"/>\n';
		con += '\t<fsFirstCharIndex value="32"/>\n';
		con += '\t<fsLastCharIndex value="64258"/>\n';

		// Line Metrics
		// $$$ http://typophile.com/node/13081
		// $$$ FontMetrics-kltf.pdf

		// $$$ |-sTypoDescender| + sTypoAscender = regularUPM = 1000
		// $$$ usWinAscent + usWinDescent = hhea.ascent + hhea.descent + hhea.lineGap(0)
		// $$$ sTypoAscender + |-sTypoDescender| + sTypoLineGap === hhea.ascent + hhea.descent === usWinAscent + usWinDescent

		con += '\t<sTypoAscender value="'+gp.ascent+'"/>\n';			//	700
		con += '\t<sTypoDescender value="'+(gp.ascent-gp.upm)+'"/>\n';	//	-300
		con += '\t<sTypoLineGap value="'+gp.linegap+'"/>\n';			//	250
		con += '\t<usWinAscent value="'+fm.hhea_ascent+'"/>\n';				//	700
		con += '\t<usWinDescent value="'+Math.abs(fm.hhea_descent)+'"/>\n';	//	300

		con += '\t<ulCodePageRange1 value="00100000 00000000 00000000 00000001"/>\n';
		con += '\t<ulCodePageRange2 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<sxHeight value="'+(gp.xheight)+'"/>\n';			// COMPUTED - xheight
		con += '\t<sCapHeight value="'+(gp.ascent)+'"/>\n';		// COMPUTED - Hheight
		con += '\t<usDefaultChar value="0"/>\n';
		con += '\t<usBreakChar value="32"/>\n';
		con += '\t<usMaxContex value="4"/>\n';

		con += '</OS_2>\n\n';
		return con;
	}

	function genTable_name(oa){
		var otsn = _GP.opentypeproperties.name;

		var con = '<name>\n';
		con += '\t<namerecord nameID="0" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[0].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="1" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[1].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="2" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[2].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="3" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[3].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="4" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[4].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="5" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[5].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="6" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[6].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="8" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[8].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="9" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[9].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="10" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[10].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="11" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[11].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="12" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[12].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="13" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[13].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="14" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[14].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="0" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[0].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="1" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[1].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="2" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[2].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="3" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[3].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="4" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[4].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="5" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[5].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="6" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[6].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="8" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[8].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="9" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[9].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="10" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[10].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="11" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[11].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="12" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[12].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="13" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[13].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="14" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[14].val +'\n\t</namerecord>\n';
		con += '</name>\n\n';

		return con;
	}


	function genTable_cmap(oa){
		var cmapbody = "";
		for(var tc=32; tc<_GP.fontchars.length; tc++){
			cmapbody += '\t\t<map code="'+_GP.fontchars[tc].cmapcode+'" name="' + _GP.fontchars[tc].charname + '"/>\n';
		}

		var con = '<cmap>\n';
		con += '<tableVersion version="0"/>\n';

		con += '\t<cmap_format_4 platformID="0" platEncID="3" language="0">\n';
		con += cmapbody;
		con += '\t</cmap_format_4>\n';

		con += '\t<cmap_format_6 platformID="1" platEncID="0" language="0">\n';
		con += cmapbody;
		con += '\t</cmap_format_6>\n';

		con += '\t<cmap_format_4 platformID="3" platEncID="1" language="0">\n';
		con += cmapbody;
		con += '\t</cmap_format_4>\n';

		con += '</cmap>\n\n';
		return con;
	}

	function genTable_post(oa){
		var con = '<post>\n';
		con += '\t<formatType value="3.0"/>\n';
		con += '\t<italicAngle value="'+getOTprop("post","italicAngle")+'"/>\n';				// VAR
		con += '\t<underlinePosition value="'+getOTprop("post","underlinePosition")+'"/>\n';	// VAR
		con += '\t<underlineThickness value="'+getOTprop("post","underlineThickness")+'"/>\n';	// VAR
		con += '\t<isFixedPitch value="0"/>\n';
		con += '\t<minMemType42 value="0"/>\n';
		con += '\t<maxMemType42 value="0"/>\n';
		con += '\t<minMemType1 value="0"/>\n';
		con += '\t<maxMemType1 value="0"/>\n';

		con += '</post>\n\n';
		return con;
	}

	function genTable_cff(oa){
		var md = _GP.opentypeproperties;
		var con = '<CFF>\n';
		con += '\t<CFFFont name="'+md.name[1].val+'">\n';							//VAR
		con += '\t\t<version value="002.000"/>\n';
		con += '\t\t<Notice value="'+getOTprop("cff","Notice")+'"/>\n';				//VAR
		con += '\t\t<FullName value="'+getOTprop("cff","FullName")+'"/>\n';			//VAR
		con += '\t\t<FamilyName value="'+getOTprop("cff","FamilyName")+'"/>\n';		//VAR
		con += '\t\t<Weight value="'+getOTprop("cff","Weight")+'"/>\n';				//VAR
		con += '\t\t<isFixedPitch value="0"/>\n';
		con += '\t\t<ItalicAngle value="0"/>\n';
		con += '\t\t<UnderlineThickness value="50"/>\n';
		con += '\t\t<PaintType value="0"/>\n';
		con += '\t\t<CharstringType value="2"/>\n';
		con += '\t\t<FontMatrix value="0.001 0 0 0.001 0 0"/>\n';
		con += '\t\t<FontBBox value="0 0 0 0"/>\n';					// UPM??
		//con += '\t\t<FontBBox value="-123 -315 1264 1101"/>\n';	// UPM??
		con += '\t\t<StrokeWidth value="0"/>\n';
		con += '\t\t<Encoding name="StandardEncoding"/>\n';
		con += '\t\t<Private>\n';
		con += '\t\t</Private>\n';
		con += '\t\t<CharStrings>\n';

		con += genCharStringsPostScript();

		con += '\t\t</CharStrings>\n';
		con += '\t</CFFFont>\n';
		con += '</CFF>\n\n';
		return con;
	}

	function genCharStringsPostScript(){
		var con = '\t\t\t<CharString name=".notdef">\n\t\t\t\tendchar\n\t\t\t</CharString>\n';
		var lastx, lasty;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			con += '\t\t\t<CharString name="' + _GP.fontchars[tc].charname + '">\n';
			lastx = 0;
			lasty = 0;
			rvar = {};

			//debug("GENCHARSTRINGSPOSTSCRIPT: \t starting char " + _GP.fontchars[tc].charname);

			for(var ts=0; ts<_GP.fontchars[tc].charshapes.length; ts++){
				rvar = _GP.fontchars[tc].charshapes[ts].genPostScript(lastx, lasty);
				//debug("path " + ts + " returning \t " + JSON.stringify(rvar));
				con += rvar.re;
				lastx = rvar.lastx;
				lasty = rvar.lasty;
			}

			con += '\t\t\t\tendchar\n';
			con += '\t\t\t</CharString>\n';
		}
		return con;
	}


	function genTable_hmtx(oa){
		var con = '<hmtx>\n';
		con += '\t<mtx name=".notdef" width="2100" lsb="0"/>\n';
		var lsb, curr;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			curr = _GP.fontchars[tc];
			lsb = (curr.leftsidebearing === false)? _GP.projectsettings.defaultlsb : curr.leftsidebearing;
			con += '\t<mtx name="' + curr.charname + '" width="'+(lsb+curr.charwidth)+'" lsb="'+lsb+'"/>\n';
		}

		con += '</hmtx>\n\n';
		return con;
	}