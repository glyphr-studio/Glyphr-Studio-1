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
//	DRAWING THE SELECTION OUTLINE AND BOUNDING BOXE
//	-------------------------------------------------------
	Shape.prototype.drawSelectOutline = function(accent, thickness){
		// debug('\n Shape.drawSelectOutline - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		drawSelectOutline(this, accent, thickness);
	};

	Shape.prototype.drawBoundingBox = function(accent, thickness) {
		// debug('\n Shape.drawBoundingBox - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		drawBoundingBox(this.path.maxes, accent, thickness);
	};

	Shape.prototype.drawBoundingBoxHandles = function(accent, thickness){
		// debug('\n Shape.drawBoundingBoxHandles - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		drawBoundingBoxHandles(this.path.maxes, accent, thickness);
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

	Shape.prototype.selectPathPoint = function(p) { this.path.selectPathPoint(p); };

	Shape.prototype.flipEW = function(mid) { this.path.flipEW(mid); };

	Shape.prototype.flipNS = function(mid) { this.path.flipNS(mid); };

	Shape.prototype.reverseWinding = function() { this.path.reverseWinding(); };

	Shape.prototype.getMaxes = function() { return this.path.getMaxes(); };

	Shape.prototype.calcMaxes = function() { this.path.calcMaxes(); };

	Shape.prototype.getPath = function() { return clone(this.path); };


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
		//Default Circle size
		var lx = 0;
		var ty = _GP.projectsettings.xheight;
		var rx = _GP.projectsettings.xheight;
		var by = 0;

		if(maxes){
			lx = maxes.xmin;
			ty = maxes.ymax;
			rx = maxes.xmax;
			by = maxes.ymin;
		}

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

	function deleteShape(){
		// debug('\n deleteShape - START');
		var wishapes = getSelectedWorkItemShapes();
		var sels = _UI.ms.shapes.getMembers();
		var curs, i;

		if(sels.length === 0) _UI.ms.shapes.clear();
		else {
			for(var s=0; s<sels.length; s++){
				curs = sels[s];

				if(curs.objtype === 'componentinstance'){
					removeFromUsedIn(curs.link, _UI.selectedglyph);
				}

				i = wishapes.indexOf(curs);
				if(i > -1) wishapes.splice(i, 1);
			}

			_UI.ms.shapes.select(wishapes[i] || wishapes[wishapes.length-1]);
			var singleshape = _UI.ms.shapes.getSingleton();
			if(singleshape && singleshape.objtype === 'componentinstance') clickTool('shaperesize');
		}
		
		updateCurrentGlyphWidth();
		// debug(' deleteShape - END\n');
	}

	function turnSelectedShapeIntoAComponent(){
		var s = clone(_UI.ms.shapes.getMembers());
		var n = s.length === 1? ('Component ' + s[0].name) : ('Component ' + (getLength(_GP.components)+1));
		
		deleteShape();
		var newid = createNewComponent(new Glyph({'shapes':s, 'name':n}));
		insertComponentInstance(newid);
		_UI.selectedtool = 'shaperesize';
		selectShape(getSelectedWorkItemShapes().length-1);
		redraw('turnSelectedShapeIntoAComponent');
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



//	----------------------------------------------
//	CANVAS HELPER FUNCTIONS
//	----------------------------------------------
	Shape.prototype.isHere = function(px, py){
		var gctx = _UI.ishereghostctx;
		
		gctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);
		gctx.fillStyle = 'rgba(0,0,255,0.2)';
		gctx.beginPath();
		this.drawShape(gctx);
		gctx.closePath();
		gctx.fill();

		var imageData = gctx.getImageData(px, py, 1, 1);
		//debug('ISHERE? alpha = ' + imageData.data[3] + '  returning: ' + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	};

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

		redraw('Shape Name');
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