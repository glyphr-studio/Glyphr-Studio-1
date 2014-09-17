// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_ligatures(){

		// debug("LOADING PAGE >> ligatures");

		getEditDocument().getElementById("mainwrapper").innerHTML = charedit_content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = "pathedit";
		if(_UI.selectedchar.length < 7) _UI.selectedchar = getFirstLigatureID();

		redraw("loadPage_ligatures");
	}

//-----------------------
// Char Paridy Functions
//-----------------------
	function getFirstLigatureID() {
		for(var l in _GP.ligatures){
			if(_GP.ligatures.hasOwnProperty(l)) {
				// debug('getFirstLigature - returning id for ' + _GP.ligatures[l].charname);
				return l;
			}
		}

		// debug('getFirstLigature - returning false');
		return false;
	}

// end of file