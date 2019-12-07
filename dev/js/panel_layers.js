// start of file
/**
	Panel > Layers
	Shows a list of all the shapes in a Glyph.
**/


	function makePanel_LayerChooser(){
		// debug(`\n makePanel_LayerChooser - START`);
		
		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">shapes</h1>';

		content += '</div><div class="panel_section">';

		var scs = getSelectedWorkItemShapes();
		// debug(`\t selectedWorkItemShapes`);
		// debug(scs);

		// debug(`\t selectedShapes`);
		// debug(_UI.ms.shapes.getMembers());
		
		var ts;

		if(scs.length > 0){
			content += '<table class="layertable">';
			for(var i=(scs.length-1); i>=0; i--){
				ts = scs[i];

				if(_UI.ms.shapes.isSelected(ts)) {
					// debug(`\t i: ${i} is selected`);	
					if(ts.objtype === 'componentinstance')	content += '<tr class="componentlayersel"';
					else content += '<tr class="layersel"';
				
				} else {
					// debug(`\t i: ${i} is NOT selected`);
					if(ts.objtype === 'componentinstance') content += '<tr class="componentlayer"';
					else content += '<tr class="layer"';
				}

				content += ' onclick="selectShape(' + i + '); ';
				if(ts.objtype === 'componentinstance') content += 'clickTool(\'shaperesize\'); ';
				content += ' redraw({calledby:\'updatelayers\'});';
				content += '">';

				if(ts.objtype === 'componentinstance') {
					content += '<td class="layerthumb">'+ts.getTransformedGlyph().makeSVG()+'</td>';
					content += '<td class="layername">' +ts.name;
					content += '<span class="layernote">[linked to component: '+getGlyphName(ts.link)+']</span>';
				} else {
					content += '<td class="layerthumb">'+ts.makeSVG()+'</td>';
					content += '<td class="layername">' + ts.name ;
				}

				content += '</td></tr>';
			}
			content += '</table>';
		} else {
			content += '<div>No shapes exist yet.  You can create one with the New Shape tools on the canvas, or by pressing "add new shape" below.<br><br></div>';
		}

		content +=  '<br><br>' + updateLayerActions();

		content += '</div>';

		// debug(`makePanel_LayerChooser - END\n\n`);
		return content;
	}

	function selectShape(num) {
		// debug('\n selectShape - START');
		// debug('\t passed ' + num);
		var wishapes = getSelectedWorkItemShapes();
		// debug('\t wishapes ' + wishapes);

		if(wishapes && wishapes[num]){
			 if(_UI.eventhandlers.isCtrlDown) _UI.ms.shapes.toggle(wishapes[num]);
			 else {
			 	_UI.ms.points.clear();
			 	_UI.ms.shapes.select(wishapes[num]);
			 }
		} else {
			_UI.ms.shapes.clear();
		}
		// debug(' selectShape - END\n');
	}

	function updateLayerActions(){
		var selshapes = _UI.ms.shapes.getMembers().length;
		var numshapes = getSelectedWorkItemShapes().length;

		var shapeactions = '';
		shapeactions += '<button title="Add Shape\nCreates a new default shape and adds it to this glyph" onclick="addShape(); history_put(\'Add Shape\'); redraw({calledby:\'updateactions\'});">' + makeActionButton_AddShape(false) + '</button>';
		shapeactions += '<button title="Add Component Instance\nChoose another Component or Glyph, and use it as a Component Instance in this glyph" onclick="showDialog_AddComponent();">'+ makeActionButton_AddShape(true) + '</button>';
		shapeactions += '<button title="Get Shapes\nChoose another Glyph, and copy all the shapes from that glyph to this one" onclick="showDialog_GetShapes();">' + makeActionButton_PasteShapesFromAnotherGlyph() + '</button>';
		if(selshapes > 0) shapeactions += '<button title="Delete\nRemoves the currently selected shape or shapes from this glyph" onclick="_UI.ms.shapes.deleteShapes(); history_put(\'Delete Shape\'); redraw({calledby:\'updateactions\'});">' + makeActionButton_DeleteShape() + '</button>';

		var layeractions = '';
		layeractions += '<button title="Move Shape Up\nMoves the shape up in the shape layer order" onclick="moveShapeUp(); history_put(\'Move Shape Layer Up\');">' + makeActionButton_MoveLayerUp() + '</button>';
		layeractions += '<button title="Move Shape Down\nMoves the shape down in the shape layer order" onclick="moveShapeDown(); history_put(\'Move Shape Layer Down\');">' + makeActionButton_MoveLayerDown() + '</button>';


		var content = '';
		if(_UI.popout){
			content += '<div class="actionsarea">';
			content += '<h3>Actions</h3>';
		} else {
			content += '<h1 class="paneltitle">Actions</h1>';
			content += '<div class="actionsarea">';
		}

		content += shapeactions;
		if(numshapes > 1 && selshapes === 1) content += layeractions;

		content += '</div>';


		return content;
	}


//-------------------
// Move up / down
//-------------------
	function moveShapeUp(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.ms.shapes.getSingleton());
		if(si > -1 && si < wishapes.length-1){
			var tempshape = wishapes[si+1];
			wishapes[si+1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw({calledby:"moveShapeUp"});
		}
	}

	function moveShapeDown(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.ms.shapes.getSingleton());
		if(si > 0 && si < wishapes.length){
			var tempshape = wishapes[si-1];
			wishapes[si-1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw({calledby:"moveShapeDown"});
		}
	}

// end of file