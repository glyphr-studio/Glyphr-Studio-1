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

		// Add Notdef
		var ndchar = new Char(JSON.parse(_UI.notdefchar));
		if(_GP.upm !== 1000){
			var delta = _GP.upm / 1000;
			ndchar.updateCharSize(delta, delta, true);
		}
		var ndpath = ndchar.charshapes[0].path.makeOpenTypeJSpath();
		ndpath = ndchar.charshapes[1].path.makeOpenTypeJSpath(ndpath);

		options.glyphs.push(new opentype.Glyph({
			name: '.notdef',
			unicode: 0,
			index: 0,
			advanceWidth: ndchar.getTotalWidth(),
			xMin: ndchar.maxes.xmin,
			xMax: ndchar.maxes.xmax,
			yMin: ndchar.maxes.ymin,
			yMax: ndchar.maxes.ymax,
			path: ndpath
		}));

		// Add Chars and Ligatures
		var tc, tcpath;
		var count = 0;

		for(var c in _GP.fontchars){ if(_GP.fontchars.hasOwnProperty(c)){ if(c !== '0x0020'){
			if(count > 20) break;

			tc = _GP.fontchars[c];
			tc.calcCharMaxes();
			tcpath = new opentype.Path();
			var sl = tc.charshapes;
			var sh, ns;
			var lsb = tc.getLSB();

			// Go through each shape in the char, generate the OpenTypeJS path
			for(var j=0; j<sl.length; j++) {
				sh = sl[j];
				if(sh.link){
					if(sh.uselinkedshapexy){
						sh = clone(_GP.linkedshapes[sh.link].shape);
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
				index: parseInt(c),
				advanceWidth: tc.getTotalWidth(),
				xMin: tc.maxes.xmin,
				xMax: tc.maxes.xmax,
				yMin: tc.maxes.ymin,
				yMax: tc.maxes.ymax,
				path: tcpath
			}));

			count++;
		}}}

/*
		// Manual T
		var tPath = new opentype.Path();
		tPath.moveTo(360, 666);
		tPath.curveTo(545,666,696,520,696,339);
		tPath.curveTo(696,158,545,12, 360,12);
		tPath.curveTo(175,12, 24, 158,24, 339);
		tPath.curveTo(24,520,175,666,360,666);
		tPath.close();

		options.glyphs.push(new opentype.Glyph({
		    name: 'T',
		    unicode: 84,
		    advanceWidth: 750,
		    path: tPath
		}));
*/
		options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });

		debug(options);

		// Export
		var font = new opentype.Font(options);
		font.download();
	}