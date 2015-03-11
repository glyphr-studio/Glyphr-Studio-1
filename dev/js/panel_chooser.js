 // start of file

//-------------------
// Glyph Chooser
//-------------------
	function makePanel_GlyphChooser(fname){
		var onglyph = _UI.navhere === 'glyph edit';
		var onlig = _UI.navhere === 'ligatures';
		var oncom = _UI.navhere === 'components';

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';

		content += '<div class="panel_section">';
		content += makeGenericGlyphChooserContent(fname, onglyph, onlig, oncom);
		content += '</div>';

		if(onlig){
			content += '<div class="panel_section">';
			content += '<button onclick="showNewLigatureDialog();">add new ligature</button><br>';
			if(getLength(_GP.ligatures)) content += '<button onclick="deleteLigatureConfirm();">delete ligature</button><br>';
			else content += '<button onclick="addCommonLigatures();">add some common ligatures</button>';
			content += '</div>';
		} else if(oncom){
			content += '<div class="panel_section">';
			content += '<button onclick="addComponent();history_put(\'Create New Component\');navigate();">add new component</button><br>';
			if(getLength(_GP.components)) content += '<button onclick="deleteComponentConfirm();">delete component</button><br>';
			content += '</div>';
		}

		return content;
	}

	function makeGenericGlyphChooserContent(fname, showglyph, showlig, showcom) {
		// debug('\n makeGenericGlyphChooserContent - START');
		// debug('\t passed fname ' + fname);

		var ccon = '<div class="charchooserwrapper">';
		fname = fname? fname : 'selectGlyph';
		var cr = _GP.projectsettings.glyphrange;
		var showtitles = false;
		if(showglyph && showlig || showglyph && showcom){
			showtitles = true;
		} else if (showglyph){
			showtitles = (!cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);
		}

		if(showglyph){
			if(cr.basiclatin){
				var bl = _UI.basiclatinorder;
				if(showtitles) ccon += '<h3>basic latin</h3>';
				for(var i=0; i<bl.length; i++){ ccon += makeGlyphChooserButton(bl[i], fname); }
			}

			if(cr.latinsuppliment){
				if(showtitles) ccon += '<h3>latin suppliment</h3>';
				for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){ ccon += makeGlyphChooserButton(decToHex(s), fname); }
			}

			if(cr.latinextendeda){
				if(showtitles) ccon += '<h3>latin extended-a</h3>';
				for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){ ccon += makeGlyphChooserButton(decToHex(a), fname); }
			}

			if(cr.latinextendedb){
				if(showtitles) ccon += '<h3>latin extended-b</h3>';
				for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){ ccon += makeGlyphChooserButton(decToHex(b), fname); }
			}

			var cn;
			if(cr.custom.length){
				// debug('\t custom ranges: ' + cr.custom.length);
				for(var c=0; c<cr.custom.length; c++){
					ccon += '<h3>custom range ' + (c+1) + '</h3>';
					for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
						cn = decToHex(range);
						if(_GP.projectsettings.glyphrange.filternoncharpoints){
							if(getUnicodeName(cn) !== '[name not found]') ccon += makeGlyphChooserButton(cn, fname);
						} else {
							ccon += makeGlyphChooserButton(cn, fname);
						}
					}
				}
			}
		}

		if(showlig && getFirstID(_GP.ligatures)){
			if(showtitles) ccon += '<h3>ligatures</h3>';
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				ccon += makeGlyphChooserButton(l, fname);
			}}
		}

		if(showcom && getFirstID(_GP.components)){
			if(showtitles) ccon += '<h3>components</h3>';
			var com = _GP.components;
			for(var d in com){ if(com.hasOwnProperty(d)){
				ccon += makeGlyphChooserButton(d, fname);
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
		var issel = (index === _UI.selectedglyph);
		issel = (issel && (_UI.navhere !== 'components'));
		var chtml = hexToHTML(index);
		if(index === '0x0020') chtml = 'space';

		if((_GP.glyphs[index] && _GP.glyphs[index].shapes[0]) ||
			(_GP.ligatures[index] && _GP.ligatures[index].shapes[0])) {
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

	function addCommonLigatures() {
		var ff = parseUnicodeInput('ff').join('');
		var fi = parseUnicodeInput('fi').join('');
		var fl = parseUnicodeInput('fl').join('');
		var ffi = parseUnicodeInput('ffi').join('');
		var ffl = parseUnicodeInput('ffl').join('');

		if(!_GP.ligatures[ff]) _GP.ligatures[ff] = new Glyph({'glyphhex':ff});
		if(!_GP.ligatures[fi]) _GP.ligatures[fi] = new Glyph({'glyphhex':fi});
		if(!_GP.ligatures[fl]) _GP.ligatures[fl] = new Glyph({'glyphhex':fl});
		if(!_GP.ligatures[ffi]) _GP.ligatures[ffi] = new Glyph({'glyphhex':ffi});
		if(!_GP.ligatures[ffl]) _GP.ligatures[ffl] = new Glyph({'glyphhex':ffl});

		_UI.selectedglyph = getFirstID(_GP.ligatures);
		redraw();
	}

// end of file