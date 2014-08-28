// start of file

//-------------------
// Panel Char Select
//-------------------
	function makePanel_CharChooser(fname){
		var con = "<h1 class='paneltitle'>characters</h1>";
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
			for(var s=_UI.charrange.latinsuppliment.begin; s<=_UI.charrange.latinsuppliment.end; s++){ ccon += makeCharChooserButton(decToHex(s), fname); }
		}

		if(cr.latinextendeda){
			if(showtitles) ccon += "<h3>latin extended-a</h3>";
			for(var a=_UI.charrange.latinextendeda.begin; a<=_UI.charrange.latinextendeda.end; a++){ ccon += makeCharChooserButton(decToHex(a), fname); }
		}

		if(cr.latinextendedb){
			if(showtitles) ccon += "<h3>latin extended-b</h3>";
			for(var b=_UI.charrange.latinextendedb.begin; b<=_UI.charrange.latinextendedb.end; b++){ ccon += makeCharChooserButton(decToHex(b), fname); }
		}

		var cn;
		if(cr.custom.length){
			for(var c=0; c<cr.custom.length; c++){
				ccon += "<h3>custom range " + (c+1) + "</h3>";
				for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
					cn = decToHex(range);
					if(_GP.projectsettings.charrange.filternoncharpoints){
						if(getCharName(cn).indexOf('[')<0) ccon += makeCharChooserButton(cn, fname);
					} else {
						ccon += makeCharChooserButton(cn, fname);
					}
				}
			}
		}

		ccon += "</div>";
		//debug("makePanel_CharChooser - _UI.selectchardrawarr.length = " + _UI.selectchardrawarr.length);
		return ccon;
	}

	function makeCharChooserButton(index, fname){

		var onc = (fname + "(\"" + index + "\");");
		var rv = "<table class='charselectbuttontable' onclick='"+onc+"' title='"+getCharName(index)+"'><tr><td>";
		var issel = (index === _UI.selectedchar);
		issel = (issel && (_UI.navhere !== "linked shapes"));
		var chtml = hexToHTML(index);
		if(index === "0x0020") chtml = "space";

		if(_GP.fontchars[index] && _GP.fontchars[index].charshapes[0]){
			var extra = "";
			if(issel) {extra = " charselectthumbsel";}
			// rv += "<canvas id='cs"+index+"' class='charselectthumb"+extra+"'></canvas>";
			rv += "<div class='charselectthumb"+extra+"'>"+getChar(index).makeSVG()+"</div>";
			// _UI.selectchardrawarr.push(index);
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

// end of file