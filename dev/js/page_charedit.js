// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){
		// debug("LOADING PAGE >> loadPage_charedit");

		getEditDocument().getElementById('mainwrapper').innerHTML = charedit_content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = 'pathedit';
		_UI.selectedshape = -1;
		if(_UI.selectedchar.length > 6) _UI.selectedchar = getFirstCharID();

		redraw("loadPage_charedit");
	}

	function charedit_content(){
		return '<canvas id="chareditcanvas" width=12 height=12 ></canvas>' +
			'<div id="toolsarea"> [ERROR: Uninitialized content] </div>' +
			makeFloatLogo();
	}


//-------------------
// Redraw
//-------------------
	function redraw_CharacterEdit(){
		// debug('\n redraw_CharacterEdit - START');

		_UI.redrawing = true;

		var sc = getSelectedChar();
		drawGrid();
		drawGuides();

		// load char info
		if(sc){
			sc.drawCharToArea(_UI.chareditctx, getView('Redraw'));
		}

		// Finish up
		var s = ss('Redraw');
		if(s) {
			s.drawSelectOutline(s.link !== false);
			if(s.link){
				_UI.selectedtool = 'shaperesize';
			}
		}

		_UI.redrawing = false;
	}

// end of file