
//-------------------------------------------------------
// SHAPE OBJECT
//-------------------------------------------------------

	function Shape(oa){
		this.objtype = "shape";

		// common settings
		this.name = oa.name || "new shape";
		this.xpos = isval(oa.xpos)? oa.xpos : 0;		// these are used for stroke-independend position & size
		this.ypos = isval(oa.ypos)? oa.ypos : 400;
		this.path = isval(oa.path)? new Path(oa.path) : rectPathFromCorners(false);
		this.visible = isval(oa.visible)? oa.visible : true;
		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
				
		// not settable defaults
		this.link = false;
		this.uselinkedshapexy = false;
				
		//debug("Just created a SHAPE: " + JSON.stringify(this));
	}





//-------------------------------------------------------
// SHAPE METHODS
//-------------------------------------------------------


//	-----`
//	Draw
//	-----
	
	Shape.prototype.drawShape_Single = function(lctx){
		if(this.visible){
			lctx.fillStyle = _GP.projectsettings.color_glyphfill;
			if(lctx == _UI.ishereghostctx) { lctx.fillStyle = "rgba(0,0,255,0.2)"; }
			
			// Draw the appropriate stuff for each shape's fill & border
			lctx.beginPath();
			this.path.drawPath(lctx);
			lctx.closePath();
			lctx.fill();
		}
	}


	Shape.prototype.drawShape_Stack = function(lctx){
		if(this.visible){
			if(this.link){
				_GP.linkedshapes[this.link].shape.drawShape_Stack(lctx);
				return;
			}
			
			if((this.path.rightx == -1) && (lctx == _UI.chareditctx) && (_UI.selectedtool != "newpath")) this.path.calcMaxes();
			
			this.path.drawPath(lctx);
		}		
	}

	Shape.prototype.drawShapeToArea = function(lctx, view){
		if(this.visible){
			debug("drawShapeToArea for shape: " + this.name + " view=" + JSON.stringify(view));
			lctx.fillStyle = _GP.projectsettings.color_glyphfill;
			lctx.beginPath();
			this.path.drawPathToArea(lctx, view);
			lctx.closePath();
			lctx.fill();
		}
	}

	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var v = getView("sx_cx");
		var canvasx = v.dx;
		canvasx += (sx*v.dz);
		return canvasx;
	}
	
	function sy_cy(sy){
		var v = getView("sy_cy");
		var canvasy = v.dy;
		canvasy -= (sy*v.dz);
		return canvasy;
	}
	
	Shape.prototype.drawSelectOutline = function(onlycenter){
		//debug("DRAWSELECTOUTLINE - onlycenter: " + onlycenter);
		
		var hp = (_GP.projectsettings.pointsize/2);
		_UI.chareditctx.lineWidth = 1;
		_UI.chareditctx.strokeStyle = _UI.colors.accent;
		
		if((_UI.selectedtool=="newrect")||(_UI.selectedtool=="shaperesize")){
			_UI.chareditctx.fillStyle = "transparent";
			
			//draw bounding box and 8points
			var lx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.leftx) 		: sx_cx(this.path.leftx);
			var rx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.rightx) 	: sx_cx(this.path.rightx);
			var ty = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.topy) 		: sy_cy(this.path.topy);
			var by = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.bottomy) 	: sy_cy(this.path.bottomy);
			
			var x = (lx).makeCrisp()-1;
			var y = (ty).makeCrisp()-1;
			var w = Math.ceil(rx-lx);
			var h = Math.ceil(by-ty);
			
			_UI.chareditctx.strokeStyle = _UI.colors.accent;
			_UI.chareditctx.strokeRect(x,y,w,h); 
			if(_UI.selectedtool=="shaperesize"){ this.draw8points(onlycenter);}
			
		} else if ((_UI.selectedtool == "pathedit")||(_UI.selectedtool=="newpath")){
			// Draw Path Points
			var sep = this.path.sp(true, "DRAWSELECTOUTLINE");
			var pp = this.path.pathpoints;
			
			// Draw path selection outline
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _UI.colors.accent;

			_UI.chareditctx.beginPath();
			this.path.drawPath(_UI.chareditctx);
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();
			
			if(sep !== false){
				// Draw Handles
				//debug("DRAWSELECTOUTLINE - new path added, sep=" + sep + " pathpoints: " + JSON.stringify(this.path.pathpoints))
				pp[sep].drawHandles(true, true);
				
				// Draw prev/next handles
				sep>0? pp[sep-1].drawHandles(false, true) : pp[pp.length-1].drawHandles(false, true);
				pp[(sep+1) % pp.length].drawHandles(true, false);
			}
			
			// Draw points 
			for(var s=0; s<pp.length; s++){	
				var c = _UI.colors.accent;
				if(this.path.sp(false) && pp[s].selected){ c = "white"; }
				if(s == pp.length-1) pp[s].drawDirectionalityPoint(c, pp[0]); 
				else pp[s].drawDirectionalityPoint(c, pp[s+1]); 

				//debug("DRAWSELECTOUTLINE() - drew point " + s + " - selected: " + pp[s].selected);
			}
			
		} else if ((_UI.selectedtool=="newoval")){
			_UI.chareditctx.strokeStyle = _UI.colors.accent;
			var tpdso = ovalPathFromCorners(_UI.eventhandlers.temppathdragshape);
			
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _UI.colors.accent;

			_UI.chareditctx.beginPath();
			tpdso.drawPath(_UI.chareditctx);
			_UI.chareditctx.closePath();
			_UI.chareditctx.stroke();
		}
	}

	function rectPathFromCorners(cdata){
		//Default Shape size
		var lx = 0;
		var ty = _GP.projectsettings.ascent;
		var rx = (_GP.projectsettings.upm / _GP.projectsettings.griddivisions);
		var by = 0;
		
		if(cdata){
			lx = cdata.leftx;
			ty = cdata.topy;
			rx = cdata.rightx;
			by = cdata.bottomy;
		}
		
		var qw = Math.round((rx-lx)/4);
		var qh = Math.round((ty-by)/4);

		// First Point
		var Pul = new Coord({"x":lx, "y":ty});
		var H1ul = new Coord({"x":lx, "y":(ty-qh)});
		var H2ul = new Coord({"x":(lx+qw), "y":ty});

		// Second Point
		var Pur = new Coord({"x":rx, "y":ty});
		var H1ur = new Coord({"x":(rx-qw), "y":ty});
		var H2ur = new Coord({"x":rx, "y":(ty-qh)});

		// Third Point
		var Plr = new Coord({"x":rx, "y":by});
		var H1lr = new Coord({"x":rx, "y":(by+qh)});
		var H2lr = new Coord({"x":(rx-qw), "y":by});

		// Fourth Point
		var Pll = new Coord({"x":lx, "y":by});
		var H1ll = new Coord({"x":(lx+qw), "y":by});
		var H2ll = new Coord({"x":lx, "y":(by+qh)});

		var patharr = [];
		patharr[0] = new PathPoint({"P":Pul, "H1":H1ul, "H2":H2ul});
		patharr[1] = new PathPoint({"P":Pur, "H1":H1ur, "H2":H2ur});
		patharr[2] = new PathPoint({"P":Plr, "H1":H1lr, "H2":H2lr});
		patharr[3] = new PathPoint({"P":Pll, "H1":H1ll, "H2":H2ll});
		
		var rp = new Path({"pathpoints":patharr, "leftx":lx, "rightx":rx, "topy":ty, "bottomy":by});
		//debug("RETURNING PATH: " + JSON.stringify(rp));

		return rp;
	}
	
	function ovalPathFromCorners(cdata){
		var lx = cdata.leftx;
		var ty = cdata.topy;
		var rx = cdata.rightx;
		var by = cdata.bottomy;

		var hw = Math.round((rx-lx)/2);
		var hh = Math.round((ty-by)/2);
		var hwd = Math.round(hw*.448);
		var hhd = Math.round(hh*.448);

		// First Point - Top
		var Pt = new Coord({"x":(lx+hw), "y":ty});
		var H1t = new Coord({"x":(lx+hwd), "y":ty});
		var H2t = new Coord({"x":(rx-hwd), "y":ty});

		// Second Point - Right
		var Pr = new Coord({"x":rx, "y":(by+hh)});
		var H1r = new Coord({"x":rx, "y":(ty-hhd)});
		var H2r = new Coord({"x":rx, "y":(by-hhd)});

		// Third Point - Bottom
		var Pb = new Coord({"x":(lx+hw), "y":by});
		var H1b = new Coord({"x":(rx-hwd), "y":by});
		var H2b = new Coord({"x":(lx+hwd), "y":by});

		// Fourth Point - Left
		var Pl = new Coord({"x":lx, "y":(by+hh)});
		var H1l = new Coord({"x":lx, "y":(by+hhd)});
		var H2l = new Coord({"x":lx, "y":(ty-hhd)});

		var patharr = [];
		patharr[0] = new PathPoint({"P":Pt, "H1":H1t, "H2":H2t, "type":"symmetric"});
		patharr[1] = new PathPoint({"P":Pr, "H1":H1r, "H2":H2r, "type":"symmetric"});
		patharr[2] = new PathPoint({"P":Pb, "H1":H1b, "H2":H2b, "type":"symmetric"});
		patharr[3] = new PathPoint({"P":Pl, "H1":H1l, "H2":H2l, "type":"symmetric"});
		
		return new Path({"pathpoints":patharr});
	}
	
	Shape.prototype.draw8points = function(onlycenter){
		//if(this.link) { return; }
		//debug("DRAW8POINTS - onlycenter: " + onlycenter);
		
		var ps = _GP.projectsettings.pointsize+1;
		var hp = ps/2;
	
		var lx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.leftx) 		: sx_cx(this.path.leftx);
		var rx = _UI.eventhandlers.temppathdragshape? sx_cx(_UI.eventhandlers.temppathdragshape.rightx) 	: sx_cx(this.path.rightx);
		var ty = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.topy) 		: sy_cy(this.path.topy);
		var by = _UI.eventhandlers.temppathdragshape? sy_cy(_UI.eventhandlers.temppathdragshape.bottomy) 	: sy_cy(this.path.bottomy);

		var bleftx = (lx-hp).makeCrisp();
		var bmidx = (lx+((rx-lx)/2)-hp).makeCrisp();
		var brightx = (rx-hp).makeCrisp();
		var btopy = (ty-hp).makeCrisp();
		var bmidy = (ty+((by-ty)/2)-hp).makeCrisp();
		var bbottomy = (by-hp).makeCrisp();

		onlycenter? _UI.chareditctx.fillStyle = _UI.colors.accent : _UI.chareditctx.fillStyle = "white";
		
		if(!onlycenter){
			//upper left
			if(canResize("nw")){
				_UI.chareditctx.fillRect(bleftx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, btopy, ps, ps); 
			}

			//top
			if(canResize("n")){
				_UI.chareditctx.fillRect(bmidx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(bmidx, btopy, ps, ps); 
			}

			//upper right
			if(canResize("ne")){
				_UI.chareditctx.fillRect(brightx, btopy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, btopy, ps, ps); 
			}

			// right
			if(canResize("e")){
				_UI.chareditctx.fillRect(brightx, bmidy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, bmidy, ps, ps); 
			}

			//lower right	
			if(canResize("se")){
				_UI.chareditctx.fillRect(brightx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(brightx, bbottomy, ps, ps);	 
			}	

			//bottom
			if(canResize("s")){
				_UI.chareditctx.fillRect(bmidx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(bmidx, bbottomy, ps, ps); 
			}

			//lower left
			if(canResize("sw")){
				_UI.chareditctx.fillRect(bleftx, bbottomy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, bbottomy, ps, ps); 
			}

			//left
			if(canResize("w")){
				_UI.chareditctx.fillRect(bleftx, bmidy, ps, ps);
				_UI.chareditctx.strokeRect(bleftx, bmidy, ps, ps); 
			}

		}
		
		//Center Dot
		_UI.chareditctx.fillRect(bmidx, bmidy, ps, ps);
		_UI.chareditctx.strokeRect(bmidx, bmidy, ps, ps);	 
	}
	
	Shape.prototype.genPostScript = function(lastx, lasty){
		return this.path? this.path.genPathPostScript(lastx, lasty) : {"re":"", "lastx":lastx, "lasty":lasty};
	}
	
	
//	-----------------
//	Button Functions
//	-----------------
	function addShape(newshape){
		//debug("ADDSHAPE - was passed:\n" + JSON.stringify(newshape));			
		if(newshape){
			if(newshape.link){
				_UI.selectedtool = "shaperesize";
			} else if(newshape.path && (_UI.selectedtool == "shapemove")) {
				deubg("ADDSHAPE triggered as true: newshape.path && _UI.selectedtool == shapemove \n >> NOT calling calcmaxes, okay?");
				//newshape.path.calcMaxes();
			}
		} else {
			//debug("ADDSHAPE - passed null, creating new shape.");
			newshape = new Shape({});
			newshape.name = ("layer " + _UI.shapelayers.length);
		}
		
		if(_UI.navhere == "character edit") { 
			_UI.selectedshape = _UI.shapelayers.length; 
			_UI.navprimaryhere = 'npAttributes';
		}
		_UI.shapelayers.push(newshape);

		
		//debug("ADDSHAPE - returns:\n" + JSON.stringify(newshape));			
		return newshape;
	}
	
	function addBasicShape(type){
		var hd = 50;
		var th = 500;
		var tw = 300;
		var newshape = new Shape({});
		var parr = false;
		var shapetype = "layer ";
		
		if(type == "oval"){
			var p1 = new PathPoint({"P":new Coord({"x":0,"y":(th/2)}), "H1":new Coord({"x":0,"y":hd}), "H2":new Coord({"x":0,"y":(th-hd)}), "type":"symmetric"}); 
			var p2 = new PathPoint({"P":new Coord({"x":(tw/2),"y":th}), "H1":new Coord({"x":hd,"y":th}), "H2":new Coord({"x":(tw-hd),"y":th}), "type":"symmetric"});
			var p3 = new PathPoint({"P":new Coord({"x":tw,"y":(th/2)}), "H1":new Coord({"x":tw,"y":(th-hd)}), "H2":new Coord({"x":tw,"y":hd}), "type":"symmetric"});
			var p4 = new PathPoint({"P":new Coord({"x":(tw/2),"y":0}), "H1":new Coord({"x":(tw-hd),"y":0}), "H2":new Coord({"x":hd,"y":0}), "type":"symmetric"});
			parr = [p1,p2,p3,p4];
			shapetype = "oval ";
		} else {
			var p1 = new PathPoint({"P":new Coord({"x":0,"y":0}), "H1":new Coord({"x":hd,"y":0}), "H2":new Coord({"x":0,"y":hd})}); 
			var p2 = new PathPoint({"P":new Coord({"x":0,"y":th}), "H1":new Coord({"x":0,"y":(th-hd)}), "H2":new Coord({"x":hd,"y":th})}); 
			var p3 = new PathPoint({"P":new Coord({"x":tw,"y":th}), "H1":new Coord({"x":(tw-hd),"y":th}), "H2":new Coord({"x":tw,"y":(th-hd)})}); 
			var p4 = new PathPoint({"P":new Coord({"x":tw,"y":0}), "H1":new Coord({"x":tw,"y":hd}), "H2":new Coord({"x":(tw-hd),"y":0})}); 
			parr = [p1,p2,p3,p4];
			shapetype = "rect ";
		}
		
		newshape.path = new Path({"pathpoints":parr});		
		newshape.name = (shapetype + _UI.shapelayers.length);
		
		if(_UI.navhere == "character edit") { _UI.selectedshape = _UI.shapelayers.length; }
		_UI.shapelayers.push(newshape);
	}

	function deleteShape(){
		if(_UI.shapelayers[_UI.selectedshape].link){
			removeFromUsedIn(_UI.shapelayers[_UI.selectedshape].link, _UI.selectedchar);
		}
		
		if((_UI.shapelayers.length > 0) && (_UI.selectedshape >= 0)){
			_UI.shapelayers.splice(_UI.selectedshape, 1);
			if(_UI.shapelayers.length == _UI.selectedshape) {
				_UI.selectedshape = _UI.selectedshape-1;
			}
		} else {
			//debug("DELETESHAPES - no shapes left");
		}				
		
		if((_UI.selectedshape >= 0) && (_UI.shapelayers[_UI.selectedshape].link)){
			//debug("DELETESHAPE - newly selected shape is linkedshape, changing tool");
			_UI.selectedtool = "shaperesize";
		}
	}

	function clickSelectShape(x,y){
		//debug("CLICKSELECTShape() - checking x:" + x + " y:" + y);
		
		if(_UI.navhere == "linked shapes"){
			return clickSelectLinkedShape(x,y);
		}
		var ts;
		for(var j=(_UI.shapelayers.length-1); j>=0; j--){
			ts = _UI.shapelayers[j];
			//debug("CLICKSELECTShape() - Checking shape " + j);
			
			if(ts.isHere(x,y)){
				if(!ts.link) ts.path.selectPathPoint(-1);
				if(j != _UI.selectedshape){
					//debug("CLICKSELECTShape() - selecting shape " + j);
					_UI.selectedshape = j;				
					
					if(ts.link){
						//debug("CLICKSELECTSHAPE - detected this.link, setting _UI.selectedtool = shaperesize");
						_UI.selectedtool = "shaperesize";
					}
				}

				_UI.navprimaryhere = 'npAttributes';
				return true;
			}
		}
		_UI.selectedshape = -1;
		//debug("CLICKSELECTShape() - deselecting, setting to -1");
		return false;
	}
	
	Shape.prototype.isHere = function(x,y){
		var imageData;
		_UI.ishereghostctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		this.drawShape_Single(_UI.ishereghostctx);
		imageData = _UI.ishereghostctx.getImageData(x, y, 1, 1);
		//debug("ISHERE? alpha = " + imageData.data[3] + "  returning: " + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	}

	Shape.prototype.isOverHandle = function(px,py){
		//debug("ISOVERHANDLE() - checking x:" + px + " y:" + py);
		
		// Translation Fidelity - converting passed canvas values to saved value system
		var hp = _GP.projectsettings.pointsize/2;
		var leftxb = sx_cx(this.path.leftx) -hp;
		var midxb = Math.floor(sx_cx(this.path.leftx)+((sx_cx(this.path.rightx)-sx_cx(this.path.leftx))/2)-hp)+.5;
		var rightxb = sx_cx(this.path.rightx) -hp;
		
		var topyb = sy_cy(this.path.topy)-hp;
		var midyb = Math.floor(sy_cy(this.path.topy)+((sy_cy(this.path.bottomy)-sy_cy(this.path.topy))/2)-hp)+.5;
		var bottomyb = sy_cy(this.path.bottomy) -hp;
		
		// upper left
		if(canResize("nw")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "nw-resize";
				//debug("ISOVERHANDLE() -  upper left");
				return "nw";
			}
		} 
		
		// top
		if(canResize("n")){
			if( ((px > midxb) && (px < midxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "n-resize";
				//debug("ISOVERHANDLE() -  top");
				return "n";
			}
		}		
		
		// upper right
		if(canResize("ne")){
			if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > topyb) && (py < topyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "ne-resize";
				//debug("ISOVERHANDLE() - upper right");
				return "ne";
			}
		} 
		
		// right
		if(canResize("e")){
			if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > midyb) && (py < midyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "e-resize";
				//debug("ISOVERHANDLE() - right");
				return "e";
			}
		}
		
		// lower right
		if(canResize("se")){
				if( ((px > rightxb) && (px < rightxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "se-resize";
				//debug("ISOVERHANDLE() - lower right");
				return "se";
			}
		}	

		// bottom
		if(canResize("s")){
			if( ((px > midxb) && (px < midxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "s-resize";
				//debug("ISOVERHANDLE() - bottom");
				return "s";
			}
		}

		// lower left
		if(canResize("sw")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "sw-resize";
				//debug("ISOVERHANDLE() - lower left");
				return "sw";
			}
		}
		
		// left
		if(canResize("w")){
			if( ((px > leftxb) && (px < leftxb+_GP.projectsettings.pointsize)) && ((py > midyb) && (py < midyb+_GP.projectsettings.pointsize)) ){
				document.body.style.cursor = "w-resize";
					//debug("ISOVERHANDLE() - left");
				return "w";
			}
		}
		
		//debug("ISOVERHANDLE() - Returning FALSE");
		document.body.style.cursor = "default";
		return false;
	}


//	-------------------------
//	Random Support Functions
//	-------------------------
	function ss(req){
		//req? true : req="[probably a dynamically-generated page control]";
		//debug("SS() - Requested by: " + req + " - CURRENT _UI.selectedshape = " + _UI.selectedshape);	
		
		if(_UI.navhere == "linked shapes"){
			//debug("SS() - LINKEDSHAPE - Requested by: " + req + " - returning shownlinkedshape: " + _UI.shownlinkedshape);
			return _GP.linkedshapes[_UI.shownlinkedshape].shape;
		}
		
		if(_UI.selectedshape != -1){
			if((_UI.selectedshape >= 0)&&(_UI.selectedshape < _UI.shapelayers.length)) {
				// Charedit Selected Shape
				//debug("SS() - CHAREDIT - returning shape object for position " + _UI.selectedshape);
				return _UI.shapelayers[_UI.selectedshape];
			} else {
				// Out of bounds Selected Shape
				//debug("SS() - Selected Shape outside of expected boundary. _UI.selectedshape: " + _UI.selectedshape);
				_UI.selectedshape = -1;
				return false;
			}				
		} else {
			// -1 = "no shape selected"
			//debug("SS() - setting _UI.selectedshape = -1, returning false");
			return false;
		}
	}

	Shape.prototype.changeShapeName = function(sn){
		sn = strSan(sn);
		//debug("CHANGESHAPENAME - sanitized name: " + sn);
		if(sn != ""){
			this.name = sn;
			putundoq("shape name"); 
		} else {
			openDialog("<h2>Invalid shape name</h2><br>Shape names must only contain alphanumeric characters or spaces.<br>");
		}
		
		redraw("Shape Name");
	}
