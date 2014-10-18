// start of file

//	--------------------------
//	Import SVG Font
//	--------------------------
	function ioSVG_importSVGfont(dropped) {
		debug('ioSVG_importSVGfont \t Start');
		
		var loadcon = '';
		loadcon += '<div class="newtile">';
		loadcon += '<h3>Importing Font</h3>';
		loadcon += '<div id="fontimportstatus">Reading font data...</div>';
		loadcon += genLoadingAnimationHTML();
		loadcon += '</div>';
		document.getElementById('firstruntableright').innerHTML = loadcon;

		setTimeout(startFontImport, 10);
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
		var fis = document.getElementById('fontimportstatus');
		var sweep = document.getElementById('sweep');
		var degrees = 0;
		var importStatus = function(msg){ 
		    degrees = ((degrees + 2) % 360);
            sweep.style.transform = ('rotate('+degrees+'deg)');
            fis.innerHTML = msg;
		};

		var font, chars, kerns;
		var svgdata = dropped;
		function startFontImport(){
			debug('\n startFontImport - START');

			_GP = new GlyphrProject();

			// Convert unicode characters to decimal values
			// DOM Parser does not return unicode values as text strings
			// Kern groups containing '&#x' will get fuck'd
			svgdata = svgdata.replace(/&#x/g, '0x');

			var jsondata;
			try {
				jsondata = convertXMLtoJSON(svgdata);
			} catch (e){
				//errormessage(e.message);
				return;
			}

			// Get Font
			font = ioSVG_getFirstTagInstance(jsondata, 'font');
			debug('\t got font');

			// Get Kerns
			kerns = ioSVG_getTags(font, 'hkern');
			debug('\t got kerns');

			// Get Chars
			chars = ioSVG_getTags(font, 'glyph');
			debug('\t got chars');

			// Kick off the import
			importStatus('Importing Character 1 of ' + chars.length);
			debug(' startFontImport - END\n');
			setTimeout(importOneChar, 1);
		}

		/*
		*
		*	CHAR IMPORT
		*
		*/
		var tc, data, uni, ns, cname, chtml, adv, isautowide;
		var maxchar = 0;
		var minchar = 0xffff;
		var customcharrange = [];
		var shapecounter = 0;
		var newshapes = [];
		var fc = {};
		var fl = {};
	
		var c=0;
		function importOneChar(){
			if(c >= chars.length) {
				importStatus('Importing Kern Pair 1 of ' + kerns.length);
				setTimeout(importOneKern, 1);
				return;
			}

			// One Char or Ligature in the font
			tc = chars[c];

			// Get the appropriate unicode decimal for this char
			debug('\n Char Import - START');
			debug('\t starting  unicode \t' + tc.attributes.unicode);

			uni = parseUnicodeInput(tc.attributes.unicode);
			debug('\t GLYPH ' + c + '/'+chars.length+'\t unicode: ' + JSON.stringify(uni) + '\t name: ' + tc.attributes['glyph-name']);

			if(uni === false){
				// Check for .notdef
				debug('\t !!! Skipping <GLYPH> '+tc.attributes['glyph-name']+' with no Unicode ID !!!');
				chars.splice(c, 1);
			} else if (uni.length > 1 || uni[0] <= _UI.charrange.latinextendedb.end){

				debug('\t Char IF section');
				/*
				*
				*	CHARACTER OR LIGATURE IMPORT
				*
				*/
				newshapes = [];
				shapecounter = 0;

				// Import Path Data
				data = tc.attributes.d;
				// debug('\t Character has path data ' + data);
				if(data){
					// Compound Paths are treated as different Glyphr Shapes
					data.replace(/Z/g,'z');
					data = data.split('z');

					debug('\t data.length (shapes) = ' + data.length);
					for(var d=0; d<data.length; d++){
						if(data[d].length){
							debug('\t starting convertPathTag');
							ns = ioSVG_convertPathTag(data[d]);
							debug('\t created shape from PathTag');
							debug(ns);
							newshapes.push(ns);
							shapecounter++;
							newshapes[newshapes.length-1].name = ('SVG Path ' + shapecounter);
						}
					}
				}

				// Get Advance Width
				isautowide = true;
				adv = parseInt(tc.attributes['horiz-adv-x']);
				if(adv){
					if(!isNaN(adv) && adv > 0){
						isautowide = false;
						/*
							GLYPHR charwidth !== horiz-adv-x
						*/
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

				} else {
					// It's a LIGATURE
					uni = uni.join('');
					fl[uni] = new Char({'charshapes':newshapes, 'charhex':uni, 'charwidth':adv, 'isautowide':isautowide});
				}

				debug(' Char Import - END\n');
			}

			// finish loop
			c++;
			importStatus('Importing Character ' + c + ' of ' + chars.length);
			setTimeout(importOneChar, 1);
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
				setTimeout(finalizeFontImport, 1);
				return;
			}

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
			} else {
				// debug('\t Kern ' + json(tk.attributes, true) + ' returned an empty group.');
			}

			// debug(' Kern Import - END\n');
			k++;
			importStatus('Importing Kern Pair ' + k + ' of ' + kerns.length);
			setTimeout(importOneKern, 1);
		}


		/*
		*
		*	FINALIZE
		*
		*/
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

			var fontattr = ioSVG_getFirstTagInstance(font, 'font-face').attributes;

			_GP.projectsettings.upm = 1*fontattr['units-per-em'];
			
			finalizeGlyphrProject();
			closeDialog();

			debug(' ioSVG_importSVGfont - END\n');
			navigate();
		}
	}
/*
					if(re === true) navigate();
					else {
						con = '<h1>oops</h1>Looks like there was a SVG import error.<br><br>';

						if(re.char){
							con += 'This &lt;glyph&gt; element seems to be causing issues:<br>';
							con += '<textarea style="width:500px; height:200px; margin-top:10px;">'+json(re.char.attributes)+'</textarea>';
						} else if (re.kern){
							con += 'This &lt;hkern&gt; element seems to be causing issues:<br>';
							con += '<textarea style="width:500px; height:200px; margin-top:10px;">'+json(re.kern.attributes)+'</textarea>';
						}

						con += '<br><button onclick="document.getElementById(\'droptarget\').innerHTML = \'Try loading another file\'; closeDialog();">Close</button>';
						openDialog(con);
					}


*/
	function genLoadingAnimationHTML() {
		var re = '';
		re += '<br><div style="margin:0px; width:50px; height:50px; padding:0px; background-color:'+_UI.colors.accent_65+';';
		re += 'background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwFJREFUeNrsWd2N2kAQNtYpr/F1wFUQUgG4gnAVABXEVwFHBXepwEkFx1UAVHBOBXYHOK9RJDJzGkerZWZ3bYy9QYw0Qgh2dr6d2dn5Gfz+czgEF0BhcCF0BeIb3bQsryDe0fet9vuEPsfAQ+JWaNDCZc+AfwCvP9wMijoLYW8EMgWeAY/6AFKi4sCruspbQC0JWNQFkO/ADwCgPIevgz4I4gl4fi4gePILALDt4vKCXnifUtd75AqkthVIkSOqcxB1rOMC5Bk2f3DYFH37C13akUOAQH4F2WsH2Qgmsf3pYODEdmLAj8B7ixwT70lGZNkrMckxAUkdBJ8CgANkO7hUWi+51hZMHhv89kV53NomvEP30n2E/Tfc3qHwRiwEIej7b2cEUb3+b7QXRwvS0QqEfeTowdq0mVYY6H0v2lOPeqjbyha1CvjjneBOm1PTiIbpT8y5GeiUq4eqW2QlCFz2ACKgPZfCbyvJIiUgvzXciz7pTnD3fZWXhdrrLVmjb3oyZBxHFvkMqDPmguee1E5HVlG9JVTcKmMWTz0qAqdMBMuqUBwq0YGjmUdAZobI9g/IzhA1fCFJl50KpHBNw/skQafCCKRJudkBRTYgvruVVadrg+5/AlJ6qG/ZBEjmIZDMBmQidDt8skopdGAmKpCxsPibR0AkXcZ60nirFzBUUOUevCklJY2cfnv9jiSMe+HC2ANrxEIzImELKw41IcfMM+3BMu+NEK6Jp3tLqD3/bBFFguKOI1lVr68NBV+kItObXXNL4vbYcmOO7TxadJi7NOhKOonMICiiQudrizlZRpFpbWqWU1W40d1c6jSioHuXzrkydfoUuDWwVcWRfwaO0y5K41+4u2rrxuMo4blB3TAM5EZe0WTKRX1hqQnhNFbYUuQo+oi7dChpYGnTumS/KCCnTviwSwA0EcgDh15z0xmi04CmIYBqYDSvs+6U8XQ12X3FS9vU9cjKI1K+0UT3VCBc7VxQJPqlfFepCgIfSXlTUOgNyLXUvQK5RCB/BRgA7GD39jF9VXsAAAAASUVORK5CYII=); ';
		re += 'rgb(0,140,210) no-repeat fixed;">';
		re += '<img id="sweep" style="margin:0px; padding:0px;" ';
		re += 'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAu9JREFUeNrsWMtu00AU9TNOkyakjxSXlj4gIPESYsdjg8SGDSyRWCCxgQ9gh9Qt38LX8AHtCj4AKE1aEzuOuSOdka4uTqxCbHcxRzoa2+PEc+bce30T21ow4knWpKFHdNjlHWKC45S4TPxJ/K7Y8Ozkf5/rWYtHJkRIuMRt4grxGsTHNBySoK8XSUjR7io3YnHtLnGXBA1p/EKCjs77ULsEIWqHwzmhtUYM2NwGsYGQs9g9n8/jkGOVg0lBaHG0hIgruPaWNuQ5cq42IeM5c4EIbX7uo1BoYQ+J70jMRl1C0jlzPjteJ56w8y3isbj/CfEjibl60YTwvOyKEPPFvfvEEeY+zBNTihBK0lmh1WNhtyRyaZN4Ks4dtilaTFilI7PKsNrxKY77xIhVKelUh3gm8ukB8YDEtKsUkhbkR4Md99miW3BjyOY7eHmeoJS/rtsRly0sYeX2lAndFwWgkyPsJblyr04hAatWMRa+yty7TvzB7g/BYU5H8qkuIR76MB5iW2zhN1GhNHYRZiPxPeoze8pJcuVF6UKocqU5PVaEluQMiwxYhRrDGSX4Bo4jUfEGKAo6n95X4YglmsOmaEl2EDJruBajJA/gQso+p0LuEgRMeYkmV55WIWQiQku3JGrxv1Fm17FAldTqhfeL3b+NUIpyQtWFS2/KauNnlWCbtSS3Uak2ca4Sus2Suo/fKyMRXvod0wSVONVYdr2KQ6uLKjVEch8jxDy40oNbY5HkS3CsgdDKhEOPyxaSsER32KJChNYAY4YXHk9wF3nRYu7O6uHulCqEKteUbJ/CjRWETBu7uofwCjEfseqkQ2dc0IC6cPNZ2Y7ohHewwBDjKt4lujVxUZabuD/L+U0TsILhY9QuP6pCSIIF3yJeRg74SP5liNKhk2DOxRjg2C14Rq8qIfchpIsc8VjFbLCF+//6ELtsFZQjale/sf+6MhEWC0EVQtRL7pVlYGBgYGBgYGBgYGBgYGBgYGBg8Bf+CDAAUF2+ry6GVycAAAAASUVORK5CYII=">';
		re += '</div>';
        return re;
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