// start of file
/**
 Framework > Event Handlers > Mouse
 All the canvas mouse interaction and tool
 events for all pages can be found here.
 **/

_UI.eventhandlers = {
	'currtool': false,
	'tempnewbasicshape' : false,
	'dragselectarea': false,
	'mousex' : 0,
	'mousey' : 0,
	'rotationcenter': false,
	'ismouseovercec' : false,
	'corner' : false,
	'toolhandoff' : false,
	'lastx' : -100,
	'lasty' : -100,
	'firstx' : -100,
	'firsty' : -100,
	'uqhaschanged' : false,
	'lastTool' : 'pathedit',
	'isSpaceDown' : false,
	'isShiftDown' : false,
	'hoverpoint' : false,
	'multi': false
};

function initEventHandlers() {
	// debug('\n initEventHandlers - START');

	_UI.eventhandlers.eh_pantool = new Tool_Pan();
	_UI.eventhandlers.eh_addrectoval = new Tool_NewBasicShape();
	_UI.eventhandlers.eh_shapeedit = new Tool_ShapeEdit();
	_UI.eventhandlers.eh_addpath = new Tool_NewPath();
	_UI.eventhandlers.eh_pathedit = new Tool_PathEdit();
	_UI.eventhandlers.eh_pathaddpoint = new Tool_PathAddPoint();
	_UI.eventhandlers.eh_slice = new Tool_Slice();
	_UI.eventhandlers.eh_kern = new Tool_Kern();

	// Mouse Event Listeners
	_UI.glypheditcanvas.addEventListener('mousedown', ev_canvas, false);
	_UI.glypheditcanvas.addEventListener('mousemove', ev_canvas, false);
	_UI.glypheditcanvas.addEventListener('mouseup',   ev_canvas, false);
	_UI.glypheditcanvas.customguidetransparency = mouseovercec;
	_UI.glypheditcanvas.onmouseout = mouseoutcec;
	_UI.glypheditcanvas.addEventListener('wheel', mousewheel, false);
	if (document.getElementById('navarea_panel')) {
		document.getElementById('navarea_panel').addEventListener('wheel', function(ev){ev.stopPropagation();}, false);
	}

	// Document Key Listeners
	getEditDocument().addEventListener('keypress', keypress, false);
	getEditDocument().addEventListener('keydown', keypress, false);
	getEditDocument().addEventListener('keyup', keyup, false);

	// The general-purpose event handler.
	function ev_canvas (ev) {

		//debug('EVENTHANDLER - Raw mouse event x/y = ' + ev.layerX + ' / ' + ev.layerY);
		mouseovercec();

		var eh = _UI.eventhandlers;

		if (ev.offsetX || ev.offsetX) {
			// IE, Chrome, (Opera?)
			eh.mousex = ev.offsetX;
			eh.mousey = ev.offsetY;
		} else if (ev.layerX || ev.layerX) {
			// Firefox
			eh.mousex = ev.layerX;
			eh.mousey = ev.layerY;
		}

		//debug('EV_CANVAS offsetx / offsety / layerx / layery: ' +  ev.offsetX + ' ' + ev.offsetY + ' ' + ev.layerX + ' ' + ev.layerY);

		// updateCursor();

		// Switch Tool function

		switch(_UI.selectedtool){
			case 'pathedit' : eh.currtool = eh.eh_pathedit; break;
			case 'shaperesize' : eh.currtool = eh.eh_shapeedit; break;
			case 'pan' : eh.currtool = eh.eh_pantool; break;
			case 'pathaddpoint' : eh.currtool = eh.eh_pathaddpoint; break;
			case 'newpath' : eh.currtool = eh.eh_addpath; break;
			case 'newrect' : eh.currtool = eh.eh_addrectoval; break;
			case 'newoval' : eh.currtool = eh.eh_addrectoval; break;
			case 'slice': eh.currtool = eh.eh_slice; break;
			case 'kern': eh.currtool = eh.eh_kern; break;
			case _UI.selectedtool: eh.currtool = eh.eh_pathedit;
		}

		// Call the event handler of the eh.currtool.
		eh.currtool[ev.type](ev);
	}
}



// ---------------------------------------------------------
// Shape Resize - resizes whole shapes (Arrow / Pointer)
// ---------------------------------------------------------
function Tool_ShapeEdit(){
	this.dragging = false;
	this.resizing = false;
	this.rotating = false;
	this.dragselecting = false;
	this.didstuff = false;
	this.clickedshape = false;
	_UI.eventhandlers.handle = false;

	this.mousedown = function (ev) {
		// debug('\n Tool_ShapeEdit.mousedown - START');
		// debug('\t x:y ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);

		this.didstuff = false;
		var eh = _UI.eventhandlers;
		eh.handle = false;
		eh.lastx = eh.mousex;
		eh.firstx = eh.mousex;
		eh.lasty = eh.mousey;
		eh.firsty = eh.mousey;

		this.clickedshape = getClickedShape(eh.mousex, eh.mousey);
		eh.handle = _UI.ms.shapes.isOverBoundingBoxHandle(eh.mousex, eh.mousey);

		// debug('\t clickshape: ' + this.clickedshape);
		// debug('\t corner: ' + eh.handle);
		this.resizing = false;
		this.dragging = false;
		this.rotating = false;
		this.dragselecting = false;

		if (eh.handle){
			if(eh.handle === 'rotate'){
				// debug('\t mousedown - setting rotating = true');
				this.rotating = true;
				eh.rotationcenter = _UI.ms.shapes.getCenter();
				eh.rotationstarttopy = _UI.ms.shapes.getMaxes().ymax + (_UI.rotatehandleheight / getView().dz);

			} else {
				// debug('\t clicked on eh.handle: ' + eh.handle);
				this.resizing = true;
			}
			setCursor(eh.handle);

		} else if (this.clickedshape){
			// debug('\t clicked on shape = true');
			this.dragging = true;

		} else if (!eh.multi){
			// debug('\t clicked on nothing');
			clickEmptySpace();
			this.dragselecting = true;
			findAndCallHotspot(eh.mousex, eh.mousey);
		}

		redraw({calledby:'Event Handler Tool_ShapeEdit mousedown'});
	};

	this.mousemove = function (ev) {
		var eh = _UI.eventhandlers;
		this.didstuff = false;
		var corner = eh.handle || _UI.ms.shapes.isOverBoundingBoxHandle(eh.mousex, eh.mousey);

		var dz = getView('Event Handler Tool_ShapeEdit mousemove').dz;
		var dx = ((eh.mousex-eh.lastx)/dz) || 0;
		var dy = ((eh.lasty-eh.mousey)/dz) || 0;

		if (this.dragging) {
			// debug('\n Tool_ShapeEdit.mousemove - dragging');
			var cur = 'arrowSquare';

			if(this.clickedshape){
				if(eh.multi) _UI.ms.shapes.add(this.clickedshape);
				else if (!_UI.ms.shapes.isSelected(this.clickedshape)){
					_UI.ms.shapes.select(this.clickedshape);
				}

				if(this.clickedshape.objtype === 'componentinstance') clickTool('shaperesize');
				_UI.current_panel = 'npAttributes';
			}

			var singleshape = _UI.ms.shapes.getSingleton();

			if(singleshape){
				cur = singleshape.isOverBoundingBoxHandle(eh.mousex, eh.mousey);
				if(!cur) cur = isOverShape(eh.mousex, eh.mousey)? 'arrowSquare' : 'arrow';
				dx = singleshape.xlock? 0 : dx;
				dy = singleshape.ylock? 0 : dy;
			}

			_UI.ms.shapes.updateShapePosition(dx, dy);
			this.didstuff = true;
			setCursor(cur);

		} else if (this.resizing){
			// debug('\n Tool_ShapeEdit.mousemove - resizing');
			eventHandler_ShapeResize();
			this.didstuff = true;

		} else if (this.rotating){
			var a1 = calculateAngle({x:cx_sx(eh.mousex), y:cy_sy(eh.mousey)}, eh.rotationcenter),
					a2 = calculateAngle({x:cx_sx(eh.lastx), y:cy_sy(eh.lasty)}, eh.rotationcenter);

			_UI.ms.shapes.rotate(a1-a2, eh.rotationcenter);
			this.didstuff = true;
			setCursor('rotate');

		} else if (corner){
			// debug('\n Tool_ShapeEdit.mousemove - corner ' + corner);
			// hovering over a corner
			setCursor(corner);

		} else if (eh.multi){
			setCursor('arrowPlus');

		} else if (isOverShape(eh.mousex, eh.mousey)){
			setCursor('arrowSquare');
	
		} else {
			// debug('\n Tool_ShapeEdit.mousemove - fallthrough else');
			setCursor('arrow');
		}

		checkForMouseOverHotspot(eh.mousex, eh.mousey);

		if(this.didstuff){
			eh.lastx = eh.mousex;
			eh.lasty = eh.mousey;
			eh.uqhaschanged = true;
			redraw({calledby:'Event Handler Tool_ShapeEdit mousemove'});
		}
	};

	this.mouseup = function () {
		// debug('Mouse Up');
		var eh = _UI.eventhandlers;

		// New Basic Shape
		if(eh.tempnewbasicshape){
			eh.tempnewbasicshape = false;
			eh.lastx = eh.firstx;
			eh.lasty = eh.firsty;
			eventHandler_ShapeResize();
		}

		// Clicked a shape to select
		if(this.clickedshape && !this.didstuff){
			if(eh.multi) _UI.ms.shapes.toggle(this.clickedshape);
			else _UI.ms.shapes.select(this.clickedshape);

			if(this.clickedshape.objtype === 'componentinstance') clickTool('shaperesize');
			else setCursor('arrowSquare');

			_UI.current_panel = 'npAttributes';
		}

		// Resized a shape
		if(this.resizing || this.rotating) _UI.ms.shapes.calcMaxes();
		updateCurrentGlyphWidth();

		// Finish Up
		this.clickedshape = false;
		this.didstuff = false;
		this.dragging = false;
		this.resizing = false;
		this.rotating = false;
		eh.handle = false;
		eh.lastx = -100;
		eh.lasty = -100;
		eh.firstx = -100;
		eh.firsty = -100;
		eh.rotationcenter = false;
		eh.rotationstarttopy = false;
		if(eh.uqhaschanged) history_put('Path Edit tool');
		eh.uqhaschanged = false;
		redraw({calledby:'Event Handler Tool_ShapeEdit mouseup'});
		// debug('EVENTHANDLER - after Tool_ShapeEdit Mouse Up REDRAW');
	};
}


// ---------------------------------------------------------
// New Basic Shape - adds many points to a new path
// ---------------------------------------------------------
function Tool_NewBasicShape(){
	this.dragging = false;

	this.mousedown = function (ev) {
		_UI.eventhandlers.tempnewbasicshape = {
			'xmax': cx_sx(_UI.eventhandlers.mousex),
			'xmin': cx_sx(_UI.eventhandlers.mousex),
			'ymax': cy_sy(_UI.eventhandlers.mousey),
			'ymin': cy_sy(_UI.eventhandlers.mousey)
		};

		var newshape = new Shape({'visible':false, 'name':'...'});
		newshape.path.maxes = _UI.eventhandlers.tempnewbasicshape;
		newshape = addShape(newshape);
		_UI.ms.shapes.select(newshape);

		_UI.eventhandlers.firstx = cx_sx(_UI.eventhandlers.mousex);
		_UI.eventhandlers.firsty = cy_sy(_UI.eventhandlers.mousey);

		this.dragging = true;

		redraw({calledby:'Event Handler Tool_NewBasicShape mousedown'});
		//debug('Tool_NewBasicShape MOUSEDOWN - after REDRAW');
	};

	this.mousemove = function (ev) {
		if(_UI.eventhandlers.tempnewbasicshape){
			_UI.eventhandlers.tempnewbasicshape.xmax = Math.max(_UI.eventhandlers.firstx, cx_sx(_UI.eventhandlers.mousex));
			_UI.eventhandlers.tempnewbasicshape.xmin = Math.min(_UI.eventhandlers.firstx, cx_sx(_UI.eventhandlers.mousex));
			_UI.eventhandlers.tempnewbasicshape.ymax = Math.max(_UI.eventhandlers.firsty, cy_sy(_UI.eventhandlers.mousey));
			_UI.eventhandlers.tempnewbasicshape.ymin = Math.min(_UI.eventhandlers.firsty, cy_sy(_UI.eventhandlers.mousey));

			_UI.eventhandlers.uqhaschanged = true;
			redraw({calledby:'Event Handler Tool_NewBasicShape mousemove'});
			//debug('Tool_NewBasicShape MOUSEMOVE past redraw');
		}
	};

	this.mouseup = function () {
		// prevent really small shapes
		var tnbs = _UI.eventhandlers.tempnewbasicshape;

		if ( (Math.abs(tnbs.xmax-tnbs.xmin) > _GP.projectsettings.pointsize) &&
			(Math.abs(tnbs.ymax-tnbs.ymin) > _GP.projectsettings.pointsize) ){

			var count = (_UI.current_page === 'components')? (getLength(_GP.components)) : getSelectedWorkItemShapes().length;
			var s = _UI.ms.shapes.getSingleton();

			if(_UI.selectedtool==='newrect'){
				s.name = ('Rectangle ' + count);
				s.path = rectPathFromMaxes(tnbs);
			} else {
				s.name = ('Oval ' + count);
				s.path = ovalPathFromMaxes(tnbs);
			}

			s.visible = true;
			//updateCurrentGlyphWidth();
		} else {
			_UI.ms.shapes.deleteShapes();
		}

		_UI.eventhandlers.firstx = -100;
		_UI.eventhandlers.firsty = -100;
		_UI.eventhandlers.tempnewbasicshape = false;
		history_put('New Basic Shape tool');
		_UI.eventhandlers.uqhaschanged = false;

		this.dragging = false;

		clickTool('pathedit');
	};
}


// ---------------------------------------------------------
// New Path - adds many points to a new path (Pen Plus)
// ---------------------------------------------------------
function Tool_NewPath(){
	this.dragging = false;
	this.firstpoint = true;
	this.currpt = {};
	this.newshape = false;

	this.mousedown = function (ev) {
		// debug('\n Tool_NewPath.mousedown - START');

		var eh = _UI.eventhandlers;
		var newpoint = new PathPoint({
			'P':new Coord({'x':cx_sx(eh.mousex), 'y':cy_sy(eh.mousey)}),
			'H1':new Coord({'x':cx_sx(eh.mousex-100), 'y':cy_sy(eh.mousey)}),
			'H2':new Coord({'x':cx_sx(eh.mousex+100), 'y':cy_sy(eh.mousey)}),
			'type':'flat',
			'useh1':false,
			'useh2':false
		});

		if(this.firstpoint) {
			// make a new shape with the new pathpoint
			var count = (_UI.current_page === 'components')? (getLength(_GP.components)) : getSelectedWorkItemShapes().length;
			this.newshape = addShape(new Shape({'name': ('Shape '+count), 'path':new Path()}));
			this.currpt = this.newshape.path.addPathPoint(newpoint);

		} else if(this.newshape){

			if(this.newshape.path.isOverFirstPoint(cx_sx(eh.mousex), cy_sy(eh.mousey))){
				//clicked on an existing control point in this path
				//if first point - close the path

				eh.toolhandoff = true;
				eh.eh_pathedit.dragging = true;
				eh.lastx = eh.mousex;
				eh.lasty = eh.mousey;
				_UI.ms.points.select(this.newshape.path.pathpoints[0]);
				_UI.selectedtool = 'pathedit';

				this.dragging = false;
				this.firstpoint = false;
				this.currpt = {};

				redraw({calledby:'Event Handler Tool_NewPath mousedown'});
				return;
			}

			this.currpt = this.newshape.path.addPathPoint(newpoint, false);
			// _UI.ms.points.select(this.currpt);
		}

		this.firstpoint = false;
		this.dragging = true;
		eh.lastx = eh.mousex;
		eh.lasty = eh.mousey;

		redraw({calledby:'Event Handler Tool_NewPath mousedown'});
		// debug(' Tool_NewPath.mousedown - END\n');
	};

	this.mousemove = function (ev) {
		var eh = _UI.eventhandlers;

		if(this.dragging){
			//avoid really small handles
			if((Math.abs(this.currpt.P.x-cx_sx(eh.mousex)) > (_GP.projectsettings.pointsize*2)) ||
				(Math.abs(this.currpt.P.y-cy_sy(eh.mousey)) > (_GP.projectsettings.pointsize*2)) ){
				this.currpt.useh1 = true;
				this.currpt.useh2 = true;
				this.currpt.H2.x = cx_sx(eh.mousex);
				this.currpt.H2.y = cy_sy(eh.mousey);
				this.currpt.makeSymmetric('H2');

			}

			setCursor('penCircle');
			eh.lastx = eh.mousex;
			eh.lasty = eh.mousey;
			eh.uqhaschanged = true;

			redraw({calledby:'Event Handler Tool_NewPath mousemove'});

		} else if(this.newshape && this.newshape.path.isOverFirstPoint(cx_sx(eh.mousex), cy_sy(eh.mousey))){
			setCursor('penSquare');

		} else {
			setCursor('penPlus');
		}

	};

	this.mouseup = function () {
		// debug('\n Tool_NewPath.mouseup - START');
		setCursor('penPlus');

		if(_UI.eventhandlers.uqhaschanged){
			if(this.newshape) this.newshape.path.calcMaxes();
			updateCurrentGlyphWidth();
			// For new shape tools, mouse up always adds to the undo-queue
			history_put('New Path tool');
			_UI.eventhandlers.uqhaschanged = false;
			redraw({calledby:'Event Handler Tool_NewPath mouseup'});
		}

		this.dragging = false;
		this.firstpoint = false;
		this.currpt = {};
		_UI.eventhandlers.lastx = -100;
		_UI.eventhandlers.lasty = -100;
		// debug(' Tool_NewPath.mouseup - END\n');
	};
}


// ---------------------------------------------------------
// Path Edit - selects points and moves points and handles (Pen)
// ---------------------------------------------------------
function Tool_PathEdit(){
	this.dragging = false;
	this.controlpoint = false;

	this.mousedown = function (ev) {
		// debug('\n Tool_PathEdit.mousedown - START');
		var eh = _UI.eventhandlers;
		eh.lastx = eh.mousex;
		eh.lasty = eh.mousey;
		this.controlpoint = getSelectedWorkItem().isOverControlPoint(cx_sx(eh.mousex), cy_sy(eh.mousey), eh.multi);
		var s = getClickedShape(eh.mousex, eh.mousey);

		// debug(this.controlpoint);

		if(this.controlpoint){
			this.dragging = true;
			if(this.controlpoint.type === 'P') {
				if(eh.multi) _UI.ms.points.toggle(this.controlpoint.point);
				else if(!_UI.ms.points.isSelected(this.controlpoint.point)) _UI.ms.points.select(this.controlpoint.point);
				setCursor('penSquare');
			} else {
				_UI.ms.points.handlesingleton = this.controlpoint.point;
				setCursor('penCircle');
			}

			// selectShapesThatHaveSelectedPoints();

		} else if(s){
			clickEmptySpace();
			_UI.ms.shapes.select(s);

		} else {
			_UI.ms.shapes.calcMaxes();
			clickEmptySpace();
			findAndCallHotspot(eh.mousex, eh.mousey);
		}

		if(_UI.ms.shapes.getMembers().length) _UI.current_panel = 'npAttributes';
		redraw({calledby:'Event Handler Tool_PathEdit mousedown'});
		// debug(' Tool_PathEdit.mousedown - END\n');
	};

	this.mousemove = function (ev) {
		// debug('\n Tool_PathEdit.mousemove - START');
		var eh = _UI.eventhandlers;
		var sp = _UI.ms.points;

		if(eh.toolhandoff){
			eh.toolhandoff = false;
			this.controlpoint = {
				'type': 'H2',
				'point': sp.getSingleton()
			};

			this.controlpoint.point.useh2 = true;
			this.controlpoint.point.H2.x = cx_sx(eh.mousex);
			this.controlpoint.point.H2.y = cy_sy(eh.mousey);
			_UI.ms.points.handlesingleton = this.controlpoint.point;

			this.dragging = true;

			// debug('\t TOOLHANDOFF this.controlpoint = ');
			// debug(this.controlpoint);
		}

		if(this.dragging) {
			// debug('\t Dragging');


			// Moving points if mousedown
			var dz = getView('Event Handler Tool_PathEdit mousemove').dz;
			var dx = (eh.mousex-eh.lastx)/dz;
			var dy = (eh.lasty-eh.mousey)/dz;
			var cpt = this.controlpoint.type;

			if(this.controlpoint.type === 'P') setCursor('penSquare');
			else setCursor('penCircle');

			var single = (sp.getMembers().length === 1);
			if(single){
				// debug('\t this.controlpoint.point ' + this.controlpoint.point);
				// debug('\t this.controlpoint.type ' + cpt);
				var cpx = this.controlpoint.point[cpt];
				if(cpx && cpx.xlock) dx = 0;
				if(cpx && cpx.ylock) dy = 0;
			}

var moved = false;
			sp.getMembers().forEach(function(point) {
			// debug('\t UpdatePPP ' + cpt + '\t' + dx + '\t' + dy);
				if(ev.ctrlKey || ev.metaKey) return;
moved = point.updatePathPointPosition(cpt, dx, dy, false, ev, single) || moved;
});

// debug(`\t moved: ${moved}`);

// If a point didn't move, it's because it was snapped back in place
// leave the last x/y alone if it didn't move
if(moved) {
_UI.ms.shapes.calcMaxes();

eh.lastx = eh.mousex;
eh.lasty = eh.mousey;
eh.uqhaschanged = true;
}

			// selectShapesThatHaveSelectedPoints();
			redraw({calledby:'Event Handler Tool_PathEdit mousemove'});
		}

		checkForMouseOverHotspot(eh.mousex, eh.mousey);

		var cp = _UI.ms.shapes.isOverControlPoint(cx_sx(eh.mousex), cy_sy(eh.mousey));
		if(cp.type === 'P') setCursor('penSquare');
		else if(_UI.ms.points.isSelected(cp.point)) setCursor('penCircle');
		if(!cp && eh.multi) setCursor('penPlus');

		// debug(' Tool_PathEdit.mousemove - END\n');
	};

	this.mouseup = function () {
		// debug('\n Tool_PathEdit.mouseup - START');
		var eh = _UI.eventhandlers;
		this.dragging = false;
		this.controlpoint = false;
		eh.toolhandoff = false;
		_UI.ms.points.handlesingleton = false;
		eh.lastx = -100;
		eh.lasty = -100;

		if(eh.uqhaschanged) {
			_UI.ms.shapes.calcMaxes();
			updateCurrentGlyphWidth();
			history_put('Path Edit tool');
			eh.uqhaschanged = false;
			redraw({calledby:'Event Handler Tool_PathEdit mouseup'});
		}
		// debug(' Tool_PathEdit.mouseup - END\n');
	};
}


// ---------------------------------------------------------
// Path Add Point - adds points to an existing path (Pen Plus)
// ---------------------------------------------------------
function Tool_PathAddPoint(){
	this.addpoint = false;

	this.mousedown = function(ev) {

		var singleshape = _UI.ms.shapes.getSingleton();
		var s = getClickedShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey);

		if(this.addpoint && singleshape && singleshape.objtype !== 'componentinstance'){
			var p = singleshape.path.insertPathPoint(this.addpoint.split, this.addpoint.point);
			if(p) _UI.ms.points.select(p);
			history_put('Added point to path');

		} else if(s){
			_UI.ms.points.clear();
			if(_UI.eventhandlers.multi) _UI.ms.shapes.add(s);
			else _UI.ms.shapes.select(s);

			if(s.objtype === 'componentinstance') clickTool('shaperesize');
			_UI.current_panel = 'npAttributes';

		} else {
			_UI.selectedtool = 'newpath';
			_UI.eventhandlers.currtool = _UI.eventhandlers.eh_addpath;
			_UI.eventhandlers.currtool.dragging = true;
			_UI.eventhandlers.currtool.firstpoint = true;
			_UI.eventhandlers.currtool.mousedown(ev);
		}

		_UI.eventhandlers.hoverpoint = false;
		redraw({calledby:'Tool_PathAddPoint.mousedown'});
	};

	this.mousemove = function(ev) {
		var singleshape = _UI.ms.shapes.getSingleton();
		if(singleshape){
			var pt = singleshape.path.getClosestPointOnCurve({'x':cx_sx(_UI.eventhandlers.mousex), 'y':cy_sy(_UI.eventhandlers.mousey)});
			if(pt && pt.distance < 20){
				this.addpoint = pt;
				var ptsize = _GP.projectsettings.pointsize;
				var ptx = (sx_cx(pt.x) - (ptsize/2)).makeCrisp();
				var pty = (sy_cy(pt.y) - (ptsize/2)).makeCrisp();
				openNotation(('x: ' + round(pt.x, 3) + '<br>y: ' + round(pt.y, 3)), ptx, pty);
				_UI.eventhandlers.hoverpoint = {'fill':_UI.colors.blue.l75, 'x':ptx, 'y':pty, 'size':ptsize};
			} else {
				this.addpoint = false;
				_UI.eventhandlers.hoverpoint = false;
				closeNotation();
			}
		} else {
			this.addpoint = false;
			_UI.eventhandlers.hoverpoint = false;
			closeNotation();
		}

		redraw({calledby:'Tool_PathAddPoint.mousemove', redrawpanels:false});
	};

	this.mouseup = function() {};
}



// ---------------------------------------------------------
// Slice - cuts a shape along a certain line
// ---------------------------------------------------------
function Tool_Slice(){

	this.mousedown = function(ev) {

		redraw({calledby:'Tool_PathAddPoint.mousedown'});
	};

	this.mousemove = function(ev) {

		redraw({calledby:'Tool_PathAddPoint.mousemove', redrawpanels:false});
	};

	this.mouseup = function() {};
}


// ---------------------------------------------------------
// Pan - moves the canvas view
// ---------------------------------------------------------
function Tool_Pan(){
	this.dragging = false;
	this.deltax = 0;
	this.deltay = 0;

	this.mousedown = function (ev) {
		//debug('PAN TOOL - mouse down: ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);
		var v = getView('Event Handler Tool_Pan mousedown');
		this.deltax = (_UI.eventhandlers.mousex-v.dx);
		this.deltay = (_UI.eventhandlers.mousey-v.dy);
		this.dragging = true;
	};

	this.mouseup = function () {
		//debug('PAN TOOL - Mouse Up');
		this.dragging = false;
		this.deltax = 0;
		this.deltay = 0;
	};

	this.mousemove = function (ev) {
		if (this.dragging) {
			// Moving shapes if mousedown
			setView({'dx' : (_UI.eventhandlers.mousex-this.deltax), 'dy' : (_UI.eventhandlers.mousey-this.deltay)});
			redraw({calledby:'Event Handler Tool_Pan mousemove', redrawpanels:false});
		}
	};
}


// ---------------------------------------------------------
// Kern - moves the left kern group
// ---------------------------------------------------------
function Tool_Kern(){
	this.dragging = false;
	this.deltax = 0;

	this.mousedown = function (ev) {
		//debug('Tool_Kern - mouse down: ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);
		var v = getView('Event Handler Tool_Kern mousedown');
		this.deltax = (_UI.eventhandlers.mousex);
		this.dragging = true;
	};

	this.mouseup = function () {
		//debug('Tool_Kern - Mouse Up');
		this.dragging = false;
		this.deltax = 0;
		history_put('Kern Adjustment: ' + getSelectedKern().value);
		// redraw({calledby:'Kern.mouseup'});
	};

	this.mousemove = function (ev) {
		if (this.dragging) {
			// Moving shapes if mousedown
			var sk = getSelectedKern();
			var val = (1*sk.value);
			updateKernValue(getSelectedKernID(), round(val + (1*(_UI.eventhandlers.mousex - this.deltax)/getView().dz)));
			this.deltax = (_UI.eventhandlers.mousex);
			redraw({calledby:'Kern.mousemove', redrawpanels:false});
		}
	};
}







// Helper Functions

function clickEmptySpace(){
	_UI.ms.points.clear();
	_UI.ms.shapes.clear();
}

function eventHandler_ShapeResize(){
	// debug('\n eventHandler_ShapeResize - START');
	var s = _UI.ms.shapes;
	var pcorner = _UI.eventhandlers.handle;
	// debug('\t handle ' + pcorner);

	var maxes = s.getMaxes();
	var mx = cx_sx(_UI.eventhandlers.mousex);
	var my = cy_sy(_UI.eventhandlers.mousey);
	var lx = cx_sx(_UI.eventhandlers.lastx);
	var ly = cy_sy(_UI.eventhandlers.lasty);
	var dh = (ly-my);
	var dw = (lx-mx);
	var rl = s.getAttribute('ratiolock');

	// debug('\t eventHandler_ShapeResize dw/dh/rl: ' + dw + '/' + dh + '/' + rl);

	// Check that the shape won't have negative dimensions
	if(mx >= maxes.xmax && maxes.xmax-maxes.xmin+dw < 2) dw=0;
	if(my >= maxes.ymax && maxes.ymax-maxes.ymin+dh < 2) dh=0;

	// Resize the shape
	switch(pcorner){
		case 'n':
			if(canResize('n')){
				setCursor('n-resize');
				s.updateShapeSize(0, dh*-1, rl);
			}
			break;

		case 'ne':
			if(canResize('ne')){
				setCursor('ne-resize');
				s.updateShapeSize(dw*-1, dh*-1, rl);
			}
			break;

		case 'e':
			if(canResize('e')){
				setCursor('e-resize');
				s.updateShapeSize(dw*-1, 0, rl);
			}
			break;

		case 'se':
			if(canResize('se')){
				setCursor('se-resize');
				s.updateShapeSize(dw*-1, dh, rl);
				s.updateShapePosition(0, dh*-1);
			}
			break;

		case 's':
			if(canResize('s')){
				setCursor('s-resize');
				s.updateShapePosition(0, dh*-1);
				s.updateShapeSize(0, dh, rl);
			}
			break;

		case 'sw':
			if(canResize('sw')){
				setCursor('sw-resize');
				s.updateShapeSize(dw, dh, rl);
				s.updateShapePosition(dw*-1, dh*-1);
			}
			break;

		case 'w':
			if(canResize('w')){
				setCursor('w-resize');
				s.updateShapeSize(dw, 0, rl);
				s.updateShapePosition(dw*-1, 0);
			}
			break;

		case 'nw':
			if(canResize('nw')){
				setCursor('nw-resize');
				s.updateShapeSize(dw, dh*-1, rl);
				s.updateShapePosition(dw*-1, 0);
			}
			break;
	}

	//if(!_UI.eventhandlers.tempnewbasicshape) s.calcMaxes();

	//debug('eventHandler_ShapeResize - Done lx/rx/ty/by: ' + s.path.maxes.xmin + ',' + s.path.maxes.xmax + ',' + s.path.maxes.ymax + ',' + s.path.maxes.ymin);
}

function checkForMouseOverHotspot(x, y) {

	if(isHotspotHere(x, y)){
		var hs = findAndUnderlineHotspot(x, y);
		setCursor('pointer');
		if(hs !== _UI.canvashotspothovering) redraw({calledby:'checkForMouseOverHotspot', redrawpanels:false, redrawtools:false});
		_UI.canvashotspothovering = hs;

	} else {
		if(_UI.canvashotspothovering) redraw({calledby:'checkForMouseOverHotspot', redrawpanels:false, redrawtools:false});
		_UI.canvashotspothovering = false;
	}
	
}

function updateTNBS(dx,dy,dw,dh){
	//debug('updateTNBS dx/dy/dw/dh = '+dx+' '+dy+' '+dw+' '+dh);
	_UI.eventhandlers.tempnewbasicshape.xmin += (dx);
	_UI.eventhandlers.tempnewbasicshape.ymax += (dy);
	_UI.eventhandlers.tempnewbasicshape.xmax += (dw+dx);
	_UI.eventhandlers.tempnewbasicshape.ymin += (dh+dy);
}

function updateDragSelectArea(dx,dy,dw,dh){
	//debug('updateDragSelectArea dx/dy/dw/dh = '+dx+' '+dy+' '+dw+' '+dh);
	_UI.eventhandlers.dragselectarea.xmin += (dx);
	_UI.eventhandlers.dragselectarea.ymax += (dy);
	_UI.eventhandlers.dragselectarea.xmax += (dw+dx);
	_UI.eventhandlers.dragselectarea.ymin += (dh+dy);
}

function canResize(pc){
	var rl = _UI.ms.shapes.getAttribute('ratiolock');
	var xl = _UI.ms.shapes.getAttribute('xlock');
	var yl = _UI.ms.shapes.getAttribute('ylock');
	var wl = _UI.ms.shapes.getAttribute('wlock');
	var hl = _UI.ms.shapes.getAttribute('hlock');
	var re = true;

	switch(pc){
		case 'nw': re = rl? false : (!yl && !hl && !xl && !wl); break;
		case 'n':  re = (!yl && !hl); break;
		case 'ne': re = rl? false : (!yl && !hl && !wl); break;
		case 'e':  re = (!wl); break;
		case 'se': re = rl? false : (!hl && !wl); break;
		case 's':  re = (!hl); break;
		case 'sw': re = rl? false : (!hl && !xl && !wl); break;
		case 'w':  re = (!xl && !wl);
	}

	// debug('\t canResize ' + pc + ' returning ' + re);
	return re;
}

function mousewheel(event){
	var delta = (event.deltaY*-1);
	//debug('MOUSEWHEEL - deltaY: ' + event.deltaY);

	var canzoom = onCanvasEditPage() && (document.getElementById('dialog_box').style.display !== 'block');

	if(canzoom){
		if(event.ctrlKey || event.metaKey){
			event.preventDefault();
			//debug('MOUSEWHEEL: canzoom=true and delta=' + delta );
			if(delta > 0){ viewZoom(1.1); }
			else { viewZoom(0.9); }
		}
	}
}

// end of file