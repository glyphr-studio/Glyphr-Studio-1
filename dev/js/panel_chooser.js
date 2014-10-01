// start of file

//-------------------
// Character Chooser
//-------------------
	function makePanel_CharChooser(fname){

		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">characters</h1>';

		content += '</div><div class="navarea_section">';

		content += makeGenericCharChooserContent(fname);

		content += '</div>';

		return content;
	}

	function makeGenericCharChooserContent(fname, includeligatures) {
		// debug('\n makeGenericCharChooserContent - START');
		// debug('\t passed fname ' + fname);

		var ccon = '<div class="charchooserwrapper">';
		fname = fname? fname : 'selectChar';
		var cr = _GP.projectsettings.charrange;
		var showtitles = (includeligatures || !cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);

		if(cr.basiclatin){
			var bl = _UI.basiclatinorder;
			if(showtitles) ccon += '<h3>basic latin</h3>';
			for(var i=0; i<bl.length; i++){ ccon += makeCharChooserButton(bl[i], fname); }
		}

		if(cr.latinsuppliment){
			if(showtitles) ccon += '<h3>latin suppliment</h3>';
			for(var s=_UI.charrange.latinsuppliment.begin; s<=_UI.charrange.latinsuppliment.end; s++){ ccon += makeCharChooserButton(decToHex(s), fname); }
		}

		if(cr.latinextendeda){
			if(showtitles) ccon += '<h3>latin extended-a</h3>';
			for(var a=_UI.charrange.latinextendeda.begin; a<=_UI.charrange.latinextendeda.end; a++){ ccon += makeCharChooserButton(decToHex(a), fname); }
		}

		if(cr.latinextendedb){
			if(showtitles) ccon += '<h3>latin extended-b</h3>';
			for(var b=_UI.charrange.latinextendedb.begin; b<=_UI.charrange.latinextendedb.end; b++){ ccon += makeCharChooserButton(decToHex(b), fname); }
		}

		var cn;
		if(cr.custom.length){
			// debug('\t custom ranges: ' + cr.custom.length);
			for(var c=0; c<cr.custom.length; c++){
				ccon += '<h3>custom range ' + (c+1) + '</h3>';
				for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
					cn = decToHex(range);
					if(_GP.projectsettings.charrange.filternoncharpoints){
						if(getUnicodeName(cn).indexOf('[')<0) ccon += makeCharChooserButton(cn, fname);
					} else {
						ccon += makeCharChooserButton(cn, fname);
					}
				}
			}
		}

		if(includeligatures && getFirstID(_GP.ligatures)){
			if(showtitles) ccon += '<h3>ligatures</h3>';
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				ccon += makeCharChooserButton(l, fname);
			}}
		}

		ccon += '</div>';
		// debug('makeGenericCharChooserContent - END\n');
		return ccon;
	}

	function makeCharChooserButton(index, fname){
		// debug('\n makeCharChooserButton - START');
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);
		var rv = '<table class="charselectbuttontable" onclick="'+onc+'" title="'+getCharName(index)+'"><tr><td>';
		var issel = (index === _UI.selectedchar);
		issel = (issel && (_UI.navhere !== 'linked shapes'));
		var chtml = hexToHTML(index);
		if(index === '0x0020') chtml = 'space';

		if((_GP.fontchars[index] && _GP.fontchars[index].charshapes[0]) ||
			(_GP.ligatures[index] && _GP.ligatures[index].charshapes[0])) {
			var extra = '';
			if(issel) {extra = ' charselectthumbsel';}
			rv += '<div class="charselectthumb'+extra+'">'+getChar(index).makeSVG()+'</div>';
		} else {
			if(issel) {rv += '<div class="charselectbuttonsel"';}
			else {rv += '<div class="charselectbutton"';}

			if(index === '0x0020'){
				rv += ' style="font-size:13px; line-height:3.8em;"';	// SPACE needs to be smaller font size
			}

			rv += ('>'+chtml+'</div>');
		}

		rv += '&nbsp;'+chtml;
		rv += '</td></tr></table>';

		return rv;
	}



//-------------------------
// Linked Shape Chooser
//-------------------------
	function makePanel_LinkedShapeChooser(){

		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">linked shapes</h1>';

		content += '</div><div class="navarea_section">';

		content += '<div class="subnavunit">';
		content += '<table class="layertable">';
		for(var lsid in _GP.linkedshapes){
			if(_GP.linkedshapes.hasOwnProperty(lsid)){
				//debug('LINKEDSHAPES_SUBNAV - making button for ' + lsid);
				content += makeLinkedShapeSubNavButton(lsid);
			}
		}
		content += '</table><br><br>';

		content += '<h1 class="paneltitle">actions</h1>';
		content += '<table class="actionsgrid"><tr><td colspan=3><h3>linked shape</h3>';
		content += '<button onclick="showAddSSToCharDialog();">link to character</button><br>';
		content += '<button onclick="addLinkedShape();history_put(\'Create New Linked Shape\');navigate();">create new</button><br>';
		content += '<button onclick="deleteLinkedShapeConfirm();" class="'+(aalength(_GP.linkedshapes)>1? '': 'buttondis')+'">delete</button><br>';
		content += '</td></tr></table>';

		content += '</div>';

		return content;
	}

	function makeLinkedShapeSubNavButton(lsid){
		// debug('makeLinkedShapeSubNavButton \t Start');
		// debug('\t passed lsid:' + lsid);

		var re = '';
		var ls = getChar(lsid);
		// debug("\t getChar for lsid: " );
		// debug(ls);

		if(lsid === _UI.shownlinkedshape){
			re += '<tr class="layersel"';
		} else {
			re += '<tr class="layer"';
		}
		re += ' onclick="selectLinkedShape(\'' + lsid + '\');">';
		re += '<td class="layerthumb">';
		re += ls.shape.makeSVG();
		re += '</td>';
		re += '<td class="layername">' + ls.shape.name + '</td></tr>';

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
	function makePanel_LigatureChooser(fname){

		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">characters</h1>';

		content += '</div><div class="navarea_section">';

		content += makeGenericLigatureChooserContent(fname);

		content += '</div><div class="navarea_section">';

		content += '<h1 class="paneltitle">actions</h1>';
		content += '<table class="actionsgrid"><tr>';
		content += '<td><h3>ligature</h3>'+
					'<button onclick="showNewLigatureDialog();">add new ligature</button><br>'+
					'<button onclick="deleteLigatureConfirm();">delete ligature</button><br>'+
					'<td></td><td></td>'+
					'</tr></table>';

		content += '</div>';

		return content;
	}


	function makeGenericLigatureChooserContent(fname) {
		// debug('\n makeGenericLigatureChooserContent - START');
		// debug('\t passed fname ' + fname);

		var content = '';
		fname = fname? fname : 'selectChar';

		var lig = _GP.ligatures;
		for(var l in lig){ if(lig.hasOwnProperty(l)){
			content += makeCharChooserButton(l, fname);
		}}

		if(content === '') content = 'No ligatures exist.  Press the "add new ligature" button below to get started.';

		content = '<div class="charchooserwrapper">'+content+'</div>';
		
		// debug('makeGenericLigatureChooserContent - END\n');
		return content;
	}

// end of file