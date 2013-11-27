
//-- Global Variables --//

	var clipboardshape = false;
	var notation = "UNINITIALIZED";
	
	var canvas, ctx, calcmaxesghostcanvas, cmgctx, ishereghostcanvas, ihgctx;
	var showcanvascursor = false;
	var showRightLine = true;
	
	var shapelayers = [];
	var selectedshape = -1;	
	var selectedchar = 97;
	var selectedtool = "pathedit";	// pathedit, shapemove, pantool, newrect, newoval, newpath
	
	var debugPoints = new Array(false, false);
	
	function updatecharedit(){
		document.getElementById("mainpane").innerHTML = charedit_content();
			
		setupEditCanvas();
		setupGhostCanvas();
		
		initEventHandlers();
		
		selectedtool = "pathedit";
		
		redraw();	
	}

	/*
	function charedit_content(){
		var re = '<canvas id="canvas" width=12 height=12 ></canvas>';		
		re += '<div id="toolsarea"> [ERROR: Uninitialized content] </div>';
		re += '<table class="charedittable" cellspacing=0 cellpadding=0 border=0>';
		re += "<tr>";
		re += '<td id="layersarea"> [ERROR: Uninitialized content] </td>';
		re += '<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>';		
		re += '<tr><td id="actionsarea" colspan=2> [ERROR: Uninitialized content] </td>';		
		re += '</tr></table>';
		
		return re;
	}
	*/
	
	function charedit_content(){
		var re = '<canvas id="canvas" width=12 height=12 ></canvas>';		
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
	/*
	function updateselectchar(fname){
		var ccon = "<table cellpadding=0 cellspacing=0 class='charselecttable'>"
		var perrow = 9;
		fname = fname? fname : "selectchar";
		
		//Capitol Letters
		for(var i=65; i<91; i++){
			if(i==65){ ccon += "<tr>"; }
			else if(((i-65)%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
		}
		
		//Lowercase Letters
		for(var i=97; i<123; i++){
			if(i==97){ ccon += "<tr>"; }
			else if(((i-97)%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
		}
		
		ccon += "</tr></table>";
		
		// Symbols
		ccon += "<table cellpadding=0 cellspacing=0 class='charselecttable' style='padding-top:0px;'>"
		var j = 0;
		perrow = 8;
		
		for(var i=33; i<48; i++){
			if(j==0){ ccon += "<tr>"; }
			else if((j%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
			j++;
		}
		for(var i=58; i<65; i++){
			if((j%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
			j++;
		}
		for(var i=91; i<97; i++){
			if((j%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
			j++;
		}
		for(var i=123; i<127; i++){
			if((j%perrow)==0) { ccon += "</tr><tr>"; }
			ccon += ("<td>" + buildbutton(i, fname) + "</td>");
			j++;
		}
		
		// Space
		ccon += "</tr><tr><td colspan=4>";
		ccon += buildbutton(32, fname);
		ccon += "</td><td colspan=4>&nbsp;</td></tr></table>";
		
		return ccon;
	}
	*/
	
	function drawselectcharcanvas(){
		var scthumbsize = 50;
		var scthumbgutter = 5;	
		
		var fs = GlyphrProject.settings;
		var factor = ((scthumbsize-(2*scthumbgutter))/(fs.upm + (fs.upm*fs.descender)));
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
		var rv = "<div class='charselectbuttonwrapper' onclick='"+onc+"' title='"+GlyphrProject.fontchars[index].charname+"'>";
		var issel = GlyphrProject.fontchars[index].charvalue == GlyphrProject.fontchars[selectedchar].charvalue;
		issel = issel & (navhere != "seed shapes");
		
		if(GlyphrProject.fontchars[index].charglyphdata[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";} 
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			selectchardrawarr.push(index);
		} else {	
			if(issel) {rv += "<div class='charselectbuttonsel'>";} 
			else {rv += "<div class='charselectbutton'>";}

			var bv = GlyphrProject.fontchars[index].charvalue;
			if(bv == "'") bv = "&#39";
			
			rv += (bv+"</div>");
		}
		
		rv += "</div>";

		return rv;
	}
	
	function selectchar(c){
		//debug("SELECTCHAR - Selecting " + GlyphrProject.fontchars[c].charvalue + " from value " + c);
		selectedchar = c;
		shapelayers = GlyphrProject.fontchars[c].charglyphdata;
		selectedshape = -1;
		navigate();
	}

	function setupGhostCanvas(){
		//	Check Maxes Ghost Canvas Dimensions
		//	.5em to the left of x=0 and below descender
		//	1.25em to the right of x=0 and above descender 
		
		calcmaxesghostcanvas = document.getElementById('calcmaxesghostcanvas');
		//calcmaxesghostcanvas = document.createElement('canvas');
		calcmaxesghostcanvas.height = cgc.size;
		calcmaxesghostcanvas.width = cgc.size;
		cmgctx = calcmaxesghostcanvas.getContext('2d');
		cmgctx.fillStyle = "lime";
		cmgctx.globalAlpha = .5;
		calcmaxesghostcanvas.style.backgroundColor = "transparent";
		
		
		//Is Here Ghost Canvas - same size as CEC
		ishereghostcanvas = document.getElementById('ishereghostcanvas');
		//ishereghostcanvas = document.createElement('canvas');
		ishereghostcanvas.height = cec.size;
		ishereghostcanvas.width = cec.size;
		ihgctx = ishereghostcanvas.getContext('2d');
		ihgctx.fillStyle = "cyan";
		ihgctx.globalAlpha = .5;
		ishereghostcanvas.style.backgroundColor = "transparent";
	}

	function setupEditCanvas(){
		canvas = document.getElementById("canvas");
		canvas.height = cec.size;
		canvas.width = cec.size;
		ctx = canvas.getContext("2d");
		canvas.style.backgroundColor = color_bg;	//color_grid;
		canvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		canvas.onmouseout = mouseoutcec;
		canvas.onmouseover = mouseovercec;
		
	}
	
	function resetCursor() { document.body.style.cursor = 'default'; }
		

//-------------------
// REDRAW
//-------------------
	function redraw(){
		if(navhere == "seed shapes") {seedshapesredraw(); return;}		
		
		var fc = GlyphrProject.fontchars;
		
		ctx.clearRect(0,0,cec.size,cec.size);
		grid();
		
		// load char info
		shapelayers = fc[selectedchar].charglyphdata;
		debug("!!! REDRAW !!! - selectedchar: " + selectedchar + " - numshapes: " + shapelayers.length + " - navhere: " + navhere);	
		
		// Only update charwidth if isautowide is true
		var neww = fc[selectedchar].isautowide;
		if(neww) {fc[selectedchar].charwidth = 0;}
		

		var sh;
		for(var jj=0; jj<shapelayers.length; jj++) {
			debug("================ shape " + jj + "/" + shapelayers.length);
			
			sh = shapelayers[jj];
			debug("================ JSON: " + JSON.stringify(sh));
			
			sh.drawShape(ctx);
			
			if(neww) {
				var thisrightx = 0;
				if(sh.seed){
					var tss = GlyphrProject.seedshapes[sh.seed].shape;
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
				fc[selectedchar].charwidth = Math.max(fc[selectedchar].charwidth, thisrightx);
				//debug("REDRAW - charwidth as of shape# " + jj + " set to: " + fc[selectedchar].charwidth);
			}
		}
		//debug("REDRAW - done drawing, charwidth is: " + fc[selectedchar].charwidth);

		var s = ss("Redraw");
		if(s) {
			//debug("REDRAW - selected shape .seed: " + s.seed + " which evals as: " + (s.seed!=false) );
			s.drawselectoutline(s.seed != false);
							
			if(s.seed){
				//debug("REDRAW - detected this.seed, setting selectedtool = shaperesize");
				selectedtool = "shaperesize";
			}
		}
		

		//updatedetails();
		//updatelayers();
		//updateactions();
		updateNavPrimaryNavTarget();
		
		updatetools();
		
		
		//show right hand line
		if(cec.showguides && showRightLine){
			ctx.lineWidth = 1;
			//ctx.strokeStyle = shiftColor(color_guideline, .5, true);
			ctx.strokeStyle = color_guideline;
			var rhl = (fc[selectedchar].charwidth*cec.zoom) + cec.originx;
			if(temppathdragshape){
				rhl = Math.max(sx_cx(temppathdragshape.rightx), rhl);
			}
			if(neww){rhl += (GlyphrProject.settings.upm*GlyphrProject.settings.kerning*cec.zoom) }
			vertical(rhl);
		}
		
		/*
		// debug points
		if(debugPoints[0]){
			for(var s=0; s<debugPoints[0].path.pathpoints.length; s++){ 
				debugPoints[0].path.pathpoints[s].drawPoint("lime"); 
				debugPoints[0].path.pathpoints[s].drawHandles(true, true);
			}
		}
		if(debugPoints[1]){
			for(var s=0; s<debugPoints[1].path.pathpoints.length; s++){ 
				debugPoints[1].path.pathpoints[s].drawPoint("lime"); 
				debugPoints[1].path.pathpoints[s].drawHandles(true, true);
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
	
	function updatedetails(){

		var s = ss("update details");
		
		var ispointsel = false;
		if(s && !s.seed) ispointsel = s.path.sp(false);
		if(selectedtool != "pathedit") ispointsel = false;
		
		var content = "";
		if(navhere == "seed shapes"){
			content = "<h1>" + GlyphrProject.seedshapes[shownseedshape].shape.name + "</h1>";
		} else {
			content = "<h1>attributes</h1>";
		}
		
		locarr = [];
		checkarr = [];

		content += "<table class='detail'>";	
		
		//debug("UPDATEDETAILS - selectedshape: " + selectedshape + " - s.name: " + s.name + " - navhere: " + navhere);
		if (navhere == "character edit"){
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
		} else if (navhere == "seed shapes"){
			//debug("UPDATEDETAILS - detected navhere = seed shapes");
			if (s){
				content += shapeDetails(s);
				if(ispointsel){ 
					content += pointDetails(s); 
				} else {
					content += seedShapeCharDetails();
				}
			}
		}

		content += "</table><br>";
		content += updateactions();
		
		try {
			document.getElementById("navtargetpane").innerHTML = content;	
		} catch(err) {
			debug("UPDATEDETAILS - <b>innerHTML update error caught</b>");
		}
		
		ispointsel? drawPointButtons(s) : false;

	   
		// draw locks
		//debug("UPDATEDETAILS - starting drawing locks, locarr.length = " + locarr.length);
		for(var j=0; j<locarr.length; j++){
			var thislocid = ("locid"+j);
			var obj = document.getElementById(thislocid);
			//debug("UPDATEDETAILS - drawing lock id " + thislocid + " obj = " + obj);
			if(obj){
				obj.height = 11;
				obj.width = 11;
				var color = locarr[j]? color_canvasbutton_selected : color_canvasbutton_unselected;
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
		var sc = GlyphrProject.fontchars[selectedchar];
		var content = "";	
		
		content += "<tr><td colspan=3><h3>character "+sc.charvalue+"</h3></td></tr>";	
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> auto width </td><td width='50%'>"+checkUI("GlyphrProject.fontchars[selectedchar].isautowide="+!sc.isautowide+"; redraw();", sc.isautowide)+"</td></tr>";

		if(!sc.isautowide){
			content += "<tr><td class='leftcol'>&nbsp;</td><td> width (em units) </td><td><input class='input' type='text' value='" + sc.charwidth + "' onchange='GlyphrProject.fontchars[selectedchar].charwidth = (this.value*1); redraw();'>"+spinner()+"</td></tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td><td> width (em units) </td><td> " + rounddec(sc.charwidth) + " </td></tr>";
		}		
		
		content += "<tr><td class='leftcol'>&nbsp;</td><td> width (em %) </td><td> " + rounddec(sc.charwidth/GlyphrProject.settings.upm) + " </td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> number of shapes </td><td> " + shapelayers.length + " </td></tr>";

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
		color = (tp.type=='corner'? color_canvasbutton_selected : color_canvasbutton_unselected);
		drawPointCornerButton(tempctx, color);
		
		tempcanvas = document.getElementById("pointflatcanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='flat'? color_canvasbutton_selected : color_canvasbutton_unselected);
		drawPointFlatButton(tempctx, color);
		
		tempcanvas = document.getElementById("pointsymmetriccanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='symmetric'? color_canvasbutton_selected : color_canvasbutton_unselected);
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
			allactions += "<input  class='"+(charundoq.length>0? "button": "buttondis")+"' type='button' value='Undo" + ((charundoq.length > 0) ? (" " + charundoq.length) : "") + "' onclick='pullundoq()'><br>";
			allactions += "<input class='button' type='button' value='add new shape' onclick='addShape();putundoq(\"add shape\");redraw();'><br>";
			allactions += "<input class='button' type='button' value='insert seed shape' onclick='insertSeedShapeDialog();'><br>";
			allactions += "<input class='"+(clipboardshape? "button": "buttondis")+"' type='button' value='Paste' onclick='pasteShape();putundoq(\"paste shape\");redraw();'><br>";
			
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
		
		if(shapelayers.length > 0){ content += shapeactions; }
		else { content += "<td> &nbsp; </td>";}
		
		var ispointsel = false;
		if(s && !s.seed) ispointsel = s.path.sp(false);
		if(selectedtool != "pathedit") ispointsel = false;
		
		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(ispointsel){ content += pointactions; }
		else { content += "<td> &nbsp; </td>";}
		
		content += "</tr><tr>";
		
		content += canvasactions;
		
		if(shapelayers.length > 1){ content += layeractions; }
		
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
		
		if(shapelayers.length > 0){ 
			content += shapeactions; 
			content += "</td>"
		} else {
			content += "</td>";
		}
			
		if(shapelayers.length > 1){ content += layeractions; }
		
		content += "</tr></table>";
		
		return content;
	}

//-------------------
// Copy Paste
//-------------------
	function copyShape(){
		var s = ss("copy shape")
		if(s){
			clipboardshape = {
				"s":s,
				"c":selectedchar
			};
			//debug("COPYShape() - new clipboard shape: " + clipboardshape.s.name); 
		}
		redraw();
	}
	
	function pasteShape(){
		if(clipboardshape){
			var newshape = clone(clipboardshape.s);
			clipboardshape.c == selectedchar ? newshape.path.updatePathPosition(20,20) : true;
			
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
				addToUsedIn(newshape.seed, selectedchar);
				debug("PASTESHAPE - pasted a seedshape, added " + selectedchar + " to usedin array.");
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
		
		if(s && (selectedshape < (shapelayers.length-1))){
			var tempshape = shapelayers[selectedshape+1];
			shapelayers[selectedshape+1] = shapelayers[selectedshape];
			shapelayers[selectedshape] = tempshape;
			selectedshape++;
			redraw();
		}
	}
	
	function movedownShape(){
		var s = ss("Move Down Shape");
		
		if(s && (selectedshape > 0)){
			var tempshape = shapelayers[selectedshape-1];
			shapelayers[selectedshape-1] = shapelayers[selectedshape];
			shapelayers[selectedshape] = tempshape;
			selectedshape--;
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
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) + spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			putundoq("Up Spinner");
		}
	}
	
	function dec(obj){
		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) - spinnervaluechange);
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
		
		if(shapelayers.length > 0){
			for(var i=(shapelayers.length-1); i>=0; i--){
				content += "<input type='button'";
				if(i==selectedshape){
					content += " class='layer buttonsel'";
				} else {
					content += " class='layer button'";
				}
				content += " onclick='selectedshape = " + i + "; redraw();'";
				content += " value='" + shapelayers[i].name;
				
				if(shapelayers[i].seed) {
					content += "&nbsp;&nbsp;[seed]";
				}
				content += "'><br>";
			}
		} else {
			//debug("UPDATELAYERS() - Shapelayers.length = Zero");
			content += "<div style='margin-left:10px; font-style:oblique;'>No shapes exist yet.<br><br></div>";
		}
		
		if(clipboardshape){
			content += "<br>Clipboard: " + clipboardshape.s.name;
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
		if(navhere == "seed shapes") {
			if(!GlyphrProject.seedshapes[selectedshape]) { s = false; }
		}
		
		if(selectedtool=='pathedit'){
			pointselectclass = "buttonsel tool";
		} else if (s.seed){
			pointselectclass = "buttondis tool";
			pointselectclickable = false;
		} else {
			pointselectclass = "button tool";
		}
			
		var content = "";
		content += "<div title='edit path' class='" + pointselectclass + "' " + (pointselectclickable? "onclick='clicktool(\"pathedit\");'":"") + "/><canvas id='patheditbuttoncanvas'></canvas></div>";
		content += "<div title='move & resize shape' class='" + (selectedtool=='shaperesize'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"shaperesize\");'/><canvas id='shaperesizebuttoncanvas'></canvas></div>";
		
		if(navhere == "character edit"){
			content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
			content += "<div title='new rectangle shape' class='" + (selectedtool=='newrect'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newrect\");'/><canvas id='newrectbuttoncanvas'></canvas></div>";
			content += "<div title='new oval shape' class='" + (selectedtool=='newoval'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newoval\");'/><canvas id='newovalbuttoncanvas'></canvas></div>";
			content += "<div title='new path shape' class='" + (selectedtool=='newpath'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"newpath\");'/><canvas id='newpathbuttoncanvas'></canvas></div>";
		}
		
		content += "<div class='tool' style='width:10px;'>&nbsp;</div>";
		content += "<div title='scroll and pan' class='" + (selectedtool=='pan'? "buttonsel " : "button ") + "tool' onclick='clicktool(\"pan\");'/><canvas id='panbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: in' class='button tool' onclick='canvasZoom(1.1);'><canvas id='zoominbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: out' class='button tool' onclick='canvasZoom(.9);'><canvas id='zoomoutbuttoncanvas'></canvas></div>";
		content += "<div title='zoom: one to one' class='button tool' onclick='cec.zoom = 1;redraw();'><canvas id='zoom1to1buttoncanvas'></canvas></div>";
		content += "<div title='zoom: full em' class='button tool' onclick='resetZoomPan(); redraw();'><canvas id='zoomembuttoncanvas'></canvas></div>";
		content += "<div title='zoom level' class='tool out'>" + round(cec.zoom*100, 2) + "%</div>";
		
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
		if(selectedtool == "pathedit"){ drawPathEditButton(tempctx, "white", "black"); }
		else if (!pointselectclickable) { drawPathEditButton(tempctx, "rgb(80,80,80)", "rgb(80,80,80)"); }
		else { drawPathEditButton(tempctx, "transparent", color_accent); }
		
		// Shape Resize
		tempcanvas = document.getElementById("shaperesizebuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 3px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(selectedtool == "shaperesize"){ drawShapeResizeButton(tempctx, "white", "black"); }
		else { drawShapeResizeButton(tempctx, "transparent", color_accent); }

		// Pan
		tempcanvas = document.getElementById("panbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "3px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		if(selectedtool == "pan"){ drawPanButton(tempctx, "white", "black"); }
		else { drawPanButton(tempctx, color_accent, "transparent"); }
		
		// Zoom In
		tempcanvas = document.getElementById("zoominbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomInButton(tempctx, color_accent, "transparent");

		// Zoom Out
		tempcanvas = document.getElementById("zoomoutbuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomOutButton(tempctx, color_accent, "transparent");
		
		// Zoom 1:1
		tempcanvas = document.getElementById("zoom1to1buttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "2px 4px 0px 2px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoom1to1Button(tempctx, color_accent, "transparent");
		
		// Zoom Em
		tempcanvas = document.getElementById("zoomembuttoncanvas");
		tempcanvas.height = bh;
		tempcanvas.width = bw;
		tempcanvas.style.margin = "4px 4px 0px 3px";
		tempcanvas.style.backgroundColor = "transparent";		
		tempctx = tempcanvas.getContext("2d");
		drawZoomEmButton(tempctx, color_accent, "transparent");		

		if(navhere == "character edit"){
			// New Rectangle
			tempcanvas = document.getElementById("newrectbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(selectedtool == "newrect") { drawNewRectButton(tempctx, "white", "black"); }
			else { drawNewRectButton(tempctx, "transparent", color_accent); }
			
			// New Oval
			tempcanvas = document.getElementById("newovalbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(selectedtool == "newoval"){ drawNewOvalButton(tempctx, "white", "black"); }
			else { drawNewOvalButton(tempctx, "transparent", color_accent); }
			
			// New Path
			tempcanvas = document.getElementById("newpathbuttoncanvas");
			tempcanvas.height = bh;
			tempcanvas.width = bw;
			tempcanvas.style.margin = "2px 4px 0px 4px";
			tempcanvas.style.backgroundColor = "transparent";		
			tempctx = tempcanvas.getContext("2d");
			if(selectedtool == "newpath"){ drawNewPathButton(tempctx, "white", "black"); }
			else { drawNewPathButton(tempctx, "transparent", color_accent); }
		}
	}

	function clicktool(ctool){
		
		selectedtool = ctool;
		var s = ss("clicktool");
		
		//debug("CLICKTOOL - was passed: " + ctool + " and selectedtool now is: " + selectedtool);
		addpath.firstpoint = true; 
		if((ctool=="newrect")||(ctool=="newoval")){
			showRightLine = true;
			selectedshape = -1; 
		} else if (ctool=="newpath"){
			showRightLine = false;
			selectedshape = -1; 
		} else if(ctool=="pathedit"){
			showRightLine = false;
			if(s) {s.path.selectPathPoint(0);}
			debug("CLICKTOOL() - setting selectPathPoint = 0");
		} else if (ctool = "shapemove"){
			showRightLine = true;
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
		cec.zoom*=zfactor;
		redraw();
	}
	
	
//-------------------
// Drawing Grid
//-------------------

	var xs = {};
	
	function grid(){
		var fs = GlyphrProject.settings;
		
		ctx.fillStyle = "rgb(250,250,250)";
		ctx.fillRect(0,0,99999,99999);
		
		// background white square
		xs.xmax = cec.originx + ((cgc.size-cgc.originx)*cec.zoom);
		xs.xmin = cec.originx - (cgc.originx*cec.zoom) -1;
		xs.ymax = cec.originy + ((cgc.size-cgc.originy)*cec.zoom);
		xs.ymin = cec.originy - (cgc.originy*cec.zoom) -1;
		
		//debugSettings();
		
		ctx.fillStyle = "white";
		ctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);
		
		// Grids		
		var mline = cec.originy - (fs.upm*cec.zoom);
		var xline = cec.originy - (fs.upm*fs.xheight*cec.zoom);
		var dline = cec.originy + (fs.upm*fs.descender*cec.zoom);
		var overshootsize = (fs.upm*fs.overshoot*cec.zoom);

		if(cec.showgrid || cec.showguides){
			var size = cec.size/fs.griddivisions;
			ctx.lineWidth = 1;
			ctx.strokeStyle = color_grid;
			
			if(cec.showgrid){
				var gsize = ((fs.upm/fs.griddivisions)*cec.zoom);
				//debug("GRID - gridsize set as: " + gsize);
				
				for(var j=cec.originx; j<xs.xmax-1; j+=gsize){ vertical(j); }
				vertical(xs.xmax+1);
				for(var j=cec.originx; j>=xs.xmin; j-=gsize){ vertical(j); }
				
				for(var j=cec.originy; j<xs.ymax-1; j+=gsize){ horizontal(j); }
				horizontal(xs.ymax+1);
				for(var j=cec.originy; j>=xs.ymin; j-=gsize){ horizontal(j); }

			}
			
			if(cec.showguides){
				
				// Minor Guidelines - Overshoots
				ctx.strokeStyle = shiftColor(color_guideline, .8, true);
				horizontal(xline-overshootsize);
				horizontal(mline-overshootsize);
				horizontal(cec.originy+overshootsize);
				horizontal(dline+overshootsize);
				
				// Right hand Em Square
				vertical(cec.originx+(fs.upm*cec.zoom));
				
				// major guidelines - xheight, top (emzize)
				ctx.strokeStyle = shiftColor(color_guideline, .5, true);
				horizontal(xline);
				ctx.strokeStyle = shiftColor(color_guideline, .2, true);
				horizontal(mline);
				horizontal(dline);
				
				
				// Out of bounds triangle
				ctx.fillStyle = color_guideline;		
				ctx.beginPath();
				ctx.moveTo(cec.originx, cec.originy);
				ctx.lineTo(cec.originx, cec.originy+(cec.pointsize*2));
				ctx.lineTo(cec.originx-(cec.pointsize*2), cec.originy);
				ctx.closePath();
				ctx.fill();
				
				// Origin Lines
				ctx.strokeStyle = color_guideline;
				horizontal(cec.originy);
				vertical(cec.originx);
			}
		}
	}
	
	function horizontal(y){
		y = Math.round(y)-.5;
		ctx.beginPath();
		ctx.moveTo(xs.xmin,y);
		ctx.lineTo(xs.xmax,y);
		ctx.stroke();
		ctx.closePath();
	}
	
	function vertical(x){
		x = Math.round(x)-.5;
		ctx.beginPath();
		ctx.moveTo(x,xs.ymin);
		ctx.lineTo(x,xs.ymax+1);		
		ctx.stroke();
		ctx.closePath();
	}
	
// RANDOMS
	function debugZoomPan(zid){
		debug("<b>ZOOM PAN STATE - " + zid + " - z:" + cec.zoom + " - px:" + cec.originx + " - py:" + cec.originy + "</b>");
	}
