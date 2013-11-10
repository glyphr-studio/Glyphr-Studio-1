		
//  -----------------------------------
//  PATH OBJECT
//  -----------------------------------

	// -- path object that holds many pathPoints
	function path(points, ic){
		// declare attributes
		this.pathpoints = points;	// can be false
		this.isclosed = (ic? ic : false);
		
		// Not settable internal 
		this.topy = -1;	
		this.bottomy = -1;
		this.leftx = -1;
		this.rightx = -1;
		this.haschanged = true;
		
		// declare public functions
		this.addPathPoint = addPathPoint;
		this.deletePathPoint = deletePathPoint;
		this.selectPathPoint = selectPathPoint;
		this.drawPath = drawPath;
		this.drawPathToArea = drawPathToArea;
		this.genPathPostScript = genPathPostScript
		this.updatePathPosition = updatePathPosition;
		this.updatePathSize = updatePathSize;
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
		
		//debug("PATH() - created new path: " + this.pathpoints);
	}
	
	// Selected Point - returns the selected point object
	function sp(wantindex, calledby){
		//debug("SP - Called By : " + calledby);
		
		if(!this.pathpoints) return false;
		
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
		var z = cec.zoom;
		
		// Check to see if this is a Ghost Canvas draw
		var tempzp = new Object();
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
		
		lctx.beginPath();
		
		for(var tp=0; tp<this.pathpoints.length; tp++){ drawPathToPoint(lctx, this.pathpoints, tp, this.isclosed); }
		if(this.isclosed) lctx.closePath();
		
		lctx.fill();

		cec.originx = tempzp.x;
		cec.originy = tempzp.y;
		cec.zoom = tempzp.z;
	}
	
	function drawPathToArea(lctx, size, offsetX, offsetY){
		var tempx = cec.originx;
		var tempy = cec.originy;
		var tempz = cec.zoom;
		
		cec.originx = offsetX;
		cec.originy = offsetY;
		cec.zoom = size;	
		
		this.drawPath(lctx);
		
		cec.originx = tempx;
		cec.originy = tempy;
		cec.zoom = tempz;	
	}
	
	function genPathPostScript(){
		var ws = "            ";
		var re = "";
		
		//debug("GENPATHPOSTSCRIPT");

		//re += (ws + "newpath \n");
		
		for(var tp=0; tp<this.pathpoints.length; tp++){ 
			
			var pp = this.pathpoints[tp];				
			var next = false;
			if(this.pathpoints[tp+1]){
				next = this.pathpoints[tp+1];
			} else if (this.isclosed){
				next = this.pathpoints[0];
			}
			
			if(tp==0){ 
				//lctx.moveTo(pp.P.x, pp.P.y));
				//re += (ws + pp.P.x + " " + pp.P.y + " moveto \n");
			}

			if (next) {
			/*
				var pph2x = (pp.useh2? pp.H2.x : pp.P.x);
				var pph2y = (pp.useh2? pp.H2.y : pp.P.y);
				var nxh1x = (next.useh1? next.H1.x : next.P.x);
				var nxh1y = (next.useh1? next.H1.y : next.P.y);
				var nxppx = next.P.x;
				var nxppy = next.P.y;

				//lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy); 
				
				re += (ws + pph2x + " " + pph2y + " " + nxh1x + " " + nxh1y + " " + nxppx + " " + nxppy + " rcurveto \n");
			*/
				re += (ws + "100 100 100 200 200 200 rcurveto \n");
			}
			
		}
		
		//if(this.isclosed) re += (ws + "closepath \n");		
		//re += (ws + "fill \n\n");
		
		//debug("GENPATHPOSTSCRIPT - returning:<br><pre>" + re + "</pre>");
		return re;
	}
	
	function isOverControlPoint(x, y){
		var a = this.pathpoints;
		var hp = cec.pointsize/2/cec.zoom;
		
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
		var fs = GlyphrProject.settings;
		
		var s = ss("updatePathPosition");
		s.wlock? dw = 0 : false;
		s.hlock? dh = 0 : false;
		
		if(s.wlock && s.hlock) return;
		
		cmgctx.clearRect(0,0,calcmaxesghostcanvas.width,calcmaxesghostcanvas.height);
		cmgctx.lineWidth = 1;
		cmgctx.fillStyle = "lime";
		cmgctx.strokeStyle = "lime";
		
		//Setup temp zoom/pan for cmgc
		var tempzp = new Object();
		tempzp.x = cec.originx;
		tempzp.y = cec.originy;
		tempzp.z = cec.zoom;
		cec.zoom = 1;			
		cec.originx = fs.upm;
		cec.originy = fs.upm*2;
			
		this.drawPath(cmgctx);
		//debug("UPDATEPATHSIZE - Just finished drawing to CMGC");
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());
		drawCMGCorigins("lime");
				
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
		
		cec.originx = tempzp.x;
		cec.originy = tempzp.y;
		cec.zoom = tempzp.z;
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
	
	function flipns(){
		var ly = this.topy;
		var lx = this.leftx;
		cmgctx.clearRect(0,0,calcmaxesghostcanvas.width,calcmaxesghostcanvas.height);
		this.drawPath(cmgctx);
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());

		var mid = ((r.topy - r.bottomy)/2)+r.bottomy;
		//debug("FLIPNS - calculating mid: (b-t)/2 + t = mid: " + r.bottomy +","+ r.topy + ","+ mid);
		
		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}
		
		this.haschanged = true;
		this.setTopY(ly);
		this.setLeftX(lx);
	}
	
	function flipew(){
		var ly = this.topy;
		var lx = this.leftx;
		cmgctx.lineWidth = ss().strokeweight;
		cmgctx.clearRect(0,0,calcmaxesghostcanvas.width,calcmaxesghostcanvas.height);
		this.drawPath(cmgctx);
		var r = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());

		var mid = ((r.rightx - r.leftx)/2)+r.leftx;
		//debug("FLIPEW - calculating mid: (b-t)/2 + t = mid: " + r.rightx +","+ r.leftx +","+ mid);
		
		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}
		
		this.haschanged = true;
		this.setTopY(ly);
		this.setLeftX(lx);
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
			newpp = new pathPoint(); 
			
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
			selectedtool = "pathedit";
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
		if(this.haschanged){
			debug("!!!!!!!!!!!!!!!!!!!CALCMAXES!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			debug("!!!----------------before ty/by/lx/rx: " + this.topy + "/" + this.bottomy + "/" + this.leftx + "/" + this.rightx);
			//debug("!!!CALCMAXES - cgc. size/ox/oy: " + cgc.size + " / " + cgc.originx + " / " + cgc.originy);
			
			this.topy = (cgc.size*-1);
			this.bottomy = cgc.size;
			this.leftx = cgc.size;
			this.rightx = (cgc.size*-1);

			cmgctx.clearRect(0,0,cgc.size,cgc.size);
			this.drawPath(cmgctx);
			
			var mp = getMaxesFromGhostCanvas(this.getMaxesFromPathPoints());
			drawCMGCorigins("lime");
			
			
			this.topy = mp.topy;
			this.bottomy = mp.bottomy;
			this.leftx = mp.leftx;
			this.rightx = mp.rightx;
			
			debug("!!!----------------afters ty/by/lx/rx: " + this.topy + "/" + this.bottomy + "/" + this.leftx + "/" + this.rightx);	
		}
		
		this.haschanged = false;
		
	}

	function getMaxesFromGhostCanvas(sr){
		//Convert Saved to calcmaxesghostcanvas dimensions
		sr.topy = Math.ceil(cgc.size - (sr.topy+(cgc.size-cgc.originy)));
		sr.bottomy = Math.floor(cgc.size - (sr.bottomy+(cgc.size-cgc.originy)));
		sr.leftx = Math.ceil(cgc.originx + sr.leftx);
		sr.rightx = Math.floor(cgc.originx + sr.rightx);
		//debug("GETMAXESFROMGHOSTCANVAS - Converted ty/by/lx/rx: " + sr.topy + "/" + sr.bottomy + "/" + sr.leftx + "/" + sr.rightx);	
		
		var initialrow = sr.topy;
		
		var leftmost = cgc.size;
		var rightmost = 0;
		var topmost = cgc.size;
		var bottommost = 0;
		
		var imageData = cmgctx.getImageData(0,0,calcmaxesghostcanvas.width,calcmaxesghostcanvas.height);
		var colreturn = cgc.size;
		
		//debug("GETMAXESNEW - starting BottomY, initialrow to cgc.size: " + initialrow + " to " + cgc.size);

		//Get BottomY
		//debug("---<b>GET BOTTOM Y</b>---");
		for(var row=sr.bottomy; row<cgc.size; row++){
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
		for(var col=sr.rightx; col<cgc.size; col++){
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
		
		var nx = new Object();
		nx.leftx = (leftmost - cgc.originx);
		nx.rightx = (rightmost - cgc.originx);
		nx.topy = (cgc.originy - topmost);
		nx.bottomy = (cgc.originy - bottommost);
		
		return nx;
		
	}
	
	function checkRowLTR(row, imgdata){
		for(var col=0; col<cgc.size; col++){
			thispx = (row*imgdata.width*4) + (col*4) + 3;
			if(imgdata.data[thispx] > 0){
				return col;
			}
		}
		return "clear";
	}
	
	function checkColBTT(col, imgdata){
		for(var row=cgc.size; row>0; row--){
			thispx = (row*imgdata.width*4) + (col*4) + 3;
			if(imgdata.data[thispx] > 0){
				return row;
			}
		}
		return "clear";
	}

	function getMaxesFromPathPoints(){
		var fs = GlyphrProject.settings;
		var r = new Object();
		r.topy = (fs.upm*-1);
		r.rightx = (fs.upm*-1);
		r.bottomy = fs.upm;
		r.leftx = fs.upm;
		
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
		cmgctx.lineWidth = 1;
		cmgctx.strokeStyle = ocolor;
		cmgctx.beginPath();
		cmgctx.moveTo(cgc.originx,0);
		cmgctx.lineTo(cgc.originx, cgc.size);
		cmgctx.stroke();
		cmgctx.closePath();
		cmgctx.beginPath();
		cmgctx.moveTo(0, cgc.originy);
		cmgctx.lineTo(cgc.size, cgc.originy);		
		cmgctx.stroke();
		cmgctx.closePath();
		
		for(var i=0; i<calcmaxesghostcanvas.width; i+=100) {
			cmgctx.fillText((i-cgc.originx),i,cgc.originy+10); 
			cmgctx.fillText((cgc.originy-i),cgc.originx,i);  
		}
	}

	
	