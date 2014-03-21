
//-------------------
// Panel Char Select
//-------------------

	function makePanel_CharChooser(){
		var con = "<h1>character edit</h1>";
		con += makeGenericCharChooserContent();
		return con;
	}

	function makeGenericCharChooserContent(fname) {
		var ccon = "<div class='charselectarea'>";
		fname = fname? fname : "selectChar";
		_UI.selectchardrawarr = [];
		var bl = _UI.basiclatin;
		for(var i=0; i<bl.length; i++){
			ccon += buildbutton(bl[i], fname);
		}
		ccon += "</div>";

		//debug("makePanel_CharChooser - _UI.selectchardrawarr.length = " + _UI.selectchardrawarr.length);
		return ccon;
	}

	function drawGenericCharChooserContent(){
		//debug("\n+++++++++++++++++++++\nONE\n+++++++++++++++++++++\n\t"+JSON.stringify(_GP.linkedshapes['id1']));

		var ps = _GP.projectsettings;
		var factor = ((_UI.thumbsize-(2*_UI.thumbgutter))/(ps.upm));
		var yoffset = (_UI.thumbgutter+(ps.ascent*factor));

		//debug("drawGenericCharChooserContent - _UI.selectchardrawarr: " + _UI.selectchardrawarr);

		for(var sc=0; sc<_UI.selectchardrawarr.length; sc++){
			var tc = _UI.selectchardrawarr[sc];
			//debug("---------------------- i: " + sc + " id: " + tc);
			var scan = document.getElementById("cs"+tc);
			scan.width = _UI.thumbsize;
			scan.height = _UI.thumbsize;
			var sctx = scan.getContext("2d");

			_GP.fontchars[tc].drawCharToArea(sctx, {"dz": factor, "dx" : _UI.thumbgutter, "dy" : yoffset});
		}
		//debug("\n+++++++++++++++++++++\nTWO\n+++++++++++++++++++++\n\t"+JSON.stringify(_GP.linkedshapes['id1']));
	}

	function drawPanel_CharChooser(){drawGenericCharChooserContent();}


	function buildbutton(index, fname){

		var onc = (fname + "(\"" + index + "\");");
		var rv = "<div class='charselectbuttonwrapper' onclick='"+onc+"' title='"+getCharName(index)+"'>";
		var issel = index === _UI.selectedchar;
		issel = issel & (_UI.navhere != "linked shapes");

		if(_GP.fontchars[index] && _GP.fontchars[index].charshapes[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";}
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			_UI.selectchardrawarr.push(index);
		} else {
			if(issel) {rv += "<div class='charselectbuttonsel'";}
			else {rv += "<div class='charselectbutton'";}

			var bv = hexToHTML(index);
			
			if(parseInt(index, 16) === 32){
				rv += " style='font-size:13px; padding-top:15px;'";	// SPACE needs to be smaller font size
				bv = "space";
			}

			rv += ">";
			rv += (bv+"</div>");
		}

		rv += "</div>";

		return rv;
	}
