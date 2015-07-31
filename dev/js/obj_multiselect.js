// start of file
/**
	Multi-Select
	Wrapper object to be used by the UI to handle
	actions that pertain to many selected shapes
	or path points.
**/



//-------------------------------------------------------
// Selected Shapes
//-------------------------------------------------------
	function MultiSelect(){
		this.members = [];
	}

	MultiSelect.prototype.select = function(obj) {
		if(obj)	this.members = [obj];
		else this.clear();
	};

	MultiSelect.prototype.clear = function(){
		this.members = [];
		if (this.glyph) this.glyph.ratiolock = false;
	};

	MultiSelect.prototype.add = function(obj){
		if(this.members.indexOf(obj) < 0) this.members.push(obj);
	};

	MultiSelect.prototype.remove = function(obj) {
		for(var m=0; m<this.members.length; m++){
			if(this.members[m] === obj) {
				this.members.splice(m, 1);
			}
		}
	};

	MultiSelect.prototype.toggle = function(obj) {
		if(this.isSelected(obj)) this.remove(obj);
		else this.add(obj);
	};

	MultiSelect.prototype.getType = function() {
		if(this.members.length === 0) return false;
		else if(this.members.length === 1) return this.members[0].objtype;
		else return 'multi';
	};

	MultiSelect.prototype.count = function() {
		return this.members.length;
	};

	MultiSelect.prototype.getMembers = function() {
		return this.members;
	};

	MultiSelect.prototype.getSingleton = function() {
		if(this.members.length === 1) return this.members[0];
		else return false;
	};

	MultiSelect.prototype.isSelected = function(obj) {
		for(var m=0; m<this.members.length; m++){
			if(this.members[m] === obj) return true;
		}

		return false;
	};



//-------------------------------------------------------		
// Multiselect POINTS		
//-------------------------------------------------------		
	
// Initialize fake Shape of multiselected Points		
_UI.ms.points = new MultiSelect();		
_UI.ms.points.shape = new Shape({'name': 'multiselected points', 'path': new Path()});		
	
_UI.ms.points.getShape = function() {		
	this.shape.path = this.members;		
	this.shape.calcMaxes();		
	return this.shape;		
};

_UI.ms.points.updateShapePosition = function(dx, dy, force){ this.getShape().updateShapePosition(dx, dy, force); };

_UI.ms.points.drawHandles = function(drawH1, drawH2, accent) {
	// body...
};

_UI.ms.points.drawPoint = function(sel, accent) {
	// body...
};


//-------------------------------------------------------
// Multiselect SHAPES
//-------------------------------------------------------

	// Initialize fake Glyph of multiselected shapes
	_UI.ms.shapes = new MultiSelect();
	_UI.ms.shapes.glyph = new Glyph({'name': 'multiselected shapes'});

	_UI.ms.shapes.getGlyph = function() {
		this.glyph.shapes = this.members;
		this.glyph.calcGlyphMaxes();
		return this.glyph;
	};

	// Wrapper functions
	_UI.ms.shapes.updateShapePosition = function(dx, dy, force){ this.getGlyph().updateGlyphPosition(dx, dy, force); };

	_UI.ms.shapes.setShapePosition = function(nx, ny, force) { this.getGlyph().setGlyphPosition(nx, ny, force); };

	_UI.ms.shapes.updateShapeSize = function(dw, dh, ratiolock) { 
		_UI.debug = true;
		if(this.members.length === 1) this.members[0].updateShapeSize(dw, dh, ratiolock);
		else if (this.members.length > 1) this.getGlyph().updateGlyphSize(dw, dh, ratiolock);
		_UI.debug = false;
	};

	_UI.ms.shapes.setShapeSize = function(nw, nh, ratiolock) { this.getGlyph().setGlyphSize(nw, nh, ratiolock); };

	_UI.ms.shapes.flipNS = function(mid) { this.getGlyph().flipNS(mid); };

	_UI.ms.shapes.flipEW = function(mid) { this.getGlyph().flipEW(mid); };

	_UI.ms.shapes.getAttribute = function(attr) {
		if(this.members.length === 1) return this.members[0][attr];
		else if (this.members.length > 1) return this.getGlyph()[attr] || false;
		else return false;
	};

	_UI.ms.shapes.isOverBoundingBoxHandle = function(px, py) {
		// debug('\n SelectedShapes.isOverBoundingBoxHandle - START');
		// debug('\t passed x/y: ' + px + '/' + py);
		
		if(this.members.length === 0){
			return false;
		} else if(this.members.length === 1) {
			// debug('\t calling singleton method');
			return this.members[0].isOverBoundingBoxHandle(px, py);
		}

		var c = isOverBoundingBoxHandle(px, py, this.getGlyph().maxes, _UI.multiselectthickness);
		// debug('\t SelectedShapes.isOverBoundingBoxHandle returning ' + c);
		return c;
	};

	_UI.ms.shapes.calcMaxes = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].calcMaxes();
		}
	};

	_UI.ms.shapes.getMaxes = function(){
		if(this.members.length === 1) return this.members[0].getMaxes();
		else return this.getGlyph().maxes;
	};

	_UI.ms.shapes.drawShape = function(lctx, view){
		var failed = false;
		var drewshape = false;
		for(var m=0; m<this.members.length; m++){
			drewshape = this.members[m].drawShape(lctx, view);
			failed = failed || !drewshape;
		}

		return !failed;
	};

	_UI.ms.shapes.reverseWinding = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].reverseWinding();
		}
	};

	_UI.ms.shapes.drawSelectOutline = function(){
		if(this.members.length === 1){
			this.members[0].drawSelectOutline();
		} else {
			for(var m=0; m<this.members.length; m++){
				this.members[m].drawSelectOutline(false, _UI.multiselectthickness);
			}
		}
	};

	_UI.ms.shapes.drawBoundingBox = function(){
		if(this.members.length === 1){
			this.members[0].drawBoundingBox();
		} else if(this.members.length > 1){
			var bmaxes = clone(_UI.mins);

			for(var m=0; m<this.members.length; m++){
				bmaxes = getOverallMaxes([bmaxes, this.members[m].getMaxes()]);
			}

			drawBoundingBox(bmaxes, _UI.colors.gray, _UI.multiselectthickness);
		}
	};

	_UI.ms.shapes.drawBoundingBoxHandles = function(){
		if(this.members.length === 1){
			this.members[0].drawBoundingBoxHandles();
		} else if(this.members.length > 1){
			var bmaxes = clone(_UI.mins);

			for(var m=0; m<this.members.length; m++){
				bmaxes = getOverallMaxes([bmaxes, this.members[m].getMaxes()]);
			}

			drawBoundingBoxHandles(bmaxes, _UI.colors.gray, _UI.multiselectthickness);
		}
	};

	// Global path accessor functions
	// THESE ASSUME THE FIRST MEMBER IS A SINGLETON

	_UI.ms.shapes.deletePathPoint = function(){ 
		if(this.members[0]){
			// this.members[0].path.deletePathPoint();
			this.members[0].calcMaxes();
		}
	};

	_UI.ms.shapes.insertPathPoint = function() { 
		if(this.members[0]){
			// this.members[0].path.insertPathPoint();
			this.members[0].calcMaxes();
		}
	};

	_UI.ms.shapes.selectPathPoint = function(index) { if(this.members[0]) this.members[0].path.selectPathPoint(index); };

	_UI.ms.shapes.deSelectPathPoints = function(){
		for(var m=0; m<this.members.length; m++){
			if(this.members[m].path) this.members[m].path.selectPathPoint(false);
		}
	};

	_UI.ms.shapes.sp = function(){
		if(this.members[0]) return this.members[0].path.sp();
		else return false;
	};


// end of file