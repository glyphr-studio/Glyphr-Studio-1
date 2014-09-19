// start of file

//-------------------
// UBER FUCNTIONS
//-------------------

	function loadPage_charedit(){
		// debug("LOADING PAGE >> loadPage_charedit");

		getEditDocument().getElementById('mainwrapper').innerHTML = charedit_content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedtool = 'pathedit';
		_UI.selectedshape = -1;
		if(_UI.selectedchar.length > 6) _UI.selectedchar = getFirstCharID();

		redraw("loadPage_charedit");
	}

	function charedit_content(){
		return '<canvas id="chareditcanvas" width=12 height=12 ></canvas>' +
			'<div id="toolsarea"> [ERROR: Uninitialized content] </div>' +
			makeFloatLogo();
	}


//-------------------
// Redraw
//-------------------
	function redraw_CharacterEdit(){
		// debug('\n redraw_CharacterEdit - START');

		_UI.redrawing = true;

		var sc = getSelectedChar();
		_UI.chareditctx.clearRect(0,0,_UI.chareditcanvassize,_UI.chareditcanvassize);
		drawGrid();
		drawGuides();

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
	}

//-------------------
// Update Tools
//-------------------
	function update_ToolsArea(){

		var pointselectclass = "";
		var pointselectclickable = true;
		var s = ss("Charedit: UpdateTools");
		if(_UI.navhere === "linked shapes") {
			if(!_GP.linkedshapes[_UI.selectedshape]) { s = false; }
		}

		if(_UI.selectedtool === 'pathedit'){
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
		if(_UI.navhere === 'character edit' || _UI.navhere === 'ligatures'){
			if(_UI.popout){
				content += "<button title='one screen mode' class='tool' onclick='popIn();'>"+makeToolButton({'name':'tool_popIn'})+"</button>";
			} else {
				content += "<button title='two screen mode' class='tool' onclick='popOut();'>"+makeToolButton({'name':'tool_popOut'})+"</button>";
			}
			content += "<div style='height:5px;'>&nbsp;</div>";
		}

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
		if(_UI.navhere === 'character edit' || _UI.navhere === 'ligatures'){
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
			if(s && s.path) {s.path.selectPathPoint(0);}
			//debug("clickTool() - setting selectPathPoint = 0");
		} else if (ctool == "shaperesize"){
			if(s && s.path){ s.path.calcMaxes(); }
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

// end of file