
	//-------------------------------------------------------
	// COORDINATE OBJECT
	//-------------------------------------------------------
	
	
	function coord(pv){
		//	----------
		//	Params
		//	x,y,xl,yl
		//	----------

		this.x = (isval(pv.x)? pv.x : 0);
		this.y = (isval(pv.y)? pv.y : 0);
		this.xlock = (isval(pv.xl)? pv.xl : false);
		this.ylock = (isval(pv.yl)? pv.yl : false);
		
	}