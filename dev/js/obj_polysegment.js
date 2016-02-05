// start of file
/**
	Object > Poly Segment
	A Poly Segment (aka poly bezier) stores a
	series of Segments that	represent a Path.

	Paths in Glyphr Studio are a collection of
	Path Points, which themselves contain a point
	and two handles.  Bezier curves, on the other
	hand, are represented as two points, with two
	handles between them.

	This PolySegment object is basically here just
	to make Bezier math easier for Paths.
**/

	function PolySegment(oa){
		// debug('\n SEGMENT - START');
		oa = oa || {};
		this.objtype = 'polysegment';

		this.segments = [];
		oa.segments = oa.segments || [];
		
		for(var i=0; i<oa.segments.length; i++){
			this.segments[i] = new Segment(oa.segments[i]);
		}

		// debug(' SEGMENT - END\n');
	}



//	-----------------------------------
//	Methods
//	-----------------------------------
	PolySegment.prototype.drawPolySegmentOutline = function(dx, dy) {
		var c;
		for(var s=0; s<this.segments.length; s++){
			c = makeRandomSaturatedColor();
			this.segments[s].drawSegmentOutline(c, dx, dy);
		}
	};

	PolySegment.prototype.drawPolySegmentPoints = function() {
		this.segments.forEach(function(v, i) {
			v.drawSegmentPoints(false, i);
		});
	};

	PolySegment.prototype.slowlyDrawSegments = function() {
		// debug('\n PolySegment.slowlyDrawSegments - START');
		// debug(this.segments);

		currseg = 0;

		function ds() {
			if(currseg < this.segments.length){
				this.segments[currseg].drawSegmentOutline();
				this.segments[currseg].drawSegmentPoints('red', currseg);
				currseg++;
				setTimeout(ds, 600);
			} else {
				// debug(' PolySegment.slowlyDrawSegments - END\n');
			}
		}

		setTimeout(ds, 500);
	};

	PolySegment.prototype.getPath = function() {
		// debug('\n PolySegment.getPath - START');
		// debug(this.segments);

		var pp = [];

		pp.push(makePathPointFromSegments(this.segments[this.segments.length-1], this.segments[0]));
		var ns;
		for(var s=0; s<this.segments.length-1; s++){
			ns = this.segments[s+1];
			pp.push(makePathPointFromSegments(this.segments[s], ns));
		}

		// debug(pp);
		// debug(' PolySegment.getPath - END\n');
		
		return new Path({pathpoints: pp});
	};

	PolySegment.prototype.containsSegment = function(seg) {
		for(var s=0; s<this.segments.length; s++){
			if(segmentsAreEqual(this.segments[s], seg)) return true;
		}

		return false;
	};

	PolySegment.prototype.round = function(precision) {
		precision = isval(precision)? precision : 3;

		for(var s=0; s<this.segments.length; s++){
			this.segments[s].round(precision);
		}
	};

	PolySegment.prototype.splitSegment = function(seg, t) {
		// debug('\n PolySegment.splitSegment - START');
		// if(typeof t === 'number') debug('\t ' + t);
		// else debug('\t' + json(t, true));

		var ns;

		for(var s=0; s<this.segments.length; s++){

			if(this.segments.length > 100){
				// console.warn('\t Breaking, over 100');
				return;
			}

			if(segmentsAreEqual(seg, this.segments[s])){
				ns = this.segments[s].split(t);
				// debug('\t adding at pos ' + s);
				// debug(ns);
				// debug(this.segments);
				this.segments.splice(s, 1, ns[0], ns[1]);
				s++;
				// debug(this.segments);
			}
		}

		// debug(' PolySegment.splitSegment - END\n');
	};



//	-----------------------------------
//	Intersections
//	-----------------------------------
	PolySegment.prototype.findIntersections = function() {
		// debug('\n PolySegment.findIntersections - START');
		// debug('\t ' + this.segments.length + ' segments');

		var s1, s2;
		var ix = [];

		for(var i=0; i<this.segments.length; i++){
			for(var j=i; j<this.segments.length; j++){
				if(j !== i){
					s1 = clone(this.segments[i]);
					s2 = clone(this.segments[j]);

					ix = ix.concat(findSegmentIntersections(s1, s2));
				}
			}
		}
		// debug(ix);
		ix = ix.filter(duplicates);

		// debug('\t found ' + ix.length + ' ix');
		// debug(ix);
		// debug(' PolySegment.findIntersections - END\n');
		return ix;
	};

	PolySegment.prototype.drawIntersections = function(color) {
		// debug('\n PolySegment.drawIntersections - START');
		var ix = this.findIntersections();
		var co;
		var x = _UI.glypheditctx;

		x.fillStyle = "rgb(200,50,60)";
		x.globalAlpha = 1;

		ix.forEach(function(v, i){
			ix[i] = ixToCoord(v);
			co = ix[i];
			x.fillRect(sx_cx(co.x), sy_cy(co.y), 5, 5);
		});

		// debug(ix);
		// debug(' PolySegment.drawIntersections - END\n');
	};

	PolySegment.prototype.splitSegmentsAtProvidedIntersections = function(ixarr) {
		// debug('\n PolySegment.splitSegmentsAtProvidedIntersections - START');
		// debug('\t before length ' + this.segments.length);
		// debug(this.segments);

		ixarr.forEach(function(v, i) {
			ixarr[i] = ixToCoord(v);
		});

		// debug(ixarr);

		var result = [];

		for(var s=0; s<this.segments.length; s++){
			result = result.concat(this.segments[s].splitSegmentAtProvidedCoords(ixarr));
		}

		this.segments = result;

		// debug('\t afters length ' + this.segments.length);
		// debug(' PolySegment.splitSegmentsAtProvidedIntersections - END\n');
	};


	PolySegment.prototype.stitchSegmentsTogether = function() {
		debug('\n PolySegment.stitchSegmentsTogether - START');

		var source = new PolySegment(clone(this)).segments;
		var sorted = [];
		var result = [];

		function getNextSegment(co) {
			var ts, re;

			for(var s=0; s<source.length; s++){
				ts = source[s];
				if(ts.objtype === 'segment'){
					if(ts.containsStartPoint(co)){
						re = new Segment(clone(ts));
						ts.objtype = '-' + result.length + '.' + sorted.length;
						return re;
					}
				}
			}

			// if not, try all the segments reversed
			for(var r=0; r<source.length; r++){
				ts = source[r].getReverse();
				if(source[r].objtype === 'segment'){
					if(ts.containsStartPoint(co)){
						re = new Segment(clone(ts));
						source[r].objtype = 'R' + result.length + '.' + sorted.length;
						return re;
					}
				}
			}

			return false;
		}

		function getNextUnusedSegmentP1() {
			
			for(var s=0; s<source.length; s++){
				if(source[s].objtype === 'segment'){
					return source[s].getCoord(1);
				}
			}
		}

		// Start ordering
		var reseg;
		var nextcoord = getNextUnusedSegmentP1();
		// debug('\t starting loop');
		// debug([nextcoord]);
		// debug('\t source.length ' + source.length);

		for(var i=0; i<source.length; i++){
			reseg = getNextSegment(nextcoord);

			if(reseg){
				sorted.push(reseg);
				nextcoord = reseg.getCoord(4);
				debug('\t LOOP ' + i + ' added a segment, sorted total is ' + sorted.length);

			} else {
				debug('\t LOOP ' + i + ' NO NEXT SEGMENT FOUND');
				if(sorted.length){
					result.push(new PolySegment({segments:sorted}));

					if(sorted[sorted.length-1].containsEndPoint(sorted[0].getCoord(1))){
						debug('\t\t Pushed sorted polyseg, connected nicely');
					} else {
						// debug('\t\t Pushed sorted polyseg, OPEN LOOP');
					}

					sorted = [];
					nextcoord = getNextUnusedSegmentP1();
				}
			}
		}

		// Fencepost
		if(sorted.length){
			debug('\t FINISHING');
			result.push(new PolySegment({segments:sorted}));

			if(sorted[sorted.length-1].containsEndPoint(sorted[0].getCoord(1))){
				debug('\t\t Pushed sorted polyseg, connected nicely');
			} else {
				debug('\t\t Pushed sorted polyseg, OPEN LOOP');
			}
		}

		debug('\t SOURCE');
		debug(source);

		result.forEach(function(v, i) {
			debug('\n\t RETURNING ' + i);
			debug(v.segments);
		});

		debug(' PolySegment.stitchSegmentsTogether - END\n');

		return result;
	};

	PolySegment.prototype.stitchSegmentsTogether1 = function() {
		// debug('\n PolySegment.stitchSegmentsTogether - START');
		// debug('\t STARTING');
		// debug(this.segments);
		// this.drawPolySegmentOutline();
		// alert('Starting stitchSegmentsTogether');

		var source = this.segments;
		var destination = [clone(source[0])];
		var results = [];

		var nextseg = clone(source[0]);
		var count = 0;
		var lastseglength = source.length;
		var firstseglength = source.length;

		function addNextSegment(seg) {
			var prec = 0.1;
			var ts, re;
			// debug('\n\t CHECKING ');
			// debug([seg]);
			// debug('\t AGAINST');
			// debug(source);

			// first check all the segments in original flow order
			for(var s=0; s<source.length; s++){
				ts = source[s];
				// debug('\t checking p4/ts: ' + round(seg.p4x, prec)+', '+round(seg.p4y, prec)+' : \t'+round(ts.p1x, prec)+', '+round(ts.p1y, prec));

				if(seg.preceeds(ts, prec)){
					re = new Segment(clone(ts));
					destination.push(re);
					source.splice(s, 1);

					// debug('\t Next Segment should start ' + ts.p4x + ', ' + ts.p4y);
					// debug('\t SEGMENT ' + s + ' FOUND and added to destination');

					return re;
				}
			}

			// if not, try all the segments reversed
			for(var r=0; r<source.length; r++){
				ts = source[r].getReverse();

				if(seg.preceeds(ts, prec)){
					re = new Segment(clone(ts));
					destination.push(re);
					source.splice(r, 1);

					// debug('\t Next Segment should start ' + ts.p4x + ', ' + ts.p4y);
					// debug('\t REVERSE SEGMENT ' + r + ' FOUND and added to destination');

					return re;
				}
			}

			// debug('\t !!!! NO SEGMENT FOUND !!!');
			return false;
		}

		// Main stitching loop
		source.splice(0, 1);
		var nps;

		while(nextseg && count < firstseglength){
			// debug('\n\n>>>>>>>>>>>>>>\n SEGMENT LOOP ' + count);
			// debug('\t ' + source.length + ' source');
			// debug('\t ' + destination.length + ' destination');
			// debug('\t ' + results.length + ' results');

			nextseg = addNextSegment(nextseg);

			if(nextseg === false || source.length === 0){
				// debug('\t NEXTSEG FALSE, PUSHING NEW POLYSEG');
				nps = new PolySegment({segments: destination});
				results.push(nps);
				// debug(nps.segments);
				destination = [];
			}

			if(nextseg === false && source.length) {
				// debug('\t MORE SEGMENTS, kicking off new nextseg');
				destination = [new Segment(clone(source[0]))];
				nextseg = new Segment(clone(source[0]));
				source.splice(0, 1);

			} else if(source.length === lastseglength){
				// debug('\t NO CHANGE - BREAKING - source.length ' + source.length);
				break;

			} else if(source.length === 0){
				// debug('\t NO MORE SEGMENTS - BREAKING');
				break;
			}

			lastseglength = source.length;
			count++;

		}

		if(destination.length > 1){
			// debug('\t Pushing final destination to newpolyseg');
			results.push(new PolySegment({segments: destination}));
		}


		// debug(' PolySegment.stitchSegmentsTogether - END\n');
		return results;
	};


//	-----------------------------------
//	Segment Filtering
//	-----------------------------------

	PolySegment.prototype.removeZeroLengthSegments = function() {
		// debug('\n PolySegment.removeZeroLengthSegments - START');
		var len = this.segments.length;
		var prec = 1;
		var s;

		for(var t=0; t<this.segments.length; t++){
			s = this.segments[t];
			// debug('\t Segment ' + t);
			// debug('\t checking x: ' + round(s.p1x, prec)+' '+round(s.p2x, prec)+' '+round(s.p3x, prec)+' '+round(s.p4x, prec));
			// debug('\t checking y: '	+ round(s.p1y, prec)+' '+round(s.p2y, prec)+' '+round(s.p3y, prec)+' '+round(s.p4y, prec));

			if( round(s.p1x, prec) === round(s.p2x, prec) &&
				round(s.p1x, prec) === round(s.p3x, prec) &&
				round(s.p1x, prec) === round(s.p4x, prec) &&
				round(s.p1y, prec) === round(s.p2y, prec) &&
				round(s.p1y, prec) === round(s.p3y, prec) &&
				round(s.p1y, prec) === round(s.p4y, prec) ){
				// debug('\t HIT');
				s.objtype = 'ZERO';
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){ return v.objtype === 'segment'; });
		// debug(' PolySegment.removeZeroLengthSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeRedundantSegments = function() {
		// debug('\n PolySegment.removeRedundantSegments - START');
		var len = this.segments.length;

		for(var s=0; s<this.segments.length; s++){
		for(var t=0; t<this.segments.length; t++){
			if(s !== t && this.segments[s] && this.segments[t]){
				if(this.segments[s].isRedundantTo(this.segments[t])){
					this.segments[s] = 'REDUNDANT';
				}
			}
		}}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){ return v.objtype === 'segment'; });
		// debug(' PolySegment.removeRedundantSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeDuplicateSegments = function() {
		// debug('\n PolySegment.removeDuplicateSegments - START');
		var len = this.segments.length;

		for(var x=0; x<this.segments.length; x++){
		for(var y=x; y<this.segments.length; y++){
			if(x !== y && this.segments[x] && this.segments[y]){
				if(segmentsAreEqual(this.segments[x], this.segments[y])) this.segments[y].objtype = 'DUPE';
				if(segmentsAreEqual(this.segments[x], this.segments[y].getReverse())) this.segments[y].objtype = 'REVERSE';
			}
		}}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});
		// debug(' PolySegment.removeDuplicateSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeSegmentsOverlappingShape = function(shape) {
		// debug('\n PolySegment.removeSegmentsOverlappingShape - START');
		var len = this.segments.length;

		// debug('\t segments starting as ' + this.segments.length);
		// debug(this.segments);

		var pt = 3;
		var tx, ty;

		function testForHit(seg, split, shape){
			split = seg.splitAtTime(split);
			tx = split[0].p4x;
			ty = split[0].p4y;

			// Big hit dectection, to miss border paths
			var re = shape.isHere(sx_cx(tx), sy_cy(ty)) &&
			shape.isHere(sx_cx(tx), sy_cy(ty + pt)) &&
			shape.isHere(sx_cx(tx), sy_cy(ty - pt)) &&
			shape.isHere(sx_cx(tx + pt), sy_cy(ty)) &&
			shape.isHere(sx_cx(tx - pt), sy_cy(ty));
			
			// if (re) alert('HIT ' + tx + ', ' + ty);

			return re;
		}

		for(var s=0; s<this.segments.length; s++){

			if(testForHit(this.segments[s], 0.33, shape) || testForHit(this.segments[s], 0.66, shape)){
				// this.segments[s].drawSegmentPoints('rgb(255,0,0)', s);
				this.segments[s].objtype = 'hit';
			} else {
				// this.segments[s].drawSegmentPoints('rgb(0,255,0)', s);
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});

		// alert('removeSegmentsOverlappingShape - hits and misses');
		// debug(' PolySegment.removeSegmentsOverlappingShape - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeNonConnectingSegments = function() {
		// debug('\n PolySegment.removeNonConnectingSegments - START');
		var len = this.segments.length;
		var test, against, t1, t4;
		var precision = 0;

		for(var t=0; t<this.segments.length; t++){
			test = this.segments[t];
			t1 = false;
			t4 = false;

			for(var a=0; a<this.segments.length; a++){
				against = this.segments[a];
				if(t !== a && against.objtype === 'segment'){
					if(against.containsTerminalPoint(test.getCoord(1), precision)) t1 = true;
					if(against.containsTerminalPoint(test.getCoord(4), precision)) t4 = true;
					if(t1 && t4) break;					
				}
			}

			if(!(t1 && t4)){
				test.objtype = 'NON CONNECTING';
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});
		// debug(' PolySegment.removeNonConnectingSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.combineInlineSegments = function() {
		// debug('\n PolySegment.combineInlineSegments - START');
		var len = this.segments.length;

		var ts, ns;

		for(var s=0; s < this.segments.length; s++){
			ts = this.segments[s];
			ns = (s === this.segments.length-1)? this.segments[0] : this.segments[s+1];

			if(ts.line === ns.line){
				this.segments[s] = new Segment({
					'p1x': ts.p1x,
					'p1y': ts.p1y,
					'p4x': ns.p4x,
					'p4y': ns.p4y
				});

				this.segments.splice(s+1, 1);

				s--;
			}
		}

		// debug(' PolySegment.combineInlineSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};
// end of file