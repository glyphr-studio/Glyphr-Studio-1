

	function updatelinkedshapes(toggle){

		document.getElementById("mainpane").innerHTML = linkedshapes_content();
		
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		grid();
		document.onkeypress = keypress;
		
		uistate.selectedshape = -1;
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
		for(var ssid in _G.linkedshapes){
			//debug("LINKEDSHAPES_SUBNAV - making button for " + ssid);
			re += makeSSSubnavButton(ssid);
		}
		re += "</table>";
		
		re += "<h1>actions</h1>";
		re += "<table class='actionsgrid'><tr><td><h3>linked shape</h3>";
		re += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"create new linked shape\");navigate();'><br>";
		re += "<input class='"+(aalength(_G.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";		
		re += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
		re += "</td> &nbsp; </td></td> &nbsp; </td></tr></table>";

		return re;
	}
	
	function drawLinkedShapeLayerThumbs(){
		//debug("DRAWLINKEDSHAPELAYERTHUMBS - start");
		var ps = _G.projectsettings;
		var tctx = {};
		var tele = false;
		var factor = ((uistate.thumbsize-(2*uistate.thumbgutter))/(ps.upm));
		var yoffset = (uistate.thumbgutter+(ps.upm*factor));
		for(var ssid in _G.linkedshapes){
			tele = document.getElementById(("layerthumb"+ssid))
			tctx = tele.getContext("2d");
			tele.style.backgroundColor = uistate.colors.offwhite;
			if(ssid==uistate.shownlinkedshape) tele.style.backgroundColor = "rgb(255,255,255)";
			_G.linkedshapes[ssid].shape.drawShapeToArea_Single(tctx, factor, uistate.thumbgutter, yoffset);
		}
		//debug("DRAWLINKEDSHAPELAYERTHUMBS - end");
	}

	function makeSSSubnavButton(ssid){
		//debug("MAKESSSUBNAVBUTTON passed ssid:" + ssid + " and SS JASON: \n" + JSON.stringify(_G.linkedshapes.id0));
		var re = "";

		if(ssid==uistate.shownlinkedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='makeLinkedShapeSelected(\"" + ssid + "\");'>";
		re += "<td class='layerthumb'><canvas id='layerthumb"+ssid+"' height='"+uistate.thumbsize+"' width='"+uistate.thumbsize+"'></canvas></td>";
		re += "<td class='layername'>" + _G.linkedshapes[ssid].shape.name + "</td></tr>";

		return re;
	}
	
	function makeLinkedShapeSelected(ssid){
		//debug("MAKELINKEDSHAPESELECTED - ssid: " + ssid);
		uistate.shownlinkedshape = ssid;
		uistate.selectedshape = ssid;
		uistate.shapelayers = [_G.linkedshapes[ssid].shape];
		navigate();
	}

	
//-------------------
// REDRAW
//-------------------

	function linkedshapesredraw(){
		//debug("!!! LINKEDSHAPEREDRAW !!! - shownlinkedshape:" + uistate.shownlinkedshape + ", uistate.selectedshape:" + uistate.selectedshape);
				
		uistate.chareditctx.clearRect(0,0,5000,5000);
		grid();
		vertical(uistate.chareditcanvassize.makeCrisp());
		
		_G.linkedshapes[uistate.shownlinkedshape].shape.drawShape_Single(uistate.chareditctx);
		
		if(_G.linkedshapes[uistate.selectedshape]) {
			_G.linkedshapes[uistate.selectedshape].shape.drawSelectOutline();
		}

		updateNavPrimaryNavTarget();

		updatetools();	
	}

	
//-------------------
// Update Details
//-------------------
	function linkedShapeCharDetails(){
		var content = "";	

		//content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Linked Shape ID </td><td> " + uistate.shownlinkedshape + " </td></tr>";	
			
		if(_G.linkedshapes[uistate.shownlinkedshape].usedin.length > 0){
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
		var ui = _G.linkedshapes[uistate.shownlinkedshape].usedin;

		for(var k=0; k<ui.length; k++){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas id='thumb"+ui[k]+"' class='ssusedinthumb' height="+uistate.thumbsize+"' width="+uistate.thumbsize+" onclick='goToEditChar("+(ui[k]*1)+");'></canvas>";
			re += "</td></tr><tr><td>"
			re += _G.fontchars[(ui[k]*1)].charvalue;
			re += "</td></tr></table>";
			//debug("GENERATEUSEDINTHUMBS - created canvas 'thumb"+ui[k]+"'");
		}
		re += "</div>";
		return re;
	}
	
	function goToEditChar(chid){
		uistate.selectedshape = -1;	
		uistate.selectedchar = chid;
		uistate.navhere = "character edit";
		uistate.navprimaryhere = "npAttributes";
		navigate();	
	}
	
	function drawUsedinThumbs(){
		var ps = _G.projectsettings;
		var ui = _G.linkedshapes[uistate.shownlinkedshape].usedin;
		//debug("DRAWUSEDINTHUMBS - start, drawing " + ui.length);
		var tctx = {};
		var factor = ((uistate.thumbsize-(2*uistate.thumbgutter))/(ps.upm));
		var yoffset = (uistate.thumbgutter+(ps.upm*factor));
		
		//debug("DRAWUSEDINTHUMBS - used in array is " + JSON.stringify(ui));

		for(var k=0; k<ui.length; k++){
			debug("DRAWUSEDINTHUMBS - getting thumb " + ui[k]);
			tctx = document.getElementById(("thumb"+ui[k])).getContext("2d");
			drawCharToArea(tctx, ui[k], factor, uistate.thumbgutter, yoffset);
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
			allactions += "<input class='"+(uistate.linkedshapeundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((uistate.linkedshapeundoq.length > 0) ? (" " + uistate.linkedshapeundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "</td>";
		
		var linkedshapeactions = "<td><h3>linked shape</h3>";
			linkedshapeactions += "<input class='button' type='button' value='create new' onclick='addLinkedShape();putundoq(\"create new linked shape\");navigate();'><br>";
			linkedshapeactions += "<input class='"+(aalength(_G.linkedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteLinkedShapeConfirm();'><br>";		
			linkedshapeactions += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
			
		var shapeactions = "";
			if(uistate.eventhandlers.temppathdragshape && uistate.selectedtool=="pathedit"){
			shapeactions += "<td><h3>shape</h3>";
			shapeactions += "<input class='button' type='button' value='Flip Horizontal' onclick='ss().path.flipEW();putundoq(\"flip shape horizontal\");redraw();'><br>";
			shapeactions += "<input class='button' type='button' value='Flip Vertical' onclick='ss().path.flipNS();putundoq(\"flip shape vertical\");redraw();'><br>";
			shapeactions += "</td>";
			}
			
		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='uistate.showgrid? uistate.showgrid=false : uistate.showgrid=true; redraw();'><br>"; 
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='uistate.showguides? uistate.showguides=false : uistate.showguides=true; redraw();'><br>"; 
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
		if(uistate.selectedtool != "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		else { content += "<td><h3>&nbsp;</h3></td>"; }
		
		content += "</tr><tr>";
		content += canvasactions;
		
		content += "</td></tr></table>";
		return content;
	}

	function addLinkedShape(){
		var newid = generateNewSSID();
		var newname = ("linkedshape " + _G.projectsettings.linkedshapecounter);

		uistate.shownlinkedshape = newid;
		uistate.selectedshape = newid;

		_G.linkedshapes[newid] = new LinkedShape({"name":newname});

		//debug("Added New Linked Shape: " + newid + " JSON=" + JSON.stringify(_G.linkedshapes));
	}

	function deleteLinkedShapeConfirm(){
		var content = "Are you sure you want to delete this linked shape?<br>";
		var uia = _G.linkedshapes[uistate.shownlinkedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the linked shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _G.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This linked shape is not currently being used by any characters.<br>";
		}
		
		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><input type='button' value='permanently delete this linked shape' onclick='deleteLinkedShape();'> &nbsp; <input type='button' value='cancel' onclick='closeDialog();'>";

		openDialog(content);
	}
	
	function deleteLinkedShape(){
		//debug("DELETELINKEDSHAPE - deleting " + uistate.shownlinkedshape);
		closeDialog();
		if(aalength(_G.linkedshapes)>1){
			// find & delete all linked shape instances
			var uia = _G.linkedshapes[uistate.shownlinkedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = _G.fontchars[uia[cui]].charshapes;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #uistate.shapelayers " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .link " + tc[sl].link + " checking against " + uistate.shownlinkedshape);
					if(tc[sl].link == uistate.shownlinkedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}
			
			// delete linkedshape and switch selection
			delete _G.linkedshapes[uistate.shownlinkedshape];
			uistate.shownlinkedshape = getFirstLinkedShape();
			uistate.selectedshape = uistate.shownlinkedshape;
			//debug("DELETELINKEDSHAPE - delete complete, new shownlinkedshape = " + shownlinkedshape);
			
			navigate();
		} else {
			alert("Error: deleting the last linked shape should not have been an allowed action.");
		}
	}

	function pasteLinkedShape(){
		if(uistate.clipboardshape){
			_G.linkedshapes[uistate.shownlinkedshape].shape = uistate.clipboardshape;
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
		var temschar = uistate.selectedchar;
		selectchar(chid, true);
		insertLinkedShape(uistate.shownlinkedshape);
		uistate.selectedchar = temschar;
		putundoq("insert linked shape from linkedshapes");
		closeDialog();
		showAddSSToCharDialog("The LinkedShape '" + _G.linkedshapes[uistate.shownlinkedshape].shape.name + "' was successfully inserted into character " + _G.fontchars[chid].charname + ".<br><br>");
	}

	
	
	