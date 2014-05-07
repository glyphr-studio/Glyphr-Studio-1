
//-------------------
// Panel Attributes
//-------------------
	function makePanel_Attributes(){
		//debug("UPDATECHAREDITDETAILS");

		var s = ss("update details");

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		var content = "";
		if(_UI.navhere == "linked shapes"){
			content = "<h1 class='paneltitle'>" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "</h1>";
		} else {
			content = "<h1 class='paneltitle'>attributes</h1>";
		}

		_UI.locarr = [];
		_UI.checkarr = [];

		content += "<table class='detail'>";

		//debug("UPDATEDETAILS - _UI.selectedshape: " + _UI.selectedshape + " - s.name: " + s.name + " - navhere: " + _UI.navhere);
		if (_UI.navhere == "character edit"){
			//debug("UPDATEDETAILS - detected navhere = character edit");
			if(s && s.link){
				// linked shape selected
				//debug("UPDATEDETAILS: linked shape selected");
				content += linkedShapeInstanceDetails(s);
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

		} else if (_UI.navhere == "linked shapes"){
			//debug("UPDATEDETAILS - detected navhere = linked shapes");
			if (s){
				content += shapeDetails(s);
				if(ispointsel){
					content += pointDetails(s);
				}
			}
			content += linkedShapeCharDetails();
			content += "</table><br>";
			content += updatelinkedshapeactions();
		}

		return content;
	}

	function drawPanel_Attributes(){
		var s = ss("update details");

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		if(ispointsel) drawPointButtons(s);

		// draw UsedInThumbs for LinkedShapes
		if(_UI.navhere == "linked shapes") drawUsedinThumbs();

		// draw locks
		//debug("UPDATEDETAILS - starting drawing locks, locarr.length = " + _UI.locarr.length);
		var obj, thislocid, thischeckid, color;

		for(var j=0; j<_UI.locarr.length; j++){
			thislocid = ("locid"+j);
			obj = document.getElementById(thislocid);
			//debug("UPDATEDETAILS - drawing lock id " + thislocid + " obj = " + obj);
			if(obj){
				obj.height = 11;
				obj.width = 11;
				color = _UI.locarr[j]? _UI.colors.button_selected : _UI.colors.button_resting;
				drawLockButton(obj, color);
			}
		}
		_UI.locid = 0;


		//draw checks
		for(var k=0; k<_UI.checkarr.length; k++){
			thischeckid = ("checkid"+k);
			obj = document.getElementById(thischeckid);
			if(obj){
				//debug("Drawing Check with ID: " + thischeckid + ", obj: " + obj + " passed: " + _UI.checkarr[k]);
				obj.height = 15;
				obj.width=15;
				drawCheckbox(obj, _UI.checkarr[k]);
			}
		}
		_UI.checkid = 0;
	}

	function charDetails(s){

		var sc = getSelectedChar();
		var content = "";

		content += "<tr><td colspan=3><h3 style='margin:0px;'>"+sc.charname+"</h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> number of shapes </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					getSelectedCharShapes().length + "'/></td>"+
					"</tr>";


		content += "<tr><td colspan=3><h3> bulk-transform character shapes </h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> x position </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharPosition(this.value, false, true); putundoq(\"Character X Position : \"+this.value); redraw(\"Character Details - X Position\");}'"+
				" value='" + rounddec(sc.maxes.xmin) + "' >" + spinner() + "</td>"+
				"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> y position </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharPosition(false, this.value, true); putundoq(\"Character Y Position : \"+this.value); redraw(\"Character Details - Y Position\");}'"+
				" value='" + rounddec(sc.maxes.ymax) + "' >" + spinner() + "</td>"+
				"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> width </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharSize(this.value,false,"+sc.ratiolock+"); putundoq(\"Character Width : \"+this.value); redraw(\"Character Details - Width\");}'"+
				" value='" + rounddec(sc.maxes.xmax-sc.maxes.xmin) + "' >" + spinner() + "</td>"+
				"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> height </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharSize(false,this.value,"+sc.ratiolock+"); putundoq(\"Character Height : \"+this.value); redraw(\"Character Details - Height\");}'"+
				" value='" + rounddec(sc.maxes.ymax-sc.maxes.ymin) + "' >" + spinner() + "</td>"+
				"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> lock aspect ratio </td>"+
					"<td class='rightcol'>"+checkUI("getSelectedChar().ratiolock="+!sc.ratiolock+";redraw(\"Character: lock aspect ratio\");",sc.ratiolock)+"</tr>";


		content += "<tr><td colspan=3><h3> width metrics for kerning </h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> auto advance width </td>"+
					"<td class='rightcol'>"+checkUI("getSelectedChar().isautowide="+!sc.isautowide+"; redraw(\"charDetails\");", sc.isautowide)+"</td>"+
					"</tr>";

		if(!sc.isautowide){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> advance width <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(sc.advancewidth) + "' onchange='getSelectedChar().advancewidth = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
					"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> advance width <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					rounddec(sc.advancewidth) + "'/></td>"+
					"</tr>";
		}

		content += "<tr><td colspan=3>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> use default left side bearing </td>"+
					"<td class='rightcol'>"+checkUI("getSelectedChar().leftsidebearing="+!sc.leftsidebearing+"; redraw(\"charDetails\");", !sc.leftsidebearing)+"</td>"+
					"</tr>";

		if(sc.leftsidebearing){
			if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					sc.leftsidebearing + "' onchange='getSelectedChar().leftsidebearing = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
					"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+
					rounddec(_GP.projectsettings.defaultlsb) + "'/></td>"+
					"</tr>";
		}

		content += "<tr><td colspan=3>&nbsp;</td></tr>";

		return content;

	}

	function shapeDetails(s){

		//debug("SHAPEDETAILS - Drawing Shape Details");
		var content = "";
		content += "<tr><td colspan=2><h3 style='margin:0px;'>shape</h3></td><td style='width:200px'>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> name </td>"+
					"<td class='rightcol'>"+
					"<input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().changeShapeName(this.value);'></td>"+
					"</tr>";

		if(!_UI.eventhandlers.temppathdragshape){
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td>"+
					"<td> shape x </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.xlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathPosition(this.value, false); putundoq(\"Shape X Position : \"+this.value); redraw(\"shapeDetails - X Position\");}'")+
					" value='" + rounddec(s.path.maxes.xmin) + "' >" + (s.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td>"+
					"<td> shape y </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.ylock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathPosition(false, this.value); putundoq(\"Shape Y Position : \"+this.value); redraw(\"shapeDetails - Y Position\");}'")+
					" value='" + rounddec(s.path.maxes.ymax) + "' >" + (s.ylock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td>"+
					"<td> width </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.wlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathSize(this.value,false,ss().ratiolock); putundoq(\"Shape Width : \"+this.value); redraw(\"shapeDetails - Width\");}'")+
					" value='" + rounddec(s.path.maxes.xmax-s.path.maxes.xmin) + "' >" + (s.wlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td>"+
					"<td> height </td>"+
					"<td class='rightcol'><input class='input' type='text' "+
					(s.hlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathSize(false,this.value,ss().ratiolock); putundoq(\"Shape Height : \"+this.value); redraw(\"shapeDetails - Height\");}'")+
					" value='" + rounddec(s.path.maxes.ymax-s.path.maxes.ymin) + "' >" + (s.hlock? "" : spinner()) + "</td>"+
					"</tr>";

		} else {
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock",s.xlock)+"</td>"+
					"<td> x </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.xmin) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock",s.ylock)+"</td>"+
					"<td> y </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.ymax) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",s.wlock)+"</td>"+
					"<td> width </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.xmax-_UI.eventhandlers.temppathdragshape.xmin) + "'>&nbsp;</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",s.hlock)+"</td>"+
					"<td> height </td>"+
					"<td class='rightcol'><input class='input' type='text' value='"+
					rounddec(_UI.eventhandlers.temppathdragshape.ymax-_UI.eventhandlers.temppathdragshape.ymin) + "'>&nbsp;</td>"+
					"</tr>";
		}

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> overlap mode <span class='help' title='shapes with the same winding will combine, opposite windings will cut-out'>?</span> </td>"+
					"<td class='rightcol'><input type='text' disabled='disabled'"+
					" value='"+(s.path.winding===0?"unknown":(s.path.winding>0?"counterclockwise":"clockwise"))+"'/>"+
					"<input type='button' onclick='ss().path.reversePath();putundoq(\"Reverse Path Direction\");redraw(\"shapeDetails - Clockwise\");' value='"+(s.path.winding>0?"&#8635":"&#8634")+";' class='button spinnerbutton' style='width:40px;'/></td>"+
					"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> lock aspect ratio </td>"+
					"<td class='rightcol'>"+checkUI("ss().ratiolock="+!s.ratiolock+";redraw(\"lock aspect ratio\");",s.ratiolock)+"</tr>";

		//debug("<b>SHAPE DETAILS OUTPUT:<b><br><textarea rows=9 cols=3000>" + content + "</textarea>");
		return content;
	}

	function pointDetails(s){
		var tp = s.path.sp();
		var content = "";
		content += "<tr><td colspan=3><h3>path point</h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> selected point </td>"+
					"<td class='rightcol'><input class='input' type='text' value='" + s.path.sp(true) + "' onchange='ss().path.selectPathPoint(this.value); redraw(\"pointDetails\");'>"+spinner()+"</td>"+
					"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td><td> point type </td><td class='rightcol'>  ";
		content += "<canvas class='canvasbutton' title='point type: corner' onclick='ss().path.sp().type = \"corner\"; putundoq(\"Point Type: Corner\"); redraw(\"pointDetails\");' id='pointcornercanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: flat' onclick='ss().path.sp().makeFlat(); putundoq(\"Point Type: Flat\"); redraw(\"pointDetails\");' id='pointflatcanvas'></canvas>";
		content += "<canvas class='canvasbutton' title='point type: symmetric' onclick='ss().path.sp().makeSymmetric(); putundoq(\"Point Type: Symmetric\"); redraw(\"pointDetails\");' id='pointsymmetriccanvas'></canvas>";
		content += "</td></tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.xlock",tp.P.xlock)+"</td>"+
					"<td> point x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.P.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"P\", round(this.value), \"null\"); putundoq(\"Point X Position : \"+this.value); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.P.x) + "' >" + (tp.P.xlock? "" : spinner()) + "</td>"+
					"</tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.ylock",tp.P.ylock)+"</td>"+
					"<td> point y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.P.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"P\", \"null\", round(this.value)); putundoq(\"Point Y Position : \"+this.value); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.P.y) + "' >" + (tp.P.ylock? "" : spinner()) + "</td>"+
					"</tr>";

		content += "<tr><td colspan=3><h3>handle 1 <span class='unit'>(before the point)</span></h3></td></tr>";

		if(tp.type !== 'symmetric'){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
						"<td> use handle 1 </td>"+
						"<td class='rightcol'>"+checkUI("ss().path.sp().toggleUseHandle(\"H1\");", tp.useh1)+"</td>"+
						"</tr>";
		}

		if(tp.useh1){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.xlock",tp.H1.xlock)+"</td>"+
					"<td> handle 1 x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H1.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"H1\", round(this.value), \"null\"); putundoq(\"H1 X Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H1.x) + "' >" + (tp.H1.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H1.ylock",tp.H1.ylock)+"</td>"+
					"<td> handle 1 y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H1.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"H1\", \"null\", round(this.value)); putundoq(\"H1 Y Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H1.y) + "' >" + (tp.H1.ylock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> angle <span class='unit'>(degrees)</span></td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+(round(tp.getHandleAngle(tp.H1)*180/Math.PI,3) || 0)+"'></td>"+
					"</tr>";
		}

		content += "<tr><td colspan=3><h3>handle 2 <span class='unit'>(after the point)</span></h3></td></tr>";

		if(tp.type !== 'symmetric'){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
						"<td> use handle 2 </td>"+
						"<td class='rightcol'>"+checkUI("ss().path.sp().toggleUseHandle(\"H2\");", tp.useh2)+"</td>"+
						"</tr>";
		}

		if(tp.useh2){
			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.xlock",tp.H2.xlock)+"</td>"+
					"<td> handle 2 x </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H2.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"H2\", round(this.value), \"null\"); putundoq(\"H2 X Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H2.x) + "' >" + (tp.H2.xlock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().H2.ylock",tp.H2.ylock)+"</td>"+
					"<td> handle 2 y </td>"+
					"<td class='rightcol'><input class='input' type='text' " + (tp.H2.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPosition(\"H2\", \"null\", round(this.value)); putundoq(\"H2 Y Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
					" value='" + rounddec(tp.H2.y) + "' >" + (tp.H2.ylock? "" : spinner()) + "</td>"+
					"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
					"<td> angle <span class='unit'>(degrees)</span></td>"+
					"<td class='rightcol'><input type='text' disabled='disabled' value='"+(round(tp.getHandleAngle(tp.H2)*180/Math.PI,3) || 0)+"'></td>"+
					"</tr>";
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
		color = (tp.type=='corner'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointCornerButton(tempctx, color);

		tempcanvas = document.getElementById("pointflatcanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='flat'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointFlatButton(tempctx, color);

		tempcanvas = document.getElementById("pointsymmetriccanvas");
		tempcanvas.height = 15;
		tempcanvas.width = 15;
		tempcanvas.style.backgroundColor = "transparent";
		tempctx = tempcanvas.getContext("2d");
		color = (tp.type=='symmetric'? _UI.colors.button_selected : _UI.colors.button_resting);
		drawPointSymmetricButton(tempctx, color);
	}

	// Helper Functions

	function lockUI(varname, islocked){
		//debug("LOCKUI - making html for varname " + varname + " was passed " + islocked + ", and locarr is now: [" + _UI.locarr + "]");
		var re = "<canvas id='locid"+_UI.locid+"' ";
		_UI.locarr[_UI.locid] = islocked;
		_UI.locid = ((_UI.locid*1)+1);
		//re += " onclick='debug(\"--CLICKED ON " + varname + " LOCK-- changing to \"+"+!islocked+"); "+varname+" = " + !islocked + "; redraw();'></canvas>";
		re += " onclick='"+varname+" = " + !islocked + "; redraw(\"lockUI\");'></canvas>";

		return re;
	}

	function checkUI(onclick, ischecked){
		//debug("CHECKUI - making html for checkarr[" + _UI.checkid + "] = " + ischecked + ", and checkarr is now: [" + _UI.checkarr + "]");
		var re = "<canvas id='checkid"+_UI.checkid+"' ";
		_UI.checkarr[_UI.checkid] = ischecked;
		_UI.checkid = ((_UI.checkid*1)+1);
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

