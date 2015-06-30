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

				if(_UI.mss.isSelected(ts)) {
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
			 if(_UI.eventhandlers.multi) _UI.mss.toggle(wishapes[num]);
			 else _UI.mss.select(wishapes[num]);
		} else {
			_UI.mss.clear();
			_UI.mss.clear();
		}
		// debug(' selectShape - END\n');
	}

	function updateLayerActions(){
		var pop = _UI.popout;
		var selshapes = _UI.mss.getMembers().length;
		var numshapes = getSelectedWorkItemShapes().length;

		var shapeactions ="<h3>shapes</h3>";
		shapeactions += "<button onclick='addShape();history_put(\"Add Shape\");redraw(\"updateactions\");'>add new shape</button></button><br>";
		shapeactions += "<button onclick='showDialog_AddComponent();'>add component</button><br>";
		shapeactions += "<button onclick='showDialog_GetShapes();'>get shapes from another glyph</button><br>";

		var layeractions = "<h3>layers</h3>";
		layeractions += "<button onclick='moveShapeUp();history_put(\"Move Shape Layer Up\");'>move up</button><br>";
		layeractions += "<button onclick='moveShapeDown();history_put(\"Move Shape Layer Down\");'>move down</button><br>";


		var content = '';

		if(pop && numshapes > 1 && selshapes === 1 ){
			content += '<h1 class="paneltitle">Actions</h1>';
			content += '<td>';
			content += layeractions;
			content += "</td>";
			content += "<td> &nbsp; </td><td> &nbsp; </td></tr></table>";

		} else if (!pop){
			content += '<h1 class="paneltitle">Actions</h1>';			
			content += '<table class="actionsgrid"><tr>';

			content += '<td>';
			content += shapeactions;
			if(selshapes > 0) content += "<button onclick='deleteShape();history_put(\"Delete Shape\");redraw(\"updateactions\");'>delete</button><br>";
			content += "</td>";

			if(numshapes > 1 && selshapes === 1){
				content += '<td>';
				content += layeractions; 
				content += "</td>";
			} else {
				content += "<td> &nbsp; </td>";
			}

			content += "<td> &nbsp; </td></tr></table>";
		}

		return content;
	}


//-------------------
// Move up / down
//-------------------
	function moveShapeUp(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.mss.getSingleton());
		if(si > -1 && si < wishapes.length-1){
			var tempshape = wishapes[si+1];
			wishapes[si+1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw("moveShapeUp");
		}
	}

	function moveShapeDown(){
		var wishapes = getSelectedWorkItemShapes();
		var si = wishapes.indexOf(_UI.mss.getSingleton());
		if(si > 0 && si < wishapes.length){
			var tempshape = wishapes[si-1];
			wishapes[si-1] = wishapes[si];
			wishapes[si] = tempshape;
			redraw("moveShapeDown");
		}
	}
	
// end of file