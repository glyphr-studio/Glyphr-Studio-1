// start of file

	function loadPage_linkedshapes(){
		// debug("LOADING PAGE >> loadPage_linkedshapes");
		
		getEditDocument().getElementById("mainwrapper").innerHTML = linkedshapes_content();
		setupEditCanvas();
		initEventHandlers();

		_UI.selectedshape = -1;
		_UI.selectedtool = 'pathedit';

		redraw_LinkedShapes("loadPage_linkedshapes");
	}

	function linkedshapes_content(){
		var re = '<canvas id="chareditcanvas" width=12 height=12 ></canvas>'+
			'<div id="toolsarea"> [ERROR: Uninitialized content] </div>'+
			'<table class="charedittable" cellspacing=0 cellpadding=0 border=0><tr>'+
			'<td id="detailsarea"> [ERROR: Uninitialized content] </td></tr>'+
			'<tr><td id="actionsarea"> [ERROR: Uninitialized content] </td>'+
			'</tr></table>'+
			makeFloatLogo();

		return re;
	}


//-------------------
// REDRAW
//-------------------

	function redraw_LinkedShapes(calledby){
		//debug(Date.now()+"\t:: redraw_LinkedShapes Called By: " + calledby + " - Shown Linked Shape: " + _UI.shownlinkedshape + " - Selected Shape: " + _UI.selectedshape);

		_UI.redrawing = true;

		_UI.chareditctx.clearRect(0,0,5000,5000);
		drawGrid();
		drawGuides();

		_GP.linkedshapes[_UI.shownlinkedshape].shape.drawShape_Single(_UI.chareditctx);

		if(_GP.linkedshapes[_UI.selectedshape]) {
			_GP.linkedshapes[_UI.selectedshape].shape.drawSelectOutline();
		}

		update_NavPanels();

		update_ToolsArea();

		_UI.redrawing = false;

		//debug(Date.now()+"\t:: redraw_LinkedShapes DONE - Called By: " + calledby);
	}


//-------------------
// Update Details
//-------------------
	function linkedShapeCharDetails(){
		var content = "";

		if(_GP.linkedshapes[_UI.shownlinkedshape].usedin.length > 0){
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
		var ui = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
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


//-------------------
// Update Actions
//-------------------
	function linkedShapeActions(){
		var content = "<div class='navarea_section'><h1 class='paneltitle'>actions</h1><table class='actionsgrid'><tr>";

		var s = ss("Update Actions");

		var ls1actions = "<td><h3>linked shape</h3>";
			ls1actions += "<button onclick='showAddSSToCharDialog();'>link to character</button><br>";
			ls1actions += "<button onclick='addLinkedShape();putundoq(\"Create New Linked Shape\");navigate();'>create new</button><br>";
			ls1actions += "<button onclick='deleteLinkedShapeConfirm();' class='"+(aalength(_GP.linkedshapes)>1? "": "buttondis")+"'>delete</button><br>";
			ls1actions += "</td>";

		var	ls2actions = "<td><h3>&nbsp;</h3>";
			ls2actions += "<button onclick='pullundoq()' class='"+(_UI.linkedshapeundoq.length>0? "": "buttondis")+"'>undo" + ((_UI.linkedshapeundoq.length > 0) ? (" (" + _UI.linkedshapeundoq.length) + ")": "") + "</button><br>";
			ls2actions += "<button onclick='copyShape()'>copy</button><br>";
			ls2actions += "<button onclick='ss().path.flipEW();putundoq(\"Flip Shape Horizontal\");redraw(\"updatelinkedshapeactions\");'>flip horizontal</button><br>";
			ls2actions += "<button onclick='ss().path.flipNS();putundoq(\"Flip Shape Vertical\");redraw(\"updatelinkedshapeactions\");'>flip vertical</button><br>";
			ls2actions += "</td>";

		var pointactions = "<td><h3>path point</h3>";
			pointactions += "<button onclick='ss().path.insertPathPoint(); putundoq(\"Insert Path Point\"); redraw(\"updatelinkedshapeactions\");'>insert</button><br>";
			pointactions += "<button onclick='ss().path.deletePathPoint(); putundoq(\"Delete Path Point\"); redraw(\"updatelinkedshapeactions\");'class='"+(s? "": "buttondis")+"' >delete</button><br>";
			pointactions += "<button onclick='ss().path.sp().resetHandles(); putundoq(\"Reset Path Point\"); redraw(\"updatelinkedshapeactions\");'>reset handles</button><br>";
			pointactions += "</td>";

		var canvasactions = "<td><h3>editor view</h3>";
			canvasactions += "<button onclick='_UI.showgrid? _UI.showgrid=false : _UI.showgrid=true; redraw(\"updatelinkedshapeactions\");'>toggle grid</button><br>";
			canvasactions += "<button onclick='_UI.showguides? _UI.showguides=false : _UI.showguides=true; redraw(\"updatelinkedshapeactions\");'>toggle guides</button><br>";
			canvasactions += "</td>";


		// Put it all together
		content += ls1actions;
		if(s) content += ls2actions;

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool !== "pathedit") ispointsel = false;
		if(ispointsel) {content += pointactions; }
		else { content += "<td><h3>&nbsp;</h3></td>"; }

		content += "</tr><tr>";
		content += canvasactions;

		content += "</td></tr></table></div>";
		return content;
	}

	function addLinkedShape(pshape){
		var newid = generateNewLinkedShapeID();
		var newls;
		_UI.shownlinkedshape = newid;


		if(pshape){
			newls = new LinkedShape({"shape":pshape});
		} else {
			newls = new LinkedShape({"name":("linkedshape " + _GP.projectsettings.linkedshapecounter)});
		}

		if(_UI.navhere === 'linked shapes') _UI.selectedshape = newid;
		_GP.linkedshapes[newid] = newls;

		//debug("Added New Linked Shape: " + newid + " JSON=" + json(_GP.linkedshapes));

		return newid;
	}

	function deleteLinkedShapeConfirm(){
		var content = "<h1>Delete Linked Shape</h1>Are you sure you want to delete this linked shape?<br>";
		var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
		if(uia.length > 0){
			content += "If you do, the linked shape instances will also be removed from the following characters:<br><br>";
			for(var ssu=0; ssu<uia.length; ssu++){
				content += ("&nbsp; &nbsp; " + _GP.fontchars[uia[ssu]].charname.replace(/LATIN /gi,"") + "<br>");
			}
		} else {
			content += "This linked shape is not currently being used by any characters.<br>";
		}

		content += "<br>Warning: This action cannot be undone!<br>";
		content += "<br><button onclick='deleteLinkedShape();'>permanently delete this linked shape</button> &nbsp; <button onclick='closeDialog();'>cancel</button>";

		openDialog(content);
	}

	function deleteLinkedShape(){
		//debug("DELETELINKEDSHAPE - deleting " + _UI.shownlinkedshape);
		closeDialog();
		if(aalength(_GP.linkedshapes)>1){
			// find & delete all linked shape instances
			var uia = _GP.linkedshapes[_UI.shownlinkedshape].usedin;
			//debug("----------------- starting to go through uia: " + uia);
			for(var cui=0; cui<uia.length; cui++){
				var tc = _GP.fontchars[uia[cui]].charshapes;
				//debug("----------------- uia step " + cui + " is " + uia[cui] + " and has #getSelectedCharShapes() " + tc.length);
				for(var sl=0; sl<tc.length; sl++){
					//debug("----------------- shapelayer " + sl + " has .link " + tc[sl].link + " checking against " + _UI.shownlinkedshape);
					if(tc[sl].link === _UI.shownlinkedshape){
						//debug("----------------- they are =, deleting index " + sl + " from array.");
						//debug("----------------- (befor): " + tc);
						tc.splice(sl, 1);
						//debug("----------------- (after): " + tc);
					}
				}
			}

			// delete linkedshape and switch selection
			delete _GP.linkedshapes[_UI.shownlinkedshape];
			_UI.shownlinkedshape = getFirstLinkedShapeID();
			_UI.selectedshape = _UI.shownlinkedshape;
			//debug("DELETELINKEDSHAPE - delete complete, new shownlinkedshape = " + shownlinkedshape);

			navigate();
		} else {
			alert("Error: deleting the last linked shape should not have been an allowed action.");
		}
	}

	function pasteLinkedShape(){
		if(_UI.clipboardshape){
			_GP.linkedshapes[_UI.shownlinkedshape].shape = _UI.clipboardshape;
		}
	}

	function showAddSSToCharDialog(msg){
		var content = "<h1>Link to Character</h1><table style='width:900px'><tr><td>";
		content += msg? msg : "There is currently " + _GP.linkedshapes[_UI.shownlinkedshape].usedin.length + " instances of '" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "' being used.<br><br>";
		content += "Select the character you would like to link to this linked shape:<br><br></td></tr>";
		content += "<tr><td><div style='overflow-y:auto; overflow-x:hidden; max-height:600px;'>";
		content += makeGenericCharChooserContent("insertLinkedShapeToChar");
		content += "</div></td></tr>";
		content += "<tr><td><br><button onclick='closeDialog();'>done</button></td></tr></table>";
		openDialog(content);
	}

	function insertLinkedShapeToChar(chid){
		insertLinkedShape(_UI.shownlinkedshape, chid);
		putundoq("Insert Linked Shape to Character");
		closeDialog();
		showAddSSToCharDialog("The LinkedShape '" + _GP.linkedshapes[_UI.shownlinkedshape].shape.name + "' was successfully inserted into character " + getCharName(chid) + ".<br><br>");
	}

// end of file