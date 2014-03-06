var LoadPage = function() {};

	LoadPage.prototype.loadPage_openproject = function() {
		debug("LOADING PAGE >> loadPage_openproject");
		var ct = "<div class='pagecontent textpage'><h1>Open Project</h1>" +
		"<h2>But wait!</h2>If you open a new project, your current project will be lost.  Be sure to download a Glyphr " +
		"project file if you want to save your current project.<br><br>" +
		"<input type='button' class='button'style='padding:10px;' value='Save current project' onclick='triggerProjectFileDownload();'/><br><br>" +
		"<h2>Okay, now...</h2>";
		
		ct += this.importOrCreateNew();
		ct += "</div>";
		
		document.getElementById("mainwrapper").innerHTML = ct;
		document.getElementById("droptarget").addEventListener('dragover', this.handleDragOver, false);
		document.getElementById("droptarget").addEventListener('drop', this.handleDrop, false);
	};
	
	LoadPage.prototype.loadPage_firstrun = function() {
		debug("LOADING PAGE >> loadPage_firstrun");
		var ct = "<div class='splashscreen textpage'><canvas id='splashscreencanvas' height=494 width=800></canvas>";
		ct += "<div class='splashver'>"+_UI.thisGlyphrStudioVersion+"<br><br>";
		ct += "For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>";
		ct += "Glyphr Studio is licensed under a <a href='http://creativecommons.org/licenses/by-sa/3.0/' target=_new>Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br>";
		ct += "Which basically means you can use Glyphr Studio for commercial purposes, remix and adapt Glyphr Studio to your own needs, and re-share Glyphr Studio with the same license applied.";
		ct += "</div>";
		ct += this.importOrCreateNew();
		ct += "</div>";
		
		var mp = document.getElementById("mainwrapper");
		mp.innerHTML = ct;
		mp.style.marginLeft = "0px";
/*
		document.getElementById("navarea_tabs").style.display = "none";
		document.getElementById("navarea_panel").style.display = "none";
		document.getElementById("logocanvas").style.display = "none";
		*/
		document.getElementById("droptarget").addEventListener('dragover', this.handleDragOver, false);
		document.getElementById("droptarget").addEventListener('drop', this.handleDrop, false);

		drawSplashScreen();
	};

	LoadPage.prototype.hydrateGlyphrProject = function(data) {
		_GP = clone(_UI.default_GP);
		
		// Project Settings
		if(data.projectsettings) _GP.projectsettings = clone(data.projectsettings);
		
		// Open Type Properties
		if(data.opentypeproperties) _GP.opentypeproperties = clone(data.opentypeproperties);

		// Linked Shapes
		for (var ssid in data.linkedshapes) {
			if(data.linkedshapes.hasOwnProperty(ssid)){
				_GP.linkedshapes[ssid] = new LinkedShape(data.linkedshapes[ssid]);
			}
		}
		
		// Characters
		for (var i = 0; i < data.fontchars.length; i++) {
			if(data.fontchars[i]){
				_GP.fontchars[i*1] = new Char(data.fontchars[i]);
			}
		}

		//debug("\n\nHDRYATEGLYPHRPROJECT: PASSED \n" + JSON.stringify(data));
		//debug("\n\nHDRYATEGLYPHRPROJECT: HYDRATED \n" + JSON.stringify(_GP));

		this.finalizeGlyphrProject();
	};

	LoadPage.prototype.importOrCreateNew = function(){
		var con = "<table style='width:100%;'><tr><td style='padding-right:50px; width:45%;'>"+
						"<h3>Load an existing Glyphr Project</h3>"+
						"<div id='droptarget'>drop file here...</div>"+
					"</td><td style='width:9%'>&nbsp;</td>"+
					"</td><td style='width:45%;'>"+
						"<h3>Start a new Glyphr Project</h3>"+
						"Project name: &nbsp; <input id='newprojectname' type='text' value='My Font'/><br>"+
						"<input type='button' class='buttonsel' value=' Start a new font from scratch ' onclick='LoadPage.newGlyphrProject()'><br><br>"+
					"</td></tr></table>";
		
		return con;
	};
		
	LoadPage.prototype.newGlyphrProject = function(){
		var fn = document.getElementById("newprojectname").value;
		fn = (fn? fn : "My Font");
		
		_GP = clone(_UI.default_GP);
		
		_GP.projectsettings.name = fn;
		_GP.opentypeproperties.name[1].val = fn;
		_GP.opentypeproperties.name[3].val = (fn + " 1.0");
		_GP.opentypeproperties.name[4].val = fn;
		_GP.opentypeproperties.name[6].val = fn;
		setOTprop("cff", "FullName", fn);
		setOTprop("cff", "FamilyName", fn);

		setOTprop("head", "created", ttxDateString());
		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;

		_GP.fontchars = createNewFontcharsArray();
	
		_GP.linkedshapes = {};
		_GP.linkedshapes["id0"] = new LinkedShape({"shape": new Shape({})});

		this.finalizeGlyphrProject();
	};
	
	LoadPage.prototype.finalizeGlyphrProject = function(){
		//debug("FINALIZEGLYPHRPROJECT - start of function");
		_UI.charcurrstate = clone(_GP.fontchars);
		_UI.linkcurrstate = clone(_GP.linkedshapes);
		
		if(!isval(_GP.projectsettings.linkedshapecounter)){
			_GP.projectsettings.linkedshapecounter = 0;
		}

		_UI.selectedchar = 97;
		_UI.shownlinkedshape = getFirstLinkedShape();
		
		resetThumbView();

		_UI.navhere = "character edit";
		navigate();
	};

	LoadPage.prototype.loadPage_exportfont = function(){
		debug("LOADING PAGE >> loadPage_exportfont");
		var con = document.getElementById("mainwrapper");
		con.innerHTML = "<div class='pagecontent textpage'><h1>Export Font</h1>" +
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " +
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " +
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " +
		"program icon, and an OTF font will be generated.<br><br>" +
		"<input type='button' class='buttonsel' value='Generate TTX XML File' onclick='triggerTTXFileDownload()'></input>" +
		"<br><br></div>";
	};

	// Event Handlers

	LoadPage.prototype.handleDrop = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var fcontent = "";

		document.getElementById("droptarget").innerHTML = "Loading File...";
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				fcontent = JSON.parse(reader.result);
				if(fcontent.projectsettings.version){
					LoadPage.hydrateGlyphrProject(fcontent);
					//debug("Loading project; " + _GP.projectsettings.name);
				} else {
					document.getElementById("droptarget").innerHTML = "drop file here...";
					alert("File does not appear to be a Glyphr Project, try again...");
				}
			};
		})(f);

		reader.readAsText(f);
		
	};

	LoadPage.prototype.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	};