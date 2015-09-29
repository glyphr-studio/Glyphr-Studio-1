// start of file

/**
	Test Scenario
	Just random code that runs once everything is
	done loading to test recent features.
**/
	function testScenario() {
		// debug('niceAngleToAngle');
		// debug('  0 >> ' + round(niceAngleToAngle(0), 2) + ' ==  1.57');
		// debug(' 89 >> ' + round(niceAngleToAngle(89), 2) + ' ==  0.02');
		// debug(' 91 >> ' + round(niceAngleToAngle(91), 2) + ' == -0.02');
		// debug('180 >> ' + round(niceAngleToAngle(180), 2) + ' == -1.57');
		// debug('269 >> ' + round(niceAngleToAngle(269), 2) + ' == -3.12');
		// debug('271 >> ' + round(niceAngleToAngle(271), 2) + ' ==  3.12');
	}



/**
	Settings
	These are the two global variables, _UI for,
	well, UI stuff, and anything that is not going
	to be saved or personalized.  _GP is all
	Glyphr Project settings, including font stuff
	and personalized stuff.  There are additional
	_UI properties declared in the event handler
	file.
**/

// These are NOT SAVED with the project
	var _UI = {
		// Internal Dev Stuff
		'devmode': true,		// global switch for all the stuff below
		'debug': true,			// show messages sent to the browser console
		'loadsampleproject': 'modegg',	// if sampleproject is present, load it and skip open project experience
		'devnav': 'glyph edit',		// navigate straight to a page
		'devnavprimary': false, // navigate straight to a panel
		'devselectedshape': false, // automatically select a shape
		// SelectedGlyph

		// all pages
		'navhere': 'openproject',
		'navprimaryhere': 'npChooser',
		'thisGlyphrStudioVersion': 'Version 1.03',
		'thisGlyphrStudioVersionNum': '1.03.00',
		'projectsaved': true,
		'stoppagenavigation': true,
		'icons': {},
		'cursors': {},
		'colors': {

			// ACCENT BLUE
			'blue': {
				'l95': 'rgb(225,245,255)',
				'l85': 'rgb(155,221,255)',
				'l75': 'rgb(80,196,255)',
				'l65': 'rgb(0,170,255)',		// Primary Accent
				'l55': 'rgb(0,140,210)',
				'l45': 'rgb(0,113,170)',
				'l35': 'rgb(0,90,135)',
				'l25': 'rgb(0,63,95)',
				'l15': 'rgb(0,43,65)',
				'l05': 'rgb(0,20,30)'
			},

			// ACCENT GREEN
			'green': {
				'l95': 'rgb(185,255,226)',
				'l85': 'rgb(0,245,144)',
				'l75': 'rgb(0,210,123)',
				'l65': 'rgb(0,180,105)',
				'l55': 'rgb(0,150,88)',
				'l45': 'rgb(0,125,73)',
				'l35': 'rgb(0,95,55)',
				'l25': 'rgb(0,70,41)',
				'l15': 'rgb(0,45,26)',
				'l05': 'rgb(0,20,11)'
			},

			// COOL GRAYSCALE
			'gray':{
				'offwhite':	'rgb(250,252,255)',	// Off White
				'l90': 'rgb(229,234,239)',		// LIGHTER
				'l80': 'rgb(204,209,214)',
				'l70': 'rgb(178,183,188)',
				'l60': 'rgb(153,158,163)',
				'l65': 'rgb(153,158,163)',		// Fake for outline color
				'l50': 'rgb(127,134,137)',
				'l40': 'rgb(102,107,112)',
				'l30': 'rgb(76,81,86)',
				'l20': 'rgb(51,56,61)',
				'l10': 'rgb(25,30,35)'			// DARKER
			},

			// RED FOR ERROR
			'error': {
				'light': 'rgb(240,210,215)',	// os red warning color light
				'medium': 'rgb(240,15,54)',	// os red warning color
				'dark': 'rgb(105,45,55)'	// os red warning color dark
			}
		},

		// Shared edit pages
		'popout': false,
		'ms': {
			'shapes': false,	//Selected Shapes
			'points': false		//Selected Points
		},
		'glyphchooser':{
			'dropdown':false,
			'panel':{
				'fname':'selectGlyph',
				'selected': 'basiclatin',
				'choices':'glyphs'
			},
			'dialog':{
				'fname':'selectGlyph',
				'selected': 'basiclatin',
				'choices':'glyphs'
			}
		},
		'multiselectthickness': 2,
		'rotatehandleheight': 40,
		'selectedtool': 'pathedit',	// pathedit, pathaddpoint, shaperesize, pan, newrect, newoval, newpath
		'focuselement': false,
		'redrawing': false,
		'redraw': {
			'redrawcanvas': true,
			'redrawpanels': true,
			'calledby': ''
		},
		'thumbsize': 50,
		'thumbgutter': 5,
		'showgrid': true,		// display the grid
		'showguides': true,		// display guides
		'showguidelabels': true,// display guide labels
		'showovershoots': true,	// display overshoot guides
		'clipboardshape': false,
		'glypheditcanvas': false,
		'glypheditcanvassize': 2000,	// How big the viewport canvas is
		'glypheditctx': false,
		'ishereghostcanvas': false,
		'ishereghostctx': false,
		'defaultview': {
			'dx': 200,		// X offset for the canvas origin
			'dy': 500,		// Y offset for the canvas origin
			'dz': 0.5,		// Zoom or scale of the canvas
		},
		'views': {},		// Holds the unique views per char & component
		'thumbview': {},
		'mins': {
			'xmax': -999999,
			'xmin': 999999,
			'ymax': -999999,
			'ymin': 999999
		},
		'history': {},

		// page: glyphedit
		'selectedglyph': false,	// f is 0x0066

		// page: ligatures
		'selectedligature': false,

		// page: components
		'selectedcomponent': false,

		// page: kerning
		'selectedkern': false,
		'defaultkernview': {
			'dx': 500,		// X offset for the canvas origin
			'dy': 500,		// Y offset for the canvas origin
			'dz': 0.5,		// Zoom or scale of the canvas
		},
		'guides': {
			'leftgroup_xmax': {'type':'vertical', 'location':0, 'name':'left group', 'color':'rgb(255,0,255)'},
			'rightgroup_xmin': {'type':'vertical', 'location':0, 'name':'right group', 'color':'rgb(255,0,255)'}
		},

		// page: test drive
		'testdrive': {
			'ctx': false,
			'canvas': false,
			'sampletext': '',
			'fontscale': 100,
			'fontsize': 100,
			'linegap': false,
			'padsize': 0,
			'showglyphbox': false,
			'showhorizontals': false
		},

		// page: import svg
		'importsvg': {
			'scale': true,
			'move': true,
			'ascender': false,
			'capheight': false,
			'descender': false,
			'overshoot_top': false,
			'overshoot_bottom': false,
			'svgcode': false
		},

		// page: openproject
		'droppedFileContent': false,
		'importingfont': false,
		'overflowcount': 326,
		'spinning': true,
		'importrange': {
			'begin': 0x0020,
			'end': 0x024F
		},

		// page: export font
		'fontmetrics': {
			'numglyphs': 0,
			'maxglyph': 0x20,
			'maxes': {
				'xmax': -999999,
				'xmin': 999999,
				'ymax': -999999,
				'ymin': 999999
			}
		},
		'unique': ' ',
		'notdefglyphshapes': '[{"objtype":"shape","name":"Outer Phi Rectangle","path":{"objtype":"path","pathpoints":[{"objtype":"pathpoint","P":{"objtype":"coord","x":0,"y":700,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":432,"y":700,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":432,"y":0,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":0,"y":0,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false}],"winding":-4,"maxes":{"xmax":432,"xmin":0,"ymax":700,"ymin":0}},"visible":true,"xlock":false,"ylock":false,"wlock":false,"hlock":false,"ratiolock":false},{"objtype":"shape","name":"Inner Phi Rectangle","path":{"objtype":"path","pathpoints":[{"objtype":"pathpoint","P":{"objtype":"coord","x":50,"y":50,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":382,"y":50,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":382,"y":650,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":50,"y":650,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false}],"winding":4,"maxes":{"xmax":382,"xmin":50,"ymax":650,"ymin":50}},"visible":true,"xlock":false,"ylock":false,"wlock":false,"hlock":false,"ratiolock":false}]',

		// page: font settings
		'metadatahelp': {
			'font_family': '',
			'font_style': 'regular, italic, oblique',
			'font_variant': 'normal, small-caps',
			'font_weight': 'normal, bold, or a number 100-900',
			'font_stretch': 'normal, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded',
			'panose_1': 'Uses ten digits to describe the font\'s visual style.  A good overview can be found here: <a href="http://www.monotype.com/services/pan2" target="_blank">monotype.com/services/pan2</a>.',
			'stemv': 'Average measurement of vertical stems.',
			'stemh': 'Average measurement of horizontal stems.',
			'slope': 'If italic, this is the slant angle, measured counterclockwise from vertical. Or zero for non-italic fonts.',
			'underline_position': '',
			'underline_thickness': '',
			'strikethrough_position': '',
			'strikethrough_thickness': '',
			'overline_position': '',
			'overline_thickness': '',
			'designer': '',
			'designerURL': '',
			'manufacturer': '',
			'manufacturerURL': '',
			'license': '',
			'licenseURL': '',
			'version': 'Like: Version 0.1',
			'description': '',
			'copyright': '',
			'trademark': ''
		}
	};

	_UI.colors.text_dark = _UI.colors.gray.l10;
	_UI.colors.text_light = _UI.colors.gray.l80;
	_UI.colors.button_disabled = _UI.colors.gray.l40;
	_UI.colors.button_resting = _UI.colors.gray.l80;
	_UI.colors.button_selected = _UI.colors.blue.l65;

//------------------------------
// GLOBAL PROJECT VARIABLES
//------------------------------
// These ARE saved with the project

	var _GP = {};

// end of file