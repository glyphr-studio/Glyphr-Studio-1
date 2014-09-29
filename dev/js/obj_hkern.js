// start of file

//-------------------------------------------------------
// HORIZONTAL KERN OBJECT
//-------------------------------------------------------
	function HKern (oa) {
		this.objtype = 'hkern';

		this.leftgroup = oa.leftgroup || [];
		this.rightgroup = oa.rightgroup || [];

		// Positive values reduce space between chars
		this.value = oa.value || 0;
	}

	function getSelectedKern() {
		var re = _GP.kerning[_UI.selectedkern];
		return re || false;
	}