
//	------------------------
//	Save as a TTX XML
//	------------------------

	function generateTTXXML(){
		var fs = GlyphrProject.settings;
		var md = GlyphrProject.fontmetadata;
		var output = '<?xml version="1.0" encoding="ISO-8859-1"?>\n<ttFont sfntVersion="OTTO" ttLibVersion="2.3">\n\n';






	//--------------------
	// GLYPHORDER table
	//--------------------

		output += '<GlyphOrder>\n';
		output += '   <GlyphID id="0" name=".notdef"/>\n';
		for(var i=32; i<GlyphrProject.fontchars.length; i++){
			output += '   <GlyphID id="'+i+'" name="'+GlyphrProject.fontchars[i].charname+'"/>\n';
		}
		output += '</GlyphOrder>\n\n\n';







	//--------------------
	// HEAD table
	//--------------------

		output += '<head>\n';
		output += '   <tableVersion value="1.0"/> \n';
		output += '   <fontRevision value="123"/> \n';
		output += '   <checkSumAdjustment value="0x40304436"/> \n';
		output += '   <magicNumber value="0x5f0f3cf5"/> \n';
		output += '   <flags value="00000000 00000011"/> \n';
		output += '   <unitsPerEm value="'+fs.upm+'"/> \n';
		output += '   <created value="Tue Jul 28 19:53:05 2009"/> \n';
		output += '   <modified value="Thu Jan 05 23:39:43 2012"/> \n';
		output += '   <xMin value="0"/> \n';
		output += '   <yMin value="-'+fs.descender+'"/> \n';
		output += '   <xMax value="'+fs.upm+'"/> \n';
		output += '   <yMax value="'+(fs.upm-fs.descender)+'"/> \n';
		output += '   <macStyle value="00000000 00000000"/> \n';
		output += '   <lowestRecPPEM value="2"/> \n';
		output += '   <fontDirectionHint value="2"/> \n';
		output += '   <indexToLocFormat value="0"/> \n';
		output += '   <glyphDataFormat value="0"/> \n';
		output += '</head>\n\n\n';		







	//--------------------
	// HHEA table
	//--------------------

		output += '<hhea>\n';
		output += '   <tableVersion value="1.0"/> \n';
		output += '   <ascent value="'+(fs.upm-fs.descender)+'"/> \n';
		output += '   <descent value="-'+fs.descender+'"/> \n';
		output += '   <lineGap value="'+(fs.upm/8)+'"/> \n';
		output += '   <advanceWidthMax value="'+fs.upm+'"/> \n';
		output += '   <minLeftSideBearing value="-'+fs.upm+'"/> \n';
		output += '   <minRightSideBearing value="-'+fs.upm+'"/> \n';
		output += '   <xMaxExtent value="'+fs.upm+'"/> \n';
		output += '   <caretSlopeRise value="1"/> \n';
		output += '   <caretSlopeRun value="0"/> \n';
		output += '   <caretOffset value="0"/> \n';
		output += '   <reserved0 value="0"/> \n';
		output += '   <reserved1 value="0"/> \n';
		output += '   <reserved2 value="0"/> \n';
		output += '   <reserved3 value="0"/> \n';
		output += '   <metricDataFormat value="0"/> \n';
		output += '   <numberOfHMetrics value="1"/> \n';
		output += '</hhea>\n\n\n';







	//--------------------
	// MAXP table
	//--------------------

		output += '<maxp>\n';
		output += '   <tableVersion value="0x5000"/> \n';
		output += '   <numGlyphs value="'+GlyphrProject.fontchars.length+'"/> \n';
		output += '</maxp>\n\n\n';







	//--------------------
	// OS2 table
	//--------------------

		var susize = GlyphrProject.settings.upm/2;
		var suoff = GlyphrProject.settings.upm/4;
		
		output += '<OS_2>\n';
		output += '   <version value="3"/> \n';
		output += '   <xAvgCharWidth value="720"/>		<!-- GLYPHR SYSTEM DEFINED --> \n';
		output += '   <usWeightClass value="'+md.weightclass+'"/> \n';
		output += '   <usWidthClass value="'+md.widthclass+'"/> \n';
		output += '   <fsType value="00000000 00001000"/> \n';
		output += '   <ySubscriptXSize value="'+susize+'"/> \n';
		output += '   <ySubscriptYSize value="'+susize+'"/> \n';
		output += '   <ySubscriptXOffset value="0"/> \n';
		output += '   <ySubscriptYOffset value="'+suoff+'"/> \n';
		output += '   <ySuperscriptXSize value="'+susize+'"/> \n';
		output += '   <ySuperscriptYSize value="'+susize+'"/> \n';
		output += '   <ySuperscriptXOffset value="0"/> \n';
		output += '   <ySuperscriptYOffset value="'+suoff+'"/> \n';
		output += '   <yStrikeoutSize value="100"/> \n';
		output += '   <yStrikeoutPosition value="'+suoff+'"/> \n';
		output += '   <sFamilyClass value="0"/> \n';
		output += '   <panose> \n';								// PANOSE NEW OPTIONS
  		output += '      <bFamilyType value="2"/> \n';
  		output += '      <bSerifStyle value="15"/> \n';
  		output += '      <bWeight value="6"/> \n';
  		output += '      <bProportion value="9"/> \n';
  		output += '      <bContrast value="0"/> \n';
  		output += '      <bStrokeVariation value="1"/> \n';
  		output += '      <bArmStyle value="4"/> \n';
  		output += '      <bLetterForm value="6"/> \n';
  		output += '      <bMidline value="3"/> \n';
  		output += '      <bXHeight value="7"/> \n';
		output += '   </panose> \n';
		output += '   <ulUnicodeRange1 value="00000000 00000000 00000000 00000011"/> \n';
		output += '   <ulUnicodeRange2 value="00000000 00000000 00000000 00000000"/> \n';
		output += '   <ulUnicodeRange3 value="00000000 00000000 00000000 00000000"/> \n';
		output += '   <ulUnicodeRange4 value="00000000 00000000 00000000 00000000"/> \n';
		output += '   <achVendID value="MLAG"/> \n';
		output += '   <fsSelection value="00000000 01000000"/> \n';
		output += '   <fsFirstCharIndex value="32"/> \n';
		output += '   <fsLastCharIndex value="64258"/> \n';
		output += '   <sTypoAscender value="'+(fs.upm-fs.descender)+'"/> \n';
		output += '   <sTypoDescender value="-'+fs.descender+'"/> \n';	// Actually controls descender
		output += '   <sTypoLineGap value="'+fs.descender+'"/> \n';
		output += '   <usWinAscent value="'+(fs.upm-fs.descender)+'"/> \n';	// Actually controls descender
		output += '   <usWinDescent value="'+fs.descender+'"/> \n';
		output += '   <ulCodePageRange1 value="00100000 00000000 00000000 00000001"/> \n';
		output += '   <ulCodePageRange2 value="00000000 00000000 00000000 00000000"/> \n';
		output += '   <sxHeight value="'+fs.xheight+'"/> \n';
		output += '   <sCapHeight value="'+(fs.upm-fs.descender)+'"/> \n';
		output += '   <usDefaultChar value="0"/> \n';
		output += '   <usBreakChar value="32"/> \n';
		output += '   <usMaxContex value="4"/> \n';
		output += '</OS_2>\n\n\n';







	//--------------------
	// NAME table
	//--------------------

		output += '<name>\n';
		output += '   <namerecord nameID="0" platformID="1" platEncID="0" langID="0x0">'+md.copyright+'</namerecord>\n';
		output += '   <namerecord nameID="1" platformID="1" platEncID="0" langID="0x0">'+md.familyname+'</namerecord>\n';
		output += '   <namerecord nameID="2" platformID="1" platEncID="0" langID="0x0">'+md.subfamilyname+'</namerecord>\n';
		output += '   <namerecord nameID="3" platformID="1" platEncID="0" langID="0x0">'+(md.fullname+' ; '+md.version)+'</namerecord>\n';
		output += '   <namerecord nameID="4" platformID="1" platEncID="0" langID="0x0">'+md.fullname+'</namerecord>\n';
		output += '   <namerecord nameID="5" platformID="1" platEncID="0" langID="0x0">'+md.version+'</namerecord>\n';
		output += '   <namerecord nameID="6" platformID="1" platEncID="0" langID="0x0">'+md.fullname+'</namerecord>\n';
		output += '   <namerecord nameID="8" platformID="1" platEncID="0" langID="0x0">'+md.manufacturername+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="9" platformID="1" platEncID="0" langID="0x0">'+md.designername+'</namerecord>\n';
		output += '   <namerecord nameID="10" platformID="1" platEncID="0" langID="0x0">'+md.description+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="11" platformID="1" platEncID="0" langID="0x0">'+md.manufacturerurl+'</namerecord>\n';
		output += '   <namerecord nameID="12" platformID="1" platEncID="0" langID="0x0">'+md.designerurl+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="13" platformID="1" platEncID="0" langID="0x0">'+md.licensedescription+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="14" platformID="1" platEncID="0" langID="0x0">'+md.licenseurl+'</namerecord>\n';
		output += '   <namerecord nameID="0" platformID="3" platEncID="1" langID="0x409">'+md.copyright+'</namerecord>\n';
		output += '   <namerecord nameID="1" platformID="3" platEncID="1" langID="0x409">'+md.familyname+'</namerecord>\n';
		output += '   <namerecord nameID="2" platformID="3" platEncID="1" langID="0x409">'+md.subfamilyname+'</namerecord>\n';
		output += '   <namerecord nameID="3" platformID="3" platEncID="1" langID="0x409">'+(md.fullname+' ; '+md.version)+'</namerecord>\n';
		output += '   <namerecord nameID="4" platformID="3" platEncID="1" langID="0x409">'+md.fullname+'</namerecord>\n';
		output += '   <namerecord nameID="5" platformID="3" platEncID="1" langID="0x409">'+md.version+'</namerecord>\n';
		output += '   <namerecord nameID="6" platformID="3" platEncID="1" langID="0x409">'+md.fullname+'</namerecord>\n';
		output += '   <namerecord nameID="8" platformID="3" platEncID="1" langID="0x409">'+md.manufacturername+'</namerecord>\n';
		output += '   <namerecord nameID="9" platformID="3" platEncID="1" langID="0x409">'+md.designername+'</namerecord>\n';
		output += '   <namerecord nameID="10" platformID="3" platEncID="1" langID="0x409">'+md.description+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="11" platformID="3" platEncID="1" langID="0x409">'+md.manufacturerurl+'</namerecord>\n';
		output += '   <namerecord nameID="12" platformID="3" platEncID="1" langID="0x409">'+md.designerurl+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="13" platformID="3" platEncID="1" langID="0x409">'+md.licensedescription+'</namerecord>\n'; //ADDED
		output += '   <namerecord nameID="14" platformID="3" platEncID="1" langID="0x409">'+md.licenseurl+'</namerecord>\n';
		output += '</name>\n\n\n';







	//--------------------
	// CMAP table
	//--------------------

		var cment = "";
		var tc = {};
		
		for(var i=32; i<GlyphrProject.fontchars.length; i++){
			tc = GlyphrProject.fontchars[i];
			cment += "      <map code='"+tc.cmapcode+"' name='"+tc.charname+"'/>\n"; 
		}
		
		output += '<cmap>\n';
		output += '<tableVersion version="0"/>\n';
		output += '   <cmap_format_4 platformID="0" platEncID="3" language="0">\n';
		output += cment;
		output += '   </cmap_format_4>\n';
		output += '   <cmap_format_6 platformID="1" platEncID="0" language="0">\n';
		output += cment;
		output += '   </cmap_format_6>\n';
		output += '   <cmap_format_4 platformID="3" platEncID="1" language="0">\n';
		output += cment;
		output += '   </cmap_format_4>\n';
		output += '</cmap>\n\n\n';







	//--------------------
	// POST table
	//--------------------
	
		output += "<post>\n";
		output += '   <formatType value="3.0"/> \n';
		output += '   <italicAngle value="0.0"/>\n';		// NEW OPTION 
		output += '   <underlinePosition value="-50"/>\n';	// NEW OPTION 
		output += '   <underlineThickness value="100"/>\n';	// NEW OPTION 
		output += '   <isFixedPitch value="0"/>\n';			// 1 FOR MONOSPACED
		output += '   <minMemType42 value="0"/>\n';
		output += '   <maxMemType42 value="0"/>\n';
		output += '   <minMemType1 value="0"/>\n';
		output += '   <maxMemType1 value="0"/>\n';
		output += '</post>\n\n\n';







	//--------------------
	// CFF table
	//--------------------
		
		output += '<CFF>\n';
		output += '<CFFFont name="'+md.fullname+'">\n';
		output += '   <version value="003.000"/>\n';
		output += '   <Notice value="'+md.copyright+'"/>\n';
		output += '   <FullName value="'+md.fullname+'"/>\n';
		output += '   <FamilyName value="'+md.familyname+'"/>\n';
		output += '   <Weight value="'+md.weightclass+'"/>\n';
		output += '   <isFixedPitch value="1"/>\n';
		output += '   <ItalicAngle value="0"/>\n';
		output += '   <UnderlineThickness value="100"/>\n';
		output += '   <PaintType value="0"/>\n';
		output += '   <CharstringType value="2"/>\n';
		output += '   <FontMatrix value="0.001 0 0 0.001 0 0"/>\n';
		output += '   <FontBBox value="-720 -239 1440 823"/>\n';
		output += '   <StrokeWidth value="0"/>\n';
		output += '   <Encoding name="StandardEncoding"/>\n';
		output += '   <Private>\n ';
		output += '      <BlueValues value="0 0 539 539 778 778"/>\n ';
		output += '      <OtherBlues value="-204 -204"/>\n ';
		output += '      <BlueScale value="0.03963"/>\n ';
		output += '      <BlueShift value="7"/>\n ';
		output += '      <BlueFuzz value="1"/>\n ';
		output += '      <StdHW value="96"/>\n ';
		output += '      <StdVW value="96"/>\n ';
		output += '      <StemSnapH value="96 100"/>\n ';
		output += '      <StemSnapV value="96 100"/>\n ';
		output += '      <ForceBold value="0"/>\n ';
		output += '      <LanguageGroup value="0"/>\n ';
		output += '      <ExpansionFactor value="0.06"/>\n ';
		output += '      <initialRandomSeed value="0"/>\n ';
		output += '      <defaultWidthX value="720"/>\n ';
		output += '      <nominalWidthX value="0"/>\n ';
		output += '      <Subrs></Subrs>\n ';
		output += '   </Private>\n ';
		output += '   <CharStrings>\n';
		output += '         <CharString name=".notdef">endchar</CharString> \n'; 
		
			var thischar = new Object();
			debug("SAVE LOOP - fontchars.length = " + GlyphrProject.fontchars.length);
			for(var i in GlyphrProject.fontchars){
				thischar = GlyphrProject.fontchars[i];
				debug("SAVE LOOP - " + i + " name " + thischar.charname);
				output += '         <CharString name="'+thischar.charname+'">\n';
					
				for(var j=0; j<thischar.charglyphdata.length; j++){
					var tempthing = thischar.charglyphdata[j].genPostScript();
					//debug("IN SAVE LOOP FOR " + thischar.charname + " SHAPE " + j + " returned:<br><pre>" + tempthing + "</pre>");
					output += tempthing;
				}
			
				output += '            endchar\n';
				output += '         </CharString>\n';
			}
		
		output += '   </CharStrings>\n';
		output += '</CFFFont>\n';
		output += '<GlobalSubrs></GlobalSubrs>\n';
		output += '</CFF>\n\n\n';







	//--------------------
	// HMTX table
	//--------------------

		output += '<hmtx>\n';
		output += '   <mtx name=".notdef" width="720" lsb="110"/>\n';
		
		var mw = 0;
		for(var i=32; i<GlyphrProject.fontchars.length; i++){
			mw = GlyphrProject.fontchars[i].charwidth;
			mw? true : mw=(fs.kerning*fs.upm);
			
			output += "   <mtx name='"+GlyphrProject.fontchars[i].charname+"' width='"+mw+"' lsb='0'/>\n"; 
		}
		
		output += "</hmtx>\n\n\n";







	//---------------
	// END
	//---------------
		output += '</ttFont>';
		return output;
	}
