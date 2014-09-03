// start of file

//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){

		this.objtype = 'char';

		this.charname = oa.charname || "ERROR_CHARNAME";
		this.charhtml = oa.charhtml || "ERROR_CHARHTML";
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.advancewidth = isval(oa.advancewidth)? oa.advancewidth : 0;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || clone(_UI.mins);

		//this.hints = oa.hints || {};
		//this.counters = oa.counters || {};
		this.charshapes = [];
		var lc = 0;
		var cs = 0;
		if(oa.charshapes && oa.charshapes.length){
			for(var i=0; i<oa.charshapes.length; i++) {
				if(oa.charshapes[i].link){
					//debug("CHAR - hydrating " + oa.charshapes[i].name);
					this.charshapes[i] = new LinkedShapeInstance(oa.charshapes[i]);
					lc++;
				} else {
					//debug("CHAR - hydrating " + oa.charshapes[i].name);
					this.charshapes[i] = new Shape(oa.charshapes[i]);
					cs++;
				}
			}
		}

		this.calcCharMaxes();

		//debug("CHAR - finished " + this.charname + "\tlinks:" + lc + "\tshapes:" + cs);

		// if(oa.charname === "LATIN SMALL LETTER X") {
		//	_UI.pathdebugging = false;
		//	debug("IMPORTING CHAR X: result");
		//	debug(this.charshapes);
		// }

	}



//-------------------------------------------------------
// CHAR METHODS
//-------------------------------------------------------
/*
	getCmapCode
	getHTMLCode
*/

	Char.prototype.calcCharMaxes = function(){
		//debug("CALCCHARMAXES - this char\n"+json(this));

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
				"xmax": 0,
				"xmin": 0,
				"ymax": 0,
				"ymin": 0
			};
		}

		this.calcCharAdvanceWidth();
	};

	Char.prototype.calcCharAdvanceWidth = function(){
		if(!this.isautowide) return;
		this.advancewidth = Math.max(this.maxes.xmax, 0);
	};

	Char.prototype.drawCharToArea = function(lctx, view){
		var ps = _GP.projectsettings;
		var sl = this.charshapes;

		//debug("DRAWCHARTOAREA - starting " + this.charname);

		var width = (this.advancewidth*view.dz);
		if(this.isautowide){
			//debug("---------------- for " + this.charname + " isautowide=false, adding left side bearing width " + (ps.defaultlsb*view.dz) + " to width " + width);
			if(this.leftsidebearing === false){
				width += (ps.defaultlsb * view.dz);
			} else {
				width += (this.leftsidebearing * view.dz);
			}
		}

		var sh = {};
		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			if(sh.visible) {
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
						//debug("DRAWCHARTOAREA - uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
					} else {
						var ns = clone(_GP.linkedshapes[sh.link].shape);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape before\n" + JSON.stringify(ns));
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
						sh = ns;
					}
				}
				//debug("DRAWCHARTOAREA - drawing path of char " + this.charname);
				sh.path.drawPathToArea(lctx, view);
			}
		}
		lctx.fillStyle = _GP.projectsettings.color_glyphfill;
		lctx.closePath();
		lctx.fill("nonzero");

		return width;
	};

	Char.prototype.makeSVG = function(size, gutter) {
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var upm = _GP.projectsettings.upm;
		var desc = upm - _GP.projectsettings.ascent;
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * upm;
		var vbsize = upm - (gutter*2);
		var sl = this.charshapes;
		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(upm-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(upm-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="';

		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			if(sh.visible) {
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
						//debug("DRAWCHARTOAREA - uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
					} else {
						var ns = clone(_GP.linkedshapes[sh.link].shape);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape before\n" + JSON.stringify(ns));
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						//debug("DRAWCHARTOAREA - !uselinkedshapexy, shape afters\n" + JSON.stringify(sh));
						sh = ns;
					}
				}
				//debug("DRAWCHARTOAREA - drawing path of char " + this.charname);
				re += sh.path.makeSVGpathData('Char ' + this.name + ' Shape ' + sh.name);
				if(j < sl.length-1) re += '\n';
			}
		}

		re += '"/>';
		re += '</g>';
		re += '</svg>';

		return re;
	};

	Char.prototype.setCharPosition = function(nx, ny, force){
		debug("SETCHARPOSITION nx/ny/force: " + nx + " " + ny + " " + force);
		var dx = (nx)? (nx - this.maxes.xmin) : 0;
		var dy = (ny)? (ny - this.maxes.ymax) : 0;
		this.updateCharPosition(dx, dy, force);
	};

	Char.prototype.updateCharPosition = function(dx, dy, force){
		debug("UPDATECHARPOSITION dx/dy/force: " + dx + " " + dy + " " + force);
		var cs = this.charshapes;
		for(var i=0; i<cs.length; i++){
			if(!this.charshapes[i].link){
				cs[i].path.updatePathPosition(dx, dy, force);
			}
		}
		this.calcCharMaxes();
	};

	Char.prototype.setCharSize = function(nw, nh, ratiolock){
		debug("SET CHARSIZE ---- nw/nh/ra:\t" + nw + "\t " + nh + "\t " + ratiolock);
		debug("\t maxes: " + json(this.maxes));
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
		debug("UPDATE CHARSIZE - dw/dh/ra:\t" + dw + "\t " + dh + "\t " + ratiolock);

		var oldw = this.maxes.xmax - this.maxes.xmin;
		var oldh = this.maxes.ymax - this.maxes.ymin;
		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		debug("\tadj dh/dw:\t" + dh + "\t " + dw);
		debug("\told h/w:\t" + oldh + "\t " + oldw);
		debug("\tnew h/w:\t" + newh + "\t " + neww);
		debug("\tratio dh/dw:\t" + ratiodh + "\t " + ratiodw);

		var cs = this.charshapes;
		var tp, pnw, pnh, pnx, pny;
		for(var i=0; i<cs.length; i++){
			if(!cs[i].link){
				tp = cs[i].path;
				debug("\t\tpath " + i + " before h/w " + (tp.maxes.ymax - tp.maxes.ymin) + " " + (tp.maxes.xmax - tp.maxes.xmin));

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

				debug("\t\tpath " + i + " afters h/w " + (tp.maxes.ymax - tp.maxes.ymin) + " " + (tp.maxes.xmax - tp.maxes.xmin));
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

	Char.prototype.sendShapesTo = function(otherchar) {
		var destination = getChar(otherchar, true);
		destination.charshapes = destination.charshapes.concat(this.charshapes);
		destination.calcCharMaxes();
	};


//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------


	// GET
	function getChar(ch, create) {
		ch = ''+ch;
		//debug("GETCHAR - passed " + ch + " - force create? " + create);
		if(ch.indexOf('id') >= 0){
			return _GP.linkedshapes[ch];
		} else {
			var rechar = _GP.fontchars[ch];
			//debug("GETCHAR - retrieved " + rechar + " from fontchars.");
			if(rechar){
				return rechar;
			} else if(create){
				//debug("GETCHAR - create was true, returning a new char.");
				_GP.fontchars[ch] = new Char({"charname":getCharName(ch), "charhtml":hexToHTML(ch)});
				return _GP.fontchars[ch];
			}
		}
		return false;
	}

	function getCharName(ch) {
		ch = ''+ch;
		//debug("GETCHARNAME - for " + ch);
		if(ch.indexOf('id') >= 0){
			return _GP.linkedshapes[ch].shape.name;
		} else {
			var re = _UI.unicodenames[ch];
			return re || "[not a character]";
		}
	}

	// GET SELECTED
	function getSelectedChar(){
		//debug("GETSELECTEDCHAR");
		if(_UI.navhere === 'linked shapes') return getChar(_UI.shownlinkedshape);
		else return getChar(_UI.selectedchar, true);
	}

	function getSelectedCharID(){
		//debug("GETSELECTEDCHARID");
		if(_UI.navhere === 'linked shapes') return _UI.shownlinkedshape;
		else return _UI.selectedchar;
	}

	function getSelectedCharName() {
		//debug("GETSELECTEDCHARNAME - _UI.selectedchar: " + _UI.selectedchar);
		if(_UI.navhere === 'linked shapes') return getCharName(_UI.shownlinkedshape);
		else return getCharName(_UI.selectedchar);
	}

	function getSelectedCharShapes(){
		//debug("GETSELECTEDCHARSHAPES");
		var rechar = getSelectedChar();
		if(rechar.objtype === 'linkedshape') return [rechar];
		return rechar? rechar.charshapes : [];
	}

	function getSelectedCharLeftSideBearing(){
		//debug("getSelectedCharLeftSideBearing");
		var sc = getSelectedChar();
		if(!sc) return 0;
		if(sc.objtype === 'linkedshape') return 0;
		return sc.leftsidebearing || _GP.projectsettings.defaultlsb;
	}

	function selectChar(c, dontnavigate){
		//debug("SELECTCHAR - selecting " + getChar(c, true).charname + " from value " + c);

		_UI.selectedchar = c;
		_UI.selectedshape = -1;

		//debug("SELECTCHAR: shapelayers is now " + JSON.stringify(getSelectedCharShapes()));
		if(!dontnavigate){
			//debug("SELECTCHAR: selecting " + _GP.fontchars[c].charhtml + " and navigating.");
			navigate('npAttributes');
		}
	}

	function updateCurrentCharWidth() {
		if(_UI.navhere == 'character edit'){
			getSelectedChar().calcCharMaxes();
		} else if (_UI.navhere == 'linked shapes' && _GP.linkedshapes[_UI.shownlinkedshape]) {
			var lsarr = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) _GP.fontchars[lsarr[c]].calcCharMaxes();
		}
	}

// end of file