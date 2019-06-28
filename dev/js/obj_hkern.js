 // start of file
/**
	Horizontal Kern
	An object for storing two groups of glyphs, and 
	the kern value that applies to them.
**/


	function HKern (oa) {
		this.objtype = 'hkern';

		this.leftgroup = oa.leftgroup || [];
		this.rightgroup = oa.rightgroup || [];

		// Positive values reduce space between chars
		this.value = oa.value || 0;
	}

	HKern.prototype.getName = function() {
		var left = hexToChars(this.leftgroup.join(''));
		var right = hexToChars(this.rightgroup.join(''));
		return '' + left + ' | ' + right;
	};

	function getSelectedKern() {
		var re = _GP.kerning[_UI.selectedkern];
		return re || _GP.kerning[getFirstID(_GP.kerning)] || false;
	}

	function getSelectedKernID() {
		_UI.selectedkern = _UI.selectedkern || getFirstID(_GP.kerning);
		return _UI.selectedkern;
	}

	function getDisplayMetrics() {
		var ch;
		var leftmax = 0;
		var rightmax = 0;

		// MAXES FROM RIGHT HAND GROUP
		for(var i=0; i<this.rightgroup.length; i++){
			ch = getGlyph(this.rightgroup[i], true);
			rightmax = Math.max(rightmax, ch.getAdvanceWidth());
		}
		
		// MAXES FROM LEFT HAND GROUP
		for(var j=0; j<this.leftgroup.length; j++){
			v = getView('redraw_Kerning');
			ch = getGlyph(this.leftgroup[j], true);
			leftmax = Math.max(leftmax, ch.getAdvanceWidth());
		}

		return {
			width: leftmax + rightmax - this.value,
			center: leftmax
		};
	}

// end of file