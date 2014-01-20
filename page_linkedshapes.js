

	function updatelinkedshapes(toggle){

		document.getElementById("mainpane").innerHTML = linkedshapes_content();
		
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		grid();
		document.onkeypress = keypress;
		
		_UI.selectedshape = -1;
		linkedshapesredraw();	
	}

	function linkedshapes_content(){					
		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		re += '<table class="charedittable" cellspacing=0 cellpadding=0 border=0><tr>';
		re += '<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>';			
		re += '<tr><td id="actionsarea"> [ERROR: Uninitialized content] </td>';		
		re += '</tr></table>';
		
		return re;
	}

	function linkedshapes_subnav(){
		var re = "<div class='subnavunit'>";
		re += "<table class='layertable'>";
		for(var ssid in _GP.linkedshapes){
			//debug("LINKEDSHAPES_SUBNAV - making button for " + ssid);
			re += makeSSSubnavButton(ssid);
		}
		re += "</table>";
		
		re += "<h1>actions</h1>";
		re += "<table class='actionsgrid'><tr><td><h3>linked shape</h3>";
		re += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"create new linked shape\");navigate();'><br>";
		re += "<input class='"+(aalength(_GP.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";		
		re += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
		re += "</td> &nbsp; </td></td> &nbsp; </td></tr></table>";

		return re;
	}
	
	function drawLinkedShapeLayerThumbs(){
		//debug("DRAWLINKEDSHAPELAYERTHUMBS - start");
		var ps = _GP.projectsettings;
		var tctx = {};
		var tele = false;
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.upm*factor));
		for(var ssid in _GP.linkedshapes){
			tele = document.getElementById(("layerthumb"+ssid))
			tctx = tele.getContext("2d");
			tele.style.backgroundColor = _UI.colors.offwhite;
			if(ssid==_UI.shownlinkedshape) tele.style.backgroundColor = "rgb(255,255,255)";
			_GP.linkedshapes[ssid].shape.drawShapeToArea_Single(tctx, factor, _UI.thumbgutter, yoffset);
		}
		//debug("DRAWLINKEDSHAPELAYERTHUMBS - end");
	}

	function makeSSSubnavButton(ssid){
		//debug("MAKESSSUBNAVBUTTON passed ssid:" + ssid + " and SS JASON: \n" + JSON.stringify(_GP.linkedshapes.id0));
		var re = "";

		if(ssid==_UI.shownlinkedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='makeLinkedShapeSelected(\"" + ssid + "\");'>";
		re += "<td class='layerthumb'><canvas id='layerthumb"+ssid+"' height='"+_UI.thumbsize+"' width='"+_UI.thumbsize+"'></canvas></td>";
		re += "<td class='layername'>" + _GP.linkedshapes[ssid].shape.name + "</td></tr>";

		return re;
	}
	
	function makeLinkedShapeSelected(ssid){
		//debug("MAKELINKEDSHAPESELECTED - ssid: " + ssid);
		_UI.shownlinkedshape = ssid;
		_UI.selectedshape = ssid;
		_UI.shapelayers = [_GP.linkedshapes[ssid].shape];
		navigate();
	}

	
//-------------------
// REDRAW
//-------------------

	function linkedshapesredraw(){
		//debug("!!! LINKEDSHAPEREDRAW !!! - shownlinkedshape:" + _UI.shownlinkedshape + ", _UI.selectedshape:" + _UI.selectedshape);
				
		_UI.chareditctx.clearRect(0,0,5000,5000);
		grid();
		vertical(_UI.chareditcanvassize.makeCrisp());
		
		_GP.linkedshapes[_UI.shownlinkedshape].shape.drawShape_Single(_UI.chareditctx);
		
		if(_GP.linkedshapes[_UI.selectedshape]) {
			_GP.linkedshapes[_UI.selectedshape].shape.drawSelectOutline();
		}

		updateNavPrimaryNavTarget();

		updatetools();	
	}

	
//-------------------
// Update Details
//-------------------
	function linkedShapeCharDetails(){
		var content = "";	

		//content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Linked Shape ID </td><td> " + _UI.shownlinkedshape + " </td></tr>";	
			
		if(_GP.linkedshapes[_UI.shownlinkedshape].usedin.length > 0){
			content += "<table style='margin-top:10px;'><tr><td colspan=3><h3>characters that use this linked shape</h3>";
			content += generateUsedinThumbs();
			content += "</td></tr></table>";	
		} else {
			content += "<table><tr><td>&nbsp;</td><td colspan=2><br><i>this linked shape is not currently being used by any characters. <a href='#' onclick='showAddSSToCharDialog();'>add this linked shape to a character now</a>.</i></td></tr></table>"
		}

		//debug("LINKEDSHAPECHARDETAILS - returning html:\n" + content);
		return content;
	}
	
	function generateUsedinThumbs(){		
		var re = "<div class='ssthumbcontainer'>";
		var ui = _GP.linkedshapes[_UI.shownlinkedshape].usedin;

		for(var k=0; k<ui.length; k++){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas id='thumb"+ui[k]+"' class='ssusedinthumb' height="+_UI.thumbsize+"' width="+_UI.thumbsize+" onclick='goToEditChar("+(ui[k]*1)+");'></canvas>";
			re += "</td></tr><tr><td>"
			re += _GP.fontchars[(ui[k]*1)].charvalue;
			re += "</td></tr></table>";
			//debug("GENERATEUSEDINTHUMBS - created canvas 'thumb"+ui[k]+"'");
		}
		re += "</div>";
		return re;
	}
	
	function goToEditChar(chid){
		_UI.selectedshape = -1;	
		_UI.selectedchar = chid;
		_UI.navhere = "character edit";
		_UI.navprimaryhere = "npAttributes";
		navigate();	
	}
	
	function drawUsedinThumbs(){
		var ps = _GP.projectsettings;
		var ui = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		//debug("DRAWUSEDINTHUMBS - start, drawing " + ui.length);
		var tctx = {};
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.upm*factor));
		
		//debug("DRAWUSEDINTHUMBS - used in array is " + JSON.stringify(ui));

		for(var k=0; k<ui.length; k++){
			debug("DRAWUSEDINTHUMBS - getting thumb " + ui[k]);
			tctx = document.getElementById(("thumb"+ui[k])).getContext("2d");
			drawCharToArea(tctx, ui[k], factor, _UI.thumbgutter, yoffset);
			debug(" - drawCharToArea canvas 'thumb"+ui[k]+"'");
		}
	}
	
	
	
//-------------------
// Update Actions
//-------------------
	function updatelinkedshapeactions(){
		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";
				
		var s = ss("Update Actions");		
		
		var allactions = "<td><h3>*</h3>";
			allactions += "<input class='"+(_UI.linkedshapeundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((_UI.linkedshapeundoq.length > 0) ? (" " + _UI.linkedshapeundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "</td>";
		
		var linkedshapeactions = "<td><h3>linked shape</h3>";
			linkedshapeactions += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"create new linked shape\");navigate();'><br>";
			linkedshapeactions += "<input class='"+(aalength(_GP.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";		
			linkedshapeactions += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
			
		var shapeactions = "";
			if(_UI.eventhandlers.temppathdragshape && _UI.selectedtool=="pathedit"){
			shapeactions += "<td><h3>shape</h3>";
			shapeactions += "<input class='button' type='button' value='Flip Horizontal' onclick='ss().path.flipEW();putundoq(\"flip shape horizontal\");redraw();'><br>";
			shapeactions += "<input class='button' type='button' value='Flip Vertical' onclick='ss().path.flipNS();putundoq(\"flip shape vertical\");redraw();'><br>";
			shapeactions += "</td>";
			}
			
		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='_UI.showgrid? _UI.showgrid=false : _UI.showgrid=true; redraw();'><br>"; 
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='_UI.showguides? _UI.showguides=false : _UI.showguides=true; redraw();'><br>"; 
			canvasactions += "</td>";
			
		var pointactions = "<td><h3>path point</h3>";
			pointactions += "<input class='button' type='button' value='Add to start' onclick='ss().path.addPathPoint(false, true); putundoq(\"add pp start\"); redraw();'><br>";
			pointactions += "<input class='button' type='button' value='Add to end' onclick='ss().path.addPathPoint(false, false); putundoq(\"add pp end\"); redraw();'><br>";
			pointactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='ss().path.deletePathPoint(); putundoq(\"delete pp\"); redraw();'><br>";
			pointactions += "<input class='button' type='button' value='Reset Handles' onclick='ss().path.sp().resetHandles(); putundoq(\"reset pp\"); redraw();'><br>";	
			pointactions += "</td>";
		
		// Put it all together
		content += allactions;
		content += linkedshapeactions;
		content += shapeactions;

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		else { content += "<td><h3>&nbsp;</h3></td>"; }
		
		content += "</tr><tr>";
		content += canvasactions;
		
		content += "</td></tr></table>";
		return content;
	}

	function addLinkedShape(){
		var newid = generateNewSSID();
		var newname = ("linkedshape " + _GP.projectsettings.linkedshapecounter);

		_UI.shownlinkedshape = newid;
		_UI.selectedshape = newid;

		_GP.linkedshapes[newid] = new LinkedShape({"name":newname});

		//debug("Added New Linked Shape: " + newid + " JSON=" + JSON.stringify(_GP.linkedshapes));
	}

	function deleteLinkedShapeConfirm(){
		var content = "Are you sure you want to delete this linked shape?<br>";
		var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the linked shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _GP.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This linked shape is not currently being used by any characters.<br>";
		}
		
		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><input type='button' value='permanently delete this linked shape' onclick='deleteLinkedShape();'> &nbsp; <input type='button' value='cancel' onclick='closeDialog();'>";

		openDialog(content);
	}
	
	function deleteLinkedShape(){
		//debug("DELETELINKEDSHAPE - deleting " + _UI.shownlinkedshape);
		closeDialog();
		if(aalength(_GP.linkedshapes)>1){
			// find & delete all linked shape instances
			var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = _GP.fontchars[uia[cui]].charshapes;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #_UI.shapelayers " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .link " + tc[sl].link + " checking against " + _UI.shownlinkedshape);
					if(tc[sl].link == _UI.shownlinkedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}
			
			// delete linkedshape and switch selection
			delete _GP.linkedshapes[_UI.shownlinkedshape];
			_UI.shownlinkedshape = getFirstLinkedShape();
			_UI.selectedshape = _UI.shownlinkedshape;
			//debug("DELETELINKEDSHAPE - delete complete, new shownlinkedshape = " + shownlinkedshape);
			
			navigate();
		} else {
			alert("Error: deleting the last linked shape should not have been an allowed action.");
		}
	}

	function pasteLinkedShape(){
		if(_UI.clipboardshape){
			_GP.linkedshapes[_UI.shownlinkedshape].shape = _UI.clipboardshape;
		}
	}

	function showAddSSToCharDialog(msg){
		var content = "<table style='width:756px'><tr><td>";
		content += msg? msg : "";
		content += "Select the character into which you would like to insert this linked shape:<br><br></td></tr>";
		content += "<tr><td>";
		content += updateselectchar("insertLinkedShapeToChar");
		content += "</td></tr>";
		content += "<tr><td><br><input type='button' class='button' value='done' onclick='closeDialog();'/></td></tr></table>";
		openDialog(content);
		drawselectcharthumbs();
	}
	
	function insertLinkedShapeToChar(chid){
		var temschar = _UI.selectedchar;
		selectchar(chid, true);
		insertLinkedShape(_UI.shownlinkedshape);
		_UI.selectedchar = temschar;
		putundoq("insert linked shape from linkedshapes");
		closeDialog();
		showAddSSToCharDialog("The LinkedShape '" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "' was successfully inserted into character " + _GP.fontchars[chid].charname + ".<br><br>");
	}

	
	
	