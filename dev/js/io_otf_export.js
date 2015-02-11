// start of file

//	--------------------------
//	Export OTF TTF Font
//	--------------------------

	function ioOTF_exportOTFfont() {
		debug('\n ioOTF_exportOTFfont - START');


		// Add Chars and Ligatures
/*
		var glyphs = [];
		var tc, tcpath;

		for(var c in _GP.fontchars){ if(_GP.fontchars.hasOwnProperty(c)){if(c !== '0x0020'){

			tc = _GP.fontchars[c];
			tc.calcCharMaxes();
			tcpath = new opentype.Path();
			var sl = tc.charshapes;
			var sh, ns;
			var lsb = tc.getLSB();
			debug('\t Char id ' + c + ' is ' + tc.charname);

			// Go through each shape in the char, generate the OpenTypeJS path
			if(sl.length === 0) tcpath.close();
			for(var j=0; j<sl.length; j++) {
				debug('\t\t shape ' + j);
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
			debug('\t\t overall pathdata: \n');
			debug(tcpath);

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
		}}}


		// Glyphr Notdef
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
			advanceWidth: ndchar.getTotalWidth(),
			xMin: ndchar.maxes.xmin,
			xMax: ndchar.maxes.xmax,
			yMin: ndchar.maxes.ymin,
			yMax: ndchar.maxes.ymax,
			path: ndpath
		}));
*/
		
		// Manual NotDef
		var notdefPath = new opentype.Path();
		notdefPath.moveTo(600, 0);
		notdefPath.lineTo(600, 700);
		notdefPath.lineTo(0, 700);
		notdefPath.lineTo(0, 0);
		notdefPath.close();

		var notdefGlyph = new opentype.Glyph({
		    name: '.notdef',
		    unicode: 0,
		    advanceWidth: 650,
		    path: notdefPath
		});
		

		// Manual T
		var tPath = new opentype.Path();
		tPath.moveTo(360, 666);
		tPath.curveTo(545,666,696,520,696,339);
		tPath.curveTo(696,158,545,12, 360,12);
		tPath.curveTo(175,12, 24, 158,24, 339);
		tPath.curveTo(24,520,175,666,360,666);
		tPath.close();

		var tGlyph = new opentype.Glyph({
		    name: 'T',
		    unicode: 84,
		    advanceWidth: 750,
		    path: tPath
		});


		// Manual e
		var ePath = new opentype.Path();
		ePath.moveTo(0,500);
		ePath.curveTo(0,600,200,700,300,700);
		ePath.curveTo(400,700,600,600,600,500);
		ePath.lineTo(600,0);
		ePath.lineTo(0,0);
		ePath.close();
		ePath.close();

		var eGlyph = new opentype.Glyph({
		    name: 'e',
		    unicode: 101,
		    advanceWidth: 750,
		    path: ePath
		});


		// Export
		var glyphs = [notdefGlyph, tGlyph, eGlyph];
		// var font = new opentype.Font({familyName: 'TESTTEST', styleName: 'Medium', unitsPerEm: 1000, glyphs: glyphs});

		var md = _GP.metadata;
		var ps = _GP.projectsettings;
		var font = new opentype.Font({
			'unitsPerEm': ps.upm,
			'familyName': md.font_family,
			'styleName': md.font_style,
			// 'designer': md.designer,
			// 'designerURL': md.designerURL,
			// 'manufacturer': md.manufacturer,
			// 'manufacturerURL': md.manufacturerURL,
			// 'license': md.license,
			// 'licenseURL': md.licenseURL,
			// 'version': md.version,
			// 'description': md.description,
			// 'copyright': md.copyright,
			// 'trademark': md.trademark,
			'glyphs': glyphs
		});
		debug('\t creted font object:');
		debug(font);
		

		font.download();

		debug('ioOTF_exportOTFfont - END\n');
	}