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

		if(_UI.navhere === 'glyph edit' && pluralGlyphRange()){
			content += makeGlyphRangeChooser();
		}

		content += '<div class="panel_section" id="glyphchooserchoices">';

		if(_UI.navhere === 'glyph edit'){
			content += 'Loading...';
			setTimeout(function(){
				var choices = makeGenericGlyphChooserContent(fname, _UI.selectedglyphrange);
				if (choices !== '<div class="charchooserwrapper"></div>' &&
					choices !== '<div class="charchooserwrapper"><div class="glyphselectsectionbreak"></div></div>'){
						document.getElementById('glyphchooserchoices').innerHTML = choices;
				}
			}, 1);

		} else if(_UI.navhere === 'ligatures'){
			content += makeGenericGlyphChooserContent(fname, 'ligatures');
			var emptyligs = getLength(_GP.ligatures) === 0;
			content += '<div class="panel_section" ';
			content += emptyligs? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="showNewLigatureDialog();">create new ligature</button><br>';
			if(!emptyligs) content += '<button onclick="deleteLigatureConfirm();">delete selected ligature</button><br>';
			else content += '<button onclick="addCommonLigatures();">add some common ligatures</button>';
			content += '</div>';

		} else if(_UI.navhere === 'components'){
			content += makeGenericGlyphChooserContent(fname, 'components');
			var emptycoms = getLength(_GP.components) === 0;
			content += '<div class="panel_section" ';
			content += emptycoms? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="createNewComponent();history_put(\'Create New Component\');navigate(\'npAttributes\');">create new component</button><br>';
			if(!emptycoms) content += '<button onclick="deleteComponentConfirm();">delete selected component</button><br>';
			content += '</div>';
		}

		content += '</div>';

		return content;
	}

	function makeGlyphRangeChooser() {
		var content = '<div class="glyphrangedropdown" onclick="showGlyphRangeChooser();">';

		if(!isNaN(parseInt(_UI.selectedglyphrange))){
			content += 'Custom Range ' + (_UI.selectedglyphrange+1);
		} else {
			switch(_UI.selectedglyphrange){
				case 'basiclatin': content += 'Basic Latin'; break;
				case 'latinsuppliment': content += 'Latin Suppliment'; break;
				case 'latinextendeda': content += 'Latin Extended-A'; break;
				case 'latinextendedb': content += 'Latin Extended-B'; break;
			}
		}
		// content += '&emsp;&#x25BC;';
		content += '<span>&#x2572;&#x2571;</span>';
		content += '</div>';
	}

	function showGlyphRangeChooser(show) {
		var content = '';
		var gr = _GP.projectsettings.glyphrange;
		show = show || ['glyphs'];

		if(show.indexOf('glyphs') > -1){
			if(gr.basiclatin) content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'basiclatin\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Basic Latin</button>';
			if(gr.latinsuppliment) content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'latinsuppliment\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Latin Suppliment</button>';
			if(gr.latinextendeda) content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'latinextendeda\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Latin Extended-A</button>';
			if(gr.latinextendedb) content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'latinextendedb\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Latin Extended-B</button>';
		
			for(var c=0; c<gr.custom.length; c++){
				content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = '+c+'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Custom Range '+(c+1)+'</button>';
			}
		}

		if(show.indexOf('components') > -1 && getLength(_GP.components)){
			content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'components\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Components</button>';
		}

		if(show.indexOf('ligatures') > -1 && getLength(_GP.ligatures)){
			content += '<button class="navtargetbutton glyphrangechooserbutton" onclick="_UI.selectedglyphrange = \'ligatures\'; redraw({calledby:\'selectGlyphRange\', redrawcanvas:false});">Ligatures</button>';
		}

		document.getElementById('glyphchooserchoices').innerHTML = content;
	}

	function pluralGlyphRange() {
		var gr = _GP.projectsettings.glyphrange;
		var count = gr.custom.length;
		if(gr.basiclatin) count++;
		if(gr.latinextendeda) count++;
		if(gr.latinextendedb) count++;
		if(gr.latinsuppliment) count++;

		return count > 1;
	}

	function makeGenericGlyphChooserContent(fname, show) {
		// debug('\n makeGenericGlyphChooserContent - START');
		// debug('\t passed fname ' + fname);

		var selwi = getSelectedWorkItemID();
		var re = '';

		if(show === 'basiclatin'){
			var bl = _UI.basiclatinorder;
			for(var i=0; i<bl.length; i++){
				re += makeGlyphChooserButton(bl[i], fname, selwi);
			}
			return re;
		}

		if(show === 'latinsuppliment'){
			for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){
				re += makeGlyphChooserButton(decToHex(s), fname, selwi);
			}
			return re;
		}

		if(show === 'latinextendeda'){
			for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){
				re += makeGlyphChooserButton(decToHex(a), fname, selwi);
			}
			return re;

		}

		if(show === 'latinextendedb'){
			for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){
				re += makeGlyphChooserButton(decToHex(b), fname, selwi);
			}
			return re;
		}

		var cr = _GP.projectsettings.glyphrange;
		var c = parseInt(show);
		if(!isNaN(c)){
			for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
				cn = decToHex(range);
				if(_GP.projectsettings.glyphrange.filternoncharpoints){
					if(getUnicodeName(cn) !== '[name not found]') re += makeGlyphChooserButton(cn, fname, selwi);
				} else {
					re += makeGlyphChooserButton(cn, fname, selwi);
				}
			}
			return re;
		}

		if(show === 'ligatures' && getFirstID(_GP.ligatures)){
			sortLigatures();
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				re += makeGlyphChooserButton(l, fname, selwi) ;
			}}
			return re;
		}

		if(show === 'components' && getFirstID(_GP.components)){
			var com = _GP.components;
			for(var d in com){ if(com.hasOwnProperty(d)){
				recom += makeGlyphChooserButton(d, fname, selwi) ;
			}}
			return re;
		}

	}

	/*
		PERF NOTES
		table layout load times: 97 78 83 76 97 70 77 73 70 66
		div layout load times:   99 82 77 89 85 84 72 78 69 68

	*/

	function makeGlyphChooserButton(index, fname, selid){
		// debug('\n makeGlyphChooserButton - START ' + index);
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);

		var wi = getGlyph(index);
		// debug('\t getGlyph returned');
		// debug(wi);

		// var rv = '<table class="glyphselect" onclick="'+onc+'" title="'+wi.name+'&#13;'+index+'"><tr><td>';
		var rv = '<div class="glyphselect" onclick="'+onc+'" title="'+wi.name+'&#13;'+index+'">';

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
		rv += '</div>';
		// rv += '</td></tr></table>';

		// debug(' makeGlyphChooserButton - END\n');
		return rv;
	}

// end of file