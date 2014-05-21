
//-------------------------------------------------------
// LINKED SHAPE OBJECT
//-------------------------------------------------------

	function LinkedShape(oa){
		this.objtype = "linkedshape";

		this.shape = (oa && oa.shape)? new Shape(oa.shape) : new Shape({"name":"New Linked Shape"});
		this.usedin = oa.usedin || [];
	}



//-------------------------------------------------------
// LINKED SHAPE INSTANCE OBJECT
//-------------------------------------------------------

	function LinkedShapeInstance(oa){
		this.objtype = "linkedshapeinstance";

		this.link = oa.link || getFirstLinkedShape();
		this.uselinkedshapexy = (isval(oa.uselinkedshapexy)? oa.uselinkedshapexy : true);

		this.name = oa.name || "new linkedshape instance";
		this.xpos = oa.xpos || 0;
		this.ypos = oa.ypos || 0;
		this.xlock = isval(oa.xlock)? oa.xlock : false;
		this.ylock = isval(oa.ylock)? oa.ylock : false;
		this.visible = isval(oa.visible)? oa.visible : true;

		// shape settings that don't apply to linkedshapeinstance
		this.path = false;
		this.hlock = false;
		this.wlock = false;

		//debug("LINKEDSHAPEINSTANCE - end");
	}



//-------------------------------------------------------
// LINKED SHAPE INSTANCE METHODS
//-------------------------------------------------------


//	Insert Linked Shape
	function insertLinkedShapeDialog(){
		if(aalength(_GP.linkedshapes)>0){
			var content = "Choose a Linked Shape to insert as a layer in this character:";
			content += generateSSThumbs();
			content += "<div style='display:block;'><button onclick='closeDialog();'>cancel</button></div>";
			openDialog(content);
			drawSSThumbs();
		} else {
			openDialog("<div class='dialoglargetext'>No Linked Shapes exist.  First, create some Linked Shapes, then you can insert them into characters.</div>");
		}
	}

	function insertLinkedShape(ssid, tochar){
		//debug("INSERTLINKEDSHAPE - adding linked shape: " + ssid + " to char: " + _UI.selectedchar);
		var ns = new LinkedShapeInstance({"link":ssid, "xpos":100, "ypos":100});

		//debug("INSERT LINKED SHAPE - JSON: \t" + JSON.stringify(ns));
		var ch = getChar(tochar, true);
		ch.charshapes.push(ns);
		ch.calcCharMaxes();

		addToUsedIn(ssid, tochar);

		closeDialog();
		putundoq("insert linked shape from charedit");
		redraw("insertLinkedShape");
	}

	function generateSSThumbs(){
		var re = "<div class='ssthumbcontainer'>";
		var tochar = getSelectedCharID();
		for(var ssid in _GP.linkedshapes){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas class='ssthumb' id='thumb"+ssid+"' onclick='insertLinkedShape(\""+ssid+"\",\""+tochar+"\");' height="+_UI.thumbsize+"' width="+_UI.thumbsize+"></canvas>";
			re += "</td></tr><tr><td>";
			re += _GP.linkedshapes[ssid].shape.name;
			re += "</td></tr></table>";
			//debug("GENERATESSTHUMBS - created canvas 'thumb"+ssid+"'");
		}
		re += "</div>";
		return re;
	}

	function drawSSThumbs(){
		var tctx = {};
		for(var ssid in _GP.linkedshapes){
			tctx = document.getElementById(("thumb"+ssid)).getContext("2d");
			//debug("DRAWSSTHUMBS - factor: " + factor + " yoffset: " + yoffset);
			_GP.linkedshapes[ssid].shape.drawShapeToArea(tctx, _UI.thumbview);
			//debug("DRAWSSTHUMBS - drawCharToArea canvas 'thumb"+ssid+"'");
		}
	}


//	UsedIn Array Stuff
	function addToUsedIn(ssid, charid){
		//debug("ADDTOUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = _GP.linkedshapes[ssid].usedin;
		uia.push(""+charid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(ssid, charid){
		//debug("REMOVEFROMUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = _GP.linkedshapes[ssid].usedin;
		var charindex = uia.indexOf(""+charid);
		if(charindex != -1){
			uia.splice(charindex, 1);
		}

	}


//	Detials
	function linkedShapeInstanceDetails(s){
		//debug("LINKEDSHAPEINSTANCEDETAILS - start of function");
		content = "<tr><td colspan=3><h3>linked shape</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> name </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().name = this.value; putundoq(\"shape name\"); redraw(\"linkedShapeInstanceDetails\");'></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use linked shape position</td><td>"+checkUI("ss().uselinkedshapexy", true)+"</td></tr>";
		if(!s.uselinkedshapexy){
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><h3 style='font-size:.9em; color:rgb(153,158,163);'>x & y values are relative to the linked shape position</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; x </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.xpos + "' onchange='ss().xpos = (this.value*1); putundoq(\"linkedshape xpos\"); redraw(\"linkedShapeInstanceDetails\");'>"+spinner()+"</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; y </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.ypos + "' onchange='ss().ypos = (this.value*1); putundoq(\"linkedshape ypos\"); redraw(\"linkedShapeInstanceDetails\");'>"+spinner()+"</td></tr>";
		}
		content += "<tr><td class='leftcol'>&nbsp;</td><td> linked shape name </td><td>" + _GP.linkedshapes[s.link].shape.name + "</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><button onclick='goToEditLinkedShape(\""+s.link+"\");'>edit this linked shape</button></td></tr>";
		return content;
	}

	function goToEditLinkedShape(ssid){
		_UI.shownlinkedshape = ssid;
		_UI.navhere = "linked shapes";
		navigate();
	}

	function clickSelectLinkedShape(x,y){
		//debug("CLICKSELECTLinkedShape() - checking x:" + x + " y:" + y);

		if(_GP.linkedshapes[_UI.shownlinkedshape].shape.isHere(x,y)){
			_UI.selectedshape = _UI.shownlinkedshape;
			//debug("CLICKSELECTLinkedShape() - selecting shape " + _UI.shownlinkedshape);

			_UI.navprimaryhere = 'npAttributes';
			return true;
		}

		_UI.selectedshape = -1;
		//debug("CLICKSELECTLinkedShape() - deselecting, setting to -1");

		return false;
	}


//	---------------------------
//	Linked Shape Paridy Functions
//	---------------------------
	LinkedShapeInstance.prototype.drawShape_Stack = function(lctx){
		//debug("DRAWLINKEDSHAPE on \n " + JSON.stringify(this));
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_GP.linkedshapes[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	};

	LinkedShapeInstance.prototype.drawShape_Single = function(lctx){
		//debug("DRAWLINKEDSHAPE");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_GP.linkedshapes[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	};

	LinkedShapeInstance.prototype.genPostScript = function(lastx, lasty){
		//debug("GENLINKEDPOSTSCRIPT");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			return _GP.linkedshapes[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	};

	LinkedShapeInstance.prototype.drawShapeToArea = function(lctx, view){
		//debug("DRAWLINKEDSHAPETOAREA - size/offsetx/offsety: " + size +"/"+ offsetX +"/"+ offsetY);
		if(this.uselinkedshapexy){
			//debug("--------------------- uselinkedshapexy=true, calling drawShapeToArea for linkedshape.");
			_GP.linkedshapes[this.link].shape.drawShapeToArea(lctx, view);
		} else {
			//debug("--------------------- uselinkedshapexy=false, calling updatepathposition with FORCE.");
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += " HAS BEEN MOVED";
			ns.drawShapeToArea(lctx, view);
		}
	};

	LinkedShapeInstance.prototype.drawSelectOutline = function(onlycenter){
		//_GP.linkedshapes[this.link].shape.drawSelectOutline();

		if(this.uselinkedshapexy){
			_GP.linkedshapes[this.link].shape.drawSelectOutline(onlycenter);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.drawSelectOutline(onlycenter);
		}
	};

	LinkedShapeInstance.prototype.draw8points = function(onlycenter){
		//_GP.linkedshapes[this.link].shape.draw8points(onlycenter);
	};

	LinkedShapeInstance.prototype.isHere = function(x,y){
		//debug("ISLINKEDSHAPEHERE - checking " + x + "," + y);
		if(this.uselinkedshapexy){
			return _GP.linkedshapes[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	};

	LinkedShapeInstance.prototype.isOverHandle = function(){ return false; };



//	------------------------------
//	Generic Linked Shape Functions
//	------------------------------

	function getFirstLinkedShape(){
		for(var ssid in _GP.linkedshapes){
			return ssid;
		}

		return "[ERROR] - LINKEDSHAPES array has zero keys";
	}

	function generateNewSSID(){
		_GP.projectsettings.linkedshapecounter++;
		return ("id"+_GP.projectsettings.linkedshapecounter);
	}