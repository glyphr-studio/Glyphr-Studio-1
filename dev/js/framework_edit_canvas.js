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
			'<div id="toolsarea">&#x20E2;</div>' +
			'<div id="viewarea">&#x20E2;</div>' +
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
	function redraw(calledby){
		// debug('\n::::::::::::::::::::::\n REDRAW \t START');
		// debug('\t navhere: ' + _UI.navhere);
		// debug('\t called By: ' + calledby);
		// debug('\t selected char: ' + _UI.selectedglyph);
		var start = Date.now();

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;
		reqAniFrame(redrawUnit);
		_UI.redrawing = false;

		// debug('REDRAW DONE\t' + (Date.now() - start) + ' ms\n::::::::::::::::::::::\n\n');
	}

	function reqAniFrame(fun) {
		if(_UI.popout){
			if(_UI.popout.requestAnimationFrame) _UI.popout.requestAnimationFrame(fun);
			else fun();
		} else {
			if(window.requestAnimationFrame) window.requestAnimationFrame(fun);
			else fun();
		}
	}

	function redrawUnit() {
		// debug('\n::::::::::::::::::::::\n REDRAW UNIT \t START');
		var start = Date.now();
		_UI.glypheditctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);

		switch (_UI.navhere){
			case 'glyph edit': redraw_GlyphEdit(); break;
			case 'components': redraw_GlyphEdit(); break;
			case 'ligatures': redraw_GlyphEdit(); break;
			case 'kerning': redraw_Kerning(); break;
			case 'test drive': redraw_TestDrive(); break;
		}

		if(!_UI.eventhandlers.currtool.dragging) update_ToolsArea();
		update_NavPanels();

		if(_UI.focuselement) {
			var fe = document.getElementById(_UI.focuselement);
			if(fe) fe.focus();
		}
		_UI.focuselement = false;
		// debug('REDRAW UNIT DONE\t' + (Date.now() - start) + ' ms\n::::::::::::::::::::::\n\n');
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
		var onglyph = (_UI.navhere === 'glyph edit');
		var oncom = (_UI.navhere === 'components');
		var onlig = (_UI.navhere === 'ligatures');
		var onkern = (_UI.navhere === 'kerning');
		var type = _UI.selectedshapes.getType();

		if(_UI.selectedtool === 'pathedit'){
			patheditclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			patheditclass = 'buttondis';
			penclickable = false;
		}

		if(_UI.selectedtool === 'pathaddpoint'){
			pathaddpointclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			pathaddpointclass = 'buttondis';
			penclickable = false;
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
		zoom += "<button title='zoom: one to one' class='tool' onclick='setView({\"dz\":1});redraw(\"updatetools\");'>"+makeToolButton({'name':'tool_zoom1to1'})+"</button>";
		zoom += "<button title='zoom: fit to screen' class='tool' onclick='setView(clone(_UI.defaultview)); redraw(\"updatetools\");'>"+makeToolButton({'name':'tool_zoomEm'})+"</button>";
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
		edittools += "<button title='add path point' class='" + pathaddpointclass + " tool' " + (penclickable? "onclick='clickTool(\"pathaddpoint\");'":"") + "/>"+makeToolButton({'name':'tool_penPlus', 'selected':(st==='pathaddpoint'), 'disabled':!penclickable})+"</button>";
		edittools += "<button title='path edit' class='" + patheditclass + " tool' " + (penclickable? "onclick='clickTool(\"pathedit\");'":"") + "/>"+makeToolButton({'name':'tool_pen', 'selected':(st==='pathedit'), 'disabled':!penclickable})+"</button>";
		edittools += "<button title='shape edit' class='" + (st==='shaperesize'? "buttonsel " : " ") + "tool' onclick='clickTool(\"shaperesize\");'/>"+makeToolButton({'name':'tool_pointer', 'selected':(st==='shaperesize')})+"</button>";

		if(_UI.selectedtool === 'newpath'){
			edittools += "<div style='height:5px;'>&nbsp;</div>";
			edittools += "<button class='buttonsel' style='width:94px; font-size:.8em; padding:2px;' title='done editing path' onclick='clickTool(\"pathedit\");'>done editing path</button>";
		}

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

		if(onglyph || oncom || onlig) toolcontent += edittools;

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

		if(ctool === "newrect"){
			setCursor('crosshairsSquare');
			clickEmptySpace();
		} else if (ctool === "newoval"){
			setCursor('crosshairsCircle');
			clickEmptySpace();
		} else if (ctool === "newpath"){
			setCursor('penPlus');
			clickEmptySpace();
		} else if(ctool === "pathedit"){
			setCursor('pen');
			if(_UI.ss && _UI.ss.path) {_UI.ss.selectPathPoint(0);}
			//debug("clickTool() - setting selectPathPoint = 0");
		} else if (ctool === "shaperesize"){
			setCursor('pointer');
			// _UI.selectedshapes.calcMaxes();
		}

		_UI.eventhandlers.hoverpoint = false;
		closeNotation();
		// updateCursor();

		redraw("clicktool");
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
			// debug('\t FOUND -resize CURSOR');
			if(canResize(name)) name+='-resize';
		}

		if(_UI.cursors[name]){
			// debug('\t FOUND CUSTOM CURSOR:\t'+name);
			getEditDocument().body.style.cursor = _UI.cursors[name];
		} else if (cur.indexOf(name) > -1) {
			// debug('\t FOUND BUILT-IN CURSOR:\t'+name);
			getEditDocument().body.style.cursor = name;
		} else {
			// debug('\t DEFAULT TO auto');
			getEditDocument().body.style.cursor = 'auto';
		}

		// debug(' setCursor - END\n');
	}

	function mouseovercec() {
		// debug('\n mouseovercec - START');
		_UI.eventhandlers.ismouseovercec = true;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () { return false; };
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
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Project file</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>e</span></td><td>export an Open Type font file</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>g</span></td><td>export a SVG font file</td></tr>"+
			"</table>"+

			"</td></tr><tr><td>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>"+
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

		var sc = (_UI.navhere === 'kerning')? getSelectedKernID() : getSelectedWorkItemID();
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
		var onkern = (_UI.navhere === 'kerning');
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

		redraw('viewZoom');
	}

	function setViewZoom(zoom){
		zoom /= 100;
		var v = getView();

		setView({
			'dz' : round(zoom, 2),
			'dx' : v.dx,
			'dy' : v.dy
		});

		redraw('setViewZoom');
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
		var nph = _UI.navprimaryhere;

		if(_UI.navhere === 'ligatures'){
			len = getLength(_GP.ligatures);
			if(!len){
				_UI.selectedligature = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.navhere === 'components'){
			len = getLength(_GP.components);
			if(!len){
				_UI.selectedcomponent = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.navhere === 'kerning'){
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
		// debug('\t navhere: ' + _UI.navhere);
		var re;

		switch(_UI.navhere){
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
		switch(_UI.navhere){
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

	function selectGlyph(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedglyph = c;
		clickEmptySpace();

		//debug('SELECTGLYPH: shapelayers is now ' + JSON.stringify(getSelectedWorkItemShapes()));
		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}

	function selectComponent(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedcomponent = c;
		clickEmptySpace();

		//debug('SELECTGLYPH: shapelayers is now ' + JSON.stringify(getSelectedWorkItemShapes()));
		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}

	function selectLigature(c, dontnavigate){
		//debug('SELECTGLYPH - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedligature = c;
		clickEmptySpace();

		//debug('SELECTGLYPH: shapelayers is now ' + JSON.stringify(getSelectedWorkItemShapes()));
		if(!dontnavigate){
			//debug('SELECTGLYPH: selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}



//------------------------------
// Drawing controls
//------------------------------

	function drawSelectOutline(sh, accent, thickness) {
		// debug('\n drawSelectOutline - START');
		// debug('\t shape name = ' + sh.name);
		// debug('\t accent.l65 = ' + accent.l65);
		// debug('\t selectedtool = ' + _UI.selectedtool);

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var hp = (_GP.projectsettings.pointsize/2);
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.fillStyle = 'transparent';

		if(_UI.selectedtool==='newrect'){
			drawBoundingBox(sh.getMaxes(), accent);

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
			var sep = sh.path.sp(true, 'DRAWSELECTOUTLINE');
			var pp = sh.path.pathpoints;

			// Draw path selection outline
			_UI.glypheditctx.lineWidth = thickness;
			_UI.glypheditctx.strokeStyle = accent.l65;

			_UI.glypheditctx.beginPath();
			sh.path.drawPath(_UI.glypheditctx);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();

			var ssm = _UI.selectedshapes.getMembers();
			if( ((_UI.selectedtool === 'pathedit')||(_UI.selectedtool==='newpath')||(_UI.selectedtool==='pathaddpoint')) &&
				(ssm.length === 1 && ssm[0].objtype !== 'componentinstance') ){

				if(sep !== false){
					// Draw Handles
					//debug('DRAWSELECTOUTLINE - new path added, sep=' + sep + ' pathpoints: ' + JSON.stringify(sh.path.pathpoints))
					pp[sep].drawHandles(true, true, accent);

					// Draw prev/next handles
					var prev = sep-1;
					if (prev === -1) prev = pp.length-1;
					pp[prev].drawHandles(false, true, accent);

					// debugging SVG Import
					//pp[sep].drawQuadraticHandle(pp[prev].P);

					pp[(sep+1) % pp.length].drawHandles(true, false, accent);
				}

				// Draw points
				for(var s=0; s<pp.length; s++){
					// debug('\n\t draw point ' + s + ' path.sp=' + sh.path.sp(false) + ' pp.selected=' + pp[s].selected);
					var sel = (sh.path.sp(false) && pp[s].selected);

					if(s===0) pp[s].drawDirectionalityPoint(sel, pp[(s+1)%pp.length], accent);
					else pp[s].drawPoint(sel, accent);
				}
			}
		}

		// debug(' drawSelectOutline - END\n');
	}

	function drawBoundingBox(maxes, accent, thickness) {
		// debug('\n drawBoundingBox - START');
		// debug('\t accent: ' + accent.l65);
		//draw bounding box and 8points
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var tnbs = _UI.eventhandlers.tempnewbasicshape;
		var lx = tnbs? sx_cx(tnbs.xmin) : sx_cx(maxes.xmin);
		var rx = tnbs? sx_cx(tnbs.xmax) : sx_cx(maxes.xmax);
		var ty = tnbs? sy_cy(tnbs.ymax) : sy_cy(maxes.ymax);
		var by = tnbs? sy_cy(tnbs.ymin) : sy_cy(maxes.ymin);

		if(_UI.selectedshapes.getMembers().length > 1 && thickness > 1){
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
		// debug(' drawBoundingBox - END\n');
	}

	function drawBoundingBoxHandles(maxes, accent, thickness) {
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;

		var ps = _GP.projectsettings.pointsize;
		var hp = ps/2;

		var tnbs = _UI.eventhandlers.tempnewbasicshape;
		var lx = tnbs? sx_cx(tnbs.maxes.xmin) : sx_cx(maxes.xmin);
		var rx = tnbs? sx_cx(tnbs.maxes.xmax) : sx_cx(maxes.xmax);
		var ty = tnbs? sy_cy(tnbs.maxes.ymax) : sy_cy(maxes.ymax);
		var by = tnbs? sy_cy(tnbs.maxes.ymin) : sy_cy(maxes.ymin);

		if(_UI.selectedshapes.getMembers().length > 1 && thickness > 1){
			lx -= thickness;
			rx += thickness;
			ty -= thickness;
			by += thickness;
		}
		
		var bleftx = (lx-hp).makeCrisp(true);
		var bmidx = (lx+((rx-lx)/2)-hp).makeCrisp(true);
		var brightx = (rx-hp).makeCrisp(true);
		var btopy = (ty-hp).makeCrisp(true);
		var bmidy = (ty+((by-ty)/2)-hp).makeCrisp(true);
		var bbottomy = (by-hp).makeCrisp(true);

		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.lineWidth = 1;
		_UI.glypheditctx.strokeStyle = accent.l65;

		//upper left
		if(canResize('nw')){
			_UI.glypheditctx.fillRect(bleftx, btopy, ps, ps);
			_UI.glypheditctx.strokeRect(bleftx, btopy, ps, ps);
		}

		//top
		if(canResize('n')){
			_UI.glypheditctx.fillRect(bmidx, btopy, ps, ps);
			_UI.glypheditctx.strokeRect(bmidx, btopy, ps, ps);
		}

		//upper right
		if(canResize('ne')){
			_UI.glypheditctx.fillRect(brightx, btopy, ps, ps);
			_UI.glypheditctx.strokeRect(brightx, btopy, ps, ps);
		}

		// right
		if(canResize('e')){
			_UI.glypheditctx.fillRect(brightx, bmidy, ps, ps);
			_UI.glypheditctx.strokeRect(brightx, bmidy, ps, ps);
		}

		//lower right
		if(canResize('se')){
			_UI.glypheditctx.fillRect(brightx, bbottomy, ps, ps);
			_UI.glypheditctx.strokeRect(brightx, bbottomy, ps, ps);
		}

		//bottom
		if(canResize('s')){
			_UI.glypheditctx.fillRect(bmidx, bbottomy, ps, ps);
			_UI.glypheditctx.strokeRect(bmidx, bbottomy, ps, ps);
		}

		//lower left
		if(canResize('sw')){
			_UI.glypheditctx.fillRect(bleftx, bbottomy, ps, ps);
			_UI.glypheditctx.strokeRect(bleftx, bbottomy, ps, ps);
		}

		//left
		if(canResize('w')){
			_UI.glypheditctx.fillRect(bleftx, bmidy, ps, ps);
			_UI.glypheditctx.strokeRect(bleftx, bmidy, ps, ps);
		}

		//Center Dot
		_UI.glypheditctx.fillRect(bmidx, bmidy, ps, ps);
		_UI.glypheditctx.strokeRect(bmidx, bmidy, ps, ps);
	}

	function isOverBoundingBoxCorner(px, py, maxes) {
		// debug('\n isOverBoundingBoxCorner - START');
		// debug('\t px/py - ' + px + ' / ' + py);
		// debug('\t maxes - ' + json(maxes, true));

		if(!maxes) return false;

		// Translation Fidelity - converting passed canvas values to saved value system
		var ps = _GP.projectsettings.pointsize;
		var hp = ps/2;
		var leftxb = sx_cx(maxes.xmin) -hp;
		var midxb = Math.floor(sx_cx(maxes.xmin)+((sx_cx(maxes.xmax)-sx_cx(maxes.xmin))/2)-hp)+0.5;
		var rightxb = sx_cx(maxes.xmax) -hp;

		var topyb = sy_cy(maxes.ymax)-hp;
		var midyb = Math.floor(sy_cy(maxes.ymax)+((sy_cy(maxes.ymin)-sy_cy(maxes.ymax))/2)-hp)+0.5;
		var bottomyb = sy_cy(maxes.ymin) -hp;

		// debug('\t point size - ' + ps);
		// debug('\t l/m/r x: ' + leftxb + ' / ' + midxb + ' / ' + rightxb);
		// debug('\t t/m/b y: ' + topyb + ' / ' + midyb + ' / ' + bottomyb);

		// upper left
		if( ((px > leftxb) && (px < leftxb+ps)) &&
			((py > topyb) && (py < topyb+ps)) ){
			return 'nw';
		}

		// top
		if( ((px > midxb) && (px < midxb+ps)) &&
			((py > topyb) && (py < topyb+ps)) ){
			return 'n';
		}

		// upper right
		if( ((px > rightxb) && (px < rightxb+ps)) &&
			((py > topyb) && (py < topyb+ps)) ){
			return 'ne';
		}

		// right
		if( ((px > rightxb) && (px < rightxb+ps)) &&
			((py > midyb) && (py < midyb+ps)) ){
			return 'e';
		}

		// lower right
		if( ((px > rightxb) && (px < rightxb+ps)) &&
			((py > bottomyb) && (py < bottomyb+ps)) ){
			return 'se';
		}

		// bottom
		if( ((px > midxb) && (px < midxb+ps)) &&
			((py > bottomyb) && (py < bottomyb+ps)) ){
			return 's';
		}

		// lower left
		if( ((px > leftxb) && (px < leftxb+ps)) &&
			((py > bottomyb) && (py < bottomyb+ps)) ){
			return 'sw';
		}

		// left
		if( ((px > leftxb) && (px < leftxb+ps)) &&
			((py > midyb) && (py < midyb+ps)) ){
			return 'w';
		}

		debug(' isOverBoundingBoxCorner - returning FALSE - END\n');
		return false;
	}



//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){
		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			// var zupm = (ps.upm * v.dz);
			// var gutter = ((_UI.glypheditcanvassize*v.dz) - zupm)/2;
			// var zasc = (ps.ascent * v.dz);
			var xs = {};
			xs.xmax = _UI.glypheditcanvassize;
			xs.xmin = 0;
			xs.ymax = _UI.glypheditcanvassize;
			xs.ymin = 0;
			//debug('GRID: zupm:' + zupm + ' gutter:' + gutter + ' zasc:' + zasc + ' xs:' + JSON.stringify(xs));

			// background white square
			_UI.glypheditctx.fillStyle = 'white';
			_UI.glypheditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

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
		var onglyphedit = (_UI.navhere === 'glyph edit' || _UI.navhere === 'ligatures');
		var onkern = (_UI.navhere === 'kerning');
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