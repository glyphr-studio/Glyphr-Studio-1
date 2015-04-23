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

		this.translatex = parseFloat(oa.translatex) || 0;
		this.translatey = parseFloat(oa.translatey) || 0;
		this.scalew = parseFloat(oa.scalew) || 0;
		this.scaleh = parseFloat(oa.scaleh) || 0;
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
		// debug('\n ComponentInstance.getTransformedGlyph - START ' + this.name);

		var og = getGlyph(this.link, true);
		var g;
		if(og) g = new Glyph(clone(og));
		else return false;

		if(this.flipew) g.flipEW();
		if(this.flipns) g.flipNS();
		g.updateGlyphPosition(this.translatex, this.translatey, true);
		g.updateGlyphSize(this.scalew, this.scaleh, false);
		if(this.reversewinding) g.reverseWinding();
		
		// g.flattenGlyphShapes();

		// debug(' ComponentInstance.getTransformedGlyph - END\n\n');
		return g;
	};



//	-------------------------------------
//	Component to Shape Paridy Functions
//	-------------------------------------

	ComponentInstance.prototype.updateShapePosition = function(dx, dy, force) {
		// debug('\n ComponentInstance.updateShapePosition - START');
		// debug('\t passed dx/dy/force: ' + dx + ' / ' + dy + ' / ' + force);
		// debug('\t translate was: ' + this.translatex + ' / ' + this.translatey);
		dx = parseFloat(dx) || 0;
		dy = parseFloat(dy) || 0;

		this.translatex += dx;
		this.translatey += dy;
		// debug('\t translate now: ' + this.translatex + ' / ' + this.translatey);
		// debug(' ComponentInstance.updateShapePosition - END\n');
	};

	ComponentInstance.prototype.setShapePosition = function(nx, ny, force) {
		var og = getGlyph(this.link);
		var dx = nx? ((nx*1) - og.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - og.maxes.ymax) : 0;

		this.updateShapePosition(dx, dy, force);
	};

	ComponentInstance.prototype.updateShapeSize = function(dw, dh, ratiolock) {
		// debug('\n ComponentInstance.updateShapeSize - START');
		// debug('\t passed dw/dh/ratiolock: ' + dw + ' / ' + dh + ' / ' + ratiolock);
		if(dw !== false) dw = parseFloat(dw) || 0;
		if(dh !== false) dh = parseFloat(dh) || 0;

		if(ratiolock){
			var ts = this.getTransformedGlyph();
			var w = (ts.maxes.xmax - ts.maxes.xmin);
			var h = (ts.maxes.ymax - ts.maxes.ymin);

			if(Math.abs(dw) > Math.abs(dh)){
				dh = (dw * (h / w));
			} else {
				dw = (dh * (w / h));
			}
		}

		// debug('\t translate was: ' + this.scalew + ' / ' + this.scaleh);
		this.scalew += dw;
		this.scaleh += dh;
		// debug('\t translate now: ' + this.scalew + ' / ' + this.scaleh);
		// debug(' ComponentInstance.updateShapeSize - END\n');
	};

	ComponentInstance.prototype.setShapeSize = function(nw, nh, ratiolock) {
		var og = getGlyph(this.link);
		var dx = nx? ((nx*1) - og.maxes.xmin) : 0;
		var dy = ny? ((ny*1) - og.maxes.ymax) : 0;

		this.updateShapePosition(dx, dy, ratiolock);
	};

	ComponentInstance.prototype.getWidth = function() {
		var g = this.getTransformedGlyph();
		return g.maxes.xmax - g.maxes.xmin;
	};

	ComponentInstance.prototype.getHeight = function() {
		var g = this.getTransformedGlyph();
		return g.maxes.ymax - g.maxes.ymin;
	};

	ComponentInstance.prototype.flipEW = function(mid) {
		this.flipew = !this.flipew;
		if(mid){
			var g = this.getTransformedGlyph();
			this.translatex += (((mid - g.maxes.xmax) + mid) - g.maxes.xmin);
		}
	};

	ComponentInstance.prototype.flipNS = function(mid) {
		this.flipns = !this.flipns;
		if(mid){
			var g = this.getTransformedGlyph();
			this.translatey += (((mid - g.maxes.ymax) + mid) - g.maxes.ymin);
		}
	};

	ComponentInstance.prototype.getMaxes = function() { return this.getTransformedGlyph().maxes; };

	ComponentInstance.prototype.calcMaxes = function() { return this.getTransformedGlyph().calcGlyphMaxes(); };

	ComponentInstance.prototype.selectPathPoint = function() { return false; };

	ComponentInstance.prototype.reverseWinding = function() { this.reversewinding = !this.reversewinding; };

	ComponentInstance.prototype.drawShape = function(lctx, view){
		/*		
		Have to iterate through shapes instead of using Glyph.drawGlyph
		due to stacking shapes with appropriate winding
		*/

		var g = this.getTransformedGlyph();

		for(var s = 0; s<g.shapes.length; s++){
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

	ComponentInstance.prototype.makeOpenTypeJSpath = function(otpath) {
		otpath = otpath || new opentype.Path();
		var g = this.getTransformedGlyph();
		return g.makeOpenTypeJSpath(otpath);
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
	function showDialog_AddComponent(){
		var thumbs = makeGenericGlyphChooserContent('insertComponentInstance', ['components', 'glyphs', 'ligatures']);
		if(thumbs){
			var content = '<h1>Add Component</h1>';
			content += 'Components are groups of shapes that can be re-used across many Glyphs.  Component Instances can be transformed while the Root Component remains unchanged.<br><br>';
			content += 'You can define and link to stand-alone Components, but you can also use Glyphs and Ligatures as if they were Root Components.<br><br>';
			content += 'Choose a Glyph to insert as a Component Instance in this Glyph.';
			openBigDialog(content, thumbs);
		} else {
			openDialog('<h1>Add Component</h1><div class="dialoglargetext">No Components exist.  First, create some Components, then you can insert them into glyphs.</div>');
		}
	}

	function insertComponentInstance(cid, tochar){
		var select = !tochar;
		tochar = tochar || getSelectedWorkItemID();
		var ch = getGlyph(tochar, true);

		if(ch.canAddComponent(cid)){
			var name = 'Instance of ' + getGlyphName(cid);
			var nci = new ComponentInstance({'link':cid, 'name':name});

			//debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(nci));
			ch.shapes.push(nci);
			ch.calcGlyphMaxes();
			if(select) {
				_UI.ss = nci;
				_UI.selectedtool = 'shaperesize';
			}

			addToUsedIn(cid, tochar);

			closeDialog();
			history_put('insert component from glyphedit');
			redraw('insertComponent');
			return true;
		} else {
			openDialog('<h1>Whoops</h1><div class="dialoglargetext">A circular link was found, components can\'t include links to themselves.<br>They can\'t handle the philosophical conundrum it poses.</div><br><br><button class="buttonsel" onclick="closeDialog();">Fine, I guess.</button>');
			return false;
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