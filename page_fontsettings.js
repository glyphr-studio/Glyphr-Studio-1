
	function updatefontsettings(){

		// SETTINGS
		var ps = _G.projectsettings;
		var fs = _G.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		content += "<p style='margin-bottom:20px;'>These properties are used by the Glyphr project while you are designing this font.  By default, these are the same as some of the OpenType settings below." +
					"<br><i>Values will be saved as you change them</i>.</p>";
		
		content += "<h3>Units per Em</h3>" + 
					"Total height and width of the area on which characters are stored. " + 
					"This number should be a square, 2048 is recommended.<br>" + 
					"<input type='text' value='"+fs.upm+"' onchange='updateFontSetting(\"upm\", this.value);'><span class='unit'>(em units)</span><br>";
	
		content += "<h3>Default Kerning</h3>" + 
					"This is the amount of trailing space that is added to all characters, unless a specific " + 
					"character width is specified, in which case this number is ignored.<br>" + 
					"<input type='text' value='"+(fs.kerning*fs.upm)+"' onchange='updateFontSetting(\"kerning\", this.value);'><span class='unit'>(em units)</span><br>";
		

		// METADATA
		content += "<br><h1>OpenType Properties</h1>" + 
			"<p style='margin-bottom:20px;'>These properties will be saved directly to the various OpenType tables when the font is exported to TTX format.  More information about all of these properties can be found in the <a href='http://www.microsoft.com/typography/otspec/otff.htm#otttables' target=_new>OpenType Specification</a>." + 
			"<br><i>Values will be saved as you change them</i>.</p>";
		
		content += "<h2>Tables</h2>";

		var otp = _G.opentypeproperties;


		// NAME TABLE
		content += "<h3>name</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.name.length; prop++){
			if(prop!=7){
				content += "<tr><td class='propname'>" + otp.name[prop].key + "</td><td><input type='text' value='" + otp.name[prop].val + "' onchange='_G.opentypeproperties.name[" + prop + "].val = this.value;' /></td></tr>";
			}
		}
		content += "</table>";


		// HEAD TABLE
		content += "<h3>head</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.head.length; prop++){
			content += "<tr><td class='propname'>" + otp.head[prop].key + "</td><td><input type='text' value='" + otp.head[prop].val + "' onchange='setOTprop(\"head\", \"" + otp.head[prop].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// HHEA TABLE
		content += "<h3>hhea</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.hhea.length; prop++){
			content += "<tr><td class='propname'>" + otp.hhea[prop].key + "</td><td><input type='text' value='" + otp.hhea[prop].val + "' onchange='setOTprop(\"hhea\", \"" + otp.hhea[prop].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// OS/2 TABLE
		content += "<h3>os/2</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.os_2.length; prop++){
			content += "<tr><td class='propname'>" + otp.os_2[prop].key + "</td><td><input type='text' value='" + otp.os_2[prop].val + "' onchange='setOTprop(\"os_2\", \"" + otp.os_2[prop].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// POST TABLE
		content += "<h3>post</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.post.length; prop++){
			content += "<tr><td class='propname'>" + otp.post[prop].key + "</td><td><input type='text' value='" + otp.post[prop].val + "' onchange='setOTprop(\"post\", \"" + otp.post[prop].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


		// CFF TABLE
		content += "<h3>cff</h3>";
		content += "<table class='opentypepropertiestable' cellpadding=0 cellspacing=0 border=0>";
		
		for(var prop=0; prop<otp.cff.length; prop++){
			content += "<tr><td class='propname'>" + otp.cff[prop].key + "</td><td><input type='text' value='" + otp.cff[prop].val + "' onchange='setOTprop(\"cff\", \"" + otp.cff[prop].key + "\", this.value);' /></td></tr>";
		}
		content += "</table>";


			
		content += "</div>";
		document.getElementById("mainpane").innerHTML = content;
	}


	function updateFontNames(){
		var fam = strSan(document.getElementById("fontname").value);
		var sub = _G.projectsettings.subfamilyname;
		
		sub = sub.replace(/regular/i, "");
		if(sub != "") sub = (" " + sub);
		
		_G.projectsettings.familyname = fam;
		_G.projectsettings.fullname = (fam + sub);
				
		document.getElementById("fontfullname").innerHTML = (fam + sub);
		//updatefontmetadata();
	}
	
	function changeFMD(mdname, mdvalue, san){
		if(san) mdvalue = strSan(mdvalue);
		_G.projectsettings[mdname] = mdvalue;
		if((mdname == "fontname")||(mdname == "subfamilyname")) {updateFontNames();}
		//debug("CHANGEFMD - set " + mdname + " to " + mdvalue);
	}