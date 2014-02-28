	
//-------------------
// Layers Panel
//-------------------
	function updatelayers(){
		//stack(arguments);
		
		var content = "<h1>shapes</h1>";
		content += "<div style='height:7px; display:block;'></div>";

		if(_UI.shapelayers.length > 0){
			content += "<table class='layertable'>";
			for(var i=(_UI.shapelayers.length-1); i>=0; i--){
				if(i==_UI.selectedshape){
					content += "<tr class='layersel'";
				} else {
					content += "<tr class='layer'";
				}
				content += " onclick='_UI.selectedshape = " + i + "; redraw(\"updatelayers\");'>";
				
				content += "<td class='layerthumb'><canvas id='layerthumb"+i+"' height='"+_UI.thumbsize+"' width='"+_UI.thumbsize+"'></canvas></td>";
				
				content += "<td class='layername'>" + _UI.shapelayers[i].name ;
				if(_UI.shapelayers[i].link) { content += "<span class='layernote'>[linked to "+_GP.linkedshapes[_UI.shapelayers[i].link].shape.name+"]</span>"; }
				content += "</td></tr>";
			}
			content += "</table>";
		} else {
			content += "<div style='margin-left:10px; font-style:oblique;'>No shapes exist yet.<br><br></div>";
		}
		
		if(_UI.clipboardshape){
			content += "<br>Clipboard: " + _UI.clipboardshape.s.name;
		}
		
		content += updateLayerActions();
		
		try {
			//debug("UPDATELAYERS: final html content: \n " + content);
			document.getElementById("navtargetpane").innerHTML = content;	
		} catch(err) {
			//debug("UPDATELAYERS - <b>innerHTML update error caught</b>");
		}

		
		// Update the thumbs		
		if(_UI.shapelayers.length > 0){
			var tctx = {};
			var tele = false;
			for(var j=(_UI.shapelayers.length-1); j>=0; j--){
				tele = document.getElementById(("layerthumb"+j));
				tctx = tele.getContext("2d");
				tele.style.backgroundColor = _UI.colors.offwhite;
				if(j == _UI.selectedshape) tele.style.backgroundColor = "rgb(255,255,255)";
				//debug("UPDATELAYERS - drawing layer " + j);
				_UI.shapelayers[j].drawShapeToArea(tctx, _UI.thumbview);
			}
		}
	}


