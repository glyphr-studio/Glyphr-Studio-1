 // start of file

//	--------------------------
//	Import SVG Font
//	--------------------------

	function ioSVG_importSVGfont(filter) {
		// debug('\n ioSVG_importSVGfont - Start');

		document.getElementById('firstruntableright').innerHTML = make_LoadingAnimation(false);

		setTimeout(setupFontImport, 10);

		var fis = document.getElementById('fontimportstatus');
		var sweep = document.getElementById('sweep');
		var degrees = 0;
		function importStatus(msg){
			// debug('\t>> import status >> ' + msg);
		    degrees = ((degrees + 2) % 360);
            sweep.style.transform = ('rotate('+degrees+'deg)');
            fis.innerHTML = msg;
		}

		var font, chars, kerns;
		var svgdata = _UI.droppedFileContent;

		function setupFontImport(){
			importStatus('Reading font data...');
			// debug('\n setupFontImport - START');

			_GP = new GlyphrProject();

			// Convert unicode characters to decimal values
			// DOM Parser does not return unicode values as text strings
			// Kern groups containing '&#x' will get fuck'd
			svgdata = svgdata.replace(/&#x/g, '0x');

			var jsondata;
			try {
				jsondata = convertXMLtoJSON(svgdata);
			} catch (e){
				loadPage_firstrun();
				showErrorMessageBox('There was a problem reading the SVG file:<br>' + e.message);
				return;
			}

			// Get Font
			font = ioSVG_getFirstTagInstance(jsondata, 'font');
			// debug('\t got font');

			// Get Kerns
			kerns = ioSVG_getTags(font, 'hkern');
			// debug('\t got kerns');

			// Get Chars
			chars = ioSVG_getTags(font, 'glyph');
			// debug('\t got chars');
			// debug(chars);

			// test for range
			if(chars.length < 600 || filter){
				setTimeout(startFontImport, 1);
				// Dump JSON for Debug
				// saveTextFile('Parsed JSON', json(jsondata));
			} else {
				document.getElementById('firstruntableright').innerHTML = make_ImportFilter(chars.length, kerns.length);
			}
			// debug(' setupFontImport - END\n');
		}

		function startFontImport() {
			// debug('\n startFontImport - START');
			importStatus('Importing Character 1 of ' + chars.length);
			setTimeout(importOneChar, 4);
			// debug(' startFontImport - END\n');
		}

		/*
		*
		*	CHAR IMPORT
		*
		*/
		var tca, data, uni, ns, cname, chtml, adv, isautowide;
		var maxchar = 0;
		var minchar = 0xffff;
		var customcharrange = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};
		var fl = {};

		var c=0;
		function importOneChar(){
			importStatus('Importing Character ' + c + ' of ' + chars.length);

			if(c >= chars.length) {
				setTimeout(importOneKern, 1);
				return;
			}

			// One Char or Ligature in the font
			tca = chars[c].attributes;

			// Get the appropriate unicode decimal for this char
			// debug('\n importOneChar - START');
			// debug('\t starting  unicode \t' + tca.unicode + ' \t ' + tca['glyph-name']);

			uni = parseUnicodeInput(tca.unicode);

			if(tca.unicode === ' ') uni = ['0x0020'];

			if(uni === false){
				// Check for .notdef
				// debug('\t !!! Skipping '+tca['glyph-name']+' NO UNICODE !!!');
				chars.splice(c, 1);

			} else if (isOutOfBounds(uni)){
				// debug('\t !!! Skipping '+tca['glyph-name']+' OUT OF BOUNDS !!!');
				chars.splice(c, 1);

			} else {

				// debug('\t GLYPH ' + c + '/'+chars.length+'\t unicode: ' + json(uni) + '\t attributes: ' + json(tca));
				/*
				*
				*	CHARACTER OR LIGATURE IMPORT
				*
				*/
				newshapes = [];
				shapecounter = 0;

				// Import Path Data
				data = tca.d;
				// debug('\t Character has path data ' + data);
				if(data){
					// Compound Paths are treated as different Glyphr Shapes
					data = data.replace(/Z/gi,'z');
					data = data.split('z');

					// debug('\t split z, data into ' + data.length + ' Glyphr Studio shapes.');

					// debug('\t data.length (shapes) = ' + data.length);
					for(var d=0; d<data.length; d++){
						if(data[d].length){
							// debug('\t starting convertPathTag');
							ns = ioSVG_convertPathTag(data[d]);
							// debug('\t created shape from PathTag');
							// debug(ns);
							newshapes.push(ns);
							shapecounter++;
							newshapes[newshapes.length-1].name = ('SVG Path ' + shapecounter);
						}
					}
				}

				// Get Advance Width
				isautowide = true;
				adv = parseInt(tca['horiz-adv-x']);
				if(adv){
					if(!isNaN(adv) && adv > 0){
						isautowide = false;
					}
				} else adv = false;


				if(uni.length === 1){
					// It's a CHAR
					// Get some range data
					uni = uni[0];
					minchar = Math.min(minchar, uni);
					maxchar = Math.max(maxchar, uni);
					if(1*uni > _UI.charrange.latinextendedb.end) customcharrange.push(uni);

					fc[uni] = new Char({'charshapes':newshapes, 'charhex':uni, 'charwidth':adv, 'isautowide':isautowide});
					if(getUnicodeName(uni) === '[name not found]') _GP.projectsettings.charrange.filternoncharpoints = false;

				} else {
					// It's a LIGATURE
					uni = uni.join('');
					fl[uni] = new Char({'charshapes':newshapes, 'charhex':uni, 'charwidth':adv, 'isautowide':isautowide});
				}

				// Successfull loop, advance c
				c++;
			}

			// finish loop
			setTimeout(importOneChar, 1);

			// debug(' importOneChar - END\n');
		}

		function isOutOfBounds(uni) {
			if(!filter) return false;
			if(!uni.length) return true;

			for(var u=0; u<uni.length; u++){
				if((parseInt(uni[u]) > _UI.importrange.end) || (parseInt(uni[u]) < _UI.importrange.begin)) return true;
			}

			return false;
		}

		/*
		*
		*	KERN IMPORT
		*
		*/
		var tk, tempgroup, reg, leftgroup, rightgroup, newid;
		var fk = {};

		var k = 0;
		function importOneKern(){

			if(k >= kerns.length) {
				importStatus('Finalizing the imported font...');
				setTimeout(startFinalizeFontImport, 1);
				return;
			}

			importStatus('Importing Kern Pair ' + k + ' of ' + kerns.length);

			// debug('\n Kern Import - START ' + k + '/' + kerns.length);
			leftgroup = [];
			rightgroup = [];
			tk = kerns[k];
			// debug('\t Kern Attributes: ' + json(tk.attributes, true));

			// Get members by name
			leftgroup = getKernMembersByName(tk.attributes.g1, chars, leftgroup, _UI.charrange.latinextendedb.end);
			rightgroup = getKernMembersByName(tk.attributes.g2, chars, rightgroup, _UI.charrange.latinextendedb.end);

			// debug('\t kern groups by name ' + json(leftgroup, true) + ' ' + json(rightgroup, true));

			// Get members by Unicode
			leftgroup = getKernMembersByUnicodeID(tk.attributes.u1, chars, leftgroup, _UI.charrange.latinextendedb.end);
			rightgroup = getKernMembersByUnicodeID(tk.attributes.u2, chars, rightgroup, _UI.charrange.latinextendedb.end);

			// debug('\t kern groups parsed as ' + json(leftgroup, true) + ' ' + json(rightgroup, true));

			if(leftgroup.length && rightgroup.length){
				newid = generateNewID(fk, 'kern');
				kernval = tk.attributes.k || 0;
				// debug('\t Making a kern pair with k = ' + kernval);
				fk[newid] = new HKern({'leftgroup':leftgroup, 'rightgroup':rightgroup, 'value':kernval});
				// debug('\t Made the new kern successfully.');
				k++;
			} else {
				kerns.splice(k, 1);
				// debug('\t Kern ' + json(tk.attributes, true) + ' returned an empty group.');
			}

			// debug(' Kern Import - END\n');
			setTimeout(importOneKern, 1);
		}


		/*
		*
		*	FINALIZE
		*
		*/
		function startFinalizeFontImport() {
			importStatus('Finalizing the imported font...');
			setTimeout(finalizeFontImport, 4);
		}

		function finalizeFontImport(){
			// var rstart, rend;
			for(var r in _UI.charrange){
				if(_UI.charrange.hasOwnProperty(r)){
					rstart = 1*_UI.charrange[r].begin;
					rend = 1*_UI.charrange[r].end+1;
					for(var t=rstart; t<rend; t++){
						if(getChar(t)){
							_GP.projectsettings.charrange[r] = true;
							break;
						}
					}
				}
			}

			// Make a custom range for the rest
			if(customcharrange.length){
				customcharrange = customcharrange.sort();
				_GP.projectsettings.charrange.custom.push({'begin':customcharrange[0], 'end':customcharrange[customcharrange.length-1]});
			}

			// Import Font Settings
			// Check to make sure certain stuff is there
			// space has horiz-adv-x
			_GP.fontchars = fc;
			_GP.ligatures = fl;
			_GP.kerning = fk;

			// Font Settings
			var fatt = ioSVG_getFirstTagInstance(font, 'font-face').attributes;
			var ps = _GP.projectsettings;
			var md = _GP.metadata;
			var fname = fatt['font-family'] || 'My Font';

			ps.upm = 1*fatt['units-per-em'] || 1000;
			ps.name = fname;
			ps.ascent = 1*fatt.ascent || 700;
			ps.capheight = 1*fatt['cap-height'] || 675;
			ps.xheight = 1*fatt['x-height'] || 400;
			ps.overshoot = round(ps.upm / 100);
			md.font_family = fname;
			md.panose_1 = fatt['panose-1'] || '0 0 0 0 0 0 0 0 0 0';
			md.font_weight = 1*fatt['font-weight'] || 400;
			md.font_stretch = fatt['font-stretch'] || 'normal';
			md.underline_position = 1*fatt['underline-position'] || -50;
			md.underline_thickness = 1*fatt['underline-thickness'] || 10;
			md.strikethrough_position = 1*fatt['strikethrough-position'] || 300;
			md.strikethrough_thickness = 1*fatt['strikethrough-thickness'] || 10;
			md.overline_position = 1*fatt['overline-position'] || 750;
			md.overline_thickness = 1*fatt['overline-thickness'] || 10;

			// Finish Up
			finalizeGlyphrProject();
			closeDialog();

			// debug(' ioSVG_importSVGfont - END\n');
			navigate();
		}
		// debug(' ioSVG_importSVGfont - END\n');
	}

	function make_LoadingAnimation() {
		// debug('\n make_LoadingAnimation - START');
		var re = '';
		re += '<div class="newtile">';
		re += '<h2>Importing Font</h2>';
		re += '<div id="fontimportstatus">Reading font data...</div>';
		re += '<br><div style="margin:0px; width:50px; height:50px; padding:0px; background-color:'+_UI.colors.accent_65+';';
		re += 'background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwFJREFUeNrsWd2N2kAQNtYpr/F1wFUQUgG4gnAVABXEVwFHBXepwEkFx1UAVHBOBXYHOK9RJDJzGkerZWZ3bYy9QYw0Qgh2dr6d2dn5Gfz+czgEF0BhcCF0BeIb3bQsryDe0fet9vuEPsfAQ+JWaNDCZc+AfwCvP9wMijoLYW8EMgWeAY/6AFKi4sCruspbQC0JWNQFkO/ADwCgPIevgz4I4gl4fi4gePILALDt4vKCXnifUtd75AqkthVIkSOqcxB1rOMC5Bk2f3DYFH37C13akUOAQH4F2WsH2Qgmsf3pYODEdmLAj8B7ixwT70lGZNkrMckxAUkdBJ8CgANkO7hUWi+51hZMHhv89kV53NomvEP30n2E/Tfc3qHwRiwEIej7b2cEUb3+b7QXRwvS0QqEfeTowdq0mVYY6H0v2lOPeqjbyha1CvjjneBOm1PTiIbpT8y5GeiUq4eqW2QlCFz2ACKgPZfCbyvJIiUgvzXciz7pTnD3fZWXhdrrLVmjb3oyZBxHFvkMqDPmguee1E5HVlG9JVTcKmMWTz0qAqdMBMuqUBwq0YGjmUdAZobI9g/IzhA1fCFJl50KpHBNw/skQafCCKRJudkBRTYgvruVVadrg+5/AlJ6qG/ZBEjmIZDMBmQidDt8skopdGAmKpCxsPibR0AkXcZ60nirFzBUUOUevCklJY2cfnv9jiSMe+HC2ANrxEIzImELKw41IcfMM+3BMu+NEK6Jp3tLqD3/bBFFguKOI1lVr68NBV+kItObXXNL4vbYcmOO7TxadJi7NOhKOonMICiiQudrizlZRpFpbWqWU1W40d1c6jSioHuXzrkydfoUuDWwVcWRfwaO0y5K41+4u2rrxuMo4blB3TAM5EZe0WTKRX1hqQnhNFbYUuQo+oi7dChpYGnTumS/KCCnTviwSwA0EcgDh15z0xmi04CmIYBqYDSvs+6U8XQ12X3FS9vU9cjKI1K+0UT3VCBc7VxQJPqlfFepCgIfSXlTUOgNyLXUvQK5RCB/BRgA7GD39jF9VXsAAAAASUVORK5CYII=); ';
		re += 'rgb(0,140,210) no-repeat fixed;">';
		re += '<img id="sweep" style="margin:0px; padding:0px;" ';
		re += 'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAu9JREFUeNrsWMtu00AU9TNOkyakjxSXlj4gIPESYsdjg8SGDSyRWCCxgQ9gh9Qt38LX8AHtCj4AKE1aEzuOuSOdka4uTqxCbHcxRzoa2+PEc+bce30T21ow4knWpKFHdNjlHWKC45S4TPxJ/K7Y8Ozkf5/rWYtHJkRIuMRt4grxGsTHNBySoK8XSUjR7io3YnHtLnGXBA1p/EKCjs77ULsEIWqHwzmhtUYM2NwGsYGQs9g9n8/jkGOVg0lBaHG0hIgruPaWNuQ5cq42IeM5c4EIbX7uo1BoYQ+J70jMRl1C0jlzPjteJ56w8y3isbj/CfEjibl60YTwvOyKEPPFvfvEEeY+zBNTihBK0lmh1WNhtyRyaZN4Ks4dtilaTFilI7PKsNrxKY77xIhVKelUh3gm8ukB8YDEtKsUkhbkR4Md99miW3BjyOY7eHmeoJS/rtsRly0sYeX2lAndFwWgkyPsJblyr04hAatWMRa+yty7TvzB7g/BYU5H8qkuIR76MB5iW2zhN1GhNHYRZiPxPeoze8pJcuVF6UKocqU5PVaEluQMiwxYhRrDGSX4Bo4jUfEGKAo6n95X4YglmsOmaEl2EDJruBajJA/gQso+p0LuEgRMeYkmV55WIWQiQku3JGrxv1Fm17FAldTqhfeL3b+NUIpyQtWFS2/KauNnlWCbtSS3Uak2ca4Sus2Suo/fKyMRXvod0wSVONVYdr2KQ6uLKjVEch8jxDy40oNbY5HkS3CsgdDKhEOPyxaSsER32KJChNYAY4YXHk9wF3nRYu7O6uHulCqEKteUbJ/CjRWETBu7uofwCjEfseqkQ2dc0IC6cPNZ2Y7ohHewwBDjKt4lujVxUZabuD/L+U0TsILhY9QuP6pCSIIF3yJeRg74SP5liNKhk2DOxRjg2C14Rq8qIfchpIsc8VjFbLCF+//6ELtsFZQjale/sf+6MhEWC0EVQtRL7pVlYGBgYGBgYGBgYGBgYGBgYGBg8Bf+CDAAUF2+ry6GVycAAAAASUVORK5CYII=">';
		re += '</div>';
		re += '</div>';

		// debug(' make_LoadingAnimation - END\n');
        return re;
	}

	function make_ImportFilter(chars, kerns) {
		var re = '<div class="newtile" style="width:500px;">'+
			'<h2>Whoa, there...</h2><br>'+
			'The font you\'re trying to import has <b>'+chars+' characters</b> and <b>'+kerns+' kern pairs</b>.  '+
			'Glyphr Studio has a hard time with super-large fonts like this.  '+
			'We recommend pairing it down a little:<br><br>';

		re += '<table>';

		re += '<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'basic\');" id="basic" checked/></td><td>';
		re += '<h3>Only import Latin characters</h3>'+
			'This includes Latin and Latin Extended Unicode ranges<br>(0x0020 - 0x024F).<br><br>';
		re += '</td></tr>';

		re += '<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'custom\');" id="custom"/></td><td>';
		re += '<h3>Import a custom range of characters</h3>'+
			'A nice overview of character ranges can be found at<br><a href="https://en.wikipedia.org/wiki/Unicode_block" target=_new>Wikipedia\'s Unicode Block page</a>.<br>' +
			'<table class="settingstable"><tr>'+
			'<td>begin:<br><input type="text" onchange="checkFilter(\'custom\');document.getElementById(\'importfontbutton\').disabled = \'disabled\';" value="'+decToHex(_UI.importrange.begin)+'" id="customrangebegin"></td>'+
			'<td>end:<br><input type="text" onchange="checkFilter(\'custom\');document.getElementById(\'importfontbutton\').disabled = \'disabled\';" value="'+decToHex(_UI.importrange.end)+'" id="customrangeend"></td>'+
			'<td><br><button onclick="checkFilter(\'custom\');">Set Range</button></td>'+
			'<td style="padding-top:20px;">'+helpUI(unicodeInputHelp())+'</td>'+
			'<td><br><div id="customrangeerror">bad range input</div></td>'+
			'</tr></table><br>';
		re += '</td></tr>';

		re += '<tr><td class="checkcol"><input type="checkbox" onclick="checkFilter(\'everything\');" id="everything"/></td><td>';
		re += '<h3>Import all the characters</h3>'+
			'Don\'t say we did\'t try to warn you.';
		re += '</td></tr>';

		re += '</table>';

		re += '<br><br><button class="buttonsel" id="importfontbutton" onclick="ioSVG_importSVGfont(true);">Import Font</button>';

		return re;
	}

	function setFontImportRange() {
		var range = getCustomRange(false);
		if(range){
			_UI.importrange = range;
			document.getElementById('customrangebegin').value = range.begin;
			document.getElementById('customrangeend').value = range.end;
		}
	}

	function checkFilter(id) {
		if(id === 'basic'){
			document.getElementById('basic').checked = true;
			document.getElementById('custom').checked = false;
			document.getElementById('everything').checked = false;
			_UI.importrange.begin = 0x0020;
			_UI.importrange.end = 0x024F;
		} else if (id === 'custom'){
			document.getElementById('basic').checked = false;
			document.getElementById('custom').checked = true;
			document.getElementById('everything').checked = false;
			setFontImportRange();
		} else if (id === 'everything'){
			document.getElementById('basic').checked = false;
			document.getElementById('custom').checked = false;
			document.getElementById('everything').checked = true;
			_UI.importrange.begin = 0x0000;
			_UI.importrange.end = 0xFFFF;
		}

		document.getElementById('importfontbutton').disabled = false;
	}

	function getKernMembersByName(names, chars, arr, limit) {
		limit = limit || 0xFFFF;
		var uni;
		if(names){
			names = names.split(',');

			// Check all the character names
			for(var n=0; n<names.length; n++){

				// Check all the chars
				for(var c=0; c<chars.length; c++){
					if(chars[c].attributes.unicode){

						// Push the match
						if(names[n] === chars[c].attributes['glyph-name']){
							uni = parseUnicodeInput(chars[c].attributes.unicode);
							if(1*uni < limit) arr = arr.concat(uni);
						}
					}
				}
			}
		}

		return arr;
	}

	function getKernMembersByUnicodeID(ids, chars, arr, limit) {
		limit = limit || 0xFFFF;
		var uni;
		if(ids){
			ids = ids.split(',');

			// Check all the IDs
			for(var i=0; i<ids.length; i++){

				// Check all the chars
				for(var c=0; c<chars.length; c++){
					if(chars[c].attributes.unicode){

						// Push the match
						if(ids[i] === chars[c].attributes.unicode){
							uni = parseUnicodeInput(chars[c].attributes.unicode);
							if(1*uni < limit) arr = arr.concat(uni);
						}
					}
				}
			}
		}

		return arr;
	}

// end of file