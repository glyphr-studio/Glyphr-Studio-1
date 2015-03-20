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

	function makeGenericGlyphChooserContent(funname, showglyph, showlig, showcom) {
		// debug('\n makeGenericGlyphChooserContent - START');
		// debug('\t passed fname ' + fname);

		var selwi = getSelectedWorkItemID();
		var ccon = '<div class="charchooserwrapper">';
		var cr = _GP.projectsettings.glyphrange;
		var showtitles = false;
		var fname;
		if(showglyph && showlig || showglyph && showcom){
			showtitles = true;
		} else if (showglyph){
			showtitles = (!cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);
		}

		if(showglyph){
			fname = funname? funname : 'selectGlyph';
			if(cr.basiclatin){
				var bl = _UI.basiclatinorder;
				if(showtitles) ccon += '<h3>basic latin</h3>';
				for(var i=0; i<bl.length; i++){ ccon += makeGlyphChooserButton(bl[i], fname, selwi); }
			}

			if(cr.latinsuppliment){
				if(showtitles) ccon += '<h3>latin suppliment</h3>';
				for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){ ccon += makeGlyphChooserButton(decToHex(s), fname, selwi); }
			}

			if(cr.latinextendeda){
				if(showtitles) ccon += '<h3>latin extended-a</h3>';
				for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){ ccon += makeGlyphChooserButton(decToHex(a), fname, selwi); }
			}

			if(cr.latinextendedb){
				if(showtitles) ccon += '<h3>latin extended-b</h3>';
				for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){ ccon += makeGlyphChooserButton(decToHex(b), fname, selwi); }
			}

			var cn;
			if(cr.custom.length){
				// debug('\t custom ranges: ' + cr.custom.length);
				for(var c=0; c<cr.custom.length; c++){
					ccon += '<h3>custom range ' + (c+1) + '</h3>';
					for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
						cn = decToHex(range);
						if(_GP.projectsettings.glyphrange.filternoncharpoints){
							if(getUnicodeName(cn) !== '[name not found]') ccon += makeGlyphChooserButton(cn, fname, selwi);
						} else {
							ccon += makeGlyphChooserButton(cn, fname, selwi);
						}
					}
				}
			}
		}

		if(showlig && getFirstID(_GP.ligatures)){
			fname = funname? funname : 'selectLigature';
			if(showtitles) ccon += '<h3>ligatures</h3>';
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				ccon += makeGlyphChooserButton(l, fname, selwi) ;
			}}
		}

		if(showcom && getFirstID(_GP.components)){
			fname = funname? funname : 'selectComponent';
			if(showtitles) ccon += '<h3>components</h3>';
			var com = _GP.components;
			for(var d in com){ if(com.hasOwnProperty(d)){
				ccon += makeGlyphChooserButton(d, fname, selwi) ;
			}}
		}

		ccon += '</div>';
		// debug('makeGenericGlyphChooserContent - END\n');
		return ccon;
	}

	function makeGlyphChooserButton(index, fname, selid){
		// debug('\n makeGlyphChooserButton - START');
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);
		
		var rv = '<table class="glyphselecttable" onclick="'+onc+'" title="'+getGlyphName(index)+'"><tr><td>';
		
		var wi = getGlyph(index);
		// debug('\t getGlyph returned');
		// debug(wi);

		var issel = (index === selid);
		
		var gname = hexToHTML(index);
		if(index === '0x0020') gname = 'space';
		else if (!gname) gname = wi.glyphname;

		if(wi && getSelectedWorkItemShapes().length) {
			var extra = '';
			if(issel) {extra = ' glyphselectthumbsel';}
			rv += '<div class="glyphselectthumb'+extra+'">'+wi.makeSVG()+'</div>';
		} else {
			if(issel) {rv += '<div class="glyphselectbuttonsel"';}
			else {rv += '<div class="glyphselectbutton"';}

			if(index === '0x0020'){
				rv += ' style="font-size:13px; line-height:3.8em;"';	// SPACE needs to be smaller font size
			}

			rv += ('>'+gname+'</div>');
		}

		rv += '<div class="glyphselectname">'+gname+'</div>';
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