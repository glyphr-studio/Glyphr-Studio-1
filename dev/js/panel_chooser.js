 // start of file

//-------------------
// Glyph Chooser
//-------------------
	function makePanel_GlyphChooser(fname){
		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';

		content += '<div class="panel_section">';
		content += makeGenericGlyphChooserContent(fname);
		content += '</div>';

		return content;
	}

	function makeGenericGlyphChooserContent(fname, includeligatures) {
		// debug('\n makeGenericGlyphChooserContent - START');
		// debug('\t passed fname ' + fname);

		var ccon = '<div class="charchooserwrapper">';
		fname = fname? fname : 'selectGlyph';
		var cr = _GP.projectsettings.charrange;
		var showtitles = (includeligatures || !cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);

		if(cr.basiclatin){
			var bl = _UI.basiclatinorder;
			if(showtitles) ccon += '<h3>basic latin</h3>';
			for(var i=0; i<bl.length; i++){ ccon += makeGlyphChooserButton(bl[i], fname); }
		}

		if(cr.latinsuppliment){
			if(showtitles) ccon += '<h3>latin suppliment</h3>';
			for(var s=_UI.charrange.latinsuppliment.begin; s<=_UI.charrange.latinsuppliment.end; s++){ ccon += makeGlyphChooserButton(decToHex(s), fname); }
		}

		if(cr.latinextendeda){
			if(showtitles) ccon += '<h3>latin extended-a</h3>';
			for(var a=_UI.charrange.latinextendeda.begin; a<=_UI.charrange.latinextendeda.end; a++){ ccon += makeGlyphChooserButton(decToHex(a), fname); }
		}

		if(cr.latinextendedb){
			if(showtitles) ccon += '<h3>latin extended-b</h3>';
			for(var b=_UI.charrange.latinextendedb.begin; b<=_UI.charrange.latinextendedb.end; b++){ ccon += makeGlyphChooserButton(decToHex(b), fname); }
		}

		var cn;
		if(cr.custom.length){
			// debug('\t custom ranges: ' + cr.custom.length);
			for(var c=0; c<cr.custom.length; c++){
				ccon += '<h3>custom range ' + (c+1) + '</h3>';
				for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
					cn = decToHex(range);
					if(_GP.projectsettings.charrange.filternoncharpoints){
						if(getUnicodeName(cn) !== '[name not found]') ccon += makeGlyphChooserButton(cn, fname);
					} else {
						ccon += makeGlyphChooserButton(cn, fname);
					}
				}
			}
		}

		if(includeligatures && getFirstID(_GP.ligatures)){
			if(showtitles) ccon += '<h3>ligatures</h3>';
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				ccon += makeGlyphChooserButton(l, fname);
			}}
		}

		ccon += '</div>';
		// debug('makeGenericGlyphChooserContent - END\n');
		return ccon;
	}

	function makeGlyphChooserButton(index, fname){
		// debug('\n makeGlyphChooserButton - START');
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);
		var rv = '<table class="charselectbuttontable" onclick="'+onc+'" title="'+getGlyphName(index)+'"><tr><td>';
		var issel = (index === _UI.selectedchar);
		issel = (issel && (_UI.navhere !== 'components'));
		var chtml = hexToHTML(index);
		if(index === '0x0020') chtml = 'space';

		if((_GP.glyphs[index] && _GP.glyphs[index].charshapes[0]) ||
			(_GP.ligatures[index] && _GP.ligatures[index].charshapes[0])) {
			var extra = '';
			if(issel) {extra = ' charselectthumbsel';}
			rv += '<div class="charselectthumb'+extra+'">'+getGlyph(index).makeSVG()+'</div>';
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
// Component Chooser
//-------------------------
	function makePanel_ComponentChooser(){

		var lslen = getLength(_GP.components);

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';

		content += '<div class="panel_section">';
		content += '<table class="layertable">';
		var layers = lslen? '' : '<tr><td>No components exist yet.  Press the "add new component" button below to get started.</td></tr>';
		for(var com in _GP.components){ if(_GP.components.hasOwnProperty(com)){
			//debug('COMPONENTS_SUBNAV - making button for ' + com);
			layers += makeComponentSubNavButton(com);
		}}
		content += layers;
		content += '</table>';
		content += '</div>';

		content += '<div class="panel_section">';
		content += '<button onclick="addComponent();history_put(\'Create New Component\');navigate();">add new component</button><br>';
		if(lslen) content += '<button onclick="deleteComponentConfirm();">delete component</button><br>';
		content += '</div>';


		return content;
	}

	function makeComponentSubNavButton(com){
		// debug('makeComponentSubNavButton \t Start');
		// debug('\t passed com:' + com);

		var re = '';
		var tcom = getGlyph(com);
		// debug("\t getGlyph for com: " );
		// debug(tcom);

		if(com === _UI.selectedcomponent){
			re += '<tr class="layersel"';
		} else {
			re += '<tr class="layer"';
		}
		re += ' onclick="selectComponent(\'' + com + '\');">';
		re += '<td class="layerthumb">';
		if(tcom.shape) re += tcom.shape.makeSVG();
		re += '</td>';
		re += '<td class="layername">' + (tcom.shape.name || '[no shape outline yet]') + '</td></tr>';

		return re;
	}

	function selectComponent(com){
		//debug("selectComponent - com: " + com);
		_UI.selectedcomponent = com;
		_UI.selectedshape = com;
		navigate('npAttributes');
	}


//-------------------
// Ligature Chooser
//-------------------
	function makePanel_LigatureChooser(fname){

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';

		content += '<div class="panel_section">';
		content += makeGenericLigatureChooserContent(fname);
		content += '</div>';

		content += '<div class="panel_section">';
		content += '<button onclick="showNewLigatureDialog();">add new ligature</button><br>';
		if(getLength(_GP.ligatures)) content += '<button onclick="deleteLigatureConfirm();">delete ligature</button><br>';
		else content += '<button onclick="addCommonLigatures();">add some common ligatures</button>';
		content += '</div>';

		return content;
	}

	function makeGenericLigatureChooserContent(fname) {
		// debug('\n makeGenericLigatureChooserContent - START');
		// debug('\t passed fname ' + fname);

		var content = '';
		fname = fname? fname : 'selectGlyph';

		var lig = _GP.ligatures;
		for(var l in lig){ if(lig.hasOwnProperty(l)){
			content += makeGlyphChooserButton(l, fname);
		}}

		if(content === '') content = 'No ligatures exist yet.  You can create a new one, or add a few common ligatures to get started.';

		content = '<div class="charchooserwrapper">'+content+'</div>';

		// debug('makeGenericLigatureChooserContent - END\n');
		return content;
	}

	function addCommonLigatures() {
		var ff = parseUnicodeInput('ff').join('');
		var fi = parseUnicodeInput('fi').join('');
		var fl = parseUnicodeInput('fl').join('');
		var ffi = parseUnicodeInput('ffi').join('');
		var ffl = parseUnicodeInput('ffl').join('');

		if(!_GP.ligatures[ff]) _GP.ligatures[ff] = new Glyph({'charhex':ff});
		if(!_GP.ligatures[fi]) _GP.ligatures[fi] = new Glyph({'charhex':fi});
		if(!_GP.ligatures[fl]) _GP.ligatures[fl] = new Glyph({'charhex':fl});
		if(!_GP.ligatures[ffi]) _GP.ligatures[ffi] = new Glyph({'charhex':ffi});
		if(!_GP.ligatures[ffl]) _GP.ligatures[ffl] = new Glyph({'charhex':ffl});

		_UI.selectedchar = getFirstID(_GP.ligatures);
		redraw();
	}

// end of file