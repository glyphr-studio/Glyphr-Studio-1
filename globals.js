		
//-------------------
// GLOBAL VARIABLES AND SETTINGS
//-------------------

	var DEBUG = true;
	var GlyphrProject = {};

	var uistate = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npNav",
		"thisGlyphrStudioVersion" : "Beta 2.1 Working Edition - 0.2.2013.12.00.Working",
		"colors" : {
			"accent" : "#00aaff",	//os accent base color  
			"accent_light" : "rgb(0,170,255)",
			"text_dark" : "#191919",		//os text color
			"text_light" : "#CCCCCC",	//os light text
			"background" : "#4C4C4C",			//os background color
			"button_disabled" : "rgb(102,102,102)",
			"button_resting" : "#CCCCCC",
			"button_selected" : "#00aaff"
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

	var uisettings = {
		"pointsize" : 5,			// square points size - SHOULD BE ODD	
		"spinnervaluechange" : 1,	// how much spinner controls change a value
		"decplaces" : 4,			// how many decimal places of precision
		"stoppagenavigation" : false,	// asks to save on window close or refresh
		"quickpathupdating" : true,		// does not redraw path while drag resizing
		"color_glyphfill" : "#000000",		//shape base color
		"color_grid" : "rgb(240,240,240)",	//grid base color
		"color_guideline" : "#CC4F22"		//guide base color
	}


