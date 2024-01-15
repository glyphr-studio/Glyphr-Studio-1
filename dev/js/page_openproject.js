// start of file
/**
	Page > Open Project
	The first page you see when you open Glyphr Studio.
	HTML and associated functions for this page.
**/

function loadPage_openproject(tab) {
	// debug("LOADING PAGE >> loadPage_openproject");
	var recent = 1000 * 60 * 60 * 24 * 7; // seven days in milliseconds

	var ct =
		'<table style="height:100%; width:100%;"><tr>' +
		'<td id="openprojecttableleft" vertical-align="middle">' +
		'<div id="splashscreenlogo"></div>';

	ct +=
		'<span class="splashvername">' + _UI.thisGlyphrStudioVersion + '</span>';

	ct +=
		'<span class="splashvernum">.' +
		_UI.thisGlyphrStudioVersionNum.split('.')[2];

	if (Date.now() - _UI.thisGlyphrStudioVersionDate < recent)
		ct +=
			' - <a href="https://www.glyphrstudio.com/v1/help/overview_updates.html" target="_blank">recently updated!</a>';
	ct += '</span>';

	ct +=
		'<div class="splashblurb">' +
		'For more informaiton visit <a href="https://www.glyphrstudio.com" target="_blank">www.glyphrstudio.com</a><br>' +
		'Glyphr Studio is licensed under a <a href="https://www.gnu.org/licenses/gpl.html" target="_blank">GNU General Public License</a>, ' +
		'which is a free / open source "copyleft" license. You are free to use, distribute, and modify Glyphr Studio as long as ' +
		'this license and its freeness stays intact.' +
		'</div>' +
		'<input style="display:none;" type="file" id="filechooser"/>' +
		'</td>' +
		'<td id="openprojecttableright" vertical-align="middle">' +
		make_ImportOrCreateNew() +
		'</td>' +
		'</tr></table>';

	var mp = document.getElementById('mainwrapper');
	mp.innerHTML = ct;
	mp.style.left = '0px';
	document
		.getElementById('openprojecttableright')
		.addEventListener('dragover', handleDragOver, false);
	document
		.getElementById('openprojecttableright')
		.addEventListener('drop', handleDrop, false);
	document
		.getElementById('openprojecttableright')
		.addEventListener('dragleave', handleDragLeave, false);
	document
		.getElementById('openprojecttableleft')
		.addEventListener('dragover', handleDragOver, false);
	document
		.getElementById('openprojecttableleft')
		.addEventListener('drop', handleDrop, false);
	document
		.getElementById('openprojecttableleft')
		.addEventListener('dragleave', handleDragLeave, false);
	document
		.getElementById('filechooser')
		.addEventListener('change', handleDrop, false);
	window.addEventListener('message', handleMessage, false);
	if (window.opener) {
		window.opener.postMessage('ready', '*');
	}
	openproject_changeTab(tab);

	document.getElementById('splashscreenlogo').innerHTML = makeGlyphrStudioLogo({
		fill: 'white',
		width: 400,
	});
}

function make_ImportOrCreateNew() {
	// TABS
	var con =
		'<div class="openproject_tabs">' +
		'<button id="new_tab" onclick="openproject_changeTab(\'new\');">new</button>' +
		'<button id="load_tab" onclick="openproject_changeTab(\'load\');">load</button>' +
		'<button id="examples_tab" onclick="openproject_changeTab(\'examples\');">examples</button>' +
		// '<button onclick="openproject_changeTab(\'recent\');">recent</button>'+
		'</div>';

	// LOAD
	con +=
		'<div class="openproject_tile" id="load_content" style="display: none;">' +
		'<h2>Load a file</h2>' +
		'<button onclick="document.getElementById(\'filechooser\').click();" class="buttonsel">Browse for a File</button>&ensp; or Drag and Drop:' +
		'<div id="droptarget">' +
		'Glyphr Studio Project &ensp;(.txt)<br>' +
		'Open Type or True Type Font &ensp;(.otf or .ttf)<br>' +
		'SVG Font &ensp;(.svg)' +
		'</div>' +
		'<div style="width:335px;">' +
		makeErrorMessageBox() +
		'</div>' +
		'</div>';

	// NEW
	con +=
		'<div class="openproject_tile" id="new_content" style="display: none;">' +
		'<h2>Start a new Glyphr Studio Project</h2>' +
		'Project name: &nbsp; <input id="newprojectname" type="text" value="My Font" autofocus/><br>' +
		'<button onclick="newGlyphrProject(); navigate({page:\'glyph edit\'});" class="buttonsel">Start a new font from scratch</button>' +
		'</div>';

	// EXAMPLES
	con +=
		'<div class="openproject_tile" id="examples_content" style="display: none;">' +
		'<h2>Load an Example project</h2>' +
		'Modegg is a project that utilizes Glyphr Studio features, like Components:<br>' +
		'<button onclick="openproject_loadSample(\'modegg\');" class="buttonsel">Modegg</button><br><br>' +
		'California Gothic is an all-caps display font:<br>' +
		'<button onclick="openproject_loadSample(\'californiagothic\');" class="buttonsel">California Gothic</button><br><br>' +
		'Merriweather Sans is an open-source font imported from an Open Type file:<br>' +
		'<button onclick="openproject_loadSample(\'merriweathersans\');" class="buttonsel">Merriweather Sans</button><br><br>' +
		'</div>';

	// RECENT

	return makeV2Card() + con;
}

function makeV2Card() {
	con = '';
	con += '<div class="v2Card">';
	con += '<h2>Glyphr Studio v1 is deprecated - please use v2!</h2><p>';
	con += '	On January 15th, 2024, Glyphr Studio v2 became the default experience.<br>Go to the ';
	con +=
		'	<a href="https://www.glyphrstudio.com/" target="_blank">homepage</a> to learn more.';
	con += '</p></div>';

	return con;
}

function openproject_changeTab(tab) {
	var contentnew = document.getElementById('new_content');
	var contentload = document.getElementById('load_content');
	var contentexamples = document.getElementById('examples_content');
	// var contentrecent = document.getElementById('recent_content');

	var tabnew = document.getElementById('new_tab');
	var tabload = document.getElementById('load_tab');
	var tabexamples = document.getElementById('examples_tab');
	// var tabrecent = document.getElementById('recent_tab');

	contentnew.style.display = 'none';
	contentload.style.display = 'none';
	contentexamples.style.display = 'none';
	// contentrecent.style.display = 'none';

	tabnew.style.borderBottomColor = 'rgb(229,234,239)';
	tabload.style.borderBottomColor = 'rgb(229,234,239)';
	tabexamples.style.borderBottomColor = 'rgb(229,234,239)';
	// tabrecent.style.borderBottomColor = 'rgb(229,234,239)';

	if (tab === 'load') {
		contentload.style.display = 'block';
		tabload.style.borderBottomColor = 'rgb(0,140,210)';
	} else if (tab === 'examples') {
		contentexamples.style.display = 'block';
		tabexamples.style.borderBottomColor = 'rgb(0,140,210)';
	} else {
		// default to new
		contentnew.style.display = 'block';
		tabnew.style.borderBottomColor = 'rgb(0,140,210)';
	}
}

function handleDrop(evt) {
	// debug('\n handleDrop - START');
	document.getElementById('openprojecttableright').innerHTML =
		'Loading File...';
	// document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;

	evt.stopPropagation();
	evt.preventDefault();

	var f = evt.dataTransfer || document.getElementById('filechooser');
	f = f.files[0];
	// debug('\t filename: ' + f.name);
	var fname = f.name.split('.');
	fname = fname[fname.length - 1].toLowerCase();
	// debug('\t fname = ' + fname);

	var reader = new FileReader();

	if (fname === 'otf' || fname === 'ttf') {
		reader.onload = function () {
			// debug('\n reader.onload::OTF or TTF - START');
			_UI.droppedFileContent = reader.result;
			ioOTF_importOTFfont();
			// debug(' reader.onload:: OTF or TTF - END\n');
		};

		reader.readAsArrayBuffer(f);
	} else if (fname === 'svg' || fname === 'txt') {
		reader.onload = function () {
			// debug('\n reader.onload::SVG or TXT - START');
			_UI.droppedFileContent = reader.result;
			if (fname === 'svg') {
				// debug('\t File = .svg');
				ioSVG_importSVGfont();
			} else if (fname === 'txt') {
				// debug('\t File = .txt');
				importGlyphrProjectFromText();
				navigate();
			}
			// debug(' reader.onload::SVG OR TXT - END\n');
		};

		reader.readAsText(f);
	} else {
		var con = '<h3>Unsupported file type</h3>';
		con += "Glyphr Studio can't import ." + fname + ' files.<br>';
		con += 'Try loading another file.';
		document.getElementById('openprojecttableright').innerHTML =
			make_ImportOrCreateNew();
		openproject_changeTab('load');
		showErrorMessageBox(con);
		// document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;
	}

	// debug(' handleDrop - END\n');
}

function handleMessage(evt) {
	// assume strings are SVG fonts
	_UI.droppedFileContent = evt.data;

	if (typeof evt.data === 'string') {
		ioSVG_importSVGfont(false);

		// assume array buffers are otf fonts
	} else if (evt.data instanceof ArrayBuffer) {
		ioOTF_importOTFfont(false);
	}
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';

	var frtr = document.getElementById('openprojecttableright');
	// frtr.style.backgroundColor = _UI.colors.blue.l95;
	frtr.innerHTML = '↧&ensp;Drop it!';
}

function handleDragLeave(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var frtr = document.getElementById('openprojecttableright');
	frtr.innerHTML = make_ImportOrCreateNew();
	// frtr.style.backgroundColor = _UI.colors.gray.offwhite;
	openproject_changeTab('load');
}

function openproject_loadSample(name) {
	document.getElementById('examples_content').innerHTML =
		'<h2>Load an Example project</h2>Loading example project...';

	setTimeout(function () {
		hydrateGlyphrProject(_UI.sampleproject[name]);
		navigate({ page: 'glyph edit' });
	}, 5);
}

function make_LoadingAnimation() {
	// debug('\n make_LoadingAnimation - START');
	var re = '';
	re += '<div class="openproject_tile">';
	re += '<h2>Importing Font</h2>';
	re += '<div id="fontimportstatus">Reading font data...</div>';
	re +=
		'<br><div style="margin:0px; width:50px; height:50px; padding:0px; background-color:' +
		_UI.colors.blue.l65 +
		';';
	re +=
		'background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwFJREFUeNrsWd2N2kAQNtYpr/F1wFUQUgG4gnAVABXEVwFHBXepwEkFx1UAVHBOBXYHOK9RJDJzGkerZWZ3bYy9QYw0Qgh2dr6d2dn5Gfz+czgEF0BhcCF0BeIb3bQsryDe0fet9vuEPsfAQ+JWaNDCZc+AfwCvP9wMijoLYW8EMgWeAY/6AFKi4sCruspbQC0JWNQFkO/ADwCgPIevgz4I4gl4fi4gePILALDt4vKCXnifUtd75AqkthVIkSOqcxB1rOMC5Bk2f3DYFH37C13akUOAQH4F2WsH2Qgmsf3pYODEdmLAj8B7ixwT70lGZNkrMckxAUkdBJ8CgANkO7hUWi+51hZMHhv89kV53NomvEP30n2E/Tfc3qHwRiwEIej7b2cEUb3+b7QXRwvS0QqEfeTowdq0mVYY6H0v2lOPeqjbyha1CvjjneBOm1PTiIbpT8y5GeiUq4eqW2QlCFz2ACKgPZfCbyvJIiUgvzXciz7pTnD3fZWXhdrrLVmjb3oyZBxHFvkMqDPmguee1E5HVlG9JVTcKmMWTz0qAqdMBMuqUBwq0YGjmUdAZobI9g/IzhA1fCFJl50KpHBNw/skQafCCKRJudkBRTYgvruVVadrg+5/AlJ6qG/ZBEjmIZDMBmQidDt8skopdGAmKpCxsPibR0AkXcZ60nirFzBUUOUevCklJY2cfnv9jiSMe+HC2ANrxEIzImELKw41IcfMM+3BMu+NEK6Jp3tLqD3/bBFFguKOI1lVr68NBV+kItObXXNL4vbYcmOO7TxadJi7NOhKOonMICiiQudrizlZRpFpbWqWU1W40d1c6jSioHuXzrkydfoUuDWwVcWRfwaO0y5K41+4u2rrxuMo4blB3TAM5EZe0WTKRX1hqQnhNFbYUuQo+oi7dChpYGnTumS/KCCnTviwSwA0EcgDh15z0xmi04CmIYBqYDSvs+6U8XQ12X3FS9vU9cjKI1K+0UT3VCBc7VxQJPqlfFepCgIfSXlTUOgNyLXUvQK5RCB/BRgA7GD39jF9VXsAAAAASUVORK5CYII=); ';
	re += 'rgb(0,140,210) no-repeat fixed;">';
	re += '<img id="sweep" style="margin:0px; padding:0px;" ';
	re +=
		'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAu9JREFUeNrsWMtu00AU9TNOkyakjxSXlj4gIPESYsdjg8SGDSyRWCCxgQ9gh9Qt38LX8AHtCj4AKE1aEzuOuSOdka4uTqxCbHcxRzoa2+PEc+bce30T21ow4knWpKFHdNjlHWKC45S4TPxJ/K7Y8Ozkf5/rWYtHJkRIuMRt4grxGsTHNBySoK8XSUjR7io3YnHtLnGXBA1p/EKCjs77ULsEIWqHwzmhtUYM2NwGsYGQs9g9n8/jkGOVg0lBaHG0hIgruPaWNuQ5cq42IeM5c4EIbX7uo1BoYQ+J70jMRl1C0jlzPjteJ56w8y3isbj/CfEjibl60YTwvOyKEPPFvfvEEeY+zBNTihBK0lmh1WNhtyRyaZN4Ks4dtilaTFilI7PKsNrxKY77xIhVKelUh3gm8ukB8YDEtKsUkhbkR4Md99miW3BjyOY7eHmeoJS/rtsRly0sYeX2lAndFwWgkyPsJblyr04hAatWMRa+yty7TvzB7g/BYU5H8qkuIR76MB5iW2zhN1GhNHYRZiPxPeoze8pJcuVF6UKocqU5PVaEluQMiwxYhRrDGSX4Bo4jUfEGKAo6n95X4YglmsOmaEl2EDJruBajJA/gQso+p0LuEgRMeYkmV55WIWQiQku3JGrxv1Fm17FAldTqhfeL3b+NUIpyQtWFS2/KauNnlWCbtSS3Uak2ca4Sus2Suo/fKyMRXvod0wSVONVYdr2KQ6uLKjVEch8jxDy40oNbY5HkS3CsgdDKhEOPyxaSsER32KJChNYAY4YXHk9wF3nRYu7O6uHulCqEKteUbJ/CjRWETBu7uofwCjEfseqkQ2dc0IC6cPNZ2Y7ohHewwBDjKt4lujVxUZabuD/L+U0TsILhY9QuP6pCSIIF3yJeRg74SP5liNKhk2DOxRjg2C14Rq8qIfchpIsc8VjFbLCF+//6ELtsFZQjale/sf+6MhEWC0EVQtRL7pVlYGBgYGBgYGBgYGBgYGBgYGBg8Bf+CDAAUF2+ry6GVycAAAAASUVORK5CYII=">';
	re += '</div>';
	re += makeErrorMessageBox();
	re += '</div>';

	// debug(' make_LoadingAnimation - END\n');
	return re;
}

function make_ImportFilter(chars, kerns, funname) {
	var re =
		'<div class="openproject_tile" style="width:500px; height:auto;">' +
		'<h2>Whoa, there...</h2><br>' +
		"The font you're trying to import has <b>" +
		chars +
		' glyphs</b>';
	if (kerns) re += ' and <b>' + kerns + ' kern pairs</b>.  ';
	else re += '.  ';
	re +=
		'Glyphr Studio has a hard time with super-large fonts like this.  ' +
		'We recommend pairing it down a little:<br><br>';

	re += '<table>';

	re +=
		'<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'basic\');" id="basic" checked/></td><td>';
	re +=
		'<label for="basic"><h3>Only import Latin glyphs</h3></label>' +
		'This includes Latin and Latin Extended Unicode ranges<br>(<pre>0x0020</pre> - <pre>0x024F</pre>).<br><br>';
	re += '</td></tr>';

	re +=
		'<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'custom\');" id="custom"/></td><td>';
	re +=
		'<label for="custom"><h3>Import a custom range of glyphs</h3></label>' +
		'Enter a beginning and ending value (inclusive) for your custom range. A nice overview of glyph ranges can be found at<br><a href="https://en.wikipedia.org/wiki/Unicode_block" target="_blank">Wikipedia\'s Unicode Block page</a>.<br>' +
		'<table class="settingstable"><tr>' +
		'<td>begin:<br><input type="text" onchange="checkFilter(\'custom\');" value="' +
		decToHex(_UI.importrange.begin) +
		'" id="customrangebegin"></td>' +
		'<td>end:<br><input type="text" onchange="checkFilter(\'custom\');" value="' +
		decToHex(_UI.importrange.end) +
		'" id="customrangeend"></td>' +
		// '<td><br><button onclick="checkFilter(\'custom\');">Set Range</button></td>'+
		'<td style="padding-top:20px;">' +
		helpUI(unicodeInputHelp()) +
		'</td>' +
		'</tr></table><br>';
	re += '</td></tr>';

	re +=
		'<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'everything\');" id="everything"/></td><td>';
	re +=
		'<label for="everything"><h3>Import all the glyphs</h3></label>' +
		"Don't say we did't try to warn you.";
	re += '</td></tr>';

	re += '</table>';

	re +=
		'<br><br><button class="buttonsel" id="importfontbutton" onclick="' +
		funname +
		'(true);">Import Font</button>';

	return re;
}

function checkFilter(id) {
	if (id === 'basic') {
		document.getElementById('basic').checked = true;
		document.getElementById('custom').checked = false;
		document.getElementById('everything').checked = false;
		_UI.importrange.begin = 0x0020;
		_UI.importrange.end = 0x024f;
	} else if (id === 'custom') {
		document.getElementById('basic').checked = false;
		document.getElementById('custom').checked = true;
		document.getElementById('everything').checked = false;
		_UI.importrange = getCustomRange(false, true);
		document.getElementById('customrangebegin').value =
			_UI.importrange.begin || 0x0020;
		document.getElementById('customrangeend').value =
			_UI.importrange.end || 0x024f;
	} else if (id === 'everything') {
		document.getElementById('basic').checked = false;
		document.getElementById('custom').checked = false;
		document.getElementById('everything').checked = true;
		_UI.importrange.begin = 0x0000;
		_UI.importrange.end = 0xffff;
	}
}
