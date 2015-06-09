 // start of file
/**
	Panel > Chooser
	Shows a list of all the Glyphs to choose from 
	for whatever the current page is.  Also has 
	the logic for creating Glyph chooser dialogs.
**/


	function makePanel_GlyphChooser(fname){
		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';

		var choices = makeGenericGlyphChooserContent(fname, [_UI.navhere.replace('glyph edit', 'glyphs').replace('import svg', 'glyphs')]);
		if(choices !== '<div class="charchooserwrapper"></div>' &&
			choices !== '<div class="charchooserwrapper"><div class="glyphselectsectionbreak"></div></div>'){
			content += '<div class="panel_section">';
			content += choices;
			content += '</div>';
		}
		
		if(_UI.navhere === 'ligatures'){
			var emptyligs = getLength(_GP.ligatures) === 0;
			content += '<div class="panel_section" ';
			content += emptyligs? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="showNewLigatureDialog();">create new ligature</button><br>';
			if(!emptyligs) content += '<button onclick="deleteLigatureConfirm();">delete selected ligature</button><br>';
			else content += '<button onclick="addCommonLigatures();">add some common ligatures</button>';
			content += '</div>';
		} else if(_UI.navhere === 'components'){
			var emptycoms = getLength(_GP.components) === 0;
			content += '<div class="panel_section" ';
			content += emptycoms? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="createNewComponent();history_put(\'Create New Component\');navigate(\'npAttributes\');">create new component</button><br>';
			if(!emptycoms) content += '<button onclick="deleteComponentConfirm();">delete selected component</button><br>';
			content += '</div>';
		}

		return content;
	}

	function makeGenericGlyphChooserContent(funname, showarr) {
		// debug('\n makeGenericGlyphChooserContent - START');
		// debug('\t passed fname ' + fname);

		var selwi = getSelectedWorkItemID();
		var re = '<div class="charchooserwrapper">';
		var cr = _GP.projectsettings.glyphrange;
		var showtitles = false;
		var fname;
		var showglyph = showarr.indexOf('glyphs') > -1;
		var showcom = showarr.indexOf('components') > -1;
		var showlig = showarr.indexOf('ligatures') > -1;
		var reglyph = '';
		var relig = '';
		var recom = '';

		if(showglyph && showlig || showglyph && showcom){
			showtitles = true;
		} else if (showglyph){
			showtitles = (!cr.basiclatin || cr.latinsuppliment || cr.latinextendeda || cr.latinextendedb || cr.custom.length);
		}

		if(showglyph){
			fname = funname? funname : 'selectGlyph';
			if(cr.basiclatin){
				var bl = _UI.basiclatinorder;
				if(showtitles) reglyph += '<h3>basic latin</h3>';
				for(var i=0; i<bl.length; i++){ reglyph += makeGlyphChooserButton(bl[i], fname, selwi); }
			}

			if(cr.latinsuppliment){
				if(showtitles) reglyph += '<h3>latin suppliment</h3>';
				for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){ reglyph += makeGlyphChooserButton(decToHex(s), fname, selwi); }
			}

			if(cr.latinextendeda){
				if(showtitles) reglyph += '<h3>latin extended-a</h3>';
				for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){ reglyph += makeGlyphChooserButton(decToHex(a), fname, selwi); }
			}

			if(cr.latinextendedb){
				if(showtitles) reglyph += '<h3>latin extended-b</h3>';
				for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){ reglyph += makeGlyphChooserButton(decToHex(b), fname, selwi); }
			}

			var cn;
			if(cr.custom.length){
				// debug('\t custom ranges: ' + cr.custom.length);
				for(var c=0; c<cr.custom.length; c++){
					reglyph += '<h3>custom range ' + (c+1) + '</h3>';
					for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
						cn = decToHex(range);
						if(_GP.projectsettings.glyphrange.filternoncharpoints){
							if(getUnicodeName(cn) !== '[name not found]') reglyph += makeGlyphChooserButton(cn, fname, selwi);
						} else {
							reglyph += makeGlyphChooserButton(cn, fname, selwi);
						}
					}
				}
			}
		}

		if(showlig && getFirstID(_GP.ligatures)){
			fname = funname? funname : 'selectLigature';
			if(showtitles) relig += '<h3>ligatures</h3>';
			sortLigatures();
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				relig += makeGlyphChooserButton(l, fname, selwi) ;
			}}
		}

		if(showcom && getFirstID(_GP.components)){
			fname = funname? funname : 'selectComponent';
			if(showtitles) recom += '<h3>components</h3>';
			var com = _GP.components;
			for(var d in com){ if(com.hasOwnProperty(d)){
				recom += makeGlyphChooserButton(d, fname, selwi) ;
			}}
		}

		for(var j=0; j<showarr.length; j++){
			switch(showarr[j]){
				case 'glyphs':
					re += reglyph;
					re += '<div class="glyphselectsectionbreak"></div>';
					break;
				case 'ligatures':
					re += relig;
					re += '<div class="glyphselectsectionbreak"></div>';
					break;
				case 'components':
					re += recom;
					re += '<div class="glyphselectsectionbreak"></div>';
					break;
			}
		}

		re += '</div>';
		// debug('makeGenericGlyphChooserContent - END\n');

		return re;
	}

	function makeGlyphChooserButton(index, fname, selid){
		// debug('\n makeGlyphChooserButton - START ' + index);
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);
		
		var wi = getGlyph(index);
		// debug('\t getGlyph returned');
		// debug(wi);
		
		var rv = '<table class="glyphselecttable" onclick="'+onc+'" title="'+wi.name+'"><tr><td>';

		var issel = (index === selid);

		if(wi && wi.hasShapes()) {
			var extra = '';
			if(issel) {extra = ' glyphselectthumbsel';}
			rv += '<div class="glyphselectthumb'+extra+'">'+wi.makeSVG()+'</div>';
		} else {
			if(issel) {rv += '<div class="glyphselectbuttonsel"';}
			else {rv += '<div class="glyphselectbutton"';}

			if(index === '0x0020'){
				rv += ' style="font-size:13px; line-height:3.8em;">space';	// SPACE needs to be smaller font size
			} else if (index.indexOf('0x') === -1){
				rv += ' style="font-size:8px;"><div style="height:10px;"></div>';	// Component names needs to be smaller font size
				rv += wi.name;
			} else {
				rv += '>';
				rv += (wi.glyphhtml || hexToHTML(index) || wi.name);
			}

			rv += '</div>';
		}

		rv += '<div class="glyphselectname">'+ (hexToHTML(index) || wi.name || '[no name])') +'</div>';
		rv += '</td></tr></table>';

		// debug(' makeGlyphChooserButton - END\n');
		return rv;
	}

// end of file