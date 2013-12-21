

	function updateseedshapes(toggle){

		document.getElementById("mainpane").innerHTML = seedshapes_content();
		
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		grid();
		document.onkeypress = keypress;
		
		uistate.selectedshape = -1;
		seedshapesredraw();	
	}

	function seedshapes_content(){					
		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		re += '<table class="charedittable" cellspacing=0 cellpadding=0 border=0><tr>';
		re += '<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>';			
		re += '<tr><td id="actionsarea"> [ERROR: Uninitialized content] </td>';		
		re += '</tr></table>';
		
		return re;
	}

	function seedshapes_subnav(){
		var re = "<div class='subnavunit'>";
		re += "<table class='layertable'>";
		for(var ssid in _G.seedshapes){
			//debug("SEEDSHAPES_SUBNAV - making button for " + ssid);
			re += makeSSSubnavButton(ssid);
		}
		re += "</table>";
		
		re += "<h1>actions</h1>";
		re += "<table class='actionsgrid'><tr><td><h3>seed shape</h3>";
		re += "<input class='button' type='button' value='create new' onclick='addSeedShape();putundoq(\"create new seed shape\");navigate();'><br>";
		re += "<input class='"+(aalength(_G.seedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteSeedShapeConfirm();'><br>";		
		re += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
		re += "</td> &nbsp; </td></td> &nbsp; </td></tr></table>";

		return re;
	}
	
	function drawSeedShapeLayerThumbs(){
		debug("DRAWSEEDSHAPELAYERTHUMBS - start");
		var fs = _G.fontsettings;
		var tctx = {};
		var tele = false;
		var factor = ((uistate.layerthumbsize-(2*uistate.layerthumbgutter))/(fs.upm + (fs.upm*_G.projectsettings.descender)));
		var yoffset = (uistate.layerthumbgutter+(fs.upm*factor));
		for(var ssid in _G.seedshapes){
			tele = document.getElementById(("layerthumb"+ssid))
			tctx = tele.getContext("2d");
			tele.style.backgroundColor = uistate.colors.offwhite;
			if(ssid==uistate.shownseedshape) tele.style.backgroundColor = "rgb(255,255,255)";
			_G.seedshapes[ssid].shape.drawShapeToArea_Single(tctx, factor, uistate.layerthumbgutter, yoffset);
		}
		debug("DRAWSEEDSHAPELAYERTHUMBS - end");
	}

	function makeSSSubnavButton(ssid){
		//debug("MAKESSSUBNAVBUTTON passed ssid:" + ssid + " and SS JASON: \n" + JSON.stringify(_G.seedshapes.id0));
		var re = "";

		if(ssid==uistate.shownseedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='makeSeedShapeSelected(\"" + ssid + "\");'>";
		re += "<td class='layerthumb'><canvas id='layerthumb"+ssid+"' height='"+uistate.layerthumbsize+"' width='"+uistate.layerthumbsize+"'></canvas></td>";
		re += "<td class='layername'>" + _G.seedshapes[ssid].shape.name + "</td></tr>";

		return re;
	}
	
	function makeSeedShapeSelected(ssid){
		//debug("MAKESEEDSHAPESELECTED - ssid: " + ssid);
		uistate.shownseedshape = ssid;
		uistate.selectedshape = ssid;
		uistate.shapelayers = [_G.seedshapes[ssid].shape];
		navigate();
	}

	
//-------------------
// REDRAW
//-------------------

	function seedshapesredraw(){
		debug("!!! SEEDSHAPEREDRAW !!! - shownseedshape:" + uistate.shownseedshape + ", uistate.selectedshape:" + uistate.selectedshape);
				
		uistate.chareditctx.clearRect(0,0,5000,5000);
		grid();
		vertical(uistate.chareditcanvassettings.size.makeCrisp());
		
		_G.seedshapes[uistate.shownseedshape].shape.drawShape_Single(uistate.chareditctx);
		
		if(_G.seedshapes[uistate.selectedshape]) {
			_G.seedshapes[uistate.selectedshape].shape.drawselectoutline();
		}

		updateNavPrimaryNavTarget();

		updatetools();	
	}

	
//-------------------
// Update Details
//-------------------
	function seedShapeCharDetails(){
		var content = "";	

		//content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Seed Shape ID </td><td> " + uistate.shownseedshape + " </td></tr>";	
			
		if(_G.seedshapes[uistate.shownseedshape].usedin.length > 0){
			content += "<table style='margin-top:10px;'><tr><td colspan=3><h3>characters that use this seed shape</h3>";
			content += generateUsedinThumbs();
			content += "</td></tr></table>";	
		} else {
			content += "<table><tr><td>&nbsp;</td><td colspan=2><br><i>this seed shape is not currently being used by any characters. <a href='#' onclick='showAddSSToCharDialog();'>add this seed shape to a character now</a>.</i></td></tr></table>"
		}

		debug("SEEDSHAPECHARDETAILS - returning html:\n" + content);
		return content;
	}
	
	var ssthumbsize = 49;
	var ssthumbgutter = 5;	
	
	function generateUsedinThumbs(){		
		var re = "<div class='ssthumbcontainer'>";
		var ui = _G.seedshapes[uistate.shownseedshape].usedin;

		for(var k=0; k<ui.length; k++){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas id='thumb"+ui[k]+"' class='ssusedinthumb' height="+ssthumbsize+"' width="+ssthumbsize+" onclick='goToEditChar("+(ui[k]*1)+");'></canvas>";
			re += "</td></tr><tr><td>"
			re += _G.fontchars[(ui[k]*1)].charvalue;
			re += "</td></tr></table>";
			debug("GENERATEUSEDINTHUMBS - created canvas 'thumb"+ui[k]+"'");
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
		var fs = _G.fontsettings;
		var ui = _G.seedshapes[uistate.shownseedshape].usedin;
		debug("DRAWUSEDINTHUMBS - start, drawing " + ui.length);
		var tctx = {};
		var factor = ((ssthumbsize-(2*ssthumbgutter))/(fs.upm + (fs.upm*_G.projectsettings.descender)));
		var yoffset = (ssthumbgutter+(fs.upm*factor));
		
		//debug("DRAWUSEDINTHUMBS - used in array is " + JSON.stringify(ui));

		for(var k=0; k<ui.length; k++){
			debug("DRAWUSEDINTHUMBS - getting thumb " + ui[k]);
			tctx = document.getElementById(("thumb"+ui[k])).getContext("2d");
			drawCharToArea(tctx, ui[k], factor, ssthumbgutter, yoffset);
			debug(" - drawCharToArea canvas 'thumb"+ui[k]+"'");
		}
	}
	
	
	
//-------------------
// Update Actions
//-------------------
	function updateseedshapeactions(){
		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";
				
		var s = ss("Update Actions");		
		
		var allactions = "<td><h3>*</h3>";
			allactions += "<input class='"+(uistate.seedundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((uistate.seedundoq.length > 0) ? (" " + uistate.seedundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "</td>";
		
		var seedshapeactions = "<td><h3>seed shape</h3>";
			seedshapeactions += "<input class='button' type='button' value='create new' onclick='addSeedShape();putundoq(\"create new seed shape\");navigate();'><br>";
			seedshapeactions += "<input class='"+(aalength(_G.seedshapes)>1? "button": "buttondis")+"' type='button' value='delete' onclick='deleteSeedShapeConfirm();'><br>";		
			seedshapeactions += "<input class='button' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
			
		var shapeactions = "";
			if(uistate.eventhandlers.temppathdragshape && uistate.selectedtool=="pathedit"){
			shapeactions += "<td><h3>shape</h3>";
			shapeactions += "<input class='button' type='button' value='Flip Horizontal' onclick='ss().path.flipew();putundoq(\"flip shape horizontal\");redraw();'><br>";
			shapeactions += "<input class='button' type='button' value='Flip Vertical' onclick='ss().path.flipns();putundoq(\"flip shape vertical\");redraw();'><br>";
			shapeactions += "</td>";
			}
			
		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='uistate.chareditcanvassettings.showgrid? uistate.chareditcanvassettings.showgrid=false : uistate.chareditcanvassettings.showgrid=true; redraw();'><br>"; 
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='uistate.chareditcanvassettings.showguides? uistate.chareditcanvassettings.showguides=false : uistate.chareditcanvassettings.showguides=true; redraw();'><br>"; 
			canvasactions += "</td>";
			
		var pointactions = "<td><h3>path point</h3>";
			pointactions += "<input class='button' type='button' value='Add to start' onclick='ss().path.addPathPoint(false, true); putundoq(\"add pp start\"); redraw();'><br>";
			pointactions += "<input class='button' type='button' value='Add to end' onclick='ss().path.addPathPoint(false, false); putundoq(\"add pp end\"); redraw();'><br>";
			pointactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='ss().path.deletePathPoint(); putundoq(\"delete pp\"); redraw();'><br>";
			pointactions += "<input class='button' type='button' value='Reset Handles' onclick='ss().path.sp().resetHandles(); putundoq(\"reset pp\"); redraw();'><br>";	
			pointactions += "</td>";
		
		// Put it all together
		content += allactions;
		content += seedshapeactions;
		content += shapeactions;

		var ispointsel = false;
		if(s && !s.seed) ispointsel = s.path.sp(false);
		if(uistate.selectedtool != "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		else { content += "<td><h3>&nbsp;</h3></td>"; }
		
		content += "</tr><tr>";
		content += canvasactions;
		
		content += "</td></tr></table>";
		return content;
	}

	function addSeedShape(){
		var newid = generateNewSSID();
		var newname = ("seedshape " + seedshapecounter);

		uistate.shownseedshape = newid;
		uistate.selectedshape = newid;

		_G.seedshapes[newid] = new SeedShape({"name":newname});

		debug("Added New Seed Shape: " + newid + " JSON=" + JSON.stringify(_G.seedshapes));
	}

	function deleteSeedShapeConfirm(){
		var content = "Are you sure you want to delete this seed shape?<br>";
		var uia = _G.seedshapes[uistate.shownseedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the seed shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _G.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This seed shape is not currently being used by any characters.<br>";
		}
		
		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><input type='button' value='permanently delete this seed shape' onclick='deleteSeedShape();'> &nbsp; <input type='button' value='cancel' onclick='closeDialog();'>";

		openDialog(content);
	}
	
	function deleteSeedShape(){
		//debug("DELETESEEDSHAPE - deleting " + uistate.shownseedshape);
		closeDialog();
		if(aalength(_G.seedshapes)>1){
			// find & delete all seed shape instances
			var uia = _G.seedshapes[uistate.shownseedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = _G.fontchars[uia[cui]].charshapes;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #uistate.shapelayers " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .seed " + tc[sl].seed + " checking against " + uistate.shownseedshape);
					if(tc[sl].seed == uistate.shownseedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}
			
			// delete seedshape and switch selection
			delete _G.seedshapes[uistate.shownseedshape];
			uistate.shownseedshape = getFirstSeedShape();
			uistate.selectedshape = uistate.shownseedshape;
			//debug("DELETESEEDSHAPE - delete complete, new shownseedshape = " + shownseedshape);
			
			navigate();
		} else {
			alert("Error: deleting the last seed shape should not have been an allowed action.");
		}
	}

	function pasteSeedShape(){
		if(uistate.clipboardshape){
			_G.seedshapes[uistate.shownseedshape].shape = uistate.clipboardshape;
		}
	}

	function showAddSSToCharDialog(msg){
		var content = "<table style='width:756px'><tr><td>";
		content += msg? msg : "";
		content += "Select the character into which you would like to insert this seed shape:<br><br></td></tr>";
		content += "<tr><td>";
		content += updateselectchar("insertSeedShapeToChar");
		content += "</td></tr>";
		content += "<tr><td><br><input type='button' class='button' value='done' onclick='closeDialog();'/></td></tr></table>";
		openDialog(content);
		drawselectcharcanvas();
	}
	
	function insertSeedShapeToChar(chid){
		var temschar = uistate.selectedchar;
		selectchar(chid, true);
		insertSeedShape(uistate.shownseedshape);
		uistate.selectedchar = temschar;
		putundoq("insert seed shape from seedshapes");
		closeDialog();
		showAddSSToCharDialog("The SeedShape '" + _G.seedshapes[uistate.shownseedshape].shape.name + "' was successfully inserted into character " + _G.fontchars[chid].charname + ".<br><br>");
	}

	
	
	