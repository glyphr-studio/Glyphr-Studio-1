// start of file

//	--------------------------
//	Export SVG Font
//	--------------------------

	function ioSVG_exportSVGfont() {
		// debug('\n ioSVG_exportSVGfont - Start');
		var ps = _GP.projectsettings;
		var md = _GP.metadata;
		var timestamp = genDateStampSuffix();
		var timeoutput = timestamp.split('-');
		timeoutput[0] = timeoutput[0].replace(/\./g, '-');
		timeoutput[1] = timeoutput[1].replace(/\./g, ':');
		timeoutput = timeoutput.join(' at ');

		var con = '<?xml version="1.0" standalone="yes"?>\n'+
			'<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'+
			'\t<metadata>\n\n'+
			'\t\tProject: ' + ps.name + '\n'+
			'\t\tFont exported on ' + timeoutput + '\n\n'+
			'\t\tCreated with Glyphr Studio - the free, web-based font editor\n'+
			'\t\tVersion: ' + _UI.thisGlyphrStudioVersion + '\n\n'+
			'\t\tFind out more at www.glyphrstudio.com\n\n'+
			'\t</metadata>\n'+
			'\t<defs>\n'+
			'\t\t<font id="'+md.font_family.replace(/ /g, '_')+'" horiz-adv-x="'+ps.upm+'">\n'+
			'\t\t\t<font-face\n'+ ioSVG_makeFontFace()+'\n'+
			'\t\t\t\t<font-face-src>\n'+
			'\t\t\t\t\t<font-face-name name="'+md.font_family+'" />\n'+
			'\t\t\t\t</font-face-src>\n'+
			'\t\t\t</font-face>\n';

		con += '\n';
		con += ioSVG_makeMissingGlyph();
		con += '\n\n';
		con += ioSVG_makeAllCharsAndLigatures();
		con += '\n';
		con += ioSVG_makeAllKernPairs();
		con += '\n';

		con += '\t\t</font>\n'+
			'\t</defs>\n'+
			'</svg>';

		var filename = ps.name + ' - SVG Font - ' + timestamp + '.svg';

		saveTextFile(filename, con);

		// debug(' ioSVG_exportSVGfont - END\n');
	}

	function ioSVG_makeFontFace() {
		debug('\n ioSVG_makeFontFace - START');
		var t = '\t\t\t\t';
		var md = _GP.metadata;
		var con = '';

		for(var d in md){if(md.hasOwnProperty(d)){
			con += t;
			con += d.replace(/_/g, '-');
			con += '="';
			con += md[d];
			con += '"\n';
		}}
		con = con.substring(0, con.length-1);
		con += '>';

		debug(' ioSVG_makeFontFace - END\n');
		return con;
	}

	function ioSVG_makeMissingGlyph() {
		debug('\n ioSVG_makeMissingGlyph - START');
		var t = '\t\t\t';
		var con = t;

		con += '<missing-glyph horiz-adv-x="1536" d="M256 0v1280h1024v-1280h-1024zM288 32h960v1216h-960v-1216z"/>';

		debug(' ioSVG_makeMissingGlyph - END\n');
		return con;
	}

	function ioSVG_makeAllCharsAndLigatures() {
		debug('\n ioSVG_makeAllCharsAndLigatures - START');

		//<glyph glyph-name="uniFEDF_uniFEE0_uniFBAB.liga" unicode="&#xfedf;&#xfee0;&#xfbab;" horiz-adv-x="1262" d="M1224 5

		var fc = _GP.fontchars;
		var con = '';

		var li = _GP.ligatures;
		con += '\t\t\t<!-- Ligatures -->\n';
		for(var l in li){ if (li.hasOwnProperty(l)){
			con += ioSVG_makeOneCharOrLigature(li[l], l);
		}}

		con += '\n';

		con += '\t\t\t<!-- Characters -->\n';
		for(var c in fc){ if (fc.hasOwnProperty(c)){
			con += ioSVG_makeOneCharOrLigature(fc[c], c);
		}}

		debug(' ioSVG_makeAllCharsAndLigatures - END\n');
		return con;
	}

	function ioSVG_makeOneCharOrLigature(ch, uni) {
		uni = uni.split('0x');
		uni.forEach(function(el, i, arr){if(el) arr[i] = '&#x'+el+';';});
		uni = uni.join('');
		var pathdata = ch.makeSVGpathData();

		var con = '\t\t\t';
		con += '<glyph glyph-name="'+ch.charname+'" ';
		con += 'unicode="'+uni+'" ';
		con += 'horiz-adv-x="'+ch.charwidth+'" ';
		con += 'd="'+pathdata+'" />\n';
		return con;
	}

	function ioSVG_makeAllKernPairs() {
		debug('\n ioSVG_makeAllKernPairs - START');
		var t = '\t\t\t';
		var kp = _GP.kerning;
		var con = t+'<!-- Kern Pairs -->\n';

		for(var k in kp){ if (kp.hasOwnProperty(k)){
			con += t+'<hkern ';
			con += 'g1="'+ioSVG_convertKernGroup(kp[k].leftgroup)+'" ';
			con += 'g2="'+ioSVG_convertKernGroup(kp[k].rightgroup)+'" ';
			con += 'k="'+kp[k].value+'" />\n';
		}}

		debug(' ioSVG_makeAllKernPairs - END\n');
		return con;
	}

	function ioSVG_convertKernGroup (kgarr) {
		var re = clone(kgarr);
		re.forEach(function(el, i, arr){
			arr[i] = arr[i].replace(/0x/, '&#x');
			arr[i] += ';';
		});

		return re.join(',');
	}

// end of file