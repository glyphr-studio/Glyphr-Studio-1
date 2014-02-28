
//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){
		//stack(arguments);

		debug("LOADING PAGE >> loadPage_charedit");
		document.getElementById("mainpane").innerHTML = charedit_content();
			
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		
		_UI.selectedtool = "pathedit";
		
		redraw("loadPage_charedit");	
	}
	
	function charedit_content(){
		//stack(arguments);

		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		return re;
	}

	function setupGhostCanvas(){
		//stack(arguments);

		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = document.getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.chareditcanvassize;
		_UI.ishereghostcanvas.width = _UI.chareditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = "cyan";
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = "transparent";
	}

	function setupEditCanvas(){
		//stack(arguments);

		_UI.chareditcanvas = document.getElementById("chareditcanvas");
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext("2d");
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;	
	}
	
	function resetCursor() { document.body.style.cursor = 'default'; }


//-------------------
// VIEW
//-------------------

	function setView(oa){
		//stack(arguments);

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
		//stack(arguments);

		setView({"dz" : (getView("viewZoom").dz*=zfactor)});
		redraw("viewZoom");
	}

	function resetThumbView(){
		//stack(arguments);

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			"dx" : _UI.thumbgutter,
			"dy" : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			"dz" : zoom
		};

		//debug("RESETTHUMBVIEW - set to \n" + JSON.stringify(_UI.thumbview));
	}



//-------------------
// REDRAW
//-------------------
	function redraw(calledby){
		//stack(arguments);
		//debug(Date.now()+"\t:: REDRAW - Called By: " + calledby + " - Selected Char: " + _UI.selectedchar + " - Navhere: " + _UI.navhere);	
		if(_UI.navhere == "linked shapes") {
			_UI.redrawing = false;
			linkedshapesredraw("redraw"); 
			return;
		}		

		if(_UI.redrawing){
			// this is totally a hack
			//debug("REDRAW - RETURNING because _UI.redrawing = " + _UI.redrawing);
			return;
		}

		_UI.redrawing = true;


		var sc = _GP.fontchars[_UI.selectedchar];
		_UI.chareditctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		grid();
		
		// load char info
		_UI.shapelayers = sc.charshapes;
		sc.drawCharToArea(_UI.chareditctx, getView("Redraw"));

		// Finish up
		var s = ss("Redraw");
		if(s) {
			s.drawSelectOutline(s.link !== false);				
			if(s.link){
				_UI.selectedtool = "shaperesize";
			}
		}
		
		updateNavPrimaryNavTarget();
		
		updatetools();

		_UI.redrawing = false;
		//debug(Date.now()+"\t:: REDRAW DONE - Called By: " + calledby);	
	}


	

//-------------------
// Update Canvas Tools
//-------------------
	function updatetools(){
		//stack(arguments);

		var pointselectclass = "";
		var pointselectclickable = true;
		var s = ss("Charedit: UpdateTools");
		if(_UI.navhere == "linked shapes") {
			if(!_GP.linkedshapes[_UI.selectedshape]) { s = false; }
		}
		
		if(_UI.selectedtool=='pathedit'){
			pointselectclass = "buttonsel tool";
		} else if (s.link){
			pointselectclass = "buttondis tool";
			pointselectclickable = false;
		} else {
			pointselectclass = "button tool";
		}
			
		var content = "";
		content += "<div title='edit path' class='" + pointselectclass + "' " + (pointselectclickable? "onclick='clicktool(\"pathedit\");'":"") + "/><canvas id='patheditbuttoncanvas'></canvas></div>";
		content += "<div title='move & resize shape' class='" + (_UI.selectedtool=='shaperesize'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"shaperesize\");'/><canvas id='shaperesizebuttoncanvas'></canvas></div>";
		
		if(_UI.navhere == "character edit"){
			content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
			content += "<div title='new rectangle shape' class='" + (_UI.selectedtool=='newrect'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newrect\");'/><canvas id='newrectbuttoncanvas'></canvas></div>";
			content += "<div title='new oval shape' class='" + (_UI.selectedtool=='newoval'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newoval\");'/><canvas id='newovalbuttoncanvas'></canvas></div>";
			content += "<div title='new path shape' class='" + (_UI.selectedtool=='newpath'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newpath\");'/><canvas id='newpathbuttoncanvas'></canvas></div>";
		}
		
		content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
		content += "<div title='scroll and pan' class='" + (_UI.selectedtool=='pan'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"pan\");'/><canvas id='panbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: in' class='button tool' onclick='viewZoom(1.1);'><canvas id='zoominbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: out' class='button tool' onclick='viewZoom(.9);'><canvas id='zoomoutbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: one to one' class='button tool' onclick='setView({\"dz\":1});redraw(\"updatetools\");'><canvas id='zoom1to1buttoncanvas'></canvas></div>";
		content += "<div title='zoom: full em' class='button tool' onclick='setView(clone(_UI.defaultview)); redraw(\"updatetools\");'><canvas id='zoomembuttoncanvas'></canvas></div>";
		content += "<div title='zoom level' class='tool out'>" + round(getView("updatetools").dz*100, 2) + "%</div>";
		content += "<div title='two screen mode' class='button tool' onclick='popout();'>^^</div>";

		try {
			document.getElementById("toolsarea").innerHTML = content;	
		} catch(err) {
			console.error("UPDATETOOLS - innerHTML update error caught");
		}
		
		// Draw the buttons
		var tempctx;
		var tempcanvas;
		var bh = 19;
		var bw = 16;

		// Path Edit
		tempcanvas = document.getElementById("patheditbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "pathedit"){ drawPathEditButton(tempctx, "white", "black"); }
		else if (!pointselectclickable) { drawPathEditButton(tempctx, "rgb(80,80,80)", "rgb(80,80,80)"); }
		else { drawPathEditButton(tempctx, "transparent", _UI.colors.accent); }
		
		// Shape Resize
		tempcanvas = document.getElementById("shaperesizebuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 3px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "shaperesize"){ drawShapeResizeButton(tempctx, "white", "black"); }
		else { drawShapeResizeButton(tempctx, "transparent", _UI.colors.accent); }

		// Pan
		tempcanvas = document.getElementById("panbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(_UI.selectedtool == "pan"){ drawPanButton(tempctx, "white", "black"); }
		else { drawPanButton(tempctx, _UI.colors.accent, "transparent"); }
		
		// Zoom In
		tempcanvas = document.getElementById("zoominbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomInButton(tempctx, _UI.colors.accent, "transparent");

		// Zoom Out
		tempcanvas = document.getElementById("zoomoutbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomOutButton(tempctx, _UI.colors.accent, "transparent");
		
		// Zoom 1:1
		tempcanvas = document.getElementById("zoom1to1buttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoom1to1Button(tempctx, _UI.colors.accent, "transparent");
		
		// Zoom Em
		tempcanvas = document.getElementById("zoomembuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "4px 4px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomEmButton(tempctx, _UI.colors.accent, "transparent");		

		if(_UI.navhere == "character edit"){
			// New Rectangle
			tempcanvas = document.getElementById("newrectbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newrect") { drawNewRectButton(tempctx, "white", "black"); }
			else { drawNewRectButton(tempctx, "transparent", _UI.colors.accent); }
			
			// New Oval
			tempcanvas = document.getElementById("newovalbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newoval"){ drawNewOvalButton(tempctx, "white", "black"); }
			else { drawNewOvalButton(tempctx, "transparent", _UI.colors.accent); }
			
			// New Path
			tempcanvas = document.getElementById("newpathbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(_UI.selectedtool == "newpath"){ drawNewPathButton(tempctx, "white", "black"); }
			else { drawNewPathButton(tempctx, "transparent", _UI.colors.accent); }
		}
	}

	function clicktool(ctool){
		//stack(arguments);

		_UI.selectedtool = ctool;
		var s = ss("clicktool");
		
		//debug("CLICKTOOL - was passed: " + ctool + " and _UI.selectedtool now is: " + _UI.selectedtool);
		_UI.eventhandlers.eh_addpath.firstpoint = true; 
		if((ctool=="newrect")||(ctool=="newoval")){
			_UI.selectedshape = -1; 
		} else if (ctool=="newpath"){
			_UI.selectedshape = -1; 
		} else if(ctool=="pathedit"){
			if(s) {s.path.selectPathPoint(0);}
			//debug("CLICKTOOL() - setting selectPathPoint = 0");
		} else if (ctool == "shapemove"){
			if(s){s.path.calcMaxes();}
		}
		
		redraw("clicktool");
	}

	function popout(){
		_UI.popout = window.open('', 'glyphr_tearout');

		var td = _UI.tearoutwindow.document;

		// Init window properties
		td.title = 'glyphr - canvas';
		_UI.tearoutwindow.onBeforeUnload = popin();
		td.body.innerHTML = '<h1>hellow, world</h1>';

		// Adjust current properties
		document.title = 'glyphr - controls';
	}
	
	function tearin(){



		_UI.popout = false;
	}

//-------------------
// Drawing Grid
//-------------------

	
	function grid(){
		//stack(arguments);

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
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, 0.8, true);
				horizontal(xline-overshootsize, xs.xmin, xs.xmax);
				horizontal(mline-overshootsize, xs.xmin, xs.xmax);
				horizontal(v.dy+overshootsize, xs.xmin, xs.xmax);
				horizontal(dline+overshootsize, xs.xmin, xs.xmax);
				
				// Right hand Em Square and Line Gap
				//vertical(v.dx+(ps.upm*v.dz), xs.ymin, xs.ymax);
				horizontal(lgline, xs.xmin, xs.xmax);
				
				// Char Width
				if(_UI.navhere == 'character edit'){
					var sc = _GP.fontchars[_UI.selectedchar];
					vertical(v.dx - (v.dz*(sc.leftsidebearing || _GP.projectsettings.defaultlsb)), xs.xmin, xs.xmax);
					vertical(v.dx + (v.dz*sc.charwidth), xs.xmin, xs.xmax);
				}

				// major guidelines - xheight, top (emzize)
				_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, 0.5, true);
				horizontal(xline, xs.xmin, xs.xmax);
				//_UI.chareditctx.strokeStyle = shiftColor(_GP.projectsettings.color_guideline, .2, true);
				horizontal(mline, xs.xmin, xs.xmax);
				horizontal(dline, xs.xmin, xs.xmax);
				
				
				// Out of bounds triangle
				_UI.chareditctx.fillStyle = _GP.projectsettings.color_guideline;		
				_UI.chareditctx.beginPath();
				_UI.chareditctx.moveTo(v.dx, v.dy);
				_UI.chareditctx.lineTo(v.dx, v.dy+(_GP.projectsettings.pointsize*2));
				_UI.chareditctx.lineTo(v.dx-(_GP.projectsettings.pointsize*2), v.dy);
				_UI.chareditctx.closePath();
				_UI.chareditctx.fill();
				
				// Origin Lines
				_UI.chareditctx.strokeStyle = _GP.projectsettings.color_guideline;
				horizontal(v.dy, xs.xmin, xs.xmax);
				vertical(v.dx, xs.ymin, xs.ymax);
			}
		}
	}
	
	function horizontal(y, xmin, xmax){
		y = Math.round(y)-0.5;
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(xmin,y);
		_UI.chareditctx.lineTo(xmax,y);
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}
	
	function vertical(x, ymin, ymax){
		x = Math.round(x)-0.5;
		_UI.chareditctx.beginPath();
		_UI.chareditctx.moveTo(x,ymin);
		_UI.chareditctx.lineTo(x,ymax+1);		
		_UI.chareditctx.stroke();
		_UI.chareditctx.closePath();
	}