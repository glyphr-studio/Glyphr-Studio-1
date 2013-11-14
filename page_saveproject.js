
	function updatesaveproject(){
		var con = "<div class='pagecontent textpage'><h1>Save Project</h1>" +
		"The code below is your Glyphr Project data.  It has been copied to your system clipboard. " +
		"To save your Glyphr Project, paste this code into a text file and save it. " +
		"The file that you save can then be imported via the Open menu.<br><br>" +
		"<textarea id='genoutput' style='width:1000px; height:600px; border:0px;'></textarea>" +
		"<br><br></div>";
		
		document.getElementById("mainpane").innerHTML = con;
		
		triggerProjectFileDownload();
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

	function triggerProjectFileDownload(){
		//JSON CONVERSION!!!!!!
		//var output = generateGlyphrProjectJS();
		var output = niceJSON(JSON.stringify(GlyphrProject));

		// Update the textbox
		document.getElementById("genoutput").value = output;
		/*
		document.getElementById("genoutput").select();
		CopiedTxt = document.selection.createRange();
		CopiedTxt.execCommand("Copy");
		*/
		var link = document.createElement('a');
		link.href = 'data:text/plain,' + JSON.stringify(GlyphrProject);
		//link.download = (new Date()).getTime().toString(36) + '.txt';
		var d = new Date();
		link.download = GlyphrProject.fontmetadata.familyname + " - Glyphr Project - " + d.getFullYear() + "." + (d.getMonth()+1) + "." + d.getDate() + "." + d.getHours() + "." + d.getMinutes() + "." + d.getMilliseconds() + ".txt";
		link.click();
	}

	function niceJSON (pj) {
		var tchar; 
		var tab = 0;
		var nj = "";

		function tabs() {
			for(var t=0; t<tab; t++) nj += "\t";
		}

		for (var curr = 0; curr < pj.length; curr++) {
			if(pj.substr(curr, 3) === '"{"'){
				nj += '"{"';
				curr += 3;
			} else if (pj.substr(curr, 3) === '"}"'){
				nj += '"}"';
				curr += 3;
			} else if(pj.substr(curr, 3) === '"["'){
				nj += '"["';
				curr += 3;
			} else if (pj.substr(curr, 3) === '"]"'){
				nj += '"]"';
				curr += 3;
			} else if (pj.substr(curr, 2) === '[]'){
				nj += '[]';
				curr ++;
			} else {
				tchar = pj.substr(curr, 1);
				
				if(tchar === "{"){
					nj += "\n"
					tabs();
					nj += "{\n";
					tab++;
					tabs();

				} else if(tchar === "["){
					nj += "\n"
					tabs();
					nj += "[\n";
					tab++;
					tabs();

				} else if(tchar === "}"){
					tab--;
					nj += "\n";
					tabs();	
					nj += "}";
					if(pj.substr(curr+1, 1) === ","){
						nj += ",";
						curr++;
					}
				
				} else if(tchar === "]"){
					tab--;
					nj += "\n";
					tabs();	
					nj += "]";
					if(pj.substr(curr+1, 1) === ","){
						nj += ",";
						curr++;
					}
									
				} else {
					nj += tchar;
				}
			}
		}

		return pj + "\n\n\n" + nj;
	}