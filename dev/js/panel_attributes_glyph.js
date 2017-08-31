 // start of file
/**
	Panel > Attributes > Glyph
	Builds a panel of attributes for a Glyph, 
	which changes based on Shape or Path Point 
	selection.
**/


	function makePanel_GlyphAttributes(){
		// debug('\n makePanel_GlyphAttributes - START');
		var sc = getSelectedWorkItem();
		var ss = _UI.ms.shapes.getMembers();

		var content = '<div class="navarea_header">';
		content += makePanelSuperTitle();
		content += '<h1 class="paneltitle">attributes</h1>';
		content += '</div>';
		if(!sc) return content;

		content += '<div class="panel_section">';
		content += '<table class="detail">';

		if (_UI.current_page === 'components'){
			// debug(" \t  detected current_page = components");
			content += '<tr><td colspan=2 class="detailtitle"><h3 style="margin-top:0px;">component</h3></td></tr>';
			content += '<tr><td class="leftcol">name</td><td><input class="namewidth" type="text" value="'+sc.name+'" onchange="getSelectedWorkItem().name = this.value;"/></td></tr>';
		}

		if(ss.length === 0){
			// no shape selected
			// debug(" \t no shape selected");
			content += glyphDetails();

		} else if (ss.length === 1){
			// One shape selected
			if(ss[0].objtype === 'componentinstance'){
				// component selected
				// debug(" \t component selected");
				content += componentInstanceDetails(ss[0]);
			} else {
				// regular shape selected
				// debug(" \t regular shape selected");
				content += shapeDetails(ss[0]);

				var ispointsel = (_UI.ms.points.count() === 1);
				if(!(_UI.selectedtool === 'pathedit' || _UI.selectedtool === 'pathaddpoint')) ispointsel = false;

				if(ispointsel){ content += pointDetails(_UI.ms.points.getSingleton()); }
			}
		} else {
			// Many shapes selected
			content += '<tr><td colspan=2 class="detailtitle"><h3 style="margin-top:0px;">'+ss.length+' selected shapes</h3></td></tr>';
			content += multiSelectDetails();
		}

		if (_UI.current_page === 'components'){
			content += '<tr><td colspan=2 class="detailtitle"><h3>glyphs that use this component</h3></td></tr>';
			content += '<tr><td colspan=2>';
			if(sc.usedin.length > 0){
				content += makeUsedInThumbs();
			} else {
				content += '<br><i>this component is not currently being used by any glyphs. ';
				content += '<a href="#" onclick="showDialog_LinkComponentToGlyph();">add this component to a glyph now</a>.</i>';
			}
			content += '</td></tr>';
		}

		content += '</table>';
		content += '</div>';

		// debug(' makePanel_GlyphAttributes - END\n');
		return content;
	}

	function multiSelectDetails() {
		var sc = _UI.ms.shapes.getGlyph();
		var svc = _GP.projectsettings.spinnervaluechange*1 || 1;
		var content = '';

		content += '<tr>'+
			'<td class="leftcol">x'+dimSplit()+'y</td>'+
			'<td>'+
				'<input type="number" id="charx" step="'+svc+'" '+
				'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapePosition(this.value, false, true); history_put(\'Multi-selected Shapes X Position : \'+this.value); redraw({calledby:\'Glyph Details - X Position\'});}"'+
				' value="' + round(sc.maxes.xmin, 3) + '" >'+
				dimSplit()+
				'<input type="number" id="chary" step="'+svc+'" '+
				'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapePosition(false, this.value, true); history_put(\'Multi-selected Shapes Y Position : \'+this.value); redraw({calledby:\'Glyph Details - Y Position\'});}"'+
				' value="' + round(sc.maxes.ymax, 3) + '" >'+
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>width'+dimSplit()+'height</td>'+
			'<td>'+
				'<input type="number" id="charw" step="'+svc+'" '+
				'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapeSize(this.value,false,'+sc.ratiolock+'); history_put(\'Multi-selected Shapes Width : \'+this.value); redraw({calledby:\'Glyph Details - Width\'});}"'+
				' value="' + round(sc.maxes.xmax-sc.maxes.xmin, 3) + '" >'+
				dimSplit()+
				'<input type="number" id="charh" step="'+svc+'" '+
				'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapeSize(false,this.value,'+sc.ratiolock+'); history_put(\'Multi-selected Shapes Height : \'+this.value); redraw({calledby:\'Glyph Details - Height\'});}"'+
				' value="' + round(sc.maxes.ymax-sc.maxes.ymin, 3) + '" >'+
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td> lock aspect ratio </td>'+
			'<td>'+checkUI('_UI.ms.shapes.getGlyph().ratiolock', sc.ratiolock, true)+'</td>'+
		'</tr>';

		return content;
	}

	function glyphDetails(s){
		var sc = getSelectedWorkItem();
		var svc = _GP.projectsettings.spinnervaluechange*1 || 1;
		sc.calcGlyphMaxes();
		var content = '';
		var numshapes = getSelectedWorkItemShapes().length;


		if(numshapes > 1){
			content += '<tr><td colspan=2><h3 style="margin-top:0px;"> bulk-transform glyph shapes </h3></td></tr>';
			content += '<tr>'+
				'<td class="leftcol">x'+dimSplit()+'y</td>'+
				'<td>'+
					'<input type="number" id="charx" step="'+svc+'" '+
					'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){getSelectedWorkItem().setGlyphPosition(this.value, false, true); history_put(\'Glyph X Position : \'+this.value); redraw({calledby:\'Glyph Details - X Position\'});}"'+
					' value="' + round(sc.maxes.xmin, 3) + '" >'+
					dimSplit()+
					'<input type="number" id="chary" step="'+svc+'" '+
					'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){getSelectedWorkItem().setGlyphPosition(false, this.value, true); history_put(\'Glyph Y Position : \'+this.value); redraw({calledby:\'Glyph Details - Y Position\'});}"'+
					' value="' + round(sc.maxes.ymax, 3) + '" >'+
				'</td>'+
			'</tr>';

			content += '<tr>'+
				'<td>width'+dimSplit()+'height</td>'+
				'<td>'+
					'<input type="number" id="charw" step="'+svc+'" '+
					'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){getSelectedWorkItem().setGlyphSize(this.value,false,'+sc.ratiolock+'); history_put(\'Glyph Width : \'+this.value); redraw({calledby:\'Glyph Details - Width\'});}"'+
					' value="' + round(sc.maxes.xmax-sc.maxes.xmin, 3) + '" >'+
					dimSplit()+
					'<input type="number" id="charh" step="'+svc+'" '+
					'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){getSelectedWorkItem().setGlyphSize(false,this.value,'+sc.ratiolock+'); history_put(\'Glyph Height : \'+this.value); redraw({calledby:\'Glyph Details - Height\'});}"'+
					' value="' + round(sc.maxes.ymax-sc.maxes.ymin, 3) + '" >'+
				'</td>'+
			'</tr>';

			content += '<tr>'+
				'<td> lock aspect ratio </td>'+
				'<td>'+checkUI('getSelectedWorkItem().ratiolock', sc.ratiolock, true)+'</td>'+
			'</tr>';
		}

		if (_UI.current_page === 'components') return content;


		// AUTO GLYPH WIDTH
		content += '<tr><td colspan=2 class="detailtitle"><h3> glyph width </h3></td></tr>';

		content += '<tr>'+
				'<td> auto calculate <span class="unit">(em units)</span></td>'+
				'<td>'+
					checkUI('getSelectedWorkItem().isautowide', sc.isautowide, true)+
					'&emsp;';

					if(!sc.isautowide){
						content += '<input type="number" id="charaw" step="'+svc+'" '+
						'value="' + round(sc.glyphwidth, 3) + '" '+
						'onchange="_UI.focuselement=this.id; getSelectedWorkItem().glyphwidth = (this.value*1); redraw({calledby:{calledby:\'glyphDetails\'}});">';
					} else {
						content += '<input type="number" disabled="disabled" '+
						'value="'+ round(sc.glyphwidth, 3) + '"/>';
					}

			content += '</td>'+
			'</tr>';



		// LEFT SIDE BEARING
		if(sc.isautowide){
			content += '<tr><td colspan=2 class="detailtitle"><h3> left side bearing </h3></td></tr>';

			content += '<tr>'+
				'<td> use default <span class="unit">(em units)</span> </td>'+
				'<td>'+
					checkUI('getSelectedWorkItem().leftsidebearing', sc.leftsidebearing, true, true)+
					'&emsp;';

					if(sc.leftsidebearing){
						if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
						content += '<input type="number" id="charlsb" step="'+svc+'" '+
						'value="' + sc.leftsidebearing + '" '+
						'onchange="_UI.focuselement=this.id; getSelectedWorkItem().leftsidebearing = (this.value*1); redraw({calledby:\'glyphDetails\'});">';
					} else {
						content +='<input type="number" disabled="disabled" '+
						'value="'+ round(_GP.projectsettings.defaultlsb, 3) + '"/>';
					}
			content += '</td>'+
			'</tr>';

		}


		// RIGHT SIDE BEARING
		if(sc.isautowide){
			content += '<tr><td colspan=2 class="detailtitle"><h3> right side bearing </h3></td></tr>';

			content += '<tr>'+
				'<td> use default <span class="unit">(em units)</span> </td>'+
				'<td>'+
					checkUI('getSelectedWorkItem().rightsidebearing', sc.rightsidebearing,  true, true)+
					'&emsp;';

					if(sc.rightsidebearing){
						if(sc.rightsidebearing === true) sc.rightsidebearing = _GP.projectsettings.defaultrsb;
						content += '<input type="number" id="charrsb" step="'+svc+'" '+
						'value="' + sc.rightsidebearing + '" '+
						'onchange="_UI.focuselement=this.id; getSelectedWorkItem().rightsidebearing = (this.value*1); redraw({calledby:\'glyphDetails\'});">';
					} else {
						content +=	'<input type="number" disabled="disabled" '+
						'value="'+round(_GP.projectsettings.defaultrsb, 3) + '"/>';
					}
			content += '</td>'+
			'</tr>';

		}

		// USED IN 
		if(sc.usedin.length > 0){
			content += '<tr><td colspan=2><br class="detailtitle"><h3>glyphs that use this component</h3></td></tr>';
			content += '<tr><td colspan=2>';
			content += makeUsedInThumbs();
			content += '</td></tr>';
		} 

		return content;
	}

	function shapeDetails(s){
		//debug("SHAPEDETAILS - Drawing Shape Details");
		var svc = _GP.projectsettings.spinnervaluechange*1 || 1;
		var content = '';
		content += '<tr><td colspan=2 class="detailtitle"><h3 style="margin:0px;">shape</h3></td></tr>';

		content += '<tr>'+
			'<td class="leftcol">name</td>'+
			'<td>'+
				'<input class="namewidth" type="text" value="' + s.name + '" onchange="_UI.ms.shapes.changeShapeName(this.value);">'+
			'</td>'+
		'</tr>';

		var xval, yval, hval, wval;

		if(!_UI.eventhandlers.tempnewbasicshape){
			xval = round(s.path.maxes.xmin, 3);
			yval = round(s.path.maxes.ymax, 3);
			wval = round(s.path.getWidth(), 3);
			hval = round(s.path.getHeight(), 3);
		} else {
			xval = round(_UI.eventhandlers.tempnewbasicshape.xmin, 3);
			yval = round(_UI.eventhandlers.tempnewbasicshape.ymax, 3);
			wval = Math.abs(round(_UI.eventhandlers.tempnewbasicshape.xmax-_UI.eventhandlers.tempnewbasicshape.xmin, 3));
			hval = Math.abs(round(_UI.eventhandlers.tempnewbasicshape.ymax-_UI.eventhandlers.tempnewbasicshape.ymin, 3));
		}

		content += '<tr>'+
			'<td>x'+dimSplit()+'y</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().xlock', s.xlock, 'ssxlock')+
					'<input type="number" id="shapex" step="'+svc+'" '+
					(s.xlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapePosition(this.value, false); history_put(\'Shape X Position : \'+this.value); redraw({calledby:\'shapeDetails - X Position\'});}"')+
					' value="' + xval + '" >'+
				'</div>'+
				dimSplit()+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().ylock', s.ylock, 'ssylock')+
					'<input type="number" id="shapey" step="'+svc+'" '+
					(s.ylock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapePosition(false, this.value); history_put(\'Shape Y Position : \'+this.value); redraw({calledby:\'shapeDetails - Y Position\'});}"')+
					' value="' + yval + '" >'+
				'</div>'+
			'</td>'+
		'</tr>';

		content += '<tr>'+
			'<td>width'+dimSplit()+'height &emsp;</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().wlock', s.wlock, 'sswlock')+
					'<input type="number" id="shapew" step="'+svc+'" '+
					(s.wlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapeSize(this.value,false,'+s.ratiolock+'); history_put(\'Shape Width : \'+this.value); redraw({calledby:\'shapeDetails - Width\'});}"')+
					' value="' + wval + '" >'+
				"</div>"+
				dimSplit()+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.shapes.getSingleton().hlock', s.hlock, 'sshlock')+
					'<input type="number" id="shapeh" step="'+svc+'" '+
					(s.hlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; if(!_UI.redrawing){_UI.ms.shapes.setShapeSize(false,this.value,'+s.ratiolock+'); history_put(\'Shape Height : \'+this.value); redraw({calledby:\'shapeDetails - Height\'});}"')+
					' value="' + hval + '" ></td>'+
				'</div>'+
			'</td>'+
		'</tr>';

		var overlaphelptext = "<h1>Overlap Mode</h1><div style=\\&apos;width:500px;\\&apos;>"+
			"The Path Points that make up a shape outline have either a clockwise or counter-clockwise direction. "+
			"This path direction is also known as a path&rsquo;s &ldquo;winding&rdquo;. "+
			"Shapes with the same winding will combine, opposite windings will cut-out.<br><br>"+
			"For example, to create the glyph &lsquo;o&rsquo;, draw two overlapping oval shapes. "+
			"If the outside oval has a clockwise winding, select the inside oval and change it&rsquo;s winding to counter-clockwise. "+
			"This will result in the inside oval appearing in reverse (or cutting out) in relation to the outside oval.</div><br><br>"+
			"<table style=\\&apos;width:350px;\\&apos;><tr><td style=\\&apos;text-align:center;\\&apos;><span style=\\&apos;font-size:1.2em;\\&apos;>Same Winding</span><br></td><td style=\\&apos;text-align:center;\\&apos;><span style=\\&apos;font-size:1.2em;\\&apos;>Different Winding</span><br></td></tr>"+
			"<td style=\\&apos;text-align:center;\\&apos;><br><img src=\\&apos;data:image/png;base64,"+
			"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"+
			"\\&apos;></td><td style=\\&apos;text-align:center;\\&apos;><br><img src=\\&apos;data:image/png;base64,"+
			"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"+
			"\\&apos;></td></tr></table>";

		content += '<tr>'+
			'<td> overlap mode </td>'+
			'<td>'+
				'<button style="width:180px; height:26px; padding:0px;" onclick="_UI.ms.shapes.reverseWinding();history_put(\'Reverse Path Direction\');redraw({calledby:\'shapeDetails - Winding\'});">'+
				(s.path.winding===0?'unknown':(s.path.winding>0?'counterclockwise&ensp;&#8634':'clockwise&ensp;&#8635'))+
				'</button>'+
				'&ensp;'+helpUI(overlaphelptext)+
			'</td>'+
		'</tr>';

		if(_UI.selectedtool !== 'pathedit') {
			content += '<tr>'+
				'<td> lock aspect ratio </td>'+
				'<td>'+checkUI('_UI.ms.shapes.getSingleton().ratiolock', s.ratiolock, true)+'</td>'+
			'</tr>';
		}

		//debug("<b>SHAPE DETAILS OUTPUT:<b><br><textarea rows=9 cols=3000>" + content + "</textarea>");
		return content;
	}

	function pointDetails(tp){
		var svc = _GP.projectsettings.spinnervaluechange*1 || 1;
		var content = '';

		// POINT
		content += '<tr><td colspan=2 class="detailtitle"><h3>path point</h3></td></tr>';

		content += '<tr>'+
			'<td class="leftcol"> selected point </td>'+
			'<td><input type="number" id="pointnum" class="lockpad" value="' + _UI.ms.points.getSingletonPointNumber() + '" onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().parentpath.selectPathPoint(this.value); redraw({calledby:\'pointDetails\'});"></td>'+
		'</tr>';

		content += '<tr><td> point type </td><td>';
		content += makePointButton('symmetric', (tp.type==='symmetric'));
		content += makePointButton('flat', (tp.type==='flat'));
		content += makePointButton('corner', (tp.type==='corner'));
		content += '</td></tr>';

		content += '<tr>'+
			'<td>x'+dimSplit()+'y</td>'+
			'<td>'+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.points.getSingleton().P.xlock', tp.P.xlock, 'Pxlock')+
					'<input type="number" id="pointx" step="'+svc+'" '+
					(tp.P.xlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'P\', (this.value), \'null\'); history_put(\'Point X Position : \'+this.value); redraw({calledby:\'pointDetails\'});"')+
					' value="' + round(tp.P.x, 3) + '" >'+
				'</div>'+
				dimSplit()+
				'<div class="lockwrapper">'+
					lockUI('_UI.ms.points.getSingleton().P.ylock', tp.P.ylock, 'Pylock')+
					'<input type="number" id="pointy" step="'+svc+'" '+
					(tp.P.ylock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'P\', \'null\', (this.value)); history_put(\'Point Y Position : \'+this.value); redraw({calledby:\'pointDetails\'});"')+
					' value="' + round(tp.P.y, 3) + '" >'+
				'</div>'+
			'</td>'+
		'</tr>';


		var issymmetric = tp.type === 'symmetric';

		// HANDLE 1
		content += '<tr><td colspan=2 class="detailtitle"><h3>'+(issymmetric? '<input type="checkbox" checked disabled>' : checkUI("_UI.ms.points.getSingleton().useh1", tp.useh1, true))+' handle 1 <span class="unit">(before the point)</span></h3></td></tr>';

		if(tp.useh1){
			content += '<tr>'+
				'<td>x'+dimSplit()+'y</td>'+
				'<td>'+
					'<div class="lockwrapper">'+
						lockUI('_UI.ms.points.getSingleton().H1.xlock', tp.H1.xlock, 'H1xlock')+
						'<input type="number" id="handle1x" step="'+svc+'" '+
						(tp.H1.xlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'H1\', (this.value), \'null\'); history_put(\'H1 X Position : \'+round(this.value)); redraw({calledby:\'pointDetails\'});"')+
						' value="' + round(tp.H1.x, 3) + '" >'+
					'</div>'+
					dimSplit()+
					'<div class="lockwrapper">'+
						lockUI('_UI.ms.points.getSingleton().H1.ylock', tp.H1.ylock, 'H1ylock')+
						'<input type="number" id="handle1y" step="'+svc+'" '+
						(tp.H1.ylock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'H1\', \'null\', (this.value)); history_put(\'H1 Y Position : \'+round(this.value)); redraw({calledby:\'pointDetails\'});"')+
						' value="' + round(tp.H1.y, 3) + '" >'+
					'</div>'+
				'</td>'+
			'</tr>';

			content += '<tr>'+
				'<td> angle'+dimSplit()+'length </span></td>'+
				'<td><input type="number" class="lockpad" disabled="disabled" value="'+(round(tp.getH1NiceAngle(),1) || 0)+'">'+
				dimSplit()+
				'<input type="number" class="lockpad" disabled="disabled" value="'+(round(tp.getH1Length(),3) || 0)+'"></td>'+
			'</tr>';
		}

		// HANDLE 2
		content += '<tr><td colspan=2 class="detailtitle"><h3>'+(issymmetric? '<input type="checkbox" checked disabled>' : checkUI('_UI.ms.points.getSingleton().useh2', tp.useh2, true))+' handle 2 <span class="unit">(after the point)</span></h3></td></tr>';

		if(tp.useh2){
			content += '<tr>'+
				'<td>x'+dimSplit()+'y</td>'+
				'<td>'+
					'<div class="lockwrapper">'+
						lockUI('_UI.ms.points.getSingleton().H2.xlock', tp.H2.xlock, 'H2xlock')+
						'<input type="number" id="handle2x" step="'+svc+'" '+
						(tp.H2.xlock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'H2\', (this.value), \'null\'); history_put(\'H2 X Position : \'+round(this.value)); redraw({calledby:\'pointDetails\'});"')+
						' value="' + round(tp.H2.x, 3) + '" >'+
					'</div>'+
					dimSplit()+
					'<div class="lockwrapper">'+
						lockUI('_UI.ms.points.getSingleton().H2.ylock', tp.H2.ylock, 'H2ylock')+
						'<input type="number" id="handle2y" step="'+svc+'" '+
						(tp.H2.ylock? 'disabled="disabled"' : 'onchange="_UI.focuselement=this.id; _UI.ms.points.getSingleton().setPathPointPosition(\'H2\', \'null\', (this.value)); history_put(\'H2 Y Position : \'+round(this.value)); redraw({calledby:\'pointDetails\'});"')+
						' value="' + round(tp.H2.y, 3) + '" >'+
					'</div>'+
				'</td>'+
			'</tr>';

			content += '<tr>'+
				'<td> angle'+dimSplit()+'length </span></td>'+
				'<td><input type="number" class="lockpad" disabled="disabled" value="'+(round(tp.getH2NiceAngle(),1) || 0)+'">'+
				dimSplit()+
				'<input type="number" class="lockpad" disabled="disabled" value="'+(round(tp.getH2Length(),3) || 0)+'"></td>'+
			'</tr>';
		}

		return content;
	}

	function dimSplit() { return '<span style="color:'+_UI.colors.gray.l60+'; width:20px; height:24px; text-align:center; display:inline-block; font-size:1.4em; vertical-align:-2px;">&#x2044;</span>';	}

// end of file
