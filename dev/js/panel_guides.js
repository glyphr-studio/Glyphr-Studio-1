// start of file

//-------------------
// Guides Panel
//-------------------
	function makePanel_Guides(){

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">guides</h1>';
		content += '</div><div class="panel_section">';

		var system = '';
		var user = '';
		var guides = _GP.projectsettings.guides;
		var tg;

		for(var g in guides){ if(guides.hasOwnProperty(g)){
			tg = guides[g];

			if(tg.editable){
				user += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), g);
			} else {
				system += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), g);
			}
		}}

		content += '<h3 style="margin-top:0px; margin-bottom:10px;">options</h3>';
		content += '<table style="wdith:100%;">'+
			'<tr><td style="width:20px">' + checkUI('_UI.showgrid', true) + '</td>' +
			'<td><label style="margin-left:10px;" for="showgrid">show grid</label></td></tr>' +
			'<tr><td style="width:20px">' + checkUI('_UI.showguides', true) + '</td>' +
			'<td><label style="margin-left:10px;" for="showguides">show guides</label></td></tr>' +
			'<tr><td style="width:20px">' + checkUI('_UI.showguidelabels', true) + '</td>' +
			'<td><label style="margin-left:10px;" for="showguidelabels">show guide labels</label></td></tr>' +
			'<tr><td style="width:20px">' + checkUI('_UI.showovershoots', true) + '</td>' +
			'<td><label style="margin-left:10px;" for="showovershoots">show overshoots ('+_GP.projectsettings.overshoot+' em units)</label></td></tr>' +
			'</table>';

		if(_UI.navhere !== 'kerning'){
			content += '<br><h3 style=" margin-bottom:10px;">system guides</h3>';
			content += system;
			content += '<br><h3 style=" margin-bottom:10px;">custom guides</h3>';
			content += user;
			content += '<br><button onclick="newGuide();">new guide</button>';
		}

		content += '</div>';

		return content;
	}

	function makeOneGuideRow(guide, path, id) {
		var sys = !guide.editable;
		var re = '<table class="guiderow"><tr>';

		re += '<td class="guidecolor" style="background-color:'+ guide.color + ';"';
		if(!sys){
			re += ' onmouseover="hideAllSatChoosers(); this.style.cursor=\'pointer\'; this.style.borderColor=\''+ guide.color + '\';"';
			re += ' onmouseout="this.style.borderColor=\'rgb(250,252,255)\';"';
			re += ' onclick="hideAllSatChoosers(); showGuideSatChooser(this, \''+id+'\');"';
		}
		re += '>';
		re += '</td>';

		re += '<td>';
		re += checkUI((path+'.visible'), true);
		re += '</td>';

		re += '<td>';
		if(guide.type === 'horizontal'){
			re += '<button '+(sys? 'disabled':'')+' class="guidetype" onclick="updateGuide(\''+id+'\', \'type\', \'vertical\');">&mdash;</button>';
		} else {
			re += '<button '+(sys? 'disabled':'')+' class="guidetype" onclick="updateGuide(\''+id+'\', \'type\', \'horizontal\');">|</button>';
		}
		re += '</td>';

		re += '<td>';
		re += '<input '+(sys? 'disabled':'')+' type="text" class="guidename" value="' + guide.name + '" onchange="updateGuide(\''+id+'\', \'name\', this.value);"/>';
		re += '</td>';

		re += '<td>';
		re += '<input '+(sys? 'disabled':'')+' type="number" id="'+id+'" class="guidelocation" value="' + guide.location + '" onchange="_UI.focuselement=this.id; updateGuide(\''+id+'\', \'location\', (1*this.value));"/>';
		re += '</td>';

		if(!sys){
		re += '<td>';
		re += '<button class="guideremove" onclick="removeGuide(\''+id+'\');">&times</button>';
		re += '</td>';
		}

		re += '</tr></table>';
		return re;
	}

	function updateGuide(id, key, value) {
		var g = _GP.projectsettings.guides[id];
		g[key] = value;
		if(key === 'type'){
			if(g.name === 'horizontal guide') g.name = 'vertical guide';
			else if(g.name === 'vertical guide') g.name = 'horizontal guide';
		}
		redraw();
	}

	function removeGuide(id) {
		var g = _GP.projectsettings.guides[id];
		var con = '<h1>Delete Guide</h1>';
		con += 'Are you sure you want to remove the guide: ';
		con += g.name + '?<br><br>';
		con += '<button class="buttonsel" onclick="delete _GP.projectsettings.guides[\''+id+'\']; closeDialog(); redraw();">Delete Guide</button>';
		con += '<button onclick="closeDialog();">Cancel</button>';

		openDialog(con);
	}

	function showGuideSatChooser(ctx, id) {
		var sc = new SatChooser({clickCallback:function(args){
			_GP.projectsettings.guides[id].color = args.colorstring;
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

	function newGuide() {
		var g = _GP.projectsettings.guides;
		var id = generateNewID(g, 'guide');

		g[id] = new Guide({});

		redraw();
	}

// end of file