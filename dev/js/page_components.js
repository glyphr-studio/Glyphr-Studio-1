// start of file
/**
	Page > Components
	HTML and associated functions for this page.
**/


	function loadPage_components(){
		// debug("LOADING PAGE >> loadPage_components");

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		clickEmptySpace();
		_UI.selectedtool = 'pathedit';

		redraw("loadPage_components");
	}

// end of file