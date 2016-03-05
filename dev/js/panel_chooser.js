 // start of file
/**
	Panel > Chooser
	Shows a list of all the Glyphs to choose from
	for whatever the current page is.  Also has
	the logic for creating Glyph chooser dialogs.
**/


	function makePanel_GlyphChooser(){
		// debug('\n makePanel_GlyphChooser - START');

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">chooser</h1>';
		content += '</div>';
		content += '<div class="panel_section" id="glyphchooser">';

		var gcp = _UI.glyphchooser.panel;
		// _UI.glyphchooser.cache = false;

		if(_UI.current_page === 'glyph edit'){
			asyncLoadChooserPanel();
			// _UI.glyphchooser.cache = make_GlyphChooser(_UI.glyphchooser.panel);

		} else if(_UI.current_page === 'import svg'){
			asyncLoadChooserPanel();
			// _UI.glyphchooser.cache = make_GlyphChooser(_UI.glyphchooser.panel);

 		} else if(_UI.current_page === 'ligatures'){
			var emptyligs = getLength(_GP.ligatures) === 0;
			if(!emptyligs) {
				content += make_GlyphChooser(gcp);
			}
			content += '<div class="panel_section" ';
			content += emptyligs? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="showNewLigatureDialog();">create new ligature</button><br>';
			if(!emptyligs) content += '<button onclick="deleteLigatureConfirm();">delete selected ligature</button><br>';
			else content += '<button onclick="addCommonLigatures();">add some common ligatures</button>';
			content += '</div>';

		} else if(_UI.current_page === 'components'){
			var emptycoms = getLength(_GP.components) === 0;
			if(!emptycoms) {
				content += make_GlyphChooser(gcp);
			}
			content += '<div class="panel_section" ';
			content += emptycoms? 'style="padding-top:-10px;">' : '>';
			content += '<button onclick="createNewComponent();history_put(\'Create New Component\');navigate({panel:\'npAttributes\'});">create new component</button><br>';
			if(!emptycoms) content += '<button onclick="deleteComponentConfirm();">delete selected component</button><br>';
			content += '</div>';
		}

		content += '</div>';

		// debug(' makePanel_GlyphChooser - END\n');
		return content;
	}

	function asyncLoadChooserPanel() {
		// debug(' asyncLoadChooserPanel - START');

		function tryLoadChooserPanel(){
			var np = _UI.popout? document.getElementById('popout_glyphchooser') : document.getElementById('navarea_panel');
			var gc = document.getElementById('glyphchooser');

			if(_UI.glyphchooser.cache && np && gc && gc.innerHTML === '') {
				gc.innerHTML = _UI.glyphchooser.cache;
				// debug(' tryLoadChooserPanel - SUCCESS\n');
			} else {
				// debug(' tryLoadChooserPanel - TRYING AGAIN\n');
				setTimeout(tryLoadChooserPanel, 10);
			}
		}

		tryLoadChooserPanel();
		_UI.glyphchooser.cache = make_GlyphChooser(_UI.glyphchooser.panel);

	}

	function make_GlyphChooser(gcdata) {
		var con = '';

		if( (_UI.current_page === 'glyph edit' && pluralGlyphRange()) ||
			(_UI.current_page === 'import svg' && (pluralGlyphRange() || getLength(_GP.components) || getLength(_GP.ligatures))) ) {
				con += make_GlyphChooser_Header(gcdata.selected);
		} 

		if(_UI.glyphchooser.dropdown) con += make_GlyphChooser_DropDown(gcdata.choices);
		else con += make_GlyphChooser_Content(gcdata);

		return con;
	}

	function toggle_GlyphChooser() {
		_UI.glyphchooser.dropdown = !_UI.glyphchooser.dropdown;

		if(isBigDialogOpen()){
			document.getElementById('bigDialogScrollContent').innerHTML = make_GlyphChooser(_UI.glyphchooser.dialog);
		} else {
			redraw({calledby:'toggle_GlyphChooser', redrawcanvas:false});
		}
	}

	function update_GlyphChooser(selrange) {
		// debug('\n update_GlyphChooser - START');
		// debug('\t passed ' + selrange);

		if(isBigDialogOpen()){

			_UI.glyphchooser.dialog.selected = selrange;
			toggle_GlyphChooser();

		} else {

			_UI.glyphchooser.panel.selected = selrange;

			if(selrange === 'glyphs') selrange = 'basiclatin';

			if(!isNaN(parseInt(selrange))){
				selectGlyph(_GP.projectsettings.glyphrange.custom[selrange].begin, true);
			} else {
				switch(selrange){
					case 'basiclatin': selectGlyph('0x0041', true); break;
					case 'latinsuppliment': selectGlyph('0x0080', true); break;
					case 'latinextendeda': selectGlyph('0x0100', true); break;
					case 'latinextendedb': selectGlyph('0x0180', true); break;
					case 'components': selectGlyph(getFirstID(_GP.components), true); break;
					case 'ligatures': selectGlyph(getFirstID(_GP.ligatures), true); break;
				}
			}
			_UI.glyphchooser.dropdown = !_UI.glyphchooser.dropdown;

			redraw({calledby:'update_GlyphChooser'});
		}

		// debug(' update_GlyphChooser - END\n');
	}

	function make_GlyphChooser_Header(selrange) {
		// debug('\n make_GlyphChooser_Header - START');
		// debug('\t passed selrange ' + selrange);

		var content = '<div class="glyphchooser-header" onclick="toggle_GlyphChooser();">';

		if(_UI.glyphchooser.dropdown){
			content += 'choose a glyph range';
			content += '<span>&#x2571;&#x2572;</span>';
			content += '</div>';
			return content;
		}


		if(selrange === 'glyphs') selrange = 'basiclatin';

		if(!isNaN(parseInt(selrange))){
			content += 'Custom Range ' + (selrange+1);
		} else if(selrange){
			switch(selrange){
				case 'basiclatin': content += 'Basic Latin'; break;
				case 'latinsuppliment': content += 'Latin Suppliment'; break;
				case 'latinextendeda': content += 'Latin Extended-A'; break;
				case 'latinextendedb': content += 'Latin Extended-B'; break;
				case 'components': content += 'Components'; break;
				case 'ligatures': content += 'Ligatures'; break;
			}
		} else {
			content += selrange;
		}
		// content += '&emsp;&#x25BC;';
		content += '<span>&#x2572;&#x2571;</span>';
		content += '</div>';

		return content;
	}

	function make_GlyphChooser_DropDown(ch) {
		var content = '<div class="glyphchooser-dropdown">';
		var gr = _GP.projectsettings.glyphrange;

		if(ch === 'glyphs' || ch === 'all'){
			if(gr.basiclatin) content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'basiclatin\');">Basic Latin</button>';
			if(gr.latinsuppliment) content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'latinsuppliment\');">Latin Suppliment</button>';
			if(gr.latinextendeda) content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'latinextendeda\');">Latin Extended-A</button>';
			if(gr.latinextendedb) content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'latinextendedb\');">Latin Extended-B</button>';

			if(gr.custom.length) content += '<div style="height:12px;"></div>';
			for(var c=0; c<gr.custom.length; c++){
				content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser('+c+');">';
				content += 'Custom Range '+(c+1) + '&emsp;';
				content += '<span class="units">' + gr.custom[c].begin + ' to ' + gr.custom[c].end + '</span>';
				content += '</button>';
			}
		}

		if(ch === 'components' || ch === 'all'){
			if(getLength(_GP.components)){
				content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'components\');">';
				content += 'Components&emsp;';
				content += '<span class="units">(' + getLength(_GP.components) + ')</span>';
				content += '</button>';
			}
		}

		if(ch === 'ligatures' || ch === 'all'){
			if(getLength(_GP.ligatures)){
				content += '<button class="navtargetbutton glyphchooser-dropdownbutton" onclick="update_GlyphChooser(\'ligatures\');">';
				content += 'Ligatures&emsp;';
				content += '<span class="units">(' + getLength(_GP.ligatures) + ')</span>';
				content += '</button>';
			}
		}

		return content + '</div>';
	}

	function pluralGlyphRange() {
		// debug('\n pluralGlyphRange - START');
		var gr = _GP.projectsettings.glyphrange;
		var count = gr.custom.length;

		if(gr.basiclatin) { count++; /*debug('\t triggered basiclatin');*/ }
		if(gr.latinextendeda) { count++; /*debug('\t triggered latinextendeda');*/ }
		if(gr.latinextendedb) { count++; /*debug('\t triggered latinextendedb');*/ }
		if(gr.latinsuppliment) { count++; /*debug('\t triggered latinsuppliment');*/ }

		// debug(' pluralGlyphRange - END - returning ' + count + '\n');
		return count > 1;
	}

	function make_GlyphChooser_Content(gcdata) {
		// debug('\n make_GlyphChooser_Content - START');
		// debug('\t gcdata ' + json(gcdata));

		var fname = gcdata.fname || 'selectGlyph';
		var sel = isval(gcdata.selected)? gcdata.selected : 'glyphs';
		var selwi = getSelectedWorkItemID();
		var re = '<div class="glyphchooser-content">';

		if(sel === 'basiclatin' || sel === 'glyphs'){
			// debug('\t triggered glyphs');
			var bl = _UI.basiclatinorder;
			for(var i=0; i<bl.length; i++){
				re += make_GlyphChooser_Button(bl[i], fname, selwi);
			}
			return re + '</div>';
		}

		if(sel === 'latinsuppliment'){
			// debug('\t triggered latinsuppliment');
			for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){
				re += make_GlyphChooser_Button(decToHex(s), fname, selwi);
			}
			return re + '</div>';
		}

		if(sel === 'latinextendeda'){
			// debug('\t triggered latinextendeda');
			for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){
				re += make_GlyphChooser_Button(decToHex(a), fname, selwi);
			}
			return re + '</div>';

		}

		if(sel === 'latinextendedb'){
			// debug('\t triggered latinextendedb');
			for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){
				re += make_GlyphChooser_Button(decToHex(b), fname, selwi);
			}
			return re + '</div>';
		}

		var cr = _GP.projectsettings.glyphrange;
		var c = parseInt(sel);
		if(!isNaN(c)){
			// debug('\t triggered custom range');
			for(var range=cr.custom[c].begin; range<=cr.custom[c].end; range++){
				cn = decToHex(range);
				if(_GP.projectsettings.glyphrange.filternoncharpoints){
					if(getUnicodeName(cn) !== '[name not found]') re += make_GlyphChooser_Button(cn, fname, selwi);
				} else {
					re += make_GlyphChooser_Button(cn, fname, selwi);
				}
			}
			return re + '</div>';
		}

		if(sel === 'ligatures' && getFirstID(_GP.ligatures)){
			sortLigatures();
			var lig = _GP.ligatures;
			for(var l in lig){ if(lig.hasOwnProperty(l)){
				re += make_GlyphChooser_Button(l, fname, selwi) ;
			}}
			return re + '</div>';
		}

		if(sel === 'components' && getFirstID(_GP.components)){
			var com = _GP.components;
			for(var d in com){ if(com.hasOwnProperty(d)){
				re += make_GlyphChooser_Button(d, fname, selwi) ;
			}}
			return re + '</div>';
		}

		// debug(' make_GlyphChooser_HeaderContent - END ERROR\n');
		return '[error: make_GlyphChooser_HeaderContent]';

	}

	function make_GlyphChooser_Button(index, fname, selid){
		// debug('\n make_GlyphChooser_Button - START ' + index);
		var onc = (fname + '(\'' + index + '\');');
		// debug('\t constructed function: ' + onc);

		var wi = getGlyph(index);
		// debug('\t getGlyph returned');
		// debug(wi);

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

		// debug(' make_GlyphChooser_Button - END\n');
		return rv;
	}

// end of file