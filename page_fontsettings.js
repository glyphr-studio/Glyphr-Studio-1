
	function updatefontsettings(){

		// SETTINGS
		var fs = _G.projectsettings;
		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		
		content += "<h3>Units per Em</h3>" + 
					"Total height and width of the area on which characters are stored. " + 
					"This number should be a square, 2048 is recommended.<br>" + 
					"<input type='text' value='"+fs.upm+"' onchange='updateFontSetting(\"upm\", this.value);'><span class='unit'>(em units)</span><br>";
	
		content += "<h3>Default Kerning</h3>" + 
					"This is the amount of trailing space that is added to all characters, unless a specific " + 
					"character width is specified, in which case this number is ignored.<br>" + 
					"<input type='text' value='"+(fs.kerning*fs.upm)+"' onchange='updateFontSetting(\"kerning\", this.value);'><span class='unit'>(em units)</span><br>";
		

		// METADATA
		var md = _G.fontsettings;		
		content += "<h1>Font Metadata</h1>" + 
			"<p style='margin-bottom:20px;'>All fonts have associated data that is saved along with the actual glyph outlines.  This data describes different aspects of the font." + 
			"<br><i>Values will be saved as you change them</i>.</p>";
		
		content += "<table class='metadatanametable' cellpadding=0 cellspacing=0 border=0>";
		
		// Font name
		var fsubn = md.subfamilyname;
		var fgenn = md.genericfamilyname;
		content += "<tr><td colspan=2><h3>Font Information</h3></td></tr>" + 
			"<tr><td style='width:150px;'>Family Name:</td><td><input type='text' id='fontname' onchange='updateFontNames();' value='"+md.familyname+"'/></td></tr>" + 
			"<tr><td>Full Name:</td><td><div class='disdisplay' id='fontfullname'>"+md.fullname+"</div></td></tr>" + 
			"<tr><td>Subfamily&nbsp;Identifier:&nbsp;&nbsp;</td><td>" + 
			"<input type='radio' name='subfam' onchange='changeFMD(\"subfamilyname\",\"Regular\");' " + (fsubn=="Regular"? "checked" : "") + "> Regular<br>" + 
			"<input type='radio' name='subfam' onchange='changeFMD(\"subfamilyname\",\"Bold\");' " + (fsubn=="Bold"? "checked" : "") + "> Bold<br>" + 
			"<input type='radio' name='subfam' onchange='changeFMD(\"subfamilyname\",\"Italic\");' " + (fsubn=="Italic"? "checked" : "") + "> Italic<br>" + 
			"<input type='radio' name='subfam' onchange='changeFMD(\"subfamilyname\",\"Bold Italic\");' " + (fsubn=="Bold Italic"? "checked" : "") + "> Bold Italic<br><br></td></tr>" + 
			"<tr><td>Generic Family:</td><td>" + 
			"<input type='radio' name='genfam' onchange='changeFMD(\"genericfamilyname\",\"Sans-Serif\");' " + (fgenn=="Sans-Serif"? "checked" : "") + "> Sans-Serif<br>" + 
			"<input type='radio' name='genfam' onchange='changeFMD(\"genericfamilyname\",\"Serif\");' " + (fgenn=="Serif"? "checked" : "") + "> Serif<br>" + 
			"<input type='radio' name='genfam' onchange='changeFMD(\"genericfamilyname\",\"Monospace\");' " + (fgenn=="Monospace"? "checked" : "") + "> Monospace<br>" + 
			"<input type='radio' name='genfam' onchange='changeFMD(\"genericfamilyname\",\"Cursive\");' " + (fgenn=="Cursive"? "checked" : "") + "> Cursive<br>" + 
			"<input type='radio' name='genfam' onchange='changeFMD(\"genericfamilyname\",\"Fantasy\");' " + (fgenn=="Fantasy"? "checked" : "") + "> Fantasy<br><br></td></tr>" + 
			"<tr><td>Font Version:</td><td><input type='text' onchange='changeFMD(\"version\",this.value,true);' value='"+md.version+"' /></td></tr>" + 
			"<tr><td>Font Description:</td><td><textarea onchange='changeFMD(\"description\",this.value,true);'>"+md.description+"</textarea></td></tr>";
				
		// Manufacturer
		content += "<tr><td colspan=2><h3>Manufacturer</h3></td></tr>" + 
			"<tr><td>Name:</td><td><input type='text' onchange='changeFMD(\"manufacturername\",this.value,true);' value='"+md.manufacturername+"'/></td></tr>" + 
			"<tr><td>URL:</td><td><input type='text' onchange='changeFMD(\"manufacturerurl\",this.value,true);' value='"+md.manufacturerurl+"'/></td></tr>";
		
		// Designer
		content += "<tr><td colspan=2><h3>Designer</h3></td></tr>" + 
			"<tr><td>Names:</td><td><input type='text' onchange='changeFMD(\"designername\",this.value,true);' value='"+md.designername+"'/></td></tr>" + 
			"<tr><td>URL:</td><td><input type='text' onchange='changeFMD(\"designerurl\",this.value,true);' value='"+md.designerurl+"'/></td></tr>";
		
		//License & Copyright
		content += "<tr><td colspan=2><h3>Copyright & License</h3></td></tr>" + 
			"<tr><td>Copyright Notice:</td><td><input type='text' onchange='changeFMD(\"copyright\",this.value,true);' value='"+md.copyright+"'/></td></tr>" + 
			"<tr><td>License URL:</td><td><input type='text' onchange='changeFMD(\"licenseurl\",this.value,true);' value='"+md.licenseurl+"'/></td></tr>" + 
			"<tr><td>License Description:</td><td><textarea onchange='changeFMD(\"licensedescription\",this.value,true);'>" + md.licensedescription + "</textarea>" + 
			"</td></tr>";
		
		// Font Weight Class
		var fwei = md.weightclass;
		content += "<tr><td colspan=2><h3>Classifications</h3></td></tr>" + 
			"<tr><td>Weight Class:</td><td>" + 
			"Indicates the visual weight (degree of blackness or thickness of strokes) of the characters in the font.<br><br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",100);' "  + (fwei==100? "checked" : "") + "> 100 Thin<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",200);' "  + (fwei==200? "checked" : "") + "> 200 Extra-light or Ultra-light<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",300);' "  + (fwei==300? "checked" : "") + "> 300 Light<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",400);' "  + (fwei==400? "checked" : "") + "> 400 Regular<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",500);' "  + (fwei==500? "checked" : "") + "> 500 Medium<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",600);' "  + (fwei==600? "checked" : "") + "> 600 Semi-bold or Demi-bold<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",700);' "  + (fwei==700? "checked" : "") + "> 700 Bold<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",800);' "  + (fwei==800? "checked" : "") + "> 800 Extra-bold or Ultra-bold<br>" + 
			"<input type='radio' name='weight' onchange='changeFMD(\"weightclass\",900);' "  + (fwei==900? "checked" : "") + "> 900 Black or Heavy<br>" + 
			"<br><br></td></tr>";
			
		
		// Font Width Class
		var fwid = md.widthclass;
		content += "<tr><td>Width Class:</td><td>" + 
			"Indicates a relative change from the normal aspect ratio (width to height ratio) as specified by a font designer for the glyphs in a font.<br><br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",1);' "  + (fwid==1? "checked" : "") + ">	Ultra-condensed (50%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",2);' "  + (fwid==2? "checked" : "") + ">	Extra-condensed (62.5%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",3);' "  + (fwid==3? "checked" : "") + ">	Condensed (75%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",4);' "  + (fwid==4? "checked" : "") + ">	Semi-condensed (87.5%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",5);' "  + (fwid==5? "checked" : "") + ">	Normal (100%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",6);' "  + (fwid==6? "checked" : "") + ">	Semi-expanded (112.5%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",7);' "  + (fwid==7? "checked" : "") + ">	Expanded (125%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",8);' "  + (fwid==8? "checked" : "") + ">	Extra-expanded (150%)<br>" + 
			"<input type='radio' name='width' onchange='changeFMD(\"widthclass\",9);' "  + (fwid==9? "checked" : "") + ">	Ultra-expanded (200%)<br>" + 
			"</td></tr>";
		
		
		content += "</table>";

		
		
		content += "</div>";
		document.getElementById("mainpane").innerHTML = content;
	}


	function updateFontNames(){
		var fam = strSan(document.getElementById("fontname").value);
		var sub = _G.fontsettings.subfamilyname;
		
		sub = sub.replace(/regular/i, "");
		if(sub != "") sub = (" " + sub);
		
		_G.fontsettings.familyname = fam;
		_G.fontsettings.fullname = (fam + sub);
				
		document.getElementById("fontfullname").innerHTML = (fam + sub);
		//updatefontmetadata();
	}
	
	function changeFMD(mdname, mdvalue, san){
		if(san) mdvalue = strSan(mdvalue);
		_G.fontsettings[mdname] = mdvalue;
		if((mdname == "fontname")||(mdname == "subfamilyname")) {updateFontNames();}
		debug("CHANGEFMD - set " + mdname + " to " + mdvalue);
	}