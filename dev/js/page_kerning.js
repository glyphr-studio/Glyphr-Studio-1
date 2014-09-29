// start of file

	function loadPage_kerning(){

		// debug("LOADING PAGE >> loadPage_charedit");
		getEditDocument().getElementById("mainwrapper").innerHTML = kerning_content();

		setupKerningEditCanvas();

		initEventHandlers();

		_UI.selectedtool = "kern";

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


//-------------------
// REDRAW
//-------------------
	function redraw_Kerning() {
		debug('\n redraw_Kerning - START');
		_UI.redrawing = true;
		
		_UI.chareditctx.clearRect(0,0,5000,5000);
		drawGrid();
		drawGuides();

		var ch;
		var v = getView();
		var ctx = _UI.chareditctx;
		var selkern = getSelectedKern();
		debug('\t Kern Pair ' + selkern.leftgroup[0] + ' | ' + selkern.rightgroup[0]);
		
		// DRAW ALL RIGHT HAND GROUP
		ch = getChar(charToHex(selkern.rightgroup[0]));
		debug('\t got rightgroup char ' + ch.charname);
		ch.drawCharToArea(ctx, v);

		// DRAW ALL LEFT HAND GROUP
		ch = getChar(charToHex(selkern.leftgroup[0]));
		debug('\t got leftgroup char ' + ch.charname);
		v.dx -= (ch.getTotalWidth()*v.dz);
		ch.drawCharToArea(ctx, v);


		update_NavPanels();
		update_ToolsArea();

		_UI.redrawing = false;
		debug(' redraw_Kerning - END\n');		
	}
// end of file