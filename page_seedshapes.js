
	var shownseedshape = "";

	function updateseedshapes(toggle){

		document.getElementById("mainpane").innerHTML = seedshapes_content();
		
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		grid();
		document.onkeypress = keypress;
		
		selectedshape = -1;
		seedshapesredraw();	
	}

	function seedshapes_content(){					
		var re = '<canvas id="canvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		re += '<table class="charedittable" cellspacing=0 cellpadding=0 border=0><tr>';
		re += '<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>';			
		re += '<tr><td id="actionsarea"> [ERROR: Uninitialized content] </td>';		
		re += '</tr></table>';
		
		return re;
	}

	function seedshapes_subnav(){
		var re = "<div class='subnavunit'>";
		for(var ssid in GlyphrProject.seedshapes){
			//debug("SEEDSHAPES_SUBNAV - making button for " + ssid);
			re += makeSSSubnavButton(ssid);
		}
		re += "<br><br><input type='button' class='button' onclick='addSeedShape();putundoq(\"create new seed shape\");navigate();' value='Add a new seed shape'></div>";
		return re;
	}
	
	function makeSSSubnavButton(ssid){
		var re = "<input class='button' ";
		if(ssid==shownseedshape) { re = "<input class='buttonsel' "; }
		
		re += "value='" + GlyphrProject.seedshapes[ssid].shape.name + "' ";
		re += "style='width:100%' type='button'";
		re += "onclick='makeSeedShapeSelected(\"" + ssid + "\");' ";
		re += ">";
		
		return re;
	}
	
	function makeSeedShapeSelected(ssid){
		//debug("MAKESEEDSHAPESELECTED - ssid: " + ssid);
		shownseedshape = ssid;
		selectedshape = ssid;
		shapelayers = new Array(GlyphrProject.seedshapes[ssid].shape);
		navigate();
	}

	
//-------------------
// REDRAW
//-------------------

	function seedshapesredraw(){
		//debug("<b>!!! SEEDSHAPEREDRAW !!!</b> - shownseedshape:" + shownseedshape + ", selectedshape:" + selectedshape);
		var ss = GlyphrProject.seedshapes;
		
		ctx.clearRect(0,0,5000,5000);
		grid();
		vertical(cec.size.makeCrisp());
		
		ss[shownseedshape].shape.drawShape(ctx);
		
		if(ss[selectedshape]) ss[selectedshape].shape.drawselectoutline();
		
		
		//updatedetails();
		updateNavPrimaryNavTarget();
		
		
		if(!document.getElementById("pointcornercanvas")){
			// Lame way of detecting point selection
			drawUsedinThumbs();
		}
		
		updateseedshapeactions();
		updatetools();	
	}

	
//-------------------
// Update Details
//-------------------
	function seedShapeCharDetails(){
		var content = "";	

		//content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Seed Shape ID </td><td> " + shownseedshape + " </td></tr>";	
			
		if(GlyphrProject.seedshapes[shownseedshape].usedin.length > 0){
			content += "<table><tr><td colspan=3><h3>characters that use this seed shape</h3>";
			content += generateUsedinThumbs();
			content += "</td></tr></table>";	
		} else {
			content += "<table><tr><td>&nbsp;</td><td colspan=2><br><i>this seed shape is not currently being used by any characters. <a href='#' onclick='showAddSSToCharDialog();'>add this seed shape to a character now</a>.</i></td></tr></table>"
		}

		return content;
	}
	
	var ssthumbsize = 60;
	var ssthumbgutter = 5;	
	
	function generateUsedinThumbs(){		
		var re = "<div class='ssthumbcontainer'>";
		var ui = GlyphrProject.seedshapes[shownseedshape].usedin;

		for(var k=0; k<ui.length; k++){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas id='thumb"+ui[k]+"' class='ssusedinthumb' height="+ssthumbsize+"' width="+ssthumbsize+" onclick='goToEditChar("+(ui[k]*1)+");'></canvas>";
			re += "</td></tr><tr><td>"
			re += GlyphrProject.fontchars[(ui[k]*1)].charvalue;
			re += "</td></tr></table>";
			//debug("GENERATEUSEDINTHUMBS - created canvas 'thumb"+ui[k]+"'");
		}
		re += "</div>";
		return re;
	}
	
	function goToEditChar(chid){
		selectedshape = -1;	
		selectedchar = chid;
		navhere = "character edit";
		navigate();	
	}
	
	function drawUsedinThumbs(){
		var fs = GlyphrProject.settings;
		var ui = GlyphrProject.seedshapes[shownseedshape].usedin;
		var tctx = new Object();
		var factor = ((ssthumbsize-(2*ssthumbgutter))/(fs.upm + (fs.upm*fs.descender)));
		var yoffset = (ssthumbgutter+(fs.upm*factor));
		
		for(var k=0; k<ui.length; k++){
			tctx = document.getElementById(("thumb"+ui[k])).getContext("2d");
			drawCharToArea(tctx, ui[k], factor, ssthumbgutter, yoffset);
			//debug(" - drawCharToArea canvas 'thumb"+ui[k]+"'");
		}
	}
	
	
	
//-------------------
// Update Actions
//-------------------
	function updateseedshapeactions(){
		var content = "<table class='actionsgrid'><tr>";
				
		var s = ss("Update Actions");		
		
		var allactions = "<td><h3>*</h3>";
			allactions += "<input class='"+(seedundoq.length>0? "button": "buttondis")+"' style='width:150px;' type='button' value='Undo" + ((seedundoq.length > 0) ? (" " + seedundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "</td>";
		
		var seedshapeactions = "<td><h3>seed shape</h3>";
			seedshapeactions += "<input class='button' style='width:150px;' type='button' value='create new seed shape' onclick='addSeedShape();putundoq(\"create new seed shape\");navigate();'><br>";
			seedshapeactions += "<input class='"+(aalength(GlyphrProject.seedshapes)>1? "button": "buttondis")+"' style='width:150px;' type='button' value='delete this seed shape' onclick='deleteSeedShapeConfirm();'><br>";		
			seedshapeactions += "<input class='button' style='width:150px;' type='button' value='insert to character' onclick='showAddSSToCharDialog();'><br>";		
			
		var shapeactions = "";
			/*
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Copy' onclick='copyshape()'><br>";
			shapeactions += "<input class='"+(clipboardshape? "button": "buttondis")+"' type='button' value='Paste' onclick='pasteSeedShape();putundoq(\"paste seed shape\");redraw();'><br>";
			*/
			if(temppathdragshape && selectedtool=="pathedit"){
			shapeactions += "<td><h3>shape</h3>";
			shapeactions += "<input class='button' type='button' value='Flip Horizontal' onclick='ss().path.flipew();putundoq(\"flip shape horizontal\");redraw();'><br>";
			shapeactions += "<input class='button' type='button' value='Flip Vertical' onclick='ss().path.flipns();putundoq(\"flip shape vertical\");redraw();'><br>";
			shapeactions += "</td>";
			}
			
		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<input class='button' type='button' value='Toggle Grid' onclick='cec.showgrid? cec.showgrid=false : cec.showgrid=true; redraw();'><br>"; 
			canvasactions += "<input class='button' type='button' value='Toggle Guides' onclick='cec.showguides? cec.showguides=false : cec.showguides=true; redraw();'><br>"; 
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
		if(selectedtool != "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		
		content += "</tr><tr>";
		content += canvasactions;
		
		content += "</td></tr></table>";
		document.getElementById("actionsarea").innerHTML = content;
	}

	function addSeedShape(){
		var newid = generateNewSSID();
		var newname = ("seedshape " + seedshapecounter);
		var newshape = new shape({"n":newname});

		shownseedshape = newid;
		selectedshape = newid;
		GlyphrProject.seedshapes[newid] = new Object();
		GlyphrProject.seedshapes[newid].shape = newshape;
		GlyphrProject.seedshapes[newid].usedin = new Array();
	}

	function deleteSeedShapeConfirm(){
		var content = "Are you sure you want to delete this seed shape?<br>";
		var uia = GlyphrProject.seedshapes[shownseedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the seed shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + GlyphrProject.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This seed shape is not currently being used by any characters.<br>";
		}
		
		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><input type='button' value='permanently delete this seed shape' onclick='deleteSeedShape();'> &nbsp; <input type='button' value='cancel' onclick='closeDialog();'>";

		openDialog(content);
	}
	
	function deleteSeedShape(){
		//debug("DELETESEEDSHAPE - deleting " + shownseedshape);
		closeDialog();
		if(aalength(GlyphrProject.seedshapes)>1){
			// find & delete all seed shape instances
			var uia = GlyphrProject.seedshapes[shownseedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = GlyphrProject.fontchars[uia[cui]].charglyphdata;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #shapelayers " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .seed " + tc[sl].seed + " checking against " + shownseedshape);
					if(tc[sl].seed == shownseedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}
			
			// delete seedshape and switch selection
			delete GlyphrProject.seedshapes[shownseedshape];
			shownseedshape = getFirstSeedShape();
			selectedshape = shownseedshape;
			//debug("DELETESEEDSHAPE - delete complete, new shownseedshape = " + shownseedshape);
			
			navigate();
		} else {
			alert("Error: deleting the last seed shape should not have been an allowed action.");
		}
	}

	function pasteSeedShape(){
		if(clipboardshape){
			GlyphrProject.seedshapes[shownseedshape].shape = clipboardshape;
		}
	}

	function showAddSSToCharDialog(){
		var content = "Select the character into which you would like to insert this seed shape:<br><br><div style='width:800px;'>";
		content += updateselectchar("insertSeedShapeToChar");
		content += "</div>";
		openDialog(content);
	}
	
	function insertSeedShapeToChar(chid){
		var temschar = selectedchar;
		selectchar(chid);
		insertSeedShape(shownseedshape);
		selectedchar = temschar;
		putundoq("insert seed shape from seedshapes");
		closeDialog();
		var con = "The SeedShape '" + GlyphrProject.seedshapes[shownseedshape].shape.name + "' was successfully inserted<br>into character " + GlyphrProject.fontchars[chid].charname + ".";
		con += "<br><br><input type='button' value='insert to another character' onclick='showAddSSToCharDialog();'> &nbsp; <input type='button' value='close' onclick='closeDialog();'>";
		openDialog(con);
	}

	
	
	