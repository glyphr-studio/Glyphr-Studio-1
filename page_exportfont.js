
	function loadPage_exportfont(){
		debug("LOADING PAGE >> loadPage_exportfont");
		var con = document.getElementById("mainpane");
		con.innerHTML = "<div class='pagecontent textpage'><h1>Export Font</h1>" + 
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " + 
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " + 
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " + 
		"program icon, and an OTF font will be generated.<br><br>" + 
		"<input type='button' class='buttonsel' value='Generate TTX XML File' onclick='triggerTTXFileDownload()'></input>" + 
		"<br><br></div>";
	}