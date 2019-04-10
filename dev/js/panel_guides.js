// start of file
/**
	Panel > Guides
	Shows a list of all the system and custom 
	guide lines.
**/


	function makePanel_Guides(){

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">guides</h1>';
		content += '</div><div class="panel_section">';

		var system = '';
		var user = '';
		var guides = _GP.projectsettings.guides;
		var ps = _GP.projectsettings;
		var tg;

		for(var g in guides){ if(guides.hasOwnProperty(g)){
			tg = guides[g];

			if(tg.editable){
				user += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), tg.visible, g);
			} else if (tg.showname) {
				system += makeOneGuideRow(tg, ('_GP.projectsettings.guides.'+g), tg.visible, g);
			}
		}}

		content += '<h3 style="margin-top:0px; margin-bottom:10px;">options</h3>';
		content += '<table style="width:100%;">'+
        '<tr><td style="width:20px">' + checkUI('_UI.showgrid', _UI.showgrid, true) + '</td>' +
        '<td><label style="margin-left:10px;" for="showgrid">show grid</label></td></tr>' +
        '<tr><td style="width:20px">' + checkUI('_UI.showguides', _UI.showguides, true) + '</td>' +
        '<td><label style="margin-left:10px;" for="showguides">show guides</label></td></tr>' +
        '<tr><td style="width:20px">' + checkUI('_UI.showguidelabels', _UI.showguidelabels, true) + '</td>' +
        '<td><label style="margin-left:10px;" for="showguidelabels">show guide labels</label></td></tr>' +
        '<tr><td style="width:20px">' + checkUI('_UI.showovershoots', _UI.showovershoots, true) + '</td>' +
        '<td><label style="margin-left:10px;" for="showovershoots">show overshoots ('+ps.overshoot+' em units)</label></td></tr>' +
        // '<td colspan="2">grid transparency:<input type="range" min="0" max="100" value="'+ps.colors.gridtransparency+'" step="1" oninput="updateTransparency(\'gridtransparency\', this.value);"/><span id="gridtransparency">'+ps.colors.gridtransparency+'</span>%</td>'+sliderUI('gridtransparency')+'</tr>'+
        '<td colspan="2">grid '+sliderUI('gridtransparency', 'gridtransparency_panel', false, true)+'</td></tr>'+
        '</table>';
        
		if(_UI.current_page !== 'kerning'){
            content += '<br><h3 style=" margin-bottom:10px;">snapping</h3>'+
            '<table style="width:100%;">'+
            '<tr><td>' + checkUI('_GP.projectsettings.snaptogrid', _GP.projectsettings.snaptogrid, true) + '</td>' +
            '<td><label for="snaptogrid">snap to grid</label></td></tr>' +
            '<tr><td>' + checkUI('_GP.projectsettings.snaptoguides', _GP.projectsettings.snaptoguides, true) + '</td>' +
            '<td><label for="snaptoguides">snap to guides</label></td></tr>' +
            '<tr><td style="width:30px;"><input type="text" value="'+(ps.snapdistance)+'" onchange="var r=Math.round(parseInt(this.value)); r=r||1; _GP.projectsettings.snapdistance=r; this.value=r;" style="width:25px;"/></td>'+
            '<td><label style="margin-left:10px;">Snap distance/proximity.<span class="unit">(screen pixels)</span></label></td></tr>'+
            '</table>';

			content += '<br><h3 style=" margin-bottom:0px;">system guides</h3>';
			// content += 'transparency:<input type="range" min="0" max="100" value="'+ps.colors.systemguidetransparency+'" step="1" oninput="updateTransparency(\'systemguidetransparency\', this.value);"/><span id="systemguidetransparency">'+ps.colors.systemguidetransparency+'</span>%<br><br>';
			content += 'guide ' + sliderUI('systemguidetransparency', 'systemguidetransparency_panel', false, true) + '<br><br>';
			content += system;
			content += '<br><h3 style=" margin-bottom:0px;">custom guides</h3>';
			// content += 'transparency:<input type="range" min="0" max="100" value="'+ps.colors.customguidetransparency+'" step="1" oninput="updateTransparency(\'customguidetransparency\', this.value);"/><span id="customguidetransparency">'+ps.colors.customguidetransparency+'</span>%<br><br>';
			content += 'guide ' + sliderUI('customguidetransparency', 'customguidetransparency_panel', false, true) + '<br><br>';
			content += user;
			content += '<br><button onclick="newGuide();">new guide</button>';
		}

		content += '</div>';

		return content;
	}

	function makeOneGuideRow(guide, path, currviz, id) {
		var sys = !guide.editable;
		var re = '<table class="guiderow"><tr>';

		re += '<td class="guidecolor" style="background-color:'+ guide.color + ';"';
		if(!sys){
			re += ' customguidetransparency="hideAllSatChoosers(); this.style.cursor=\'pointer\'; this.style.borderColor=\''+ guide.color + '\';"';
			re += ' onmouseout="this.style.borderColor=\'rgb(250,252,255)\';"';
			re += ' onclick="hideAllSatChoosers(); showGuideSatChooser(this, \''+id+'\');"';
		}
		re += '>';
		re += '</td>';

		re += '<td>';
		re += checkUI((path+'.visible'), currviz, true);
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
		re += '<input '+(sys? 'disabled':'')+' type="number" id="'+id+'" class="guidelocation" value="' + round(guide.location, 3) + '" onchange="_UI.focuselement=this.id; updateGuide(\''+id+'\', \'location\', (1*this.value));"/>';
		re += '</td>';

		if(!sys){
		re += '<td>';
		re += '<button class="guideremove" onclick="deleteGuide(\''+id+'\');">&times</button>';
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
		redraw({calledby:'updateGuide'});
	}

	function deleteGuide(id) {
		var g = _GP.projectsettings.guides[id];
		showToast('Deleted ' + g.name);

		delete _GP.projectsettings.guides[id];
		redraw({calledby:'deleteGuide'});
	}

	function showGuideSatChooser(ctx, id) {
		var sc = new SatChooser({clickCallback:function(args){
			_GP.projectsettings.guides[id].color = args.colorstring;
			redraw({calledby:'SatChooser.callback'});
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

		redraw({calledby:'newGuide'});
	}

// end of file