
	function loadPage_projectsettings(){
		debug("LOADING PAGE >> loadPage_projectsettings");
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Project Settings</h1>";
		content += "These project and interface settings will be saved with your Glyphr project file.";

		content += "<h2>Project Name</h2>"+
					"The Font Name and the Project name can be different, but they start out the same.  The Font Name details can be changed on the Font Settings page."+
					"<table class='fontmetricstable'>"+
					"<tr><td>Project Name:</td><td><input type='text' style='width:100%' value='" + ps.name + "' onchange='_GP.projectsettings.name = this.value;' /></td></tr>"+
					"</table><br>";

		content += "<h2>Grids and Guides</h2>";
		content += "<h3>Grid System</h3>";
		content += "Defining a grid system to use while editing characters in this font makes stuff a whole " +
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " +
					"divide evenly into the Units per Em.<br>" +
					"<table class='fontmetricstable'>"+
					"<tr><td>Units per Em:</td><td><input type='text' disabled='disabled' value='" + ps.upm + "'/></td><td><span class='unit'>(total)</span></td></tr>"+
					"<tr><td>Grid Divisions</td><td><input type='text' value='"+ps.griddivisions+"' onchange='updateGridDivisions(this.value);'/>"+spinner()+"</td><td><span class='unit'>(number)</span></td></tr>"+
					"<tr><td>Grid Square Size:</td><td><input type='text' id='metirc-ssize' disabled='disabled' value='" + (ps.upm/ps.griddivisions) + "'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>x Height</h3>";
		content += "X-height is the distance between the baseline, and the top of lowercase letters.<br>"+
					"<table class='fontmetricstable'>"+
					"<tr><td>x Height: </td><td><input type='text' id='metric-xheight' value='"+ps.xheight+"' onchange='_GP.projectsettings.xheight = this.value'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>Overshoot</h3>";
		content += "Round letters usually extend a little above the x height line and below the baseline. " +
					"A light guideline will show this overshoot distance.<br>" +
					"<table class='fontmetricstable'>"+
					"<tr><td>Overshoot:</td><td><input type='text' value='"+ps.overshoot+"' onchange='_GP.projectsettings.overshoot = this.value);'>"+spinner()+"</td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";

		content += "<h2>UI Behavior</h2>"+
					"<table class='fontmetricstable'>"+
					"<tr><td style='text-align:right;'><input type='checkbox' "+(_GP.stoppagenavigation?"checked ":" ")+" onchange='_GP.stoppagenavigation=this.checked;'/></td>"+
					"<td>Show a confirmation message if you attempt to close an unsaved project.</td></tr>"+
					"<tr><td style='text-align:right;'><input type='text' value='"+(_GP.projectsettings.spinnervaluechange)+"' onchange='var r=Math.round(parseInt(this.value)); r=r|1; _GP.projectsettings.spinnervaluechange=r; this.value=r;' style='width:25px;'/></td>"+
					"<td>Spinner Button increment or decrement value.</td></tr>"+
					"</table><br>";

		content += "</div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

	function updateGridDivisions(val){
		var ps = _GP.projectsettings;
		ps.griddivisions = Math.min(ps.upm, Math.max(1, val));
		document.getElementById('metirc-ssize').value = (ps.upm / ps.griddivisions);
	}