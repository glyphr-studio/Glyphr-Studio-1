// start of file

//-------------------
// SatChooser
//-------------------

	function SatChooser(pv){
		// console.log('SatChooser constructor');
		// console.log('\t Passed Variable: ' + JSON.stringify(pv));

		// Properties
		pv = pv || {};
		this.clickCallback = pv.clickCallback || function(c){ console.log('Click callback function returned object: ' + JSON.stringify(c)); };
		this.clickCallbackArgs = {};
		this.cellSize =	1;
		this.pointerSize = pv.pointerSize || 20;
		this.borderSize = pv.borderSize || 10;
		this.step = pv.step || 51;
		this.width = pv.width? this.getDiscreetWidth(pv.width) : this.getDiscreetWidth(200);
		this.height = this.width - this.borderSize;
		this.screenx = -1000;
		this.screeny = -1000;
		this.showSat = pv.showSat || true;
		this.bhcID = pv.bhcID || 'satchooser';
		this.borderColor = pv.borderColor || 'rgb(76,81,86)';

		// Setup Canvas
		this.can = document.createElement('canvas');
		this.can.style.backgroundColor = 'transparent';
		this.can.style.borderWidth = '0px';
		this.can.style.display = 'none';
		this.can.style.position = 'absolute';
		this.can.width = this.width;
		this.can.height = this.height;
		this.can.setAttribute('id', this.bhcID);
		this.ctx = this.can.getContext('2d');
		this.draw();
		this.imgData = this.ctx.getImageData(0,0,this.can.width,this.can.height);

		this.can.onmouseout = function(e){ e.target.style.display = 'none'; };
		this.can.onblur = function(e){ e.target.style.display = 'none'; };

		var that = this;

		this.can.onclick = function(e){

			if(!e.hasOwnProperty('offsetX')) {
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}

			// console.log('SatChooser.onclick');
			// console.log('\t x / y: ' + e.offsetX + ' / ' + e.offsetY);

			if(	(e.offsetY < that.borderSize) ||
				(e.offsetY > that.height - that.borderSize) ||
				(e.offsetX < that.borderSize + that.pointerSize) ||
				(e.offsetX > that.width - that.borderSize) ) {
				// console.log('\t border');
				return;
			}

			var ipx = ((Math.floor(e.offsetX-1) * 4) + (Math.floor(e.offsetY-1) * that.imgData.width * 4));
			var rx = that.imgData.data[ipx+0];
			var gx = that.imgData.data[ipx+1];
			var bx = that.imgData.data[ipx+2];
			var rgbx = 'rgb('+rx+','+gx+','+bx+')';
			var reox = {r:rx, g:gx, b:bx};

			// console.log('\t ipx: ' + ipx + '\t = ' + rgbx);

			that.clickCallbackArgs.colorobject = reox;
			that.clickCallbackArgs.colorstring = rgbx;
			that.clickCallback(that.clickCallbackArgs);
		};
	}

	SatChooser.prototype.getDiscreetWidth = function(w) {
		// console.log('SatChooser.getDiscreetWidth');
		var numcells = (255 * 6 / this.step);
		this.cellSize = Math.round((w - (this.borderSize*2)) /  numcells);
		var rw = ((this.cellSize * numcells) + (this.borderSize*2) + this.pointerSize);
		// console.log('\t passed: ' + w + ' returns ' + rw + '\t numcells: ' + numcells + ' cellsize: ' + this.cellSize + ' step: ' + this.step);
		return rw;
	};

	SatChooser.prototype.show = function(pv){
		// console.log('SatChooser.show');
		// console.log('\t passed: ');
		// console.log(pv.elem);

		document.body.appendChild(this.can);

		this.clickCallbackArgs = pv.args || {};
		var cs = this.can.style;
		var offset = getOffset(pv.elem);

		function getOffset(obj){
			var total = obj.offsetParent ? getOffset(obj.offsetParent) : {'offsetTop': 0, 'offsetLeft': 0};
			total.offsetTop += obj.offsetTop;
			total.offsetLeft += obj.offsetLeft;
			return total;
		}

		// console.log('\t final offset: ' + JSON.stringify(offset));
		this.screeny = (8 + offset.offsetTop - (this.height / 2) + (this.pointerSize / 2));
		this.screenx = (2 + offset.offsetLeft + pv.elem.offsetWidth);

		cs.display = 'none';
		cs.top = (this.screeny + 'px');
		cs.left = (this.screenx + 'px');

		// console.log('\t top / left: ' + cs.top + ' / ' + cs.left);

		// Move & Show Chooser
		cs.display = 'block';

	};

	SatChooser.prototype.hide = function(){
		this.can.style.display = 'none';
		this.can.parentNode.removeChild(this.can);
	};

	SatChooser.prototype.draw = function(){
		// console.log('SatChooser.draw');
		var x = this.ctx;
		var fw = this.width;
		var fh = this.height;
		var hh = (this.height / 2);
		var ps = this.pointerSize;
		var bs = this.borderSize;

		// draw bubble
		x.beginPath();
		x.moveTo(ps, 0);
		x.lineTo(fw, 0);
		x.lineTo(fw, fh);
		x.lineTo(ps, fh);
		x.lineTo(ps, (hh+ps));
		x.lineTo(0, hh);
		x.lineTo(ps, (hh-ps));
		x.closePath();
		x.fillStyle = this.borderColor;
		x.fill();

		// draw base hues
		var colx = bs + ps;
		var color = {};
		var step = this.step;
		var numcol = (255 * 6 / step);
		var colw = Math.round((fw - ps - (bs*2)) / numcol);

		//Red to RedGreen
		for(var i=0; i<(256-step); i+=step){
			color = {r:255, g:i, b:0};
			drawOneColumn();
			colx += colw;
		}
		//RedGreen to Green
		for(var rg=255; rg>=step; rg-=step){
			color = {r:rg, g:255, b:0};
			drawOneColumn();
			colx += colw;
		}
		//Green to BlueGreen
		for(var g=0; g<(256-step); g+=step){
			color = {r:0, g:255, b:g};
			drawOneColumn();
			colx += colw;
		}
		//BlueGreen to Blue
		for(var bg=255; bg>=step; bg-=step){
			color = {r:0, g:bg, b:255};
			drawOneColumn();
			colx += colw;
		}
		//Blue to BlueRed
		for(var b=0; b<(256-step); b+=step){
			color = {r:b, g:0, b:255};
			drawOneColumn();
			colx += colw;
		}
		//BlueRed to Red
		for(var br=255; br>=step; br-=step){
			color = {r:255, g:0, b:br};
			drawOneColumn();
			colx += colw;
		}

		function drawOneColumn(){
			var rstep = (127-color.r) / numcol;
			var gstep = (127-color.g) / numcol;
			var bstep = (127-color.b) / numcol;

			for(var i=0; i<=numcol; i++){
				var tr = rgbSan(color.r + (i*rstep));
				var tg = rgbSan(color.g + (i*gstep));
				var tb = rgbSan(color.b + (i*bstep));

				x.fillStyle = 'rgb('+tr+','+tg+','+tb+')';
				x.strokeStyle = x.fillStyle;
				//x.strokeWidth = .5;
				x.fillRect(colx, (bs + (i*colw)), colw, colw);
				//x.stroke();
			}
		}

		function rgbSan(num){ return Math.max(0, Math.min(255, Math.round(num))); }
	};

// end of file