//	-------------------------
//	Save GLYPHR JSON
//	-------------------------

	function triggerProjectFileDownload(){
		
		var jsonString = JSON.stringify(_G, undefined, '\t');
		jsonString = jsonString.replace(/\n/g, '\r\n');
		var blob = new Blob([jsonString], { type: "text/plain;charset=utf-8" });

		var link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = _G.projectsettings.name + " - Glyphr Project - " + genDateStampSuffix() + ".txt";
		link.click();

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
