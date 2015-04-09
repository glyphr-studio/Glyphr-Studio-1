 // start of file
/**
	Object > Component Instance
	Component Instances are a link to any other 
	Glyph Object (Glyphs, Components, or Ligatures).
	Additionally they hold transformation info about 
	how they differ from their root component.
	Component Instances surface *all* the same 
	methods as a Shape, and are stored along side 
	regular Shapes in a Glyph.
**/


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
		// debug('\n ComponentInstance.getTransformedGlyph - START');
		var og = getGlyph(this.link);
		var g = clone(og);
		// debug('\t Original:\t'+json(og.maxes, true));

		if(g){
			g.updateGlyphPosition(this.translatex, this.translatey, true);
			g.updateGlyphSize(this.scalew, this.scaleh);
			if(this.flipew) g.flipEW();
			if(this.flipns) g.flipNS();
			if(this.reversewinding) g.reverseWinding();
		}

		// debug('\t CIdata:\t'+this.translatex+','+this.translatey+','+this.scalew+','+this.scaleh);
		// debug('\t Transfor:\t'+json(g.maxes, true));
		// debug(' ComponentInstance.getTransformedGlyph - END\n');
		return g;
	};



//	-------------------------------------
//	Component to Shape Paridy Functions
//	-------------------------------------

	ComponentInstance.prototype.updateShapePosition = function(dx, dy, force) {
		debug('\n ComponentInstance.updateShapePosition - START');
		debug('\t passed dx/dy/force: ' + dx + ' / ' + dy + ' / ' + force);
		if(dx !== false) dx = parseFloat(dx);
		if(dy !== false) dy = parseFloat(dy);
		
		debug('\t translate was: ' + this.translatex + ' / ' + this.translatey);
		this.translatex += dx;
		this.translatey += dy;
		debug('\t translate now: ' + this.translatex + ' / ' + this.translatey);
		debug(' ComponentInstance.updateShapePosition - END\n');
	};

	ComponentInstance.prototype.setShapePosition = function(nx, ny, force) {
		var og = getGlyph(this.link);
		var dx = nx? ((nx*1) - og.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - og.maxes.ymax) : 0;
		
		this.updateShapePosition(dx, dy, force);
	};

	ComponentInstance.prototype.updateShapeSize = function(dw, dh, force) {
		debug('\n ComponentInstance.updateShapeSize - START');
		debug('\t passed dw/dh/force: ' + dw + ' / ' + dh + ' / ' + force);
		if(dw !== false) dw = parseFloat(dw);
		if(dh !== false) dh = parseFloat(dh);

		debug('\t translate was: ' + this.scalew + ' / ' + this.scaleh);
		this.scalew += dw;
		this.scaleh += dh;
		debug('\t translate now: ' + this.scalew + ' / ' + this.scaleh);
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

	ComponentInstance.prototype.calcMaxes = function() { return this.getTransformedGlyph().calcGlyphMaxes(); };

	ComponentInstance.prototype.selectPathPoint = function() { return false; };
	
	ComponentInstance.prototype.drawShape = function(lctx, view){
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			g.shapes[s].drawShape(lctx, view);
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

	ComponentInstance.prototype.drawSelectOutline = function(){
		// debug('\n ComponentInstance.drawSelectOutline - START');
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			drawSelectOutline(g.shapes[s], _UI.colors.green);
		}
	};

	ComponentInstance.prototype.drawBoundingBox = function() {
		// debug('\n ComponentInstance.drawBoundingBox - START');
		var g = this.getTransformedGlyph();
		drawBoundingBox(g.maxes, _UI.colors.green);
	};

	ComponentInstance.prototype.drawBoundingBoxHandles = function(){
		// debug('\n ComponentInstance.drawBoundingBoxHandles - START');
		var g = this.getTransformedGlyph();
	 	drawBoundingBoxHandles(g.maxes, _UI.colors.green);
	};

	ComponentInstance.prototype.isHere = function(x,y){
		//debug('ISCOMPONENTHERE - checking ' + x + ',' + y);
		var g = this.getTransformedGlyph();
		return g? g.isHere(x,y) : false;
	};

	ComponentInstance.prototype.isOverBoundingBoxCorner = function(x,y){
		var c = isOverBoundingBoxCorner(x,y,this.getMaxes());
		// debug('\t ComponentInstance.isOverBoundingBoxCorner returning ' + c);
		return c;
	};



//-------------------------------------------------------
// COMPONENT INSTANCE METHODS
//-------------------------------------------------------

//	Insert Component
	function insertComponentDialog(){
		var thumbs = makeGenericGlyphChooserContent('insertComponentInstance', true, true, true);
		if(thumbs){
			var content = '<h1>Add Component</h1>';
			content += 'Components can be used in any Glyph, but Glyphs and Ligatures can also be used in any Glyph like a Component.';
			content += 'Choose a glyph to insert as a Component Instance in this glyph:<br><br>';
			content += thumbs;
			content += '<div style="display:block;"><button onclick="closeDialog();">cancel</button></div>';
			openDialog(content);
		} else {
			openDialog('<h1>Add Component</h1><div class="dialoglargetext">No Components exist.  First, create some Components, then you can insert them into glyphs.</div>');
		}
	}

	function insertComponentInstance(cid){
		var tochar = getSelectedWorkItemID();
		var ch = getGlyph(tochar, true);

		if(ch.canAddComponent(cid)){
			var name = 'Instance of ' + getGlyphName(cid);
			var nci = new ComponentInstance({'link':cid, 'name':name});

			//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(nci));
			ch.shapes.push(nci);
			ch.calcGlyphMaxes();

			addToUsedIn(cid, tochar);

			closeDialog();
			history_put('insert component from glyphedit');
			redraw('insertComponent');
		} else {
			openDialog('<h1>Could not add component to this glyph</h1><div class="dialoglargetext">A circular link was found, components can\'t include links to themselves.<br>They can\'t handle the philosophical conundrum it poses.</div>');
		}
	}

	function turnComponentIntoShapes(){
		var selshape = _UI.ss;
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
			re += '<table cellpadding=0 cellspacing=0 border=0><tr><td>';
			re += '<div class="glyphselectthumb" onclick="insertComponentInstance(\''+com+'\',\''+tochar+'\',\'Instance of '+tcom.name+'\');" height='+_UI.thumbsize+'" width='+_UI.thumbsize+'>';
			re += getGlyph(com).makeSVG();
			re += '</div></td></tr><tr><td>';
			re += getGlyphName(com);
			re += '</td></tr></table>';
			//debug('makeComponentThumbs - created canvas thumb'+com);
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