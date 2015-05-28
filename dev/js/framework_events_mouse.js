// start of file
/**
	Framework > Event Handlers > Mouse
	All the canvas mouse interaction and tool
	events for all pages can be found here.
**/


	_UI.eventhandlers = {
		'currtool': false,
		'tempnewbasicshape' : false,
		'mousex' : 0,
		'mousey' : 0,
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
		_UI.eventhandlers.eh_kern = new Tool_Kern();

		// Mouse Event Listeners
		_UI.glypheditcanvas.addEventListener('mousedown', ev_canvas, false);
		_UI.glypheditcanvas.addEventListener('mousemove', ev_canvas, false);
		_UI.glypheditcanvas.addEventListener('mouseup',   ev_canvas, false);
		_UI.glypheditcanvas.onmouseover = mouseovercec;
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

			// Fixes a Chrome cursor problem
			document.onselectstart = function () { return false; };


			if (ev.offsetX || ev.offsetX) {
				// IE, Chrome, (Opera?)
				_UI.eventhandlers.mousex = ev.offsetX;
				_UI.eventhandlers.mousey = ev.offsetY;
			} else if (ev.layerX || ev.layerX) {
				// Firefox
				_UI.eventhandlers.mousex = ev.layerX;
				_UI.eventhandlers.mousey = ev.layerY;
			}

			//debug('EV_CANVAS offsetx / offsety / layerx / layery: ' +  ev.offsetX + ' ' + ev.offsetY + ' ' + ev.layerX + ' ' + ev.layerY);

			// updateCursor();

			// Switch Tool function

			switch(_UI.selectedtool){
				case 'pathedit' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_pathedit; break;
				case 'shaperesize' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_shapeedit; break;
				case 'pan' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_pantool; break;
				case 'pathaddpoint' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_pathaddpoint; break;
				case 'newpath' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_addpath; break;
				case 'newrect' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_addrectoval; break;
				case 'newoval' : _UI.eventhandlers.currtool = _UI.eventhandlers.eh_addrectoval; break;
				case 'kern': _UI.eventhandlers.currtool = _UI.eventhandlers.eh_kern; break;
				case _UI.selectedtool: _UI.eventhandlers.currtool = _UI.eventhandlers.eh_pathedit;
			}

			// Call the event handler of the _UI.eventhandlers.currtool.
			_UI.eventhandlers.currtool[ev.type](ev);
		}
	}



	// ---------------------------------------------------------
	// shape resize - resizes whole shapes
	// ---------------------------------------------------------
	function Tool_ShapeEdit(){
		this.dragging = false;
		this.resizing = false;
		this.didstuff = false;
		this.clickedshape = false;
		_UI.eventhandlers.corner = false;

		this.mousedown = function (ev) {
			debug('\n Tool_ShapeEdit.mousedown - START');
			debug('\t x:y ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);

			this.didstuff = false;
			var eh = _UI.eventhandlers;
			eh.corner = false;
			eh.lastx = eh.mousex;
			eh.firstx = eh.mousex;
			eh.lasty = eh.mousey;
			eh.firsty = eh.mousey;

			this.clickedshape = getClickedShape(eh.mousex, eh.mousey);
			eh.corner = _UI.ss.isOverBoundingBoxCorner(eh.mousex, eh.mousey);

			debug('\t clickshape: ' + this.clickedshape);
			debug('\t corner: ' + eh.corner);

			if(eh.corner){
				debug('\t clicked on eh.corner: ' + eh.corner);
				setCursor(eh.corner);
				this.resizing = true;
				this.dragging = false;

			} else if(this.clickedshape){
				debug('\t clicked on shape = true');
				this.dragging = true;
				this.resizing = false;

			} else {
				debug('\t clicked on nothing');
				clickEmptySpace();
			}

			redraw('Event Handler Tool_ShapeEdit mousedown');
		};

		this.mousemove = function (ev) {
			var eh = _UI.eventhandlers;
			this.didstuff = false;
			var corner = eh.corner || _UI.ss.isOverBoundingBoxCorner(eh.mousex, eh.mousey);

			var dx = ((eh.mousex-eh.lastx)/dz);
			var dy = ((eh.lasty-eh.mousey)/dz);
			var dz = getView('Event Handler Tool_ShapeEdit mousemove').dz;

			if (this.dragging) {
				var cur = 'pointer';

				if(this.clickedshape){
					if(eh.multi) _UI.ss.add(this.clickedshape);
					else if (!_UI.ss.isSelected(this.clickedshape)){
						_UI.ss.select(this.clickedshape);
					}

					this.clickedshape.selectPathPoint(false);

					if(this.clickedshape.objtype === 'componentinstance') clickTool('shaperesize');
					else setCursor('pointerSquare');

					_UI.navprimaryhere = 'npAttributes';
				}

				var singleton = _UI.ss.getSingleton();

				if(singleton){
					cur = singleton.isOverBoundingBoxCorner(eh.mousex, eh.mousey);
					if(!cur) cur = isOverShape(eh.mousex, eh.mousey)? 'pointerSquare' : 'pointer';
					dx = singleton.xlock? 0 : dx;
					dy = singleton.ylock? 0 : dy;
				}

				_UI.ss.updateShapePosition(dx, dy);
				this.didstuff = true;
				setCursor(cur);

			} else if (this.resizing){
				// debug('\tTool_ShapeEdit - Resizing Shape over handle');
				eventHandler_ShapeResize();
				this.didstuff = true;

			} else if (corner){
				setCursor(corner);

			} else {
				setCursor('pointer');
			}

			if(this.didstuff){
				eh.lastx = eh.mousex;
				eh.lasty = eh.mousey;
				eh.uqhaschanged = true;
				redraw('Event Handler Tool_ShapeEdit mousemove');
			}
		};


		this.mouseup = function () {
			// debug('Mouse Up');
			var eh = _UI.eventhandlers;

			setCursor('pointer');

			// New Basic Shape
			if(eh.tempnewbasicshape){
				eh.tempnewbasicshape = false;
				_UI.ss.hidden = false;
				eh.lastx = eh.firstx;
				eh.lasty = eh.firsty;
				eventHandler_ShapeResize();
			}

			// Clicked a shape to select
			if(this.clickedshape && !this.didstuff){
				if(eh.multi) _UI.ss.toggle(this.clickedshape);
				else _UI.ss.select(this.clickedshape);

				this.clickedshape.selectPathPoint(false);

				if(this.clickedshape.objtype === 'componentinstance') clickTool('shaperesize');
				else setCursor('pointerSquare');

				_UI.navprimaryhere = 'npAttributes';
			}

			// Resized a shape
			if(_UI.ss && this.resizing) _UI.ss.calcMaxes();
			updateCurrentGlyphWidth();

			// Finish Up
			this.clickedshape = false;
			this.didstuff = false;
			this.dragging = false;
			this.resizing = false;
			eh.lastx = -100;
			eh.lasty = -100;
			eh.firstx = -100;
			eh.firsty = -100;
			if(eh.uqhaschanged) history_put('Path Edit tool');
			eh.uqhaschanged = false;
			redraw('Event Handler Tool_ShapeEdit mouseup');
			// debug('EVENTHANDLER - after Tool_ShapeEdit Mouse Up REDRAW');
		};
	}


	// ---------------------------------------------------------
	// new basic shape - adds many points to a new path
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

			_UI.eventhandlers.firstx = cx_sx(_UI.eventhandlers.mousex);
			_UI.eventhandlers.firsty = cy_sy(_UI.eventhandlers.mousey);

			this.dragging = true;

			redraw('Event Handler Tool_NewBasicShape mousedown');
			//debug('Tool_NewBasicShape MOUSEDOWN - after REDRAW');
		};

		this.mousemove = function (ev) {
			if(_UI.eventhandlers.tempnewbasicshape){
				_UI.eventhandlers.tempnewbasicshape.xmax = Math.max(_UI.eventhandlers.firstx, cx_sx(_UI.eventhandlers.mousex));
				_UI.eventhandlers.tempnewbasicshape.xmin = Math.min(_UI.eventhandlers.firstx, cx_sx(_UI.eventhandlers.mousex));
				_UI.eventhandlers.tempnewbasicshape.ymax = Math.max(_UI.eventhandlers.firsty, cy_sy(_UI.eventhandlers.mousey));
				_UI.eventhandlers.tempnewbasicshape.ymin = Math.min(_UI.eventhandlers.firsty, cy_sy(_UI.eventhandlers.mousey));

				_UI.ss.path.maxes = _UI.eventhandlers.tempnewbasicshape;

				_UI.eventhandlers.uqhaschanged = true;
				redraw('Event Handler Tool_NewBasicShape mousemove');
				//debug('Tool_NewBasicShape MOUSEMOVE past redraw');
			}
		};

		this.mouseup = function () {
			// prevent really small shapes
			var tnbs = _UI.eventhandlers.tempnewbasicshape;

			if ( (Math.abs(tnbs.xmax-tnbs.xmin) > _GP.projectsettings.pointsize) &&
				(Math.abs(tnbs.ymax-tnbs.ymin) > _GP.projectsettings.pointsize) ){

				var count = (_UI.navhere === 'components')? (getLength(_GP.components)) : getSelectedWorkItemShapes().length;

				if(_UI.selectedtool==='newrect'){
					_UI.ss.name = ('Rectangle ' + count);
					_UI.ss.path = rectPathFromMaxes(tnbs);
				} else {
					_UI.ss.name = ('Oval ' + count);
					_UI.ss.path = ovalPathFromMaxes(tnbs);
				}

				_UI.ss.visible = true;
				//updateCurrentGlyphWidth();
			} else {
				deleteShape();
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
	// new path - adds many points to a new path
	// ---------------------------------------------------------
	function Tool_NewPath(){
		this.dragging = false;
		this.firstpoint = true;
		this.currpt = {};

		this.mousedown = function (ev) {
			//debug('Tool_NewPath MOUSEDOWN');
			var newpoint = new PathPoint({'P':new Coord({'x':cx_sx(_UI.eventhandlers.mousex), 'y':cy_sy(_UI.eventhandlers.mousey)}), 'H1':new Coord({'x':cx_sx(_UI.eventhandlers.mousex-100), 'y':cy_sy(_UI.eventhandlers.mousey)}), 'H2':new Coord({'x':cx_sx(_UI.eventhandlers.mousex+100), 'y':cy_sy(_UI.eventhandlers.mousey)}), 'type':'flat', 'selected':true, 'useh1':false, 'useh2':false});

			if(this.firstpoint) {
				//debug('Tool_NewPath MOUSEDOWN - tool.firstpoint=true, making a new path');
				//alert('EVENTHANDLER - Tool_NewPath mousedown - tool.firstpoint=true, making a new path');

				// make a new path with one point
				var newpath = new Path({'pathpoints':[newpoint]});
				//debug('Tool_NewPath MOUSEDOWN - after new path is made.');

				// make a new shape with the new path
				var count = (_UI.navhere === 'components')? (getLength(_GP.components)) : getSelectedWorkItemShapes().length;
				var newshape = addShape(new Shape({'name': ('Path '+count), 'path': newpath}));
				newshape.path.selectPathPoint(0);
				//debug('Tool_NewPath MOUSEDOWN - end of firstpoint, new shape added with new path with single point.');

			} else {
				//debug('Tool_NewPath MOUSEDOWN - after firstpoint, placing another point');
				var ccp = _UI.ss.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey));
				//debug('Tool_NewPath MOUSEDOWN - after creating ccp: ' + ccp);
				if((ccp==='P')&&(_UI.ss.path.pathpoints.length > 1)){
					var p = _UI.ss.path.pathpoints[0];
					var hp = _GP.projectsettings.pointsize/getView('Event Handler Tool_NewPath mousedown').dz;
					if( ((p.P.x+hp) > cx_sx(_UI.eventhandlers.mousex)) && ((p.P.x-hp) < cx_sx(_UI.eventhandlers.mousex)) && ((p.P.y+hp) > cy_sy(_UI.eventhandlers.mousey)) && ((p.P.y-hp) < cy_sy(_UI.eventhandlers.mousey)) ){
						//clicked on an existing control point in this path
						//if first point - close the path
						_UI.selectedtool = 'pathedit';
						_UI.eventhandlers.eh_pathedit.dragging = true;
						_UI.eventhandlers.eh_pathedit.controlpoint = 'H2';
						_UI.eventhandlers.toolhandoff = true;
						this.dragging = false;
						this.firstmove = false;
						_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
						_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
						redraw('Event Handler Tool_NewPath mousedown');
						return;
					}
				}

				_UI.ss.path.addPathPoint(newpoint, false);
				//debug('Tool_NewPath MOUSEDOWN - after AddPathPoint');
			}

			this.currpt = _UI.ss.path.sp(false, 'Event Handler New Path');
			this.firstpoint = false;
			this.dragging = true;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;

			redraw('Event Handler Tool_NewPath mousedown');
			//debug('Tool_NewPath MOUSEDOWN - end of function, this.currpt:\n' + JSON.stringify(newpoint));
		};

		this.mousemove = function (ev) {
			//debug('Tool_NewPath MOUSEMOVE');
			if(this.dragging){
				//avoid really small handles
				//debug('Tool_NewPath MOUSEMOVE - ps*2 = ' + (_GP.projectsettings.pointsize*2) + ' x / y: ' + Math.abs(this.currpt.P.x-cx_sx(_UI.eventhandlers.mousex)) + ' / ' + Math.abs(this.currpt.P.y-cy_sy(_UI.eventhandlers.mousey)) );
				if( (Math.abs(this.currpt.P.x-cx_sx(_UI.eventhandlers.mousex)) > (_GP.projectsettings.pointsize*2)) || (Math.abs(this.currpt.P.y-cy_sy(_UI.eventhandlers.mousey)) > (_GP.projectsettings.pointsize*2)) ){
					//debug('Tool_NewPath MOUSEMOVE - dragging H2, this.currpt:\n' + JSON.stringify(this.currpt));
					this.currpt.useh1 = true;
					this.currpt.useh2 = true;
					this.currpt.H2.x = cx_sx(_UI.eventhandlers.mousex);
					this.currpt.H2.y = cy_sy(_UI.eventhandlers.mousey);
					this.currpt.makeSymmetric('H2');
				} else {
					//debug('Tool_NewPath MOUSEMOVE - no handle created yet');
				}
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;

				redraw('Event Handler Tool_NewPath mousemove');
			}
		};

		this.mouseup = function () {
			//debug('Tool_NewPath MOUSEUP');
			_UI.ss.path.winding = _UI.ss.path.findWinding();
			this.dragging = false;
			this.firstmove = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;

			if(_UI.eventhandlers.uqhaschanged){
				_UI.ss.path.calcMaxes();
				updateCurrentGlyphWidth();
				// For new shape tools, mouse up always adds to the undo-queue
				history_put('New Path tool');
				_UI.eventhandlers.uqhaschanged = false;
				redraw('Event Handler Tool_NewPath mouseup');
			}
		};
	}


	// ---------------------------------------------------------
	// Path Edit - selects points and moves points and handles
	// ---------------------------------------------------------
	function Tool_PathEdit(){
		this.dragging = false;
		this.controlpoint = false;

		this.mousedown = function (ev) {
			//debug('mouse down: ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);
			var s = getClickedShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey);
			var singleton = _UI.ss.getSingleton();
			this.controlpoint = singleton? singleton.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey)) : false;


			if(this.controlpoint){
				this.dragging = true;
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				if(this.controlpoint === 'P') setCursor('penSquare');
				else setCursor('penCircle');

			} else if (s){
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;

				s.selectPathPoint(false);
				if(_UI.eventhandlers.multi) _UI.ss.add(s);
				else _UI.ss.select(s);

				if(s.objtype === 'componentinstance') clickTool('shaperesize');
				_UI.navprimaryhere = 'npAttributes';

			} else {
				_UI.ss.calcMaxes();
				clickEmptySpace();
			}
			redraw('Event Handler Tool_PathEdit mousedown');
		};

		this.mousemove = function (ev) {
			if (this.dragging) {
				var sp = _UI.ss.sp();
				if(_UI.eventhandlers.toolhandoff){
					sp.useh2 = true;
					sp.H2.x = cx_sx(_UI.eventhandlers.mousex);
					sp.H2.y = cy_sy(_UI.eventhandlers.mousey);
					_UI.eventhandlers.toolhandoff = false;
				}
				// Moving points if mousedown
				var dx = 0;
				var dy = 0;
				var dz = getView('Event Handler Tool_PathEdit mousemove').dz;
				switch (this.controlpoint){
					case 'P':
						if(!sp.P.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.P.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						setCursor('penSquare');
						break;
					case 'H1':
						if(!sp.H1.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.H1.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						setCursor('penCircle');
						break;
					case 'H2':
						if(!sp.H2.xlock) dx = (_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz;
						if(!sp.H2.ylock) dy = (_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz;
						setCursor('penCircle');
						break;
				}
				sp.updatePathPointPosition(this.controlpoint, dx, dy);
				_UI.ss.calcMaxes();

				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw('Event Handler Tool_PathEdit mousemove');
			}

			var singleton = _UI.ss.getSingleton();
			if(singleton){
				var cp = singleton.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey), true);
				if(cp === 'P') setCursor('penSquare');
				if(cp === 'H1' || cp === 'H2') setCursor('penCircle');
			}
		};

		this.mouseup = function () {
			this.dragging = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;

			if(_UI.eventhandlers.uqhaschanged) {
				_UI.ss.calcMaxes();
				updateCurrentGlyphWidth();
				history_put('Path Edit tool');
				_UI.eventhandlers.uqhaschanged = false;
				redraw('Event Handler Tool_PathEdit mouseup');
			}
		};
	}


	// ---------------------------------------------------------
	// path add point - adds points to an existing path
	// ---------------------------------------------------------
	function Tool_PathAddPoint(){
		this.addpoint = false;

		this.mousedown = function(ev) {

			var singleton = _UI.ss.getSingleton();
			var s = getClickedShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey);

			if(this.addpoint && singleton && singleton.objtype !== 'componentinstance'){
				singleton.path.insertPathPoint(this.addpoint.split, this.addpoint.point);
				history_put('Added point to path');

			} else if(s){
				s.selectPathPoint(false);
				if(_UI.eventhandlers.multi) _UI.ss.add(s);
				else _UI.ss.select(s);

				if(s.objtype === 'componentinstance') clickTool('shaperesize');
				_UI.navprimaryhere = 'npAttributes';

			} else {
				_UI.selectedtool = 'newpath';
				_UI.eventhandlers.currtool = _UI.eventhandlers.eh_addpath;
				_UI.eventhandlers.currtool.dragging = true;
				_UI.eventhandlers.currtool.firstpoint = true;
				_UI.eventhandlers.currtool.mousedown(ev);
			}

			_UI.eventhandlers.hoverpoint = false;
			redraw('Tool_PathAddPoint.mousedown');
		};

		this.mousemove = function(ev) {
			var singleton = _UI.ss.getSingleton();
			if(singleton){
				var pt = singleton.path.getClosestPointOnCurve({'x':cx_sx(_UI.eventhandlers.mousex), 'y':cy_sy(_UI.eventhandlers.mousey)});
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

			redraw('Tool_PathAddPoint.mousemove');
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
				redraw('Event Handler Tool_Pan mousemove');
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
		};

		this.mousemove = function (ev) {
			if (this.dragging) {
				// Moving shapes if mousedown
				var sk = getSelectedKern();
				var val = (1*sk.value);
				sk.value = val + (1*(_UI.eventhandlers.mousex - this.deltax)/getView().dz);
				this.deltax = (_UI.eventhandlers.mousex);
				redraw();
			}
		};
	}







	// Helper Functions

	function clickEmptySpace(){
		if(_UI.ss) {
			if(_UI.ss.path) _UI.ss.path.selectPathPoint(false);
			_UI.ss.calcMaxes();
		}
		_UI.ss.clear();
	}

	function eventHandler_ShapeResize(){
		debug('\n eventHandler_ShapeResize - START');
		var s = _UI.ss;
		var pcorner = _UI.eventhandlers.corner;
		debug('\t handle ' + pcorner);

		var maxes = s.getMaxes();
		var mx = cx_sx(_UI.eventhandlers.mousex);
		var my = cy_sy(_UI.eventhandlers.mousey);
		var lx = cx_sx(_UI.eventhandlers.lastx);
		var ly = cy_sy(_UI.eventhandlers.lasty);
		var dh = (ly-my);
		var dw = (lx-mx);
		var rl = (!s.wlock && !s.hlock && s.ratiolock);
		debug('\t dw: ' + dw + '\tdh: ' + dh);

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
					s.updateShapeSize(0, dh, rl);
					s.updateShapePosition(0, dh*-1);
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

	function updateTNBS(dx,dy,dw,dh){
		//debug('updateTNBS dx/dy/dw/dh = '+dx+' '+dy+' '+dw+' '+dh);
		_UI.eventhandlers.tempnewbasicshape.xmin += (dx);
		_UI.eventhandlers.tempnewbasicshape.ymax += (dy);
		_UI.eventhandlers.tempnewbasicshape.xmax += (dw+dx);
		_UI.eventhandlers.tempnewbasicshape.ymin += (dh+dy);
	}

	function canResize(pc){
		var s = _UI.ss;
		var rl = s.ratiolock;

		switch(pc){
			case 'nw': return rl? false : (!s.ylock && !s.hlock && !s.xlock && !s.wlock);
			case 'n':  return (!s.ylock && !s.hlock);
			case 'ne': return rl? false : (!s.ylock && !s.hlock && !s.wlock);
			case 'e':  return (!s.wlock);
			case 'se': return rl? false : (!s.hlock && !s.wlock);
			case 's':  return (!s.hlock);
			case 'sw': return rl? false : (!s.hlock && !s.xlock && !s.wlock);
			case 'w':  return (!s.xlock && !s.wlock);
		}
		return true;
	}

	function mousewheel(event){
		var delta = (event.deltaY*-1);
		//debug('MOUSEWHEEL - deltaY: ' + event.deltaY);

		var canzoom = onCanvasEditPage() && (document.getElementById('dialog_box').style.display !== 'block');

		if(canzoom){
			if(event.ctrlKey){
				event.preventDefault();
				//debug('MOUSEWHEEL: canzoom=true and delta=' + delta );
				if(delta > 0){ viewZoom(1.1); }
				else { viewZoom(0.9); }
			}
		}
	}

// end of file