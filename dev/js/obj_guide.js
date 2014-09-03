// start of file

//-------------------------------------------------------
// GUIDE OBJECT
//-------------------------------------------------------

	function Guide(oa){
		this.objtype = "guide";

		this.type = oa.type || 'horizontal';
		this.name = oa.name || (this.type + ' guide');
		this.location = oa.location || 0;
		this.angle = oa.angle || false;
		this.color = oa.color || _GP.projectsettings.color_os_guideline;
		this.editable = oa.editable || true;
		this.visible = isval(oa.visible)? oa.visible : true;
	}

	Guide.prototype.draw = function(delta) {
		// debug('\nGuide.draw \t START');
		// debug('\t name: ' + this.name);
		// debug('\t delta: ' + delta);
		var ctx = _UI.chareditctx;
		var cansize = _UI.chareditcanvassize;
		var v = getView("guide");
		var start = {x:0, y:0};
		var end = {x:0, y:0};
		var pos;

		// debug('\t view: ' + JSON.stringify(v));
		// debug('\t location: ' + this.location);

		if(this.type === 'horizontal'){ 
			pos = (v.dy - (this.location*v.dz)).makeCrisp();
			if(delta) pos += (delta*v.dz);
			start.x = 0;
			start.y = pos;
			end.x = cansize;
			end.y = pos;
		} else if (this.type === 'vertical'){
			pos = (v.dx - (this.location*v.dz)).makeCrisp();
			if(delta) pos += (delta*v.dz);
			start.x = pos;
			start.y = 0;
			end.x = pos;
			end.y = cansize;
		}

		// debug('\t start: ' + JSON.stringify(start) + ' / end: ' + JSON.stringify(end));

		ctx.strokeStyle = this.color;
		if(delta) ctx.strokeStyle = shiftColor(this.color, 0.6, true);
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.closePath();
		// debug('Guide.draw \t END\n');
	};

// end of file