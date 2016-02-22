// start of file
/**
	Framework > Edit Canvas
	The Glyph Edit, Components, Ligatures, and to
	a certain extent, Kerning pages use a common
	HTML5 Canvas mechanism for interaction.
	Common functions around this can be found here.
**/


//-------------------
// Common Edit Page
//-------------------

	function editPage_Content(){
		return ''+
			'<div id="notation">&#x20E2;</div>' +
			'<canvas id="glypheditcanvas" width=12 height=12 ></canvas>' +
			'<div id="toolsarea">(╯°□°）╯︵ ┻━┻</div>' +
			'<div id="viewarea">&nbsp;</div>' +
			makeFloatLogo();
	}

//-------------------
// REDRAW
//-------------------
	/*
		redraw
		This can be called globally to trigger a redraw of whatever page is currently active.
		It takes an optional 'calledby' variable, which is any string to identify what triggered
		the redraw, for debugging purposes.
	*/
	function redraw(oa){
		//debug('\n REDRAW - START');
		//debug('\t oa: ' + json(oa));
		oa = oa || {};
		_UI.redraw.redrawcanvas = isval(oa.redrawcanvas) ? oa.redrawcanvas : true;
		_UI.redraw.redrawpanels = isval(oa.redrawpanels) ? oa.redrawpanels : true;
		_UI.redraw.calledby = oa.calledby || '';

		if(!_UI.redraw.redrawpanels && document.getElementById('navarea_panel') && document.getElementById('navarea_panel').innerHTML === '') _UI.redraw.redrawpanels = true;

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;
		reqAniFrame(redrawUnit);
		_UI.redrawing = false;
		//debug(' REDRAW - END\n');
	}

	function reqAniFrame(fun) {
		if(_UI.popout){
			if(_UI.popout.requestAnimationFrame) _UI.popout.requestAnimationFrame(fun);
			else {
				console.warn('no requestAnimationFrame');
				fun();
			}
		} else {
			if(window.requestAnimationFrame) window.requestAnimationFrame(fun);
			else {
				console.warn('no requestAnimationFrame');
				fun();
			}
		}
	}

	function redrawUnit() {
		//debug('\n redrawUnit - START');
		//debug('\t _UI.redraw ' + json(_UI.redraw));

		if(_UI.redraw.redrawcanvas){
			_UI.glypheditctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);

			switch (_UI.current_page){
				case 'glyph edit': redraw_GlyphEdit(); break;
				case 'components': redraw_GlyphEdit(); break;
				case 'ligatures': redraw_GlyphEdit(); break;
				case 'kerning': redraw_Kerning(); break;
				case 'test drive': redraw_TestDrive(); break;
			}
		}

		if(!_UI.eventhandlers.currtool.dragging) update_ToolsArea();

		if(_UI.redraw.redrawpanels) update_NavPanels();

		if(_UI.focuselement) {
			var fe = document.getElementById(_UI.focuselement);
			if(fe) fe.focus();
		}
		_UI.focuselement = false;

		if(_UI.devmode && _UI.testOnRedraw) _UI.testOnRedraw();
		//debug(' redrawUnit - END\n');
	}


//-------------------
// Update Tools
//-------------------
	function update_ToolsArea(){
		// debug('\n update_ToolsArea - START');

		if(!onCanvasEditPage()) return;

		if(!getSelectedWorkItemID()){
			getEditDocument().getElementById("toolsarea").innerHTML = '';
			return;
		}

		var patheditclass = '';
		var pathaddpointclass = '';
		var penclickable = true;
		var penaddpointclickable = true;
		var onglyph = (_UI.current_page === 'glyph edit');
		var oncom = (_UI.current_page === 'components');
		var onlig = (_UI.current_page === 'ligatures');
		var onkern = (_UI.current_page === 'kerning');
		var type = _UI.ms.shapes.getType();

		if(_UI.selectedtool === 'pathedit'){
			patheditclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			patheditclass = 'buttondis';
			penclickable = false;
			penaddpointclickable = false;
		}

		if(_UI.selectedtool === 'pathaddpoint'){
			pathaddpointclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			pathaddpointclass = 'buttondis';
			penclickable = false;
			penaddpointclickable = false;
		}

		if(_UI.ms.shapes.count() > 1){
			pathaddpointclass = 'buttondis';
			penaddpointclickable = false;
		}

		var st = _UI.selectedtool;


		// Pop In/Out
		var pop = '';
		if(onCanvasEditPage()){
			pop += "<span style='width:15px; display:inline-block;'>&nbsp;</span>";
			if(_UI.popout){
				pop += "<button title='one screen mode' class='tool' onclick='popIn();'>"+makeToolButton({'name':'tool_popIn'})+"</button>";
			} else {
				pop += "<button title='two screen mode' class='tool' onclick='popOut();'>"+makeToolButton({'name':'tool_popOut'})+"</button>";
			}
		}

		var zoom = '';
		// Pan
		zoom += "<button title='scroll and pan' class='" + (st==='pan'? "buttonsel " : " ") + "tool' onclick='clickTool(\"pan\");'/>"+makeToolButton({'name':'tool_pan', 'selected':(st==='pan')})+"</button>";
		zoom += "<span style='width:15px; display:inline-block;'>&nbsp;</span>";
		// Zoom
		zoom += "<button title='zoom: one to one' class='tool' onclick='setView({\"dz\":1});redraw({calledby:\"updatetools\"});'>"+makeToolButton({'name':'tool_zoom1to1'})+"</button>";
		zoom += "<button title='zoom: fit to screen' class='tool' onclick='setView(clone(_UI.defaultview)); redraw({calledby:\"updatetools\"});'>"+makeToolButton({'name':'tool_zoomEm'})+"</button>";
		zoom += "<input type='number' title='zoom level' class='zoomreadout' value='" + round(getView("updatetools").dz*100, 2) + "' onchange='setViewZoom(this.value);'/>";
		zoom += "<button title='zoom: in' class='tool' onclick='viewZoom(1.1);'>"+makeToolButton({'name':'tool_zoomIn'})+"</button>";
		zoom += "<button title='zoom: out' class='tool' onclick='viewZoom(.9);'>"+makeToolButton({'name':'tool_zoomOut'})+"</button>";

		// New Shape
		var newshape = '';
		newshape += "<button title='new rectangle shape' class='" + (st==='newrect'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newrect\");'/>"+makeToolButton({'name':'tool_newRect', 'selected':(st==='newrect')})+"</button>";
		newshape += "<button title='new oval shape' class='" + (st==='newoval'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newoval\");'/>"+makeToolButton({'name':'tool_newOval', 'selected':(st==='newoval')})+"</button>";
		newshape += "<button title='new path shape' class='" + (st==='newpath'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newpath\");'/>"+makeToolButton({'name':'tool_newPath', 'selected':(st==='newpath')})+"</button>";
		newshape += "<br>";

		// Path and Shape Edit
		var edittools = '';
		edittools += "<button title='add path point' class='" + pathaddpointclass + " tool' " + (penaddpointclickable? "onclick='clickTool(\"pathaddpoint\");'":"") + "/>"+makeToolButton({'name':'tool_penPlus', 'selected':(st==='pathaddpoint'), 'disabled':!penaddpointclickable})+"</button>";
		edittools += "<button title='path edit' class='" + patheditclass + " tool' " + (penclickable? "onclick='clickTool(\"pathedit\");'":"") + "/>"+makeToolButton({'name':'tool_pen', 'selected':(st==='pathedit'), 'disabled':!penclickable})+"</button>";
		edittools += "<button title='shape edit' class='" + (st==='shaperesize'? "buttonsel " : " ") + "tool' onclick='clickTool(\"shaperesize\");'/>"+makeToolButton({'name':'tool_pointer', 'selected':(st==='shaperesize')})+"</button>";
		edittools += "<br>";
		
		// Slice
		var slice = "<button title='slice' class='" + (st==='slice'? "buttonsel " : " ") + "tool' onclick='clickTool(\"slice\");'/>"+makeToolButton({'name':'tool_slice', 'selected':(st==='slice')})+"</button>";

		// Kern
		var kern = "<button title='kern' class='" + (st==='kern'? "buttonsel " : " ") + "tool' onclick='clickTool(\"kern\");'/>"+makeToolButton({'name':'tool_kern', 'selected':(st==='kern')})+"</button>";


		// Put it all together
		var toolcontent = '';
		var viewcontent = '';

		viewcontent += zoom;
		viewcontent += pop;

		if(onglyph || onlig) toolcontent += newshape;
		var sls = getSelectedWorkItem();
		if(oncom && sls && !sls.shape) toolcontent += newshape;

		if(onglyph || oncom || onlig) {
			toolcontent += edittools;
			// toolcontent += slice;

			if(_UI.selectedtool === 'newpath'){
				toolcontent += "<div style='height:5px;'>&nbsp;</div>";
				toolcontent += "<button class='buttonsel' style='width:94px; font-size:.8em; padding:2px;' title='done editing path' onclick='clickTool(\"pathedit\");'>done editing path</button>";
			}
		}

		if(onkern) toolcontent += kern;

		if(_GP.projectsettings.showkeyboardtipsicon) toolcontent += '<button title="keyboard and mouse tips" onclick="toggleKeyboardTips();" id="keyboardtips">'+makeIcon({'name':'keyboard', 'size':50, 'color':'rgb(229,234,239)'})+'</button>';

		getEditDocument().getElementById("toolsarea").innerHTML = toolcontent;
		getEditDocument().getElementById("viewarea").innerHTML = viewcontent;
	}

	function clickTool(ctool){
		// debug('\n clickTool - START');
		_UI.selectedtool = ctool;

		// debug('\t passed: ' + ctool + ' and _UI.selectedtool now is: ' + _UI.selectedtool);

		_UI.eventhandlers.eh_addpath.firstpoint = true;

		if(ctool === 'newrect'){
			setCursor('crosshairsSquare');
			clickEmptySpace();
		} else if (ctool === 'newoval'){
			setCursor('crosshairsCircle');
			clickEmptySpace();
		} else if (ctool === 'newpath'){
			setCursor('penPlus');
			clickEmptySpace();
		} else if(ctool === 'pathedit'){
			setCursor('pen');
		} else if(ctool === 'slice'){
			setCursor('slice');
		} else if (ctool === 'shaperesize'){
			setCursor('pointer');
			// _UI.ms.shapes.calcMaxes();
		}

		_UI.eventhandlers.hoverpoint = false;
		closeNotation();
		// updateCursor();

		redraw({calledby:'clicktool', redrawpanels: false});
	}

	function updateCursor(tool){
		tool = tool || _UI.selectedtool;

		// debug('\n updateCursor - START');
		// debug('\t tool = ' + tool);

		if(_UI.eventhandlers.ismouseovercec){
			if(tool === 'newrect'){
				// debug('\t setting cursor to crosshairsSquare');
				setCursor('crosshairsSquare');

			} else if (tool === 'newoval'){
				// debug('\t setting cursor to crosshairsCircle');
				setCursor('crosshairsCircle');

			} else if (tool === 'shaperesize'){
				// debug('\t shaperesize :: not setting cursor');
				// Handled by eventHandler

			} else if (tool === 'newpath'){
				// debug('\t setting cursor to penPlus');
				setCursor('penPlus');

			} else if (tool === 'pathedit'){
				// debug('\t setting cursor to pen');
				setCursor('pen');

			} else if (tool === 'pathaddpoint'){
				// debug('\t setting cursor to pen');
				setCursor('penPlus');

			} else if (tool === 'slice'){
				// debug('\t setting cursor to slice');
				setCursor('slice');

			} else if (tool === 'pan'){
				// debug('\t setting cursor to move');
				setCursor('move');

			} else if (tool === 'kern'){
				// debug('\t setting cursor to col-resize');
				setCursor('col-resize');

			} else {
				// debug('\t defaulting cursor to pointer');
				setCursor('pointer');

			}
		} else {
			// debug('\t NOT ON EDIT CANVS setting cursor to default');
			setCursor('default');
		}

		// debug(' updateCursor - END\n');
	}

	function setCursor(name) {
		// debug('\n setCursor - START');
		// debug('\t passed ' + name);
		var cur = ['auto','default','none','context-menu','help','pointer','progress','wait','cell','crosshair','text','vertical-text','alias','copy','move','no-drop','not-allowed','e-resize','n-resize','ne-resize','nw-resize','s-resize','se-resize','sw-resize','w-resize','ew-resize','ns-resize','nesw-resize','nwse-resize','col-resize','row-resize','all-scroll','zoom-in','zoom-out','grab','grabbing'];

		if(cur.indexOf(name+'-resize') > -1){
			if(canResize(name)) name+='-resize';
			// debug('\t SET -resize CURSOR');
		}

		getEditDocument().body.style.cursor = 'auto';
		
		if(_UI.cursors[name]){
			getEditDocument().body.style.cursor = _UI.cursors[name];
			// debug('\t SET CUSTOM CURSOR:\t'+name);
		} else if (cur.indexOf(name) > -1) {
			getEditDocument().body.style.cursor = name;
			// debug('\t SET BUILT-IN CURSOR:\t'+name);
		} else {
			// debug('\t DEFAULT TO auto');
		}

		// debug(' setCursor - END\n');
	}

	function getEditMode() {
		var tool = _UI.selectedtool;
		if(tool === 'pan') tool = _UI.eventhandlers.lastTool;

		if(tool === 'newrect' || tool === 'newoval')	return 'newbasicshape';
		else if (tool === 'newpath')	return 'newpath';
		else if (tool === 'shaperesize')	return _UI.eventhandlers.handle === 'rotate'? 'rotate' : 'pointer';
		else if (tool === 'pathedit' || tool === 'pathaddpoint')	return 'pen';
		else if (tool === 'kern')	return 'kern';
	}

	function mouseovercec() {
		// debug('\n mouseovercec - START');
		_UI.eventhandlers.ismouseovercec = true;
		updateCursor();
		// debug(' mouseovercec - END\n');
	}

	function mouseoutcec() {
		// debug('\n mouseoutcec - START');
		_UI.eventhandlers.ismouseovercec = false;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {};
		updateCursor();
		// debug(' mouseoutcec - END\n');
	}

	function toggleKeyboardTips(){

		if(document.getElementById('dialog_box').style.display==='block'){
			closeDialog();
		} else {
			var con = '<h1>Keyboard and Mouse Shortcuts</h1>';

			con += makeKeyboardShortcutsTable();

			con += '<table><tr><td style="vertical-align:top; padding:20px 10px 0px 0px;">'+
				checkUI('_GP.projectsettings.showkeyboardtipsicon', _GP.projectsettings.showkeyboardtipsicon)+
			'</td><td style="vertical-align:top; padding:20px 10px 0px 0px;">'+
				'<label style="position:relative; top:-5px;" for="showkeyboardtipsicon">show the &nbsp;<span style="position:relative; top:6px;">'+makeIcon({'name':'keyboard', 'size':50, 'width':22, 'height':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+'</span>&nbsp; button</label>'+
			'</td></tr></table>';

			openDialog(con);
		}
	}

	function makeKeyboardShortcutsTable() {
			var con = "<table style='margin:20px 40px 40px 0px;'><tr><td colspan=2>"+

			"<table>"+
			"<tr><td class='keycol'><span class='keycallout'>?</span></td><td>toggles this shortcuts dialog</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Studio Project file</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>e</span></td><td>export an Open Type font file</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>g</span></td><td>export a SVG font file</td></tr>"+
			"</table>"+

			"</td></tr><tr><td>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse click</span></td><td>multi-select shapes or points</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>c</span></td><td>copy selected shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>v</span></td><td>paste shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>z</span></td><td>undo</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout' style='margin-bottom:5px;'>backspace</span><br>or <span class='keycallout'>delete</span></td><td>delete selected shape<br>or path point</td></tr>"+
			"<tr><td class='keycol'>"+
			"<span class='arrow' style='margin-right:24px;'>&#x21E7;</span><br>"+
			"<span class='arrow'>&#x21E6;</span>"+
			"<span class='arrow'>&#x21E9;</span>"+
			"<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>"+
			"</td><td>nudges the selected shape<br>or point "+_GP.projectsettings.spinnervaluechange+" em units</td></tr>"+
			"</table>"+

			"</td><td style='padding-left:40px;'>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>edit canvas:</h3></td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>spacebar</span></td><td>pan the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>v</span></td><td>select the shape edit arrow tool</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>b</span></td><td>select the path edit pen tool</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse wheel</span></td><td>zoom the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>+</span></td><td>zoom in the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>&ndash;</span></td><td>zoom out the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>0</span></td><td>reset edit canvas zoom</td></tr>"+
			"</table>"+

			"</td></tr></table>";

			return con;
	}

//-------------------
// VIEW
//-------------------

	function setView(oa){

		var sc = (_UI.current_page === 'kerning')? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			//debug('SETVIEW - char ' + sc + ' has no existing view, setting to default.');
			v[sc] = getView('setView');
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

		//debug('SETVIEW - passed ' + JSON.stringify(oa) + ' selectedglyph ' + _UI.selectedglyph + ' VIEWS is\n' + JSON.stringify(_UI.views));
	}

	function getView(calledby){
		//debug('GETVIEW - called by ' + calledby);
		var onkern = (_UI.current_page === 'kerning');
		var sc = onkern? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;

		if(isval(v[sc])){
			//debug('GETVIEW - char ' + sc + ' HAS an existing value, returning \n' + JSON.stringify(v[sc]));
			return clone(v[sc]);
		} else {
			//debug('GETVIEW - char ' + sc + ' HAS NO EXISTING value, returning default');
			return onkern? clone(_UI.defaultkernview) : clone(_UI.defaultview);
		}
	}

	function viewZoom(zfactor){
		var v = getView();
		var deltax = (_UI.eventhandlers.mousex-v.dx);
		var deltay = (_UI.eventhandlers.mousey-v.dy);

		setView({
			'dz' : round(v.dz*=zfactor, 2),
			'dx' : (_UI.eventhandlers.mousex-(deltax*zfactor)),
			'dy' : (_UI.eventhandlers.mousey-(deltay*zfactor))
		});

		redraw({calledby:'viewZoom', redrawpanels:false});
	}

	function setViewZoom(zoom){
		zoom /= 100;
		var v = getView();

		setView({
			'dz' : round(zoom, 2),
			'dx' : v.dx,
			'dy' : v.dy
		});

		redraw({calledby:'setViewZoom', redrawpanels:false});
	}

	function resetThumbView(){

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			'dx' : _UI.thumbgutter,
			'dy' : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			'dz' : zoom
		};

		//debug('RESETTHUMBVIEW - set to \n' + JSON.stringify(_UI.thumbview));
	}

	function calculateDefaultView() {
		if(_GP.projectsettings.upm > 2000){
			_UI.defaultview = {'dx':200, 'dy':550, 'dz':0.3};
			_UI.defaultkernview = {'dx':400, 'dy':400, 'dz':0.2};
		}
	}



//	-----------------------------------------------
//	Convert between Saved values and Canvas values
//	-----------------------------------------------
	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var v = getView('sx_cx');
		var canvasx = v.dx;
		canvasx += (sx*v.dz);
		return canvasx || v.dx;
	}

	function sy_cy(sy){
		var v = getView('sy_cy');
		var canvasy = v.dy;
		canvasy -= (sy*v.dz);
		return canvasy || v.dy;
	}

	//convert canvas x-y inputs to saved shape x-y
	function cx_sx(cx){
		var v = getView('cx_sx');
		return ((cx-v.dx)/(v.dz));
	}

	function cy_sy(cy){
		var v = getView('cy_sy');
		return ((v.dy-cy)/(v.dz));
	}



//	------------------------------------------
//	Global Get Selected Glyph and Shape
//	------------------------------------------

	function existingWorkItem() {
		var len = 0;
		var nph = _UI.current_panel;

		if(_UI.current_page === 'ligatures'){
			len = getLength(_GP.ligatures);
			if(!len){
				_UI.selectedligature = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.current_page === 'components'){
			len = getLength(_GP.components);
			if(!len){
				_UI.selectedcomponent = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.current_page === 'kerning'){
			len = getLength(_GP.kerning);
			if(!len){
				_UI.selectedkern = false;
				if(nph !== 'npNav') nph = 'npAttributes';
				return false;
			}
		}

		return true;
	}

	function getSelectedWorkItem(){
		// debug('\n getSelectedWorkItem - START');
		// debug('\t current_page: ' + _UI.current_page);
		var re;

		switch(_UI.current_page){
			case 'glyph edit':
			case 'import svg':
				re = getGlyph(_UI.selectedglyph, true);
				// debug('\t case glyph edit, returning ' + re.name);
				return re;
			case 'ligatures':
				re = getGlyph(_UI.selectedligature, true);
				// debug('\t case glyph edit, returning ' + re.name);
				return re;
			case 'components':
				re = getGlyph(_UI.selectedcomponent, false);
				// debug('\t case components, returning ' + re.name);
				return re;
			case 'kerning':
				// debug('\t case KERN - selkern = ' + _UI.selectedkern);
				if(!_UI.selectedkern) {
					_UI.selectedkern = getFirstID(_GP.kerning);
					// debug('\t no selected kern, setting to ' + _UI.selectedkern);
				}
				re = _GP.kerning[_UI.selectedkern] || false;
				// debug('\t case kerning, returning ' + re);
				return re;
		}

		return false;
	}

	function getSelectedWorkItemID(){
		switch(_UI.current_page){
			case 'glyph edit':
			case 'import svg':	return _UI.selectedglyph;
			case 'ligatures':	return _UI.selectedligature;
			case 'components':	return _UI.selectedcomponent;
			case 'kerning':	return _UI.selectedkern;
		}

		return false;
	}

	function getSelectedWorkItemName(){
		// debug('\n getSelectedWorkItemName - START');
		var wi = getSelectedWorkItem();
		// debug('\t wi = '+wi);
		return wi.name || wi.getName() || '[name not found]';
	}

	function getSelectedWorkItemShapes(){
		//debug('GETSELECTEDGLYPHSHAPES');
		var rechar = getSelectedWorkItem();
		return rechar? rechar.shapes : [];
	}

	function markSelectedWorkItemAsChanged() {
		// debug('\n markSelectedWorkItemAsChanged - START');
		var wi = getSelectedWorkItem();

		if(wi && wi.changed) {
			// debug('\t marking as changed');
			wi.changed(true, true);
		}

		// debug(' markSelectedWorkItemAsChanged - END\n');
	}

	function selectGlyph(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedglyph = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}

	function selectComponent(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedcomponent = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}

	function selectLigature(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedligature = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}



//------------------------------
// Drawing controls
//------------------------------

	function draw_PathOutline(sh, accent, thickness) {
		// debug('\n draw_PathOutline - START');
		// debug('\t shape name = ' + sh.name);
		// debug('\t accent.l65 = ' + accent.l65);
		// debug('\t selectedtool = ' + _UI.selectedtool);

		if(!sh) return;

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var hp = (_GP.projectsettings.pointsize/2);
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.fillStyle = 'transparent';

		if(_UI.selectedtool==='newrect'){
			draw_BoundingBox(sh.getMaxes(), accent);

		} else if (_UI.selectedtool==='newoval'){
			_UI.glypheditctx.strokeStyle = accent.l65;
			var tpdso = ovalPathFromMaxes(_UI.eventhandlers.tempnewbasicshape);

			_UI.glypheditctx.lineWidth = 1;
			_UI.glypheditctx.strokeStyle = accent.l65;

			_UI.glypheditctx.beginPath();
			tpdso.drawPath(_UI.glypheditctx);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();

		} else {
			// Draw Path Points
			if(!sh.path) return;

			// Draw path selection outline
			_UI.glypheditctx.lineWidth = thickness;
			_UI.glypheditctx.strokeStyle = accent.l65;

			_UI.glypheditctx.beginPath();
			sh.path.drawPath(_UI.glypheditctx);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();
		}

		// debug(' draw_PathOutline - END\n');
	}

	function draw_PathPoints(pparr, accent) {
		// debug('\n draw_PathPoints - START');
		pparr = pparr || [];


		for(var p=0; p<pparr.length; p++){
			// debug('\t point ' + p + ' isSelected ' + _UI.ms.points.isSelected(pparr[p]));

			if(p===0){
				pparr[p].drawDirectionalityPoint(accent, pparr[(p+1)%pparr.length]);
			} else {
				pparr[p].drawPoint(accent);
			}
		}

		// debug(' draw_PathPoints - END\n');
	}

	function draw_PathPointHandles(pparr, accent) {
		pparr = pparr || [];

		for(var p=0; p<pparr.length; p++){
			pparr[p].drawHandles(true, true, accent);
		}
	}

	function draw_BoundingBox(maxes, accent, thickness) {
		// debug('\n draw_BoundingBox - START');
		// debug(maxes);
		// debug('\t accent: ' + accent.l65);

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var lx = sx_cx(maxes.xmin);
		var rx = sx_cx(maxes.xmax);
		var ty = sy_cy(maxes.ymax);
		var by = sy_cy(maxes.ymin);

		if(thickness > 1){
			lx -= thickness;
			rx += thickness;
			ty -= thickness;
			by += thickness;
		}

		var w = (rx-lx);
		var h = (by-ty);

		_UI.glypheditctx.fillStyle = 'transparent';
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.lineWidth = thickness;
		_UI.glypheditctx.strokeRect(lx,ty,w,h);
		// debug(' draw_BoundingBox - END\n');
	}

	function draw_BoundingBoxHandles(maxes, accent, thickness) {
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var bb = getBoundingBoxHandleDimensions(maxes, thickness);

		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.lineWidth = 1;
		_UI.glypheditctx.strokeStyle = accent.l65;

		//rotate handle
		if(_UI.ms.shapes.rotateable()){
			var h = _UI.rotatehandleheight;
			_UI.glypheditctx.lineWidth = thickness;
			draw_Line({x:bb.midx + bb.hp, y:bb.topy}, {x:bb.midx + bb.hp, y:bb.topy - h});
			_UI.glypheditctx.lineWidth = 1;
			draw_CircleHandle({x:bb.midx + bb.hp, y:bb.topy - h + bb.hp});
		}


		//upper left
		if(canResize('nw')) draw_SquareHandle({x:bb.leftx, y:bb.topy});

		//top
		if(canResize('n')) draw_SquareHandle({x:bb.midx, y:bb.topy});

		//upper right
		if(canResize('ne')) draw_SquareHandle({x:bb.rightx, y:bb.topy});

		// right
		if(canResize('e')) draw_SquareHandle({x:bb.rightx, y:bb.midy});

		//lower right
		if(canResize('se')) draw_SquareHandle({x:bb.rightx, y:bb.bottomy});

		//bottom
		if(canResize('s')) draw_SquareHandle({x:bb.midx, y:bb.bottomy});

		//lower left
		if(canResize('sw')) draw_SquareHandle({x:bb.leftx, y:bb.bottomy});

		//left
		if(canResize('w')) draw_SquareHandle({x:bb.leftx, y:bb.midy});

		// //Center Dot
		// _UI.glypheditctx.fillRect(bb.midx, bb.midy, ps, ps);
		// _UI.glypheditctx.strokeRect(bb.midx, bb.midy, ps, ps);
	}

	function draw_RotationAffordance(accent, thickness) {
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var center = clone(_UI.eventhandlers.rotationcenter);
		var starttopy = _UI.eventhandlers.rotationstarttopy;
		var mx = _UI.eventhandlers.mousex;
		var my = _UI.eventhandlers.mousey;
		var ss = _UI.ms.shapes;
		var angle = calculateAngle({x:cx_sx(mx), y:cy_sy(my)}, center);

		var rotatehandle = {x:center.x, y:starttopy};
		rotate(rotatehandle, angle, center);
		rotate(rotatehandle, (Math.PI/-2), center);

		// debug('\t Drag Angle ' + round(angle, 2));

		var counterclockwise = false;
		if(Math.abs(angle) > (Math.PI/2)) {
			counterclockwise = true;
		}


		// Convert things to Canvas System
		rotatehandle.x = sx_cx(rotatehandle.x);
		rotatehandle.y = sy_cy(rotatehandle.y);
		center.x = sx_cx(center.x);
		center.y = sy_cy(center.y);
		starttopy = sy_cy(starttopy);
		var radius = calculateLength(center, rotatehandle);
		

		var ctx = _UI.glypheditctx;
		
		// Pizza Pie Sweep
		ctx.fillStyle = accent.l65;
		ctx.strokeStyle = accent.l65;
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		ctx.arc(center.x, center.y, radius, (Math.PI/-2), (angle*-1), counterclockwise);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.globalAlpha = 1;

		// rotate Handle		
		ctx.strokeStyle = accent.l65;
		ctx.fillStyle = 'white';
		ctx.lineWidth = thickness;
		draw_Line({x:rotatehandle.x, y:rotatehandle.y}, {x:center.x, y:center.y});
		ctx.lineWidth = 1;
		draw_CircleHandle(rotatehandle);

		// readout
		var readout = round(calculateNiceAngle(angle),1);
		if(counterclockwise) readout -= 360;
		readout = round(readout, 1);

		ctx.font = '24px OpenSans';
		ctx.fillStyle = accent.l65;
		ctx.globalAlpha = 0.8;
		ctx.fillText((''+readout+'°'), center.x, starttopy-24);
		ctx.globalAlpha = 1;
	}

	function draw_Line(p1, p2) {
		_UI.glypheditctx.beginPath();
		_UI.glypheditctx.moveTo(p1.x, p1.y);
		_UI.glypheditctx.lineTo(p2.x, p2.y);
		_UI.glypheditctx.closePath();
		_UI.glypheditctx.stroke();
	}

	function draw_SquareHandle(ul) {
		var ps = _GP.projectsettings.pointsize;
		_UI.glypheditctx.fillRect(ul.x, ul.y, ps, ps);
		_UI.glypheditctx.strokeRect(ul.x, ul.y, ps, ps);
	}

	function draw_CircleHandle(center) {
		_UI.glypheditctx.beginPath();
		_UI.glypheditctx.arc(center.x, center.y, (_GP.projectsettings.pointsize/2), 0, Math.PI*2, true);
		_UI.glypheditctx.closePath();
		_UI.glypheditctx.fill();
		_UI.glypheditctx.stroke();
	}

	function isOverBoundingBoxHandle(px, py, maxes, thickness) {
		// debug('\n isOverBoundingBoxHandle - START');
		// debug('\t px/py - ' + px + ' / ' + py);
		// debug('\t maxes - ' + json(maxes, true));

		if(!maxes) return false;
		var ps = _GP.projectsettings.pointsize;
		var bb = getBoundingBoxHandleDimensions(maxes, thickness);

		// debug('\t point size - ' + ps);
		// debug('\t l/m/r x: ' + bb.leftx + ' / ' + bb.midx + ' / ' + bb.rightx);
		// debug('\t t/m/b y: ' + bb.topy + ' / ' + bb.midy + ' / ' + bb.bottomy);

		// rotation handle
		if(_UI.ms.shapes.rotateable()){
			if( ((px > bb.midx) && (px < bb.midx+ps)) &&
				((py > bb.topy-_UI.rotatehandleheight) && (py < bb.topy-_UI.rotatehandleheight+ps)) ){
				return 'rotate';
			}
		}

		// upper left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'nw';
		}

		// top
		if( ((px > bb.midx) && (px < bb.midx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'n';
		}

		// upper right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'ne';
		}

		// right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.midy) && (py < bb.midy+ps)) ){
			return 'e';
		}

		// lower right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 'se';
		}

		// bottom
		if( ((px > bb.midx) && (px < bb.midx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 's';
		}

		// lower left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 'sw';
		}

		// left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.midy) && (py < bb.midy+ps)) ){
			return 'w';
		}

		// debug(' isOverBoundingBoxHandle - returning FALSE - END\n');
		return false;
	}

	function getBoundingBoxHandleDimensions(maxes, thickness) {
		var dimensions = {};
		var hp = _GP.projectsettings.pointsize/2;
		thickness = thickness || 1;

		// Translation Fidelity - converting passed canvas values to saved value system
		dimensions.leftx = (sx_cx(maxes.xmin) - hp); //.makeCrisp(false);
		dimensions.midx = Math.floor(sx_cx(maxes.xmin)+((sx_cx(maxes.xmax)-sx_cx(maxes.xmin))/2)-hp);
		dimensions.rightx = (sx_cx(maxes.xmax) - hp); //.makeCrisp(true);

		dimensions.topy = (sy_cy(maxes.ymax) - hp); //.makeCrisp(true);
		dimensions.midy = Math.floor(sy_cy(maxes.ymax)+((sy_cy(maxes.ymin)-sy_cy(maxes.ymax))/2)-hp);
		dimensions.bottomy = (sy_cy(maxes.ymin) - hp); //.makeCrisp(false);


		if(thickness > 1){
			dimensions.leftx -= thickness;
			dimensions.rightx += thickness;
			dimensions.topy -= thickness;
			dimensions.bottomy += thickness;
		}

		dimensions.hp = hp;

		return dimensions;
	}


//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){
		var xs = {
			'xmax': _UI.glypheditcanvassize,
			'xmin': 0,
			'ymax': _UI.glypheditcanvassize,
			'ymin': 0
		};

		// background white square
		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.globalAlpha = 1.0;
		_UI.glypheditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			var gsize = ((ps.upm/ps.griddivisions)*v.dz);
			_UI.glypheditctx.lineWidth = 1;

			var l = Math.floor(_GP.projectsettings.colors.gridlightness / 100 * 255);
			_UI.glypheditctx.strokeStyle = 'rgb('+l+','+l+','+l+')';
			//debug('GRID - gridsize set as: ' + gsize);

			var horizontal = function(y){
				y = y.makeCrisp();
				_UI.glypheditctx.beginPath();
				_UI.glypheditctx.moveTo(xs.xmin,y);
				_UI.glypheditctx.lineTo(xs.xmax,y);
				_UI.glypheditctx.stroke();
				_UI.glypheditctx.closePath();
			};

			var vertical = function(x){
				x = x.makeCrisp();
				_UI.glypheditctx.beginPath();
				_UI.glypheditctx.moveTo(x,xs.ymin);
				_UI.glypheditctx.lineTo(x,xs.ymax+1);
				_UI.glypheditctx.stroke();
				_UI.glypheditctx.closePath();
			};

			for(var i=v.dx; i<xs.xmax-1; i+=gsize){ vertical(i); }
			vertical(xs.xmax+1);
			for(var j=v.dx; j>=xs.xmin; j-=gsize){ vertical(j); }

			for(var k=v.dy; k<xs.ymax-1; k+=gsize){ horizontal(k); }
			horizontal(xs.ymax);
			for(var p=v.dy; p>=xs.ymin; p-=gsize){ horizontal(p); }

		}
	}

	function drawGuides() {
		// debug('\n drawGuides - START');

		if(!getSelectedWorkItemID()) return;

		var ps = _GP.projectsettings;
		var onglyphedit = (_UI.current_page === 'glyph edit' || _UI.current_page === 'ligatures');
		var onkern = (_UI.current_page === 'kerning');
		// debug('\t ps.guides: ');
		// debug(ps.guides);

		if(_UI.showguides){

			if (onkern){
				_UI.guides.leftgroup_xmax.location = getSelectedKern().value;
				_UI.guides.leftgroup_xmax.draw();
				_UI.guides.rightgroup_xmin.draw();
				ps.guides.baseline.draw();
				return;
			}

			// Update custom guides
			var g;
			for(var c in ps.guides){if(ps.guides.hasOwnProperty(c)){
				g = ps.guides[c];
				if(g.editable){
					g.draw();
				}
			}}

			var selwi = getSelectedWorkItem();
			var t = _UI.eventhandlers.tempnewbasicshape;
			var rl = t? Math.max(selwi.glyphwidth, t.xmax) :  selwi.glyphwidth;
			var ll = Math.min(selwi.maxes.xmin, 0);

			// Update system guides
			ps.guides.xheight.location = ps.xheight;
			ps.guides.capheight.location = ps.capheight;
			ps.guides.ascent.location = ps.ascent;
			ps.guides.baseline.location = 0;
			ps.guides.descent.location = ps.descent;
			ps.guides.min.location = ll;
			ps.guides.max.location = rl;
			ps.guides.leftside.location = (getSelectedGlyphLeftSideBearing()*-1);
			ps.guides.rightside.location = getSelectedGlyphRightSideBearing() + rl;

			// Minor Guidelines - Overshoots
			if(_UI.showovershoots){
				var os = ps.overshoot;
				ps.guides.xheight.draw(-1*os);
				ps.guides.ascent.draw(-1*os);
				ps.guides.baseline.draw(os);
				ps.guides.descent.draw(os);
			}

			// Horizontals
			ps.guides.xheight.draw();
			ps.guides.capheight.draw();
			ps.guides.ascent.draw();
			ps.guides.descent.draw();
			ps.guides.baseline.draw();

			// Verticals
			ps.guides.zero.draw(0);
			if(onglyphedit){
				ps.guides.min.draw(0);
				ps.guides.leftside.draw();
				if(getSelectedWorkItemShapes().length || !selwi.isautowide){
					ps.guides.max.draw(0);
					ps.guides.rightside.draw();
				}
			}

			// Out of bounds triangle
			if(ps.guides.baseline.visible || ps.guides.leftside.visible){
				var v = getView('guides');
				_UI.glypheditctx.fillStyle = ps.guides.baseline.color;
				_UI.glypheditctx.beginPath();
				_UI.glypheditctx.moveTo(v.dx, v.dy-1);
				_UI.glypheditctx.lineTo(v.dx, v.dy+(ps.pointsize*2)-1);
				_UI.glypheditctx.lineTo(v.dx-(ps.pointsize*2), v.dy-1);
				_UI.glypheditctx.closePath();
				_UI.glypheditctx.fill();
			}
		}
		// debug(' drawGuides - END\n');
	}


//-------------------
// INIT
//-------------------
	function setupGhostCanvas(){
		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.glypheditcanvassize;
		_UI.ishereghostcanvas.width = _UI.glypheditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = 'cyan';
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = 'transparent';
	}

	function setupEditCanvas(){
		_UI.glypheditcanvas = getEditDocument().getElementById('glypheditcanvas');
		_UI.glypheditcanvas.height = _UI.glypheditcanvassize;
		_UI.glypheditcanvas.width = _UI.glypheditcanvassize;
		_UI.glypheditctx = _UI.glypheditcanvas.getContext('2d');
		_UI.glypheditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.glypheditcanvas.onmouseout = mouseoutcec;
		_UI.glypheditcanvas.onmouseover = mouseovercec;
	}

// end of file