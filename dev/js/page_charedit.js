// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){
		// debug('\n loadPage_charedit - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = 'pathedit';

		_UI.selectedshape = -1;
		if(_UI.devmode && isval(_UI.devselectedshape)){
			_UI.selectedshape = _UI.devselectedshape;
			_UI.devselectedshape = false;
		}

		if(_UI.selectedchar.length > 6) _UI.selectedchar = getFirstCharID();

		redraw("loadPage_charedit");
		
		// debug(' loadPage_charedit - END\n');
	}


//-------------------
// Redraw
//-------------------
	function redraw_CharacterEdit(){
		// debug('\n redraw_CharacterEdit - START');
		_UI.redrawing = true;
		
		var sc = getSelectedChar();
		if(sc) sc.calcCharMaxes();

		drawGrid();
		drawGuides();

		// load char info
		if(sc) sc.drawCharToArea(_UI.chareditctx, getView('Redraw'));

		// Finish up
		var s = ss('Redraw');
		if(s) {
			if(s.link) _UI.selectedtool = 'shaperesize';
			s.drawSelectOutline((s.link !== false), false);
		}

		if(_UI.eventhandlers.hoverpoint){
			var hp = _UI.eventhandlers.hoverpoint;
			_UI.chareditctx.fillStyle = hp.fill;
			_UI.chareditctx.fillRect(hp.x, hp.y, hp.size, hp.size);
		}
		
		_UI.redrawing = false;
	}

// end of file