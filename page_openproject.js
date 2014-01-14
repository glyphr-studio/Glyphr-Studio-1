
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
		ct += "<div class='splashver'>"+uistate.thisGlyphrStudioVersion+"<br><br>";
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
		showLoading();
		document.getElementById("droptarget").innerHTML = "Loading File...";
		
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
				if(fcontent.projectsettings.version){
					_G = hydrateGlyphrProject(fcontent);
					//debug("Loading project; " + _G.fontsettings.familyname);
					finalizeGlyphrProject();
				} else {
					document.getElementById("droptarget").innerHTML = "drop file here...";
					alert("File does not appear to be a Glyphr Project, try again...");
				}
			};
		})(f);

		reader.readAsText(f);
		
	}

	function hydrateGlyphrProject(data) {
		for (var i = 0; i < data.fontchars.length; i++) {
			// Shapes
			if(data.fontchars[i]){
				var cgd = data.fontchars[i].charshapes; 
				if(cgd.length){
					for (var j = 0; j < cgd.length; j++) {
						cgd[j] = new Shape(cgd[j]);
					};
				}
			}
		}

		// Seed Shapes
		//debug("HYDRATEGLYPHRPROJECT before 'for/in' loop \n" + JSON.stringify(data.seedshapes));
		for (var ssid in data.seedshapes) {
			//debug("HYDRATEGLYPHRPROJECT hydrating seedshape " + ssid)
			var ss = data.seedshapes.ssid;
			if(ss){ ss = new SeedShape(ss); }
		}

		//debug("HDRYATEGLYPHRPROJECT: JSON \n" + JSON.stringify(data));
		return data;
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}


	function importOrCreateNew(){
		var con = "<table style='width:100%;'><tr><td style='padding-right:50px; width:50%;'>"+
						"<h3>Load an existing<br>Glyphr Project</h3>"+
						"<div id='droptarget'>drop file here...</div>"+
					"</td><td style='width:50%;'>"+
						"<h3>Start a new<br>Glyphr Project</h3>"+
						"Font name:<br>"+
						"<input id='newfontname' type='text' value='My New Font'/><br>"+
						"<input type='button' class='buttonsel' value=' Start a new font from scratch ' onclick='newGlyphrProject()'><br><br>"+
					"</td></tr></table>";
		
		return con;
	}
		
	function newGlyphrProject(){
		var fn = document.getElementById("newfontname").value;
		fn = (fn? fn : "My Font");

		_G.fontsettings.familyname = fn;
		_G.fontsettings.fullname = fn;

		_G.fontchars = createNewFontObject();
	
		_G.seedshapes = {};
		_G.seedshapes["id0"] = new SeedShape({});

		finalizeGlyphrProject();
	}
	
	function finalizeGlyphrProject(){
		//debug("FINALIZEGLYPHRPROJECT - start of function");
		uistate.charcurrstate = clone(_G.fontchars);
		uistate.seedcurrstate = clone(_G.seedshapes);
		var ps = _G.projectsettings;
		//debug("FINALIZEGLYPHRPROJECT - checking GP.settings: " + ps);
		//debug("FINALIZEGLYPHRPROJECT - ps.seedshapecounter: " + ps.seedshapecounter);
		
		if(isval(ps.seedshapecounter)){
			seedshapecounter = ps.seedshapecounter;
		} else {
			seedshapecounter = 0;
		}
		
		//debug("FINALIZEGLYPHRPROJECT - After seedshapecounter: " + seedshapecounter);
		
		uistate.selectedchar = 97;
		uistate.shownseedshape = getFirstSeedShape();
		
		setupCECandCGC();
		
		uistate.navhere = "character edit";
		navigate();
	}

	function setupCECandCGC(){
		uistate.calcmaxesghostcanvassettings.size = _G.fontsettings.upm*1.75;
		uistate.calcmaxesghostcanvassettings.originx = _G.fontsettings.upm*.25;
		uistate.calcmaxesghostcanvassettings.originy = _G.fontsettings.upm*1.25;	
	}