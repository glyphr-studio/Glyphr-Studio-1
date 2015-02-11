// start of file

//------------------------------
// GLOBAL UI VARIABLES
//------------------------------
// These are NOT SAVED with the project

	var _UI = {
		// Internal Dev Stuff
		'devmode': true,		// global switch for all the stuff below
		'debug': true,			// show messages sent to the browser console
		'loadsampleproject': true,	// if sampleproject is present, load it and skip open project experience
		'devnav': 'export font',		// navigate straight to a page
		'devnavprimary': false, // navigate straight to a panel
		'devselectedshape': false, // automatically select a shape
		// SelectedChar

		// all pages
		'navhere': 'firstrun',
		'navprimaryhere': 'npChooser',
		'thisGlyphrStudioVersion': 'Version 1 (pre-release)',
		'thisGlyphrStudioVersionNum': '1.00.00-alpha',
		'projectsaved': true,
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
				'l50': 'rgb(127,134,137)',
				'l40': 'rgb(102,107,112)',
				'l30': 'rgb(76,81,86)',
				'l20': 'rgb(51,56,61)',
				'l10': 'rgb(25,30,35)'			// DARKER
			},

			// RED FOR ERROR
			'error': {
				'light': 'rgb(240,210,215)',	// os red warning color light
				'medium': 'rgb(240,15,54 )',	// os red warning color
				'dark': 'rgb(105,45,55)'	// os red warning color dark
			}
		},

		// Shared edit pages
		'popout': false,
		'selectedtool': 'pathedit',	// pathedit, pathaddpoint, shaperesize, pan, newrect, newoval, newpath
		'focuselement': false,
		'redrawing': false,
		'thumbsize': 50,
		'thumbgutter': 5,
		'showgrid': true,		// display the grid
		'showguides': true,		// display guides
		'showguidelabels': true,// display guide labels
		'showovershoots': true,	// display overshoot guides
		'clipboardshape': false,
		'chareditcanvas': false,
		'chareditcanvassize': 2000,	// How big the viewport canvas is
		'chareditctx': false,
		'ishereghostcanvas': false,
		'ishereghostctx': false,
		'defaultview': {
			'dx': 200,		// X offset for the canvas origin
			'dy': 500,		// Y offset for the canvas origin
			'dz': 0.5,		// Zoom or scale of the canvas
		},
		'views': {},		// Holds the unique views per char & linkedshape
		'thumbview': {},
		'mins': {
			'xmax': -999999,
			'xmin': 999999,
			'ymax': -999999,
			'ymin': 999999
		},
		'history': {},

		// page: charedit
		'selectedchar': false,	// f is 0x0066
		'selectedshape': -1,
		'shapelayers': [],

		// page: linked shapes
		'selectedlinkedshape': false,

		// page: kerning
		'selectedkern': 'kern0',
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
			'showcharbox': false,
			'showhorizontals': false
		},

		// page: import svg
		'importsvg': {
			'scale': false,
			'move': false,
			'ascender': false,
			'capheight': false,
			'descender': false,
			'overshoot_top': false,
			'overshoot_bottom': false,
			'svgcode': false
		},

		// page: firstrun
		'droppedFileContent': false,
		'spinning': true,
		'importrange': {
			'begin': 0x0020,
			'end': 0x024F
		},

		// page: export font
		'fontmetrics': {
			'numchars': 0,
			'maxchar': 0x20,
			'maxes': {
				'xmax': -999999,
				'xmin': 999999,
				'ymax': -999999,
				'ymin': 999999
			}
		},

		// page: font settings
		'metadatahelp': {
			'font_family': '',
			'font_style': 'normal, italic, oblique',
			'font_variant': 'normal, small-caps',
			'font_weight': 'normal, bold, or a number 100-900',
			'font_stretch': 'normal, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded',
			'panose_1': 'Uses ten digits to describe the font\'s visual style.  A good overview can be found here: <a href="http://www.monotype.com/services/pan2" target=_new>monotype.com/services/pan2</a>.',
			'stemv': 'Average measurement of vertical stems.',
			'stemh': 'Average measurement of horizontal stems.',
			'slope': 'If italic, this is the slant angle, measured counterclockwise from vertical. Or zero for non-italic fonts.',
			'underline_position': '',
			'underline_thickness': '',
			'strikethrough_position': '',
			'strikethrough_thickness': '',
			'overline_position': '',
			'overline_thickness': ''
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