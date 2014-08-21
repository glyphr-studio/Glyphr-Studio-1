// "use strict";

//	-------------------------------
//	MAIN FILE OF CONTROLORIZATION
//	-------------------------------

	function setup() {
		console.clear();
		console.log("%c\n       GG              GG\n       G               G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG    G G G    G G    G G    G G     G\nG    G G G    G G    G G    G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G             STUDIO\n GGGG     GGGG  GG\n\n" + _UI.thisGlyphrStudioVersion + "\n\n", "color:rgb(0,170,225)");
		//debug("MAIN SETUP() - START");
		insertGlobalDOMElements();

		if(_UI.devnav){
			//debug(">>> DEV NAV - to " + _UI.devnav);
			if(!_UI.loadsampleproject) newGlyphrProject();
			_UI.navhere = _UI.devnav;
		}

		navigate();
		//debug("MAIN SETUP() - END");
	}



	function insertGlobalDOMElements(){

		var dialogbox = '<div id="dialog_box">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="dialogRightContent"></td>' +
		'</tr></table></div>' +
		'<div id="dialog_bg" onclick="closeDialog();"></div>';


		var ihgc = '<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';

		document.body.innerHTML = '<div id="primaryScreenLayout"></div>';
		document.body.innerHTML += dialogbox;
		document.body.innerHTML += ihgc;


		window.onbeforeunload = function() {
			if(_GP.projectsettings.stoppagenavigation && !_UI.debug){
				return "\n\nOh Noes!\nUnless you specifically saved your Glyphr Project, all your progress will be lost.\n\n";
			} else {
				return;
			}
		};
	}



//-------------------
// Debug
//-------------------

	function debug(message, force){
		if(_UI.debug || force){
			if(typeof message === 'string'){
				message = message.replace(/&lt;/gi, '<');
				message = message.replace(/&gt;/gi, '>');
			}
			console.log(message); 
		}
	}

	/*
	function stack(a){
		if(_GP.projectsettings.debug){
			console.log(Date.now()+"\t%c::function: " + a.callee.name + "("+a.length+")", "color:rgb(0,100,0)");
		}
	}
	*/

	function json(obj, raw) {
		if(raw) return JSON.stringify(obj);
		else return JSON.stringify(obj, undefined, '\t').replace(/\n/g, '\r\n');
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
		var dc = document.getElementById('dialogRightContent');
		dc.innerHTML = content;
		if(dc.style.height > 800) dc.style.height = 800;
		document.getElementById('dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}


//-------------------
// Project Saved Sate
//-------------------
	function setProjectAsSaved(){
		_UI.projectsaved = true;

		if(_UI.popout) {
			document.title = "Glyphr Studio - Tools";
			_UI.popout.document.title = "Glyphr Studio - Canvas";
		} else {
			document.title = 'Glyphr Studio';
		}

		updateSaveIcon();
	}

	function setProjectAsUnsaved(){
		_UI.projectsaved = false;

		if(_UI.popout) {
			document.title = " ❖ Glyphr Studio - Tools";
			_UI.popout.document.title = " ❖ Glyphr Studio - Canvas";
		} else {
			document.title = ' ❖ Glyphr Studio';
		}

		updateSaveIcon();
	}


//-------------------
// File Savr
//-------------------

function saveTextFile(fname, fblob) {

	try {
		// IE
		window.navigator.msSaveBlob(fblob, fname);
		return;
	} catch (err) {
		// Others
		var link = document.createElement('a');
		window.URL = window.URL || window.webkitURL;
		link.href = window.URL.createObjectURL(fblob);
		//link.onclick = ("alert("+window.URL.createObjectURL(fblob)+");");
		link.download = fname;

		var event = document.createEvent("MouseEvents");
		event.initEvent("click", true, false);
		link.dispatchEvent(event);
		return;
	}

	console.error("File could not be saved: " + fname);
}



//-------------------
// Undo Queue
//-------------------
	function putundoq(calledfrom){
		var uqo = {
			"char": getSelectedCharID(),
			"name": calledfrom,
			"date": new Date().getTime()
		};

		if (_UI.navhere == "linked shapes"){
			uqo.state = clone(_UI.linkcurrstate);
			_UI.linkedshapeundoq.push(uqo);
			_UI.linkcurrstate = clone(_GP.linkedshapes);
		} else {
			uqo.state = clone(_UI.charcurrstate);
			_UI.charundoq.push(uqo);
			_UI.charcurrstate = clone(_GP.fontchars);
		}

		setProjectAsUnsaved();
	}

	function pullundoq(){
		//debug("PULLUNDOQ - Undo Pressed, undoq: " + undoq);
		var uqo;

		if (_UI.navhere == "linked shapes"){
			if(_UI.linkedshapeundoq.length > 0){
				uqo = _UI.linkedshapeundoq.pop();
				_GP.linkedshapes = uqo.state;
				_UI.linkcurrstate = clone(_GP.linkedshapes);
				redraw("pullundoq");
			}
		} else {
			if(_UI.charundoq.length > 0){
				uqo = _UI.charundoq.pop();
				_GP.fontchars = uqo.state;
				_UI.charcurrstate = clone(_GP.fontchars);
				if(_UI.navhere === "character edit") redraw("pullundoq");
				else if (_UI.navhere === "import svg") update_NavPanels();
			}

			if(_UI.charundoq.length === 0 && _UI.linkedshapeundoq.length === 0){
				setProjectAsSaved();
			}
		}
	}


//-------------------
// Common Functions
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

	// flip boolean var
	function toggle(val) {
		//debug("TOGGLE - typeof val = " + typeof(val));
		if(typeof(val) === 'string') eval(val + " = !" + val);
		else val = !val;
	}

	// better rounding than Math.round
	function round(num, dec){
		if(!num) return 0;
		dec = isval(dec)? dec : 0;
		return Number(Math.round(num+'e'+dec)+'e-'+dec);
	}

	// returns the length of an associative array
	function aalength(aa){
		var len = 0;
		for(var key in aa){	if( aa.hasOwnProperty(key)) len++; }
		return len;
	}

	// removes illegal file name chars
	function strSan(val){
		return val.replace(/[<>'"\\]/g,"");
	}

	// returns true for 0 and false
	function isval(val){
		if(val === 0) return true;
		else if (val === false) return true;
		else return !!val;

		//return ((typeof val !== "undefined") && (val !== null));
	}




//-------------------
// Generic Spinner Control
//-------------------
	function spinner(){
		var content ="";
		content += "<button class='spinnerbutton' onclick='inc(this);'>&#9652;</button>";  //&and;
		content += "<button class='spinnerbutton' onclick='dec(this);'>&#9662;</button>";  //&or;
		return content;
	}

	function inc(obj){
		var valbox = obj.parentNode.childNodes[0];
		valbox.value = valbox.value*1;
		if(valbox){
			if(!valbox.value*1) valbox.value = 0;
			valbox.value = ((valbox.value*1) + _GP.projectsettings.spinnervaluechange);
			valbox.onchange();
			//putundoq("Up Spinner");
		}
	}

	function dec(obj){
		var valbox = obj.parentNode.childNodes[0];
		valbox.value = valbox.value*1;
		if(valbox){
			if(!valbox.value*1) valbox.value = 0;
			valbox.value = ((valbox.value*1) - _GP.projectsettings.spinnervaluechange);
			valbox.onchange();
			//putundoq("Down Spinner");
		}
	}


//-------------------
// BUG EMAIL
//-------------------
	function sendBugEmail(){
		var dcon = "<h1>Report an issue</h1>";
		dcon += "Hey, sorry you ran into some wonky stuff!<br>Letting us know about your problem will help us fix it for everybody.<br>";
		dcon += "To send us an email, click the link below.<br><br>Thanks!<br><br><br>";
		dcon += "<a href='mailto:mail@glyphrstudio.com&subject=Issue%20Report&body="+genEmailContent()+"' style='padding:10px;' onclick='closeDialog();'>Send an issue email to the Glyphr team</a><br>";
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
	}