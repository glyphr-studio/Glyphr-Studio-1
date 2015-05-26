// start of file
/**
	Panel > Layers
	Shows a list of all the shapes in a Glyph.
**/


	function makePanel_LayerChooser(){

		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">shapes</h1>';

		content += '</div><div class="panel_section">';

		var scs = getSelectedWorkItemShapes();
		var ts;

		if(scs.length > 0){
			content += '<table class="layertable">';
			for(var i=(scs.length-1); i>=0; i--){
				ts = scs[i];

				if(_UI.selectedshapes.isSelected(ts)) {
					if(ts.objtype === 'componentinstance')	content += '<tr class="componentlayersel"';
					else content += '<tr class="layersel"';
				} else {
					if(ts.objtype === 'componentinstance') content += '<tr class="componentlayer"';
					else content += '<tr class="layer"';
				}
				
				content += ' onclick="selectShape(' + i + '); redraw(\'updatelayers\'); ';
				if(ts.objtype === 'componentinstance') content += 'clickTool(\'shaperesize\');';
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

		return content;
	}

	function selectShape(num) {
		// debug('\n selectShape - START');
		// debug('\t passed ' + num);
		var wishapes = getSelectedWorkItemShapes();
		// debug('\t wishapes ' + wishapes);

		if(wishapes && wishapes[num]){
			 _UI.ss = wishapes[num];
			 if(_UI.eventhandlers.multi) _UI.selectedshapes.toggle(wishapes[num]);
			 else _UI.selectedshapes.select(wishapes[num]);
		} else {
			_UI.ss = false;
			_UI.selectedshapes.clear();
		}
		// debug(' selectShape - END\n');
	}

// end of file