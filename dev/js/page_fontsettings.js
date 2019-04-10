// start of file
/**
	Page > Font Settings
	HTML and associated functions for this page.
**/


	function loadPage_fontsettings(){
		// debug('LOADING PAGE >> loadPage_fontsettings');
		// SETTINGS
		var ps = _GP.projectsettings;
		var meta = _GP.metadata;

		var content = '<h1 class="pagetitle">Font Settings</h1><div class="pagecontent textpage">';

		content += '<h1>Font Name</h1>';
		content += '<input type="text" maxlength=31 style="width:300px; padding:8px; font-size:1.2em;" value="'+meta.font_family+'" onchange="_GP.metadata.font_family = this.value.substr(0, 31);"/><span class="unit">(max 31 characters)</span>';

		content += '<h1>Glyph Proportions</h1>';

		content += '<h3>Key Metrics</h3>'+
					'<table class="settingstable">'+
					'<tr><td>Ascent height: </td><td><input type="number" value="'+ps.ascent+'" onchange="_GP.projectsettings.ascent = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>Cap height: </td><td><input type="number" value="'+ps.capheight+'" onchange="_GP.projectsettings.capheight = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>x Height: </td><td><input type="number" id="metric-xheight" value="'+ps.xheight+'" onchange="_GP.projectsettings.xheight = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>Descent height: </td><td><input type="number" id="metric-des" value="'+ps.descent+'" onchange="_GP.projectsettings.descent = Math.abs(parseInt(this.value))*-1;"/></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td><b>Total Units per Em: </b></td><td><input type="number" value="'+ps.upm+'" onchange="_GP.projectsettings.upm = Math.abs(parseInt(this.value));"/></td><td><span class="unit">(em units)</span></td></tr>' +
					'</table>';

		content += '<h3>Overshoot</h3>'+
					'Round letters usually extend a little above the x height line and below the baseline. ' +
					'A light guideline will show this overshoot distance.<br>' +
					'<table class="settingstable">'+
					'<tr><td>Overshoot:</td><td><input type="number" value="'+ps.overshoot+'" onchange="_GP.projectsettings.overshoot = this.value;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'</table>';

		content += '<h3>Default Side Bearings</h3>' +
					'Side Bearings are the amount of blank space that is added to the left or right of glyphs when they are displayed.  This metric can be set individually per glyph, but will default to this value if not set. '+
					'<table class="settingstable">'+
					'<tr><td>Left Side Bearing: </td><td><input type="number" value="'+ps.defaultlsb+'" onchange="_GP.projectsettings.defaultlsb = Math.abs(parseInt(this.value)) || 0;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'<tr><td>Right Side Bearing: </td><td><input type="number" value="'+ps.defaultrsb+'" onchange="_GP.projectsettings.defaultrsb = Math.abs(parseInt(this.value)) || 0;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'</table>';

		// GLYPHS
		content += '<h1>Glyph Ranges</h1>'+
                    'Glyph ranges are based on the <a href="http://en.wikipedia.org/wiki/Unicode" target="_blank">Unicode Standard</a>, '+
                    'which assigns a <a href="http://en.wikipedia.org/wiki/Hexadecimal" target="_blank">hexadecimal number</a> '+
                    'to all possible glyphs in a font. '+
                    '<a href="https://en.wikipedia.org/wiki/Unicode_block" target="_blank">Wikipedia"s Unicode Block page</a> ' +
                    'is a good place to get familiar with all the different glyphs it\'s possible to have in a font.'+
                    '<div class="effect">'+
                        '<b>Removing or un-checking a range</b> will not delete glyph data from your Glyphr Studio Project. '+
                        'Selected ranges only determine what is shown in the UI, and what is exported to fonts.'+
                    '</div>';

		content += '<h2>Standard Glyph Ranges</h2>'+
					'The most common glyph sets are built into Glyphr Studio, and can be toggled with the checkboxes below.';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.basiclatin', ps.glyphrange.basiclatin, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="basiclatin"><b>Basic Latin</b> - Unicode glyphs <pre>0x0020</pre> through <pre>0x007E</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">';
					var bl = _UI.basiclatinorder;
					for(var t=0; t<bl.length; t++){ content += makeRangePreviewGlyph(bl[t]*1); }
		content += '</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinsupplement', ps.glyphrange.latinsupplement, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinsupplement"><b>Latin Supplement</b> - Unicode glyphs <pre>0x00A0</pre> through <pre>0x00FF</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
                    makeRangePreview(_UI.glyphrange.latinsupplement) +
                    '</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinextendeda', ps.glyphrange.latinextendeda, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinextendeda"><b>Latin Extended-A</b> - Unicode glyphs <pre>0x0100</pre> through <pre>0x017F</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
                    makeRangePreview(_UI.glyphrange.latinextendeda) +
                    '</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinextendedb', ps.glyphrange.latinextendedb, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinextendedb"><b>Latin Extended-B</b> - Unicode glyphs <pre>0x0180</pre> through <pre>0x024F</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
                    makeRangePreview(_UI.glyphrange.latinextendedb) +
                    '</div></td></tr></table>';

		content += '<h2>Additional Glyph Ranges</h2>'+
                    'You can add and edit custom glyph ranges below, or you can '+
                    '<span class="textaction" onclick="showGlyphRangeChooser();">launch the Glyph Range Chooser</span> '+
                    'to browse all the ranges in Unicode.  '+
                    'Custom ranges are inclusive, and must be above <pre>0x0250</pre> and below <pre>0xFFFF</pre>.'+
                    '<h3>Add a custom range</h3>'+
                    '<table class="settingstable addcustomrange"><tr>'+
                        '<td>name:<br><input type="text" id="customrangename"></td>'+
                        '<td>begin:<br><input type="text" id="customrangebegin"></td>'+
                        '<td>end:<br><input type="text" id="customrangeend"></td>'+
                        '<td style="vertical-align:bottom;">'+
                        '<button onclick="addCustomGlyphRange();">Add Range</button>'+ helpUI(unicodeInputHelp()) + '</td>'+
                    '</tr></table>'+
                    '<h3>Glyph ranges</h3>'+
                    '<div id="customrangetable"></div>';
                    
		// METADATA
		content += '<h1>Font Metadata</h1>';

		content += '<table class="settingstable metadatatable">';
		for(var m in meta){ if(meta.hasOwnProperty(m) && m!== 'font_family'){
			if(meta[m] === '{{sectionbreak}}'){
				content += '<tr><td colspan="3"><p style="margin-bottom:10px;">';
				if(m === 'shared'){
					content += '<h2>Shared</h2>';
					content += 'These properties are shared between OTF and SVG font file formats.';
				} else if (m === 'otf'){
					content += '<h2>OTF</h2>';
					content += 'These properties will be saved with Open Type files when they are exported.';
				} else if (m === 'svg'){
					content += '<h2>SVG</h2>';
					content += 'These properties are based on the CSS @font-face standard.  More information can be found at the W3C\'s <a href=\'http://www.w3.org/TR/CSS2/fonts.html\' target=\'_blank\'>Fonts Page</a> and their <a href=\'http://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#select\' target=\'_blank\'>CSS @font-face Page</a>.';
				}
				content += '</p></td></tr>';
			} else {
				meta[m] = meta[m] || '""';
				content += '<tr>';
				content += '<td class="propname" style="padding-top:8px;">' + m.replace(/_/g, '-') + '</td>';
				content += '<td><input type="text" value="'+escapeHTMLValues(meta[m])+'" onchange="_GP.metadata.'+m+' = removeEmptyStringInputs(this.value);"/></td>';
				content += '<td class="prophelp" style="padding-top:8px;">'+_UI.metadatahelp[m]+'</td>';
				content += '</tr>';
			}
		}}
		content += '</table>';


		// Finish and show table
		content += '</div>';
		getEditDocument().getElementById('mainwrapper').innerHTML = content;
		updateCustomRangeTable();
	}
    

    // --------------------------------------------------------------
    // Editing custom ranges
    // --------------------------------------------------------------

    function addCustomGlyphRange(newrange){
        var ranges = _GP.projectsettings.glyphrange;

        if(!newrange) newrange = getCustomRange(true);
        
        if(newrange){
            // Check to see if it's already added
            for(var r=0; r<ranges.custom.length; r++){
                if(ranges.custom[r].begin === newrange.begin &&
                    ranges.custom[r].end === newrange.end){
                        showToast('Range has already been added:<br>'+newrange.name);
                        return;
                    }
            }

            // Add and sort
            ranges.custom.unshift(newrange);
            ranges.custom.sort(function(a, b) {
                return (parseInt(a.begin) > parseInt(b.begin));
            });

            if(!(ranges.basiclatin || ranges.latinextendeda || ranges.latinextendedb || ranges.latinsupplement)) activeRangesChanged();
                
            // Update UI
            showToast('Added range:<br>'+newrange.name);
            if(document.getElementById('customrangetable')) updateCustomRangeTable();
            if(document.getElementById('glyphchooser')) redraw({calledby:'addCustomGlyphRange', redrawcanvas:false});
            if(document.getElementById('unicoderangepreviewarea')) previewGlyphRange(newrange);
        }
    }

	function getCustomRange(filterbasicrange, dontclearinputs) {
        // debug(`\n getCustomRange - START`);        
		var newrange = {'begin':0, 'end':0, 'name':'Glyph Range'};
        
        if(document.getElementById('customrangename')) newrange.name = escapeHTMLValues(document.getElementById('customrangename').value);
		newrange.begin = parseUnicodeInput(document.getElementById('customrangebegin').value)[0];
        newrange.end = parseUnicodeInput(document.getElementById('customrangeend').value)[0];

        // debug(`\t newrange read from inputs: ${newrange.begin} - end: ${newrange.end}`);

        // Check input values
		if(isNaN(newrange.begin)){
            showToast('Invalid range input:<br>range begin');
            return false;
        }
        
        if(isNaN(newrange.end)){
            showToast('Invalid range input:<br>range end');
            return false;
        }

        if(filterbasicrange &&
            newrange.begin < _UI.glyphrange.latinextendedb.end &&
            newrange.end < _UI.glyphrange.latinextendedb.end) {
            showToast('Invalid range input:<br>range must be above 0x0250');
            return false;
        }

        // flip
        if(newrange.begin > newrange.end){
            var tempbegin = newrange.begin;
            newrange.begin = newrange.end;
            newrange.end = tempbegin;
        }
        
        // maxes
        if(filterbasicrange){
            newrange.begin = Math.max(newrange.begin, (_UI.glyphrange.latinextendedb.end+1));
            newrange.end = Math.max(newrange.end, (_UI.glyphrange.latinextendedb.end+2));
        }
        newrange.begin = Math.min(newrange.begin, 0xFFFE);
        newrange.end = Math.min(newrange.end, 0xFFFF);
        
        // format
        newrange.name = newrange.name || ('Glyph Range ' + (_GP.projectsettings.glyphrange.custom.length + 1));
        newrange.begin = decToHex(newrange.begin);
        newrange.end = decToHex(newrange.end);
            
        // Clear out inputs
        if(!dontclearinputs) {
            if(document.getElementById('customrangename')) document.getElementById('customrangename').value = '';
            document.getElementById('customrangebegin').value = '';
            document.getElementById('customrangeend').value = '';
        }
    
        // debug(` getCustomRange - END\n\n`);
        return newrange;

	}
    
	function updateCustomRangeTable(){
        var cr = _GP.projectsettings.glyphrange.custom;
        //debug('UPDATECUSTOMRANGETABLE - \n\t custom is ' + JSON.stringify(cr));
		var content = '';
        content += '<table class="customrangegrid">';
        content += '<tr>'+
                    '<td class="customrangegridheader">range name</td>'+
                    '<td class="customrangegridheader">begin</td>'+
                    '<td class="customrangegridheader">end</td>'+
                    '<td class="customrangegridheader">&nbsp;</td>'+
                    '</tr>';
		if(cr.length){
			for(var c=0; c<cr.length; c++){
                if(!cr[c].name) cr[c].name = ('Glyph Range ' + (c+1));
                content += '<tr><td>';
                content += cr[c].name;
				content += '</td><td>';
                content += cr[c].begin;
				content += '</td><td>';
                content += cr[c].end;
				content += '</td><td style="width: 100px; text-align: center;">';
                content += '<span class="textaction" onclick="removeCustomGlyphRange('+c+');">remove</span>';
                content += '&emsp;';
				content += '<span class="textaction" onclick="editCustomGlyphRange('+c+');">edit</span>';
				content += '</td></tr>';
			}
		} else {
            content += '<tr><td colspan="4"><i style="opacity: 0.5">No custom ranges have been added</i></td></tr>';
        }
        content += '</table><br>';
		document.getElementById('customrangetable').innerHTML = content;
	}

	function removeCustomGlyphRange(i) {
		var cr = _GP.projectsettings.glyphrange.custom;
		//debug('REMOVECUSTOMGLYPHRANGE - called on index ' + i + '\n\t custom is ' + JSON.stringify(cr));
		cr.splice(i,1);
		updateCustomRangeTable();
		//debug('REMOVECUSTOMGLYPHRANGE - \n\t custom is ' + JSON.stringify(cr));
	}
    
    function editCustomGlyphRange(i) {
        var cr = _GP.projectsettings.glyphrange.custom;
        document.getElementById('customrangename').value = cr[i].name;
		document.getElementById('customrangebegin').value = cr[i].begin;
        document.getElementById('customrangeend').value = cr[i].end;
        
        removeCustomGlyphRange(i);
    }
    
    function getFirstActiveRange() {
        if(_GP.projectsettings.glyphrange.basiclatin) return 'basiclatin';
        if(_GP.projectsettings.glyphrange.latinsupplement) return 'latinsupplement';
        if(_GP.projectsettings.glyphrange.latinextendeda) return 'latinextendeda';
        if(_GP.projectsettings.glyphrange.latinextendedb) return 'latinextendedb';
        // zero is the first custom range
        if(_GP.projectsettings.glyphrange.custom.length) return 0;
        
        return false;
    }

    function activeRangesChanged(){
        _UI.glyphchooser.panel.selected = getFirstActiveRange();
    }

    function showGlyphRangeChooser() {
        var content = '<h1>Add additional glyph ranges</h1>';
        content += '<div id="unicoderangepreviewarea"><h2>preview</h2><div class="glyphrangepreview">';
        content += 'Select glyph range from the right to preview it here.<br><br>';
        content += 'These are only advanced glyph ranges, standard Latin ranges can be added or removed from Font Settings.</div></div>';
        var chooserContent = '<table class="customrangegrid" style="width: 100%;">';
        chooserContent += '<tr>'+
        '<td class="customrangegridheader" style="width: 230px;">range name</td>'+
        '<td class="customrangegridheader">begin</td>'+
        '<td class="customrangegridheader">end</td>'+
        '<td class="customrangegridheader">&nbsp;</td>'+
        '</tr>';
        
        // blocks 0-3 are basic latin ranges enabled by checkboxes
        var block;
        for(var b=4; b<_UI.unicodeBlocks.length; b++) {
            block = _UI.unicodeBlocks[b];
            if(!block.name) block.name = ('Glyph Range ' + (b+1));
            chooserContent += '<tr><td>';
            chooserContent += block.name;
            chooserContent += '</td><td>';
            chooserContent += decToHex(block.begin);
            chooserContent += '</td><td>';
            chooserContent += decToHex(block.end);
            chooserContent += '</td><td style="width: 100px; text-align: center;">';
            chooserContent += '<span class="textaction" onclick="previewGlyphRange({begin:'+decToHex(block.begin)+', end:'+decToHex(block.end)+', name:\''+block.name+'\'});">preview</span>';
            chooserContent += '&emsp;';
            chooserContent += '<span class="textaction" onclick="addCustomGlyphRange({begin:\''+decToHex(block.begin)+'\', end:\''+decToHex(block.end)+'\', name:\''+block.name+'\'});">add</span>';
            chooserContent += '</td></tr>';
        }

        chooserContent += '</table>';
        openBigDialog(content, chooserContent);
    }
    
    function previewGlyphRange(range) {
        var content = '<h2>'+range.name+'</h2>';
        content += '<div class="glyphrangepreview">';
        content += makeRangePreview(range);
        content += '</div>';
        content += '<button class="buttonsel" onclick="addCustomGlyphRange({begin:\''+decToHex(range.begin)+'\', end:\''+decToHex(range.end)+'\', name:\''+range.name+'\'});">Add</button>';

        document.getElementById('unicoderangepreviewarea').innerHTML = content;
    }

    // --------------------------------------------------------------
    // Input handling
    // --------------------------------------------------------------
    
    
	function removeEmptyStringInputs(val) {
		if(val === '""' || val === "''") return '';
		else return trim(val);
	}

    function escapeHTMLValues(val){
		// debug('\n escapeHTMLValues - START');
		// debug('\t typeof val = ' + typeof val);
		// debug(val);

		if(typeof val === 'string'){
            if(val === '""' || val === "''") return '';
            
            if(val.indexOf('"') > -1) {
                // debug('\t replacing double quotes');
                val = val.replace(/"/g, '&quot;');
            }
            
			if(val.indexOf('<') > -1) {
				// debug('\t replacing less than');
				val = val.replace(/</g, '&lt;');
			}
            
			if(val.indexOf('>') > -1) {
				// debug('\t replacing greater than');
				val = val.replace(/>/g, '&gt;');
			}
		}

		// debug('\t returning ' + JSON.stringify(val));
		return val;
    }

    function makeRangePreview(range) {
        var content = '';
        
		for(var g = range.begin; g <= range.end; g++) {
            content += makeRangePreviewGlyph(g);
        }

        return content;
    }
    
    function makeRangePreviewGlyph(g) {
        var hexString = decToHex(g);
        var content = '<span class="glyphrangepreviewglyph" title="' + hexString;
        var name = getUnicodeName(hexString);
        if(name) content += '\n' + escapeHTMLValues(name);
        content += '">';
        content += hexToChars(g);
        content += '</span>';
        
        return content;
    }

// end of file