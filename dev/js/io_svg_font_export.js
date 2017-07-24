// start of file
/**
	IO > Export > SVG Font
	Converting a Glyphr Studio Project to XML in 
	a SVG Font format.
**/


	function ioSVG_exportSVGfont() {
		// debug('\n ioSVG_exportSVGfont - Start');
		var ps = _GP.projectsettings;
		var md = _GP.metadata;
		var family = md.font_family;
		var familyid = family.replace(/ /g, '_');
		var timestamp = genDateStampSuffix();
		var timeoutput = timestamp.split('-');
		timeoutput[0] = timeoutput[0].replace(/\./g, '-');
		timeoutput[1] = timeoutput[1].replace(/\./g, ':');
		timeoutput = timeoutput.join(' at ');

		var con = '<?xml version="1.0"?>\n'+
			// '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >\n'+
			'<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'+
			'\t<metadata>\n\n'+
			'\t\tProject: ' + ps.name + '\n'+
			'\t\tFont exported on ' + timeoutput + '\n\n'+
			'\t\tCreated with Glyphr Studio - the free, web-based font editor\n'+
			'\t\t' + _UI.thisGlyphrStudioVersion + '\n'+
			'\t\t' + _UI.thisGlyphrStudioVersionNum + '\n\n'+
			'\t\tFind out more at www.glyphrstudio.com\n\n'+
			'\t</metadata>\n'+
			'\t<defs>\n'+
			'\t\t<font id="'+familyid+'" horiz-adv-x="'+ps.upm+'">\n'+
			'\t\t\t<font-face\n'+ ioSVG_makeFontFace()+'\n'+
			'\t\t\t\t<font-face-src>\n'+
			'\t\t\t\t\t<font-face-name name="'+family+'" />\n'+
			'\t\t\t\t</font-face-src>\n'+
			'\t\t\t</font-face>\n';

		con += '\n';
		con += ioSVG_makeMissingGlyph();
		con += '\n\n';
		con += ioSVG_makeAllGlyphsAndLigatures();
		con += '\n';
		con += ioSVG_makeAllKernPairs();
		con += '\n';

		con += '\t\t</font>\n'+
			'\t</defs>\n\n';

		// con += '\t<style type="text/css">\n';
		// con += '\t\t@font-face {\n';
		// con += '\t\t\tfont-family: "'+family+'", monospace;\n';
		// con += '\t\t\tsrc: url(#'+familyid+');\n';
		// con += '\t\t}\n';
		// con += '\t</style>\n\n';

		con += '\t<text x="100" y="150" style="font-size:48px;" font-family="'+family+'">'+family+'</text>\n';
		con += '\t<text x="100" y="220" style="font-size:48px;" font-family="'+family+'">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>\n';
		con += '\t<text x="100" y="290" style="font-size:48px;" font-family="'+family+'">abcdefghijklmnopqrstuvwxyz</text>\n';
		con += '\t<text x="100" y="360" style="font-size:48px;" font-family="'+family+'">1234567890</text>\n';
		con += '\t<text x="100" y="430" style="font-size:48px;" font-family="'+family+'">!\"#$%&amp;\'()*+,-./:;&lt;=&gt;?@[\\]^_`{|}~</text>\n';

		con += '</svg>';

		var filename = ps.name + ' - SVG Font - ' + timestamp + '.svg';

		saveFile(filename, con);

		// debug(' ioSVG_exportSVGfont - END\n');
	}

	function ioSVG_makeFontFace() {
		// debug('\n ioSVG_makeFontFace - START');
		calcFontMaxes();
		var t = '\t\t\t\t';
		var md = _GP.metadata;
		var ps = _GP.projectsettings;
		var fm = _UI.fontmetrics;
		var con = '';

		// Project properties
		con += t+'units-per-em="'+ps.upm+'"\n';
		con += t+'cap-height="'+ps.capheight+'"\n';
		con += t+'x-height="'+ps.xheight+'"\n';
		con += t+'ascent="'+ps.ascent+'"\n';
		con += t+'descent="'+ps.descent+'"\n';
		con += t+'bbox="'+fm.maxes.xmin+', '+fm.maxes.ymin+', '+fm.maxes.xmax+', '+fm.maxes.ymax+'"\n';
		con += t+'unicode-range="U+20-'+fm.maxglyph+'"\n';

		// Metadata properties
		for(var d in md){if(md.hasOwnProperty(d)){
			if(md[d] !== '{{sectionbreak}}'){
				con += t;
				con += d.replace(/_/g, '-');
				con += '=';
				// con += md[d] === '""'? '' : md[d];
				con += typeof md[d] === 'string'? JSON.stringify(removeEmptyStringInputs(md[d])) : ('"'+md[d]+'"');
				con += '\n';
			}
		}}
		con = con.substring(0, con.length-1);
		con += '>';

		// debug(' ioSVG_makeFontFace - END\n');
		return con;
	}

	function ioSVG_makeMissingGlyph() {
		// debug('\n ioSVG_makeMissingGlyph - START');
		var con = '         ';
		var gh = _GP.projectsettings.ascent;
		var gw = round(gh * 0.618);
		var gt = round(gh/100);

		con += '\t<missing-glyph horiz-adv-x="'+gw+'" ';
		con += 'd="M0,0 v'+gh+' h'+gw+' v-'+gh+' h-'+gw+'z ';
		con += 'M'+gt+','+gt+' v'+(gh-(gt*2))+' h'+(gw-(gt*2))+' v-'+(gh-(gt*2))+' h-'+(gw-(gt*2))+'z';
		con += '" />';

		// debug(' ioSVG_makeMissingGlyph - END\n');
		return con;
	}

	function ioSVG_makeAllGlyphsAndLigatures() {
		// debug('\n ioSVG_makeAllGlyphsAndLigatures - START');

		//<glyph glyph-name="uniFEDF_uniFEE0_uniFBAB.liga" unicode="&#xfedf;&#xfee0;&#xfbab;" horiz-adv-x="1262" d="M1224 5

		var fc = _GP.glyphs;
		var con = '';

		sortLigatures();
		var li = _GP.ligatures;
		con += '\t\t\t<!-- Ligatures -->\n';
		for(var l in li){ if (li.hasOwnProperty(l)){
			con += ioSVG_makeOneGlyphOrLigature(li[l], l);
		}}

		con += '\n';

		con += '\t\t\t<!-- Glyphs -->\n';
		for(var c in fc){ if (fc.hasOwnProperty(c)){
			con += ioSVG_makeOneGlyphOrLigature(fc[c], c);
		}}

		// debug(' ioSVG_makeAllGlyphsAndLigatures - END\n');
		return con;
	}

	function ioSVG_makeOneGlyphOrLigature(gl, uni) {
		// if(!gl.shapes.length && !gl.getTotalWidth()) return '';	
		// Results in lots of special unicoded glyphs with no shapes
		if(!gl.shapes.length && uni!=0x0020) {
			console.warn('Glyph ' + uni + ' not exported: No shapes.');
			return ''
		};


		uni = uni.split('0x');
		uni.forEach(function(v, i, a){
			// only export glyph if it has a valid hexadecimal unicode
			if(!validateHex(v)) {
				console.warn('Glyph ' + uni.join('') + ' not exported: Bad hex value.');
				return '';
			}

			if(v) a[i] = '&#x'+v+';';
		});
		uni = uni.join('');

		if(_GP.projectsettings.combineshapesonexport) gl = new Glyph(gl).flattenGlyph().combineAllShapes(true);
		var pathdata = gl.getSVGpathData();
		pathdata = pathdata || 'M0,0Z';

		var con = '\t\t\t';
		con += '<glyph glyph-name="'+gl.name.replace(/ /g, '_')+'" ';
		con += 'unicode="'+uni+'" ';
		con += 'horiz-adv-x="'+gl.getTotalWidth()+'" ';
		con += 'd="'+pathdata+'" />\n';
		return con;
	}

	function ioSVG_makeAllKernPairs() {
		// debug('\n ioSVG_makeAllKernPairs - START');
		var kp = _GP.kerning;
		var con = '\t\t\t<!-- Kern Pairs -->\n';

		for(var k in kp){ if (kp.hasOwnProperty(k)){
			for(var lg=0; lg<kp[k].leftgroup.length; lg++){
				for(var rg=0; rg<kp[k].rightgroup.length; rg++){
					con += '\t\t\t<hkern ';
					con += 'u1="'+hexToUnicodeHex(kp[k].leftgroup[lg])+'" ';
					con += 'u2="'+hexToUnicodeHex(kp[k].rightgroup[rg])+'" ';
					con += 'k="'+kp[k].value+'" />\n';
				}
			}
		}}

		// debug(' ioSVG_makeAllKernPairs - END\n');
		return con;
	}

// end of file