// start of file
/**
	Page > Glyph Edit
	HTML and associated functions for this page.
**/


	function loadPage_glyphedit(){
		// debug('\n loadPage_glyphedit - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();
		clickEmptySpace();
		
		if(_UI.devmode && isval(_UI.devselectedshape)){
			selectShape(_UI.devselectedshape);
			_UI.devselectedshape = false;
		}

		_UI.selectedglyph = _UI.selectedglyph || getFirstGlyphID();
		
		if(getSelectedWorkItemShapes().length > 0)	_UI.selectedtool = 'pathedit';
		else _UI.selectedtool = 'pathaddpoint';

		redraw({calledby:'loadPage_glyphedit'});
		
		// debug(' loadPage_glyphedit - END\n');
	}


//-------------------
// Redraw
//-------------------
	function redraw_GlyphEdit(){
		// debug('\n redraw_GlyphEdit - START');
		_UI.redrawing = true;
		
		var sg = getSelectedWorkItem();
		var editmode = getEditMode();

		if(sg) sg.calcGlyphMaxes();
		// debug('\t Selected WI ' + sg.name);

		// draw grids
		drawGrid();
		drawGuides();

		// load char info
		if(sg && sg.shapes.length) {
			// _UI.debug = true;
			// debug('========  START GLYPH DRAWING TO CANVAS  ==========');
			sg.drawGlyph(_UI.glypheditctx, getView('Redraw'));
			// debug('========  END OF GLYPH DRAWING TO CANVAS ==========\n\n');
			// _UI.debug = false;
		} else {
			_UI.redrawing = false;
			return;
		}

		_UI.ms.shapes.draw_PathOutline();
		
		if(editmode === 'pointer'){
			_UI.ms.shapes.draw_BoundingBox();
			_UI.ms.shapes.draw_BoundingBoxHandles();

		} else if (editmode === 'rotate'){
			_UI.ms.shapes.draw_RotationAffordance();

		} else if (editmode === 'pen'){
			if(_UI.eventhandlers.multi) sg.draw_MultiSelectAffordances();
			_UI.ms.points.draw_PathPointHandles();
			_UI.ms.shapes.draw_PathPoints();
			// _UI.ms.points.draw_PathPoints();

			if(_UI.eventhandlers.hoverpoint){
				var hp = _UI.eventhandlers.hoverpoint;
				_UI.glypheditctx.fillStyle = hp.fill;
				_UI.glypheditctx.fillRect(hp.x, hp.y, hp.size, hp.size);
			}

		} else if (editmode === 'newpath'){
			_UI.ms.points.draw_PathPointHandles();
			_UI.ms.shapes.draw_PathPoints();
			// _UI.ms.points.draw_PathPoints();
		}
		
		_UI.redrawing = false;
		// debug(' redraw_GlyphEdit - END\n');
	}

// end of file