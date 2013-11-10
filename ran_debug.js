	var DEBUG = true;
	
	var debugq = new Array();
	var numlines = 5000;  // How many lines to show
	
	function debug(message, force){
		if(DEBUG | force){
			var d = new Date();
			debugq.unshift(d.getMinutes() + ":" + pads(d.getSeconds()) + "." + padms(d.getMilliseconds()) + " | " +message);
			document.getElementById("debug").innerHTML = "";
			
			if(debugq.length > numlines){
				debugq = debugq.slice(0,numlines);
			}
		}
	}
	
	function populateDebug(){
		var re = "<br>";
		for(var i=0; i<debugq.length; i++){
			re += "<br>";
			re += debugq[i];
		}
		re += "<br><br>";
		document.getElementById("debug").innerHTML = re;
	}
	
	function padms(num){
		num = ""+num;
		if(num.length == 3) return num;
		else if (num.length == 2) return "0"+num;
		else if (num.length == 1) return "00"+num;
	}
	
	function pads(num){
		num = ""+num;
		if(num.length == 2) return num;
		else if (num.length == 1) return "0"+num;
	}
	
	
	// -----------------
	// Timer
	// -----------------
	
	function timer(tag){
		this.begining = new Object();
		this.lapsarr = new Array();
		this.ending = new Object();
		this.name = tag;
		
		this.tstart = tstart;
		this.tlap = tlap;
		this.tstop = tstop;	
		this.tdebugout = tdebugout;
	}
	
	function tstart(tag){
		this.begining.time = new Date().getTime();
		this.begining.name = tag;
	}
	
	function tlap(tag){
		var l = new Object();
		l.time = new Date().getTime();
		l.name = tag;
		this.lapsarr.push(l);
	}
	
	function tstop(tag){
		this.ending.time = new Date().getTime();
		this.ending.name = tag;
				
		this.tdebugout();
	}
	
	function tdebugout(){
	
		var re = "TIMER<br><b><i>" + this.name + "</i></b>";
		re += "<table><tr><td><b>name</b></td><td><b>&nbsp;&nbsp;time</b></td><td><b>&nbsp;&nbsp;diff</b></td></tr>";
		re += "<tr><td><b>start</b> - " + this.begining.name + "</td><td>&nbsp;&nbsp;" + this.begining.time + "</td><td>&nbsp;&nbsp;-</td></tr>";
		
		for(var i=0; i<this.lapsarr.length; i++){
			re += "<tr><td>" + this.lapsarr[i].name + "</td><td>&nbsp;&nbsp;" + this.lapsarr[i].time + "</td>";
			
			if(i==0){
				re += "<td>&nbsp;&nbsp;" + (this.lapsarr[0].time - this.begining.time) + "</td></tr>";
			} else {
				re += "<td>&nbsp;&nbsp;" + (this.lapsarr[i].time - this.lapsarr[i-1].time) + "</td></tr>";
			}
		}
		
		re += "<tr><td><b>end</b> - " + this.ending.name + "</td><td>&nbsp;&nbsp;" + this.ending.time + "</td><td>&nbsp;&nbsp;" + (this.ending.time - this.lapsarr[this.lapsarr.length-1].time) + "</tr>";
		re += "<tr><td></td><td><b><i>&nbsp;&nbsp;total time:</i></b></td><td><b>&nbsp;&nbsp;" + (this.ending.time - this.begining.time) + "</b></td></tr></table>";

		debug(re);		
	}
	
	