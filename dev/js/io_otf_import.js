 // start of file
/**
	IO > Import > OpenType
	Using OpenType.js to read in a font file
	and convert it to a Glyphr Studio Project.
**/

	function ioOTF_importOTFfont(filter, file) {
		debug('\n ioOTF_importOTFfont - START');

		document.getElementById('openprojecttableright').innerHTML = make_LoadingAnimation(false);

		var fis = document.getElementById('fontimportstatus');
		var sweep = document.getElementById('sweep');
		var degrees = 0;
		function importStatus(msg, spin){
			// debug('\t>> import status >> ' + msg);
		    degrees = ((degrees + 2) % 360);
            sweep.style.transform = ('rotate('+degrees+'deg)');
            if(msg) fis.innerHTML = msg;
		}

		var font;

		importStatus('Reading font data...');
		opentype.load(file, function(err, otffont){
			debug('\n opentype.load::CALLBACK - START');
			if(err){
				debug('\n opentype.load:ERROR - START');
				loadPage_openproject();
				openproject_changeTab('load');
				showErrorMessageBox('Something went wrong with opening the font file:<br><br>' + err);
				debug(' opentype.load:ERROR - END\n');
				return;
			} else {
				debug('\n opentype.load: LOADING FONT - START');
				font = otffont;
				startFontImport();
				debug(' opentype.load: LOADING FONT - END\n');
			}
			debug(' opentype.load:CALLBACK - END\n');
		});

		function startFontImport() {
			debug('\n startFontImport - START');
			importStatus('Importing Glyph 1 of ' + chars.length);
			setTimeout(importOneGlyph, 4);
			debug(' startFontImport - END\n');
		}


		/*
		*
		*	GLYPH IMPORT
		*
		*/
		var tca, data, uni, ns, cname, chtml, adv, isautowide;
		var maxglyph = 0;
		var minchar = 0xffff;
		var customglyphrange = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};
		var fl = {};

		var c=0;
		function importOneGlyph(){
			importStatus('Importing Glyph ' + c + ' of ' + chars.length);

			if(c >= chars.length) {
				// setTimeout(importOneKern, 1);
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

			} else if (isOutOfBounds(uni)){
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
				if(data){
					// Compound Paths are treated as different Glyphr Shapes
					data = data.replace(/Z/gi,'z');
					data = data.split('z');

					// debug('\t split z, data into ' + data.length + ' Glyphr Studio shapes.');

					// debug('\t data.length (shapes) = ' + data.length);
					for(var d=0; d<data.length; d++){
						if(data[d].length){
							// debug('\t starting convertPathTag');
							ns = ioSVG_convertPathTag(data[d]);
							// debug('\t created shape from PathTag');
							// debug(ns);
							newshapes.push(ns);
							shapecounter++;
							newshapes[newshapes.length-1].name = ('SVG Path ' + shapecounter);
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
					if(1*uni > _UI.glyphrange.latinextendedb.end) customglyphrange.push(uni);

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

		function isOutOfBounds(uni) {
			if(!filter) return false;
			if(!uni.length) return true;

			for(var u=0; u<uni.length; u++){
				if((parseInt(uni[u]) > _UI.importrange.end) || (parseInt(uni[u]) < _UI.importrange.begin)) return true;
			}

			return false;
		}


		/*
		*
		*	IMPORT KERNS?
		*
		*/



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
			// var rstart, rend;
			for(var r in _UI.glyphrange){
				if(_UI.glyphrange.hasOwnProperty(r)){
					rstart = 1*_UI.glyphrange[r].begin;
					rend = 1*_UI.glyphrange[r].end+1;
					for(var t=rstart; t<rend; t++){
						if(getGlyph(t)){
							_GP.projectsettings.glyphrange[r] = true;
							break;
						}
					}
				}
			}

			// Make a custom range for the rest
			if(customglyphrange.length){
				customglyphrange = customglyphrange.sort();
				_GP.projectsettings.glyphrange.custom.push({'begin':customglyphrange[0], 'end':customglyphrange[customglyphrange.length-1]});
			}

			// Import Font Settings
			// Check to make sure certain stuff is there
			// space has horiz-adv-x
			_GP.glyphs = fc;
			_GP.ligatures = fl;
			_GP.kerning = fk;

			// Font Settings
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

		debug(' ioOTF_importOTFfont - END\n');
	}


// end of file