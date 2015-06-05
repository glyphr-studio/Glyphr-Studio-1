// start of file
/**
	Panel > Actions
	Usually this is attached to the bottom of the 
	Glyph Attributes panel.  In two screen mode, 
	the Attributes panel get's its own column. 
**/


	function makePanel_Actions(){
		var pop = _UI.popout;
		var ss = _UI.ss.getMembers();

		var content = "<div class='panel_section'>";
		if(pop) content = "<div class='navarea_header'>";
		content += "<h1 class='paneltitle'>actions</h1>";

		if(!existingWorkItem()){ return content + '</div></div>'; }
		
		if(pop) content += "</div><div class='panel_section'>";

		// Generate Sections

		var allactions = "<h3"+(pop? " style='margin-top:0px;'":"")+">universal</h3>";
		allactions += "<button class='"+(_UI.clipboardshape? "": "buttondis")+"' onclick='pasteShape();history_put(\"Paste Shape\");redraw(\"updateactions\");'>paste</button><br>";
		allactions += "<button class='"+(history_length()? "": "buttondis")+"' onclick='history_pull()'>undo" + (history_length()? (" ("+history_length()+")") : "") + "</button><br>";
		if(!_UI.popout) allactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw(\"updateactions\");'>add new shape</button></button><br>";
		if(!_UI.popout) allactions += "<button onclick='showDialog_AddComponent();'>add component</button><br>";
		if(!_UI.popout) allactions += "<button onclick='showDialog_GetShapes();'>get shapes from another glyph</button><br>";
		if(_UI.navhere === 'components') allactions += "<button onclick='showDialog_LinkComponentToGlyph();'>link component to a glyph</button><br>";

		var shapeactions = ss.length > 1? "<h3>shapes</h3>" : "<h3>shape</h3>";
		shapeactions += "<button onclick='copyShape()'>copy</button><br>";
		shapeactions += "<button onclick='_UI.ss.flipEW();history_put(\"Flip Shape Horizontal\");redraw(\"updateactions\");'>flip horizontal</button><br>";
		shapeactions += "<button onclick='_UI.ss.flipNS();history_put(\"Flip Shape Vertical\");redraw(\"updateactions\");'>flip vertical</button><br>";
		shapeactions += "<button onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateactions\");'>delete</button><br>";

		if(ss.length === 1 && ss[0].objtype === 'componentinstance'){
			shapeactions += "<button onclick='turnComponentIntoShapes();history_put(\"Unlinked Component\");redraw(\"turnComponentIntoShapes\");'>unlink this component</button><br>";
		} else {
			shapeactions += "<button onclick='turnSelectedShapeIntoAComponent();history_put(\"Turned Shape into a Component\");redraw(\"turnSelectedShapeIntoAComponent\");'>turn into a component</button><br>";
		}

		var layeractions = "<h3>layer</h3>";
		layeractions += "<button onclick='moveShapeUp();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
		layeractions += "<button onclick='moveShapeDown();history_put(\"Move Shape Layer Down\");'>move down</button><br>";

		var pointactions = "<h3>path point</h3>";
		pointactions += "<button onclick='_UI.ss.insertPathPoint(); history_put(\"Insert Path Point\"); redraw(\"updateactions\");'>insert</button><br>";
		pointactions += "<button class='"+(ss.length? "": "buttondis")+"' onclick='_UI.ss.deletePathPoint(); history_put(\"Delete Path Point\"); redraw(\"updateactions\");'>delete</button><br>";
		pointactions += "<button onclick='_UI.ss.sp().resetHandles(); history_put(\"Reset Path Point\"); redraw(\"updateactions\");'>reset handles</button><br>";

		// Put it all together
		content += "<table class='actionsgrid'><tr>";

		content += "<td>";
		content += allactions;
		if(!pop) content += "</td>";

		if(!pop) content += "<td>";
		if(ss.length > 0){ content += shapeactions; }
		else if (!pop){ content += "&nbsp;";}
		if(!pop) content += "</td>";

		var ispointsel = false;
		if(ss.length === 1 && ss[0].objtype !== 'componentinstance') ispointsel = ss[0].path.sp(false);
		if(_UI.selectedtool !== 'pathedit') ispointsel = false;

		//debug("UPDATEACTIONS - trying to get selected point, ispointsel = " + ispointsel);
		if(!pop) content += "<td>";
		if(ispointsel){ content += pointactions; }
		else if (!pop){ content += "&nbsp;";}
		if(!pop) content += "</td>";

		if (!pop) content += "</tr><tr>";

		if(!pop) content += "<td>";
		if(ss.length === 1 && !pop){ content += layeractions; }
		content += "</td>";

		content += "</tr></table></div>";

		return content;
	}


//-------------------
// Copy Paste
//-------------------
	function copyShape(){
		var ssm = _UI.ss.getMembers();
		if(ssm.length){
			_UI.clipboardshape = {
				's':clone(ssm),
				'c':_UI.selectedglyph,
				'dx': 0,
				'dy': 0
			};
			//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape._UI.ss.name);
		}
		redraw('copyShape');
	}

	function pasteShape(){
		var cbs = _UI.clipboardshape;
		var selwi = getSelectedWorkItemID();
		
		if(cbs){
			var newshapes = clone(cbs.s);
			var ts, newname, newsuffix, n;
			//debug("PASTESHAPE checking if we've moved glyphs: " + cbs.c + " to " + _UI.selectedglyph);

			_UI.ss.clear();

			for(var s=0; s<newshapes.length; s++){
				ts = newshapes[s];

				if(cbs.c === selwi) {
					cbs.dx += 20;
					cbs.dy -= 20;
					ts.updateShapePosition(cbs.dx,cbs.dy,true);
				} else {
					cbs.c = selwi;
					cbs.dx = 0;
					cbs.dy = 0;
				}

				newname = ts.name;
				newsuffix = ' (copy)';
				n = ts.name.lastIndexOf('(copy');

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
				ts.name = newname + newsuffix;

				if(ts.objtype === 'componentinstance'){
					addToUsedIn(ts.link, _UI.selectedglyph);
					//debug("PASTESHAPE - pasted a component, added " + _UI.selectedglyph + " to usedin array.");
				}

				addShape(ts);
			}

			for(var t=0; t<newshapes.length; t++) _UI.ss.add(newshapes[t]);
		}
	}

	function showDialog_GetShapes(msg){
		var content = '<h1>Get Shapes</h1>';
		content += 'Clicking a glyph will copy all the shapes in that glyph, and paste them into this glyph.<br><br>';
		content += msg? msg : '';
		var scroll = makeGenericGlyphChooserContent('pasteShapesFrom', ['glyphs', 'ligatures', 'components']);

		openBigDialog(content, scroll);
	}

	function pasteShapesFrom(chid) {
		var swid = getSelectedWorkItemID();
		if(chid !== swid){
			getGlyph(chid).sendShapesTo(getSelectedWorkItemID());
			redraw();
			history_put('Pasted Shapes to Glyph');
			closeDialog();
			showDialog_GetShapes('The shapes from "' + getGlyphName(chid) + '" were successfully pasted to glyph "' + getSelectedWorkItemName() + '".<br>');
		} else {
			showDialog_GetShapes('Sorry, you can\'t paste shapes from the currently selected glyph.<br>');
		}
	}

//-------------------
// Move up / down
//-------------------
	function moveShapeUp(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.ss.getSingleton());
		if(si > -1 && si < wishapes.length-1){
			var tempshape = wishapes[si+1];
			wishapes[si+1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw("moveShapeUp");
		}
	}

	function moveShapeDown(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.ss.getSingleton());
		if(si > 0 && si < wishapes.length){
			var tempshape = wishapes[si-1];
			wishapes[si-1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw("moveShapeDown");
		}
	}


//-------------------
// COMPONENT Actions
//-------------------

	function addComponent(pglyph){
		// debug('\n addComponent - START');

		pglyph = pglyph || new Glyph({'name':'Component ' + (getLength(_GP.components)+1)});
		var newid = generateNewID(_GP.components, 'com');
		_UI.selectedcomponent = newid;

		_GP.components[newid] = pglyph;

		//debug("Added New Component: " + newid + " JSON=" + json(_GP.components));

		return newid;
	}

	function deleteComponentConfirm(){
		var content = "<h1>Delete Component</h1>Are you sure you want to delete this component?<br>";
		var uia = getSelectedWorkItem().usedin;
		if(uia.length > 0){
			content += "If you do, the component instances will also be removed from the following glyphs:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _GP.glyphs[uia[ssu]].name.replace(/LATIN /gi,"") + "<br>");
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
		var sls = getSelectedWorkItem();
		if(sls){
			// find & delete all component instances
			//debug("----------------- starting to go through sls.usedin: " + sls.usedin);
			for(var cui=0; cui<sls.usedin.length; cui++){
				var tc = _GP.glyphs[sls.usedin[cui]].shapes;
				//debug("----------------- sls.usedin step " + cui + " is " + sls.usedin[cui] + " and has #getSelectedWorkItemShapes() " + tc.length);
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
			var oldname = getSelectedWorkItemName();
			delete _GP.components[_UI.selectedcomponent];
			_UI.selectedcomponent = getFirstID(_GP.components);
			history_put('Deleted ' + oldname);
			//debug("DELETECOMPONENT - delete complete, new selectedcomponent = " + selectedcomponent);

			navigate();
		}
	}

	function pasteComponent(){
		if(_UI.clipboardshape){
			getSelectedWorkItem().shape = _UI.clipboardshape;
		}
	}

	function showDialog_LinkComponentToGlyph(msg){
		var sls = getSelectedWorkItem();
		var content = '<h1>Link to Glyph</h1>';
		content += 'Select a Glyph you would like to link to this Component.<br><br>';
		content += msg? msg : 'There are currently ' + sls.usedin.length + ' instances of "' + sls.name + '" being used in various Glyphs.<br><br>';
		var scroll = makeGenericGlyphChooserContent('linkComponentToGlyph', ['glyphs', 'ligatures', 'components']);
		openBigDialog(content, scroll);
	}

	function linkComponentToGlyph(id){
		if(insertComponentInstance(_UI.selectedcomponent, id)){
			showDialog_LinkComponentToGlyph('The Component "' + getSelectedWorkItem().name + '" was successfully linked to Glyph "' + getGlyphName(id) + '".<br><br>');
		}
	}
// end of file