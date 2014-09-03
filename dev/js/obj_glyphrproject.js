// start of file

	function GlyphrProject(){

		// Default settings for new Glyphr Projects

		this.projectsettings = {
			"name": "My Font",			// project name (can be different than font names)
			"version": 0,				// console version
			"versionnum": 0,			// console number version
			"linkedshapecounter": 0,	// private counter for ss id
			"charrange": {				// canned and custom Unicode ranges
				"basiclatin": true,
				"latinsuppliment": false,
				"latinextendeda": false,
				"latinextendedb": false,
				"custom": [],
				"filternoncharpoints": true
			},

			// Grid stuff
			"upm": 1000,			// Units Per Em - (emsize) how tall normal cap letters are
			"ascent": 700,			// ascender
			"capheight": 675,		// capital letter height
			"xheight": 400,			// lowercase letter height
			"linegap": 250,			// distance between lines
			"italicangle": 0,		// slant of characters, degrees from vertical counterclockwise, or negative for clockwise (ex: -15)
			"griddivisions": 10,	// how many squares of grid per emsize
			"overshoot": 10,		// overshoot for round glyphs
			"defaultlsb": 10,		// default left space

			// UI stuff
			"pointsize" : 5,						// path point square size
			"spinnervaluechange" : 1,				// how much spinner controls change a value
			"showkeyboardtipsicon" : true,			// button for keyboard tips on edit canvas
			"stoppagenavigation" : true,			// asks to save on window close or refresh
			"formatsavefile" : true,				// makes the JSON save file readable
			"showoutline" : false,					// outline shapes when drawing
			"showfill" : true,						// fill shapes when drawing
			"color_glyphfill" : "rgb(0,0,0)",		// shape base color
			"color_glyphoutline" : "rgb(0,0,0)",	// shape outline color
			"color_grid" : "rgb(240,240,240)",		// grid base color
			"color_os_guideline" : "rgb(204,79,34)",// OS guide base color
			"guidelines" : [],						// user-defined guidelines
			"snaptogrid" : false,					// snap to gridlines
			"snaptoguides" : false					// snap to guidelines
		};

		this.metadata = {
			//"font_family": 0,
			"font_style": "normal",
			"font_variant": "normal",
			"font_weight": "normal",
			"font_stretch": "normal",
			// "font_size": "all",
			// "unicode_range": 0,
			// "units_per_em": 0,
			// "panose_1": "0 0 0 0 0 0 0 0 0 0",
			"stemv": 0,
			"stemh": 0,
			"slope": 0,
			// "cap_height": 0,
			// "x_height": 0,
			// "accent_height": 0,
			// "ascent": 0,
			// "descent": 0,
			// "widths": 0,
			// "bbox": 0,
			// "ideographic": 0,
			// "alphabetic": 0,
			// "mathematical": 0,
			// "hanging": 0,
			// "v_ideographic": 0,
			// "v_alphabetic": 0,
			// "v_mathematical": 0,
			// "v_hanging": 0,
			"underline_position": -50,
			"underline_thickness": 10,
			"strikethrough_position": 300,
			"strikethrough_thickness": 10,
			"overline_position": 750,
			"overline_thickness": 10
		};

		this.fontchars = {};

		this.ligatures = {};

		this.kerning = {};

		this.linkedshapes = {};
	}

	function saveGlyphrProjectFile(){
		// debug("SAVEGLYPHRPROJECTVILE");
		// debug("\t " + _GP.projectsettings.formatsavefile);
		var jsonString;

		if(_GP.projectsettings.formatsavefile){
			// debug("\t Fancy Save Formatting");
			jsonString = JSON.stringify(_GP, undefined, '\t');
			jsonString = jsonString.replace(/\n/g, '\r\n');
		} else {
			// debug("\t Regular Formatting");
			jsonString = JSON.stringify(_GP);
		}

		//debug("saveGlyphrProjectFile - \n"+jsonString);
		var fblob = new Blob([jsonString], {"type":"text/plain;charset=utf-8", "endings":"native"});
		var fname =  _GP.projectsettings.name + " - Glyphr Project - " + genDateStampSuffix() + ".txt";

		saveTextFile(fname, fblob);

		setProjectAsSaved();
	}

	function genDateStampSuffix(){
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();

		return (""+yr+"."+mo+"."+day+"-"+hr+"."+min+"."+sec);
	}

	function charIterator(fname) {
		var cr = _GP.projectsettings.charrange;
		var ccon = '';
		//var count = 0;

		if(cr.basiclatin){
			for(var i=0; i<_UI.basiclatinorder.length; i++){
				ccon += fname(_UI.basiclatinorder[i]);
				//count++;
			}
		}

		if(cr.latinsuppliment){
			for(var s=_UI.charrange.latinsuppliment.begin; s<=_UI.charrange.latinsuppliment.end; s++){
				ccon += fname(decToHex(s));
				//count++;
			}
		}

		if(cr.latinextendeda){
			for(var a=_UI.charrange.latinextendeda.begin; a<=_UI.charrange.latinextendeda.end; a++){
				ccon += fname(decToHex(a));
				//count++;
			}
		}

		if(cr.latinextendedb){
			for(var b=_UI.charrange.latinextendedb.begin; b<=_UI.charrange.latinextendedb.end; b++){
				ccon += fname(decToHex(b));
				//count++;
			}
		}

		if(cr.custom.length){
			for(var c=0; c<cr.custom.length; c++){
				for(var range=cr.custom[c].begin; range<cr.custom[c].end; range++){
					ccon += fname(decToHex(range));
					//count++;
				}
			}
		}

		//debug("CHARITERATOR - count returned " + count);

		return ccon;
	}

	function calcFontMaxes(){
		var fm = _UI.fontmetrics;
		_UI.fontmetrics.numchars = 0;

		charIterator(function(hex){
			_UI.fontmetrics.numchars++;
			var cm = _GP.fontchars[hex];
			if(cm){
				cm = cm.maxes;
				fm.xmax = Math.max(cm.xmax, fm.xmax);
				fm.xmin = Math.min(cm.xmin, fm.xmin);
				fm.ymax = Math.max(cm.ymax, fm.ymax);
				fm.ymin = Math.min(cm.ymin, fm.ymin);
			}
		});

		var proportion = (fm.ymax / (fm.ymax-fm.ymin));
		var total = fm.ymax + Math.abs(fm.ymin) + _GP.projectsettings.linegap;
		fm.hhea_ascent = round(total*proportion);
		fm.hhea_descent = (fm.hhea_ascent - total);

		// debug("CALCFONTMAXES - numchars " + _UI.fontmetrics.numchars);
	}

// end of file