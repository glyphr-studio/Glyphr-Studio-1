// start of file

//-------------------
// Layers Panel
//-------------------
	function makePanel_LayerChooser(){

		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>shapes</h1>";

		var scs = getSelectedCharShapes();

		if(scs.length > 0){
			content += "<table class='layertable'>";
			for(var i=(scs.length-1); i>=0; i--){

				if(i==_UI.selectedshape){
					content += "<tr class='layersel'";
				} else {
					content += "<tr class='layer'";
				}
				content += " onclick='_UI.selectedshape = " + i + "; redraw(\"updatelayers\");'>";

				if(scs[i].link) {
					content += "<td class='layerthumb'>"+_GP.linkedshapes[scs[i].link].shape.makeSVG()+"</td>";
					content += "<td class='layername'>" +scs[i].name;
					content += "<span class='layernote'>[linked to "+_GP.linkedshapes[scs[i].link].shape.name+"]</span>";
				} else {
					content += "<td class='layerthumb'>"+scs[i].makeSVG()+"</td>";
					content += "<td class='layername'>" + scs[i].name ;
				}

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

// end of file