// start of file
/**
	IO > Export > OpenType
	Using OpenType.js to convert a Glyphr Studio 
	Project into OpenType.js format for saving.
**/


	function ioOTF_exportOTFfont() {
		// debug('\n ioOTF_exportOTFfont - START');
		var options = {};
		
		// Add metadata
		var md = _GP.metadata;
		var ps = _GP.projectsettings;
		
		options.unitsPerEm = ps.upm;
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

		/*
			Hack to fix a bug where the exported font does 
			not reflect the current changes unless its
			name is different than the last exported font.
			So, add whitespace char on every export.
		*/
			
		options.familyName += _UI.unique;
		_UI.unique += ' ';


		// debug('\t NEW options ARG BEFORE GLYPHS');
		// debug(options);

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

		// Add Glyphs and Ligatures
		var tg, tgpath, otglyph;

		for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c)){
			if(parseInt(c)){
				tg = new Glyph(clone(_GP.glyphs[c]));
				if(tg.isautowide) tg.updateGlyphPosition(tg.getLSB(), 0);

				tgpath = tg.makeOpenTypeJSpath(new opentype.Path());

				otglyph = new opentype.Glyph({
					name: getUnicodeShortName(''+decToHex(c)),
					unicode: parseInt(c),
					index: parseInt(c),
					advanceWidth: round(tg.getTotalWidth()),
					xMin: round(tg.maxes.xmin),
					xMax: round(tg.maxes.xmax),
					yMin: round(tg.maxes.ymin),
					yMax: round(tg.maxes.ymax),
					path: tgpath
				});

				// debug(otglyph);

				options.glyphs.push(otglyph);
			} else {
				console.warn('Skipped exporting Glyph ' + c + ' - non-numeric key value.');
			}
		}}

		options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });
		

		// Create Font
		// debug('\t NEW options ARG TO FONT');
		// debug(options);
		var font = new opentype.Font(options);

		// debug('\t Font object:');
		// debug(font);

		// Export
		_UI.stoppagenavigation = false;
		font.download();
		setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);

		// debug(' ioOTF_exportOTFfont - END\n');
	}