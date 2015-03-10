// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_glyphedit(){
		// debug('\n loadPage_glyphedit - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = 'pathedit';

		_UI.selectedshape = -1;
		if(_UI.devmode && isval(_UI.devselectedshape)){
			_UI.selectedshape = _UI.devselectedshape;
			_UI.devselectedshape = false;
		}

		if(_UI.selectedglyph.length > 6) _UI.selectedglyph = getFirstGlyphID();

		redraw("loadPage_glyphedit");
		
		// debug(' loadPage_glyphedit - END\n');
	}


//-------------------
// Redraw
//-------------------
	function redraw_GlyphEdit(){
		// debug('\n redraw_GlyphEdit - START');
		_UI.redrawing = true;
		
		var sc = getSelectedGlyph();
		if(sc) sc.calcGlyphMaxes();

		drawGrid();
		drawGuides();

		// load char info
		if(sc) sc.drawGlyphToArea(_UI.glypheditctx, getView('Redraw'));

		// Finish up
		var s = ss('Redraw');
		if(s) {
			if(s.link) _UI.selectedtool = 'shaperesize';
			s.drawSelectOutline((s.link !== false), false);
		}

		if(_UI.eventhandlers.hoverpoint){
			var hp = _UI.eventhandlers.hoverpoint;
			_UI.glypheditctx.fillStyle = hp.fill;
			_UI.glypheditctx.fillRect(hp.x, hp.y, hp.size, hp.size);
		}
		
		_UI.redrawing = false;
	}

// end of file