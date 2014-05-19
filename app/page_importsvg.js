	function loadPage_importsvg(){
		debug("LOADING PAGE >> loadpage_importsvg");
		var content = "<div class='pagecontent textpage'><h1>Import SVG</h1>" +
		"<h2 id='importsvgselecttitle'>Target character: "+getSelectedCharName()+"</h2>"+

		"<h2 style='margin-bottom:10px;'>Scaling</h2>"+
		"For best results, scale your SVG outlines before you import them to Glyphr Studio.  "+
		"Characters should be "+_GP.projectsettings.upm+" units tall, with an ascender/descender "+
		"split of "+_GP.projectsettings.ascent+"/"+(_GP.projectsettings.upm-_GP.projectsettings.ascent)+".  "+
		"Check the help page for more info.<br><br>"+

		"Enter the height metrics for this character:<br>"+
		"<input type='checkbox' onchange='_UI.importsvg.ascender=this.checked;'>Ascender<br>"+
		"<input type='checkbox' checked disabled>X Height<br>"+
		"<input type='checkbox' onchange='_UI.importsvg.descender=this.checked;'>Descender<br>"+

		"<h2 style='margin-bottom:10px;'>SVG Code</h2>"+
		"<div id='droptarget' style='width:100%; height:auto; margin-bottom:0px; padding:8px;'>drop a .svg file here, or paste code below</div>"+
		"<textarea id='svgcode' onchange='document.getElementById(\"droptarget\").innerHTML = \"drop a .svg file here, or paste code below\";'>"+

		// /* EXAMPLE h */ "<path d='M296.8,192c-83.8,0-169.3,33.2-226.9,97.8V71.6h34.9V0H0v700h104.7v-71.6H69.8V488.8c0-155.4,117-226.9,226.9-226.9s226.9,71.6,226.9,226.9v209.5h71.6V488.8C595.3,293.3,445.1,192,296.8,192z'/>"+

		/* EXAMPLE g */ "<path d='M195.4,0C98.9,0,0,66.7,0,195.4c0,98.9,101.1,143.7,195.4,143.7c54,0,110.3-14.9,149.4-47.1v64.4c0,66.7-77,97.7-149.4,97.7c-63.2,0-129.9-23-146-73.6H69v-47.1H0v23C0,455.2,101.1,500,195.4,500s195.4-44.8,195.4-143.7V195.4C392,66.7,293.1,0,195.4,0z M195.4,293.1c-71.3,0-149.4-31-149.4-97.7C46,93.1,123,46,195.4,46s149.4,47.1,149.4,149.4C344.8,262.1,267.8,293.1,195.4,293.1z'/>"+

		"</textarea><br><br>"+

		"<button class='buttonsel' style='display:inline; padding-left:60px; padding-right:60px;' onclick='importSVG_importCode();'>Import SVG</button>"+
		"<button style='display:inline; margin-left:60px; padding-left:20px; padding-right:20px;' onclick='_UI.navhere=\"character edit\"; navigate();'>go to character edit</button>"+
		"<button style='display:inline; margin-left:10px; padding-left:20px; padding-right:20px;' onclick='importSVG_clearCode();'>clear code</button>"+

		'<div id="svgerrormessagebox">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="svgerrormessageleftbar"><button class="svgerrormessageclosebutton" onclick="document.getElementById(\'svgerrormessagebox\').style.display=\'none\';">&times;</button></td>' +
		'<td id="svgerrormessagecontent"></td>' +
		'</tr></table></div>'+
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		importSVG_selectChar("0x0061");

		getEditDocument().getElementById("droptarget").addEventListener('dragover', handleDragOver, false);
		getEditDocument().getElementById("droptarget").addEventListener('drop', importSVG_handleDrop, false);
	}

	function importSVG_handleDrop(evt){
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var fcontent = "";
		var dt = document.getElementById("droptarget");

		dt.innerHTML = "Loading File...";

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				document.getElementById('svgcode').innerHTML = reader.result;
				dt.innerHTML = "Loaded " + theFile.name;
			};
		})(f);

		reader.readAsText(f);
	}


	function importSVG_clearCode() {
		document.getElementById('droptarget').innerHTML = 'drop a .svg file here, or paste code below';
		var t = document.getElementById('svgcode');
		t.innerHTML = '';
		t.focus();
	}

	function importSVG_selectChar(cid){
		//debug("IMPORTSVG_SELECTCHAR - selecting " + cid);
		selectChar(cid, true);
		document.getElementById('importsvgselecttitle').innerHTML = "Target character: "+getSelectedCharName();
		update_NavPanels();
	}

	function importSVG_importCode() {
		var svgin = document.getElementById('svgcode').value;
		//debug("IMPORTSVG_IMPORTCODE - svgin is " + JSON.stringify(svgin));
		var newshapes = [];
		var maxes = {
			"xmax" : 0,
			"xmin" : 999999999,
			"ymax" : 0,
			"ymin" : 999999999
		};

		if(svgin.indexOf('<path') > -1){
			var pathtag_arr = [];
			var pathtag_count = 0;
			var pathtag_startpos = 0;
			var pathtag_endpos = 0;
			//debug("IMPORTSVG_IMPORTCODE - indexOf <path is " + svgin.indexOf('<path '));

			// Get Path Tags
			while(svgin.indexOf('<path', pathtag_startpos)>-1){
				//debug("IMPORTSVG_IMPORTCODE - indexOf <path is " + svgin.indexOf('<path', pathtag_startpos));
				pathtag_startpos = svgin.indexOf('<path', pathtag_startpos);
				pathtag_endpos = svgin.indexOf('/>', pathtag_startpos) + 2;
				pathtag_arr[pathtag_count] = svgin.substring(pathtag_startpos, pathtag_endpos);
				pathtag_startpos = pathtag_endpos;
				if(pathtag_count > 100) break; else pathtag_count++;
			}
			//debug("IMPORTSVG_IMPORTCODE - pathtag_arr is " + JSON.stringify(pathtag_arr));
			//debug("IMPORTSVG_IMPORTCODE - pathtag_arr length is " + pathtag_arr.length);

			// Convert Tags to Glyphr Shapes
			var data;
			for(var p=0; p<pathtag_arr.length; p++){
				data = pathtag_arr[p];
				data = data.substring(data.indexOf(' d=')+4);
				var close = Math.max(data.indexOf("'"), data.indexOf('"'));
				data = data.substring(0, close);
				
				// Compound Paths are treated as different Glyphr Shapes
				data.replace('Z','z');
				data = data.split('z');

				for(var d=0; d<data.length; d++){
				//for(var d=0; d<5; d++){
					if(data[d].length){
						newshapes.push(importSVG_convertPathTag(data[d]));
						putundoq("Imported Path from SVG to character "+getSelectedCharName());
					}
				}
			}

		} else {
			importSVG_errorMessage("Could find no &lt;path&gt; tags to import");
		}


		// Add and find maxes
		var s;
		for(var i=0; i<newshapes.length; i++) {
			s = addShape(newshapes[i]);
			maxes.xmin = Math.min(s.path.maxes.xmin, maxes.xmin);
			maxes.xmax = Math.min(s.path.maxes.xmin, maxes.xmax);
			maxes.ymax = Math.max(s.path.maxes.ymax, maxes.ymax);
			maxes.ymin = Math.min(s.path.maxes.ymin, maxes.ymin);
		}
/*		
		// Flip and Scale
		var mid = ((maxes.ymax - maxes.ymin)/2) + maxes.ymin;
		var dy = ((_UI.importsvg.ascender? _GP.projectsettings.ascent : _GP.projectsettings.xheight) - maxes.ymax) + maxes.ymin;
		var tsp;
		for(var j=0; j<newshapes.length; j++) {
			tsp = newshapes[j].path;
			tsp.flipNS(mid);
			tsp.updatePathPosition(0,dy,true);
			// Scale
		}
*/
		update_NavPanels();
	}


	function importSVG_convertPathTag(data) {
		// just path data
		//debug("IMPORTSVG_CONVERTPATHTAG - data is \n" + data);

		// Parse in the path data, comma separating everything
		data = data.replace(/(\s)/g, ',');
		data = data.replace(/-/g, ',-');
		if(data.charAt(0) === ' ') data = data.slice(1);

		var curr = 0;
		while(curr < data.length){
			if(importSVG_isPathCommand(data.charAt(curr))){
				data = (data.slice(0,curr)+','+data.charAt(curr)+','+data.slice(curr+1));
				curr++;
			}
			if(curr > 99999) {
				importSVG_errorMessage("Data longer than 100,000 characters is not allowed.");
				return;
			} else {
				curr++;
			}
		}

		while(data.indexOf(',,') > -1) data = data.replace(',,',',');
		if(data.charAt(0) === ',') data = data.slice(1);

		//debug("IMPORTSVG_CONVERTPATHTAG - parsed path data as \n" + data);

		// Parse comma separated data into commands / data chunks
		data = data.split(',');
		var chunkarr = [];
		var commandpos = 0;
		var command;
		var dataarr = [];
		curr = 1;
		while(curr <= data.length){
			if(importSVG_isPathCommand(data[curr])){
				dataarr = data.slice(commandpos+1, curr);
				command = data[commandpos];
				for(var i=0; i<dataarr.length; i++) dataarr[i] = Number(dataarr[i]);
				chunkarr.push({"command":command, "data":dataarr});
				commandpos = curr;
			}
			curr++;
		}
		// Fencepost
		dataarr = data.slice(commandpos+1, curr);
		command = data[commandpos];
		for(var j=0; j<dataarr.length; j++) dataarr[j] = Number(dataarr[j]);
		chunkarr.push({"command":command, "data":dataarr});

		//debug("IMPORTSVG_CONVERTPATHTAG - chunkarr data is \n" + json(chunkarr, true));

		// Turn the commands and data into Glyphr objects
		var patharr = [];
		for(var c=0; c<chunkarr.length; c++){
			//debug("\nHandling Path Chunk " + c);
			if(chunkarr[c].command){
				patharr = importSVG_handlePathChunk(chunkarr[c], patharr, (c===chunkarr.length-1));
			}
		}

		// Combine 1st and last point
		var fp = patharr[0];
		var lp = patharr[patharr.length-1];
		if((fp.P.x===lp.P.x)&&(fp.P.y===lp.P.y)){
			//debug("IMPORTSVG_CONVERTPATHTAG - fp/lp same:\nFirst Point: "+json(fp)+"\nLast Point:  "+json(lp));
			fp.H1.x = lp.H1.x;
			fp.H1.y = lp.H1.y;
			fp.useh1 = lp.useh1;
			patharr.pop();
			fp.resolvePointType();
			//debug("IMPORTSVG_CONVERTPATHTAG - AFTER:\nFirst Point: "+json(fp));
		}

		var newshape = new Shape({"path":new Path({"pathpoints":patharr})});
		newshape.path.validate('IMPORTSVG');
		newshape.path.calcMaxes();

		//debug("IMPORTSVG_PARSEPATHTAG - unscaled shape: \n" + json(newshape));

		// Scale
		if(_UI.importsvg.scale){
			var height = _GP.projectsettings.xheight;
			if(_UI.importsvg.ascender){
				height = _GP.projectsettings.ascent;
			}
			if(_UI.importsvg.descender){
				height += (_GP.projectsettings.upm - _GP.projectsettings.ascent);
			}

			newshape.path.updatePathSize((height - (newshape.path.maxes.ymax - newshape.path.maxes.ymin)), 0, true);
		}
		
		return newshape;
	}

	function importSVG_isPathCommand(c){
		if('MmLlCcSsZzHhVv'.indexOf(c) > -1) return c;
		return false;
	}

	function importSVG_handlePathChunk(chunk, patharr, islastpoint){
		/*
			Path Instructions: Capital is absolute, lowercase is relative
			M m		MoveTo
			L l		LineTo
			H h		Horizontal Line
			V v		Vertical Line
			C c		Bezier (can be chained)
			S s		Smooth Bezier
			Z z		Close Path

			Possibly fail gracefully for these by moving to the final point
			A a		ArcTo (don't support)
			Q q		Quadratic Bezier (don't support)
			T t		Smooth Quadratic (don't support)
		*/

		var cmd = chunk.command;
		var p,h1,h2;
		var lastpoint = patharr[patharr.length-1] || new PathPoint({"P":new Coord({"x":0,"y":0})});
		var prevx = round(lastpoint.P.x, 3);
		var prevy = round(lastpoint.P.y, 3);

		//debug("\tprevious point x y\t"+prevx+" "+prevy);
		//debug("\t"+cmd+" ["+chunk.data+"]");


		// handle command types
		if(cmd === 'M' || cmd === 'm' || cmd === 'L' || cmd === 'l' || cmd === 'H' || cmd === 'h' || cmd === 'V' || cmd === 'v'){

			var xx = prevx;
			var yy = prevy;

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
					// relative line to
					// relative move to
					xx = chunk.data[0] + prevx;
					yy = chunk.data[1] + prevy;
					break;
				case 'H':
					// ABSOLUTE horizontal line to
					xx = chunk.data[0];
					break;
				case 'h':
					// relative horizontal line to
					xx = chunk.data[0] + prevx;
					break;
				case 'V':
					// ABSOLUTE vertical line to
					yy = chunk.data[0];
					break;
				case 'v':
					// relative vertical line to
					yy = chunk.data[0] + prevy;
					break;
			}

			xx = round(xx, 3);
			yy = round(yy, 3);

			//debug("\tlinear end xx yy\t" + xx + " " + yy);
			p = new Coord({"x":xx, "y":yy});

			lastpoint.useh2 = false;
			patharr.push(new PathPoint({"P":p, "H1":clone(p), "H2":clone(p), "type":"corner", "useh1":false, "useh2":true}));

		} else if(cmd === 'C' || cmd === 'c'){
			// ABSOLUTE bezier curve to
			// relative bezier curve to
				// The three subsiquent x/y points are relative to the last command's x/y point
				// relative x/y point (n) is NOT relative to (n-1)

			var currdata = [];
			// Loop through (potentially) PolyBeziers
			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=6
				currdata = [];
				currdata = chunk.data.splice(0,6);
				if(currdata.length % 6 !== 0) {
					importSVG_errorMessage('Bezier path command (C or c) was expecting 6 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<6) { currdata.push(currdata[currdata.length-1]+100); }
				}

				// default absolute for C
				//debug("\tCc getting data values for new point px:" + currdata[4] + " py:" + currdata[5]);

				lastpoint.H2 = new Coord({"x":round(currdata[0], 3), "y":round(currdata[1], 3)});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();
				h1 = new Coord({"x":round(currdata[2], 3), "y":round(currdata[3], 3)});
				p = new Coord({"x":round(currdata[4], 3), "y":round(currdata[5], 3)});

				if (cmd === 'c'){
					// Relative offset for c
					lastpoint.H2.x += prevx;
					lastpoint.H2.y += prevy;
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;
				}

				//debug("\tbezier end Px Py\t"+p.x+" "+p.y+"\tH1x H1y:"+h1.x+" "+h1.y);

				patharr.push(new PathPoint({"P":p, "H1":h1, "H2":p, "useh1":true, "useh2":true}));
			}

		} else if (cmd === 'S' || cmd === 's'){
			// ABSOLUTE symmetric shorthand bezier curve to
			// relative symmetric shorthand bezier curve to
			lastpoint.makeSymmetric('H1');
			lastpoint.useh2 = true;

			h1 = new Coord({"x":round(chunk.data[0], 3), "y":round(chunk.data[1], 3)});
			p = new Coord({"x":round(chunk.data[2], 3), "y":round(chunk.data[3], 3)});

			if (cmd === 's'){
				// Relative offset for s
				h1.x += prevx;
				h1.y += prevy;
				p.x += prevx;
				p.y += prevy;
			}

			//debug("\tbezier result px:"+p.x+" py:"+p.y+" h1x:"+h1.x+" h1y:"+h1.y);

			patharr.push(new PathPoint({"P":p, "H1":h1, "H2":p, "type":"symmetric", "useh1":true, "useh2":true}));

		} else if(cmd === 'Z' || cmd === 'z'){
			// End Path
		} else {
			importSVG_errorMessage("Unrecognized path command "+cmd+", ignoring and moving on...");
		}

		var added = patharr[patharr.length-1];
		//debug("CREATED PATH POINT \n"+json(added));
		if(islastpoint) added.resolvePointType();

		return patharr;
	}

	function importSVG_errorMessage(msg) {
		console.error("Import SVG Error - " + msg);
		var msgcon = document.getElementById('svgerrormessagecontent');
		var msgbox = document.getElementById('svgerrormessagebox');
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
	}