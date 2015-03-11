// start of file

//-------------------
// Actions Panel
//-------------------
	function makePanel_Actions(){
		var s = ss("Update Actions");
		var pop = _UI.popout;

		var content = "<div class='panel_section'>";
		if(pop) content = "<div class='navarea_header'>";
		content += "<h1 class='paneltitle'>actions</h1>";
		if(pop) content += "</div><div class='panel_section'>";

		// Generate Sections
		if(_UI.navhere==='components') return componentActions();

		var allactions = "<h3"+(pop? " style='margin-top:0px;'":"")+">universal</h3>";
		allactions += "<button class='"+(_UI.clipboardshape? "": "buttondis")+"' onclick='pasteShape();history_put(\"Paste Shape\");redraw(\"updateactions\");'>paste</button><br>";
		allactions += "<button class='"+(history_length()? "": "buttondis")+"' onclick='history_pull()'>undo" + (history_length()? (" ("+history_length()+")") : "") + "</button><br>";
		allactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw(\"updateactions\");'>add new shape</button></button><br>";
		allactions += "<button onclick='insertComponentDialog();'>add component</button><br>";
		allactions += "<button onclick='showGetShapesDialog();'>get shapes from another glyph</button><br>";

		var shapeactions = "<h3>shape</h3>";
		shapeactions += "<button onclick='copyShape()'>copy</button><br>";
		shapeactions += "<button onclick='ss().path.flipEW();history_put(\"Flip Shape Horizontal\");redraw(\"updateactions\");'>flip horizontal</button><br>";
		shapeactions += "<button onclick='ss().path.flipNS();history_put(\"Flip Shape Vertical\");redraw(\"updateactions\");'>flip vertical</button><br>";
		shapeactions += "<button onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateactions\");'>delete</button><br>";

		if(s && s.objtype === 'componentinstance'){
			shapeactions += "<button onclick='turnComponentIntoAShape();redraw(\"turnComponentIntoAShape\");'>unlink this component</button><br>";
		} else {
			shapeactions += "<button onclick='turnSelectedShapeIntoAComponent();redraw(\"turnSelectedShapeIntoAComponent\");'>turn into a component</button><br>";
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
		if(s && s.objtype !== 'componentinstance') ispointsel = s.path.sp(false);
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
			allactions += "<button onclick='insertComponentDialog();'>add component</button><br>";
			allactions += "<button onclick='showGetShapesDialog();'>get shapes from another glyph</button><br>";

		var shapeactions = "<button class='"+(s? "": "buttondis")+"' onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateLayerActions\");'>delete</button><br>";

		var layeractions = "<td><h3>layer</h3>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='moveupShape();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
			layeractions += "<button class='"+(s? "": "buttondis")+"' onclick='movedownShape();history_put(\"Move Shape Layer Down\");'>move down</button><br>";
			layeractions += "</td>";

		content += allactions;

		if(getSelectedGlyphShapes().length > 0){ content += shapeactions; }
		content += "</td>";

		if(getSelectedGlyphShapes().length > 1){ content += layeractions; }

		content += "<td> &nbsp; </td></tr></table>";

		return content;
	}

//-------------------
// Copy Paste
//-------------------
	function copyShape(){
		var s = ss('copy shape');
		if(s){
			_UI.clipboardshape = {
				's':s,
				'c':_UI.selectedglyph,
				'dx': 0,
				'dy': 0
			};
			//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape.s.name);
		}
		redraw('copyShape');
	}

	function pasteShape(){
		var cbs = _UI.clipboardshape;
		if(cbs){
			var newshape = clone(cbs.s);
			//debug("PASTESHAPE checking if we've moved glyphs: " + cbs.c + " to " + _UI.selectedglyph);
			if(cbs.c === _UI.selectedglyph) {
				cbs.dx += 20;
				cbs.dy -= 20;
				newshape.path.updatePathPosition(cbs.dx,cbs.dy,true);
			} else {
				cbs.c = _UI.selectedglyph;
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

			if(newshape.objtype === 'componentinstance'){
				addToUsedIn(newshape.link, _UI.selectedglyph);
				//debug("PASTESHAPE - pasted a component, added " + _UI.selectedglyph + " to usedin array.");
			}

			addShape(newshape);
		}
	}

	function showGetShapesDialog(msg){
		var content = "<h1>Get Shapes</h1><table style='width:900px'><tr><td>";
		content += msg? msg : "<br>";
		content += "Clicking a glyph will copy all the shapes in that glyph, and paste them into this glyph.<br><br></td></tr>";
		content += "<tr><td><div style='overflow-y:auto; overflow-x:hidden; max-height:600px;'>";
		content += makeGenericGlyphChooserContent("pasteShapesFrom", true, true, true);
		content += "</div></td></tr>";
		content += "<tr><td><br>";
		content += "<button style='width:100px;' onclick='closeDialog();'>done</button>";
		content += "</td></tr></table>";
		openDialog(content);
	}

	function pasteShapesFrom(chid) {
		getGlyph(chid).sendShapesTo(getSelectedGlyphID());
		redraw();
		history_put("Pasted Shapes to Glyph");
		closeDialog();
		showGetShapesDialog("The shapes from '" + getGlyphName(chid) + "' were successfully pasted to glyph " + getSelectedGlyphName() + ".<br>");
	}

//-------------------
// Move up / down
//-------------------
	function moveupShape(){
		var s = ss("Move Up Shape");

		if(s && (_UI.selectedshape < (getSelectedGlyphShapes().length-1))){
			var tempshape = getSelectedGlyphShapes()[_UI.selectedshape+1];
			getSelectedGlyphShapes()[_UI.selectedshape+1] = getSelectedGlyphShapes()[_UI.selectedshape];
			getSelectedGlyphShapes()[_UI.selectedshape] = tempshape;
			_UI.selectedshape++;
			redraw("moveupShape");
		}
	}

	function movedownShape(){
		var s = ss("Move Down Shape");

		if(s && (_UI.selectedshape > 0)){
			var tempshape = getSelectedGlyphShapes()[_UI.selectedshape-1];
			getSelectedGlyphShapes()[_UI.selectedshape-1] = getSelectedGlyphShapes()[_UI.selectedshape];
			getSelectedGlyphShapes()[_UI.selectedshape] = tempshape;
			_UI.selectedshape--;
			redraw("movedownShape");
		}
	}


//-------------------
// COMPONENT Actions
//-------------------
	function componentActions(){
		var pop = _UI.popout;
		var content = '<div class="panel_section">';
		if(pop) content = '<div class="navarea_header">';
		content += '<h1 class="paneltitle">actions</h1>';
		if(!getSelectedGlyph()) return content + '</div>';
		if(pop) content += '</div><div class="panel_section">';

		var s = ss('Update Actions');

		var ls1actions = "<h3"+ (pop? " style='margin-top:0px;'" : "") +">component</h3>";
			if(s) ls1actions += "<button onclick='showAddSSToGlyphDialog();'>link to glyph</button><br>";
			ls1actions += "<button onclick='addComponent();history_put(\"Create New Component\");navigate();'>create new</button><br>";
			if(s) ls1actions += "<button onclick='deleteComponentConfirm();' class='"+(getLength(_GP.components)>1? "": "buttondis")+"'>delete</button><br>";

		var	ls2actions = "<button onclick='history_pull()' class='"+(history_length()? "": "buttondis")+"'>undo" + (history_length()? (" ("+history_length()+")"): "") + "</button><br>";
			ls2actions += "<button onclick='copyShape()'>copy</button><br>";
			ls2actions += "<button onclick='ss().path.flipEW();history_put(\"Flip Shape Horizontal\");redraw(\"updatecomponentactions\");'>flip horizontal</button><br>";
			ls2actions += "<button onclick='ss().path.flipNS();history_put(\"Flip Shape Vertical\");redraw(\"updatecomponentactions\");'>flip vertical</button><br>";

		var pointactions = "<h3>path point</h3>";
			pointactions += "<button onclick='ss().path.insertPathPoint(); history_put(\"Insert Path Point\"); redraw(\"updatecomponentactions\");'>insert</button><br>";
			pointactions += "<button onclick='ss().path.deletePathPoint(); history_put(\"Delete Path Point\"); redraw(\"updatecomponentactions\");'class='"+(s? "": "buttondis")+"' >delete</button><br>";
			pointactions += "<button onclick='ss().path.sp().resetHandles(); history_put(\"Reset Path Point\"); redraw(\"updatecomponentactions\");'>reset handles</button><br>";


		// Put it all together
		content += '<table class="actionsgrid"><tr>';
		content += '<td>';
		content += ls1actions;
		if(s){
			if(pop) content += ls2actions;
			else content += '</td><td><h3>&nbsp;</h3>'+ls2actions+'</td>';
		}

		var ispointsel = false;
		if(s && s.objtype !== 'componentinstance') ispointsel = s.path.sp(false);
		if(_UI.selectedtool !== "pathedit") ispointsel = false;
		if(ispointsel) {
			if(pop) content += pointactions;
			else content += '<td>'+pointactions+'</td>';
		}
		else { if(!pop) content += "<td><h3>&nbsp;</h3></td>"; }

		content += "</tr></table>";
		content += "</div>";
		return content;
	}

	function addComponent(pshape){
		var newid = generateNewID(_GP.components, 'com');
		var newls;
		_UI.selectedcomponent = newid;

		if(pshape){
			newls = new Component({"shape":pshape});
		} else {
			newls = new Component({"name":("component " + (getLength(_GP.components)+1))});
		}

		if(_UI.navhere === 'components') _UI.selectedshape = newid;
		_GP.components[newid] = newls;

		//debug("Added New Component: " + newid + " JSON=" + json(_GP.components));

		return newid;
	}

	function deleteComponentConfirm(){
		var content = "<h1>Delete Component</h1>Are you sure you want to delete this component?<br>";
		var uia = getSelectedGlyph().usedin;
		if(uia.length > 0){
			content += "If you do, the component instances will also be removed from the following glyphs:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _GP.glyphs[uia[ssu]].glyphname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This component is not currently being used by any glyphs.<br>";
		}

		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><button onclick='deleteComponent();'>permanently delete this component</button> &nbsp; <button onclick='closeDialog();'>cancel</button>";

		openDialog(content);
	}

	function deleteComponent(){
		//debug("DELETECOMPONENT - deleting " + _UI.selectedcomponent);
		closeDialog();
		var sls = getSelectedGlyph();
		if(sls){
			// find & delete all component instances
			//debug("----------------- starting to go through sls.usedin: " + sls.usedin);
			for(var cui=0; cui<sls.usedin.length; cui++){
				var tc = _GP.glyphs[sls.usedin[cui]].shapes;
				//debug("----------------- sls.usedin step " + cui + " is " + sls.usedin[cui] + " and has #getSelectedGlyphShapes() " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .link " + tc[sl].link + " checking against " + _UI.selectedcomponent);
					if(tc[sl].link === _UI.selectedcomponent){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}

			// delete component and switch selection
			delete _GP.components[_UI.selectedcomponent];
			_UI.selectedcomponent = getFirstID(_GP.components);
			_UI.selectedshape = _UI.selectedcomponent;
			//debug("DELETECOMPONENT - delete complete, new selectedcomponent = " + selectedcomponent);

			navigate();
		}
	}

	function pasteComponent(){
		if(_UI.clipboardshape){
			getSelectedGlyph().shape = _UI.clipboardshape;
		}
	}

	function showAddSSToGlyphDialog(msg){
		var sls = getSelectedGlyph();
		var content = "<h1>Link to Glyph</h1><table style='width:900px'><tr><td>";
		content += msg? msg : "There is currently " + sls.usedin.length + " instances of '" + sls.shape.name + "' being used.<br><br>";
		content += "Select the glyph you would like to link to this component:<br><br></td></tr>";
		content += "<tr><td><div style='overflow-y:auto; overflow-x:hidden; max-height:500px;'>";
		content += makeGenericGlyphChooserContent("insertComponentToGlyph", true, true, false);
		content += "</div></td></tr>";
		content += "<tr><td><br><button onclick='closeDialog();'>done</button></td></tr></table>";
		openDialog(content);
	}

	function insertComponentToGlyph(chid){
		insertComponent(_UI.selectedcomponent, chid);
		history_put("Insert Component to Glyph");
		closeDialog();
		showAddSSToGlyphDialog("The Component '" + getSelectedGlyph().shape.name + "' was successfully inserted into glyph " + getGlyphName(chid) + ".<br><br>");
	}
// end of file