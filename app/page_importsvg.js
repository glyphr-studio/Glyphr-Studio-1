	function loadPage_importsvg(){
		debug("LOADING PAGE >> loadpage_importsvg");
		var content = "<div class='pagecontent'><h1>Import SVG</h1>" +
		"<table><tr><td><h2>Select a character</h2><div id='importsvgcharchooser'></div></td>"+
		"<td><h2 style='margin-bottom:10px;'>Scale options</h2>"+
		"<input type='checkbox' checked onchange='_UI.importsvg.scale=this.checked;'>Scale imported SVG path<br>"+
		"<div style='padding-left:20px;' disabled='"+_UI.importsvg.scale+"'>"+
		"<input type='checkbox' onchange='_UI.importsvg.ascender=this.checked;'>Has ascender<br>"+
		"<input type='checkbox' onchange='_UI.importsvg.descender=this.checked;'>Has descender<br>"+
		"</div><br>"+
		"<h2>Paste SVG code</h2>"+
		"<textarea id='svgcode'></textarea><br>"+
		"<input type='button' class='button buttonsel' value='Import SVG' onclick='importSVG_importCode();'>"+
		"</td></tr></table>"+
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		
		importSVG_selectChar("0x0061");
	}

	function importSVG_selectChar(cid){
		debug("IMPORTSVG_SELECTCHAR - selecting " + cid);
		selectChar(cid, true);
		document.getElementById('importsvgcharchooser').innerHTML = makeGenericCharChooserContent('importSVG_selectChar');
		drawGenericCharChooserContent();
	}

	function importSVG_importCode() {
		var svgin = document.getElementById('svgcode').value;
		//debug("IMPORTSVG_IMPORTCODE - svgin is " + JSON.stringify(svgin));
		
		if(svgin.indexOf('<path') > -1){
			var patharr = [];
			var curr = 0;
			var startpos = 0;
			var endpos = 0;
			//debug("IMPORTSVG_IMPORTCODE - indexOf <path is " + svgin.indexOf('<path '));
			
			// Get Path Tags
			while(svgin.indexOf('<path', startpos)>-1){
				//debug("IMPORTSVG_IMPORTCODE - indexOf <path is " + svgin.indexOf('<path', startpos));
				startpos = svgin.indexOf('<path', startpos);
				endpos = svgin.indexOf('/>', startpos) + 2;
				patharr[curr] = svgin.substring(startpos, endpos);
				startpos = endpos;
				if(curr > 100) break; else curr++;
			}
			//debug("IMPORTSVG_IMPORTCODE - patharr is " + JSON.stringify(patharr));

			// Convert Tags to Glyphr Shapes
			for(var p=0; p<patharr.length; p++){ importSVG_parsePathTag(patharr[p]); }

		} else {
			// fail import
		}
	}


	function importSVG_parsePathTag(data) {
		// just path data
		data = data.substring(data.indexOf(' d=')+4);
		var close = Math.max(data.indexOf("'"), data.indexOf('"'));
		data = data.substring(0, close);

		// whitespace munging
		data = data.replace(/(\s)/g, '');
		data = data.replace(/\,/g, ' ');
		data = data.replace(/-/g, ' -');
		data = data.split('');
		var curr = 0;
		while(curr < data.length){
			if(importSVG_isPathCommand(data[curr])){
				data.splice(curr, 0, ' ');
				data.splice(curr+2, 0, ' ');
				curr++;
			}
			if(curr > 9999) return; else curr++;
		}
		if(data[0] === ' ') data = data.slice(1);

		debug("IMPORTSVG_PARSEPATHTAG - parsed path data as \n" + data.join(''));

		// chunk commands and data
		var chunkarr = [];
		var commandpos = 0;
		curr = 0;
		while(curr < data.length){
			if(importSVG_isPathCommand(data[curr])){
				if(commandpos !== curr){
					chunkarr.push({"command":data[commandpos], "data":data.slice(commandpos+2, curr-1).join('').split(' ')});
					commandpos = curr;
				}
			}
			curr++;
		}
		debug("IMPORTSVG_PARSEPATHTAG - chunkarr data is \n" + JSON.stringify(chunkarr));

		// Turn the commands and data into Glyphr objects
		var returnobj = {"patharr":[], "pos":{"x":0, "y":0}};
		for(var c=0; c<chunkarr.length; c++){
			returnobj = importSVG_handlePathChunk(chunkarr[c], returnobj);
		}
	}

	function importSVG_isPathCommand(c){
		if('MmLlCcZzHhVv'.indexOf(c) > -1) return c;
		return false;
	}

	function importSVG_handlePathChunk(chunk, pobj){
		/* 
			Path Instructions: Capital is absolute, lowercase is relative
			M m		MoveTo
			L l		LineTo
			C c		Bezier (can be chained)
			Z z		Close Path
			H h		Horizontal Line
			V v		Vertical Line

			A		ArcTo (don't support)
			Q q		Quadratic Bezier (don't support)			
		*/

		var xx,yy;
		var p,h1,h2;
		var cmd = chunk.command;

		if(cmd === 'M' || cmd === 'm' || cmd === 'L' || cmd === 'l' || cmd === 'H' || cmd === 'h' || cmd === 'V' || cmd === 'v'){

			switch(cmd){
				case 'L':
				case 'M':
					// ABSOLUTE move to
					// ABSOLUTE line to
					xx = chunk.data[0];
					yy = chunk.data[1];
					break;
				case 'l':
				case 'm':
					// RELATIVE line to
					// RELATIVE move to
					xx = chunk.data[0] + pobj.pos.x;
					yy = chunk.data[1] + pobj.pos.y;
					break;
				case 'H':
					// ABSOLUTE horizontal line to
					xx = chunk.data[0];
					yy = pobj.pos.y;
					break;
				case 'h': 
					// RELATIVE horizontal line to
					xx = chunk.data[0] + pobj.pos.x;
					yy = pobj.pos.y;
					break;
				case 'L':
					// ABSOLUTE vertical line to
					xx = pobj.pos.x;
					yy = chunk.data[0];
					break;
				case 'l':
					// RELATIVE vertical line to
					xx = pobj.pos.x;
					yy = chunk.data[0] + pobj.pos.y;
					break;
			}
			
			p = new Coord({"x":xx, "y":yy});
			h1 = new Coord({"x":xx-100, "y":yy-100});
			h2 = new Coord({"x":xx+100, "y":yy+100});

			if(pobj.patharr.length) pobj.patharr[pobj.patharr.length].useh2 = false;
			pobj.patharr.push(new PathPoint({"P":p, "H1":h1, "H2":h2, "useh1":false}));

			pobj.pos = p;

		} else if(cmd === 'C' || cmd === 'c'){
			// ABSOLUTE bezier curve to
			// RELATIVE bezier curve to 

		} else if(cmd === 'Z' || cmd === 'z'){
			// End Path 

		} else {
			debug("IMPORTSVG_HANDLEPATHCHUNK - unrecognized chunk command " + chunk.command);
		}

		return pobj;
	}