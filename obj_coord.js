
//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------
	
	function Coord(oa){
		// PARAMS //
		//	x,y,xl,yl
		this.objtype = "coord";
		
		this.x = oa.x || 0;
		this.y = oa.y || 0;
		this.xlock = (isval(oa.xl)? oa.xl : false);
		this.ylock = (isval(oa.yl)? oa.yl : false);
		
	}