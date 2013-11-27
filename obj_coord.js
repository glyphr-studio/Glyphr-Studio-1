
//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------
	
	function Coord(pv){
		// PARAMS //
		//	x,y,xl,yl
		this.objtype = "coord";
		
		this.x = (isval(pv.x)? pv.x : 0);
		this.y = (isval(pv.y)? pv.y : 0);
		this.xlock = (isval(pv.xl)? pv.xl : false);
		this.ylock = (isval(pv.yl)? pv.yl : false);
		
	}