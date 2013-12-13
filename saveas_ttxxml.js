
//	------------------------
//	Save as a TTX XML
//	------------------------

	function triggerTTXFileDownload(){
		//JSON CONVERSION!!!!!!
		//var output = generateGlyphrProjectJS();

		var link = document.createElement('a');
		link.href = 'data:text/plain,' + generateTTXXML();
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();
		
		link.download = "TTX Data - " + _G.fontsettings.familyname + " - " +yr+"."+mo+"."+day+"-"+hr+"."+min+"."+sec+".xml";
		link.click();
	}

	function generateTTXXML(){

		
		var h1 = '<?xml version="1.0" encoding="ISO-8859-1"?><ttFont sfntVersion="\\' + 
			["x00","x01","x00","x00"].join("\\") + 
			'" ttLibVersion="2.3">' +
		  '<GlyphOrder>' +
		    '<!-- The id attribute is only for humans; it is ignored when parsed. -->' +
		    '<GlyphID id="0" name=".notdef"/>' +
		    '<GlyphID id="1" name="glyph00001"/>' +
		    '<GlyphID id="2" name="glyph00002"/>' +
		    '<GlyphID id="3" name="space"/>' +
		    '<GlyphID id="4" name="exclam"/>' +
		    '<GlyphID id="5" name="A"/>' +
		    '<GlyphID id="6" name="B"/>' +
		    '<GlyphID id="7" name="C"/>' +
		    '<GlyphID id="8" name="D"/>' +
		    '<GlyphID id="9" name="E"/>' +
		    '<GlyphID id="10" name="F"/>' +
		    '<GlyphID id="11" name="G"/>' +
		    '<GlyphID id="12" name="a"/>' +
		    '<GlyphID id="13" name="b"/>' +
		    '<GlyphID id="14" name="c"/>' +
		    '<GlyphID id="15" name="d"/>' +
		    '<GlyphID id="16" name="e"/>' +
		    '<GlyphID id="17" name="f"/>' +
		    '<GlyphID id="18" name="g"/>' +
		  '</GlyphOrder>' +
'' +
		  '<head>' +
		    '<!-- Most of this table will be recalculated by the compiler -->' +
		    '<tableVersion value="1.0"/>' +
		    '<fontRevision value="1.0"/>' +
		    '<checkSumAdjustment value="0xccb8b8bc"/>' +
		    '<magicNumber value="0x5f0f3cf5"/>' +
		    '<flags value="00000000 00000000"/>' +
		    '<unitsPerEm value="1024"/>' +
		    '<created value="Sun Dec 08 22:10:53 2013"/>' +
		    '<modified value="Sun Dec 08 22:10:53 2013"/>' +
		    '<xMin value="0"/>' +
		    '<yMin value="0"/>' +
		    '<xMax value="1024"/>' +
		    '<yMax value="1024"/>' +
		    '<macStyle value="00000000 00000000"/>' +
		    '<lowestRecPPEM value="8"/>' +
		    '<fontDirectionHint value="2"/>' +
		    '<indexToLocFormat value="1"/>' +
		    '<glyphDataFormat value="0"/>' +
		  '</head>' +
'' +
		  '<hhea>' +
		    '<tableVersion value="1.0"/>' +
		    '<ascent value="1024"/>' +
		    '<descent value="0"/>' +
		    '<lineGap value="0"/>' +
		    '<advanceWidthMax value="2048"/>' +
		    '<minLeftSideBearing value="0"/>' +
		    '<minRightSideBearing value="1024"/>' +
		    '<xMaxExtent value="1024"/>' +
		    '<caretSlopeRise value="1"/>' +
		    '<caretSlopeRun value="0"/>' +
		    '<caretOffset value="0"/>' +
		    '<reserved0 value="0"/>' +
		    '<reserved1 value="0"/>' +
		    '<reserved2 value="0"/>' +
		    '<reserved3 value="0"/>' +
		    '<metricDataFormat value="0"/>' +
		    '<numberOfHMetrics value="19"/>' +
		  '</hhea>' +
'' +
		  '<maxp>' +
		    '<!-- Most of this table will be recalculated by the compiler -->' +
		    '<tableVersion value="0x10000"/>' +
		    '<numGlyphs value="19"/>' +
		    '<maxPoints value="23"/>' +
		    '<maxContours value="5"/>' +
		    '<maxCompositePoints value="0"/>' +
		    '<maxCompositeContours value="0"/>' +
		    '<maxZones value="2"/>' +
		    '<maxTwilightPoints value="0"/>' +
		    '<maxStorage value="0"/>' +
		    '<maxFunctionDefs value="0"/>' +
		    '<maxInstructionDefs value="0"/>' +
		    '<maxStackElements value="0"/>' +
		    '<maxSizeOfInstructions value="0"/>' +
		    '<maxComponentElements value="0"/>' +
		    '<maxComponentDepth value="0"/>' +
		  '</maxp>' +
'' +
		  '<OS_2>' +
		    '<version value="2"/>' +
		    '<xAvgCharWidth value="916"/>' +
		    '<usWeightClass value="400"/>' +
		    '<usWidthClass value="5"/>' +
		    '<fsType value="00000000 00000100"/>' +
		    '<ySubscriptXSize value="512"/>' +
		    '<ySubscriptYSize value="512"/>' +
		    '<ySubscriptXOffset value="0"/>' +
		    '<ySubscriptYOffset value="0"/>' +
		    '<ySuperscriptXSize value="512"/>' +
		    '<ySuperscriptYSize value="512"/>' +
		    '<ySuperscriptXOffset value="0"/>' +
		    '<ySuperscriptYOffset value="512"/>' +
		    '<yStrikeoutSize value="51"/>' +
		    '<yStrikeoutPosition value="204"/>' +
		    '<sFamilyClass value="0"/>' +
		    '<panose>' +
		      '<bFamilyType value="0"/>' +
		      '<bSerifStyle value="0"/>' +
		      '<bWeight value="4"/>' +
		      '<bProportion value="0"/>' +
		      '<bContrast value="0"/>' +
		      '<bStrokeVariation value="0"/>' +
		      '<bArmStyle value="0"/>' +
		      '<bLetterForm value="0"/>' +
		      '<bMidline value="0"/>' +
		      '<bXHeight value="0"/>' +
		    '</panose>' +
		    '<ulUnicodeRange1 value="00000000 00000000 00000000 00000001"/>' +
		    '<ulUnicodeRange2 value="00000000 00000000 00000000 00000000"/>' +
		    '<ulUnicodeRange3 value="00000000 00000000 00000000 00000000"/>' +
		    '<ulUnicodeRange4 value="00000000 00000000 00000000 00000000"/>' +
		    '<achVendID value="FSTR"/>' +
		    '<fsSelection value="00000000 01000000"/>' +
		    '<fsFirstCharIndex value="32"/>' +
		    '<fsLastCharIndex value="103"/>' +
		    '<sTypoAscender value="1024"/>' +
		    '<sTypoDescender value="0"/>' +
		    '<sTypoLineGap value="0"/>' +
		    '<usWinAscent value="1024"/>' +
		    '<usWinDescent value="0"/>' +
		    '<ulCodePageRange1 value="00000000 00000000 00000000 00000001"/>' +
		    '<ulCodePageRange2 value="00000000 00000000 00000000 00000000"/>' +
		    '<sxHeight value="0"/>' +
		    '<sCapHeight value="0"/>' +
		    '<usDefaultChar value="0"/>' +
		    '<usBreakChar value="32"/>' +
		    '<usMaxContex value="0"/>' +
		  '</OS_2>' +
'' +
		  '<hmtx>' +
		    '<mtx name=".notdef" width="0" lsb="0"/>' +
		    '<mtx name="A" width="2048" lsb="0"/>' +
		    '<mtx name="B" width="2048" lsb="0"/>' +
		    '<mtx name="C" width="2048" lsb="0"/>' +
		    '<mtx name="D" width="2048" lsb="0"/>' +
		    '<mtx name="E" width="2048" lsb="0"/>' +
		    '<mtx name="F" width="2048" lsb="0"/>' +
		    '<mtx name="G" width="2048" lsb="0"/>' +
		    '<mtx name="a" width="2048" lsb="0"/>' +
		    '<mtx name="b" width="2048" lsb="0"/>' +
		    '<mtx name="c" width="2048" lsb="0"/>' +
		    '<mtx name="d" width="2048" lsb="0"/>' +
		    '<mtx name="e" width="2048" lsb="0"/>' +
		    '<mtx name="exclam" width="2048" lsb="0"/>' +
		    '<mtx name="f" width="2048" lsb="0"/>' +
		    '<mtx name="g" width="2048" lsb="0"/>' +
		    '<mtx name="glyph00001" width="0" lsb="0"/>' +
		    '<mtx name="glyph00002" width="1024" lsb="0"/>' +
		    '<mtx name="space" width="2048" lsb="0"/>' +
		  '</hmtx>' +
'' +
		  '<cmap>' +
		    '<tableVersion version="0"/>' +
		    '<cmap_format_4 platformID="0" platEncID="3" language="0">' +
		      '<map code="0x20" name="space"/><!-- SPACE -->' +
		      '<map code="0x21" name="exclam"/><!-- EXCLAMATION MARK -->' +
		      '<map code="0x41" name="A"/><!-- LATIN CAPITAL LETTER A -->' +
		      '<map code="0x42" name="B"/><!-- LATIN CAPITAL LETTER B -->' +
		      '<map code="0x43" name="C"/><!-- LATIN CAPITAL LETTER C -->' +
		      '<map code="0x44" name="D"/><!-- LATIN CAPITAL LETTER D -->' +
		      '<map code="0x45" name="E"/><!-- LATIN CAPITAL LETTER E -->' +
		      '<map code="0x46" name="F"/><!-- LATIN CAPITAL LETTER F -->' +
		      '<map code="0x47" name="G"/><!-- LATIN CAPITAL LETTER G -->' +
		      '<map code="0x61" name="a"/><!-- LATIN SMALL LETTER A -->' +
		      '<map code="0x62" name="b"/><!-- LATIN SMALL LETTER B -->' +
		      '<map code="0x63" name="c"/><!-- LATIN SMALL LETTER C -->' +
		      '<map code="0x64" name="d"/><!-- LATIN SMALL LETTER D -->' +
		      '<map code="0x65" name="e"/><!-- LATIN SMALL LETTER E -->' +
		      '<map code="0x66" name="f"/><!-- LATIN SMALL LETTER F -->' +
		      '<map code="0x67" name="g"/><!-- LATIN SMALL LETTER G -->' +
		    '</cmap_format_4>' +
		    '<cmap_format_4 platformID="3" platEncID="1" language="0">' +
		      '<map code="0x20" name="space"/><!-- SPACE -->' +
		      '<map code="0x21" name="exclam"/><!-- EXCLAMATION MARK -->' +
		      '<map code="0x41" name="A"/><!-- LATIN CAPITAL LETTER A -->' +
		      '<map code="0x42" name="B"/><!-- LATIN CAPITAL LETTER B -->' +
		      '<map code="0x43" name="C"/><!-- LATIN CAPITAL LETTER C -->' +
		      '<map code="0x44" name="D"/><!-- LATIN CAPITAL LETTER D -->' +
		      '<map code="0x45" name="E"/><!-- LATIN CAPITAL LETTER E -->' +
		      '<map code="0x46" name="F"/><!-- LATIN CAPITAL LETTER F -->' +
		      '<map code="0x47" name="G"/><!-- LATIN CAPITAL LETTER G -->' +
		      '<map code="0x61" name="a"/><!-- LATIN SMALL LETTER A -->' +
		      '<map code="0x62" name="b"/><!-- LATIN SMALL LETTER B -->' +
		      '<map code="0x63" name="c"/><!-- LATIN SMALL LETTER C -->' +
		      '<map code="0x64" name="d"/><!-- LATIN SMALL LETTER D -->' +
		      '<map code="0x65" name="e"/><!-- LATIN SMALL LETTER E -->' +
		      '<map code="0x66" name="f"/><!-- LATIN SMALL LETTER F -->' +
		      '<map code="0x67" name="g"/><!-- LATIN SMALL LETTER G -->' +
		    '</cmap_format_4>' +
		  '</cmap>' +
'' +
		  '<loca>' +
		    '<!-- The loca table will be calculated by the compiler -->' +
		  '</loca>' +
'' +
		  '<glyf>' +
'' +
		    '<!-- The xMin, yMin, xMax and yMax values' +
		         'will be recalculated by the compiler. -->' +
'' +
		    '<TTGlyph name=".notdef" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="512" y="145" on="1"/>' +
		        '<pt x="512" y="308" on="1"/>' +
		        '<pt x="349" y="308" on="1"/>' +
		        '<pt x="349" y="145" on="1"/>' +
		      '</contour>' +
		      '<contour>' +
		        '<pt x="674" y="335" on="1"/>' +
		        '<pt x="674" y="498" on="1"/>' +
		        '<pt x="349" y="498" on="1"/>' +
		        '<pt x="349" y="335" on="1"/>' +
		      '</contour>' +
		      '<contour>' +
		        '<pt x="512" y="525" on="1"/>' +
		        '<pt x="512" y="688" on="1"/>' +
		        '<pt x="349" y="688" on="1"/>' +
		        '<pt x="349" y="525" on="1"/>' +
		      '</contour>' +
		      '<contour>' +
		        '<pt x="674" y="715" on="1"/>' +
		        '<pt x="674" y="877" on="1"/>' +
		        '<pt x="512" y="877" on="1"/>' +
		        '<pt x="444" y="877" on="0"/>' +
		        '<pt x="397" y="830" on="1"/>' +
		        '<pt x="349" y="782" on="0"/>' +
		        '<pt x="349" y="715" on="1"/>' +
		      '</contour>' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="A" xMin="0" yMin="0" xMax="1024" yMax="1024">';

		    /*
		      <contour>
		        <pt x="550" y="550" on="1"/>
		        <pt x="0" y="1024" on="1"/>
		        <pt x="1024" y="1024" on="1"/>
		        <pt x="1024" y="0" on="1"/>
		      </contour>
		      <contour>
		        <pt x="0" y="0" on="1"/>
		        <pt x="802" y="0" on="1"/>
		        <pt x="802" y="802" on="1"/>
		        <pt x="0" y="802" on="1"/>
		      </contour>
		    */

			
		    var h2 = 
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="B" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="C" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="D" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="E" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="F" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="G" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="a" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="b" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="c" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="d" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="e" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="exclam" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="f" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="g" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		    '<TTGlyph name="glyph00001"/><!-- contains no outline data -->' +
'' +
		    '<TTGlyph name="glyph00002"/><!-- contains no outline data -->' +
'' +
		    '<TTGlyph name="space" xMin="0" yMin="0" xMax="1024" yMax="1024">' +
		      '<contour>' +
		        '<pt x="0" y="0" on="1"/>' +
		        '<pt x="0" y="1024" on="1"/>' +
		        '<pt x="1024" y="1024" on="1"/>' +
		        '<pt x="1024" y="0" on="1"/>' +
		      '</contour>' +
		      '<instructions><assembly>' +
		        '</assembly></instructions>' +
		    '</TTGlyph>' +
'' +
		  '</glyf>' +
'' +
		  '<name>' +
		    '<namerecord nameID="0" platformID="1" platEncID="0" langID="0x0">' +
		      'Copyright Matt LaGrandeur 2013' +
		    '</namerecord>' +
		    '<namerecord nameID="1" platformID="1" platEncID="0" langID="0x0">' +
		      'Basic Set Test' +
		    '</namerecord>' +
		    '<namerecord nameID="2" platformID="1" platEncID="0" langID="0x0">' +
		      'Regular' +
		    '</namerecord>' +
		    '<namerecord nameID="3" platformID="1" platEncID="0" langID="0x0">' +
		      'FontStruct Basic Set Test' +
		    '</namerecord>' +
		    '<namerecord nameID="4" platformID="1" platEncID="0" langID="0x0">' +
		      'Basic Set Test Regular' +
		    '</namerecord>' +
		    '<namerecord nameID="5" platformID="1" platEncID="0" langID="0x0">' +
		      'Version 1.0' +
		    '</namerecord>' +
		    '<namerecord nameID="6" platformID="1" platEncID="0" langID="0x0">' +
		      'Basic-Set-Test' +
		    '</namerecord>' +
		    '<namerecord nameID="7" platformID="1" platEncID="0" langID="0x0">' +
		      'FontStruct is a trademark of FSI FontShop International GmbH' +
		    '</namerecord>' +
		    '<namerecord nameID="8" platformID="1" platEncID="0" langID="0x0">' +
		      'http://fontstruct.com' +
		    '</namerecord>' +
		    '<namerecord nameID="9" platformID="1" platEncID="0" langID="0x0">' +
		      'Matt LaGrandeur' +
		    '</namerecord>' +
		    '<namerecord nameID="10" platformID="1" platEncID="0" langID="0x0">' +
		      '&#226;&#128;&#156;Basic Set Test&#226;&#128;&#157; was built with FontStruct&#10;' +
		    '</namerecord>' +
		    '<namerecord nameID="11" platformID="1" platEncID="0" langID="0x0">' +
		      'http://www.fontshop.com' +
		    '</namerecord>' +
		    '<namerecord nameID="12" platformID="1" platEncID="0" langID="0x0">' +
		      'http://fontstruct.com/fontstructions/show/916476' +
		    '</namerecord>' +
		    '<namerecord nameID="13" platformID="1" platEncID="0" langID="0x0">' +
		      'Creative Commons Attribution Non-commercial Share Alike' +
		    '</namerecord>' +
		    '<namerecord nameID="14" platformID="1" platEncID="0" langID="0x0">' +
		      'http://creativecommons.org/licenses/by-nc-sa/3.0/' +
		    '</namerecord>' +
		    '<namerecord nameID="19" platformID="1" platEncID="0" langID="0x0">' +
		      'Five big quacking zephyrs jolt my wax bed' +
		    '</namerecord>' +
		    '<namerecord nameID="256" platformID="1" platEncID="0" langID="0x0">' +
		      'CwgOcV5i' +
		    '</namerecord>' +
		    '<namerecord nameID="0" platformID="3" platEncID="1" langID="0x409">' +
		      'Copyright Matt LaGrandeur 2013' +
		    '</namerecord>' +
		    '<namerecord nameID="1" platformID="3" platEncID="1" langID="0x409">' +
		      'Basic Set Test' +
		    '</namerecord>' +
		    '<namerecord nameID="2" platformID="3" platEncID="1" langID="0x409">' +
		      'Regular' +
		    '</namerecord>' +
		    '<namerecord nameID="3" platformID="3" platEncID="1" langID="0x409">' +
		      'FontStruct Basic Set Test' +
		    '</namerecord>' +
		    '<namerecord nameID="4" platformID="3" platEncID="1" langID="0x409">' +
		      'Basic Set Test Regular' +
		    '</namerecord>' +
		    '<namerecord nameID="5" platformID="3" platEncID="1" langID="0x409">' +
		      'Version 1.0' +
		    '</namerecord>' +
		    '<namerecord nameID="6" platformID="3" platEncID="1" langID="0x409">' +
		      'Basic-Set-Test' +
		    '</namerecord>' +
		    '<namerecord nameID="7" platformID="3" platEncID="1" langID="0x409">' +
		      'FontStruct is a trademark of FSI FontShop International GmbH' +
		    '</namerecord>' +
		    '<namerecord nameID="8" platformID="3" platEncID="1" langID="0x409">' +
		      'http://fontstruct.com' +
		    '</namerecord>' +
		    '<namerecord nameID="9" platformID="3" platEncID="1" langID="0x409">' +
		      'Matt LaGrandeur' +
		    '</namerecord>' +
		    '<namerecord nameID="10" platformID="3" platEncID="1" langID="0x409">' +
		      '&#8218;&#196;&#250;Basic Set Test&#8218;&#196;&#249; was built with FontStruct' +
		    '</namerecord>' +
		    '<namerecord nameID="11" platformID="3" platEncID="1" langID="0x409">' +
		      'http://www.fontshop.com' +
		    '</namerecord>' +
		    '<namerecord nameID="12" platformID="3" platEncID="1" langID="0x409">' +
		      'http://fontstruct.com/fontstructions/show/916476' +
		    '</namerecord>' +
		    '<namerecord nameID="13" platformID="3" platEncID="1" langID="0x409">' +
		      'Creative Commons Attribution Non-commercial Share Alike' +
		    '</namerecord>' +
		    '<namerecord nameID="14" platformID="3" platEncID="1" langID="0x409">' +
		      'http://creativecommons.org/licenses/by-nc-sa/3.0/' +
		    '</namerecord>' +
		    '<namerecord nameID="19" platformID="3" platEncID="1" langID="0x409">' +
		      'Five big quacking zephyrs jolt my wax bed' +
		    '</namerecord>' +
		    '<namerecord nameID="256" platformID="3" platEncID="1" langID="0x409">' +
		      'CwgOcV5i' +
		    '</namerecord>' +
		  '</name>' +
'' +
		  '<post>' +
		    '<formatType value="3.0"/>' +
		    '<italicAngle value="0.0"/>' +
		    '<underlinePosition value="102"/>' +
		    '<underlineThickness value="51"/>' +
		    '<isFixedPitch value="0"/>' +
		    '<minMemType42 value="0"/>' +
		    '<maxMemType42 value="0"/>' +
		    '<minMemType1 value="0"/>' +
		    '<maxMemType1 value="0"/>' +
		  '</post>' +
'' +
		'</ttFont>';

		return (h1 + _G.fontchars[65].charglyphdata[0].genPostScript() + h2);


	}

	
	
/*
	function generateTTXXML(){
		var fs = _G.projectsettings;
		var md = _G.fontsettings;
		var output = '<?xml version="1.0" encoding="ISO-8859-1"?>\n<ttFont sfntVersion="OTTO" ttLibVersion="2.3">\n\n';






	//--------------------
	// GLYPHORDER table
	//--------------------

		output += '<GlyphOrder>\n';
		output += '   <GlyphID id="0" name=".notdef"/>\n';
		for(var i=32; i<_G.fontchars.length; i++){
			output += '   <GlyphID id="'+i+'" name="'+_G.fontchars[i].charname+'"/>\n';
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
		output += '   <numGlyphs value="'+_G.fontchars.length+'"/> \n';
		output += '</maxp>\n\n\n';







	//--------------------
	// OS2 table
	//--------------------

		var susize = _G.fontsettings.upm/2;
		var suoff = _G.fontsettings.upm/4;
		
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
		
		for(var i=32; i<_G.fontchars.length; i++){
			tc = _G.fontchars[i];
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
			debug("SAVE LOOP - fontchars.length = " + _G.fontchars.length);
			for(var i in _G.fontchars){
				thischar = _G.fontchars[i];
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
		for(var i=32; i<_G.fontchars.length; i++){
			mw = _G.fontchars[i].charwidth;
			mw? true : mw=(fs.kerning*fs.upm);
			
			output += "   <mtx name='"+_G.fontchars[i].charname+"' width='"+mw+"' lsb='0'/>\n"; 
		}
		
		output += "</hmtx>\n\n\n";







	//---------------
	// END
	//---------------
		output += '</ttFont>';
		return output;
	}
*/