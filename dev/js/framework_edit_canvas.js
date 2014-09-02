// start of file


//-------------------
// REDRAW
//-------------------
	function redraw(calledby){
		//debug(Date.now()+"\t:: REDRAW - Called By: " + calledby + " - Selected Char: " + _UI.selectedchar + " - Navhere: " + _UI.navhere);
		
		_UI.redrawing = false;
		
		switch (_UI.navhere){
			case "character edit": redraw_CharacterEdit(); break;
			case "linked shapes": redraw_LinkedShapes("redraw"); break;
			case "ligatures": redraw_Ligatures(); break;
			case "kerning": redraw_Kerning(); break;
			case "test drive": redraw_TestDrive(); break;
		}

		//debug(Date.now()+"\t:: REDRAW DONE - Called By: " + calledby);
	}


//-------------------
// VIEW
//-------------------

	function setView(oa){

		var sc = _UI.selectedchar;
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			//debug("SETVIEW - char " + sc + " has no existing view, setting to default.");
			v[sc] = getView("setView");
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

		//debug("SETVIEW - passed " + JSON.stringify(oa) + " selectedchar " + _UI.selectedchar + " VIEWS is\n" + JSON.stringify(_UI.views));
	}

	function getView(calledby){
		////stack(arguments);
		//debug("GETVIEW - called by " + calledby);

		var sc = _UI.selectedchar;
		var v = _UI.views;

		if(isval(v[sc])){
			//debug("GETVIEW - char " + sc + " HAS an existing value, returning \n" + JSON.stringify(v[sc]));
			return clone(v[sc]);
		} else {
			//debug("GETVIEW - char " + sc + " HAS NO EXISTING value, returning default");
			return clone(_UI.defaultview);
		}
	}

	function viewZoom(zfactor){

		var v = getView(),
			deltax = (_UI.eventhandlers.mousex-v.dx),
			deltay = (_UI.eventhandlers.mousey-v.dy);

		setView({
			"dz" : round(getView("viewZoom").dz*=zfactor, 2),
			"dx" : (_UI.eventhandlers.mousex-(deltax*zfactor)),
			"dy" : (_UI.eventhandlers.mousey-(deltay*zfactor))
		});
		redraw("viewZoom");
	}

	function resetThumbView(){

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			"dx" : _UI.thumbgutter,
			"dy" : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			"dz" : zoom
		};

		//debug("RESETTHUMBVIEW - set to \n" + JSON.stringify(_UI.thumbview));
	}


//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){

		var ps = _GP.projectsettings;
		var v = getView("grid");

		//debug("GRID: v:" + JSON.stringify(v));

		_UI.chareditctx.fillStyle = _UI.colors.offwhite;
		_UI.chareditctx.fillRect(0,0,99999,99999);

		var zupm = (ps.upm * v.dz);
		var gutter = ((_UI.chareditcanvassize*v.dz) - zupm)/2;
		var zasc = (ps.ascent * v.dz);

		// background white square
		var xs = {};
		xs.xmax = _UI.chareditcanvassize;
		xs.xmin = 0;
		xs.ymax = _UI.chareditcanvassize;
		xs.ymin = 0;
		//debug("GRID: zupm:" + zupm + " gutter:" + gutter + " zasc:" + zasc + " xs:" + JSON.stringify(xs));

		_UI.chareditctx.fillStyle = "white";
		_UI.chareditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

		// Grids
		var mline = v.dy - (ps.ascent*v.dz);
		var xline = v.dy - (ps.xheight*v.dz);
		var dline = v.dy - ((ps.ascent - ps.upm)*v.dz);
		var overshootsize = (ps.overshoot*v.dz);
		var lgline = dline + overshootsize + (ps.linegap*v.dz);

		//debug("GRID:\nascent / xheight / descent = "+ ps.ascent+ "/" + ps.xheight+ "/" + (ps.ascent-ps.upm));

		if(_UI.showgrid || _UI.showguides){
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _GP.projectsettings.color_grid;

			if(_UI.showgrid){
				var gsize = ((ps.upm/ps.griddivisions)*v.dz);
				//debug("GRID - gridsize set as: " + gsize);

				for(var i=v.dx; i<xs.xmax-1; i+=gsize){ vertical(i, xs.ymin, xs.ymax); }
				vertical(xs.xmax+1, xs.ymin, xs.ymax);
				for(var j=v.dx; j>=xs.xmin; j-=gsize){ vertical(j, xs.ymin, xs.ymax); }

				for(var k=v.dy; k<xs.ymax-1; k+=gsize){ horizontal(k, xs.xmin, xs.xmax); }
				horizontal(xs.ymax, xs.xmin, xs.xmax+1);
				for(var p=v.dy; p>=xs.ymin; p-=gsize){ horizontal(p, xs.xmin, xs.xmax); }

			}

			if(_UI.showguides){
				// Minor Guidelines - Overshoots
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_os_guideline, 0.8, true);
				horizontal(xline-overshootsize, xs.xmin, xs.xmax);
				horizontal(mline-overshootsize, xs.xmin, xs.xmax);
				horizontal(v.dy+overshootsize, xs.xmin, xs.xmax);
				horizontal(dline+overshootsize, xs.xmin, xs.xmax);

				// Right hand Em Square and Line Gap
				//vertical(v.dx+(ps.upm*v.dz), xs.ymin, xs.ymax);
				horizontal(lgline, xs.xmin, xs.xmax);

				// Char Width
				if(_UI.navhere == 'character edit'){
					var sc = getSelectedChar();
					vertical(v.dx - (v.dz*(sc.leftsidebearing || _GP.projectsettings.defaultlsb)), xs.xmin, xs.xmax);

					var rhl = sc.advancewidth;
					if(_UI.eventhandlers.tempnewbasicshape) rhl = Math.max(rhl, _UI.eventhandlers.tempnewbasicshape.xmax);
					vertical(v.dx + (v.dz*rhl), xs.xmin, xs.xmax);
				}

				// major guidelines - xheight, top (emzize)
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_os_guideline, 0.5, true);
				horizontal(xline, xs.xmin, xs.xmax);
				//_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_os_guideline, .2, true);
				horizontal(mline, xs.xmin, xs.xmax);
				horizontal(dline, xs.xmin, xs.xmax);


				// Out of bounds triangle
				_UI.chareditctx.fillStyle = _GP.projectsettings.color_os_guideline;
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(v.dx, v.dy);
				_UI.chareditctx.lineTo(v.dx, v.dy+(_GP.projectsettings.pointsize*2));
				_UI.chareditctx.lineTo(v.dx-(_GP.projectsettings.pointsize*2), v.dy);
				_UI.chareditctx.closePath();
				_UI.chareditctx.fill();

				// Origin Lines
				_UI.chareditctx.strokeStyle = _GP.projectsettings.color_os_guideline;
				horizontal(v.dy, xs.xmin, xs.xmax);
				vertical(v.dx, xs.ymin, xs.ymax);
			}
		}
	}

	function horizontal(y, xmin, xmax){
		y = y.makeCrisp();
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(xmin,y);
		_UI.chareditctx.lineTo(xmax,y);
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}

	function vertical(x, ymin, ymax){
		x = x.makeCrisp();
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(x,ymin);
		_UI.chareditctx.lineTo(x,ymax+1);
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}
// end of file