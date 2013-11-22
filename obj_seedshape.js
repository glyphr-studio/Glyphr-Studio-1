
//-------------------------------------------------------
// SEED SHAPE INSTANCE OBJECT
//-------------------------------------------------------

	function seedshape(oa){
		// PARAMS //
		// n
		this.objtype = "seedshape";

		this.shape = new shape({});
		this.shape.name = oa.n;
		this.usedin = [];
	}

	function seedshapeinstance(oa){
		// PARAMS //
		// ssid, usessxy, ssx, ssy, ssname

		//debug("new SEEDSHAPEINSTANCE - seed id: " + ssid + ", useseedxy: " + usessxy);
		this.objtype = "seedshapeinstance";
		
		this.seed = oa.ssid? oa.ssid : getFirstSeedShape();
		this.useseedxy = (isval(oa.usessxy)? oa.usessxy : true);	
		
		this.name = oa.ssname? oa.ssname : "new seedshape instance";
		this.xpos = oa.ssx? oa.ssx : 0;	
		this.ypos = oa.ssy? oa.ssy : 0; 
		this.xlock = false;
		this.ylock = false;

		// shape settings that don't apply to seedshapeinstance
		//this.path = GlyphrProject.seedshapes[this.seed].path;	/**MIGHT BE HORRIBLE**/	
		this.path = false;
		this.hlock = false;
		this.wlock = false;
		
		// Functions
		this.drawShape = drawSeedShape;
		this.genPostScript = genSeedPostScript;
		this.drawShapeToArea = drawSeedShapeToArea;
		this.drawselectoutline = drawSeedShapeSelectOutline;
		this.draw8points = drawSeedShape8Points;	
		this.isHere = isSeedShapeHere;
		this.isoverhandle = isOverSeedShapeHandle;
		this.debugShape = debugSeedShape;
		
		//debug("SEEDSHAPEINSTANCE - end");
		//debug(this.debugShape());
	}
	
//	Insert Seed Shape
	function insertSeedShapeDialog(){
		if(aalength(GlyphrProject.seedshapes)>0){
			var content = "Choose a Seed Shape to insert as a layer in this character:";
			content += generateSSThumbs();
			content += "<div style='display:block;'><input type='button' class='button' value='cancel' onclick='closeDialog();'></div>";
			openDialog(content);
			drawSSThumbs();
		} else {
			openDialog("<div class='dialoglargetext'>No Seed Shapes exist.  First, create some Seed Shapes, then you can insert them into characters.</div>");
		}
	}
	
	function insertSeedShape(ssid){
		//debug("INSERTSEEDSHAPE - adding seed shape (id) " + ssid + " to char (id) " + selectedchar);
		var ns = seedshapeinstance({"ssid":ssid, "ssx":100, "ssy":100});
		addShape(ns);
		
		GlyphrProject.fontchars[selectedchar].charwidth = Math.max(GlyphrProject.fontchars[selectedchar].charwidth, GlyphrProject.seedshapes[ssid].shape.path.rightx);
		
		addToUsedIn(ssid, selectedchar);
		
		closeDialog();
		putundoq("insert seed shape from charedit");
		redraw();
	}
	
	function generateSSThumbs(){		
		var re = "<div class='ssthumbcontainer'>";
		for(var ssid in GlyphrProject.seedshapes){
			re += "<table cellpadding=0 cellspacing=0 border=0><tr><td>";
			re += "<canvas class='ssthumb' id='thumb"+ssid+"' onclick='insertSeedShape(\""+ssid+"\");' height="+ssthumbsize+"' width="+ssthumbsize+"></canvas>";
			re += "</td></tr><tr><td>"
			re += GlyphrProject.seedshapes[ssid].shape.name;
			re += "</td></tr></table>";
			//debug("GENERATESSTHUMBS - created canvas 'thumb"+ssid+"'");
		}
		re += "</div>";
		return re;
	}
	
	function drawSSThumbs(){
		var fs = GlyphrProject.settings;
		var tctx = {};
		var factor = ((ssthumbsize-(2*ssthumbgutter))/(fs.upm + (fs.upm*fs.descender)));
		var yoffset = (ssthumbgutter+(fs.upm*factor));
		for(var ssid in GlyphrProject.seedshapes){
			tctx = document.getElementById(("thumb"+ssid)).getContext("2d");
			//debug("DRAWSSTHUMBS - factor: " + factor + " yoffset: " + yoffset);
			GlyphrProject.seedshapes[ssid].shape.drawShapeToArea(tctx, factor, ssthumbgutter, yoffset);
			//debug("DRAWSSTHUMBS - drawCharToArea canvas 'thumb"+ssid+"'");
		}
	}

	
//	UsedIn Array Stuff
	function addToUsedIn(ssid, charid){
		charid = (""+charid);
		debug("ADDTOUSEDIN - ssid/charid " + ssid + "/" + charid);
		var uia = GlyphrProject.seedshapes[ssid].usedin;
		debug("------------- uia: " + uia);
		//Make sure array values are unique
		if(uia.indexOf(charid) == -1){
			debug("------------- uia.indexOf(charid): " + uia.indexOf(charid) + ", should be -1, pusing charid: " + charid);
			uia.push(charid);
			// sort numerically as opposed to alpha
			uia.sort(function(a,b){return a-b});
		}
	}
	
	function removeFromUsedIn(ssid, charid){
		debug("REMOVEFROMUSEDIN - ssid/charid " + ssid + "/" + charid);
		var seedcount = 0;
		var tcgd = GlyphrProject.fontchars[charid].charglyphdata;
		
		// make sure there is only one of this ss in the char
		for(var sl=0; sl<tcgd.length; sl++){
			if(tcgd[sl].seed){
				if(tcgd[sl].seed == ssid) seedcount++;
			}
		}
		
		debug("------------------ seedcount = " + seedcount);
		
		if(seedcount == 1){
			var uia = GlyphrProject.seedshapes[ssid].usedin;
			var charindex = uia.indexOf(charid);
			debug("------------------ charindex: " + charindex);
			if(charindex != -1){
				debug("------------------ deleting from uia charindex " + charindex);
				debug("------------------ uia before<br>" + uia);
				uia.splice(charindex, 1);
				debug("------------------ uia after<br>" + uia);
			}
		}
	}

	
//	Detials
	function seedShapeInstanceDetails(s){
		debug("SEEDSHAPEINSTANCEDETAILS - start of function");
		content = "<tr><td colspan=3><h3>seed shape</h3></td></tr>";	
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px;'> name </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().name = this.value; putundoq(\"shape name\"); redraw();'></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> use seed shape position</td><td>"+checkUI("ss().useseedxy="+!s.useseedxy+"; putundoq(\"use seed shape position\"); redraw();", s.useseedxy)+"</td></tr>";
		if(!s.useseedxy){
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><h3 style='font-size:.9em; color:#999999;'>x & y values are relative to the seed shape position</h3></td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; x </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.xpos + "' onchange='ss().xpos = (this.value*1); putundoq(\"seedshape xpos\"); redraw();'>"+spinner()+"</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td style='margin-top:0px; padding-top:0px; text-transform:none;'>&#916; y </td><td style='margin-top:0px; padding-top:0px; padding-right:10px;'><input class='input' type='text' value='" + s.ypos + "' onchange='ss().ypos = (this.value*1); putundoq(\"seedshape ypos\"); redraw();'>"+spinner()+"</td></tr>";
		}
		content += "<tr><td class='leftcol'>&nbsp;</td><td> Unique Seed Shape ID </td><td> " + s.seed + " </td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td> seed shape name </td><td>" + GlyphrProject.seedshapes[s.seed].shape.name + "</td></tr>";
		content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2><input type='button' class='button' value='edit this seed shape' onclick='goToEditSeedShape(\""+s.seed+"\");'/></td></tr>";
		return content;
	}
	
	function goToEditSeedShape(ssid){
		shownseedshape = ssid;
		navhere = "seed shapes";
		navigate();
	}
	
	function clickSelectSeedShape(x,y){
		//debug("CLICKSELECTSEEDSHAPE() - checking x:" + x + " y:" + y);
		
		if(GlyphrProject.seedshapes[shownseedshape].shape.isHere(x,y)){
			selectedshape = shownseedshape;
			//debug("CLICKSELECTSEEDSHAPE() - selecting shape " + shownseedshape);
			return true;
		}
		
		selectedshape = -1;
		//debug("CLICKSELECTSEEDSHAPE() - deselecting, setting to -1");
		
		return false;
	}

	
//	---------------------------
//	Seed Shape Paridy Functions
//	---------------------------
	function drawSeedShape(lctx){
		//debug("DRAWSEEDSHAPE");
		if(this.useseedxy){
			//debug("------------- useseedxy=true, calling seedshapes[this.seed].shape.drawShape");
			GlyphrProject.seedshapes[this.seed].shape.drawShape(lctx);
		} else {
			//debug("------------- does not useseedxy, calling FORCE=true updatepathposition");
			var ns = clone(GlyphrProject.seedshapes[this.seed].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape(lctx);
		}
	}
	
	function genSeedPostScript(){
		//debug("GENSEEDPOSTSCRIPT");
		if(this.useseedxy){
			//debug("------------- useseedxy=true, calling seedshapes[this.seed].shape.drawShape");
			return GlyphrProject.seedshapes[this.seed].shape.path.genPathPostScript();
		} else {
			//debug("------------- does not useseedxy, calling FORCE=true updatepathposition");
			var ns = clone(GlyphrProject.seedshapes[this.seed].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript();
		}
	}
	
	function drawSeedShapeToArea(lctx, size, offsetX, offsetY){
		//debug("DRAWSEEDSHAPETOAREA - size/offsetx/offsety: " + size +"/"+ offsetX +"/"+ offsetY);
		if(this.useseedxy){
			//debug("--------------------- useseedxy=true, calling drawShapeToArea for seedshape.");
			GlyphrProject.seedshapes[this.seed].shape.drawShapeToArea(lctx, size, offsetX, offsetY);
		} else {
			//debug("--------------------- useseedxy=false, calling updatepathposition with FORCE.");
			var ns = clone(GlyphrProject.seedshapes[this.seed].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += " HAS BEEN MOVED";
			ns.drawShapeToArea(lctx, size, offsetX, offsetY);
		}
	}
	
	function drawSeedShapeSelectOutline(onlycenter){
		//GlyphrProject.seedshapes[this.seed].shape.drawselectoutline();
		
		if(this.useseedxy){
			GlyphrProject.seedshapes[this.seed].shape.drawselectoutline(onlycenter);
		} else {
			var ns = clone(GlyphrProject.seedshapes[this.seed].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.path.calcMaxes();
			ns.drawselectoutline(onlycenter);
		}
	}
	
	function drawSeedShape8Points(onlycenter){
		//GlyphrProject.seedshapes[this.seed].shape.draw8points(onlycenter);
	}
	
	function isSeedShapeHere(x,y){
		//debug("ISSEEDSHAPEHERE - checking " + x + "," + y);
		if(this.useseedxy){
			return GlyphrProject.seedshapes[this.seed].shape.isHere(x,y);
		} else {
			var ns = clone(GlyphrProject.seedshapes[this.seed].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	}
	
	function isOverSeedShapeHandle(){ return false;	}

	function debugSeedShape(){
		var rv = "<br>     Local Seedshape Instance attributes <br> seedshapename: " + this.seed + " useseedxy: " + this.useseedxy;
		rv += "<br>     Local Seedshape fake shape attributes <br>";
		rv += "name:" + this.name +", x:"+this.xpos+", y:"+(this.ypos);
		//rv += "<br>     Actual Seed attributes <br>" + GlyphrProject.seedshapes[this.seed].shape.debugShape();
		return rv;
	}

	
//	------------------------------
//	Generic Seed Shape Functions
//	------------------------------

	var seedshapecounter = 0;
	
	function getFirstSeedShape(){
		for(var ssid in GlyphrProject.seedshapes){
			return ssid;
		}
		
		return "[ERROR] - SEEDSHAPES array has zero keys";
	}
	
	function generateNewSSID(){
		seedshapecounter++;
		return ("id"+seedshapecounter);
	}