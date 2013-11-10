
	//-------------------------------------------------------
	// COORDINATE OBJECT
	//-------------------------------------------------------
	
	
	function coord(x,y,xl,yl){
	
		this.x = (isval(x)? x : 0);
		this.y = (isval(y)? y : 0);
		this.xlock = (isval(xl)? xl : false);
		this.ylock = (isval(yl)? yl : false);
		
	}