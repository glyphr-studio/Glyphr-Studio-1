// start of file

//	-------------------------------
//	IMPORT FUNCTIONS
//	-------------------------------

	function importGlyphrProjectFromText(textcontent){
		debug('\n importGlyphrProjectFromText - START');

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
		if(major === 0) {
			fcontent = migrate_betas_to_v1(fcontent, minor);
			major = 1;
			minor = 0;
		}

		// Roll upgrades through v1
		if(major === 1){

			// Check for future versions
			if(minor > 0){ error_TimeTraveller(); return; }

			// Roll through minor versions
			switch (minor) {
				case 0:	// no updates
			}
		}

		// Update the version
		fcontent.projectsettings.versionnum = _UI.thisGlyphrStudioVersionNum;
		fcontent.projectsettings.version = _UI.thisGlyphrStudioVersion;

		// Hydrate after all updates
		hydrateGlyphrProject(fcontent);
	}

	function error_NoVersionFound(){
		document.getElementById("droptarget").innerHTML = "drop file here...";
		alert("File does not appear to be a Glyphr Project.  No version information was found.  Please try a different file...");
	}

	function error_TimeTraveller(){
		document.getElementById("droptarget").innerHTML = "drop file here...";
		alert("Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.");
	}

//	------------------------
//	MIGRATE
//	------------------------

	function migrate_betas_to_v1 (fcontent, minor) {
		debug('\n migrate_betas_to_v1 - START');
		debug(fcontent);
		// Start rolling upgrades

		switch (minor){
			case 3:
				debug("\t Minor Version === 3");
				fcontent = migrate_0_3_to_0_4(fcontent);
				minor = 4;
				debug('\t migrated to 0.4');
			case 4:
				debug("\t Minor Version === 4");
				fcontent = migrate_0_4_to_0_5(fcontent);
				minor = 5;
				debug('\t migrated to 0.5');
			case 5:
				debug("\t Minor Version === 5");
				fcontent = migrate_0_5_to_1_0(fcontent);

				debug('\t migrated to 1.0');
		}

		debug(' migrate_betas_to_v1 - END\n');
		return fcontent;
	}

	function migrate_0_5_to_1_0 (fc) {
		debug('\n migrate_0_5_to_1_0 - START');
		fc.glyphs = clone(fc.fontchars);
		fc.components = clone(fc.linkedshapes);
		delete fc.fontchars;
		delete fc.linkedshapes;

		var cs;
		for(var g in fc.glyphs){ if(fc.glyphs.hasOwnProperty(g)){
			cs = fc.glyphs[g].charshapes || [];
			// debug('\t Glyph ' + fc.glyphs[g].charname);
			for(var c=0; c<cs.length; c++){
				if(isval(cs[c].uselinkedshapexy)){
					// debug('\t\t shape ' + cs[c].name + ' uselsxy: ' + typeof cs[c].uselinkedshapexy + ' ' + cs[c].uselinkedshapexy);
					cs[c].usecomponentxy = cs[c].uselinkedshapexy;
					delete cs[c].uselinkedshapexy;
					// debug('\t\t now usecomxy: ' + cs[c].usecomponentxy);
				}
			}
		}}
		debug(fc);
		debug(' migrate_0_5_to_1_0 - END\n');
		return fc;
	}

	function migrate_0_4_to_0_5(fc) {
		debug('\n migrate_0_4_to_0_5 - START');
		var tc;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			tc.charwidth = tc.advancewidth || fc.projectsettings.upm || 1000;
		}
		debug(fc);
		debug(' migrate_0_4_to_0_5 - END\n');
		return fc;
	}

	function migrate_0_3_to_0_4(fc){
		debug('\n migrate_0_3_to_0_4 - START');
		newgp = new GlyphrProject();

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

		var newps = newgp.projectsettings;
		for(var e in fc.projectsettings){
			if(newps.hasOwnProperty(e)){
				newps[e] = fc.projectsettings[e];
			}
		}
		fc.projectsettings = newps;

		var tc, hex;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			if(tc){
				hex = "0x00"+tc.cmapcode.substr(2).toUpperCase();
				fc.fontchars[hex] = tc;
				fc.fontchars[hex].charhtml = hexToHTML(hex);
				//debug("migrate_0_3_to_0_4 - fc.fontchars[" + hex + "] is " + json(fc.fontchars[hex]));
			}
		}
		debug(fc);
		debug(' migrate_0_3_to_0_4 - END\n');
		return fc;
	}


//	-------------------------------
//	HYDRATE
//	-------------------------------

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
		for (var com in data.components) {
			if(data.components.hasOwnProperty(com)){
				_GP.components[com] = new Component(data.components[com]);
			}
		}

		// Glyphs
		for (var gl in data.glyphs) {
			if(data.glyphs.hasOwnProperty(gl)){
				_GP.glyphs[gl] = new Char(data.glyphs[gl]);
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
		_UI.history['glyph edit'] = new History('glyphs');
		_UI.history.components = new History('components');
		_UI.history.ligatures = new History('ligatures');
		_UI.history.kerning = new History('kerning');

		_UI.guides.leftgroup_xmax = new Guide(_UI.guides.leftgroup_xmax);
		_UI.guides.rightgroup_xmin = new Guide(_UI.guides.rightgroup_xmin);

		_UI.selectedchar = _UI.selectedchar || getFirstCharID();
		_UI.selectedcomponent = getFirstID(_GP.components);
		_UI.selectedkern = getFirstID(_GP.kerning);

		calculateDefaultView();
		resetThumbView();

		_UI.navhere = "glyph edit";


		// debug("finalizeGlyphrProject \t END\n");
	}

// end of file