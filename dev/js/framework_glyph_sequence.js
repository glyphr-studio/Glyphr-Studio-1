// start of file
/**
	Framework > Glyph Sequence
	Drawing multiple lines of text.
**/

	function GlyphSequence(oa){
		// debug('\n GlyphSequence - START');
		oa = oa || {};

		this.setMaxes(oa.maxes)

		this.scale = oa.scale || 1;
		this.glyphstring = oa.glyphstring || '';
		this.textblocks = this.glyphstring.split('\n');
		this.linegap = oa.linegap || Math.round(_GP.projectsettings.upm / 4);

		this.drawPageExtras = oa.drawPageExtras || false;
		this.drawLineExtras = oa.drawLineExtras || false;
		this.drawGlyphExtras = oa.drawGlyphExtras || false;
		this.drawGlyph = oa.drawGlyph || false;

		this.linebreakers = oa.linebreakers || ['\u0020','\u2002','\u2003'];
		this.data = [];

		// debug(this);

		// Initialize data
		this.generateData();

		// debug(' GlyphSequence - END\n');
	}

	GlyphSequence.prototype.setMaxes = function(maxes) {
		// Maxes are in Canvas Px units (not Project Em units)
		maxes = maxes || {};
		this.maxes = {
			xmin: maxes.xmin || 0,
			xmax: maxes.xmax || Infinity,
			ymin: maxes.ymin || 0,
			ymax: maxes.ymax || Infinity
		};
	};

	GlyphSequence.prototype.setString = function(newstring) {
		// debug('\n GlyphSequence.setString - START');
		// debug(`\t passed ${newstring}`);

		this.glyphstring = newstring;
		this.textblocks = this.glyphstring.split('\n');

		// debug(`\t this.glyphstring ${this.glyphstring}`);
		// debug(`\t this.textblocks ${this.textblocks}`);

		// Lots of opportunities for optimization

		if(this.glyphstring !== '') this.generateData();
	};
	
	GlyphSequence.prototype.setScale = function(ns) {
		this.scale = ns;
		this.generateData();
	};

	GlyphSequence.prototype.setLineGap = function(ns) {
		this.linegap = ns;
		this.generateData();
	};

	GlyphSequence.prototype.generateData = function() {

		// debug('\n GlyphSequence.generateData - START');
		// debug(`\t this.textblocks ${this.textblocks}`);
		var ps = _GP.projectsettings;

		var aggregateWidth = 0;
		var thisWidth;
		var thisKern;
		var thisGlyph;

		var currblock;
		var currchar;
		var tb, tg;
		var nlb, wordagg, newy;
		var currline = 0;
		var checkforbreak = false;

		// Maxes are in px, Area is in Em
		var currx = this.maxes.xmin / this.scale;
		var curry = this.maxes.ymin / this.scale;
		var area = {
			x: this.maxes.xmin / this.scale,
			y: this.maxes.ymin / this.scale,
			width: (this.maxes.xmax - this.maxes.xmin) / this.scale,
			height: (this.maxes.ymax - this.maxes.ymin) / this.scale
		};

		// debug(`\t Em unit currs ${currx}, ${curry}, ${this.scale}`);


		/*
			----------------------------------------
			Initial loop to calculate widths
			----------------------------------------
		*/
		this.data = [];

		for(tb=0; tb < this.textblocks.length; tb++){
			currblock = findAndMergeLigatures(this.textblocks[tb].split(''));
			this.data[tb] = [];

			for(tg=0; tg<currblock.length; tg++){
				thisGlyph = getGlyph(charsToHexArray(currblock[tg]).join(''));
				thisWidth = thisGlyph? thisGlyph.getAdvanceWidth() : (_GP.projectsettings.upm / 2);
				thisKern = calculateKernOffset(currblock[tg], currblock[tg+1]);
				aggregateWidth += thisWidth + thisKern;

				// debug(`\t glyph ${currblock[tg]} AW: ${thisWidth} K: ${thisKern} TOTAL: ${aggregateWidth}`);				

				// Each glyph gets this data to draw it
				this.data[tb][tg] = {
					char: currblock[tg],
					glyph: thisGlyph,
					width: thisWidth,
					kern: thisKern,
					aggregate: aggregateWidth,
					islinebreaker: (this.linebreakers.indexOf(currblock[tg]) > -1),
					isvisible: false,
					view: false,
					linenumber: false,
					lineaggregate: false
				}

				currchar = this.data[tb][tg];
			}
		}

		// debug('this.data');
		// debug(this.data);


		/*
			----------------------------------------
			Second loop to calculate line breaks
			within each block, and final possitions
			----------------------------------------
		*/
		// debug('\t CALCUALTING DATA PER CHAR');
		for(tb=0; tb<this.data.length; tb++){
			currblock = this.data[tb];
			// debug(`block ${tb}`);

			// char data units and width units are all in glyph em (not pixel) units
			for(tg=0; tg<currblock.length; tg++){
				currchar = currblock[tg];
				// debug(`${currchar.char} num ${tg}`);

				if(currchar.view === false){

					// pos for this currchar hasn't been calculated
					if(checkforbreak && (this.maxwidth !== Infinity)){
						nlb = getNextLineBreaker(currblock, tg);
						wordagg = nlb.aggregate - currchar.aggregate;

						// debug(`\t currx - area.x + wordagg > area.width`);
						// debug(`\t ${currx} - ${area.x} + ${wordagg} > ${area.width}`);
						// debug(`\t ${currx - area.x + wordagg} > ${area.width}`);

						if(currx - area.x + wordagg > area.width){
							currline++;

							if(!canNextLineFit(curry, area, this.linegap)){
								// text takes up too much vertical space
								// returning early will leave unconputed chars.isvisible = false
								// debug(' GlyphSequence.generateData - Vertical Max Reached - END\n');
								return;

							} else {
								currx = area.x;
								curry = calcNewLineY(area.y, currline, this.linegap);
							}
						}

						checkforbreak = false;
					}

					currchar.isvisible = true;
					currchar.linenumber = currline;
					currchar.view = clone({dx:currx, dy:curry, dz:this.scale});
					currx += currchar.width + currchar.kern;
				}

				if(currchar.islinebreaker) checkforbreak = true;

	// debug(`\twidth \t ${currchar.width}
	// aggr \t ${currchar.aggregate}
	// lnbr \t ${currchar.islinebreaker}
	// view \t ${json(currchar.view, true)}
	// line \t ${currchar.linenumber}
	// \n`);

			}

			// End of one block
			currline++;

			if(!canNextLineFit(curry, area, this.linegap)){
				// text takes up too much vertical space
				// returning early will leave unconputed chars.isvisible = false
				// debug(' GlyphSequence.generateData - Vertical Max Reached - END\n');
				return;

			}

			currx = area.x;
			curry = calcNewLineY(area.y, currline, this.linegap);
		}

		// debug('\t after view calc this.data');
		// debug(this.data)

		// debug(' GlyphSequence.generateData - END\n');
	};

	GlyphSequence.prototype.iterator = function(fn) {
		var re = '';
		for(var tb=0; tb<this.data.length; tb++){
			for(var tg=0; tg<this.data[tb].length; tg++){
				re += fn(this.data[tb][tg], this);
			}
		}
		return re;
	};

	GlyphSequence.prototype.draw = function(){
		// debug('\n GlyphSequence.draw - START');

		// Draw Page Extras
		if(this.drawPageExtras) {
			this.drawPageExtras(this.maxes, this.scale);
		}

		if(this.glyphstring === '') return;

		// Draw Line Extras
		var currline = -1;
		// debug('\t DRAW LINE EXTRAS');
		if(this.drawLineExtras){
			this.iterator(function(char, gs){
				if(char.linenumber !== currline){
					gs.drawLineExtras(char, gs);
					currline = char.linenumber;
				}
			});
		}

		// Draw Glyph Extras
		// debug('\t DRAW GLYPH EXTRAS');
		if(this.drawGlyphExtras){
			this.iterator(function(char, gs){
				if(char.isvisible) gs.drawGlyphExtras(char);
			});
		}

		// Draw Glyphs
		// debug('\t DRAW GLYPHS');
		if(this.drawGlyph){
			this.iterator(function(char, gs){
				if(char.isvisible) gs.drawGlyph(char);
			});
		}

		// debug(' GlyphSequence.draw - END\n');
	}

	function calcNewLineY(starty, linenum, linegap) {
		var ps = _GP.projectsettings;
		return starty + (linenum*((linegap + ps.upm)));
	}

	function canNextLineFit(curry, area, linegap){
		var bottom = area.y + area.height;
		var nextliney = curry + linegap + _GP.projectsettings.upm;

		// debug(`\t canNextLineFit - ${bottom} > ${nextliney}`);
		return bottom > nextliney;
	}

	function getNextLineBreaker(block, start) {
		// debug('\n getNextLineBreaker - START');
		// debug(`\t starting at pos ${start}`);

		for(var i=start; i<block.length; i++){
			if(block[i].islinebreaker){
				// debug(`\t found ${i} returning *${block[i].char}* value ${block[i].aggregate}`);
				return block[i];
			}
		}

		// debug(`\t NOTHING found, returning ${block[block.length-1].char} value ${block[block.length-1].aggregate}`);

		return block[block.length-1];
	}

	function debugWidths() {
		var seq = _UI.testdrive.glyphseq;
		var re = '';

		re += seq.iterator(function(char, gs){
			return `${char.width}, ${char.kern}, ${char.aggregate}\n`;
		});

		console.log(re);
	}


	/*
		calculateKernOffset
		Takes two glyphs as arguments, and determines the number of Em units of
		offset between them.  First checks to see if there are custom kern values
		for the pair, and if not, returns 0. Left Side Bearing and Right Side Bearing
		are not returned, only kern values.
	*/
	function calculateKernOffset(c1, c2) {
		// debug('\n calculateKernOffset - START');
		// debug('\t passed: ' + c1 + ' and ' + c2);

		if(!c1 || !c2) return 0;

		c1 = parseUnicodeInput(c1).join('');
		c2 = parseUnicodeInput(c2).join('');
		// debug('\t converted: ' + c1 + ' and ' + c2);

		var k = _GP.kerning;
		var tlc, trc, re;

		for(var p in k){ if(k.hasOwnProperty(p)){
			for(var l=0; l<k[p].leftgroup.length; l++){
				tlc = k[p].leftgroup[l];
				// debug('\t checking leftgroup ' + tlc + ' against ' + c1);
				if(parseUnicodeInput(tlc)[0] === c1){
					// debug('\t LEFTGROUP MATCH! for ' + c1);
					for(var r=0; r<k[p].rightgroup.length; r++){
						trc = k[p].rightgroup[r];
						if(parseUnicodeInput(trc)[0] === c2){
							re = (k[p].value*-1);
							// debug('\t FOUND MATCH! returning ' + re);
							return re;
						}
					}
				}
			}
		}}

		// debug(' calculateKernOffset - END\n');
		return 0;
	}


	/*
		findAndMergeLigatures
		Takes an array of glyphs as an argument, and looks for glyph sequences
		that merge to ligatures.  Returns an array with merged results.
	*/
	function findAndMergeLigatures(carr) {
		// debug('\n findAndMergeLigatures - START');
		var ligs = sortLigatures();
		// debug('\t sorted ligs: ');
		// debug(ligs);

		var ligchars, carrot;
		for(var c=0; c<carr.length; c++){
			// for(var g=ligs.length-1; g>-1; g--){
			for(var g=0; g<ligs.length; g++){
				ligchars = hexToChars(ligs[g].id);
				// debug('\t checking ' + ligchars);
				carrot = carr.slice(c, (c+ligchars.length)).join('');
				// debug('\t against ' + carrot);
				if(carrot === ligchars){
					carr.splice(c, ligchars.length, ligchars);
					// debug('\t !Ligature Found! array['+c+'] is now ' + carr[c]);
				}
			}
		}

		// debug(' findAndMergeLigatures - END\n');
		return carr;
	}