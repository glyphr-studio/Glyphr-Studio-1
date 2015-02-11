// start of file

//	--------------------------
//	Export OTF TTF Font
//	--------------------------

	function ioOTF_exportOTFfont() {
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

		// Add Chars and Ligatures
		var tc, tcpath;

		for(var c in _GP.fontchars){ if(_GP.fontchars.hasOwnProperty(c)){
			tc = _GP.fontchars[c];
			tcpath = new opentype.Path();
			tc.calcCharMaxes();
			var sl = tc.charshapes;
			var sh, ns;
			var lsb = tc.getLSB();

			// Go through each shape in the char, generate the OpenTypeJS path
			for(var j=0; j<sl.length; j++) {
				sh = sl[j];
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = _GP.linkedshapes[sh.link].shape;
					} else {
						ns = clone(_GP.linkedshapes[sh.link].shape);
						ns.path.updatePathPosition(sh.xpos, sh.ypos, true);
						sh = ns;
					}
				} else {
					ns = clone(sh);
					ns.path.updatePathPosition(lsb, 0, true);
					sh = ns;
				}
				// debug('\t drawing path of char ' + tc.charname);
				tcpath = sh.path.makeOpenTypeJSpath(tcpath);
			}

			options.glyphs.push(new opentype.Glyph({
				name: tc.charname,
				unicode: parseInt(c),
				advanceWidth: tc.getTotalWidth(),
				xMin: tc.maxes.xmin,
				xMax: tc.maxes.xmax,
				yMin: tc.maxes.ymin,
				yMax: tc.maxes.ymax,
				path: tcpath
			}));
		}}

		debug(options);

		// Export
		var font = new opentype.Font(options);
		font.download();
	}