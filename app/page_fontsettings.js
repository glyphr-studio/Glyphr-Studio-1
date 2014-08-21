_GLYPHR_STUDIO = merge(_GLYPHR_STUDIO, {
// "use strict";

	function loadPage_fontsettings(){
		// debug("LOADING PAGE >> loadPage_fontsettings");
		// SETTINGS
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		content += "<p style='margin-bottom:20px;'>These properties are used by the Glyphr project while you are designing this font.  By default, these are the same as some of the OpenType settings below." +
					"<br><i>Values will be saved as you change them</i>.</p>";

		content += "<h3>Character Proportions</h3>";
		content += "Glyphr projects export OpenType fonts with PostScript outlines.  Characters in this kind of font have a total height of 1000 Em units. "+
					"The baseline is the one main dividing line for each character, with the ascent and descent above it and below it. " +
					"Some characters, like p and y, fall below the baseline into the descent.<br>" +
					"<table class='settingstable'>"+
					"<tr><td>Ascent height: </td><td><input type='text' value='"+ps.ascent+"' onchange='updateAscender(this.value);'>"+spinner()+"</td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Descent height: </td><td><input type='text' id='metric-des' disabled='disabled' value='"+(ps.ascent - ps.upm)+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Total Units per Em: </td><td><input type='text' disabled='disabled' value='"+ps.upm+"'/></td><td></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>Default Left Side Bearing</h3>" +
					"This is the amount of blank space that is added to the left of characters when they are displayed.  This metric can be set individually per character, but will default to this value if not set. "+
					"<table class='settingstable'>"+
					"<tr><td>Left Side Bearing: </td><td><input type='text' value='"+ps.defaultlsb+"' onchange='_GP.projectsettings.lsb = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		content += "<h3>Line Gap</h3>" +
					"This is the amount of vertical space between characters on separate lines. This is recomended to be 20% to 25% of the total Units per Em."+
					"<table class='settingstable'>"+
					"<tr><td>Line Gap: </td><td><input type='text' value='"+ps.linegap+"' onchange='_GP.projectsettings.linegap = this.value;'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		// CHARACTERS
		content += "<h1>Character Ranges</h1>"+
					"Character ranges are based on the <a href='http://en.wikipedia.org/wiki/Unicode' target=_new>Unicode Standard</a>, which assigns a <a href='http://en.wikipedia.org/wiki/Hexadecimal' target=_new>hexadecimal number</a> to all possible characters in a font. "+
					"You may encounter Unicode numbers as U+1234, in Glyphr Studio this is equivalent to 0x1234, it's just a different way of representing hex numbers.";

		content += "<h3>Standard Character Ranges</h3>"+
					"The most common character sets are built into Glyphr Studio, and can be toggled with the checkboxes below.";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.basiclatin")+"</td>"+
					"<td><label for='basiclatin'><b>Basic Latin</b> - Unicode characters 0x0020 through 0x007E</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					var bl = _UI.basiclatinorder;
					for(var t=0; t<bl.length; t++){ content += (hexToChar(bl[t]) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.latinsuppliment")+"</td>"+
					"<td><label for='latinsuppliment'><b>Latin Suppliment</b> - Unicode characters 0x00A1 through 0x00FF</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					//for(var s=0x00A1; s<=0x00FF; s++){ content += (hexToChar(s) + " "); }
					for(var s=_UI.latinsuppliment.begin; s<=_UI.latinsuppliment.end; s++){ content += (hexToChar(s) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.latinextendeda")+"</td>"+
					"<td><label for='latinextendeda'><b>Latin Extended-A</b> - Unicode characters 0x0100 through 0x017F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					//for(var a=0x0100; a<=0x017F; a++){ content += (hexToChar(a) + " "); }
					for(var a=_UI.latinextendeda.begin; a<=_UI.latinextendeda.end; a++){ content += (hexToChar(a) + " "); }
		content += "</div></td></tr></table>";


		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.latinextendedb")+"</td>"+
					"<td><label for='latinextendedb'><b>Latin Extended-B</b> - Unicode characters 0x0180 through 0x024F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					//for(var b=0x0180; b<=0x024F; b++){ content += (hexToChar(b) + " "); }
					for(var b=_UI.latinextendedb.begin; b<=_UI.latinextendedb.end; b++){ content += (hexToChar(b) + " "); }
		content += "</div></td></tr></table>";

		content += "<h3>Custom Character Ranges</h3>"+
					"Additional character ranges above 0x024F can be included here. Type a begining and an end value (inclusive) as four digit hexadecimal numbers, with a prefix '0x'.<br>"+
					"For example, Unicode sets aside the range 0xE000 through 0xF8FF to be specifically not used for characters.  This range can be handy for Icon Fonts.<br>" +
					"Custom character ranges must be unique (non-overlapping), be greater than 0x024F and less than 0xFFFF.<br><br>"+
					"<table class='settingstable'><tr><td>"+checkUI("_GP.projectsettings.charrange.filternoncharpoints")+"</td><td><label for='filternoncharpoints'>Filter out reserved Unicode code points.</label></td></tr></table><br>"+
					"<table class='settingstable'><tr>"+
					"<td>begin:<br><input type='text' id='customrangebegin'></td>"+
					"<td>end:<br><input type='text' id='customrangeend'></td>"+
					"<td><br><button onclick='addCustomCharacterRange();'>Add Range</button></td>"+
					"<td><br><div id='customrangeerror'>bad range input</div></td>"+
					"</tr></table>"+
					"<div id='customrangetable'></div>";


		// METADATA
		content += "<br><h1>OpenType Properties</h1>" +
			"<p style='margin-bottom:20px;'>These properties will be saved directly to the various OpenType tables when the font is exported to TTX format.  More information about all of these properties can be found in the <a href='http://www.microsoft.com/typography/otspec/otff.htm#otttables' target=_new>OpenType Specification</a>." +
			"<br><i>Values will be saved as you change them</i>.</p>";



		content += "<h2>Tables</h2>";

		var otp = _GP.opentypeproperties;


		// NAME TABLE
		content += "<h3>name</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var i=0; i<otp.name.length; i++){
			if(i!=7){
				content += "<tr><td class='propname'>" + otp.name[i].key + "</td><td><input type='text' value='" + otp.name[i].val + "' onchange='_GP.opentypeproperties.name[" + i + "].val = this.value;' /></td></tr>";
			}
		}
		content += "</table>";


		// HEAD TABLE
		content += "<h3>head</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var j=0; j<otp.head.length; j++){
			content += "<tr><td class='propname'>" + otp.head[j].key + "</td><td><input type='text' value='" + otp.head[j].val + "' onchange='setOTprop(\"head\", \"" + otp.head[j].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// OS/2 TABLE
		content += "<h3>os/2</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var k=0; k<otp.os_2.length; k++){
			content += "<tr><td class='propname'>" + otp.os_2[k].key + "</td><td><input type='text' value='" + otp.os_2[k].val + "' onchange='setOTprop(\"os_2\", \"" + otp.os_2[k].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// POST TABLE
		content += "<h3>post</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var m=0; m<otp.post.length; m++){
			content += "<tr><td class='propname'>" + otp.post[m].key + "</td><td><input type='text' value='" + otp.post[m].val + "' onchange='setOTprop(\"post\", \"" + otp.post[m].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// CFF TABLE
		content += "<h3>cff</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";

		for(var n=0; n<otp.cff.length; n++){
			content += "<tr><td class='propname'>" + otp.cff[n].key + "</td><td><input type='text' value='" + otp.cff[n].val + "' onchange='setOTprop(\"cff\", \"" + otp.cff[n].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";



		content += "</div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		updateCustomRangeTable();
	}

	function updateAscender(val){
		var ps = _GP.projectsettings;
		ps.ascent = Math.max(0, Math.min(ps.upm, round(val)));
		document.getElementById('metric-des').value = (ps.ascent - ps.upm);
	}

};