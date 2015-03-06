 // start of file

//-------------------------------------------------------
// COMPONENT OBJECT
//-------------------------------------------------------

	function Component(oa){
		this.objtype = 'component';

		// this.shape = (oa && oa.shape)? new Shape(oa.shape) : new Shape({'name':'Component'});
		this.shape = (oa && oa.shape)? new Shape(oa.shape) : false;
		this.usedin = oa.usedin || [];
	}

	Component.prototype.drawShapeToArea = function(ctx, view) {
		if(this.shape) return this.shape.drawShapeToArea(ctx, view);
		else return;
	};

	Component.prototype.drawShape_Single = function(ctx) {
		if(this.shape) return this.shape.drawShape_Single(ctx, _UI.colors.green.l65);
		else return;
	};


//-------------------------------------------------------
// COMPONENT INSTANCE OBJECT
//-------------------------------------------------------

	function ComponentInstance(oa){
		this.objtype = 'componentinstance';

		this.link = oa.link || getFirstID(_GP.components);
		this.usecomponentxy = (isval(oa.usecomponentxy)? oa.usecomponentxy : true);

		this.name = oa.name || 'Component Instance';
		this.xpos = oa.xpos || 0;
		this.ypos = oa.ypos || 0;
		this.xlock = isval(oa.xlock)? oa.xlock : false;
		this.ylock = isval(oa.ylock)? oa.ylock : false;
		this.visible = isval(oa.visible)? oa.visible : true;

		// shape settings that don't apply to componentinstance
		this.path = false;
		this.hlock = false;
		this.wlock = false;

		//debug('COMPONENTINSTANCE - end');
	}



//-------------------------------------------------------
// COMPONENT INSTANCE METHODS
//-------------------------------------------------------


//	Insert Component
	function insertComponentDialog(){
		var thumbs = makeComponentThumbs();
		if(thumbs){
			var content = '<h1>Add Component</h1>Choose a Component to insert as a layer in this glyph:<br><br>';
			content += thumbs;
			content += '<div style="display:block;"><button onclick="closeDialog();">cancel</button></div>';
			openDialog(content);
		} else {
			openDialog('<h1>Add Component</h1><div class="dialoglargetext">No Components exist.  First, create some Components, then you can insert them into glyphs.</div>');
		}
	}

	function insertComponent(com, tochar){
		//debug("INSERTCOMPONENT - adding component: " + com + " to char: " + _UI.selectedchar);
		var ns = new ComponentInstance({'link':com, 'xpos':100, 'ypos':100});

		//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(ns));
		var ch = getChar(tochar, true);
		ch.charshapes.push(ns);
		ch.calcCharMaxes();

		addToUsedIn(com, tochar);

		closeDialog();
		history_put('insert component from charedit');
		redraw('insertComponent');
	}

	function turnComponentIntoAShape(){
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

		//debug('TURNCOMPONENTINTOASHAPE - newshape \n'+json(newshape));
		redraw('turnComponentIntoAShape');
	}

	function makeComponentThumbs(){
		var re = '';
		var tochar = getSelectedCharID();
		var tcom;

		for(var com in _GP.components){if(_GP.components.hasOwnProperty(com)){
			tcom = getChar(com);
			if(tcom.shape){
				re += '<table cellpadding=0 cellspacing=0 border=0><tr><td>';
				re += '<div class="charselectthumb" onclick="insertComponent(\''+com+'\',\''+tochar+'\');" height='+_UI.thumbsize+'" width='+_UI.thumbsize+'>';
				re += getChar(com).shape.makeSVG();
				re += '</div></td></tr><tr><td>';
				re += getCharName(com);
				re += '</td></tr></table>';
				//debug('makeComponentThumbs - created canvas thumb'+com);
			}
		}}

		if (re !== '') re = '<div class="ssthumbcontainer">'+re+'</div>';
		return re;
	}

//	UsedIn Array Stuff
	function addToUsedIn(com, charid){
		//debug('ADDTOUSEDIN - com/charid ' + com + '/' + charid);
		var uia = _GP.components[com].usedin;
		uia.push(''+charid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(com, charid){
		//debug("REMOVEFROMUSEDIN - com/charid " + com + "/" + charid);
		var uia = _GP.components[com].usedin;
		var charindex = uia.indexOf(''+charid);
		if(charindex !== -1){
			uia.splice(charindex, 1);
		}

	}


//	---------------------------
//	Component Paridy Functions
//	---------------------------
	
	ComponentInstance.prototype.getPath = function() {
		var re = clone(_GP.components[this.link].shape.path);
		if(!this.usecomponentxy) re.updatePathPosition(this.xpos, this.ypos, true);

		return re;
	};

	ComponentInstance.prototype.drawShape_Stack = function(lctx){
		//debug('DRAWCOMPONENT on \n ' + JSON.stringify(this));
		if(this.usecomponentxy){
			//debug('------------- usecomponentxy=true, calling components[this.link].shape.drawShape');
			_GP.components[this.link].shape.drawShape_Stack(lctx);
		} else {
			//debug('------------- does not usecomponentxy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Stack(lctx);
		}
	};

	ComponentInstance.prototype.drawShape_Single = function(lctx){
		//debug('DRAWCOMPONENT');
		if(this.usecomponentxy){
			//debug('------------- usecomponentxy=true, calling components[this.link].shape.drawShape');
			_GP.components[this.link].shape.drawShape_Single(lctx);
		} else {
			//debug('------------- does not usecomponentxy, calling FORCE=true updatepathposition');
			//debug('------------- this.link: ' + this.link);
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.drawShape_Single(lctx);
		}
	};

	ComponentInstance.prototype.genPostScript = function(lastx, lasty){
		//debug('GENLINKEDPOSTSCRIPT');
		if(this.usecomponentxy){
			//debug('------------- usecomponentxy=true, calling components[this.link].shape.drawShape');
			return _GP.components[this.link].shape.path.genPathPostScript(lastx, lasty);
		} else {
			//debug('------------- does not usecomponentxy, calling FORCE=true updatepathposition');
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			return ns.path.genPathPostScript(lastx, lasty);
		}
	};

	ComponentInstance.prototype.drawShapeToArea = function(lctx, view){
		//debug('DRAWCOMPONENTTOAREA - size/offsetx/offsety: ' + size +'/'+ offsetX +'/'+ offsetY);
		if(this.usecomponentxy){
			//debug('--------------------- usecomponentxy=true, calling drawShapeToArea for component.');
			_GP.components[this.link].shape.drawShapeToArea(lctx, view);
		} else {
			//debug('--------------------- usecomponentxy=false, calling updatepathposition with FORCE.');
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos, true);
			ns.name += ' HAS BEEN MOVED';
			ns.drawShapeToArea(lctx, view);
		}
	};

	ComponentInstance.prototype.drawSelectOutline = function(onlycenter){
		//_GP.components[this.link].shape.drawSelectOutline();

		if(this.usecomponentxy){
			_GP.components[this.link].shape.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		} else {
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			ns.drawSelectOutline(onlycenter, _UI.colors.green.l65);
		}
	};

	ComponentInstance.prototype.draw8points = function(onlycenter){
		_GP.components[this.link].shape.draw8points(onlycenter, _UI.colors.green.l65);
	};

	ComponentInstance.prototype.isHere = function(x,y){
		//debug('ISCOMPONENTHERE - checking ' + x + ',' + y);
		if(this.usecomponentxy){
			return _GP.components[this.link].shape.isHere(x,y);
		} else {
			var ns = clone(_GP.components[this.link].shape);
			ns.path.updatePathPosition(this.xpos, this.ypos);
			return ns.isHere(x,y);
		}
	};

	ComponentInstance.prototype.isOverHandle = function(){ return false; };

// end of file