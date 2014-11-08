// start of file

//	---------------------------------
//	LINKED SHAPE ATTRIBUTES
//	---------------------------------
	function linkedShapeCharDetails(){
		var con = '';
		var sls = getSelectedChar();
		if(!sls) return '';

		con += '<h3'+((sls.shape)? '' : ' style="margin-top:0px;"')+'>characters that use this linked shape</h3>';
		if(sls.usedin.length > 0){
			con += makeUsedInThumbs();
		} else {
			con += '<br><i>this linked shape is not currently being used by any characters. ';
			con += '<a href="#" onclick="showAddSSToCharDialog();">add this linked shape to a character now</a>.</i>';
		}

		//debug("LINKEDSHAPECHARDETAILS - returning html:\n" + con);
		return con;
	}

	function makeUsedInThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		var ui = getSelectedChar().usedin;
		var unique = ui.filter(function(elem, pos) { return ui.indexOf(elem) === pos;});
		var cname;

		for(var k=0; k<unique.length; k++){
			cname = getCharName(unique[k]);
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td title='"+cname+"'>";
			re += "<div class='ssusedinthumb' onclick='goToEditChar(\""+(unique[k])+"\");'>";
			re += getChar(unique[k]).makeSVG();
			re += "</div></td></tr><tr><td>";
			re += (cname === 'Space')? cname : getChar(unique[k]).charhtml;
			re += "</td></tr></table>";
			//debug("makeUsedInThumbs - created canvas 'thumb"+unique[k]+"'");
		}
		re += "</div>";
		return re;
	}

	function goToEditChar(chid){
		//debug("GOTOEDITCHAR - " + chid);
		_UI.selectedshape = -1;
		_UI.selectedchar = chid;
		if(chid.length === 6) _UI.navhere = "character edit";
		else if (chid.length > 6) _UI.navhere = 'ligatures';
		else debug('\n goToEditChar - BAD CHID CAN\'T NAVIGATE TO ' + chid);
		_UI.navprimaryhere = "npAttributes";
		navigate();
	}

//	---------------------------------
//	LINKED SHAPE INSTANCE ATTRIBUTES
//	---------------------------------

	function linkedShapeInstanceDetails(s){
		//debug("LINKEDSHAPEINSTANCEDETAILS - start of function");
		content = '<tr><td colspan=3><h3>linked shape</h3></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px;"> name </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input style="width:90%;" type="text" value="' + s.name + '" onchange="ss().name = this.value; history_put(\'shape name\'); redraw(\'linkedShapeInstanceDetails\');"></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td> use linked shape position</td><td>'+checkUI('ss().uselinkedshapexy', true)+'</td></tr>';
		if(!s.uselinkedshapexy){
		content += '<tr><td class="leftcol">&nbsp;</td><td colspan=2><h3 style="font-size:.9em; color:rgb(153,158,163);">x & y values are relative to the linked shape position</h3></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px; text-transform:none;">&#916; x </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input type="number" value="' + round(s.xpos, 3) + '" onchange="ss().xpos = (this.value*1); history_put(\'linkedshape xpos\'); redraw(\'linkedShapeInstanceDetails\');"></td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td style="margin-top:0px; padding-top:0px; text-transform:none;">&#916; y </td><td style="margin-top:0px; padding-top:0px; padding-right:10px;"><input type="number" value="' + round(s.ypos, 3) + '" onchange="ss().ypos = (this.value*1); history_put(\'linkedshape ypos\'); redraw(\'linkedShapeInstanceDetails\');"></td></tr>';
		}
		content += '<tr><td class="leftcol">&nbsp;</td><td> linked shape name </td><td>' + _GP.linkedshapes[s.link].shape.name + '</td></tr>';
		content += '<tr><td class="leftcol">&nbsp;</td><td colspan=2><button onclick="goToEditLinkedShape(\''+s.link+'\');">edit this linked shape</button></td></tr>';
		return content;
	}

	function goToEditLinkedShape(lsid){
		_UI.selectedlinkedshape = lsid;
		_UI.navhere = 'linked shapes';
		navigate('npAttributes');
	}

	function clickSelectLinkedShape(x,y){
		//debug('CLICKSELECTLinkedShape() - checking x:' + x + ' y:' + y);

		var sls = getSelectedChar();
		if(sls.shape && sls.shape.isHere(x,y)){
			_UI.selectedshape = _UI.selectedlinkedshape;
			//debug('CLICKSELECTLinkedShape() - selecting shape ' + _UI.selectedlinkedshape);

			_UI.navprimaryhere = 'npAttributes';
			return true;
		}

		_UI.selectedshape = -1;
		//debug('CLICKSELECTLinkedShape() - deselecting, setting to -1');

		return false;
	}

// end of file