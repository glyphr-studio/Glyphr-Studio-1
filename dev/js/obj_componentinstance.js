 // start of file

//-------------------------------------------------------
// COMPONENT INSTANCE OBJECT
//-------------------------------------------------------

	function ComponentInstance(oa){
		this.objtype = 'componentinstance';

		this.link = oa.link || getFirstID(_GP.components);
		this.name = oa.name || 'Component Instance';

		this.translatex = oa.translatex || 0;
		this.translatey = oa.translatey || 0;
		this.scalew = oa.scalew || 0;
		this.scaleh = oa.scaleh || 0;

		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
		this.visible = isval(oa.visible)? oa.visible : true;

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
		var ns = new ComponentInstance({'link':com});

		//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(ns));
		var ch = getGlyph(tochar, true);
		ch.shapes.push(ns);
		ch.calcGlyphMaxes();

		addToUsedIn(com, tochar);

		closeDialog();
		history_put('insert component from charedit');
		redraw('insertComponent');
	}

	function turnComponentIntoAShape(){
		var selshape = ss();
		var shapes = selshape.getTransformedGlyph();

		for(var s=0; s<shapes.length; s++){
			addShape(shapes[s]);
		}

		deleteShape();

		//debug('TURNCOMPONENTINTOASHAPE - newshape \n'+json(newshape));
		redraw('turnComponentIntoAShape');
	}

	function makeComponentThumbs(){
		var re = '';
		var tochar = getSelectedGlyphID();
		var tcom;

		for(var com in _GP.components){if(_GP.components.hasOwnProperty(com)){
			tcom = getGlyph(com);
			if(tcom.shape){
				re += '<table cellpadding=0 cellspacing=0 border=0><tr><td>';
				re += '<div class="charselectthumb" onclick="insertComponent(\''+com+'\',\''+tochar+'\');" height='+_UI.thumbsize+'" width='+_UI.thumbsize+'>';
				re += getGlyph(com).shape.makeSVG();
				re += '</div></td></tr><tr><td>';
				re += getGlyphName(com);
				re += '</td></tr></table>';
				//debug('makeComponentThumbs - created canvas thumb'+com);
			}
		}}

		if (re !== '') re = '<div class="ssthumbcontainer">'+re+'</div>';
		return re;
	}

//	UsedIn Array Stuff
	function addToUsedIn(com, glyphid){
		//debug('ADDTOUSEDIN - com/glyphid ' + com + '/' + glyphid);
		var uia = getGlyph(com).usedin;
		uia.push(''+glyphid);
		// sort numerically as opposed to alpha
		uia.sort(function(a,b){return a-b;});
	}

	function removeFromUsedIn(com, glyphid){
		//debug("REMOVEFROMUSEDIN - com/glyphid " + com + "/" + glyphid);
		var uia = getGlyph(com).usedin;
		var gindex = uia.indexOf(''+glyphid);
		if(gindex !== -1){
			uia.splice(gindex, 1);
		}

	}


//	---------------------------
//	Component Paridy Functions
//	---------------------------
	ComponentInstance.prototype.getTransformedGlyph = function() {
		var g = clone(getGlyph(this.link));
		if(g){
			g.updateGlyphPosition(this.translatex, this.translatey, true);
			g.updateGlyphSize(this.scalex, this.scaley);
		}

		return g;
	};

	ComponentInstance.prototype.drawShape_Stack = function(lctx){
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			g.shapes[s].drawShape_Stack(lctx);
		}
	};

	ComponentInstance.prototype.drawShape_Single = function(lctx){
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			g.shapes[s].drawShape_Single(lctx);
		}
	};

	ComponentInstance.prototype.genPostScript = function(lastx, lasty){
		//debug('GENLINKEDPOSTSCRIPT');
		var g = this.getTransformedGlyph();
		var re, part;

		for(var s=0; s<g.shapes.length; s++){
			part = g.shapes[s].genPostScript(lastx, lasty);
			lastx = part.lastx;
			lasty = part.lasty;
			re += part.re;
		}

		return {
			're': re,
			'lastx': lastx,
			'lasty': lasty
		};
	};

	ComponentInstance.prototype.drawShapeToArea = function(lctx, view){
		var g = this.getTransformedGlyph();
		g.drawGlyphToArea(lctx, view);
	};

	ComponentInstance.prototype.drawSelectOutline = function(onlycenter){
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			g.shapes[s].drawSelectOutline(true);
		}
	};

	ComponentInstance.prototype.drawBoundingBox = function() {
		drawBoundingBox(getGlyph(this.link).maxes, _UI.colors.green.l65);
	};

	ComponentInstance.prototype.drawBoundingBoxHandles = function(onlycenter){
	 	drawBoundingBoxHandles(getGlyph(this.link).maxes, _UI.colors.green.l65, onlycenter);
	};

	ComponentInstance.prototype.isHere = function(x,y){
		//debug('ISCOMPONENTHERE - checking ' + x + ',' + y);
		var g = this.getTransformedGlyph();
		return g? g.isHere(x,y) : false;
	};

	ComponentInstance.prototype.isOverHandle = function(){ return false; };

// end of file