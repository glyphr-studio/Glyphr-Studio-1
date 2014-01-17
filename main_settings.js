		
//------------------------------
// GLOBAL UI VARIABLES
//------------------------------
// These are NOT SAVED with the project

	var uistate = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npNav",
		"thisGlyphrStudioVersion" : "Beta 3 Working Edition - 0.3.2014.1.00.Working",
		"projectsaved": true,
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

		// page: linked shapes
		"shownlinkedshape" : "id0",
		"linkedshapecurrstate" : {},
		"linkedshapeundoq" : [],

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
		"layerthumbsize" : 50,
		"layerthumbgutter" : 5,
		
		// Char Edit Canvas 
		"chareditcanvassettings" : {
			"size" : 1600, 			// How big the canvas is
			"originx" : 200,		// Where on the canvas the origin is
			"originy" : 500,		// Where on the canvas the origin is
			"zoom" : .5,			// Either reduces or increases objects size
			"showgrid" : true,		// display the grid
			"showguides" : true		// display guides
		}, 
		"defaultchareditcanvassettings" : {
			"originx" : 200,
			"originy" : 500,
			"zoom" : .5
		},

		// page: test drive
		"testdrivectx" : false,
		"testdrivecanvas" : false,

		// default open type settings
		"defaultopentypeproperties" : {
			"head" : [
				{"key": "created", "val": "" },
				{"key": "fontRevision", "val": "1.0" }
			],
			"os_2": [
				{"key": "usWeightClass", "val": "500"},
				{"key": "usWidthClass", "val": "5"}
			],
			"name": [
				{"key": "Copyright notice", "val": ("Copyright " + new Date().getFullYear())},
				{"key": "Font Family name", "val": "My Font"},
				{"key": "Font Subfamily name", "val": ""},
				{"key": "Unique font identifier", "val": "My Font 1.0"},
				{"key": "Full Font name", "val": "My Font"},
				{"key": "Version string", "val": "Version 1.0"},
				{"key": "Postscript name", "val": "My Font"},
				null,
				{"key": "Manufacturer name", "val": ""},
				{"key": "Designer's name", "val": ""},
				{"key": "Description", "val": ""},
				{"key": "Vendor URL", "val": ""},
				{"key": "Designer's URL", "val": ""},
				{"key": "License Description", "val": "Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)"},
				{"key": "License URL", "val": "http://creativecommons.org/licenses/by-sa/3.0/"}
			],
			"post": [
				{"key": "italicAngle", "val": "0.0"},
				{"key": "underlinePosition", "val": "-75"},
				{"key": "underlineThickness", "val": "50"}
			],
			"cff": [
				{"key": "Notice", "val": ""},
				{"key": "FullName", "val": "My Font"},
				{"key": "FamilyName", "val": "My Font"},
				{"key": "Weight", "val": "500"},
			]
		}
	}

	uistate.colors.text_dark = uistate.colors.g1;
	uistate.colors.text_light = uistate.colors.g8;
	uistate.colors.button_disabled = uistate.colors.g4;
	uistate.colors.button_resting = uistate.colors.g8;
	uistate.colors.button_selected = uistate.colors.accent;

		
//------------------------------
// GLOBAL PROJECT VARIABLES
//------------------------------
// These ARE saved with the project

	var _G = {
		"projectsettings": {
			"name": "My Font",
			"debug": true,				// global debug console switch
			"version": uistate.thisGlyphrStudioVersion,	// console version
			"linkedshapecounter": 0,		// private counter for ss id
			
			// Grid stuff
			"upm": 1000,			// Units Per Em - (emsize) how tall normal cap letters are		
			"ascent": 700,			// ascender
			"linegap": 250,
			"griddivisions": 10,	// how many squares of grid per emsize
			"xheight": 400,			// lowercase letter height
			"overshoot": 10,			// overshoot for round glyphs
			"defaultlsb": 40,		// default kerning

			// UI stuff
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
		},

		"opentypeproperties" : {},

		"fontchars" : {},

		"linkedshapes" : {}
	};

	
	function setOTprop(tname, tkey, tval){
		if(_G.opentypeproperties[tname]){
			var ot = _G.opentypeproperties[tname];
			for(var i=0; i<ot.length; i++){
				//debug("SETOTPROP: checking " + ot[i].key + " == " + tkey);
				if(ot[i].key == tkey) {
					ot[i].val = tval; 
					return;
				}
			}
			console.log("SETOTPROP ERROR: could not find " + tkey + " in " + tname);
		} else {
			console.log("SETOTPROP ERROR: could not find table" + tname);
		}
	}

	function getOTprop(tname, tkey){
		if(_G.opentypeproperties[tname]){
			var ot = _G.opentypeproperties[tname];
			for(var i=0; i<ot.length; i++){
				//debug("SETOTPROP: checking " + ot[i].key + " == " + tkey);
				if(ot[i].key == tkey) {
					return ot[i].val;
				}
			}
			console.log("GETOTPROP ERROR: could not find " + tkey + " in " + tname);
		} else {
			console.log("GETOTPROP ERROR: could not find table" + tname);
		}

		return "|| RETURN VALUE ERROR ||";
	}

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