 // start of file
/**
	IO > Import > SVG Font
	Reading XML Text and parsing it into Glyphr 
	Studio Objects.  Relies heavily on 
	IO > Import > SVG Outline
**/


	function ioSVG_importSVGfont(filter) {
		// debug('\n ioSVG_importSVGfont - Start');

		// Spinner Animation
		document.getElementById('openprojecttableright').innerHTML = make_LoadingAnimation(false);
		var fis = document.getElementById('fontimportstatus');
		var sweep = document.getElementById('sweep');
		var degrees = 0;

		function importStatus(msg){
		degrees = ((degrees + 2) % 360);
sweep.style.transform = ('rotate('+degrees+'deg)');
fis.innerHTML = msg;
		}


		// Font Stuff
		var font, chars, kerns;

		setTimeout(setupFontImport, 10);

		function setupFontImport(){
			// debug('\n setupFontImport - START');
			importStatus('Reading font data...');
			_GP = new GlyphrProject();

			try {
				// Get Font
				var svgdata = _UI.droppedFileContent;
				// Convert unicode glyphs to decimal values
				// DOM Parser does not return unicode values as text strings
				// Kern groups containing '&#x' will get fuck'd
				svgdata = svgdata.replace(/&#x/g, '0x');
				var jsondata = convertXMLtoJSON(svgdata);
				font = ioSVG_getFirstTagInstance(jsondata, 'font');
			
			} catch (e){
				loadPage_openproject();
				openproject_changeTab('load');
				showErrorMessageBox('There was a problem reading the SVG file:<br>' + e.message);
				return;
			}

			// Check to see if it's actually a SVG Font
			if(!font){
				loadPage_openproject();
				openproject_changeTab('load');
				showErrorMessageBox('The SVG file you tried to load was not a SVG Font file. See Glyphr Studio help for more information.');
				return;
			}

			// Get Kerns
			kerns = ioSVG_getTags(font, 'hkern');

			// Get Glyphs
			chars = ioSVG_getTags(font, 'glyph');

			// test for range
			if(chars.length < _UI.overflowcount || filter){
				setTimeout(startFontImport, 1);
				// Dump JSON
				// saveFile('Parsed JSON', json(jsondata));
			} else {
				document.getElementById('openprojecttableright').innerHTML = make_ImportFilter(chars.length, kerns.length, 'ioSVG_importSVGfont');
			}
			
			// debug(' setupFontImport - END\n');
		}

		function startFontImport() {
			// debug('\n startFontImport - START');
			importStatus('Importing Glyph 1 of ' + chars.length);
			setTimeout(importOneGlyph, 4);
			// debug(' startFontImport - END\n');
		}


		/*
		*
		*	GLYPH IMPORT
		*
		*/
		var tca, data, uni, np, cname, chtml, adv, isautowide;
		var maxglyph = 0;
		var minchar = 0xffff;
		var additionalGlyphs = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};
		var fl = {};

		var c=0;
		function importOneGlyph(){
			importStatus('Importing Glyph ' + c + ' of ' + chars.length);

			if(c >= chars.length) {
				setTimeout(importOneKern, 1);
				return;
			}

			// One Glyph or Ligature in the font
			tca = chars[c].attributes;

			// Get the appropriate unicode decimal for this char
			// debug('\n importOneGlyph - START');
			// debug('\t starting  unicode \t' + tca.unicode + ' \t ' + tca['glyph-name']);

			uni = parseUnicodeInput(tca.unicode);

			if(tca.unicode === ' ') uni = ['0x0020'];

			if(uni === false){
				// Check for .notdef
				// debug('\t !!! Skipping '+tca['glyph-name']+' NO UNICODE !!!');
				chars.splice(c, 1);

			} else if (filter && isOutOfBounds(uni)){
				// debug('\t !!! Skipping '+tca['glyph-name']+' OUT OF BOUNDS !!!');
				chars.splice(c, 1);

			} else {

				// debug('\t GLYPH ' + c + '/'+chars.length+'\t unicode: ' + json(uni) + '\t attributes: ' + json(tca));
				/*
				*
				*	GLYPH OR LIGATURE IMPORT
				*
				*/
				newshapes = [];
				shapecounter = 0;

				// Import Path Data
				data = tca.d;
				// debug('\t Glyph has path data ' + data);
				if(data && data !== 'z'){
					data = cleanAndFormatPathPointData(data);

					// debug('\t split z, data into ' + data.length + ' Glyphr Studio shapes.');
					// debug(data);
					
					for(var d=0; d<data.length; d++){
						if(data[d].length){
							// debug('\t starting convertPathTag');
							np = ioSVG_convertPathTag(data[d]);
							// debug('\t created shape from PathTag');
							// debug(np);
							if(np.pathpoints.length){
								shapecounter++;
								newshapes.push(new Shape({'path':np, 'name':('Shape ' + shapecounter)}));
							} else {
								// debug('\t !!!!!!!!!!!!!!!!!!\n\t data resulted in no path points: ' + data[d]);
							}
						}
					}
				}

				// Get Advance Width
				isautowide = true;
				adv = parseInt(tca['horiz-adv-x']);
				if(adv){
					if(!isNaN(adv) && adv > 0){
						isautowide = false;
					}
				} else adv = false;


				if(uni.length === 1){
					// It's a GLYPH
					// Get some range data
					uni = uni[0];
					minchar = Math.min(minchar, uni);
					maxglyph = Math.max(maxglyph, uni);
					if(1*uni > _UI.glyphrange.latinextendedb.end) additionalGlyphs.push(uni);

					fc[uni] = new Glyph({'shapes':newshapes, 'glyphhex':uni, 'glyphwidth':adv, 'isautowide':isautowide});
					if(getUnicodeName(uni) === '[name not found]') _GP.projectsettings.glyphrange.filternoncharpoints = false;

				} else {
					// It's a LIGATURE
					uni = uni.join('');
					fl[uni] = new Glyph({'shapes':newshapes, 'glyphhex':uni, 'glyphwidth':adv, 'isautowide':isautowide});
				}

				// Successfull loop, advance c
				c++;
			}

			// finish loop
			setTimeout(importOneGlyph, 1);

			// debug(' importOneGlyph - END\n');
		}

		/*
		*
		*	KERN IMPORT
		*
		*/
		var tk, tempgroup, reg, leftgroup, rightgroup, newid;
		var fk = {};

		var k = 0;
		function importOneKern(){

			if(k >= kerns.length) {
				importStatus('Finalizing the imported font...');
				setTimeout(startFinalizeFontImport, 1);
				return;
			}

			importStatus('Importing Kern Pair ' + k + ' of ' + kerns.length);

			// debug('\n Kern Import - START ' + k + '/' + kerns.length);
			leftgroup = [];
			rightgroup = [];
			tk = kerns[k];
			// debug('\t Kern Attributes: ' + json(tk.attributes, true));

			// Get members by name
			leftgroup = getKernMembersByName(tk.attributes.g1, chars, leftgroup, _UI.glyphrange.latinextendedb.end);
			rightgroup = getKernMembersByName(tk.attributes.g2, chars, rightgroup, _UI.glyphrange.latinextendedb.end);

			// debug('\t kern groups by name ' + json(leftgroup, true) + ' ' + json(rightgroup, true));

			// Get members by Unicode
			leftgroup = getKernMembersByUnicodeID(tk.attributes.u1, chars, leftgroup, _UI.glyphrange.latinextendedb.end);
			rightgroup = getKernMembersByUnicodeID(tk.attributes.u2, chars, rightgroup, _UI.glyphrange.latinextendedb.end);

			// debug('\t kern groups parsed as ' + json(leftgroup, true) + ' ' + json(rightgroup, true));

			if(leftgroup.length && rightgroup.length){
				newid = generateNewID(fk, 'kern');
				kernval = tk.attributes.k || 0;
				// debug('\t Making a kern pair with k = ' + kernval);
				fk[newid] = new HKern({'leftgroup':leftgroup, 'rightgroup':rightgroup, 'value':kernval});
				// debug('\t Made the new kern successfully.');
				k++;
			} else {
				kerns.splice(k, 1);
				// debug('\t Kern ' + json(tk.attributes, true) + ' returned an empty group.');
			}

			// debug(' Kern Import - END\n');
			setTimeout(importOneKern, 1);
		}


		/*
		*
		*	FINALIZE
		*
		*/
		function startFinalizeFontImport() {
			importStatus('Finalizing the imported font...');
			setTimeout(finalizeFontImport, 4);
		}

		function finalizeFontImport(){
			_GP.glyphs = fc;
			_GP.ligatures = fl;
			_GP.kerning = fk;

			// Import Font Settings
			// Check to make sure certain stuff is there
			// space has horiz-adv-x

			// Font Settings
detectAndActivateGlyphRanges(additionalGlyphs);
			var fatt = ioSVG_getFirstTagInstance(font, 'font-face').attributes;
			var ps = _GP.projectsettings;
			var md = _GP.metadata;
			var fname = fatt['font-family'] || 'My Font';

			ps.upm = 1*fatt['units-per-em'] || 1000;
			ps.name = fname;
			ps.ascent = 1*fatt.ascent || 700;
			ps.capheight = 1*fatt['cap-height'] || 675;
			ps.xheight = 1*fatt['x-height'] || 400;
			ps.overshoot = round(ps.upm / 100);
			md.font_family = fname;
			md.panose_1 = fatt['panose-1'] || '0 0 0 0 0 0 0 0 0 0';
			md.font_weight = 1*fatt['font-weight'] || 400;
			md.font_stretch = fatt['font-stretch'] || 'normal';
			md.underline_position = 1*fatt['underline-position'] || -50;
			md.underline_thickness = 1*fatt['underline-thickness'] || 10;
			md.strikethrough_position = 1*fatt['strikethrough-position'] || 300;
			md.strikethrough_thickness = 1*fatt['strikethrough-thickness'] || 10;
			md.overline_position = 1*fatt['overline-position'] || 750;
			md.overline_thickness = 1*fatt['overline-thickness'] || 10;

			// Finish Up
			finalizeGlyphrProject();
			closeDialog();

			// debug(' ioSVG_importSVGfont - END\n');
			navigate();
		}
		// debug(' ioSVG_importSVGfont - END\n');
	}

	function isOutOfBounds(uni) {
		if(!uni.length) return true;

		for(var u=0; u<uni.length; u++){
			if((parseInt(uni[u]) > _UI.importrange.end) || (parseInt(uni[u]) < _UI.importrange.begin)) return true;
		}

		return false;
	}

	function getKernMembersByName(names, chars, arr, limit) {
		limit = limit || 0xFFFF;
		var uni;
		if(names){
			names = names.split(',');

			// Check all the glyph names
			for(var n=0; n<names.length; n++){

				// Check all the chars
				for(var c=0; c<chars.length; c++){
					if(chars[c].attributes.unicode){

						// Push the match
						if(names[n] === chars[c].attributes['glyph-name']){
							uni = parseUnicodeInput(chars[c].attributes.unicode);
							if(1*uni < limit) arr = arr.concat(uni);
						}
					}
				}
			}
		}

		return arr;
	}

	function getKernMembersByUnicodeID(ids, chars, arr, limit) {
		limit = limit || 0xFFFF;
		var uni;
		if(ids){
			ids = ids.split(',');

			// Check all the IDs
			for(var i=0; i<ids.length; i++){

				// Check all the chars
				for(var c=0; c<chars.length; c++){
					if(chars[c].attributes.unicode){

						// Push the match
						if(ids[i] === chars[c].attributes.unicode){
							uni = parseUnicodeInput(chars[c].attributes.unicode);
							if(1*uni < limit) arr = arr.concat(uni);
						}
					}
				}
			}
		}

		return arr;
	}

// end of file