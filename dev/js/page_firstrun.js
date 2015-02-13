 // start of file

	function loadPage_firstrun(){
		// debug("LOADING PAGE >> loadPage_firstrun");

		var ct = "<table style='height:100%; width:100%;'><tr>"+
		"<td id='firstruntableleft' vertical-align='middle'><div id='splashscreenlogo'></div>"+
			"<div class='splashver'>"+_UI.thisGlyphrStudioVersion+"<br>"+
			"<div class='splashver'>"+_UI.thisGlyphrStudioVersionNum+"<br></div>"+
			"For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>"+
			"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
			"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
			"this license and its freeness stays intact.</div></td>"+
		"<td id='firstruntableright' vertical-align='middle'>" + make_ImportOrCreateNew() + "</td>"+
		"</tr></table>";

		var mp = document.getElementById("mainwrapper");
		mp.innerHTML = ct;
		mp.style.marginLeft = "0px";
		document.getElementById("firstruntableright").addEventListener('dragover', handleDragOver, false);
		document.getElementById("firstruntableright").addEventListener('drop', handleDrop, false);
		document.getElementById("firstruntableright").addEventListener('dragleave', handleDragLeave, false);
		document.getElementById("firstruntableleft").addEventListener('dragover', handleDragOver, false);
		document.getElementById("firstruntableleft").addEventListener('drop', handleDrop, false);
		document.getElementById("firstruntableleft").addEventListener('dragleave', handleDragLeave, false);
		window.addEventListener('message', handleMessage, false);
		if ( window.opener ) { window.opener.postMessage('ready', '*'); }

		document.getElementById('splashscreenlogo').innerHTML = makeGlyphrStudioLogo({'fill':'white', 'width':400});
	}

	function make_ImportOrCreateNew(){

		var con = "<div class='newtile'>"+
					"<h2>drag and drop to load a file</h2>"+
					"<div id='droptarget'>Glyphr Project File (.txt)<br>SVG Font File (.svg)</div>"+
					"<div style='width:335px;'>"+ makeErrorMessageBox() + "</div>"+
				"</div>";
		con += "<div class='newtile'>"+
					"<h2>Start a new Glyphr Project</h2>"+
					"Project name: &nbsp; <input id='newprojectname' type='text' value='My Font'/><br>"+
					"<button onclick='newGlyphrProject(); navigate();' class='buttonsel'>Start a new font from scratch</button>"+
				"</div>";
		return con;
	}

	function handleDrop(evt) {
		document.getElementById("droptarget").innerHTML = "Loading File...";
		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;

		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function() {
			return function(e) {
				// debug('\n reader.onload - START');
				// debug('\t filename: ' + f.name);
				var fname = f.name.split('.');
				fname = fname[fname.length-1].toLowerCase();
				var con;

				if(fname === 'svg') {
					// debug('\t File = .svg');
					_UI.droppedFileContent = reader.result;
					ioSVG_importSVGfont(false);
				} else if(fname === 'txt') {
					// debug('\t File = .txt');
					importGlyphrProjectFromText(reader.result);
					navigate();
				} else {
					con = 'Could not read .' + fname + ' file type.';
					con += '<br>Try loading another .svg or .txt file...';
					document.getElementById('droptarget').innerHTML = con;
					document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;
				}

				// debug(' reader.onload - END\n');
			};
		})(f);

		reader.readAsText(f);

	}

	function handleMessage(evt) {
		_UI.droppedFileContent = evt.data;
		ioSVG_importSVGfont(false);
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'move';

		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.blue.l95;
		document.getElementById('droptarget').innerHTML = 'Drop it!';
	}

	function handleDragLeave(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;
		document.getElementById('droptarget').innerHTML = 'Glyphr Project File (.txt)<br>SVG Font File (.svg)';
	}

//	-------------------------------
//	IMPORT FUNCTIONS
//	-------------------------------

	function importGlyphrProjectFromText(textcontent){
		// debug("IMPORTGLYPHRPROJECTFROMTEXT");

		var fcontent;
		try { fcontent = JSON.parse(textcontent); } catch(e) { fcontent = {}; }

		var vn = false;
		var v = false;
		if(fcontent.projectsettings){
			vn = fcontent.projectsettings.versionnum;
			v = fcontent.projectsettings.version;
		}

		// debug(fcontent);

		// Check for non Glyphr Project Files
		if(!v) { error_NoVersionFound(); return; }

		// Give pre-Beta-3 accurate version
		if(!vn) vn = '0.3.0';

		vn = vn.split(".");
		var major = vn[0]*1;
		var minor = vn[1]*1;
		var patch = vn[2]*1;
		// debug("\t versionnum found " + vn);

		// Check for future versions
		if(major > 1){ error_TimeTraveller(); return; }

		// Roll upgrades through Beta
		if(major === 0) fcontent = migrate_0_5_to_1_00(fcontent, minor); 

		// Roll upgrades through v1
		if(major === 1){

			// Check for future versions
			if(minor > 0){ error_TimeTraveller(); return; }

			// Roll through minor versions
			switch (minor) {
				case 0:	hydrateGlyphrProject(fcontent);
			}
		}
	}

	function error_NoVersionFound(){
		document.getElementById("droptarget").innerHTML = "drop file here...";
		alert("File does not appear to be a Glyphr Project.  No version information was found.  Please try a different file...");
	}

	function error_TimeTraveller(){
		document.getElementById("droptarget").innerHTML = "drop file here...";
		alert("Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.");
	}

	function migrate_0_5_to_1_00 (fcontent, minor) {
		// Start rolling upgrades

		switch (minor){
			case 3:
				// debug("\t Minor Version === 3");
				fcontent = migrate_0_3_to_0_4(fcontent);
				minor = 4;
				// debug('\t migrated to 0.4');
			case 4:
				// debug("\t Minor Version === 4");
				fcontent = migrate_0_4_to_0_5(fcontent);
				minor = 5;
				// debug('\t migrated to 0.5');
			case 5:
				// debug("\t Minor Version === 5");
				// fcontent = migrateFromBetaFiveToVersionOne(fcontent);
		}

		return fcontent;
	}

	function migrate_0_4_to_0_5(fc) {
		var tc;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			tc.charwidth = tc.advancewidth || fc.projectsettings.upm || 1000;
		}

		return fc;
	}


	function migrate_0_3_to_0_4(fc){

		newfc = new GlyphrProject();

		var tls;
		for(var l in fc.linkedshapes){
			if(fc.linkedshapes.hasOwnProperty(l)){
				tls = fc.linkedshapes[l];
				//debug("migrate_0_3_to_0_4 - usedin before " + tls.usedin);
				if(tls.usedin){
					for(var u=0; u<tls.usedin.length; u++){
						tls.usedin[u] = decToHex(tls.usedin[u]);
					}
					//debug("migrate_0_3_to_0_4 - usedin after " + tls.usedin);
				}
			}
		}
		newfc.linkedshapes = fc.linkedshapes;

		for(var e in fc.projectsettings){
			if(newfc.projectsettings.hasOwnProperty(e)){
				newfc.projectsettings[e] = fc.projectsettings[e];
			}
		}

		var tc, hex;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			if(tc){
				hex = "0x00"+tc.cmapcode.substr(2).toUpperCase();
				newfc.fontchars[hex] = tc;
				newfc.fontchars[hex].charhtml = hexToHTML(hex);
				//debug("migrate_0_3_to_0_4 - newfc.fontchars[" + hex + "] is " + json(newfc.fontchars[hex]));
			}
		}

		return newfc;
	}

	function hydrateGlyphrProject(data) {
		// debug("\n hydrateGlyphrProject - START");
		// debug("\t passed: ");
		// debug(data);

		_GP = new GlyphrProject();
		// var oggp = new GlyphrProject();

		// Project Settings
		// merge settings to conform to current .projectsettings
		// but not guides, because they can be custom
		var dataguides = clone(data.projectsettings.guides);
		if(data.projectsettings) {
			_GP.projectsettings = merge(_GP.projectsettings, data.projectsettings);
			_GP.projectsettings.charrange.custom = data.projectsettings.charrange.custom || [];
		}

		// debug('\t merged projectsettings');
		// debug(_GP.projectsettings);

		// Guides
		// Import all gudes
		for (var g in dataguides) {
			if(dataguides.hasOwnProperty(g)){
				_GP.projectsettings.guides[g] = new Guide(dataguides[g]);
			}
		}

		// debug('\t hydrated guides');
		// debug(_GP.projectsettings.guides);

		// Metadata
		if(data.metadata) _GP.metadata = merge(_GP.metadata, data.metadata);

		// Linked Shapes
		for (var lsid in data.linkedshapes) {
			if(data.linkedshapes.hasOwnProperty(lsid)){
				_GP.linkedshapes[lsid] = new LinkedShape(data.linkedshapes[lsid]);
			}
		}

		// Characters
		for (var ch in data.fontchars) {
			if(data.fontchars.hasOwnProperty(ch)){
				_GP.fontchars[ch] = new Char(data.fontchars[ch]);
			}
		}

		// Ligatures
		for (var lig in data.ligatures) {
			if(data.ligatures.hasOwnProperty(lig)){
				_GP.ligatures[lig] = new Char(data.ligatures[lig]);
			}
		}

		// Kerning
		for (var pair in data.kerning){
			if(data.kerning.hasOwnProperty(pair)){
				_GP.kerning[pair] = new HKern(data.kerning[pair]);
			}
		}

		// debug('\t hydrated: ');
		// debug(_GP);
		// debug("hydrateGlyphrProject - END\n");

		finalizeGlyphrProject();
		//navigate();
	}

	// Takes a template object of expected keys and default values
	// and an object to import, and overwites template values if
	// they exist in the imported object
	function merge(template, importing) {
		for(var a in template){
			if(template.hasOwnProperty(a)){
				if(typeof template[a] === 'object'){
					if(importing.hasOwnProperty(a)) template[a] = merge(template[a], importing[a]);
				} else {
					if(importing.hasOwnProperty(a)) template[a] = importing[a];
				}
			}
		}

		return template;
	}

	function newGlyphrProject(){
		var fn;
		if(document.getElementById('newprojectname') && document.getElementById('newprojectname').value){
			fn = document.getElementById('newprojectname').value;
		} else {
			fn = 'My Font';
		}

		_GP = new GlyphrProject();

		_GP.projectsettings.name = fn;
		_GP.metadata.font_family = fn;

		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;
		_GP.projectsettings.versionnum =  _UI.thisGlyphrStudioVersionNum;

		getChar('0x0020', true).isautowide = false;
		getChar('0x0020', true).charwidth = _GP.projectsettings.upm/2;
		getChar('0x0041', true);

		finalizeGlyphrProject();
		//navigate();
	}


	function finalizeGlyphrProject(){
		// debug("\nfinalizeGlyphrProject \t START");

		// UI Defaults
		_UI.history['character edit'] = new History('fontchars');
		_UI.history['linked shapes'] = new History('linkedshapes');
		_UI.history.ligatures = new History('ligatures');
		_UI.history.kerning = new History('kerning');

		_UI.guides.leftgroup_xmax = new Guide(_UI.guides.leftgroup_xmax);
		_UI.guides.rightgroup_xmin = new Guide(_UI.guides.rightgroup_xmin);

		_UI.selectedchar = _UI.selectedchar || getFirstCharID();
		_UI.selectedlinkedshape = getFirstID(_GP.linkedshapes);
		_UI.selectedkern = getFirstID(_GP.kerning);

		calculateDefaultView();
		resetThumbView();

		_UI.navhere = "character edit";


		// debug("finalizeGlyphrProject \t END\n");
	}

// end of file