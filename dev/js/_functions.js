// start of file
/**
	Functions
	This is an uber-bucket of high level and
	generic functions that don't fit well in other
	files.
**/

	window.onload = (_UI && _UI.coremode)? coreMode_OnLoad : glyphrStudio_OnLoad;

	function glyphrStudio_OnLoad() {
		//console.clear();
		console.log('%c\n       GG              GG\n       G               G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG    G G G    G G    G G    G G     G\nG    G G G    G G    G G    G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G             STUDIO\n GGGG     GGGG  GG\n\nv' + _UI.thisGlyphrStudioVersionNum + '\n\n', 'color:rgb(0,170,225)');
		//debug('\n MAIN SETUP - START');
	

		// Initialize Stuff
		insertGlobalDOMElements();
		setupGhostCanvas();
		document.title = 'Glyphr Studio';


		// Navigate
		if(_UI.devmode){
			//debug('\t >>> DEV NAV - to ' + _UI.dev_current_page);

			if(_UI.dev_sample_project){
				//debug('\t >>> Using sample project');
				var sp = _UI.sampleproject[_UI.dev_sample_project];
				hydrateGlyphrProject(sp);
				_UI.dev_sample_project = false;
			} else {
				newGlyphrProject();
			}

			if(_UI.dev_current_page === 'import svg'){
				_UI.importsvg.scale = false;
				_UI.importsvg.move = false;
			}
			
			navigate({page:(_UI.dev_current_page || 'openproject'), panel:_UI.dev_current_panel});
		}


		// Google Analytics
		function setupga(i,s,o,g,r,a,m){
			i.GoogleAnalyticsObject = r;
			i[r] = i[r] || function(){
				(i[r].q = i[r].q || []).push(arguments);
			};
			i[r].l = 1*new Date();
			a = s.createElement(o);
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a,m);
		}

		if(_UI.devmode) {
			_UI.testOnLoad();

		} else if (!_UI.devmonde && _UI.telemetry) {
			try {
				setupga(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				ga('create', 'UA-71021902-1', 'auto');
				ga('send', 'pageview');
			} catch (err){
				console.warn('Google Analytics did not load.');
			}
		}

		navigate();
		
		//debug(' MAIN SETUP - END\n');
	}

	function insertGlobalDOMElements(){

		var dialogbox = '<div id="dialog_box">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="dialogRightContent"></td>' +
		'</tr></table></div>';

		var bigdialogbox = '<table id="big_dialog_box" cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="bigDialogLeftContent"></td>'+
		'<td style="height:9999px;"><div id="bigDialogScrollContent"></div></td>'+
		'</tr></table>';

		var toast = '<span id="toast"></span>';

		var save = '<div id="npSave"></div>';
		save += '<div id="saveFormatFlyout" style="display:none;">';
		save += '<div class="closeFormatFlyout" onclick="closeDialog();">&times</div>';
		save += '<button onclick="saveGlyphrProjectFile(); closeDialog();">' +
				makeIcon({'name':'button_npNav', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>Glyphr Studio Project File</span>' +
			'</button>';

		save += '<button onclick="closeDialog(); showToast(\'Exporting OTF font file...\'); setTimeout(ioOTF_exportOTFfont, 500);">' +
				makeIcon({'name':'nav_exportotf', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>OTF Font</span>' +
			'</button>';

		save += '<button onclick="closeDialog(); showToast(\'Exporting SVG font file...\'); setTimeout(ioSVG_exportSVGfont, 500);">' +
				makeIcon({'name':'nav_exportsvg', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>SVG Font</span>' +
			'</button>';
		save += '</div>';

		document.body.innerHTML = '<div id="primaryScreenLayout"></div>';
		document.body.innerHTML += '<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';
		document.body.innerHTML += save;
		document.body.innerHTML += toast;
		document.body.innerHTML += '<div id="dialog_bg" onclick="closeDialog();"></div>';
		document.body.innerHTML += dialogbox;
		document.body.innerHTML += bigdialogbox;
		window.onbeforeunload = ohNoes;
	}

	function ohNoes() {
		popIn();
		if(_GP && _GP.projectsettings.stoppagenavigation && _UI.stoppagenavigation && !_UI.devmode){
			return '\n\nOh Noes!\nUnless you specifically saved your Glyphr Project, all your progress will be lost.\n\n';
		} else {
			return;
		}
	}

//-------------------
// Common Panel Title
//-------------------
	function makePanelSuperTitle() {
		// debug('\n makePanelSuperTitle - START');
		var content = '';
		if(!_UI.popout) {
			var selwi = getSelectedWorkItem();
			var name;
			// debug('\t selwi = ' + selwi.objtype);

			content += '<h1 class="panelsupertitle">'+_UI.current_page.toUpperCase();
			if (_UI.current_panel === 'npChooser' ||
				_UI.current_panel === 'npGuides' ||
				_UI.current_panel === 'npHistory') return content + '</h1>';

			if(selwi){
				name = (selwi.getName() || selwi.glyphhtml || selwi.shape.name || '[no shape outline yet]');
				// debug('\t selwi name is ' + name);

				if(selwi.name) name = name.replace(/latin /i, '');
				content += makeSuperTitleSeperator();
				content += name;
			} else if (_UI.current_page === 'kerning'){
				// debug('\t selwi = false, on kerning');
				name = getSelectedKern();
				content += name? makeSuperTitleSeperator() + name.getName() : '';
			}
			content += '</h1>';
		}
		// debug(' makePanelSuperTitle - returning\n' + content + '\n');
		return content;
	}

	function makeSuperTitleSeperator() {
		var re = '<span class="supertitleseperator">';
		re += makeIcon({name:'button_more', color:_UI.colors.blue.l75, hovercolor:_UI.colors.blue.l75, size:10});
		re += makeIcon({name:'button_more', color:_UI.colors.blue.l75, hovercolor:_UI.colors.blue.l75, size:10});
		re += '</span>';
		return re;
	}



//-------------------
// Debug
//-------------------

	function debug(message, force){
		if(!_UI.devmode) return;

		if(_UI.debug || force){
			if(typeof message === 'string'){
				message = message.replace(/&lt;/gi, '<');
				message = message.replace(/&gt;/gi, '>');
		
				if(message === 'group') {
					console.group(); 
					return;
				} else if(message === 'groupCollapsed'){
					console.groupCollapsed();
					return;
				} else if(_UI.debugautogroup && message.indexOf('- START') > 0){
					console.group(message.substr(2).replace(' - START', '')); 
					return;
				} else if(message === 'groupEnd'|| (_UI.debugautogroup && message.indexOf('- END') > 0)) {
					console.groupEnd(message); 
					return;
				} else {
					console.log(message);
				}

			} else if (typeof message === 'object'){
				console.table(message);
			}
		}
	}

	function json(obj, raw) {
		obj = clone(obj);
		if(raw) return JSON.stringify(obj);
		else {
			var j = JSON.stringify(obj, undefined, '\t');
			if(j) return j.replace(/\n/g, '\r\n');
			else return '';
		}
	}


//--------------------------------------
// Dialog Box, Error Box, Notation
//--------------------------------------
	function closeDialog(){
		document.getElementById('dialog_bg').style.display='none';

		document.getElementById('dialog_box').style.display='none';
		document.getElementById('dialogRightContent').innerHTML = "<b>Error: unspecified dialog box content.</b>";

		document.getElementById('big_dialog_box').style.display='none';
		document.getElementById('bigDialogLeftContent').innerHTML = "<b>Error: unspecified dialog box content.</b>";

		document.getElementById('saveFormatFlyout').style.display='none';
		if(!_UI.popout && document.getElementById('npSave')) document.getElementById('npSave').style.backgroundColor = 'transparent';

		// document.body.focus();
	}

	function openDialog(content){
		closeDialog();
		document.body.focus();
		var dc = document.getElementById('dialogRightContent');
		dc.innerHTML = content;

		if(dc.style.height > 800) dc.style.height = 800;
		else dc.style.width = 'auto';

		document.getElementById('dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}

	function openBigDialog(content){
		closeDialog();
		document.body.focus();
		document.getElementById('bigDialogLeftContent').innerHTML = content;
		document.getElementById('bigDialogScrollContent').innerHTML = make_GlyphChooser(_UI.glyphchooser.dialog);

		document.getElementById('big_dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}

	function isBigDialogOpen() {
		return document.getElementById('big_dialog_box').style.display === 'block';
	}

	function openNotation(content, x, y){
		getEditDocument().body.focus();
		var n = getEditDocument().getElementById('notation');
		n.innerHTML = content;
		n.style.top = (round(y)+'px');
		n.style.left = (round(x+50)+'px');
		n.style.display='block';
	}

	function closeNotation(){
		getEditDocument().getElementById('notation').style.display='none';
		getEditDocument().getElementById('notation').innerHTML = "&#x20E2;";
		getEditDocument().body.focus();
	}

	function toggleDialog_ExportOptions() {
		var sff = document.getElementById('saveFormatFlyout');
		var nps = document.getElementById('npSave');

		if(sff.style.display === 'block'){
			closeDialog();
		} else {
			nps.style.backgroundColor = _UI.colors.blue.l45;
			sff.style.display = 'block';
		}
	}

	function makeErrorMessageBox() {
		var con ='<div id="errormessagebox" style="display:none;">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="errormessageleftbar">'+
		'<button class="errormessageclosebutton" onclick="closeErrorMessageBox();">&times;</button></td>' +
		'<td id="errormessagecontent"></td>' +
		'</tr></table></div>';

		return con;
	}

	function showErrorMessageBox(msg) {
		var msgcon = document.getElementById('errormessagecontent');
		var msgbox = document.getElementById('errormessagebox');
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
		console.warn(msg);
	}

	function closeErrorMessageBox(){
		document.getElementById('errormessagecontent').innerHTML = "";
		document.getElementById('errormessagebox').style.display = 'none';
	}

	function showToast(msg, dur) {
		// debug('\n showToast - START');
		var step = -1;
		var stepmax = 20;
		var timestep = 10;
		var divisor = 5;
		var msgdiv = getEditDocument().getElementById('toast');
		var durration = dur || 3000;
		msgdiv.innerHTML = msg || 'Howdy!';

		if(_UI.toasttimeout){
			msgdiv.innerHTML = msg;
			appearFinish();
			return;
		}

		var currtop = -50;
		var finaltop = 15;
		var curropacity = 0;
		var finalopacity = 1;

		function appearFinish() {
			// debug('\t appearFinish');
			currtop = finaltop;
			curropacity = finalopacity;
			step = stepmax;

			msgdiv.style.marginTop = (finaltop + 'px');
			msgdiv.style.opacity = finalopacity;
			
			setToastTimeout(disappearStep, durration);
		}

		function appearStep() {
			// debug('\t appearStep ' + step);
			
			if(step < 0){
				msgdiv.style.display = 'block';
				msgdiv.style.marginTop = '-50px;';
				msgdiv.style.opacity = '0.0';
				msgdiv.style.borderBottomWidth = '0px';

				step++;

				setToastTimeout(appearStep, timestep);

			} else if (step < stepmax){
				step++;
				currtop = currtop + ((finaltop - currtop) / divisor);
				curropacity = curropacity + ((finalopacity - curropacity) / divisor);

				msgdiv.style.marginTop = (currtop + 'px');
				msgdiv.style.opacity = curropacity;

				setToastTimeout(appearStep, timestep);

			} else {
				appearFinish();
			}
		}

		function disappearStep() {
			// debug('\t appearStep ' + step);
			if(step < 0){
				msgdiv.style.display = 'none';
				msgdiv.style.marginTop = '-50px;';
				msgdiv.style.opacity = '0.0';
				msgdiv.innerHTML = '0_o';
				if(_UI.toasttimeout) {
					clearTimeout(_UI.toasttimeout);
					_UI.toasttimeout = false;
				}

			} else {
				step--;
				currtop = currtop - (currtop / divisor);
				curropacity = curropacity - (curropacity / divisor);

				msgdiv.style.marginTop = (currtop + 'px');
				msgdiv.style.opacity = curropacity;

				setToastTimeout(disappearStep, timestep);
			}
		}

		setToastTimeout(appearStep, 1);
		// debug(' showToast - END\n');
	}

	function setToastTimeout(fn, dur) {
		if(_UI.toasttimeout) clearTimeout(_UI.toasttimeout);
		_UI.toasttimeout = setTimeout(fn, dur);
	}

//-------------------
// Saved Sate
//-------------------
	function setProjectAsSaved(){
		_UI.projectsaved = true;

		if(_UI.popout) {
			document.title = 'Glyphr Studio - Tools';
			_UI.popout.document.title = 'Glyphr Studio - Canvas';
		} else {
			document.title = 'Glyphr Studio';
		}

		updateSaveIcon();
	}

	function setProjectAsUnsaved(){
		_UI.projectsaved = false;

		if(_UI.popout) {
			document.title = ' ❖ Glyphr Studio - Tools';
			_UI.popout.document.title = ' ❖ Glyphr Studio - Canvas';
		} else {
			document.title = ' ❖ Glyphr Studio';
		}

		updateSaveIcon();
	}

	function updateSaveIcon(){
		if(_UI.current_panel === 'npNav') return;

		var savecolor = _UI.colors.gray.l90;
		if(!_UI.projectsaved) savecolor = 'white';

		document.getElementById('npSave').innerHTML = '<table class="saveButtonTable">' +
		'<tr><td style="border-right:1px solid rgb(204, 209, 214);">' +
			'<button class="primarynavbutton" style="height:32px; width:38px; padding:4px 0px 0px 7px;" title="Save Glyphr Project File" onclick="saveGlyphrProjectFile();">' +
				makeIcon({'name': 'button_npSave', 'size':24, 'color':savecolor, 'hovercolor':'white'}) +
			'</button></td><td>' +
			'<button class="primarynavbutton" style="height:36px; width:21px; text-align:left; padding:0px 0px 0px 4px;" title="Save File Format Options" onclick="toggleDialog_ExportOptions();">' +
				makeIcon({'name': 'button_more', 'height':10, 'width':10, 'size':10, 'color':savecolor, 'hovercolor':'white'}) +
			'</button></td></tr>'+
		'</table>';
	}


//-------------------
// File Savr
//-------------------

function saveFile(fname, buffer, ftype) {
	ftype = ftype || 'text/plain;charset=utf-8';
	var fblob = new Blob([buffer], {'type':ftype, 'endings':'native'});

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

		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, false);
		link.dispatchEvent(event);
		return;
	}

	console.error('File could not be saved: ' + fname);
}


//-------------------
// Common Functions
//-------------------
	// returns a full new copy of any object
	// 'parentpath' is a PathPoint property that is a pointer to it's parent Path
	// causes infinite loops when cloning objects.  Kind of a hack.
	function clone(cobj){
		var newObj = (cobj instanceof Array) ? [] : {};
		for (var i in cobj) {
			if (cobj[i] && typeof cobj[i] === 'object' && i !== 'parentpath' && i !== 'cache') {
				newObj[i] = clone(cobj[i]);
			} else newObj[i] = cobj[i];
		}
		return newObj;
	}

	// rounds a number to include a .5 so it draws nicely on canvas
	// true = +0.5, false = -0.5
	Number.prototype.makeCrisp = function(dir){
		var mul = dir? 1 : -1;
		return round(this) + (0.5 * mul);
	};

	// better rounding than Math.round
	function round(num, dec){
		if(!num) return 0;
		dec = dec || 0;
		return Number(Math.round(num+'e'+dec)+'e-'+dec) || 0;
	}

	// floating point numbers make me mad
	function numSan(num) {
		num = parseFloat(num);
		var strnum = ''+num;

		if(strnum.indexOf('0000') > -1 || strnum.indexOf('9999') > -1){
			num = round(num, 6);
		}

		if(num < 0.0000 && num > 0) num = 0;

		return num;
	}

	// removes illegal file name chars
	function strSan(val){
		return val.replace(/[<>'"\\]/g,"");
	}

	// removes begining and trailing whitespace, and any breaking or tab chars
	function trim(text) {
		try {
			text = text.replace(/^\s+|\s+$/g, '');
			return text.replace(/(\r\n|\n|\r|\t)/gm, '');
		} catch(e) { return ''; }
	}

	// returns true for 0 and false
	function isval(val){
		if(val === 0) return true;
		else if (val === false) return true;
		else if(val === null || val === undefined) return false;
		else if ( typeof val === 'object' && Object.keys(val).length === 0 ) return false;
		else return !!val;

		//return ((typeof val !== "undefined") && (val !== null));
	}

	function getOverallMaxes(maxarr) {
		// debug('\n getOverallMaxes - START');
		// debug('\t start');
		// debug(maxarr);

		var re = clone(_UI.mins);
		var tm;

		for(var m=0; m<maxarr.length; m++){
			// debug('\t pass ' + m);
			tm = maxarr[m];
			// debug([tm]);

			// sanitize
			if(!isval(tm.xmax)) tm.xmax = clone(_UI.mins.xmax);
			if(!isval(tm.xmin)) tm.xmin = clone(_UI.mins.xmin);
			if(!isval(tm.ymax)) tm.ymax = clone(_UI.mins.ymax);
			if(!isval(tm.ymin)) tm.ymin = clone(_UI.mins.ymin);
			// debug([tm]);

			// find 
			re.xmax = Math.max(re.xmax, tm.xmax);
			re.xmin = Math.min(re.xmin, tm.xmin);
			re.ymax = Math.max(re.ymax, tm.ymax);
			re.ymin = Math.min(re.ymin, tm.ymin);
			// debug([re]);
		}

		// debug(' getOverallMaxes - END\n');

		return re;
	}


//--------------------------
// Angle and Rotation Stuff
//--------------------------

	/**
		Use JavaScript angle system by default:
		Radians, top is positive bottom is negative
		3 o'clock is zero, 9 o'clock is pi

		Glyphr Studio angle system:
		360 Degrees, 12 o'clock is zero, clockwise = positve
	**/

	function calculateAngle(h, p){
		p = p || {x:0, y:0};
		result = Math.atan2(h.y - p.y, h.x - p.x);

		if(isNaN(result)){
			console.warn('calculateAngle returned NaN\n' + json(h) + '\n' + json(p));
			result = 0;
		}

		return result;
	}

	function calculateLength(h, p){
		var adj = p.x - h.x;
		var opp = p.y - h.y;
		var result = Math.sqrt( (adj*adj) + (opp*opp) );
		return result;
	}

	function rotate(coord, angle, about) {
		// debug('\n rotate - START');
		// debug('\t coord ' + json(coord, true));
		// debug('\t angle ' + angle);
		// debug('\t about ' + json(about, true));

		if(!angle || !coord) return;
		about = about || {x:0, y:0};

		coord.x -= about.x;
		coord.y -= about.y;

		var newx = (coord.x * Math.cos(angle)) - (coord.y * Math.sin(angle));
		var newy = (coord.x * Math.sin(angle)) + (coord.y * Math.cos(angle));

		coord.x = newx + about.x;
		coord.y = newy + about.y;

		// debug('\t new coord x/y: ' + coord.x + '/' + coord.y);
		// debug(' rotate - END\n');
	}

	//convert between degrees and radians
	function rad(deg) {	return (deg * Math.PI / 180) % Math.PI; }
	function deg(rad) {	return (rad * 180 / Math.PI) % 360; }

	// Shows the Glyphr Studio angle as opposed to the JavaScript angle
	function calculateNiceAngle(angle) {
		angle = deg(angle);
		angle = 360 - angle;
		angle -= 270;
		angle = angle % 360;
		if(angle < 0) angle += 360;

		return angle;
	}

	function niceAngleToAngle(angle) {
		angle += 90;
		angle = angle % 360;
		if(angle < 180) angle = 360 - angle;
		else angle *=-1;

		angle = rad(angle);

		return angle;
	}


//-------------------
// Object ID Stuff
//-------------------
	// Returns the first ID from an object
	function getFirstID(obj) {
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				return key;
			}
		}

		return false;
	}

	// Generate a new ID for an object
	function generateNewID(obj, base) {
		var number = 1;
		base = base || 'id';
		var id = ('' + base + number);
		while (obj.hasOwnProperty(id)) id = ('' + base + (++number));

		return id;
	}

	function getMyID(obj) {
		for(var g in _GP.glyphs){if(_GP.glyphs.hasOwnProperty(g)){
			if(obj === _GP.glyphs[g]) return g;
		}}

		for(var c in _GP.components){if(_GP.components.hasOwnProperty(c)){
			if(obj === _GP.components[c]) return c;
		}}

		for(var l in _GP.ligatures){if(_GP.ligatures.hasOwnProperty(l)){
			if(obj === _GP.ligatures[l]) return l;
		}}

		return false;
	}

	// returns the length of an associative array
	function getLength(obj){
		var len = 0;
		for(var key in obj){ if( obj.hasOwnProperty(key)) len++; }
		return len;
	}


//-------------------
// BUG EMAIL
//-------------------

	function genEmailContent(){
		var con = 'Have a feature idea or ran into an issue%3F We%27d be happy to help!';
		con += '%0A%0A%0A%0A___________________________________________%0A';
		con += 'version %09Glyphr Studio ' + _UI.thisGlyphrStudioVersionNum + '%0A';
		//con += 'appCodeName %09' + navigator.appCodeName + '%0A';
		con += 'app name %09' + navigator.appName + '%0A';
		//con += 'appVersion %09' + navigator.appVersion + '%0A';
		con += 'language %09' + navigator.language + '%0A';
		con += 'platform %09' + navigator.platform + '%0A';
		// con += 'systemLanguage %09' + navigator.systemLanguage + '%0A';
		// con += 'userLanguage %09' + navigator.userLanguage + '%0A';
		con += 'user agent %09' + encodeURIComponent(navigator.userAgent) + '%0A';

		//debug(con);

		return con;
	}


//-------------------
// COLORS
//-------------------

	function shiftColor(c, percent, lighter){
		percent = Math.max(0,Math.min(percent,1));
		var val = {};

		if(c.charAt(0)==="#"){
			c = c.substring(1,7);
			val.r = parseInt(c.substring(0,2),16);
			val.g = parseInt(c.substring(2,4),16);
			val.b = parseInt(c.substring(4,6),16);
		} else if (c.substring(0,4) === 'rgb('){
			c = c.split('(')[1].split(')')[0].split(',');
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

		return 'rgb('+val.r+','+val.g+','+val.b+')';
	}

// end of file
