// start of file
/**
	IO > Export > OpenType
	Using OpenType.js to convert a Glyphr Studio 
	Project into OpenType.js format for saving.
**/


	function ioOTF_exportOTFfont() {
		// debug('\n ioOTF_exportOTFfont - START');
		// debug('\t combineshapesonexport = ' + _GP.projectsettings.combineshapesonexport);
		
		function firstExportStep() {
			// debug('\n firstExportStep - START');

			// Add metadata
			var md = _GP.metadata;
            var ps = _GP.projectsettings;

			options.unitsPerEm = ps.upm || 1000;
			options.ascender = ps.ascent || 0.00001;
			options.descender = (-1 * Math.abs(ps.descent)) || -0.00001;
			options.familyName = (md.font_family) || ' ';
			options.styleName = (md.font_style) || ' ';
			options.designer = (md.designer) || ' ';
			options.designerURL = (md.designerURL) || ' ';
			options.manufacturer = (md.manufacturer) || ' ';
			options.manufacturerURL = (md.manufacturerURL) || ' ';
			options.license = (md.license) || ' ';
			options.licenseURL = (md.licenseURL) || ' ';
			options.version = (md.version) || 'Version 0.001';
			options.description = (md.description) || ' ';
			options.copyright = (md.copyright) || ' ';
			options.trademark = (md.trademark) || ' ';
            options.glyphs = [];

			// debug('\t NEW options ARG BEFORE GLYPHS');
			// debug(options);
			// debug('\t options.version ' + options.version);

			// Add Notdef
			var notdef = new Glyph({'name': 'notdef', 'shapes':JSON.parse(_UI.notdefglyphshapes)});
			if(_GP.upm !== 1000){
				var delta = _GP.upm / 1000;
				notdef.updateGlyphSize(delta, delta, true);
			}

			var ndpath = notdef.makeOpenTypeJSpath();

			options.glyphs.push(new opentype.Glyph({
				name: '.notdef',
				unicode: 0,
				index: 0,
				advanceWidth: round(notdef.getAdvanceWidth()),
				xMin: round(notdef.maxes.xmin),
				xMax: round(notdef.maxes.xmax),
				yMin: round(notdef.maxes.ymin),
				yMax: round(notdef.maxes.ymax),
				path: ndpath
			}));

			// debug(' firstExportStep - END\n');
		}

		function populateExportLists() {
			// debug('\n populateExportLists - START');

			// Add Glyphs
			for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c)){
				if(parseInt(c)){
					tg = new Glyph(clone(_GP.glyphs[c]));
					exportGlyphs.push({xg:tg, xc: c});

				} else {
					console.warn('Skipped exporting Glyph ' + c + ' - non-numeric key value.');
				}
			}}

			exportGlyphs.sort(function(a,b){ return a.xc - b.xc; });

			// Add Ligatures
			for(var l in _GP.ligatures){ if(_GP.ligatures.hasOwnProperty(l)){
                tg = new Glyph(clone(_GP.ligatures[l]));
                exportLigatures.push({xg:tg, xc: l});
			}}

			// debug(' populateExportLists - END\n');
		}

		function generateOneGlyph() {
			// debug('\n generateOneGlyph - START');
			// export this glyph
			var glyph = currentExportItem.xg;
			var num = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;
			var maxes = glyph.getMaxes();

			// debug('\t ' + glyph.name);			

			showToast('Exporting<br>'+glyph.name, 999999);

			if(comb && glyph.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) glyph.combineAllShapes(true);

			if(glyph.isautowide) glyph.updateGlyphPosition(glyph.getLSB(), 0);

			var tgpath = glyph.makeOpenTypeJSpath(new opentype.Path());

			var otglyph = new opentype.Glyph({
				name: getUnicodeShortName(''+decToHex(num)),
				unicode: parseInt(num),
				index: parseInt(num),
				advanceWidth: round(glyph.getAdvanceWidth() || 1),	// has to be non-zero
				xMin: round(maxes.xmin),
				xMax: round(maxes.xmax),
				yMin: round(maxes.ymin),
				yMax: round(maxes.ymax),
				path: tgpath
			});

			// debug(otglyph);
			// debug(otglyph.path);

			// Add this finshed glyph
			options.glyphs.push(otglyph);


			// start the next one
			currentExportNumber++;

			if(currentExportNumber < exportGlyphs.length){
				currentExportItem = exportGlyphs[currentExportNumber];
                setTimeout(generateOneGlyph, 10);

			} else {

                if(exportLigatures.length){
                    currentExportNumber = 0;
                    currentExportItem = exportLigatures[0];
                    setTimeout(generateOneLigature, 10);
                } else {
                    showToast('Finalizing...', 10);
                    setTimeout(lastExportStep, 10);
                }
			}

			// debug(' generateOneGlyph - END\n');
		}

        function generateOneLigature(){
            debug('\n generateOneLigature - START');
			// export this glyph
			var liga = currentExportItem.xg;
			var ligaID = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;
            var maxes = liga.getMaxes();
            
            debug('\t doing ' + ligaID);

			showToast('Exporting<br>'+liga.name, 999999);

			if(comb && liga.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) liga.combineAllShapes(true);

			if(liga.isautowide) liga.updateGlyphPosition(liga.getLSB(), 0);

			var tgpath = liga.makeOpenTypeJSpath(new opentype.Path());
            var ligaCodePoint = 0xE000 + currentExportNumber; // Unicode private use area

			var otglyph = new opentype.Glyph({
				name: liga.name,
				unicode: ligaCodePoint,
				index: ligaCodePoint,
				advanceWidth: round(liga.getAdvanceWidth() || 1),	// has to be non-zero
				xMin: round(maxes.xmin),
				xMax: round(maxes.xmax),
				yMin: round(maxes.ymin),
				yMax: round(maxes.ymax),
				path: tgpath
            });
            
            // Add ligature glyph to the font
            options.glyphs.push(otglyph);

            // Add substitution info to font
            var subList = hexToChars(ligaID).split('');
            debug('\t sub: [' + subList + '] by: ' + ligaID + ' which is ' + ligaCodePoint);
            ligatureSubstitutions.push({sub: subList, by: ligaCodePoint});


			// start the next one
			currentExportNumber++;

			if(currentExportNumber < exportLigatures.length){
				currentExportItem = exportLigatures[currentExportNumber];
				setTimeout(generateOneLigature, 10);
			} else {
				showToast('Finalizing...', 10);
				setTimeout(lastExportStep, 10);
			}
        }
        
		function lastExportStep() {	
            // Export
			_UI.stoppagenavigation = false;
            
            options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });
            var font = new opentype.Font(options);
            var substitutions = new opentype.Substitution(font);

            for(var s=0; s<ligatureSubstitutions.length; s++) {
                substitutions.add('liga', ligatureSubstitutions[s]);
            }

            // debug('\t Font object:');
            // debug(font.toTables());

            font.download();
			setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);
			// debug(' lastExportStep - END\n');
		}



		/*
			MAIN EXPORT LOOP
        */
        var options = {};
        var ligatureSubstitutions = [];
		var exportGlyphs = [];
		var exportLigatures = [];
		var currentExportNumber = 0;
		var currentExportItem ={};

		firstExportStep();
		populateExportLists();
		currentExportItem = exportGlyphs[0];
		generateOneGlyph();


		// debug(' ioOTF_exportOTFfont - END\n');
	}