
//-------------------
// Panel Char Select
//-------------------

	function makePanel_CharChooser(){
		var con = "<h1>character edit</h1>";
		con += makeGenericCharChooserContent();
		return con;
	}

	function makeGenericCharChooserContent(fname) {
		//stack(arguments);

		var ccon = "<div class='charselectarea'>";
		fname = fname? fname : "selectchar";
		_UI.selectchardrawarr = [];

		//Capitol Letters
		for(var i=65; i<91; i++){ccon += buildbutton(i, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		//Lowercase Letters
		for(var j=97; j<123; j++){ccon += buildbutton(j, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		// Numbers
		for(var k=48; k<58; k++){ccon += buildbutton(k, fname);}
		
		// Symbols
		for(var k=33; k<48; k++){ccon += buildbutton(k, fname);}
		for(var m=58; m<65; m++){ccon += buildbutton(m, fname);}
		for(var n=91; n<97; n++){ccon += buildbutton(n, fname);}
		for(var p=123; p<127; p++){ccon += buildbutton(p, fname);}
		ccon += "<div style='display:block; clear:all;'></div>";

		// Space
		ccon += buildbutton(32, fname);
		ccon += "</div>";

		//debug("makePanel_CharChooser - _UI.selectchardrawarr.length = " + _UI.selectchardrawarr.length);
		return ccon;
	}

	function drawGenericCharChooserContent(){
		//stack(arguments);
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
		//stack(arguments);

		var onc = (fname + "(" + index + ");");
		var rv = "<div class='charselectbuttonwrapper' onclick='"+onc+"' title='"+_GP.fontchars[index].charname+"'>";
		var issel = _GP.fontchars[index].charvalue == _GP.fontchars[_UI.selectedchar].charvalue;
		issel = issel & (_UI.navhere != "linked shapes");

		if(_GP.fontchars[index].charshapes[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";}
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			_UI.selectchardrawarr.push(index);
		} else {
			if(issel) {rv += "<div class='charselectbuttonsel'";}
			else {rv += "<div class='charselectbutton'";}

			if(index == 32) rv += " style='font-size:13px; padding-top:15px;'";	// SPACE needs to be smaller font size

			rv += ">";

			var bv = _GP.fontchars[index].charvalue;
			if(bv == "'") bv = "&#39";

			rv += (bv+"</div>");
		}

		rv += "</div>";

		return rv;
	}

	function selectchar(c, dontnavigate){
		//stack(arguments);

		//debug("SELECTCHAR - Selecting " + _GP.fontchars[c].charvalue + " from value " + c);
		_UI.selectedchar = c;
		_UI.shapelayers = _GP.fontchars[c].charshapes;
		_UI.selectedshape = -1;

		//debug("SELECTCHAR: shapelayers is now " + JSON.stringify(_UI.shapelayers));
		if(!dontnavigate){
			//debug("SELECTCHAR: selecting " + _GP.fontchars[c].charvalue + " and navigating.");
			navigate('npAttributes');
		}
	}
