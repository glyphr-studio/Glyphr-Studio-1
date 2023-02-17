// start of file
/**
	Panel > Kern
	Shows a list of all the kern pairs.
**/

function makePanel_KerningAttributes() {
	// debug('\n makePanel_KerningAttributes - START');
	var count = 0;
	var content = '<div class="navarea_header">';
	content += makePanelSuperTitle();
	content += '<h1 class="paneltitle">Pairs</h1>';
	content += '</div>';

	content += '<div class="panel_section">';
	var rows = '';
	for (var k in _GP.kerning) {
		if (_GP.kerning.hasOwnProperty(k)) {
			rows += makeOneKernPairRow(_GP.kerning[k], k);
			count++;
		}
	}
	content +=
		rows ||
		'No kern pairs exist yet.  You can create a new one, or add some common kern pairs to get started.';
	content += '</div>';

	content += '<div class="panel_section">';
	content +=
		'<button onclick="showNewKernPairDialog();">add new kern pair</button><br>';
	if (count === 0) {
		content +=
			'<button onclick="addCommonKernPairs();">add some common kern pairs</button>';
	} else if (count > 1) {
		content +=
			'<button onclick="checkForDuplicateKernPairs();">check for duplicate kern pairs</button>';
	}
	content += '</div>';

	if (count === 0) {
		content += '<div class="panel_section">';
		content += '<h2>Please note!</h2><br>';
		content +=
			'Kern information will only be exported to SVG Fonts. This is a limitation of the library we use to write OTF files.<br><br>';
		content +=
			'If you really need kern information in an OTF file, first export your project to an SVG Font, then use an online service to ';
		content += 'convert your SVG Font to an OTF Font.';
		content += '</div>';
	}

	// debug(' makePanel_KerningAttributes - END\n');
	return content;
}

function makeOneKernPairRow(k, id) {
	var selstyle = '';
	if (getSelectedKernID() === id)
		selstyle = 'style="background-color:' + _UI.colors.blue.l55 + '; ';

	var re = '<table class="kernrow"><tr>';
	re +=
		'<td class="selkern" ' +
		selstyle +
		'onclick="selectKern(\'' +
		id +
		'\');"></td>';
	re +=
		'<td><input class="rowleftgroup" type="text" onchange="updateKernGroup(\'' +
		id +
		"', 'left', this.value);\" value=\"" +
		hexToChars(k.leftgroup.join('')) +
		'"></td>';
	re +=
		'<td><input class="rowrightgroup" type="text" onchange="updateKernGroup(\'' +
		id +
		"', 'right', this.value);\" value=\"" +
		hexToChars(k.rightgroup.join('')) +
		'"></td>';
	re +=
		'<td><input class="kernvalue" type="number" id="' +
		id +
		'" value="' +
		k.value +
		'" onchange="_UI.focuselement=this.id; updateKernValue(\'' +
		id +
		'\', this.value);"></td>';
	re +=
		'<td><button class="guideremove" onclick="deleteKernPair(\'' +
		id +
		'\');">&times</button></td>';

	re += '</tr></table>';
	return re;
}

function addCommonKernPairs() {
	var add = [
		'A',
		'VWY',
		'A',
		'CO',
		'VWY',
		'A',
		'FP',
		'A',
		'O',
		'A',
		'L',
		'TVW',
	];
	var nid;

	for (var k = 0; k < add.length; k += 2) {
		nid = generateNewID(_GP.kerning, 'kern');
		_GP.kerning[nid] = new HKern({
			leftgroup: parseKernGroupInput(add[k]),
			rightgroup: parseKernGroupInput(add[k + 1]),
		});
	}

	_UI.selectedkern = getFirstID(_GP.kerning);
	redraw({ calledby: 'addCommonKernPairs' });
}

function updateKernValue(id, val) {
	// debug('\n updateKernValue - START');
	// debug('id: ' + id);
	// debug('value: ' + val);
	var k = _GP.kerning[id];
	val = parseFloat(val);
	val = val ? val : 0;
	k.value = val;
	// selectKern(id);
	getEditDocument().getElementById(id).value = val;
	redraw({ calledby: 'updateKernValue' });
	history_put(k.getName() + ' value: ' + val);
	// debug(' updateKernValue - END \n');
}

function updateKernGroup(id, side, val) {
	var k = _GP.kerning[id];
	var newValue = parseKernGroupInput(val);

	if (!newValue) {
		showErrorMessageBox('Kern group cannot be empty.');
		redraw({ calledby: 'updateKernGroup' });
		return;
	}

	if (side === 'left') k.leftgroup = newValue;
	else if (side === 'right') k.rightgroup = newValue;
	selectKern(id);
	history_put('Updated Members: ' + k.getName());
}

function selectKern(id) {
	_UI.selectedkern = id;
	setDefaultViewForWorkItem();
	redraw({ calledby: 'selectKern' });
}

function showNewKernPairDialog() {
	var con = '<h1>New Kern Pair</h1>';
	con += '<div style="width:500px;">';
	con +=
		'Create a new kern pair by specifying a glyph for the left and right sides. ';
	con +=
		'Each side of the kern pair can also be a group of glyphs.  When any glyph from the left side is displayed before any glyph in the right side, the pair will be kerned.<br><br>';
	con +=
		'Glyphs can also be specified in Unicode format (like U+0066) or hexadecimal format (like 0x0066). ';
	con +=
		'Hexadecimal, Unicode, and regular glyph formats cannot be mixed - choose one type!<br><br>';
	con += '<h3>Kern Pair Glyphs</h3>';
	con +=
		'<input type="text" id="leftgroup" style="font-size:24px; width:45%; padding:8px; text-align:right;"/>';
	con +=
		'<input type="text" id="rightgroup" style="font-size:24px; width:45%; padding:8px;"/><br>';
	con += makeErrorMessageBox();
	con += '<br>';
	con +=
		'<button class="buttonsel" onclick="createNewKernPair();">create new kern pair</button>';

	con += '</div>';

	openDialog(con);
}

function checkForDuplicateKernPairs() {
	var kp = makeFlatKernPairsList();
	var results = [];

	for (var k in kp) {
		if (kp.hasOwnProperty(k)) {
			if (kp[k].values.length > 1) {
				results.push(
					'<tr><td>' +
						hexToChars(kp[k].left) +
						'</td><td>' +
						hexToChars(kp[k].right) +
						'</td><td>' +
						kp[k].values.toString() +
						'</td></tr>'
				);
			}
		}
	}

	if (results.length === 0) {
		showToast('No duplicate kern pairs found!');
	} else {
		var content = '<h3> Duplicate kern pairs found</h3>';
		content += '<table><tr><td colspan="2"><i>Kern pair&emsp;&emsp;</i></td><td><i>Duplicate values</i></td></tr>';
		results.forEach(function (item) {
			content += item;
		});
		content += '</table>';
		content = content.replaceAll(',', ', ');
		openDialog(content);
	}
}

function makeFlatKernPairsList() {
	var kp = _GP.kerning;
	var flatList = {};
	var id;

	for (var k in kp) {
		if (kp.hasOwnProperty(k)) {
			for (var lg = 0; lg < kp[k].leftgroup.length; lg++) {
				for (var rg = 0; rg < kp[k].rightgroup.length; rg++) {
					id = '' + kp[k].leftgroup[lg] + kp[k].rightgroup[rg];
					if (flatList[id]) {
						flatList[id].values.push(kp[k].value);
					} else {
						flatList[id] = {
							left: kp[k].leftgroup[lg],
							right: kp[k].rightgroup[rg],
							values: [kp[k].value],
						};
					}
				}
			}
		}
	}

	return flatList;
}

function createNewKernPair() {
	var l = parseKernGroupInput(document.getElementById('leftgroup').value);
	var r = parseKernGroupInput(document.getElementById('rightgroup').value);

	if (!l || !l.length)
		showErrorMessageBox('The left kern group cannot be empty.');
	else if (!r || !r.length)
		showErrorMessageBox('The right kern group cannot be empty.');
	else {
		var id = generateNewID(_GP.kerning, 'kern');

		_GP.kerning[id] = new HKern({ leftgroup: l, rightgroup: r });

		closeDialog();
		_UI.selectedkern = id;
		redraw({ calledby: 'createNewKernPair' });
	}
}

function parseKernGroupInput(chars) {
	chars = trim(chars);
	chars = parseUnicodeInput(chars);
	if (chars === false) return false;
	chars = chars.filter(function (elem, pos) {
		return chars.indexOf(elem) === pos;
	});
	return chars;
}

function deleteKernPair(id) {
	var k = _GP.kerning[id];
	showToast('Deleted ' + k.getName());

	delete _GP.kerning[id];
	_UI.selectedkern = getFirstID(_GP.kerning);
	redraw({ calledby: 'deleteKernPair' });
}
