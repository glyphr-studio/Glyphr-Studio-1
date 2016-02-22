 // start of file
/**
	Page > Ligatures
	HTML and associated functions for this page.
**/


	function loadPage_ligatures(){
		// debug('\n loadPage_ligatures - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();
		clickEmptySpace();
		
		if(_UI.devmode && isval(_UI.dev_selected_shape)){
			selectShape(_UI.dev_selected_shape);
			_UI.dev_selected_shape = false;
		}

		_UI.selectedligature = _UI.selectedligature || getFirstID(_GP.ligatures);
		
		if(getSelectedWorkItemShapes().length > 0)	_UI.selectedtool = 'pathedit';
		else _UI.selectedtool = 'pathaddpoint';

		redraw({calledby:'loadPage_ligatures'});
	}

	function showNewLigatureDialog() {
		var con = '<h1>New Ligature</h1>';
		con += '<div style="width:500px;">';
		con += 'Create a new ligature by specifying two or more individual glyphs that will make up the ligature (like ff).<br><br>';
		con += 'Ligature glyphs can also be specified in Unicode format (like U+0066U+0066) or hexadecimal format (like 0x00660x0066). ';
		con += 'Hexadecimal, Unicode, and regular glyph formats cannot be mixed - choose one type!<br><br>';
		con += '<h3>Ligature Glyphs</h3>';
		con += '<input type="text" id="newligatureinput" style="font-size:24px; padding:8px;"/><br>';
		con += makeErrorMessageBox();
		con += '<br>';
		con += '<button class="buttonsel" onclick="createNewLigature();">create new ligature</button>';
		con += '</div>';

		openDialog(con);
	}

	function createNewLigature() {
		// debug('\n createNewLigature - START');
		var inlig = document.getElementById('newligatureinput').value;
		// debug('\t retrieved ' + lid);
		var lid = inlig.replace(/\s/gi, '');
		lid = parseUnicodeInput(lid);
		if(lid) lid = lid.join('');
		else {
			showErrorMessageBox('Ligatures must be at least two glyphs.');
			return;
		}


		// debug('\t parsed ' + lid);

		var lig = _GP.ligatures;

		if(lig[lid]){
			showErrorMessageBox('Ligature allready exists.');
		} else if (lig === false || lid.length < 2){
			showErrorMessageBox('Ligatures must be at least two glyphs.');
		} else {
			lig[lid] = new Glyph({'glyphhex':lid, 'name':('Ligature ' + inlig)});
			sortLigatures();
			_UI.selectedligature = lid;
			history_put('Created ' + getSelectedWorkItemName());
			navigate();
			closeDialog();
		}
	}

	function addCommonLigatures() {
		var ff = parseUnicodeInput('ff').join('');
		var fi = parseUnicodeInput('fi').join('');
		var fl = parseUnicodeInput('fl').join('');
		var ft = parseUnicodeInput('ft').join('');
		var ffi = parseUnicodeInput('ffi').join('');
		var ffl = parseUnicodeInput('ffl').join('');

		if(!_GP.ligatures[ff]) _GP.ligatures[ff] = new Glyph({'glyphhex':ff});
		if(!_GP.ligatures[fi]) _GP.ligatures[fi] = new Glyph({'glyphhex':fi});
		if(!_GP.ligatures[fl]) _GP.ligatures[fl] = new Glyph({'glyphhex':fl});
		if(!_GP.ligatures[ft]) _GP.ligatures[fl] = new Glyph({'glyphhex':ft});
		if(!_GP.ligatures[ffi]) _GP.ligatures[ffi] = new Glyph({'glyphhex':ffi});
		if(!_GP.ligatures[ffl]) _GP.ligatures[ffl] = new Glyph({'glyphhex':ffl});

		_UI.selectedglyph = getFirstID(_GP.ligatures);
		redraw({calledby:'addCommonLigatures'});
	}

	function deleteLigatureConfirm(){
		var content = '<h1>Delete Ligature</h1>';
		content += '<b style="color:'+_UI.colors.error.medium+';">This action cannot be undone!</b> &nbsp; Are you sure you want to delete this Ligature?<br><br>';
		
		var uia = getSelectedWorkItem().usedin;
		if(uia.length > 0){
			content += 'This Ligature is linked to the following Glyphs as a Component Instance:<br><ul>';

			for(var ssu=0; ssu<uia.length; ssu++){
				content += ('<li>' + getGlyphName(uia[ssu]).replace(/LATIN /gi,'') + '</li>');
			}

			content += '</ul>';
			// content += '<br>The Component Instances in these Glyphs will also be deleted.<br><br>';
		}

		content += '<br><br><button class="buttonsel" onclick="deleteLigature();">delete this ligature</button> &nbsp; <button onclick="closeDialog();">cancel</button>';

		openDialog(content);
	}

	function deleteLigature(){
		// debug('\n deleteLigature - START');
		// debug('\t deleting ' + _UI.selectedligature);

		closeDialog();

		// Delete upstream Component Instances
		getSelectedWorkItem().deleteLinks(_UI.selectedligature);
		
		// Delete it
		var oldname = getSelectedWorkItemName();
		delete _GP.ligatures[_UI.selectedligature];
		_UI.selectedligature = getFirstID(_GP.ligatures);

		// history_put('Deleted ' + oldname);

		// debug('\t after delete ' + _GP.ligatures);
		redraw({calledby:'deleteLigature'});

		// debug('deleteLigature - END\n');
	}

	function sortLigatures() {
		var temp;
		var sortarr = [];

		for(var n in _GP.ligatures) { if(_GP.ligatures.hasOwnProperty(n)){
			temp = _GP.ligatures[n];
			sortarr.push({'id':n, 'ligature':temp});
		}}

		sortarr.sort(function(a,b){
			if(a.id && b.id){
				if(a.id.length === b.id.length){
					if (a.id > b.id) return 1;
					if (a.id < b.id) return -1;
				} else {
					return b.id.length - a.id.length;
				}
			} else return 0;
		});

		_GP.ligatures = {};

		for(var s=0; s<sortarr.length; s++){
			temp = sortarr[s];
			_GP.ligatures[temp.id] = temp.ligature;
		}

		return sortarr;
	}

// end of file