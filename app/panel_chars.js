
//-------------------
// Panel Char Select
//-------------------

	function makePanel_CharChooser(fname){
		var con = "<h1>characters</h1>";
		con += makeGenericCharChooserContent(fname);
		return con;
	}

	function makeGenericCharChooserContent(fname) {
		var ccon = "<div class='charchooserwrapper'>";
		fname = fname? fname : "selectChar";
		_UI.selectchardrawarr = [];
		var cr = _GP.projectsettings.charrange;
		var showtitles = (!cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);

		if(cr.basiclatin){
			var bl = _UI.basiclatinorder;
			if(showtitles) ccon += "<h3>basic latin</h3>";
			for(var i=0; i<bl.length; i++){ ccon += makeCharChooserButton(bl[i], fname); }
		}

		if(cr.latinsuppliment){
			if(showtitles) ccon += "<h3>latin suppliment</h3>";
			for(var s=_UI.latinsuppliment.begin; s<=_UI.latinsuppliment.end; s++){ ccon += makeCharChooserButton(decToHex(s), fname); }
		}

		if(cr.latinextendeda){
			if(showtitles) ccon += "<h3>latin extended-a</h3>";
			for(var a=_UI.latinextendeda.begin; a<=_UI.latinextendeda.end; a++){ ccon += makeCharChooserButton(decToHex(a), fname); }
		}

		if(cr.latinextendedb){
			if(showtitles) ccon += "<h3>latin extended-b</h3>";
			for(var b=_UI.latinextendedb.begin; b<=_UI.latinextendedb.end; b++){ ccon += makeCharChooserButton(decToHex(b), fname); }
		}

		if(cr.custom.length){
			for(var c=0; c<cr.custom.length; c++){
				ccon += "<h3>custom range " + (c+1) + "</h3>";
				for(var range=cr.custom[c].begin; range<cr.custom[c].end; range++){
					ccon += makeCharChooserButton(decToHex(range), fname);
				}
			}
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


	function makeCharChooserButton(index, fname){

		var onc = (fname + "(\"" + index + "\");");
		var rv = "<table class='charselectbuttontable' onclick='"+onc+"' title='"+getCharName(index)+"'><tr><td>";
		var issel = index === _UI.selectedchar;
		issel = issel & (_UI.navhere != "linked shapes");
		var chtml = hexToHTML(index);
		if(index === "0x0020") chtml = "space";

		if(_GP.fontchars[index] && _GP.fontchars[index].charshapes[0]){
			var extra = "";
			if(issel) {extra = " charselectcanvassel";}
			rv += "<canvas id='cs"+index+"' class='charselectcanvas"+extra+"'></canvas>";
			_UI.selectchardrawarr.push(index);
		} else {
			if(issel) {rv += "<div class='charselectbuttonsel'";}
			else {rv += "<div class='charselectbutton'";}

			if(index === "0x0020"){
				rv += " style='font-size:13px; line-height:3.8em;'";	// SPACE needs to be smaller font size
			}

			rv += (">"+chtml+"</div>");
		}

		rv += "&nbsp;"+chtml;
		rv += "</td></tr></table>";

		return rv;
	}