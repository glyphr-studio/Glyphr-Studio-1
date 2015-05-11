// start of file
/**
	IO > Export > OpenType
	Using OpenType.js to convert a Glyphr Studio 
	Project into OpenType.js format for saving.
**/


	function ioOTF_exportOTFfont() {
		debug('\n ioOTF_exportOTFfont - START');
		var options = {};
		
		// Add metadata
		var md = _GP.metadata;
		var ps = _GP.projectsettings;

		options.unitsPerEm = ps.upm || 1000;
		options.familyName = md.font_family || ' ';
		options.styleName = md.font_style || ' ';
		options.designer = md.designer || ' ';
		options.designerURL = md.designerURL || ' ';
		options.manufacturer = md.manufacturer || ' ';
		options.manufacturerURL = md.manufacturerURL || ' ';
		options.license = md.license || ' ';
		options.licenseURL = md.licenseURL || ' ';
		options.version = md.version || 'Version 0.1';
		options.description = md.description || ' ';
		options.copyright = md.copyright || ' ';
		options.trademark = md.trademark || ' ';
		options.glyphs = [];

		debug('\t NEW options ARG BEFORE GLYPHS');
		debug(options);

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
			advanceWidth: notdef.getTotalWidth(),
			xMin: notdef.maxes.xmin,
			xMax: notdef.maxes.xmax,
			yMin: notdef.maxes.ymin,
			yMax: notdef.maxes.ymax,
			path: ndpath
		}));

		// Add Glyphs and Ligatures
		var tc, tcpath, tglyph;

		for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c)){
			tc = new Glyph(clone(_GP.glyphs[c]));
			tc.calcGlyphMaxes();
			tcpath = new opentype.Path();
			var sl = tc.shapes;
			var shape, path;
			var lsb = tc.isautowide? tc.getLSB() : 0;

			// Go through each shape in the char, generate the OpenTypeJS path
			for(var j=0; j<sl.length; j++) {
				shape = sl[j];
				shape.updateShapePosition(lsb, 0, true);

				// debug('\t drawing path of char ' + tc.name);
				tcpath = shape.makeOpenTypeJSpath(tcpath);
			}

			tglyph = new opentype.Glyph({
				name: tc.name,
				unicode: parseInt(c),
				index: parseInt(c),
				advanceWidth: round(tc.getTotalWidth(), 3),
				xMin: round(tc.maxes.xmin, 3) + lsb,
				xMax: round(tc.maxes.xmax, 3) + lsb,
				yMin: round(tc.maxes.ymin, 3),
				yMax: round(tc.maxes.ymax, 3),
				path: tcpath
			});
			debug('\t adding glyph ' + c);
			debug(tglyph);

			options.glyphs.push(tglyph);
		}}

		options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });
		

		// Create Font
		// debug('\t NEW options ARG TO FONT');
		// debug(options);
		var font = new opentype.Font(options);

		// Export
		_UI.stoppagenavigation = false;
		font.download();
		setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);

		// debug(' ioOTF_exportOTFfont - END\n');
	}