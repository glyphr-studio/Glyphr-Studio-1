
//-------------------------------------------------------
// PATH POINT OBJECT
//-------------------------------------------------------
	
	function PathPoint(oa){
		this.objtype = "pathpoint";

		this.P = oa.P? new Coord(oa.P) : new Coord({"x":100, "y":100});
		this.H1 = oa.H1? new Coord(oa.H1) : new Coord({"x":0, "y":0});
		this.H2 = oa.H2? new Coord(oa.H2) : new Coord({"x":200, "y":200});
		
		this.type = oa.type || "corner";		// corner, flat, symmetric
		this.selected = oa.selected || false;
		this.useh1 = (isval(oa.useh1)? oa.useh1 : true);
		this.useh2 = (isval(oa.useh2)? oa.useh2 : true);
		
		this.drawPoint = drawPoint;
		this.drawHandles = drawHandles;
		this.drawDirectionalityPoint = drawDirectionalityPoint;
		this.updatePointPosition = updatePointPosition;
		this.setPointPosition = setPointPosition;
		this.resetHandles = resetHandles;
				
		this.makeFlat = makeFlat;
		this.makeSymmetric = makeSymmetric;
		this.makePointedTo = makePointedTo;
		
		this.roundall = roundall;
		
		//debug("PathPoint() - new pathPoint created");	
	}

	function makeFlat(move){

		//figure out length (hypotenuse) of H1
		var adj1 = this.P.x-this.H1.x;
		var opp1 = this.P.y-this.H1.y;
		var hyp1 = Math.sqrt( (adj1*adj1) + (opp1*opp1) );
		var angle1 = Math.acos(adj1 / hyp1);
		
		//figure out length (hypotenuse) of H2
		var adj2 = this.P.x-this.H2.x;
		var opp2 = this.P.y-this.H2.y;
		var hyp2 = Math.sqrt( (adj2*adj2) + (opp2*opp2) );
		var angle2 = Math.acos(adj2 / hyp2);

		
		switch(move){
			case "H1" :
				//modifier
				var mod = (this.H1.y > this.P.y)? -1 : 1;
				
				//get new x and y for H2	
				var newadj2 = Math.cos(angle1) * hyp2;
				var newopp2 = Math.tan(angle1) * newadj2;
				
				//Set values
				this.H2.x = (this.P.x + (newadj2));
				this.H2.y = (this.P.y + (newopp2*mod));
				break;
				
			case "H2" :
				//modifier
				var mod = (this.H2.y > this.P.y)? -1 : 1;
				
				//get new x and y for H2	
				var newadj1 = Math.cos(angle2) * hyp1;
				var newopp1 = Math.tan(angle2) * newadj1;
				
				//Set values
				this.H1.x = (this.P.x + (newadj1));
				this.H1.y = (this.P.y + (newopp1*mod));
				break;
		}
		
		this.roundall();
	}
	
	function makeSymmetric(move){
		switch(move){
			case "H1" :
				this.H2.x = ((this.P.x - this.H1.x) + this.P.x)
				this.H2.y = ((this.P.y - this.H1.y) + this.P.y)
				break;
			case "H2" :
				this.H1.x = ((this.P.x - this.H2.x) + this.P.x)
				this.H1.y = ((this.P.y - this.H2.y) + this.P.y)
				break;
		}
		
		this.roundall();
	}
	
	function makePointedTo(px, py, length){
		//figure out angle
		var adj1 = this.P.x-px;
		var opp1 = this.P.y-py;
		var hyp1 = Math.sqrt( (adj1*adj1) + (opp1*opp1) );
		var angle1 = Math.acos(adj1 / hyp1);
		
		//debug("MAKEPOINTEDTO - x/y/l " + px + " " + py + " " + length + " - Before H1x/y " + this.H1.x + " " + this.H1.y);
		this.H1.x = this.P.x - Math.cos(angle1)*length;
		this.H1.y = this.P.y - Math.sin(angle1)*length;
		//debug("MAKEPOINTEDTO - after H1x/y " + this.H1.x + " " + this.H1.y);
		this.makeFlat("H1");
		//debug("MAKEPOINTEDTO - after makesymmetric H1x/y " + this.H1.x + " " + this.H1.y);
		
		this.roundall();
	}
	
	function resetHandles(){
		this.type = "flat";
		this.H2.x = this.P.x - 100;
		this.H2.y = this.P.y;
		this.H1.x = this.P.x + 100;
		this.H1.y = this.P.y;
	}
	
	function setPointPosition(controlpoint, nx, ny){
		var dx = 0;
		var dy = 0;
		
		switch(controlpoint){
			case "P":
				if(!this.P.xlock && !isNaN(nx)){
					dx = (this.P.x - nx);
					this.P.x = nx;
					this.H1.x -= dx;
					this.H2.x -= dx;
				}
				if(!this.P.ylock && !isNaN(ny)){
					dy = (this.P.y - ny);
					this.P.y = ny;
					this.H1.y -= dy;
					this.H2.y -= dy;
				}	
				break;
			
			case "H1":
				if(!this.H1.xlock && !isNaN(nx)){
					this.H1.x = nx;
				}
				if(!this.H1.ylock && !isNaN(ny)){
					this.H1.y = ny;
				}	
				break;
				
			case "H2":
				if(!this.H2.xlock && !isNaN(nx)){
					this.H2.x = nx;
				}
				if(!this.H2.ylock && !isNaN(ny)){
					this.H2.y = ny;
				}
				break;
		}
		
		this.roundall();
		
		//debug("SETPOINTPOSITION x/y/dx/dy: " + nx +" "+ ny +" "+ dx +" "+ dy)
	}
	
	function updatePointPosition(controlpoint, dx,dy, force){
		//debug("UPDATEPOINTPOSITION - cp / dx / dy / force: " + controlpoint + " / " + dx + " / " + dy + " / " + force);
		var lockx = (uistate.selectedtool=='pathedit'? this.P.xlock : false);
		var locky = (uistate.selectedtool=='pathedit'? this.P.ylock : false);
		
		if(isval(force)){
			if(force){
				lockx = false;
				locky = false;
			}
		}
		
		switch(controlpoint){
			case "P":
				lockx? true : this.P.x += dx;
				locky? true : this.P.y += dy;
				lockx? true : this.H1.x += dx;
				locky? true : this.H1.y += dy;
				lockx? true : this.H2.x += dx;
				locky? true : this.H2.y += dy;				
				break;
			
			case "H1" :
				this.H1.x += dx;
				this.H1.y += dy;
				if(this.type == "symmetric"){ this.makeSymmetric("H1"); } 
				else if (this.type == "flat") { this.makeFlat("H1"); }				
				break;
			
			case "H2" : 
				this.H2.x += dx;
				this.H2.y += dy;
				if(this.type == "symmetric"){ this.makeSymmetric("H2"); } 
				else if (this.type == "flat") { this.makeFlat("H2"); }
				break;
		}
		
		this.roundall();
	}
	
	function roundall(){	
		this.P.x = Math.round(this.P.x);
		this.P.y = Math.round(this.P.y);
		this.H1.x = Math.round(this.H1.x);
		this.H1.y = Math.round(this.H1.y);
		this.H2.x = Math.round(this.H2.x);
		this.H2.y = Math.round(this.H2.y);
	}
	
	function drawPathToPoint(lctx, pathpoints, num, closed) {
		//debug("DRAWPATHTOPOINT("+num+") - begin drawing pp");
		var pp = pathpoints[num];	
		var next = false;
		if(pathpoints[num+1]){
			next = pathpoints[num+1];
		} else if (closed){
			next = pathpoints[0];
		}
		
		if(pp.type == "symmetric") { pp.makeSymmetric("H1"); }
		else if (pp.type == "flat") { pp.makeFlat("H1"); }
		
		if(num==0){ 
			lctx.moveTo(sx_cx(pp.P.x), sy_cy(pp.P.y));
			//debug("DRAWPATHTOPOINT - first point, cnvas orgin: " + uistate.chareditcanvassettings.originx + "," + uistate.chareditcanvassettings.originy);
			//debug("DRAWPATHTOPOINT - first point, saved coord: " + pp.P.x + "," + pp.P.y);
			//debug("DRAWPATHTOPOINT - FOR CMGC cnvas coord clc: " + (pp.P.x+_G.fontsettings.upm) + "," + ((_G.fontsettings.upm*2)-pp.P.y) );
			//debug("DRAWPATHTOPOINT - first point, cnvas coord: " + sx_cx(pp.P.x) + "," + sy_cy(pp.P.y));
		}
		
		if (next) {
			var pph2x = (pp.useh2? sx_cx(pp.H2.x) : sx_cx(pp.P.x));
			var pph2y = (pp.useh2? sy_cy(pp.H2.y) : sy_cy(pp.P.y));
			var nxh1x = (next.useh1? sx_cx(next.H1.x) : sx_cx(next.P.x));
			var nxh1y = (next.useh1? sy_cy(next.H1.y) : sy_cy(next.P.y));
			var nxppx = sx_cx(next.P.x);
			var nxppy = sy_cy(next.P.y);
			
			//debug("DRAWPATHTOPOINT: pph2x/y, nxh1x/y, nxppx/y: " + pph2x + "/" + pph2y + " , " + nxh1x + "/" + nxh1y + " , " + nxppx + "/" + nxppy);
			
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy); 
		}
	
		//debug("DRAWPATHTOPOINT("+num+") - end");
	}
	
	function drawPoint(c) {
		var ps = _G.projectsettings.pointsize +1;
		var hp = ps/2;
		uistate.chareditctx.fillStyle = c? c : uistate.colors.accent;	
		
		uistate.chareditctx.fillRect((sx_cx(this.P.x)-hp).makeCrisp()-1, (sy_cy(this.P.y)-hp).makeCrisp()-1, ps, ps);
		uistate.chareditctx.strokeRect((sx_cx(this.P.x)-hp).makeCrisp()-1, (sy_cy(this.P.y)-hp).makeCrisp()-1, ps, ps);
	}

	function drawDirectionalityPoint(c, next){
		uistate.chareditctx.fillStyle = c? c : uistate.colors.accent;	
		uistate.chareditctx.strokeStyle = uistate.colors.accent;
		uistate.chareditctx.lineWidth = 1;
		var begin = {"x":this.P.x, "y":this.P.y};
		var end = {"x":this.H2.x, "y":this.H2.y};

		if(!this.useh2) {
			end = {"x":next.P.x, "y":next.P.y};
		}

		var ps = (_G.projectsettings.pointsize*.75);
		var arrow = [
			[(ps*3), 0],
			[0, ps],
			[-ps, ps],
			[-ps, -ps],
			[0, -ps]
		];
		var rotatedarrow = [];
		var ang = Math.atan2((end.y-begin.y),(end.x-begin.x))*-1;
		
		for(var p in arrow){
			rotatedarrow.push([
				Math.round((arrow[p][0] * Math.cos(ang)) - (arrow[p][1] * Math.sin(ang))),
				Math.round((arrow[p][0] * Math.sin(ang)) + (arrow[p][1] * Math.cos(ang)))
			]);
		}

		//debug("DRAWPOINT arrow = " + JSON.stringify(arrow) + "  - rotatedarrow = " + JSON.stringify(rotatedarrow));

		uistate.chareditctx.beginPath();
		uistate.chareditctx.moveTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));

		for(var p in rotatedarrow){
			if (p > 0) {
				uistate.chareditctx.lineTo((rotatedarrow[p][0] + sx_cx(this.P.x)), (rotatedarrow[p][1] + sy_cy(this.P.y)));
			}
		}

		uistate.chareditctx.lineTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));
		uistate.chareditctx.fill();
		uistate.chareditctx.stroke();
		
	}
	
	function drawHandles(drawH1, drawH2) {
		uistate.chareditctx.fillStyle = uistate.colors.accent;
		uistate.chareditctx.lineWidth = 1;
		var hp = _G.projectsettings.pointsize/2
		
		if(drawH1 && this.useh1){
			uistate.chareditctx.beginPath();
			uistate.chareditctx.arc(sx_cx(this.H1.x), sy_cy(this.H1.y), hp, 0, Math.PI*2, true);
			uistate.chareditctx.closePath();
			uistate.chareditctx.fill();
				
			uistate.chareditctx.beginPath();
			uistate.chareditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			uistate.chareditctx.lineTo(sx_cx(this.H1.x), sy_cy(this.H1.y)); 
			uistate.chareditctx.closePath();
			uistate.chareditctx.stroke();
		}

		if(drawH2 && this.useh2){
			uistate.chareditctx.beginPath();
			uistate.chareditctx.arc(sx_cx(this.H2.x), sy_cy(this.H2.y), hp, 0, Math.PI*2, true);
			uistate.chareditctx.closePath();
			uistate.chareditctx.fill();
			
			uistate.chareditctx.beginPath();
			uistate.chareditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			uistate.chareditctx.lineTo(sx_cx(this.H2.x), sy_cy(this.H2.y)); 
			uistate.chareditctx.closePath();
			uistate.chareditctx.stroke();
		}
	}

	