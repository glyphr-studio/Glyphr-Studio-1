
//	------------------------
//	Save as a TTX XML
//	------------------------

	function triggerTTXFileDownload(){		
		var ttxstring = generateTTXXML();
		ttxstring = ttxstring.replace(/\n/g, '\r\n');
		var blob = new Blob([ttxstring], { type: "text/plain;charset=utf-8" });

		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = "TTX Data - " + _GP.projectsettings.name + " - " + genDateStampSuffix() + ".ttx";
		link.click();
	}

	function generateTTXXML(){
		var con = '<?xml version="1.0" encoding="ISO-8859-1"?>\n';
		con += '<ttFont sfntVersion="OTTO" ttLibVersion="2.3">\n\n';
		con += genTable_glyphorder({});
		con += genTable_head({});
		con += genTable_hhea({});
		con += genTable_maxp({});
		con += genTable_os_2({});
		con += genTable_name({});
		con += genTable_cmap({});
		con += genTable_post({});
		con += genTable_cff({});
		con += genTable_hmtx({});
		con += '</ttFont>';

		return con;
	}



	function genTable_glyphorder(oa){
		var con = '<GlyphOrder>\n';
		con += '\t<GlyphID name=".notdef"/>\n';

		var count = 0;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			con += '\t<GlyphID name="' + _GP.fontchars[tc].charname + '"/>\n';
			count++;
		}

		//debug("EXPORT TTX - Loop Count = " + count);

		con += '</GlyphOrder>\n\n';
		return con;
	}

	function genTable_head(oa){
		var con = '<head>\n';
		//con += '<!-- Most of this table will be recalculated by the compiler -->';
		con += '\t<tableVersion value="1.0"/>\n';
		con += '\t<fontRevision value="' + getOTprop("head","fontRevision") + '"/>\n';	// VAR VERSION
		con += '\t<checkSumAdjustment value="0xfd4639aa"/>\n';
		con += '\t<magicNumber value="0x5f0f3cf5"/>\n';
		con += '\t<flags value="00000000 00000011"/>\n';
		con += '\t<unitsPerEm value="' + _GP.projectsettings.upm + '"/>\n';		// VAR UPM?
		con += '\t<created value="' + getOTprop("head","created") + '"/>\n';			// VAR CREATED DA\nTE
		con += '\t<modified value="' + ttxDateString() + '"/>\n';				// COMPUTED SAVE DATE
		con += '\t<xMin value="-100"/>\n';											// COMPUTED
		con += '\t<yMin value="-100"/>\n';											// COMPUTED
		con += '\t<xMax value="4048"/>\n';											// COMPUTED
		con += '\t<yMax value="4048"/>\n';											// COMPUTED
		con += '\t<macStyle value="00000000 00000000"/>\n';
		con += '\t<lowestRecPPEM value="3"/>\n';
		con += '\t<fontDirectionHint value="2"/>\n';
		con += '\t<indexToLocFormat value="0"/>\n';
		con += '\t<glyphDataFormat value="0"/>\n';	
		
		con += '</head>\n\n';
		return con;
	}

	function ttxDateString(){
		var d = new Date();
		var t = (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
		d = d.toDateString().split(" ");
		d.splice(3,0,t);
		var re = d.join(" ");
		//debug("TTXDATESTRING :  resulted " + re);
		return re;
	}

	function genTable_hhea(oa){
		var con = '<hhea>\n';
		con += '\t<tableVersion value="1.0"/>\n';
		con += '\t<ascent value="1836"/>\n';					// COMPUTED - OS_2 winAscender
		con += '\t<descent value="-724"/>\n';					// COMPUTED - OS_2 winDescender
		con += '\t<lineGap value="0"/>\n';						// COMPUTED - 0
		con += '\t<advanceWidthMax value="2100"/>\n';			// COMPUTED - max advance width from hmtx table
		con += '\t<minLeftSideBearing value="-123"/>\n';		// COMPUTED - min lsb from hmtx
		con += '\t<minRightSideBearing value="-124"/>\n';		// COMPUTED - MIN(advance width - lsb - (xMax-xMin))
		con += '\t<xMaxExtent value="2100"/>\n';				// COMPUTED - MAX(lsb + (xMax - xMin))
		// italics
		con += '\t<caretSlopeRise value="1"/>\n';
		con += '\t<caretSlopeRun value="0"/>\n';
		con += '\t<caretOffset value="0"/>\n';
		// reserved = 0
		con += '\t<reserved0 value="0"/>\n';
		con += '\t<reserved1 value="0"/>\n';
		con += '\t<reserved2 value="0"/>\n';
		con += '\t<reserved3 value="0"/>\n';
		con += '\t<metricDataFormat value="0"/>\n';

		// # entries in the hmtx table: GLYPH COUNT!!!
		con += '\t<numberOfHMetrics value="95"/>\n';		
		
		con += '</hhea>\n\n';
		return con;
	}

	function genTable_maxp(oa){
		var con = '<maxp>\n';
		con += '\t<tableVersion value="0x5000"/>\n';

		//GLYPH COUNT!!
		con += '\t<numGlyphs value="95"/>\n';

		con += '</maxp>\n\n';
		return con;
	}

	function genTable_os_2(oa){
		var con = '<OS_2>\n';
		con += '\t<version value="3"/>\n';
		con += '\t<xAvgCharWidth value="2100"/>\n';			// COMPUTED
		con += '\t<usWeightClass value="' + getOTprop("os_2","usWeightClass") + '"/>\n';	// VAR weight class
		con += '\t<usWidthClass value="' + getOTprop("os_2","usWidthClass") + '"/>\n';		// VAR width class
		con += '\t<fsType value="00000000 00001000"/>\n';

		// Subscript
		con += '\t<ySubscriptXSize value="650"/>\n';
		con += '\t<ySubscriptYSize value="600"/>\n';
		con += '\t<ySubscriptXOffset value="0"/>\n';
		con += '\t<ySubscriptYOffset value="75"/>\n';
		con += '\t<ySuperscriptXSize value="650"/>\n';
		con += '\t<ySuperscriptYSize value="600"/>\n';
		con += '\t<ySuperscriptXOffset value="0"/>\n';
		con += '\t<ySuperscriptYOffset value="350"/>\n';
		con += '\t<yStrikeoutSize value="50"/>\n';
		con += '\t<yStrikeoutPosition value="384"/>\n';
		con += '\t<sFamilyClass value="0"/>\n';
		con += '\t<panose>\n';								// http://www.monotypeimaging.com/ProductsServices/pan1.aspx
			con += '\t\t<bFamilyType value="2"/>\n';			// 2 = Latin
			con += '\t\t<bSerifStyle value="0"/>\n';			// 0 = 'any' ...
			con += '\t\t<bWeight value="0"/>\n';
			con += '\t\t<bProportion value="0"/>\n';
			con += '\t\t<bContrast value="0"/>\n';
			con += '\t\t<bStrokeVariation value="0"/>\n';
			con += '\t\t<bArmStyle value="0"/>\n';
			con += '\t\t<bLetterForm value="0"/>\n';
			con += '\t\t<bMidline value="0"/>\n';
			con += '\t\t<bXHeight value="0"/>\n';
		con += '\t</panose>\n';
		con += '\t<ulUnicodeRange1 value="00000000 00000000 00000000 00000001"/>\n';
		con += '\t<ulUnicodeRange2 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<ulUnicodeRange3 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<ulUnicodeRange4 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<achVendID value=""/>\n';
		con += '\t<fsSelection value="00000000 00000000"/>\n';
		con += '\t<fsFirstCharIndex value="32"/>\n';
		con += '\t<fsLastCharIndex value="64258"/>\n';

		// Line Metrics
		// $$$ http://typophile.com/node/13081
		// $$$ 2048 * 1.25 = 2560 = Asc + Des + LineGap
		// $$$ sTypoAsc + sTypoDes = UPM, or if not
		// $$$ 		(UPM - (sTypoAsc + sTypoDes))/2, add back to sTypoAsc and sTypoDes
		// $$$ 2560 - 2048 = difference = STypoLineGap = 512

		con += '\t<sTypoAscender value="1464"/>\n';		// COMPUTED vertical above baseline		$$$ ex 1430
		con += '\t<sTypoDescender value="-584"/>\n';	// COMPUTED vertical below baseline		$$$ ex 550
		con += '\t<sTypoLineGap value="512"/>\n';		// COMPUTED diff between bigUPM and UPM $$$ ex 512
		con += '\t<usWinAscent value="1836"/>\n';		// COMPUTED proprotional split of 2560 	$$$ ex 1836
		con += '\t<usWinDescent value="724"/>\n';		// COMPUTED proprotional split of 2560 	$$$ ex 724

		con += '\t<ulCodePageRange1 value="00100000 00000000 00000000 00000001"/>\n';
		con += '\t<ulCodePageRange2 value="00000000 00000000 00000000 00000000"/>\n';
		con += '\t<sxHeight value="640"/>\n';			// COMPUTED - xheight
		con += '\t<sCapHeight value="1464"/>\n';		// COMPUTED - Hheight
		con += '\t<usDefaultChar value="0"/>\n';
		con += '\t<usBreakChar value="32"/>\n';
		con += '\t<usMaxContex value="4"/>\n';
		
		con += '</OS_2>\n\n';
		return con;
	}

	function genTable_name(oa){
		var otsn = _GP.opentypeproperties.name;
		
		var con = '<name>\n';
		con += '\t<namerecord nameID="0" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[0].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="1" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[1].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="2" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[2].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="3" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[3].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="4" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[4].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="5" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[5].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="6" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[6].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="8" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[8].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="9" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[9].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="10" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[10].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="11" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[11].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="12" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[12].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="13" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[13].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="14" platformID="1" platEncID="0" langID="0x0">\n\t\t'+ otsn[14].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="0" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[0].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="1" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[1].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="2" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[2].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="3" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[3].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="4" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[4].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="5" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[5].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="6" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[6].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="8" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[8].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="9" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[9].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="10" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[10].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="11" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[11].val +'\n\t</namerecord>\n';
		con += '\t<namerecord nameID="12" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[12].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="13" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[13].val +'\n\t</namerecord>\n'; 
		con += '\t<namerecord nameID="14" platformID="3" platEncID="1" langID="0x409">\n\t\t'+ otsn[14].val +'\n\t</namerecord>\n';
		con += '</name>\n\n';

		return con;
	}


	function genTable_cmap(oa){
		var cmapbody = "";
		for(var tc=32; tc<_GP.fontchars.length; tc++){
			cmapbody += '\t\t<map code="'+_GP.fontchars[tc].cmapcode+'" name="' + _GP.fontchars[tc].charname + '"/>\n';
		}

		var con = '<cmap>\n';
		con += '<tableVersion version="0"/>\n';
		
		con += '\t<cmap_format_4 platformID="0" platEncID="3" language="0">\n';	
		con += cmapbody;
		con += '\t</cmap_format_4>\n';

		con += '\t<cmap_format_6 platformID="1" platEncID="0" language="0">\n';
		con += cmapbody;
		con += '\t</cmap_format_6>\n';
	
		con += '\t<cmap_format_4 platformID="3" platEncID="1" language="0">\n';
		con += cmapbody;
		con += '\t</cmap_format_4>\n';

		con += '</cmap>\n\n';
		return con;
	}

	function genTable_post(oa){
		var con = '<post>\n';
		con += '\t<formatType value="3.0"/>\n';
		con += '\t<italicAngle value="'+getOTprop("post","italicAngle")+'"/>\n';				// VAR
		con += '\t<underlinePosition value="'+getOTprop("post","underlinePosition")+'"/>\n';	// VAR
		con += '\t<underlineThickness value="'+getOTprop("post","underlineThickness")+'"/>\n';	// VAR
		con += '\t<isFixedPitch value="0"/>\n';
		con += '\t<minMemType42 value="0"/>\n';
		con += '\t<maxMemType42 value="0"/>\n';
		con += '\t<minMemType1 value="0"/>\n';
		con += '\t<maxMemType1 value="0"/>\n';		
		
		con += '</post>\n\n';
		return con;
	}

	function genTable_cff(oa){
		var md = _GP.opentypeproperties;
		var con = '<CFF>\n';
		con += '\t<CFFFont name="'+md.name[1].val+'">\n';							//VAR
		con += '\t\t<version value="002.000"/>\n';		
		con += '\t\t<Notice value="'+getOTprop("cff","Notice")+'"/>\n';				//VAR
		con += '\t\t<FullName value="'+getOTprop("cff","FullName")+'"/>\n';			//VAR
		con += '\t\t<FamilyName value="'+getOTprop("cff","FamilyName")+'"/>\n';		//VAR
		con += '\t\t<Weight value="'+getOTprop("cff","Weight")+'"/>\n';				//VAR
		con += '\t\t<isFixedPitch value="0"/>\n';
		con += '\t\t<ItalicAngle value="0"/>\n';
		con += '\t\t<UnderlineThickness value="50"/>\n';
		con += '\t\t<PaintType value="0"/>\n';
		con += '\t\t<CharstringType value="2"/>\n';
		con += '\t\t<FontMatrix value="0.001 0 0 0.001 0 0"/>\n';
		con += '\t\t<FontBBox value="0 0 0 0"/>\n';					// UPM??
		//con += '\t\t<FontBBox value="-123 -315 1264 1101"/>\n';	// UPM??
		con += '\t\t<StrokeWidth value="0"/>\n';
		con += '\t\t<Encoding name="StandardEncoding"/>\n';
		con += '\t\t<Private>\n';
		/*
			con += '<BlueValues value="-15 0 832 847 640 655"/>';
			con += '<OtherBlues value="-206 -200"/>';
			con += '<BlueScale value="0.039625"/>';
			con += '<BlueShift value="7"/>';
			con += '<BlueFuzz value="1"/>';
			con += '<StdHW value="118"/>';
			con += '<StdVW value="135"/>';
			con += '<ForceBold value="0"/>';
			con += '<LanguageGroup value="0"/>';
			con += '<ExpansionFactor value="0.06"/>';
			con += '<initialRandomSeed value="0"/>';
			con += '<defaultWidthX value="580"/>';
			con += '<nominalWidthX value="607"/>';
		*/
		con += '\t\t</Private>\n';
		con += '\t\t<CharStrings>\n';

		con += genCharStringsPostScript();

		con += '\t\t</CharStrings>\n';
		con += '\t</CFFFont>\n';
		con += '</CFF>\n\n';
		return con;
	}

	function genCharStringsPostScript(){
		var con = '\t\t\t<CharString name=".notdef">\n\t\t\t\tendchar\n\t\t\t</CharString>\n';
		var lastx, lasty;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			con += '\t\t\t<CharString name="' + _GP.fontchars[tc].charname + '">\n';
			lastx = 0;
			lasty = 0;
			rvar = {};

			//debug("GENCHARSTRINGSPOSTSCRIPT: \t starting char " + _GP.fontchars[tc].charname);

			for(var ts=0; ts<_GP.fontchars[tc].charshapes.length; ts++){
				rvar = _GP.fontchars[tc].charshapes[ts].genPostScript(lastx, lasty);
				//debug("path " + ts + " returning \t " + JSON.stringify(rvar));
				con += rvar.re;
				lastx = rvar.lastx;
				lasty = rvar.lasty;
			}
			
			con += '\t\t\t\tendchar\n';
			con += '\t\t\t</CharString>\n';
		}
		return con;
	}


	function genTable_hmtx(oa){
		var con = '<hmtx>\n';
		con += '\t<mtx name=".notdef" width="2100" lsb="0"/>\n';
		var lsb, curr;

		for(var tc=32; tc<_GP.fontchars.length; tc++){
			curr = _GP.fontchars[tc];
			lsb = (curr.leftsidebearing === false)? _GP.projectsettings.defaultlsb : curr.leftsidebearing;
			con += '\t<mtx name="' + curr.charname + '" width="'+curr.charwidth+'" lsb="'+lsb+'"/>\n';
		}

		con += '</hmtx>\n\n';
		return con;
	}

