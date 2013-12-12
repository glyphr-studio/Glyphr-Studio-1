		
//------------------------------
// GLOBAL VARIABLES AND SETTINGS
//------------------------------
	var DEBUG = true;
	var GlyphrProject = {};


	var uistate = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npNav",
		"thisGlyphrStudioVersion" : "Beta 2.1 Working Edition - 0.2.2013.12.00.Working",
		"colors" : {
			"accent" : "rgb(40,170,255)",		//os accent base color  
			"accent_light" : "rgb(0,170,255)",	//os light accent base color
			// Grays
			"offwhite" : "rgb(250,250,250)",	// rgb(250,250,250)		Off White
			"g9" : "rgb(229,229,229)",			// rgb(229,229,229)		90% gray
			"g8" : "rgb(204,204,204)",			// rgb(204,204,204)		80% gray
			"g7" : "rgb(178,178,178)",			// rgb(178,178,178)		70% gray
			"g6" : "rgb(153,153,153)",			// rgb(153,153,153)		60% gray
			"g5" : "rgb(127,127,127)",			// #7F7F7F		50% gray
			"g4" : "rgb(102,102,102)",			// rgb(102,102,102)		40% gray
			"g3" : "rgb(76,76,76)",				// rgb(76,76,76)		30% gray
			"g2" : "rgb(51,51,51)",				// rgb(51,51,51)		20% gray
			"g1" : "rgb(25,25,25)",				// rgb(25,25,25)		10% gray
			"offblack" : "rgb(5,5,5)"			//
		},

		// page: seed shapes
		"shownseedshape" : "id0",
		"seedcurrstate" : {},
		"seedundoq" : [],

		// page: charedit
		"charundoq" : [],
		"charcurrstate" : {},
		"clipboardshape" : false,
		"chareditcanvas" : false,
		"chareditctx" : false, 
		"calcmaxesghostcanvas" : false, 
		"calcmaxesghostctx" : false, 
		"ishereghostcanvas" : false, 
		"ishereghostctx" : false,
		"showrightline" : true,	
		"shapelayers" : [],
		"selectedshape" : -1,
		"selectedchar" : 97,
		"selectedtool" : "pathedit",	// pathedit, shapemove, pantool, newrect, newoval, newpath	
		"debugpoints" : [false,false],
		
		// Char Edit Canvas Area and Calc Maxes Ghost Canvas
		"calcmaxesghostcanvassettings" : {
			"size" : 1500,
			"originx" : 140,
			"originy" : 740
		},

		"chareditcanvassettings" : {
			"size" : 1500, 			// How big the canvas is
			"originx" : 140,		// Where on the canvas the origin is
			"originy" : 740,		// Where on the canvas the origin is
			"zoom" : .32,			// Either reduces or increases objects size
			"showgrid" : true,		// display the grid
			"showguides" : true		// display guides
		},

		// page: test drive
		"testdrivectx" : false,
		"testdrivecanvas" : false
	}

	uistate.colors.text_dark = uistate.colors.g1;
	uistate.colors.text_light = uistate.colors.g8;
	uistate.colors.button_disabled = uistate.colors.g4;
	uistate.colors.button_resting = uistate.colors.g8;
	uistate.colors.button_selected = uistate.colors.accent;


	var uisettings = {
		"pointsize" : 5,			// square points size - SHOULD BE ODD	
		"spinnervaluechange" : 1,	// how much spinner controls change a value
		"stoppagenavigation" : false,	// asks to save on window close or refresh
		"quickpathupdating" : true,		// does not redraw path while drag resizing
		"showoutline" : false,			// outline shapes when drawing
		"showfill" : true,				// fill shapes when drawing
		"color_glyphfill" : "rgb(0,0,0)",		//shape base color
		"color_glyphoutline" : "rgb(0,0,0)",	//shape outline color
		"color_grid" : "rgb(240,240,240)",		//grid base color
		"color_guideline" : "rgb(204,79,34)"	//guide base color
	}


