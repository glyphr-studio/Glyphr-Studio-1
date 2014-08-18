// "use strict";

//-------------------
// Layers Panel
//-------------------
	function makePanel_LayerChooser(){

		var content = "<h1 class='paneltitle'>shapes</h1>";

		if(getSelectedCharShapes().length > 0){
			content += "<table class='layertable'>";
			for(var i=(getSelectedCharShapes().length-1); i>=0; i--){
				if(i==_UI.selectedshape){
					content += "<tr class='layersel'";
				} else {
					content += "<tr class='layer'";
				}
				content += " onclick='_UI.selectedshape = " + i + "; redraw(\"updatelayers\");'>";

				content += "<td class='layerthumb'><canvas id='layerthumb"+i+"' height='"+_UI.thumbsize+"' width='"+_UI.thumbsize+"'></canvas></td>";

				content += "<td class='layername'>" + getSelectedCharShapes()[i].name ;
				if(getSelectedCharShapes()[i].link) { content += "<span class='layernote'>[linked to "+_GP.linkedshapes[getSelectedCharShapes()[i].link].shape.name+"]</span>"; }
				content += "</td></tr>";
			}
			content += "</table>";
		} else {
			content += "<div style='margin-left:10px; font-style:oblique;'>No shapes exist yet.<br><br></div>";
		}

		if(_UI.clipboardshape){
			content += "<br>Clipboard: " + _UI.clipboardshape.s.name;
		}

		content +=  "<br><br>" + updateLayerActions();

		return content;
	}

	function drawPanel_LayerChooser() {
		// Update the thumbs
		if(getSelectedCharShapes().length > 0){
			var tctx = {};
			var tele = false;
			var layers = getSelectedCharShapes();
			for(var j=(layers.length-1); j>=0; j--){
				tele = document.getElementById(("layerthumb"+j));
				tctx = tele.getContext("2d");
				tele.style.backgroundColor = _UI.colors.offwhite;
				if(j == _UI.selectedshape) tele.style.backgroundColor = "rgb(255,255,255)";
				//debug("UPDATELAYERS - drawing layer " + j);
				layers[j].drawShapeToArea(tctx, _UI.thumbview);
			}
		}
	}


