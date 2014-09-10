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
				system += makeOneSystemGuideRow(tg, ('_GP.projectsettings.guides.'+g));
			}
		}}

		content += "<h3>options</h3>";
		content += "<table style='wdith:100%;'>"+
					"<tr><td style='width:20px'>" + checkUI('_UI.showgrid', true) + "</td>" +
					"<td><label style='margin-left:10px;' for='showgrid'>show grid</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showguides', true) + "</td>" +
					"<td><label style='margin-left:10px;' for='showguides'>show guides</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showguidelabels', true) + "</td>" +
					"<td><label style='margin-left:10px;' for='showguidelabels'>show guide labels</label></td></tr>" +
					"<tr><td style='width:20px'>" + checkUI('_UI.showovershoots', true) + "</td>" +
					"<td><label style='margin-left:10px;' for='showovershoots'>show overshoots</label></td></tr>" +
					"</table>";

		content += "<br><br><h3>system guides</h3>";
		content += system;
		content += "<br><br><h3>custom guides</h3>";
		content += user;
		content += "<button>new guide</button>";

		return content;
	}

	function makeOneSystemGuideRow(guide, path) {
		var re = "<table class='guiderow'>";
		re += "<tr><td class='guidecolor' style='background-color:"+ guide.color + ";'>&nbsp;</td><td style='padding:6px;'>";
		re += checkUI((path+'.visible'), true);
		re += "<span class='guidename'>" + guide.name + "</span>";
		re += "<span class='guidelocation'>" + guide.location + "</span>";
		re += "</td></tr></table>";

		return re;
	}

	function makeOneGuideRow(guide, path, showeditable) {
		var re = "";

			re += "<select>";
			if(guide.type === 'horizontal'){
				re += "<option selected value='horizontal'>horizontal</option>";
				re += "<option value='vertical'>vertical</option>";
			} else {
				re += "<option value='horizontal'>horizontal</option>";
				re += "<option selected value='vertical'>vertical</option>";
			}

			re += "</select>"
		return re;
	}
// end of file