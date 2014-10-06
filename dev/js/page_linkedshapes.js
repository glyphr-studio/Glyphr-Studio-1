// start of file

	function loadPage_linkedshapes(){
		// debug("LOADING PAGE >> loadPage_linkedshapes");
		
		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedshape = -1;
		_UI.selectedtool = 'pathedit';

		redraw("loadPage_linkedshapes");
	}


//-------------------
// REDRAW
//-------------------

	function redraw_LinkedShapes(calledby){
		// debug('\n redraw_LinkedShapes - START');
		// debug('\t Called By: ' + calledby + ' - Shown Linked Shape: ' + _UI.selectedlinkedshape + ' - Selected Shape: ' + _UI.selectedshape);

		_UI.redrawing = true;

		drawGrid();
		drawGuides();

		var sc = getSelectedChar();

		if(sc) sc.drawShape_Single(_UI.chareditctx);

		if(_GP.linkedshapes[_UI.selectedshape]) {
			_GP.linkedshapes[_UI.selectedshape].shape.drawSelectOutline();
		}

		_UI.redrawing = false;

		// debug(' redraw_LinkedShapes - END\n');
	}

// end of file