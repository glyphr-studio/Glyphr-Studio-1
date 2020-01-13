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
			var notdef = generateNotdefGlyph();
			// debug(notdef);
			var ndpath = notdef.makeOpenTypeJSpath();

			options.glyphs.push(new opentype.Glyph({
				name: '.notdef',
				unicode: 0,
				index: getNextGlyphIndex(),
				advanceWidth: round(notdef.getAdvanceWidth()),
				xMin: round(notdef.maxes.xmin),
				xMax: round(notdef.maxes.xmax),
				yMin: round(notdef.maxes.ymin),
				yMax: round(notdef.maxes.ymax),
				path: ndpath
			}));

			// debug(' firstExportStep - END\n');
		}

		function getNextGlyphIndex() { return glyphIndex++; }

		var privateUseArea = [];

		function getNextLigatureCodePoint() {
			while(ligatureCodePoint < 0xF8FF){
				if(privateUseArea.includes(ligatureCodePoint)){
					ligatureCodePoint++;
				} else {
					privateUseArea.push(ligatureCodePoint);
					return ligatureCodePoint;				
				}
			}

			// Fallback.  This really shouldn't happen... but if somebody
			// has used the entire Private Use area, I guess we'll just
			// start throwing Ligatures into the Korean block?

			console.warn('The entire Unicode Private Use Area (U+E000 to U+F8FF) seems to be taken. Ligatures will now be added to the block starting at U+AC00.');
			ligatureCodePoint = 0xAC00;
			return getNextLigatureCodePoint();
		}

		function populateExportLists() {
			// debug('\n populateExportLists - START');

			// Add Glyphs
			var ranges = assembleActiveRanges();

			for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c) && isGlyphInActiveRange(c, ranges)){
				if(parseInt(c)){
					tg = new Glyph(clone(_GP.glyphs[c], 'ioOTF export.populateExportLists'));
					// debug(`\t adding glyph ${c} "${tg.name}"`);
					exportGlyphs.push({xg:tg, xc: c});
					if(parseInt(c) >= 0xE000) privateUseArea.push(parseInt(c));

				} else {
					console.warn('Skipped exporting Glyph ' + c + ' - non-numeric key value.');
				}
			}}
			
			// Add Ligatures
			var ligWithCodePoint;
			for(var l in _GP.ligatures){ if(_GP.ligatures.hasOwnProperty(l)){
				tg = new Glyph(clone(_GP.ligatures[l], 'ioOTF export.populateExportLists'));
				// debug(`\t adding ligature "${tg.name}"`);
				exportLigatures.push({xg:tg, xc: l});
				
				ligWithCodePoint = doesLigatureHaveCodePoint(l);
				if(ligWithCodePoint) exportGlyphs.push({xg:tg, xc:ligWithCodePoint.point});
			}}
			
			exportGlyphs.sort(function(a,b){ return a.xc - b.xc; });

			// debug(' populateExportLists - END\n');
		}

		function generateOneGlyph() {
			// debug('\n generateOneGlyph - START');
			// export this glyph
			var glyph = currentExportItem.xg;
			var glyphID = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;

			// debug(`\t${glyphID}\t${glyph.name}\t${getNameForExport(glyphID)}`);
			showToast('Exporting<br>'+glyph.name, 999999);

			if(comb && glyph.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) glyph.combineAllShapes(true);

			if(glyph.isautowide) {
				glyph.updateGlyphPosition(glyph.getLSB(), 0, true);
				glyph.leftsidebearing = 0;
			}

			var tgpath = glyph.makeOpenTypeJSpath(new opentype.Path());

			var index = getNextGlyphIndex();

			var glyphInfo = {
				name: getNameForExport(glyphID),
				unicode: parseInt(glyphID),
				index: index,
				advanceWidth: round(glyph.getAdvanceWidth() || 1),	// has to be non-zero
				path: tgpath
			};
			
			codePointGlyphIndexTable[''+decToHex(glyphID)] = index;

			// debug(glyphInfo);
			// debug(glyphInfo.path);

			// Add this finished glyph
			options.glyphs.push(new opentype.Glyph(glyphInfo));


			// start the next one
			currentExportNumber++;

			if(currentExportNumber < exportGlyphs.length){
				currentExportItem = exportGlyphs[currentExportNumber];
				setTimeout(generateOneGlyph, 10);

			} else {

				if(exportLigatures.length){
					// debug('\t codePointGlyphIndexTable');
					// debug(codePointGlyphIndexTable);
					// debug(`\t codePointIndexTable`);
					// debug(codePointGlyphIndexTable);

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
			// debug('\n generateOneLigature - START');
			// export this glyph
			var liga = currentExportItem.xg;
			var ligaID = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;
			
			// debug(`\t${ligaID}\t${liga.name}\t${getNameForExport(ligaID)}`);
			showToast('Exporting<br>'+liga.name, 999999);

			if(comb && liga.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) liga.combineAllShapes(true);

			if(liga.isautowide) {
				liga.updateGlyphPosition(liga.getLSB(), 0, true);
				liga.leftsidebearing = 0;
			}

			var tgpath = liga.makeOpenTypeJSpath(new opentype.Path());
			
			var ligaCodePoint = getNextLigatureCodePoint();
			var index = getNextGlyphIndex();

			var glyphInfo = {
				name: getNameForExport(ligaID),
				unicode: ligaCodePoint,
				index: index,
				advanceWidth: round(liga.getAdvanceWidth() || 1),	// has to be non-zero
				path: tgpath
			};
			
			// Add ligature glyph to the font
			options.glyphs.push(new opentype.Glyph(glyphInfo));

			// Add substitution info to font
			var subList = hexToChars(ligaID).split('');
			// debug(`\t subList ${json(subList, true)}`);
			
			var indexList = subList.map(function(v){ return codePointGlyphIndexTable[charToHex(v)]; });
			// debug('\t INDEX sub: [' + indexList + '] by: ' + index + ' which is ' + ligaCodePoint);
			// debug(`\t indexList ${json(indexList, true)}`);
			
			ligatureSubstitutions.push({sub: indexList, by: index});

			// debug(glyphInfo);

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

			for(var s=0; s<ligatureSubstitutions.length; s++) {
				font.substitution.addLigature('liga', ligatureSubstitutions[s]);
			}

			// debug('\t Font object:');
			// debug(font.glyphs);
			// debug(font.toTables());

			font.download();
			setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);
			// debug(' lastExportStep - END\n');
		}



		/*
			MAIN EXPORT LOOP
		*/
		var options = {};
		var codePointGlyphIndexTable = {};
		var glyphIndex = 0;
		var ligatureCodePoint = 0xE000;
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
	
	function generateNotdefGlyph() {
		// debug(`\n generateNotdefGlyph - START`);
		var notdef = new Glyph({'name': 'notdef', 'shapes':JSON.parse(_UI.notdefglyphshapes)});
		// debug(`\t capheight ${_GP.projectsettings.capheight}`);
		// debug(`\t notdef.maxes.ymax ${notdef.maxes.ymax}`);
		
		if(_GP.projectsettings.capheight !== 700){
			var delta = _GP.projectsettings.capheight - 700;
			// debug(`\t delta is ${delta}`);
			notdef.updateGlyphSize(false, delta, true);
			// debug(`\t notdef.maxes.height ${notdef.maxes.ymax}`);
		}

		notdef.updateGlyphPosition(notdef.getLSB(), 0, true);
		notdef.leftsidebearing = 0;
		
		// debug(` generateNotdefGlyph - END\n\n`);
		return notdef;
	}

	function assembleActiveRanges() {
		// debug(`\n assembleActiveRanges - START`);
		var ranges = clone(_GP.projectsettings.glyphrange.custom, 'ioOTF export.assembleActiveRanges');
		if(_GP.projectsettings.glyphrange.latinextendedb) ranges.unshift({begin: _UI.glyphrange.latinextendedb.begin, end: _UI.glyphrange.latinextendedb.end});
		if(_GP.projectsettings.glyphrange.latinextendeda) ranges.unshift({begin: _UI.glyphrange.latinextendeda.begin, end: _UI.glyphrange.latinextendeda.end});
		if(_GP.projectsettings.glyphrange.latinsupplement) ranges.unshift({begin: _UI.glyphrange.latinsupplement.begin, end: _UI.glyphrange.latinsupplement.end});
		if(_GP.projectsettings.glyphrange.basiclatin) ranges.unshift({begin: _UI.glyphrange.basiclatin.begin, end: _UI.glyphrange.basiclatin.end});
		
		// debug(ranges);
		// debug(` assembleActiveRanges - END\n\n`);

		return ranges;
	}

	function isGlyphInActiveRange(gid, ranges){
		// debug(`\n isGlyphInActiveRange - START`);
		// debug(`\t ranges.length = ${ranges.length}`);
		
		for(var r=0; r<ranges.length; r++){
			// debug(`\t testing ${gid} >= ${ranges[r].begin} && ${gid} <= ${ranges[r].end}`);
			if(gid >= ranges[r].begin && gid <= ranges[r].end) {
				// debug(`\t returning ^^true^^ for ${gid}`);
				return true;
			}
		}
			
		// debug(`\t returning __false__ for ${gid}`);
		return false;
	}

	function getNameForExport(glyphrStudioID) {
		// debug('\n getNameForExport - START');
		glyphrStudioID = ''+glyphrStudioID;
		var chars = glyphrStudioID.split('0x');
		if(chars[0] === '') chars.shift();

		function getSingleCharShortName(fourDigitHex) {
			return _UI.unicodeShortNames['0x'+fourDigitHex] || 'uni'+fourDigitHex;
		}
		
		// debug(`\t ${glyphrStudioID} as ${json(chars)}`);
		// debug(`\t chars[0] is ${getSingleCharShortName(chars[0])}`);

		if(chars.length === 1) return getSingleCharShortName(chars[0]);

		var result = 'liga';

		for(var i=0; i<chars.length; i++) {
			result += '_' + getSingleCharShortName(chars[i]);
		}

		return result;
	}
	