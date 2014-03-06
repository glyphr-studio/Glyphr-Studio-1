/**
	MAIN FILE OF CONTROLORIZATION
**/

	
	function setup() {
		console.log("%c\n       GG              GG\n       G               G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG    G G G    G G    G G    G G     G\nG    G G G    G G    G G    G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G             STUDIO\n GGGG     GGGG  GG\n\n" + _UI.thisGlyphrStudioVersion + "\n\n", "color:rgb(0,170,225)");
		//debug("MAIN SETUP() - START");
		LoadPage = new LoadPage();
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
	}	