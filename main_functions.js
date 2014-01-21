/**
	MAIN FILE OF CONTROLORIZATION
**/

	
	function setup() {
		console.log("%c\n       GG              GG\n       G               G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG    G G G    G G    G G    G G     G\nG    G G G    G G    G G    G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G             STUDIO\n GGGG     GGGG  GG\n\n" + _UI.thisGlyphrStudioVersion + "\n\n", "color:rgb(40,170,255)");
		//debug("MAIN SETUP() - START");
		_GP.opentypeproperties = clone(_UI.defaultopentypeproperties);
		setOTprop("head", "created", ttxDateString());
		drawLogo();	
		navigate();
		//debug("MAIN SETUP() - END");
	}
		
//-------------------
// Navigation Stuff
//-------------------
	function navigate(){
		//debug("<b>>>NAVIGATE STARTED</b> - to " + _UI.navhere);


		mouseoutcec();
		document.getElementById("mainwrapper").style.overflowY = "scroll";
		document.getElementById("mainpane").style.marginLeft = "470px";
		document.getElementById("navprimarypane").style.display = "block";
		document.getElementById("navtargetpane").style.display = "block";
		document.getElementById("logocanvas").style.display = "block";
		
		if(_UI.navhere=="test drive") _UI.navprimaryhere = "npAttributes";
		
		updateNavPrimaryNavTarget();

		switch(_UI.navhere){
			case "firstrun":		updatefirstrun();		break;	
			case "font settings":	updatefontsettings();	break;
			case "project settings":	updateprojectsettings();	break;
			case "test drive":
				_UI.navprimaryhere = "npAttributes";
				updatetestdrive();		
				break;	
				
			case "open project":	updateopenproject();	break;
			case "export font":		updateexportfont();		break;
			case "help": 			updatehelp();			break;
			case "about":			updateabout();			break;
				
			case "character edit":
				_UI.navprimaryhere = "npChar";
				resetZoomPan();
				updatecharedit();	
				document.getElementById("mainwrapper").style.overflowY = "hidden";			
				_UI.selectedshape = -1;
				break;
			
			case "linked shapes":
				_UI.navprimaryhere = "npChar";
				resetZoomPan();
				updatelinkedshapes();
				document.getElementById("mainwrapper").style.overflowY = "hidden";
				break;
		}
		
		drawNavPrimaryOptions();
		
		document.body.focus();
		

		debug("\nNAVIGATE FINISHED - to " + _UI.navhere + "\n");

	}
	
	function updateNavPrimaryNavTarget(){

		document.getElementById("navprimarypane").innerHTML = generateNavPrimaryOptions();
		drawNavPrimaryOptions();
		
		var nt = document.getElementById("navtargetpane");
		nt.innerHTML = "";
		
		if((_UI.navhere!="character edit")&&(_UI.navhere!="linked shapes")&&(_UI.navhere!="test drive")) {
				_UI.navprimaryhere = "npNav";
				nt.innerHTML = generateNavTargetOptions();
				return;
		}
				
		
		switch(_UI.navprimaryhere){
			case "npNav":
				nt.innerHTML = generateNavTargetOptions();
				break;
				
			case "npChar":
				if(_UI.navhere == "character edit") {
					nt.innerHTML = "<h1>character edit</h1>"+updateselectchar();
					drawselectcharthumbs();
				}
				if(_UI.navhere == "linked shapes") {
					nt.innerHTML = "<h1>linked shapes</h1>"+linkedshapes_subnav();
					drawLinkedShapeLayerThumbs();
				}
				break;
			
			case "npLayers":
				updatelayers();
				break;
				
			case "npAttributes":
				if(_UI.navhere == "test drive"){
					nt.innerHTML = updatetestdriveoptions();
				} else {
					updateCharEditDetails();
				}
				break;
			
			case "npSave":
				triggerProjectFileDownload();
		
				break;
		}			
	}
	
	function drawNavPrimaryOptions(){
		var ngray = _UI.colors.g9;
		var nselect = _UI.colors.accent;
		var fill = ngray;
		
		_UI.navprimaryhere == "npNav" ? fill=nselect : fill=ngray;
		var pncanvas = document.getElementById("npNav");
		var pnctx = pncanvas.getContext("2d");
		pncanvas.width = 50;
		pncanvas.height = 50;
		draw_primaryNav_navigate(pnctx, fill);
		
		if(_UI.navhere=="character edit"){
			_UI.navprimaryhere == "npChar" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);
			
			_UI.navprimaryhere == "npLayers" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npLayers");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_layers(pnctx, fill);
			
			_UI.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}
		
		if(_UI.navhere=="linked shapes"){
			_UI.navprimaryhere == "npChar" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npChar");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_character(pnctx, fill);
			
			_UI.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
			pncanvas = document.getElementById("npAttributes");
			pnctx = pncanvas.getContext("2d");
			pncanvas.width = 50;
			pncanvas.height = 50;
			draw_primaryNav_attributes(pnctx, fill);
		}
		
		if(_UI.navhere=="test drive"){
			_UI.navprimaryhere == "npAttributes" ? fill=nselect : fill=ngray;
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

	function generateNavPrimaryOptions(){
		var navarr = [];
		navarr.push("npNav");
		
		if(_UI.navhere=="character edit"){
			navarr.push("npChar");
			navarr.push("npLayers");
			navarr.push("npAttributes");
		}
		
		if(_UI.navhere=="linked shapes"){
			navarr.push("npChar");
			navarr.push("npAttributes");
		}
		
		if(_UI.navhere=="test drive"){
			navarr.push("npAttributes");
		}
		
		var newsub = "";
		var bc = "primarynavbutton";
		
		for(var i=0; i<navarr.length; i++){
			newsub += ("<canvas class='"+bc+"' id='"+navarr[i]+"' onclick='_UI.navprimaryhere=\""+navarr[i]+"\";updateNavPrimaryNavTarget();'></canvas>");
		}
		
		newsub += ("<canvas class='"+bc+"' id='npSave' onclick='triggerProjectFileDownload();'></canvas>");
		
		return newsub;
	}
	
	function generateNavTargetOptions(){
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
				newsub += ("<input type='button' class='"+bc+"' value='"+navarr[i]+"' onclick='_UI.navhere=\""+navarr[i]+"\"; _UI.selectedshape=-1; navigate(true);'>");
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
// Debug
//-------------------
		
	function debug(message, force){
		if(_GP.projectsettings.debug | force){ console.log(message); }
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
			}
		}

		document.title = 'glyphr ❖';
		updateSaveIcon();
	}


//-------------------
// Undo Queue
//-------------------	
	function putundoq(calledfrom){
		var uqo = new Object;
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
		
		if(_UI.navhere == "character edit"){
			if(_UI.charundoq.length > 0){
				var uqo = _UI.charundoq.pop();
				_GP.fontchars = uqo.state;
				_UI.charcurrstate = clone(_GP.fontchars);
				redraw();
			}
		} else if (_UI.navhere == "linked shapes"){
			if(_UI.linkedshapeundoq.length > 0){
				var uqo = _UI.linkedshapeundoq.pop();
				_GP.linkedshapes = uqo.state;
				_UI.linkcurrstate = clone(_GP.linkedshapes);
				redraw();
			}
		}

		if(_UI.charundoq.length == 0 && _UI.linkedshapeundoq.length == 0){
			setProjectAsSaved();
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
		dec = isval(dec)? dec : 4;
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
			val.r = Math.round(((255-(val.r*1))*percent)+(val.r*1));
			val.g = Math.round(((255-(val.g*1))*percent)+(val.g*1));
			val.b = Math.round(((255-(val.b*1))*percent)+(val.b*1));
		} else {
			val.r = Math.round((val.r*1)-(val.r*percent));
			val.g = Math.round((val.g*1)-(val.g*percent));
			val.b = Math.round((val.b*1)-(val.b*percent));
		}

		return "rgb("+val.r+","+val.g+","+val.b+")";
	}	