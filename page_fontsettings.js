	
	function setupCECandCGC(){
		uistate.calcmaxesghostcanvassettings.size = GlyphrProject.settings.upm*1.75;
		uistate.calcmaxesghostcanvassettings.originx = GlyphrProject.settings.upm*.25;
		uistate.calcmaxesghostcanvassettings.originy = GlyphrProject.settings.upm*1.25;	
	}

	function resetZoomPan(){
		uistate.chareditcanvassettings.originx = 140;
		uistate.chareditcanvassettings.originy = 740;
		uistate.chareditcanvassettings.zoom = .32;
	}	

	function updatefontsettings(){
		var fs = GlyphrProject.settings;
		var content = "<div class='pagecontent textpage'><h1>Font Settings</h1>";
		
		content += "<h3>Units per Em</h3>" + 
					"Total height and width of the area on which characters are stored. " + 
					"This number should be a square, 2048 is recommended.<br>" + 
					"<input type='text' value='"+fs.upm+"' onchange='updateFontSetting(\"upm\", this.value);'><span class='unit'>(em units)</span><br>";
		
		content += "<h3>Grid System</h3>" + 
					"Defining a grid system to use while editing characters in this font makes stuff a whole " + 
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " + 
					"divide evenly into the Units per Em specified above.<br>" + 
					"<div><input type='text' value='"+fs.griddivisions+"' onchange='updateFontSetting(\"griddivisions\", this.value);'>"+spinner();+"</div><br>";
					
		var gridsize = (fs.upm/fs.griddivisions);
		content += "<h3>Character Proportions</h3>" + 
					"There are two main horizontal dividing lines for each character.  The baseline is where the bottom " + 
					"of most characters sit, except characters like g and y that fall below.  X height is the height of most " + 
					"lowercase characters, except characters like h and l that go above it.<br>" + 
					"These are specified in grid division units.<br><br>" + 
					"<table cellpadding=4 cellspacing=0 border=0 class='charprotable'>" + 
					"<tr><td rowspan=3 style='width:100px;'>total height:<br><b id='gd'>"+fs.griddivisions+"</b><br>grid units</td>" + 
					"<td><div class='disdisplay' id='ascheight'></div></td><td><i>ascender height</i></td></tr>" + 
					"<tr><td><input type='text' id='xheight' value='"+fs.xheight*fs.upm/gridsize+"' onchange='updateFontSetting(\"xheight\", this.value);'>"+spinner()+"</td><td><i>x height</i></td></tr>" + 
					"<tr><td><input type='text' id='descheight' value='"+fs.descender*fs.upm/gridsize+"' onchange='updateFontSetting(\"descender\", this.value);'>"+spinner()+"</td><td><i>descender height</i></td></tr>" + 
					"</table><br>";
		
		content += "<h3>Overshoot Guideline</h3>" + 
					"Round letters usually extend a little above the x height line and below the baseline. " + 
					"A light guideline will show this overshoot distance.<br>" + 
					"<input type='text' value='"+(fs.overshoot*fs.upm)+"' onchange='updateFontSetting(\"overshoot\", this.value);'><span class='unit'>(em units)</span><br>";

		content += "<h3>Default Kerning</h3>" + 
					"This is the amount of trailing space that is added to all characters, unless a specific " + 
					"character width is specified, in which case this number is ignored.<br>" + 
					"<input type='text' value='"+(fs.kerning*fs.upm)+"' onchange='updateFontSetting(\"kerning\", this.value);'><span class='unit'>(em units)</span><br>";
							
		content += "</div>";
		
		document.getElementById("mainpane").innerHTML = content;
		updateCharPro();
	}

	function updateFontSetting(sname, svalue){
		var fs = GlyphrProject.settings;
		if((sname=="descender") || (sname=="xheight")){
			svalue = (svalue * (fs.upm/fs.griddivisions))/fs.upm;	
		}
		
		if((sname=="kerning") || (sname=="overshoot")){
			svalue = (svalue/fs.upm);
		}
		
		fs[sname] = svalue;
		updateCharPro();
	}
	
	function updateCharPro(){
		document.getElementById("ascheight").innerHTML = GlyphrProject.settings.griddivisions-document.getElementById("descheight").value-document.getElementById("xheight").value; 
		document.getElementById("gd").innerHTML = GlyphrProject.settings.griddivisions;
	}

	function debugSettings(){
		var fs = GlyphrProject.settings;
		var output = "<b>SETTINGS DUMP</b><br>";
			output += "    seedshapecounter = " + seedshapecounter + ";<br>";
			output += "    upm = " + (fs.upm) + "<br>";
			output += "    griddivisions = " + (fs.griddivisions) + "<br>";
			output += "    xheight = " + (fs.xheight) + "<br>";
			output += "    descender = " + (fs.descender) + "<br>";
			output += "    overshoot = " + (fs.overshoot) + "<br>";
			output += "    kerning = " + (fs.kerning) + "<br>";
			
		debug(output);
	}