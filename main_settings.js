		
//------------------------------
// GLOBAL UI VARIABLES
//------------------------------
// These are NOT SAVED with the project

	var _UI = {
		// all pages
		"navhere" : "firstrun",
		"navprimaryhere" : "npChar",
		"thisGlyphrStudioVersion" : "Beta 3 Working Edition - 0.3.2014.1.00.Working",
		"projectsaved": true,
		"colors" : {
			"accent" :		"rgb(0,170,225)",	//os accent base color  
			"accent_light": "rgb(165,222,240)",	//os light accent base color
			"offwhite" :	"rgb(250,252,255)",	// Off White
			"g9" :			"rgb(229,234,239)",	// 90% gray
			"g8" :			"rgb(204,209,214)",	// 80% gray
			"g7" :			"rgb(178,183,188)",	// 70% gray
			"g6" :			"rgb(153,158,163)",	// 60% gray
			"g5" :			"rgb(127,134,137)",	// 50% gray
			"g4" :			"rgb(102,107,112)",	// 40% gray
			"g3" :			"rgb(76,81,86)",	// 30% gray
			"g2" :			"rgb(51,56,61)",	// 20% gray
			"g1" :			"rgb(25,30,35)"		// 10% gray
		},

		// Shared edit pages
		"selectedtool" : "pathedit",	// pathedit, shapemove, pantool, newrect, newoval, newpath	
		"redrawing" : false,
		"thumbsize" : 50,
		"thumbgutter" : 5,
		"showgrid" : true,		// display the grid
		"showguides" : true,		// display guides
		"clipboardshape" : false,
		"chareditcanvas" : false,
		"chareditcanvassize" : 1600, 			// How big the viewport canvas is
		"chareditctx" : false,
		"ishereghostcanvas" : false, 
		"ishereghostctx" : false,
		"defaultview" : {
			"dx" : 200,		// X offset for the canvas origin
			"dy" : 500,		// Y offset for the canvas origin
			"dz" : .5,		// Zoom or scale of the canvas
		},
		"views" : {},	// Holds the unique views per char & linkedshape
		"thumbview" : {},

		// page: linked shapes
		"shownlinkedshape" : "id0",
		"linkedshapecurrstate" : {},
		"linkedshapeundoq" : [],
		
		// page: charedit
		"selectedchar" : 97,
		"selectedshape" : -1,
		"charundoq" : [],
		"charcurrstate" : {},
		"selectchardrawarr" : [],
		"showrightline" : true,	
		"shapelayers" : [],
		"debugpoints" : [false,false],
		"locid": 0,
		"locarr": [],
		"checkid": 0,
		"checkarr": [],
	
		// page: test drive
		"testdrivectx" : false,
		"testdrivecanvas" : false,
		"testdrive_fontscale" : 0,
		"testdrive_showcharbox" : false,
		"testdrive_showhorizontals" : false,
		"testdrive_padsize" : 10,



		// default project properties
		// These WILL BE saved with the project, but stored in the global _GP variable
		"default_GP" : {
			"projectsettings": {
				"name": "My Font",
				"debug": true,				// global debug console switch
				"version": 0,				// console version
				"linkedshapecounter": 0,	// private counter for ss id
				
				// Grid stuff
				"upm": 1000,			// Units Per Em - (emsize) how tall normal cap letters are		
				"ascent": 700,			// ascender
				"linegap": 250,
				"griddivisions": 10,	// how many squares of grid per emsize
				"xheight": 400,			// lowercase letter height
				"overshoot": 10,		// overshoot for round glyphs
				"defaultlsb": 5,		// default left space

				// UI stuff
				"pointsize" : 5,						// square points size - SHOULD BE ODD	
				"spinnervaluechange" : 1,				// how much spinner controls change a value
				"stoppagenavigation" : false,			// asks to save on window close or refresh
				"quickpathupdating" : false,			// does not redraw path while drag resizing
				"showoutline" : false,					// outline shapes when drawing
				"showfill" : true,						// fill shapes when drawing
				"color_glyphfill" : "rgb(0,0,0)",		//shape base color
				"color_glyphoutline" : "rgb(0,0,0)",	//shape outline color
				"color_grid" : "rgb(240,240,240)",		//grid base color
				"color_guideline" : "rgb(204,79,34)"	//guide base color
			},

			"fontchars" : [],

			"linkedshapes" : {},

			"opentypeproperties" : {
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
	};

	_UI.colors.text_dark = _UI.colors.g1;
	_UI.colors.text_light = _UI.colors.g8;
	_UI.colors.button_disabled = _UI.colors.g4;
	_UI.colors.button_resting = _UI.colors.g8;
	_UI.colors.button_selected = _UI.colors.accent;

		
//------------------------------
// GLOBAL PROJECT VARIABLES
//------------------------------
// These ARE saved with the project

	var _GP = {};
	
	function setOTprop(tname, tkey, tval){
		if(_GP.opentypeproperties[tname]){
			var ot = _GP.opentypeproperties[tname];
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
		if(_GP.opentypeproperties[tname]){
			var ot = _GP.opentypeproperties[tname];
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