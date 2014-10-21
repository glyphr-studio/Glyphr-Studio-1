// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_ligatures(){

		// debug("LOADING PAGE >> ligatures");

		getEditDocument().getElementById("mainwrapper").innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = "pathedit";
		if(_UI.selectedchar.length < 7) _UI.selectedchar = getFirstID(_GP.ligatures);

		redraw("loadPage_ligatures");
	}

	function showNewLigatureDialog() {
		var con = '<h1>New Ligature</h1>';
		con += '<div style="width:500px;">';
		con += 'Create a new ligature by specifying two or more individual characters that will make up the ligature (like ff).<br><br>';
		con += 'Ligature characters can also be specified in Unicode format (like U+0066U+0066) or hexadecimal format (like 0x00660x0066). ';
		con += 'Hexadecimal, Unicode, and regular character formats cannot be mixed - choose one type!<br><br>';
		con += '<h3>Ligature Characters</h3>';
		con += '<input type="text" id="newligatureinput" style="font-size:24px; padding:8px;"/><br>';
		con += makeErrorMessageBox();
		con += '<br>';
		con += '<button class="buttonsel" onclick="createNewLigature();">create new ligature</button>';
		con += '</div>';

		openDialog(con);
	}

	function createNewLigature() {
		// debug('\n createNewLigature - START');
		var lid = document.getElementById('newligatureinput').value;
		// debug('\t retrieved ' + lid);
		lid = lid.replace(/\s/gi, '');
		lid = parseUnicodeInput(lid);
		if(lid) lid = lid.join('');
		else {
			showErrorMessageBox('Ligatures must be at least two characters.'); 
			return;
		}
			

		// debug('\t parsed ' + lid);

		var lig = _GP.ligatures;

		if(lig[lid]){
			showErrorMessageBox('Ligature allready exists.');
		} else if (lig === false || lid.length < 2){
			showErrorMessageBox('Ligatures must be at least two characters.');
		} else {
			lig[lid] = new Char({'charhex':lid});
			sortLigatures();
			_UI.selectedchar = lid;
			navigate();
			closeDialog();
		}
	}

	function deleteLigatureConfirm(){
		var content = "<h1>Delete Ligature</h1>Are you sure you want to delete this ligature?<br>";
		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><button onclick='deleteLigature();'>permanently delete this ligature</button> &nbsp; <button onclick='closeDialog();'>cancel</button>";

		openDialog(content);
	}

	function deleteLigature(){
		// debug('\n deleteLigature - START');
		// debug('\t deleting ' + _UI.selectedchar);

		closeDialog();
		delete _GP.ligatures[_UI.selectedchar];
		_UI.selectedchar = getFirstID(_GP.ligatures);
		navigate();

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
			if(a.id.length === b.id.length){
				if (a.id > b.id) return 1;
				if (a.id < b.id) return -1;
			} else {
				return a.id.length - b.id.length;
			}
		});

		_GP.ligatures = {};

		for(var s=0; s<sortarr.length; s++){
			temp = sortarr[s];
			_GP.ligatures[temp.id] = temp.ligature;
		}

		return sortarr;
	}

// end of file