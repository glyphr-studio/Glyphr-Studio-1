
	function loadPage_exportfont(){
		debug("LOADING PAGE >> loadPage_exportfont");
		var content = "<div class='pagecontent textpage'><h1>Export Font</h1>" +
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " +
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " +
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " +
		"program icon, and an OTF font will be generated.<br><br>" +
		"<button class='buttonsel' onclick='triggerTTXFileDownload()'>Generate TTX XML File</button>" +
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}