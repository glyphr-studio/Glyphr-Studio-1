
//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------

	function Coord(oa){
		this.objtype = "coord";

		this.x = oa.x || 0;
		this.y = oa.y || 0;
		this.xlock = oa.xlock || false;
		this.ylock = oa.yllock || false;
	}