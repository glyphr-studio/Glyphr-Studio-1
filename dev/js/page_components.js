// start of file
/**
	Page > Components
	HTML and associated functions for this page.
**/


	function loadPage_components(){
		// debug('\n loadPage_components - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();
		clickEmptySpace();
		
		if(_UI.devmode && isval(_UI.devselectedshape)){
			selectShape(_UI.devselectedshape);
			_UI.devselectedshape = false;
		}

		_UI.selectedcomponent = _UI.selectedcomponent || getFirstID(_GP.components);

		if(getSelectedWorkItemShapes().length > 0)	_UI.selectedtool = 'pathedit';
		else _UI.selectedtool = 'pathaddpoint';

		redraw("loadPage_components");
	}

// end of file