	uistate.eventhandlers = {
		"temppathdragshape" : false,
		"mousex" : 0,
		"mousey" : 0,
		"ismouseovercec" : false,
		"corner" : false,
		"toolhandoff" : false,
		"lastx" : -100,
		"lasty" : -100,	
		"firstx" : -100,
		"firsty" : -100,
		"uqhaschanged" : false,
		"eh_shapesel" : false,
		"eh_shaperesize" : false,
		"eh_pantool" : false,
		"eh_addpath" : false
	}
	
	function initEventHandlers() {
		var tool = new pathedit();		
		uistate.eventhandlers.eh_addrectoval = new newbasicShape();
		uistate.eventhandlers.eh_shapesel = new pathedit();
		uistate.eventhandlers.eh_shaperesize = new shaperesize();
		uistate.eventhandlers.eh_pantool = new pantool();
		uistate.eventhandlers.eh_addpath = new newPath();
		uistate.eventhandlers.eh_addrectoval = new newbasicShape();
		
		// Mouse Event Listeners
		uistate.chareditcanvas.addEventListener('mousedown', ev_canvas, false);
		uistate.chareditcanvas.addEventListener('mousemove', ev_canvas, false);
		uistate.chareditcanvas.addEventListener('mouseup',   ev_canvas, false);
		uistate.chareditcanvas.onmouseover = mouseovercec;
		uistate.chareditcanvas.onmouseout = mouseoutcec;
		
		// Document Key Listeners
		document.onkeypress = keypress;
		document.onkeydown = keydown;
		document.onkeyup = keyup;
		document.onmousewheel = mousewheel;
		window.addEventListener('DOMMouseScroll', mousewheel, false);		//Firefox
		// The general-purpose event handler.
		function ev_canvas (ev) {
			
			//debug("EVENTHANDLER - Raw mouse event x/y = " + ev.layerX + " / " + ev.layerY);
			mouseovercec();
			
			// Fixes a Chrome cursor problem
			document.onselectstart = function () { return false; } 
		
			if (ev.layerX || ev.layerX) { 
				// Firefox
				uistate.eventhandlers.mousex = ev.layerX; 
				uistate.eventhandlers.mousey = ev.layerY; 		
			}
			
			if (ev.offsetX || ev.offsetX) { 
				// IE, Chrome, (Opera?)				
				uistate.eventhandlers.mousex = ev.offsetX; 
				uistate.eventhandlers.mousey = ev.offsetY;
			}

			//debug("EV_CANVAS offsetx / offsety / layerx / layery: " +  ev.offsetX + " " + ev.offsetY + " " + ev.layerX + " " + ev.layerY); 
			
			resetCursor();
			uistate.showrightline = false;
			
			// Switch Tool function
			switch(uistate.selectedtool){
				case "pathedit" :
					tool = uistate.eventhandlers.eh_shapesel;
					break;
				case "shaperesize" :
					uistate.showrightline = true;
					tool = uistate.eventhandlers.eh_shaperesize;
					break;
				case "pan" :
					uistate.showrightline = true;
					document.body.style.cursor = "move";
					tool = uistate.eventhandlers.eh_pantool;
					break;
				case "newpath" :
					document.body.style.cursor = "crosshair";
					tool = uistate.eventhandlers.eh_addpath;
					break;
				case "newrect" : 
				case "newoval" :
					document.body.style.cursor = "crosshair";
					tool = uistate.eventhandlers.eh_addrectoval;
					break;
			}

			// Call the event handler of the tool.
			tool[ev.type](ev);
		}
	}

	
	// ---------------------------------------------------------
	// new path - adds many points to a new path
	// ---------------------------------------------------------	
	function newPath(){
		this.dragging = false;
		this.firstpoint = true;
		this.currpt;
		
		this.mousedown = function (ev) { 
			var newpoint = new PathPoint({"P":new Coord({"x":cx_sx(uistate.eventhandlers.mousex), "y":cy_sy(uistate.eventhandlers.mousey)}), "H1":new Coord({"x":cx_sx(uistate.eventhandlers.mousex-100), "y":cy_sy(uistate.eventhandlers.mousey)}), "H2":new Coord({"x":cx_sx(uistate.eventhandlers.mousex+100), "y":cy_sy(uistate.eventhandlers.mousey)}), "type":"flat", "selected":true, "useh1":false, "useh2":false});			
			var currpath;	
		
			if(this.firstpoint) {
				debug("EVENTHANDLER - NewPath mousedown - tool.firstpoint=true, making a new path");
				//alert("EVENTHANDLER - NewPath mousedown - tool.firstpoint=true, making a new path");
				
				// make a new path with one point
				var newpath = new Path({"pathpoints":[newpoint]});
				newpath.selectPathPoint(0);
				
				debug("EVENTHANDLER - NewPath mousedown - after new path is made.");
				//alert("EVENTHANDLER - NewPath mousedown - after new path is made.");
				
				// make a new shape with the new path
				var newshape = addShape();
				newshape.name = ("path "+(uistate.shapelayers.length+1));
				newshape.path = newpath;
				
				debug("EVENTHANDLER - NewPath mousedown - end of firstpoint, new shape added with new path with single point.");
				//alert("EVENTHANDLER - NewPath mousedown - end of firstpoint, new shape added with new path with single point.");
			
			} else {
				debug("EVENTHANDLER - NewPath mousedown - after firstpoint, placing another point"); 
				currpath = ss("Event Handler New Path").path;
				var ccp = currpath.isOverControlPoint(cx_sx(uistate.eventhandlers.mousex), cy_sy(uistate.eventhandlers.mousey));
				debug("EVENTHANDLER - NewPath mousedown - after creating ccp: " + ccp);
				if((ccp=="P")&&(currpath.pathpoints.length > 1)){
					var p = currpath.pathpoints[0];
					var hp = _G.projectsettings.pointsize/uistate.chareditcanvassettings.zoom;
					if( ((p.P.x+hp) > cx_sx(uistate.eventhandlers.mousex)) && ((p.P.x-hp) < cx_sx(uistate.eventhandlers.mousex)) && ((p.P.y+hp) > cy_sy(uistate.eventhandlers.mousey)) && ((p.P.y-hp) < cy_sy(uistate.eventhandlers.mousey)) ){
						//clicked on an existing control point in this path
						//if first point - close the path
						currpath.isclosed = true;
						uistate.selectedtool = "pathedit";
						uistate.eventhandlers.eh_shapesel.moving = true;
						uistate.eventhandlers.eh_shapesel.controlpoint = "H2";
						uistate.eventhandlers.toolhandoff = true;
						this.dragging = false;
						this.firstmove = false;
						uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
						uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
						currpath.clockwise = findClockwise(currpath.pathpoints);
						redraw();
						return;
					}
				}
				
				var lastp = currpath.pathpoints[currpath.pathpoints.length-1].P;
				//newpoint.makePointedTo(lastp.x, lastp.y, 200);
				
				debug("EVENTHANDLER - NewPath mousedown - after MakePointedTo");
				
				currpath.addPathPoint(newpoint, false);
				currpath.needsnewcalcmaxes = true;
				debug("EVENTHANDLER - NewPath mousedown - after AddPathPoint");
			}			
				
			this.currpt = newpoint;
			this.firstpoint = false;
			this.dragging = true;
			uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
			uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			
			debug("EVENTHANDLER - NewPath mousedown - end of function");
		}
		
		this.mouseup = function () {
			this.dragging = false;
			this.firstmove = false;
			uistate.eventhandlers.lastx = -100;
			uistate.eventhandlers.lasty = -100;
			// For new shape tools, mouse up always adds to the undo-queue
			putundoq("New Path tool");
			
			redraw();
		};
		
		this.mousemove = function (ev) {
			if(this.dragging){
				//avoid really small handles
				if( (Math.abs(this.currpt.P.x-cx_sx(uistate.eventhandlers.mousex)) > (_G.projectsettings.pointsize*2)) || (Math.abs(this.currpt.P.y-cy_sy(uistate.eventhandlers.mousey)) > (_G.projectsettings.pointsize*2)) ){
					this.currpt.H2.x = cx_sx(uistate.eventhandlers.mousex);
					this.currpt.H2.y = cy_sy(uistate.eventhandlers.mousey);
					this.currpt.useh1 = true;
					this.currpt.useh2 = true;
					this.currpt.makeSymmetric("H2");
				} else {
					debug("NEWPATH MOUSEMOVE - no handle created yet");
				}
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			
				redraw();
			}
		}
	}		


	// ---------------------------------------------------------
	// new basic shape - adds many points to a new path
	// ---------------------------------------------------------	
	function newbasicShape(){
		
		this.mousedown = function (ev) { 
			
			var newshape = new Shape({});
			newshape.name = (uistate.selectedtool=="newrect")? ("rect " + (uistate.shapelayers.length+1)) : ("oval " + (uistate.shapelayers.length+1));
			uistate.selectedshape = uistate.shapelayers.length;
			uistate.shapelayers.push(newshape);
		
			var s = ss("eventHandler - newbasicshape mousedown");
			s.path.setLeftX(cx_sx(uistate.eventhandlers.mousex));
			s.path.setTopY(cy_sy(uistate.eventhandlers.mousey));
			uistate.eventhandlers.temppathdragshape = {
				"leftx": cx_sx(uistate.eventhandlers.mousex),
				"rightx": cx_sx(uistate.eventhandlers.mousex),
				"topy": cy_sy(uistate.eventhandlers.mousey),
				"bottomy": cy_sy(uistate.eventhandlers.mousey)
			};

			s.hidden = true;
			
			this.dragging = true;
			uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
			uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			uistate.eventhandlers.firstx = uistate.eventhandlers.mousex;
			uistate.eventhandlers.firsty = uistate.eventhandlers.mousey;
					
			redraw();
		}
		
		this.mouseup = function () { 
			var s = ss("eventHandler - newbasicshape mouseup");
				
			if(uistate.selectedtool=="newrect"){				
				//debug("NEWBASICSHAPE MOUSEUP - reading TPDS lx-ty-rx-by: " + lx + " : " + ty + " : " + rx + " : " + by);
				s.path = rectPathFromCorners(uistate.eventhandlers.temppathdragshape);
				//debug("NEWBASICSHAPE MOUSEUP - resulting path P1x/y P3x/y: " + s.path.pathpoints[0].P.x + " : " + s.path.pathpoints[0].P.y + " : " + s.path.pathpoints[2].P.x + " : " + s.path.pathpoints[2].P.y);
			} else {
				s.path = ovalPathFromCorners(uistate.eventhandlers.temppathdragshape);
			}
			
			this.dragging = false;
			uistate.eventhandlers.lastx = -100;
			uistate.eventhandlers.lasty = -100;			
			uistate.eventhandlers.firstx = -100;
			uistate.eventhandlers.firsty = -100;
			uistate.eventhandlers.temppathdragshape = false;
			s.hidden = false;
			putundoq("New Basic Shape tool");
			
			uistate.showrightline = true;
			
			clicktool("pathedit");
		};
		
		this.mousemove = function (ev) {
			if(this.dragging){
				var s = ss("eventHandler - newbasicshape mousemove");
				evHanShapeResize(s, "se");	
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
				uistate.eventhandlers.uqhaschanged = true;
				redraw();
				//debug("NEWBASICSHAPE MOUSEMOVE past redraw");
			}
		}
	}		


	// ---------------------------------------------------------
	// Path Edit - selects points and moves points and handles
	// ---------------------------------------------------------
	function pathedit(){
		this.moving = false;
		this.controlpoint = false;
		
		this.mousedown = function (ev) { 
			//debug("mouse down: " + uistate.eventhandlers.mousex + ":" + uistate.eventhandlers.mousey);
			var s = ss("Path Edit - Mouse Down");
			this.controlpoint = s? s.path.isOverControlPoint(cx_sx(uistate.eventhandlers.mousex), cy_sy(uistate.eventhandlers.mousey)) : false; 
			if(this.controlpoint){
				this.moving = true;
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			} else if (clickSelectShape(uistate.eventhandlers.mousex, uistate.eventhandlers.mousey)){
				//clickSelectShape checks to switch the tool if need be.
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			} else {
				if(s){
					if(s.path.needsnewcalcmaxes) { 
						s.path.calcMaxes();
					}
				}
				clickEmptySpace();
			}
			redraw();
		};
		
		this.mouseup = function () {
			this.moving = false;
			uistate.eventhandlers.lastx = -100;
			uistate.eventhandlers.lasty = -100;
			
			if(uistate.eventhandlers.uqhaschanged) {
				putundoq("Path Edit tool");
				uistate.eventhandlers.uqhaschanged = false;
				redraw();
			}
		};
		
		this.mousemove = function (ev) {
			if (this.moving) {
				var s = ss("Path Edit - Mouse Move");
				var sp = s.path.sp();
				if(uistate.eventhandlers.toolhandoff){
					sp.H2.x = cx_sx(uistate.eventhandlers.mousex);
					sp.H2.y = cy_sy(uistate.eventhandlers.mousey);
					uistate.eventhandlers.toolhandoff = false;
				}
				// Moving points if mousedown
				var dx = 0;
				var dy = 0;
				switch (this.controlpoint){
					case "P":
						if(!sp.P.xlock) dx = (uistate.eventhandlers.mousex-uistate.eventhandlers.lastx)/uistate.chareditcanvassettings.zoom;
						if(!sp.P.ylock) dy = (uistate.eventhandlers.lasty-uistate.eventhandlers.mousey)/uistate.chareditcanvassettings.zoom;
						break;
					case "H1":
						if(!sp.H1.xlock) dx = (uistate.eventhandlers.mousex-uistate.eventhandlers.lastx)/uistate.chareditcanvassettings.zoom;
						if(!sp.H1.ylock) dy = (uistate.eventhandlers.lasty-uistate.eventhandlers.mousey)/uistate.chareditcanvassettings.zoom;
						break;
					case "H2":
						if(!sp.H2.xlock) dx = (uistate.eventhandlers.mousex-uistate.eventhandlers.lastx)/uistate.chareditcanvassettings.zoom;
						if(!sp.H2.ylock) dy = (uistate.eventhandlers.lasty-uistate.eventhandlers.mousey)/uistate.chareditcanvassettings.zoom;
						break;
				}
				sp.updatePointPosition(this.controlpoint, dx, dy); 
				s.path.needsnewcalcmaxes = true;
				
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
				uistate.eventhandlers.uqhaschanged = true;
				redraw();
			}
		};		
	}

	
	// --------------------------------------------------
	// Shape Resize - resizes whole shapes
	// --------------------------------------------------
	function shaperesize(){
		this.dragging = false;
		this.resizing = false;
		uistate.eventhandlers.corner = false;
		
		this.mousedown = function (ev) { 
			//debug("SHAPERESIZE TOOL: mouse down: " + uistate.eventhandlers.mousex + ":" + uistate.eventhandlers.mousey);
			var s = ss("eventHandler - mousedown");
			uistate.eventhandlers.corner = s? s.isoverhandle(uistate.eventhandlers.mousex, uistate.eventhandlers.mousey) : false;
			uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
			uistate.eventhandlers.firstx = uistate.eventhandlers.mousex;
			uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
			uistate.eventhandlers.firsty = uistate.eventhandlers.mousey;
			
			if (uistate.eventhandlers.corner){
				//debug("SHAPERESIZE TOOL: clicked on uistate.eventhandlers.corner: " + uistate.eventhandlers.corner);
				this.resizing = true;
				this.dragging = false;
				if(_G.projectsettings.quickpathupdating){
					uistate.eventhandlers.temppathdragshape = {
						"leftx": s.path.leftx,
						"rightx": s.path.rightx,
						"topy": s.path.topy,
						"bottomy": s.path.bottomy
					};
					
					s.hidden = true;
				}
			} else if (clickSelectShape(uistate.eventhandlers.mousex, uistate.eventhandlers.mousey)){
				this.dragging = true; 
				this.resizing = false;
				redraw();
			} else {
				clickEmptySpace();
			}
		};
		
		this.mouseup = function () { 
			//debug("Mouse Up");
			resetCursor();
			var s = ss("eventHandler - mouseup");
			if(uistate.eventhandlers.temppathdragshape){
				uistate.eventhandlers.temppathdragshape = false;
				s.hidden = false;
				uistate.eventhandlers.lastx = uistate.eventhandlers.firstx;
				uistate.eventhandlers.lasty = uistate.eventhandlers.firsty;
				evHanShapeResize(s, uistate.eventhandlers.corner);
			}
			
			if(this.resizing) { 
				debug("SHAPERESIZE MOUSEUP - resizing, NOT calling calcMaxes on mouseup");
				//s.path.needsnewcalcmaxes = true;
				//s.path.calcMaxes(); 
			}
			
			this.dragging = false;
			this.resizing = false;
			uistate.eventhandlers.lastx = -100;
			uistate.eventhandlers.lasty = -100;
			uistate.eventhandlers.firstx = -100;
			uistate.eventhandlers.firsty = -100;
			uistate.eventhandlers.uqhaschanged ? putundoq("Path Edit tool") : true;
			uistate.eventhandlers.uqhaschanged = false;
			redraw();
			//debug("EVENTHANDLER - after pathedit Mouse Up REDRAW");
		};	
		
		this.mousemove = function (ev) {
			var s = ss("eventHandler - pathedit mousemove");
			//debug("<b><i>SHAPERESIZE TOOL</i></b> - ss returned s.seed: " + s.seed);
			var didstuff = false;

			if(s.seed){
				//debug("SHAPERESIZE dragging seed shape");
				if(this.dragging && !s.useseedxy){
					//debug("SHAPERESIZE, this.dragging=" + this.dragging + " && !s.useseedxy=" + !s.useseedxy);
					s.xpos += Math.round((uistate.eventhandlers.mousex-uistate.eventhandlers.lastx)/uistate.chareditcanvassettings.zoom);
					s.ypos += Math.round((uistate.eventhandlers.lasty-uistate.eventhandlers.mousey)/uistate.chareditcanvassettings.zoom);
					didstuff = true;
					resetCursor();
				}
			} else {
				//debug("SHAPERESIZE dragging normal shape");
				if (this.dragging) {
					// Moving shapes if mousedown
					var dx = 0;
					s.xlock? true : dx = Math.round((uistate.eventhandlers.mousex-uistate.eventhandlers.lastx)/uistate.chareditcanvassettings.zoom);
					var dy = 0;
					s.ylock? true : dy = Math.round((uistate.eventhandlers.lasty-uistate.eventhandlers.mousey)/uistate.chareditcanvassettings.zoom);
					
					s.path.updatePathPosition(dx, dy);
					resetCursor();
					didstuff = true;
				} else if (this.resizing){
					// Resizing shapes if mousedown over handle
					evHanShapeResize(s, uistate.eventhandlers.corner);	
					didstuff = true;
				}
			
				//Translation fidelity, passing raw canvas values
				s? s.isoverhandle(uistate.eventhandlers.mousex, uistate.eventhandlers.mousey) : false;
			}
			
			if(didstuff){
				uistate.eventhandlers.lastx = uistate.eventhandlers.mousex;
				uistate.eventhandlers.lasty = uistate.eventhandlers.mousey;
				uistate.eventhandlers.uqhaschanged = true;
				redraw();
			}			
		};
	}
	
	
	// --------------------------------------------------
	// Pan - moves the canvas view
	// --------------------------------------------------
	function pantool(){
		this.dragging = false;
		this.deltax = 0;
		this.deltay = 0;
		
		this.mousedown = function (ev) { 
			//debug("PAN TOOL - mouse down: " + uistate.eventhandlers.mousex + ":" + uistate.eventhandlers.mousey);
			this.deltax = (uistate.eventhandlers.mousex-uistate.chareditcanvassettings.originx);
			this.deltay = (uistate.eventhandlers.mousey-uistate.chareditcanvassettings.originy);
			this.dragging = true; 
		};
		
		this.mouseup = function () { 
			//debug("PAN TOOL - Mouse Up");
			this.dragging = false;
			this.deltax = 0;
			this.deltay = 0;
		};	
		
		this.mousemove = function (ev) {
			if (this.dragging) {
				// Moving shapes if mousedown
				uistate.chareditcanvassettings.originx = (uistate.eventhandlers.mousex-this.deltax);
				uistate.chareditcanvassettings.originy = (uistate.eventhandlers.mousey-this.deltay);
				//debug("EVENTHANDLER - PAN - new x/y: " + uistate.chareditcanvassettings.originx + " / " + uistate.chareditcanvassettings.originy);
				redraw();
			}
		};
	}
	
	
	// Helper Functions
	
	//convert canvas x-y inputs to saved shape x-y
	function cx_sx(cx){
		return Math.round((cx-uistate.chareditcanvassettings.originx)/(uistate.chareditcanvassettings.zoom));
	}
	
	function cy_sy(cy){
		return Math.round((uistate.chareditcanvassettings.originy-cy)/(uistate.chareditcanvassettings.zoom));
	}
	
	function clickEmptySpace(){
		uistate.showrightline = true;
		var s = ss("Click Empty Space");
		if(s) {
			s.path.selectPathPoint(-1);
			s.path.calcMaxes();
		}
		uistate.selectedshape = -1;
	}
	
	function evHanShapeResize(s, pcorner){
		
		var mx = cx_sx(uistate.eventhandlers.mousex);
		var my = cy_sy(uistate.eventhandlers.mousey);
		var lx = cx_sx(uistate.eventhandlers.lastx);
		var ly = cy_sy(uistate.eventhandlers.lasty);
		
		switch(pcorner){
			case "nw": 
				if(canResize("nw")){
					var dh = (my-ly);
					var dw = (mx-lx);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(dw,dh,(dw*-1),(dh*-1));
					} else {
						s.path.updatePathSize((dw*-1),dh); 
						s.path.updatePathPosition(dw,0);
					}
				}
				break;
				
			case "n":
				if(canResize("n")){
					var dh = (my-ly);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(0,dh,0,(dh*-1));
					} else {
						s.path.updatePathSize(0, dh);
						//s.path.updatePathPosition(0, 0);
					}
				}
				break;		
				
			case "ne": 
				if(canResize("ne")){
					var dh = (my-ly);
					var dw = (mx-lx);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(0,dh,dw,(dh*-1));
					} else {
						s.path.updatePathSize(dw,dh); 
						//s.path.updatePathPosition(0,0);
					}
				}
				break;
				
			case "e":
				if(canResize("e")){
					var dw = (mx-lx);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(0,0,dw,0);
					} else {
						s.path.updatePathSize(dw, 0); 
						//s.path.updatePathPosition(0, 0);
					}
				}
				break;
				
			case "se":  
				if(canResize("se")){
					var dh = (ly-my)*-1;
					var dw = (mx-lx);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(0,0,dw,dh);						
					} else {
						s.path.updatePathSize(dw, (dh*-1)); 
						s.path.updatePathPosition(0, dh);
					}
				}
				break;	
				
			case "s":
				if(canResize("s")){
					var dh = (ly-my)*-1;
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(0,0,0,dh);
					} else {
						s.path.updatePathSize(0, (dh*-1));
						s.path.updatePathPosition(0, dh);
					}
				}
				break;
				
			case "sw": 
				if(canResize("sw")){
					var dw = (mx-lx);
					var dh = (ly-my)*-1;
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(dw,0,(dw*-1),dh);
					} else {
						s.path.updatePathSize((dw*-1),(dh*-1)); 
						s.path.updatePathPosition(dw,dh);
					}
				}
				break;
				
			case "w":
				if(canResize("w")){
					var dw = (mx-lx);
					if(uistate.eventhandlers.temppathdragshape){
						updateTPDS(dw,0,(dw*-1),0);
					} else {
						s.path.updatePathSize((dw*-1), 0); 
						s.path.updatePathPosition(dw, 0);
					}
				}
				break;
		}
		
		//if(!uistate.eventhandlers.temppathdragshape) s.path.calcMaxes();

		//debug("EVHANSHAPERESIZE - Done lx/rx/ty/by: " + s.path.leftx + "," + s.path.rightx + "," + s.path.topy + "," + s.path.bottomy);
	}

	function updateTPDS(dx,dy,dw,dh){
		//debug("UPDATETPDS dx/dy/dw/dh = "+dx+" "+dy+" "+dw+" "+dh);
		uistate.eventhandlers.temppathdragshape.leftx += Math.round(dx);
		uistate.eventhandlers.temppathdragshape.topy += Math.round(dy);
		uistate.eventhandlers.temppathdragshape.rightx += Math.round(dw+dx);
		uistate.eventhandlers.temppathdragshape.bottomy += Math.round(dh+dy);
	}
	
	function canResize(pc){
		var s = ss("canResize");
		switch(pc){
			case "nw": return (!s.ylock && !s.hlock && !s.xlock && !s.wlock);
			case "n":  return (!s.ylock && !s.hlock);
			case "ne": return (!s.ylock && !s.hlock && !s.wlock);
			case "e":  return (!s.wlock);
			case "se": return (!s.hlock && !s.wlock);
			case "s":  return (!s.hlock);
			case "sw": return (!s.hlock && !s.xlock && !s.wlock);
			case "w":  return (!s.xlock && !s.wlock);
		}				
		return true;
	}
	
	function mousewheel(event){	
	    var delta = event.detail? event.detail*(-120) : event.wheelDelta 	//cross browser
		var canscroll = ((uistate.navhere == "character edit") || (uistate.navhere == "seed shapes"));
		canscroll = canscroll && (document.getElementById('dialog_box').style.display != 'block');
		
		if(canscroll){
		//debug("MOUSEWHEEL: canscroll=true and delta=" + delta );
			if(delta > 0){ canvasZoom(1.1); }
			else { canvasZoom(.9); }
		}
	}
	
	function mouseovercec() {
		//debug("MOUSEOVERCEC");
		uistate.eventhandlers.ismouseovercec = true;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () { return false; }  
	}
	
	function mouseoutcec() {
		//debug("MOUSEOUTCEC");
		uistate.eventhandlers.ismouseovercec = false; 
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {}; 
		resetCursor();
	}
	
	var lastTool = "pathedit";
	var iskeydown = false;
	function keydown(event){
		//debug("Key Down: " + event.keyCode);
		if(event.keyCode == 32 && uistate.eventhandlers.ismouseovercec){
			if(!iskeydown){
				//debug("KEYDOWN - pressed 32 spacebar");
				lastTool = uistate.selectedtool;
				uistate.selectedtool = "pan";
				iskeydown = true;
				document.body.style.cursor = "move";
				redraw();
			}
		}
	}
	
	function keyup(event){
		//debug("Key Up: " + event.keyCode);
		if(event.keyCode == 32 && uistate.eventhandlers.ismouseovercec){
			//debug("KEYUP - releaseing 32 spacebar");
			uistate.selectedtool = lastTool;
			iskeydown = false;
			resetCursor();
			redraw();
		}
	}
	
	function keypress(event){
		//debug("Key Pressed: " + event.keyCode);
		/*
		debug("Key Pressed: " + event.keyCode);
		var s = ss("keypress event");
		var changed = false;
		if(s){
			if(uistate.selectedtool == "pathedit"){
				switch(event.keyCode){
					case 54:	//NumPad 6 Right
						s.path.updatePathPosition(1,0);
						changed = "NumPad 6 Right";
						break;
					case 52:	//NumPad 4 Left
						s.path.updatePathPosition(-1,0);
						changed = "NumPad 4 Left";
						break;
					case 50:	//NumPad 2 Down
						s.path.updatePathPosition(0,1);
						changed = "NumPad 2 Down";
						break;
					case 56:	//NumPad 8 Up
						s.path.updatePathPosition(0,-1);
						changed = "NumPad 8 Up";
						break;
				}
			} else if (uistate.selectedtool == "pointselect"){
				var p = s.path.sp(false, "KEYPRESS");
				if(p){
					switch(event.keyCode){
						case 54:	//NumPad 6 Right
							p.updatePointPosition("P",1,0);
							changed = "NumPad 6 Right";
							break;
						case 52:	//NumPad 4 Left
							p.updatePointPosition("P",-1,0);
							changed = "NumPad 4 Left";
							break;
						case 50:	//NumPad 2 Down
							p.updatePointPosition("P",0,1);
							changed = "NumPad 2 Down";
							break;
						case 56:	//NumPad 8 Up
							p.updatePointPosition("P",0,-1);
							changed = "NumPad 8 Up";
							break;
					}
				}			
			}
			
			if(changed){
				putundoq("Keypress : " + changed);
				redraw();
			}
		}
		*/
	}
	
	
	