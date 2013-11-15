//	-------------------------
//	Save GLYPHR JSON
//	-------------------------

function triggerProjectFileDownload(){
		//JSON CONVERSION!!!!!!
		//var output = generateGlyphrProjectJS();
		var output = niceJSON(JSON.stringify(GlyphrProject));

		// Update the textbox
		//document.getElementById("genoutput").value = output;
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









//	------------------------
//	Save as a GLYPHR Project
//	------------------------

	function generateGlyphrProjectJS(){
		
		var output = "function importGlyphrProject(){\n";
		output+= "    var GlyphrProject = new Object();\n"
		output+= "    GlyphrProject.fontchars = new Array();\n"
		output+= "    GlyphrProject.seedshapes = new Array();\n";
		output+= "    GlyphrProject.settings = new Object();\n";
		output+= "    GlyphrProject.fontmetadata = new Object();\n\n";
		
		output+= "    var shapearray = new Array();\n";
		output+= "    var shapeobject = new Object();\n";
		output+= "    var pathobject = new Object();\n";
		output+= "    var pathpoints = new Array();\n";
		output+= "    var P = new Object();\n";
		output+= "    var H1 = new Object();\n";
		output+= "    var H2 = new Object();\n";
		output += "\n\n";
		
		
		// generate Settings data
		var fset = GlyphrProject.settings;
		output += "    // --------------\n";
		output += "    // Settings\n";
		output += "    // --------------\n\n";
		output += "    GlyphrProject.settings.version = '" + thisGlyphrStudioVersion + "';\n";
		output += "    GlyphrProject.settings.seedshapecounter = " + seedshapecounter + ";\n";
		output += "    GlyphrProject.settings.upm = " + (fset.upm? fset.upm : "2048") + ";\n";
		output += "    GlyphrProject.settings.griddivisions = " + (fset.griddivisions? fset.griddivisions : "16") + ";\n";
		output += "    GlyphrProject.settings.xheight = " + (fset.xheight? fset.xheight : "0.5625") + ";\n";
		output += "    GlyphrProject.settings.descender = " + (fset.descender? fset.descender : "0.25") + ";\n";
		output += "    GlyphrProject.settings.overshoot = " + (fset.overshoot? fset.overshoot : "0.0078125") + ";\n";
		output += "    GlyphrProject.settings.kerning = " + (fset.kerning? fset.kerning : "0.0625") + ";\n";
		output += "\n\n\n";	
				
				
		
		// generate Font Metadata
		var md = GlyphrProject.fontmetadata;
		output += "    // --------------\n";
		output += "    // Font Metadata\n";
		output += "    // --------------\n\n";
		output += "    GlyphrProject.fontmetadata.familyname = '" + (md.familyname? md.familyname : "My Font") + "';\n";
		output += "    GlyphrProject.fontmetadata.subfamilyname = '" + (md.subfamilyname? md.subfamilyname : "Regular") + "';\n";
		output += "    GlyphrProject.fontmetadata.genericfamilyname = '" + (md.genericfamilyname? md.genericfamilyname : "Sans-Serif") + "';\n";
		output += "    GlyphrProject.fontmetadata.fullname = '" + (md.fullname? md.fullname : "My Font") + "';\n";
		output += "    GlyphrProject.fontmetadata.version = '" + (md.version? md.version : "Version 1.0") + "';\n";
		output += "    GlyphrProject.fontmetadata.copyright = '" + (md.copyright? md.copyright : "© Copyright 2012") + "';\n";
		output += "    GlyphrProject.fontmetadata.manufacturername = '" + (md.manufacturername? md.manufacturername : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.manufacturerurl = '" + (md.manufacturerurl? md.manufacturerurl : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.designername = '" + (md.designername? md.designername : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.designerurl = '" + (md.designerurl? md.designerurl : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.description = '" + (md.description? md.description : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.licensedescription = '" + (md.licensedescription? md.licensedescription : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.licenseurl = '" + (md.licenseurl? md.licenseurl : "") + "';\n";
		output += "    GlyphrProject.fontmetadata.weightclass = '" + (md.weightclass? md.weightclass : 400) + "';\n";
		output += "    GlyphrProject.fontmetadata.widthclass = '" + (md.widthclass? md.widthclass : 5) + "';\n";
		output += "\n\n\n";	
		
		// Generate Seedshape Data
		var ss = GlyphrProject.seedshapes;
		shapestuff = "";	
		output += "    // --------------\n";
		output += "    // SeedShape Data\n";
		output += "    // --------------\n\n";

		for(var ssname in ss){
			output += "    // Seed Shape '" + ssname + "'\n";
			output += "    GlyphrProject.seedshapes['"+ssname+"'] = new Object();\n";
				var una = ss[ssname].usedin;
				var unaval = "";
				for(var k=0; k<una.length; k++){ 
					unaval += ("'" + una[k] + "'");
					k<una.length-1? unaval += ", " : false;
				}
			output += "    GlyphrProject.seedshapes['"+ssname+"'].usedin = new Array(" + unaval + ");\n";
			output += generateShapeSaveData(ss[ssname].shape);
			output += "    GlyphrProject.seedshapes['"+ssname+"'].shape = shapeobject;\n";
			output += "\n";
		}
		output += "\n\n\n";	
		
		
		// Generate Character Data
		var fc = GlyphrProject.fontchars;
		var shapestuff = "";
		var s = new Object();
		var pp = new Object();
		var shapelayers = new Array();

		output += "    // --------------\n";
		output += "    // Character Data\n";
		output += "    // --------------\n\n";
		for(var c=32; c<127; c++){	
			output += "    // "+fc[c].charname+" - "+fc[c].charvalue+" - unicode number "+c+" \n";
			
			output += "    GlyphrProject.fontchars["+c+"] = new Object();\n";
			
			output += "    GlyphrProject.fontchars["+c+"].charname = '"+fc[c].charname+"';\n";
			output += "    GlyphrProject.fontchars["+c+"].cmapcode = '"+fc[c].cmapcode+"';\n";
			
			var cv = "'"+fc[c].charvalue+"'";
			if (c==39) cv = "\"'\"";
			if (c==32) cv = "'[space]'";
			if (c==92) cv = "'\\"+"\\'";
			
			output += "    GlyphrProject.fontchars["+c+"].charvalue = "+cv+";\n";
			output += "    GlyphrProject.fontchars["+c+"].isautowide = "+fc[c].isautowide+";\n";
			output += "    GlyphrProject.fontchars["+c+"].charwidth = "+fc[c].charwidth+";\n";
			output += "    GlyphrProject.fontchars["+c+"].charglyphdata = new Array();\n";
			
			shapelayers = fc[c].charglyphdata;
			shapestuff = "";
			for(var i=0; i<shapelayers.length; i++){
				shapestuff += generateShapeSaveData(shapelayers[i]);
				shapestuff += "        shapearray["+i+"] = shapeobject;\n";
			}
			
			if(shapelayers.length != 0){
				output += "        shapearray = new Array();\n";
				output += shapestuff;
				output += "    GlyphrProject.fontchars["+c+"].charglyphdata = shapearray;\n";
			}
			
			output += "\n";
		}
		
		
		// Finish Up
		output += "\n\n\n";
		output += "    return GlyphrProject;\n";
		output += "}";

		return output;
	}
	
	function generateShapeSaveData(s){
		var re = "";
		var pathvar = "false";
		
		if(s.seed){
			re += "            shapeobject = new seedshapeinstance('" + s.seed + "', " + s.useseedxy + ", " + r(s.xpos) + ", " + r(s.ypos) + ", '" + s.name + "');\n";
		} else {
			if(s.path.pathpoints){
				re += "            pathpoints = new Array();\n";				
				for(var n=0; n<s.path.pathpoints.length; n++){
					pp = s.path.pathpoints[n];
					
					re += "                P = new coord("+r(pp.P.x)+","+r(pp.P.y)+","+pp.P.xlock+","+pp.P.ylock+");\n";
					re += "                H1 = new coord("+r(pp.H1.x)+","+r(pp.H1.y)+","+pp.H1.xlock+","+pp.H1.ylock+");\n";
					re += "                H2 = new coord("+r(pp.H2.x)+","+r(pp.H2.y)+","+pp.H2.xlock+","+pp.H2.ylock+");\n";
					re += "            pathpoints["+n+"] = new pathPoint(P, H1, H2,'"+pp.type+"',"+pp.selected+","+pp.useh1+","+pp.useh2+");\n";
				}
				re += "            pathobject = new path(pathpoints,"+s.path.isclosed+");\n";
				pathvar = "pathobject";
			}
			
			re += "            shapeobject = new shape('"+s.name+"',"+r(s.xpos)+","+r(s.ypos)+","+pathvar+","+s.visible+","+s.xlock+","+s.ylock+","+s.wlock+","+s.hlock+","+s.negative+");\n";
		}
		
		return re;
	}

	function r(num){ return round(num,4); }
	