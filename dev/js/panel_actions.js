// start of file

//-------------------
// Actions Panel
//-------------------
	function makePanel_Actions(){
		var s = ss("Update Actions");
		var pop = _UI.popout;
		var content = "<div class='navarea_section'>";
		if(pop) content = "<div class='navarea_header'>";

		content += "<h1 class='paneltitle'>actions</h1>";

		// Generate Sections
		if(_UI.navhere==='linked shapes') return linkedShapeActions();

		var allactions = "<h3"+(pop? " style='margin-top:0px;'":"")+">universal</h3>";
		allactions += "<button class='"+(_UI.clipboardshape? "": "buttondis")+"' onclick='pasteShape();history_put(\"Paste Shape\");redraw(\"updateactions\");'>paste</button><br>";
		allactions += "<button class='"+(history_length()? "": "buttondis")+"' onclick='history_pull()'>undo" + (history_length()? (" ("+history_length()+")") : "") + "</button><br>";
		allactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw(\"updateactions\");'>add new shape</button></button><br>";
		allactions += "<button onclick='insertLinkedShapeDialog();'>add linked shape</button><br>";
		allactions += "<button onclick='showGetShapesDialog();'>get shapes from another char</button><br>";

		var shapeactions = "<h3>shape</h3>";
		shapeactions += "<button onclick='copyShape()'>copy</button><br>";
		shapeactions += "<button onclick='ss().path.flipEW();history_put(\"Flip Shape Horizontal\");redraw(\"updateactions\");'>flip horizontal</button><br>";
		shapeactions += "<button onclick='ss().path.flipNS();history_put(\"Flip Shape Vertical\");redraw(\"updateactions\");'>flip vertical</button><br>";
		shapeactions += "<button onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateactions\");'>delete</button><br>";

		if(s.link){
			shapeactions += "<button onclick='turnLinkedShapeIntoAShape();redraw(\"turnLinkedShapeIntoAShape\");'>unlink this linked shape</button><br>";
		} else {
			shapeactions += "<button onclick='turnSelectedShapeIntoALinkedShape();redraw(\"turnSelectedShapeIntoALinkedShape\");'>turn into a linked shape</button><br>";
		}

		var layeractions = "<h3>layer</h3>";
		layeractions += "<button onclick='moveupShape();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
		layeractions += "<button onclick='movedownShape();history_put(\"Move Shape Layer Down\");'>move down</button><br>";

		var pointactions = "<h3>path point</h3>";
		pointactions += "<button onclick='ss().path.insertPathPoint(); history_put(\"Insert Path Point\"); redraw(\"updateactions\");'>insert</button><br>";
		pointactions += "<button class='"+(s? "": "buttondis")+"' onclick='ss().path.deletePathPoint(); history_put(\"Delete Path Point\"); redraw(\"updateactions\");'>delete</button><br>";
		pointactions += "<button onclick='ss().path.sp().resetHandles(); history_put(\"Reset Path Point\"); redraw(\"updateactions\");'>reset handles</button><br>";

		// Put it all together
		content += "<table class='actionsgrid'><tr>";

		content += "<td>";
		content += allactions;
		if(!pop) content += "</td>";

		if(!pop) content += "<td>";
		if(s){ content += shapeactions; }
		else if (!pop){ content += "&nbsp;";}
		if(!pop) content += "</td>";

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool !== 'pathedit') ispointsel = false;

		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(!pop) content += "<td>";
		if(ispointsel){ content += pointactions; }
		else if (!pop){ content += "&nbsp;";}
		if(!pop) content += "</td>";

		if (!pop) content += "</tr><tr>";

		if(!pop) content += "<td>";
		if(s && !pop){ content += layeractions; }
		content += "</td>";

		content += "</tr></table></div>";

		return content;
	}

	function updateLayerActions(){

		var content = '<h1 class="paneltitle">actions</h1><table class="actionsgrid"><tr>';

		var s = ss("Update Actions");
		var allactions = "<td><h3>shape</h3>";
			allactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw(\"updateLayerActions\");'>add new shape</button><br>";
			allactions += "<button onclick='insertLinkedShapeDialog();'>add linked shape</button><br>";
			allactions += "<button onclick='showGetShapesDialog();'>get shapes from another char</button><br>";

		var shapeactions = "<button class='"+(s? "": "buttondis")+"' onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateLayerActions\");'>delete</button><br>";

		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='moveupShape();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='movedownShape();history_put(\"Move Shape Layer Down\");'>move down</button><br>";
			layeractions += "</td>";

		content += allactions;

		if(getSelectedCharShapes().length > 0){ content += shapeactions; }
		content += "</td>";

		if(getSelectedCharShapes().length > 1){ content += layeractions; }

		content += "<td> &nbsp; </td></tr></table>";

		return content;
	}

//-------------------
// Copy Paste
//-------------------
	function copyShape(){

		if(_UI.navhere === 'linked shapes'){
			_UI.clipboardshape = {
				's':_GP.linkedshapes[_UI.shownlinkedshape].shape,
				'c':_UI.shownlinkedshape
			};
		} else if (_UI.navhere === 'character edit' || _UI.navhere === 'ligatures'){
			var s = ss('copy shape');
			if(s.link) s = _GP.linkedshapes[s.link].shape;
			if(s){
				_UI.clipboardshape = {
					's':s,
					'c':_UI.selectedchar,
					'dx': 0,
					'dy': 0
				};
				//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape.s.name);
			}
			redraw('copyShape');
		}
	}

	function pasteShape(){
		var cbs = _UI.clipboardshape;
		if(cbs){
			var newshape = clone(cbs.s);
			//debug("PASTESHAPE checking if we've moved chars: " + cbs.c + " to " + _UI.selectedchar);
			if(cbs.c === _UI.selectedchar) {
				cbs.dx += 20;
				cbs.dy -= 20;
				newshape.path.updatePathPosition(cbs.dx,cbs.dy,true);
			} else {
				cbs.c = _UI.selectedchar;
				cbs.dx = 0;
				cbs.dy = 0;
			}

			var newname = newshape.name;
			var newsuffix = ' (copy)';
			var n = newshape.name.lastIndexOf('(copy');

			if(n > 0){
				var suffix = newname.substring(n+5);
				newname = newname.substring(0,n);
				if(suffix === ')'){
					newsuffix = '(copy 2)';
				} else {
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(1);
					//debug("PASTESHAPE - suffix " + suffix);
					suffix = suffix.substring(0, suffix.length-1);
					//debug("PASTESHAPE - suffix " + suffix);
					newsuffix = '(copy ' + (parseInt(suffix)+1) + ")";
					//debug("PASTESHAPE - newsuffix " + newsuffix);
				}
			}
			newshape.name = newname + newsuffix;

			if(newshape.link){
				addToUsedIn(newshape.link, _UI.selectedchar);
				//debug("PASTESHAPE - pasted a linkedshape, added " + _UI.selectedchar + " to usedin array.");
			}

			addShape(newshape);
		}
	}

	function showGetShapesDialog(msg){
		var content = "<h1>Get Shapes</h1><table style='width:900px'><tr><td>";
		content += msg? msg : "<br>";
		content += "Clicking a character will copy all the shapes in that character, and paste them into this character.<br><br></td></tr>";
		content += "<tr><td><div style='overflow-y:auto; overflow-x:hidden; max-height:600px;'>";
		content += makeGenericCharChooserContent("pasteShapesFrom", true);
		content += "</div></td></tr>";
		content += "<tr><td><br>";
		content += "<button style='width:100px;' onclick='closeDialog();'>done</button>";
		content += "</td></tr></table>";
		openDialog(content);
	}

	function pasteShapesFrom(chid) {
		getChar(chid).sendShapesTo(getSelectedCharID());
		redraw();
		history_put("Pasted Shapes to Character");
		closeDialog();
		showGetShapesDialog("The shapes from '" + getCharName(chid) + "' were successfully pasted to character " + getSelectedCharName() + ".<br>");
	}

//-------------------
// Move up / down
//-------------------
	function moveupShape(){
		var s = ss("Move Up Shape");

		if(s && (_UI.selectedshape < (getSelectedCharShapes().length-1))){
			var tempshape = getSelectedCharShapes()[_UI.selectedshape+1];
			getSelectedCharShapes()[_UI.selectedshape+1] = getSelectedCharShapes()[_UI.selectedshape];
			getSelectedCharShapes()[_UI.selectedshape] = tempshape;
			_UI.selectedshape++;
			redraw("moveupShape");
		}
	}

	function movedownShape(){
		var s = ss("Move Down Shape");

		if(s && (_UI.selectedshape > 0)){
			var tempshape = getSelectedCharShapes()[_UI.selectedshape-1];
			getSelectedCharShapes()[_UI.selectedshape-1] = getSelectedCharShapes()[_UI.selectedshape];
			getSelectedCharShapes()[_UI.selectedshape] = tempshape;
			_UI.selectedshape--;
			redraw("movedownShape");
		}
	}

// end of file