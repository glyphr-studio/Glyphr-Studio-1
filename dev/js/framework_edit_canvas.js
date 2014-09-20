// start of file

//-------------------
// INIT
//-------------------
	function setupGhostCanvas(){
		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.chareditcanvassize;
		_UI.ishereghostcanvas.width = _UI.chareditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = 'cyan';
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = 'transparent';
	}

	function setupEditCanvas(){
		_UI.chareditcanvas = getEditDocument().getElementById('chareditcanvas');
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext('2d');
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;
	}

	function resetCursor() { getEditDocument().body.style.cursor = 'default'; }


//-------------------
// REDRAW
//-------------------
	function redraw(calledby){
		// debug('\n::::::::::::::::::::::\n REDRAW \t START');
		// debug('\t navhere: ' + _UI.navhere);
		// debug('\t called By: ' + calledby);
		// debug('\t selected char: ' + _UI.selectedchar);
		var start = Date.now();

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;
		
		switch (_UI.navhere){
			case 'character edit': redraw_CharacterEdit(); break;
			case 'linked shapes': redraw_LinkedShapes(); break;
			case 'ligatures': redraw_CharacterEdit(); break;
			case 'kerning': /*redraw_Kerning();*/ break;
			case 'test drive': redraw_TestDrive(); break;
		}

		_UI.redrawing = false;
		
		// debug(' REDRAW DONE\t' + (Date.now() - start) + ' ms\n::::::::::::::::::::::\n');
	}


//-------------------
// VIEW
//-------------------

	function setView(oa){

		var sc = _UI.selectedchar;
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			//debug('SETVIEW - char ' + sc + ' has no existing view, setting to default.');
			v[sc] = getView('setView');
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

		//debug('SETVIEW - passed ' + JSON.stringify(oa) + ' selectedchar ' + _UI.selectedchar + ' VIEWS is\n' + JSON.stringify(_UI.views));
	}

	function getView(calledby){
		////stack(arguments);
		//debug('GETVIEW - called by ' + calledby);

		var sc = _UI.selectedchar;
		var v = _UI.views;

		if(isval(v[sc])){
			//debug('GETVIEW - char ' + sc + ' HAS an existing value, returning \n' + JSON.stringify(v[sc]));
			return clone(v[sc]);
		} else {
			//debug('GETVIEW - char ' + sc + ' HAS NO EXISTING value, returning default');
			return clone(_UI.defaultview);
		}
	}

	function viewZoom(zfactor){

		var v = getView(),
			deltax = (_UI.eventhandlers.mousex-v.dx),
			deltay = (_UI.eventhandlers.mousey-v.dy);

		setView({
			'dz' : round(getView('viewZoom').dz*=zfactor, 2),
			'dx' : (_UI.eventhandlers.mousex-(deltax*zfactor)),
			'dy' : (_UI.eventhandlers.mousey-(deltay*zfactor))
		});
		redraw('viewZoom');
	}

	function resetThumbView(){

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			'dx' : _UI.thumbgutter,
			'dy' : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			'dz' : zoom
		};

		//debug('RESETTHUMBVIEW - set to \n' + JSON.stringify(_UI.thumbview));
	}



//	-------------------------
//	Global Get Selected Shape
//	-------------------------
	function ss(req){
		req = req || '[probably a dynamically-generated page control]';
		// debug('\nSS - START');
		// debug('\t Requested by: ' + req);
		// debug('\t selectedshape: ' + _UI.selectedshape);

		if(_UI.navhere === 'linked shapes'){
			// debug('\t LINKED SHAPES returning shownlinkedshape: ' + _UI.shownlinkedshape);
			return _GP.linkedshapes[_UI.shownlinkedshape].shape;
		}

		var charshapes = [];

		if(_UI.navhere === 'character edit' || _UI.navhere === 'ligatures'){
			charshapes = getSelectedCharShapes();
		}

		if(_UI.selectedshape !== -1){
			if((_UI.selectedshape >= 0) && (_UI.selectedshape < charshapes.length)) {
				// Charedit Selected Shape
				// debug('SS - returning shape object for position ' + _UI.selectedshape);
				return charshapes[_UI.selectedshape];
			} else {
				// Out of bounds Selected Shape
				// debug('SS - returning false - Selected Shape outside of expected boundary');
				_UI.selectedshape = -1;
				return false;
			}
		} else {
			// -1 = 'no shape selected'
			// debug('SS - returning false, ss=-1 no shape selected');
			return false;
		}
	}


//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){
		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			// var zupm = (ps.upm * v.dz);
			// var gutter = ((_UI.chareditcanvassize*v.dz) - zupm)/2;
			// var zasc = (ps.ascent * v.dz);
			var xs = {};
			xs.xmax = _UI.chareditcanvassize;
			xs.xmin = 0;
			xs.ymax = _UI.chareditcanvassize;
			xs.ymin = 0;
			//debug('GRID: zupm:' + zupm + ' gutter:' + gutter + ' zasc:' + zasc + ' xs:' + JSON.stringify(xs));

			// background white square
			_UI.chareditctx.fillStyle = 'white';
			_UI.chareditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);
			//debug('GRID:\nascent / xheight / descent = '+ ps.ascent+ '/' + ps.xheight+ '/' + (ps.ascent-ps.upm));

			var gsize = ((ps.upm/ps.griddivisions)*v.dz);
			_UI.chareditctx.lineWidth = 1;
			_UI.chareditctx.strokeStyle = _GP.projectsettings.colors.grid || ((new GlyphrProject()).projectsettings.colors.grid);
			//debug('GRID - gridsize set as: ' + gsize);

			var horizontal = function(y){
				y = y.makeCrisp();
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(xs.xmin,y);
				_UI.chareditctx.lineTo(xs.xmax,y);
				_UI.chareditctx.stroke();
				_UI.chareditctx.closePath();
			};

			var vertical = function(x){
				x = x.makeCrisp();
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(x,xs.ymin);
				_UI.chareditctx.lineTo(x,xs.ymax+1);
				_UI.chareditctx.stroke();
				_UI.chareditctx.closePath();
			};

			for(var i=v.dx; i<xs.xmax-1; i+=gsize){ vertical(i); }
			vertical(xs.xmax+1);
			for(var j=v.dx; j>=xs.xmin; j-=gsize){ vertical(j); }

			for(var k=v.dy; k<xs.ymax-1; k+=gsize){ horizontal(k); }
			horizontal(xs.ymax);
			for(var p=v.dy; p>=xs.ymin; p-=gsize){ horizontal(p); }

		}
	}

	function drawGuides() {
		// debug('\n drawGuides - START');

		var ps = _GP.projectsettings;
		// debug('\t ps.guides: ');
		// debug(ps.guides);
		
		if(_UI.showguides){
			// Update custom guides
			var g;
			for(var c in ps.guides){if(ps.guides.hasOwnProperty(c)){
				g = ps.guides[c];
				if(g.editable){
					g.draw();
				}
			}}

			// Update system guides
			ps.guides.xheight.location = ps.xheight;
			ps.guides.capheight.location = ps.capheight;
			ps.guides.ascent.location = ps.ascent;
			ps.guides.baseline.location = 0;
			ps.guides.descent.location = (ps.ascent-ps.upm);
			ps.guides.leftside.location = 0;
			ps.guides.rightside.location = ps.upm;

			// Minor Guidelines - Overshoots
			if(_UI.showovershoots){
				var os = ps.overshoot;
				ps.guides.xheight.draw(-1*os);
				ps.guides.ascent.draw(-1*os);
				ps.guides.baseline.draw(os);
				ps.guides.descent.draw(os);
			}

			// Char Width
			if((_UI.navhere === 'character edit' || _UI.navhere === 'ligatures') && 
				(getSelectedChar().charshapes.length || _UI.selectedchar === '0x0020')){
				ps.guides.leftside.draw(getSelectedCharLeftSideBearing()*-1);

				var rhl = getSelectedChar().charwidth;
				if(_UI.eventhandlers.tempnewbasicshape) rhl = Math.max(rhl, _UI.eventhandlers.tempnewbasicshape.xmax);
				ps.guides.rightside.location = rhl;
				ps.guides.rightside.draw(getSelectedCharRightSideBearing());
				ps.guides.rightside.draw();
			}

			// Major Guidelines
			ps.guides.xheight.draw();
			ps.guides.capheight.draw();
			ps.guides.ascent.draw();
			ps.guides.descent.draw();
			ps.guides.leftside.draw();
			ps.guides.baseline.draw();

			// Out of bounds triangle
			if(ps.guides.baseline.visible || ps.guides.leftside.visible){
				var v = getView('guides');
				_UI.chareditctx.fillStyle = ps.guides.baseline.color;
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(v.dx, v.dy);
				_UI.chareditctx.lineTo(v.dx, v.dy+(ps.pointsize*2));
				_UI.chareditctx.lineTo(v.dx-(ps.pointsize*2), v.dy);
				_UI.chareditctx.closePath();
				_UI.chareditctx.fill();
			}
		}
		// debug(' drawGuides - END\n');
	}

// end of file