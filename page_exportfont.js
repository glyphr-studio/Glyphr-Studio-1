
	function updateexportfont(){
		var con = document.getElementById("mainpane");
		con.innerHTML = "<div class='pagecontent'><h1>Export Font</h1>" + 
		"The XML code below is your font data.  To transform it into an OTF font, you must use a tool called TTX. " + 
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " + 
		"Copy the text below, and save it as an XML file (using a program like Notepad).  Once you have TTX installed, simply drag your .xml file over the TTX" + 
		"program icon, and an OTF font will be generated.<br><br>" + 
		"<textarea id='genoutput' style='width:1000px; height:600px; border:0px;'></textarea>" + 
		"<br><br></div>";
		
		populateSaveTTXXMLtextarea();
	}
	
	
	function saveAsTTXXML(){
	}

	function populateSaveTTXXMLtextarea(){
		var output = generateTTXXML();
		// Update the textbox
		document.getElementById("genoutput").value = output;
		document.getElementById("genoutput").select();
		CopiedTxt = document.selection.createRange();
		CopiedTxt.execCommand("Copy");
	}