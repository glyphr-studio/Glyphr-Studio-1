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


//	-------------------------------------------------------
//	DRAWING THE SHAPE
//	-------------------------------------------------------

	Shape.prototype.getName = function() { return this.name; };

	Shape.prototype.drawShape = function(lctx, view){
		//debug('drawShape');
		if(this.visible){
			if((this.path.maxes.xmax === -1) &&
					(lctx === _UI.glypheditctx) &&
					(_UI.selectedtool !== 'newpath')) {
				this.calcMaxes();
			}
			this.path.drawPath(lctx, view);
		}

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

	function combineShapes(s1, s2) {
		debug('\n combineShapes - START');
		var newshapes = [];


		// Setup shapes
		function setupShapeForCombining(shape, name) {
			var re = clone(shape);

			re.path.name = name;

			for(var p=0; p<re.path.pathpoints.length; p++){
				re.path.pathpoints[p].done = false;
			}

			return re;
		}

		var shape1 = setupShapeForCombining(s1, 'path1');
		var shape2 = setupShapeForCombining(s2, 'path2');


		// adjust winding
		if( ((s1.path.winding > 0) && (s2.path.winding > 0)) || ((s1.path.winding < 0) && (s2.path.winding < 0)) ){}
		else {
			debug('\t Paths DO NOT have the same winding: ' + s1.path.winding + ' ' + s2.path.winding);
			s2.path.reverseWinding();
			debug('\t now they should: ' + s1.path.winding + ' ' + s2.path.winding);
		}


		// Find intersections
		var intersections = findPathIntersections(shape1.path, shape2.path);

		if(intersections.length < 2) {
			debug(intersections);
			debug('\t zero or one intersections, returning');
			return false;
		}


		// Add points to each shape at intersection
		var p, id;
		for(var i=0; i<intersections.length; i++){
			intersections[i] = {
				x: parseFloat(intersections[i].split('/')[0]),
				y: parseFloat(intersections[i].split('/')[1])
			};

			id = 'overlap'+i;
			p = shape1.path.getClosestPointOnCurve(intersections[i]);
			p = shape1.path.insertPathPoint(p.split, p.point, id);
			p.done = false;

			p = shape2.path.getClosestPointOnCurve(intersections[i]);
			p = shape2.path.insertPathPoint(p.split, p.point, id);
			p.done = false;
		}
		debug('\t added overlap points');
		debug('\t shape1 ' + shape1.name + ' ' + shape1.path.pathpoints.length);
		debug(shape1);
		debug('\t shape1 ' + shape2.name + ' ' + shape2.path.pathpoints.length);
		debug(shape2);


		// Travel the path points in one path adding them to the
		// resulting combined path.  If a point is shared, switch
		// which path is being traveled.
		var walk, other;

		function outlineOneShape() {
			walk = shape1;
			other = shape2;
			var result = new Path({});
			var cp = getFirstIntersectionPoint(walk.path);
			var firstpointid = walk.path.pathpoints[cp].customid;
			var step = 0;
			var copoint, tp;
			var othernextpt, othernextptnum;
			var max = shape1.path.pathpoints.length + shape2.path.pathpoints.length;
			function flipWalk() {
				var temp = walk;
				walk = other;
				other = temp;
				cp = copoint;						
			}

			debug('\t FIRST STEP POINT ' + cp);
			debug('\t walk done starts: [' + walk.path.pathpoints.map(function(v){ return v.done? 1 : 0; }) + ']');
			debug('\t othe done starts: [' + other.path.pathpoints.map(function(v){ return v.done? 1 : 0; }) + ']');
			
			while(true){
				debug('\n --- WALKING ' + (walk===shape1? 'shape1' : 'shape2') + ' ' + walk.name + ' POINT ' + cp);

				if(step > max){
					debug('\t HIT SHAPE THRASHING ERROR - both paths only have ' + max + ' possible points');
					break;
				}

				tp = walk.path.pathpoints[cp];

				if(tp.done) {
					debug('\t tp.done = true, breaking');
					break;
				}

				copoint = getPointNumFromOverlapID(other.path, tp);
				debug('\t copoint returned ' + copoint);

				if(copoint !== false){
					// Make the new point from half of each overlapping point
					var newpoint = new PathPoint({
						P: clone(tp.P),
						H1: clone(tp.H1),
						H2: clone(other.path.pathpoints[copoint].H2),
						type: 'corner',
						useh1: true,
						useh2: true
					});

					// Flip the walk / other paths
					// Special cases: next point is overlapped by the other shape
					other.path.pathpoints[copoint].done = true;
					othernextptnum = other.path.getNextPointNum(copoint);
					othernextpt = other.path.pathpoints[othernextptnum];
					var nextx = sx_cx(othernextpt.P.x);
					var nexty = sy_cy(othernextpt.P.y);

					if(othernextpt.done){
						if(othernextpt.customid === firstpointid){
							debug('\t ENDING - next point is the first point');
						} else {
							debug('\t NOT FLIPPING - if flipped, the next walk point is done');
							newpoint.H1 = clone(other.path.pathpoints[copoint].H1);
							newpoint.H2 = clone(tp.H2);
						}

					} else if(othernextpt.hasOwnProperty('customid')){
						var midpt = other.path.getSegment(copoint).split()[1];
						var midx = midpt.p1x;
						var midy = midpt.p1y;

						if(!walk.isHere(sx_cx(midx), sy_cy(midy))){
							debug('\t FLIPPING - next point is an overlap point');
							flipWalk();

						} else {
							debug('\t NOT FLIPPING - next point would be an overlap point, but it crosses over an arm');
							newpoint.H1 = clone(other.path.pathpoints[copoint].H1);
							newpoint.H2 = clone(tp.H2);
						}

					} else if(walk.isHere(nextx, nexty)){
						debug('\t NOT FLIPPING - if flipped, next walk point is over the other shape');
						newpoint.H1 = clone(other.path.pathpoints[copoint].H1);
						newpoint.H2 = clone(tp.H2);

					} else {
						debug('\t FLIPPING - regular case');
						flipWalk();
					}

					result.addPathPoint(newpoint);
					debug('\t added copoint at ' + newpoint.P.x + ',' + newpoint.P.y);

				} else {
					result.addPathPoint(new PathPoint(clone(tp)));
					debug('\t added point at ' + tp.P.x + ',' + tp.P.y);
				}

				tp.done = true;
				debug('\t shape1 done is now: [' + shape1.path.pathpoints.map(function(v){ return v.done? 1 : 0; }) + ']');
				debug('\t shape2 done is now: [' + shape2.path.pathpoints.map(function(v){ return v.done? 1 : 0; }) + ']');
				debug('\t result.length is now: ' + result.pathpoints.length);

				// Finish up loop
				cp = walk.path.getNextPointNum(cp);
				step++;
			}

			newshapes.push(new Shape({name:s1.name + ' ' + (currshape+1), path:result}));
		}


		function getPointNumFromOverlapID(path, point) {
			// debug('\n getPointNumFromOverlapID - START');
			if(point.hasOwnProperty('customid')){
				for(var i=0; i<path.pathpoints.length; i++){
					if(path.pathpoints[i].hasOwnProperty('customid') && path.pathpoints[i].customid === point.customid){
						// debug('\t found ' + i);
						return i;
					}
				}
				// debug(' getPointNumFromOverlapID - NO MATCHING OVERLAPID FOUND!! - ' + point.customid + ' - END\n');
				return false;
			}
			// debug(' getPointNumFromOverlapID - point is not an overlap point - END\n');
			return false;
		}
		
		function getFirstIntersectionPoint(path) {
			var tp;
			for(var i=0; i<path.pathpoints.length; i++){
				tp = path.pathpoints[i];
				if(tp.hasOwnProperty('customid') && !tp.done){
					debug('\n getFirstIntersectionPoint - returning point ' + i + ' at ' + tp.P.x + ' , ' + tp.P.y);
					return i;
				}
			}

			debug('\n getFirstIntersectionPoint - returning false');
			return false;
		}


		// MAIN SHAPE FINDING LOOP
		var maxshapes = Math.floor(intersections.length / 2);
		var currshape = 0;
		debug(json(intersections));

		while(true){
			debug('\n\n----------\nSHAPE OUTLINE ITERATION --- loop = ' + currshape + ' of ' + maxshapes);
			if(currshape > maxshapes){
				debug('\t TOO MANY SHAPES ERROR - should max at ' + maxshapes);
				break;
			}

			if(getFirstIntersectionPoint(shape1.path) === false && getFirstIntersectionPoint(shape2.path) === false){
				debug('\t ENDING OUTLINE - no more untouched intersection points');
				break;
			}

			outlineOneShape();
			currshape++;
		}

		debug(' combineShapes - returning ' + newshapes.length + ' shapes - END\n');

		return newshapes;
	}


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
		sn = strSan(sn);
		//debug('CHANGESHAPENAME - sanitized name: ' + sn);
		if(sn !== ''){
			this.name = sn;
			history_put('shape name');
		} else {
			openDialog('<h1>Invalid shape name</h1><br>Shape names must only contain alphanumeric glyphs or spaces.<br>');
		}

		redraw({calledby:'Shape Name', redrawcanvas:false});
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

// end of file