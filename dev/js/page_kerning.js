// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_kerning(){

		// debug("LOADING PAGE >> loadPage_charedit");
		getEditDocument().getElementById("mainwrapper").innerHTML = kerning_content();

		setupKerningEditCanvas();

		initEventHandlers();

		_UI.selectedtool = "pathedit";

		redraw("loadPage_charedit");
	}

	function kerning_content(){

		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>'+
			'<div id="toolsarea"> [ERROR: Uninitialized content] </div>'+
			makeFloatLogo();

		return re;
	}

	function setupKerningEditCanvas(){
		_UI.chareditcanvas = getEditDocument().getElementById("chareditcanvas");
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext("2d");
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;
	}

// end of file