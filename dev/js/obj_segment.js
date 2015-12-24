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

		this.p1x = oa.p1x || 0;
		this.p1y = oa.p1y || 0;
		this.p2x = oa.p2x || 0;
		this.p2y = oa.p2y || 0;
		this.p3x = oa.p3x || 0;
		this.p3y = oa.p3y || 0;
		this.p4x = oa.p4x || 0;
		this.p4y = oa.p4y || 0;

		// debug(' SEGMENT - END\n');
	}



//	-----------------------------------
//	Methods
//	-----------------------------------

	Segment.prototype.drawSegment = function() {
		var x = _UI.glypheditctx;

		// draw_BoundingBox(this.getFastMaxes(), _UI.colors.green, 2);

		// x.strokeStyle = _UI.colors.green.l55;
		// x.lineWidth = 3;
		// x.moveTo(sx_cx(this.p1x), sy_cy(this.p1y));
		// x.bezierCurveTo(sx_cx(this.p2x), sy_cy(this.p2y), sx_cx(this.p3x), sy_cy(this.p3y), sx_cx(this.p4x), sy_cy(this.p4y));
		// x.stroke();

		x.strokeStyle = _UI.colors.green.l45;
		x.fillStyle = _UI.colors.green.l45;
		// draw_CircleHandle({'x':sx_cx(this.p1x), 'y':sy_cy(this.p1y)});
		// draw_CircleHandle({'x':sx_cx(this.p2x), 'y':sy_cy(this.p2y)});
		// draw_CircleHandle({'x':sx_cx(this.p3x), 'y':sy_cy(this.p3y)});
		draw_CircleHandle({'x':sx_cx(this.p4x), 'y':sy_cy(this.p4y)});
	};

	Segment.prototype.split = function(t) {
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

	Segment.prototype.getLength = function() {
		// this function is only used as an approximation
		// threshold in em units

		var threshold = 10;
		var a = Math.abs(this.p1x - this.p4x);
		var b = Math.abs(this.p1y - this.p4y);
		var d = Math.sqrt((a*a) + (b*b));

		if(d < threshold) return d;
		else {
			var s = this.split();
			return s[0].getLength() + s[1].getLength();
		}
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
		var bounds = {
			'xmin' : Math.min(this.p1x,this.p4x),
			'ymin' : Math.min(this.p1y,this.p4y),
			'xmax' : Math.max(this.p1x,this.p4x),
			'ymax' : Math.max(this.p1y,this.p4y)
		};

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
	function findAllSegmentIntersections(segarr) {
		var ix = [];

		for(var outer=0; outer<segarr.length; outer++){ 
		for(var inner=0; inner<segarr.length; inner++){
			if(inner !== outer){
				ix = ix.concat(findSegmentIntersections(segarr[outer], segarr[inner]));
			}
		}}

		ix = ix.filter(function(v,i) {
			return ix.indexOf(v) === i;
		});

		return ix;
	}

	function findSegmentIntersections(s1, s2, depth) {
		// debug('\n findSegmentIntersections - START');
		depth = depth || 0;
		// debug('\t depth ' + depth);


		// if(depth > 15) {
		// 	debug('\t fINDsEGMENTiNTERSECTIONS debug early return');
		// 	return [];
		// }
		// s1.drawSegment();
		// s2.drawSegment();


		// Check for overlapping / coincident segments
		var co = segmentsAreCoincident(s1, s2);
		if(co) return [co];

		// Check to stop recursion
		var s1m = s1.getFastMaxes();
		var s2m = s2.getFastMaxes();
		var threshold = 0.00001;
		var precision = 4;

		var s1w = (s1m.xmax - s1m.xmin);
		var s1h = (s1m.ymax - s1m.ymin);
		var s2w = (s2m.xmax - s2m.xmin);
		var s2h = (s2m.ymax - s2m.ymin);

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

				co = ''+x+'/'+y;
				// debug('\t hit bottom, found ' + co);
				return [co];
		} else {
			// debug('\t more recursion needed at ' + depth);
		}

		// More recursion needed
		var re = [];
		var s1split = s1.split();
		var s2split = s2.split();
		var pairs = [
			[s1split[0], s2split[0]],
			[s1split[0], s2split[1]],
			[s1split[1], s2split[1]],
			[s1split[1], s2split[0]],
		];

		pairs = pairs.filter(function(p) {
			return maxesOverlap(p[0].getFastMaxes(), p[1].getFastMaxes(), depth);
		});

		// debug('\t pairs after maxes overlap filter');
		// debug(pairs);

		pairs.forEach(function(p) {
			re = re.concat( findSegmentIntersections(p[0], p[1], depth+1) );
		});

		if(pairs.length === 0) return re;

		re = re.filter(function(v,i) {
			return re.indexOf(v) === i;
		});

		// if(depth === 0) alert('break');

		// debug('\t return length ' + re.length);
		// debug(' findSegmentIntersections - END\n');
		return re;
	}

	function segmentsAreCoincident(s1, s2) {
		var s1m = s1.getFastMaxes();
		var s2m = s2.getFastMaxes();
		var re;

		// Check if the two segments are overlapping horizontal or vertical lines
		// If so, just return one point from the coincident lines

		function areEqual(d1, d2, d3, d4) { return (d1===d2 && d1===d3 && d1===d4); }

		if(areEqual(s1m.xmin, s1m.xmax, s2m.xmin, s2m.xmax)){
			if(s1m.ymin < s2m.ymax && s1m.ymax > s2m.ymin){
				if(s1.p1y > s2.p1y && s1.p1y < s2.p4y){
					re = (''+s1.p1x+'/'+s1.p1y);
					debug('\t Coincident returning ' + re);
					return re;
				}
				
				if(s2.p1y > s1.p1y && s2.p1y < s1.p4y){
					re = (''+s2.p1x+'/'+s2.p1y);
					debug('\t Coincident returning ' + re);
					return re;
				}
				
			}
		}

		if(areEqual(s1m.ymin, s1m.ymax, s2m.ymin, s2m.ymax)){
			if(s1m.xmin < s2m.xmax && s1m.xmax > s2m.xmin){
				if(s1.p1x > s2.p1x && s1.p1x < s2.p4x){
					re = (''+s1.p1x+'/'+s1.p1y);
					debug('\t Coincident returning ' + re);
					return re;
				}
				
				if(s2.p1x > s1.p1x && s2.p1x < s1.p4x){
					re = (''+s2.p1x+'/'+s2.p1y);
					debug('\t Coincident returning ' + re);
					return re;
				}
				
			}
		}

		return false;
	}

// end of file