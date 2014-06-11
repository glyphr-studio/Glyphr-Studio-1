
//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){

		debug("LOADING PAGE >> loadPage_charedit");
		getEditDocument().getElementById("mainwrapper").innerHTML = charedit_content();

		setupEditCanvas();
		setupGhostCanvas();

		initEventHandlers();

		_UI.selectedtool = "pathedit";
		_UI.selectedshape = -1;

		redraw("loadPage_charedit");
	}

	function charedit_content(){

		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>'+
			'<div id="toolsarea"> [ERROR: Uninitialized content] </div>'+
			makeFloatLogo();
			
		return re;
	}

	function setupGhostCanvas(){

		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.chareditcanvassize;
		_UI.ishereghostcanvas.width = _UI.chareditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = "cyan";
		_UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = "transparent";
	}

	function setupEditCanvas(){

		_UI.chareditcanvas = getEditDocument().getElementById("chareditcanvas");
		_UI.chareditcanvas.height = _UI.chareditcanvassize;
		_UI.chareditcanvas.width = _UI.chareditcanvassize;
		_UI.chareditctx = _UI.chareditcanvas.getContext("2d");
		_UI.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.chareditcanvas.onmouseout = mouseoutcec;
		_UI.chareditcanvas.onmouseover = mouseovercec;
	}

	function resetCursor() { getEditDocument().body.style.cursor = 'default'; }


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
			"dz" : (getView("viewZoom").dz*=zfactor),
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
// REDRAW
//-------------------
	function redraw(calledby){

		//debug(Date.now()+"\t:: REDRAW - Called By: " + calledby + " - Selected Char: " + _UI.selectedchar + " - Navhere: " + _UI.navhere);
		if(_UI.navhere === "linked shapes") {
			_UI.redrawing = false;
			linkedshapesredraw("redraw");
			return;
		} else if (_UI.navhere === "test drive"){
			_UI.redrawing = false;
			updateTestdriveCanvas();
			return;
		}

		if(_UI.redrawing){
			// this is totally a hack
			//debug("REDRAW - RETURNING because _UI.redrawing = " + _UI.redrawing);
			return;
		}

		_UI.redrawing = true;


		var sc = getSelectedChar();
		_UI.chareditctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		drawGrid();

		// load char info
		if(sc){
			sc.drawCharToArea(_UI.chareditctx, getView("Redraw"));
		}

		// Finish up
		var s = ss("Redraw");
		if(s) {
			s.drawSelectOutline(s.link !== false);
			if(s.link){
				_UI.selectedtool = "shaperesize";
			}
		}

		update_NavPanels();

		update_ToolsArea();

		_UI.redrawing = false;
		//debug(Date.now()+"\t:: REDRAW DONE - Called By: " + calledby);
	}




//-------------------
// Update Tools
//-------------------
	function update_ToolsArea(){

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
			pointselectclass = "tool";
		}

		var st = _UI.selectedtool;
		var content = "";


		// Pop In/Out
		if(_UI.popout){
			content += "<button title='one screen mode' class='tool' onclick='popIn();'>"+makeToolButton({'name':'tool_popIn'})+"</button>";
		} else {
			content += "<button title='two screen mode' class='tool' onclick='popOut();'>"+makeToolButton({'name':'tool_popOut'})+"</button>";
		}
		content += "<div style='height:5px;'>&nbsp;</div>";


		// Zoom Pan
		content += "<button title='zoom: one to one' class='tool' onclick='setView({\"dz\":1});redraw(\"updatetools\");'>"+makeToolButton({'name':'tool_zoom1to1'})+"</button>";
		content += "<button title='zoom: full em' class='tool' onclick='setView(clone(_UI.defaultview)); redraw(\"updatetools\");'>"+makeToolButton({'name':'tool_zoomEm'})+"</button>";
		content += "<br>";
		content += "<button title='zoom: out' class='tool' onclick='viewZoom(.9);'>"+makeToolButton({'name':'tool_zoomOut'})+"</button>";
		content += "<button title='zoom: in' class='tool' onclick='viewZoom(1.1);'>"+makeToolButton({'name':'tool_zoomIn'})+"</button>";
		content += "<br>";
		content += "<button title='zoom level' class='tool zoomreadout'>" + round(getView("updatetools").dz*100, 2) + "%</button>";
		content += "<div style='height:5px;'>&nbsp;</div>";


		// New Shape
		if(_UI.navhere == "character edit"){
			content += "<button title='new rectangle shape' class='" + (st==='newrect'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newrect\");'/>"+makeToolButton({'name':'tool_newRect', 'selected':(st==='newrect')})+"</button>";
			content += "<button title='new oval shape' class='" + (st==='newoval'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newoval\");'/>"+makeToolButton({'name':'tool_newOval', 'selected':(st==='newoval')})+"</button>";
			content += "<button title='new path shape' class='" + (st==='newpath'? "buttonsel " : " ") + "tool' onclick='clickTool(\"newpath\");'/>"+makeToolButton({'name':'tool_newPath', 'selected':(st==='newpath')})+"</button>";
			content += "<br>";
		}


		// Path and Shape Edit
		content += "<button title='scroll and pan' class='" + (st==='pan'? "buttonsel " : " ") + "tool' onclick='clickTool(\"pan\");'/>"+makeToolButton({'name':'tool_pan', 'selected':(st==='pan')})+"</button>";
		content += "<button title='edit path' class='" + pointselectclass + "' " + (pointselectclickable? "onclick='clickTool(\"pathedit\");'":"") + "/>"+makeToolButton({'name':'tool_pathEdit', 'selected':(st==='pathedit')})+"</button>";
		content += "<button title='move & resize shape' class='" + (st==='shaperesize'? "buttonsel " : " ") + "tool' onclick='clickTool(\"shaperesize\");'/>"+makeToolButton({'name':'tool_shapeResize', 'selected':(st==='shaperesize')})+"</button>";

		if(_UI.selectedtool === 'newpath'){
			content += "<div style='height:5px;'>&nbsp;</div>";
			content += "<button class='buttonsel' style='height:30px; width:94px; font-size:.8em; padding:2px;' title='done editing path' onclick='clickTool(\"pathedit\");'>done editing path</button>";
		}

		if(_GP.projectsettings.showkeyboardtipsicon) content += '<button title="keyboard and mouse tips" onclick="toggleKeyboardTips();" id="keyboardtips">'+makeIcon({'name':'keyboard', 'size':50, 'color':'rgb(229,234,239)'})+'</button>';

		try {
			getEditDocument().getElementById("toolsarea").innerHTML = content;
		} catch(err) {
			console.error("UPDATETOOLS - innerHTML update error caught");
		}
	}

	function clickTool(ctool){

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
			//debug("clickTool() - setting selectPathPoint = 0");
		} else if (ctool == "shaperesize"){
			if(s){ s.path.calcMaxes(); }
		}

		redraw("clicktool");
	}

	function toggleKeyboardTips() {

		if(document.getElementById('dialog_box').style.display==='block'){
			closeDialog();
		} else {
			var con = "<h2>Keyboard and Mouse Shortcuts</h2>";

			con += "<table style='margin:20px 40px 40px 0px;'><tr><td colspan=2>"+

			"<table>"+
			"<tr><td class='keycol'><span class='keycallout'>?</span></td><td>toggles this shortcuts dialog</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Project file</td></tr>"+
			"</table>"+

			"</td></tr><tr><td>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>c</span></td><td>copy selected shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>v</span></td><td>paste shape</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>z</span></td><td>undo</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>delete</span></td><td>delete selected shape</td></tr>"+
			"<tr><td class='keycol'>"+
			"<span class='arrow' style='margin-right:24px;'>&#x21E7;</span><br>"+
			"<span class='arrow'>&#x21E6;</span>"+
			"<span class='arrow'>&#x21E9;</span>"+
			"<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>"+
			"</td><td>nudges the selected shape<br>or point "+_GP.projectsettings.spinnervaluechange+" em units</td></tr>"+
			"</table>"+

			"</td><td style='padding-left:40px;'>"+

			"<br><table>"+
			"<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>edit canvas:</h3></td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>spacebar</span></td><td>pan the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse wheel</span></td><td>zoom the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>+</span></td><td>zoom in the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>&ndash;</span></td><td>zoom out the edit canvas</td></tr>"+
			"<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>0</span></td><td>reset edit canvas zoom</td></tr>"+
			"</table>"+

			"</td></tr></table>"+

			"<table><tr><td style='vertical-align:top; padding:20px 10px 0px 0px;'>"+
				checkUI("_GP.projectsettings.showkeyboardtipsicon")+
			"</td><td style='vertical-align:top; padding:20px 10px 0px 0px;'>"+
				"<label style='position:relative; top:-5px;' for='showkeyboardtipsicon'>show the &nbsp;<span style='position:relative; top:6px;'>"+makeIcon({'name':'keyboard', 'size':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+"</span>&nbsp; button</label>"+
			"</td></tr></table>";

			openDialog(con);
		}
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
					var sc = getSelectedChar();
					vertical(v.dx - (v.dz*(sc.leftsidebearing || _GP.projectsettings.defaultlsb)), xs.xmin, xs.xmax);

					var rhl = sc.advancewidth;
					if(_UI.eventhandlers.tempnewbasicshape) rhl = Math.max(rhl, _UI.eventhandlers.tempnewbasicshape.xmax);
					vertical(v.dx + (v.dz*rhl), xs.xmin, xs.xmax);
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
