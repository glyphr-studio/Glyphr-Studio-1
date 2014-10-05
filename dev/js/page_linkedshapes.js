// start of file

	function loadPage_linkedshapes(){
		// debug("LOADING PAGE >> loadPage_linkedshapes");
		
		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedshape = -1;
		_UI.selectedtool = 'pathedit';

		redraw("loadPage_linkedshapes");
	}


//-------------------
// REDRAW
//-------------------

	function redraw_LinkedShapes(calledby){
		// debug('\n redraw_LinkedShapes - START');
		// debug('\t Called By: ' + calledby + ' - Shown Linked Shape: ' + _UI.selectedlinkedshape + ' - Selected Shape: ' + _UI.selectedshape);

		_UI.redrawing = true;

		drawGrid();
		drawGuides();

		var sc = getSelectedChar();

		if(sc) sc.drawShape_Single(_UI.chareditctx);

		if(_GP.linkedshapes[_UI.selectedshape]) {
			_GP.linkedshapes[_UI.selectedshape].shape.drawSelectOutline();
		}

		_UI.redrawing = false;

		// debug(' redraw_LinkedShapes - END\n');
	}


//-------------------
// Update Details
//-------------------
	function linkedShapeCharDetails(){
		var content = "";

		if(_GP.linkedshapes[_UI.selectedlinkedshape].usedin.length > 0){
			content += "<table style='margin-top:10px;'><tr><td colspan=3><h3>characters that use this linked shape</h3>";
			content += makeUsedInThumbs();
			content += "</td></tr></table>";
		} else {
			content += "<table><tr><td>&nbsp;</td><td colspan=2><br><i>this linked shape is not currently being used by any characters. <a href='#' onclick='showAddSSToCharDialog();'>add this linked shape to a character now</a>.</i></td></tr></table>";
		}

		//debug("LINKEDSHAPECHARDETAILS - returning html:\n" + content);
		return content;
	}

	function makeUsedInThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		var ui = _GP.linkedshapes[_UI.selectedlinkedshape].usedin;
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

// end of file