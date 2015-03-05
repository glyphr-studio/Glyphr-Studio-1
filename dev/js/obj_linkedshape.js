 // start of file

//-------------------------------------------------------
// COMPONENT OBJECT
//-------------------------------------------------------

	function LinkedShape(oa){
		this.objtype = 'linkedshape';

		// this.shape = (oa && oa.shape)? new Shape(oa.shape) : new Shape({'name':'Component'});
		this.shape = (oa && oa.shape)? new Shape(oa.shape) : false;
		this.usedin = oa.usedin || [];
	}

	LinkedShape.prototype.drawShapeToArea = function(ctx, view) {
		if(this.shape) return this.shape.drawShapeToArea(ctx, view);
		else return;
	};

	LinkedShape.prototype.drawShape_Single = function(ctx) {
		if(this.shape) return this.shape.drawShape_Single(ctx, _UI.colors.green.l65);
		else return;
	};


//-------------------------------------------------------
// COMPONENT INSTANCE OBJECT
//-------------------------------------------------------

	function LinkedShapeInstance(oa){
		this.objtype = 'linkedshapeinstance';

		this.link = oa.link || getFirstID(_GP.components);
		this.uselinkedshapexy = (isval(oa.uselinkedshapexy)? oa.uselinkedshapexy : true);

		this.name = oa.name || 'Component Instance';
		this.xpos = oa.xpos || 0;
		this.ypos = oa.ypos || 0;
		this.xlock = isval(oa.xlock)? oa.xlock : false;
		this.ylock = isval(oa.ylock)? oa.ylock : false;
		this.visible = isval(oa.visible)? oa.visible : true;

		// shape settings that don't apply to linkedshapeinstance
		this.path = false;
		this.hlock = false;
		this.wlock = false;

		//debug('LINKEDSHAPEINSTANCE - end');
	}



//-------------------------------------------------------
// COMPONENT INSTANCE METHODS
//-------------------------------------------------------


//	Insert Component
	function insertLinkedShapeDialog(){
		var thumbs = makeLinkedShapeThumbs();
		if(thumbs){
			var content = '<h1>Add Component</h1>Choose a Component to insert as a layer in this glyph:<br><br>';
			content += thumbs;
			content += '<div style="display:block;"><button onclick="closeDialog();">cancel</button></div>';
			openDialog(content);
		} else {
			openDialog('<h1>Add Component</h1><div class="dialoglargetext">No Components exist.  First, create some Components, then you can insert them into glyphs.</div>');
		}
	}

	function insertLinkedShape(lsid, tochar){
		//debug("INSERTLINKEDSHAPE - adding component: " + lsid + " to char: " + _UI.selectedchar);
		var ns = new LinkedShapeInstance({'link':lsid, 'xpos':100, 'ypos':100});

		//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(ns));
		var ch = getChar(tochar, true);
		ch.charshapes.push(ns);
		ch.calcCharMaxes();

		addToUsedIn(lsid, tochar);

		closeDialog();
		history_put('insert component from charedit');
		redraw('insertLinkedShape');
	}

	function turnLinkedShapeIntoAShape(){
		var selshape = ss();
		var rastershape = clone(_GP.components[selshape.link].shape);

		if(selshape.name === 'Component Instance'){
			rastershape.name = rastershape.name.replace('Component from ', '');
		} else {
			rastershape.name = selshape.name;
		}
		// rastershape.name = rastershape.name.replace('Component Instance', 'Shape');
		// rastershape.name = rastershape.name.replace('Component from ', '');

		deleteShape();
		addShape(rastershape);

		//debug('TURNLINKEDSHAPEINTOASHAPE - newshape \n'+json(newshape));
		redraw('turnLinkedShapeIntoAShape');
	}

	function makeLinkedShapeThumbs(){
		var re = '';
		var tochar = getSelectedCharID();
		var ls = _GP.components;
		var tls;

		for(var lsid in ls){if(ls.hasOwnProperty(lsid)){
			tls = getChar(lsid);
			if(tls.shape){
				re += '<table cellpadding=0 cellspacing=0 border=0><tr><td>';
				re += '<div class="charselectthumb" onclick="insertLinkedShape(\''+lsid+'\',\''+tochar+'\');" height='+_UI.thumbsize+'" width='+_UI.thumbsize+'>';
				re += getChar(lsid).shape.makeSVG();
				re += '</div></td></tr><tr><td>';
				re += getCharName(lsid);
				re += '</td></tr></table>';
				//debug('makeLinkedShapeThumbs - created canvas thumb'+lsid);
			}
		}}

		if (re !== '') re = '<div class="ssthumbcontainer">'+re+'</div>';
		return re;
	}

//	UsedIn Array Stuff
	function addToUsedIn(lsid, charid){
		//debug('ADDTOUSEDIN - lsid/charid ' + lsid + '/' + charid);
		var uia = _GP.components[lsid].usedin;
		uia.push(''+charid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(lsid, charid){
		//debug("REMOVEFROMUSEDIN - lsid/charid " + lsid + "/" + charid);
		var uia = _GP.components[lsid].usedin;
		var charindex = uia.indexOf(''+charid);
		if(charindex !== -1){
			uia.splice(charindex, 1);
		}

	}


//	---------------------------
//	Component Paridy Functions
//	---------------------------
	
	LinkedShapeInstance.prototype.getPath = function() {
		var re = clone(_GP.components[this.link].shape.path);
		if(!this.uselinkedshapexy) re.updatePathPosition(this.xpos, this.ypos, true);

		return re;
	};

	LinkedShapeInstance.prototype.drawShape_Stack = function(lctx){
		//debug('DRAWLINKEDSHAPE on \n ' + JSON.stringify(this));
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling components[this.link].shape.drawShape');
			_GP.components[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	};

	LinkedShapeInstance.prototype.drawShape_Single = function(lctx){
		//debug('DRAWLINKEDSHAPE');
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling components[this.link].shape.drawShape');
			_GP.components[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	};

	LinkedShapeInstance.prototype.genPostScript = function(lastx, lasty){
		//debug('GENLINKEDPOSTSCRIPT');
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling components[this.link].shape.drawShape');
			return _GP.components[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	};

	LinkedShapeInstance.prototype.drawShapeToArea = function(lctx, view){
		//debug('DRAWLINKEDSHAPETOAREA - size/offsetx/offsety: ' + size +'/'+ offsetX +'/'+ offsetY);
		if(this.uselinkedshapexy){
			//debug('--------------------- uselinkedshapexy=true, calling drawShapeToArea for linkedshape.');
			_GP.components[this.link].shape.drawShapeToArea(lctx, view);
		} else {
			//debug('--------------------- uselinkedshapexy=false, calling updatepathposition with FORCE.');
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += ' HAS BEEN MOVED';
			ns.drawShapeToArea(lctx, view);
		}
	};

	LinkedShapeInstance.prototype.drawSelectOutline = function(onlycenter){
		//_GP.components[this.link].shape.drawSelectOutline();

		if(this.uselinkedshapexy){
			_GP.components[this.link].shape.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		} else {
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		}
	};

	LinkedShapeInstance.prototype.draw8points = function(onlycenter){
		_GP.components[this.link].shape.draw8points(onlycenter, _UI.colors.green.l65);
	};

	LinkedShapeInstance.prototype.isHere = function(x,y){
		//debug('ISLINKEDSHAPEHERE - checking ' + x + ',' + y);
		if(this.uselinkedshapexy){
			return _GP.components[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	};

	LinkedShapeInstance.prototype.isOverHandle = function(){ return false; };

// end of file