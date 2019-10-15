// start of file
/**
	Framework > Edit Canvas
	The Glyph Edit, Components, Ligatures, and to
	a certain extent, Kerning pages use a common
	HTML5 Canvas mechanism for interaction.
	Common functions around this can be found here.
**/


// -------------------
// Common Edit Page
// -------------------

	function editPage_Content(){
		return ''+
			"<div id='notation'>&#x20E2;</div>" +
			"<canvas id='glypheditcanvas' contenteditable='true' width=12 height=12></canvas>" +
			"<div id='toolsarea_upperleft' onmouseover='mouseovercec();'> (ノ°□°)ノ︵ ┻━┻ </div>" +
			"<div id='toolsarea_upperright'>&nbsp;</div>" +
			"<div id='toolsarea_lowerleft'>&nbsp;</div>" +
			makeFloatLogo();
	}

// -------------------
// REDRAW
// -------------------
	/*
		redraw
		This can be called globally to trigger a redraw of whatever page is currently active.
		It takes an optional 'calledby' variable, which is any string to identify what triggered
		the redraw, for debugging purposes.
	*/
	function redraw(oa){
		// debug('\n REDRAW - START');
		// debug('\t oa: ' + json(oa));
		oa = oa || {};
		_UI.redraw.redrawcanvas = isval(oa.redrawcanvas) ? oa.redrawcanvas : true;
		_UI.redraw.redrawtools = isval(oa.redrawtools) ? oa.redrawtools : true;
		_UI.redraw.redrawpanels = isval(oa.redrawpanels) ? oa.redrawpanels : true;
		_UI.redraw.calledby = oa.calledby || '';
		// debug(`\t calledby ${_UI.redraw.calledby}`);

		if(!_UI.redraw.redrawpanels && document.getElementById('navarea_panel') && document.getElementById('navarea_panel').innerHTML === '') _UI.redraw.redrawpanels = true;

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;
		reqAniFrame(redrawUnit);
		_UI.redrawing = false;
		// debug(' REDRAW - END\n');
	}

	function redrawUnit() {
		// debug('\n redrawUnit - START');
		// debug('\t _UI.redraw ' + json(_UI.redraw));

		if(_UI.redraw.redrawcanvas){
			if(_UI.glypheditctx) _UI.glypheditctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);
			
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
			// if(fe) fe.select();
			if(fe) {
				// var l = fe.value.length;
				// fe.selectionStart = l;
				// fe.selectionEnd = l;
				fe.focus();
			}
		}
		_UI.focuselement = false;

		if(_UI.devmode && _UI.testOnRedraw) _UI.testOnRedraw();
		// debug(' redrawUnit - END\n');
	}


// -------------------
// Update Tools
// -------------------
	function update_ToolsArea(){
		// debug('\n update_ToolsArea - START');

		if(!onCanvasEditPage()){
			// debug('\t returning, !onCanvasEditPage');
			return;
		}

		if(!_UI.redraw.redrawtools){
			// debug('\t returning, !_UI.redraw.redrawtools');
			return;
		}

		if(!getSelectedWorkItemID()){
			// debug('\t returning, !getSelectedWorkItemID');
			getEditDocument().getElementById("toolsarea_upperleft").innerHTML = '';
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
		var selectedWorkItem = getSelectedWorkItem();

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

		// debug(`\t selected glyph ${selectedWorkItem.name} selected tool ${st}`);

		// UPPER RIGHT
		// Pop In/Out
		var pop = '';
		if(onCanvasEditPage()){
			pop += '<span style="width:15px; display:inline-block;">&nbsp;</span>';
			if(_UI.popout){
				pop += '<button title="one screen mode" class="tool" onclick="popIn();">'+makeToolButton({'name':'tool_popIn'})+'</button>';
			} else {
				pop += '<button title="two screen mode" class="tool" onclick="popOut();">'+makeToolButton({'name':'tool_popOut'})+'</button>';
			}
		}

		var zoom = '';
		// Pan
		zoom += '<button title="scroll and pan" class="' + (st==='pan'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'pan\');"/>'+makeToolButton({'name':'tool_pan', 'selected':(st==='pan')})+'</button>';
		zoom += '<span style="width:15px; display:inline-block;">&nbsp;</span>';
		// Zoom
		zoom += '<button title="zoom: one to one" class="tool" onclick="setView({dz:1});redraw({calledby:\'updatetools\'});">'+makeToolButton({'name':'tool_zoom1to1'})+'</button>';
		zoom += '<button title="zoom: fit to screen" class="tool" onclick="autoCalculateView(); redraw({calledby:\'updatetools\'});">'+makeToolButton({'name':'tool_zoomEm'})+'</button>';
		zoom += '<input type="number" title="zoom level" class="zoomreadout" value="' + round(getView('updatetools').dz*100, 2) + '" onchange="setViewZoom(this.value);"/>';
		zoom += '<button title="zoom: out" class="tool" onclick="viewZoom(.9, true);">'+makeToolButton({'name':'tool_zoomOut'})+'</button>';
		zoom += '<button title="zoom: in" class="tool" onclick="viewZoom(1.1, true);">'+makeToolButton({'name':'tool_zoomIn'})+'</button>';


		// UPPER LEFT
		// New Shape
		var newshape = '';
		newshape += '<button onmouseover="mouseovercec();" title="new rectangle shape" class="' + (st==='newrect'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newrect\');"/>'+makeToolButton({'name':'tool_newRect', 'selected':(st==='newrect')})+'</button>';
		newshape += '<button onmouseover="mouseovercec();" title="new oval shape" class="' + (st==='newoval'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newoval\');"/>'+makeToolButton({'name':'tool_newOval', 'selected':(st==='newoval')})+'</button>';
		newshape += '<button onmouseover="mouseovercec();" title="new path shape" class="' + (st==='newpath'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newpath\');"/>'+makeToolButton({'name':'tool_newPath', 'selected':(st==='newpath')})+'</button>';
		newshape += '<br>';

		// Path and Shape Edit
		var edittools = '';
		edittools += '<button onmouseover="mouseovercec();" title="add path point" class="' + pathaddpointclass + ' tool" ' + (penaddpointclickable? 'onclick="clickTool(\'pathaddpoint\');"':'') + '/>'+makeToolButton({'name':'tool_penPlus', 'selected':(st==='pathaddpoint'), 'disabled':!penaddpointclickable})+'</button>';
		edittools += '<button onmouseover="mouseovercec();" title="path edit" class="' + patheditclass + ' tool" ' + (penclickable? 'onclick="clickTool(\'pathedit\');"':'') + "/>"+makeToolButton({'name':'tool_pen', 'selected':(st==='pathedit'), 'disabled':!penclickable})+'</button>';
		edittools += '<button onmouseover="mouseovercec();" title="shape edit" class="' + (st==='shaperesize'? 'buttonsel ' : " ") + 'tool" onclick="clickTool(\'shaperesize\');"/>'+makeToolButton({'name':'tool_arrow', 'selected':(st==='shaperesize')})+'</button>';
		edittools += '<br>';

		var donepath = '<div style="height:5px;">&nbsp;</div>';
		donepath += '<button class="buttonsel" style="width:94px; font-size:.8em; padding:2px;" title="done editing path" onclick="clickTool(\'pathedit\');">done editing path</button>';

		// Slice
		// var slice = '<button title="slice" class="' + (st==='slice'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'slice\');"/>'+makeToolButton({'name':'tool_slice', 'selected':(st==='slice')})+'</button>';

		// Kern
		var kern = '<button title="kern" class="' + (st==='kern'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'kern\');"/>'+makeToolButton({'name':'tool_kern', 'selected':(st==='kern')})+'</button>';

		// Context Glyphs
		var ctxg = '<div class="contextglyphsarea">';
		ctxg += '<div id="contextglyphsoptions">';
		ctxg += '<b>Context Glyphs</b> are letters you can display around the glyph you are currently editing.<br><br>';
		ctxg += checkUI('_GP.projectsettings.showcontextglyphguides', _GP.projectsettings.showcontextglyphguides, true);
		ctxg += '<label style="margin-left:10px; position:relative; top:-6px;" for="showcontextglyphguides">show guides</label><br>';
		ctxg += 'glyph ' + sliderUI('contextglyphtransparency', 'contextglyphtransparency_dropdown', true, false);
		ctxg += '<br/>';
		ctxg += 'guide ' + sliderUI('systemguidetransparency', 'systemguidetransparency_dropdown', true, false);
		ctxg += '</div>';
		ctxg += '<input type="text" id="contextglyphsinput" oninput="updateContextGlyphData(); autoCalculateView(); redraw({calledby:\'updatetools\', redrawtools: false, redrawpanels: false});" ';
		ctxg += 'onblur="_UI.focuselement = false;" onmouseover="mouseoutcec();" ';
		ctxg += 'title="context glyphs\ndisplay glyphs before or after the currently-selected glyph" ';
		ctxg += 'value="'+getContextGlyphString()+'"/>';
		ctxg += '<button id="contextglyphsoptionsbutton" onclick="showCtxGlyphsOptions();">&#x23F7;</button>';
		ctxg += '<br>';
		ctxg += '<button class="tool" title="Previous glyph" onclick="selectPreviousGlyph();">'+makeToolButton({'name':'tool_previousGlyph'})+'</button>';
		ctxg += '<button class="tool" title="Next glyph" onclick="selectNextGlyph();">'+makeToolButton({'name':'tool_nextGlyph'})+'</button>';
		ctxg += '</div>';

		// LOWER LEFT
		// Keyboard Tips Button
		var kbt = '<button title="keyboard and mouse tips" onclick="toggleKeyboardTips();" id="keyboardtips">'+makeIcon({'name':'keyboard', 'size':50, 'width':30, 'height':30, 'color':'rgb(229,234,239)'})+'</button>';



		//
		// Put it all together
		//

		var toolcontent = '';
		var viewcontent = '';
		var utilitiescontent = '';

		viewcontent += zoom;
		viewcontent += pop;

		if(onglyph || onlig) toolcontent += newshape;
		if(oncom && selectedWorkItem && !selectedWorkItem.shape) toolcontent += newshape;

		if(onglyph || oncom || onlig) {
			toolcontent += edittools;
			if(_UI.selectedtool === 'newpath') toolcontent += donepath;
		}

		if(onkern) toolcontent += kern;
		if(onglyph || onlig) toolcontent += ctxg;

		if(_GP.projectsettings.showkeyboardtipsicon) utilitiescontent += kbt;

		getEditDocument().getElementById("toolsarea_upperleft").innerHTML = toolcontent;
		getEditDocument().getElementById("toolsarea_upperright").innerHTML = viewcontent;
		getEditDocument().getElementById("toolsarea_lowerleft").innerHTML = utilitiescontent;

		// debug(' update_ToolsArea - END\n');
	}

	function clickTool(ctool){
		// debug('\n clickTool - START');
		_UI.selectedtool = ctool;

		// debug('\t passed: ' + ctool + ' and _UI.selectedtool now is: ' + _UI.selectedtool);

		_UI.eventhandlers.eh_addpath.firstpoint = true;
		_UI.eventhandlers.multi = false;

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
			setCursor('arrow');
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
				setCursor('arrow');

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
		else if (tool === 'shaperesize')	return _UI.eventhandlers.handle === 'rotate'? 'rotate' : 'arrow';
		else if (tool === 'pathedit' || tool === 'pathaddpoint')	return 'pen';
		else if (tool === 'kern')	return 'kern';
	}

	function mouseovercec() {
		// debug('\n mouseovercec - START');
		_UI.eventhandlers.ismouseovercec = true;
		updateCursor();
		if(_UI.hamburger.state !== 0 && _UI.current_panel !== 'npNav') goHamburger(false);
		// debug(' mouseovercec - END\n');
	}

	function mouseoutcec() {
		// debug('\n mouseoutcec - START');
		_UI.eventhandlers.ismouseovercec = false;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {};
		updateCursor();
		if(_UI.hamburger.state !== 11 && _UI.current_panel !== 'npNav') goHamburger(true);
		// debug(' mouseoutcec - END\n');
	}

	function getContextGlyphString() {
		return getSelectedWorkItem().contextglyphs || hexToChars(getSelectedWorkItemID());
	}

	function showCtxGlyphsOptions() {
		getEditDocument().getElementById('contextglyphsoptions').style.display = 'block';
		getEditDocument().getElementById('contextglyphsoptionsbutton').onclick = hideCtxGlyphsOptions;
		getEditDocument().getElementById('contextglyphsoptionsbutton').innerHTML = '&#x23F6;';
	}

	function hideCtxGlyphsOptions() {
		getEditDocument().getElementById('contextglyphsoptions').style.display = 'none';
		getEditDocument().getElementById('contextglyphsoptionsbutton').onclick = showCtxGlyphsOptions;
		getEditDocument().getElementById('contextglyphsoptionsbutton').innerHTML = '&#x23F7;';
		getEditDocument().getElementById('contextglyphsinput').focus();
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
				'<label style="position:relative; top:-5px;" for="showkeyboardtipsicon">show the &nbsp;<span style="position:relative; top:6px;">'+makeIcon({'name':'keyboard', 'size':50, 'width':22, 'height':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+'</span>&nbsp; button on the edit canvas</label>'+
			'</td></tr></table>';

			openDialog(con);
		}
	}

	function makeKeyboardShortcutsTable() {
		return `<table style='margin:20px 40px 40px 0px;'>
		<tr><td>

			<br>
			<table>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Studio Project file</td></tr>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>e</span></td><td>export an Open Type font file</td></tr>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>g</span></td><td>export a SVG font file</td></tr>
			</table>

		</td>
		<td style='padding-left:40px;'>

			<br>
			<table>
			<tr><td class='keycol'><span class='keycallout'>esc</span></td><td>closes any dialog</td></tr>
			<tr><td class='keycol'><span class='keycallout'>?</span></td><td>toggles this shortcuts dialog</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>o</span></td><td>open a new Glyphr Studio Project</td></tr>
			</table>

		</td></tr>
		<tr><td>

			<br>
			<table>
			<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse click</span></td><td>multi-select shapes or points</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>c</span></td><td>copy selected shape</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>v</span></td><td>paste shape</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>z</span></td><td>undo</td></tr>
			<tr><td class='keycol'><span class='keycallout' style='margin-bottom:5px;'>backspace</span><br>or <span class='keycallout'>delete</span></td><td>delete selected shape<br>or path point</td></tr>
			<tr><td class='keycol'>
				<span class='arrow'>&#x21E7;</span>
				<span class='arrow'>&#x21E9;</span>
				<span class='arrow'>&#x21E6;</span>
				<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>
			</td><td>nudges the selected shape<br>or point ${_GP.projectsettings.spinnervaluechange} em units<br><br></td></tr>
			<tr><td class='keycol'>
				<span class='keycallout'>shift</span>
				<span class='arrow'>&#x21E7;</span>
				<span class='arrow'>&#x21E9;</span>
				<span class='arrow'>&#x21E6;</span>
				<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>
			</td><td>nudge 10 em units</td></tr>
			</table>

		</td><td style='padding-left:40px;'>

			<br>
			<table>
			<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>edit canvas:</h3></td></tr>
			<tr><td class='keycol'><span class='keycallout'>spacebar</span></td><td>pan the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>v</span></td><td>select the shape edit arrow tool</td></tr>
			<tr><td class='keycol'><span class='keycallout'>b</span></td><td>select the path edit pen tool</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse wheel</span></td><td>zoom the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>+</span></td><td>zoom in the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>&ndash;</span></td><td>zoom out the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>0</span></td><td>reset edit canvas zoom</td></tr>
			</table>

		</td></tr></table>`;
	}


// -------------------
// CONTEXT GLYPHS
// -------------------

	function updateContextGlyphData() {
		var selwi = getSelectedWorkItem();
		var selwid = getSelectedWorkItemID();
		var currGlyphObject = getGlyph(selwid, true);
		var currGlyphChar = hexToChars(selwid);
		
		var cgi = getEditDocument().getElementById('contextglyphsinput');
		
		_UI.contextglyphs = {
			leftseq: false,
			rightseq: false
		};
		
		if(cgi) {
			if(cgi.value === currGlyphChar) {
				selwi.contextglyphs = '';
				return;
			} else {
				selwi.contextglyphs = cgi.value;
			}
		}
				
		// debug('\t split: ' + split.left + ' | ' + split.right);
		// debug(`\t view: ${json(v, true)}`);

		var v = getView('drawContextGlyphs');
		var split = splitContextGlyphString(currGlyphChar);

		if(split.left) {
			var leftdistance = getGlyphSequenceAdvanceWidth(split.left);
			if(currGlyphObject.isautowide) leftdistance += currGlyphObject.getLSB();
			leftdistance += calculateKernOffset(split.left.charAt(split.left.length-1), currGlyphChar);

			// debug(`\t leftdistance: ${leftdistance}`);

			_UI.contextglyphs.leftseq = new GlyphSequence({
				glyphstring: split.left,
				scale: v.dz,
				drawLineExtras: drawContextGlyphLeftLineExtras,
				drawGlyphExtras: drawContextGlyphExtras,
				drawGlyph: drawContextGlyph,
				maxes: {
					xmin: (v.dx - (leftdistance*v.dz)),
					ymin: (v.dy)
				}
			});
		}

		if(split.right) {
			var rightdistance = currGlyphObject.getAdvanceWidth();
			if(currGlyphObject.isautowide) rightdistance -= currGlyphObject.getLSB();
			rightdistance += calculateKernOffset(currGlyphChar, split.right.charAt(0));

			// debug(`\t rightdistance: ${rightdistance}`);

			_UI.contextglyphs.rightseq = new GlyphSequence({
				glyphstring: split.right,
				scale: v.dz,
				drawLineExtras: drawContextGlyphRightLineExtras,
				drawGlyphExtras: drawContextGlyphExtras,
				drawGlyph: drawContextGlyph,
				maxes: {
					xmin: (v.dx + (rightdistance*v.dz)),
					ymin: (v.dy)
				}
			});
		}

		// if(_UI.devmode) debugger;
		// debug(' drawContextGlyphs - END\n');
	}

	function drawContextGlyphs() {
		// debug('\n drawContextGlyphs - START');
		updateContextGlyphData();
		clearCanvasHotspots();
		if(_UI.contextglyphs.leftseq) _UI.contextglyphs.leftseq.draw();
		if(_UI.contextglyphs.rightseq) _UI.contextglyphs.rightseq.draw();
		// if(_UI.devmode) debugger;
		// debug(' drawContextGlyphs - END\n');
	}

	function splitContextGlyphString(splitchar) {
		var ctxgs = getContextGlyphString();

		var l = '';
		var r = '';

		var pos = ctxgs.indexOf(splitchar);

		if(pos === -1){
			l = ctxgs;
			r = '';

		} else {
			l = ctxgs.substr(0, pos);
			r = ctxgs.substr(pos+splitchar.length);
		}

		// if(_UI.devmode) debugger;
		return {left:l, right:r};
	}

	function getGlyphSequenceAdvanceWidth(sequence) {
		if(!sequence) return 0;

		var advanceWidth = 0;
		sequence = findAndMergeLigatures(sequence.split(''));

		var g;
		sequence.forEach(function(v, i, a) {
			g = getGlyph(charToHex(v));
			if(g){
				advanceWidth += g.getAdvanceWidth();
				if(a[i+1]) advanceWidth += calculateKernOffset(v, a[i+1]);

			} else {
				advanceWidth += _GP.projectsettings.upm*1 / 2;
			}
		});

		return advanceWidth;
	}

	function drawContextGlyphLeftLineExtras(char, seq) {
		var alpha = transparencyToAlpha(_GP.projectsettings.colors.systemguidetransparency);
		var color = RGBAtoRGB('rgb(204,81,0)', alpha);
		drawVerticalLine((char.view.dx*char.view.dz), false, color);

		var kern = calculateKernOffset(seq.glyphstring[seq.glyphstring.length-1], getSelectedWorkItemChar());

		if(kern) {
			var selwi = getSelectedWorkItem();
			var v = getView('drawContextGlyphLeftLineExtras');
			kern *= -1;
			var rightx = selwi.isautowide? kern-selwi.getLSB() : kern;
			rightx = v.dx + (rightx * v.dz);
			var texty = sy_cy(_GP.projectsettings.descent-60);

			drawGlyphKernExtra(-kern, rightx, texty, v.dz);
		}
	}

	function drawContextGlyphRightLineExtras(char, seq) {
		var kern = calculateKernOffset(getSelectedWorkItemChar(), char.char);

		if(kern) {
			var v = getView('drawContextGlyphRightLineExtras');
			var selwi = getSelectedWorkItem();
			var rightx = selwi.getAdvanceWidth();
			if(selwi.isautowide) rightx -= selwi.getLSB();
			rightx = v.dx + (rightx * v.dz);
			var texty = sy_cy(_GP.projectsettings.descent-60);

			drawGlyphKernExtra(kern, rightx, texty, v.dz);
		}
	}

	function drawContextGlyphExtras(char) {
		// debug('\n drawContextGlyphExtras - START');

		// debug(`\t ${char.char}
		// 	width \t ${char.width}
		// 	aggr \t ${char.aggregate}
		// 	lnbr \t ${char.islinebreaker}
		// 	view \t ${json(char.view, true)}
		// 	line \t ${char.linenumber}
		// \n`);
		// debug(char.glyph);

		var ps = _GP.projectsettings;
		var alpha = transparencyToAlpha(ps.colors.systemguidetransparency);
		
		if(ps.showcontextglyphguides && alpha){
			var view = getView('drawContextGlyphExtras');
			var advanceWidth = char.width * view.dz;
			var currx = (char.view.dx*view.dz);
			var rightx = currx + advanceWidth;
			var color = RGBAtoRGB('rgb(204,81,0)', alpha);
			var texty = sy_cy(_GP.projectsettings.descent-60);
			
			
			// Draw the glyph name
			var gname = char.glyph? char.glyph.getName() : getGlyphName(charsToHexArray(char.char));
			gname = gname.replace(/latin /i, '');
			drawGlyphNameExtra(gname, currx, texty, advanceWidth, color, char.char);
			
			// Draw vertical lines
			drawVerticalLine(rightx, false, color);
			
			// Draw kern notation
			if(char.kern) drawGlyphKernExtra(char.kern, rightx, texty, view.dz);
		}
		
		// if(_UI.devmode) debugger;

		// debug(' drawContextGlyphExtras - END\n');
	}

	function drawGlyphNameExtra(text, currx, topy, advanceWidth, color, regHotspot) {
		// debug('\n drawGlyphNameExtra - START');
		// debug(`\t ${text} passed regHotspot ${regHotspot}`);

		var ctx = _UI.glypheditctx;
		var textw = ctx.measureText(text).width;
		var textx = currx + ((advanceWidth - textw) / 2); // center the glyph name
		var texty = topy + 22;

		ctx.font = '12px tahoma, verdana, sans-serif';

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 10;
		ctx.strokeText(text, textx, texty);

		ctx.fillStyle = color;
		ctx.fillText(text, textx, texty);

		// Register hotspot
		if(regHotspot){
			registerCanvasHotspot({
				target:{
					xmin:currx,
					xmax:(currx + advanceWidth),
					ymin:texty-20,
					ymax:(texty+20)
				},
				underline:{
					xmin: textx-1,
					xmax: textx+textw+1,
					y: texty+6
				},
				onclick:function(){ hotspotNavigateToGlyph(charToHex(regHotspot)); }
			});
		}

		// if(_UI.devmode) debugger;
	}

	function drawGlyphKernExtra(kern, rightx, topy, scale) {
		var desc = _GP.projectsettings.descent;
		var ctx = _UI.glypheditctx;
		var offset = 40;
		var color = RGBAtoRGB('rgb(255,0,255)', transparencyToAlpha(_GP.projectsettings.colors.systemguidetransparency));
		var barheight = Math.max((scale * 10), 1);

		ctx.font = '12px tahoma, verdana, sans-serif';
		ctx.fillStyle = color;
		ctx.fillRect(
			rightx,
			(topy + offset),
			(kern * scale),
			barheight
		);

		var text = 'kern: ' + kern;
		var textwidth = ctx.measureText(text).width;
		var textx = rightx - (((kern*-1*scale) - textwidth)/2) - textwidth;

		ctx.strokeStyle = color;
		drawVerticalLine((rightx + (kern*scale)), false, color);

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 10;
		ctx.miterLimit = 1;

		// ctx.strokeText(text, textx, (topy + (offset*4)));
		// ctx.fillText(text, textx, (topy + (offset*4)));

		ctx.strokeText(text, textx, (topy + offset + barheight + 22));
		ctx.fillText(text, textx, (topy + offset + barheight + 22));
	}

	function drawContextGlyph(char) {
		// debug('\n drawContextGlyph - START');
		// debug(`\t ${char.char}
		// 	width \t ${char.width}
		// 	aggr \t ${char.aggregate}
		// 	lnbr \t ${char.islinebreaker}
		// 	view \t ${json(char.view, true)}
		// 	line \t ${char.linenumber}
		// \n`);
		// debug(char.glyph);
		var v = getView('drawContextGlyph');
		var c = char.view;

		if(!char.glyph) return;
		char.glyph.drawGlyph(_UI.glypheditctx, {dx:(c.dx*c.dz), dy:v.dy, dz:c.dz}, transparencyToAlpha(_GP.projectsettings.colors.contextglyphtransparency), true);

		// debug(' drawContextGlyph - END\n');
	}


// -------------------------------
//	CANVAS HOTSPOTS
// -------------------------------

	function registerCanvasHotspot(hotspot) { _UI.canvashotspots.push(hotspot); }

	function clearCanvasHotspots() { _UI.canvashotspots = []; }

	function isHotspotHere(cx, cy) {
		var chs = _UI.canvashotspots;
		var v;

		for(var i=0; i<chs.length; i++){
			v = chs[i];
			// debug(`isHotspotHere - checking ${v.target.xmin} - ${v.target.xmax} - ${v.target.ymin} - ${v.target.ymax}`);
			// debug(`results ${(cx <= v.target.xmax)} - ${(cx >= v.target.xmin)} - ${(cy <= v.target.ymax)} - ${(cy >= v.target.ymin)}`);
			if((cx <= v.target.xmax) && (cx >= v.target.xmin) && (cy <= v.target.ymax) && (cy >= v.target.ymin)){
				return v;
			}
		}

		return false;
	}

	function findAndCallHotspot(cx, cy) {
		_UI.canvashotspots.forEach(function (v, i, a) {
			if((cx <= v.target.xmax) && (cx >= v.target.xmin) && (cy <= v.target.ymax) && (cy >= v.target.ymin)){
				v.onclick();
			}
		});
	}

	function hotspotNavigateToGlyph(gid) {
		// debug('\n hotspotNavigateToGlyph - START');
		// debug('\t passed ' + gid);

		var v = getView('hotspotNavigateToGlyph');
		var currchar = getSelectedWorkItemChar();
		var newchar = hexToChars(gid);
		var ctxg = getContextGlyphString();
		var p1 = ctxg.indexOf(currchar);
		var p2 = ctxg.indexOf(newchar);
		var flipper;
		var leftchar;
		var rightchar;

		if(p1 < p2){
			flipper = 1;
			leftchar = currchar;
			rightchar = newchar;
		} else {
			flipper = -1;
			leftchar = newchar;
			rightchar = currchar;
		}


		var str = ctxg.substring(p1, p2);
		// debug(`\t substring from ${p1} to ${p2} yeilds ${str}`);

		var delta = getGlyphSequenceAdvanceWidth(str);

		// debug(`\t advance width: ${delta} screen pixels: ${sx_cx(delta)}`);
		// v.dx += sx_cx(delta);
		var kern = calculateKernOffset(leftchar, rightchar);
		// debug(`\t kern offset ${leftchar} and ${rightchar} is ${kern}`);

		v.dx += (v.dz * delta * flipper);
		v.dx += (v.dz * kern * flipper);

		getGlyph(gid, true).contextglyphs = ctxg;
		selectGlyph(gid);
		setView(v);

		_UI.redraw.redrawtools = true;
		update_ToolsArea();

		// debug(' hotspotNavigateToGlyph - END\n');
	}

	function findAndUnderlineHotspot(cx, cy) {
		// debug('\n findAndUnderlineHotspot - START');
		// debug(`\t cx:${cx} \t cy:${cy}`);
		var hs = isHotspotHere(cx, cy);
		var ctx = _UI.glypheditctx;
		// debug(`\t ${hs}`);
		if(hs){
			var t = (_GP.projectsettings.colors.systemguidetransparency);
			// var t2 = (((100 - t) / 2) + t);
			var alpha = transparencyToAlpha(t);
			var rgb = RGBAtoRGB('rgb(204,81,0)', alpha);

			ctx.strokeStyle = rgb;
			ctx.beginPath();
			ctx.moveTo(hs.underline.xmin, hs.underline.y.makeCrisp());
			ctx.lineTo(hs.underline.xmax, hs.underline.y.makeCrisp());
			ctx.stroke();
			setCursor('arrow');
		}

		return hs.target.xmin;
		// debug(' findAndUnderlineHotspot - END\n');
	}


// -------------------
// VIEW
// -------------------

	function setView(oa){
		// if(_UI.devmode) debugger;
		var sc = (_UI.current_page === 'kerning')? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			v[sc] = getView('setView');
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

		return v[sc];
	}

	function getView(calledby){
		// debug('\n getView - START');
		// debug('\t calledby: ' + calledby);

		var onkern = (_UI.current_page === 'kerning');
		var sc = onkern? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;

		if(isval(v[sc])){
			// debug(` getView ${calledby} - returning SAVED VALUE\n`);
			return clone(v[sc], 'getView');
			
		} else if(onkern){
			// debug(` getView ${calledby} - returning DEFAULT KERN\n`);
			return clone(_UI.defaultkernview, 'getView');
			
		} else {
			// debug(` getView ${calledby} - returning DEFAULT\n`);
			return clone(_UI.defaultview, 'getView');
		}
	}

	function viewZoom(zfactor, center){
		var v = getView('viewZoom');
		var mx = _UI.eventhandlers.mousex;
		var my = _UI.eventhandlers.mousey;

		setView({
			'dz' : round(v.dz *= zfactor, 2),
			'dx' : center? v.dx : (mx - ((mx - v.dx) * zfactor)),
			'dy' : center? v.dy : (my - ((my - v.dy) * zfactor))
		});

		redraw({calledby:'viewZoom', redrawpanels:false});
	}

	function setViewZoom(zoom){
		zoom /= 100;
		var v = getView('setViewZoom');

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

	function setDefaultViewForWorkItem() {
		var id = getSelectedWorkItemID();
		var wi = getSelectedWorkItem();
		if(!id) return;

		if(_UI.current_page === 'kerning'){
			if(!isval(_UI.views[id])){ 
				var dm = wi.getDisplayMetrics();
				var tempview = calculateViewForEditCanvas(dm.width);
				setView({
					dx: tempview.dx + (dm.center * tempview.dz),
					dy: tempview.dy,
					dz: tempview.dz
				});
			}
		
		} else {
			if(!isval(_UI.views[id])){
				var aw = wi.shapes.length? wi.getAdvanceWidth() : 0;
				setView(calculateViewForEditCanvas(aw));
			}
		}
	}

	function autoCalculateView() {
		var selwi = getSelectedWorkItem();
		var leftwidth = 0;
		var rightwidth = 0;
		var currwidth = 0;
		var newview;
		
		if(_UI.current_page === 'kerning') {
			leftwidth = getLargestAdvanceWidth(selwi.leftgroup);
			currwidth = getLargestAdvanceWidth(selwi.rightgroup);
			currwidth += (-1 * selwi.value);
		} else {
			leftwidth = getGlyphSequenceAdvanceWidth(_UI.contextglyphs.leftseq.glyphstring);
			rightwidth = getGlyphSequenceAdvanceWidth(_UI.contextglyphs.rightseq.glyphstring);
			currwidth = selwi.getAdvanceWidth();
		}
		
		// debug(`\t left ${leftwidth}, curr ${currwidth}, right ${rightwidth}`);
		
		newview = calculateViewForEditCanvas(leftwidth + currwidth + rightwidth);

		newview.dx += (leftwidth * newview.dz);

		setView(newview);
	}

	function getLargestAdvanceWidth(glyphArray) {
		var re = 0;
		var g;

		for(var i=0; i<glyphArray.length; i++) {
			g = getGlyph(glyphArray[i]);
			re = Math.max(re, g.getAdvanceWidth());
		}
		
		return re;
	}


	function calculateViewForEditCanvas(advanceWidth) {
		// debug(`\n calculateViewForEditCanvas - START`);
		
		var ps = _GP.projectsettings;
		
		var canw = window.innerWidth - 470;	// 470 is the width of the left panel area
		var canh = window.innerHeight - 80;	// 80 is the height of the UI across the top
		// debug(`\t CAN \t ${canw} \t ${canh}`);
		
		var strh = ps.ascent - ps.descent;
		var strw = advanceWidth;
		// var strw = advanceWidth || ps.upm / 2;
		// debug(`\t STR \t ${strw} \t ${strh}`);
		
		var zw = (canw / (strw * 1.4));
		var zh = (canh / (strh * 1.4));
		// debug(`\t NZ \t ${zw} \t ${zh}`);
		
		var nz = round(Math.min(zh, zw), 3);
		var nx = round(Math.max(50, ((canw - (nz * strw)) / 2)));
		var ny = round(((canh - (nz * strh)) / 2) + (ps.ascent * 1.1 * nz));
		// debug(`\t VIEW \t ${nx} \t ${ny} \t ${nz}`);
		
		// if(_UI.devmode) debugger;
		// debug(` calculateViewForEditCanvas - END\n\n`);
		return {dx: nx, dy: ny, dz: nz};
	}

	function getStringAdvanceWidth(str) {
		var carr = findAndMergeLigatures(str.split(''));
		var g;
		var aw = 0;

		for(var c=0; c<carr.length; c++){
			g = getGlyph(charsToHexArray(carr[c])[0]);

			if(g) aw += g.getAdvanceWidth();

			if(c < carr.length-2){
				aw += calculateKernOffset(carr[c], carr[c+1]);
			}
		}

		return aw;
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
			case 'global actions':
				if(!_UI.selectedglyph) _UI.selectedglyph = '0x0041';
				re = getGlyph(_UI.selectedglyph, true);
				// debug('\t case glyph edit, returning ' + re.name);
				return re;
			case 'import svg':
				if(!_UI.selectedsvgimporttarget) _UI.selectedsvgimporttarget = '0x0041';
				re = getGlyph(_UI.selectedsvgimporttarget, true);
				// debug('\t case import svg, returning ' + re.name);
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
				if(!_UI.selectedkern) _UI.selectedkern = getFirstID(_GP.kerning);
				re = _GP.kerning[_UI.selectedkern] || false;
				// debug('\t case kerning, returning ' + re);
				return re;
		}

		return false;
	}

	function getSelectedWorkItemID(){
		switch(_UI.current_page){
			case 'glyph edit': 	return _UI.selectedglyph;
			case 'import svg':	return _UI.selectedsvgimporttarget;
			case 'ligatures':	return _UI.selectedligature;
			case 'components':	return _UI.selectedcomponent;
			case 'kerning':		return _UI.selectedkern;
		}

		return false;
	}

	function getSelectedWorkItemChar() {
		var swiid = getSelectedWorkItemID();
		return hexToChars(swiid);
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
		// debug('\n selectGlyph - START');
		// debug('\t selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedglyph = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('\t selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate({panel:'npAttributes'});
		}

		// debug(' selectGlyph - END\n');
	}

	function selectNextGlyph(){
		var selwi = getSelectedWorkItemID();
		var hit = false;

		for(var gid in _GP.glyphs){
			if(hit) {
				selectGlyph(gid);
				break;
			} else if(gid == selwi) {
				hit = true;
			}
		}
	}

	function selectPreviousGlyph(){
		var selwi = getSelectedWorkItemID();
		var previous = false;

		for(var gid in _GP.glyphs){
			if(gid == selwi) {
				selectGlyph(previous);
				break;
			} else {
				previous = gid;
			}
		}
	}

	function selectComponent(c, dontnavigate){
		// debug('SELECTCOMPONENT - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedcomponent = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('SELECTCOMPONENT: selecting ' + _GP.components[c].name + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}

	function selectLigature(c, dontnavigate){
		// debug('SELECTLIGATURE - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedligature = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('SELECTLIGATURE: selecting ' + _GP.ligatures[c].glyphhtml + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}

	function selectSVGImportTarget(c, dontnavigate) {
		// debug('SELECTSVGIMPORTTARGET - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedsvgimporttarget = c;

		if(!dontnavigate){
			// debug('SELECTSVGIMPORTTARGET: selecting ' + c + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}


// ------------------------------
// Drawing controls
// ------------------------------

	function draw_PathOutline(sh, accent, thickness) {
		// debug('\n draw_PathOutline - START');
		// debug('\t shape name = ' + sh.name);
		// debug('\t accent.l65 = ' + accent.l65);
		// debug('\t selectedtool = ' + _UI.selectedtool);

		if(!sh) return;

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
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
		if(_UI.ms.shapes.rotatable()){
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
		var center = clone(_UI.eventhandlers.rotationcenter, 'draw_RotationAffordance');
		var starttopy = _UI.eventhandlers.rotationstartpoint.y;
		var mx = _UI.eventhandlers.mousex;
		var my = _UI.eventhandlers.mousey;
		var radians = calculateAngle({x:cx_sx(mx), y:cy_sy(my)}, center);

		// debug('\t Init radians:\t' + radians);
		var snap = _UI.eventhandlers.isShiftDown;
		if(snap) radians = snapRadiansToDegrees(radians);
		var rotatehandle = {x:center.x, y:starttopy};
		rotate(rotatehandle, radians, center, snap);
		rotate(rotatehandle, (Math.PI/-2), center, snap);

		// debug('\t Drag Angle:\t' + round(radians, 2));

		var counterclockwise = false;
		if(Math.abs(radians) > (Math.PI/2)) {
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
		ctx.arc(center.x, center.y, radius, (Math.PI/-2), (radians*-1), counterclockwise);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		// rotate Handle
		ctx.strokeStyle = accent.l65;
		ctx.fillStyle = 'white';
		ctx.lineWidth = thickness;
		draw_Line({x:rotatehandle.x, y:rotatehandle.y}, {x:center.x, y:center.y});
		ctx.lineWidth = 1;
		draw_CircleHandle(rotatehandle);

		// readout
		var readout = round(radiansToNiceAngle(radians),1);
		if(counterclockwise) readout -= 360;
		readout = round(readout, 1);

		// debug('\t Readout angle:\t' + readout);

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
		if(_UI.ms.shapes.rotatable()){
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


// -------------------
// Drawing Grid
// -------------------

	function drawGrid(){
		// debug('\n drawGrid - START');

		var xs = {
			'xmax': _UI.glypheditcanvassize,
			'xmin': 0,
			'ymax': _UI.glypheditcanvassize,
			'ymin': 0
		};

		// background white square
		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			var gsize = ((ps.upm/ps.griddivisions)*v.dz);
			var gridcolor = RGBAtoRGB('rgb(170,170,170)', transparencyToAlpha(_GP.projectsettings.colors.gridtransparency));
			_UI.glypheditctx.lineWidth = 1;

			if(gsize > 0 && gsize < _UI.glypheditcanvassize){
				for(var i=v.dx; i<xs.xmax-1; i+=gsize){ drawVerticalLine(i, _UI.glypheditctx, gridcolor); }
				drawVerticalLine(xs.xmax+1, _UI.glypheditctx, gridcolor);
				for(var j=v.dx; j>=xs.xmin; j-=gsize){ drawVerticalLine(j, _UI.glypheditctx, gridcolor); }

				for(var k=v.dy; k<xs.ymax-1; k+=gsize){ drawHorizontalLine(k, _UI.glypheditctx, gridcolor); }
				drawHorizontalLine(xs.ymax, _UI.glypheditctx, gridcolor);
				for(var p=v.dy; p>=xs.ymin; p-=gsize){ drawHorizontalLine(p, _UI.glypheditctx, gridcolor); }

			} else {
				console.warn('Grid size computed as ' + gsize + ', not drawing grid.');
			}
		}
	}

	function drawHorizontalLine(y, ctx, color){
		ctx = ctx || _UI.glypheditctx;
		color = color || 'rgb(0,0,0)';

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		y = y.makeCrisp();
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(_UI.glypheditcanvassize, y);
		ctx.stroke();
		ctx.closePath();
	}

	function drawVerticalLine(x, ctx, color){
		ctx = ctx || _UI.glypheditctx;
		color = color || 'rgb(0,0,0)';

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		x = x.makeCrisp();
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, _UI.glypheditcanvassize+1);
		ctx.stroke();
		ctx.closePath();
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
			if(selwi){
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

				// Horizontals
				ps.guides.xheight.draw();
				ps.guides.capheight.draw();
				ps.guides.ascent.draw();
				ps.guides.descent.draw();
				ps.guides.baseline.draw();

				// Out of bounds triangle
				if(ps.guides.baseline.visible || ps.guides.leftside.visible){
					var ctx = _UI.glypheditctx;
					var v = getView('guides');
					ctx.fillStyle = shiftColor(ps.guides.baseline.color, ps.colors.systemguidetransparency/100, true);
					ctx.beginPath();
					ctx.moveTo(v.dx-1, v.dy);
					ctx.lineTo(v.dx-1, v.dy+(ps.pointsize*2));
					ctx.lineTo(v.dx-1-(ps.pointsize*2), v.dy);
					ctx.closePath();
					ctx.fill();
				}
			}
		}
		// debug(' drawGuides - END\n');
	}


// -------------------
// INIT
// -------------------
	function setupGhostCanvas(){
		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.glypheditcanvassize;
		_UI.ishereghostcanvas.width = _UI.glypheditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = 'cyan';
		// _UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = 'transparent';
	}

	function setupEditCanvas(){
		_UI.glypheditcanvas = getEditDocument().getElementById('glypheditcanvas');
		_UI.glypheditcanvas.height = _UI.glypheditcanvassize;
		_UI.glypheditcanvas.width = _UI.glypheditcanvassize;
		_UI.glypheditctx = _UI.glypheditcanvas.getContext('2d');
		_UI.glypheditctx.globalAlpha = 1;
		_UI.glypheditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.glypheditcanvas.addEventListener('mouseout', mouseoutcec, false);
		_UI.glypheditcanvas.addEventListener('mouseover', mouseovercec, false);
		_UI.glypheditcanvas.addEventListener('paste', pasteSvgOnEditCanvas, false);
		_UI.glypheditcanvas.addEventListener('drop', dropSvgOnEditCanvas, false);
		_UI.glypheditcanvas.addEventListener('dragenter', canvasDragEnter, false);
	}

	function canvasDragEnter() {
		showToast('Drop a SVG file to import it');
	}

	function importSvgToCanvas(svgData) {
		var tempchar = ioSVG_convertTagsToGlyph(svgData);

		if(tempchar) {
			// Flip
			tempchar.flipNS();
			tempchar.reverseWinding();

			// Add new Glyph Shapes
			navigate({panel: 'npAttributes'});
			tempchar.copyShapesTo(getSelectedWorkItemID(), false, true);
			_UI.ms.shapes.getGlyph().ratiolock = true;
			clickTool('shaperesize');
			
			markSelectedWorkItemAsChanged();
			history_put("Pasted SVG to glyph "+getSelectedWorkItemName());
			
			showToast('Pasted ' + tempchar.shapes.length + ' shapes from SVG');
			redraw({calledby: 'importSvgToCanvas'});
		} else {
			// showToast('Could not import pasted SVG code.');
		}
	}

	function pasteSvgOnEditCanvas(event) {
		// debug('\n pasteSvgOnEditCanvas - START');

		// Stop data actually being pasted into div
		event.stopPropagation();
		event.preventDefault();

		// Get pasted data via clipboard API
		var clipboardData = event.clipboardData || window.clipboardData;
		var pasteData = clipboardData.getData('Text');
		// debug(pasteData);
		importSvgToCanvas(pasteData);

		// debug(' pasteSvgOnEditCanvas - END');
	}

	function dropSvgOnEditCanvas(evt) {
		// debug('\n dropSvgOnEditCanvas - START');
		evt.stopPropagation();
		evt.preventDefault();
		_UI.droptarget = false;

		var f = evt.dataTransfer;
		f = f.files[0] || '';
		// debug('\t filename: ' + f.name);
		var fname = f.name.split('.');
		fname = fname[fname.length-1].toLowerCase();
		// debug('\t fname = ' + fname);

		var reader = new FileReader();

		if (fname === 'svg'){
			reader.onload = function() {
				importSvgToCanvas(reader.result);
			};

			reader.readAsText(f);

		} else {
			showToast('Only SVG files can be dropped on the canvas');
		}

		// debug(' dropSvgOnEditCanvas - END\n');
	}

// end of file