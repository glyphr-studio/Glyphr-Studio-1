// start of file
/**
	Object > Glyph
	A single collection of outlines that could
	either represent a character, or be used as
	part of another character through components.
	The following objects are stored as Glyph
	Objects:
		Glyphs (Characters)
		Ligatures
		Components
**/


//-------------------------------------------------------
// GLYPH OBJECT
//-------------------------------------------------------
	function Glyph(oa){
		// debug('\n Glyph - START');
		oa = oa || {};
		this.objtype = 'glyph';

		this.hex = oa.glyphhex || false;
		this.name = oa.name || getGlyphName(oa.glyphhex) || false;
		this.glyphhtml = oa.glyphhtml || hexToHTML(oa.glyphhex) || false;
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.glyphwidth = isval(oa.glyphwidth)? oa.glyphwidth : 0;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.rightsidebearing = isval(oa.rightsidebearing)? oa.rightsidebearing : false;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || makeUIMins();
		this.shapes = oa.shapes || [];
		this.usedin = oa.usedin || [];
		this.contextglyphs = '';
		this.rotationreferenceshapes = false;

		// debug('\t name: ' + this.name);

		var lc = 0;
		var cs = 0;
		if(oa.shapes && oa.shapes.length){
			for(var i=0; i<oa.shapes.length; i++) {
				if(oa.shapes[i].objtype === 'componentinstance'){
					// debug('\t hydrating ci ' + oa.shapes[i].name);
					this.shapes[i] = new ComponentInstance(oa.shapes[i]);
					lc++;
				} else {
					// debug('\t hydrating sh ' + oa.shapes[i].name);
					this.shapes[i] = new Shape(oa.shapes[i]);
					cs++;
				}
			}
		}

		if(this.getGlyphMaxes) this.getGlyphMaxes();

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.svg = oa.cache.svg || false;

		// debug(' Glyph - END\n');
	}



//-------------------------------------------------------
// TRANSFORM & MOVE
//-------------------------------------------------------
	Glyph.prototype.setGlyphPosition = function(nx, ny, force){
		// debug('Glyph.setGlyphPosition - START');
		// debug('\t nx/ny/force: ' + nx + ' ' + ny + ' ' + force);
		var m = this.getMaxes();
		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);
		var dx = (nx !== false)? (nx - m.xmin) : 0;
		var dy = (ny !== false)? (ny - m.ymax) : 0;
		this.updateGlyphPosition(dx, dy, force);
		// debug(' Glyph.setGlyphPosition - END\n');
	};

	Glyph.prototype.updateGlyphPosition = function(dx, dy, force){
		// debug('\n Glyph.updateGlyphPosition - START ' + this.name);
		// debug('\t dx/dy/force: ' + dx + ' ' + dy + ' ' + force);
		// debug('\t number of shapes: ' + this.shapes.length);

		dx = parseFloat(dx) || 0;
		dy = parseFloat(dy) || 0;
		var cs = this.shapes;
		for(var i=0; i<cs.length; i++){
			cs[i].updateShapePosition(dx, dy, force);
		}

		this.changed();

		// debug(' Glyph.updateGlyphPosition - END ' + this.name + '\n\n');
	};

	Glyph.prototype.setGlyphSize = function(nw, nh, ratiolock){
		// debug('SET GLYPHSIZE ---- nw/nh/ra:\t' + nw + '\t ' + nh + '\t ' + ratiolock);
		// debug('\t maxes: ' + json(this.maxes));
		var m = this.getMaxes();
		if(nw !== false) nw = parseFloat(nw);
		if(nh !== false) nh = parseFloat(nh);
		var ch = (m.ymax - m.ymin);
		var cw = (m.xmax - m.xmin);
		var dw = (nw !== false)? (nw - cw) : 0;
		var dh = (nh !== false)? (nh - ch) : 0;

		if(ratiolock){
			if(Math.abs(nh) > Math.abs(nw)) dw = (cw*(nh/ch)) - cw;
			else dh = (ch*(nw/cw)) - ch;
		}
		this.updateGlyphSize(dw, dh, false);
	};

	Glyph.prototype.updateGlyphSize = function(dw, dh, ratiolock, dontscalecomponentinstances){
		// debug('\n Glyph.updateGlyphSize - START ' + this.name);
		// debug('\t number of shapes: ' + this.shapes.length);
		// debug('\t dw dh rl:\t' + dw + '/' + dh + '/' + ratiolock);

		var m = this.getMaxes();
		if(dw !== false) dw = parseFloat(dw) || 0;
		if(dh !== false) dh = parseFloat(dh) || 0;
		// debug('\t adjust dw/dh:\t' + dw + '/' + dh);

		var oldw = m.xmax - m.xmin;
		var oldh = m.ymax - m.ymin;

		var neww = (oldw + dw);
		var newh = (oldh + dh);
		if(Math.abs(neww) < 1) neww = 1;
		if(Math.abs(newh) < 1) newh = 1;
		// debug('\t new w/h:\t' + neww + '/' + newh);

		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);
		// debug('\t ratio dw/dh:\t' + ratiodw + '/' + ratiodh);
		if(ratiolock){
			// Assuming only one will be nonzero
			// if(Math.abs(ratiodh) > Math.abs(ratiodw)) ratiodw = ratiodh;
			// else ratiodh = ratiodw;
			if(dw !== 0 && dh === 0) ratiodh = ratiodw;
			else ratiodw = ratiodh;
		}
		// debug('\t ratio dw/dh:\t' + ratiodw + '/' + ratiodh);

		var cs = this.shapes;
		var s, smaxes,
			oldsw, oldsh, oldsx, oldsy,
			newsw, newsh, newsx, newsy,
			sdw, sdh, sdx, sdy;

		// debug('\t Before Maxes ' + json(m, true));
		for(var i=0; i<cs.length; i++){
			s = cs[i];
			// debug('\t >>> Updating ' + s.objtype + ' ' + i + '/' + cs.length + ' : ' + s.name);
			smaxes = s.getMaxes();

			// scale
			oldsw = smaxes.xmax - smaxes.xmin;
			newsw = oldsw * ratiodw;
			if(ratiodw === 0) sdw = false;
			else sdw = newsw - oldsw;

			oldsh = smaxes.ymax - smaxes.ymin;
			newsh = oldsh * ratiodh;
			if(ratiodh === 0) sdh = false;
			else sdh = newsh - oldsh;

			// debug('\t Shape ' + i + ' dw dh ' + sdw + ' ' + sdh);
			if(s.objtype === 'componentinstance' && dontscalecomponentinstances) {
				// Special case skipping scaling of CIs for Global Actions
				// debug(`\t Skipped this shape because it's a component instance`);
			} else {
				// It's a regular shape, or we're scaling everything
				s.updateShapeSize(sdw, sdh, false);				
			}

			// move
			oldsx = smaxes.xmin - m.xmin;
			newsx = oldsx * ratiodw;
			if(ratiodw === 0) sdx = false;
			else sdx = newsx - oldsx;

			oldsy = smaxes.ymin - m.ymin;
			newsy = oldsy * ratiodh;
			if(ratiodh === 0) sdy = false;
			else sdy = newsy - oldsy;

			// debug('\t Shape Pos ' + i + ' dx dy ' + sdx + ' ' + sdy);
			s.updateShapePosition(sdx, sdy, true);

		}

		this.changed();
		// debug('\t Afters Maxes ' + json(this.maxes, true));
		// debug(' Glyph.updateGlyphSize - END ' + this.name + '\n');
	};

	Glyph.prototype.flipEW = function(mid){
		// debug('\n Glyph.flipEW - START');
		// debug('\t ' + this.name);
		// debug('\t passed mid = ' + mid);
		var m = this.getMaxes();
		mid = isval(mid)? mid : ((m.xmax - m.xmin) / 2) + m.xmin;
		// debug('\t mid = ' + mid);
		// debug('\t maxes = ' + json(m, true));
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipEW(mid);
		}

		this.changed();
		// debug('\t maxes = ' + json(this.maxes, true));
	};

	Glyph.prototype.flipNS = function(mid){
		var m = this.getMaxes();
		mid = isval(mid)? mid : ((m.ymax - m.ymin) / 2) + m.ymin;
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipNS(mid);
		}

		this.changed();
	};

	Glyph.prototype.startRotationPreview = function() {
		// debug(`\n\n Glyph.startRotationPreview - START`);
		// debug(`\t shapes ${this.shapes.length}`);
		this.rotationreferenceshapes = [];
		
		for(var i=0; i<this.shapes.length; i++) {
			if(this.shapes[i].objtype === 'componentinstance'){
				this.rotationreferenceshapes[i] = new ComponentInstance(this.shapes[i]);
			} else {
				this.rotationreferenceshapes[i] = new Shape(this.shapes[i]);
			}
			// debug(this.rotationreferenceshapes[i]);
		}
		
		// debug(` Glyph.startRotationPreview - END\n`);
	};
	
	Glyph.prototype.rotationPreview = function(deltaRad, about, snap) {
		// debug(`\n\n Glyph.rotationPreview - START`);
		var tempshape;
		for(var i=0; i<this.shapes.length; i++) {
			if(this.shapes[i].objtype === 'componentinstance'){
				this.shapes[i].rotate(deltaRad - niceAngleToRadians(this.shapes[i].rotation), about, snap);
			} else {
				tempshape = new Shape(this.rotationreferenceshapes[i]);
				tempshape.rotate(deltaRad, about, snap);
				this.shapes[i].path = tempshape.path;
			}
			this.shapes[i].changed();
		}
		// debug(` Glyph.rotationPreview - END\n`);
	};

	Glyph.prototype.endRotationPreview = function() {
		this.rotationreferenceshapes = false;
	};

	Glyph.prototype.rotate = function(deltaRad, about, snap) {
		about = about || this.getCenter();

		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].rotate(deltaRad, about, snap);
		}

		this.changed();
	};

	Glyph.prototype.reverseWinding = function() {
		for(var s=0; s<this.shapes.length; s++){
			this.shapes[s].reverseWinding();
		}

		this.changed();
	};

	Glyph.prototype.alignShapes = function(edge, target) {
		// debug('\n Glyph.alignShapes - START');
		// debug('\t edge: ' + edge);
		var offset;

		if(edge === 'top'){
			target = -999999;

			this.shapes.forEach(function(v) {
				target = Math.max(target, v.getMaxes().ymax);
			});

			// debug('\t found TOP: ' + target);
			
			this.shapes.forEach(function(v) {
				v.setShapePosition(false, target);
			});


		} else if (edge === 'middle'){
			target = this.getCenter().y;

			// debug('\t found MIDDLE: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getCenter().y;
				v.updateShapePosition(false, (target - offset));
			});


		} else if (edge === 'bottom'){
			target = 999999;

			this.shapes.forEach(function(v) {
				target = Math.min(target, v.getMaxes().ymin);
			});

			// debug('\t found BOTTOM: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getMaxes().ymin;
				v.updateShapePosition(false, (target - offset));
			});


		} else if (edge === 'left'){
			target = 999999;
			
			this.shapes.forEach(function(v) {
				target = Math.min(target, v.getMaxes().xmin);
			});

			// debug('\t found LEFT: ' + target);

			this.shapes.forEach(function(v) {
				v.setShapePosition(target, false);
			});


		} else if (edge === 'center'){
			target = this.getCenter().x;

			// debug('\t found CENTER: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getCenter().x;
				v.updateShapePosition((target - offset), false);
			});


		} else if (edge === 'right'){
			target = -999999;

			this.shapes.forEach(function(v) {
				target = Math.max(target, v.getMaxes().xmax);
			});

			// debug('\t found RIGHT: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getMaxes().xmax;
				v.updateShapePosition((target - offset), false);
			});
		}

		this.changed();
		// debug(' Glyph.alignShapes - END\n');
	};


//-------------------------------------------------------
// GETTERS
//-------------------------------------------------------
	Glyph.prototype.getName = function() { return this.name; };
	
	Glyph.prototype.getChar = function() { return getGlyphName(this.hex); };

	Glyph.prototype.getHTML = function() { return this.glyphhtml || ''; };

	Glyph.prototype.getLSB = function() {
		if(this.leftsidebearing === false) return _GP.projectsettings.defaultlsb;
		else return this.leftsidebearing;
	};

	Glyph.prototype.getRSB = function() {
		if(this.rightsidebearing === false) return _GP.projectsettings.defaultrsb;
		else return this.rightsidebearing;
	};

	Glyph.prototype.getCenter = function() {
		var m = this.getMaxes();
		var re = {};
		re.x = ((m.xmax - m.xmin) / 2) + m.xmin;
		re.y = ((m.ymax - m.ymin) / 2) + m.ymin;

		return re;
	};



//-------------------------------------------------------
// CALCULATING SIZE
//-------------------------------------------------------
	Glyph.prototype.calcGlyphMaxes = function(){
		// debug('\n Glyph.calcGlyphMaxes - START ' + this.name);

		this.maxes = makeUIMins();
		var tm;

		if(this.shapes.length > 0){
			for(var jj=0; jj<this.shapes.length; jj++) {
				// debug('\t ++++++ START shape ' + jj);
				// debug(this.shapes[jj]);

				if(this.shapes[jj].getMaxes){
					tm = this.shapes[jj].getMaxes();
					// debug('\t before ' + json(tm, true));
					this.maxes = getOverallMaxes([tm, this.maxes]);
					// debug('\t afters ' + json(tm, true));
					// debug('\t ++++++ END shape ' + jj + ' - ' + this.shapes[jj].name);
				}
			}
		} else {
			this.maxes = { 'xmax': 0, 'xmin': 0, 'ymax': 0, 'ymin': 0 };
		}

		this.calcGlyphWidth();

		// debug(' Glyph.calcGlyphMaxes - END ' + this.name + '\n');
		return clone(this.maxes, 'Glyph.calcGlyphMaxes');
	};

	Glyph.prototype.calcGlyphWidth = function(){
		if(!this.isautowide) return;
		this.glyphwidth = Math.max(this.maxes.xmax, 0);
	};

	Glyph.prototype.getAdvanceWidth = function() {
		this.calcGlyphWidth();
		if(!this.isautowide) return this.glyphwidth;
		else return this.glyphwidth + this.getLSB() + this.getRSB();
	};

	Glyph.prototype.getMaxes = function() {
		// debug('\n Glyph.getMaxes - START ' + this.name);
		if(hasNonValues(this.maxes)){
			// debug('\t ^^^^^^ maxes found NaN, calculating...');
			this.calcGlyphMaxes();
			// debug('\t ^^^^^^ maxes found NaN, DONE calculating...');
		}

		if(this.shapes.length){
			if( this.maxes.xmin === _UI.maxes.xmin ||
				this.maxes.xmin === _UI.mins.xmin ||
				this.maxes.xmax === _UI.maxes.xmax ||
				this.maxes.xmax === _UI.mins.xmax ||
				this.maxes.ymin === _UI.maxes.ymin ||
				this.maxes.ymin === _UI.mins.ymin ||
				this.maxes.ymax === _UI.maxes.ymax ||
				this.maxes.ymax === _UI.mins.ymax
				){
				this.calcGlyphMaxes();
			}
		}
		
		// debug('\t returning ' + json(this.maxes));
		// debug(' Glyph.getMaxes - END ' + this.name + '\n');
		return clone(this.maxes, 'Glyph.getMaxes');
	};

	function hasNonValues(obj) {
		if(!obj) return true;

		for(var v in obj){ if(obj.hasOwnProperty(v)){
			if(!isval(obj[v])) return true;
		}}

		return false;
	}


//-------------------------------------------------------
// COMPONENT STUFF
//-------------------------------------------------------
	Glyph.prototype.containsComponents = function(){
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				return true;
			}
		}
		return false;	
	};
	
	Glyph.prototype.canAddComponent = function(cid) {
		// debug('\n Glyph.canAddComponent - START');
		var myid = ''+getMyID(this);
		// debug('\t adding ' + cid + ' to (me) ' + myid);

		if(myid === cid) return false;
		if(this.usedin.length === 0) return true;

		var downlinks = this.collectAllDownstreamLinks([], true);
		downlinks = downlinks.filter(function(elem, pos) { return downlinks.indexOf(elem) === pos;});

		var uplinks = this.collectAllUpstreamLinks([]);
		uplinks = uplinks.filter(function(elem, pos) { return uplinks.indexOf(elem) === pos;});

		// debug('\t downlinks: ' + downlinks);
		// debug('\t uplinks: ' + uplinks);

		if(downlinks.indexOf(cid) > -1) return false;
		if(uplinks.indexOf(cid) > -1) return false;

		return true;
	};

	Glyph.prototype.collectAllDownstreamLinks = function(re, excludepeers) {
		re = re || [];
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				re = re.concat(getGlyph(this.shapes[s].link).collectAllDownstreamLinks(re));
				if(!excludepeers) re.push(this.shapes[s].link);
			}
		}
		return re;
	};

	Glyph.prototype.collectAllUpstreamLinks = function(re) {
		re = re || [];
		for(var g=0; g<this.usedin.length; g++){
			re = re.concat(getGlyph(this.usedin[g]).collectAllUpstreamLinks(re));
			re.push(this.usedin[g]);
		}
		return re;
	};

	// This method is called on Glyphs just before they are deleted
	// to clean up all the component instance linking
	Glyph.prototype.deleteLinks = function(thisid) {
		// debug('\n Glyph.deleteLinks - START');
		// debug('\t passed this as id: ' + thisid);

		// Delete upstream Component Instances
		var upstreamglyph;
		for(var c=0; c<this.usedin.length; c++){
			upstreamglyph = getGlyph(this.usedin[c]);
			// debug('\t removing from ' + upstreamglyph.name);
			// debug(upstreamglyph.shapes);
			for(var u=0; u<upstreamglyph.shapes.length; u++){
				if(upstreamglyph.shapes[u].objtype === 'componentinstance' && upstreamglyph.shapes[u].link === thisid){
					upstreamglyph.shapes.splice(u, 1);
					u--;
				}
			}
			// debug(upstreamglyph.shapes);
		}

		// Delete downstream usedin array values
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				removeFromUsedIn(this.shapes[s].link, thisid);
			}
		}
	};


//-------------------------------------------------------
// DRAWING AND EXPORTING
//-------------------------------------------------------
	Glyph.prototype.drawGlyph = function(lctx, view, alpha, addLSB){
		// debug('\n Glyph.drawGlyph - START ' + this.name);
		// debug('\t view ' + json(view, true));

		var sl = this.shapes;
		var shape, drewshape;
		if(isNaN(alpha) || alpha > 1 || alpha < 0) alpha = 1;

		if(addLSB && this.isautowide) view.dx += (this.getLSB() * view.dz);

		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			shape = sl[j];
			if(shape.visible) {
				// debug('\t ' + this.name + ' drawing ' + shape.objtype + ' ' + j + ' ' + shape.name);
				drewshape = shape.drawShape(lctx, view);

				if(!drewshape){
					console.warn('Could not draw shape ' + shape.name + ' in Glyph ' + this.name);
					if(shape.objtype === 'componentinstance' && !getGlyph(shape.link)){
						console.warn('>>> Component Instance has bad link: ' + shape.link);

						var i = this.shapes.indexOf(shape);
						if(i > -1){
							this.shapes.splice(i, 1);
							console.warn('>>> Deleted the Instance');
						}
					}
				}
			}
		}

		lctx.closePath();
		// lctx.fillStyle = RGBAtoRGB(_GP.projectsettings.colors.glyphfill, alpha);
		lctx.fillStyle = _GP.projectsettings.colors.glyphfill;
		lctx.globalAlpha = alpha;
		lctx.fill('nonzero');
		lctx.globalAlpha = 1;

		// debug(' Glyph.drawGlyph - END ' + this.name + '\n');
		return (this.getAdvanceWidth()*view.dz);
	};

	Glyph.prototype.makeSVG = function(size, gutter) {
		// debug('\n Glyph.makeSVG - START');
		var ps = _GP.projectsettings;
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var emsquare = Math.max(ps.upm, (ps.ascent - ps.descent));
		var desc = Math.abs(ps.descent);
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * emsquare;
		var vbsize = emsquare - (gutter*2);
		var pathdata = this.getSVGpathData();

		// Assemble SVG
		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(emsquare-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(emsquare-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="' + pathdata + '"/>';
		re += '</g>';
		re += '</svg>';

		// debug(' Glyph.makeSVG - END\n');

		return re;
	};

	Glyph.prototype.getSVGpathData = function() {
		if(this.cache.svgpathdata) return this.cache.svgpathdata;

		this.cache.svgpathdata = this.makeSVGpathData();

		return this.cache.svgpathdata;
	};

	Glyph.prototype.makeSVGpathData = function() {
		if(this.cache.svg) return this.cache.svg;

		var sl = this.shapes;
		var pathdata = '';
		var lsb = this.getLSB();
		var shape, path, tg;

		// Make Pathdata
		for(var j=0; j<sl.length; j++) {
			shape = sl[j];
			if(shape.visible) {
				if(shape.objtype === 'componentinstance'){
					tg = shape.getTransformedGlyph();
					// tg.updateGlyphPosition(lsb, 0, true);
					if(tg) pathdata += tg.getSVGpathData();
				} else {
					path = shape.getPath();
					path.updatePathPosition(lsb, 0, true);
					pathdata += path.getSVGpathData('Glyph ' + this.name + ' Shape ' + shape.name);
				}
				if(j < sl.length-1) pathdata += ' ';
			}
		}
		if(trim(pathdata) === '') pathdata = 'M0,0Z';

		this.cache.svg = pathdata;
		return pathdata;
	};

	Glyph.prototype.makeOpenTypeJSpath = function(otpath) {
		otpath = otpath || new opentype.Path();
		for(var s=0; s < this.shapes.length; s++){
			otpath = this.shapes[s].makeOpenTypeJSpath(otpath);
		}
		return otpath;
	};

	Glyph.prototype.draw_MultiSelectAffordances = function() {
		var allpoints = [];

		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance'){
				allpoints = allpoints.concat(this.shapes[s].path.pathpoints);
				this.shapes[s].draw_PathOutline(_UI.colors.blue, 1);
			}
		}

		draw_PathPoints(allpoints, _UI.colors.blue);
	};

	Glyph.prototype.isOverControlPoint = function(x, y, nohandles) {
		var re = false;
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance'){
				re = this.shapes[s].path.isOverControlPoint(x, y, nohandles);
				if(re) return re;
			}
		}

		return false;
	};

	Glyph.prototype.findWinding = function() {
		for(var s=0; s<this.shapes.length; s++){
			this.shapes[s].findWinding();
		}
	};

	Glyph.prototype.flattenGlyph = function() {
		var reshapes = [];
		var ts, tg;

		for(var s=0; s<this.shapes.length; s++){
			ts = this.shapes[s];

			if(ts.objtype === 'shape'){
				reshapes.push(new Shape(clone(ts, 'Glyph.flattenGlyph')));

			} else if (ts.objtype === 'componentinstance'){
				tg = ts.getTransformedGlyph();
				tg = tg.flattenGlyph();
				reshapes = reshapes.concat(tg.shapes);
			} else {
				// debug('\n Glyph.flattenGlyph - ERROR - none shape or ci in shapes array');
			}
		}

		this.shapes = reshapes;
		// this.calcGlyphMaxes();

		return this;
	};

	Glyph.prototype.combineAllShapes = function(donttoast, dontresolveoverlaps) {
		// debug('\n Glyph.combineAllShapes - START - ' + this.name);

		this.flattenGlyph();

		var cs = combineShapes(this.shapes, donttoast, dontresolveoverlaps);

		if(cs){
			// debug('\t new shapes');

			this.shapes = cs;
			// debug(this.shapes);

			this.changed();

		}
		// debug(this.name + ' \t\t ' + this.shapes.length);

		// debug(' Glyph.combineAllShapes - END - ' + this.name + '\n');
		return this;
	};

	Glyph.prototype.resolveOverlapsForAllShapes = function() {

		var newshapes = [];

		for(var ts=0; ts<this.shapes.length; ts++){
			newshapes = newshapes.concat(this.shapes[ts].resolveSelfOverlaps());
		}

		this.shapes = newshapes;

		this.changed();
	};


//-------------------------------------------------------
// METHODS
//-------------------------------------------------------

	Glyph.prototype.changed = function(descend, ascend) {
		this.cache = {};

		if(ascend){
			for(var g=0; g<this.usedin.length; g++){
				getGlyph(this.usedin[g]).changed(descend, ascend);
			}
		}

		if(descend){
			for(var s=0; s<this.shapes.length; s++) this.shapes[s].changed(descend, ascend);
		}

		this.calcGlyphMaxes();
	};

	Glyph.prototype.map = function(indents) {
		indents = indents || '   ';
		var re = (indents + 'GLYPH ' + this.name + '\n');
		var ts;

		for(var s=0; s < this.shapes.length; s++){
			ts = this.shapes[s];
			if(ts.objtype === 'shape'){
				re += (indents + '-' + s + '-' + ts.name + ' ' + json(ts.path.maxes, true) + '\n');

			} else if(ts.objtype === 'componentinstance'){
				re += (indents+ '~' + s + '~' + ts.name + '\n');
				re += getGlyph(ts.link).map(indents + '   ');
			}
		}

		return re;
	};

	Glyph.prototype.copyShapesTo = function(destinationID, copyGlyphAttributes, selectNewShapes) {
		// debug('\n Glyph.copyShapesTo - START');

		copyGlyphAttributes = copyGlyphAttributes || { srcAutoWidth: false, srcWidth: false, srcLSB: false, srcRSB: false};
		selectNewShapes = selectNewShapes || false;
		var destinationGlyph = getGlyph(destinationID, true);
		var tc;

		if(selectNewShapes) _UI.ms.shapes.clear();
		
		for(var c=0; c<this.shapes.length; c++){
			tc = this.shapes[c];
			if(tc.objtype === 'componentinstance'){
				addToUsedIn(tc.link, destinationID);
				tc = new ComponentInstance(clone(tc, 'Glyph.copyShapesTo'));
			} else if(tc.objtype === 'shape'){
				tc = new Shape(clone(tc, 'Glyph.copyShapesTo'));
			}

			destinationGlyph.shapes.push(tc);
			if(selectNewShapes) _UI.ms.shapes.add(tc);
		}

		if(copyGlyphAttributes.srcAutoWidth) destinationGlyph.isautowide = this.isautowide;
		if(copyGlyphAttributes.srcWidth) destinationGlyph.glyphwidth = this.glyphwidth;
		if(copyGlyphAttributes.srcLSB) destinationGlyph.leftsidebearing = this.leftsidebearing;
		if(copyGlyphAttributes.srcRSB) destinationGlyph.rightsidebearing = this.rightsidebearing;

		if(!selectNewShapes) showToast('Copied ' + this.shapes.length + ' shapes');
		destinationGlyph.changed();

		// debug('\t new shapes');
		// debug(destinationGlyph.shapes);
		// debug(' Glyph.copyShapesTo - END\n');
	};

	Glyph.prototype.isHere = function(x, y) {
		for(var s=0; s < this.shapes.length; s++){
			if(this.shapes[s].isHere(x, y)) return true;
		}

		return false;
	};

	Glyph.prototype.hasShapes = function() {
		var tg;
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance') return true;
			else {
				tg = this.shapes[s].getTransformedGlyph();
				if(tg.hasShapes()) return true;
			}
		}

		return false;
	};

	Glyph.prototype.removeShapesWithZeroLengthPaths = function() {
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].path && this.shapes[s].path.pathpoints.length === 0){
				this.shapes.splice(s, 1);
				s--;
			}
		}
	};

	Glyph.prototype.getPathPoints = function() {
		var points = [];
		this.shapes.forEach(function(shape, i) {
			points = points.concat(shape.path.pathpoints);
		});
		return points;
	};

	Glyph.prototype.getShapes = function() {
		return this.shapes;
	};

	Glyph.prototype.roundAll = function(precision) {
		for(var s=0; s<this.shapes.length; s++){
			this.shapes[s].roundAll(precision);
		}

		this.changed();
	};


//-------------------------------------------------------
// GLYPH FUNCTIONS
//-------------------------------------------------------

	// GET
	function getGlyph(id, create) {
		// debug('\n getGlyph - START');
		// debug('\t passed: ' + id + ' create: ' + create);

		if(!id){
			// debug('\t Not passed an ID, returning false');
			return false;
		}

		if(_GP === {}){
			// debug('\t _GP is uninitialized, returning false');
			return false;
		}

		id = ''+id;
		var rechar;

		if (id.indexOf('0x', 2) > -1){
			rechar = _GP.ligatures[id];
			// debug('\t retrieved ' + rechar + ' from ligatures.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new ligature.');
				_GP.ligatures[id] = new Glyph({'glyphhex':id});
				return _GP.ligatures[id];
			}
		} else if(id.indexOf('0x') > -1){
			rechar = _GP.glyphs[id];
			// debug('\t retrieved ' + rechar + ' from glyphs.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new char.');
				_GP.glyphs[id] = new Glyph({'glyphhex':id});
				return _GP.glyphs[id];
			}
		} else {
			// debug('\t component, retrieved');
			// debug(_GP.components[id]);
			return _GP.components[id] || false;
		}

		// debug('getGlyph - returning FALSE\n');
		return false;
	}

	function getGlyphType(id) {
		if (id.indexOf('0x', 2) > -1) return 'ligature';
		else if(id.indexOf('0x') > -1) return 'glyph';
		else return 'component';
	}

	function getGlyphName(ch) {
		ch = ''+ch;
		// debug('\n getGlyphName');
		// debug('\t passed ' + ch);

		// not passed an id
		if(!ch){
			// debug('\t not passed an ID, returning false');
			return false;
		}

		// known unicode names
		var un = getUnicodeName(ch);
		if(un && un !== '[name not found]'){
			// debug('\t got unicode name: ' + un);
			return escapeXMLValues(un);
		}

		var cobj = getGlyph(ch);
		if(ch.indexOf('0x',2) > -1){
			// ligature
			// debug('\t ligature - returning ' + hexToHTML(ch));
			return escapeXMLValues(cobj.name) || hexToHTML(ch);
		} else {
			// Component
			// debug('getGlyphName - inexplicably fails, returning [name not found]\n');
			return escapeXMLValues(cobj.name) || '[name not found]';
		}

		// debug(' getGlyphName - returning nothing - END\n');
	}

	function getFirstGlyphID() {
		if(_GP.glyphs['0x0041']) return '0x0041';
		else return getFirstID(_GP.glyphs);
	}

	// GET SELECTED
	function getSelectedGlyphLeftSideBearing(){
		//debug('getSelectedGlyphLeftSideBearing');
		var sc = getSelectedWorkItem();
		if(!sc) return 0;
		if(sc.objtype === 'component') return 0;
		if(!sc.isautowide) return 0;
		if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
		return sc.leftsidebearing !== false? sc.leftsidebearing : _GP.projectsettings.defaultlsb;
	}

	function getSelectedGlyphRightSideBearing(){
		//debug('getSelectedGlyphLeftSideBearing');
		var sc = getSelectedWorkItem();
		if(!sc) return 0;
		if(sc.objtype === 'component') return 0;
		if(!sc.isautowide) return 0;
		if(sc.rightsidebearing === true) sc.rightsidebearing = _GP.projectsettings.defaultrsb;
		return sc.rightsidebearing !== false? sc.rightsidebearing : _GP.projectsettings.defaultrsb;
	}

	function updateCurrentGlyphWidth() {
		var sc = getSelectedWorkItem();
		if(!sc) return;
		if(_UI.current_page === 'glyph edit'){
			sc.changed();
		} else if (_UI.current_page === 'components' && sc) {
			var lsarr = sc.usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) getGlyph(lsarr[c]).changed();
		}
	}

	// Delete
	function deleteGlyph(id) {
		// debug('\n deleteGlyph');
		// debug('\t passed: ' + id);

		if(!id){
			// debug('\t Not passed an ID, returning false');
			return false;
		}

		if(_GP === {}){
			// debug('\t _GP is uninitialized, returning false');
			return false;
		}

		id = ''+id;
		
		if(_GP.glyphs[id]){
			_GP.glyphs[id].deleteLinks(id);
			delete _GP.glyphs[id];
			// debug(`\t deleted glyph, it is now:`);
			// debug(_GP.glyphs[id]);
			return true;

		} 
		
		return false;
	}
// end of file