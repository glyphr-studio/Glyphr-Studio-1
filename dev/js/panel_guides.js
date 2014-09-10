// start of file

//-------------------
// History Panel
//-------------------
	function makePanel_Guides(){

		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>guides</h1>";

		var system = '';
		var user = '';
		var guides = _GP.projectsettings.guides;
		var tg;

		for(var g in guides){ if(guides.hasOwnProperty(g)){
			tg = guides[g];

			if(tg.editable){
				user += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), true);
			} else {
				system += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), false);
			}
		}}

		content += "<h3>options</h3>";
		content += "<table style='wdith:100%;'>"+
					"<tr><td style='width:20px'>" + checkUI('_UI.showgrid', true) + "</td>" +
					"<td><label for='showgrid'>show grid</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showguides', true) + "</td>" +
					"<td><label for='showguides'>show guides</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showguidelabels', true) + "</td>" +
					"<td><label for='showguidelabels'>show guide labels</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showovershoots', true) + "</td>" +
					"<td><label for='showovershoots'>show overshoots</label></td></tr>" +
					"</table>";

		content += "<br><br><h3>system guides</h3>";
		content += system;
		content += "<br><br><h3>custom guides</h3>";
		content += user;
		content += "<button>new guide</button>";

		return content;
	}

	function makeOneGuideRow(guide, path, showeditable) {
		var re = "<table class='guiderow'><tr>";
		re += "<td rowspan='2' lass='guidecolor' style='background-color:"+ guide.color + ";'>&nbsp;</td>";
		re += "<td style='width:20px'>" + checkUI((path+'.visible'), true) + "</td>";
		re += "<td><b>" + guide.name + "</b></td>";
		re += "</tr><tr>";
		re += "<td>&nbsp;</td>";
		re += "<td>"
		re += "<select>";
		if(guide.type === 'horizontal'){
			re += "<option selected value='horizontal'>horizontal</option>";
			re += "<option value='vertical'>vertical</option>";
		} else {
			re += "<option value='horizontal'>horizontal</option>";
			re += "<option selected value='vertical'>vertical</option>";
		}

		re += "</select>"
		re += "<input type='number' value='" + guide.location + "'/>";
		if (showeditable) re += "<td>" + guide.editable + "</td>";
		re += "</tr></table>";

		return re;
	}
// end of file