		
//  -----------------------------------
//  PATH OBJECT
//  -----------------------------------

	function Path(oa){
		this.objtype = "path";

		//debug("NEW PATH: oa = \n" + JSON.stringify(oa));

		// declare attributes
		this.pathpoints = false;
		if(oa.pathpoints.length){
			this.pathpoints = [];
			//debug("NEW PATH : Hydrating Path Points, length " + oa.pathpoints.length);
			for (var i = 0; i < oa.pathpoints.length; i++) {
				this.pathpoints[i] = new PathPoint(oa.pathpoints[i]);
			}
		}
		this.clockwise = isval(oa.clockwise)? oa.clockwise : findClockwise(this.pathpoints);
		// internal
		this.topy = isval(oa.topy)? oa.topy : -1;	
		this.bottomy = isval(oa.bottomy)? oa.bottomy : -1;
		this.leftx = isval(oa.leftx)? oa.leftx : -1;
		this.rightx = isval(oa.rightx)? oa.rightx : -1;
		this.needsnewcalcmaxes = isval(oa.needsnewcalcmaxes)? oa.needsnewcalcmaxes : true;
		
		// declare public functions
		this.addPathPoint = addPathPoint;
		this.insertPathPoint = insertPathPoint;
		this.deletePathPoint = deletePathPoint;
		this.selectPathPoint = selectPathPoint;
		this.drawPath = drawPath;
		this.outlinePathOnCanvas = outlinePathOnCanvas;
		this.drawPathToArea = drawPathToArea;
		this.genPathPostScript = genPathPostScript;
		this.updatePathPosition = updatePathPosition;
		this.updatePathSize = updatePathSize;
		this.reversePath = reversePath;
		this.calcMaxes = calcMaxes;
		this.flipew = flipew;
		this.flipns = flipns;
		this.setLeftX = setLeftX;
		this.setTopY = setTopY;
		this.isOverControlPoint = isOverControlPoint;
		this.sp = sp;
		this.getMaxesFromPathPoints = getMaxesFromPathPoints;
		
		// Setup the object
		this.selectPathPoint(-1);
		//if(this.pathpoints) this.calcMaxes();
		
		//debug("Path() - created new path: " + this.pathpoints);
	}
	
	// Selected Point - returns the selected point object
	function sp(wantindex, calledby){
		//debug("SP - Called By : " + calledby);
		
		if(!this.pathpoints) {
			//debug("SP - returning false, this.pathpoints = " + JSON.stringify(this.pathpoints));
			return false;
		}
		
		for(var p=0; p<this.pathpoints.length; p++){
			var thisp = this.pathpoints[p];
			if(thisp.selected){
				if(wantindex){
					return p;
				} else {
					return thisp;
				}
			}
		}
		
		return false;
	}
	
	function drawPath(lctx) {
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
		
		this.outlinePathOnCanvas(lctx); 

		uistate.chareditcanvassettings.originx = tempzp.x;
		uistate.chareditcanvassettings.originy = tempzp.y;
		uistate.chareditcanvassettings.zoom = tempzp.z;
	}

	function outlinePathOnCanvas(lctx) {
		if(this.pathpoints.length < 2) return;
		var pp, np, pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy;

		lctx.moveTo(sx_cx(this.pathpoints[0].P.x), sy_cy(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			pp = this.pathpoints[cp];
			np = this.pathpoints[(cp+1) % this.pathpoints.length];
			
			if(pp.type == "symmetric") { pp.makeSymmetric("H1"); }
			else if (pp.type == "flat") { pp.makeFlat("H1"); }
			
			pph2x = (pp.useh2? sx_cx(pp.H2.x) : sx_cx(pp.P.x));
			pph2y = (pp.useh2? sy_cy(pp.H2.y) : sy_cy(pp.P.y));
			nxh1x = (np.useh1? sx_cx(np.H1.x) : sx_cx(np.P.x));
			nxh1y = (np.useh1? sy_cy(np.H1.y) : sy_cy(np.P.y));
			nxppx = sx_cx(np.P.x);
			nxppy = sy_cy(np.P.y);
			
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy); 
		}

	}
	
	function drawPathToArea(lctx, size, offsetX, offsetY){
		var tempx = uistate.chareditcanvassettings.originx;
		var tempy = uistate.chareditcanvassettings.originy;
		var tempz = uistate.chareditcanvassettings.zoom;
		
		uistate.chareditcanvassettings.originx = offsetX;
		uistate.chareditcanvassettings.originy = offsetY;
		uistate.chareditcanvassettings.zoom = size;	
		
		this.drawPath(lctx);
		
		uistate.chareditcanvassettings.originx = tempx;
		uistate.chareditcanvassettings.originy = tempy;
		uistate.chareditcanvassettings.zoom = tempz;	
	}
	
	function genPathPostScript(lastx, lasty){
		if(!this.pathpoints) return {"re":"", "lastx":lastx, "lasty":lasty};

		var p1, p2, p1h2x, p1h2y, p2h1x, p2h1y, p2ppx, p2ppy;
		var trr = "";

		lastx = this.pathpoints[0].P.x - lastx;
		lasty = this.pathpoints[0].P.y - lasty;
		var re = "" + lastx + " " + lasty + " rmoveto ";
		
		//debug("GENPATHPOSTSCRIPT:\n\t " + re);

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			p2 = this.pathpoints[(cp+1) % this.pathpoints.length];

			p1h2x = p1.useh2? (p1.H2.x - lastx) : (p1.P.x - lastx);
			p1h2y = p1.useh2? (p1.H2.y - lasty) : (p1.P.y - lasty);
			p2h1x = p2.useh1? (p2.H1.x - (p1.useh2? p1.H2.x : p1.P.x)) : (p2.P.x - (p1.useh2? p1.H2.x : p1.P.x));
			p2h1y = p2.useh1? (p2.H1.y - (p1.useh2? p1.H2.y : p1.P.y)) : (p2.P.y - (p1.useh2? p1.H2.y : p1.P.y));
			p2ppx = (p2.P.x - (p2.useh1? p2.H1.x : p2.P.x));
			p2ppy = (p2.P.y - (p2.useh1? p2.H1.y : p2.P.y));

			trr = p1h2x + " " + p1h2y + " " + p2h1x + " " + p2h1y + " " + p2ppx + " " + p2ppy + " rrcurveto ";

			//debug("\t " + trr);

			re += trr;

			lastx = p2.P.x;
			lasty = p2.P.y;
		}

		return {
			"re" : re,
			"lastx" : lastx,
			"lasty" : lasty
			};
	}
	
	function isOverControlPoint(x, y){
		var a = this.pathpoints;
		//var hp = _G.projectsettings.pointsize/2/uistate.chareditcanvassettings.zoom;
		var hp = _G.projectsettings.pointsize/uistate.chareditcanvassettings.zoom;
		
		for(var k=a.length-1; k>=0; k--){
			if( ((a[k].P.x+hp) > x) && ((a[k].P.x-hp) < x) && ((a[k].P.y+hp) > y) && ((a[k].P.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning P1, selectedpoint: " + k);
				return 'P';
			}
			
			if( ((a[k].H1.x+hp) > x) && ((a[k].H1.x-hp) < x) && ((a[k].H1.y+hp) > y) && ((a[k].H1.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning H1, selectedpoint: " + k);
				return 'H1';
			}
			
			if( ((a[k].H2.x+hp) > x) && ((a[k].H2.x-hp) < x) && ((a[k].H2.y+hp) > y) && ((a[k].H2.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning H2, selectedpoint: " + k);
				return 'H2';
			}
		}
		
		this.selectPathPoint(0);
		//debug("ISOVERCONTROLPOINT() - Returning FALSE");
		return false;
	}
	
	function updatePathSize(dw, dh){
		//debug("UPDATEPATHSIZE - Change Size: dw/dh "+dw+" , "+dh);
		var fs = _G.fontsettings;
		
		var s = ss("updatePathPosition");
		s.wlock? dw = 0 : false;
		s.hlock? dh = 0 : false;
		
		if(s.wlock && s.hlock) return;
		
		uistate.calcmaxesghostctx.clearRect(0,0,uistate.calcmaxesghostcanvas.width,uistate.calcmaxesghostcanvas.height);
		uistate.calcmaxesghostctx.lineWidth = 1;
		uistate.calcmaxesghostctx.fillStyle = "lime";
		uistate.calcmaxesghostctx.strokeStyle = "lime";
		
		//Setup temp zoom/pan for cmgc
		var tempzp = {};
		tempzp.x = uistate.chareditcanvassettings.originx;
		tempzp.y = uistate.chareditcanvassettings.originy;
		tempzp.z = uistate.chareditcanvassettings.zoom;
		uistate.chareditcanvassettings.zoom = 1;			
		uistate.chareditcanvassettings.originx = fs.upm;
		uistate.chareditcanvassettings.originy = fs.upm*2;
			
		this.drawPath(uistate.calcmaxesghostctx);
		//debug("UPDATEPATHSIZE - Just finished drawing to CMGC");
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());
		//drawCMGCorigins("lime");
				
		var rx = r.rightx;
		var lx = r.leftx;
		var ty = r.topy;
		var by = r.bottomy;
		
		var oldw = rx - lx;
		var oldh = ty - by;
		var neww = oldw + dw;
		var newh = oldh + dh;
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		//debug("---------------- Saved Shape Maxes: l/r/t/b: " + s.leftx + " , " + s.rightx + " , " + s.topy + " , " + s.bottomy);
		//debug("---------------- ---GC Shape Maxes: l/r/t/b: " + r.leftx + " , " + r.rightx + " , " + r.topy + " , " + r.bottomy);
		
		//debug("---------------- Passed Deltas-: w/h: " + dw + " , " + dh);
		//debug("---------------- New Shape Size: w/h: " + neww + " , " + newh);
		//debug("---------------- HEIGHT RATI new/old: " + (newh/oldh));

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x =   round( ((pp.P.x  - lx) * ratiodw) + lx  );
			pp.H1.x =  round( ((pp.H1.x - lx) * ratiodw) + lx  );
			pp.H2.x =  round( ((pp.H2.x - lx) * ratiodw) + lx  );
			pp.P.y =   round( ((pp.P.y  - by) * ratiodh) + by  );
			pp.H1.y =  round( ((pp.H1.y - by) * ratiodh) + by  );
			pp.H2.y =  round( ((pp.H2.y - by) * ratiodh) + by  );
		}
		
		//this.calcMaxes();
		this.topy += dh;
		//this.bottomy -= (dh/4);
		this.rightx += dw;
		//this.leftx += (dw/2);
		
		uistate.chareditcanvassettings.originx = tempzp.x;
		uistate.chareditcanvassettings.originy = tempzp.y;
		uistate.chareditcanvassettings.zoom = tempzp.z;
		//debug("UPDATEPATHSIZE - done");
	}
	
	function updatePathPosition(dx, dy, force){
		isval(force)? true : force = false;
		//debug("UPDATEPATHPOSITION - dx,dy,force "+dx+","+dy+","+force+" - pathpoints length: " + this.pathpoints.length);

		for(var d=0; d<this.pathpoints.length; d++){
			var pp = this.pathpoints[d];
			//debug("-------------------- pathPoint #" + d);
			pp.updatePointPosition("P",dx,dy,force);
		}
		
		this.topy += dy;
		this.bottomy += dy;
		this.leftx += dx;
		this.rightx += dx;
	}
	
	function findClockwise(parr){
		var j,k,z;
		var count = 0;

		if (parr.length < 3) return 0;

		for (var i=0; i<parr.length; i++) {
			j = (i + 1) % parr.length;
			k = (i + 2) % parr.length;
			z  = (parr[j].P.x - parr[i].P.x) * (parr[k].P.y - parr[j].P.y);
			z -= (parr[j].P.y - parr[i].P.y) * (parr[k].P.x - parr[j].P.x);
			
			if (z < 0) count--;
			else if (z > 0) count++;
		}

		// negative = clockwise
		// positive = counterclockwise
		debug("FINDCLOCKWISE returning " + count);
		return count;
	}

	function reversePath(){
		var HT = {};
		if(this.pathpoints){
			for (var i = 0; i < this.pathpoints.length; i++) {
				HT = this.pathpoints[i].H1;
				this.pathpoints[i].H1 = this.pathpoints[i].H2;
				this.pathpoints[i].H2 = HT;
				if(this.pathpoints[i].useh1 !== this.pathpoints[i].useh2){
					this.pathpoints[i].useh1 = !this.pathpoints[i].useh1;
					this.pathpoints[i].useh2 = !this.pathpoints[i].useh2;
				}
			}
			this.pathpoints.reverse();
			this.clockwise *= -1;
		}
	}

	function flipns(){
		var ly = this.topy;
		var lx = this.leftx;
		uistate.calcmaxesghostctx.clearRect(0,0,uistate.calcmaxesghostcanvas.width,uistate.calcmaxesghostcanvas.height);
		this.drawPath(uistate.calcmaxesghostctx);
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());

		var mid = ((r.topy - r.bottomy)/2)+r.bottomy;
		//debug("FLIPNS - calculating mid: (b-t)/2 + t = mid: " + r.bottomy +","+ r.topy + ","+ mid);
		
		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}
		
		this.needsnewcalcmaxes = true;
		this.setTopY(ly);
		this.setLeftX(lx);

		this.reversePath();
	}
	
	function flipew(){
		var ly = this.topy;
		var lx = this.leftx;
		uistate.calcmaxesghostctx.lineWidth = ss().strokeweight;
		uistate.calcmaxesghostctx.clearRect(0,0,uistate.calcmaxesghostcanvas.width,uistate.calcmaxesghostcanvas.height);
		this.drawPath(uistate.calcmaxesghostctx);
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());

		var mid = ((r.rightx - r.leftx)/2)+r.leftx;
		//debug("FLIPEW - calculating mid: (b-t)/2 + t = mid: " + r.rightx +","+ r.leftx +","+ mid);
		
		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}
		
		this.needsnewcalcmaxes = true;
		this.setTopY(ly);
		this.setLeftX(lx);

		this.reversePath();
	}
	
	function setTopY(newvalue){
		var delta = ((newvalue*1) - ss("setTopY").path.topy);
		this.updatePathPosition(0,delta);
	}
	
	function setLeftX(newvalue){
		this.updatePathPosition(((newvalue*1) - ss("SetLeftX").path.leftx),0);
	}

	function addPathPoint(newpp, addtostart){
		//debug("ADDPATHPOINT - new point? " + newpp);
		
		if(!newpp) { 
			// No pathpoint passed to function - make a new one
			newpp = new PathPoint({}); 
			
			if(addtostart){
				//Adds new pathpoint to start of path
				if(this.pathpoints.length > 0){
					var firstpp = this.pathpoints[0];
					
					newpp.P.x = firstpp.P.x-200;
					newpp.P.y = firstpp.P.y-200;
					newpp.H1.x = newpp.P.x;
					newpp.H1.y = newpp.P.y-100;
					newpp.H2.x = newpp.P.x+100;
					newpp.H2.y = newpp.P.y;
				}	
				
				this.pathpoints.unshift(newpp);
				this.selectPathPoint(0);
			} else {
				// Adds new pathpoint to end of path
				if(this.pathpoints.length > 0){
					var lastpp = this.pathpoints[this.pathpoints.length-1];
					
					newpp.P.x = lastpp.P.x+200;
					newpp.P.y = lastpp.P.y+200;
					newpp.H1.x = newpp.P.x;
					newpp.H1.y = newpp.P.y-100;
					newpp.H2.x = newpp.P.x+100;
					newpp.H2.y = newpp.P.y;
				}
				
				this.pathpoints.push(newpp);
				this.selectPathPoint(this.pathpoints.length-1);
			}
		} else {
			// Function was passed a new path point
			this.pathpoints.push(newpp);
			this.selectPathPoint(this.pathpoints.length-1);
		}		
	}
	
	function insertPathPoint() {

		var p1i = this.sp(true, "insert path point");
		var p1 = (p1i === false ? this.pathpoints[0] : this.pathpoints[p1i]);

		if(this.pathpoints.length > 1){
			var p2 = this.pathpoints[(p1i+1)%this.pathpoints.length];

	  		var newPx = (p1.P.x*.125) + (p1.H2.x*.375) + (p2.H1.x*.375) + (p2.P.x*.125);
	  		var newPy = (p1.P.y*.125) + (p1.H2.y*.375) + (p2.H1.y*.375) + (p2.P.y*.125);

	  		var newpp = new PathPoint({"P":new Coord({"x":newPx, "y":newPy}), "type":"flat"});
	  		// Handles (tangents)

	  		var newH2x = ((p2.H1.x - p2.P.x) / 2) + p2.P.x;
	  		var newH2y = ((p2.P.y - p2.H1.y) / 2) + p2.H1.y;

		    debug("INSERTPATHPOINT - before makepointedto " + JSON.stringify(newpp));

	  		newpp.makePointedTo(newH2x, newH2y, 100);
	  		var tempH2 = newpp.H2;
	  		newpp.H2 = newpp.H1;
	  		newpp.H1 = tempH2;
	  		newpp.makeSymmetric("H2");

		    debug("INSERTPATHPOINT - afters makepointedto " + JSON.stringify(newpp));


		    this.pathpoints.splice((p1i+1)%this.pathpoints.length, 0, newpp);
		    this.selectPathPoint((p1i+1)%this.pathpoints.length);

	  	}
	}

	function deletePathPoint(){
		var pp = this.pathpoints;
		
		if(pp.length > 1){
			for(var j=0; j<pp.length; j++){
				if(pp[j].selected){
					pp.splice(j, 1);
					if(j>0) {
						pp[j-1].selected = true;
					} else {
						pp[0].selected = true;
					}
				}
			}
		} else {
			uistate.selectedtool = "pathedit";
			deleteShape();
		}
	}
	
	function selectPathPoint(index){
	// FOR NOW, ONLY ONE POINT SELECTED
		for(var j=0; j<this.pathpoints.length; j++){
			this.pathpoints[j].selected = false;
		}
		
		if(index == -1){
			return;
		} else if(this.pathpoints[index]){
			this.pathpoints[index].selected = true;
			//debug("SELECTPATHPOINT - selecting point " + index);
		} 
		/*
		else if (this.pathpoints[0]){
			this.pathpoints[0].selected = true;
			//debug("SELECTPATHPOINT - defaulting to 0 index point selection");
		}
		*/
	}

//	----------------------------------
//	Calc Maxes Stuff
//	----------------------------------

	function calcMaxes(){
		if(this.needsnewcalcmaxes){
			debug("!!!!!!!!!!!!!!!!!!!CALCMAXES!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			debug("!!!----------------before ty/by/lx/rx: " + this.topy + "/" + this.bottomy + "/" + this.leftx + "/" + this.rightx);
			debug("!!!CALCMAXES - uistate.cmgcs.size/ox/oy: " + uistate.calcmaxesghostcanvassettings.size + " / " + uistate.calcmaxesghostcanvassettings.originx + " / " + uistate.calcmaxesghostcanvassettings.originy);
			
			this.topy = (uistate.calcmaxesghostcanvassettings.size*-1);
			this.bottomy = uistate.calcmaxesghostcanvassettings.size;
			this.leftx = uistate.calcmaxesghostcanvassettings.size;
			this.rightx = (uistate.calcmaxesghostcanvassettings.size*-1);

			uistate.calcmaxesghostctx.clearRect(0,0,uistate.calcmaxesghostcanvassettings.size,uistate.calcmaxesghostcanvassettings.size);
			this.drawPath(uistate.calcmaxesghostctx);
			
			var mp = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());
			//drawCMGCorigins("lime");
			
			
			this.topy = mp.topy;
			this.bottomy = mp.bottomy;
			this.leftx = mp.leftx;
			this.rightx = mp.rightx;
			
			debug("!!!----------------afters ty/by/lx/rx: " + this.topy + "/" + this.bottomy + "/" + this.leftx + "/" + this.rightx);	
		}
		
		this.needsnewcalcmaxes = false;
		
	}

	function getMaxesFromGhostCanvas(sr){
		//debug("GETMAXESFROMGHOSTCANVAS - sr passed: " + JSON.stringify(sr));

		sr.topy = Math.ceil(uistate.calcmaxesghostcanvassettings.size - (sr.topy+(uistate.calcmaxesghostcanvassettings.size-uistate.calcmaxesghostcanvassettings.originy)));
		sr.bottomy = Math.floor(uistate.calcmaxesghostcanvassettings.size - (sr.bottomy+(uistate.calcmaxesghostcanvassettings.size-uistate.calcmaxesghostcanvassettings.originy)));
		sr.leftx = Math.ceil(uistate.calcmaxesghostcanvassettings.originx + sr.leftx);
		sr.rightx = Math.floor(uistate.calcmaxesghostcanvassettings.originx + sr.rightx);
		
		//debug("GETMAXESFROMGHOSTCANVAS - Converted ty/by/lx/rx: " + sr.topy + "/" + sr.bottomy + "/" + sr.leftx + "/" + sr.rightx);	
		
		var initialrow = sr.topy;
		
		var leftmost = uistate.calcmaxesghostcanvassettings.size;
		var rightmost = 0;
		var topmost = uistate.calcmaxesghostcanvassettings.size;
		var bottommost = 0;
		
		var imageData = uistate.calcmaxesghostctx.getImageData(0,0,uistate.calcmaxesghostcanvas.width,uistate.calcmaxesghostcanvas.height);
		var colreturn = uistate.calcmaxesghostcanvassettings.size;
		
		//debug("GETMAXESNEW - starting BottomY, initialrow to uistate.calcmaxesghostcanvassettings.size: " + initialrow + " to " + uistate.calcmaxesghostcanvassettings.size);

		//Get BottomY
		//debug("---<b>GET BOTTOM Y</b>---");
		for(var row=sr.bottomy; row<uistate.calcmaxesghostcanvassettings.size; row++){
			colreturn = checkRowLTR(row, imageData);
			if(colreturn == "clear"){
				bottommost = (row);
				break;
			}
		}
		//debug("GETMAXESNEW - end of Bottom Y: " + bottommost);
		
		//Get TopY
		//debug("---<b>GET TOP Y</b>---");
		for(var row=sr.topy; row>0; row--){
			colreturn = checkRowLTR(row, imageData);
			if(colreturn == "clear"){
				topmost = (row+1);
				break;
			}
		}
		//debug("GETMAXESNEW - end of Top Y: " + topmost);

		//Get RightX
		//debug("---<b>GET RIGHT X</b>---");
		for(var col=sr.rightx; col<uistate.calcmaxesghostcanvassettings.size; col++){
			rowreturn = checkColBTT(col, imageData);
			if(rowreturn == "clear"){
				rightmost = (col);
				break;
			}
		}
		//debug("GETMAXESNEW - end of Right X: " + rightmost);
		
		//Get LeftX
		//debug("---<b>GET Left X</b>---");
		for(var col=sr.leftx; col>0; col--){
			rowreturn = checkColBTT(col, imageData);
			if(rowreturn == "clear"){
				leftmost = (col+1);
				break;
			}
		}
		//debug("GETMAXESNEW - end of Left X: " + rightmost);
		
		var nx = {};
		nx.leftx = (leftmost - uistate.calcmaxesghostcanvassettings.originx);
		nx.rightx = (rightmost - uistate.calcmaxesghostcanvassettings.originx);
		nx.topy = (uistate.calcmaxesghostcanvassettings.originy - topmost);
		nx.bottomy = (uistate.calcmaxesghostcanvassettings.originy - bottommost);
		
		return nx;
		
	}
	
	function checkRowLTR(row, imgdata){
		for(var col=0; col<uistate.calcmaxesghostcanvassettings.size; col++){
			thispx = (row*imgdata.width*4) + (col*4) + 3;
			if(imgdata.data[thispx] > 0){
				return col;
			}
		}
		return "clear";
	}
	
	function checkColBTT(col, imgdata){
		for(var row=uistate.calcmaxesghostcanvassettings.size; row>0; row--){
			thispx = (row*imgdata.width*4) + (col*4) + 3;
			if(imgdata.data[thispx] > 0){
				return row;
			}
		}
		return "clear";
	}

	function getMaxesFromPathPoints(){
		var fs = _G.fontsettings;
		var r = {
			"topy" : (fs.upm*-1),
			"rightx" : (fs.upm*-1),
			"bottomy" : fs.upm,
			"leftx" : fs.upm
		};
		
		for(var j=0; j<this.pathpoints.length; j++){
			var pp = this.pathpoints[j];
			r.topy = Math.max(r.topy, pp.P.y);
			r.bottomy = Math.min(r.bottomy, pp.P.y);
			r.rightx = Math.max(r.rightx, pp.P.x);
			r.leftx = Math.min(r.leftx, pp.P.x);
		}
		
		//debug("GETMAXESFROMPATHPOINTS - returned top/bottom/left/right: " + r.topy + " / " + r.bottomy + " / " + r.leftx + " / " + r.rightx);
		return r;
	}	
	
	function drawCMGCorigins(ocolor){
	
		//Draw GCanvas origins
		uistate.calcmaxesghostctx.lineWidth = 1;
		uistate.calcmaxesghostctx.strokeStyle = ocolor;
		uistate.calcmaxesghostctx.beginPath();
		uistate.calcmaxesghostctx.moveTo(uistate.calcmaxesghostcanvassettings.originx,0);
		uistate.calcmaxesghostctx.lineTo(uistate.calcmaxesghostcanvassettings.originx, uistate.calcmaxesghostcanvassettings.size);
		uistate.calcmaxesghostctx.stroke();
		uistate.calcmaxesghostctx.closePath();
		uistate.calcmaxesghostctx.beginPath();
		uistate.calcmaxesghostctx.moveTo(0, uistate.calcmaxesghostcanvassettings.originy);
		uistate.calcmaxesghostctx.lineTo(uistate.calcmaxesghostcanvassettings.size, uistate.calcmaxesghostcanvassettings.originy);		
		uistate.calcmaxesghostctx.stroke();
		uistate.calcmaxesghostctx.closePath();
		
		for(var i=0; i<uistate.calcmaxesghostcanvas.width; i+=100) {
			uistate.calcmaxesghostctx.fillText((i-uistate.calcmaxesghostcanvassettings.originx),i,uistate.calcmaxesghostcanvassettings.originy+10); 
			uistate.calcmaxesghostctx.fillText((uistate.calcmaxesghostcanvassettings.originy-i),uistate.calcmaxesghostcanvassettings.originx,i);  
		}
	}

	
	