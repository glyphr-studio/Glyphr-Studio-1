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

		this.segments = oa.segments || [];

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
		var pp = [];

		pp.push(makePathPointFromSegments(this.segments[this.segments.length-1], this.segments[0]));
		var ns;
		for(var s=0; s<this.segments.length-1; s++){
			ns = this.segments[s+1];
			pp.push(makePathPointFromSegments(this.segments[s], ns));
		}

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
		// debug(ix);
		// debug('\t found ' + ix.length + ' ix');
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
		// debug('\t length ' + this.segments.length);

		ixarr.forEach(function(v, i) {
			ixarr[i] = ixToCoord(v);
		});

		var result = [];

		for(var s=0; s<this.segments.length; s++){
			result = result.concat(this.segments[s].splitSegmentAtProvidedCoords(ixarr));
		}

		this.segments = result;

		// debug('\t length ' + this.segments.length);
		// debug(' PolySegment.splitSegmentsAtProvidedIntersections - END\n');
	};

	PolySegment.prototype.splitSegmentsAtIntersections = function(shape) {
		// debug('\n PolySegment.splitSegmentsAtIntersections - START');
		// debug(this.segments);

		var ix = this.findIntersections();
		// debug(ix);
		if(ix.length === 0) return false;

		this.splitSegmentsAtProvidedIntersections(ix);

		this.removeDuplicateSegments();
		this.removeSegmentsOverlappingShape(shape);
		this.removeZeroLengthSegments();
		this.removeRedundantSegments();

		this.drawPolySegmentOutline();

		// debug(this.segments);
		// debug(' PolySegment.splitSegmentsAtIntersections - END\n');
		return true;
	};


	PolySegment.prototype.splitSegmentsAtIntersections = function(shape) {
		// debug('\n PolySegment.splitSegmentsAtIntersections - START');
		// debug(this.segments);
		var splitstuff = true;
		var didstuff = false;
		var uniqueix = [];

		function splitseg(poly, seg, co) {
			if(seg.containsEndPoint(co)) return;

			if(seg.line){
				poly.splitSegment(seg, co);
				splitstuff = true;
				didstuff = true;

			} else {
				var t = round(seg.getSplitFromCoord(co).split, 2);

				if(t !== 0 && t !== 1){
					poly.splitSegment(seg, t);
					splitstuff = true;
					didstuff = true;
				}
			}
		}

		var count = 0;
		while(splitstuff){

			if(count === 10){
				// console.warn('\t BREAKING AT LOOP MAX 10');
				break;
			}

			if(this.segments.length > 100){
				// console.warn('\t BREAKING AT SEGMENTS MAX 100');
				break;
			}

			// debug('<><><><> LOOP ' + count + ' <><><><>');
			// debug('groupCollapsed');

			splitstuff = false;
			var ix, s1, s2, co;
			var donearr = [];
			var nps = new PolySegment(clone(this));

			// Initialize the done tracking arr
			for(var a=0; a<this.segments.length; a++){
				var c = [];
				for(var b=0; b<this.segments.length; b++){
					if(a === b) c.push(true);
					else c.push(false);
				}
				donearr[a] = c;
			}
			// debug(donearr);

			for(var i=0; i<this.segments.length; i++){
				for(var j=0; j<this.segments.length; j++){
					if(!donearr[i][j]){
						s1 = clone(this.segments[i]);
						s2 = clone(this.segments[j]);

						ix = findSegmentIntersections(s1, s2);

						if(ix.length > 0){
							if(ix.length > 1) {
								// console.warn('More than one intersection');
								// debug(ix);
							}

							if(count === 0){
								uniqueix = uniqueix.concat(ix);
								uniqueix = uniqueix.filter(duplicates);
							}

							for(var k=0; k<ix.length; k++){
								if(uniqueix.indexOf(ix[k]) > -1){
									// debug(' ix at loop ' + i + ' - ' + j);
									co = ixToCoord(ix[k]);
									splitseg(nps, s1, co);
									splitseg(nps, s2, co);
								}
							}
						}
					}
					// debug(donearr);
					donearr[i][j] = true;
					donearr[j][i] = true;
				}

				// debug('\t OUTER LOOP DONE ' + i);
				// debug(this.segments);
			}

			this.segments = nps.segments;
			this.removeSegmentsOverlappingShape(shape);
			this.removeZeroLengthSegments();
			this.removeDuplicateSegments();
			this.removeRedundantSegments();

			// if(count === 0) debug('\t uniqueix.length ' + uniqueix.length);
			// if(!splitstuff) debug('\t Didnt split anything, breaking on ' + count);
			count++;
			// debug('groupEnd');
		}

		// debug(' PolySegment.splitSegmentsAtIntersections - returning ' + didstuff + ' - END\n');

		return didstuff;
	};

	PolySegment.prototype.stitchSegmentsTogether = function() {
		// debug('\n PolySegment.stitchSegmentsTogether - START');
		// debug('\t STARTING');
		// debug(this.segments);
		// this.drawPolySegmentOutline();
		// alert('Starting stitchSegmentsTogether');

		var segs = this.segments;
		var newpolysegs = [];
		var orderedsegs = [clone(segs[0])];
		var nextseg = clone(segs[0]);
		var count = 0;
		var lastseglength = segs.length;
		var firstseglength = segs.length;

		function addNextSegment(seg) {
			// var prec = 1;
			var ts;
			// debug('\n\t CHECKING ');
			// debug([seg]);
			// debug('\t AGAINST');
			// debug(segs);

			// first check all the segments in original flow order
			for(var s=0; s<segs.length; s++){
				ts = clone(segs[s]);
				// debug('\t checking p4/ts: ' + round(seg.p4x, prec)+', '+round(seg.p4y, prec)+' : \t'+round(ts.p1x, prec)+', '+round(ts.p1y, prec));

				if(seg.preceeds(ts)){
					orderedsegs.push(ts);
					segs.splice(s, 1);

					// debug('\t Next Segment should start ' + ts.p4x + ', ' + ts.p4y);
					// debug('\t SEGMENT ' + s + ' FOUND and added to orderedsegs');

					return clone(ts);
				}
			}

			// if not, try all the segments reversed
			for(var r=0; r<segs.length; r++){
				ts = clone(segs[r].getReverse());

				if(seg.preceeds(ts)){
					orderedsegs.push(ts);
					segs.splice(r, 1);

					// debug('\t Next Segment should start ' + ts.p4x + ', ' + ts.p4y);
					// debug('\t REVERSE SEGMENT ' + r + ' FOUND and added to orderedsegs');

					return clone(ts);
				}
			}

			// debug('\t !!!! NO SEGMENT FOUND !!!');
			return false;
		}

		// Main stitching loop
		segs.splice(0, 1);
		while(nextseg && count < firstseglength){
			// debug('\n\n>>>>>>>>>>>>>>\n SEGMENT LOOP ' + count);
			// debug('\t ' + segs.length + ' segs');
			// debug('\t ' + orderedsegs.length + ' orderedsegs');
			// debug('\t ' + newpolysegs.length + ' newpolysegs');

			nextseg = addNextSegment(nextseg);

			if(nextseg === false && orderedsegs.length > 1){
				// debug('\t NEXTSEG FALSE, PUSHING NEW POLYSEG');
				newpolysegs.push(new PolySegment({segments: clone(orderedsegs)}));
				// debug(newpolysegs);
				orderedsegs = [];
			}

			if(nextseg === false && segs.length) {
				// debug('\t MORE SEGMENTS, kicking off new nextseg');
				orderedsegs = [clone(segs[0])];
				nextseg = clone(segs[0]);
				segs.splice(0, 1);

			} else if(segs.length === lastseglength){
				// debug('\t NO CHANGE - BREAKING - segs.length ' + segs.length);
				break;

			} else if(segs.length === 0){
				// debug('\t NO MORE SEGMENTS - BREAKING');
				break;
			}

			lastseglength = segs.length;
			count++;

		}

		if(orderedsegs.length > 1){
			// debug('\t Pushing final orderedsegs to newpolyseg');
			newpolysegs.push(new PolySegment({segments: clone(orderedsegs)}));
		}


		// debug(' PolySegment.stitchSegmentsTogether - END\n');
		return newpolysegs;
	};



//	-----------------------------------
//	Segment Filtering
//	-----------------------------------

	PolySegment.prototype.removeZeroLengthSegments = function() {
		// debug('\n PolySegment.removeZeroLengthSegments - START');
		var len = this.segments.length;
		var prec = 2;
		var s;

		for(var t=0; t<this.segments.length; t++){
			s = this.segments[t];

			if( round(s.p1x, prec) === round(s.p1y, prec) &&
				round(s.p1x, prec) === round(s.p2x, prec) &&
				round(s.p1x, prec) === round(s.p2y, prec) &&
				round(s.p1x, prec) === round(s.p3x, prec) &&
				round(s.p1x, prec) === round(s.p3y, prec) &&
				round(s.p1x, prec) === round(s.p4x, prec) &&
				round(s.p1x, prec) === round(s.p4y, prec) ){
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
					this.segments[s] = false;
				}
			}
		}}

		this.segments = this.segments.filter(function(v){ return v; });
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

	PolySegment.prototype.removeSegmentsOverlappingShape = function(shape) {
		// debug('\n PolySegment.removeSegmentsOverlappingShape - START');
		var len = this.segments.length;

		// debug('\t segments starting as ' + this.segments.length);
		// debug(this.segments);

		var pt = 3;
		var tx, ty;

		for(var s=0; s<this.segments.length; s++){
			split = this.segments[s].split();
			tx = split[0].p4x;
			ty = split[0].p4y;

			// Big hit dectection, to miss border paths
			if(shape.isHere(sx_cx(tx), sy_cy(ty)) &&
				shape.isHere(sx_cx(tx), sy_cy(ty + pt)) &&
				shape.isHere(sx_cx(tx), sy_cy(ty - pt)) &&
				shape.isHere(sx_cx(tx + pt), sy_cy(ty)) &&
				shape.isHere(sx_cx(tx - pt), sy_cy(ty)) ){
				// alert('HIT ' + tx + ', ' + ty);
				// this.segments[s].drawSegmentPoints('rgb(255,0,0)', s);
				this.segments[s].objtype = 'hit';
			} else {
				// this.segments[s].drawSegmentPoints('rgb(0,255,0)', s);
				// alert('MISS ' + tx + ', ' + ty);
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});

		// alert('removeSegmentsOverlappingShape - hits and misses');
		// debug(' PolySegment.removeSegmentsOverlappingShape - removed ' + (len-this.segments.length) + ' - END\n');
	};


// end of file