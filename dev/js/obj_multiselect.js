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
		this.members = [obj];
	};

	MultiSelect.prototype.clear = function(){ 
		this.members = []; 
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

	MultiSelect.prototype.getShapes = function() {
		return this.members;
	};

	MultiSelect.prototype.isSelected = function(obj) {
		for(var m=0; m<this.members.length; m++){
			if(this.members[m] === obj) return true;
		}

		return false;
	};


//-------------------------------------------------------
// Shape Paridy Functions
//-------------------------------------------------------
	_UI.selectedshapes = new MultiSelect();

	_UI.selectedshapes.calcMaxes = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].calcMaxes();
		}
	};

	_UI.selectedshapes.drawShape = function(lctx, view){
		for(var m=0; m<this.members.length; m++){
			this.members[m].drawShape(lctx, view);
		}
	};

	_UI.selectedshapes.drawSelectOutline = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].drawSelectOutline();
		}
	};

	_UI.selectedshapes.drawBoundingBox = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].drawBoundingBox();
		}
	};

	_UI.selectedshapes.drawBoundingBoxHandles = function(){
		for(var m=0; m<this.members.length; m++){
			this.members[m].drawBoundingBoxHandles();
		}
	};

	_UI.selectedshapes.updateShapePosition = function(dx, dy, force){
		for(var m=0; m<this.members.length; m++){
			this.members[m].updateShapePosition(dx, dy, force);
		}
	};



// end of file