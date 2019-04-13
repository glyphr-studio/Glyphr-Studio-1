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
				'Component Instances (since they inherit their position from Components) this algorithm will look into '+
				'each Glyph or Ligature or Component and move each shape the specified amount as long as that shape is '+
				'not a Component Instance.</div>';
		con += '<table class="settingstable">';
		con += '<tr><td>X move: &nbsp;</td><td><input id="movex" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
		con += '<tr><td>Y move: &nbsp;</td><td><input id="movey" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
		con += '</table>';
		con += '<button class="buttonsel commit" onclick="updateAllGlyphPositions();">Move all glyphs</button>';
		con += '<hr>';

		// Re-size
		con += '<h1>Re-size all glyphs</h1>';
		con += 'Given a positive or negative Width and/or Height value, all the glyphs in this font will have their '+
				'size updated by the specified number of Em units.';
		con += '<div class="effect">Individual Glyphs, Ligatures, and Components will be re-sized.  To avoid double-re-sizing '+
				'Component Instances (since they inherit their size from Components) this algorithm will look into '+
				'each Glyph or Ligature or Component and re-size each shape as long as that shape is '+
				'not a Component Instance.<br>'+
				'<b>WARNING</b>: Re-sizing component instances will almost always <b>not</b> turn out the way you want. Due to the nature '+
				'of Components and Component Instances, and their aspect ratios vs. their parent glyphs, it is impossible to do '+
				'\'the right thing\' in all cases.</div>';
		con += '<table class="settingstable">';
		con += '<tr><td>&#916; Width: &nbsp;</td><td><input id="sizew" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
		con += '<tr><td>&#916; Height: &nbsp;</td><td><input id="sizeh" type="number" value="0"></td><td><span class="unit">(em units)</span></td></tr>';
		con += '</table>';
		con += '<table class="settingstable">';
		con += '<tr><td class="uicolumn" style="width:20px;"><input id="updateglyphwidthproperty" type="checkbox" checked></td><td colspan="2" style="vertical-align:top;">Also update the glyph width property (when auto-calculate glyph width equals false)</td></tr>';
		con += '<tr><td class="uicolumn" style="width:20px;"><input id="maintainaspectratio" type="checkbox"></td><td colspan="2" style="vertical-align:top;">Maintain aspect ratio</td></tr>';
		con += '<tr><td colspan="3">If checked, the width vs. height ratio of the re-sized glyphs will remain the same.<br>';
		con += '<b>Leave either &#916; Width or &#916; Height as zero</b></td></tr>';
		con += '</table>';
		con += '<button class="buttonsel commit" onclick="updateAllGlyphSizes();">Re-size all glyphs</button>';
		con += '<hr>';
		
		// Flatten
		con += '<h1>Convert all Component Instances into Shapes</h1>';
		con += 'This will remove all links from Component Instances to their Components, and leave behind a stand-alone shape '+
				'that looks exactly like the Component Instance did.';
		con += '<div class="effect">Every shape in every Glyph, Component, and Ligature will have the \'Turn Component Instance '+
				'into a Shape\' command run on it.</div>';
		con += '<button class="buttonsel commit" onclick="flattenAllWorkItems();">Convert Component Instances to Shapes</button>';
		con += '<hr>';

		// Monospace
		con += '<h1>Monospace Font</h1>';
		con += 'Monospace fonts are fonts where each glyph has the same width.  This is useful for '+
		'coding fonts, and fonts used for textual output. The width value must be greater than zero.';
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
		con += '<div class="effect">Capital letters will be added as Component Instances to their lowercase counterparts.</div>';
		con += '<table class="settingstable">';
		con += '<tr><td><input type="checkbox" id="allcapsbasic" checked="true"/></td><td><label for="allcapsbasic">Basic Latin</label></td></tr>';
		con += '<tr><td><input type="checkbox" id="allcapssupplement"/></td><td><label for="allcapssupplement">Latin Supplement</label></td></tr>';
		con += '<tr><td><input type="checkbox" id="allcapsa"/></td><td><label for="allcapsa">Latin Extended A</label></td></tr>';
		con += '<tr><td><input type="checkbox" id="allcapsb"/></td><td><label for="allcapsb">Latin Extended B</label></td></tr>';
		con += '</table>';
		con += '<button class="buttonsel commit" onclick="convertProjectToAllCaps();">Convert project to All Caps</button>';
		con += '<hr>';

		// Diacritics
		con += '<h1>Diacritical Glyph Generator (basic)</h1>';
		con += 'The Latin Supplement character range is mostly made up of Latin-based diacritical (or accented) glyphs.  These are basically normal '+
				'Latin glyphs, with accents.  Since most of the accents exist as stand-alone glyphs themselves in the Basic Latin range, '+
				'diacritics in the Latin Supplement range are easy to create from merging two existing glyphs.';
		con += '<br><b>Please Note</b> - The diacritical glyphs that are in the Basic Latin range are usually designed to be stand-alone. '+
				'Simply combining them with base glyphs is a good start, but work will be needed to make the resulting character look nice. '+
				'The "Advanced" Diacritical Glyph Generator below takes a little more work up front, but will probably yield better results.';
		con += '<div class="effect">The Latin Supplement character range will be enabled, and diacritical glyphs will be assembled '+
				'as Component Instances from their respective glyphs in the Basic Latin range.</div>';
		con += '<button class="buttonsel commit" onclick="generateDiacriticsSimple();">Generate Diacritical Glyphs</button>';
		con += '<hr>';

		// Advanced Diacritics
		con += '<h1>Diacritical Glyph Generator (advanced)</h1>';
		con += 'The Latin Supplement and Latin Extended A character ranges are mostly made up of Latin-based diacritical glyphs.  '+
				'There is also a character range called Combining Diacritical Marks <pre>0x0300</pre> to <pre>0x036F</pre>. This range is '+
				'designed to be used in combination with base glyphs from other ranges.  This action will combine glyphs from '+
				'the Basic Latin range with their appropriate counterparts in the Combining Diacritical Marks range to yield the Latin '+
				'Supplement and Latin Extended A ranges.';
		con += '<br><b>Before you begin</b> - <span class="textaction" onclick="showGlyphRangeChooser();">Add the Combining Diacritical Marks range '+
				'to your project</span>, and design them.';
		con += '<div class="effect">The Latin Supplement and Latin Extended A character ranges will be enabled, and diacritical glyphs will be assembled '+
				'as Component Instances from their respective glyphs from Basic Latin and Combining Diacritical Marks ranges.</div>';
		con += '<button class="buttonsel commit" onclick="generateDiacriticsAdvanced();">Generate Diacritical Glyphs</button>';
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

	function updateAllGlyphSizes() {
		// debug(`\n updateAllGlyphSizes - START`);
		
		var sizew = document.getElementById('sizew').value;
		var sizeh = document.getElementById('sizeh').value;
		var ratio = document.getElementById('maintainaspectratio').checked;
		var updatewidthprop = document.getElementById('updateglyphwidthproperty').checked;
		
		sizew = parseFloat(sizew) || 0;
		sizeh = parseFloat(sizeh) || 0;
		
		if(ratio && !sizeh && !sizew){
			// For ratio lock to work, one delta value has to be zero
			// Let's just choose width for some reason
			sizew = 0;
		} 
		
		// debug(`\t after sanitizing - sizew: ${sizew}, sizeh: ${sizeh}, ratio lock: ${ratio}`);
		
		glyphIterator({
			title: 'Re-sizing glyph',
			action: function(glyph){
				if(!glyph.shapes || !glyph.shapes.length) return;
				glyph.updateGlyphSize(sizew, sizeh, ratio, true);
				if(updatewidthprop) glyph.glyphwidth = ((glyph.glyphwidth*1) + (sizew*1));
			}
		});

		// debug(` updateAllGlyphSizes - END\n\n`);
	}

	function flattenAllWorkItems() {
		glyphIterator({
			title: 'Converting Component Instances to Shapes',
			action: function(glyph){
				glyph.flattenGlyph();
			}
		});
	}

	function convertProjectToMonospace() {
		// debug(`\n convertProjectToMonospace - START`);
		var gwidth = (document.getElementById('monospacewidth').value * 1);
		// debug(`gwidth input: ${gwidth}`);

		if(isNaN(gwidth) || gwidth === 0) {
			// debug(`\t gwidth is NaN or zero`);
			showToast('Monospace width must be<br>a number greater than zero');

		} else {
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

		// debug(` convertProjectToMonospace - END\n\n`);
	}

	function convertProjectToAllCaps() {
		// debug(`\n convertProjectToAllCaps - START`);
		
		var copyGlyphAttributes = { srcAutoWidth: true, srcWidth: true, srcLSB: true, srcRSB: true };
		var range = _UI.glyphrange;

		function convertRangeToAllCaps(begin, end, name, callback) {			
			// Make sure all glyphs exist
			for(var gid = begin; gid < end; gid++){
				getGlyph(decToHex(gid), true);
			}

			glyphIterator({
				title: 'Converting ' + name + ' to All Caps',
				filter: {begin: begin, end: end},
				action: function(glyph, glyphid){
					var destinationGlyphID = _UI.unicodeLowercaseMap[glyphid];
					if(destinationGlyphID){
						insertComponentInstance(glyphid, destinationGlyphID, copyGlyphAttributes);
					}
				},
				callback: callback,
			});
		}

		// Basic Latin range
		function convertBasicLatinToAllCaps(){
			// debug(`\t allcaps BASIC`);
			if(document.getElementById('allcapsbasic').checked){
				_GP.projectsettings.glyphrange.basiclatin = true;
				convertRangeToAllCaps(range.basiclatin.begin, range.basiclatin.end, 'Basic Latin', convertLatinSupplementToAllCaps);
			} else {
				convertLatinSupplementToAllCaps();
			}
		}

		// Basic Latin range
		function convertLatinSupplementToAllCaps(){
			// debug(`\t allcaps SUPPLEMENT`);
			if(document.getElementById('allcapssupplement').checked){
				_GP.projectsettings.glyphrange.latinsupplement = true;
				convertRangeToAllCaps(range.latinsupplement.begin, range.latinsupplement.end, 'Latin Supplement', convertLatinextEndedAToAllCaps);
			} else {
				convertLatinextEndedAToAllCaps();
			}
		}

		// Basic Latin range
		function convertLatinextEndedAToAllCaps(){
			// debug(`\t allcaps A`);
			if(document.getElementById('allcapsa').checked){
				_GP.projectsettings.glyphrange.latinextendeda = true;
				convertRangeToAllCaps(range.latinextendeda.begin, range.latinextendeda.end, 'Latin Extended A', convertLatinExtendedBToAllCaps);
			} else {
				convertLatinExtendedBToAllCaps();
			}
		}

		// Basic Latin range
		function convertLatinExtendedBToAllCaps(){
			// debug(`\t allcaps B`);
			if(document.getElementById('allcapsb').checked){
				_GP.projectsettings.glyphrange.latinextendedb = true;
				convertRangeToAllCaps(range.latinextendedb.begin, range.latinextendedb.end, 'Latin Extended B');
			}
		}
		
		// Start the roll through
		convertBasicLatinToAllCaps();

		_UI.history['glyph edit'].put('Convert project to All Caps');
		// debug(` convertProjectToAllCaps - END\n\n`);
	}

	function generateDiacriticsSimple() {
		// debug(`generateDiacriticsSimple - START`);
		var copyGlyphAttributes = { srcAutoWidth: true, srcWidth: true, srcLSB: true, srcRSB: true };
		var currglyphid = decToHex(_UI.glyphrange.latinsupplement.begin);
		var sourceArray;

		function doOneGlyph() {
			// debug(`\t doOneGlyph - currglyphid = ${currglyphid}`);
			sourceArray = _UI.unicodeDiacriticsMapSimple[currglyphid];
			
			if(sourceArray) {
				showToast(('Adding diacritical ' + currglyphid + '<br>' + getGlyphName(currglyphid)), 10000);   
				insertComponentInstance(sourceArray[0], currglyphid, copyGlyphAttributes);
				insertComponentInstance(sourceArray[1], currglyphid, false);
			}

			currglyphid++;

			if(currglyphid <= _UI.glyphrange.latinsupplement.end){
				currglyphid = decToHex(currglyphid);
				setTimeout(doOneGlyph, 10);
			} else {
				showToast('Done!', 1000);
				_UI.history['glyph edit'].put('Generate Diacritical glyphs');
			}
		}

		showToast('Starting to assemble Diacritical Glyphs', 10000);

		_GP.projectsettings.glyphrange.latinsupplement = true;

		setTimeout(doOneGlyph, 500);
	}

	function generateDiacriticsAdvanced() {
		// debug(`generateDiacriticsAdvanced - START`);
		var copyGlyphAttributes = { srcAutoWidth: true, srcWidth: true, srcLSB: true, srcRSB: true };
		var currglyphid = decToHex(_UI.glyphrange.latinsupplement.begin);
		var sourceArray;

		function doOneGlyph() {
			// debug(`\t doOneGlyph - currglyphid = ${currglyphid}`);
			sourceArray = _UI.unicodeDiacriticsMapAdvanced[currglyphid];
			
			if(sourceArray) {
				showToast(('Adding diacritical ' + currglyphid + '<br>' + getGlyphName(currglyphid)), 10000);   
				insertComponentInstance(sourceArray[0], currglyphid, copyGlyphAttributes);
				insertComponentInstance(sourceArray[1], currglyphid, false);
			}

			currglyphid++;

			if(currglyphid === _UI.glyphrange.latinsupplement.end) {
				currglyphid = _UI.glyphrange.latinextendeda.begin;
			}

			if(currglyphid <= _UI.glyphrange.latinextendeda.end){
				currglyphid = decToHex(currglyphid);
				setTimeout(doOneGlyph, 10);
				
			} else {
				showToast('Done!', 1000);
				_UI.history['glyph edit'].put('Generate Diacritical glyphs');
			}
		}

		showToast('Starting to assemble Diacritical Glyphs', 10000);

		_GP.projectsettings.glyphrange.latinsupplement = true;
		_GP.projectsettings.glyphrange.latinextendeda = true;

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
		var callback = oa.callback || false;
		var currglyph, currglyphid;


		// Translate range notation to filter function
		if(oa.filter && oa.filter.begin && oa.filter.end){
			var begin = parseInt(oa.filter.begin);
			var end = parseInt(oa.filter.end);
			var gint;

			filter = function(glyphid){
				if(getGlyphType(glyphid) === 'glyph'){
					gint = parseInt(glyphid, 16);
					return ((gint >= begin) && (gint <= end));
				} else {
					return false;
				}
			}
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
				if(callback) callback();
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