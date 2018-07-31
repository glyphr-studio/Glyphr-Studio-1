 // start of file
/**
	Page > Global Actions
	This page has actions that can be taken
	on all glyphs in the project at once.
**/


	function loadPage_globalactions(){
		// debug("LOADING PAGE >> loadPage_globalactions");
		var ps = _GP.projectsettings;

		var con = '<h1 class="pagetitle">Global Actions</h1><div class="pagecontent textpage">';

		con += 'This page contains actions that affect many glyphs at once.  Actions taken here '+
				'will not carry forward to glyphs that haven\'t been created yet.';

        // Move
        con += '<h1>Move all glyphs</h1>';
        con += 'Given a positive or negative X and/or Y value, all the glyphs in this font will have their '+
                'position updated by the specified number of Em units.';
        con += '<div class="effect">Individual Glyphs, Ligatures, and Components will be moved.  To avoid double-moving '+
                'Component Instances (since they inherit position from Components) this algorithm will actually look into '+
                'each Glyph or Ligature or Component and move each shape the specified X/Y amount as long as that shape is '+
                'not a Component Instance.</div>';
        con += '<table class="settingstable">';
        con += '<tr><td>X move: &nbsp;</td><td><input id="movex" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
        con += '<tr><td>Y move: &nbsp;</td><td><input id="movey" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
        con += '</table>';
        con += '<button class="buttonsel commit" onclick="updateAllGlyphPositions();">Move all glyphs</button>';
        con += '<hr>';
        
		// Monospace
		con += '<h1>Monospace Font</h1>';
		con += 'Monospace fonts are fonts where each glyph has the same width.  This is useful for '+
        'coding fonts, and fonts used for textual output.';
		con += '<div class="effect">Each ligature and glyph\'s Auto Width property will be set to false, and it\'s '+
                'width property will be set to the number provided.</div>';
        con += '<table class="settingstable">';
        con += '<tr><td>Glyph Width: &nbsp; <input id="monospacewidth" type="number" value="500"></td><td><span class="unit">(em units)</span></td></tr>';
        con += '</table>';
		con += '<button class="buttonsel commit" onclick="convertProjectToMonospace();">Convert project to Monospace</button>';
		con += '<hr>';

		// All Caps
		con += '<h1>All Caps Font</h1>';
		con += 'All Caps fonts have no lowercase letters.  To make things easy, the lowercase letters '+
				'in these fonts contain duplicates of their uppercase form.';
		con += '<div class="effect">Capital letters will be added as Component Instances to their lowercase '+
				'counterparts.</div>';
		con += '<button class="buttonsel commit" onclick="convertProjectToAllCaps();">Convert project to All Caps</button>';
		con += '<hr>';

		// Diacriticals
		con += '<h1>Diacritical Glyph Generator</h1>';
		con += 'The Latin Supplement character range is mostly made up of diacritical glyphs.  These are basically normal '+
				'Latin glyphs, with accents.  Since most of the accents exist as stand-alone glyphs themselves, diacritical '+
				'glyphs are easy to create from merging two existing glyphs from the basic Latin character range.';
		con += '<div class="effect">The Latin Supplement character range will be enabled, and diacritical glyphs will be assembled '+
				'as Component Instances from their respective glyphs.</div>';
		con += '<button class="buttonsel commit" onclick="generateDiacriticals();">Generate Diacritical Glyphs</button>';
		con += '<hr>';


		// Suggestions
		con += '<h1>Suggestions?</h1>';
		con += 'Have an idea for a new global action?  They are easy for us to add - email your idea to '+
				'<a href="mailto:mail@glyphrstudio.com">mail@glyphrstudio.com</a>.';

		con += '</div>';

		getEditDocument().getElementById('mainwrapper').innerHTML = con;
	}



	//  ------------------
	//	Action Functions
	//	------------------

    function updateAllGlyphPositions() {
        var movex = document.getElementById('movex').value;
        var movey = document.getElementById('movey').value;

        movex = parseFloat(movex) || 0;
        movey = parseFloat(movey) || 0;

        glyphIterator({
            title: 'Moving glyph',
            action: function(glyph){
                if(!glyph.shapes || !glyph.shapes.length) return;
                var shape;
                for(var s=0; s<glyph.shapes.length; s++){
                    shape = glyph.shapes[s];
                    if(shape.objtype !== 'componentinstance') {
                        shape.updateShapePosition(movex, movey, true);
                        glyph.changed(true, true);
                    }
                }
            }
        });
    }

	function convertProjectToMonospace() {
		var gwidth = document.getElementById('monospacewidth').value;

		glyphIterator({
			title: 'Converting to Monospace',
			filter: function(glyphid){ 
				var gtype = getGlyphType(glyphid);
				return gtype === 'glyph' || gtype === 'ligature';
			},
			action: function(glyph){
				glyph.isautowide = false;
				glyph.glyphwidth = gwidth;
			}
		});
	}

	function convertProjectToAllCaps() {
		var copyGlyphAttributes = { srcAutoWidth: true, srcWidth: true, srcLSB: true, srcRSB: true };
		
		glyphIterator({
			title: 'Converting to All Caps',
			filter: {begin: 0x0041, end: 0x005A},
			action: function(glyph, glyphid){
				var destinationGlyphID = ''+decToHex(parseInt(glyphid, 16) + 32);
				insertComponentInstance(glyphid, destinationGlyphID, copyGlyphAttributes);
            }
        });
        
        _UI.history['glyph edit'].put('Convert project to All Caps');
	}

	function generateDiacriticals() {
		
		var latext = [
			{dest:'0x00C0', src: ['0x0041', '0x0060']},
			{dest:'0x00C1', src: ['0x0041', '0x00B4']},
			{dest:'0x00C2', src: ['0x0041', '0x005E']},
			{dest:'0x00C3', src: ['0x0041', '0x007E']},
			{dest:'0x00C4', src: ['0x0041', '0x00A8']},
			{dest:'0x00C5', src: ['0x0041', '0x00B0']},
			{dest:'0x00C6', src: ['0x0041', '0x0045']},
			{dest:'0x00C7', src: ['0x0043', '0x00B8']},
			{dest:'0x00C8', src: ['0x0045', '0x0060']},
			{dest:'0x00C9', src: ['0x0045', '0x00B4']},
			{dest:'0x00CA', src: ['0x0045', '0x005E']},
			{dest:'0x00CB', src: ['0x0045', '0x00A8']},
			{dest:'0x00CC', src: ['0x0049', '0x0060']},
			{dest:'0x00CD', src: ['0x0049', '0x00B4']},
			{dest:'0x00CE', src: ['0x0049', '0x005E']},
			{dest:'0x00CF', src: ['0x0049', '0x00A8']},
			{dest:'0x00D0', src: ['0x0044', '0x002D']},
			{dest:'0x00D1', src: ['0x004E', '0x007E']},
			{dest:'0x00D2', src: ['0x004F', '0x0060']},
			{dest:'0x00D3', src: ['0x004F', '0x00B4']},
			{dest:'0x00D4', src: ['0x004F', '0x005E']},
			{dest:'0x00D5', src: ['0x004F', '0x007E']},
			{dest:'0x00D6', src: ['0x004F', '0x00A8']},
			// '0x00D7': 'Multiplication sign',
			{dest:'0x00D8', src: ['0x004F', '0x002F']},
			{dest:'0x00D9', src: ['0x0055', '0x0060']},
			{dest:'0x00DA', src: ['0x0055', '0x00B4']},
			{dest:'0x00DB', src: ['0x0055', '0x005E']},
			{dest:'0x00DC', src: ['0x0055', '0x00A8']},
			{dest:'0x00DD', src: ['0x0059', '0x00B4']},
			// '0x00DE': 'Latin Capital Letter Thorn',
			// '0x00DF': 'Latin Small Letter sharp S',
			{dest:'0x00E0', src: ['0x0061', '0x0060']},
			{dest:'0x00E1', src: ['0x0061', '0x00B4']},
			{dest:'0x00E2', src: ['0x0061', '0x005E']},
			{dest:'0x00E3', src: ['0x0061', '0x007E']},
			{dest:'0x00E4', src: ['0x0061', '0x00A8']},
			{dest:'0x00E5', src: ['0x0061', '0x00B0']},
			{dest:'0x00E6', src: ['0x0061', '0x0065']},
			{dest:'0x00E7', src: ['0x0063', '0x00B8']},
			{dest:'0x00E8', src: ['0x0065', '0x0060']},
			{dest:'0x00E9', src: ['0x0065', '0x00B4']},
			{dest:'0x00EA', src: ['0x0065', '0x005E']},
			{dest:'0x00EB', src: ['0x0065', '0x00A8']},
			{dest:'0x00EC', src: ['0x0069', '0x0060']},
			{dest:'0x00ED', src: ['0x0069', '0x00B4']},
			{dest:'0x00EE', src: ['0x0069', '0x005E']},
			{dest:'0x00EF', src: ['0x0069', '0x00A8']},
			{dest:'0x00F0', src: ['0x0064', '0x00B4']},
			{dest:'0x00F1', src: ['0x006E', '0x007E']},
			{dest:'0x00F2', src: ['0x006F', '0x0060']},
			{dest:'0x00F3', src: ['0x006F', '0x00B4']},
			{dest:'0x00F4', src: ['0x006F', '0x005E']},
			{dest:'0x00F5', src: ['0x006F', '0x007E']},
			{dest:'0x00F6', src: ['0x006F', '0x00A8']},
			// '0x00F7': 'Division sign',
			{dest:'0x00F8', src: ['0x006F', '0x002F']},
			{dest:'0x00F9', src: ['0x0075', '0x0060']},
			{dest:'0x00FA', src: ['0x0075', '0x00B4']},
			{dest:'0x00FB', src: ['0x0075', '0x005E']},
			{dest:'0x00FC', src: ['0x0075', '0x00A8']},
			{dest:'0x00FD', src: ['0x0079', '0x00B4']},
			// '0x00FE': 'Latin Small Letter Thorn',
			{dest:'0x00FF', src: ['0x0079', '0x00A8']}
		];

		var copyGlyphAttributes = { srcAutoWidth: true, srcWidth: true, srcLSB: true, srcRSB: true };
		var currset;
        var currglyphnum = 0;
        var didstuff = false;

		function doOneGlyph() {
			currset = latext[currglyphnum];
			showToast(('Adding diacritical <br>' + currset.dest), 10000);
			
			insertComponentInstance(currset.src[0], currset.dest, copyGlyphAttributes);
            insertComponentInstance(currset.src[1], currset.dest, false);
            didstuff = true;

			if(currglyphnum < latext.length-1){
				currglyphnum++;
				setTimeout(doOneGlyph, 10);
			} else {
                showToast('Done!', 1000);
                if(didstuff) _UI.history['glyph edit'].put('Generate Diacritical glyphs');
			}
		}

		showToast('Starting to assemble Diacritical Glyphs', 10000)

		_GP.projectsettings.glyphrange.latinsupplement = true;

		setTimeout(doOneGlyph, 500);
	}


	//	------------------
	//	Glyph Iterator
	//	------------------

	function glyphIterator(oa) {
		// debug('\n glyphIterator - START');
		// debug('\t passed:\n ' + json(oa));

		var glyphlist = [];
		var currglyphnum = 0;
		var title = oa.title || 'Iterating on Glyph';
		var filter = oa.filter || function(){ return true; };
		var currglyph, currglyphid;


		// Translate range notation to filter function
		if(oa.filter && oa.filter.begin && oa.filter.end){
			var begin = parseInt(oa.filter.begin);
			var end = parseInt(oa.filter.end);
			var gint;

			function rangefilter(glyphid){
				if(getGlyphType(glyphid) === 'glyph'){
					gint = parseInt(glyphid, 16);
					return ((gint >= begin) && (gint <= end));
				} else {
					return false;
				}
			}
			
			filter = rangefilter; 
		}


		// Functions

		function doOneGlyph() {
			// debug('\n doOneGlyph - START');
			// debug(`\t currglyphnum: ${currglyphnum}`);

			currglyphid = glyphlist[currglyphnum];
			currglyph = getGlyph(currglyphid, true);
			// debug(`\t Got glyph: ${currglyph.name}`);
			
			showToast((title + '<br>' + currglyph.getName()), 10000);
			
			oa.action(currglyph, currglyphid);

			if(currglyphnum < glyphlist.length-1){
				currglyphnum++;
				setTimeout(doOneGlyph, 10);
			} else {
                showToast((title + '<br>Done!'), 1000);
			}
		}

		function makeGlyphList() {
			// Components
			for(var com in _GP.components){ 
				if(_GP.components.hasOwnProperty(com)){
					if(filter(com)) glyphlist.push(com);
				}
			}

			// Ligatures
			for(var lig in _GP.ligatures){ 
				if(_GP.ligatures.hasOwnProperty(lig)){
					if(filter(lig)) glyphlist.push(lig);
				}
			}

			// Glyphs
			for(var gly in _GP.glyphs){ 
				if(_GP.glyphs.hasOwnProperty(gly)){
					if(filter(gly)) glyphlist.push(gly);
				}
			}

			// debug('\t glyph list');
			// debug(glyphlist);

			// Kick off the process
			setTimeout(doOneGlyph, 10);
		}


		// Do Stuff

		showToast((title + '<br>Starting...'), 10000);
		setTimeout(makeGlyphList, 500);
	}


// end of file