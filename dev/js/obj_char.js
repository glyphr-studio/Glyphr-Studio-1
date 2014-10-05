// start of file

//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){

		this.objtype = 'char';

		this.charname = oa.charname || getCharName(oa.charhex) || 'ERROR_CHARNAME';
		this.charhtml = oa.charhtml || hexToHTML(oa.charhex) || 'ERROR_CHARHTML';
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.charwidth = isval(oa.charwidth)? oa.charwidth : 0;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.rightsidebearing = isval(oa.rightsidebearing)? oa.rightsidebearing : false;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || clone(_UI.mins);
		this.charshapes = [];

		var lc = 0;
		var cs = 0;
		if(oa.charshapes && oa.charshapes.length){
			for(var i=0; i<oa.charshapes.length; i++) {
				if(oa.charshapes[i].link){
					//debug('CHAR - hydrating ' + oa.charshapes[i].name);
					this.charshapes[i] = new LinkedShapeInstance(oa.charshapes[i]);
					lc++;
				} else {
					//debug('CHAR - hydrating ' + oa.charshapes[i].name);
					this.charshapes[i] = new Shape(oa.charshapes[i]);
					cs++;
				}
			}
		}

		this.calcCharMaxes();
	}



//-------------------------------------------------------
// CHAR METHODS
//-------------------------------------------------------
/*
	getCmapCode
	getHTMLCode
*/

	Char.prototype.calcCharMaxes = function(){
		//debug('CALCCHARMAXES - this char\n'+json(this));

		var sh, tss, txmax, txmin, tymax, tymin;
		this.maxes = clone(_UI.mins);

		if(this.charshapes.length > 0){
			for(var jj=0; jj<this.charshapes.length; jj++) {
				sh = this.charshapes[jj];

				if(sh.link){
					// Linked Shape
					tss = _GP.linkedshapes[sh.link].shape;
					if(sh.uselinkedshapexy) {
						txmax = tss.path.maxes.xmax;
						txmin = tss.path.maxes.xmin;
						tymax = tss.path.maxes.ymax;
						tymin = tss.path.maxes.ymin;
					} else {
						txmax = (tss.path.maxes.xmax + sh.xpos);
						txmin = (tss.path.maxes.xmin + sh.xpos);
						tymax = (tss.path.maxes.ymax + sh.ypos);
						tymin = (tss.path.maxes.ymin + sh.ypos);
					}
				} else {
					// Regular Shape
					txmax = sh.path.maxes.xmax;
					txmin = sh.path.maxes.xmin;
					tymax = sh.path.maxes.ymax;
					tymin = sh.path.maxes.ymin;
				}

				this.maxes.xmax = Math.max(txmax, this.maxes.xmax);
				this.maxes.xmin = Math.min(txmin, this.maxes.xmin);
				this.maxes.ymax = Math.max(tymax, this.maxes.ymax);
				this.maxes.ymin = Math.min(tymin, this.maxes.ymin);
			}
		} else {
			this.maxes = {
				'xmax': 0,
				'xmin': 0,
				'ymax': 0,
				'ymin': 0
			};
		}

		this.calcCharWidth();
	};

	Char.prototype.calcCharWidth = function(){
		if(!this.isautowide) return;
		this.charwidth = Math.max(this.maxes.xmax, 0);
	};

	Char.prototype.getTotalWidth = function() {
		this.calcCharWidth();
		return this.charwidth + this.getLSB() + this.getRSB();
	};

	Char.prototype.getLSB = function() {
		if(this.leftsidebearing === false) return _GP.projectsettings.defaultlsb;
		else return this.leftsidebearing;
	};

	Char.prototype.getRSB = function() {
		if(this.rightsidebearing === false) return _GP.projectsettings.defaultrsb;
		else return this.rightsidebearing;
	};

	Char.prototype.drawCharToArea = function(lctx, view, uselsb){
		// debug('\n Char.drawCharToArea - START');
		// debug('\t ' + this.charname);
		var sl = this.charshapes;
		var sh = {};
		var lsb = uselsb ? this.getLSB() : 0;
		// debug('\t uselsb: ' + uselsb + ' calculated lsb: ' + lsb);

		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			if(sh.visible) {
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
						// debug('\t uselinkedshapexy, shape afters\n' + JSON.stringify(sh));
					} else {
						var ns = clone(_GP.linkedshapes[sh.link].shape);
						// debug('\t !uselinkedshapexy, shape before\n' + JSON.stringify(ns));
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						// debug('\t !uselinkedshapexy, shape afters\n' + JSON.stringify(sh));
						sh = ns;
					}
				}
				// debug('\t drawing path of char ' + this.charname);
				sh.path.drawPathToArea(lctx, view, lsb);
			}
		}
		lctx.fillStyle = _GP.projectsettings.colors.glyphfill;
		lctx.closePath();
		lctx.fill('nonzero');

		// debug('Char.drawCharToArea - END\n');
		return (this.getTotalWidth()*view.dz);
	};

	Char.prototype.makeSVG = function(size, gutter) {
		// debug('\n Char.makeSVG - START');
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var upm = _GP.projectsettings.upm;
		var desc = upm - _GP.projectsettings.ascent;
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * upm;
		var vbsize = upm - (gutter*2);
		var sl = this.charshapes;
		var pathdata = '';

		// debug('\t sl.length = ' + sl.length);

		// Make Pathdata
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			// debug('\t loop ' + j);
			if(sh.visible) {
				// debug('\t\t is visible');
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
						//debug('\t uselinkedshapexy, shape afters\n' + JSON.stringify(sh));
					} else {
						var ns = clone(_GP.linkedshapes[sh.link].shape);
						//debug('\t !uselinkedshapexy, shape before\n' + JSON.stringify(ns));
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						//debug('\t !uselinkedshapexy, shape afters\n' + JSON.stringify(sh));
						sh = ns;
					}
				}
				//debug('\t making SVG of char ' + this.charname);
				pathdata += sh.path.makeSVGpathData('Char ' + this.name + ' Shape ' + sh.name);
				if(j < sl.length-1) pathdata += '\n';
			}
		}
		if(trim(pathdata) === '') pathdata = 'M0,0Z';

		// debug('\t pathdata = ' + pathdata);

		// Assemble SVG
		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(upm-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(upm-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="' + pathdata + '"/>';
		re += '</g>';
		re += '</svg>';

		// debug(' Char.makeSVG - END\n');

		return re;
	};

	Char.prototype.setCharPosition = function(nx, ny, force){
		// debug('SETCHARPOSITION nx/ny/force: ' + nx + ' ' + ny + ' ' + force);
		var dx = (nx)? (nx - this.maxes.xmin) : 0;
		var dy = (ny)? (ny - this.maxes.ymax) : 0;
		this.updateCharPosition(dx, dy, force);
	};

	Char.prototype.updateCharPosition = function(dx, dy, force){
		// debug('UPDATECHARPOSITION dx/dy/force: ' + dx + ' ' + dy + ' ' + force);
		var cs = this.charshapes;
		for(var i=0; i<cs.length; i++){
			if(!this.charshapes[i].link){
				cs[i].path.updatePathPosition(dx, dy, force);
			}
		}
		this.calcCharMaxes();
	};

	Char.prototype.setCharSize = function(nw, nh, ratiolock){
		// debug('SET CHARSIZE ---- nw/nh/ra:\t' + nw + '\t ' + nh + '\t ' + ratiolock);
		// debug('\t maxes: ' + json(this.maxes));
		var ch = (this.maxes.ymax - this.maxes.ymin);
		var cw = (this.maxes.xmax - this.maxes.xmin);
		var dw = (nw)? (nw - cw) : 0;
		var dh = (nh)? (nh - ch) : 0;

		if(ratiolock){
			if(Math.abs(nh) > Math.abs(nw)) dw = (cw*(nh/ch)) - cw;
			else dh = (ch*(nw/cw)) - ch;
		}
		this.updateCharSize(dw, dh, false);
	};

	Char.prototype.updateCharSize = function(dw, dh, ratiolock){
		// debug('UPDATE CHARSIZE - dw/dh/ra:\t' + dw + '\t ' + dh + '\t ' + ratiolock);

		var oldw = this.maxes.xmax - this.maxes.xmin;
		var oldh = this.maxes.ymax - this.maxes.ymin;
		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		// debug('\tadj dh/dw:\t' + dh + '\t ' + dw);
		// debug('\told h/w:\t' + oldh + '\t ' + oldw);
		// debug('\tnew h/w:\t' + newh + '\t ' + neww);
		// debug('\tratio dh/dw:\t' + ratiodh + '\t ' + ratiodw);

		var cs = this.charshapes;
		var tp, pnw, pnh, pnx, pny;
		for(var i=0; i<cs.length; i++){
			if(!cs[i].link){
				tp = cs[i].path;
				// debug('\t\tpath ' + i + ' before h/w ' + (tp.maxes.ymax - tp.maxes.ymin) + ' ' + (tp.maxes.xmax - tp.maxes.xmin));

				// scale
				if(dw === 0) pnw = false;
				else pnw = ((tp.maxes.xmax - tp.maxes.xmin)*ratiodw);
				if(dh === 0) pnh = false;
				else pnh = ((tp.maxes.ymax - tp.maxes.ymin)*ratiodh);

				tp.setPathSize(pnw, pnh, ratiolock);

				// move
				if(dw === 0) pnx = false;
				else pnx = (ratiodw * (tp.maxes.xmin - this.maxes.xmin)) + this.maxes.xmin;
				if(dh === 0) pny = false;
				else pny = (ratiodh * (tp.maxes.ymin - this.maxes.ymin)) + this.maxes.ymin + (tp.maxes.ymax - tp.maxes.ymin);

				tp.setPathPosition(pnx, pny, true);

				// debug('\t\tpath ' + i + ' afters h/w ' + (tp.maxes.ymax - tp.maxes.ymin) + ' ' + (tp.maxes.xmax - tp.maxes.xmin));
			}
		}

		this.calcCharMaxes();
	};

	Char.prototype.flipEW = function(){
		var mid = ((this.maxes.xmax - this.maxes.xmin) / 2) + this.maxes.xmin;
		for(var s=0; s < this.charshapes.length; s++){
			if(!this.charshapes[s].link){
				this.charshapes[s].path.flipEW(mid);
			}
		}
	};

	Char.prototype.flipNS = function(){
		var mid = ((this.maxes.ymax - this.maxes.ymin) / 2) + this.maxes.ymin;
		for(var s=0; s < this.charshapes.length; s++){
			if(!this.charshapes[s].link){
				this.charshapes[s].path.flipNS(mid);
			}
		}
	};

	Char.prototype.sendShapesTo = function(chid) {
		var destination = getChar(chid, true);
		destination.charshapes = clone(destination.charshapes.concat(this.charshapes));
		destination.calcCharMaxes();
	};


//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------


	// GET
	function getChar(ch, create) {
		// debug('\n getChar - START');
		// debug('\t passed ' + ch);
		// debug('\t force create? ' + create);

		if(!ch){
			// debug('getChar - not passed an ID, returning false');
			return false;
		}

		ch = ''+ch;
		var rechar;

		if (ch.indexOf('0x', 2) > -1){
			rechar = _GP.ligatures[ch];
			// debug('\t retrieved ' + rechar + ' from ligatures.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new ligature.');
				_GP.ligatures[ch] = new Char({'charhex':ch});
				return _GP.ligatures[ch];
			}
		} else if(ch.indexOf('0x') > -1){
			rechar = _GP.fontchars[ch];
			// debug('\t retrieved ' + rechar + ' from fontchars.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new char.');
				_GP.fontchars[ch] = new Char({'charhex':ch});
				return _GP.fontchars[ch];
			}
		} else {
			// debug('\t linked shape, retrieved');
			// debug(_GP.linkedshapes[ch]);
			return _GP.linkedshapes[ch] || false;
		}

		// debug('getChar - returning FALSE\n');
		return false;
	}

	function getCharName(ch) {
		ch = ''+ch;
		// debug('\n getCharName');
		// debug('\t passed ' + ch);

		// not passed an id
		if(!ch){
			// debug('\t not passed an ID, returning false');
			return false;
		}
		
		// known unicode names
		if(getUnicodeName(ch)) return getUnicodeName(ch);

		var cobj = getChar(ch);
		if(cobj && cobj.shape) {
			// linked shape
			// debug('\t linked shape - returning ' + cobj.shape.name);
			return cobj.shape.name;
		} else if(ch.indexOf('0x',2) > -1){
			// ligature
			// debug('\t ligature - returning ' + hexToHTML(ch));
			return hexToHTML(ch);
		} else {
			// debug('getCharName - inexplicably fails, returning [name not found]\n');
			return '[name not found]';
		}
	}

	function getFirstCharID() {
		if(_GP.fontchars['0x0041']) return '0x0041';
		else return getFirstID(_GP.fontchars);
	}

	// GET SELECTED
	function getSelectedChar(){
		// debug('\n getSelectedChar - START');
		// debug('\t selectedchar: ' + _UI.selectedchar);
		var re;
		if(_UI.navhere === 'linked shapes') {
			re = getChar(_UI.selectedlinkedshape);
			// debug('\t case linked shapes, returning ' + re.charname);
			return re;
		} else if (_UI.navhere !== 'kerning'){
			re = getChar(_UI.selectedchar, true);
			// debug('\t case character edit, returning ' + re.charname);
			return re;
		} else {
			return false;
		}
	}

	function getSelectedCharID(){
		//debug('GETSELECTEDCHARID');
		if(_UI.navhere === 'linked shapes') return _UI.selectedlinkedshape;
		else return _UI.selectedchar;
	}

	function getSelectedCharName() {
		//debug('GETSELECTEDCHARNAME - _UI.selectedchar: ' + _UI.selectedchar);
		if(_UI.navhere === 'linked shapes') return getCharName(_UI.selectedlinkedshape);
		else return getCharName(_UI.selectedchar);
	}

	function getSelectedCharShapes(){
		//debug('GETSELECTEDCHARSHAPES');
		var rechar = getSelectedChar();
		if(rechar && rechar.objtype === 'linkedshape') return [rechar.shape];
		return rechar? rechar.charshapes : [];
	}

	function getSelectedCharLeftSideBearing(){
		//debug('getSelectedCharLeftSideBearing');
		var sc = getSelectedChar();
		if(!sc) return 0;
		if(sc.objtype === 'linkedshape') return 0;
		return sc.leftsidebearing || _GP.projectsettings.defaultlsb;
	}

	function getSelectedCharRightSideBearing(){
		//debug('getSelectedCharLeftSideBearing');
		var sc = getSelectedChar();
		if(!sc) return 0;
		if(sc.objtype === 'linkedshape') return 0;
		return sc.rightsidebearing || _GP.projectsettings.defaultrsb;
	}

	function selectChar(c, dontnavigate){
		//debug('SELECTCHAR - selecting ' + getChar(c, true).charname + ' from value ' + c);

		_UI.selectedchar = c;
		_UI.selectedshape = -1;

		//debug('SELECTCHAR: shapelayers is now ' + JSON.stringify(getSelectedCharShapes()));
		if(!dontnavigate){
			//debug('SELECTCHAR: selecting ' + _GP.fontchars[c].charhtml + ' and navigating.');
			navigate('npAttributes');
		}
	}

	function updateCurrentCharWidth() {
		if(_UI.navhere === 'character edit'){
			getSelectedChar().calcCharMaxes();
		} else if (_UI.navhere === 'linked shapes' && _GP.linkedshapes[_UI.selectedlinkedshape]) {
			var lsarr = _GP.linkedshapes[_UI.selectedlinkedshape].usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) getChar(lsarr[c]).calcCharMaxes();
		}
	}

// end of file