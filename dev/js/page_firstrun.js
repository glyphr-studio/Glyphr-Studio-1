 // start of file

	function loadPage_firstrun(){
		// debug("LOADING PAGE >> loadPage_firstrun");

		var ct = "<table style='height:100%; width:100%;'><tr>"+
		"<td id='firstruntableleft' vertical-align='middle'><div id='splashscreenlogo'></div>"+
			"<div class='splashver'>"+_UI.thisGlyphrStudioVersion+"<br><br>"+
			"For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>"+
			"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
			"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
			"this license and its freeness stays intact.</td>"+
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
				debug('\n reader.onload - START');
				debug('\t filename: ' + f.name);
				var fname = f.name.split('.');
				fname = fname[fname.length-1].toLowerCase();
				var con;

				if(fname === 'svg') {
					_UI.droppedFileContent = reader.result;
					ioSVG_importSVGfont(false);
				} else if(fname === 'txt') {
					importGlyphrProjectFromText(reader.result);
					navigate();
				} else {
					con = 'Could not read .' + fname + ' file type.';
					con += '<br>Try loading another .svg or .txt file...';
					document.getElementById('droptarget').innerHTML = con;
					document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;
				}

				debug(' reader.onload - END\n');
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

		var fcontent = JSON.parse(textcontent);
		var vn = fcontent.projectsettings.versionnum;
		var v = fcontent.projectsettings.version;

		// debug(fcontent);

		if(v){
			/*
				CHECK VERSION
			*/
			if(!vn) vn = '0.3.0';	// Glyphr Studio V3 did not have 'versionnum' property
			vn = vn.split(".");
			// debug("\t versionnum found " + vn);

			var major = vn[0]*1;
			var minor = vn[1]*1;

			/* Major Version 0 */
			if(major === 0){
				// debug("\t Major Version = 0");
				// Start rolling upgrades
				if(minor === 3){
					// debug("\t Minor Version === 3");
					fcontent = migrateFromBetaThreeToFour(fcontent);
					minor = 4;
					// debug('\t migrated to 0.4');
				}

				if(minor === 4){
					// debug("\t Minor Version === 4");
					fcontent = migrateFromBetaFourToFive(fcontent);
					minor = 5;
					// debug('\t migrated to 0.5');
				}

				if(minor === 5){
					// debug("\t Minor Version === 5");
					hydrateGlyphrProject(fcontent);
					// debug("\t _GP after hydrate:");
					// debug(_GP);
				}

				if(minor > 5) {
					/* Minor Version greater than 0.5 */
					document.getElementById("droptarget").innerHTML = "drop file here...";
					alert("Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.");
				}
			} else {
				/* Major Version greater than 0 */
				document.getElementById("droptarget").innerHTML = "drop file here...";
				alert("Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.");
			}

		} else {
			/* No version found */
			document.getElementById("droptarget").innerHTML = "drop file here...";
			alert("File does not appear to be a Glyphr Project.  No version information was found.  Please try a different file...");
		}
	}

	function migrateFromBetaFourToFive(fc) {
		var tc;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrateFromBetaThreeToFour - fontchars " + i + " is " + tc);
			tc.charwidth = tc.advancewidth || fc.projectsettings.upm || 1000;
		}

		return fc;
	}

	function migrateFromBetaThreeToFour(fc){

		newfc = new GlyphrProject();

		var tls;
		for(var l in fc.linkedshapes){
			if(fc.linkedshapes.hasOwnProperty(l)){
				tls = fc.linkedshapes[l];
				//debug("migrateFromBetaThreeToFour - usedin before " + tls.usedin);
				if(tls.usedin){
					for(var u=0; u<tls.usedin.length; u++){
						tls.usedin[u] = decToHex(tls.usedin[u]);
					}
					//debug("migrateFromBetaThreeToFour - usedin after " + tls.usedin);
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
			//debug("migrateFromBetaThreeToFour - fontchars " + i + " is " + tc);
			if(tc){
				hex = "0x00"+tc.cmapcode.substr(2).toUpperCase();
				newfc.fontchars[hex] = tc;
				newfc.fontchars[hex].charhtml = hexToHTML(hex);
				//debug("migrateFromBetaThreeToFour - newfc.fontchars[" + hex + "] is " + json(newfc.fontchars[hex]));
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