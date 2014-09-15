// start of file

//-------------------
// History Panel
//-------------------
	function makePanel_Guides(){

		var content = "<div class='navarea_header'>";

		content += makePanelSuperTitle();

		content += "<h1 class='paneltitle'>guides</h1>";

		content += "</div><div class='navarea_section'>";

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
					"<td><label style='margin-left:10px;' for='showovershoots'>show overshoots ("+_GP.projectsettings.overshoot+" em units)</label></td></tr>" +
					"</table>";

		content += "<br><br><h3>system guides</h3>";
		content += system;
		content += "<br><br><h3>custom guides</h3>";
		content += user;
		content += "<button>new guide</button>";

		content += "</div>";
		
		return content;
	}

	function makeOneSystemGuideRow(guide, path) {
		var re = "<table class='guiderow'>";
		re += "<tr><td class='guidecolor' "+
			" style='background-color:"+ guide.color + ";' "+
			" onmouseover='hideAllSatChoosers(); this.style.borderColor=\""+ guide.color + "\";' "+
			" onmouseout='this.style.borderColor=\"rgb(250,252,255)\";' "+
			" onclick='hideAllSatChoosers(); showGuideSatChooser(this, \""+guide.name+"\");'>"+
			"</td><td style='padding:6px;'>";
		re += checkUI((path+'.visible'), true);
		re += "<span class='guidename'>" + guide.name + "</span>";
		if(guide.name === 'rightside') re += "<span class='guidelocation'>" + getSelectedChar().advancewidth + "</span>";
		else re += "<span class='guidelocation'>" + guide.location + "</span>";
		re += "</td></tr></table>";

		return re;
	}

	function showGuideSatChooser(ctx, name) {
		var sc = new SatChooser({clickCallback:function(args){
			_GP.projectsettings.guides[name].color = args.colorstring;
			redraw();
		}});
		sc.show({elem:ctx});
	}

	function hideAllSatChoosers() {
		var scid = document.getElementById('satchooser');
		while(scid) {
			scid.parentNode.removeChild(scid);
			scid = document.getElementById('satchooser');
		}
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

			re += "</select>";
		return re;
	}
// end of file