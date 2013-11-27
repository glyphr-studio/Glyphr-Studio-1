
//-------------------------------------------------------
// SHAPE OBJECT
//-------------------------------------------------------

	function Shape(oa){
		// PARAMS //
		// n,x,y,p,v,xl,yl,wl,hl,ne
		this.objtype = "shape";

		// common settings
		this.name = (oa.n? oa.n : "new shape");
		this.xpos = ((oa.x || oa.x==0)? oa.x : 0);		// these are used for stroke-independend position & size
		this.ypos = ((oa.y || oa.y==0)? oa.y : 400); 
		this.path = (oa.p? oa.p : rectPathFromCorners(false));
		this.visible = (isval(oa.v)? oa.v : true);
		this.xlock = (isval(oa.xl)? oa.xl : false);
		this.ylock = (isval(oa.yl)? oa.yl : false);
		this.wlock = (isval(oa.wl)? oa.wl : false);
		this.hlock = (isval(oa.hl)? oa.hl : false);
		this.negative = (isval(oa.ne)? oa.ne : false);
				
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
			
		var z = cec.zoom;
		
		// Check to see if this is a Ghost Canvas draw
		var tempzp = {};
		tempzp.x = cec.originx;
		tempzp.y = cec.originy;
		tempzp.z = cec.zoom;
		if(lctx == cmgctx) { 
			//debug("DRAWSHAPE - CMGC DETECTED");
			z = 1;
			cec.zoom = 1;			
			cec.originx = cgc.originx;
			cec.originy = cgc.originy;
		}
		
		//debug("DRAWSHAPE - origin x/y/z: "+cec.originx+","+cec.originy+","+cec.zoom);
		
		if((ds.path.rightx == -1) && (lctx == ctx)) ds.path.calcMaxes();
		
		if(lctx==ctx){
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
		else if(lctx == ihgctx) { lctx.fillStyle = "rgba(0,0,255,0.2)"; }
		else if(lctx == cmgctx) { lctx.fillStyle = "rgba(0,255,0,0.2)"; }
		
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
		
		cec.originx = tempzp.x;
		cec.originy = tempzp.y;
		cec.zoom = tempzp.z;
	}
	
	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var canvasx = cec.originx;
		canvasx += (sx*cec.zoom);
		return canvasx;
	}
	
	function sy_cy(sy){
		var canvasy = cec.originy;
		canvasy -= (sy*cec.zoom);
		return canvasy;
	}
	
	function drawselectoutline(onlycenter){
		//debug("DRAWSELECTOUTLINE - onlycenter: " + onlycenter);
		
		var z = cec.zoom;
		var hp = (cec.pointsize/2);
		ctx.lineWidth = 1;
		ctx.strokeStyle = color_accent;
		
		if((selectedtool=="newrect")||(selectedtool=="shaperesize")){
			ctx.fillStyle = "transparent";
			
			//draw bounding box and 8points
			var lx = temppathdragshape? sx_cx(temppathdragshape.leftx) 		: sx_cx(this.path.leftx);
			var rx = temppathdragshape? sx_cx(temppathdragshape.rightx) 	: sx_cx(this.path.rightx);
			var ty = temppathdragshape? sy_cy(temppathdragshape.topy) 		: sy_cy(this.path.topy);
			var by = temppathdragshape? sy_cy(temppathdragshape.bottomy) 	: sy_cy(this.path.bottomy);
			
			var x = (lx).makeCrisp()-1;
			var y = (ty).makeCrisp()-1;
			var w = Math.ceil(rx-lx);
			var h = Math.ceil(by-ty);
			
			ctx.strokeStyle = color_accent;
			//debug("DRAWSELECTOUTLINE - real shape detected, and xywh= " + x + "," + y + "," + w + "," + h);

			ctx.strokeRect(x,y,w,h);
			if(selectedtool=="shaperesize"){ this.draw8points(onlycenter); }
			
		} else if ((selectedtool == "pathedit")||(selectedtool=="newpath")){
			// Draw Path Points
			var sep = this.path.sp(true, "DRAWSELECTOUTLINE");
			var pp = this.path.pathpoints;
			
			// Draw path selection outline
			ctx.lineWidth = 1;
			ctx.strokeStyle = color_accent;
			ctx.beginPath();
			for(var s=0; s<pp.length; s++){ drawPathToPoint(ctx, pp, s, this.path.isclosed); }
			ctx.stroke();
			//debug("DRAWSELECTOUTLINE - tool=pathedit, drew pathpoints length = " + pp.length);
			
			// Draw Handles
			if(this.path.sp(false)){
				if(sep == 0){
					this.path.isclosed? pp[sep].drawHandles(true, true) : pp[sep].drawHandles(false, true);
				} else if (sep == pp.length-1){
					if(this.path.isclosed || selectedtool=="newpath"){
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
			
		} else if ((selectedtool=="newoval")){
			ctx.strokeStyle = color_accent;
			var tpdso = ovalPathFromCorners(temppathdragshape);
			
			ctx.beginPath();
			ctx.lineWidth = 1;
			for(var tp=0; tp<tpdso.pathpoints.length; tp++){ drawPathToPoint(ctx, tpdso.pathpoints, tp, tpdso.isclosed); }
			if(tpdso.isclosed) ctx.closePath();
			ctx.stroke();
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
		
		debug(JSON.stringify(path));
		alert(JSON.stringify(new Path({})));
		var rp = new Path({"points":patharr, "ic":true});
		debug("RETURNING PATH: " + JSON.stringify(rp));

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
		
		return new Path({"points":patharr, "ic":true});
	}
	
	function draw8points(onlycenter){
		//if(this.seed) { return; }
		//debug("DRAW8POINTS - onlycenter: " + onlycenter);
		
		var ps = cec.pointsize+1;
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

		onlycenter? ctx.fillStyle = color_accent : ctx.fillStyle = "white";
		
		if(!onlycenter){
			//upper left
			if(canResize("nw")){
				ctx.fillRect(bleftx, btopy, ps, ps);
				ctx.strokeRect(bleftx, btopy, ps, ps); 
			}

			//top
			if(canResize("n")){
				ctx.fillRect(bmidx, btopy, ps, ps);
				ctx.strokeRect(bmidx, btopy, ps, ps); 
			}

			//upper right
			if(canResize("ne")){
				ctx.fillRect(brightx, btopy, ps, ps);
				ctx.strokeRect(brightx, btopy, ps, ps); 
			}

			// right
			if(canResize("e")){
				ctx.fillRect(brightx, bmidy, ps, ps);
				ctx.strokeRect(brightx, bmidy, ps, ps); 
			}

			//lower right	
			if(canResize("se")){
				ctx.fillRect(brightx, bbottomy, ps, ps);
				ctx.strokeRect(brightx, bbottomy, ps, ps);	 
			}	

			//bottom
			if(canResize("s")){
				ctx.fillRect(bmidx, bbottomy, ps, ps);
				ctx.strokeRect(bmidx, bbottomy, ps, ps); 
			}

			//lower left
			if(canResize("sw")){
				ctx.fillRect(bleftx, bbottomy, ps, ps);
				ctx.strokeRect(bleftx, bbottomy, ps, ps); 
			}

			//left
			if(canResize("w")){
				ctx.fillRect(bleftx, bmidy, ps, ps);
				ctx.strokeRect(bleftx, bmidy, ps, ps); 
			}

		}
		
		//Center Dot
		ctx.fillRect(bmidx, bmidy, ps, ps);
		ctx.strokeRect(bmidx, bmidy, ps, ps);	 
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
				selectedtool = "shaperesize";
			} else if(newshape.path && (selectedtool == "shapemove")) {
				newshape.path.calcMaxes();
			}
		} else {
			newshape = new Shape({});
			newshape.name = ("layer " + shapelayers.length);
		}
		
		if(navhere == "character edit") { selectedshape = shapelayers.length; }
		shapelayers.push(newshape);

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
			parr = new Array(p1,p2,p3,p4);
			shapetype = "oval ";
		} else {
			var p1 = new PathPoint({"P":new Coord({"x":0,"y":0}), "H1":new Coord({"x":hd,"y":0}), "H2":new Coord({"x":0,"y":hd})}); 
			var p2 = new PathPoint({"P":new Coord({"x":0,"y":th}), "H1":new Coord({"x":0,"y":(th-hd)}), "H2":new Coord({"x":hd,"y":th})}); 
			var p3 = new PathPoint({"P":new Coord({"x":tw,"y":th}), "H1":new Coord({"x":(tw-hd),"y":th}), "H2":new Coord({"x":tw,"y":(th-hd)})}); 
			var p4 = new PathPoint({"P":new Coord({"x":tw,"y":0}), "H1":new Coord({"x":tw,"y":hd}), "H2":new Coord({"x":(tw-hd),"y":0})}); 
			parr = new Array(p1,p2,p3,p4);
			shapetype = "rect ";
		}
		
		newshape.path = new Path({"points":parr, "ic":true});		
		newshape.name = (shapetype + shapelayers.length);
		
		if(navhere == "character edit") { selectedshape = shapelayers.length; }
		shapelayers.push(newshape);
	}

	function deleteShape(){
		if(shapelayers[selectedshape].seed){
			removeFromUsedIn(shapelayers[selectedshape].seed, selectedchar);
		}
		
		if((shapelayers.length > 0) && (selectedshape >= 0)){
			shapelayers.splice(selectedshape, 1);
			if(shapelayers.length == selectedshape) {
				selectedshape = selectedshape-1;
			}
		} else {
			debug("DELETESHAPES - no shapes left");
		}				
		
		if((selectedshape >= 0) && (shapelayers[selectedshape].seed)){
			debug("DELETESHAPE - newly selected shape is seedshape, changing tool");
			selectedtool = "shaperesize";
		}
	}

	function clickSelectShape(x,y){
		//debug("CLICKSELECTShape() - checking x:" + x + " y:" + y);
		
		if(navhere == "seed shapes"){
			return clickSelectSeedShapex,y);
		}
		
		for(var j=(shapelayers.length-1); j>=0; j--){
			//debug("CLICKSELECTShape() - Checking shape " + j);
			if(shapelayers[j].isHere(x,y)){
				if(j != selectedshape){
					//debug("CLICKSELECTShape() - selecting shape " + j);
					selectedshape = j;				
					
					if(shapelayers[j].seed){
						debug("CLICKSELECTSHAPE - detected this.seed, setting selectedtool = shaperesize");
						selectedtool = "shaperesize";
					}
				}

				return true;
			}
		}
		selectedshape = -1;
		//debug("CLICKSELECTShape() - deselecting, setting to -1");
		return false;
	}
	
	function isHere(x,y){
		var imageData;
		ihgctx.clearRect(0,0,cec.size,cec.size);
		this.drawShape(ihgctx);
		imageData = ihgctx.getImageData(x, y, 1, 1);
		//debug("ISHERE? alpha = " + imageData.data[3] + "  returning: " + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	}

	function isoverhandle(px,py){
		//debug("ISOVERHANDLE() - checking x:" + px + " y:" + py);
		
		// Translation Fidelity - converting passed canvas values to saved value system
		var hp = cec.pointsize/2;
		var leftxb = sx_cx(this.path.leftx) -hp;
		var midxb = Math.floor(sx_cx(this.path.leftx)+((sx_cx(this.path.rightx)-sx_cx(this.path.leftx))/2)-hp)+.5;
		var rightxb = sx_cx(this.path.rightx) -hp;
		
		var topyb = sy_cy(this.path.topy)-hp;
		var midyb = Math.floor(sy_cy(this.path.topy)+((sy_cy(this.path.bottomy)-sy_cy(this.path.topy))/2)-hp)+.5;
		var bottomyb = sy_cy(this.path.bottomy) -hp;
		
		// upper left
		if(canResize("nw")){
			if( ((px > leftxb) && (px < leftxb+cec.pointsize)) && ((py > topyb) && (py < topyb+cec.pointsize)) ){
				document.body.style.cursor = "nw-resize";
				//debug("ISOVERHANDLE() -  upper left");
				return "nw";
			}
		} 
		
		// top
		if(canResize("n")){
			if( ((px > midxb) && (px < midxb+cec.pointsize)) && ((py > topyb) && (py < topyb+cec.pointsize)) ){
				document.body.style.cursor = "n-resize";
				//debug("ISOVERHANDLE() -  top");
				return "n";
			}
		}		
		
		// upper right
		if(canResize("ne")){
			if( ((px > rightxb) && (px < rightxb+cec.pointsize)) && ((py > topyb) && (py < topyb+cec.pointsize)) ){
				document.body.style.cursor = "ne-resize";
				//debug("ISOVERHANDLE() - upper right");
				return "ne";
			}
		} 
		
		// right
		if(canResize("e")){
			if( ((px > rightxb) && (px < rightxb+cec.pointsize)) && ((py > midyb) && (py < midyb+cec.pointsize)) ){
				document.body.style.cursor = "e-resize";
				//debug("ISOVERHANDLE() - right");
				return "e";
			}
		}
		
		// lower right
		if(canResize("se")){
				if( ((px > rightxb) && (px < rightxb+cec.pointsize)) && ((py > bottomyb) && (py < bottomyb+cec.pointsize)) ){
				document.body.style.cursor = "se-resize";
				//debug("ISOVERHANDLE() - lower right");
				return "se";
			}
		}	

		// bottom
		if(canResize("s")){
			if( ((px > midxb) && (px < midxb+cec.pointsize)) && ((py > bottomyb) && (py < bottomyb+cec.pointsize)) ){
				document.body.style.cursor = "s-resize";
				//debug("ISOVERHANDLE() - bottom");
				return "s";
			}
		}

		// lower left
		if(canResize("sw")){
			if( ((px > leftxb) && (px < leftxb+cec.pointsize)) && ((py > bottomyb) && (py < bottomyb+cec.pointsize)) ){
				document.body.style.cursor = "sw-resize";
				//debug("ISOVERHANDLE() - lower left");
				return "sw";
			}
		}
		
		// left
		if(canResize("w")){
			if( ((px > leftxb) && (px < leftxb+cec.pointsize)) && ((py > midyb) && (py < midyb+cec.pointsize)) ){
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
		//debug("SS() - Requested by: " + req + " - CURRENT selectedshape = " + selectedshape);	
		
		if(navhere == "seed shapes"){
			//debug("SS() - SEEDSHAPE - Requested by: " + req + " - returning shownseedshape: " + shownseedshape);
			return GlyphrProject.seedshapes[shownseedshape].shape;
		}
		
		if(selectedshape != -1){
			if((selectedshape >= 0)&&(selectedshape < shapelayers.length)) {
				// Charedit Selected Shape
				//debug("SS() - CHAREDIT - returning shape object for position " + selectedshape);
				return shapelayers[selectedshape];
			} else {
				// Out of bounds Selected Shape
				//debug("SS() - Selected Shape outside of expected boundary. selectedshape: " + selectedshape);
				selectedshape = -1;
				return false;
			}				
		} else {
			// -1 = "no shape selected"
			//debug("SS() - setting selectedshape = -1, returning false");
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
