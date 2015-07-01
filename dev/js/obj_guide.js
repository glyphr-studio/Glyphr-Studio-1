// start of file
/**
	Guide
	An object used by the UI for drawing guide 
	lines on the edit canvas, and for saving 
	custom guides to a Glyphr Studio Project.
**/


	function Guide(oa){
		this.objtype = 'guide';

		this.type = oa.type || 'vertical';
		this.name = oa.name || (this.type + ' guide');
		this.location = isval(oa.location)? oa.location : 200;
		this.angle = oa.angle || false;
		this.color = oa.color || makeRandomSaturatedColor();
		this.visible = isval(oa.visible)? oa.visible : true;
		this.showname = isval(oa.showname)? oa.showname : true;
		this.editable = isval(oa.editable)? oa.editable : true;
	}

	Guide.prototype.draw = function(delta) {
		// debug('\nGuide.draw \t START');
		// debug('\t name: ' + this.name);
		// debug('\t delta: ' + delta);
		if(!this.visible) return;

		delta = delta*1;
		var ctx = _UI.glypheditctx;
		var cansize = _UI.glypheditcanvassize;
		var v = getView('guide');
		var start = {x:0, y:0};
		var end = {x:0, y:0};
		var label = {x:0, y:0};
		var pad = 5;
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
			label.x = 25;
			label.y = pos - pad;
		} else if (this.type === 'vertical'){
			pos = (v.dx - (this.location*v.dz*-1)).makeCrisp();
			if(delta) pos += (delta*v.dz);
			start.x = pos;
			start.y = 0;
			end.x = pos;
			end.y = cansize;
			label.x = pos + pad;
			label.y = 15;
		}

		// Draw Line
		// debug('\t start: ' + JSON.stringify(start) + ' / end: ' + JSON.stringify(end));
		ctx.strokeStyle = this.color;
		if(isval(delta)) ctx.strokeStyle = shiftColor(this.color, 0.6, true);
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.closePath();

		// Draw Label
		if(this.showname && _UI.showguidelabels && !delta){
			_UI.glypheditctx.fillStyle = this.color;
			_UI.glypheditctx.font = '10px tahoma, verdana, sans-serif';
			_UI.glypheditctx.fillText(this.name, label.x, label.y);
		}

		// debug('Guide.draw \t END\n');
	};

	function makeRandomSaturatedColor(){
		var sat = Math.floor(Math.random()*5)*51;
		var arr = [];
		var satloc = Math.floor(Math.random()*3);
		arr[satloc] = sat;
		switch(satloc){
			case 0:
				arr[1] = 0;
				arr[2] = 255;
				break;
			case 1:
				arr[0] = 0;
				arr[2] = 255;
				break;
			case 2:
				arr[0] = 255;
				arr[1] = 0;
				break;
		}
		return 'rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
	}
// end of file