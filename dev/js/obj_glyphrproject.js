// start of file
/**
	Glyphr Studio Project
	A default project in Object form for easy new 
	project creation.
**/


	function GlyphrProject(){

		// Default settings for new Glyphr Projects

		this.projectsettings = {
			// Internal Stuff
			'version': _UI.thisGlyphrStudioVersion,			// project version
			'versionnum': _UI.thisGlyphrStudioVersionNum,	// project number version

			// Font Metrics
			'name': 'My Font',		// project name (can be different than font names)
			'upm': 1000,			// Units Per Em - (emsize) how tall normal cap letters are
			'ascent': 700,			// ascender
			'capheight': 675,		// capital letter height
			'xheight': 400,			// lowercase letter height
			'linegap': 250,			// distance between lines
			'italicangle': 0,		// slant of glyphs, degrees from vertical counterclockwise, or negative for clockwise (ex: -15)
			'griddivisions': 10,	// how many squares of grid per emsize
			'overshoot': 10,		// overshoot for round glyphs
			'defaultlsb': 20,		// default left side bearing
			'defaultrsb': 20,		// default right side bearing
			'glyphrange': {			// canned and custom Unicode ranges
				'basiclatin': true,
				'latinsuppliment': false,
				'latinextendeda': false,
				'latinextendedb': false,
				'custom': [],
				'filternoncharpoints': true
			},

			// UI stuff
			'pointsize': 5,					// path point square size
			'spinnervaluechange': 1,		// how much spinner controls change a value
			'renderpointssnappedtogrid': true, // OpenType.js requires all points be round numbers - project will still store decimals
			'showkeyboardtipsicon': true,	// button for keyboard tips on edit canvas
			'stoppagenavigation': true,		// asks to save on window close or refresh
			'formatsavefile': true,			// makes the JSON save file readable
			'showoutline': false,			// outline shapes when drawing
			'showfill': true,				// fill shapes when drawing
			'guides': {},					// user-defined guidelines
			'snaptogrid': false,			// snap to gridlines
			'snaptoguides': false,			// snap to guidelines
			'colors': {
				'glyphfill': 'rgb(0,0,0)',			// shape base color
				'glyphoutline': 'rgb(0,0,0)',		// shape outline color
				'gridlightness': 96,				// grid base color for settings page
				'guide_dark': 'rgb(204,81,0)',		// Dark OS Guideline
				'guide_med': 'rgb(255,132,51)',		// Medium OS Guideline
				'guide_light': 'rgb(255,193,153)',	// Light OS Guideline
			}
		};

		this.metadata = {
			/* Shared Properties */
			'shared': '{{sectionbreak}}',
			'font_family': 'My Font',
			'font_style': 'normal',

			/* OTF Properties */
			'otf': '{{sectionbreak}}',
			'designer': '',
			'designerURL': '',
			'manufacturer': '',
			'manufacturerURL': '',
			'license': '',
			'licenseURL': '',
			'version': '',
			'description': '',
			'copyright': '',
			'trademark': '',
			
			/* SVG PROPERTIES */
			'svg': '{{sectionbreak}}',
			// 'units_per_em': 0,
			// 'accent_height': 0,
			// 'ascent': 0,
			// 'cap_height': 0,
			// 'x_height': 0,
			// 'descent': 0,
			// 'bbox': 0,
			// 'unicode_range': 0,
			'font_variant': 'normal',
			'font_weight': 'normal',	// Default to 400
			'font_stretch': 'normal',
			'panose_1': '2 0 0 0 0 0 0 0 0 0',
			'stemv': 0,
			'stemh': 0,
			'slope': 0,
			// 'font_size': 'all',
			// 'widths': 0,
			// 'ideographic': 0,
			// 'alphabetic': 0,
			// 'mathematical': 0,
			// 'hanging': 0,
			// 'v_ideographic': 0,
			// 'v_alphabetic': 0,
			// 'v_mathematical': 0,
			// 'v_hanging': 0,
			'underline_position': -50,
			'underline_thickness': 10,
			'strikethrough_position': 300,
			'strikethrough_thickness': 10,
			'overline_position': 750,
			'overline_thickness': 10
		};

		this.projectsettings.guides = {
			'ascent': new Guide({name:'ascent', type:'horizontal', location:this.projectsettings.ascent, editable:false, color:this.projectsettings.colors.guide_med}),
			'capheight': new Guide({name:'capheight', type:'horizontal', location:this.projectsettings.capheight, editable:false, color:this.projectsettings.colors.guide_light}),
			'xheight': new Guide({name:'xheight', type:'horizontal', location:this.projectsettings.xheight, editable:false, color:this.projectsettings.colors.guide_light}),
			'baseline': new Guide({name:'baseline', type:'horizontal', location:0, editable:false, color:this.projectsettings.colors.guide_dark}),
			'descent': new Guide({name:'descent', type:'horizontal', location:(this.projectsettings.ascent-this.projectsettings.upm), editable:false, color:this.projectsettings.colors.guide_med}),
			'leftside': new Guide({name:'leftside', type:'vertical', location:this.projectsettings.defaultlsb*-1, editable:false, color:this.projectsettings.colors.guide_dark}),
			'rightside': new Guide({name:'rightside', type:'vertical', location:this.projectsettings.upm, editable:false, color:this.projectsettings.colors.guide_dark}),
			'zero': new Guide({name:'zero', type:'vertical', showname:false, location:0, editable:false, color:this.projectsettings.colors.guide_med}),
			'max': new Guide({name:'max', type:'vertical', showname:false, location:this.projectsettings.upm, editable:false, color:this.projectsettings.colors.guide_med}),
		
		};

		this.glyphs = {};

		this.ligatures = {};

		this.kerning = {};

		this.components = {};
	}

	function saveGlyphrProjectFile(){
		// debug('SAVEGLYPHRPROJECTVILE');
		// debug('\t ' + _GP.projectsettings.formatsavefile);
		var jsonString;

		if(_GP.projectsettings.formatsavefile) jsonString = json(_GP);
		else jsonString = JSON.stringify(_GP);

		//debug('saveGlyphrProjectFile - \n'+jsonString);
		var fname =  _GP.projectsettings.name + ' - Glyphr Project - ' + genDateStampSuffix() + '.txt';

		saveFile(fname, jsonString);

		setProjectAsSaved();
	}

	function genDateStampSuffix(){
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? '0' : '') + d.getMinutes();
		var sec = (d.getSeconds()<10? '0' : '') + d.getSeconds();

		return (''+yr+'.'+mo+'.'+day+'-'+hr+'.'+min+'.'+sec);
	}

	function glyphIterator(fname) {
		var cr = _GP.projectsettings.glyphrange;
		var ccon = '';
		//var count = 0;

		if(cr.basiclatin){
			for(var i=0; i<_UI.basiclatinorder.length; i++){
				ccon += fname(_UI.basiclatinorder[i]);
				//count++;
			}
		}

		if(cr.latinsuppliment){
			for(var s=_UI.glyphrange.latinsuppliment.begin; s<=_UI.glyphrange.latinsuppliment.end; s++){
				ccon += fname(decToHex(s));
				//count++;
			}
		}

		if(cr.latinextendeda){
			for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){
				ccon += fname(decToHex(a));
				//count++;
			}
		}

		if(cr.latinextendedb){
			for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){
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

		//debug('GLYPHITERATOR - count returned ' + count);

		return ccon;
	}

	function calcFontMaxes(){
		var fm = _UI.fontmetrics;
		fm.numglyphs = 0;
		fm.maxglyph = 0x20;

		glyphIterator(function(hex){
			fm.numglyphs++;
			fm.maxglyph = Math.max(fm.maxglyph, hex);
			var cm = _GP.glyphs[hex];
			if(cm){
				cm = cm.maxes;
				fm.maxes.xmax = Math.max(cm.xmax, fm.maxes.xmax);
				fm.maxes.xmin = Math.min(cm.xmin, fm.maxes.xmin);
				fm.maxes.ymax = Math.max(cm.ymax, fm.maxes.ymax);
				fm.maxes.ymin = Math.min(cm.ymin, fm.maxes.ymin);
			}
		});

		// var proportion = (fm.ymax / (fm.ymax-fm.ymin));
		// var total = fm.ymax + Math.abs(fm.ymin) + _GP.projectsettings.linegap;
		// fm.hhea_ascent = round(total*proportion);
		// fm.hhea_descent = (fm.hhea_ascent - total);

		// debug('CALCFONTMAXES - numglyphs ' + _UI.fontmetrics.numglyphs);
	}

// end of file