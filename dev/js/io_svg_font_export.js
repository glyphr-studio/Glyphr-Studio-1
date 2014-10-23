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
			'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >\n'+
			'<svg width="100%" height="100%">\n'+
			'   <metadata>\n\n'+
			'      Project: ' + ps.name + '\n'+
			'      Font exported on ' + timeoutput + '\n\n'+
			'      Created with Glyphr Studio - the free, web-based font editor\n'+
			'      Version: ' + _UI.thisGlyphrStudioVersion + '\n\n'+
			'      Find out more at www.glyphrstudio.com\n\n'+
			'   </metadata>\n'+
			'   <defs>\n'+
			'      <font id="'+md.font_family.replace(/ /g, '_')+'" horiz-adv-x="'+ps.upm+'">\n'+
			'         <font-face\n'+ ioSVG_makeFontFace()+'\n'+
			'            <font-face-src>\n'+
			'               <font-face-name name="'+md.font_family+'" />\n'+
			'            </font-face-src>\n'+
			'         </font-face>\n';

		con += '\n';
		con += ioSVG_makeMissingGlyph();
		con += '\n\n';
		con += ioSVG_makeAllCharsAndLigatures();
		con += '\n';
		con += ioSVG_makeAllKernPairs();
		con += '\n';

		con += '      </font>\n'+
			'   </defs>\n';

		con += '   <text x="100" y="150" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">'+md.font_family+'</text>\n';
		con += '   <text x="100" y="220" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>\n';
		con += '   <text x="100" y="290" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">abcdefghijklmnopqrstuvwxyz</text>\n';
		con += '   <text x="100" y="360" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">1234567890</text>\n';
		con += '   <text x="100" y="430" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">!\"#$%&amp;\'()*+,-./:;&lt;=&gt;?@[\\]^_`{|}~</text>\n';
		// con += '   <text x="100" y="430" style="font-size:48px; font-family:\''+md.font_family+'\', monospace;">! \" # $ % &amp; \' ( ) * + , - . / : ; &lt; = &gt; ? @ [ \\ ] ^ _ ` { | } ~</text>\n';

		con += '</svg>';

		var filename = ps.name + ' - SVG Font - ' + timestamp + '.svg';

		saveTextFile(filename, con);

		// debug(' ioSVG_exportSVGfont - END\n');
	}

	function ioSVG_makeFontFace() {
		debug('\n ioSVG_makeFontFace - START');
		var t = '            ';
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
		var con = '         ';
		var gh = _GP.projectsettings.ascent;
		var gw = round(gh * 0.618);
		var gt = round(gh/100);

		con += '<missing-glyph horiz-adv-x="1536" ';
		con += 'd="M0,0 v'+gh+' h'+gw+' v-'+gh+' h-'+gw+'z ';
		con += 'M'+gt+','+gt+' v'+(gh-(gt*2))+' h'+(gw-(gt*2))+' v-'+(gh-(gt*2))+' h-'+(gw-(gt*2))+'z';
		con += '" />';

		debug(' ioSVG_makeMissingGlyph - END\n');
		return con;
	}

	function ioSVG_makeAllCharsAndLigatures() {
		debug('\n ioSVG_makeAllCharsAndLigatures - START');

		//<glyph glyph-name="uniFEDF_uniFEE0_uniFBAB.liga" unicode="&#xfedf;&#xfee0;&#xfbab;" horiz-adv-x="1262" d="M1224 5

		var fc = _GP.fontchars;
		var con = '';

		var li = _GP.ligatures;
		con += '         <!-- Ligatures -->\n';
		for(var l in li){ if (li.hasOwnProperty(l)){
			con += ioSVG_makeOneCharOrLigature(li[l], l);
		}}

		con += '\n';

		con += '         <!-- Characters -->\n';
		for(var c in fc){ if (fc.hasOwnProperty(c)){
			con += ioSVG_makeOneCharOrLigature(fc[c], c);
		}}

		debug(' ioSVG_makeAllCharsAndLigatures - END\n');
		return con;
	}

	function ioSVG_makeOneCharOrLigature(ch, uni) {
		if(!ch.charshapes.length) return '';

		uni = uni.split('0x');
		uni.forEach(function(el, i, arr){if(el) arr[i] = '&#x'+el+';';});
		uni = uni.join('');
		var pathdata = ch.makeSVGpathData();

		var con = '         ';
		con += '<glyph glyph-name="'+ch.charname+'" ';
		con += 'unicode="'+uni+'" ';
		con += 'horiz-adv-x="'+ch.getTotalWidth()+'" ';
		con += 'd="'+pathdata+'" />\n';
		return con;
	}

	function ioSVG_makeAllKernPairs() {
		debug('\n ioSVG_makeAllKernPairs - START');
		var t = '         ';
		var kp = _GP.kerning;
		var con = t+'<!-- Kern Pairs -->\n';

		for(var k in kp){ if (kp.hasOwnProperty(k)){
			con += t+'<hkern ';
			con += 'u1="'+ioSVG_convertKernGroup(kp[k].leftgroup)+'" ';
			con += 'u2="'+ioSVG_convertKernGroup(kp[k].rightgroup)+'" ';
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