// start of file
/**
	Object > Segment
	A Segment stores and acts on a piece of a Path
	according to the mathmatical definition of a
	Bezier curve.

	Paths in Glyphr Studio are a collection of
	Path Points, which themselves contain a point
	and two handles.  Bezier curves, on the other
	hand, are represented as two points, with two
	handles between them.

	This Segment object is basically here just to
	make Bezier math easier for Paths.
**/

	function Segment(oa){
		// debug('\n SEGMENT - START');
		oa = oa || {};
		this.objtype = 'segment';

		this.p1x = numSan(oa.p1x) || 0;
		this.p1y = numSan(oa.p1y) || 0;

		this.p2x = numSan(oa.p2x) || this.p1x || 0;
		this.p2y = numSan(oa.p2y) || this.p1y || 0;

		this.p3x = numSan(oa.p3x) || 0;
		this.p3y = numSan(oa.p3y) || 0;

		this.p4x = numSan(oa.p4x) || 0;
		this.p4y = numSan(oa.p4y) || 0;

		if(!oa.p3x) this.p3x = this.p4x;
		if(!oa.p3y) this.p3y = this.p4y;

		this.line = this.isLine();

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.length = oa.cache.length || false;

		// debug(' SEGMENT - END\n');
	}



//	-----------------------------------
//	Methods
//	-----------------------------------
	Segment.prototype.changed = function() { 
		this.cache = {};
		this.line = this.isLine();
	};


//	-----------------------------------
//	Drawing
//	-----------------------------------

	Segment.prototype.drawSegmentOutline = function(color, dx, dy) {
		if(!_UI.glypheditctx) setupEditCanvas();
		var ctx = _UI.glypheditctx;
		
		ctx.strokeStyle = RGBAtoRGB((color || _UI.colors.green.l65), 0.9);
		dx = dx || 0;
		dy = dy || 0;
		var p1x = sx_cx(this.p1x + dx);
		var p1y = sy_cy(this.p1y + dy);
		var p2x = sx_cx(this.p2x + dx);
		var p2y = sy_cy(this.p2y + dy);
		var p3x = sx_cx(this.p3x + dx);
		var p3y = sy_cy(this.p3y + dy);
		var p4x = sx_cx(this.p4x + dx);
		var p4y = sy_cy(this.p4y + dy);

		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(p1x, p1y);
		ctx.bezierCurveTo(p2x, p2y, p3x, p3y, p4x, p4y);
		ctx.stroke();
		ctx.closePath();
	};

	Segment.prototype.drawSegmentPoints = function(color, txt) {
		if(!_UI.glypheditctx) setupEditCanvas();		
		var ctx = _UI.glypheditctx;
		
		txt = isval(txt)? txt : '•';
		var p1x = sx_cx(this.p1x);
		var p1y = sy_cy(this.p1y);
		var p2x = sx_cx(this.p2x);
		var p2y = sy_cy(this.p2y);
		var p3x = sx_cx(this.p3x);
		var p3y = sy_cy(this.p3y);
		var p4x = sx_cx(this.p4x);
		var p4y = sy_cy(this.p4y);

		color = RGBAtoRGB((color || _UI.colors.green.l65), 0.4);
		
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.font = '48px sans-serif';

		ctx.fillText(txt, p1x, p1y);
		// ctx.fillText(txt, p2x, p2y);
		// ctx.fillText(txt, p3x, p3y);
		// ctx.fillText(txt, p4x, p4y);

		ctx.fillRect(p1x, p1y, 5, 5);
		ctx.strokeRect(p2x, p2y, 5, 5);
		ctx.strokeRect(p3x, p3y, 5, 5);
		ctx.fillRect(p4x, p4y, 5, 5);

		// else draw_CircleHandle({'x':sx_cx(this.p4x), 'y':sy_cy(this.p4y)});
	};



//	-----------------------------------
//	Splitting
//	-----------------------------------
	Segment.prototype.split = function(sp) {

		sp = sp || 0.5;

		if(typeof sp === 'object' && isval(sp.x) && isval(sp.y)){
			return this.splitAtCoord(sp);

		} else if (!isNaN(sp)) {
			return this.splitAtTime(sp);

		}

		return false;
	};

	Segment.prototype.splitAtCoord = function(co) {
		// debug('\n Segment.splitAtCoord - START');
		// debug('\t splitting at ' + json(co, true));

		if(this.containsTerminalPoint(co, 0.1)) return false;

		if(this.line && this.line !== 'diagonal'){
			var newx, newy;
			var online = false;

			if(this.line === 'horizontal'){
				if(round(co.y, 2) === round(this.p1y, 2)){
					if((co.x > Math.min(this.p1x, this.p4x)) && (co.x < Math.max(this.p1x, this.p4x))){
						newx = co.x;
						newy = this.p1y;
						online = true;
					}
				}

			} else if (this.line === 'vertical'){
				if(round(co.x, 2) === round(this.p1x, 2)){
					if((co.y > Math.min(this.p1y, this.p4y)) && (co.y < Math.max(this.p1y, this.p4y))){
						newx = this.p1x;
						newy = co.y;
						online = true;
					}
				}
			}

			if(!online){
				// debug('\t not on the line');
				// debug(' Segment.splitAtCoord - END\n');
				return false;
			}

			// debug('\t returning simple line split');
			// debug(' Segment.splitAtCoord - END\n');
			return [
				new Segment({
					'p1x' : this.p1x,
					'p1y' : this.p1y,
					'p4x' : newx,
					'p4y' : newy
				}),
				new Segment({
					'p1x' : newx,
					'p1y' : newy,
					'p4x' : this.p4x,
					'p4y' : this.p4y
				})
			];

		} else if (this.pointIsWithinMaxes(co)){
			var threshold = 0.1;

			var sp = this.getSplitFromCoord(co, threshold);

			// debug('\t distance is ' + sp.distance);

			if(sp && sp.distance < threshold){
			// debug('\t splitting at ' + sp.split);
				// if(this.line === 'diagonal'){
				// 	// debug('\t splitting diagonal');
				// 	var re = this.splitAtTime(sp.split);
				// 	re[0] = re[0].convertToLine();
				// 	re[1] = re[1].convertToLine();
				// 	return re;
				// } else {
					return this.splitAtTime(sp.split);
				// }

			}
		}

		// debug(' Segment.splitAtCoord - returning false - END\n');
		return false;
	};

	Segment.prototype.splitAtTime = function(t) {
		// debug('\n Segment.splitAtTime - START');
		var fs = t || 0.5;
		var rs = (1-fs);

		// Do some math
		var x12 = (this.p1x * rs) + (this.p2x * fs);
		var y12 = (this.p1y * rs) + (this.p2y * fs);

		var x23 = (this.p2x * rs) + (this.p3x * fs);
		var y23 = (this.p2y * rs) + (this.p3y * fs);

		var x34 = (this.p3x * rs) + (this.p4x * fs);
		var y34 = (this.p3y * rs) + (this.p4y * fs);

		var x123 = (x12 * rs) + (x23 * fs);
		var y123 = (y12 * rs) + (y23 * fs);

		var x234 = (x23 * rs) + (x34 * fs);
		var y234 = (y23 * rs) + (y34 * fs);

		var x1234 = (x123 * rs) + (x234 * fs);
		var y1234 = (y123 * rs) + (y234 * fs);

		// Return two new Segments
		return [
			new Segment({
				'p1x' : this.p1x,
				'p1y' : this.p1y,
				'p2x' : x12,
				'p2y' : y12,
				'p3x' : x123,
				'p3y' : y123,
				'p4x' : x1234,
				'p4y' : y1234
			}),
			new Segment({
				'p1x' : x1234,
				'p1y' : y1234,
				'p2x' : x234,
				'p2y' : y234,
				'p3x' : x34,
				'p3y' : y34,
				'p4x' : this.p4x,
				'p4y' : this.p4y
			})
		];
	};

	Segment.prototype.splitSegmentAtProvidedCoords = function(coords, threshold) {
		// debug('\n Segment.splitSegmentAtProvidedCoords - START');

		var segs = [new Segment(clone(this, 'Segment.splitSegmentAtProvidedCoords'))];
		var tr;

		for(var x=0; x<coords.length; x++){
			for(var s=0; s<segs.length; s++){
				if(!segs[s].containsTerminalPoint(coords[x], threshold)){
					tr = segs[s].splitAtCoord(coords[x]);
					if(tr){
						segs.splice(s, 1, tr[0], tr[1]);
						// s++;
						// break;
					}					
				}
			}
		}

		// debug('\t split into ' + segs.length);
		// debug(' Segment.splitSegmentAtProvidedCoords - END\n');

		return segs;
	};

	Segment.prototype.pointIsWithinMaxes = function(co) {
		var m = this.getMaxes();

		var re = (co.x <= m.xmax &&
			co.x >= m.xmin &&
			co.y <= m.ymax &&
			co.y >= m.ymin );

		return re;
	};

	Segment.prototype.convertToLine = function() {
		return new Segment({p1x: this.p1x, p1y: this.p1y, p4x: this.p4x, p4y: this.p4y});
	};


//	-----------------------------------
//	Getters
//	-----------------------------------
	Segment.prototype.getSplitFromCoord = function(coord, threshold) {
		var grains = this.getQuickLength() * 1000;
		var mindistance = 999999999;
		var re = false;
		var check, d;

		for(var t=0; t<1; t+=(1/grains)){
			check = this.getCoordFromSplit(t);
			d = Math.sqrt( ((check.x-coord.x)*(check.x-coord.x)) + ((check.y-coord.y)*(check.y-coord.y)) );
			if(d < mindistance){
				mindistance = d;
				re = {
					'split' : t,
					'distance' : d,
					'x' : check.x,
					'y' : check.y
				};

				if(threshold && re.distance < threshold) return re;
			}
		}

		return re;
	};

	Segment.prototype.getLength = function() {
		// this function is only used as an approximation
		// threshold in em units

		if(this.cache && this.cache.length) return this.cache.length;

		var re;
		var threshold = 10;
		var a = Math.abs(this.p1x - this.p4x);
		var b = Math.abs(this.p1y - this.p4y);
		var c = Math.sqrt((a*a) + (b*b));

		if(this.line || c < threshold) {
			this.cache.length = c;
			return c;

		} else {
			var s = this.split();
			re = s[0].getLength() + s[1].getLength();
			this.cache.length = re;
			return re;
		}
	};

	Segment.prototype.getQuickLength = function() {
		var a = Math.abs(this.p1x - this.p4x);
		var b = Math.abs(this.p1y - this.p4y);
		var c = Math.sqrt((a*a) + (b*b));

		return c;
	};

	Segment.prototype.getCoordFromSplit = function(t) {
		t = t || 0.5;
		var rs = (1-t);

		// Do some math
		var x12 = (this.p1x * rs) + (this.p2x * t);
		var y12 = (this.p1y * rs) + (this.p2y * t);

		var x23 = (this.p2x * rs) + (this.p3x * t);
		var y23 = (this.p2y * rs) + (this.p3y * t);

		var x34 = (this.p3x * rs) + (this.p4x * t);
		var y34 = (this.p3y * rs) + (this.p4y * t);

		var x123 = (x12 * rs) + (x23 * t);
		var y123 = (y12 * rs) + (y23 * t);

		var x234 = (x23 * rs) + (x34 * t);
		var y234 = (y23 * rs) + (y34 * t);

		var x1234 = (x123 * rs) + (x234 * t);
		var y1234 = (y123 * rs) + (y234 * t);

		return {'x':x1234, 'y':y1234};
	};

	Segment.prototype.getReverse = function() {
		return new Segment({
			'p1x': this.p4x,
			'p1y': this.p4y,
			'p2x': this.p3x,
			'p2y': this.p3y,
			'p3x': this.p2x,
			'p3y': this.p2y,
			'p4x': this.p1x,
			'p4y': this.p1y
		});
	};

	Segment.prototype.getCoord = function(pt) {
		if(pt === 1) return {x:this.p1x, y:this.p1y};
		else if(pt === 2) return {x:this.p2x, y:this.p2y};
		else if(pt === 3) return {x:this.p3x, y:this.p3y};
		else if(pt === 4) return {x:this.p4x, y:this.p4y};
	};



//	-----------------------------------
//	Bounds
//	-----------------------------------

	Segment.prototype.getFastMaxes = function() {
		var bounds = {
			'xmin' : Math.min(this.p1x, Math.min(this.p2x, Math.min(this.p3x, this.p4x))),
			'ymin' : Math.min(this.p1y, Math.min(this.p2y, Math.min(this.p3y, this.p4y))),
			'xmax' : Math.max(this.p1x, Math.max(this.p2x, Math.max(this.p3x, this.p4x))),
			'ymax' : Math.max(this.p1y, Math.max(this.p2y, Math.max(this.p3y, this.p4y)))
		};

		return bounds;
	};

	Segment.prototype.getMaxes = function() {
		// debug('\n Segment.getMaxes - START');
		// debug(this);

		var bounds = {
			'xmin' : Math.min(this.p1x, this.p4x),
			'ymin' : Math.min(this.p1y, this.p4y),
			'xmax' : Math.max(this.p1x, this.p4x),
			'ymax' : Math.max(this.p1y, this.p4y)
		};

		if(this.line){
			// debug([bounds]);
			// debug(' Segment.getMaxes - returning fastmaxes for line - END\n');
			return bounds;
		}

		var d1x = this.p2x - this.p1x;
		var d1y = this.p2y - this.p1y;
		var d2x = this.p3x - this.p2x;
		var d2y = this.p3y - this.p2y;
		var d3x = this.p4x - this.p3x;
		var d3y = this.p4y - this.p3y;

		var numerator, denominator, quadroot, root, t1, t2;

		if(this.p2x<bounds.xmin || this.p2x>bounds.xmax || this.p3x<bounds.xmin || this.p3x>bounds.xmax) {
			// X bounds
			if(d1x+d3x !== 2*d2x) { d2x+=0.01; }
			numerator = 2*(d1x - d2x);
			denominator = 2*(d1x - 2*d2x + d3x);
			quadroot = (2*d2x-2*d1x)*(2*d2x-2*d1x) - 2*d1x*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkXbounds(bounds, getBezierValue(t1, this.p1x, this.p2x, this.p3x, this.p4x)); }
			if(0<t2 && t2<1) { checkXbounds(bounds, getBezierValue(t2, this.p1x, this.p2x, this.p3x, this.p4x)); }
		}

		// Y bounds
		if(this.p2y<bounds.ymin || this.p2y>bounds.ymax || this.p3y<bounds.ymin || this.p3y>bounds.ymax) {
			if(d1y+d3y !== 2*d2y) { d2y+=0.01; }
			numerator = 2*(d1y - d2y);
			denominator = 2*(d1y - 2*d2y + d3y);
			quadroot = (2*d2y-2*d1y)*(2*d2y-2*d1y) - 2*d1y*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkYbounds(bounds, getBezierValue(t1, this.p1y, this.p2y, this.p3y, this.p4y)); }
			if(0<t2 && t2<1) { checkYbounds(bounds, getBezierValue(t2, this.p1y, this.p2y, this.p3y, this.p4y)); }
		}

		// debug([this.getFastMaxes(), bounds]);
		// debug(' Segment.getMaxes - END\n');
		return bounds;
	};

	function checkXbounds(bounds, value) {
		if(bounds.xmin > value) { bounds.xmin = value; }
		else if(bounds.xmax < value) { bounds.xmax = value; }
	}

	function checkYbounds(bounds, value) {
		if(bounds.ymin > value) { bounds.ymin = value; }
		else if(bounds.ymax < value) { bounds.ymax = value; }
	}

	function getBezierValue(t, p0, p1, p2, p3) {
		var mt = (1-t);
		return (mt*mt*mt*p0) + (3*mt*mt*t*p1) + (3*mt*t*t*p2) + (t*t*t*p3);
	}



//	-----------------------------------
//	Curve Intersections
//	-----------------------------------

	function findSegmentIntersections(s1, s2, depth) {
		// debug('\n findSegmentIntersections - START');
		depth = depth || 0;
		// debug('\t depth ' + depth);


		// if(depth > 15) {
			// debug('\t fINDsEGMENTiNTERSECTIONS debug early return');
		// 	return [];
		// }
		// s1.drawSegmentOutline();
		// s2.drawSegmentOutline();


		// Check for overlapping / coincident segments
		if(depth === 0){
			var co = findOverlappingLineSegmentIntersections(s1, s2);
			if(co.length){
				// debug('\t found overlapping line ' + co[0]);
			 	return co;
			}
		}

		// If both segments are lines, check for intersection
		if(depth === 0){
			var cr = findCrossingLineSegmentIntersections(s1, s2);
			if(cr.length){
				// debug('\t found cross line ' + cr[0]);
				return cr;
			}
		}

		// Edge case, find end points overlapping the other segment
		var endpoints = [];
		if(depth===0 && (s1.line || s2.line)){
			// findEndPointSegmentIntersections is a perf hit
			// only run if either s1 or s2 is a line segment
			endpoints = findEndPointSegmentIntersections(s1, s2);
		}

		// Check to stop recursion
		var s1m = s1.getFastMaxes();
		var s2m = s2.getFastMaxes();

		if(!maxesOverlap(s1m, s2m)){
			// debug('\t segments have non overlapping fastmaxes');
			return [];
		}
		// debug('\t segments fastmaxes overlap');
		// debug([s1m]);
		// debug([s2m]);

		// Complex segment intersections
		var threshold = 0.00005;
		var precision = 3;

		var s1w = (s1m.xmax - s1m.xmin);
		var s1h = (s1m.ymax - s1m.ymin);
		var s2w = (s2m.xmax - s2m.xmin);
		var s2h = (s2m.ymax - s2m.ymin);
		// debug('\t s1 w/h: ' + s1w + ' / ' + s1h);
		// debug('\t s2 w/h: ' + s2w + ' / ' + s2h);

		if( (s1w < threshold) &&
			(s1h < threshold) &&
			(s2w < threshold) &&
			(s2h < threshold) ){
				s1w *= 0.5;
				s1h *= 0.5;
				s2w *= 0.5;
				s2h *= 0.5;
				var x = ((s1m.xmin + s1w) + (s2m.xmin + s2w)) / 2;
				var y = ((s1m.ymin + s1h) + (s2m.ymin + s2h)) / 2;

				x = round(x, precision);
				y = round(y, precision);

				var ix = ''+x+'/'+y;
				// debug('\t <<<<<<<<<<<<<<<<< hit bottom, found ' + ix);
				return [ix];
		} else {
			// debug('\t not below threshold at ' + depth);
		}

		// More recursion needed
		var re = [];
		var s1split = s1.splitAtTime(0.5);
		var s2split = s2.splitAtTime(0.5);
		var pairs = [
			[s1split[0], s2split[0]],
			[s1split[0], s2split[1]],
			[s1split[1], s2split[1]],
			[s1split[1], s2split[0]],
		];

		pairs = pairs.filter(function(p) {
			return maxesOverlap(p[0].getFastMaxes(), p[1].getFastMaxes(), 'inclusive');
		});

		// debug('\t ' + pairs.length + ' pairs after maxes overlap filter');
		// debug(pairs);

		pairs.forEach(function(p) {
			re = re.concat( findSegmentIntersections(p[0], p[1], depth+1) );
		});

		re = re.concat(endpoints);
		re = re.filter(duplicates);

		// if(depth === 0) alert('break');

		// debug('\t return length ' + re.length);
		// debug(' findSegmentIntersections - END\n');
		return re;
	}

	function findOverlappingLineSegmentIntersections(s1, s2) {

		// Check if the two segments are overlapping horizontal or vertical lines
		// If so, just return one point from the coincident lines
		var re = [];

		if(s1.containsPointOnLine(s2.getCoord(1))) re.push(''+s2.p1x+'/'+s2.p1y);
		if(s1.containsPointOnLine(s2.getCoord(4))) re.push(''+s2.p4x+'/'+s2.p4y);

		if(s2.containsPointOnLine(s1.getCoord(1))) re.push(''+s1.p1x+'/'+s1.p1y);
		if(s2.containsPointOnLine(s1.getCoord(4))) re.push(''+s1.p4x+'/'+s1.p4y);

		if(re.length){
			// debug('\n findOverlappingLineSegmentIntersections - START');
			// debug([s1, s2]);
			// debug(json(re));
			// debug(' findOverlappingLineSegmentIntersections - END\n');
		}

		return re;
	}

	function findCrossingLineSegmentIntersections(s1, s2) {
		// debug('\n findCrossingLineSegmentIntersections - START');
		if(!s1.line || !s2.line) return [];

		var d1x = s1.p4x - s1.p1x;
		var d1y = s1.p4y - s1.p1y;
		var d2x = s2.p4x - s2.p1x;
		var d2y = s2.p4y - s2.p1y;

		var s = ((-1*d1y) * (s1.p1x - s2.p1x) + d1x * (s1.p1y - s2.p1y)) / ((-1*d2x) * d1y + d1x * d2y);
		var t = ( d2x * (s1.p1y - s2.p1y) - d2y * (s1.p1x - s2.p1x)) / ((-1*d2x) * d1y + d1x * d2y);

		if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
			var rx = numSan(s1.p1x + (t * d1x));
			var ry = numSan(s1.p1y + (t * d1y));

			// debug('\t found ' + rx + ', ' + ry);
			if(s1.containsTerminalPoint({x:rx, y:ry}) && s2.containsTerminalPoint({x:rx, y:ry})){
				// debug('\t its an end point');
				// debug(' findCrossingLineSegmentIntersections - END\n');
				return [];
			}


			var re = [(''+rx+'/'+ry)];
			// debug(' findCrossingLineSegmentIntersections - END\n');
			return re;
		}

		// debug(' findCrossingLineSegmentIntersections - END\n');
		return [];
	}

	function findEndPointSegmentIntersections(s1, s2) {
		// debug('\n findEndPointSegmentIntersections - START');
		var s1s = s1.getCoord(1);
		var s1e = s1.getCoord(4);
		var s2s = s2.getCoord(1);
		var s2e = s2.getCoord(4);

		var re = [];

		if(s1.containsPointOnCurve(s2s)) re.push(coordToIx(s2s));
		if(s1.containsPointOnCurve(s2e)) re.push(coordToIx(s2e));
		if(s2.containsPointOnCurve(s1s)) re.push(coordToIx(s1s));
		if(s2.containsPointOnCurve(s1e)) re.push(coordToIx(s1e));

		// debug('\t returning ' + re);
		// debug(' findEndPointSegmentIntersections - END\n');
		return re;
	}

	function ixToCoord(ix) {
		// debug('\n ixToCoord - START');
		// debug(ix);
		var re = {
			x: parseFloat(ix.split('/')[0]),
			y: parseFloat(ix.split('/')[1])
		};
		// debug([re]);
		// debug(' ixToCoord - END\n');
		return re;
	}

	function coordToIx(co) {
		return (''+co.x+'/'+co.y);
	}



//	-----------------------------------
//	Curve Checking
//	-----------------------------------

	Segment.prototype.isRedundantTo = function(s) {
		// A segment is  Redundant redundant to another segment if
		// it is completely overlapped by the other segment

		if(!this.line) return false;

		return (s.containsPointOnLine(this.getCoord(1)) && s.containsPointOnLine(this.getCoord(4)));
	};

	function segmentsAreEqual(s1, s2, threshold) {
		// debug('\n segmentsAreEqual - START');
		threshold = threshold || 1;
		// debug([s1, s2]);

		if( coordsAreEqual(s1.getCoord(1), s2.getCoord(1), threshold) &&
			coordsAreEqual(s1.getCoord(4), s2.getCoord(4), threshold) ){

			if(s1.line && s2.line){
				// debug(' segmentsAreEqual - returning LINE true - END\n');
				return true;

			} else if ( coordsAreEqual(s1.getCoord(2), s2.getCoord(2), threshold) &&
						coordsAreEqual(s1.getCoord(3), s2.getCoord(3), threshold) ) {
				// debug(' segmentsAreEqual - returning FULLY true - END\n');
				return true;
			}
		}

		// debug(' segmentsAreEqual - returning false - END\n');
		return false;
	}

	Segment.prototype.containsTerminalPoint = function(pt, threshold) {
		threshold = threshold || 1;
		if(this.containsStartPoint(pt, threshold)) return 'start';
		else if(this.containsEndPoint(pt, threshold)) return 'end';
		else return false;
	};

	Segment.prototype.containsStartPoint = function(pt, threshold) {
		threshold = threshold || 1;
		return coordsAreEqual(this.getCoord(1), pt, threshold);
	};

	Segment.prototype.containsEndPoint = function(pt, threshold) {
		threshold = threshold || 1;
		return coordsAreEqual(this.getCoord(4), pt, threshold);
	};

	Segment.prototype.containsPointOnCurve = function(pt, threshold) {
		if(this.containsTerminalPoint(pt, threshold)) return true;

		if(this.line) return this.containsPointOnLine(pt);

		threshold = isval(threshold)? threshold : 0.1;
		var t = this.getSplitFromCoord(pt, threshold);

		if(t && t.distance < threshold) return true;
		else return false;
	};

	Segment.prototype.containsPointOnLine = function(pt) {
		// debug('\n Segment.containsPointOnLine - START');
		// debug('\t checking ' + pt.x + ' \t' + pt.y);

		if(!this.line){
			// debug('\t this is not a line, returning false');
			return false;
		}

		if(this.containsTerminalPoint(pt)){
			// debug('\t this segment contains the point as an end point, returning false');
			return false;
		}

		function within(l, m, r){ return ((l <= m) && (m <= r)) || ((r <= m) && (m <= l)); }

		if( within(this.p1x, pt.x, this.p4x) &&
			within(this.p1y, pt.y, this.p4y) &&
			pointsAreCollinear(this.getCoord(1), this.getCoord(4), pt) ){
			// debug('\t returning true');
			return true;
		}

		// debug('\t fallthrough returning false');
		return false;
	};

	function pointsAreCollinear(a, b, c, precision){
		precision = isval(precision)? precision : 3;

		var s1 =  (b.x - a.x) * (c.y - a.y);
		var s2 =  (c.x - a.x) * (b.y - a.y);

		return round(s1, precision) === round(s2, precision);
	}

	Segment.prototype.preceeds = function(s2, threshold) {
		threshold = threshold || 1;
		return (coordsAreEqual(this.getCoord(4)), s2.getCoord(1), threshold);
	};

	Segment.prototype.isLine = function(precision) {
		precision = isval(precision)? precision : 1;

		var rex = ( round(this.p1x, precision) === round(this.p2x, precision) &&
					round(this.p1x, precision) === round(this.p3x, precision) &&
					round(this.p1x, precision) === round(this.p4x, precision) );
		if(rex) return 'vertical';


		var rey = ( round(this.p1y, precision) === round(this.p2y, precision) &&
					round(this.p1y, precision) === round(this.p3y, precision) &&
					round(this.p1y, precision) === round(this.p4y, precision) );
		if(rey) return 'horizontal';


		var red = ( pointsAreCollinear(this.getCoord(1), this.getCoord(4), this.getCoord(2)) &&
					pointsAreCollinear(this.getCoord(1), this.getCoord(4), this.getCoord(3)) );
		if(red) return 'diagonal';

		return false;
	};

	Segment.prototype.toString = function(precision) {
		precision = isval(precision)? precision : 1;
		re = '';

		re += round(this.p1x, precision) + '\t' + round(this.p1y, precision) + '\n';
		// re += round(this.p2x, precision) + '\t' + round(this.p2y, precision) + '\n';
		// re += round(this.p3x, precision) + '\t' + round(this.p3y, precision) + '\n';
		re += round(this.p4x, precision) + '\t' + round(this.p4y, precision) + '\n';

		return re;
	};

	Segment.prototype.round = function(precision) {
		precision = isval(precision)? precision : 3;

		this.p1x = round(this.p1x, precision);
		this.p1y = round(this.p1y, precision);
		this.p2x = round(this.p2x, precision);
		this.p2y = round(this.p2y, precision);
		this.p3x = round(this.p3x, precision);
		this.p3y = round(this.p3y, precision);
		this.p4x = round(this.p4x, precision);
		this.p4y = round(this.p4y, precision);
	};

// end of file