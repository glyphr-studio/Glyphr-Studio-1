 // start of file
/**
	Page > Global Actions
	This page has actions that can be taken
	on all glyphs in the project at once.
**/


	function loadPage_globalactions(){
		// debug("LOADING PAGE >> loadPage_globalactions");
		var ps = _GP.projectsettings;

		var content = '<h1 class="pagetitle">Global Actions</h1><div class="pagecontent textpage">';

		content += 'This page contains actions that affect many glyphs at once.  Actions taken here '+
					'will not carry forward to glyphs that haven\'t been created yet.';

		// Monospace
		content += '<h1>Monospace Font</h1>';
		content += 'Monospace fonts are fonts where each glyph has the same width.  This is useful for '+
					'coding fonts, and fonts used for textual output.';
		content += '<div class="effect">Each glyph\'s Auto Width property will be set to false, and it\'s '+
					'width property will be set to the number provided.</div>';
		content += 'Glyph Width: &nbsp; <input id="monospacewidth" type="number" value="500"><br>';
		content += '<button class="buttonsel commit" onclick="convertProjectToMonospace();">Convert project to Monospace</button>';
		content += '<hr>';

		// All Caps
		content += '<h1>All Caps Font</h1>';
		content += 'All Caps fonts have no lowercase letters.  To make things easy, the lowercase letters '+
					'in these fonts contain duplicates of their uppercase form.';
		content += '<div class="effect">Capital letters will be added as Component Instances to their lowercase '+
					'counterparts.</div>';
		content += '<button class="buttonsel commit" onclick="convertProjectToAllCaps();">Convert project to All Caps</button>';
		content += '<hr>';



		content += '<h1>Suggestions?</h1>';
		content += 'Have an idea for a new global action?  They are easy for us to add - email your idea to '+
					'<a href="mailto:mail@glyphrstudio.com">mail@glyphrstudio.com</a>.';

		content += '</div>';

		getEditDocument().getElementById('mainwrapper').innerHTML = content;
	}



	//  ------------------
	//	Action Functions
	//	------------------

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
	}


	//	------------------
	//	Glyph Iterator
	//	------------------

	function glyphIterator(oa) {
		debug('\n glyphIterator - START');
		debug('\t passed:\n ' + json(oa));

		var glyphlist = [];
		var currglyphnum = 0;
		var title = oa.title || 'Iterating on Glyph';
		var filter = oa.filter || new function(){ return true; };
		var currglyph, currglyphid;


		// Translate range notation to filter function
		if(oa.filter.begin && oa.filter.end){
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
			debug('\n doOneGlyph - START');
			debug(`\t currglyphnum: ${currglyphnum}`);

			currglyphid = glyphlist[currglyphnum];
			currglyph = getGlyph(currglyphid, true);
			debug(`\t Got glyph: ${currglyph.name}`);
			
			showToast((title + '<br>' + currglyph.getName()), 10000);
			
			oa.action(currglyph, currglyphid);

			if(currglyphnum < glyphlist.length-1){
				currglyphnum++;
				setTimeout(doOneGlyph, 10);
			} else {
				showToast((title + '<br>Done!'), 10)
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

			debug('\t glyph list');
			debug(glyphlist);

			// Kick off the process
			setTimeout(doOneGlyph, 10);
		}


		// Do Stuff

		showToast((title + '<br>Starting...'), 10000);
		setTimeout(makeGlyphList, 500);
	}


// end of file