/**
	MAIN FILE OF CONTROLORIZATION
**/

	
	function setup() {
		console.log("%c\n                GGG                                GGG\n                GG                                 GG\n                GG                                 GG\n   GGGGGGGGG    GG GGG          GG    GGGGGGGGG    GG GGGGGGGGG       GGGGGGGGG\n GG         GG  GG GG           GG  GG         GG  GGG         GG   GG         GG\nGG           GG GG GG           GG GG           GG GG           GG GG           GG\nGG           GG GG GG           GG GG           GG GG           GG GG           GG\nGG           GG GG GG           GG GG           GG GG           GG GG\nGGG         GGG GG GGG         GGG GGG         GGG GG           GG GG\n   GGGGGGGGG GG GG    GGGGGGGGGGGG GG GGGGGGGGG    GGG          GG GGG\nGGG          GG    GGG          GG GG\nGG           GG    GG           GG GG\n GGG       GGG      GGG       GGG  GG\n    GGGGGGG            GGGGGGG     GGG\n\n\n" + uistate.thisGlyphrStudioVersion + "\n\n", "color:rgb(40,170,255)");
		//debug("MAIN SETUP() - START");
		_G.opentypeproperties = clone(uistate.defaultopentypeproperties);
		setOTprop("head", "created", ttxDateString());
		drawLogo();	
		navigate();
		if(_G.projectsettings.stoppagenavigation){
			window.onbeforeunload = function() {
				return "\n\nUnless you specifically exported your data via the 'Save Project' page, all your progress will be lost.\n\n";
			}
		}
		//debug("MAIN SETUP() - END");
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
			case "font settings":	updatefontsettings();	break;
			case "project settings":	updateprojectsettings();	break;
			case "test drive":
				uistate.navprimaryhere = "npAttributes";
				updatetestdrive();		
				break;	
				
			case "open project":	updateopenproject();	break;
			case "export font":		updateexportfont();		break;
			case "help": 			updatehelp();			break;
			case "about":			updateabout();			break;
				
			case "character edit":
				uistate.navprimaryhere = "npChar";
				resetZoomPan();
				updatecharedit();	
				document.getElementById("mainwrapper").style.overflowY = "hidden";			
				uistate.selectedshape = -1;
				break;
			
			case "linked shapes":
				uistate.navprimaryhere = "npChar";
				resetZoomPan();
				updatelinkedshapes();
				document.getElementById("mainwrapper").style.overflowY = "hidden";
				break;
		}
		
		drawNavPrimaryOptions();
		
		document.body.focus();
		

		debug("\nNAVIGATE FINISHED - to " + uistate.navhere + "\n");

	}
	
	function updateNavPrimaryNavTarget(){

		document.getElementById("navprimarypane").innerHTML = generateNavPrimaryOptions();
		drawNavPrimaryOptions();
		
		var nt = document.getElementById("navtargetpane");
		nt.innerHTML = "";
		
		if((uistate.navhere!="character edit")&&(uistate.navhere!="linked shapes")&&(uistate.navhere!="test drive")) {
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
				if(uistate.navhere == "linked shapes") {
					nt.innerHTML = "<h1>linked shapes</h1>"+linkedshapes_subnav();
					drawLinkedShapeLayerThumbs();
				}
				break;
			
			case "npLayers":
				updatelayers();
				break;
				
			case "npAttributes":
				if(uistate.navhere == "test drive"){
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
		var ngray = uistate.colors.g9;
		var nselect = uistate.colors.accent;
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
		
		if(uistate.navhere=="linked shapes"){
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
		
		if(uistate.navhere=="linked shapes"){
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
		if(_G.projectsettings.debug | force){ console.log(message); }
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
			uistate.charcurrstate = clone(_G.fontchars);
		} else if (uistate.navhere == "linked shapes"){
			uqo.state = clone(uistate.linkcurrstate);
			uistate.linkundoq.push(uqo);
			uistate.linkcurrstate = clone(_G.linkedshapes);
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
				_G.fontchars = uqo.state;
				uistate.charcurrstate = clone(_G.fontchars);
				redraw();
			}
		} else if (uistate.navhere == "linked shapes"){
			if(uistate.linkundoq.length > 0){
				var uqo = uistate.linkundoq.pop();
				_G.linkedshapes = uqo.state;
				uistate.linkcurrstate = clone(_G.linkedshapes);
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