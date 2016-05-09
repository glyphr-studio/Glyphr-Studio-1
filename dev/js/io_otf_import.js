 // start of file
/**
	IO > Import > OpenType
	Using OpenType.js to read in a font file
	and convert it to a Glyphr Studio Project.
**/

	function ioOTF_importOTFfont(filter, file) {
		// debug('\n ioOTF_importOTFfont - START');
		// debug('\t file = ' + file);


		// Spinner Animation
		document.getElementById('openprojecttableright').innerHTML = make_LoadingAnimation(false);

		var fis = document.getElementById('fontimportstatus');
		var sweep = document.getElementById('sweep');
		var degrees = 0;

		function importStatus(msg){
			if(msg) fis.innerHTML = msg;
			spinSpinner();
		}

		function spinSpinner() {
			degrees = ((degrees + 2) % 360);
			sweep.style.transform = ('rotate('+degrees+'deg)');
		}

		// Font Stuff
		_GP = new GlyphrProject();
		var font = false;

		if(!_UI.importingfont){
			importStatus('Reading font data...');

			try {
				// debug('\t TRY - start');
				font = opentype.parse(file);
			} catch(err){
				// debug('\t CATCH ERROR');
				loadPage_openproject();
				openproject_changeTab('load');
				showErrorMessageBox('Something went wrong with opening the font file:<br><br>' + err);
				// debug(' opentype.load:ERROR - END\n');
				return;
			}
		} else {
			font = _UI.importingfont;
		}

		// test for range
		if((font && font.glyphs.length < _UI.overflowcount) || filter){
			importStatus('Importing Glyph 1 of ' + font.glyphs.length);
			setTimeout(startFontImport, 1);
		} else {
			_UI.importingfont = font;
			document.getElementById('openprojecttableright').innerHTML = make_ImportFilter(font.glyphs.length, 0, 'ioOTF_importOTFfont');
		}

		function startFontImport() {
			// debug('\n startFontImport - START');
			// debug(font);
			setTimeout(importOneGlyph, 4);
			// debug(' startFontImport - END\n');
		}

		var importglyphs = [];

		Object.keys(font.glyphs.glyphs).forEach(function (key) {
			importglyphs.push(font.glyphs.glyphs[key]);
		});



		/*
		*
		*	GLYPH IMPORT
		*
		*/
		var tglyph, data, uni, np, cname, chtml, adv, isautowide;
		var maxglyph = 0;
		var minchar = 0xffff;
		var customglyphrange = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};
		var fl = {};

		var c=0;
		function importOneGlyph(){
			// debug('\n\n=============================\n');
			// debug('\n importOneGlyph - START');
			importStatus('Importing Glyph ' + c + ' of ' + importglyphs.length);

			if(c >= importglyphs.length) {
				// setTimeout(importOneKern, 1);
				startFinalizeFontImport();
				return;
			}

			// One Glyph in the font
			tglyph = importglyphs[c];

			// Get the appropriate unicode decimal for this glyph
			// debug('\t starting  unicode \t' + tglyph.unicode + ' \t ' + tglyph.name);
			// debug(tglyph);

			uni = decToHex(tglyph.unicode || 0);

			if(uni === false || uni === '0x0000'){
				// Check for .notdef
				// debug('\t !!! Skipping '+tglyph.name+' NO UNICODE !!!');
				importglyphs.splice(c, 1);

			} else if (filter && isOutOfBounds([uni])){
				// debug('\t !!! Skipping '+tglyph.name+' OUT OF BOUNDS !!!');
				importglyphs.splice(c, 1);

			} else {

				// debug('\t GLYPH ' + c + '/'+importglyphs.length+'\t"'+tglyph.name + '" unicode: ' + uni);
				/*
				*
				*	GLYPH IMPORT
				*
				*/
				newshapes = [];
				shapecounter = 0;

				// Import Path Data
				data = flattenDataArray(tglyph.path.commands);
				// debug('\t Glyph has path data ' + data);

				if(data && data !== 'Z'){
					// Move commands for a path are treated as different Glyphr Shapes
					data = data.replace(/M/g,'~M');
					data = data.replace(/m/g,'~m');
					data = data.split('~');

					// debug('\t split data into ' + data.length + ' Glyphr Studio shapes.');

					for(var d=0; d<data.length; d++){
						if(data[d].length){
							// debug('\t starting convertPathTag');
							np = ioSVG_convertPathTag(data[d]);
							// debug('\t created shape from PathTag');
							// debug(np);
							shapecounter++;
							newshapes.push(new Shape({'path':np, 'name':('Shape ' + shapecounter)}));
						}
					}
				}

				// Get Advance Width
				isautowide = true;
				adv = parseInt(tglyph.advanceWidth);
				if(adv){
					if(!isNaN(adv) && adv > 0){
						isautowide = false;
					}
				} else adv = false;


				// Get some range data
				// uni = uni[0];
				minchar = Math.min(minchar, uni);
				maxglyph = Math.max(maxglyph, uni);
				if(1*uni > _UI.glyphrange.latinextendedb.end) customglyphrange.push(uni);

				fc[uni] = new Glyph({'shapes':newshapes, 'glyphhex':uni, 'glyphwidth':adv, 'isautowide':isautowide});
				if(getUnicodeName(uni) === '[name not found]') _GP.projectsettings.glyphrange.filternoncharpoints = false;


				// Successfull loop, advance c
				c++;
			}


			// finish loop
			setTimeout(importOneGlyph, 1);

			// debug(' importOneGlyph - END\n');
		}

		function flattenDataArray(da) {
			// debug('\n flattenDataArray - START');
			// debug(json(da, true));

			var re = '';
			var tc;
			for(var i=0; i<da.length; i++){
				tc = da[i];

				re += tc.type;

				if(isval(tc.x1) && isval(tc.y1)){ re += tc.x1 + ',' + tc.y1 + ',';
					if(isval(tc.x2) && isval(tc.y2)){ re += tc.x2 + ',' + tc.y2 + ',';
				}}

				if(isval(tc.x) && isval(tc.y)) re += tc.x + ',' + tc.y + ',';
			}

			// debug(re);
			// debug(' flattenDataArray - END\n');

			return re;
		}

		/*
		*
		*	IMPORT LIGATURES?
		*
		*/
		fl = {};

		/*
		*
		*	IMPORT KERNS?
		*
		*/
		fk = {};


		/*
		*
		*	FINALIZE
		*
		*/
		function startFinalizeFontImport() {
			importStatus('Finalizing the imported font...');
			setTimeout(finalizeFontImport, 20);
		}

		function finalizeFontImport(){
			// debug('\n finalizeFontImport - START');
			_GP.glyphs = fc;
			_GP.ligatures = fl;
			_GP.kerning = fk;

			var rstart, rend;
			for(var r in _UI.glyphrange){ if(_UI.glyphrange.hasOwnProperty(r)){
				rstart = 1*_UI.glyphrange[r].begin;
				rend = 1*_UI.glyphrange[r].end+1;
				for(var t=rstart; t<rend; t++){
					if(getGlyph(''+decToHex(t))){
						_GP.projectsettings.glyphrange[r] = true;
						break;
					}
				}
			}}

			// Make a custom ranges for the rest, with logical separations
			if(customglyphrange.length){
				var maxvalley = 50;
				var maxrange = 100;
				customglyphrange = customglyphrange.sort();
				var tbegin = customglyphrange[0];
				var tend = customglyphrange[0];
				var tcurr;

				for(var c=0; c<customglyphrange.length; c++){
					tcurr = customglyphrange[c];

					if(((tcurr - tbegin) > maxrange) || ((tcurr - tend) > maxvalley)){
						_GP.projectsettings.glyphrange.custom.push({'begin':tbegin, 'end':tend});
						tbegin = tcurr;
						tend = tcurr;
					} else {
						tend = tcurr;
					}
				}

			}

			// Import Font Settings
			// Check to make sure certain stuff is there
			// space has horiz-adv-x
			// debug('\t Custom range stuff done');
			var ps = _GP.projectsettings;
			var md = _GP.metadata;
			var fname = font.familyName || 'My Font';

			ps.name = fname;
			ps.upm = 1*font.unitsPerEm || 1000;
			ps.ascent = 1*font.ascender || 700;
			ps.descent = 1*font.descender || 300;
			ps.capheight = 1*getTableValue(font.tables.os2.sCapHeight) || 675;
			ps.xheight = 1*getTableValue(font.tables.os2.sxHeight) || 400;
			ps.overshoot = round(ps.upm / 100);

			md.font_family = fname;
			md.panose_1 = getTableValue(font.tables.os2.panose) || '0 0 0 0 0 0 0 0 0 0';
			md.version = getTableValue(font.tables.head.fontRevision) || getTableValue(font.version) || getTableValue('Version 0.001');

			// These can be read in but not saved using OpenType.js
			md.font_style = getTableValue(font.tables.name.fontSubfamily) || 'Regular';
			md.copyright = getTableValue(font.tables.name.copyright) || '';
			md.trademark = getTableValue(font.tables.name.trademark) || '';
			md.designer = getTableValue(font.tables.name.designer) || '';
			md.designerURL = getTableValue(font.tables.name.designerURL) || '';
			md.manufacturer = getTableValue(font.tables.name.manufacturer) || '';
			md.manufacturerURL = getTableValue(font.tables.name.manufacturerURL) || '';
			md.license = getTableValue(font.tables.name.license) || '';
			md.licenseURL = getTableValue(font.tables.name.licenseURL) || '';
			md.description = getTableValue(font.tables.name.description) || '';

			// md.font_weight = 1*font.fontweight || 400;
			// md.font_stretch = font.fontstretch || 'normal';
			// md.underline_position = 1*font.underlineposition || -50;
			// md.underline_thickness = 1*font.underlinethickness || 10;
			// md.strikethrough_position = 1*font.strikethroughposition || 300;
			// md.strikethrough_thickness = 1*font.strikethroughthickness || 10;
			// md.overline_position = 1*font.overlineposition || 750;
			// md.overline_thickness = 1*font.overlinethickness || 10;

			// Finish Up
			// debug('\t calling finalizeGlyphrProject');
			finalizeGlyphrProject();
			closeDialog();
			// debug(' finalizeFontImport - END\n');
			navigate();
		}

		// debug(' ioOTF_importOTFfont - END\n');
	}

 function getTableValue(val) {
	 try {
		 // fixes #238 .ttf import from Google Fonts
		 if (typeof val === 'object' && typeof val.en === 'string') {
			 return val.en;
		 }

		 if(Object.prototype.toString.call(val) === '[object Array]') {
			 return val.join(' ');
		 }


	 } catch(err) {
		 return 0;
	 }
 }

// end of file
