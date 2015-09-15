// start of file
/**
	Panel > Actions
	Usually this is attached to the bottom of the 
	Glyph Attributes panel.  In two screen mode, 
	the Attributes panel get's its own column. 
**/


	function makePanel_Actions(){
		var pop = _UI.popout;
		var ss = _UI.ms.shapes.getMembers();

		var content = "<div class='panel_section'>";
		if(pop) content = "<div class='navarea_header'>";
		content += "<h1 class='paneltitle'>actions</h1>";

		if(!existingWorkItem()){ return content + '</div></div>'; }
		
		if(pop) content += "</div><div class='panel_section'>";

		// Generate Sections

		var allactions = "<h3"+(pop? " style='margin-top:0px;'":"")+">universal</h3>";
		allactions += "<button class='"+(_UI.clipboardshape? "": "buttondis")+"' onclick='pasteShape();history_put(\"Paste Shape\");redraw({calledby:\"updateactions\"});'>paste</button><br>";
		allactions += "<button class='"+(history_length()? "": "buttondis")+"' onclick='history_pull()'>undo" + (history_length()? (" ("+history_length()+")") : "") + "</button><br>";
		if(!_UI.popout) allactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw({calledby:\"updateactions\"});'>add new shape</button></button><br>";
		if(!_UI.popout) allactions += "<button onclick='showDialog_AddComponent();'>add component</button><br>";
		if(!_UI.popout) allactions += "<button onclick='showDialog_GetShapes();'>get shapes from another glyph</button><br>";
		if(_UI.navhere === 'components') allactions += "<button onclick='showDialog_LinkComponentToGlyph();'>link component to a glyph</button><br>";

		var shapeactions = ss.length > 1? "<h3>shapes</h3>" : "<h3>shape</h3>";
		shapeactions += "<button onclick='copyShape()'>copy</button><br>";
		shapeactions += "<button onclick='_UI.ms.shapes.flipEW();history_put(\"Flip Shape Horizontal\");redraw({calledby:\"updateactions\"});'>flip horizontal</button><br>";
		shapeactions += "<button onclick='_UI.ms.shapes.flipNS();history_put(\"Flip Shape Vertical\");redraw({calledby:\"updateactions\"});'>flip vertical</button><br>";
		shapeactions += "<button onclick='deleteShape();history_put(\"Delete Shape\");redraw({calledby:\"updateactions\"});'>delete</button><br>";

		if(ss.length === 1 && ss[0].objtype === 'componentinstance'){
			shapeactions += "<button onclick='turnComponentIntoShapes();history_put(\"Unlinked Component\");redraw({calledby:\"turnComponentIntoShapes\"});'>unlink this component</button><br>";
		} else {
			shapeactions += "<button onclick='turnSelectedShapeIntoAComponent();history_put(\"Turned Shape into a Component\");redraw({calledby:\"turnSelectedShapeIntoAComponent\"});'>turn into a component</button><br>";
		}

		var layeractions = "<h3>layer</h3>";
		layeractions += "<button onclick='moveShapeUp();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
		layeractions += "<button onclick='moveShapeDown();history_put(\"Move Shape Layer Down\");'>move down</button><br>";

		var pointactions = "<h3>path point</h3>";
		pointactions += "<button onclick='_UI.ms.points.insertPathPoint(); history_put(\"Insert Path Point\"); redraw({calledby:\"updateactions\"});'>insert</button><br>";
		pointactions += "<button class='"+(ss.length? "": "buttondis")+"' onclick='_UI.ms.points.deletePathPoints(); history_put(\"Delete Path Point\"); redraw({calledby:\"updateactions\"});'>delete</button><br>";
		pointactions += "<button onclick='_UI.ms.points.resetHandles(); history_put(\"Reset Path Point\"); redraw({calledby:\"updateactions\"});'>reset handles</button><br>";

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
		if(_UI.ms.points.count() > 0) ispointsel = true;
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
		var ssm = _UI.ms.shapes.getMembers();
		if(ssm.length){
			_UI.clipboardshape = {
				's':clone(ssm),
				'c':_UI.selectedglyph,
				'dx': 0,
				'dy': 0
			};
			//debug("COPYShape() - new clipboard shape: " + _UI.clipboardshape._UI.ms.shapes.name);
		}
		redraw({calledby:'copyShape', redrawcanvas:false});
	}

	function pasteShape(){
		var cbs = _UI.clipboardshape;
		var selwi = getSelectedWorkItemID();
		
		if(cbs){
			var newshapes = [];
			var sourceshapes = cbs.s;
			var ts, newname, newsuffix, n;
			//debug("PASTESHAPE checking if we've moved glyphs: " + cbs.c + " to " + _UI.selectedglyph);


			for(var s=0; s<sourceshapes.length; s++){
				ts = new Shape(sourceshapes[s]);

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

				newshapes.push(addShape(ts));
			}

			_UI.ms.shapes.clear();
			_UI.ms.points.clear();

			for(var t=0; t<newshapes.length; t++) _UI.ms.shapes.add(newshapes[t]);
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
			redraw({calledby:'pasteShapesFrom'});
			history_put('Pasted Shapes to Glyph');
			closeDialog();
			showDialog_GetShapes('The shapes from "' + getGlyphName(chid) + '" were successfully pasted to glyph "' + getSelectedWorkItemName() + '".<br>');
		} else {
			showDialog_GetShapes('Sorry, you can\'t paste shapes from the currently selected glyph.<br>');
		}
	}



//-------------------
// COMPONENT Actions
//-------------------

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