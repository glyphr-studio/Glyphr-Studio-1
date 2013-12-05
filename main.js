/**
	MAIN FILE OF CONTROLORIZATION
**/

// -- GLoBAL VARIABLES --//
	var DEBUG = true;
	var GlyphrProject = {};
	var uistate = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npNav",
		"thisGlyphrStudioVersion" : "Beta 2.1 Working Edition - 0.2.2013.11.00.Working",

		// page: seed shapes
		"shownseedshape" : "id0",
		"seedcurrstate" : {},
		"seedundoq" : [],

		// page: charedit
		"charundoq" : [],
		"charcurrstate" : {},
		"clipboardshape" : false,
		"chareditcanvas" : false,
		"chareditctx" : false, 
		"calcmaxesghostcanvas" : false, 
		"calcmaxesghostctx" : false, 
		"ishereghostcanvas" : false, 
		"ishereghostctx" : false,
		"showrightline" : true,	
		"shapelayers" : [],
		"selectedshape" : -1,
		"selectedchar" : 97,
		"selectedtool" : "pathedit",	// pathedit, shapemove, pantool, newrect, newoval, newpath	
		"debugpoints" : [false,false],
		
		// Char Edit Canvas Area and Calc Maxes Ghost Canvas
		"calcmaxesghostcanvassettings" : {
			"size" : 1500,
			"originx" : 140,
			"originy" : 740
		},

		"chareditcanvassettings" : {
			"size" : 1500, 			// How big the canvas is
			"originx" : 140,		// Where on the canvas the origin is
			"originy" : 740,		// Where on the canvas the origin is
			"zoom" : .32,			// Either reduces or increases objects size
			"showgrid" : true,		// display the grid
			"showguides" : true,	// display guides
			"pointsize" : 50		// square points size - SHOULD BE ODD	
		},

		// page: test drive
		"testdrivectx" : false,
		"testdrivecanvas" : false
	}

	var uisettings = {

		//UI Settings
		"spinnervaluechange" : 1,	// how much spinner controls change a value
		"decplaces" : 4,			// how many decimal places of precision

		// Behavior Settings
		"stoppagenavigation" : false,
		"quickpathupdating" : true
	}
	
	function setup() {
		debug("MAIN SETUP() - START");
			
		// Draw Glyphr Logo
		drawLogo();	
		
		// Setup Nav Stuff
		navigate();

		// Shows a popup if the window is closed or refreshed
		if(uisettings.stoppagenavigation){
			window.onbeforeunload = function() {
				return "\n\nUnless you specifically exported your data via the 'Save Project' page, all your progress will be lost.\n\n";
			}
		}
		
		debug("MAIN SETUP() - END");
	}

	
//-------------------
// Navigation Stuff
//-------------------
	function navigate(){
		//debug("<b>>>NAVIGATE STARTED</b> - to " + uistate.navhere);

		mouseoutcec();
		document.getElementById("mainwrapper").style.overflowY = "scroll";
		document.getElementById("mainpane").style.marginLeft = "470px";
		document.getElementById("navprimarypane").style.display = "block";
		document.getElementById("navtargetpane").style.display = "block";
		document.getElementById("logocanvas").style.display = "block";
		
		if(uistate.navhere=="test drive") uistate.navprimaryhere = "npAttributes";
		
		updateNavPrimaryNavTarget();
		
		switch(uistate.navhere){
			case "firstrun":		updatefirstrun();		break;	
			case "font metadata": 	updatefontmetadata(); 	break;
			case "font settings":	updatefontsettings();	break;
			case "test drive":
				uistate.navprimaryhere = "npAttributes";
				updatetestdrive();		
				break;	
				
			case "open project":	updateopenproject();	break;
			/*
			case "export font":		updateexportfont();		break;
			*/
			case "help": 			updatehelp();			break;
			case "about":			updateabout();			break;
				
			case "character edit":
				uistate.navprimaryhere = "npChar";
				resetZoomPan();
				updatecharedit();	
				document.getElementById("mainwrapper").style.overflowY = "hidden";			
				uistate.selectedshape = -1;
				break;
			
			case "seed shapes":
				uistate.navprimaryhere = "npChar";
				resetZoomPan();
				updateseedshapes();
				document.getElementById("mainwrapper").style.overflowY = "hidden";
				break;
		}
		
		drawNavPrimaryOptions();
		
		document.body.focus();
		
		debug("\tNAVIGATE FINISHED - to " + uistate.navhere);

	}
	
	function updateNavPrimaryNavTarget(){
		document.getElementById("navprimarypane").innerHTML = generateNavPrimaryOptions();
		drawNavPrimaryOptions();
		
		var nt = document.getElementById("navtargetpane");
		nt.innerHTML = "";
		
		if((uistate.navhere!="character edit")&&(uistate.navhere!="seed shapes")&&(uistate.navhere!="test drive")) {
				uistate.navprimaryhere = "npNav";
				nt.innerHTML = generateNavTargetOptions();
				return;
		}
				
		switch(uistate.navprimaryhere){
			case "npNav":
				nt.innerHTML = generateNavTargetOptions();
				break;
				
			case "npChar":
				if(uistate.navhere == "character edit") {
					nt.innerHTML = "<h1>character edit</h1>"+updateselectchar();
					drawselectcharcanvas();
				}
				if(uistate.navhere == "seed shapes") nt.innerHTML = "<h1>seed shapes</h1>"+seedshapes_subnav();
				break;
			
			case "npLayers":
				updatelayers();
				break;
				
			case "npAttributes":
				if(uistate.navhere == "test drive"){
					nt.innerHTML = updatetestdriveoptions();
				} else {
					updatedetails();
				}
				break;
			
			case "npSave":
				triggerProjectFileDownload();
		
				break;
		}			
	}
	
	function drawNavPrimaryOptions(){
		var ngray = "#B2B2B2";
		var nselect = "#00aaff";
		var fill = ngray;
		
		uistate.navprimaryhere == "npNav" ? fill=nselect : fill=ngray;
		var pncanvas = document.getElementById("npNav");
		var pnctx = pncanvas.getContext("2d");
		pncanvas.width = 50;
		pncanvas.height = 50;
		draw_primaryNav_navigate(pnctx, fill);
		
		if(uistate.navhere=="character edit"){
			uistate.navprimaryhere == "npChar" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);
			
			uistate.navprimaryhere == "npLayers" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npLayers");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_layers(pnctx, fill);
			
			uistate.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}
		
		if(uistate.navhere=="seed shapes"){
			uistate.navprimaryhere == "npChar" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);
			
			uistate.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}
		
		if(uistate.navhere=="test drive"){
			uistate.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}

		fill=ngray;
		pncanvas = document.getElementById("npSave");
		pnctx = pncanvas.getContext("2d");
		pncanvas.width = 50;
		pncanvas.height = 50;
		draw_primaryNav_save(pnctx, fill);
	}

	function generateNavPrimaryOptions(){
		var navarr = [];
		navarr.push("npNav");
		
		if(uistate.navhere=="character edit"){
			navarr.push("npChar");
			navarr.push("npLayers");
			navarr.push("npAttributes");
		}
		
		if(uistate.navhere=="seed shapes"){
			navarr.push("npChar");
			navarr.push("npAttributes");
		}
		
		if(uistate.navhere=="test drive"){
			navarr.push("npAttributes");
		}
		
		var newsub = "";
		var bc = "primarynavbutton";
		
		for(var i=0; i<navarr.length; i++){
			newsub += ("<canvas class='"+bc+"' id='"+navarr[i]+"' onclick='uistate.navprimaryhere=\""+navarr[i]+"\";updateNavPrimaryNavTarget();'></canvas>");
		}
		
		newsub += ("<canvas class='"+bc+"' id='npSave' onclick='triggerProjectFileDownload();'></canvas>");
		
		return newsub;
	}
	
	function generateNavTargetOptions(){
		var navarr = [];
		navarr.push("character edit");
		navarr.push("seed shapes");
		navarr.push("test drive");
		navarr.push("_");
		navarr.push("font settings");
		navarr.push("font metadata");
		navarr.push("_");
		navarr.push("open project");
		//navarr.push("export font");
		navarr.push("_");
		navarr.push("help");
		navarr.push("about");
		navarr.push("_");
		navarr.push("bug");
		navarr.push("feat");
		
		var newsub = "<h1>navigate</h1>";
		
		for(var i=0; i<navarr.length; i++){
			var bc = "navtargetbutton";
			if(navarr[i] == uistate.navhere) { bc = "navtargetbuttonsel"; }
			
			if(navarr[i]=="_"){
				newsub += "<div style='height:10px;'></div>";
			} else if (navarr[i] == "bug"){
				newsub += ("<a href='javascript:sendBugEmail()' style='font-size:1.1em; padding:4px 0px 4px 0px; font-style:italic;'>report an issue</a><br>");
			} else if (navarr[i] == "feat"){
				newsub += ("<a href='mailto:mail@glyphrstudio.com&subject=Feature%20Request' style='font-size:1.1em; padding:4px 0px 4px 0px; font-style:italic;'>request a feature</a><br>");
			} else {
				newsub += ("<input type='button' class='"+bc+"' value='"+navarr[i]+"' onclick='uistate.navhere=\""+navarr[i]+"\"; uistate.selectedshape=-1; navigate(true);'>");
			}
		}
		
		return newsub;
	}
	
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
		con += "Glyphr Studio Version %09%09" + thisGlyphrStudioVersion + "%0A";
		//con += "appCodeName %09%09" + navigator.appCodeName + "%0A";
		con += "appName %09%09" + navigator.appName + "%0A";
		//con += "appVersion %09%09" + navigator.appVersion + "%0A";
		con += "language %09%09" + navigator.language + "%0A";
		con += "platform %09%09" + navigator.platform + "%0A";
		con += "systemLanguage %09%09" + navigator.systemLanguage + "%0A";
		con += "userLanguage %09%09" + navigator.userLanguage + "%0A";		
		con += "userAgent %09%09" + encodeURIComponent(navigator.userAgent) + "%0A";
		
		debug(con);
		
		return con;
	}
	

	
//-------------------
// Debug
//-------------------
		
	function debug(message, force){
		if(DEBUG | force){ console.log(message); }
	}


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
// Undo Queue
//-------------------	
	function putundoq(calledfrom){
		var uqo = new Object;
		uqo.name = calledfrom;
		uqo.date = new Date().getTime();
		
		if(uistate.navhere == "character edit"){
			uqo.state = clone(uistate.charcurrstate);
			uistate.charundoq.push(uqo);
			uistate.charcurrstate = clone(GlyphrProject.fontchars);
		} else if (uistate.navhere == "seed shapes"){
			uqo.state = clone(uistate.seedcurrstate);
			uistate.seedundoq.push(uqo);
			uistate.seedcurrstate = clone(GlyphrProject.seedshapes);
		}
		
		/*
		var uqdebug = "<b>Put Undo Queue</b><br>";
		for(var i=0; i<uistate.charundoq.length; i++){
			uqdebug += i + ". ";
			uqdebug += undoq[i].nav + " - ";
			uqdebug += undoq[i].name + "<br>";
		}
		debug(uqdebug);
		*/
	}
	
	function pullundoq(){
		//debug("PULLUNDOQ - Undo Pressed, undoq: " + undoq);
		
		if(uistate.navhere == "character edit"){
			if(uistate.charundoq.length > 0){
				var uqo = uistate.charundoq.pop();
				GlyphrProject.fontchars = uqo.state;
				uistate.charcurrstate = clone(GlyphrProject.fontchars);
				redraw();
			}
		} else if (uistate.navhere == "seed shapes"){
			if(uistate.seedundoq.length > 0){
				var uqo = uistate.seedundoq.pop();
				GlyphrProject.seedshapes = uqo.state;
				uistate.seedcurrstate = clone(GlyphrProject.seedshapes);
				redraw();
			}
		}
	}

	
//-------------------
// JavaScript Prototypes
//-------------------
	// returns a full new copy of any object
	function clone(cobj){
		var newObj = (cobj instanceof Array) ? [] : {};
		for (i in cobj) {
			if (cobj[i] && typeof cobj[i] == "object") {
				newObj[i] = clone(cobj[i]);
			} else newObj[i] = cobj[i]
		} return newObj;	
	}
	
	// rounds a number to include a .5 so it draws nicely on canvas
	Number.prototype.makeCrisp = function(){
		return Math.round(this)+.5;
	}

	// returns the length of an associative array
	function aalength(aa){
		var len = 0;
		for(var key in aa){	len++; }
		return len;
	}

	function round(num, dec){
		if (dec===undefined) dec = uisettings.decplaces;
		var na = num.toString().split(".");
		if(na.length == 2) {
			var right = na[1].substring(0,dec) + "." + na[1].substring(dec+1);
			var right = Math.round(right);
			num = ((na[0] + "." + right) * 1);
		}
		return (num*1);
	}
	
	function strSan(val){
		return val.replace(/[<>'"\\]/g,"");
	}
	
	function isval(val){
		return ((typeof val !== "undefined") && (val !== null));
	}
	
	
//-------------------
// Logo
//-------------------
	function drawLogo() {
		logoctx = document.getElementById("logocanvas").getContext("2d");
		logoctx.clearRect(0,0,3000,3000);
		
		// GLYPHR
		logoctx.strokeStyle = color_accent;
		// websiteLogo/Group/Path
		logoctx.save();
		logoctx.beginPath();
		logoctx.moveTo(37.0, 41.0);
		logoctx.lineTo(37.0, 2.0);
		logoctx.lineTo(40.8, 2.0);
		logoctx.lineWidth = 4.0;
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(2.0, 30.0);
		logoctx.bezierCurveTo(2.0, 43.3, 31.0, 43.3, 31.0, 30.0);
		logoctx.bezierCurveTo(31.0, 11.0, 2.0, 11.0, 2.0, 30.0);
		logoctx.closePath();
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(31.0, 30.0);
		logoctx.lineTo(31.0, 46.0);
		logoctx.bezierCurveTo(31.0, 59.3, 2.0, 59.3, 2.0, 46.0);
		logoctx.lineTo(6.0, 46.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(72.0, 30.0);
		logoctx.bezierCurveTo(72.0, 43.3, 43.0, 43.3, 43.0, 30.0);
		logoctx.lineTo(43.0, 16.0);
		logoctx.lineTo(47.0, 16.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(47.0, 46.0);
		logoctx.lineTo(43.0, 46.0);
		logoctx.bezierCurveTo(43.0, 59.3, 72.0, 59.3, 72.0, 46.0);
		logoctx.lineTo(72.0, 30.0);
		logoctx.lineTo(72.0, 14.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(107.0, 30.0);
		logoctx.bezierCurveTo(107.0, 43.3, 78.0, 43.3, 78.0, 30.0);
		logoctx.bezierCurveTo(78.0, 11.0, 107.0, 11.0, 107.0, 30.0);
		logoctx.closePath();
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(78.0, 30.0);
		logoctx.lineTo(78.0, 56.0);
		logoctx.lineTo(81.9, 56.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(142.0, 42.0);
		logoctx.lineTo(142.0, 30.0);
		logoctx.bezierCurveTo(142.0, 11.0, 113.0, 11.0, 113.0, 30.0);
		logoctx.lineTo(113.0, 40.0);
		logoctx.lineTo(117.0, 40.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(113.0, 28.0);
		logoctx.lineTo(113.0, 2.0);
		logoctx.lineTo(116.9, 2.0);
		logoctx.stroke();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(177.0, 30.0);
		logoctx.bezierCurveTo(177.0, 11.0, 148.0, 11.0, 148.0, 30.0);
		logoctx.lineTo(148.0, 40.0);
		logoctx.lineTo(152.0, 40.0);
		logoctx.stroke();

		// websiteLogo/Group
		logoctx.restore();

		
		// BETA
		logoctx.fillStyle = color_accent_light;
		
		// websiteLogo/Group/Path
		logoctx.save();
		logoctx.beginPath();
		logoctx.moveTo(148.0, 49.0);
		logoctx.lineTo(149.0, 49.0);
		logoctx.lineTo(149.0, 48.0);
		logoctx.lineTo(148.0, 48.0);
		logoctx.lineTo(148.0, 49.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(148.0, 46.0);
		logoctx.lineTo(148.0, 47.0);
		logoctx.lineTo(149.0, 47.0);
		logoctx.lineTo(149.0, 46.0);
		logoctx.lineTo(148.0, 46.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Group/Path
		logoctx.beginPath();
		logoctx.moveTo(161.0, 47.0);
		logoctx.lineTo(161.0, 46.0);
		logoctx.lineTo(160.0, 46.0);
		logoctx.lineTo(160.0, 47.0);
		logoctx.lineTo(161.0, 47.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Group/Compound Path
		logoctx.beginPath();

		// websiteLogo/Group/Compound Path/Path
		logoctx.moveTo(146.0, 44.0);
		logoctx.lineTo(146.0, 51.0);
		logoctx.lineTo(163.0, 51.0);
		logoctx.lineTo(163.0, 44.0);
		logoctx.lineTo(146.0, 44.0);
		logoctx.closePath();

		// websiteLogo/Group/Compound Path/Path
		logoctx.moveTo(150.0, 47.0);
		logoctx.lineTo(149.0, 47.0);
		logoctx.lineTo(149.0, 48.0);
		logoctx.lineTo(150.0, 48.0);
		logoctx.lineTo(150.0, 49.0);
		logoctx.lineTo(149.0, 49.0);
		logoctx.lineTo(149.0, 50.0);
		logoctx.lineTo(148.0, 50.0);
		logoctx.lineTo(147.0, 50.0);
		logoctx.lineTo(147.0, 45.0);
		logoctx.lineTo(148.0, 45.0);
		logoctx.lineTo(149.0, 45.0);
		logoctx.lineTo(149.0, 46.0);
		logoctx.lineTo(150.0, 46.0);
		logoctx.lineTo(150.0, 47.0);
		logoctx.closePath();

		// websiteLogo/Group/Compound Path/Path
		logoctx.moveTo(154.0, 46.0);
		logoctx.lineTo(152.0, 46.0);
		logoctx.lineTo(152.0, 47.0);
		logoctx.lineTo(153.0, 47.0);
		logoctx.lineTo(153.0, 48.0);
		logoctx.lineTo(152.0, 48.0);
		logoctx.lineTo(152.0, 49.0);
		logoctx.lineTo(154.0, 49.0);
		logoctx.lineTo(154.0, 50.0);
		logoctx.lineTo(152.0, 50.0);
		logoctx.lineTo(151.0, 50.0);
		logoctx.lineTo(151.0, 45.0);
		logoctx.lineTo(152.0, 45.0);
		logoctx.lineTo(154.0, 45.0);
		logoctx.lineTo(154.0, 46.0);
		logoctx.closePath();

		// websiteLogo/Group/Compound Path/Path
		logoctx.moveTo(158.0, 46.0);
		logoctx.lineTo(157.0, 46.0);
		logoctx.lineTo(157.0, 50.0);
		logoctx.lineTo(156.0, 50.0);
		logoctx.lineTo(156.0, 46.0);
		logoctx.lineTo(155.0, 46.0);
		logoctx.lineTo(155.0, 45.0);
		logoctx.lineTo(158.0, 45.0);
		logoctx.lineTo(158.0, 46.0);
		logoctx.closePath();

		// websiteLogo/Group/Compound Path/Path
		logoctx.moveTo(162.0, 50.0);
		logoctx.lineTo(161.0, 50.0);
		logoctx.lineTo(161.0, 48.0);
		logoctx.lineTo(160.0, 48.0);
		logoctx.lineTo(160.0, 50.0);
		logoctx.lineTo(159.0, 50.0);
		logoctx.lineTo(159.0, 46.0);
		logoctx.lineTo(160.0, 46.0);
		logoctx.lineTo(160.0, 45.0);
		logoctx.lineTo(161.0, 45.0);
		logoctx.lineTo(161.0, 46.0);
		logoctx.lineTo(162.0, 46.0);
		logoctx.lineTo(162.0, 50.0);
		logoctx.closePath();
		logoctx.fill();

		
		
		// websiteLogo/Path
		logoctx.restore();
		logoctx.beginPath();
		logoctx.moveTo(164.0, 45.0);
		logoctx.lineTo(164.0, 46.0);
		logoctx.lineTo(165.0, 46.0);
		logoctx.lineTo(165.0, 45.0);
		logoctx.lineTo(164.0, 45.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(165.0, 44.0);
		logoctx.lineTo(165.0, 45.0);
		logoctx.lineTo(168.0, 45.0);
		logoctx.lineTo(168.0, 44.0);
		logoctx.lineTo(165.0, 44.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(168.0, 45.0);
		logoctx.lineTo(168.0, 47.0);
		logoctx.lineTo(169.0, 47.0);
		logoctx.lineTo(169.0, 45.0);
		logoctx.lineTo(168.0, 45.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(164.0, 50.0);
		logoctx.lineTo(164.0, 51.0);
		logoctx.lineTo(169.0, 51.0);
		logoctx.lineTo(169.0, 50.0);
		logoctx.lineTo(164.0, 50.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(165.0, 48.0);
		logoctx.lineTo(165.0, 49.0);
		logoctx.lineTo(166.0, 49.0);
		logoctx.lineTo(166.0, 48.0);
		logoctx.lineTo(165.0, 48.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(170.0, 50.0);
		logoctx.lineTo(170.0, 51.0);
		logoctx.lineTo(171.0, 51.0);
		logoctx.lineTo(171.0, 50.0);
		logoctx.lineTo(170.0, 50.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(171.0, 44.0);
		logoctx.lineTo(171.0, 45.0);
		logoctx.lineTo(172.0, 45.0);
		logoctx.lineTo(172.0, 44.0);
		logoctx.lineTo(171.0, 44.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(172.0, 44.0);
		logoctx.lineTo(172.0, 51.0);
		logoctx.lineTo(173.0, 51.0);
		logoctx.lineTo(173.0, 44.0);
		logoctx.lineTo(172.0, 44.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(164.0, 49.0);
		logoctx.lineTo(164.0, 50.0);
		logoctx.lineTo(165.0, 50.0);
		logoctx.lineTo(165.0, 49.0);
		logoctx.lineTo(164.0, 49.0);
		logoctx.closePath();
		logoctx.fill();

		// websiteLogo/Path
		logoctx.beginPath();
		logoctx.moveTo(166.0, 47.0);
		logoctx.lineTo(166.0, 48.0);
		logoctx.lineTo(168.0, 48.0);
		logoctx.lineTo(168.0, 47.0);
		logoctx.lineTo(166.0, 47.0);
		logoctx.closePath();
		logoctx.fill();
		logoctx.restore();
	}

	function drawSplashScreen(){
		ssctx = document.getElementById("splashscreencanvas").getContext("2d");
		ssctx.clearRect(0,0,3000,3000);
				
		// splashScreen/BG
		ssctx.fillStyle = color_accent;
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
		ssctx.strokeStyle = "#FFFFFF";
		
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
		ssctx.fillStyle = color_accent_light;
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
	
	
	