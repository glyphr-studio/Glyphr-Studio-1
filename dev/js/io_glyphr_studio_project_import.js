// start of file
/**
	IO > Import > Glyphr Studio Project
	Handling backwards compatibility for old Glyphr
	Studio projects via rolling upgrades.  Once
	a project has the current format, they are
	'hydrated' from simple text / JSON to full
	Glyphr Studio Objects, and saved to the _GP
	global variable.
**/

//	-------------------------------
//	IMPORT FUNCTIONS
//	-------------------------------

	function importGlyphrProjectFromText(){
		// debug('\n importGlyphrProjectFromText - START');

		var fcontent;
		try {
			fcontent = JSON.parse(_UI.droppedFileContent);
		} catch(e) {
			fcontent = {};
		}

		var tempvn = false;
		var v = false;
		var ps = fcontent.projectsettings;
		if(ps){
			tempvn = ps.versionnum;
			v = ps.version;
		}
		// debug(fcontent);


		// Check for non Glyphr Project Files
		if(!v) { error_NoVersionFound(); return; }


		// Give pre-Beta-3 accurate version
		if(!tempvn) {
			tempvn = '0.3.0';
			ps.initialversionnum = '0.3.0';
		}
		if(!ps.initialversionnum) ps.initialversionnum = tempvn;


		// Start working with the project version number
		function parseVersionNum(vn) {
			vn = vn.split(".");
			return {
				'major' : (vn[0]*1),
				'minor' : (vn[1]*1),
				'patch' : (vn[2]*1)
			};
		}

		var projvn = parseVersionNum(tempvn);
		var currvn = parseVersionNum(_UI.thisGlyphrStudioVersionNum);
		// debug("\t versionnum found " + tempvn);


		// Check for future versions
		if(projvn.major > currvn.major){ error_TimeTraveller(); return; }


		// Roll upgrades through Beta
		if(projvn.major === 0) {
			fcontent = migrate_betas_to_v1(fcontent, projvn.minor);
			projvn.major = 1;
			projvn.minor = 0;
		}
		// debug('\t done with beta updates');


		// Roll upgrades through v1
		if(projvn.major === 1){

			// Check for future versions
			if(projvn.minor > currvn.minor){ error_TimeTraveller(); return; }

			// Roll through minor versions
			if(projvn.minor < 10){
				fcontent.projectsettings.glyphrange.latinsupplement = fcontent.projectsettings.glyphrange.latinsuppliment;
				delete fcontent.projectsettings.glyphrange.latinsuppliment;
			}

			if(projvn.minor < 13 || (projvn.minor === 13 && projvn.patch < 2)){
				// invert component instance rotation number
				var invertComponentInstanceRotation = function(glyph) {
					if(glyph.shapes && glyph.shapes.length) {
						for(var s in glyph.shapes) {
							if(glyph.shapes.hasOwnProperty(s)){
								if(glyph.shapes[s].objtype === 'componentinstance') {
									glyph.shapes[s].rotation *= -1;
								}
							}
						}
					}
				};

				for(var g in fcontent.glyphs) {
					if(fcontent.glyphs.hasOwnProperty(g)) invertComponentInstanceRotation(fcontent.glyphs[g]);
				}

				for(var l in fcontent.ligatures) {
					if(fcontent.ligatures.hasOwnProperty(l)) invertComponentInstanceRotation(fcontent.ligatures[l]);
				}

				for(var c in fcontent.components) {
					if(fcontent.components.hasOwnProperty(c)) invertComponentInstanceRotation(fcontent.components[c]);
				}
			}
		}
		// debug('\t done with v1 minor updates');


		// Update the version
		ps.versionnum = _UI.thisGlyphrStudioVersionNum;
		ps.version = _UI.thisGlyphrStudioVersion;
		
		
		// Hydrate after all updates
		// debug(fcontent);
		hydrateGlyphrProject(fcontent);
		// debug(' importGlyphrProjectFromText - END\n');
	}

	function error_NoVersionFound(){
		var msg = 'No version information was found.  Either the file is not a Glyphr Studio Project, or the file has non-valid JSON data.  Please try a different file...';
		console.warn(msg);
		alert(msg);
	}

	function error_TimeTraveller(){
		var msg = 'Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.';
		console.warn(msg);
		alert(msg);
	}

//	------------------------
//	MIGRATE
//	------------------------

	function migrate_betas_to_v1 (fcontent, minor) {
		// debug('\n migrate_betas_to_v1 - START');
		// debug(fcontent);
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
				fcontent = migrate_0_5_to_1_0(fcontent);

				// debug('\t migrated to 1.0');
		}

		// debug(' migrate_betas_to_v1 - END\n');
		return fcontent;
	}

	function migrate_0_5_to_1_0 (fc) {
		// debug('\n migrate_0_5_to_1_0 - START');

		// Update new top level objects
		fc.glyphs = clone(fc.fontchars, 'migrate_0_5_to_1_0');
		fc.components = clone(fc.linkedshapes, 'migrate_0_5_to_1_0');
		fc.projectsettings.glyphrange = clone(fc.projectsettings.charrange, 'migrate_0_5_to_1_0');
		delete fc.fontchars;
		delete fc.linkedshapes;
		delete fc.projectsettings.charrange;
		// debug('\t DONE tlo');


		// Upgrade Linked Shapes to full Glyphs
		var com,sh,ui,gn;
		for(var c in fc.components){ if(fc.components.hasOwnProperty(c)){
			com = fc.components[c];
			if(com.shape){
				sh = [com.shape];
				gn = com.shape.name || 'Shape';
			} else {
				sh = [];
				gn = 'Shape';
			}
			ui = com.usedin? com.usedin : [];
			fc.components[c] = new Glyph({'shapes':sh, 'usedin':ui, 'name':gn, 'glyphhtml':''});
		}}
		// debug('\t DONE ls > glyph');


		// Switch from Char to Glyph
		// Switch from Ligature to Glyph
		// Update Glyphs to use Components not Linked Shapes
		for(var g in fc.glyphs){ if(fc.glyphs.hasOwnProperty(g)){
			fc.glyphs[g] = charToGlyph(fc.glyphs[g]);
		}}

		for(var l in fc.ligatures){ if(fc.ligatures.hasOwnProperty(l)){
			fc.ligatures[l] = charToGlyph(fc.ligatures[l]);
		}}



		// debug(fc);
		// debug(' migrate_0_5_to_1_0 - END\n');
		return fc;
	}

	function charToGlyph(gl) {
		var gshapes, dx, dy;
		gl.shapes = gl.charshapes || [];
		gl.name = gl.charname || false;
		gl.glyphhtml = gl.charhtml || false;
		gl.glyphwidth = gl.charwidth || false;
		delete gl.charshapes;
		delete gl.charname;
		delete gl.charhtml;
		delete gl.charwidth;

		gshapes = gl.shapes;
		// debug('\t Glyph ' + gl.charname);
		for(var s=0; s<gshapes.length; s++){
			sh = gshapes[s];
			if(sh.objtype === 'linkedshapeinstance'){
				dx = sh.uselinkedshapexy? 0 : sh.xpos;
				dy = sh.uselinkedshapexy? 0 : sh.ypos;
				gshapes[s] = new ComponentInstance({'name':sh.name, 'link':sh.link, 'translatex':dx, 'translatey':dy, 'xlock':sh.xlock, 'ylock':sh.ylock});
			}


			if(isval(gshapes[s].uselinkedshapexy)){
				// debug('\t\t shape ' + gshapes[s].name + ' uselsxy: ' + typeof gshapes[s].uselinkedshapexy + ' ' + gshapes[s].uselinkedshapexy);
				gshapes[s].usecomponentxy = gshapes[s].uselinkedshapexy;
				delete gshapes[s].uselinkedshapexy;
				// debug('\t\t now usecomxy: ' + gshapes[s].usecomponentxy);
			}
		}

		return gl;
	}

	function migrate_0_4_to_0_5(fc) {
		// debug('\n migrate_0_4_to_0_5 - START');
		var tc;

		for(var i in fc.fontchars){ if(fc.fontchars.hasOwnProperty(i)){
			tc = fc.fontchars[i];
			// debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			tc.charwidth = tc.advancewidth || fc.projectsettings.upm || 1000;
		}}
		// debug(fc);
		// debug(' migrate_0_4_to_0_5 - END\n');
		return fc;
	}

	function migrate_0_3_to_0_4(fc){
		// debug('\n migrate_0_3_to_0_4 - START');
		var newgp = new GlyphrProject();

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
		// debug(fc);
		// debug(' migrate_0_3_to_0_4 - END\n');
		return fc;
	}



//	-------------------------------
//	HYDRATE
//	-------------------------------

	function hydrateGlyphrProject(data, callback) {
		// debug('\n hydrateGlyphrProject - START');
		// debug('\t passed: ');
		// debug(data);

		_GP = new GlyphrProject();
		// var oggp = new GlyphrProject();
		var ps = _GP.projectsettings;

		// Project Settings
		// merge settings to conform to current .projectsettings
		// but not guides, because they can be custom
		var dataguides = clone(data.projectsettings.guides);

		if (data.projectsettings) {
			ps = merge(ps, data.projectsettings);
			ps.glyphrange.custom =
				data.projectsettings.glyphrange.custom || [];
		}

		ps.projectid = ps.projectid || genProjectID();
		ps.descent = -1 * Math.abs(ps.descent);
		// debug('\t finished merging projectsettings');
		// debug(ps);

		// Update the version
		ps.versionnum = _UI.thisGlyphrStudioVersionNum;
		ps.version = _UI.thisGlyphrStudioVersion;

		// Guides
		hydrateGlyphrObjectList(Guide, dataguides, _GP.projectsettings.guides);
		// debug('\t finished hydrating guides');

		// Metadata
		if (data.metadata) _GP.metadata = merge(_GP.metadata, data.metadata, true);
		// debug('\t finished merging metadata');

		// Components
		hydrateGlyphrObjectList(Glyph, data.components, _GP.components);
		// debug('\t finished hydrating components');

		// Glyphs
		hydrateGlyphrObjectList(Glyph, data.glyphs, _GP.glyphs);
		// debug('\t finished hydrating glyphs');

		// Ligatures
		hydrateGlyphrObjectList(Glyph, data.ligatures, _GP.ligatures);
		// debug('\t finished hydrating ligatures');

		// Kerning
		hydrateGlyphrObjectList(HKern, data.kerning, _GP.kerning);
		// debug('\t finished hydrating kern pairs');

		// debug('\t hydrated: ');
		// debug(_GP);
		// debug('hydrateGlyphrProject - END\n');

		if (callback) callback();
		if (!_UI.coremode) finalizeGlyphrProject();
		//navigate();
	}


	// Takes raw JSON objects, and initializes them as Glyphr Studio objects
	function hydrateGlyphrObjectList(glyphrobject, source, destination) {
		for (var key in source) {
			if(source.hasOwnProperty(key)){
				destination[key] = new glyphrobject(source[key]);
			}
		}
	}


	// Takes a template object of expected keys and default values
	// and an object to import, and overwites template values if
	// they exist in the imported object
	function merge(template, importing, trim) {
		for(var a in template){
			if(template.hasOwnProperty(a)){
				if(typeof template[a] === 'object'){
					if(importing.hasOwnProperty(a)) template[a] = merge(template[a], importing[a]);
				} else {
					if(importing.hasOwnProperty(a)){
						if(typeof importing[a] === 'string' && trim) template[a] = removeEmptyStringInputs(importing[a]);
						else template[a] = importing[a];
					}
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
		_GP.metadata.font_family = fn.substr(0, 31);

		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;
		_GP.projectsettings.versionnum =  _UI.thisGlyphrStudioVersionNum;
		_GP.projectsettings.projectid = genProjectID();

		getGlyph('0x0020', true).isautowide = false;
		getGlyph('0x0020', true).glyphwidth = Math.round(_GP.projectsettings.upm/3);
		getGlyph('0x0041', true);

		finalizeGlyphrProject();
		//navigate();
	}

	function finalizeGlyphrProject(){
		// debug("finalizeGlyphrProject \t START");

		// UI Defaults
		_UI.history['glyph edit'] = new History('glyphs');
		_UI.history.components = new History('components');
		_UI.history.ligatures = new History('ligatures');
		_UI.history.kerning = new History('kerning');

		_UI.guides.leftgroup_xmax = new Guide(_UI.guides.leftgroup_xmax);
		_UI.guides.rightgroup_xmin = new Guide(_UI.guides.rightgroup_xmin);

		var ps = _GP.projectsettings;

		ps.guides.ascent = ps.guides.ascent ||  new Guide({name:'ascent', type:'horizontal', location: ps.ascent, editable:false, color: ps.colors.guide_med});
		ps.guides.capheight = ps.guides.capheight ||  new Guide({name:'capheight', type:'horizontal', location: ps.capheight, editable:false, color: ps.colors.guide_light});
		ps.guides.xheight = ps.guides.xheight ||  new Guide({name:'xheight', type:'horizontal', location: ps.xheight, editable:false, color: ps.colors.guide_light});
		ps.guides.baseline = ps.guides.baseline ||  new Guide({name:'baseline', type:'horizontal', location:0, editable:false, color: ps.colors.guide_dark});
		ps.guides.descent = ps.guides.descent ||  new Guide({name:'descent', type:'horizontal', location:( ps.ascent- ps.upm), editable:false, color: ps.colors.guide_med});
		ps.guides.leftside = ps.guides.leftside ||  new Guide({name:'leftside', type:'vertical', location: ps.defaultlsb*-1, editable:false, color: ps.colors.guide_dark});
		ps.guides.rightside = ps.guides.rightside ||  new Guide({name:'rightside', type:'vertical', location: ps.upm, editable:false, color: ps.colors.guide_dark});
		ps.guides.zero = ps.guides.zero ||  new Guide({name:'zero', type:'vertical', showname:false, location:0, editable:false, color: ps.colors.guide_med});
		ps.guides.min = ps.guides.min ||  new Guide({name:'min', type:'vertical', showname:false, location: ps.upm, editable:false, color: ps.colors.guide_light});
		ps.guides.max = ps.guides.max ||  new Guide({name:'max', type:'vertical', showname:false, location: ps.upm, editable:false, color: ps.colors.guide_light});

		_UI.selectedglyph = _UI.selectedglyph || getFirstGlyphID();
		_UI.selectedligature = _UI.selectedligature || getFirstID(_GP.ligatures);
		_UI.selectedcomponent = _UI.selectedcomponent || getFirstID(_GP.components);
		_UI.selectedkern = _UI.selectedkern || getFirstID(_GP.kerning);

		var sp = getGlyph('0x0020', true);
		if(!sp.isautowide && sp.glyphwidth === 0) sp.glyphwidth = Math.round(_GP.projectsettings.upm/3);

		resetThumbView();

		_UI.current_page = "glyph edit";
		// debug(_GP);
		// debug("finalizeGlyphrProject \t END\n");
	}

// end of file