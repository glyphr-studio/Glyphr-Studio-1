
//  -----------------------------------
//  PATH OBJECT
//  -----------------------------------

	function Path(oa){
		this.objtype = "path";

		//debug("NEW PATH: oa = \n" + JSON.stringify(oa));

		// declare attributes
		this.pathpoints = false;
		if(oa.pathpoints && oa.pathpoints.length){
			this.pathpoints = [];
			//debug("NEW PATH : Hydrating Path Points, length " + oa.pathpoints.length);
			for (var i = 0; i < oa.pathpoints.length; i++) {
				this.pathpoints[i] = new PathPoint(oa.pathpoints[i]);
			}
		}
		this.winding = isval(oa.winding)? oa.winding : this.findWinding();
		// internal
		this.maxes = oa.maxes || clone(_UI.mins);

		// Setup the object
		this.selectPathPoint(false);
		if(this.pathpoints) this.calcMaxes();

		//debug("Path() - created new path: " + this.pathpoints);

		if(_UI.pathdebugging){
			debug("\nX PATH RESULT");
			debug(this);
			debug(json(this));
		}
	}




//  -----------------------------------
//  PATH METHODS
//  -----------------------------------

	// SIZE
	Path.prototype.setPathSize = function(nw, nh, ratiolock){
		var dw = nw? (nw - (this.maxes.xmax - this.maxes.xmin)) : 0;
		var dh = nh? (nh - (this.maxes.ymax - this.maxes.ymin)) : 0;
		this.updatePathSize(dw, dh, ratiolock);
	};

	Path.prototype.updatePathSize = function(dw, dh, ratiolock){
		//debug("UPDATEPATHSIZE - dw,dh,rl\t"+dw+" , "+dh+" , "+ratiolock);

		var s = ss("updatePathSize");
		dw = s.wlock? 0 : dw;
		dh = s.hlock? 0 : dh;

		if(s.wlock && s.hlock) return;

		if(!s.wlock && !s.hlock && ratiolock){
			dw = dh = getRatioLockValue(dw, dh);
		}

		var oldw = this.maxes.xmax - this.maxes.xmin;
		var oldh = this.maxes.ymax - this.maxes.ymin;
		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);


		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x =   (((pp.P.x  - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H1.x =  (((pp.H1.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H2.x =  (((pp.H2.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.P.y =   (((pp.P.y  - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H1.y =  (((pp.H1.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H2.y =  (((pp.H2.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
		}

		this.calcMaxes();
	};

	function getRatioLockValue(v1,v2){
		var re = 0;
		if (Math.abs(v1) === Math.abs(v2)) re = (v1 > v2)? v1 : v2;
		else re = (Math.abs(v1) > Math.abs(v2))? v1 : v2;
		//debug("GETRATIOLOCKVALUE " + v1 + " || " + v2 + " = " + re);
		return re;
	}

	// POSITION
	Path.prototype.setPathPosition = function(nx, ny, force){
		//debug("SETPATHPOSITION - nx/ny/force:\t " + nx + "\t " + ny + "\t " + force);
		//debug("SETPATHPOSITION - this.maxes.ymax: " + this.maxes.ymax);
		var dx = nx? ((nx*1) - this.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - this.maxes.ymax) : 0;
		//debug("SETPATHPOSITION - dx/dy: " + dx + " " + dy);
		this.updatePathPosition(dx,dy,force);
	};

	Path.prototype.updatePathPosition = function(dx, dy, force){
		force = isval(force)? force : false;
		//debug("UPDATEPATHPOSITION - dx,dy,f\t"+dx+" , "+dy+" , "+force);

		for(var d=0; d<this.pathpoints.length; d++){
			var pp = this.pathpoints[d];
			//debug("-------------------- pathPoint #" + d);
			pp.updatePathPointPosition("P",dx,dy,force);
		}

		this.calcMaxes();
	};


	// Selected Point - returns the selected point object
	Path.prototype.sp = function(wantindex, calledby){
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
	};

	Path.prototype.drawPath = function(lctx) {
		//if(lctx == _UI.chareditctx)	debug("DRAWPATH");

		if(this.pathpoints === false || this.pathpoints.length < 2) return;
		var pp, np, pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy;

		lctx.moveTo(sx_cx(this.pathpoints[0].P.x), sy_cy(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			pp = this.pathpoints[cp];
			np = this.pathpoints[(cp+1) % this.pathpoints.length];

			/*
			if(lctx == _UI.chareditctx)	{
				debug("  point " + cp);
				debug("\n  pp\n" + JSON.stringify(pp));
				debug("  np\n" + JSON.stringify(np));
			}
			*/
			this.validate("DRAW PATH");

			if(pp.type == "symmetric") { pp.makeSymmetric("H1"); }
			else if (pp.type == "flat") { pp.makeFlat("H1"); }

			this.validate("DRAW PATH");

			pph2x = sx_cx(pp.getH2x());
			pph2y = sy_cy(pp.getH2y());
			nxh1x = sx_cx(np.getH1x());
			nxh1y = sy_cy(np.getH1y());
			nxppx = sx_cx(np.P.x);
			nxppy = sy_cy(np.P.y);

			//if(lctx == _UI.chareditctx)	debug("  curve " + pph2x +" "+ pph2y +" "+ nxh1x +" "+ nxh1y +" "+ nxppx +" "+ nxppy);
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy);
		}
	};


	Path.prototype.validate = function(calledby){
		var tp;
		for(var pp=0; pp<this.pathpoints.length; pp++){
			tp = this.pathpoints[pp];
			if(!tp.P.x && tp.P.x !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" P.x from " + tp.P.x);
				tp.P.x = 0;
			}
			if(!tp.P.y && tp.P.y !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" P.y from " + tp.P.y);
				tp.P.y = 0;
			}
			if(!tp.H1.x && tp.H1.x !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" H1.x from " + tp.H1.x);
				tp.H1.x = 0;
			}
			if(!tp.H1.y && tp.H1.y !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" H1.y from " + tp.H1.y);
				tp.H1.y = 0;
			}
			if(!tp.H2.x && tp.H2.x !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" H2.x from " + tp.H2.x);
				tp.H2.x = 0;
			}
			if(!tp.H2.y && tp.H2.y !== 0){
				//debug("VALIDATE PATH: "+calledby+" - resetting point "+pp+" H2.y from " + tp.H2.y);
				tp.H2.y = 0;
			}

			tp.roundAll();
		}
	};

	Path.prototype.drawPathToArea = function(lctx, view){
		var tempv = clone(getView("Path.drawPathToArea"));
		setView(view);
		this.drawPath(lctx);

		setView(tempv);
	};

	Path.prototype.genPathPostScript = function(lastx, lasty){
		if(!this.pathpoints) return {"re":"", "lastx":lastx, "lasty":lasty};

		var p1, p2, p1h2x, p1h2y, p2h1x, p2h1y, p2ppx, p2ppy;
		var trr = "";

		var re = "\t\t\t\t" + (this.pathpoints[0].P.x - lastx) + " " + (this.pathpoints[0].P.y - lasty) + " rmoveto \n";

		//debug("GENPATHPOSTSCRIPT:\n\t " + re);

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			p2 = this.pathpoints[(cp+1) % this.pathpoints.length];

			p1h2x = p1.getH2x() - p1.P.x;
			p1h2y = p1.getH2y() - p1.P.y;
			p2h1x = p2.getH1x() - p1.getH2x();
			p2h1y = p2.getH1y() - p1.getH2y();
			p2ppx = p2.P.x - p2.getH1x();
			p2ppy = p2.P.y - p2.getH1y();

			trr = "\t\t\t\t" + p1h2x + " " + p1h2y + " " + p2h1x + " " + p2h1y + " " + p2ppx + " " + p2ppy + " rrcurveto \n";

			//debug("\t " + trr);

			re += trr;
		}

		return {
			"re" : re,
			"lastx" : p2.P.x,
			"lasty" : p2.P.y
			};
	};

	Path.prototype.isOverControlPoint = function(x, y){
		var a = this.pathpoints;
		var hp = _GP.projectsettings.pointsize/getView("Path.isOverControlPoint").dz;

		for(var k=a.length-1; k>=0; k--){
			if( ((a[k].P.x+hp) > x) && ((a[k].P.x-hp) < x) && ((a[k].P.y+hp) > y) && ((a[k].P.y-hp) < y) ){
				this.selectPathPoint(k);
				//debug("ISOVERCONTROLPOINT() - Returning P1, selectedpoint: " + k);
				return 'P';
			}

			if(a[k].useh1){
				if( ((a[k].H1.x+hp) > x) && ((a[k].H1.x-hp) < x) && ((a[k].H1.y+hp) > y) && ((a[k].H1.y-hp) < y) ){
					this.selectPathPoint(k);
					//debug("ISOVERCONTROLPOINT() - Returning H1, selectedpoint: " + k);
					return 'H1';
				}
			}

			if(a[k].useh2){
				if( ((a[k].H2.x+hp) > x) && ((a[k].H2.x-hp) < x) && ((a[k].H2.y+hp) > y) && ((a[k].H2.y-hp) < y) ){
					this.selectPathPoint(k);
					//debug("ISOVERCONTROLPOINT() - Returning H2, selectedpoint: " + k);
					return 'H2';
				}
			}
		}

		this.selectPathPoint(0);
		//debug("ISOVERCONTROLPOINT() - Returning FALSE");
		return false;
	};

	Path.prototype.findWinding = function(){
		//debug("findWinding");
		var j,k,z;
		var count = 0;
		var parr = this.pathpoints;

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

		//debug("findWinding returning " + count);
		return count;
	};

	Path.prototype.reversePath = function(){
		var HT,pp;
		if(this.pathpoints){
			for (var i = 0; i < this.pathpoints.length; i++) {
				pp = this.pathpoints[i];
				HT = pp.H1;
				pp.H1 = pp.H2;
				pp.H2 = HT;
				if(pp.useh1 !== pp.useh2){
					pp.useh1 = !pp.useh1;
					pp.useh2 = !pp.useh2;
				}
			}
			this.pathpoints.reverse();
			this.findWinding();
		}
	};

	Path.prototype.flipNS = function(mid){
		var ly = this.maxes.ymax;

		if(!mid) mid = ((this.maxes.ymax - this.maxes.ymin)/2)+this.maxes.ymin;
		//debug("FLIPNS - calculating mid: (b-t)/2 + t = mid: " + this.maxes.ymin +","+ this.maxes.ymax + ","+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}

		this.setPathPosition(false, ly);
		this.reversePath();
	};

	Path.prototype.flipEW = function(mid){
		var lx = this.maxes.xmin;

		if(!mid) mid = ((this.maxes.xmax - this.maxes.xmin)/2)+this.maxes.xmin;
		//debug("flipEW - calculating mid: (b-t)/2 + t = mid: " + this.maxes.xmax +","+ this.maxes.xmin +","+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}

		this.setPathPosition(lx, false);
		this.reversePath();
	};

	Path.prototype.addPathPoint = function(newpp, addtostart){
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

		this.calcMaxes();
	};

	Path.prototype.insertPathPoint = function() {
		// http://antigrain.com/research/adaptive_bezier/index.html

		var pp1i = this.sp(true, "insert path point");
		var pp1 = (pp1i === false ? this.pathpoints[0] : this.pathpoints[pp1i]);
		var pp2i = (pp1i+1)%this.pathpoints.length;
		var pp2 = this.pathpoints[pp2i];
		var nP, nH1, nH2, ppn;

		if(this.pathpoints.length > 1){
			// Do some math
			var x12 = (pp1.P.x + pp1.getH2x()) / 2;
			var y12 = (pp1.P.y + pp1.getH2y()) / 2;
			var x23 = (pp1.getH2x() + pp2.getH1x()) / 2;
			var y23 = (pp1.getH2y() + pp2.getH1y()) / 2;
			var x34 = (pp2.getH1x() + pp2.P.x) / 2;
			var y34 = (pp2.getH1y() + pp2.P.y) / 2;
			var x123 = (x12 + x23) / 2;
			var y123 = (y12 + y23) / 2;
			var x234 = (x23 + x34) / 2;
			var y234 = (y23 + y34) / 2;
			var x1234 = (x123 + x234) / 2;
			var y1234 = (y123 + y234) / 2;

			// New Point
			nP = new Coord({"x":x1234, "y":y1234});
			nH1 = new Coord({"x":x123, "y":y123});
			nH2 = new Coord({"x":x234, "y":y234});
			ppn = new PathPoint({"P":nP, "H1":nH1, "H2":nH2, "type":"flat"});

			// Update P1
			if(pp1.type === "symmetric") pp1.type = "flat";
			pp1.H2.x = x12;
			pp1.H2.y = y12;

			// Update P2
			if(pp2.type === "symmetric") pp2.type = "flat";
			pp2.H1.x = x34;
			pp2.H1.y = y34;
		} else {
			//just make a random point
			var d = 100;
			nP = new Coord({"x":pp1.P.x+d, "y":pp1.P.y+d});
			nH1 = new Coord({"x":pp1.getH2x()+d, "y":pp1.getH2y()+d});
			nH2 = new Coord({"x":pp1.getH1x()+d, "y":pp1.getH1y()+d});
			ppn = new PathPoint({"P":nP, "H1":nH1, "H2":nH2, "type":pp1.type});
		}

		// Insert
		this.pathpoints.splice(pp2i, 0, ppn);
		this.selectPathPoint(pp2i);

		this.calcMaxes();
	};

	Path.prototype.deletePathPoint = function(){
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
			this.calcMaxes();
		} else {
			_UI.selectedtool = "pathedit";
			deleteShape();
		}
	};

	Path.prototype.selectPathPoint = function(index){
		// FOR NOW, ONLY ONE POINT SELECTED
		//debug("SELECTPATHPOINT - passed " + index + " length " + this.pathpoints.length + " mod " +(index%this.pathpoints.length));
		for(var j=0; j<this.pathpoints.length; j++){
			this.pathpoints[j].selected = false;
		}

		if(index === false){
			return;
		} else {
			index = (index == -1)? (this.pathpoints.length-1) : Math.abs(index);
			this.pathpoints[index%this.pathpoints.length].selected = true;
			//debug("SELECTPATHPOINT - selecting point " + index%this.pathpoints.length));
		}
	};

//	----------------------------------
//	Calc Maxes Stuff
//	----------------------------------

	Path.prototype.calcMaxes = function(){
		//console.time("CalcMaxes_NEW");

		this.maxes.ymax = (_UI.chareditcanvassize*-1);
		this.maxes.ymin = _UI.chareditcanvassize;
		this.maxes.xmin = _UI.chareditcanvassize;
		this.maxes.xmax = (_UI.chareditcanvassize*-1);

		var pp1, pp2, tbounds;

		for(var s=0; s<this.pathpoints.length; s++){
			pp1 = this.pathpoints[s];
			pp2 = this.pathpoints[(s+1)%this.pathpoints.length];

			tbounds = getBounds(pp1.P.x, pp1.P.y, pp1.getH2x(), pp1.getH2y(), pp2.getH1x(), pp2.getH1y(), pp2.P.x, pp2.P.y);

			this.maxes.xmax = Math.max(this.maxes.xmax, tbounds.maxx);
			this.maxes.ymax = Math.max(this.maxes.ymax, tbounds.maxy);
			this.maxes.xmin = Math.min(this.maxes.xmin, tbounds.minx);
			this.maxes.ymin = Math.min(this.maxes.ymin, tbounds.miny);
		}

		updateCurrentCharWidth();
		//console.timeEnd("CalcMaxes_NEW");
	};

	function getBounds(x1, y1, cx1, cy1, cx2, cy2, x2, y2){
		var bounds = {
			"minx" : Math.min(x1,x2),
			"miny" : Math.min(y1,y2),
			"maxx" : Math.max(x1,x2),
			"maxy" : Math.max(y1,y2)
		};

		var dcx0 = cx1 - x1;
		var dcy0 = cy1 - y1;
		var dcx1 = cx2 - cx1;
		var dcy1 = cy2 - cy1;
		var dcx2 = x2 - cx2;
		var dcy2 = y2 - cy2;

		var numerator, denominator, quadroot, root, t1, t2;

		if(cx1<bounds.minx || cx1>bounds.maxx || cx2<bounds.minx || cx2>bounds.maxx) {
			// X bounds
			if(dcx0+dcx2 != 2*dcx1) { dcx1+=0.01; }
			numerator = 2*(dcx0 - dcx1);
			denominator = 2*(dcx0 - 2*dcx1 + dcx2);
			quadroot = (2*dcx1-2*dcx0)*(2*dcx1-2*dcx0) - 2*dcx0*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkXbounds(bounds, getBezierValue(t1, x1, cx1, cx2, x2)); }
			if(0<t2 && t2<1) { checkXbounds(bounds, getBezierValue(t2, x1, cx1, cx2, x2)); }
		}

		// Y bounds
		if(cy1<bounds.miny || cy1>bounds.maxy || cy2<bounds.miny || cy2>bounds.maxy) {
			if(dcy0+dcy2 != 2*dcy1) { dcy1+=0.01; }
			numerator = 2*(dcy0 - dcy1);
			denominator = 2*(dcy0 - 2*dcy1 + dcy2);
			quadroot = (2*dcy1-2*dcy0)*(2*dcy1-2*dcy0) - 2*dcy0*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkYbounds(bounds, getBezierValue(t1, y1, cy1, cy2, y2)); }
			if(0<t2 && t2<1) { checkYbounds(bounds, getBezierValue(t2, y1, cy1, cy2, y2)); }
		}

		return bounds;
	}

	function checkXbounds(bounds, value) {
		if(bounds.minx > value) { bounds.minx = value; }
		else if(bounds.maxx < value) { bounds.maxx = value; }
	}

	function checkYbounds(bounds, value) {
		if(bounds.miny > value) { bounds.miny = value; }
		else if(bounds.maxy < value) { bounds.maxy = value; }
	}

	function getBezierValue(t, p0, p1, p2, p3) {
		var mt = (1-t);
		return (mt*mt*mt*p0) + (3*mt*mt*t*p1) + (3*mt*t*t*p2) + (t*t*t*p3);
	}
