
	function updatecharedit(){
		document.getElementById("mainpane").innerHTML = charedit_content();
			
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		
		uistate.selectedtool = "pathedit";
		
		redraw();	
	}
	
	function charedit_content(){
		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		return re;
	}
	
	var selectchardrawarr = [];
	
	function updateselectchar(fname){
		var ccon = "<div class='charselectarea'>"
		fname = fname? fname : "selectchar";
		selectchardrawarr = [];
		
		//Capitol Letters
		for(var i=65; i<91; i++){ccon += buildbutton(i, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";
		
		//Lowercase Letters
		for(var i=97; i<123; i++){ccon += buildbutton(i, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";
				
		// Symbols		
		for(var i=33; i<48; i++){ccon += buildbutton(i, fname);}
		for(var i=58; i<65; i++){ccon += buildbutton(i, fname);}
		for(var i=91; i<97; i++){ccon += buildbutton(i, fname);}
		for(var i=123; i<127; i++){ccon += buildbutton(i, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";
		
		// Space
		ccon += buildbutton(32, fname);
		ccon += "</div>";
		
		debug("UPDATESELECTCHAR - selectchardrawarr.length = " + selectchardrawarr.length);
		
		return ccon;
	}	

	function drawselectcharcanvas(){
		var scthumbsize = 50;
		var scthumbgutter = 5;	
		
		var fs = _G.fontsettings;
		var factor = ((scthumbsize-(2*scthumbgutter))/(fs.upm + (fs.upm*_G.projectsettings.descender)));
		var yoffset = (scthumbgutter+(fs.upm*factor));
		
		//debug("DRAWSELECTCHARCANVAS - selectchardrawarr: " + selectchardrawarr);
		
		for(var sc=0; sc<selectchardrawarr.length; sc++){
			var tc = selectchardrawarr[sc];
			//debug("---------------------- i: " + sc + " id: " + tc);
			var scan = document.getElementById("cs"+tc);
			scan.width = scthumbsize;
			scan.height = scthumbsize;
			var sctx = scan.getContext("2d");
			
			drawCharToArea(sctx, tc, factor, scthumbgutter, yoffset);
		}
	}
	
	function buildbutton(index, fname){
		var onc = (fname + "(" + index + ");");
		var rv = "<div class='charselectbuttonwrapper' onclick='"+onc+"' title='"+_G.fontchars[index].charname+"'>";
		var issel = _G.fontchars[index].charvalue == _G.fontchars[uistate.selectedchar].charvalue;
		issel = issel & (uistate.navhere != "seed shapes");
		
		if(_G.fontchars[index].charglyphdata[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";} 
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			selectchardrawarr.push(index);
		} else {	
			if(issel) {rv += "<div class='charselectbuttonsel'>";} 
			else {rv += "<div class='charselectbutton'>";}

			var bv = _G.fontchars[index].charvalue;
			if(bv == "'") bv = "&#39";
			
			rv += (bv+"</div>");
		}
		
		rv += "</div>";

		return rv;
	}
	
	function selectchar(c){
		//debug("SELECTCHAR - Selecting " + _G.fontchars[c].charvalue + " from value " + c);
		uistate.selectedchar = c;
		uistate.shapelayers = _G.fontchars[c].charglyphdata;
		uistate.selectedshape = -1;
		navigate();
	}

	function setupGhostCanvas(){
		//	Check Maxes Ghost Canvas Dimensions
		//	.5em to the left of x=0 and below descender
		//	1.25em to the right of x=0 and above descender 
		
		uistate.calcmaxesghostcanvas = document.getElementById('calcmaxesghostcanvas');
		uistate.calcmaxesghostcanvas.height = uistate.calcmaxesghostcanvassettings.size;
		uistate.calcmaxesghostcanvas.width = uistate.calcmaxesghostcanvassettings.size;
		uistate.calcmaxesghostctx = uistate.calcmaxesghostcanvas.getContext('2d');
		uistate.calcmaxesghostctx.fillStyle = "lime";
		uistate.calcmaxesghostctx.globalAlpha = .5;
		uistate.calcmaxesghostcanvas.style.backgroundColor = "transparent";
		
		
		//Is Here Ghost Canvas - same size as CEC
		uistate.ishereghostcanvas = document.getElementById('ishereghostcanvas');
		//ishereghostcanvas = document.createElement('canvas');
		uistate.ishereghostcanvas.height = uistate.chareditcanvassettings.size;
		uistate.ishereghostcanvas.width = uistate.chareditcanvassettings.size;
		uistate.ishereghostctx = uistate.ishereghostcanvas.getContext('2d');
		uistate.ishereghostctx.fillStyle = "cyan";
		uistate.ishereghostctx.globalAlpha = .5;
		uistate.ishereghostcanvas.style.backgroundColor = "transparent";
	}

	function setupEditCanvas(){
		uistate.chareditcanvas = document.getElementById("chareditcanvas");
		uistate.chareditcanvas.height = uistate.chareditcanvassettings.size;
		uistate.chareditcanvas.width = uistate.chareditcanvassettings.size;
		uistate.chareditctx = uistate.chareditcanvas.getContext("2d");
		uistate.chareditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		uistate.chareditcanvas.onmouseout = mouseoutcec;
		uistate.chareditcanvas.onmouseover = mouseovercec;
		
	}
	
	function resetCursor() { document.body.style.cursor = 'default'; }
		
	function resetZoomPan(){
		uistate.chareditcanvassettings.originx = 140;
		uistate.chareditcanvassettings.originy = 740;
		uistate.chareditcanvassettings.zoom = .32;
	}

		
//-------------------
// REDRAW
//-------------------
	function redraw(){
		if(uistate.navhere == "seed shapes") {seedshapesredraw(); return;}		
		
		var fc = _G.fontchars;
		
		uistate.chareditctx.clearRect(0,0,uistate.chareditcanvassettings.size,uistate.chareditcanvassettings.size);
		grid();
		
		// load char info
		uistate.shapelayers = fc[uistate.selectedchar].charglyphdata;
		//debug("!!! REDRAW !!! - uistate.selectedchar: " + uistate.selectedchar + " - numshapes: " + uistate.shapelayers.length + " - navhere: " + navhere);	
		
		// Only update charwidth if isautowide is true
		var neww = fc[uistate.selectedchar].isautowide;
		if(neww) {fc[uistate.selectedchar].charwidth = 0;}
		

		var sh;
		for(var jj=0; jj<uistate.shapelayers.length; jj++) {
			//debug("================ shape " + jj + "/" + uistate.shapelayers.length);
			
			sh = uistate.shapelayers[jj];
			//debug("================ JSON: " + JSON.stringify(sh));
			
			sh.drawShape(uistate.chareditctx);
			
			if(neww) {
				var thisrightx = 0;
				if(sh.seed){
					var tss = _G.seedshapes[sh.seed].shape;
					if(sh.useseedxy) {
						thisrightx = tss.path.rightx;
						//debug("REDRAW - useseedxy=true, thisrightx set to: " + thisrightx);
					} else {
						thisrightx = (tss.path.rightx + sh.xpos);
						//debug("REDRAW - useseedxy=false, thisrightx set to: " + thisrightx);
					}
				} else {
					thisrightx = sh.path.rightx;
				}
				fc[uistate.selectedchar].charwidth = Math.max(fc[uistate.selectedchar].charwidth, thisrightx);
				//debug("REDRAW - charwidth as of shape# " + jj + " set to: " + fc[uistate.selectedchar].charwidth);
			}
		}
		//debug("REDRAW - done drawing, charwidth is: " + fc[uistate.selectedchar].charwidth);

		var s = ss("Redraw");
		if(s) {
			//debug("REDRAW - selected shape .seed: " + s.seed + " which evals as: " + (s.seed!=false) );
			s.drawselectoutline(s.seed != false);
							
			if(s.seed){
				//debug("REDRAW - detected this.seed, setting uistate.selectedtool = shaperesize");
				uistate.selectedtool = "shaperesize";
			}
		}
		
		updateNavPrimaryNavTarget();
		
		updatetools();
		
		
		//show right hand line
		if(uistate.chareditcanvassettings.showguides && uistate.showrightline){
			uistate.chareditctx.lineWidth = 1;
			//uistate.chareditctx.strokeStyle = shiftColor(_G.projectsettings.color_guideline, .5, true);
			uistate.chareditctx.strokeStyle = _G.projectsettings.color_guideline;
			var rhl = (fc[uistate.selectedchar].charwidth*uistate.chareditcanvassettings.zoom) + uistate.chareditcanvassettings.originx;
			if(temppathdragshape){
				rhl = Math.max(sx_cx(temppathdragshape.rightx), rhl);
			}
			if(neww){rhl += (_G.fontsettings.upm*_G.fontsettings.kerning*uistate.chareditcanvassettings.zoom) }
			vertical(rhl);
		}
		
		/*
		// debug points
		if(uistate.debugpoints[0]){
			for(var s=0; s<uistate.debugpoints[0].path.pathpoints.length; s++){ 
				uistate.debugpoints[0].path.pathpoints[s].drawPoint("lime"); 
				uistate.debugpoints[0].path.pathpoints[s].drawHandles(true, true);
			}
		}
		if(uistate.debugpoints[1]){
			for(var s=0; s<uistate.debugpoints[1].path.pathpoints.length; s++){ 
				uistate.debugpoints[1].path.pathpoints[s].drawPoint("lime"); 
				uistate.debugpoints[1].path.pathpoints[s].drawHandles(true, true);
			}
		}
		*/
	}

	
//-------------------
// Update Details
//-------------------
	var locid = 0;
	var checkid = 0;
	var locarr = [];
	var checkarr = [];
	
	function updateCharEditDetails(){

		var s = ss("update details");
		
		var ispointsel = false;
		if(s && !s.seed) ispointsel = s.path.sp(false);
		if(uistate.selectedtool != "pathedit") ispointsel = false;
		
		var content = "";
		if(uistate.navhere == "seed shapes"){
			content = "<h1>" + _G.seedshapes[uistate.shownseedshape].shape.name + "</h1>";
		} else {
			content = "<h1>attributes</h1>";
		}
		
		locarr = [];
		checkarr = [];

		content += "<table class='detail'>";	
		
		//debug("UPDATEDETAILS - uistate.selectedshape: " + uistate.selectedshape + " - s.name: " + s.name + " - navhere: " + uistate.navhere);
		if (uistate.navhere == "character edit"){
			//debug("UPDATEDETAILS - detected navhere = character edit");
			if(s && s.seed){
				// seed shape selected
				//debug("UPDATEDETAILS: seed shape selected");
				content += seedShapeInstanceDetails(s);
			} else if (s){
				// regular shape selected
				//debug("UPDATEDETAILS: regular shape selected");
				content += shapeDetails(s);
				if(ispointsel){ content += pointDetails(s); }
			} else {
				// no shape selected
				//debug("UPDATEDETAILS: no shape selected");
				content += charDetails();	
			}

			content += "</table><br>";
			content += updateactions();

		} else if (uistate.navhere == "seed shapes"){
			//debug("UPDATEDETAILS - detected navhere = seed shapes");
			if (s){
				content += shapeDetails(s);
				if(ispointsel){ 
					content += pointDetails(s); 
				} else {
					content += seedShapeCharDetails();
				}
			}
			content += "</table><br>";
			content += updateseedshapeactions();
		}
		
		try {
			document.getElementById("navtargetpane").innerHTML = content;	
		} catch(err) {
			debug("UPDATEDETAILS - <b>innerHTML update error caught</b>");
		}
		
		ispointsel? drawPointButtons(s) : false;

	   	// draw UsedInThumbs for SeedShapes
	   	if(uistate.navhere == "seed shapes"){
	   		drawUsedinThumbs();
	   	}

		// draw locks
		//debug("UPDATEDETAILS - starting drawing locks, locarr.length = " + locarr.length);
		for(var j=0; j<locarr.length; j++){
			var thislocid = ("locid"+j);
			var obj = document.getElementById(thislocid);
			//debug("UPDATEDETAILS - drawing lock id " + thislocid + " obj = " + obj);
			if(obj){
				obj.height = 11;
				obj.width = 11;
				var color = locarr[j]? uistate.colors.button_selected : uistate.colors.button_resting;
				drawLockButton(obj, color);
			}
		}
		locid = 0;
		
		
		//draw checks
		for(var k=0; k<checkarr.length; k++){
			var thischeckid = ("checkid"+k);
			var obj = document.getElementById(thischeckid);
			if(obj){
				//debug("Drawing Check with ID: " + thischeckid + ", obj: " + obj + " passed: " + checkarr[k]);
				obj.height = 15;
				obj.width=15;
				drawCheckbox(obj, checkarr[k]);			
			}
		}
		checkid = 0;
	}
	
	function charDetails(s){
		var sc = _G.fontchars[uistate.selectedchar];
		var content = "";	
		
		content += "<tr><td colspan=3><h3>character "+sc.charvalue+"</h3></td></tr>";	
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> auto width </td><td width='50%'>"+checkUI("_G.fontchars[uistate.selectedchar].isautowide="+!sc.isautowide+"; redraw();", sc.isautowide)+"</td></tr>";

		if(!sc.isautowide){
			content += "<tr><td class='leftcol'>&nbsp;</td><td> width <span class='unit'>em units</span> </td><td><input class='input' type='text' value='" + sc.charwidth + "' onchange='_G.fontchars[uistate.selectedchar].charwidth = (this.value*1); redraw();'>"+spinner()+"</td></tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td><td> width <span class='unit'>em units</span> </td><td> " + rounddec(sc.charwidth) + " </td></tr>";
		}		
		
		content += "<tr><td class='leftcol'>&nbsp;</td><td> width <span class='unit'>em %</span> </td><td> " + rounddec(sc.charwidth/_G.fontsettings.upm) + " </td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> number of shapes </td><td> " + uistate.shapelayers.length + " </td></tr>";

		return content;

	}
	
	function shapeDetails(s){
		//debug("SHAPEDETAILS - <b>Drawing Shape Details</b>");
		var content = "";
		content += "<tr><td colspan=2><h3>shape</h3></td><td style='width:200px'>&nbsp;</td></tr>\n";		
		
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> name </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().changeShapeName(this.value);'></td></tr>\n";
		
		
		if(!temppathdragshape){
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td><td> x </td><td><input class='input' type='text' " + (s.xlock? "disabled='disabled'" : "onchange='ss().path.updatePathPosition((this.value-("+s.path.leftx+")),0); redraw();'") + " value='" + s.path.leftx + "' >" + (s.xlock? "" : spinner()) + "</td></tr>\n";
			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td><td> y </td><td><input class='input' type='text' " + (s.ylock? "disabled='disabled'" : "onchange='ss().path.updatePathPosition(0,(this.value-("+s.path.topy+"))); redraw();'") + " value='" + s.path.topy + "' >" + (s.ylock? "" : spinner()) + "</td></tr>\n";			
			
			var cw = (s.path.rightx-s.path.leftx);
			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td><td> width </td><td><input class='input' type='text' " + (s.wlock? "disabled='disabled'" : "onchange='ss().path.updatePathSize((this.value-"+cw+"),0); redraw();'") + " value='" + cw + "' >" + (s.wlock? "" : spinner()) + "</td></tr>\n";
			var ch = (s.path.topy-s.path.bottomy);
			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td><td> height </td><td><input class='input' type='text' " + (s.hlock? "disabled='disabled'" : "onchange='ss().path.updatePathSize(0,(this.value-"+ch+")); ss().path.updatePathPosition(0,((this.value-"+ch+")*-1)); redraw();'") + " value='" + ch + "' >" + (s.hlock? "" : spinner()) + "</td></tr>\n";
			
		
		} else {
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td><td> x </td><td><input class='input' type='text' value='" + temppathdragshape.leftx + "'>&nbsp;</td></tr>\n";
			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td><td> y </td><td><input class='input' type='text' value='" + temppathdragshape.topy + "'>&nbsp;</td></tr>\n";
			
			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td><td> width </td><td><input class='input' type='text' value='" + Math.round(temppathdragshape.rightx-temppathdragshape.leftx) + "'>&nbsp;</td></tr>\n";
			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td><td> height </td><td><input class='input' type='text' value='" + Math.round(temppathdragshape.topy-temppathdragshape.bottomy) + "'>&nbsp;</td></tr>\n";
		}
		
		content += "<tr><td class='leftcol'>&nbsp;</td><td> closed path </td><td>"+checkUI("ss().path.isclosed="+!s.path.isclosed+"; putundoq(\"Closed Path\"); ss().path.calcMaxes(); redraw();", s.path.isclosed)+"</td></tr>\n";
		
		//debug("<b>SHAPE DETAILS OUTPUT:<b><br><textarea rows=9 cols=3000>" + content + "</textarea>");
		return content;
	}
	
	//	Point Details
	function pointDetails(s){
		var tp = s.path.sp();
		var content = "";
		content += "<tr><td colspan=3><h3>path point</h3></td></tr>";	

		content += "<tr><td class='leftcol'>&nbsp;</td><td> selected point </td><td><input class='input' type='text' value='" + s.path.sp(true) + "' onchange='ss().path.selectPathPoint(this.value); redraw();'></td></tr>";
		
		content += "<tr><td class='leftcol'>&nbsp;</td><td> point type </td><td>  ";
		content += "<canvas class='canvasbutton' title='point type: corner' onclick='ss().path.sp().type = \"corner\"; putundoq(\"joint corner\"); redraw();' id='pointcornercanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: flat' onclick='ss().path.sp().type = \"flat\"; putundoq(\"joint flat\"); redraw();' id='pointflatcanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: symmetric' onclick='ss().path.sp().type = \"symmetric\"; putundoq(\"joint symmetric\"); redraw();' id='pointsymmetriccanvas'></canvas>";
		content += "</td></tr>";
		
		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.xlock",tp.P.xlock)+"</td><td> point x </td><td><input class='input' type='text' " + (tp.P.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"P\", Math.round(this.value), \"null\"); putundoq(\"point x\"); redraw();'") + " value='" + tp.P.x + "' >" + (tp.P.xlock? "" : spinner()) + "</td></tr>";
		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.ylock",tp.P.ylock)+"</td><td> point y </td><td><input class='input' type='text' " + (tp.P.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"P\", \"null\", Math.round(this.value)); putundoq(\"point y\"); redraw();'") + " value='" + tp.P.y + "' >" + (tp.P.ylock? "" : spinner()) + "</td></tr>";
		
		content += "<tr><td colspan=3><h3>handle1</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use handle1 </td><td>"+checkUI("ss().path.sp().useh1="+!tp.useh1+"; putundoq(\"Use H1\"); ss().path.calcMaxes(); redraw();", tp.useh1)+"</td></tr>";
		if(tp.useh1){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.xlock",tp.H1.xlock)+"</td><td> handle1 x </td><td><input class='input' type='text' " + (tp.H1.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H1\", Math.round(this.value), \"null\"); putundoq(\"h1 x\"); redraw();'") + " value='" + tp.H1.x + "' >" + (tp.H1.xlock? "" : spinner()) + "</td></tr>";
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.ylock",tp.H1.ylock)+"</td><td> handle1 y </td><td><input class='input' type='text' " + (tp.H1.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H1\", \"null\", Math.round(this.value)); putundoq(\"h1 y\"); redraw();'") + " value='" + tp.H1.y + "' >" + (tp.H1.ylock? "" : spinner()) + "</td></tr>";
		}
		
		content += "<tr><td colspan=3><h3>handle2</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use handle2 </td><td>"+checkUI("ss().path.sp().useh2="+!tp.useh2+"; putundoq(\"Use H2\"); ss().path.calcMaxes(); redraw();", tp.useh2)+"</td></tr>";
		if(tp.useh2){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.xlock",tp.H2.xlock)+"</td><td> handle2 x </td><td><input class='input' type='text' " + (tp.H2.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H2\", Math.round(this.value), \"null\"); putundoq(\"h2 x\"); redraw();'") + " value='" + tp.H2.x + "' >" + (tp.H2.xlock? "" : spinner()) + "</td></tr>";
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.ylock",tp.H2.ylock)+"</td><td> handle2 y </td><td><input class='input' type='text' " + (tp.H2.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPointPosition(\"H2\", \"null\", Math.round(this.value)); putundoq(\"h2 y\"); redraw();'") + " value='" + tp.H2.y + "' >" + (tp.H2.ylock? "" : spinner()) + "</td></tr>";
		}
		
		return content;
	}
	
	function drawPointButtons(s){
		//debug("DRAWPOINTBUTTONS");
		var tp = s.path.sp();
		var tempctx;
		var tempcanvas;
		var color;
		
		tempcanvas = document.getElementById("pointcornercanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='corner'? uistate.colors.button_selected : uistate.colors.button_resting);
		drawPointCornerButton(tempctx, color);
		
		tempcanvas = document.getElementById("pointflatcanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='flat'? uistate.colors.button_selected : uistate.colors.button_resting);
		drawPointFlatButton(tempctx, color);
		
		tempcanvas = document.getElementById("pointsymmetriccanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='symmetric'? uistate.colors.button_selected : uistate.colors.button_resting);
		drawPointSymmetricButton(tempctx, color);
	}
	
	// Helper Functions
	function lockUI(varname, islocked){
		//debug("LOCKUI - making html for varname " + varname + " was passed " + islocked + ", and locarr is now: [" + locarr + "]");
		var re = "<canvas id='locid"+locid+"' ";
		locarr[locid] = islocked;
		locid = ((locid*1)+1);
		//re += " onclick='debug(\"--CLICKED ON " + varname + " LOCK-- changing to \"+"+!islocked+"); "+varname+" = " + !islocked + "; redraw();'></canvas>";	
		re += " onclick='"+varname+" = " + !islocked + "; redraw();'></canvas>";	
				
		return re;		
	}
	
	function checkUI(onclick, ischecked){
		//debug("CHECKUI - making html for checkarr[" + checkid + "] = " + ischecked + ", and checkarr is now: [" + checkarr + "]");
		var re = "<canvas id='checkid"+checkid+"' ";
		checkarr[checkid] = ischecked;	
		checkid = ((checkid*1)+1);
		re += " onclick='"+onclick+"'></canvas>";	
		return re;	
	}
	
	function rounddec(num){
		num = (num? num : 0);
		var numsplit = num.toString().split(".");
		if(numsplit.length == 1){
			return numsplit;
		} else {
			return "" + numsplit[0] + "." + numsplit[1].substr(0,3);
		}
	}
	

//-------------------
// Update Actions
//-------------------
	function updateactions(){
		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";
				
		var s = ss("Update Actions");		
		
		var allactions = "<td><h3>*</h3>";
			allactions += "<input  class='"+(uistate.charundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((uistate.charundoq.length > 0) ? (" " + uistate.charundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "<input class='button' type='button' value='add new shape' onclick='addShape();putundoq(\"add shape\");redraw();'><br>";
			allactions += "<input class='button' type='button' value='insert seed shape' onclick='insertSeedShapeDialog();'><br>";
			allactions += "<input class='"+(uistate.clipboardshape? "button": "buttondis")+"' type='button' value='Paste' onclick='pasteShape();putundoq(\"paste shape\");redraw();'><br>";
			
			allactions += "</td>";
			
		var shapeactions = "<td><h3>shape</h3>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='deleteShape();putundoq(\"delete shape\");redraw();'><br>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Copy' onclick='copyShape()'><br>";
			
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Flip Horizontal' onclick='ss().path.flipew();putundoq(\"flip shape horizontal\");redraw();'><br>";
			shapeactions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Flip Vertical' onclick='ss().path.flipns();putundoq(\"flip shape vertical\");redraw();'><br>";

			shapeactions += "</td>";
			
		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Up' onclick='moveupShape();putundoq(\"move up shape\");'><br>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Down' onclick='movedownShape();putundoq(\"move down shape\");'><br>";
			layeractions += "</td>";
			
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
		
		if(uistate.shapelayers.length > 0){ content += shapeactions; }
		else { content += "<td> &nbsp; </td>";}
		
		var ispointsel = false;
		if(s && !s.seed) ispointsel = s.path.sp(false);
		if(uistate.selectedtool != "pathedit") ispointsel = false;
		
		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(ispointsel){ content += pointactions; }
		else { content += "<td> &nbsp; </td>";}
		
		content += "</tr><tr>";
		
		content += canvasactions;
		
		if(uistate.shapelayers.length > 1){ content += layeractions; }
		
		content += "</td></tr></table><br><br>";
		
		return content;
	}

	function updateLayerActions(){
		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";
				
		var s = ss("Update Actions");
		var allactions = "<td><h3>shape</h3>";
			allactions += "<input class='button' type='button' value='add new shape' onclick='addShape();putundoq(\"add shape\");redraw();'><br>";
			allactions += "<input class='button' type='button' value='insert seed shape' onclick='insertSeedShapeDialog();'><br>";
			
		var shapeactions = "<input class='"+(s? "button": "buttondis")+"' type='button' value='Delete' onclick='deleteShape();putundoq(\"delete shape\");redraw();'><br>";
		
		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Up' onclick='moveupShape();putundoq(\"move up shape\");'><br>";
			layeractions += "<input class='"+(s? "button": "buttondis")+"' type='button' value='Move Down' onclick='movedownShape();putundoq(\"move down shape\");'><br>";
			layeractions += "</td>";
			
		content += allactions;
		
		if(uistate.shapelayers.length > 0){ 
			content += shapeactions; 
			content += "</td>"
		} else {
			content += "</td>";
		}
			
		if(uistate.shapelayers.length > 1){ content += layeractions; }
		
		content += "</tr></table>";
		
		return content;
	}

//-------------------
// Copy Paste
//-------------------
	function copyShape(){
		var s = ss("copy shape")
		if(s){
			uistate.clipboardshape = {
				"s":s,
				"c":uistate.selectedchar
			};
			//debug("COPYShape() - new clipboard shape: " + uistate.clipboardshape.s.name); 
		}
		redraw();
	}
	
	function pasteShape(){
		if(uistate.clipboardshape){
			var newshape = clone(uistate.clipboardshape.s);
			uistate.clipboardshape.c == uistate.selectedchar ? newshape.path.updatePathPosition(20,20) : true;
			
			var newname = newshape.name;
			var newsuffix = " (copy)";
			var n = newshape.name.lastIndexOf("(copy");
						
			if(n > 0){
				var suffix = newname.substring(n+5);
				newname = newname.substring(0,n);
				if(suffix == ")"){
					newsuffix = "(copy 2)";
				} else {
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(1);
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(0, suffix.length-1);
					//debug("PASTESHAPE - suffix " + suffix);
					newsuffix = "(copy " + (parseInt(suffix)+1) + ")";
					//debug("PASTESHAPE - newsuffix " + newsuffix);
				}			
			}
			newshape.name = newname + newsuffix;
			
			if(newshape.seed){
				addToUsedIn(newshape.seed, uistate.selectedchar);
				debug("PASTESHAPE - pasted a seedshape, added " + uistate.selectedchar + " to usedin array.");
			}

			//debug("PASTEShape() - OLD " + s.debugShape());
			//debug("PASTEShape() - NEW " + newshape.debugShape());		
			addShape(newshape);
		}
	}


//-------------------
// Move up / down
//-------------------
	function moveupShape(){
		var s = ss("Move Up Shape");
		
		if(s && (uistate.selectedshape < (uistate.shapelayers.length-1))){
			var tempshape = uistate.shapelayers[uistate.selectedshape+1];
			uistate.shapelayers[uistate.selectedshape+1] = uistate.shapelayers[uistate.selectedshape];
			uistate.shapelayers[uistate.selectedshape] = tempshape;
			uistate.selectedshape++;
			redraw();
		}
	}
	
	function movedownShape(){
		var s = ss("Move Down Shape");
		
		if(s && (uistate.selectedshape > 0)){
			var tempshape = uistate.shapelayers[uistate.selectedshape-1];
			uistate.shapelayers[uistate.selectedshape-1] = uistate.shapelayers[uistate.selectedshape];
			uistate.shapelayers[uistate.selectedshape] = tempshape;
			uistate.selectedshape--;
			redraw();
		}
	}
	
	
//-------------------
// Generic Spinner Control
//-------------------
	function spinner(){
		var content ="";
		content += "<input type='button' value='&#9652;' class='button spinnerbutton' onclick='inc(this);'>";  //&and;
		content += "<input type='button' value='&#9662;' class='button spinnerbutton' onclick='dec(this);'>";  //&or;
		return content;
	}
	
	function inc(obj){
		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) + _G.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			putundoq("Up Spinner");
		}
	}
	
	function dec(obj){
		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) - _G.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			putundoq("Down Spinner");
		}
	}
	
	
//-------------------
// Update Layers
//-------------------
	function updatelayers(){
		var content = "<h1>shapes</h1>";
		content += "<div style='height:7px; display:block;'></div>";
		
		if(uistate.shapelayers.length > 0){
			for(var i=(uistate.shapelayers.length-1); i>=0; i--){
				content += "<input type='button'";
				if(i==uistate.selectedshape){
					content += " class='layer buttonsel'";
				} else {
					content += " class='layer button'";
				}
				content += " onclick='uistate.selectedshape = " + i + "; redraw();'";
				content += " value='" + uistate.shapelayers[i].name;
				
				if(uistate.shapelayers[i].seed) {
					content += "&nbsp;&nbsp;[seed]";
				}
				content += "'><br>";
			}
		} else {
			//debug("UPDATELAYERS() - Shapelayers.length = Zero");
			content += "<div style='margin-left:10px; font-style:oblique;'>No shapes exist yet.<br><br></div>";
		}
		
		if(uistate.clipboardshape){
			content += "<br>Clipboard: " + uistate.clipboardshape.s.name;
		}
		
		content += updateLayerActions();
		
		try {
			document.getElementById("navtargetpane").innerHTML = content;	
		} catch(err) {
			debug("UPDATELAYERS - <b>innerHTML update error caught</b>");
		}
	}
	

//-------------------
// Update Tools
//-------------------
	function updatetools(){
		var pointselectclass = "";
		var pointselectclickable = true;
		var s = ss("Charedit: UpdateTools");
		if(uistate.navhere == "seed shapes") {
			if(!_G.seedshapes[uistate.selectedshape]) { s = false; }
		}
		
		if(uistate.selectedtool=='pathedit'){
			pointselectclass = "buttonsel tool";
		} else if (s.seed){
			pointselectclass = "buttondis tool";
			pointselectclickable = false;
		} else {
			pointselectclass = "button tool";
		}
			
		var content = "";
		content += "<div title='edit path' class='" + pointselectclass + "' " + (pointselectclickable? "onclick='clicktool(\"pathedit\");'":"") + "/><canvas id='patheditbuttoncanvas'></canvas></div>";
		content += "<div title='move & resize shape' class='" + (uistate.selectedtool=='shaperesize'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"shaperesize\");'/><canvas id='shaperesizebuttoncanvas'></canvas></div>";
		
		if(uistate.navhere == "character edit"){
			content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
			content += "<div title='new rectangle shape' class='" + (uistate.selectedtool=='newrect'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newrect\");'/><canvas id='newrectbuttoncanvas'></canvas></div>";
			content += "<div title='new oval shape' class='" + (uistate.selectedtool=='newoval'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newoval\");'/><canvas id='newovalbuttoncanvas'></canvas></div>";
			content += "<div title='new path shape' class='" + (uistate.selectedtool=='newpath'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newpath\");'/><canvas id='newpathbuttoncanvas'></canvas></div>";
		}
		
		content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
		content += "<div title='scroll and pan' class='" + (uistate.selectedtool=='pan'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"pan\");'/><canvas id='panbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: in' class='button tool' onclick='canvasZoom(1.1);'><canvas id='zoominbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: out' class='button tool' onclick='canvasZoom(.9);'><canvas id='zoomoutbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: one to one' class='button tool' onclick='uistate.chareditcanvassettings.zoom = 1;redraw();'><canvas id='zoom1to1buttoncanvas'></canvas></div>";
		content += "<div title='zoom: full em' class='button tool' onclick='resetZoomPan(); redraw();'><canvas id='zoomembuttoncanvas'></canvas></div>";
		content += "<div title='zoom level' class='tool out'>" + round(uistate.chareditcanvassettings.zoom*100, 2) + "%</div>";
		
		try {
			document.getElementById("toolsarea").innerHTML = content;	
		} catch(err) {
			debug("UPDATETOOLS - <b>innerHTML update error caught</b>");
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
		if(uistate.selectedtool == "pathedit"){ drawPathEditButton(tempctx, "white", "black"); }
		else if (!pointselectclickable) { drawPathEditButton(tempctx, "rgb(80,80,80)", "rgb(80,80,80)"); }
		else { drawPathEditButton(tempctx, "transparent", uistate.colors.accent); }
		
		// Shape Resize
		tempcanvas = document.getElementById("shaperesizebuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 3px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(uistate.selectedtool == "shaperesize"){ drawShapeResizeButton(tempctx, "white", "black"); }
		else { drawShapeResizeButton(tempctx, "transparent", uistate.colors.accent); }

		// Pan
		tempcanvas = document.getElementById("panbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(uistate.selectedtool == "pan"){ drawPanButton(tempctx, "white", "black"); }
		else { drawPanButton(tempctx, uistate.colors.accent, "transparent"); }
		
		// Zoom In
		tempcanvas = document.getElementById("zoominbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomInButton(tempctx, uistate.colors.accent, "transparent");

		// Zoom Out
		tempcanvas = document.getElementById("zoomoutbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomOutButton(tempctx, uistate.colors.accent, "transparent");
		
		// Zoom 1:1
		tempcanvas = document.getElementById("zoom1to1buttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoom1to1Button(tempctx, uistate.colors.accent, "transparent");
		
		// Zoom Em
		tempcanvas = document.getElementById("zoomembuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "4px 4px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomEmButton(tempctx, uistate.colors.accent, "transparent");		

		if(uistate.navhere == "character edit"){
			// New Rectangle
			tempcanvas = document.getElementById("newrectbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(uistate.selectedtool == "newrect") { drawNewRectButton(tempctx, "white", "black"); }
			else { drawNewRectButton(tempctx, "transparent", uistate.colors.accent); }
			
			// New Oval
			tempcanvas = document.getElementById("newovalbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(uistate.selectedtool == "newoval"){ drawNewOvalButton(tempctx, "white", "black"); }
			else { drawNewOvalButton(tempctx, "transparent", uistate.colors.accent); }
			
			// New Path
			tempcanvas = document.getElementById("newpathbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(uistate.selectedtool == "newpath"){ drawNewPathButton(tempctx, "white", "black"); }
			else { drawNewPathButton(tempctx, "transparent", uistate.colors.accent); }
		}
	}

	function clicktool(ctool){
		
		uistate.selectedtool = ctool;
		var s = ss("clicktool");
		
		//debug("CLICKTOOL - was passed: " + ctool + " and uistate.selectedtool now is: " + uistate.selectedtool);
		addpath.firstpoint = true; 
		if((ctool=="newrect")||(ctool=="newoval")){
			uistate.showrightline = true;
			uistate.selectedshape = -1; 
		} else if (ctool=="newpath"){
			uistate.showrightline = false;
			uistate.selectedshape = -1; 
		} else if(ctool=="pathedit"){
			uistate.showrightline = false;
			if(s) {s.path.selectPathPoint(0);}
			debug("CLICKTOOL() - setting selectPathPoint = 0");
		} else if (ctool = "shapemove"){
			uistate.showrightline = true;
			if(s){
				if(s.path.haschanged) {
					debug("CLICKTOOL - shapemove, path.haschanged = true.  Calc'ing Maxes.");
					s.path.calcMaxes();
				}
			}
		}
		
		redraw();
	}

	function canvasZoom(zfactor){
		uistate.chareditcanvassettings.zoom*=zfactor;
		redraw();
	}
	
	
//-------------------
// Drawing Grid
//-------------------

	var xs = {};
	
	function grid(){
		var fs = _G.fontsettings;
		var ps = _G.projectsettings;
		
		uistate.chareditctx.fillStyle = uistate.colors.offwhite;
		uistate.chareditctx.fillRect(0,0,99999,99999);
		
		// background white square
		xs.xmax = uistate.chareditcanvassettings.originx + ((uistate.calcmaxesghostcanvassettings.size-uistate.calcmaxesghostcanvassettings.originx)*uistate.chareditcanvassettings.zoom);
		xs.xmin = uistate.chareditcanvassettings.originx - (uistate.calcmaxesghostcanvassettings.originx*uistate.chareditcanvassettings.zoom) -1;
		xs.ymax = uistate.chareditcanvassettings.originy + ((uistate.calcmaxesghostcanvassettings.size-uistate.calcmaxesghostcanvassettings.originy)*uistate.chareditcanvassettings.zoom);
		xs.ymin = uistate.chareditcanvassettings.originy - (uistate.calcmaxesghostcanvassettings.originy*uistate.chareditcanvassettings.zoom) -1;
		
		uistate.chareditctx.fillStyle = "white";
		uistate.chareditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);
		
		// Grids		
		var mline = uistate.chareditcanvassettings.originy - (fs.upm*uistate.chareditcanvassettings.zoom);
		var xline = uistate.chareditcanvassettings.originy - (fs.upm*ps.xheight*uistate.chareditcanvassettings.zoom);
		var dline = uistate.chareditcanvassettings.originy + (fs.upm*ps.descender*uistate.chareditcanvassettings.zoom);
		var overshootsize = (fs.upm*ps.overshoot*uistate.chareditcanvassettings.zoom);

		if(uistate.chareditcanvassettings.showgrid || uistate.chareditcanvassettings.showguides){
			var size = uistate.chareditcanvassettings.size/ps.griddivisions;
			uistate.chareditctx.lineWidth = 1;
			uistate.chareditctx.strokeStyle = _G.projectsettings.color_grid;
			
			if(uistate.chareditcanvassettings.showgrid){
				var gsize = ((fs.upm/ps.griddivisions)*uistate.chareditcanvassettings.zoom);
				//debug("GRID - gridsize set as: " + gsize);
				
				for(var j=uistate.chareditcanvassettings.originx; j<xs.xmax-1; j+=gsize){ vertical(j); }
				vertical(xs.xmax+1);
				for(var j=uistate.chareditcanvassettings.originx; j>=xs.xmin; j-=gsize){ vertical(j); }
				
				for(var j=uistate.chareditcanvassettings.originy; j<xs.ymax-1; j+=gsize){ horizontal(j); }
				horizontal(xs.ymax+1);
				for(var j=uistate.chareditcanvassettings.originy; j>=xs.ymin; j-=gsize){ horizontal(j); }

			}
			
			if(uistate.chareditcanvassettings.showguides){
				
				// Minor Guidelines - Overshoots
				uistate.chareditctx.strokeStyle = shiftColor(_G.projectsettings.color_guideline, .8, true);
				horizontal(xline-overshootsize);
				horizontal(mline-overshootsize);
				horizontal(uistate.chareditcanvassettings.originy+overshootsize);
				horizontal(dline+overshootsize);
				
				// Right hand Em Square
				vertical(uistate.chareditcanvassettings.originx+(fs.upm*uistate.chareditcanvassettings.zoom));
				
				// major guidelines - xheight, top (emzize)
				uistate.chareditctx.strokeStyle = shiftColor(_G.projectsettings.color_guideline, .5, true);
				horizontal(xline);
				uistate.chareditctx.strokeStyle = shiftColor(_G.projectsettings.color_guideline, .2, true);
				horizontal(mline);
				horizontal(dline);
				
				
				// Out of bounds triangle
				uistate.chareditctx.fillStyle = _G.projectsettings.color_guideline;		
				uistate.chareditctx.beginPath();
				uistate.chareditctx.moveTo(uistate.chareditcanvassettings.originx, uistate.chareditcanvassettings.originy);
				uistate.chareditctx.lineTo(uistate.chareditcanvassettings.originx, uistate.chareditcanvassettings.originy+(_G.projectsettings.pointsize*2));
				uistate.chareditctx.lineTo(uistate.chareditcanvassettings.originx-(_G.projectsettings.pointsize*2), uistate.chareditcanvassettings.originy);
				uistate.chareditctx.closePath();
				uistate.chareditctx.fill();
				
				// Origin Lines
				uistate.chareditctx.strokeStyle = _G.projectsettings.color_guideline;
				horizontal(uistate.chareditcanvassettings.originy);
				vertical(uistate.chareditcanvassettings.originx);
			}
		}
	}
	
	function horizontal(y){
		y = Math.round(y)-.5;
		uistate.chareditctx.beginPath();
		uistate.chareditctx.moveTo(xs.xmin,y);
		uistate.chareditctx.lineTo(xs.xmax,y);
		uistate.chareditctx.stroke();
		uistate.chareditctx.closePath();
	}
	
	function vertical(x){
		x = Math.round(x)-.5;
		uistate.chareditctx.beginPath();
		uistate.chareditctx.moveTo(x,xs.ymin);
		uistate.chareditctx.lineTo(x,xs.ymax+1);		
		uistate.chareditctx.stroke();
		uistate.chareditctx.closePath();
	}
	
// RANDOMS
	function debugZoomPan(zid){
		debug("<b>ZOOM PAN STATE - " + zid + " - z:" + uistate.chareditcanvassettings.zoom + " - px:" + uistate.chareditcanvassettings.originx + " - py:" + uistate.chareditcanvassettings.originy + "</b>");
	}
