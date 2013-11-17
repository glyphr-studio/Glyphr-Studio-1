
	function updateopenproject(){
		var ct = "<div class='pagecontent textpage'><h1>Open Project</h1>" +
		"<h2>But wait!</h2>If you open a new project, your current project will be lost.  Be sure to download a Glyphr " +
		"project file if you want to save your current project.<br><br>\
		<input type='button' class='button'style='padding:10px;' value='Save current project' onclick='triggerProjectFileDownload();'/><br><br>" +
		"<h2>Okay, now...</h2>";
		
		ct += importOrCreateNew();
		ct += "</div>";
		
		document.getElementById("mainpane").innerHTML = ct;
	}
	
	function updatefirstrun(){
		//debug("UPDATEFIRSTRUN");
		var ct = "<div class='splashscreen textpage'><canvas id='splashscreencanvas' height=494 width=800></canvas>";
		ct += "<div class='splashver'>"+thisGlyphrStudioVersion+"<br><br>";
		ct += "For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>";
		ct += "Glyphr Studio is licensed under a <a href='http://creativecommons.org/licenses/by-sa/3.0/' target=_new>Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br>";
		ct += "Which basically means you can use Glyphr Studio for commercial purposes, remix and adapt Glyphr Studio to your own needs, and re-share Glyphr Studio with the same license applied.";
		ct += "</div>";
		ct += importOrCreateNew();
		ct += "</div>";
		
		var mp = document.getElementById("mainpane");
		mp.innerHTML = ct;
		mp.style.marginLeft = "0px";
		document.getElementById("navprimarypane").style.display = "none";
		document.getElementById("navtargetpane").style.display = "none";
		document.getElementById("logocanvas").style.display = "none";
  		document.getElementById("droptarget").addEventListener('dragover', handleDragOver, false);
  		document.getElementById("droptarget").addEventListener('drop', handleDrop, false);

		drawSplashScreen();
	}

	function handleDrop(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var fcontent = "";

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				fcontent = JSON.parse(reader.result);
				if(fcontent.settings.version){
					GlyphrProject = fcontent;
					debug("Loading project; " + GlyphrProject.fontmetadata.familyname);
					finalizeGlyphrProject();
				} else {
					alert("File does not appear to be a Glyphr Project, try again...");
				}
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
		
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}


	function importOrCreateNew(){
		var con = "<table style='width:100%;'><tr><td style='padding-right:50px; width:50%;'>"+
						"<div id='droptarget' style='display:block; border:1px dashed #DDDDDD; padding:0px 0px 20px 4px;'>"+
							"<h3>Drop an existing<br>Glyphr Project here</h3>"+
							"<div id='loadingfile' style='display:none;'><i>loading file...</i></div>"+
						"</div>"+
					"</td><td style='width:50%;'>"+
						"<h3>Start a new<br>Glyphr Project</h3>"+
						"Font name:<br>"+
						"<input id='newfontname' type='text' value='My New Font' style='width:100%; margin:10px 0px 10px 0px; color:#333333;' /><br>"+
						"<input type='button' class='buttonsel' value=' Start a new font from scratch ' onclick='newGlyphrProject()'><br><br>"+
					"</td></tr></table>";
		
		return con;
	}
	
	function createNewGlyphrProject(){    
		var gp = new Object();
		
		gp.fontchars = createNewFontObject();
		
		gp.seedshapes = new Array();
		gp.seedshapes['id0'] = new Object();
		gp.seedshapes['id0'].usedin = new Array();
		gp.seedshapes['id0'].shape = new shape("default seedshape");
	
		gp.settings = new Object();
		gp.settings.version = 'Beta 2 Working Edition - 0.2.2012.xx.xx.Working';
		gp.settings.seedshapecounter = 0;
		gp.settings.upm = 2048;										// Units Per Em - (emsize) how tall normal cap letters are		
		gp.settings.griddivisions = 16;								// how many squares of grid per emsize
		gp.settings.xheight = (9/gp.settings.griddivisions);		// % of emsize lowercase letter height
		gp.settings.descender = (4/gp.settings.griddivisions);		// % of emsize descender
		gp.settings.overshoot = (1/(gp.settings.griddivisions*8));	// % of emsize overshoot for round glyphs
		gp.settings.kerning = (1/gp.settings.griddivisions);		// default kerning, as a % of emsize
	
		var fn = document.getElementById("newfontname").value;
		gp.fontmetadata = new Object();
		gp.fontmetadata.familyname = (fn? fn : "My Font");
		gp.fontmetadata.subfamilyname = "Regular";
		gp.fontmetadata.genericfamilyname = 'Sans-Serif';
		gp.fontmetadata.fullname = gp.fontmetadata.familyname;
		gp.fontmetadata.version = "Version 1.0";
		gp.fontmetadata.copyright = "© Copyright 2012";
		gp.fontmetadata.manufacturername = "";
		gp.fontmetadata.manufacturerurl = "";
		gp.fontmetadata.designername = "";
		gp.fontmetadata.designerurl = "";
		gp.fontmetadata.description = "";
		gp.fontmetadata.licensedescription = "You are free to share, copy, distribute and transmit the work.  You are free to remix and adapt the work.  You are free to make commercial use of the work. You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work). If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.";
		gp.fontmetadata.licenseurl = "http://creativecommons.org/licenses/by-sa/3.0/";
		gp.fontmetadata.weightclass = "400";
		gp.fontmetadata.widthclass = "5";
		
		selectedchar = 97;
		selectedshape = -1;	
		
		return gp;
	}
	
	function newGlyphrProject(){
		GlyphrProject = createNewGlyphrProject();
		finalizeGlyphrProject();
	}
	
	function finalizeGlyphrProject(){
		debug("FINALIZEGLYPHRPROJECT - start of function");
		charcurrstate = clone(GlyphrProject.fontchars);
		seedcurrstate = clone(GlyphrProject.seedshapes);
		var fs = GlyphrProject.settings;
		debug("FINALIZEGLYPHRPROJECT - checking GP.settings: " + fs);
		debug("FINALIZEGLYPHRPROJECT - fs.seedshapecounter: " + fs.seedshapecounter);
		
		if(isval(fs.seedshapecounter)){
			seedshapecounter = fs.seedshapecounter;
		} else {
			seedshapecounter = 0;
		}
		
		debug("FINALIZEGLYPHRPROJECT - After seedshapecounter: " + seedshapecounter);
		
		selectedchar = 97;
		shownseedshape = getFirstSeedShape();
		
		setupCECandCGC();
		
		navhere = "character edit";
		navigate();
	}