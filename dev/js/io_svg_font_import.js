// start of file

//	--------------------------
//	Import SVG Font
//	--------------------------
	function ioSVG_importSVGfont (svgdata) {
		debug('ioSVG_importSVGfont \t Start');

		// Convert unicode characters to decimal values
		// DOM Parser does not return unicode values as text strings
		svgdata = svgdata.replace(/unicode="&#x/g, 'unicode="0x');
		svgdata = svgdata.replace(/unicode='&#x/g, "unicode='0x");

		// Convert to an Object
		var jsondata = convertXMLtoJSON(svgdata);

		debug('\t imported json data:');
		debug(jsondata);

		// check for errors

		var font = ioSVG_getFirstTagInstance(jsondata, 'font');
		debug('\t font data:');
		debug(font);

		/*
		*	Cases to consider
		*	-----------------
		*	needs scaling
		*	unicode included but no path or children
		*	unicode outside of known ranges
		*		and provides a name
		*		provides no name
		*	unicode spanning known ranges
		*/

		var chars = ioSVG_getTags(font, 'glyph');
		var tc, data, uni, cname, chtml, adv;
		var maxchar = 0;
		var minchar = 0xffff;
		var customcharrange = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};

		for(var c=0; c<chars.length; c++){
			// One Char in the font
			tc = chars[c];
			newshapes = [];
			shapecounter = 0;

			// Get the appropriate unicode decimal for this char
			uni = tc.attributes.unicode;
			debug('\t Char ' + c + ' starting unicode attribute: ' + uni);

			if(uni){
				if(uni.length > 3){
					uni = uni.split(';')[0];
				} else if (uni.length === 1){
					uni = charToHex(uni);
				} else {
					uni = false;
					console.warn('Unknown Unicode Value: ' + uni + ' - could not parse.');
				}
			}

			if(uni){
				// Get some range data
				minchar = Math.min(minchar, uni);
				maxchar = Math.max(maxchar, uni);
				if(1*uni > _UI.charrange.latinextendedb.end) customcharrange.push(uni)
				uni = padHexString(uni);
				debug('\t uni is ' + uni);
				
				// Get the char name data
				cname = getCharName(uni);
				chtml = hexToHTML(uni);

				// CASE ONE: a Glyph tag with just pathdata
				data = tc.attributes.d;
				// debug('\t Character ' + cname + ' has path data ' + data);

				if(data){
					// Compound Paths are treated as different Glyphr Shapes
					data.replace(/Z/g,'z');
					data = data.split('z');

					for(var d=0; d<data.length; d++){
						if(data[d].length){
							newshapes.push(ioSVG_convertPathTag(data[d]));
							shapecounter++;
							newshapes[newshapes.length-1].name = ("SVG Path " + shapecounter);
						}
					}
				}

				// CASE TWO: a Glyph tag with child shape data
				/*
					stuff
				*/


				fc[uni] = new Char({"charshapes":newshapes, "charname":cname, "charhtml":chtml});

				// specified advance width?
				if(tc.attributes['horiz-adv-x']){
					adv = parseInt(tc.attributes['horiz-adv-x']);
					if(!isNaN(adv) && adv > 0){
						fc[uni].isautowide = false;
						fc[uni].advancewidth = adv;
					}
				}
			}
		}

		// Enable applicable built-in char ranges
		debug('\t Char range: ' + minchar + ' to ' + maxchar);

		var rstart, rend;
		for(var r in _UI.charrange){
			if(_UI.charrange.hasOwnProperty(r)){
				rstart = 1*_UI.charrange[r].begin;
				rend = 1*_UI.charrange[r].end+1;
				for(var c=rstart; c<rend; c++){
					if(getChar(c)){
						_GP.projectsettings.charrange[r] = true;
						break;
					}
				}
			}
		}

		// Make a custom range for the rest
		if(customcharrange.length){
			customcharrange = customcharrange.sort();
			_GP.projectsettings.charrange.custom.push({"begin":customcharrange[0], "end":customcharrange[customcharrange.length-1]});
		}


		// Check to make sure certain stuff is there
		// space has horiz-adv-x

		_GP.fontchars = fc;
	}

// end of file