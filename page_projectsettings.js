
	function updateprojectsettings(){
		var ps = _G.projectsettings;
		
		var content = "<div class='pagecontent textpage'><h1>Project Settings</h1>";
		content += "These project and interface settings will be saved with your Glyphr project file.";

		content += "<h2>Project Name</h2>"+
					"The Font Name and the Project name can be different, but they start out the same.  The Font Name can be changed on the Font Settings page."
					"<input type='text' style='width:100%' value='" + ps.name + "' onchange='_G.projectsettings.name = this.value;' />";
		
		var gridsize = (ps.upm/ps.griddivisions);
		content += "<h2>Font Metrics</h2>";
		content += "<h3>Grid System</h3>";
		content += "Defining a grid system to use while editing characters in this font makes stuff a whole " + 
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " + 
					"divide evenly into the Units per Em.<br>" + 
					"<table class='fontmetricstable'>"+
					"<tr><td>Units per Em:</td><td><div class='disdisplay' id='metric-upm'>" + ps.upm + "</div><span class='unit'>(total em units)</span></td></tr>"+
					"<tr><td>Grid Divisions</td><td><input type='text' value='"+ps.griddivisions+"' onchange='updateFontSetting(\"griddivisions\", this.value);'/>"+spinner()+"</td></tr>"+
					"<tr><td>Grid Square Size:</td><td><div class='disdisplay' id='metirc-ssize'>" + gridsize + "</div><span class='unit'>(em units)</span></td></tr>" + 
					"</table>";

		content += "<h3>Character Proportions</h3>"; 
		content += "There is one main dividing line for each character.  The baseline is where the bottom " + 
					"of most characters sit, above it is the ascent height.  Some characters, like g and y, fall below the baseline into the descent.<br>" + 
					"<table class='fontmetricstable'>"+
					"<tr><td>ascent height</td><td><div class='disdisplay' id='metric-asc'>"+((ps.upm - (ps.upm*ps.descender))/gridsize)+"</div></td><td><span class='unit'>(grid units)</span></td></tr>" + 
					"<tr><td>descent height</td><td><input type='text' id='metric-des' value='"+ps.descender*ps.upm/gridsize+"' onchange='updateFontSetting(\"descender\", this.value);'>"+spinner()+"</td><td><span class='unit'>(grid units)</span></td></tr>" + 
					"</table><br>";
					
		content += "<h3>Guidelines</h3>";
		content += "X-height is the distance between the baseline, and the top of lowercase letters.<br>"
					"<table class='fontmetricstable'>"+
					"<tr><td><input type='text' id='metric-xheight' value='"+ps.xheight*ps.upm/gridsize+"' onchange='updateFontSetting(\"xheight\", this.value);'>"+spinner()+"</td><td><i>x height</i></td></tr>" +
					"</table>";
		
		content += "Round letters usually extend a little above the x height line and below the baseline. " + 
					"A light guideline will show this overshoot distance.<br>" + 
					"<table class='fontmetricstable'>"+
					"<tr><td>Overshoot:</td><td>"+
					"<input type='text' value='"+(ps.overshoot*ps.upm)+"' onchange='updateFontSetting(\"overshoot\", this.value);'><span class='unit'>(em units)</span>"+
					"</td></tr></table>";

		content += "</div>";
		
		document.getElementById("mainpane").innerHTML = content;
		updateCharPro();
	}


	function updateFontSetting(sname, svalue){
		var ps = _G.projectsettings;
		if((sname=="descender") || (sname=="xheight")){
			svalue = (svalue * (ps.upm/ps.griddivisions))/ps.upm;	
		}
		
		if((sname=="kerning") || (sname=="overshoot")){
			svalue = (svalue/ps.upm);
		}
		
		ps[sname] = svalue;
		updateCharPro();
	}
	
	function updateCharPro(){
		var ps = _G.projectsettings;
		document.getElementById("metric-griddivisions").innerHTML = ps.griddivisions;
		document.getElementById("metirc-ssize").innerHTML = (ps.upm / ps.griddivisions);
		document.getElementById("metric-asc").innerHTML = (ps.griddivisions-document.getElementById("metric-des").value-document.getElementById("metric-xheight").value); 
	}
