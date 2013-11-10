
	function updatesaveproject(){
		var con = "<div class='pagecontent textpage'><h1>Save Project</h1>" +
		"The code below is your Glyphr Project data.  It has been copied to your system clipboard. " +
		"To save your Glyphr Project, paste this code into a text file and save it. " +
		"The file that you save can then be imported via the Open menu.<br><br>" +
		"<textarea id='genoutput' style='width:1000px; height:600px; border:0px;'></textarea>" +
		"<br><br></div>";
		
		document.getElementById("mainpane").innerHTML = con;
		
		populateSaveJSTextarea();
	}
	
	//<input type='button' class='button' value=' Save as a Glyphr Project File ' onclick='saveAsJSFile()'><br><br>
	
	function saveAsJSFile(){
		debug("SAVEASJSFILE - top");
	    var bb = new BlobBuilder;
		debug("SAVEASJSFILE - past blob object");
		var output = generateGlyphrProjectJS();
		debug("SAVEASJSFILE - past generate");
		bb.append(output);
		debug("SAVEASJSFILE - past blob append");
		saveAs(bb.getBlob("text/plain;charset=utf-8"), "glyphr_project.js");
		debug("SAVEASJSFILE - bottom");
	}

	function populateSaveJSTextarea(){
		var output = generateGlyphrProjectJS();
		// Update the textbox
		document.getElementById("genoutput").value = output;
		document.getElementById("genoutput").select();
		CopiedTxt = document.selection.createRange();
		CopiedTxt.execCommand("Copy");
	}