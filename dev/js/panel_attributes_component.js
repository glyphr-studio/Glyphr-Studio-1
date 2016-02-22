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
			_UI.current_page = 'ligatures';
		} else if(chid.indexOf('0x') > -1){
			// Glyph
			_UI.selectedglyph = chid;
			_UI.current_page = 'glyph edit';
		} else {
			// Component
			_UI.selectedcomponent = chid;
			_UI.current_page = 'components';
		}

		clickEmptySpace();
		_UI.current_panel = "npAttributes";
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
					'onchange="_UI.ms.shapes.changeShapeName(this.value);">' +
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
					'<input type="number" id="rot" step="'+svc+'" value="' + round(-1*s.rotation, 1) + '" onchange="updateComponentInstanceDetail(\'rotation\', this.value, this.id);">' +
			'</td>'+
		'</tr>';

		var rotationhelp = "<h1>Rotate First - Resize First</h1><div style=\\&apos;width:500px;\\&apos;>";
		rotationhelp += "Component Instances are rotated around their center point.  But if they are re-sized, their center point changes.  When Component Instances are rendered, the Root Component is adjusted according to the delta values stored by the Component Instance.";
		rotationhelp += "<br><br>This option changes how this Component Instances is rendered.  Default is re-size, then rotate. When checked, it will be rotate, then re-size. This order has an impact on the Component Instance’s resulting shape.";
		rotationhelp += "<br><br><img src=\\&apos;data:image/png;base64,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\\&apos;/>";
		rotationhelp += "<br><br>If a Component Instance is not re-sized, or not rotated, this option has no effect.";
		rotationhelp += "</div>";

		content += '<tr>'+
			'<td> rotate first </td>'+
			'<td>' + checkUI('_UI.ms.shapes.getSingleton().rotatefirst', s.rotatefirst, true) + '&ensp;'+helpUI(rotationhelp)+ '</td>'+
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
		var selci = _UI.ms.shapes.getSingleton();
		var oldval = selci[key];

		value = isval(value)? value : 0;
		if(key === 'rotation') value *= -1;
		selci[key] = value;

		var ts, w, h;
		if(selci.ratiolock){
			ts = selci.getTransformedGlyph();
			w = (ts.maxes.xmax - ts.maxes.xmin);
			h = (ts.maxes.ymax - ts.maxes.ymin);

			if(key === 'scalew'){
				selci.scaleh += ((value - oldval) * (h / w));
			} else if (key === 'scaleh'){
				selci.scalew += ((value - oldval) * (w / h));
			}
		}

		history_put('component '+key);
		_UI.focuselement = id;
		redraw({calledby:'componentInstanceDetails'});
	}

// end of file