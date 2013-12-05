
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
		this.negative = oa.negative || false;
				
		// not settable defaults
		this.seed = false;
		this.useseedxy = false;
		this.hidden = false;
				
		// Functions
		this.drawShape = drawShape;
		this.genPostScript = genPostScript;
		this.drawShapeToArea = drawShapeToArea;
		this.drawselectoutline = drawselectoutline;
		this.draw8points = draw8points;
		this.isHere = isHere;
		this.isoverhandle = isoverhandle;
		this.changeShapeName = changeShapeName;
		this.debugShape = debugShape;

		//debug("Just created a SHAPE: " + JSON.stringify(this));
	}

	
//	-----`
//	Draw
//	-----
	
	function drawShape(lctx){

		var ds = this;		
		
		/* BUG FIX? */
		if(ds.seed){
			GlyphrProject.seedshapes[ds.seed].shape.drawShape(lctx);
		}
			
		var z = uistate.chareditcanvassettings.zoom;
		
		// Check to see if this is a Ghost Canvas draw
		var tempzp = {};
		tempzp.x = uistate.chareditcanvassettings.originx;
		tempzp.y = uistate.chareditcanvassettings.originy;
		tempzp.z = uistate.chareditcanvassettings.zoom;
		if(lctx == uistate.calcmaxesghostctx) { 
			//debug("DRAWSHAPE - CMGC DETECTED");
			z = 1;
			uistate.chareditcanvassettings.zoom = 1;			
			uistate.chareditcanvassettings.originx = uistate.calcmaxesghostcanvassettings.originx;
			uistate.chareditcanvassettings.originy = uistate.calcmaxesghostcanvassettings.originy;
		}
		
		//debug("DRAWSHAPE - origin x/y/z: "+uistate.chareditcanvassettings.originx+","+uistate.chareditcanvassettings.originy+","+uistate.chareditcanvassettings.zoom);
		
		if((ds.path.rightx == -1) && (lctx == uistate.chareditctx)) ds.path.calcMaxes();
		
		if(lctx==uistate.chareditctx){
			// Set the appropriate fill color
			var s = ss("DrawShape - set fill color");
			if(!this.hidden){						// Possible ds.isvisible?
				lctx.fillStyle = "#000";
				
				if(s.seed){
					if(GlyphrProject.seedshapes[s.seed].shape == this) {
						lctx.fillStyle = shiftColor(color_glyphfill, .1, true); 					
					}
				} else if(s == this){
						lctx.fillStyle = shiftColor(color_glyphfill, .1, true); 
				}
			} else {	
				lctx.fillStyle = "transparent";	
			}
			

		} 
		else if(lctx == uistate.ishereghostctx) { lctx.fillStyle = "rgba(0,0,255,0.2)"; }
		else if(lctx == uistate.calcmaxesghostctx) { lctx.fillStyle = "rgba(0,255,0,0.2)"; }
		
		// Draw the appropriate stuff for each shape's fill & border
		
		/*
		if(ds.seed){
			// BUG here about drawshape !seedislocked
			//GlyphrProject.seedshapes[ds.seed].shape.path.drawPath(lctx);
			GlyphrProject.seedshapes[ds.seed].shape.drawShape(lctx);
		} else {
			ds.path.drawPath(lctx);
		}
		*/
		ds.path.drawPath(lctx);
		
		uistate.chareditcanvassettings.originx = tempzp.x;
		uistate.chareditcanvassettings.originy = tempzp.y;
		uistate.chareditcanvassettings.zoom = tempzp.z;
	}
	
	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var canvasx = uistate.chareditcanvassettings.originx;
		canvasx += (sx*uistate.chareditcanvassettings.zoom);
		return canvasx;
	}
	
	function sy_cy(sy){
		var canvasy = uistate.chareditcanvassettings.originy;
		canvasy -= (sy*uistate.chareditcanvassettings.zoom);
		return canvasy;
	}
	
	function drawselectoutline(onlycenter){
		//debug("DRAWSELECTOUTLINE - onlycenter: " + onlycenter);
		
		var z = uistate.chareditcanvassettings.zoom;
		var hp = (uistate.chareditcanvassettings.pointsize/2);
		uistate.chareditctx.lineWidth = 1;
		uistate.chareditctx.strokeStyle = color_accent;
		
		if((uistate.selectedtool=="newrect")||(uistate.selectedtool=="shaperesize")){
			uistate.chareditctx.fillStyle = "transparent";
			
			//draw bounding box and 8points
			var lx = temppathdragshape? sx_cx(temppathdragshape.leftx) 		: sx_cx(this.path.leftx);
			var rx = temppathdragshape? sx_cx(temppathdragshape.rightx) 	: sx_cx(this.path.rightx);
			var ty = temppathdragshape? sy_cy(temppathdragshape.topy) 		: sy_cy(this.path.topy);
			var by = temppathdragshape? sy_cy(temppathdragshape.bottomy) 	: sy_cy(this.path.bottomy);
			
			var x = (lx).makeCrisp()-1;
			var y = (ty).makeCrisp()-1;
			var w = Math.ceil(rx-lx);
			var h = Math.ceil(by-ty);
			
			uistate.chareditctx.strokeStyle = color_accent;
			//debug("DRAWSELECTOUTLINE - real shape detected, and xywh= " + x + "," + y + "," + w + "," + h);

			uistate.chareditctx.strokeRect(x,y,w,h);
			if(uistate.selectedtool=="shaperesize"){ this.draw8points(onlycenter); }
			
		} else if ((uistate.selectedtool == "pathedit")||(uistate.selectedtool=="newpath")){
			// Draw Path Points
			var sep = this.path.sp(true, "DRAWSELECTOUTLINE");
			var pp = this.path.pathpoints;
			
			// Draw path selection outline
			uistate.chareditctx.lineWidth = 1;
			uistate.chareditctx.strokeStyle = color_accent;
			uistate.chareditctx.beginPath();
			for(var s=0; s<pp.length; s++){ drawPathToPoint(uistate.chareditctx, pp, s, this.path.isclosed); }
			uistate.chareditctx.stroke();
			//debug("DRAWSELECTOUTLINE - tool=pathedit, drew pathpoints length = " + pp.length);
			
			// Draw Handles
			if(this.path.sp(false)){
				if(sep == 0){
					this.path.isclosed? pp[sep].drawHandles(true, true) : pp[sep].drawHandles(false, true);
				} else if (sep == pp.length-1){
					if(this.path.isclosed || uistate.selectedtool=="newpath"){
						pp[sep].drawHandles(true, true);
					} else {
						pp[sep].drawHandles(true, false);
					}
				} else {
					pp[sep].drawHandles(true, true);
				}
			}
			
			// Draw prev/next handles
			if(sep==0){
				if(pp.length > 1){ pp[sep+1].drawHandles(true, false); }
				if(this.path.isclosed){ pp[pp.length-1].drawHandles(false, true); }
			} else if (sep == (pp.length-1)){
				if(pp.length > 1){ pp[sep-1].drawHandles(false, true); }
				if(this.path.isclosed){ pp[0].drawHandles(true, false); }
			} else {
				pp[sep-1].drawHandles(false, true);
				pp[sep+1].drawHandles(true, false);
			}
			
			// Draw points 
			for(var s=0; s<pp.length; s++){	
				var c = color_accent;
				if(this.path.sp(false) && pp[s].selected){ c = "white"; }

				pp[s].drawPoint(c); 
				//debug("DRAWSELECTOUTLINE() - drew point " + s + " - selected: " + pp[s].selected);
			}
			
		} else if ((uistate.selectedtool=="newoval")){
			uistate.chareditctx.strokeStyle = color_accent;
			var tpdso = ovalPathFromCorners(temppathdragshape);
			
			uistate.chareditctx.beginPath();
			uistate.chareditctx.lineWidth = 1;
			for(var tp=0; tp<tpdso.pathpoints.length; tp++){ drawPathToPoint(uistate.chareditctx, tpdso.pathpoints, tp, tpdso.isclosed); }
			if(tpdso.isclosed) uistate.chareditctx.closePath();
			uistate.chareditctx.stroke();
		}
	}

	function rectPathFromCorners(cdata){
		//Default Shape size
		var lx = 0;
		var ty = 1152;
		var rx = 200;
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
		
		var rp = new Path({"pathpoints":patharr, "isclosed":true});
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
		
		return new Path({"pathpoints":patharr, "isclosed":true});
	}
	
	function draw8points(onlycenter){
		//if(this.seed) { return; }
		//debug("DRAW8POINTS - onlycenter: " + onlycenter);
		
		var ps = uistate.chareditcanvassettings.pointsize+1;
		var hp = ps/2;
	
		var lx = temppathdragshape? sx_cx(temppathdragshape.leftx) 		: sx_cx(this.path.leftx);
		var rx = temppathdragshape? sx_cx(temppathdragshape.rightx) 	: sx_cx(this.path.rightx);
		var ty = temppathdragshape? sy_cy(temppathdragshape.topy) 		: sy_cy(this.path.topy);
		var by = temppathdragshape? sy_cy(temppathdragshape.bottomy) 	: sy_cy(this.path.bottomy);

		var bleftx = (lx-hp).makeCrisp();
		var bmidx = (lx+((rx-lx)/2)-hp).makeCrisp();
		var brightx = (rx-hp).makeCrisp();
		var btopy = (ty-hp).makeCrisp();
		var bmidy = (ty+((by-ty)/2)-hp).makeCrisp();
		var bbottomy = (by-hp).makeCrisp();

		onlycenter? uistate.chareditctx.fillStyle = color_accent : uistate.chareditctx.fillStyle = "white";
		
		if(!onlycenter){
			//upper left
			if(canResize("nw")){
				uistate.chareditctx.fillRect(bleftx, btopy, ps, ps);
				uistate.chareditctx.strokeRect(bleftx, btopy, ps, ps); 
			}

			//top
			if(canResize("n")){
				uistate.chareditctx.fillRect(bmidx, btopy, ps, ps);
				uistate.chareditctx.strokeRect(bmidx, btopy, ps, ps); 
			}

			//upper right
			if(canResize("ne")){
				uistate.chareditctx.fillRect(brightx, btopy, ps, ps);
				uistate.chareditctx.strokeRect(brightx, btopy, ps, ps); 
			}

			// right
			if(canResize("e")){
				uistate.chareditctx.fillRect(brightx, bmidy, ps, ps);
				uistate.chareditctx.strokeRect(brightx, bmidy, ps, ps); 
			}

			//lower right	
			if(canResize("se")){
				uistate.chareditctx.fillRect(brightx, bbottomy, ps, ps);
				uistate.chareditctx.strokeRect(brightx, bbottomy, ps, ps);	 
			}	

			//bottom
			if(canResize("s")){
				uistate.chareditctx.fillRect(bmidx, bbottomy, ps, ps);
				uistate.chareditctx.strokeRect(bmidx, bbottomy, ps, ps); 
			}

			//lower left
			if(canResize("sw")){
				uistate.chareditctx.fillRect(bleftx, bbottomy, ps, ps);
				uistate.chareditctx.strokeRect(bleftx, bbottomy, ps, ps); 
			}

			//left
			if(canResize("w")){
				uistate.chareditctx.fillRect(bleftx, bmidy, ps, ps);
				uistate.chareditctx.strokeRect(bleftx, bmidy, ps, ps); 
			}

		}
		
		//Center Dot
		uistate.chareditctx.fillRect(bmidx, bmidy, ps, ps);
		uistate.chareditctx.strokeRect(bmidx, bmidy, ps, ps);	 
	}
	
	function drawShapeToArea(lctx, size, offsetX, offsetY){
		//debug("DRAWSHAPETOAREA for shape: " + this.name);
		lctx.fillStyle = "#000";
		this.path.drawPathToArea(lctx, size, offsetX, offsetY);
		//debug("DRAWSHAPETOAREA end for shape: " + this.name);
		//debug("<hr>");
	}

	function genPostScript(){
		return this.path.genPathPostScript();
	}
	
	
//	-----------------
//	Button Functions
//	-----------------
	function addShape(newshape){

		if(newshape){
			debug("ADDSHAPE - was passed: " + newshape.type);			
			if(newshape.seed){
				uistate.selectedtool = "shaperesize";
			} else if(newshape.path && (uistate.selectedtool == "shapemove")) {
				newshape.path.calcMaxes();
			}
		} else {
			newshape = new Shape({});
			newshape.name = ("layer " + uistate.shapelayers.length);
		}
		
		if(uistate.navhere == "character edit") { uistate.selectedshape = uistate.shapelayers.length; }
		uistate.shapelayers.push(newshape);

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
		
		newshape.path = new Path({"pathpoints":parr, "isclosed":true});		
		newshape.name = (shapetype + uistate.shapelayers.length);
		
		if(uistate.navhere == "character edit") { uistate.selectedshape = uistate.shapelayers.length; }
		uistate.shapelayers.push(newshape);
	}

	function deleteShape(){
		if(uistate.shapelayers[uistate.selectedshape].seed){
			removeFromUsedIn(uistate.shapelayers[uistate.selectedshape].seed, uistate.selectedchar);
		}
		
		if((uistate.shapelayers.length > 0) && (uistate.selectedshape >= 0)){
			uistate.shapelayers.splice(uistate.selectedshape, 1);
			if(uistate.shapelayers.length == uistate.selectedshape) {
				uistate.selectedshape = uistate.selectedshape-1;
			}
		} else {
			debug("DELETESHAPES - no shapes left");
		}				
		
		if((uistate.selectedshape >= 0) && (uistate.shapelayers[uistate.selectedshape].seed)){
			debug("DELETESHAPE - newly selected shape is seedshape, changing tool");
			uistate.selectedtool = "shaperesize";
		}
	}

	function clickSelectShape(x,y){
		//debug("CLICKSELECTShape() - checking x:" + x + " y:" + y);
		
		if(uistate.navhere == "seed shapes"){
			return clickSelectSeedShape(x,y);
		}
		
		for(var j=(uistate.shapelayers.length-1); j>=0; j--){
			//debug("CLICKSELECTShape() - Checking shape " + j);
			if(uistate.shapelayers[j].isHere(x,y)){
				if(j != uistate.selectedshape){
					//debug("CLICKSELECTShape() - selecting shape " + j);
					uistate.selectedshape = j;				
					
					if(uistate.shapelayers[j].seed){
						debug("CLICKSELECTSHAPE - detected this.seed, setting uistate.selectedtool = shaperesize");
						uistate.selectedtool = "shaperesize";
					}
				}

				return true;
			}
		}
		uistate.selectedshape = -1;
		//debug("CLICKSELECTShape() - deselecting, setting to -1");
		return false;
	}
	
	function isHere(x,y){
		var imageData;
		uistate.ishereghostctx.clearRect(0,0,uistate.chareditcanvassettings.size,uistate.chareditcanvassettings.size);
		this.drawShape(uistate.ishereghostctx);
		imageData = uistate.ishereghostctx.getImageData(x, y, 1, 1);
		//debug("ISHERE? alpha = " + imageData.data[3] + "  returning: " + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	}

	function isoverhandle(px,py){
		//debug("ISOVERHANDLE() - checking x:" + px + " y:" + py);
		
		// Translation Fidelity - converting passed canvas values to saved value system
		var hp = uistate.chareditcanvassettings.pointsize/2;
		var leftxb = sx_cx(this.path.leftx) -hp;
		var midxb = Math.floor(sx_cx(this.path.leftx)+((sx_cx(this.path.rightx)-sx_cx(this.path.leftx))/2)-hp)+.5;
		var rightxb = sx_cx(this.path.rightx) -hp;
		
		var topyb = sy_cy(this.path.topy)-hp;
		var midyb = Math.floor(sy_cy(this.path.topy)+((sy_cy(this.path.bottomy)-sy_cy(this.path.topy))/2)-hp)+.5;
		var bottomyb = sy_cy(this.path.bottomy) -hp;
		
		// upper left
		if(canResize("nw")){
			if( ((px > leftxb) && (px < leftxb+uistate.chareditcanvassettings.pointsize)) && ((py > topyb) && (py < topyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "nw-resize";
				//debug("ISOVERHANDLE() -  upper left");
				return "nw";
			}
		} 
		
		// top
		if(canResize("n")){
			if( ((px > midxb) && (px < midxb+uistate.chareditcanvassettings.pointsize)) && ((py > topyb) && (py < topyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "n-resize";
				//debug("ISOVERHANDLE() -  top");
				return "n";
			}
		}		
		
		// upper right
		if(canResize("ne")){
			if( ((px > rightxb) && (px < rightxb+uistate.chareditcanvassettings.pointsize)) && ((py > topyb) && (py < topyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "ne-resize";
				//debug("ISOVERHANDLE() - upper right");
				return "ne";
			}
		} 
		
		// right
		if(canResize("e")){
			if( ((px > rightxb) && (px < rightxb+uistate.chareditcanvassettings.pointsize)) && ((py > midyb) && (py < midyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "e-resize";
				//debug("ISOVERHANDLE() - right");
				return "e";
			}
		}
		
		// lower right
		if(canResize("se")){
				if( ((px > rightxb) && (px < rightxb+uistate.chareditcanvassettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "se-resize";
				//debug("ISOVERHANDLE() - lower right");
				return "se";
			}
		}	

		// bottom
		if(canResize("s")){
			if( ((px > midxb) && (px < midxb+uistate.chareditcanvassettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "s-resize";
				//debug("ISOVERHANDLE() - bottom");
				return "s";
			}
		}

		// lower left
		if(canResize("sw")){
			if( ((px > leftxb) && (px < leftxb+uistate.chareditcanvassettings.pointsize)) && ((py > bottomyb) && (py < bottomyb+uistate.chareditcanvassettings.pointsize)) ){
				document.body.style.cursor = "sw-resize";
				//debug("ISOVERHANDLE() - lower left");
				return "sw";
			}
		}
		
		// left
		if(canResize("w")){
			if( ((px > leftxb) && (px < leftxb+uistate.chareditcanvassettings.pointsize)) && ((py > midyb) && (py < midyb+uistate.chareditcanvassettings.pointsize)) ){
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
		req? true : req="[probably a dynamically-generated page control]";
		//debug("SS() - Requested by: " + req + " - CURRENT uistate.selectedshape = " + uistate.selectedshape);	
		
		if(uistate.navhere == "seed shapes"){
			//debug("SS() - SEEDSHAPE - Requested by: " + req + " - returning shownseedshape: " + uistate.shownseedshape);
			return GlyphrProject.seedshapes[uistate.shownseedshape].shape;
		}
		
		if(uistate.selectedshape != -1){
			if((uistate.selectedshape >= 0)&&(uistate.selectedshape < uistate.shapelayers.length)) {
				// Charedit Selected Shape
				//debug("SS() - CHAREDIT - returning shape object for position " + uistate.selectedshape);
				return uistate.shapelayers[uistate.selectedshape];
			} else {
				// Out of bounds Selected Shape
				//debug("SS() - Selected Shape outside of expected boundary. uistate.selectedshape: " + uistate.selectedshape);
				uistate.selectedshape = -1;
				return false;
			}				
		} else {
			// -1 = "no shape selected"
			//debug("SS() - setting uistate.selectedshape = -1, returning false");
			return false;
		}
	}
	
	function debugShape(){
		/* ALL MESSED UP
		var sp = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var rv = sp+"name:" + this.name +", x:"+this.xpos+", y:"+(this.ypos)+", w:"+this.width+", h:"+this.height+"<br>";
		rv += sp+"fill:"+this.fillbool+", stroke:"+this.stroketype+", sweight:"+this.strokeweight+", type:"+this.type+"<br>";
		rv += sp+"topy:"+this.path.topy+", bottomy:"+this.path.bottomy+", leftx:"+this.path.leftx+", rightx:"+this.path.rightx+"<br>";
		rv += sp+"seed:"+this.seed+", useseedxy:"+this.useseedxy+"<br>";
		
		if(this.path){
			rv += sp+"path:" + this.path.pathpoints.length + " points long";
		} else {
			rv += sp+"path:false";
		}
		
		return rv;	
		*/
		
		return "debugShape is all messed up";
	}

	function changeShapeName(sn){
		sn = strSan(sn);
		debug("CHANGESHAPENAME - sanitized name: " + sn);
		if(sn != ""){
			this.name = sn;
			putundoq("shape name"); 
		} else {
			openDialog("<h2>Invalid shape name</h2><br>Shape names must only contain alphanumeric characters or spaces.<br>");
		}
		
		redraw("Shape Name");
	}
