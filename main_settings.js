		
//------------------------------
// GLOBAL VARIABLES AND SETTINGS
//------------------------------

	// global Glyphr project variable
	var _G = {
		"fontsettings" : {},
		"projectsettings" : { "debug" : true },
		"fontchars" : {},
		"seedshapes" : {}
	};

	// Global UI state variables
	var uistate = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npNav",
		"thisGlyphrStudioVersion" : "Beta 3 Working Edition - 0.3.2013.12.00.Working",
		"colors" : {
			"accent" : "rgb(40,170,255)",		//os accent base color  
			"accent_light" : "rgb(150,225,255)",	//os light accent base color
			// Grays
			"offwhite" : "rgb(250,252,255)",	// Off White
			"g9" : "rgb(229,234,239)",			// 90% gray
			"g8" : "rgb(204,209,214)",			// 80% gray
			"g7" : "rgb(178,183,188)",			// 70% gray
			"g6" : "rgb(153,158,163)",			// 60% gray
			"g5" : "rgb(127,134,137)",			// 50% gray
			"g4" : "rgb(102,107,112)",			// 40% gray
			"g3" : "rgb(76,81,86)",				// 30% gray
			"g2" : "rgb(51,56,61)",				// 20% gray
			"g1" : "rgb(25,30,35)"				// 10% gray
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




/*
	Actual Grays

	// Grays
	"offwhite" : "rgb(250,250,250)",	// Off White
	"g9" : "rgb(229,229,229)",			// 90% gray
	"g8" : "rgb(204,204,204)",			// 80% gray
	"g7" : "rgb(178,178,178)",			// 70% gray
	"g6" : "rgb(153,153,153)",			// 60% gray
	"g5" : "rgb(127,127,127)",			// 50% gray
	"g4" : "rgb(102,102,102)",			// 40% gray
	"g3" : "rgb(76,76,76)",				// 30% gray
	"g2" : "rgb(51,51,51)",				// 20% gray
	"g1" : "rgb(25,25,25)",				// 10% gray
*/