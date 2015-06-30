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
	_UI.msp = new MultiSelect();
	_UI.msp.shape = new Shape({'name': 'multiselected points', 'path': new Path()});

	_UI.msp.getShape = function() {
		this.shape.path = this.members;
		this.shape.calcMaxes();
		return this.shape;
	};

//-------------------------------------------------------
// Multiselect SHAPES
//-------------------------------------------------------

	// Initialize fake Glyph of multiselected shapes
	_UI.mss = new MultiSelect();
	_UI.mss.glyph = new Glyph({'name': 'multiselected shapes'});

	_UI.mss.getGlyph = function() {
		this.glyph.shapes = this.members;
		this.glyph.calcGlyphMaxes();
		return this.glyph;
	};

	// Wrapper functions
	_UI.mss.updateShapePosition = function(dx, dy, force){ this.getGlyph().updateGlyphPosition(dx, dy, force); };

	_UI.mss.setShapePosition = function(nx, ny, force) { this.getGlyph().setGlyphPosition(nx, ny, force); };

	_UI.mss.updateShapeSize = function(dw, dh, ratiolock) { 
		_UI.debug = true;
		if(this.members.length === 1) this.members[0].updateShapeSize(dw, dh, ratiolock);
		else if (this.members.length > 1) this.getGlyph().updateGlyphSize(dw, dh, ratiolock);
		_UI.debug = false;
	};

	_UI.mss.setShapeSize = function(nw, nh, ratiolock) { this.getGlyph().setGlyphSize(nw, nh, ratiolock); };

	_UI.mss.flipNS = function(mid) { this.getGlyph().flipNS(mid); };

	_UI.mss.flipEW = function(mid) { this.getGlyph().flipEW(mid); };

	_UI.mss.getAttribute = function(attr) {
		if(this.members.length === 1) return this.members[0][attr];
		else if (this.members.length > 1) return this.getGlyph()[attr] || false;
		else return false;
	};

	_UI.mss.isOverBoundingBoxHandle = function(px, py) {
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

	_UI.mss.calcMaxes = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].calcMaxes();
		}
	};

	_UI.mss.getMaxes = function(){
		if(this.members.length === 1) return this.members[0].getMaxes();
		else return this.getGlyph().maxes;
	};

	_UI.mss.drawShape = function(lctx, view){
		var failed = false;
		var drewshape = false;
		for(var m=0; m<this.members.length; m++){
			drewshape = this.members[m].drawShape(lctx, view);
			failed = failed || !drewshape;
		}

		return !failed;
	};

	_UI.mss.reverseWinding = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].reverseWinding();
		}
	};

	_UI.mss.drawSelectOutline = function(){
		if(this.members.length === 1){
			this.members[0].drawSelectOutline();
		} else {
			for(var m=0; m<this.members.length; m++){
				this.members[m].drawSelectOutline(false, _UI.multiselectthickness);
			}
		}
	};

	_UI.mss.drawBoundingBox = function(){
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

	_UI.mss.drawBoundingBoxHandles = function(){
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

	_UI.mss.deletePathPoint = function(){ 
		if(this.members[0]){
			// this.members[0].path.deletePathPoint();
			this.members[0].calcMaxes();
		}
	};

	_UI.mss.insertPathPoint = function() { 
		if(this.members[0]){
			// this.members[0].path.insertPathPoint();
			this.members[0].calcMaxes();
		}
	};

	_UI.mss.selectPathPoint = function(index) { if(this.members[0]) this.members[0].path.selectPathPoint(index); };

	_UI.mss.deSelectPathPoints = function(){
		for(var m=0; m<this.members.length; m++){
			if(this.members[m].path) this.members[m].path.selectPathPoint(false);
		}
	};

	_UI.mss.sp = function(){
		if(this.members[0]) return this.members[0].path.sp();
		else return false;
	};


// end of file