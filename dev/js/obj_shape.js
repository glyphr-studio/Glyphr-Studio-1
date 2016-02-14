// start of file
/**
	Object > Shape
	The Shape object is the high level object that
	represents an outline.  The Glyph object treats
	Shape objects and Component Instance objects
	interchangeably - any method added to Shape
	should also be added to Component Instance.
**/


	function Shape(oa){
		// debug('\n SHAPE - START');
		oa = oa || {};
		this.objtype = 'shape';

		// common settings
		this.name = oa.name || 'Shape';
		this.path = isval(oa.path)? new Path(oa.path) : rectPathFromMaxes(false);
		this.visible = isval(oa.visible)? oa.visible : true;
		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
		this.ratiolock = oa.ratiolock || false;

		// debug(' SHAPE - END\n');
	}





//	-------------------------------------------------------
//	SHAPE METHODS
//	-------------------------------------------------------

	Shape.prototype.getName = function() { return this.name; };

	Shape.prototype.changed = function() { this.path.changed(); };


//	-------------------------------------------------------
//	DRAWING THE SHAPE
//	-------------------------------------------------------

	Shape.prototype.getName = function() { return this.name; };

	Shape.prototype.drawShape = function(lctx, view){
		// debug('\n Shape.drawShape - START');
		// debug('\t view ' + json(view, true));

		if(this.visible){
			if((this.path.maxes.xmax === -1) &&
					(lctx === _UI.glypheditctx) &&
					(_UI.selectedtool !== 'newpath')) {
				this.calcMaxes();
			}
			this.path.drawPath(lctx, view);
		}

		// debug(' Shape.drawShape - returning true by default - END\n');
		return true;
	};


//	-------------------------------------------------------
//	DRAWING THE SELECTION OUTLINE AND BOUNDING BOX
//	-------------------------------------------------------
	Shape.prototype.draw_PathOutline = function(accent, thickness){
		// debug('\n Shape.draw_PathOutline - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_PathOutline(this, accent, thickness);
	};

	Shape.prototype.draw_BoundingBox = function(accent, thickness) {
		// debug('\n Shape.draw_BoundingBox - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_BoundingBox(this.path.maxes, accent, thickness);
	};

	Shape.prototype.draw_BoundingBoxHandles = function(accent, thickness){
		// debug('\n Shape.draw_BoundingBoxHandles - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_BoundingBoxHandles(this.path.maxes, accent, thickness);
	};


//-------------------------------------------------------
// TRANSLATE TO DIFFERENT LANGUAGES
//-------------------------------------------------------
	Shape.prototype.makeSVG = function(size, gutter) {
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var upm = _GP.projectsettings.upm;
		var desc = upm - _GP.projectsettings.ascent;
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * upm;
		var vbsize = upm - (gutter*2);

		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(upm-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(upm-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="';
		re += this.path.makeSVGpathData();
		re += '"/>';
		re += '</g>';
		re += '</svg>';

		return re;
	};

	Shape.prototype.genPostScript = function(lastx, lasty){
		return this.path? this.path.genPathPostScript(lastx, lasty) : {'re':'', 'lastx':lastx, 'lasty':lasty};
	};

	Shape.prototype.makeOpenTypeJSpath = function(otpath) { return this.path.makeOpenTypeJSpath(otpath); };


//	-------------------------------------------------------
//	PATH WRAPPER FUNCTIONS FOR COMPONENT INSTANCE PARIDY
//	-------------------------------------------------------

	Shape.prototype.updateShapePosition = function(dx, dy, force) { this.path.updatePathPosition(dx, dy, force); };

	Shape.prototype.setShapePosition = function(nx, ny, force) { this.path.setPathPosition(nx, ny, force); };

	Shape.prototype.updateShapeSize = function(dx, dy, ratiolock) { this.path.updatePathSize(dx, dy, ratiolock); };

	Shape.prototype.setShapeSize = function(nx, ny, ratiolock) { this.path.setPathSize(nx, ny, ratiolock); };

	Shape.prototype.isOverControlPoint = function(x, y, nohandles) { return this.path.isOverControlPoint(x, y, nohandles); };

	Shape.prototype.flipEW = function(mid) { this.path.flipEW(mid); };

	Shape.prototype.flipNS = function(mid) { this.path.flipNS(mid); };

	Shape.prototype.rotate = function(angle, about) {
		// debug('\n Shape.rotate - START');
		about = about || this.getCenter();
		this.path.rotate(angle, about);
		// debug('\t first p[0].P.x ' + this.path.pathpoints[0].P.x);
		// debug(' Shape.rotate - END\n');
	};

	Shape.prototype.getCenter = function() {
		var m = this.getMaxes();
		var re = {};
		re.x = ((m.xmax - m.xmin) / 2) + m.xmin;
		re.y = ((m.ymax - m.ymin) / 2) + m.ymin;

		return re;
	};

	Shape.prototype.reverseWinding = function() { this.path.reverseWinding(); };

	Shape.prototype.getMaxes = function() { return this.path.getMaxes(); };

	Shape.prototype.calcMaxes = function() { this.path.calcMaxes(); };

	Shape.prototype.getPath = function() { return clone(this.path); };

	Shape.prototype.getSegment = function(num) { return this.path.getSegment(num); };


//	-------------------------------------------------------
//	NEW SHAPE FUNCTIONS
//	-------------------------------------------------------
	function rectPathFromMaxes(maxes){
		//Default Shape size
		var lx = 0;
		var ty = _GP.projectsettings.ascent;
		var rx = (_GP.projectsettings.upm / _GP.projectsettings.griddivisions);
		var by = 0;

		if(maxes){
			lx = maxes.xmin;
			ty = maxes.ymax;
			rx = maxes.xmax;
			by = maxes.ymin;
		}

		var qw = round((rx-lx)/4);
		var qh = round((ty-by)/4);

		// First Point
		var Pul = new Coord({'x':lx, 'y':ty});
		var H1ul = new Coord({'x':lx, 'y':(ty-qh)});
		var H2ul = new Coord({'x':(lx+qw), 'y':ty});

		// Second Point
		var Pur = new Coord({'x':rx, 'y':ty});
		var H1ur = new Coord({'x':(rx-qw), 'y':ty});
		var H2ur = new Coord({'x':rx, 'y':(ty-qh)});

		// Third Point
		var Plr = new Coord({'x':rx, 'y':by});
		var H1lr = new Coord({'x':rx, 'y':(by+qh)});
		var H2lr = new Coord({'x':(rx-qw), 'y':by});

		// Fourth Point
		var Pll = new Coord({'x':lx, 'y':by});
		var H1ll = new Coord({'x':(lx+qw), 'y':by});
		var H2ll = new Coord({'x':lx, 'y':(by+qh)});

		var patharr = [];
		patharr[0] = new PathPoint({'P':Pul, 'H1':H1ul, 'H2':H2ul});
		patharr[1] = new PathPoint({'P':Pur, 'H1':H1ur, 'H2':H2ur});
		patharr[2] = new PathPoint({'P':Plr, 'H1':H1lr, 'H2':H2lr});
		patharr[3] = new PathPoint({'P':Pll, 'H1':H1ll, 'H2':H2ll});

		var rp = new Path({'pathpoints':patharr, 'leftx':lx, 'rightx':rx, 'topy':ty, 'bottomy':by});
		//debug('RETURNING PATH: ' + JSON.stringify(rp));

		return rp;
	}

	function ovalPathFromMaxes(maxes){
		maxes = maxes || {};

		//Default Circle size
		lx = maxes.xmin || 0;
		ty = maxes.ymax || _GP.projectsettings.xheight || 500;
		rx = maxes.xmax || _GP.projectsettings.xheight || 500;
		by = maxes.ymin || 0;


		var hw = round((rx-lx)/2);
		var hh = round((ty-by)/2);
		var hwd = round(hw*0.448);
		var hhd = round(hh*0.448);

		// First Point - Top
		var Pt = new Coord({'x':(lx+hw), 'y':ty});
		var H1t = new Coord({'x':(lx+hwd), 'y':ty});
		var H2t = new Coord({'x':(rx-hwd), 'y':ty});

		// Second Point - Right
		var Pr = new Coord({'x':rx, 'y':(by+hh)});
		var H1r = new Coord({'x':rx, 'y':(ty-hhd)});
		var H2r = new Coord({'x':rx, 'y':(by-hhd)});

		// Third Point - Bottom
		var Pb = new Coord({'x':(lx+hw), 'y':by});
		var H1b = new Coord({'x':(rx-hwd), 'y':by});
		var H2b = new Coord({'x':(lx+hwd), 'y':by});

		// Fourth Point - Left
		var Pl = new Coord({'x':lx, 'y':(by+hh)});
		var H1l = new Coord({'x':lx, 'y':(by+hhd)});
		var H2l = new Coord({'x':lx, 'y':(ty-hhd)});

		var patharr = [];
		patharr[0] = new PathPoint({'P':Pt, 'H1':H1t, 'H2':H2t, 'type':'symmetric'});
		patharr[1] = new PathPoint({'P':Pr, 'H1':H1r, 'H2':H2r, 'type':'symmetric'});
		patharr[2] = new PathPoint({'P':Pb, 'H1':H1b, 'H2':H2b, 'type':'symmetric'});
		patharr[3] = new PathPoint({'P':Pl, 'H1':H1l, 'H2':H2l, 'type':'symmetric'});

		return new Path({'pathpoints':patharr});
	}


//	-----------------
//	Button Functions
//	-----------------
	function addShape(newshape){
		// debug('ADDSHAPE - was passed:\n' + JSON.stringify(newshape));
		if(newshape){
			if(newshape.objtype === 'componentinstance'){
				_UI.selectedtool = 'shaperesize';
			} else if(newshape.path && (_UI.selectedtool === 'shaperesize')) {
				// debug('ADDSHAPE triggered as true: newshape.path && _UI.selectedtool == shaperesize \n\t NOT calling calcmaxes, okay?');
				//newshape.calcMaxes();
			}
		} else {
			// debug('ADDSHAPE - passed null, creating new shape.');
			newshape = new Shape({});
			newshape.name = ('Rectangle ' + ((getSelectedWorkItemShapes().length*1)+1));
		}

		var sg = getSelectedWorkItem();

		sg.shapes.push(newshape);
		_UI.ms.shapes.select(newshape);
		sg.calcGlyphMaxes();

		_UI.navprimaryhere = 'npAttributes';

		// debug('ADDSHAPE - returns:\n' + JSON.stringify(newshape));
		return newshape;
	}

	function addBasicShape(type){
		var hd = 50;
		var th = 500;
		var tw = 300;
		var newshape = new Shape({});
		var parr = false;
		var shapetype = 'Shape ';
		var p1,p2,p3,p4;

		if(type === 'oval'){
			p1 = new PathPoint({'P':new Coord({'x':0,'y':(th/2)}), 'H1':new Coord({'x':0,'y':hd}), 'H2':new Coord({'x':0,'y':(th-hd)}), 'type':'symmetric'});
			p2 = new PathPoint({'P':new Coord({'x':(tw/2),'y':th}), 'H1':new Coord({'x':hd,'y':th}), 'H2':new Coord({'x':(tw-hd),'y':th}), 'type':'symmetric'});
			p3 = new PathPoint({'P':new Coord({'x':tw,'y':(th/2)}), 'H1':new Coord({'x':tw,'y':(th-hd)}), 'H2':new Coord({'x':tw,'y':hd}), 'type':'symmetric'});
			p4 = new PathPoint({'P':new Coord({'x':(tw/2),'y':0}), 'H1':new Coord({'x':(tw-hd),'y':0}), 'H2':new Coord({'x':hd,'y':0}), 'type':'symmetric'});
			parr = [p1,p2,p3,p4];
			shapetype = 'Oval ';
		} else {
			p1 = new PathPoint({'P':new Coord({'x':0,'y':0}), 'H1':new Coord({'x':hd,'y':0}), 'H2':new Coord({'x':0,'y':hd})});
			p2 = new PathPoint({'P':new Coord({'x':0,'y':th}), 'H1':new Coord({'x':0,'y':(th-hd)}), 'H2':new Coord({'x':hd,'y':th})});
			p3 = new PathPoint({'P':new Coord({'x':tw,'y':th}), 'H1':new Coord({'x':(tw-hd),'y':th}), 'H2':new Coord({'x':tw,'y':(th-hd)})});
			p4 = new PathPoint({'P':new Coord({'x':tw,'y':0}), 'H1':new Coord({'x':tw,'y':hd}), 'H2':new Coord({'x':(tw-hd),'y':0})});
			parr = [p1,p2,p3,p4];
			shapetype = 'Rectangle ';
		}

		newshape.path = new Path({'pathpoints':parr});
		newshape.name = (shapetype + getSelectedWorkItemShapes().length+1);

		getSelectedWorkItemShapes().push(newshape);
		_UI.ms.shapes.select(newshape);
		updateCurrentGlyphWidth();
	}

	function turnSelectedShapeIntoAComponent(){
		var s = clone(_UI.ms.shapes.getMembers());
		var n = s.length === 1? ('Component ' + s[0].name) : ('Component ' + (getLength(_GP.components)+1));

		_UI.ms.shapes.deleteShapes();
		var newid = createNewComponent(new Glyph({'shapes':s, 'name':n}));
		insertComponentInstance(newid);
		_UI.selectedtool = 'shaperesize';
		selectShape(getSelectedWorkItemShapes().length-1);
		redraw({calledby:'turnSelectedShapeIntoAComponent'});
	}

	function getClickedShape(x,y){
		// debug('\n getClickedShape - START');
		// debug('\t checking x:' + x + ' y:' + y);

		var ts;
		var sws = getSelectedWorkItemShapes();
		for(var j=(sws.length-1); j>=0; j--){
			ts = sws[j];
			// debug('\t Checking shape ' + j);

			if(ts.isHere(x,y)){
				return ts;
			}
		}

		// clickEmptySpace();
		// debug(' getClickedShape - END\n');
		return false;
	}

	function isOverShape(x,y) {
		var sws = getSelectedWorkItemShapes();
		for(var j=(sws.length-1); j>=0; j--){
			if(sws[j].isHere(x,y)) return true;
		}
		return false;
	}


//	-----------------
//	Boolean Combine
//	-----------------

	function combineShapes(shapes, donttoast, dontresolveoverlaps) {
		// debug('\n combineShapes - START');
		// debug(shapes);

		var tempshapes = false;
		
		if(shapes.length <= 1){
			// debug('\t length=1 - returning what was passed');
			return false;
		} else if(shapes.length === 2) {
			tempshapes = combineTwoShapes(shapes[0], shapes[1], donttoast);
			if(!tempshapes) {
				// debug('\t length=2 - returning what was passed');
				if(!donttoast) showToast('The selected shapes do not have overlapping paths.');
				return false;
			} else {
				tempshapes = [tempshapes];	
				// debug('\t length=2 - continuing with tempshapes from combineTwoShapes');
				// debug(tempshapes);
			}
		}


		// One pass through collapsing shapes down
		function singlePass(arr) {
			// debug('\n\t SinglePass');
			// debug('\t\t start arr len ' + arr.length);
			var re;
			var newarr = [];
			var didstuff = false;

			for(var outer=0; outer<arr.length; outer++){ for(var inner=0; inner<arr.length; inner++){
				// debug('\t\t testing shape ' + outer + ' and ' + inner);

				if((outer !== inner) && arr[outer] && arr[inner]){
					re = combineTwoShapes(arr[outer], arr[inner], donttoast);

					// debug('\t\t combineShapes returned ' + (re.length || re));
					if(re !== false){
						newarr.push(re);
						didstuff = true;
						arr[outer] = false;
						arr[inner] = false;
					}
				}
			}}

			newarr = newarr.concat(arr.filter(function(v){return v;}));

			// debug('\t singlepass didstuff = ' + didstuff);

			return {'arr':newarr, 'didstuff':didstuff};
		}



		// Sort shapes by winding

		if(!tempshapes){
			tempshapes = clone(shapes);
			tempshapes.sort(function(a,b){return a.path.getWinding() - b.path.getWinding();});

			// Main collapsing loop
			var looping = true;
			var count = 0;

			while(looping && count < 20){
				looping = false;

				lr = singlePass(tempshapes);
				looping = lr.didstuff;
				if(!looping && count === 0){
					if(!donttoast) showToast('The selected shapes do not have overlapping paths.');
					return false;
				}

				tempshapes = lr.arr;
				// debug('\t didstuff ' + lr.didstuff);
				count++;
			}
		}
		

		// debug(tempshapes);

		var newshapes = [];
		if(dontresolveoverlaps){
			// debug('\t dontresolveoverlaps is true');
			newshapes = tempshapes;
			// debug('\t newshapes is now ');
			// debug(newshapes);
			
		} else {
			// debug('\t dontresolveoverlaps is false, tempshapes.length = ' + tempshapes.length);
			// Collapse each shape's overlapping paths
			for(var ts=0; ts<tempshapes.length; ts++){
				newshapes = newshapes.concat(tempshapes[ts].resolveSelfOverlaps());
			}
			// debug('\t newshapes is now ');
			// debug(newshapes);
		}

		// debug('\t returning');
		// debug(newshapes);

		// debug(' combineShapes - END\n');
		return newshapes;
	}

	function combineTwoShapes(shape1, shape2) {
		// debug('\n combineShapes - START');
		// Find intersections
		var intersections = findPathIntersections(shape1.path, shape2.path);

		if(intersections.length < 1) {
			// debug('\t no intersections, returning.');
			return false;
		}

		// Insert one intersection into both shapes
		var ix = ixToCoord(intersections[0]);

		var p1 = shape1.path.containsPoint(ix);
		if(!p1){
			p1 = shape1.path.getClosestPointOnCurve(ix);
			p1 = shape1.path.insertPathPoint(p1.split, p1.point);
		}
		p1.customid = 'overlap';

		var p2 = shape2.path.containsPoint(ix);
		if(!p2){
			p2 = shape2.path.getClosestPointOnCurve(ix);
			p2 = shape2.path.insertPathPoint(p2.split, p2.point);
		}	
		p2.customid = 'overlap';


		// Walk one shape until the overlap point is found
		// Flip to the other shape, add all the points
		// Flip back to the first shape, add remaining points

		function getPointsBeforeOverlap(path) {
			var re = [];
			var pt = {};

			for(var pp=0; pp<path.pathpoints.length; pp++){
				pt = new PathPoint(path.pathpoints[pp]);

				if(path.pathpoints[pp].customid !== 'overlap') {
					re.push(pt);

				} else {
					return {
						'points': re,
						'overlap': pt
					};
				}
			}
		}

		function getPointsAfterOverlap(path) {
			var re = [];
			var ov = {};

			for(var pp=0; pp<path.pathpoints.length; pp++){
				if(path.pathpoints[pp].customid === 'overlap'){
					ov = new PathPoint(path.pathpoints[pp]);

					for(var pa=(pp+1); pa<path.pathpoints.length; pa++){
						re.push(new PathPoint(path.pathpoints[pa]));
					}

					return {
						'points': re,
						'overlap': ov
					};
				}
			}
		}

		var s1h1 = getPointsBeforeOverlap(shape1.path);
		var s1h2 = getPointsAfterOverlap(shape1.path);
		var s2h1 = getPointsBeforeOverlap(shape2.path);
		var s2h2 = getPointsAfterOverlap(shape2.path);

		var newpoints = [];

		newpoints = newpoints.concat(s1h1.points);

		newpoints.push(
			new PathPoint({
				P: clone(s1h1.overlap.P),
				H1: clone(s1h1.overlap.H1),
				H2: clone(s2h1.overlap.H2),
				type: 'corner',
				useh1: s1h1.overlap.useh1,
				useh2: s2h1.overlap.useh2
			})
		);

		newpoints = newpoints.concat(s2h2.points);
		newpoints = newpoints.concat(s2h1.points);

		newpoints.push(
			new PathPoint({
				P: clone(s2h1.overlap.P),
				H1: clone(s2h1.overlap.H1),
				H2: clone(s1h2.overlap.H2),
				type: 'corner',
				useh1: s2h1.overlap.useh1,
				useh2: s1h2.overlap.useh2
			})
		);

		newpoints = newpoints.concat(s1h2.points);

		// debug(' combineShapes - returning successfully - END\n');

		return new Shape({path: {pathpoints: newpoints}});
	}

	Shape.prototype.resolveSelfOverlaps = function() {
		// debug('\n Shape.resolveSelfOverlaps - START');
		// Add self intersects to path
		var polyseg = this.path.getPolySegment();
		var ix = polyseg.findIntersections();
		// debug('\t intersections');
		// debug(json(ix, true));

		if(ix.length === 0) return new Shape(clone(this));

		var segnum = polyseg.segments.length;

		var threshold = 0.01;
		polyseg.splitSegmentsAtProvidedIntersections(ix, threshold);
		
		if(segnum === polyseg.segments.length) return new Shape(clone(this));

		// debug('\t before filtering ' + polyseg.segments.length);
		polyseg.removeZeroLengthSegments();
		polyseg.removeDuplicateSegments();
		polyseg.removeSegmentsOverlappingShape(this);
		polyseg.removeRedundantSegments();
		polyseg.removeNonConnectingSegments();
		// polyseg.combineInlineSegments();
		// debug('\t afters filtering ' + polyseg.segments.length);

		polyseg.drawPolySegmentOutline();

		// var reshapes = [];
		// reshapes.push(new Shape({'name':this.name, 'path':polyseg.getPath()}));

		var resegs = polyseg.stitchSegmentsTogether();

		var reshapes = [];
		var psn;
		for(var ps=0; ps<resegs.length; ps++){
			psn = resegs[ps];
			if(psn.segments.length > 1) reshapes.push(new Shape({'name':this.name, 'path':psn.getPath()}));
		}


		// debug(' Shape.resolveSelfOverlaps - END\n');
		return reshapes;
	};


//	----------------------------------------------
//	CANVAS HELPER FUNCTIONS
//	----------------------------------------------
	Shape.prototype.isHere = function(px, py){ return this.path.isHere(px, py); };

	Shape.prototype.isOverBoundingBoxHandle = function(px, py){
		// debug('\n Shape.isOverBoundingBoxHandle - START');
		var c = isOverBoundingBoxHandle(px, py, this.path.maxes);
		// debug('\t Shape.isOverBoundingBoxHandle returning ' + c);
		return c;
	};

	Shape.prototype.changeShapeName = function(sn){
		// debug('\n Shape.changeShapeName - START');
		// debug('\t passed: ' + sn);
		sn = strSan(sn);
		// debug('\t sanitized: ' + sn);

		if(sn !== ''){
			this.name = sn;
			history_put('shape name');
		} else {
			showToast('Invalid shape name - shape names must only contain alphanumeric characters or spaces.');
		}

		redraw({calledby:'Shape Name', redrawcanvas:false});

		// debug(' Shape.changeShapeName - END\n');
	};


//	-----------------------------------
//	HELPER FUNCTIONS
//	------------------------------------

	Shape.prototype.checkPath = function() {
		// debug('CHECKPATH - checking ' + this.name + '\n' + JSON.stringify(this.path));

		for(var pp = 0; pp < this.path.pathpoints.length; pp++){
			var tp = this.path.pathpoints[pp];
			if(!(tp.P.x)) debug(this.name + ' p' + pp + '.P.x is ' + tp.P.x);
			if(!(tp.P.y)) debug(this.name + ' p' + pp + '.P.y is ' + tp.P.y);

			if(!(tp.H1.x)) debug(this.name + ' p' + pp + '.H1.x is ' + tp.H1.x);
			if(!(tp.H1.y)) debug(this.name + ' p' + pp + '.H1.y is ' + tp.H1.y);

			if(!(tp.H2.x)) debug(this.name + ' p' + pp + '.H2.x is ' + tp.H2.x);
			if(!(tp.H2.y)) debug(this.name + ' p' + pp + '.H2.y is ' + tp.H2.y);
		}
	};

	Shape.prototype.checkForNaN = function() {
		return this.path.checkForNaN();
	};

	Shape.prototype.drawSegments = function () {
		var segs = this.path.getPolySegment();
		segs.slowlyDrawSegments();
	};


// end of file