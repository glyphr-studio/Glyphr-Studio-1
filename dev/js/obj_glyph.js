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

		this.name = oa.name || getGlyphName(oa.glyphhex) || false;
		this.glyphhtml = oa.glyphhtml || hexToHTML(oa.glyphhex) || false;
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.glyphwidth = isval(oa.glyphwidth)? oa.glyphwidth : 0;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.rightsidebearing = isval(oa.rightsidebearing)? oa.rightsidebearing : false;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || clone(_UI.mins);
		this.shapes = oa.shapes || [];
		this.usedin = oa.usedin || [];

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
		// debug('SETGLYPHPOSITION nx/ny/force: ' + nx + ' ' + ny + ' ' + force);
		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);
		var dx = (nx)? (nx - this.maxes.xmin) : 0;
		var dy = (ny)? (ny - this.maxes.ymax) : 0;
		this.updateGlyphPosition(dx, dy, force);
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
		if(nw !== false) nw = parseFloat(nw);
		if(nh !== false) nh = parseFloat(nh);
		var ch = (this.maxes.ymax - this.maxes.ymin);
		var cw = (this.maxes.xmax - this.maxes.xmin);
		var dw = (nw)? (nw - cw) : 0;
		var dh = (nh)? (nh - ch) : 0;

		if(ratiolock){
			if(Math.abs(nh) > Math.abs(nw)) dw = (cw*(nh/ch)) - cw;
			else dh = (ch*(nw/cw)) - ch;
		}
		this.updateGlyphSize(dw, dh, false);
	};

	Glyph.prototype.updateGlyphSize = function(dw, dh, ratiolock){
		// debug('\n Glyph.updateGlyphSize - START ' + this.name);
		// debug('\t number of shapes: ' + this.shapes.length);
		// debug('\t dw dh rl:\t' + dw + '/' + dh + '/' + ratiolock);

		if(dw !== false) dw = parseFloat(dw) || 0;
		if(dh !== false) dh = parseFloat(dh) || 0;
		// debug('\t adjust dw/dh:\t' + dw + '/' + dh);

		var oldw = this.maxes.xmax - this.maxes.xmin;
		var oldh = this.maxes.ymax - this.maxes.ymin;

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

		// debug('\t Before Maxes ' + json(this.maxes, true));
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
			s.updateShapeSize(sdw, sdh, false);

			// move
			oldsx = smaxes.xmin - this.maxes.xmin;
			newsx = oldsx * ratiodw;
			if(ratiodw === 0) sdx = false;
			else sdx = newsx - oldsx;

			oldsy = smaxes.ymin - this.maxes.ymin;
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
		mid = mid || ((this.maxes.xmax - this.maxes.xmin) / 2) + this.maxes.xmin;
		// debug('\t mid = ' + mid);
		// debug('\t maxes = ' + json(this.maxes, true));
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipEW(mid);
		}

		this.changed();
		// debug('\t maxes = ' + json(this.maxes, true));
	};

	Glyph.prototype.flipNS = function(mid){
		mid = mid || ((this.maxes.ymax - this.maxes.ymin) / 2) + this.maxes.ymin;
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipNS(mid);
		}

		this.changed();
	};

	Glyph.prototype.rotate = function(angle, about) {
		about = about || this.getCenter();

		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].rotate(angle, about);
		}

		this.changed();
	};

	Glyph.prototype.reverseWinding = function() {
		for(var s=0; s<this.shapes.length; s++){
			this.shapes[s].reverseWinding();
		}

		this.changed();
	};



//-------------------------------------------------------
// GETTERS
//-------------------------------------------------------
	Glyph.prototype.getName = function() { return this.name; };

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

		this.maxes = clone(_UI.mins);
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
		return clone(this.maxes);
	};

	Glyph.prototype.calcGlyphWidth = function(){
		if(!this.isautowide) return;
		this.glyphwidth = Math.max(this.maxes.xmax, 0);
	};

	Glyph.prototype.getTotalWidth = function() {
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

		// debug('\t returning ' + json(this.maxes));
		// debug(' Glyph.getMaxes - END ' + this.name + '\n');
		return clone(this.maxes);
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
	Glyph.prototype.drawGlyph = function(lctx, view, alpha){
		// debug('\n Glyph.drawGlyph - START ' + this.name);
		// debug('\t view ' + json(view, true));

		var sl = this.shapes;
		var shape, drewshape;
		alpha = alpha || 1;

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

		lctx.fillStyle = _GP.projectsettings.colors.glyphfill;
		lctx.globalAlpha = alpha;
		lctx.closePath();
		lctx.fill('nonzero');

		lctx.globalAlpha = 1.0;

		// debug(' Glyph.drawGlyph - END ' + this.name + '\n');
		return (this.getTotalWidth()*view.dz);
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
					if(tg) pathdata += tg.getSVGpathData();
				} else {
					path = shape.getPath();
					path.updatePathPosition(lsb, 0, true);
					pathdata += path.getSVGpathData('Glyph ' + this.name + ' Shape ' + shape.name);
					if(j < sl.length-1) pathdata += ' ';
				}
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

	Glyph.prototype.flattenGlyph = function() {
		var reshapes = [];
		var ts, tg;

		for(var s=0; s<this.shapes.length; s++){
			ts = this.shapes[s];

			if(ts.objtype === 'shape'){
				reshapes.push(clone(ts));

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

	Glyph.prototype.sendShapesTo = function(chid) {
		var destination = getGlyph(chid, true);
		destination.shapes = clone(destination.shapes.concat(this.shapes));
		destination.calcGlyphMaxes();
		for(var c=0; c<this.shapes.length; c++){
			if(this.shapes[c].objtype === 'componentinstance') addToUsedIn(this.shapes[c].link, chid);
		}
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
			return un;
		}

		var cobj = getGlyph(ch);
		if(ch.indexOf('0x',2) > -1){
			// ligature
			// debug('\t ligature - returning ' + hexToHTML(ch));
			return cobj.name || hexToHTML(ch);
		} else {
			// Component
			// debug('getGlyphName - inexplicably fails, returning [name not found]\n');
			return cobj.name || '[name not found]';
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
		return sc.leftsidebearing || _GP.projectsettings.defaultlsb;
	}

	function getSelectedGlyphRightSideBearing(){
		//debug('getSelectedGlyphLeftSideBearing');
		var sc = getSelectedWorkItem();
		if(!sc) return 0;
		if(sc.objtype === 'component') return 0;
		if(!sc.isautowide) return 0;
		return sc.rightsidebearing || _GP.projectsettings.defaultrsb;
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

// end of file