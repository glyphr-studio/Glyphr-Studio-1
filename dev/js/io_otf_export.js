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

			// debug('\t notdef glyph and path:');
			// debug(notdef);

			var ndpath = notdef.makeOpenTypeJSpath();
			// debug(ndpath);

			options.glyphs.push(new opentype.Glyph({
				name: '.notdef',
				unicode: 0,
				index: 0,
				advanceWidth: round(notdef.getTotalWidth()),
				xMin: round(notdef.maxes.xmin),
				xMax: round(notdef.maxes.xmax),
				yMin: round(notdef.maxes.ymin),
				yMax: round(notdef.maxes.ymax),
				path: ndpath
			}));

			// debug(' firstExportStep - END\n');
		}

		function populateExportList() {
			// debug('\n populateExportList - START');

			// Add Glyphs and Ligatures
			for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c)){
				if(parseInt(c)){
					tg = new Glyph(clone(_GP.glyphs[c]));
					exportarr.push({xg:tg, xc: c});

				} else {
					console.warn('Skipped exporting Glyph ' + c + ' - non-numeric key value.');
				}
			}}

			exportarr.sort(function(a,b){ return a.xc - b.xc; });
			// debug(' populateExportList - END\n');
		}

		function generateOneGlyph() {
			// debug('\n generateOneGlyph - START');
			// export this glyph
			var glyph = currexportglyph.xg;
			var num = currexportglyph.xc;
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
				advanceWidth: round(glyph.getTotalWidth() || 1),	// has to be non-zero
				xMin: round(maxes.xmin),
				xMax: round(maxes.xmax),
				yMin: round(maxes.ymin),
				yMax: round(maxes.ymax),
				path: tgpath
			});

			// debug(otglyph);

			// Add this finshed glyph
			options.glyphs.push(otglyph);


			// start the next one
			currexportnum++;

			if(currexportnum < exportarr.length){
				currexportglyph = exportarr[currexportnum];
				setTimeout(generateOneGlyph, 10);
			} else {
				showToast('Finalizing...', 10);
				setTimeout(lastExportStep, 10);
			}

			// debug(' generateOneGlyph - END\n');
		}

		function lastExportStep() {	
			// debug('\n lastExportStep - START');
			options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });
			
			// Create Font
			// debug('\t NEW options ARG TO FONT');
			// debug(options);
			var font = new opentype.Font(options);

			// debug('\t Font object:');
			// debug(font.toTables());

			// Export
			_UI.stoppagenavigation = false;
			font.download();
			setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);
			// debug(' lastExportStep - END\n');
		}



		/*
			MAIN EXPORT LOOP
		*/
		var options = {};
		var exportarr = [];
		var currexportnum = 0;
		var currexportglyph ={};

		firstExportStep();
		populateExportList();
		currexportglyph = exportarr[0];
		generateOneGlyph();


		// debug(' ioOTF_exportOTFfont - END\n');
	}