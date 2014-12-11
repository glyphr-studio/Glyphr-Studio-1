// start of file

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
		'hoverpoint' : false
	};

	function initEventHandlers() {
		_UI.eventhandlers.eh_pantool = new Tool_Pan();
		_UI.eventhandlers.eh_addrectoval = new Tool_NewBasicShape();
		_UI.eventhandlers.eh_shapeedit = new Tool_ShapeEdit();
		_UI.eventhandlers.eh_addpath = new Tool_NewPath();
		_UI.eventhandlers.eh_pathedit = new Tool_PathEdit();
		_UI.eventhandlers.eh_pathaddpoint = new Tool_PathAddPoint();
		_UI.eventhandlers.eh_kern = new Tool_Kern();

		// Mouse Event Listeners
		_UI.chareditcanvas.addEventListener('mousedown', ev_canvas, false);
		_UI.chareditcanvas.addEventListener('mousemove', ev_canvas, false);
		_UI.chareditcanvas.addEventListener('mouseup',   ev_canvas, false);
		_UI.chareditcanvas.onmouseover = mouseovercec;
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.addEventListener('wheel', mousewheel, false);
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

				ss().path.maxes = _UI.eventhandlers.tempnewbasicshape;

				_UI.eventhandlers.uqhaschanged = true;
				redraw('Event Handler Tool_NewBasicShape mousemove');
				//debug('Tool_NewBasicShape MOUSEMOVE past redraw');
			}
		};

		this.mouseup = function () {
			// prevent really small shapes
			var newshape = ss('NEWSHAPE MOUSEUP');
			var tnbs = _UI.eventhandlers.tempnewbasicshape;

			if ( (Math.abs(tnbs.xmax-tnbs.xmin) > _GP.projectsettings.pointsize) &&
				(Math.abs(tnbs.ymax-tnbs.ymin) > _GP.projectsettings.pointsize) ){

				var count = (_UI.navhere === 'linked shapes')? (getLength(_GP.linkedshapes)) : getSelectedCharShapes().length;

				if(_UI.selectedtool==='newrect'){
					newshape.name = ('Rectangle ' + count);
					newshape.path = rectPathFromMaxes(tnbs);
				} else {
					newshape.name = ('Oval ' + count);
					newshape.path = ovalPathFromMaxes(tnbs);
				}

				newshape.visible = true;
				//updateCurrentCharWidth();
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
	// Shape Resize - resizes whole shapes
	// ---------------------------------------------------------
	function Tool_ShapeEdit(){
		this.dragging = false;
		this.resizing = false;
		_UI.eventhandlers.corner = false;

		this.mousedown = function (ev) {
			// debug('\nTool_ShapeEdit TOOL - mouse down: ' + _UI.eventhandlers.mousex + ':' + _UI.eventhandlers.mousey);
			var s = ss('eventHandler - mousedown');
			_UI.eventhandlers.corner = s? s.isOverHandle(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey) : false;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.firstx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			_UI.eventhandlers.firsty = _UI.eventhandlers.mousey;

			if (_UI.eventhandlers.corner){
				// debug('Tool_ShapeEdit TOOL: clicked on _UI.eventhandlers.corner: ' + _UI.eventhandlers.corner);
				this.resizing = true;
				this.dragging = false;
			} else if (clickSelectShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				this.dragging = true;
				this.resizing = false;
				setCursor('pointerSquare');
				redraw('Event Handler Tool_ShapeEdit mousedown');
			} else {
				clickEmptySpace();
			}
		};

		this.mousemove = function (ev) {
			var s = ss('eventHandler - Tool_ShapeEdit mousemove');
			// debug('\nTool_ShapeEdit TOOL - ss returned s.link: ' + s.link);
			var didstuff = false;
			var dz = getView('Event Handler Tool_ShapeEdit mousemove').dz;
			if(s.link){
				// debug('\tTool_ShapeEdit dragging linked shape');
				if(this.dragging && !s.uselinkedshapexy){
					// debug('Tool_ShapeEdit, this.dragging=' + this.dragging + ' && !s.uselinkedshapexy=' + !s.uselinkedshapexy);
					s.xpos += ((_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz);
					s.ypos += ((_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz);
					didstuff = true;
					setCursor('pointerSquare');
				}
			} else if (s){
				// debug('\tTool_ShapeEdit dragging normal shape');
				if (this.dragging) {
					// Moving shapes if mousedown
					// debug('\tTool_ShapeEdit - Moving Shape on Drag');
					var dx = s.xlock? 0 : dx = ((_UI.eventhandlers.mousex-_UI.eventhandlers.lastx)/dz);
					var dy = s.ylock? 0 : dy = ((_UI.eventhandlers.lasty-_UI.eventhandlers.mousey)/dz);

					s.path.updatePathPosition(dx, dy);
					didstuff = true;
					setCursor('pointerSquare');
				} else if (this.resizing){
					// Resizing shapes if mousedown over handle
					// debug('\tTool_ShapeEdit - Resizing Shape over handle');
					evHanShapeResize(s, _UI.eventhandlers.corner);
					didstuff = true;
				} else {
					setCursor('pointer');
				}

				//Translation fidelity, passing raw canvas values
				if(s && !this.resizing) s.isOverHandle(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey);
			}
			
			if(didstuff){
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw('Event Handler Tool_ShapeEdit mousemove');
			} else if(isOverShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				setCursor('pointerSquare');
			}
		};


		this.mouseup = function () {
			// debug('Mouse Up');
			setCursor('pointer');
			var s = ss('eventHandler - mouseup');
			if(_UI.eventhandlers.tempnewbasicshape){
				_UI.eventhandlers.tempnewbasicshape = false;
				s.hidden = false;
				_UI.eventhandlers.lastx = _UI.eventhandlers.firstx;
				_UI.eventhandlers.lasty = _UI.eventhandlers.firsty;
				evHanShapeResize(s, _UI.eventhandlers.corner);
			}

			if(this.resizing) s.path.calcMaxes();
			updateCurrentCharWidth();

			this.dragging = false;
			this.resizing = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;
			_UI.eventhandlers.firstx = -100;
			_UI.eventhandlers.firsty = -100;
			if(_UI.eventhandlers.uqhaschanged) history_put('Path Edit tool');
			_UI.eventhandlers.uqhaschanged = false;
			redraw('Event Handler Tool_ShapeEdit mouseup');
			// debug('EVENTHANDLER - after Tool_ShapeEdit Mouse Up REDRAW');
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
				var count = (_UI.navhere === 'linked shapes')? (getLength(_GP.linkedshapes)) : getSelectedCharShapes().length;
				var newshape = addShape(new Shape({'name': ('Path '+count), 'path': newpath}));
				newshape.path.selectPathPoint(0);
				//debug('Tool_NewPath MOUSEDOWN - end of firstpoint, new shape added with new path with single point.');

			} else {
				//debug('Tool_NewPath MOUSEDOWN - after firstpoint, placing another point');
				var currpath = ss('Event Handler New Path').path;
				var ccp = currpath.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey));
				//debug('Tool_NewPath MOUSEDOWN - after creating ccp: ' + ccp);
				if((ccp==='P')&&(currpath.pathpoints.length > 1)){
					var p = currpath.pathpoints[0];
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

				currpath.addPathPoint(newpoint, false);
				//debug('Tool_NewPath MOUSEDOWN - after AddPathPoint');
			}

			this.currpt = ss('Event Handler New Path').path.sp(false, 'Event Handler New Path');
			this.firstpoint = false;
			this.dragging = true;
			_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
			_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;

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
			var currpath = ss('Event Handler New Path').path;
			currpath.winding = currpath.findWinding();
			this.dragging = false;
			this.firstmove = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;

			if(_UI.eventhandlers.uqhaschanged){
				currpath.calcMaxes();
				updateCurrentCharWidth();
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
			var s = ss('Path Edit - Mouse Down');
			this.controlpoint = s? s.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey)) : false;
			if(this.controlpoint){
				this.dragging = true;
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				if(this.controlpoint === 'P') setCursor('penSquare');
				else setCursor('penCircle');
			} else if (clickSelectShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				//clickSelectShape checks to switch the tool if need be.
				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
			} else {
				if(s){s.path.calcMaxes();}
				clickEmptySpace();
			}
			redraw('Event Handler Tool_PathEdit mousedown');
		};

		this.mousemove = function (ev) {
			var s = ss('Path Edit - Mouse Move');
			if (this.dragging) {
				var sp = s.path.sp();
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
				s.path.calcMaxes();

				_UI.eventhandlers.lastx = _UI.eventhandlers.mousex;
				_UI.eventhandlers.lasty = _UI.eventhandlers.mousey;
				_UI.eventhandlers.uqhaschanged = true;
				redraw('Event Handler Tool_PathEdit mousemove');
			}

			if(s){
				var cp = s.path.isOverControlPoint(cx_sx(_UI.eventhandlers.mousex), cy_sy(_UI.eventhandlers.mousey), true);
				if(cp === 'P') setCursor('penSquare');
				if(cp === 'H1' || cp === 'H2') setCursor('penCircle');
			}
		};

		this.mouseup = function () {
			this.dragging = false;
			_UI.eventhandlers.lastx = -100;
			_UI.eventhandlers.lasty = -100;

			if(_UI.eventhandlers.uqhaschanged) {
				ss('Path Edit - Mouse Up').path.calcMaxes();
				updateCurrentCharWidth();
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
			if(this.addpoint){
				var s = ss();
				if(s && s.path){
					s.path.insertPathPoint(this.addpoint.split, this.addpoint.point);
				}
			} else if (clickSelectShape(_UI.eventhandlers.mousex, _UI.eventhandlers.mousey)){
				// selected the shape
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
			var s = ss();
			if(s){
				var pt = s.path.getClosestPointOnCurve({'x':cx_sx(_UI.eventhandlers.mousex), 'y':cy_sy(_UI.eventhandlers.mousey)});
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
		var s = ss('Click Empty Space');
		if(s) {
			s.path.selectPathPoint(false);
			s.path.calcMaxes();
		}
		_UI.selectedshape = -1;
	}

	function evHanShapeResize(s, pcorner){
		// debug('EVHANSHAPERESIZE - ' + s.name + ' handle ' + pcorner);
		var mx = cx_sx(_UI.eventhandlers.mousex);
		var my = cy_sy(_UI.eventhandlers.mousey);
		var lx = cx_sx(_UI.eventhandlers.lastx);
		var ly = cy_sy(_UI.eventhandlers.lasty);
		var dh = (ly-my);
		var dw = (lx-mx);
		var ox = s.path.maxes.xmin;
		var oy = s.path.maxes.ymax;
		var rl = (!s.wlock && !s.hlock && s.ratiolock);

		switch(pcorner){

			case 'n':
				if(canResize('n')){
					setCursor('n-resize');
					dw = 0;
					dh*=-1;					
					s.path.updatePathSize(dw, dh, rl);
					//s.path.setPathSize(false, false);
				}
				break;

			case 'ne':
				if(canResize('ne')){
					setCursor('ne-resize');
					dw*=-1;
					dh*=-1;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(false, oy+dh);
				}
				break;

			case 'e':
				if(canResize('e')){
					setCursor('e-resize');
					dh = 0;
					dw*=-1;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(false, oy+dh);
				}
				break;

			case 'se':
				if(canResize('se')){
					setCursor('se-resize');
					dw*=-1;
					//dh*=-1;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(ox, oy);
				}
				break;

			case 's':
				if(canResize('s')){
					setCursor('s-resize');
					dw = 0;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(ox, oy);
				}
				break;

			case 'sw':
				if(canResize('sw')){
					setCursor('sw-resize');					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(ox-dw, oy);
				}
				break;

			case 'w':
				if(canResize('w')){
					setCursor('w-resize');
					dh = 0;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(ox-dw, oy+dh);
				}
				break;

			case 'nw':
				if(canResize('nw')){
					setCursor('nw-resize');
					dh*=-1;					
					s.path.updatePathSize(dw, dh, rl);
					s.path.setPathPosition(ox-dw, oy+dh);
				}
				break;
		}

		//if(!_UI.eventhandlers.tempnewbasicshape) s.path.calcMaxes();

		//debug('EVHANSHAPERESIZE - Done lx/rx/ty/by: ' + s.path.maxes.xmin + ',' + s.path.maxes.xmax + ',' + s.path.maxes.ymax + ',' + s.path.maxes.ymin);
	}

	function updateTNBS(dx,dy,dw,dh){
		//debug('updateTNBS dx/dy/dw/dh = '+dx+' '+dy+' '+dw+' '+dh);
		_UI.eventhandlers.tempnewbasicshape.xmin += (dx);
		_UI.eventhandlers.tempnewbasicshape.ymax += (dy);
		_UI.eventhandlers.tempnewbasicshape.xmax += (dw+dx);
		_UI.eventhandlers.tempnewbasicshape.ymin += (dh+dy);
	}

	function canResize(pc){
		var s = ss('canResize');
		switch(pc){
			case 'nw': return (!s.ylock && !s.hlock && !s.xlock && !s.wlock);
			case 'n':  return (!s.ylock && !s.hlock);
			case 'ne': return (!s.ylock && !s.hlock && !s.wlock);
			case 'e':  return (!s.wlock);
			case 'se': return (!s.hlock && !s.wlock);
			case 's':  return (!s.hlock);
			case 'sw': return (!s.hlock && !s.xlock && !s.wlock);
			case 'w':  return (!s.xlock && !s.wlock);
		}
		return true;
	}

	function mousewheel(event){
		var delta = (event.deltaY*-1);
		//debug('MOUSEWHEEL - deltaY: ' + event.deltaY);

		var canzoom = ((_UI.navhere === 'character edit') || (_UI.navhere === 'linked shapes'));
		canzoom = canzoom && (document.getElementById('dialog_box').style.display !== 'block');

		if(canzoom){
			if(event.ctrlKey){
				event.preventDefault();
				//debug('MOUSEWHEEL: canzoom=true and delta=' + delta );
				if(delta > 0){ viewZoom(1.1); }
				else { viewZoom(0.9); }
			}
		}
	}

	function mouseovercec() {
		//debug('MOUSEOVERCEC');
		_UI.eventhandlers.ismouseovercec = true;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () { return false; };
		updateCursor();
	}

	function mouseoutcec() {
		//debug('MOUSEOUTCEC');
		_UI.eventhandlers.ismouseovercec = false;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {};
		updateCursor();
	}

	function keyup(event){
		if(!onCanvasEditPage()) return;

		var kc = getKeyFromEvent(event);
		//debug('Key Up:\t\t' + kc + ' from ' + event.which);
		var eh = _UI.eventhandlers;

		// Space
		if(kc=== 'space' && eh.ismouseovercec){
			_UI.selectedtool = eh.lastTool;
			eh.isSpaceDown = false;
			updateCursor();
			redraw('Event Handler - Keyup Spacebar for pan toggle');
		}
	}

	function keypress(event){

		if(!onCanvasEditPage() || _UI.navhere === 'kerning') return;
		if(event.type !== 'keydown') return;

		var s = ss('keypress event');
		var eh = _UI.eventhandlers;

		var kc = getKeyFromEvent(event);
		//debug('Key Press:\t' + kc + ' from ' + event.which);
		//debug(event);

		// Space
		if(kc === 'space' && eh.ismouseovercec){
			event.preventDefault();
			if(!eh.isSpaceDown){
				eh.lastTool = _UI.selectedtool;
				_UI.selectedtool = 'pan';
				eh.isSpaceDown = true;
				setCursor('move');
				redraw('Event Handler - Keydown Spacebar for pan toggle');
			}
		}

		if(kc==='esc'){
			closeDialog();
		}

		// ?
		if(kc==='?' || kc==='¿'){
			event.preventDefault();
			toggleKeyboardTips();
		}

		// z
		if(kc==='undo' || (event.ctrlKey && kc==='z')){
			event.preventDefault();
			history_pull();
		}

		// del
		if(kc==='del' || kc==='backspace'){
			event.preventDefault();
			var sp = s.path.sp(false);

			if(sp){
				s.path.deletePathPoint();
				history_put('Delete Path Point');
				redraw('Keypress DEL or BACKSPACE');
			} else if (s){
				deleteShape();
				history_put('Delete Shape');
				redraw('Keypress DEL or BACKSPACE');
			}
		}

		// c
		if(event.ctrlKey && kc==='c'){
			event.preventDefault();
			copyShape();
		}

		// v
		if(event.ctrlKey && kc==='v'){
			event.preventDefault();
			pasteShape();
			history_put('Paste Shape');
			redraw('Paste Shape');
		}

		// s
		if(event.ctrlKey && kc==='s'){
			event.preventDefault();
			saveGlyphrProjectFile();
		}

		// plus
		if(event.ctrlKey && kc==='plus'){
			event.preventDefault();
			viewZoom(1.1);
			redraw('Zoom Keyboard Shortcut');
		}

		// minus
		if(event.ctrlKey && kc==='minus'){
			event.preventDefault();
			viewZoom(0.9);
			redraw('Zoom Keyboard Shortcut');
		}

		// 0
		if(event.ctrlKey && kc==='0'){
			event.preventDefault();
			setView(clone(_UI.defaultview));
			redraw('Zoom Keyboard Shortcut');
		}

		// up
		if(kc==='up'){
			event.preventDefault();
			nudge(0,1);
		}

		// down
		if(kc==='down'){
			event.preventDefault();
			nudge(0,-1);
		}

		// left
		if(kc==='left'){
			event.preventDefault();
			nudge(-1,0);
		}

		// right
		if(kc==='right'){
			event.preventDefault();
			nudge(1,0);
		}
	}

	function getKeyFromEvent (event) {
		//debug('GETKEYFROMEVENT - keyCode:' + event.keyCode + '\twhich:' + event.which);
		var specialChars = {
			8:'backspace', 9:'tab', 13:'enter', 16:'shift', 17:'ctrl', 18:'alt', 20:'capslock', 26:'undo', 27:'esc', 32:'space', 33:'pageup', 34:'pagedown', 35:'end', 36:'home', 37:'left', 38:'up', 39:'right', 40:'down', 45:'ins', 46:'del', 91:'meta', 93:'meta', 187:'plus', 189:'minus', 224:'meta'
		};
		return specialChars[parseInt(event.which)] || String.fromCharCode(event.which).toLowerCase();
	}

	function nudge(dx, dy) {
		var s = ss('Nudge');
		var sp, mx, my;
		if(s){
			mx = (dx * _GP.projectsettings.spinnervaluechange);
			my = (dy * _GP.projectsettings.spinnervaluechange);
			sp = s.path.sp();
			if(sp){
				sp.updatePathPointPosition('P', mx, my);
			} else {
				s.path.updatePathPosition(mx, my);
			}
			redraw('Nudge');
		}
	}

// end of file