
//	------------------------
//	Save as a TTX XML
//	------------------------

	function triggerTTXFileDownload(){

		var link = document.createElement('a');
		link.href = 'data:text/plain,' + generateTTXXML();
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? "0" : "") + d.getMinutes();
		var sec = (d.getSeconds()<10? "0" : "") + d.getSeconds();
		
		link.download = "TTX Data - " + _G.fontsettings.familyname + " - " +yr+"."+mo+"."+day+"-"+hr+"."+min+"."+sec+".xml";
		link.click();
	}

	function generateTTXXML(){

		return (h1 + _G.fontchars[65].charglyphdata[0].genPostScript() + h2);


	}
