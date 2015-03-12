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
		content = '<tr><td colspan=3><h3>component</h3></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px;"> name </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input style="width:90%;" type="text" value="' + s.name + '" onchange="ss().name = this.value; history_put(\'shape name\'); redraw(\'componentInstanceDetails\');"></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td> use component position</td><td>'+checkUI('ss().usecomponentxy', true)+'</td></tr>';

		content += '<tr><td class="leftcol">&nbsp;</td><td colspan=2><h3 style="font-size:.9em; color:rgb(153,158,163);">x & y values are relative to the component position</h3></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px; text-transform:none;">&#916; x </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input type="number" step="'+svc+'" value="' + round(s.translatex, 3) + '" onchange="ss().translatex = (this.value*1); history_put(\'component translatex\'); redraw(\'componentInstanceDetails\');"></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px; text-transform:none;">&#916; y </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input type="number" step="'+svc+'" value="' + round(s.translatey, 3) + '" onchange="ss().translatey = (this.value*1); history_put(\'component translatey\'); redraw(\'componentInstanceDetails\');"></td></tr>';
		// WIDTH
		// HEIGHT

		content += '<tr><td class="leftcol">&nbsp;</td><td> component name </td><td>' + s.name + '</td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td colspan=2><button onclick="goToEditComponent(\''+s.link+'\');">edit this component</button></td></tr>';
		return content;
	}

	function goToEditComponent(com){
		_UI.selectedcomponent = com;
		_UI.navhere = 'components';
		navigate('npAttributes');
	}

// end of file