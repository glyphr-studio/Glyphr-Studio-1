	function loadPage_importsvg(){
		debug("LOADING PAGE >> loadpage_importsvg");
		var content = "<div class='pagecontent textpage'><h1>Import SVG</h1>" +
		"<h2 id='importsvgselecttitle'>Target character: "+getSelectedCharName()+"</h2>"+
		"<h2 style='margin-bottom:10px;'>Scale options</h2>"+
		"<input type='checkbox' checked onchange='_UI.importsvg.scale=this.checked;'>Scale imported SVG path<br>"+
		"<div style='padding-left:20px;' disabled='"+_UI.importsvg.scale+"'>"+
		"<input type='checkbox' onchange='_UI.importsvg.ascender=this.checked;'>Has ascender<br>"+
		"<input type='checkbox' onchange='_UI.importsvg.descender=this.checked;'>Has descender<br>"+
		"</div><br>"+
		"<h2 style='display:inline;'>Paste SVG code</h2>"+
		"<input type='button' class='button buttonsel' value='Import SVG' style='display:inline;' onclick='importSVG_importCode();'>"+
		"<br><textarea id='svgcode'><path d='M6,29.1H0V17C0,10.6,2.8,5.4,8,2.4c5.5-3.2,12.6-3.2,18,0c5.2,3,8,8.2,8,14.7H30c0-5-2.1-8.9-6-11.2c-4.2-2.4-9.8-2.4-14,0c-3.9,2.2-6,6.2-6,11.2v8h2V29.1z'/></textarea><br>"+
		'<div id="svgerrormessagebox">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="svgerrormessageleftbar"><input type="button" class="svgerrormessageclosebutton" value="&times;" onclick="document.getElementById(\'svgerrormessagebox\').style.display=\'none\';"></td>' +
		'<td id="svgerrormessagecontent"></td>' +
		'</tr></table></div>'+
		"<br><br></div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		importSVG_selectChar("0x0061");
	}

	function importSVG_selectChar(cid){
		debug("IMPORTSVG_SELECTCHAR - selecting " + cid);
		selectChar(cid, true);
		document.getElementById('importsvgselecttitle').innerHTML = "Target character: "+getSelectedCharName();
		update_NavPanels();
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
			importSVG_errorMessage("Could find no &lt;path&gt; tags to import");
		}

		// Redraw
		update_NavPanels();
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
		var dataarr = [];
		curr = 0;
		while(curr < data.length){
			if(importSVG_isPathCommand(data[curr])){
				if(commandpos !== curr){
					dataarr = data.slice(commandpos+2, curr-1).join('').split(' ');
					for(var i=0; i<dataarr.length; i++){
						if(dataarr[i] === ''){
							dataarr.splice(i,1);
						} else {
							dataarr[i] = Number(dataarr[i]);
						}
					}
					chunkarr.push({"command":data[commandpos], "data":dataarr});
					commandpos = curr;
				}
			}
			curr++;
		}
		debug("IMPORTSVG_PARSEPATHTAG - chunkarr data is \n" + JSON.stringify(chunkarr));

		// Turn the commands and data into Glyphr objects
		var patharr = [];
		for(var c=0; c<chunkarr.length; c++){
			debug("\nHandling Path Chunk " + c);
			patharr = importSVG_handlePathChunk(chunkarr[c], patharr, (c===chunkarr.length-1));
		}

		var newshape = new Shape({"path":new Path({"pathpoints":patharr})});
		newshape.path.calcMaxes();
		newshape.path.flipNS();

		// Scale
		if(_UI.importsvg.scale){
			var height = _GP.projectsettings.xheight;
			var top = _GP.projectsettings.xheight;
			if(_UI.importsvg.ascender){
				height = _GP.projectsettings.ascent;
				top = _GP.projectsettings.ascent;
			}
			if(_UI.importsvg.descender){
				height += (_GP.projectsettings.upm - _GP.projectsettings.ascent);
			}

			newshape.path.updatePathSize((height - (newshape.path.topy - newshape.path.bottomy)), 0, true);
			newshape.path.setTopY(top);
		}
		
		//debug("IMPORTSVG_PARSEPATHTAG - adding new shape \n" + JSON.stringify(newshape));
		addShape(newshape);
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

		debug("IMPORTSVG_HANDLEPATHCHUNK - cmd:"+cmd+" data:"+chunk.data+" previous point x:"+prevx+" y:"+prevy);

		if(cmd === 'M' || cmd === 'm' || cmd === 'L' || cmd === 'l' || cmd === 'H' || cmd === 'h' || cmd === 'V' || cmd === 'v'){

			var xx,yy;

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
					yy = prevy;
					break;
				case 'h': 
					// relative horizontal line to
					xx = chunk.data[0] + prevx;
					yy = prevy;
					break;
				case 'V':
					// ABSOLUTE vertical line to
					xx = prevx;
					yy = chunk.data[0];
					break;
				case 'v':
					// relative vertical line to
					xx = prevx;
					yy = chunk.data[0] + prevy;
					break;
			}
			
			xx = round(xx, 3);
			yy = round(yy, 3);

			debug("IMPORTSVG_HANDLEPATHCHUNK - linear point result xx yy " + xx + " " + yy);
			h1 = new Coord({"x":xx-100, "y":yy-100});
			p = new Coord({"x":xx, "y":yy});
			h2 = new Coord({"x":xx+100, "y":yy+100});

			lastpoint.useh2 = false;
			patharr.push(new PathPoint({"P":p, "H1":h1, "H2":h2, "useh1":false, "useh2":!islastpoint}));

		} else if(cmd === 'C' || cmd === 'c' || cmd === 'S' || cmd === 's'){
			// ABSOLUTE bezier curve to
			// relative bezier curve to 
				// The three subsiquent x/y points are relative to the last command's x/y point
				// relative x/y point (n) is NOT relative to (n-1)

			if(cmd === 'C' || cmd === 'c'){
				var currdata = [];
				// Loop through (potentially) PolyBeziers
				while(chunk.data.length){
					// Grab the next chunk of data and make sure it's length=6
					currdata = chunk.data.splice(0,6);
					if(currdata.length % 6 !== 0) { 
						importSVG_errorMessage('Bezier path command (C or c) was expecting 6 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
						while(currdata.length<6) { currdata.push(currdata[currdata.length-1]+100); }
					}
					
					// default absolute for C
					//debug("IMPORTSVG_HANDLEPATHCHUNK - Cc getting data values for new point px:" + currdata[4] + " py:" + currdata[5]);

					lastpoint.H2 = new Coord({"x":round(currdata[0], 3), "y":round(currdata[1], 3)});
					lastpoint.useh2 = true;
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
					
					debug("IMPORTSVG_HANDLEPATHCHUNK - bezier result px:"+p.x+" py:"+p.y+" h1x:"+h1.x+" h1y:"+h1.y);

					patharr.push(new PathPoint({"P":p, "H1":h1, "H2":p}));
				}
			}

		} else if(cmd === 'Z' || cmd === 'z'){
			// End Path 

		} else {
			importSVG_errorMessage("Unrecognized path command " + cmd);
		}

		return patharr;
	}

	function importSVG_errorMessage(msg) {
		console.error("Import SVG Error - " + msg);
		var msgcon = document.getElementById('svgerrormessagecontent');
		var msgbox = document.getElementById('svgerrormessagebox');
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
	}