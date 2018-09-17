// start of file
/**
	Object > Path
	A Path is a collection of Path Points, plus
	a few properties like selected point, winding,
	and maxes.
	Higher level objects should only have access to
	a Shape object, not direct access to a Shape's
	Path object. This is to enable Shape objects and
	Component Instance objects to be used
	interchangeably, even though Component Instance
	objects don't have a Path.
**/

	function Path(oa){
		// debug('\n PATH - START');
		oa = oa || {};
		this.objtype = 'path';

		// declare attributes
		// this.pathpoints = false;
		this.pathpoints = [];
		if(oa.pathpoints && oa.pathpoints.length){
			//debug('NEW PATH : Hydrating Path Points, length ' + oa.pathpoints.length);
			for (var i = 0; i < oa.pathpoints.length; i++) {
				this.pathpoints[i] = new PathPoint(oa.pathpoints[i]);
				this.pathpoints[i].parentpath = this;
			}
		}

		this.winding = isval(oa.winding)? oa.winding : this.findWinding();

		// internal
		this.maxes = oa.maxes || clone(_UI.mins);

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.segments = oa.cache.segments || [];
		this.cache.segmentlengths = oa.cache.segmentlengths || [];

		// Setup the object
		if(this.pathpoints && this.calcMaxes) this.calcMaxes();

		// debug(' PATH - END\n');
	}



//  -----------------------------------
//  SIZE AND POSSITION
//  -----------------------------------

	Path.prototype.setPathSize = function(nw, nh, ratiolock){
		if(nw !== false) nw = parseFloat(nw);
		if(nh !== false) nh = parseFloat(nh);
		var dw = (nw !== false)? (nw - this.getWidth()) : 0;
		var dh = (nh !== false)? (nh - this.getHeight()) : 0;
		this.updatePathSize(dw, dh, ratiolock);
	};

	Path.prototype.updatePathSize = function(dw, dh, ratiolock){
		// debug('\n Path.updatePathSize - START');
		// debug('dw,dh,rl\t'+dw+' , '+dh+' , '+ratiolock);

		dw = parseFloat(dw) || 0;
		dh = parseFloat(dh) || 0;

		if(!dw && !dh) return;

		// Lock Aspect Ratio
		if(ratiolock){
			if(dw !== dh){
				var ratio = this.getWidth() / this.getHeight();
				if(Math.abs(dw) > Math.abs(dh)){
					dh = dw / ratio;
				} else {
					dw = dh * ratio;
				}
			}
		}

		// debug('\t dw / dh is now ' + dw + ' / ' + dh);

		var oldw = this.getWidth();
		if(oldw === 0) oldw = 1;
		var oldh = this.getHeight();
		if(oldh === 0) oldh = 1;

		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);

		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		// If ratiolocked, keep both w&h from min'ing out at 1
		if(ratiolock){
			if(neww <= 1 || newh <=1) {
				// debug('\t RETURNING: ratiolock forcing width or height to be less than 1.');
				return;
			}
		}

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x =   (((pp.P.x  - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H1.x =  (((pp.H1.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H2.x =  (((pp.H2.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.P.y =   (((pp.P.y  - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H1.y =  (((pp.H1.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H2.y =  (((pp.H2.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
		}

		if(this.checkForNaN()){
			// debug('\t NAN FOUND IN THIS PATH');
			// debug('\t this.maxes = ' + json(this.maxes));
			// debug('oldw = ' + oldw);
			// debug('oldh = ' + oldh);
			// debug('neww = ' + neww);
			// debug('newh = ' + newh);
			// debug('ratiodh = ' + ratiodh);
			// debug('ratiodw = ' + ratiodw);
		}

		this.calcMaxes();
		// debug(' Path.updatePathSize - END\n');
	};

	Path.prototype.setPathPosition = function(nx, ny, force){
		// debug('\n Path.setPathPosition - START');
		// debug('\t nx ny force:\t ' + nx + '\t ' + ny + '\t ' + force);

		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);

		var dx = (nx !== false)? ((nx*1) - this.maxes.xmin) : 0;
		var dy = (ny !== false)? ((ny*1) - this.maxes.ymax) : 0;
		// debug('\t dx dy: ' + dx + ' ' + dy);

		this.updatePathPosition(dx,dy,force);

		// debug(' Path.setPathPosition - END\n');
	};

	Path.prototype.updatePathPosition = function(dx, dy, force){
		// debug('\n Path.updatePathPosition - START');
		force = isval(force)? force : false;
		if(dx !== false) dx = parseFloat(dx) || 0;
		if(dy !== false) dy = parseFloat(dy) || 0;
		// debug('\t dx, dy, f\t'+dx+'\t'+dy+'\t'+force);

		for(var d=0; d<this.pathpoints.length; d++){
			var pp = this.pathpoints[d];
			//debug('-------------------- pathPoint #' + d);
			pp.updatePathPointPosition('P',dx,dy,force);
		}

		this.changed();
		// debug(' Path.updatePathPosition - END\n');
	};

	Path.prototype.getWinding = function() {
		if(!isval(this.winding)){
			if (this.findWinding) this.findWinding();
			else this.winding = 0;
		}
		 return this.winding;
	};

	Path.prototype.getHeight = function() {
		var h = this.maxes.ymax - this.maxes.ymin;
		return Math.max(h, 0);
	};

	Path.prototype.getWidth = function() {
		var w = this.maxes.xmax - this.maxes.xmin;
		return Math.max(w, 0);
	};

	Path.prototype.getMaxes = function() {
		// debug('\n Path.getMaxes - START');

		if(hasNonValues(this.maxes)){
			// debug('\t no cache, calcMaxes');
			this.calcMaxes();
		}

		// debug('\t returning ' + json(this.maxes, true));
		// debug(' Path.getMaxes - END\n');

		return clone(this.maxes);
	};

	Path.prototype.rotate = function(angle, about) {
		// debug('\n Path.rotate - START');
		for(var d=0; d<this.pathpoints.length; d++){
			// debug('\t starting point ' + d);
			var pp = this.pathpoints[d];
			pp.rotate(angle, about);
			// debug('\t p['+d+'].P.x ' + pp.P.x);
		}
		this.changed();
		// debug(' Path.rotate - END\n');
	};

	Path.prototype.isHere = function(px, py) {
		var gctx = _UI.ishereghostctx;

		gctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);
		gctx.fillStyle = 'rgba(0,0,255,0.2)';
		gctx.beginPath();
		this.drawPath(gctx);
		gctx.closePath();
		gctx.fill();

		var imageData = gctx.getImageData(px, py, 1, 1);
		// debug('ISHERE? alpha = ' + imageData.data[3] + '  returning: ' + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	};


//  -----------------------------------
//  METHODS
//  -----------------------------------

	Path.prototype.getNextPointNum = function(pnum) {
		pnum = parseInt(pnum) || 0;
		pnum += 1;
		pnum = pnum % this.pathpoints.length;

		return pnum;
	};

	Path.prototype.getPreviousPointNum = function(pnum) {
		pnum = parseInt(pnum) || 0;
		pnum -= 1;
		if(pnum < 0) pnum = pnum + this.pathpoints.length;

		return pnum;
	};

	Path.prototype.changed = function() {
		this.cache = {};
		this.calcMaxes();
	};


//	-----------------------------------
// 	Boolean Combine
//	-----------------------------------

	function findPathIntersections(p1, p2, onlyfirst) {
		// debug('\n findPathIntersections - START');
		var intersects = [];

		// Find overlaps at boundaries
		intersects = intersects.concat(findPathPointIntersections(p1, p2, onlyfirst));
		if(intersects[0] && onlyfirst) return intersects[0];

		intersects = intersects.concat(findPathPointBoundaryIntersections(p1, p2, onlyfirst));
		if(intersects[0] && onlyfirst) return intersects[0];

		intersects = intersects.filter(duplicates);
		// debug('\t intersections');
		// debug(intersects);

		// Maxes within boundaries
		if(!maxesOverlap(p1.getMaxes(), p2.getMaxes())) {
			// debug(' findPathIntersections - paths dont\'t overlap - END\n');
			// debug(p1.getMaxes());
			// debug(p2.getMaxes());
			return intersects;
		}

		// Continue with recursive overlap detection
		var bs, ts;
		var segoverlaps = [];
		function pushSegOverlaps(p1, p1p, p2, p2p) {
			// debug('\t pushSegOverlaps - p1p ' + p1p + ' - p2p ' + p2p);
			bs = p1.getSegment(p1p);
			ts = p2.getSegment(p2p);


			if(maxesOverlap(bs.getFastMaxes(), ts.getFastMaxes())){
				// debug('\t\t pushed!');
				// bs.drawSegmentOutline();
				// ts.drawSegmentOutline();
				segoverlaps.push({'bottom':bs, 'top':ts});
			}
		}

		// Find overlaps within a single segment -- don't care about this case
		// Find overlaps within a single path -- don't care about this case

		// Find overlaps between two paths
		for(var bpp=0; bpp < p1.pathpoints.length; bpp++){
			for(var tpp=0; tpp < p2.pathpoints.length; tpp++){
				pushSegOverlaps(p1, bpp, p2, tpp);
			}
		}

		// debug('\t segoverlaps ');
		// debug(json(segoverlaps));

		// Use overlaps to find intersections
		var re = [];
		for(var v=0; v<segoverlaps.length; v++){
			// debug('\n\t SEGOVERLAPS ' + v);
			re = findSegmentIntersections(segoverlaps[v].bottom, segoverlaps[v].top, 0);
			if(re.length > 0) {
				if(onlyfirst) return re[0];
				else intersects = intersects.concat(re);
			}
			// debug('\t intersects is now');
			// debug(intersects);
		}

		// debug('\t pre filter ' + intersects);
		intersects = intersects.filter(duplicates);

		// debug('\t returning ' + intersects);
		// debug(' findPathIntersections - END\n');
		return intersects;
	}

	function findPathPointBoundaryIntersections(p1, p2, onlyfirst) {
		re = [];

		function check(chk, against) {
			var m = against.getMaxes();
			var tpp;
			for(var pp=0; pp<chk.pathpoints.length; pp++){
				tpp = chk.pathpoints[pp];
				if(	(tpp.P.x === m.xmin) || (tpp.P.x === m.xmax) ||
					(tpp.P.y === m.ymin) || (tpp.P.y === m.ymax) ){
					if(against.isHere(sx_cx(tpp.P.x), sy_cy(tpp.P.y))){
						re.push(''+tpp.P.x+'/'+tpp.P.y);
					}
				}
			}
		}

		check(p1, p2);
		check(p2, p1);

		re = re.filter(duplicates);

		return re;
	}

	function findPathPointIntersections(p1, p2, onlyfirst) {
		// debug('\n findPathPointIntersections - START');
		var precision = 4;
		var re = [];

		for(var pp1=0; pp1<p1.pathpoints.length; pp1++){
			for(var pp2=0; pp2<p2.pathpoints.length; pp2++){
				if(coordsAreEqual(p1.pathpoints[pp1].P, p2.pathpoints[pp2].P, 0.01)){
					re.push(''+p1.pathpoints[pp1].P.x+'/'+p1.pathpoints[pp1].P.y);
				}
			}
		}

		re = re.filter(duplicates);

		// debug('\t returning ' + re);
		// debug(' findPathPointIntersections - END\n');
		return re;
	}

	Path.prototype.addPointsAtPathIntersections = function() {
		var polyseg = this.getPolySegment();

		polyseg.splitSegmentsAtIntersections();

		var newpath = polyseg.getPath();

		this.pathpoints = clone(newpath.pathpoints);
	};

	Path.prototype.containsPoint = function(c, wantsecond) {

		for(var pp=0; pp<this.pathpoints.length; pp++){
			if(coordsAreEqual(c, this.pathpoints[pp].P, 0.01)) {
				if(wantsecond) wantsecond = false;
				else return this.pathpoints[pp];
			}
		}
		return false;
	};

	function maxesOverlap(m1, m2, bx) {
		bx = bx || 'exclusive';
		var re;

		if(bx === 'inclusive') re = (m1.xmin <= m2.xmax && m1.xmax >= m2.xmin && m1.ymin <= m2.ymax && m1.ymax >= m2.ymin);
		else if (bx === 'exclusive') re = (m1.xmin < m2.xmax && m1.xmax > m2.xmin && m1.ymin < m2.ymax && m1.ymax > m2.ymin);
		// var iny = (m1.xmin < m2.xmax && m1.xmax > m2.xmin && m1.ymin <= m2.ymax && m1.ymax >= m2.ymin);
		// var inx = (m1.xmin <= m2.xmax && m1.xmax >= m2.xmin && m1.ymin < m2.ymax && m1.ymax > m2.ymin);
		// var equ = (JSON.stringify(m1)===JSON.stringify(m2));

		return re;
	}


//  -----------------------------------
//  DRAWING
//  -----------------------------------

	Path.prototype.drawPath = function(lctx, view) {
		// debug('\n Path.drawPath - START');
		// debug('\t view ' + json(view, true));

		var snap = _GP.projectsettings.renderpointssnappedtogrid;
		var currview = getView('Path.drawPath');
		view = view || clone(currview);
		setView(view);

		if(this.pathpoints === false || this.pathpoints.length < 2) return;
		var pp, np, pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy;

		if(snap) lctx.moveTo(sx_cx(round(this.pathpoints[0].P.x)), sy_cy(round(this.pathpoints[0].P.y)));
		else lctx.moveTo(sx_cx(this.pathpoints[0].P.x), sy_cy(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			pp = this.pathpoints[cp];
			// np = this.pathpoints[(cp+1) % this.pathpoints.length];
			np = this.pathpoints[this.getNextPointNum(cp)];

			if(pp.type === 'symmetric') { pp.makeSymmetric('H1'); }
			else if (pp.type === 'flat') { pp.makeFlat('H1'); }

			// this.validate('DRAW PATH');

			if(snap){
				pph2x = sx_cx(round(pp.getH2x()));
				pph2y = sy_cy(round(pp.getH2y()));
				nxh1x = sx_cx(round(np.getH1x()));
				nxh1y = sy_cy(round(np.getH1y()));
				nxppx = sx_cx(round(np.P.x));
				nxppy = sy_cy(round(np.P.y));
			} else {
				pph2x = sx_cx(pp.getH2x());
				pph2y = sy_cy(pp.getH2y());
				nxh1x = sx_cx(np.getH1x());
				nxh1y = sy_cy(np.getH1y());
				nxppx = sx_cx(np.P.x);
				nxppy = sy_cy(np.P.y);
			}

			// debug('\t curve ' + pph2x +' '+ pph2y +' '+ nxh1x +' '+ nxh1y +' '+ nxppx +' '+ nxppy);
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy);
		}

		setView(currview);
		// debug(' Path.drawPath - END\n');
	};


//  -----------------------------------
//  TRANSLATE TO OTHER LANGUAGES
//  -----------------------------------

	Path.prototype.genPathPostScript = function(lastx, lasty){
		if(!this.pathpoints) return {'re':'', 'lastx':lastx, 'lasty':lasty};

		var p1, p2, p1h2x, p1h2y, p2h1x, p2h1y, p2ppx, p2ppy;
		var trr = '';

		var re = '\t\t\t\t' + (this.pathpoints[0].P.x - lastx) + ' ' + (this.pathpoints[0].P.y - lasty) + ' rmoveto \n';

		//debug('GENPATHPOSTSCRIPT:\n\t ' + re);

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];

			p1h2x = p1.getH2x() - p1.P.x;
			p1h2y = p1.getH2y() - p1.P.y;
			p2h1x = p2.getH1x() - p1.getH2x();
			p2h1y = p2.getH1y() - p1.getH2y();
			p2ppx = p2.P.x - p2.getH1x();
			p2ppy = p2.P.y - p2.getH1y();

			trr = '\t\t\t\t' + p1h2x + ' ' + p1h2y + ' ' + p2h1x + ' ' + p2h1y + ' ' + p2ppx + ' ' + p2ppy + ' rrcurveto \n';

			//debug('\t ' + trr);

			re += trr;
		}

		return {
			're' : re,
			'lastx' : p2.P.x,
			'lasty' : p2.P.y
		};
	};

	Path.prototype.getSVGpathData = function() {
		if(this.cache.svgpathdata) return this.cache.svgpathdata;

		this.cache.svgpathdata = this.makeSVGpathData();

		return this.cache.svgpathdata;
	};

	Path.prototype.makeSVGpathData = function(glyphname) {
		glyphname = glyphname || 'not specified';
		// debug('\n Path.makeSVGpathData - START');
		// debug('\t Glyph ' + glyphname);
		// debug('\t this.pathpoints: ' + json(this.pathpoints, true));

		if(!this.pathpoints || !this.pathpoints.length) return '';

		var re = '';
		var roundvalue = _GP.projectsettings.svgprecision || 8;
		var p1, p2;
		var trr = '';

		re += 'M' + round(this.pathpoints[0].getPx(), roundvalue) + ',' + round(this.pathpoints[0].getPy(), roundvalue);
		// debug('GENPATHPOSTSCRIPT:\n\t ' + re);

		if(re.indexOf('NaN') > -1){
			console.warn(glyphname + ' PathPoint 0 MOVE has NaN: ' + re);
			// debug(this.pathpoints[0]);
		}

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];
			trr = ' C' + round(p1.getH2x(), roundvalue) + ',' + round(p1.getH2y(), roundvalue) + ',' + round(p2.getH1x(), roundvalue) + ',' + round(p2.getH1y(), roundvalue) + ',' + round(p2.getPx(), roundvalue) + ',' + round(p2.getPy(), roundvalue);
			// debug('\t ' + trr);

			if(trr.indexOf('NaN') > -1){
				console.warn(glyphname + ' PathPoint ' + cp + ' has NaN: ' + trr);
			}
			re += trr;
		}

		re += 'Z';
		// debug('\t returning: ' + re);
		// debug('Path.makeSVGpathData - END\n');
		return re;
	};

	Path.prototype.makeOpenTypeJSpath = function(otpath) {
		// debug('\n Path.makeOpenTypeJSpath - START');
		// debug('\t otpath: ' + json(otpath));

		otpath = otpath || new opentype.Path();
		var p1, p2;

		if(!this.pathpoints) {
			if(this.pathpoints.length === 0){
				// debug('\t !!!Path has zero points!');
			}

			otpath.close();
			return otpath;
		}

		otpath.moveTo(round(this.pathpoints[0].P.x), round(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];
			otpath.curveTo(
				round(p1.getH2x()),
				round(p1.getH2y()),
				round(p2.getH1x()),
				round(p2.getH1y()),
				round(p2.P.x),
				round(p2.P.y)
			);
		}

		otpath.close();

		// debug('\t returning path ' + json(otpath));
		// debug(' Path.makeOpenTypeJSpath - END\n');
		return otpath;
	};

	Path.prototype.getSegment = function(num) {
		// debug('\n Path.getSegment - START');
		// debug('\t passed ' + num);

		// make a segment
		num = num || 0;
		num = num % this.pathpoints.length;

		// check cache
		if(this.cache.segments && this.cache.segments[num]) return this.cache.segments[num];
		else this.cache.segments = [];

		// debug('\t validated as ' + num);

		var pp1 = this.pathpoints[num];
		// var pp2 = this.pathpoints[(num+1)%this.pathpoints.length];
		var pp2 = this.pathpoints[this.getNextPointNum(num)];

		var re = new Segment({
			'p1x':pp1.P.x, 'p1y':pp1.P.y,
			'p2x':pp1.getH2x(), 'p2y':pp1.getH2y(),
			'p3x':pp2.getH1x(), 'p3y':pp2.getH1y(),
			'p4x':pp2.P.x, 'p4y':pp2.P.y
		});

		this.cache.segments[num] = re;

		// debug([re, re2]);
		// debug(' Path.getSegment - END\n');
		return re;
	};

	Path.prototype.getQuickSegmentLength = function(num) {
		var re = this.getSegment(num);
		re = re.getQuickLength();

		return re;
	};

	Path.prototype.getPolySegment = function() {
		var seg = [];
		for(var pp=0; pp<this.pathpoints.length; pp++){
			seg.push(this.getSegment(pp));
		}
		return new PolySegment({segments: seg});
	};


//  -----------------------------------
//  CANVAS HELPER FUNCTIONS
//  -----------------------------------

	Path.prototype.isOverControlPoint = function(x, y, nohandles){
		var a = this.pathpoints || [];
		var re = false;

		for(var k=a.length-1; k>=0; k--){
			re = a[k].isOverControlPoint(x, y, nohandles);
			if(re) return re;
		}

		return false;
	};

	Path.prototype.isOverFirstPoint = function(x, y) {
		// debug('\n Path.isOverFirstPoint - START');
		// debug('\t Passed ' + x + '/' + y);
		var a = this.pathpoints[0];

		var hp = _GP.projectsettings.pointsize/getView('Path.isOverFirstPoint').dz;
		// debug('\t Checking ' + a.P.x + '/' + a.P.y + ' around ' + hp);

		if(!a) return false;

		if( ((a.P.x+hp) > x) && ((a.P.x-hp) < x) && ((a.P.y+hp) > y) && ((a.P.y-hp) < y) ){
			// debug(' Path.isOverFirstPoint - END - return TRUE\n');
			return true;
		}

		// debug(' Path.isOverFirstPoint - END - return FALSE\n');
		return false;
	};

	Path.prototype.findWinding = function(secondtry){
		// debug('\n Path.findWinding - START');
		var j,k,z;
		var count = -1;
		var parr = this.pathpoints;

		if (parr.length === 2){
			count = parr[1].P.x > parr[0].P.x? -1 : 1;

		} else if (parr.length > 2){
			for (var i=0; i<parr.length; i++) {
				j = (i + 1) % parr.length;
				k = (i + 2) % parr.length;
				z  = (parr[j].P.x - parr[i].P.x) * (parr[k].P.y - parr[j].P.y);
				z -= (parr[j].P.y - parr[i].P.y) * (parr[k].P.x - parr[j].P.x);

				if (z < 0) count--;
				else if (z > 0) count++;
			}
		}

		// negative = clockwise
		// positive = counterclockwise

		if(count === 0 && !secondtry){
			// debug('\t second try...');
			this.reverseWinding();
			count = this.findWinding(true) * -1;
			this.reverseWinding();
		}

		this.winding = count;

		// if(!secondtry) debug(' Path.findWinding - END returning: ' + count + '\n');

		return count;
	};

	Path.prototype.reverseWinding = function(){
		// debug('\n Path.reverseWinding - START');
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
			this.winding *= -1;
			if(this.winding === 0 || !isval(this.winding)) this.findWinding(true);
		}
		// debug(' Path.reverseWinding - END\n');
	};

	Path.prototype.flipNS = function(mid){
		var ly = this.maxes.ymax;

		mid = isval(mid)? mid : (this.getHeight()/2)+this.maxes.ymin;
		//debug('FLIPNS - calculating mid: (b-t)/2 + t = mid: ' + this.maxes.ymin +','+ this.maxes.ymax + ','+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}

		this.setPathPosition(false, ly);
		this.reverseWinding();
	};

	Path.prototype.flipEW = function(mid){
		var lx = this.maxes.xmin;

		mid = isval(mid)? mid : (this.getWidth()/2)+this.maxes.xmin;
		//debug('flipEW - calculating mid: (b-t)/2 + t = mid: ' + this.maxes.xmax +','+ this.maxes.xmin +','+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}

		this.setPathPosition(lx, false);
		this.reverseWinding();
	};

	Path.prototype.addPathPoint = function(newpp, addtostart){
		// debug('\n Path.addPathPoint - START');
		// debug('\t newpp = ' + newpp);
		var re = false;

		if(!newpp) {
			// No pathpoint passed to function - make a new one
			newpp = new PathPoint();
			newpp.parentpath = this;
			newpp.H1.x = newpp.P.x;
			newpp.H1.y = newpp.P.y-100;
			newpp.H2.x = newpp.P.x+100;
			newpp.H2.y = newpp.P.y;

			if(addtostart){
				//Adds new pathpoint to start of path
				if(this.pathpoints.length > 0){
					var firstpp = this.pathpoints[0];

					newpp.P.x = firstpp.P.x-200;
					newpp.P.y = firstpp.P.y-200;
				}

				this.pathpoints.unshift(newpp);
				re = this.selectPathPoint(0);

			} else {
				// Adds new pathpoint to end of path
				if(this.pathpoints.length > 0){
					var lastpp = this.pathpoints[this.pathpoints.length-1];

					newpp.P.x = lastpp.P.x+200;
					newpp.P.y = lastpp.P.y+200;
				}

				this.pathpoints.push(newpp);
				re = this.selectPathPoint(this.pathpoints.length-1);
			}
		} else {
			// Function was passed a new path point
			newpp.parentpath = this;
			this.pathpoints.push(newpp);
			re = this.selectPathPoint(this.pathpoints.length-1);
		}

		this.findWinding();
		// debug('\t calling calcMaxes');
		this.changed();

		// debug(' Path.addPathPoint - END - returning ' + re + '\n');
		return re;
	};

	Path.prototype.insertPathPoint = function(t, pointnum) {
		var pp1i = pointnum || 0;
		var pp1 = (pp1i === false ? this.pathpoints[0] : this.pathpoints[pp1i]);
		// var pp2i = (pp1i+1)%this.pathpoints.length;
		var pp2i = this.getNextPointNum(pp1i);
		var pp2 = this.pathpoints[pp2i];
		var nP, nH1, nH2, ppn;

		if(this.pathpoints.length > 1){
			var splits = this.getSegment(pp1i).split(t);
			var s1 = splits[0];
			var s2 = splits[1];

			// New Point
			nP = new Coord({'x':s1.p4x, 'y':s1.p4y});
			nH1 = new Coord({'x':s1.p3x, 'y':s1.p3y});
			nH2 = new Coord({'x':s2.p2x, 'y':s2.p2y});
			ppn = new PathPoint({'P':nP, 'H1':nH1, 'H2':nH2, 'type':'flat', 'useh1':true, 'useh2':true});
			ppn.round();

			// Update P1
			if(pp1.type === 'symmetric') pp1.type = 'flat';
			pp1.H2.x = s1.p2x;
			pp1.H2.y = s1.p2y;
			pp1.round();

			// Update P2
			if(pp2.type === 'symmetric') pp2.type = 'flat';
			pp2.H1.x = s2.p3x;
			pp2.H1.y = s2.p3y;
			pp2.round();

		} else {
			//just make a random point
			var d = 100;
			nP = new Coord({'x':pp1.P.x+d, 'y':pp1.P.y+d});
			nH1 = new Coord({'x':pp1.getH2x()+d, 'y':pp1.getH2y()+d});
			nH2 = new Coord({'x':pp1.getH1x()+d, 'y':pp1.getH1y()+d});
			ppn = new PathPoint({'P':nP, 'H1':nH1, 'H2':nH2, 'type':pp1.type});
		}

		// Insert
		ppn.parentpath = this;
		this.pathpoints.splice(pp2i, 0, ppn);
		// this.selectPathPoint(pp2i);

		this.changed();
		return ppn;
	};

	Path.prototype.getClosestPointOnCurve = function(coord, wantsecond) {
		var grains = 10000;
		var first = false;
		var second = false;
		var mindistance = 999999999;
		var check, d, seglen;

		for(var pp=0; pp<this.pathpoints.length; pp++){
			// grains = this.cache.segmentlengths[pp] * 100;
			grains = this.getSegment(pp).getQuickLength() * 100;

			for(var t=0; t<1; t+=(1/grains)){
				check = this.getCoordFromSplit(t, pp);
				d = Math.sqrt( ((check.x-coord.x)*(check.x-coord.x)) + ((check.y-coord.y)*(check.y-coord.y)) );
				if(d < mindistance){
					if(first && first.point !== pp) second = clone(first);
					mindistance = d;
					first = {
						'point' : pp,
						'split' : t,
						'distance' : d,
						'x' : check.x,
						'y' : check.y
					};
				}
			}
		}

		return wantsecond? second : first;
	};

	Path.prototype.getCoordFromSplit = function(t, pointnum) {
		if(this.pathpoints.length > 1){
			var seg = this.getSegment(pointnum);
			return seg.getCoordFromSplit(t);

		} else {
			return this.pathpoints[0].P;
		}
	};

	Path.prototype.selectPathPoint = function(index){
		index = parseInt(index);

		if(index === false){
			return false;
		} else {
			if(index === -1) index = this.pathpoints.length-1;
			else index = Math.abs(index);

			index = index % this.pathpoints.length;

			_UI.ms.points.select(this.pathpoints[index]);

			return this.pathpoints[index];
		}
	};



//	----------------------------------
//	Calc Maxes
//	----------------------------------

	Path.prototype.calcMaxes = function(){
		// debug('\n Path.calcMaxes - START');
		// debug('\t before ' + json(this.maxes, true));

		this.maxes = clone(_UI.mins);

		var seg, tbounds;

		for(var s=0; s<this.pathpoints.length; s++){
			// debug('\t ++++++ starting seg ' + s);

			seg = this.getSegment(s);
			tbounds = seg.getMaxes();

			// debug('\t tseg maxes ' + json(tbounds, true));
			// debug('\t this maxes ' + json(this.maxes, true));

			this.maxes = getOverallMaxes([this.maxes, tbounds]);

			// debug('\t path maxes is now ' + json(this.maxes, true));

			this.cache.segments[s] = seg;

			// debug('\t ++++++ ending seg ' + s);
		}

		this.maxes.xmax = round(this.maxes.xmax, 4);
		this.maxes.xmin = round(this.maxes.xmin, 4);
		this.maxes.ymax = round(this.maxes.ymax, 4);
		this.maxes.ymin = round(this.maxes.ymin, 4);

		// debug('\t afters ' + json(this.maxes, true));
		// debug(' Path.calcMaxes - END\n');
	};



//  -----------------------------------
//  HELPER FUNCTIONS
//  -----------------------------------

	Path.prototype.validate = function(calledby){
		var tp;
		for(var pp=0; pp<this.pathpoints.length; pp++){
			tp = this.pathpoints[pp];
			if(!tp.P.x && tp.P.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' P.x from ' + tp.P.x);
				tp.P.x = 0;
			}
			if(!tp.P.y && tp.P.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' P.y from ' + tp.P.y);
				tp.P.y = 0;
			}
			if(!tp.H1.x && tp.H1.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H1.x from ' + tp.H1.x);
				tp.H1.x = 0;
			}
			if(!tp.H1.y && tp.H1.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H1.y from ' + tp.H1.y);
				tp.H1.y = 0;
			}
			if(!tp.H2.x && tp.H2.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H2.x from ' + tp.H2.x);
				tp.H2.x = 0;
			}
			if(!tp.H2.y && tp.H2.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H2.y from ' + tp.H2.y);
				tp.H2.y = 0;
			}

			tp.roundAll();
		}
	};

	Path.prototype.checkForNaN = function() {
		for(var pp = 0; pp < this.pathpoints.length; pp++){
			var tp = this.pathpoints[pp];
			if( isNaN(tp.P.x) || isNaN(tp.P.y) ||
				isNaN(tp.H1.x) || isNaN(tp.H1.y) ||
				isNaN(tp.H2.x) || isNaN(tp.H2.y) ){
				return true;
			}
		}
		return false;
	};

// end of file