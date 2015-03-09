// start of file

	function loadPage_components(){
		// debug("LOADING PAGE >> loadPage_components");

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedshape = -1;
		_UI.selectedtool = 'pathedit';

		redraw("loadPage_components");
	}


//-------------------
// REDRAW
//-------------------

	function redraw_Components(calledby){
		// debug('\n redraw_Components - START');
		// debug('\t Called By: ' + calledby + ' - Shown Component: ' + _UI.selectedcomponent + ' - Selected Shape: ' + _UI.selectedshape);
		_UI.redrawing = true;

		drawGrid();
		drawGuides();

		var sc = getSelectedGlyph();

		if(sc) sc.drawShape_Single(_UI.chareditctx);

		if(_GP.components[_UI.selectedshape]) {
			_GP.components[_UI.selectedshape].shape.drawSelectOutline(false, _UI.colors.green.l65);
		}

		_UI.redrawing = false;
		// debug(' redraw_Components - END\n');
	}

// end of file