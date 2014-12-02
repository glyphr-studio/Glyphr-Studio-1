// start of file

//-------------------
// Common Edit Page
//-------------------

	function editPage_Content(){
		return ''+
			'<div id="notation"> [ Loading... ] </div>' +
			'<canvas id="chareditcanvas" width=12 height=12 ></canvas>' +
			'<div id="toolsarea"> [ Loading... ] </div>' +
			'<div id="viewarea"> [ Loading... ] </div>' +
			makeFloatLogo();
	}

//-------------------
// REDRAW
//-------------------
	function redraw(calledby){
		// debug('\n::::::::::::::::::::::\n REDRAW \t START');
		// debug('\t navhere: ' + _UI.navhere);
		// debug('\t called By: ' + calledby);
		// debug('\t selected char: ' + _UI.selectedchar);
		var start = Date.now();

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;

		if(window.requestAnimationFrame) window.requestAnimationFrame(redrawUnit);
		else redrawUnit();

		_UI.redrawing = false;

		// debug('REDRAW DONE\t' + (Date.now() - start) + ' ms\n::::::::::::::::::::::\n\n');
	}

	function redrawUnit() {
		_UI.chareditctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);

		switch (_UI.navhere){
			case 'character edit': redraw_CharacterEdit(); break;
			case 'linked shapes': redraw_LinkedShapes(); break;
			case 'ligatures': redraw_CharacterEdit(); break;
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
	}


//-------------------
// Update Tools
//-------------------
	function update_ToolsArea(){
		// debug('\n update_ToolsArea - START');

		if(!onCanvasEditPage()) return;

		if(!isWorkItemSelected()){
			getEditDocument().getElementById("toolsarea").innerHTML = '';
			return;
		}

		var patheditclass = '';
		var pathaddpointclass = '';
		var penclickable = true;
		var onchar = (_UI.navhere === 'character edit');
		var onlink = (_UI.navhere === 'linked shapes');
		var onlig = (_UI.navhere === 'ligatures');
		var onkern = (_UI.navhere === 'kerning');

		var s = ss('Charedit: UpdateTools');

		if(onlink) {
			if(!_GP.linkedshapes[_UI.selectedshape]) { s = false; }
		}

		if(_UI.selectedtool === 'pathedit'){
			patheditclass = 'buttonsel';
		} else if (s && s.link && _UI.navhere !== 'linked shapes'){
			patheditclass = 'buttondis';
			penclickable = false;
		}

		if(_UI.selectedtool === 'pathaddpoint'){
			pathaddpointclass = 'buttonsel';
		} else if (s && s.link && _UI.navhere !== 'linked shapes'){
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
		zoom += "<button title='zoom: full em' class='tool' onclick='setView(clone(_UI.defaultview)); redraw(\"updatetools\");'>"+makeToolButton({'name':'tool_zoomEm'})+"</button>";
		zoom += "<button title='zoom level' class='tool zoomreadout'>" + round(getView("updatetools").dz*100, 2) + "%</button>";
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
		edittools += "<button title='add path point' class='" + pathaddpointclass + " tool' " + (penclickable? "onclick='clickTool(\"pathaddpoint\");'":"") + "/>"+makeToolButton({'name':'tool_penPlus', 'selected':(st==='pathaddpoint')})+"</button>";
		edittools += "<button title='path edit' class='" + patheditclass + " tool' " + (penclickable? "onclick='clickTool(\"pathedit\");'":"") + "/>"+makeToolButton({'name':'tool_pen', 'selected':(st==='pathedit')})+"</button>";
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

		if(onchar || onlig) toolcontent += newshape;
		var sls = getSelectedChar();
		if(onlink && sls && !sls.shape) toolcontent += newshape;

		if(onchar || onlink || onlig) toolcontent += edittools;

		if(onkern) toolcontent += kern;

		if(_GP.projectsettings.showkeyboardtipsicon) toolcontent += '<button title="keyboard and mouse tips" onclick="toggleKeyboardTips();" id="keyboardtips">'+makeIcon({'name':'keyboard', 'size':50, 'color':'rgb(229,234,239)'})+'</button>';

		getEditDocument().getElementById("toolsarea").innerHTML = toolcontent;
		getEditDocument().getElementById("viewarea").innerHTML = viewcontent;

	}

	function clickTool(ctool){

		_UI.selectedtool = ctool;
		var s = ss("clicktool");

		//debug("CLICKTOOL - was passed: " + ctool + " and _UI.selectedtool now is: " + _UI.selectedtool);
		_UI.eventhandlers.eh_addpath.firstpoint = true;

		if(ctool === "newrect"){
			setCursor('crosshairsSquare');
			_UI.selectedshape = -1;
		} else if (ctool === "newoval"){
			setCursor('crosshairsCircle');
			_UI.selectedshape = -1;
		} else if (ctool === "newpath"){
			setCursor('penPlus');
			_UI.selectedshape = -1;
		} else if(ctool === "pathedit"){
			setCursor('pen');
			if(s && s.path) {s.path.selectPathPoint(0);}
			//debug("clickTool() - setting selectPathPoint = 0");
		} else if (ctool === "shaperesize"){
			setCursor('pointer');
			if(s && s.path){ s.path.calcMaxes(); }
		}

		updateCursor();
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
				// debug('\t not setting cursor');
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
		
		if(_UI.cursors[name]){
			// debug('\t FOUND CUSTOM CURSOR');
			getEditDocument().body.style.cursor = _UI.cursors[name];
		} else if (cur.indexOf(name) > -1) {
			// debug('\t FOUND BUILT-IN CURSOR');
			getEditDocument().body.style.cursor = name;
		} else {
			// debug('\t DEFAULT TO auto');
			getEditDocument().body.style.cursor = 'auto';
		}

		// debug(' setCursor - END\n');
	}

	function toggleKeyboardTips(){

		if(document.getElementById('dialog_box').style.display==='block'){
			closeDialog();
		} else {
			var con = "<h1>Keyboard and Mouse Shortcuts</h1>";

			con += makeKeyboardShortcutsTable();

			con += "<table><tr><td style='vertical-align:top; padding:20px 10px 0px 0px;'>"+
				checkUI("_GP.projectsettings.showkeyboardtipsicon")+
			"</td><td style='vertical-align:top; padding:20px 10px 0px 0px;'>"+
				"<label style='position:relative; top:-5px;' for='showkeyboardtipsicon'>show the &nbsp;<span style='position:relative; top:6px;'>"+makeIcon({'name':'keyboard', 'size':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+"</span>&nbsp; button</label>"+
			"</td></tr></table>";

			openDialog(con);
		}
	}

	function makeKeyboardShortcutsTable() {
			var con = "<table style='margin:20px 40px 40px 0px;'><tr><td colspan=2>"+

			"<table>"+
			"<tr><td class='keycol'><span class='keycallout'>?</span></td><td>toggles this shortcuts dialog</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Project file</td></tr>"+
			"</table>"+

			"</td></tr><tr><td>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>c</span></td><td>copy selected shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>v</span></td><td>paste shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>z</span></td><td>undo</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>delete</span></td><td>delete selected shape</td></tr>"+
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

		var sc = (_UI.navhere === 'kerning')? getSelectedKernID() : getSelectedCharID();
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

		//debug('SETVIEW - passed ' + JSON.stringify(oa) + ' selectedchar ' + _UI.selectedchar + ' VIEWS is\n' + JSON.stringify(_UI.views));
	}

	function getView(calledby){
		//debug('GETVIEW - called by ' + calledby);
		var onkern = (_UI.navhere === 'kerning');
		var sc = onkern? getSelectedKernID() : getSelectedCharID();
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

		var v = getView(),
			deltax = (_UI.eventhandlers.mousex-v.dx),
			deltay = (_UI.eventhandlers.mousey-v.dy);

		setView({
			'dz' : round(getView('viewZoom').dz*=zfactor, 2),
			'dx' : (_UI.eventhandlers.mousex-(deltax*zfactor)),
			'dy' : (_UI.eventhandlers.mousey-(deltay*zfactor))
		});
		redraw('viewZoom');
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


//	-------------------------
//	Global Get Selected Char and Shape
//	-------------------------
	function isWorkItemSelected() {
		switch(_UI.navhere){
			case 'character edit': return true;
			case 'linked shapes': return _UI.selectedlinkedshape;
			case 'ligatures': return _UI.selectedchar;
			case 'kerning': return _UI.selectedkern;
		}

		return false;
	}

	function getCurrentWorkItemName() {
		switch(_UI.navhere){
			case 'character edit':
			case 'linked shapes':
				return getSelectedCharName();
			case 'ligatures':
				return 'ligature ' + getSelectedCharName();
			case 'kerning':
				return getSelectedKern().getName();
		}

		return 'no working object';
	}

	function ss(req){
		req = req || '[probably a dynamically-generated page control]';
		// debug('\nSS - START');
		// debug('\t Requested by: ' + req);
		// debug('\t selectedshape: ' + _UI.selectedshape);

		var scs = getSelectedCharShapes();

		if(_UI.navhere === 'linked shapes'){
			// debug('\t LINKED SHAPES returning selectedlinkedshape: ' + _UI.selectedlinkedshape);
			return scs[0] || false;
		}

		if(_UI.selectedshape !== -1){
			if((_UI.selectedshape >= 0) && (_UI.selectedshape < scs.length)) {
				// Charedit Selected Shape
				// debug('SS - returning shape object for position ' + _UI.selectedshape);
				return scs[_UI.selectedshape];
			} else {
				// Out of bounds Selected Shape
				// debug('SS - returning false - Selected Shape outside of expected boundary');
				_UI.selectedshape = -1;
				return false;
			}
		} else {
			// -1 = 'no shape selected'
			// debug('SS - returning false, ss=-1 no shape selected');
			return false;
		}
	}


//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){
		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			// var zupm = (ps.upm * v.dz);
			// var gutter = ((_UI.chareditcanvassize*v.dz) - zupm)/2;
			// var zasc = (ps.ascent * v.dz);
			var xs = {};
			xs.xmax = _UI.chareditcanvassize;
			xs.xmin = 0;
			xs.ymax = _UI.chareditcanvassize;
			xs.ymin = 0;
			//debug('GRID: zupm:' + zupm + ' gutter:' + gutter + ' zasc:' + zasc + ' xs:' + JSON.stringify(xs));

			// background white square
			_UI.chareditctx.fillStyle = 'white';
			_UI.chareditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);
			//debug('GRID:\nascent / xheight / descent = '+ ps.ascent+ '/' + ps.xheight+ '/' + (ps.ascent-ps.upm));

			var gsize = ((ps.upm/ps.griddivisions)*v.dz);
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _GP.projectsettings.colors.grid || ((new GlyphrProject()).projectsettings.colors.grid);
			//debug('GRID - gridsize set as: ' + gsize);

			var horizontal = function(y){
				y = y.makeCrisp();
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(xs.xmin,y);
				_UI.chareditctx.lineTo(xs.xmax,y);
				_UI.chareditctx.stroke();
				_UI.chareditctx.closePath();
			};

			var vertical = function(x){
				x = x.makeCrisp();
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(x,xs.ymin);
				_UI.chareditctx.lineTo(x,xs.ymax+1);
				_UI.chareditctx.stroke();
				_UI.chareditctx.closePath();
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

		if(!isWorkItemSelected()) return;

		var ps = _GP.projectsettings;
		var oncharedit = (_UI.navhere === 'character edit' || _UI.navhere === 'ligatures');
		var onkern = (_UI.navhere === 'kerning');
		// debug('\t ps.guides: ');
		// debug(ps.guides);

		if(_UI.showguides){
			// Update custom guides
			var g;
			for(var c in ps.guides){if(ps.guides.hasOwnProperty(c)){
				g = ps.guides[c];
				if(g.editable){
					g.draw();
				}
			}}

			// Update system guides
			ps.guides.xheight.location = ps.xheight;
			ps.guides.capheight.location = ps.capheight;
			ps.guides.ascent.location = ps.ascent;
			ps.guides.baseline.location = 0;
			ps.guides.descent.location = (ps.ascent-ps.upm);
			ps.guides.leftside.location = 0;
			ps.guides.rightside.location = ps.upm;

			// Minor Guidelines - Overshoots
			if(_UI.showovershoots){
				var os = ps.overshoot;
				ps.guides.xheight.draw(-1*os);
				ps.guides.ascent.draw(-1*os);
				ps.guides.baseline.draw(os);
				ps.guides.descent.draw(os);
			}

			// Char Width or Kerning
			var sc = getSelectedChar();
			if(oncharedit){
				ps.guides.leftside.draw(getSelectedCharLeftSideBearing()*-1);

				var rhl = sc.charwidth;
				if(_UI.eventhandlers.tempnewbasicshape) rhl = Math.max(rhl, _UI.eventhandlers.tempnewbasicshape.xmax);
				ps.guides.rightside.location = rhl;
				ps.guides.rightside.draw(getSelectedCharRightSideBearing());
				ps.guides.rightside.draw();
			} else if (onkern){
				_UI.guides.leftgroup_xmax.location = getSelectedKern().value;
			}

			// Major Guidelines
			ps.guides.xheight.draw();
			ps.guides.capheight.draw();
			ps.guides.ascent.draw();
			ps.guides.descent.draw();
			if (!onkern) ps.guides.leftside.draw();
			ps.guides.baseline.draw();
			if(onkern) _UI.guides.leftgroup_xmax.draw();
			if(onkern) _UI.guides.rightgroup_xmin.draw();

			// Out of bounds triangle
			if(!onkern && (ps.guides.baseline.visible || ps.guides.leftside.visible)){
				var v = getView('guides');
				_UI.chareditctx.fillStyle = ps.guides.baseline.color;
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(v.dx, v.dy);
				_UI.chareditctx.lineTo(v.dx, v.dy+(ps.pointsize*2));
				_UI.chareditctx.lineTo(v.dx-(ps.pointsize*2), v.dy);
				_UI.chareditctx.closePath();
				_UI.chareditctx.fill();
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
		_UI.ishereghostcanvas.height = _UI.chareditcanvassize;
		_UI.ishereghostcanvas.width = _UI.chareditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = 'cyan';
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = 'transparent';
	}

	function setupEditCanvas(){
		_UI.chareditcanvas = getEditDocument().getElementById('chareditcanvas');
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext('2d');
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;
	}

// end of file