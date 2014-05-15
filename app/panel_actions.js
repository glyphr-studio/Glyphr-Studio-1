
//-------------------
// Actions Panel
//-------------------
	function makePanel_Actions(stack){
		var s = ss("Update Actions");

		if(_UI.navhere==='linked shapes') return linkedShapeActions();

		var allactions = "<h3"+(stack?" style='margin-top:0px;'":"")+">universal</h3>";
		allactions += "<button class='"+(_UI.charundoq.length>0? "": "buttondis")+"' onclick='pullundoq()'>undo" + ((_UI.charundoq.length > 0) ? (" " + _UI.charundoq.length) : "") + "</button><br>";
		allactions += "<button onclick='addShape();putundoq(\"Add Shape\");redraw(\"updateactions\");'>add new shape</button></button><br>";
		allactions += "<button onclick='insertLinkedShapeDialog();'>add linked shape</button><br>";
		allactions += "<button class='"+(_UI.clipboardshape? "": "buttondis")+"' onclick='pasteShape();putundoq(\"Paste Shape\");redraw(\"updateactions\");'>paste</button><br>";

		var shapeactions = "<h3>shape</h3>";
		shapeactions += "<button class='"+(s? "": "buttondis")+"' onclick='copyShape()'>copy</button><br>";
		shapeactions += "<button class='"+(s? "": "buttondis")+"' onclick='ss().path.flipEW();putundoq(\"Flip Shape Horizontal\");redraw(\"updateactions\");'>flip horizontal</button><br>";
		shapeactions += "<button class='"+(s? "": "buttondis")+"' onclick='ss().path.flipNS();putundoq(\"Flip Shape Vertical\");redraw(\"updateactions\");'>flip vertical</button><br>";
		shapeactions += "<button class='"+(s? "": "buttondis")+"' onclick='deleteShape();putundoq(\"Delete Shape\");redraw(\"updateactions\");'>delete</button><br>";

		var layeractions = "<h3>layer</h3>";
		layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='moveupShape();putundoq(\"Move Shape Layer Up\");'>move up</button><br>";
		layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='movedownShape();putundoq(\"Move Shape Layer Down\");'>move down</button><br>";

		var canvasactions = "<h3>editor view</h3>";
		canvasactions += "<button onclick='_UI.showgrid? _UI.showgrid=false : _UI.showgrid=true; redraw(\"updateactions\");'>toggle grid</button><br>";
		canvasactions += "<button onclick='_UI.showguides? _UI.showguides=false : _UI.showguides=true; redraw(\"updateactions\");'>toggle guides</button><br>";

		var pointactions = "<h3>path point</h3>";
		pointactions += "<button onclick='ss().path.insertPathPoint(); putundoq(\"Insert Path Point\"); redraw(\"updateactions\");'>insert</button><br>";
		pointactions += "<button class='"+(s? "": "buttondis")+"' onclick='ss().path.deletePathPoint(); putundoq(\"Delete Path Point\"); redraw(\"updateactions\");'>delete</button><br>";
		pointactions += "<button onclick='ss().path.sp().resetHandles(); putundoq(\"Reset Path Point\"); redraw(\"updateactions\");'>reset handles</button><br>";

		// Put it all together
		var content = "<h1"+(stack?" class='paneltitle'":"")+">actions</h1><table class='actionsgrid'><tr>";

		content += "<td>";
		content += allactions;
		if(!stack) content += "</td>";

		if(!stack) content += "<td>";
		if(getSelectedCharShapes().length > 0){ content += shapeactions; }
		else if (!stack){ content += "&nbsp;";}
		if(!stack) content += "</td>";

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool != "pathedit") ispointsel = false;

		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(!stack) content += "<td>";
		if(ispointsel){ content += pointactions; }
		else if (!stack){ content += "&nbsp;";}
		if(!stack) content += "</td>";

		if (!stack) content += "</tr><tr>";

		if(!stack) content += "<td>";
		content += canvasactions;
		if(!stack) content += "</td>";

		if(!stack) content += "<td>";
		if(getSelectedCharShapes().length > 1 && !stack){ content += layeractions; }
		content += "</td>";

		content += "</tr></table><br><br>";

		return content;
	}

	function updateLayerActions(){

		var content = "<h1>actions</h1><table class='actionsgrid'><tr>";

		var s = ss("Update Actions");
		var allactions = "<td><h3>shape</h3>";
			allactions += "<button onclick='addShape();putundoq(\"Add Shape\");redraw(\"updateLayerActions\");'>add new shape</button><br>";
			allactions += "<button onclick='insertLinkedShapeDialog();'>add linked shape</button><br>";

		var shapeactions = "<button class='"+(s? "": "buttondis")+"' onclick='deleteShape();putundoq(\"Delete Shape\");redraw(\"updateLayerActions\");'>delete</button><br>";

		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='moveupShape();putundoq(\"Move Shape Layer Up\");'>move up</button><br>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='movedownShape();putundoq(\"Move Shape Layer Down\");'>move down</button><br>";
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

		if(_UI.navhere == "linked shapes"){
			_UI.clipboardshape = {
				"s":_GP.linkedshapes[_UI.shownlinkedshape].shape,
				"c":_UI.shownlinkedshape
			};
		} else if (_UI.navhere == "character edit"){
			var s = ss("copy shape");
			if(s.link) s = _GP.linkedshapes[s.link].shape;
			if(s){
				_UI.clipboardshape = {
					"s":s,
					"c":_UI.selectedchar,
					"dx": 0,
					"dy": 0
				};
				//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape.s.name);
			}
			redraw("copyShape");
		}
	}

	function pasteShape(){
		var cbs = _UI.clipboardshape;
		if(cbs){
			var newshape = clone(cbs.s);
			debug("PASTESHAPE checking if we've moved chars: " + cbs.c + " to " + _UI.selectedchar);
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

			if(newshape.link){
				addToUsedIn(newshape.link, _UI.selectedchar);
				//debug("PASTESHAPE - pasted a linkedshape, added " + _UI.selectedchar + " to usedin array.");
			}

			addShape(newshape);
		}
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


//-------------------
// Generic Spinner Control
//-------------------
	function spinner(){
		var content ="";
		content += "<button class='spinnerbutton' onclick='inc(this);'>&#9652;</button>";  //&and;
		content += "<button class='spinnerbutton' onclick='dec(this);'>&#9662;</button>";  //&or;
		return content;
	}

	function inc(obj){


		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) + _GP.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			//putundoq("Up Spinner");
		}
	}

	function dec(obj){


		if(obj.parentNode.childNodes[0]){
			if(isNaN(obj.parentNode.childNodes[0].value)) obj.parentNode.childNodes[0].value = 0;
			obj.parentNode.childNodes[0].value = ((obj.parentNode.childNodes[0].value*1) - _GP.projectsettings.spinnervaluechange);
			obj.parentNode.childNodes[0].onchange();
			//putundoq("Down Spinner");
		}
	}
