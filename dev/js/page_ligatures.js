// start of file
/**
	Page > Ligatures
	HTML and associated functions for this page.
**/

function loadPage_ligatures() {
	// debug('\n loadPage_ligatures - START');

	var wrapper = getEditDocument().getElementById('mainwrapper');
	wrapper.innerHTML = editPage_Content();
	setupEditCanvas();
	// clickEmptySpace();

	// if (_UI.devmode && isval(_UI.dev_selected_shape)) {
	// 	selectShape(_UI.dev_selected_shape);
	// 	_UI.dev_selected_shape = false;
	// }

	_UI.selectedligature = _UI.selectedligature || getFirstID(_GP.ligatures);

	if (getSelectedWorkItemShapes().length > 0) _UI.selectedToolName = 'pathedit';
	else _UI.selectedToolName = 'pathaddpoint';

	redraw({ calledby: 'loadPage_ligatures' });
}

function showNewLigatureDialog() {
	var con = '<h1>New Ligature</h1>';
	con += '<div style="width:500px;">';
	con +=
		'Create a new ligature by specifying two or more individual glyphs that will make up the ligature (like ff).<br><br>';
	con +=
		'Ligature glyphs can also be specified in Unicode format (like <pre>U+0066U+0066</pre>) or hexadecimal format (like <pre>0x00660x0066</pre>). ';
	con +=
		'Hexadecimal, Unicode, and regular glyph formats cannot be mixed - choose one type!<br><br>';
	con += '<h3>Ligature Glyphs</h3>';
	con +=
		'<input type="text" id="newligatureinput" style="font-size:24px; padding:8px;"/><br>';
	con += makeErrorMessageBox();
	con += '<br>';
	con +=
		'<button class="buttonsel" onclick="createNewLigature();">create new ligature</button>';
	con += '</div>';

	openDialog(con);
}

function createNewLigature() {
	// debug('\n createNewLigature - START');
	var inlig = document.getElementById('newligatureinput').value;
	// debug('\t retrieved ' + inlig);
	var ligID = inlig.replace(/\s/gi, '');
	ligID = parseUnicodeInput(ligID);
	// debug('\t parsed ' + ligID);

	// Do checks
	if (!ligID) {
		showErrorMessageBox(
			'Error reading character input. Unicode characters must be below 0xFFFF.'
		);
		return;
	}

	if (ligID && ligID.length < 2) {
		showErrorMessageBox('Ligatures must be at least two glyphs.');
		return;
	}

	ligID = ligID.join('');

	if (_GP.ligatures[ligID]) {
		showErrorMessageBox('Ligature already exists.');
		return;
	}

	// Everything checks out
	_GP.ligatures[ligID] = new Glyph({
		glyphhex: ligID,
		name: 'Ligature ' + inlig,
	});
	sortLigatures();
	_UI.selectedligature = ligID;
	history_put('Created ' + getSelectedWorkItemName());
	navigate();
	closeDialog();
}

var ligaturesWithCodePoints = [
	{ chars: 'f‌f', point: '0xFB00' },
	{ chars: 'f‌i', point: '0xFB01' },
	{ chars: 'f‌l', point: '0xFB02' },
	{ chars: 'f‌f‌i', point: '0xFB03' },
	{ chars: 'f‌f‌l', point: '0xFB04' },
	{ chars: 'st', point: '0xFB06' },
	{ chars: 'AE', point: '0x00C6' },
	{ chars: 'ae', point: '0x00E6' },
	{ chars: 'OE', point: '0x0152' },
	{ chars: 'oe', point: '0x0153' },
];

function doesLigatureHaveCodePoint(id) {
	// debug('\n doesLigatureHaveCodePoint - START');
	// debug('\t passed ' + id);

	if (id.indexOf('0x', 2) === -1) return false;

	var ch = hexToChars(id);

	for (var i = 0; i < ligaturesWithCodePoints.length; i++) {
		if (ligaturesWithCodePoints[i].chars === ch)
			return ligaturesWithCodePoints[i];
	}

	return false;
}

function addCommonLigatures() {
	var lig, id;
	for (var i = 0; i < ligaturesWithCodePoints.length; i++) {
		lig = ligaturesWithCodePoints[i];
		id = parseUnicodeInput(lig.chars).join('');
		if (!_GP.ligatures[id]) _GP.ligatures[id] = new Glyph({ glyphhex: id });
	}

	_UI.selectedglyph = getFirstID(_GP.ligatures);
	redraw({ calledby: 'addCommonLigatures' });
}

function deleteLigatureConfirm() {
	var content = '<h1>Delete Ligature</h1>';
	content +=
		'<b style="color:' +
		_UI.colors.error.medium +
		';">This action cannot be undone!</b><br>';
	content += 'Are you sure you want to delete this Ligature?<br><br>';

	var uia = getSelectedWorkItem().usedin;
	if (uia.length > 0) {
		content +=
			'This Ligature is linked to the following Glyphs as a Component Instance:<br><ul>';

		for (var ssu = 0; ssu < uia.length; ssu++) {
			content +=
				'<li>' + getGlyphName(uia[ssu]).replace(/LATIN /gi, '') + '</li>';
		}

		content += '</ul>';
		// content += '<br>The Component Instances in these Glyphs will also be deleted.<br><br>';
	}

	content +=
		'<br><br><button class="buttonsel" onclick="deleteLigature();">delete this ligature</button> &nbsp; <button onclick="closeDialog();">cancel</button>';

	openDialog(content);
}

function deleteLigature() {
	// debug('\n deleteLigature - START');
	// debug('\t deleting ' + _UI.selectedligature);

	closeDialog();

	if (_GP.ligatures[_UI.selectedligature]) {
		// Delete upstream Component Instances
		_GP.ligatures[_UI.selectedligature].deleteLinks(_UI.selectedligature);

		// Delete it
		delete _GP.ligatures[_UI.selectedligature];
		_UI.selectedligature = getFirstID(_GP.ligatures);
	}

	// debug('\t after delete ' + _GP.ligatures);
	redraw({ calledby: 'deleteLigature' });

	// debug('deleteLigature - END\n');
}

function sortLigatures() {
	var temp;
	var sortarr = [];

	for (var n in _GP.ligatures) {
		if (_GP.ligatures.hasOwnProperty(n)) {
			temp = _GP.ligatures[n];
			sortarr.push({ id: n, ligature: temp });
		}
	}

	sortarr.sort(function (a, b) {
		if (a.id && b.id) {
			if (a.id.length === b.id.length) {
				if (a.id > b.id) return 1;
				if (a.id < b.id) return -1;
			} else {
				return b.id.length - a.id.length;
			}
		} else return 0;
	});

	_GP.ligatures = {};

	for (var s = 0; s < sortarr.length; s++) {
		temp = sortarr[s];
		_GP.ligatures[temp.id] = temp.ligature;
	}

	return sortarr;
}
