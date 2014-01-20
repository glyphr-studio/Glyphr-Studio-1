
//-------------------------------------------------------
// LINKED SHAPE OBJECT
//-------------------------------------------------------

	function LinkedShape(oa){
		this.objtype = "linkedshape";

		this.shape = new Shape({});
		this.shape.name = oa.name || "New Linked Shape";
		this.usedin = [];
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
		this.xlock = false;
		this.ylock = false;

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
		if(aalength(_G.linkedshapes)>0){
			var content = "Choose a Linked Shape to insert as a layer in this character:";
			content += generateSSThumbs();
			content += "<div style='display:block;'><input type='button' class='button' value='cancel' onclick='closeDialog();'></div>";
			openDialog(content);
			drawSSThumbs();
		} else {
			openDialog("<div class='dialoglargetext'>No Linked Shapes exist.  First, create some Linked Shapes, then you can insert them into characters.</div>");
		}
	}
	
	function insertLinkedShape(ssid){
		//debug("INSERTLINKEDSHAPE - adding linked shape (id) " + ssid + " to char (id) " + uistate.selectedchar);
		var ns = new LinkedShapeInstance({"link":ssid, "xpos":100, "ypos":100});

		//debug("INSERT LINKED SHAPE - JSON: \t" + JSON.stringify(ns));
		addShape(ns);
		
		_G.fontchars[uistate.selectedchar].charwidth = Math.max(_G.fontchars[uistate.selectedchar].charwidth, _G.linkedshapes[ssid].shape.path.rightx);
		
		addToUsedIn(ssid, uistate.selectedchar);
		
		closeDialog();
		putundoq("insert linked shape from charedit");
		redraw();
	}
	
	function generateSSThumbs(){		
		var re = "<div class='ssthumbcontainer'>";
		for(var ssid in _G.linkedshapes){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas class='ssthumb' id='thumb"+ssid+"' onclick='insertLinkedShape(\""+ssid+"\");' height="+uistate.thumbsize+"' width="+uistate.thumbsize+"></canvas>";
			re += "</td></tr><tr><td>"
			re += _G.linkedshapes[ssid].shape.name;
			re += "</td></tr></table>";
			//debug("GENERATESSTHUMBS - created canvas 'thumb"+ssid+"'");
		}
		re += "</div>";
		return re;
	}
	
	function drawSSThumbs(){
		var ps = _G.projectsettings;
		var tctx = {};
		var factor = ((uistate.thumbsize-(2*uistate.thumbgutter))/(ps.upm));
		var yoffset = (uistate.thumbgutter+(ps.ascent*factor));
		for(var ssid in _G.linkedshapes){
			tctx = document.getElementById(("thumb"+ssid)).getContext("2d");
			//debug("DRAWSSTHUMBS - factor: " + factor + " yoffset: " + yoffset);
			_G.linkedshapes[ssid].shape.drawShapeToArea_Single(tctx, factor, uistate.thumbgutter, yoffset);
			//debug("DRAWSSTHUMBS - drawCharToArea canvas 'thumb"+ssid+"'");
		}
	}

	
//	UsedIn Array Stuff
	function addToUsedIn(ssid, charid){
		charid = (""+charid);
		//debug("ADDTOUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = _G.linkedshapes[ssid].usedin;
		//debug("------------- uia: " + uia);
		//Make sure array values are unique
		if(uia.indexOf(charid) == -1){
			//debug("------------- uia.indexOf(charid): " + uia.indexOf(charid) + ", should be -1, pusing charid: " + charid);
			uia.push(charid);
			// sort numerically as opposed to alpha
			uia.sort(function(a,b){return a-b});
		}
	}
	
	function removeFromUsedIn(ssid, charid){
		//debug("REMOVEFROMUSEDIN - ssid/charid " + ssid + "/" + charid);
		var linkedshapecount = 0;
		var tcgd = _G.fontchars[charid].charshapes;
		
		// make sure there is only one of this ss in the char
		for(var sl=0; sl<tcgd.length; sl++){
			if(tcgd[sl].link){
				if(tcgd[sl].link == ssid) linkedshapecount++;
			}
		}
		
		//debug("------------------ linkedshapecount = " + linkedshapecount);
		
		if(linkedshapecount == 1){
			var uia = _G.linkedshapes[ssid].usedin;
			var charindex = uia.indexOf(charid);
			//debug("------------------ charindex: " + charindex);
			if(charindex != -1){
				//debug("------------------ deleting from uia charindex " + charindex);
				//debug("------------------ uia before<br>" + uia);
				uia.splice(charindex, 1);
				//debug("------------------ uia after<br>" + uia);
			}
		}
	}

	
//	Detials
	function linkedShapeInstanceDetails(s){
		//debug("LINKEDSHAPEINSTANCEDETAILS - start of function");
		content = "<tr><td colspan=3><h3>linked shape</h3></td></tr>";	
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> name </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().name = this.value; putundoq(\"shape name\"); redraw();'></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use linked shape position</td><td>"+checkUI("ss().uselinkedshapexy="+!s.uselinkedshapexy+"; putundoq(\"use linked shape position\"); redraw();", s.uselinkedshapexy)+"</td></tr>";
		if(!s.uselinkedshapexy){
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><h3 style='font-size:.9em; color:rgb(153,158,163);'>x & y values are relative to the linked shape position</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; x </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.xpos + "' onchange='ss().xpos = (this.value*1); putundoq(\"linkedshape xpos\"); redraw();'>"+spinner()+"</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; y </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.ypos + "' onchange='ss().ypos = (this.value*1); putundoq(\"linkedshape ypos\"); redraw();'>"+spinner()+"</td></tr>";
		}
		content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Linked Shape ID </td><td> " + s.link + " </td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> linked shape name </td><td>" + _G.linkedshapes[s.link].shape.name + "</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><input type='button' class='button' value='edit this linked shape' onclick='goToEditLinkedShape(\""+s.link+"\");'/></td></tr>";
		return content;
	}
	
	function goToEditLinkedShape(ssid){
		uistate.shownlinkedshape = ssid;
		uistate.navhere = "linked shapes";
		navigate();
	}
	
	function clickSelectLinkedShape(x,y){
		//debug("CLICKSELECTLinkedShape() - checking x:" + x + " y:" + y);
		
		if(_G.linkedshapes[uistate.shownlinkedshape].shape.isHere(x,y)){
			uistate.selectedshape = uistate.shownlinkedshape;
			//debug("CLICKSELECTLinkedShape() - selecting shape " + uistate.shownlinkedshape);
			return true;
		}
		
		uistate.selectedshape = -1;
		//debug("CLICKSELECTLinkedShape() - deselecting, setting to -1");
		
		return false;
	}

	
//	---------------------------
//	Linked Shape Paridy Functions
//	---------------------------
	LinkedShapeInstance.prototype.drawShape_Stack = function(lctx){
		//debug("DRAWLINKEDSHAPE");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_G.linkedshapes[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	}	

	LinkedShapeInstance.prototype.drawShape_Single = function(lctx){
		//debug("DRAWLINKEDSHAPE");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			_G.linkedshapes[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			//debug("------------- this.link: " + this.link);
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	}
	
	LinkedShapeInstance.prototype.genPostScript = function(lastx, lasty){
		//debug("GENLINKEDPOSTSCRIPT");
		if(this.uselinkedshapexy){
			//debug("------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape");
			return _G.linkedshapes[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug("------------- does not uselinkedshapexy, calling FORCE=true updatepathposition");
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	}
	
	LinkedShapeInstance.prototype.drawShapeToArea_Single = function(lctx, size, offsetX, offsetY){
		//debug("DRAWLINKEDSHAPETOAREA - size/offsetx/offsety: " + size +"/"+ offsetX +"/"+ offsetY);
		if(this.uselinkedshapexy){
			//debug("--------------------- uselinkedshapexy=true, calling drawShapeToArea for linkedshape.");
			_G.linkedshapes[this.link].shape.drawShapeToArea_Single(lctx, size, offsetX, offsetY);
		} else {
			//debug("--------------------- uselinkedshapexy=false, calling updatepathposition with FORCE.");
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += " HAS BEEN MOVED";
			ns.drawShapeToArea_Single(lctx, size, offsetX, offsetY);
		}
	}
	
	LinkedShapeInstance.prototype.drawShapeToArea_Stack = LinkedShapeInstance.prototype.drawShapeToArea_Single;


	LinkedShapeInstance.prototype.drawSelectOutline = function(onlycenter){
		//_G.linkedshapes[this.link].shape.drawSelectOutline();
		
		if(this.uselinkedshapexy){
			_G.linkedshapes[this.link].shape.drawSelectOutline(onlycenter);
		} else {
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			//ns.path.calcMaxes();
			ns.drawSelectOutline(onlycenter);
		}
	}
	
	LinkedShapeInstance.prototype.draw8points = function(onlycenter){
		//_G.linkedshapes[this.link].shape.draw8points(onlycenter);
	}
	
	LinkedShapeInstance.prototype.isHere = function(x,y){
		//debug("ISLINKEDSHAPEHERE - checking " + x + "," + y);
		if(this.uselinkedshapexy){
			return _G.linkedshapes[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_G.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	}
	
	LinkedShapeInstance.prototype.isOverHandle = function(){ return false;	}


	
//	------------------------------
//	Generic Linked Shape Functions
//	------------------------------

	function getFirstLinkedShape(){
		for(var ssid in _G.linkedshapes){
			return ssid;
		}
		
		return "[ERROR] - LINKEDSHAPES array has zero keys";
	}
	
	function generateNewSSID(){
		_G.projectsettings.linkedshapecounter++;
		return ("id"+_G.projectsettings.linkedshapecounter);
	}