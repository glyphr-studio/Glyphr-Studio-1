// start of file
/**
	Functions
	This is an uber-bucket of high level and
	generic functions that don't fit well in other
	files.
**/

window.onload = _UI && _UI.coremode ? coreMode_OnLoad : glyphrStudio_OnLoad;

function glyphrStudio_OnLoad() {
	//console.clear();
	console.log(
		'%c\n       GG              GG\n       G               G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG    G G G    G G    G G    G G     G\nG    G G G    G G    G G    G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G             STUDIO\n GGGG     GGGG  GG\n\nv' +
			_UI.thisGlyphrStudioVersionNum +
			'\n\n',
		'color:rgb(0,170,225)'
	);
	// debug('\n MAIN SETUP - START');

	// Initialize Stuff
	insertGlobalDOMElements();
	setupGhostCanvas();
	document.title = 'Glyphr Studio';

	// Navigate
	if (_UI.devmode) {
		//debug('\t >>> DEV NAV - to ' + _UI.dev_current_page);
		document.title = '░▒▓█ GSDEVMODE █▓▒░';

		if (_UI.dev_sample_project) {
			//debug('\t >>> Using sample project');
			_UI.droppedFileContent = JSON.stringify(
				_UI.sampleproject[_UI.dev_sample_project]
			);
			importGlyphrProjectFromText();
			_UI.dev_sample_project = false;
		} else {
			newGlyphrProject();
		}

		if (_UI.dev_current_page === 'import svg') {
			_UI.importsvg.scale = false;
			_UI.importsvg.move = false;
		}

		navigate({
			page: _UI.dev_current_page || 'openproject',
			panel: _UI.dev_current_panel,
		});
	}

	// Google Analytics
	function addTelemetry() {
		let gScript = document.createElement('script');
		gScript.setAttribute(
			'src',
			'https://www.googletagmanager.com/gtag/js?id=G-L8S3D8WCC9'
		);
		gScript.setAttribute('async', '');
		document.head.appendChild(gScript);

		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-L8S3D8WCC9');
	}

	if (!_UI.devmode && _UI.telemetry) {
		try {
			addTelemetry();
		} catch (err) {
			console.warn('Google Analytics did not load.');
		}
	}

	navigate();

	if (_UI.devmode) _UI.testOnLoad();

	//debug(' MAIN SETUP - END\n');
}

function insertGlobalDOMElements() {
	var dialogbox =
		'<div id="dialog_box">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="dialogRightContent"></td>' +
		'</tr></table></div>';

	var bigdialogbox =
		'<table id="big_dialog_box" cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="bigDialogLeftContent"></td>' +
		'<td style="height:9999px;"><div id="bigDialogScrollContent"></div></td>' +
		'</tr></table>';

	var toast = '<span id="toast"></span>';

	var save = '<div id="npSave"></div>';
	save += '<div id="saveFormatFlyout" style="display:none;">';
	save +=
		'<div class="closeFormatFlyout" onclick="closeDialog();">&times</div>';
	save +=
		'<button onclick="closeDialog(); showToast(\'Saving Glyphr Studio Project file...\', 9999); setTimeout(saveGlyphrProjectFile, 500);">' +
		makeIcon({
			name: 'button_npNav',
			width: 32,
			height: 32,
			size: 50,
			color: _UI.colors.blue.l95,
			hovercolor: false,
		}) +
		'<span>Glyphr Studio Project File</span>' +
		'</button>';

	save +=
		'<button onclick="closeDialog(); showToast(\'Exporting OTF font file...\', 9999); setTimeout(ioOTF_exportOTFfont, 500);">' +
		makeIcon({
			name: 'nav_exportotf',
			width: 32,
			height: 32,
			size: 50,
			color: _UI.colors.blue.l95,
			hovercolor: false,
		}) +
		'<span>OTF Font</span>' +
		'</button>';

	save +=
		'<button onclick="closeDialog(); showToast(\'Exporting SVG font file...\', 9999); setTimeout(ioSVG_exportSVGfont, 500);">' +
		makeIcon({
			name: 'nav_exportsvg',
			width: 32,
			height: 32,
			size: 50,
			color: _UI.colors.blue.l95,
			hovercolor: false,
		}) +
		'<span>SVG Font</span>' +
		'</button>';
	save += '</div>';

	document.body.innerHTML = '<div id="primaryScreenLayout"></div>';
	document.body.innerHTML +=
		'<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';
	document.body.innerHTML += save;
	document.body.innerHTML += toast;
	document.body.innerHTML +=
		'<div id="dialog_bg" onclick="closeDialog();"></div>';
	document.body.innerHTML += dialogbox;
	document.body.innerHTML += bigdialogbox;
	window.onbeforeunload = ohNoes;
}

function ohNoes() {
	popIn();
	if (
		_GP &&
		_GP.projectsettings.stoppagenavigation &&
		_UI.stoppagenavigation &&
		!_UI.devmode
	) {
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
	if (!_UI.popout) {
		var selwi = getSelectedWorkItem();
		var name;
		// debug('\t selwi = ' + selwi.objtype);

		content += '<h1 class="panelsupertitle">' + _UI.current_page.toUpperCase();
		if (
			_UI.current_panel === 'npChooser' ||
			_UI.current_panel === 'npGuides' ||
			_UI.current_panel === 'npHistory'
		)
			return content + '</h1>';

		if (selwi) {
			name =
				selwi.getName() ||
				selwi.glyphhtml ||
				selwi.shape.name ||
				'[no shape outline yet]';
			// debug('\t selwi name is ' + name);
			if (selwi.name) name = name.replace(/latin /i, '');
			content += makeSuperTitleSeperator();
			if(!selwi.glyphhtml) name = escapeXMLValues(name);
			content += '<span class="name" title="' + name + '">' + name + '</span>';
		} else if (_UI.current_page === 'kerning') {
			// debug('\t selwi = false, on kerning');
			name = getSelectedKern();
			if (name) {
				content += makeSuperTitleSeperator();
				name = escapeXMLValues(name.getName());
				content += '<span class="name" title="' + name + '">' + name + '</span>';
			}
		}
		content += '</h1>';
	}
	// debug(' makePanelSuperTitle - returning\n' + content + '\n');
	return content;
}

function makeSuperTitleSeperator() {
	var re = '<span class="supertitleseperator">';
	re += makeIcon({
		name: 'button_more',
		color: _UI.colors.blue.l75,
		hovercolor: _UI.colors.blue.l75,
		size: 10,
	});
	re += makeIcon({
		name: 'button_more',
		color: _UI.colors.blue.l75,
		hovercolor: _UI.colors.blue.l75,
		size: 10,
	});
	re += '</span>';
	return re;
}

//-------------------
// Debug
//-------------------
function debug(message, force) {
	if (!_UI.devmode) return;

	if (_UI.debug || force) {
		if (typeof message === 'string') {
			message = message.replace(/&lt;/gi, '<');
			message = message.replace(/&gt;/gi, '>');

			if (message === 'group') {
				console.group();
				return;
			} else if (message === 'groupCollapsed') {
				console.groupCollapsed();
				return;
			} else if (_UI.debugautogroup && message.indexOf('- START') > 0) {
				console.group(message.substr(2).replace(' - START', ''));
				return;
			} else if (
				message === 'groupEnd' ||
				(_UI.debugautogroup && message.indexOf('- END') > 0)
			) {
				console.groupEnd(message);
				return;
			} else {
				console.log(message);
			}
		} else if (typeof message === 'object') {
			if (_UI.debugtableobjects) console.table(message);
			else console.log(message);
		}
	}
}

function json(obj, raw) {
	obj = clone(obj, 'json');
	if (raw) return JSON.stringify(obj);
	else {
		var j = JSON.stringify(obj, undefined, '\t');
		if (j) return j.replace(/\n/g, '\r\n');
		else return '';
	}
}

//--------------------------------------
// Dialog Box, Error Box, Notation
//--------------------------------------
function closeDialog() {
	if (!_UI.popout && document.getElementById('npSave'))
		document.getElementById('npSave').style.backgroundColor = 'transparent';
	document.getElementById('dialog_bg').style.display = 'none';
	document.getElementById('big_dialog_box').style.display = 'none';
	document.getElementById('dialog_box').style.display = 'none';
	document.getElementById('saveFormatFlyout').style.display = 'none';

	document.getElementById('dialogRightContent').innerHTML =
		'<b>Error: unspecified dialog box content.</b>';
	document.getElementById('bigDialogLeftContent').innerHTML =
		'<b>Error: unspecified dialog box content.</b>';

	// document.body.focus();
}

function openDialog(content) {
	closeDialog();
	document.body.focus();
	var dc = document.getElementById('dialogRightContent');
	dc.innerHTML = content;

	if (dc.style.height > 800) dc.style.height = 800;
	else dc.style.width = 'auto';

	document.getElementById('dialog_box').style.display = 'block';
	document.getElementById('dialog_bg').style.display = 'block';
}

function openBigDialog(content, chooserContent) {
	closeDialog();
	document.body.focus();

	document.getElementById('bigDialogLeftContent').innerHTML = content;
	chooserContent = chooserContent || make_GlyphChooser(_UI.glyphchooser.dialog);
	document.getElementById('bigDialogScrollContent').innerHTML = chooserContent;

	document.getElementById('big_dialog_box').style.display = 'block';
	document.getElementById('dialog_bg').style.display = 'block';
}

function isBigDialogOpen() {
	return document.getElementById('big_dialog_box').style.display === 'block';
}

function openNotation(content, x, y) {
	getEditDocument().body.focus();
	var n = getEditDocument().getElementById('notation');
	n.innerHTML = content;
	n.style.top = round(y) + 'px';
	n.style.left = round(x + 50) + 'px';
	n.style.display = 'block';
}

function closeNotation() {
	getEditDocument().getElementById('notation').style.display = 'none';
	getEditDocument().getElementById('notation').innerHTML = '&#x20E2;';
	getEditDocument().body.focus();
}

function toggleDialog_ExportOptions() {
	var sff = document.getElementById('saveFormatFlyout');
	var nps = document.getElementById('npSave');

	if (sff.style.display === 'block') {
		closeDialog();
	} else {
		nps.style.backgroundColor = _UI.colors.blue.l45;
		sff.style.display = 'block';
	}
}

function makeErrorMessageBox() {
	var con =
		'<div id="errormessagebox" style="display:none;">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="errormessageleftbar">' +
		'<button class="errormessageclosebutton" onclick="closeErrorMessageBox();">&times;</button></td>' +
		'<td id="errormessagecontent"></td>' +
		'</tr></table></div>';

	return con;
}

function showErrorMessageBox(msg) {
	console.warn(msg);
	var msgcon = document.getElementById('errormessagecontent');
	var msgbox = document.getElementById('errormessagebox');
	// debug(msgbox);

	if (!!msgbox) {
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
	} else {
		showToast(msg);
	}
}

function closeErrorMessageBox() {
	document.getElementById('errormessagecontent').innerHTML = '';
	document.getElementById('errormessagebox').style.display = 'none';
}

function showToast(msg, dur, fn) {
	// debug('\n showToast - START');
	// debug(`\t ${dur} :: ${msg}`);

	var toast = _UI.toast;
	var msgdiv = getEditDocument().getElementById('toast');
	var duration = dur || 3000;
	msgdiv.innerHTML = msg || 'Howdy!';

	// Animation stuff
	var stepmax = 20;
	var timestep = 10;
	var divisor = 5;

	// CSS stuff
	var currtop = -50;
	var finaltop = 15;
	var curropacity = 0;
	var finalopacity = 1;

	if (fn && typeof fn === 'function') {
		// debug('\t CALLING FUNCTION NOW');
		setTimeout(fn, 100);
	}

	if (toast.timeoutID) {
		// A new toast takes over if an old toast exists
		msgdiv.innerHTML = msg;

		if (toast.state === 'leaving') {
			toast.state = 'entering';
			setToastTimeout(appearStep, timestep);
		}

		if (toast.state === 'shown') {
			// debug(`\t takeover toast step ${toast.step}`);
			appearFinish();
		}
	} else {
		// Start a new toast
		setToastTimeout(appearStep, 1);
	}

	// Internal stuff
	function appearFinish() {
		// debug('\t appearFinish');
		currtop = finaltop;
		curropacity = finalopacity;
		toast.step = stepmax;
		toast.state = 'shown';

		msgdiv.style.marginTop = finaltop + 'px';
		msgdiv.style.opacity = finalopacity;

		setToastTimeout(disappearStep, duration);
	}

	function appearStep() {
		// debug('\t appearStep ' + toast.step);

		if (toast.step < 0) {
			msgdiv.style.display = 'block';
			msgdiv.style.marginTop = '-50px;';
			msgdiv.style.opacity = '0.0';
			msgdiv.style.borderBottomWidth = '0px';

			toast.step++;
			toast.state = 'entering';

			setToastTimeout(appearStep, timestep);
		} else if (toast.step < stepmax) {
			toast.step++;
			currtop = currtop + (finaltop - currtop) / divisor;
			curropacity = curropacity + (finalopacity - curropacity) / divisor;

			msgdiv.style.marginTop = currtop + 'px';
			msgdiv.style.opacity = curropacity;

			setToastTimeout(appearStep, timestep);
		} else {
			setToastTimeout(appearFinish, timestep);
		}
	}

	function disappearStep() {
		// debug('\t appearStep ' + toast.step);
		if (toast.step === stepmax) toast.state = 'leaving';

		if (toast.step <= 0) {
			msgdiv.style.display = 'none';
			msgdiv.style.marginTop = '-50px;';
			msgdiv.style.opacity = '0.0';
			msgdiv.innerHTML = '0_o';

			if (toast.timeoutID) clearTimeout(toast.timeoutID);
			toast.timeoutID = false;
			toast.state = 'hidden';
			toast.step = -1;
		} else {
			toast.step--;
			currtop = currtop - currtop / divisor;
			curropacity = curropacity - curropacity / divisor;

			msgdiv.style.marginTop = currtop + 'px';
			msgdiv.style.opacity = curropacity;

			setToastTimeout(disappearStep, timestep);
		}
	}

	function setToastTimeout(fn, dur) {
		if (toast.timeoutID) clearTimeout(toast.timeoutID);
		toast.timeoutID = setTimeout(fn, dur);
		// debug(`${toast.timeoutID} - ${toast.state} ${toast.step} - ${msg}`);
	}

	// debug(' showToast - END\n');
}

//-------------------
// Saved Sate
//-------------------
function setProjectAsSaved() {
	_UI.projectsaved = true;

	if (_UI.devmode) {
		document.title = '░▒▓█ GSDEVMODE █▓▒░';
	} else if (_UI.popout) {
		document.title = 'Glyphr Studio - Tools';
		_UI.popout.document.title = 'Glyphr Studio - Canvas';
	} else {
		document.title = 'Glyphr Studio';
	}

	updateSaveIcon();
}

function setProjectAsUnsaved() {
	_UI.projectsaved = false;

	if (_UI.devmode) {
		document.title = '░▒▓█ GSDEVM❖DE █▓▒░';
	} else if (_UI.popout) {
		document.title = ' ❖ Glyphr Studio - Tools';
		_UI.popout.document.title = ' ❖ Glyphr Studio - Canvas';
	} else {
		document.title = ' ❖ Glyphr Studio';
	}

	updateSaveIcon();
}

function updateSaveIcon() {
	if (_UI.current_panel === 'npNav') return;

	var savecolor = _UI.colors.gray.l90;
	if (!_UI.projectsaved) savecolor = 'white';

	document.getElementById('npSave').innerHTML =
		'<table class="saveButtonTable">' +
		'<tr><td style="border-right:1px solid rgb(204, 209, 214);">' +
		'<button class="primarynavbutton" style="height:32px; width:38px; padding:4px 0px 0px 7px;" title="Save Glyphr Project File" onclick="showToast(\'Saving Glyphr Studio Project file...\'); setTimeout(saveGlyphrProjectFile, 500);">' +
		makeIcon({
			name: 'button_npSave',
			size: 24,
			color: savecolor,
			hovercolor: 'white',
		}) +
		'</button></td><td>' +
		'<button class="primarynavbutton" style="height:36px; width:21px; text-align:left; padding:0px 0px 0px 4px;" title="Save File Format Options" onclick="toggleDialog_ExportOptions();">' +
		makeIcon({
			name: 'button_more',
			height: 10,
			width: 10,
			size: 10,
			color: savecolor,
			hovercolor: 'white',
		}) +
		'</button></td></tr>' +
		'</table>';
}

//-------------------
// File Savr
//-------------------
function saveFile(fname, buffer, ftype) {
	ftype = ftype || 'text/plain;charset=utf-8';
	var fblob = new Blob([buffer], { type: ftype, endings: 'native' });

	var link = document.createElement('a');
	window.URL = window.URL || window.webkitURL;
	link.href = window.URL.createObjectURL(fblob);
	link.download = fname;

	var event = document.createEvent('MouseEvents');
	event.initEvent('click', true, false);
	link.dispatchEvent(event);

	return;
}

//-------------------
// Common Functions
//-------------------
// returns a full new copy of any object
// 'parentpath' is a PathPoint property that is a pointer to it's parent Path
// causes infinite loops when cloning objects.  Kind of a hack.
function clone(cobj, calledby) {
	if (calledby) {
		// debug(`Clone - calledby ${calledby}`);
	} else if (calledby !== false) {
		// debug('Clone - no calledby');
	}

	var newObj = cobj instanceof Array ? [] : {};
	for (var i in cobj) {
		if (
			cobj[i] &&
			typeof cobj[i] === 'object' &&
			i !== 'parentpath' &&
			i !== 'cache'
		) {
			newObj[i] = clone(cobj[i], false);
		} else newObj[i] = cobj[i];
	}
	return newObj;
}

// Returns a maxes object with lowest possible values
function makeUIMins() {
	return {
		xmax: _UI.mins.xmax,
		xmin: _UI.mins.xmin,
		ymax: _UI.mins.ymax,
		ymin: _UI.mins.ymin,
	};
}

// rounds a number to include a .5 so it draws nicely on canvas
// true = +0.5, false = -0.5
Number.prototype.makeCrisp = function (dir) {
	var mul = dir ? 1 : -1;
	return round(this) + 0.5 * mul;
};

// better rounding than Math.round
function round(num, dec) {
	if (!num) return 0;
	dec = dec || 0;
	return Number(Math.round(num + 'e' + dec) + 'e-' + dec) || 0;
}

// a function for flitering out duplicates in arrays
function duplicates(v, i, a) {
	return a.indexOf(v) === i;
}

// floating point numbers make me mad
function numSan(num) {
	num = parseFloat(num);
	var strnum = '' + num;

	if (strnum.indexOf('0000') > -1 || strnum.indexOf('9999') > -1) {
		num = round(num, 6);
	}

	if (num < 0.0 && num > 0) num = 0;

	return num;
}

// removes illegal file name chars
function strSan(val) {
	return val.replace(/[<>'"\\]/g, '');
}

// removes begining and trailing whitespace, and any breaking or tab chars
function trim(text) {
	try {
		text = text.replace(/^\s+|\s+$/g, '');
		return text.replace(/(\r\n|\n|\r|\t)/gm, '');
	} catch (e) {
		return '';
	}
}

// returns true for 0 and false
function isval(val) {
	if (val === 0) return true;
	else if (val === false) return true;
	else if (val === null || val === undefined) return false;
	else if (typeof val === 'object' && Object.keys(val).length === 0)
		return false;
	else return !!val;
}

function getOverallMaxes(maxarr) {
	// debug('\n getOverallMaxes - START');
	// debug('\t start');
	// debug(maxarr);

	var tm;
	var re = {
		xmax: _UI.mins.xmax,
		xmin: _UI.mins.xmin,
		ymax: _UI.mins.ymax,
		ymin: _UI.mins.ymin,
	};

	for (var m = 0; m < maxarr.length; m++) {
		// debug('\t pass ' + m);
		tm = maxarr[m];
		// debug([tm]);

		// sanitize
		if (!isval(tm.xmax)) tm.xmax = _UI.mins.xmax;
		if (!isval(tm.xmin)) tm.xmin = _UI.mins.xmin;
		if (!isval(tm.ymax)) tm.ymax = _UI.mins.ymax;
		if (!isval(tm.ymin)) tm.ymin = _UI.mins.ymin;
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

function reqAniFrame(fun) {
	if (_UI.popout) {
		if (_UI.popout.requestAnimationFrame) _UI.popout.requestAnimationFrame(fun);
		else {
			console.warn('no requestAnimationFrame');
			fun();
		}
	} else {
		if (window.requestAnimationFrame) window.requestAnimationFrame(fun);
		else {
			console.warn('no requestAnimationFrame');
			fun();
		}
	}
}

function getShipDate() {
	var time = '' + new Date().getTime();
	var prefix = parseInt(time.substr(0, 5)) * 100000000;
	var day = (parseInt(time.charAt(5)) + 1) * 10000000;
	return prefix + day;
}

//--------------------------
// Angle and Rotation Stuff
//--------------------------

/**
		Use JavaScript radian angle system for math and drawing:
		Radians, top is positive bottom is negative
		3 o'clock is zero, 9 o'clock is pi

		"Nice Angle" angle system for UI display:
		Two halves of 180 degrees
		clockwise = positve 0 to 180
		counterclockwise = negative -1 to -179
		12 o'clock is zero, 6 o'clock is 180
		3 o'clock is 90, 9 o'clock is -90
	**/

function calculateAngleX(angle, y) {
	x = Math.tan(angle * y);
	return x;
}

function calculateAngleY(angle, x) {
	y = Math.tan(angle * x);
	return y;
}

//Returns an angle in radians
function calculateAngle(h, p) {
	p = p || { x: 0, y: 0 };
	var radians = Math.atan2(h.y - p.y, h.x - p.x);

	if (isNaN(radians)) {
		console.warn('calculateAngle returned NaN\n' + json(h) + '\n' + json(p));
		radians = 0;
	}

	return radians;
}

function calculateLength(h, p) {
	var adj = p.x - h.x;
	var opp = p.y - h.y;
	var result = Math.sqrt(adj * adj + opp * opp);
	return result;
}

function rotate(coord, deltaRad, about, snap) {
	// debug('\n rotate - START');
	// debug('\t coord: \t' + json(coord, true));
	// debug('\t deltaRad:\t' + deltaRad);
	// debug('\t about: \t' + json(about, true));

	if (!coord) return;
	if (deltaRad === 0) return coord;

	about = about || {};
	about.x = about.x || 0;
	about.y = about.y || 0;

	if (snap) deltaRad = snapRadiansToDegrees(deltaRad);

	coord.x -= about.x;
	coord.y -= about.y;

	var newx = coord.x * Math.cos(deltaRad) - coord.y * Math.sin(deltaRad);
	var newy = coord.x * Math.sin(deltaRad) + coord.y * Math.cos(deltaRad);

	coord.x = newx + about.x;
	coord.y = newy + about.y;

	// debug('\t new coord x/y: ' + coord.x + '/' + coord.y);
	// debug(' rotate - END\n');
	return coord;
}

function snapRadiansToDegrees(radians) {
	var degrees = deg(radians);
	degrees = round(degrees);
	radians = rad(degrees);
	return radians;
}

//convert between degrees and radians
//these DO NOT use "Nice Angle"
//0rad = 0deg, PIrad = 180deg
function rad(deg) {
	return deg * (Math.PI / 180);
}
function deg(rad) {
	return rad * (180 / Math.PI);
}

function radiansToNiceAngle(rad) {
	var angle = deg(rad);
	angle = 360 - angle;
	angle -= 270;
	angle = angle % 360;
	if (angle < 0) angle += 360;

	return angle;
}

function niceAngleToRadians(angle) {
	return rad(angle);
}

function validateRadians(radians) {
	if (radians > Math.PI || radians < Math.PI * -1) {
		radians = radians % Math.PI;
		radians -= Math.PI;
	}

	return radians;
}

function validateNiceAngle(angle) {
	angle = parseFloat(angle);
	if (isNaN(angle)) return 0;

	angle = angle % 360;
	if (angle < -180) angle += 360;
	if (angle > 180) angle -= 360;
	if (angle === -180) angle = 180;

	return angle;
}

//-------------------
// Object ID Stuff
//-------------------
// Returns the first ID from an object
function getFirstID(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return key;
		}
	}

	return false;
}

// Generate a new ID for an object
function generateNewID(obj, base) {
	var number = 1;
	base = base || 'id';
	var id = '' + base + number;
	while (obj.hasOwnProperty(id)) {
		id = '' + base + number;
		number++;
	}

	return id;
}

function getMyID(obj) {
	for (var g in _GP.glyphs) {
		if (_GP.glyphs.hasOwnProperty(g)) {
			if (obj === _GP.glyphs[g]) return g;
		}
	}

	for (var c in _GP.components) {
		if (_GP.components.hasOwnProperty(c)) {
			if (obj === _GP.components[c]) return c;
		}
	}

	for (var l in _GP.ligatures) {
		if (_GP.ligatures.hasOwnProperty(l)) {
			if (obj === _GP.ligatures[l]) return l;
		}
	}

	return false;
}

// returns the length of an associative array
function getLength(obj) {
	var len = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) len++;
	}
	return len;
}

//-------------------
// BUG EMAIL
//-------------------
function genEmailContent() {
	var con =
		'Have a feature idea or ran into an issue%3F We%27d be happy to help!';
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
function parseColorString(c) {
	var val = { r: 0, g: 0, b: 0, a: 1 };

	if (typeof c !== 'string') return val;

	if (c.charAt(0) === '#') {
		c = c.substring(1, 7);
		val.r = parseInt(c.substring(0, 2), 16);
		val.g = parseInt(c.substring(2, 4), 16);
		val.b = parseInt(c.substring(4, 6), 16);
	} else if (c.substring(0, 4) === 'rgb(') {
		c = c.split('(')[1].split(')')[0].split(',');
		val.r = parseInt(c[0], 10);
		val.g = parseInt(c[1], 10);
		val.b = parseInt(c[2], 10);
		val.a = parseInt(c[3], 10) || 1;
	}

	return val;
}

function shiftColor(c, percent, lighter) {
	percent = Math.max(0, Math.min(percent, 1));
	var val = parseColorString(c);

	val.r = Math.max(0, Math.min(val.r, 255));
	val.g = Math.max(0, Math.min(val.g, 255));
	val.b = Math.max(0, Math.min(val.b, 255));

	if (lighter) {
		val.r = round((255 - val.r) * percent + val.r);
		val.g = round((255 - val.g) * percent + val.g);
		val.b = round((255 - val.b) * percent + val.b);
	} else {
		val.r = round(val.r - val.r * percent);
		val.g = round(val.g - val.g * percent);
		val.b = round(val.b - val.b * percent);
	}

	return 'rgb(' + val.r + ',' + val.g + ',' + val.b + ')';
}

function RGBAtoRGB(rgb, alpha) {
	var val = parseColorString(rgb);

	var dr = round((255 - val.r) * (1 - alpha));
	var dg = round((255 - val.g) * (1 - alpha));
	var db = round((255 - val.b) * (1 - alpha));

	var r = val.r + dr;
	var g = val.g + dg;
	var b = val.b + db;

	return `rgb(${r},${g},${b})`;
}

function transparencyToAlpha(transparency) {
	var t = parseInt(transparency);
	if (!t || isNaN(t)) return 1;

	if (t > 100) return 0;
	if (t < 0) return 1;

	return (100 - transparency) / 100;
}

//-------------------
// COMBINATORICS
//-------------------

/**
 * K-combinations
 *
 * Get k-sized combinations of elements in a set.
 *
 * Usage:
 *   k_combinations(set, k)
 *
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 *
 * Return:
 *   Array of found combinations, size of a combination is k.
 *
 * Examples:
 *
 *   k_combinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 *
 *   k_combinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 *
 *   k_combinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 *
 *   k_combinations([1, 2, 3], 4)
 *   -> []
 *
 *   k_combinations([1, 2, 3], 0)
 *   -> []
 *
 *   k_combinations([1, 2, 3], -1)
 *   -> []
 *
 *   k_combinations([], 0)
 *   -> []
 */
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;

	if (k > set.length || k <= 0) {
		return [];
	}

	if (k == set.length) {
		return [set];
	}

	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	// Assert {1 < k < set.length}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

k_permutations = function (set, maxLen, excludeTwins) {
	// Copy initial values as arrays
	var perm = set.map(function (val) {
		return [val];
	});
	// Our permutation generator
	var generate = function (perm, maxLen, currLen) {
		// Reached desired length
		if (currLen === maxLen) {
			return perm;
		}
		// For each existing permutation
		for (var i = 0, len = perm.length; i < len; i++) {
			var currPerm = perm.shift();
			// Create new permutation
			for (var k = 0; k < set.length; k++) {
				if (!(excludeTwins && currPerm[0] === set[k]))
					perm.push(currPerm.concat(set[k]));
			}
		}
		// Recurse
		return generate(perm, maxLen, currLen + 1);
	};
	// Start with size 1 because of initial values
	return generate(perm, maxLen, 1);
};
