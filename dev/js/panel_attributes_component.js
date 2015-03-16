 // start of file

//	---------------------------------
//	COMPONENT ATTRIBUTES
//	---------------------------------
	function componentGlyphDetails(){
		var con = '';
		var sls = getSelectedWorkItem();
		if(!sls) return '';

		con += '<h3'+((sls.shape)? '' : ' style="margin-top:0px;"')+'>glyphs that use this component</h3>';
		if(sls.usedin.length > 0){
			con += makeUsedInThumbs();
		} else {
			con += '<br><i>this component is not currently being used by any glyphs. ';
			con += '<a href="#" onclick="showAddSSToGlyphDialog();">add this component to a glyph now</a>.</i>';
		}

		//debug("COMPONENTGLYPHDETAILS - returning html:\n" + con);
		return con;
	}

	function makeUsedInThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		var ui = getSelectedWorkItem().usedin;
		var unique = ui.filter(function(elem, pos) { return ui.indexOf(elem) === pos;});
		var cname;

		for(var k=0; k<unique.length; k++){
			cname = getGlyphName(unique[k]);
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td title='"+cname+"'>";
			re += "<div class='ssusedinthumb' onclick='goToEditGlyph(\""+(unique[k])+"\");'>";
			re += getGlyph(unique[k]).makeSVG();
			re += "</div></td></tr><tr><td>";
			re += (cname === 'Space')? cname : getGlyph(unique[k]).glyphhtml;
			re += "</td></tr></table>";
			//debug("makeUsedInThumbs - created canvas 'thumb"+unique[k]+"'");
		}
		re += "</div>";
		return re;
	}

	function goToEditGlyph(chid){
		//debug("GOTOEDITGLYPH - " + chid);
		_UI.selectedshape = -1;
		_UI.selectedglyph = chid;
		if(chid.length === 6) _UI.navhere = "glyph edit";
		else if (chid.length > 6) _UI.navhere = 'ligatures';
		else debug('\n goToEditGlyph - BAD CHID CAN\'T NAVIGATE TO ' + chid);
		_UI.navprimaryhere = "npAttributes";
		navigate();
	}

//	---------------------------------
//	COMPONENT INSTANCE ATTRIBUTES
//	---------------------------------

	function componentInstanceDetails(s){
		//debug("COMPONENTINSTANCEDETAILS - start of function");
		var com = getGlyph(s);
		var svc = (_GP.projectsettings.spinnervaluechange || 1);
		content = '<tr><td colspan=2><h3>component instance</h3></td></tr>';

		content += '<tr><td colspan=2><h3 style="font-size:.9em; color:rgb(153,158,163); margin-top:0px; padding-top:0px;">'+
			'A compnent instance may be adjusted while the root component remains unchanged. '+
			'X, Y, Width, and Height values are relative to the component position.'+
		'</h3></td></tr>';

		content += '<tr><td> instance name </td>'+
			'<td style="margin-top:0px; padding-top:0px; padding-right:10px;">'+
				'<input style="width:90%;" id="comname" type="text" value="' + s.name + '" '+
					'onchange="updateComponentInstanceDetail(\'name\', this.value, this.id);">' + 
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>&#916; x'+ dimSplit() + '&#916; y</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('ss().xlock')+
					'<input type="number" id="comx" step="'+svc+'" value="' + round(s.translatex, 3) + '" '+
						'onchange="updateComponentInstanceDetail(\'translatex\', this.value, this.id);">'+
				'</div>'+
				dimSplit() +
				'<div class="lockwrapper">'+
					lockUI('ss().ylock')+
					'<input type="number" id="comy" step="'+svc+'" value="' + round(s.translatey, 3) + '" '+
						'onchange="updateComponentInstanceDetail(\'translatey\', this.value, this.id);">'+
				'</div>'+
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>&#916; width' + dimSplit() + '&#916; height</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('ss().wlock')+
					'<input type="number" id="comw" step="'+svc+'" value="' + round(s.scalew, 3) + '" '+
						'onchange="updateComponentInstanceDetail(\'scalew\', this.value, this.id);">'+
				'</div>'+
				dimSplit()+
				'<div class="lockwrapper">'+
					lockUI('ss().hlock')+
					'<input type="number" id="comh" step="'+svc+'" value="' + round(s.scaleh, 3) + '" '+
						'onchange="updateComponentInstanceDetail(\'scaleh\', this.value, this.id);">'+
				'</div>'+
			'</td>'+
		'</tr>';

		if(_UI.selectedtool !== 'pathedit') {
			content += '<tr>'+
				'<td> lock aspect ratio </td>'+
				'<td>'+checkUI('ss().ratiolock',true)+'</td>'+
			'</tr>';
		}


		// CHECKBOXES
		content += '<tr>'+
			'<td> flip horizontal </td>'+
			'<td>' + checkUI('ss().flipew', true) + '</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> flip vertical </td>'+
			'<td>' + checkUI('ss().flipns', true) + '</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> reverse winding </td>'+
			'<td>' + checkUI('ss().reversewinding', true) + '</td>'+
		'</tr>';


		content += '<tr><td colspan=2><h3>root component</h3></td></tr>';
		content += '<tr><td> root name </td><td>' + 
			'<input type="text" disabled="disabled value="' + getGlyphName(s.link) + '">'+
		'</td></tr>';
		content += '<tr><td colspan=2><button onclick="goToEditComponent(\''+s.link+'\');">edit this component</button></td></tr>';
		return content;
	}

	function updateComponentInstanceDetail(key, value, id) {
		var s = ss();
		s[key] = value;
		history_put('component '+key);
		_UI.focuselement = id;
		redraw('componentInstanceDetails');
	}

	function goToEditComponent(com){
		_UI.selectedcomponent = com;
		_UI.navhere = 'components';
		navigate('npAttributes');
	}

// end of file