 // start of file

//-------------------------------------------------------
// LINKED SHAPE OBJECT
//-------------------------------------------------------

	function LinkedShape(oa){
		this.objtype = 'linkedshape';

		// this.shape = (oa && oa.shape)? new Shape(oa.shape) : new Shape({'name':'Linked Shape'});
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
// LINKED SHAPE INSTANCE OBJECT
//-------------------------------------------------------

	function LinkedShapeInstance(oa){
		this.objtype = 'linkedshapeinstance';

		this.link = oa.link || getFirstID(_GP.linkedshapes);
		this.uselinkedshapexy = (isval(oa.uselinkedshapexy)? oa.uselinkedshapexy : true);

		this.name = oa.name || 'Linked Shape Instance';
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
// LINKED SHAPE INSTANCE METHODS
//-------------------------------------------------------


//	Insert Linked Shape
	function insertLinkedShapeDialog(){
		var thumbs = makeLinkedShapeThumbs();
		if(thumbs){
			var content = '<h1>Add Linked Shape</h1>Choose a Linked Shape to insert as a layer in this character:<br><br>';
			content += thumbs;
			content += '<div style="display:block;"><button onclick="closeDialog();">cancel</button></div>';
			openDialog(content);
		} else {
			openDialog('<h1>Add Linked Shape</h1><div class="dialoglargetext">No Linked Shapes exist.  First, create some Linked Shapes, then you can insert them into characters.</div>');
		}
	}

	function insertLinkedShape(lsid, tochar){
		//debug("INSERTLINKEDSHAPE - adding linked shape: " + lsid + " to char: " + _UI.selectedchar);
		var ns = new LinkedShapeInstance({'link':lsid, 'xpos':100, 'ypos':100});

		//debug('INSERT LINKED SHAPE - JSON: \t' + JSON.stringify(ns));
		var ch = getChar(tochar, true);
		ch.charshapes.push(ns);
		ch.calcCharMaxes();

		addToUsedIn(lsid, tochar);

		closeDialog();
		history_put('insert linked shape from charedit');
		redraw('insertLinkedShape');
	}

	function turnLinkedShapeIntoAShape(){
		var selshape = ss();
		var rastershape = clone(_GP.linkedshapes[selshape.link].shape);

		if(selshape.name === 'Linked Shape Instance'){
			rastershape.name = rastershape.name.replace('Linked Shape from ', '');
		} else {
			rastershape.name = selshape.name;
		}
		// rastershape.name = rastershape.name.replace('Linked Shape Instance', 'Shape');
		// rastershape.name = rastershape.name.replace('Linked Shape from ', '');

		deleteShape();
		addShape(rastershape);

		//debug('TURNLINKEDSHAPEINTOASHAPE - newshape \n'+json(newshape));
		redraw('turnLinkedShapeIntoAShape');
	}

	function makeLinkedShapeThumbs(){
		var re = '';
		var tochar = getSelectedCharID();
		var ls = _GP.linkedshapes;
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
		var uia = _GP.linkedshapes[lsid].usedin;
		uia.push(''+charid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(lsid, charid){
		//debug("REMOVEFROMUSEDIN - lsid/charid " + lsid + "/" + charid);
		var uia = _GP.linkedshapes[lsid].usedin;
		var charindex = uia.indexOf(''+charid);
		if(charindex !== -1){
			uia.splice(charindex, 1);
		}

	}


//	---------------------------
//	Linked Shape Paridy Functions
//	---------------------------
	LinkedShapeInstance.prototype.drawShape_Stack = function(lctx){
		//debug('DRAWLINKEDSHAPE on \n ' + JSON.stringify(this));
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape');
			_GP.linkedshapes[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	};

	LinkedShapeInstance.prototype.drawShape_Single = function(lctx){
		//debug('DRAWLINKEDSHAPE');
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape');
			_GP.linkedshapes[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	};

	LinkedShapeInstance.prototype.genPostScript = function(lastx, lasty){
		//debug('GENLINKEDPOSTSCRIPT');
		if(this.uselinkedshapexy){
			//debug('------------- uselinkedshapexy=true, calling linkedshapes[this.link].shape.drawShape');
			return _GP.linkedshapes[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug('------------- does not uselinkedshapexy, calling FORCE=true updatepathposition');
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	};

	LinkedShapeInstance.prototype.drawShapeToArea = function(lctx, view){
		//debug('DRAWLINKEDSHAPETOAREA - size/offsetx/offsety: ' + size +'/'+ offsetX +'/'+ offsetY);
		if(this.uselinkedshapexy){
			//debug('--------------------- uselinkedshapexy=true, calling drawShapeToArea for linkedshape.');
			_GP.linkedshapes[this.link].shape.drawShapeToArea(lctx, view);
		} else {
			//debug('--------------------- uselinkedshapexy=false, calling updatepathposition with FORCE.');
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += ' HAS BEEN MOVED';
			ns.drawShapeToArea(lctx, view);
		}
	};

	LinkedShapeInstance.prototype.drawSelectOutline = function(onlycenter){
		//_GP.linkedshapes[this.link].shape.drawSelectOutline();

		if(this.uselinkedshapexy){
			_GP.linkedshapes[this.link].shape.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		}
	};

	LinkedShapeInstance.prototype.draw8points = function(onlycenter){
		_GP.linkedshapes[this.link].shape.draw8points(onlycenter, _UI.colors.green.l65);
	};

	LinkedShapeInstance.prototype.isHere = function(x,y){
		//debug('ISLINKEDSHAPEHERE - checking ' + x + ',' + y);
		if(this.uselinkedshapexy){
			return _GP.linkedshapes[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_GP.linkedshapes[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	};

	LinkedShapeInstance.prototype.isOverHandle = function(){ return false; };

// end of file