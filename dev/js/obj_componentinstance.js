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
		this.flipew = oa.flipew || false;
		this.flipns = oa.flipns || false;
		this.reversewinding = oa.reversewinding || false;

		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
		this.ratiolock = oa.ratiolock || false;
		this.visible = isval(oa.visible)? oa.visible : true;

		//debug('COMPONENTINSTANCE - end');
	}

	ComponentInstance.prototype.getTransformedGlyph = function() {
		var g = clone(getGlyph(this.link));
		if(g){
			g.updateGlyphPosition(this.translatex, this.translatey, true);
			g.updateGlyphSize(this.scalex, this.scaley);
			if(this.flipew) g.flipEW();
			if(this.flipns) g.flipNS();
			if(this.reversewinding) g.reverseWinding();
		}

		return g;
	};



//	-------------------------------------
//	Component to Shape Paridy Functions
//	-------------------------------------

	ComponentInstance.prototype.updateShapePosition = function(dx, dy, force) {
		if(dx !== false) dx = parseFloat(dx);
		if(dy !== false) dy = parseFloat(dy);
		
		this.translatex += dx;
		this.translatey += dy;
	};

	ComponentInstance.prototype.setShapePosition = function(nx, ny, force) {
		var og = getGlyph(this.link);
		var dx = nx? ((nx*1) - og.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - og.maxes.ymax) : 0;
		
		this.updateShapePosition(dx, dy, force);
	};

	ComponentInstance.prototype.updateShapeSize = function(dw, dh, force) {
		if(dw !== false) dw = parseFloat(dw);
		if(dh !== false) dh = parseFloat(dh);
		
		this.scalew += dw;
		this.scaleh += dh;
	};
	
	ComponentInstance.prototype.setShapeSize = function(nw, nh, force) {
		var og = getGlyph(this.link);
		var dx = nx? ((nx*1) - og.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - og.maxes.ymax) : 0;
		
		this.updateShapePosition(dx, dy, force);
	};

	ComponentInstance.prototype.getWidth = function() {
		var g = this.getTransformedGlyph();
		return g.maxes.xmax - g.maxes.xmin;
	};

	ComponentInstance.prototype.getHeight = function() {
		var g = this.getTransformedGlyph();
		return g.maxes.ymax - g.maxes.ymin;
	};

	ComponentInstance.prototype.flipEW = function() { this.flipew = !this.flipew; };

	ComponentInstance.prototype.flipNS = function() { this.flipns = !this.flipns; };
	
	ComponentInstance.prototype.getMaxes = function() { return this.getTransformedGlyph().maxes; };

	ComponentInstance.prototype.selectPathPoint = function() { return false; };
	
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

	ComponentInstance.prototype.makeOpenTypeJSpath = function(re) { 
		var g = this.getTransformedGlyph();

		for (var s=0; s<g.shapes.length; s++){
 			re += g.shapes[s].makeOpenTypeJSpath(re);
 		}

 		return re;
	};

	ComponentInstance.prototype.drawShapeToArea = function(lctx, view){
		var g = this.getTransformedGlyph();
		g.drawGlyphToArea(lctx, view);
	};

	ComponentInstance.prototype.drawSelectOutline = function(){
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			drawSelectOutline(g.shapes[s], _UI.colors.green);
		}
	};

	ComponentInstance.prototype.drawBoundingBox = function() {
		drawBoundingBox(getGlyph(this.link).maxes, _UI.colors.green);
	};

	ComponentInstance.prototype.drawBoundingBoxHandles = function(){
	 	drawBoundingBoxHandles(getGlyph(this.link).maxes, _UI.colors.green);
	};

	ComponentInstance.prototype.isHere = function(x,y){
		//debug('ISCOMPONENTHERE - checking ' + x + ',' + y);
		var g = this.getTransformedGlyph();
		return g? g.isHere(x,y) : false;
	};

	ComponentInstance.prototype.isOverHandle = function(){ return false; };



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

	function insertComponentInstance(comid, tochar, name){
		//debug("INSERTCOMPONENT - adding component: " + comid + " to char: " + _UI.selectedglyph);
		name = name || 'Instance of ' + getGlyphName(comid);
		var ns = new ComponentInstance({'link':comid, 'name':name});

		//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(ns));
		var ch = getGlyph(tochar, true);
		ch.shapes.push(ns);
		ch.calcGlyphMaxes();

		addToUsedIn(comid, tochar);

		closeDialog();
		history_put('insert component from glyphedit');
		redraw('insertComponent');
	}

	function turnComponentIntoShapes(){
		var selshape = ss();
		var shapes = selshape.getTransformedGlyph().shapes;
		
		deleteShape();

		for(var s=0; s<shapes.length; s++){
			addShape(shapes[s]);
		}

		//debug('turnComponentIntoShapes - newshape \n'+json(newshape));
		redraw('turnComponentIntoShapes');
	}

	function makeComponentThumbs(){
		var re = '';
		var tochar = getSelectedWorkItemID();
		var tcom;

		for(var com in _GP.components){if(_GP.components.hasOwnProperty(com)){
			tcom = getGlyph(com);
			if(tcom.shape){
				re += '<table cellpadding=0 cellspacing=0 border=0><tr><td>';
				re += '<div class="glyphselectthumb" onclick="insertComponentInstance(\''+com+'\',\''+tochar+'\',\'Component from '+tcom.shape.name+'\');" height='+_UI.thumbsize+'" width='+_UI.thumbsize+'>';
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

// end of file