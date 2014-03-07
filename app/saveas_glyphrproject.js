//	-------------------------
//	Save GLYPHR JSON
//	-------------------------

	function triggerProjectFileDownload(){
		
		var jsonString = JSON.stringify(_GP, undefined, '\t');
		jsonString = jsonString.replace(/\n/g, '\r\n');
		var fblob = new Blob([jsonString], {"type":"text/plain;charset=utf-8", "endings":"native"});
		var fname =  _GP.projectsettings.name + " - Glyphr Project - " + genDateStampSuffix() + ".txt";
		
		try {
			// IE
			window.navigator.msSaveBlob(fblob, fname);
		} catch (err) {
			// Others
			var link = document.createElement('a');
			//window.URL = window.URL || window.webkitURL;
			link.href = window.URL.createObjectURL(fblob);
			//link.onclick = ("alert("+window.URL.createObjectURL(fblob)+");");
			link.download = fname;

			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, false);
			link.dispatchEvent(event); 
		}

		setProjectAsSaved();
	}

	function genDateStampSuffix(){
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();

		return (""+yr+"."+mo+"."+day+"-"+hr+"."+min+"."+sec);
	}
