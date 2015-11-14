// start of file
/**
	Panel > Actions
	Usually this is attached to the bottom of the
	Glyph Attributes panel.  In two screen mode,
	the Attributes panel gets its own column.
**/


	function makePanel_Actions(){
		var pop = _UI.popout;
		var ss = _UI.ms.shapes.getMembers();

		var content = '<div class="panel_section">';
		if(pop) content = '<div class="navarea_header">';
		content += '<h1 class="paneltitle">actions</h1>';

		if(!existingWorkItem()){ return content + '</div></div>'; }


		// Generate Sections
		var allactions = '';
		allactions += '<button title="Paste\nAdds the previously-copied shape or shapes into this glyph" '+(_UI.clipboardshape? '': 'disabled')+' onclick="pasteShape(); history_put(\'Paste Shape\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_Paste(!_UI.clipboardshape) + '</button>';
		allactions += '<button title="Undo\nStep backwards in time one action" '+(history_length()? '': 'disabled')+' onclick="history_pull();">' + makeActionButton_Undo(!history_length()) + '</button>';

		if(!_UI.popout) allactions += '<button title="Add Shape\nCreates a new default shape and adds it to this glyph" onclick="addShape(); history_put(\'Add Shape\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_AddShape(false) + '</button>';
		if(!_UI.popout) allactions += '<button title="Add Component Instance\nChoose another Component or Glyph, and use it as a Component Instance in this glyph" onclick="showDialog_AddComponent();">'+ makeActionButton_AddShape(true) + '</button>';
		if(!_UI.popout) allactions += '<button title="Get Shapes\nChoose another Glyph, and copy all the shapes from that glyph to this one" onclick="showDialog_GetShapes();">' + makeActionButton_PasteShapesFromAnotherGlyph() + '</button>';

		if(_UI.navhere === 'components') allactions += '<button title="Link to Glyph\nChoose a glyph, and add this Component to that glyph as a Component Instance" onclick="showDialog_LinkComponentToGlyph();">' + makeActionButton_LinkToGlyph() + '</button>';

		var shapeactions = ss.length > 1? '<h3>shapes</h3>' : '<h3>shape</h3>';
		shapeactions += '<button title="Copy\nAdds a copy of the currently selected shape or shapes to the clipboard" onclick="copyShape();">' + makeActionButton_Copy() + '</button>';
		if(!_UI.popout) shapeactions += '<button title="Delete\nRemoves the currently selected shape or shapes from this glyph" onclick="_UI.ms.shapes.deleteShapes(); history_put(\'Delete Shape\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_DeleteShape() + '</button>';
		shapeactions += '<button title="Reverse Overlap Mode\nToggles the clockwise or counterclockwise winding of the shape\'s path" onclick="_UI.ms.shapes.reverseWinding(); history_put(\'Reverse Path Direction\'); redraw({calledby:\'shapeDetails - Winding\')};">' + makeActionButton_ReverseWinding() + '</button>';
		if(ss.length === 1 && ss[0].objtype === 'componentinstance'){
			shapeactions += '<button title="Turn Component Instance into a Shape\nTakes the selected Component Instance, and un-links it from its Root Component,\nthen adds copies of all the Root Component\'s shapes as regular Shapes to this glyph" onclick="turnComponentIntoShapes(); history_put(\'Unlinked Component\'); redraw({calledby:\'turnComponentIntoShapes\'});">' + makeActionButton_SwitchShapeComponent(true) + '</button>';
		} else {
			shapeactions += '<button title="Turn Shape into a Component Instance\nTakes the selected shape and creates a Component out of it,\nthen links that Component to this glyph as a Component Instance" onclick="turnSelectedShapeIntoAComponent(); history_put(\'Turned Shape into a Component\'); redraw({calledby:\'turnSelectedShapeIntoAComponent\'});">' + makeActionButton_SwitchShapeComponent(false) + '</button>';
		}
		shapeactions += '<button title="Flip Horizontal\nReflects the currently selected shape or shapes horizontally" onclick="_UI.ms.shapes.flipEW(); history_put(\'Flip Shape Horizontal\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_FlipHorizontal() + '</button>';
		shapeactions += '<button title="Flip Vertical\nReflects the currently selected shape or shapes vertically" onclick="_UI.ms.shapes.flipNS(); history_put(\'Flip Shape Vertical\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_FlipVertical() + '</button>';

		var layeractions = '';
		layeractions += '<button title="Move Shape Up\nMoves the shape up in the shape layer order" onclick="moveShapeUp(); history_put(\'Move Shape Layer Up\');">' + makeActionButton_MoveLayerUp() + '</button>';
		layeractions += '<button title="Move Shape Down\nMoves the shape down in the shape layer order" onclick="moveShapeDown(); history_put(\'Move Shape Layer Down\');">' + makeActionButton_MoveLayerDown() + '</button>';

		var boolactions = '';
		boolactions += '<button title="Combine\nSelect two shapes, and combine their paths into a single shape" onclick="_UI.ms.shapes.combine(); history_put(\'Combined shapes\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_Combine() + '</button>';
		// boolactions += '<button title="Subtract Using Upper\nSelect two shapes, and the upper shape will be used to cut out an area from the lower shape" onclick="">' + makeActionButton_SubtractUsingTop() + '</button>';
		// boolactions += '<button title="Subtract Using Lower\nSelect two shapes, and the lower shape will be used to cut out an area from the upper shape" onclick="">' + makeActionButton_SubtractUsingBottom() + '</button>';

		var pointactions = '<h3>path point</h3>';
		pointactions += '<button title="Insert Path Point\nAdds a new Path Point half way between the currently-selected point, and the next one" onclick="_UI.ms.points.insertPathPoint(); history_put(\'Insert Path Point\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_InsertPathPoint() + '</button>';
		pointactions += '<button title="Delete Path Point\nRemoves the currently selected point or points from the path" class="'+(ss.length? '': 'buttondis')+'" onclick="_UI.ms.points.deletePathPoints(); history_put(\'Delete Path Point\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_DeletePathPoint() + '</button>';
		pointactions += '<button title="Reset Handles\nMoves the handles of the currently selected point or points to default locations" onclick="_UI.ms.points.resetHandles(); history_put(\'Reset Path Point\'); redraw({calledby:\'actions panel\'});">' + makeActionButton_ResetPathPoint() + '</button>';

		var glyphactions = '<h3>glyph actions</h3>';
		glyphactions += '<button title="Flip Vertical\nReflects the glyph vertically" onclick="getSelectedWorkItem().flipEW(); history_put(\'Flip Glyph : Vertical\'); redraw({calledby:\'Glyph Details - FlipEW\'});">' + makeActionButton_FlipHorizontal() + '</button>';
		glyphactions += '<button title="Flip Horizontal\nReflects the glyph horizontally" onclick="getSelectedWorkItem().flipNS(); history_put(\'Flip Glyph : Horizontal\'); redraw({calledby:\'Glyph Details - FlipNS\'});">' + makeActionButton_FlipVertical() + '</button>';


		// Put it all together
		if(pop) content += '</div><div class="panel_section"><div class="actionsarea" style="margin-top:0px;">';
		else content += '<div class="actionsarea">';

		content += allactions;
		if(!pop) content += '<br>';

		if(ss.length === 0) content += glyphactions;
		if(ss.length > 0) content += shapeactions;
		if(ss.length === 2) content += boolactions;
		if(ss.length === 1 && !pop) content += layeractions;

		if(!pop) content += '<br>';

		var ispointsel = false;
		if(_UI.ms.points.count() > 0) ispointsel = true;
		if(_UI.selectedtool !== 'pathedit') ispointsel = false;

		if(ispointsel){ content += pointactions; }
		if(!pop) content += '<br>';

		content += '</div>';
		content += '</div>';

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
		_UI.glyphchooser.dialog = {
			'fname':'pasteShapesFrom',
			'choices':'all',
			'selected':'glyphs'
		};

		openBigDialog(content);
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

		_UI.glyphchooser.dialog = {
			'fname':'linkComponentToGlyph',
			'choices':'all',
			'selected':'glyphs'
		};

		openBigDialog(content);
	}

	function linkComponentToGlyph(id){
		if(insertComponentInstance(_UI.selectedcomponent, id)){
			showDialog_LinkComponentToGlyph('The Component "' + getSelectedWorkItem().name + '" was successfully linked to Glyph "' + getGlyphName(id) + '".<br><br>');
		}
	}

// end of file