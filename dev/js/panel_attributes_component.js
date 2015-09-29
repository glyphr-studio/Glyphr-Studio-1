 // start of file
/**
	Panel > Attributes > Component
	Panel > Attributes > Component Instance
	Builds attribute panels for Glyph objects on
	the components page, and also for Component
	Instance objects.
**/


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
		// debug('\n goToEditGlyph - START');
		// debug('\t passed ' + chid);

		if (chid.indexOf('0x', 2) > -1){
			// Ligature
			_UI.selectedligature = chid;
			_UI.navhere = 'ligatures';
		} else if(chid.indexOf('0x') > -1){
			// Glyph
			_UI.selectedglyph = chid;
			_UI.navhere = 'glyph edit';
		} else {
			// Component
			_UI.selectedcomponent = chid;
			_UI.navhere = 'components';
		}

		clickEmptySpace();
		_UI.navprimaryhere = "npAttributes";
		navigate('npAttributes');
		// debug(' goToEditGlyph - END\n');
	}

//	---------------------------------
//	COMPONENT INSTANCE ATTRIBUTES
//	---------------------------------

	function componentInstanceDetails(s){
		//debug("COMPONENTINSTANCEDETAILS - start of function");
		var svc = (_GP.projectsettings.spinnervaluechange || 1);
		content = '<tr><td colspan=2 class="detailtitle"><h3 style="margin:0px;">component instance</h3></td></tr>';

		content += '<tr><td colspan=2><h3 style="font-size:.9em; color:rgb(153,158,163); margin-top:0px; padding-top:0px;">'+
			'A compnent instance may be adjusted while the root component remains unchanged. '+
			'X, Y, Width, and Height values are relative to the component position.'+
		'</h3></td></tr>';

		content += '<tr><td class="leftcol"> instance name </td>'+
			'<td style="margin-top:0px; padding-top:0px;">'+
				'<input class="namewidth" id="comname" type="text" value="' + s.name + '" '+
					'onchange="updateComponentInstanceDetail(\'name\', this.value, this.id);">' +
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>&#916; x'+ dimSplit() + '&#916; y</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().xlock', s.xlock, 'xlock')+
					'<input type="number" id="comx" step="'+svc+'" value="' + round(s.translatex, 3) + '" '+
						(s.xlock? 'disabled="disabled" ' : 'onchange="updateComponentInstanceDetail(\'translatex\', this.value, this.id);">')+
				'</div>'+
				dimSplit() +
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().ylock', s.ylock, 'ylock')+
					'<input type="number" id="comy" step="'+svc+'" value="' + round(s.translatey, 3) + '" '+
						(s.ylock? 'disabled="disabled" ' : 'onchange="updateComponentInstanceDetail(\'translatey\', this.value, this.id);">')+
				'</div>'+
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>&#916; width' + dimSplit() + '&#916; height</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().wlock', s.wlock, 'wlock')+
					'<input type="number" id="comw" step="'+svc+'" value="' + round(s.scalew, 3) + '" '+
						(s.wlock? 'disabled="disabled" ' : 'onchange="updateComponentInstanceDetail(\'scalew\', this.value, this.id);">')+
				'</div>'+
				dimSplit()+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().hlock', s.hlock, 'hlock')+
					'<input type="number" id="comh" step="'+svc+'" value="' + round(s.scaleh, 3) + '" '+
						(s.hlock? 'disabled="disabled" ' : 'onchange="updateComponentInstanceDetail(\'scaleh\', this.value, this.id);">')+
				'</div>'+
			'</td>'+
		'</tr>';

		if(_UI.selectedtool !== 'pathedit') {
			content += '<tr>'+
				'<td> lock aspect ratio </td>'+
				'<td>' + checkUI('_UI.ms.shapes.getSingleton().ratiolock', s.ratiolock, true) + '</td>'+
			'</tr>';
		}


		// CHECKBOXES
		content += '<tr>'+
			'<td> flip horizontal </td>'+
			'<td>' + checkUI('_UI.ms.shapes.getSingleton().flipew', s.flipew, true) + '</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> flip vertical </td>'+
			'<td>' + checkUI('_UI.ms.shapes.getSingleton().flipns', s.flipns, true) + '</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> reverse winding </td>'+
			'<td>' + checkUI('_UI.ms.shapes.getSingleton().reversewinding', s.reversewinding, true) + '</td>'+
		'</tr>';

		// ROTATE
		content += '<tr>'+
			'<td>&#916; rotation</td>'+
			'<td>'+
					'<input type="number" id="rot" step="'+svc+'" value="' + round(s.rotation, 1) + '" onchange="updateComponentInstanceDetail(\'rotation\', this.value, this.id);">' +
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> rotate first </td>'+
			'<td>' + checkUI('_UI.ms.shapes.getSingleton().rotatefirst', s.rotatefirst, true) + '</td>'+
		'</tr>';

		// ROOT
		var cr = getGlyph(s.link);
		content += '<tr><td colspan=2><h3>root component</h3></td></tr></table>';
		content += '<table class="layertable">';
		content += '<tr class="componentlayer" onclick="goToEditGlyph(\''+s.link+'\');">';
		content += '<td class="layerthumb">'+ cr.makeSVG() +'</td>';
		content += '<td class="layername">' + cr.name;
		content += '<span class="layernote">edit this component</span>';
		content += '</td></tr>';
		content += '</table>';

		// content += '<tr><td> root name </td><td>' +
		// 	'<input type="text" disabled="disabled" value="' + getGlyphName(s.link) + '">'+
		// '</td></tr>';
		// content += '<tr><td colspan=2><button onclick="goToEditGlyph(\''+s.link+'\');">edit this component</button>';

		// content += '</td></tr>';

		return content;
	}

	function updateComponentInstanceDetail(key, value, id) {
		var oldval = _UI.ms.shapes[key];
		_UI.ms.shapes[key] = value;
		var ts, w, h;

		if(_UI.ms.shapes.ratiolock){
			ts = _UI.ms.shapes.getTransformedGlyph();
			w = (ts.maxes.xmax - ts.maxes.xmin);
			h = (ts.maxes.ymax - ts.maxes.ymin);

			if(key === 'scalew'){
				_UI.ms.shapes.scaleh += ((value - oldval) * (h / w));
			} else if (key === 'scaleh'){
				_UI.ms.shapes.scalew += ((value - oldval) * (w / h));
			}
		}


		history_put('component '+key);
		_UI.focuselement = id;
		redraw({calledby:'componentInstanceDetails'});
	}

// end of file