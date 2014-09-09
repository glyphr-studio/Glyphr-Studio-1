// start of file

//-------------------
// Character Chooser
//-------------------
	function makePanel_CharChooser(fname){

		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>characters</h1>";

		content += makeGenericCharChooserContent(fname);
		return content;
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



//-------------------------
// Linked Shape Chooser
//-------------------------
	function makePanel_LinkedShapeChooser(){

		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>linked shapes</h1>";

		content += "<div class='subnavunit'>";
		content += "<table class='layertable'>";
		for(var lsid in _GP.linkedshapes){
			if(_GP.linkedshapes.hasOwnProperty(lsid)){
				//debug("LINKEDSHAPES_SUBNAV - making button for " + lsid);
				content += makeLinkedShapeSubNavButton(lsid);
			}
		}
		content += "</table><br><br>";

		content += "<h1 class='paneltitle'>actions</h1>";
		content += "<table class='actionsgrid'><tr><td colspan=3><h3>linked shape</h3>";
		content += "<button onclick='showAddSSToCharDialog();'>link to character</button><br>";
		content += "<button onclick='addLinkedShape();putundoq(\"Create New Linked Shape\");navigate();'>create new</button><br>";
		content += "<button onclick='deleteLinkedShapeConfirm();' class='"+(aalength(_GP.linkedshapes)>1? "": "buttondis")+"'>delete</button><br>";
		content += "</td></tr></table>";

		return content;
	}

	function makeLinkedShapeSubNavButton(lsid){
		// debug("makeLinkedShapeSubNavButton \t Start");
		// debug("\t passed lsid:" + lsid);

		var re = "";
		var ls = getChar(lsid);
		// debug('\t getChar for lsid: ' );
		// debug(ls);

		if(lsid === _UI.shownlinkedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='selectLinkedShape(\"" + lsid + "\");'>";
		re += "<td class='layerthumb'>";
		re += ls.shape.makeSVG();
		re += "</td>";
		re += "<td class='layername'>" + ls.shape.name + "</td></tr>";

		return re;
	}

	function selectLinkedShape(lsid){
		//debug("selectLinkedShape - lsid: " + lsid);
		_UI.shownlinkedshape = lsid;
		_UI.selectedshape = lsid;
		navigate('npAttributes');
	}


//-------------------
// Ligature Chooser
//-------------------
	function makePanel_LigatureChooser(){
		// debug('\n makePanel_LigatureChooser - START');
		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>characters</h1>";

		content += "<div class='subnavunit'>";
		content += "<table class='layertable'>";
		for(var lig in _GP.ligatures){
			if(_GP.ligatures.hasOwnProperty(lig)){
				//debug("makePanel_LigatureChooser - making button for " + lig);
				content += makeLigatureChooserButton(lig);
			}
		}
		content += "</table><br><br>";

		content += "<h1 class='paneltitle'>actions</h1>";
		content += "<table class='actionsgrid'><tr><td colspan=3><h3>shape</h3>";
		content += "<button onclick=''>create new</button><br>";
		//content += "<button onclick='addLigature();putundoq(\"Create New Ligature Shape\");navigate();'>create new</button><br>";
		content += "</td></tr></table>";

		// debug('makePanel_LigatureChooser - END\n');
		return content;
	}

	function makeLigatureChooserButton(lig){
		// debug("makeLigatureChooserButton \t Start");
		// debug("\t passed lig:" + lig);

		var re = "";
		var ligchar = getLigature(lig);
		// debug('\t getChar for lig: ' );
		// debug(ligchar);

		var ligsvg = ligchar.makeSVG();
		// debug('\t SVG: ' + ligsvg);

		if(lig === _UI.shownlinkedshape){
			re += "<tr class='layersel'";
		} else {
			re += "<tr class='layer'";
		}
		re += " onclick='selectShape(\"" + lig + "\");'>";
		re += "<td class='layerthumb'>";
		re += ligsvg;
		re += "</td>";
		re += "<td class='layername'>" + ligchar.charname + "</td></tr>";

		return re;
	}


//-------------------
// Kern Chooser
//-------------------
	function makePanel_KernChooser(){
		
		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>pairs</h1>";

		return content;
	}

// end of file