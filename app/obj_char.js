
//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){
		this.objtype = 'char';

		this.isautowide = isval(oa.isautowide)? oa.isautowide:true;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing:false;
		this.charwidth = isval(oa.charwidth)? oa.charwidth:0;
		this.charname = oa.charname || "ERROR_CHARNAME";

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

		if(this.isautowide) this.calcCharWidth();
		//debug("CHAR - finished " + this.charname + "\tlinks:" + lc + "\tshapes:" + cs);
	}



//-------------------------------------------------------
// CHAR METHODS
//-------------------------------------------------------
/*
	getCmapCode
	getHTMLCode
*/

	Char.prototype.calcCharMaxes = function(){

		var maxes = {
			"xmax" : this.charwidth,
			"xmin" : 0,
			"ymax" : 0,
			"ymin" : 0
		};
		var sh, tss;

		for(var jj=0; jj<this.charshapes.length; jj++) {
			sh = this.charshapes[jj];
			if(sh.link){
				tss = _GP.linkedshapes[sh.link].shape;
				if(sh.uselinkedshapexy) {
					maxes.xmin = Math.min(tss.path.leftx, maxes.xmin);
					maxes.ymax = Math.max(tss.path.topy, maxes.ymax);
					maxes.ymin = Math.min(tss.path.bottomy, maxes.ymin);
				} else {
					maxes.xmin = Math.min((tss.path.leftx + sh.xpos), maxes.xmin);
					maxes.ymax = Math.max((tss.path.topy + sh.ypos), maxes.ymax);
					maxes.ymin = Math.min((tss.path.bottomy + sh.ypos), maxes.ymin);
				}
			} else {
				maxes.xmin = Math.min(sh.path.leftx, maxes.xmin);
				maxes.ymax = Math.max(sh.path.topy, maxes.ymax);
				maxes.ymin = Math.min(sh.path.bottomy, maxes.ymin);
			}
		}

		return maxes;
	};

	Char.prototype.calcCharWidth = function(){
		if(!this.isautowide) return;
		//debug("CALCCHARWIDTH");
		this.charwidth = 0;
		var sh, tss;
		if(this.charshapes){
			for(var jj=0; jj<this.charshapes.length; jj++) {
				sh = this.charshapes[jj];
				if(sh.link){
					tss = _GP.linkedshapes[sh.link].shape;
					if(sh.uselinkedshapexy) {
						this.charwidth = Math.max(this.charwidth, tss.path.rightx);
					} else {
						this.charwidth = Math.max(this.charwidth, (tss.path.rightx + sh.xpos));
					}
				} else {
					this.charwidth = Math.max(this.charwidth, sh.path.rightx);
				}
			}
		}
	};

	Char.prototype.drawCharToArea = function(lctx, view){
		var ps = _GP.projectsettings;
		var sl = this.charshapes;
		var cc = this.getCharNumber();

		//debug("DRAWCHARTOAREA - starting " + cc);

		var width = (this.charwidth*view.dz);
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

	Char.prototype.getCharNumber = function(){ return parseInt(this.cmapcode.slice(2), 16); };

	function getCharFromText(c){
		if(c === " ") return _GP.fontchars[32];
		var tc;
		for(var num=0; num<_GP.fontchars.length; num++){
			tc = _GP.fontchars[num];
			if(tc && tc.charvalue === c) return tc;
		}
		console.error("GETCHARFROMTEXT - could not find " + c);
		return false;
	}

//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------

	function getChar(ch, create) {
		var rechar = _GP.fontchars[ch];
		if(rechar){
			return rechar;
		} else if(create){
			_GP.fontchars[ch] = new Char();
			return _GP.fontchars[ch];
		}
		return false;
	}

	function getSelectedChar(){
		return getChar(_UI.selectedchar);
	}

	function selectChar(c, dontnavigate){
		debug("SELECTCHAR - selecting " + getChar(c, true).charname + " from value " + c);

		_UI.selectedchar = c;
		_UI.shapelayers = _GP.fontchars[c].charshapes;
		_UI.selectedshape = -1;

		//debug("SELECTCHAR: shapelayers is now " + JSON.stringify(_UI.shapelayers));
		if(!dontnavigate){
			//debug("SELECTCHAR: selecting " + _GP.fontchars[c].charvalue + " and navigating.");
			navigate('npAttributes');
		}
	}

	function updateCurrentCharWidth() {
		if(_UI.navhere == 'character edit'){
			getSelectedChar().calcCharWidth();
		} else if (_UI.navhere == 'linked shapes' && _GP.linkedshapes[_UI.shownlinkedshape]) {
			var lsarr = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) _GP.fontchars[lsarr[c]].calcCharWidth();
		}
	}
