
//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------

	function Coord(oa){
		this.objtype = "coord";

		this.x = round(oa.x, 3) || 0;
		this.y = round(oa.y, 3) || 0;
		this.xlock = oa.xlock || false;
		this.ylock = oa.yllock || false;
	}