// start of file

	function loadPage_projectsettings(){
		// debug("LOADING PAGE >> loadPage_projectsettings");
		var ps = _GP.projectsettings;

		var content = "<div class='pagecontent textpage'><h1>Project Settings</h1>";
		content += "These project and interface settings will be saved with your Glyphr project file.";

		content += "<h2>Project Name</h2>"+
					"The Font Name and the Project name can be different, but they start out the same.  The Font Name details can be changed on the Font Settings page."+
					"<table class='settingstable'>"+
					"<tr><td>Project Name:</td><td><input type='text' style='width:100%' value='" + ps.name + "' onchange='_GP.projectsettings.name = this.value;' /></td></tr>"+
					"</table><br>";

		content += "<h2>UI Behavior</h2>"+
					"<table class='settingstable projectsettings'>"+

					"<tr><td style='text-align:right; vertical-align:bottom;'>"+checkUI('_GP.projectsettings.showkeyboardtipsicon')+"</td>"+
					"<td><label for='showkeyboardtipsicon'>Show the &nbsp;<span style='position:relative; top:6px;'>"+makeIcon({'name':'keyboard', 'size':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+"</span>&nbsp; button on the edit canvas.</label></td></tr>"+

					"<tr><td colspan='2' style='font-size:8px;'>&nbsp;</td></tr>"+

					"<tr><td style='text-align:right;'>"+checkUI('_GP.projectsettings.stoppagenavigation')+"</td>"+
					"<td><label for='stoppagenavigation'>Show a confirmation message if you attempt to close an unsaved project.</label></td></tr>"+

					"<tr><td colspan='2' style='font-size:8px;'>&nbsp;</td></tr>"+

					"<tr><td style='text-align:right;'>"+checkUI('_GP.projectsettings.formatsavefile')+"</td>"+
					"<td><label for='formatsavefile'>Format the Glyphr Project text file for easy reading.  This may increase the file size by 2x.</label></td></tr>"+

					"<tr><td colspan='2' style='font-size:4px;'>&nbsp;</td></tr>"+

					"<tr><td style='text-align:right;'><input type='text' value='"+(_GP.projectsettings.spinnervaluechange)+"' onchange='var r=Math.round(parseInt(this.value)); r=r|1; _GP.projectsettings.spinnervaluechange=r; this.value=r;' style='width:25px;'/></td>"+
					"<td>Spinner Button and Keyboard Nudge increment or decrement value.</td></tr>"+

					"<tr><td style='text-align:right;'><input type='text' value='"+(_GP.projectsettings.pointsize)+"' onchange='var r=Math.round(parseInt(this.value)); r=r|1; _GP.projectsettings.pointsize=r; this.value=r;' style='width:25px;'/></td>"+
					"<td>Path Point and Handle size.</td></tr>"+

					"</table><br>";

		content += "</div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}

	function updateGridDivisions(val){
		var ps = _GP.projectsettings;
		ps.griddivisions = Math.min(ps.upm, Math.max(1, val));
		document.getElementById('metirc-ssize').value = round((ps.upm / ps.griddivisions), 3);
	}

// end of file