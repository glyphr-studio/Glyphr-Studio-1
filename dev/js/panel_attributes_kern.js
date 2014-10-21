// start of file

//	------------------------
//	KERN ATTRIBUTES
//	------------------------

	function makePanel_KerningAttributes() {
		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">Pairs</h1>';
		content += '</div>';

		content += '<div class="panel_section">';
		var rows = '';
		for(var k in _GP.kerning){ if(_GP.kerning.hasOwnProperty(k)){
			rows += makeOneKernPairRow(_GP.kerning[k], k);
		}}
		content += rows || 'No kern pairs exist yet.  You can create a new one, or add some common kern pairs to get started.';
		content += '</div>';

		content += '<div class="panel_section">';
		content += '<button onclick="showNewKernPairDialog();">add new kern pair</button><br>';
		if(!rows) content += '<button onclick="addCommonKernPairs();">add some common kern pairs</button>';
		content += '</div>';

		return content;
	}

	function makeOneKernPairRow(k, id) {
		var selstyle = '';
		if(getSelectedKernID() === id) selstyle = ('style="background-color:'+_UI.colors.accent_55+'; ');

		var re = '<table class="kernrow"><tr>';
		re += '<td class="selkern" '+selstyle+'onclick="selectKern(\''+id+'\');"></td>';
		re += '<td><input class="rowleftgroup" type="text" onchange="updateKernGroup(\''+id+'\', \'left\', this.value);" value="' + hexToChar(k.leftgroup.join('')) + '"></td>';
		re += '<td><input class="rowrightgroup" type="text" onchange="updateKernGroup(\''+id+'\', \'right\', this.value);" value="' + hexToChar(k.rightgroup.join('')) + '"></td>';
		re += '<td><input class="kernvalue" type="number" value="' + k.value + '" onchange="updateKernValue(\''+id+'\', this.value);"></td>';
		re += '<td><button class="guideremove" onclick="deleteKernPairConfirm(\''+id+'\');">&times</button></td>';

		re += '</tr></table>';
		return re;
	}

	function addCommonKernPairs() {
		var add = ['A','VWY', 'A','CO', 'VWY','A', 'FP','A', 'O','A'];
		var nid;

		for(var k=0; k<add.length; k+=2){
			nid = generateNewID(_GP.kerning);
			_GP.kerning[nid] = new HKern({'leftgroup':parseKernGroupInput(add[k]), 'rightgroup':parseKernGroupInput(add[k+1])});
		}

		_UI.selectedkern = getFirstID(_GP.kerning);
		redraw();
	}

	function updateKernValue(id, val) {
		_GP.kerning[id].value = val;
		redraw();
	}

	function updateKernGroup(id, side, val){
		if(side === 'left') _GP.kerning[id].leftgroup = parseKernGroupInput(val);
		else if(side === 'right') _GP.kerning[id].rightgroup = parseKernGroupInput(val);
		selectKern(id);
	}

	function selectKern(id) {
		_UI.selectedkern = id;
		redraw();
	}

	function showNewKernPairDialog() {
		var con = '<h1>New Kern Pair</h1>';
		con += '<div style="width:500px;">';
		con += 'Create a new kern pair by specifying a character for the left and right sides. ';
		con += 'Each side of the kern pair can also be a group of characters.  When any character from the left side is displayed before any character in the right side, the pair will be kerned.<br><br>';
		con += 'Characters can also be specified in Unicode format (like U+0066) or hexadecimal format (like 0x0066). ';
		con += 'Hexadecimal, Unicode, and regular character formats cannot be mixed - choose one type!<br><br>';
		con += '<h3>Kern Pair Characters</h3>';
		con += '<input type="text" id="leftgroup" style="font-size:24px; width:45%; padding:8px; text-align:right;"/>';
		con += '<input type="text" id="rightgroup" style="font-size:24px; width:45%; padding:8px;"/><br>';
		con += makeErrorMessageBox();
		con += '<br>';
		con += '<button class="buttonsel" onclick="createNewKernPair();">create new kern pair</button>';
		con += '</div>';

		openDialog(con);
	}

	function createNewKernPair() {
		var l = parseKernGroupInput(document.getElementById('leftgroup').value);
		var r = parseKernGroupInput(document.getElementById('rightgroup').value);

		if(!l || !l.length) showErrorMessageBox('The left kern group cannot be empty.');
		else if(!r || !r.length) showErrorMessageBox('The right kern group cannot be empty.');
		else {

			var id = generateNewID(_GP.kerning, 'kern');

			_GP.kerning[id] = new HKern({'leftgroup':l, 'rightgroup':r});

			closeDialog();
			_UI.selectedkern = id;
			redraw();
		}
	}

	function parseKernGroupInput(chars) {
		chars = trim(chars);
		chars = parseUnicodeInput(chars);
		if(chars === false) return false;
		chars = chars.filter(function(elem, pos) { return chars.indexOf(elem) === pos;});
		return chars;
	}

	function deleteKernPairConfirm(id) {
		var k = _GP.kerning[id];
		var con = '<h1>Delete Kern Pair</h1>';
		con += 'Are you sure you want to remove the kern pair:<br><br>';
		con += k.leftgroup.join('');
		con += '<span style="color:'+_UI.colors.gray_80+'">&ensp;|&ensp;</span>';
		con += k.rightgroup.join('');
		con += '<br><br>';
		con += '<button class="buttonsel" onclick="delete _GP.kerning[\''+id+'\']; _UI.selectedkern = getFirstID(_GP.kerning); closeDialog(); redraw();">Delete Kern Pair</button>';
		con += '<button onclick="closeDialog();">Cancel</button>';

		openDialog(con);
	}

// end of file