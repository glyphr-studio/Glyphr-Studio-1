function GlyphrProject(){

	// Default settings for new Glyphr Projects

	this.projectsettings = {
		"name": "My Font",
		"version": 0,				// console version
		"linkedshapecounter": 0,	// private counter for ss id
		"charrange": {
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
		"xheight": 400,			// lowercase letter height
		"linegap": 250,
		"griddivisions": 10,	// how many squares of grid per emsize
		"overshoot": 10,		// overshoot for round glyphs
		"defaultlsb": 10,		// default left space

		// UI stuff
		"pointsize" : 5,						// square points size - SHOULD BE ODD
		"spinnervaluechange" : 1,				// how much spinner controls change a value
		"showkeyboardtipsicon" : true,
		"stoppagenavigation" : false,			// asks to save on window close or refresh
		"quickpathupdating" : false,			// does not redraw path while drag resizing
		"showoutline" : false,					// outline shapes when drawing
		"showfill" : true,						// fill shapes when drawing
		"color_glyphfill" : "rgb(0,0,0)",		//shape base color
		"color_glyphoutline" : "rgb(0,0,0)",	//shape outline color
		"color_grid" : "rgb(240,240,240)",		//grid base color
		"color_guideline" : "rgb(204,79,34)"	//guide base color
	};

	this.opentypeproperties = {
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
	};

	this.fontchars = {};

	this.linkedshapes = {};
}
