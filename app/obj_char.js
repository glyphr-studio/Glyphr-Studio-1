
//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){

		if(oa.charname === "LATIN SMALL LETTER X") {
			_UI.pathdebugging = true;
			// debug("IMPORTING CHAR X: oa ");
			// debug(oa.charshapes);
		}

		this.objtype = 'char';

		this.charname = oa.charname || "ERROR_CHARNAME";
		this.charhtml = oa.charhtml || "ERROR_CHARHTML";
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.advancewidth = isval(oa.advancewidth)? oa.advancewidth : 0;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || {
			'xmax': 0,
			'xmin': 999999,
			'ymax': 0,
			'ymin': 999999
		};

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
		/*
		if(oa.charname === "LATIN SMALL LETTER X") {
			_UI.pathdebugging = false;
			debug("IMPORTING CHAR X: result");
			debug(this.charshapes);
		}
		*/
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
		this.maxes = {
			"xmax": -999999,
			"xmin": 999999,
			"ymax": -999999,
			"ymin": 999999
		};

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

	Char.prototype.setCharPosition = function(nx, ny, force){
		var dx = nx? (nx - this.maxes.xmin) : 0;
		var dy = ny? (ny - this.maxes.ymax) : 0;
		this.updateCharPosition(dx, dy, force);
	};

	Char.prototype.updateCharPosition = function(dx, dy, force){
		var cs = this.charshapes;
		for(var i=0; i<cs.length; i++){
			cs[i].path.updatePathPosition(dx, dy, force);
		}
		this.calcCharMaxes();
	};

	Char.prototype.setCharSize = function(nw, nh, ratiolock){
		//debug("UPDATECHARSIZE - nw/nh/ra: " + nw + " " + nh + " " + ratiolock);
		//debug("\t maxes: " + json(this.maxes));
		var dw = nw? (nw - (this.maxes.xmax - this.maxes.xmin)) : 0;
		var dh = nh? (nh - (this.maxes.ymax - this.maxes.ymin)) : 0;
		this.updateCharSize(dw, dh, ratiolock);
	};

	Char.prototype.updateCharSize = function(dw, dh, ratiolock){
		//debug("UPDATECHARSIZE - dw/dh/ra: " + dw + " " + dh + " " + ratiolock);

		if(ratiolock){
			if(Math.abs(dh) > Math.abs(dw)) dw = dh;
			else dh = dw;
		}

		var oldw = this.maxes.xmax - this.maxes.xmin;
		var oldh = this.maxes.ymax - this.maxes.ymin;
		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);
		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		var cs = this.charshapes;
		var tp, pnw, pnh, pnx, pny;
		for(var i=0; i<cs.length; i++){
			tp = cs[i].path;

			// move
			pnx = (ratiodw * (tp.maxes.xmin - this.maxes.xmin)) + this.maxes.xmin;
			pny = (ratiodh * (tp.maxes.ymin - this.maxes.ymin)) + this.maxes.ymin;
			tp.setPathPosition(pnx, pny, true);

			// scale
			pnw = ((tp.maxes.xmax - tp.maxes.xmin)*ratiodw);
			pnh = ((tp.maxes.ymax - tp.maxes.ymin)*ratiodh);
			tp.setPathSize(pnw, pnh, ratiolock);
		}

		this.calcCharMaxes();
	};


//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------


	// GET
	function getChar(ch, create) {
		//debug("GETCHAR - passed " + ch + " - force create? " + create);
		if((''+ch).indexOf('id') >= 0){
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
		//debug("GETCHARNAME - for " + ch);
		if((''+ch).indexOf('id') >= 0){
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
