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
		this.rotation = oa.rotation || 0;
		this.rotatefirst = oa.rotatefirst || false;

		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
		this.ratiolock = oa.ratiolock || false;
		this.visible = isval(oa.visible)? oa.visible : true;

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.transformedglyph = oa.cache.transformedglyph || false;

		//debug('COMPONENTINSTANCE - end');
	}

	ComponentInstance.prototype.getTransformedGlyph = function(dontusecache) {
		// debug('\n ComponentInstance.getTransformedGlyph - START ' + this.name);
		// debug(`\t dontusecache: ${dontusecache}`);
		
		
		if(this.cache.transformedglyph && !dontusecache){
			// debug('\t returning glyph in cache.transformedglyph ');
			// debug(' ComponentInstance.getTransformedGlyph - END\n\n');
			return this.cache.transformedglyph;
		}

		var g = convertComponentInstanceToGlyph(this.link);
		if(!g) {
			console.warn('Tried to get Component: ' + this.link + ' but it doesn\'t exist - bad usedin array maintenance.');
			return false;
		}

		// debug('\t DELTAS' + '\n\t translatex:\t' + this.translatex  + '\n\t translatey:\t' + this.translatey  + '\n\t scalew:\t' + this.scalew  + '\n\t scaleh:\t' + this.scaleh  + '\n\t flipew:\t' + this.flipew  + '\n\t flipns:\t' + this.flipns  + '\n\t reversewinding:\t' + this.reversewinding  + '\n\t rotation:\t' + this.rotation);

		if(this.translatex || this.translatey || this.scalew || this.scaleh || this.flipew || this.flipns || this.reversewinding || this.rotation){
			// debug('\t Modifying w ' + this.scalew + ' h ' + this.scaleh);
			// debug('\t before maxes ' + json(g.maxes, true));

			if(this.rotatefirst) g.rotate(rad(this.rotation, g.getCenter()));
			if(this.flipew) g.flipEW();
			if(this.flipns) g.flipNS();
			g.updateGlyphPosition(this.translatex, this.translatey, true);
			g.updateGlyphSize(this.scalew, this.scaleh, false);
			if(this.reversewinding) g.reverseWinding();
			if(!this.rotatefirst) g.rotate(rad(this.rotation, g.getCenter()));

			// debug('\t afters maxes ' + json(g.maxes, true));

		} else {
			// debug('\t Not changing, no deltas');
		}
		
		g.changed();
		this.cache.transformedglyph = g;

		// debug(' ComponentInstance.getTransformedGlyph - END\n\n');
		return g;
	};

	function convertComponentInstanceToGlyph(gid){
		// debug('\n convertComponentInstanceToGlyph - START');
		// debug('\t gid: ' + gid);

		var og = getGlyph(gid, true);
		if(og) og = new Glyph(clone(og));

		var newshapes = [];
		var tempglyph, tempshapes;

		for(var s=0; s<og.shapes.length; s++){
			if(og.shapes[s].objtype === 'componentinstance'){
				tempglyph = og.shapes[s].getTransformedGlyph(true);
				newshapes = newshapes.concat(tempglyph.shapes);
			
			} else {
				newshapes.push(og.shapes[s]);
			}
		}
		
		og.shapes = newshapes;
		
		// debug(og);
		return og;
	}


//	-------------------------------------
//	Component to Shape Parity Functions
//	-------------------------------------
	ComponentInstance.prototype.changed = function() { 
		// debug('\n ComponentInstance.changed - START');
		// debug('\t ' + this.name);
		this.cache = {}; 
		// debug(' ComponentInstance.changed - END\n');
	};

	ComponentInstance.prototype.getName = function() { return this.name; };

	ComponentInstance.prototype.changeShapeName = function(sn){
		// debug('\n ComponentInstance.changeShapeName - START');
		// debug('\t passed: ' + sn);
		sn = strSan(sn);
		// debug('\t sanitized: ' + sn);

		if(sn !== ''){
			this.name = sn;
			history_put('component instance name');
		} else {
			showToast('Invalid component instance name - component instance names must only contain alphanumeric characters or spaces.');
		}

		redraw({calledby:'ComponentInstance Name', redrawcanvas:false});

		// debug(' ComponentInstance.changeShapeName - END\n');
	};

	ComponentInstance.prototype.updateShapePosition = function(dx, dy, force) {
		// debug('\n ComponentInstance.updateShapePosition - START');
		// debug('\t passed dx/dy/force: ' + dx + ' / ' + dy + ' / ' + force);
		// debug('\t translate was: ' + this.translatex + ' / ' + this.translatey);
		dx = parseFloat(dx) || 0;
		dy = parseFloat(dy) || 0;

		this.translatex = (1*this.translatex) + dx;
		this.translatey = (1*this.translatey) + dy;
		
		this.changed();
		
		// debug('\t translate now: ' + this.translatex + ' / ' + this.translatey);
		// debug(' ComponentInstance.updateShapePosition - END\n');
	};

	ComponentInstance.prototype.setShapePosition = function(nx, ny, force) {
		// debug('\n ComponentInstance.setShapePosition - START');
		// debug('\t passed nx/ny/force: ' + nx + ' / ' + ny + ' / ' + force);
		// debug('\t translate was: ' + this.translatex + ' / ' + this.translatey);
		var ogm = getGlyph(this.link).getMaxes();

		nx = parseFloat(nx);
		ny = parseFloat(ny);

		// debug('\t ogm ' + json(ogm, true));

		if(!isNaN(nx)) this.translatex = (nx - ogm.xmin);
		if(!isNaN(ny)) this.translatey = (ny - ogm.ymax);

		this.changed();

		// debug('\t translate now: ' + this.translatex + ' / ' + this.translatey);
		// debug(' ComponentInstance.setShapePosition - END\n');
	};

	ComponentInstance.prototype.updateShapeSize = function(dw, dh, ratiolock) {
		// debug('\n ComponentInstance.updateShapeSize - START');
		// debug('\t passed dw/dh/ratiolock: ' + dw + ' / ' + dh + ' / ' + ratiolock);
		if(dw !== false) dw = parseFloat(dw) || 0;
		if(dh !== false) dh = parseFloat(dh) || 0;

		if(ratiolock){
			var ts = this.getTransformedGlyph().getMaxes();
			var w = (ts.xmax - ts.xmin);
			var h = (ts.ymax - ts.ymin);

			if(Math.abs(dw) > Math.abs(dh)){
				dh = (dw * (h / w));
			} else {
				dw = (dh * (w / h));
			}
		}

		// debug('\t translate was: ' + this.scalew + ' / ' + this.scaleh);
		this.scalew = (1*this.scalew) + dw;
		this.scaleh = (1*this.scaleh) + dh;

		if(this.rotation === 0) this.rotatefirst = false;
		
		this.changed();

		// debug('\t translate now: ' + this.scalew + ' / ' + this.scaleh);
		// debug(' ComponentInstance.updateShapeSize - END\n');
	};

	ComponentInstance.prototype.setShapeSize = function(nw, nh, ratiolock) {
		var og = getGlyph(this.link).getMaxes();
		var dx = nx? ((nx*1) - og.xmin) : 0;
		var dy = ny? ((ny*1) - og.ymax) : 0;

		this.updateShapePosition(dx, dy, ratiolock);
	};

	ComponentInstance.prototype.getWidth = function() {
		var g = this.getTransformedGlyph().getMaxes();
		return g.xmax - g.xmin;
	};

	ComponentInstance.prototype.getHeight = function() {
		var g = this.getTransformedGlyph().getMaxes();
		return g.ymax - g.ymin;
	};

	ComponentInstance.prototype.flipEW = function(mid) {
		this.flipew = !this.flipew;
		if(mid){
			var g = this.getTransformedGlyph().getMaxes();
			this.translatex += (((mid - g.xmax) + mid) - g.xmin);
		}
		if(this.rotation === 0) this.rotatefirst = false;
		
		this.changed();
	};

	ComponentInstance.prototype.flipNS = function(mid) {
		this.flipns = !this.flipns;
		if(mid){
			var g = this.getTransformedGlyph().getMaxes();
			this.translatey += (((mid - g.ymax) + mid) - g.ymin);
		}
		if(this.rotation === 0) this.rotatefirst = false;

		this.changed();
	};

	ComponentInstance.prototype.rotate = function(angle, about) {
		// debug('\n ComponentInstance.rotate - START');
		// debug('\t passed ' + angle);
		var degrees = deg(angle);
		// debug('\t deg ' + degrees);
		// debug('\t was ' + this.rotation);

		// if(this.flipew || this.flipns) degrees *= -1;

		this.rotation = ((this.rotation + degrees) % 360);

		if(this.scaleh === 0 && this.scalew === 0 && !this.flipew && !this.flipns) this.rotatefirst = true;
		
		this.changed();
		
		// debug('\t is now ' + this.rotation);
		// debug(' ComponentInstance.rotate - END\n');
	};

	ComponentInstance.prototype.getCenter = function() { return this.getTransformedGlyph().getCenter();	};

	ComponentInstance.prototype.getMaxes = function() { 
		// debug('\n ComponentInstance.getMaxes - ' + this.name);
		return this.getTransformedGlyph().getMaxes(); 
	};

	ComponentInstance.prototype.calcMaxes = function() { return this.getTransformedGlyph().calcGlyphMaxes(); };

	ComponentInstance.prototype.reverseWinding = function() {
		this.reversewinding = !this.reversewinding;
		this.changed();
	};

	ComponentInstance.prototype.drawShape = function(lctx, view){
		// debug('\n ComponentInstance.drawShape - START');
		// debug('\t view ' + json(view, true));
		/*
		Have to iterate through shapes instead of using Glyph.drawGlyph
		due to stacking shapes with appropriate winding
		*/

		var g = this.getTransformedGlyph(); if(!g) return false;
		var drewshape = false;
		var failed = false;

		for(var s = 0; s<g.shapes.length; s++){
			drewshape = g.shapes[s].drawShape(lctx, view);
			failed = failed || !drewshape;
		}

		// debug(' ComponentInstance.drawShape - returning ' + !failed + ' - END\n');
		return !failed;
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

	ComponentInstance.prototype.draw_PathOutline = function(accent, thickness){
		// debug('\n ComponentInstance.draw_PathOutline - START');
		accent = accent || _UI.colors.green;
		thickness = thickness || 1;
		var g = this.getTransformedGlyph();
		for(var s=0; s<g.shapes.length; s++){
			draw_PathOutline(g.shapes[s], accent, thickness);
		}
	};

	ComponentInstance.prototype.draw_BoundingBox = function(accent, thickness) {
		// debug('\n ComponentInstance.draw_BoundingBox - START');
		accent = accent || _UI.colors.green;
		thickness = thickness || 1;
		var g = this.getTransformedGlyph().getMaxes();
		draw_BoundingBox(g, accent, thickness);
	};

	ComponentInstance.prototype.draw_BoundingBoxHandles = function(accent, thickness){
		// debug('\n ComponentInstance.draw_BoundingBoxHandles - START');
		accent = accent || _UI.colors.green;
		thickness = thickness || 1;
		var g = this.getTransformedGlyph().getMaxes();
	 	draw_BoundingBoxHandles(g, accent, thickness);
	};

	ComponentInstance.prototype.isHere = function(px, py){
		//debug('ISCOMPONENTHERE - checking ' + px + ',' + py);
		var g = this.getTransformedGlyph();
		return g? g.isHere(px, py) : false;
	};

	ComponentInstance.prototype.isOverBoundingBoxHandle = function(px, py){
		// debug('\n ComponentInstance.isOverBoundingBoxHandle - START');
		var c = isOverBoundingBoxHandle(px, py, this.getMaxes());
		// debug('\t ComponentInstance.isOverBoundingBoxHandle returning ' + c);
		return c;
	};

	ComponentInstance.prototype.isOverControlPoint = function(x, y, nohandles) { return false; };

//-------------------------------------------------------
// COMPONENT INSTANCE METHODS
//-------------------------------------------------------

//	Insert Component
	function showDialog_AddComponent(){
		var show = getLength(_GP.components)? 'components' : 'glyphs';
		_UI.glyphchooser.dialog = {
			'fname':'addComponent',
			'choices':'all',
			'selected': show
		};

		var content = '<h1>Add Component</h1>';
		content += 'Components are groups of shapes that can be re-used across many Glyphs.  Component Instances can be transformed while the Root Component remains unchanged.<br><br>';
		content += 'You can define and link to stand-alone Components, but you can also use Glyphs and Ligatures as if they were Root Components.<br><br>';
		content += 'Choose a Glyph to insert as a Component Instance in this Glyph.<br><br>';
		content += initGetShapesDialogOptions('component');
		openBigDialog(content);
	}

	function addComponent(sourceComponentID) {
		insertComponentInstance(sourceComponentID, false, _UI.glyphchooser.getshapesoptions);
	}

	function insertComponentInstance(sourceComponentID, destinationGlyphID, copyGlyphAttributes){
		// debug('\n insertComponentInstance - START');
		// debug('\t sourceComponentID: ' + sourceComponentID + ' destinationGlyphID: ' + destinationGlyphID);

		var select = !destinationGlyphID;
		destinationGlyphID = destinationGlyphID || getSelectedWorkItemID();
		copyGlyphAttributes = copyGlyphAttributes || { srcAutoWidth: false, srcWidth: false, srcLSB: false, srcRSB: false};
		var destinationGlyph = getGlyph(destinationGlyphID, true);

		if(destinationGlyph.canAddComponent(sourceComponentID)){
			var name = 'Instance of ' + getGlyphName(sourceComponentID);
			var nci = new ComponentInstance({'link':sourceComponentID, 'name':name});
			var sourceComponentGlyph = getGlyph(sourceComponentID);

			// debug('INSERT COMPONENT - JSON: \t' + JSON.stringify(nci));
			destinationGlyph.shapes.push(nci);
			destinationGlyph.changed();
			if(select) {
				_UI.ms.shapes.select(nci);
				_UI.selectedtool = 'shaperesize';
			}

			addToUsedIn(sourceComponentID, destinationGlyphID);

			if(copyGlyphAttributes.srcAutoWidth) destinationGlyph.isautowide = sourceComponentGlyph.isautowide;
			if(copyGlyphAttributes.srcWidth) destinationGlyph.glyphwidth = sourceComponentGlyph.glyphwidth;
			if(copyGlyphAttributes.srcLSB) destinationGlyph.leftsidebearing = sourceComponentGlyph.leftsidebearing;
			if(copyGlyphAttributes.srcRSB) destinationGlyph.rightsidebearing = sourceComponentGlyph.rightsidebearing;

			closeDialog();
			history_put('insert component from glyphedit');
			redraw({calledby:'insertComponent'});
			return true;
		} else {
			openDialog('<h1>Whoops</h1><div class="dialoglargetext">A circular link was found, components can\'t include links to themselves.<br>They can\'t handle the philosophical conundrum it poses.</div><br><br><button class="buttonsel" onclick="closeDialog();">Fine, I guess.</button>');
			return false;
		}
	}

	function turnComponentIntoShapes(){
		var selshape = _UI.ms.shapes.getSingleton();
		var shapes = selshape.getTransformedGlyph().shapes;

		_UI.ms.shapes.deleteShapes();

		for(var s=0; s<shapes.length; s++){
			addShape(shapes[s]);
		}

		//debug('turnComponentIntoShapes - newshape \n'+json(newshape));
		redraw({calledby:'turnComponentIntoShapes'});
	}

//	UsedIn Array Stuff
	function addToUsedIn(componentGlyphID, targetGlyphID){
        // debug('ADDTOUSEDIN - adding ' + componentGlyphID + ' to ' + targetGlyphID);
        
		var componentGlyph = getGlyph(componentGlyphID);
        componentGlyph.usedin.push(''+targetGlyphID);
        
        // sort numerically as opposed to alpha, remove duplicates
        componentGlyph.usedin.sort(function(a,b){return a-b;});
        componentGlyph.usedin = componentGlyph.usedin.filter(duplicates);

        // debug('\t componentGlyph.usedin is now ' + json(componentGlyph.usedin));
	}

	function removeFromUsedIn(componentGlyphID, targetGlyphID){
        // debug('REMOVEFROMUSEDIN - removing ' + targetGlyphID + ' from ' + componentGlyphID);
        
        var targetGlyph = getGlyph(targetGlyphID);
        var containsAnother = false;

        // check to see if this component is used more than once in the glyph
        for(var s=0; s<targetGlyph.shapes.length; s++) {
            if(targetGlyph.shapes[s].link && targetGlyph.shapes[s].link === componentGlyphID){
                // debug('\t duplicates found!');
                containsAnother = true;
            }
        }
        
        var componentGlyph = getGlyph(componentGlyphID);

        if(!containsAnother){
            var gindex = componentGlyph.usedin.indexOf(''+targetGlyphID);
            if(gindex !== -1) componentGlyph.usedin.splice(gindex, 1);
        }
        
        // sort numerically as opposed to alpha, remove duplicates
        componentGlyph.usedin.sort(function(a,b){return a-b;});
        componentGlyph.usedin = componentGlyph.usedin.filter(duplicates);

        // debug('\t componentGlyph.usedin is now ' + json(componentGlyph.usedin));
	}

// end of file