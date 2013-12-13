
	function updateprojectsettings(){
		var ps = _G.projectsettings;
		var fs = _G.fontsettings;
		
		var content = "<div class='pagecontent textpage'><h1>Project Settings</h1>";
		content += "These project and interface settings will be saved with your Glyphr project file.";

		content += "<h3>Grid System</h3>" + 
					"Defining a grid system to use while editing characters in this font makes stuff a whole " + 
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " + 
					"divide evenly into the Units per Em.<br>" + 
					"<div><input type='text' value='"+ps.griddivisions+"' onchange='updateFontSetting(\"griddivisions\", this.value);'>"+spinner();+"</div><br>";

		var gridsize = (fs.upm/ps.griddivisions);
		content += "<h3>Character Proportions</h3>" + 
					"There are two main horizontal dividing lines for each character.  The baseline is where the bottom " + 
					"of most characters sit, except characters like g and y that fall below.  X height is the height of most " + 
					"lowercase characters, except characters like h and l that go above it.<br>" + 
					"These are specified in grid division units.<br><br>" + 
					"<table cellpadding=4 cellspacing=0 border=0 class='charprotable'>" + 
					"<tr><td rowspan=3 style='width:100px;'>total height:<br><b id='gd'>"+ps.griddivisions+"</b><br>grid units</td>" + 
					"<td><div class='disdisplay' id='ascheight'></div></td><td><i>ascender height</i></td></tr>" + 
					"<tr><td><input type='text' id='xheight' value='"+ps.xheight*fs.upm/gridsize+"' onchange='updateFontSetting(\"xheight\", this.value);'>"+spinner()+"</td><td><i>x height</i></td></tr>" + 
					"<tr><td><input type='text' id='descheight' value='"+ps.descender*fs.upm/gridsize+"' onchange='updateFontSetting(\"descender\", this.value);'>"+spinner()+"</td><td><i>descender height</i></td></tr>" + 
					"</table><br>";
		
		content += "<h3>Overshoot Guideline</h3>" + 
					"Round letters usually extend a little above the x height line and below the baseline. " + 
					"A light guideline will show this overshoot distance.<br>" + 
					"<input type='text' value='"+(ps.overshoot*fs.upm)+"' onchange='updateFontSetting(\"overshoot\", this.value);'><span class='unit'>(em units)</span><br>";

		content += "</div>";
		
		document.getElementById("mainpane").innerHTML = content;
		updateCharPro();
	}


	function updateFontSetting(sname, svalue){
		var fs = _G.projectsettings;
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
		document.getElementById("ascheight").innerHTML = _G.projectsettings.griddivisions-document.getElementById("descheight").value-document.getElementById("xheight").value; 
		document.getElementById("gd").innerHTML = _G.projectsettings.griddivisions;
	}
