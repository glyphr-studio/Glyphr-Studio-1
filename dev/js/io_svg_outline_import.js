// start of file
/**
	IO > Import > SVG Outlines
	Takes a set of XML and pulls out any path or 
	shape data that could be converted into a 
	Glyphr Studio shape.  Ignores lots of XML tags 
	and attributes.
**/


	function ioSVG_convertTagsToGlyph(svgdata){
		// debug('\n ioSVG_convertTagsToGlyph - START');

		var newshapes = [];
		var ns;
		var mid = (_GP.projectsettings.ascent / 2);
		var parsedshape = {};
		var data = {};
		var shapecounter = 0;
		var error = false;
		var grabtags = ['path', 'rect', 'polyline', 'polygon', 'ellipse', 'circle'];
		var jsondata;

		try {
			jsondata = convertXMLtoJSON(svgdata);
		} catch (e){
			showErrorMessageBox(e.message);
			return;
		}

		var unsortedshapetags = ioSVG_getTags(jsondata, grabtags);
		var shapetags = {};

		// get a sorted shapetags object
		for(var g=0; g<grabtags.length; g++) shapetags[grabtags[g]] = [];
		for(var s=0; s<unsortedshapetags.length; s++) shapetags[unsortedshapetags[s].name].push(unsortedshapetags[s]);

		// debug('\t shapetags from imported XML: ');
		// debug(shapetags);

		function pushShape(p, n) {
			shapecounter++;
			n = (n + ' ' + shapecounter);
			newshapes.push(new Shape({'path':p, 'name':n}));
		}


		/*
			GET PATH TAGS
		*/
		if(shapetags.path.length){
			data = '';
			ppath = {};

			for(var p=0; p<shapetags.path.length; p++){
				// Compound Paths are treated as different Glyphr Shapes
				data = shapetags.path[p].attributes.d;
				data = data.replace(/Z/gi,'z');
				data = data.split('z');

				for(var d=0; d<data.length; d++){
					if(data[d].length){
						ppath = ioSVG_convertPathTag(data[d]);
						
						if(ppath.pathpoints.length){
							pushShape(ppath, 'Path');
						}
					}
				}
			}
		}


		/*
			GET RECT TAGS
		*/
		if(shapetags.rect.length){
			data = {};
			var rectmaxes, x, y, w, h;
			
			for(var r=0; r<shapetags.rect.length; r++){
				data = shapetags.rect[r].attributes || {};
				x = data.x*1 || 0;
				y = data.y*1 || 0;
				w = data.width*1 || 0;
				h = data.height*1 || 0;

				if(!(w===0 && h===0)){
					rectmaxes = {
						xmax: x+w,
						xmin: x,
						ymax: y+h,
						ymin: y
					};

					pushShape(rectPathFromMaxes(rectmaxes), 'Rectangle');
				}
			}
		}


		/*
			GET POLYLINE OR POLYGON TAGS
		*/
		var poly = shapetags.polygon;
		poly = poly.concat(shapetags.polyline);

		if(poly.length){
			data = {};
			var pparr, tpp, tcoord;
			
			for(var po=0; po<poly.length; po++){
				data = poly[po].attributes.points;

				if(data.length){
					pparr = [];
					data = data.split(' ');
					
					for(var co=0; co<data.length; co++){
						tpp = data[co].split(',');
						
						if(tpp.length === 2){
							tcoord = new Coord({'x':tpp[0], 'y':tpp[1]});
							pparr.push(new PathPoint({'P':tcoord, 'H1':tcoord, 'H2':tcoord, 'useh1':false, 'useh2':false}));
						}
					}

					pushShape(new Path({'pathpoints':pparr}), 'Polygon');
				}
			}
		}


		/*
			GET ELLIPSE OR CIRCLE TAGS
		*/
		var elli = shapetags.circle;
		elli = elli.concat(shapetags.ellipse);

		if(elli.length){
			data = {};
			var ellipsemaxes, rx, ry, cx, cy;
			
			for(var c=0; c<elli.length; c++){
				data = elli[c].attributes;
				rx = data.r*1 || data.rx*1 || 0;
				rx = Math.abs(rx);
				ry = data.r*1 || data.ry*1 || 0;
				ry = Math.abs(ry);
				cx = data.cx*1 || 0;
				cy = data.cy*1 || 0;
				
				if(!(rx===0 && ry===0)){
					ellipsemaxes = {
						xmin: cx-rx,
						xmax: cx+rx,
						ymin: cy-ry,
						ymax: cy+ry
					};

					pushShape(ovalPathFromMaxes(ellipsemaxes), 'Oval');
				}
			}
		}


		if(shapecounter === 0) {
			showErrorMessageBox('Could not find any SVG tags to import.  Supported tagas are: &lt;path&gt;, &lt;rect&gt;, &lt;polygon&gt;, &lt;polyline&gt;, and &lt;ellipse&gt;.');
			return;
		}

		if(error){
			showErrorMessageBox('A transform attribute was found.  It will be ignored, probably resulting in unexpected shape outlines.  Check the Import SVG section of the Help page.');
		}


		var reglyph = new Glyph({'shapes':newshapes});
		reglyph.changed(true);

		debug(reglyph);

		debug(' ioSVG_convertTagsToGlyph - END\n');
		return reglyph;
	}

	function ioSVG_getTags(obj, grabtags) {
		// debug('\n ioSVG_getTags \t Start');
		// debug('\t grabtags: ' + JSON.stringify(grabtags));
		// debug('\t passed obj: ');
		// debug(obj);

		if(typeof grabtags === 'string') grabtags = [grabtags];
		var result = [];

		if(obj.content){
			for(var c=0; c<obj.content.length; c++){
				result = result.concat(ioSVG_getTags(obj.content[c], grabtags));
			}
		} else {
			if(grabtags.indexOf(obj.name) > -1){
				result = [obj];
			}
		}

		// debug('ioSVG_getTags \t End \n');
		return result;
	}

	function ioSVG_getFirstTagInstance(obj, tagname) {
		// debug('\n ioSVG_getFirstTagInstance - START');
		// debug('\t finding ' + tagname + ' in:');
		// debug(obj);

		if(tagname === obj.name){
			// debug(' ioSVG_getFirstTagInstance - tagname === obj.name - END\n');
			return obj;
		} else if (obj.content){
			for(var c=0; c<obj.content.length; c++){
				var sub = ioSVG_getFirstTagInstance(obj.content[c], tagname);
				if(sub){
					// debug(' ioSVG_getFirstTagInstance - looked through obj and found it - END\n');
					return sub;
				}
			}
		} else {
			// debug(' ioSVG_getFirstTagInstance - NO obj.content FOUND - END\n');
			return false;
		}
	}

	function ioSVG_convertPathTag(data) {
		// debug('\n ioSVG_convertPathTag - START');
		// debug('\t dirty data\n' + data);

		// Parse in the path data, comma separating everything
		data = data.replace(/(\s+)/g, ',');

		var curr = 0;
		while(curr < data.length){
			if(ioSVG_isPathCommand(data.charAt(curr))){
				data = (data.slice(0,curr)+','+data.charAt(curr)+','+data.slice(curr+1));
				curr++;
			}
			if(curr > 99999) {
				showErrorMessageBox('Data longer than 100,000 glyphs is super uncool.');
				return;
			} else {
				curr++;
			}
		}

		// Clean up negative numbers, and scientific notation numbers
		data = data.replace(/e-/g, '~~~');
		data = data.replace(/-/g, ',-');
		data = data.replace(/~~~/g, 'e-');

		// Clean up commas and whitespace
		if(data.charAt(0) === ' ') data = data.slice(1);
		data = data.replace(/,+/g,',');
		if(data.charAt(data.length-1) === ',') data = data.slice(0, -1);
		if(data.charAt(0) === ',') data = data.slice(1);

		// debug('\t clean data\n' + data);

		// Parse comma separated data into commands / data chunks
		data = data.split(',');
		var chunkarr = [];
		var commandpos = 0;
		var command;
		var dataarr = [];
		curr = 1;
		while(curr <= data.length){
			if(ioSVG_isPathCommand(data[curr])){
				dataarr = data.slice(commandpos+1, curr);
				command = data[commandpos];
				for(var i=0; i<dataarr.length; i++) dataarr[i] = Number(dataarr[i]);
				chunkarr.push({'command':command, 'data':dataarr});
				commandpos = curr;
			}
			curr++;
		}
		// Fencepost
		dataarr = data.slice(commandpos+1, curr);
		command = data[commandpos];
		for(var j=0; j<dataarr.length; j++) dataarr[j] = Number(dataarr[j]);
		chunkarr.push({'command':command, 'data':dataarr});

		// debug('\t chunkarr data is \n' + json(chunkarr, true));

		// Turn the commands and data into Glyphr objects
		var patharr = [];
		for(var c=0; c<chunkarr.length; c++){
			// debug('\n\t Path Chunk ' + c);
			// debug('\t ' + chunkarr[c].command + ' : ' + chunkarr[c].data);
			if(chunkarr[c].command){
				patharr = ioSVG_handlePathChunk(chunkarr[c], patharr, (c===chunkarr.length-1));
			}
		}

		// Combine 1st and last point
		var fp = patharr[0];
		var lp = patharr[patharr.length-1];
		if((fp.P.x===lp.P.x)&&(fp.P.y===lp.P.y)){
			// debug('\t fp/lp same:\nFirst Point: '+json(fp)+'\nLast Point:  '+json(lp));
			fp.H1.x = lp.H1.x;
			fp.H1.y = lp.H1.y;
			fp.useh1 = lp.useh1;
			patharr.pop();
			fp.resolvePointType();
			// debug('\t AFTER:\nFirst Point: '+json(fp));
		}

		var newpath = new Path({'pathpoints':patharr});
		newpath.validate('IMPORTSVG');

		// debug('\t unscaled shape:');
		// debug(newpath);
		// debug(' ioSVG_convertTag - END\n');
		return newpath;
	}

	function ioSVG_isPathCommand(c){
		if('MmLlCcSsZzHhVvAaQqTt'.indexOf(c) > -1) return c;
		return false;
	}

	function ioSVG_handlePathChunk(chunk, patharr, islastpoint){
		debug('\n ioSVG_handlePathChunk - START');
		debug('\t chunk: ' + json(chunk, true));
		/*
			Path Instructions: Capital is absolute, lowercase is relative
			M m		MoveTo
			L l		LineTo
			H h		Horizontal Line
			V v		Vertical Line
			C c		Bezier (can be chained)
			S s		Smooth Bezier
			Q q		Quadratic Bezier (can be chained)
			T t		Smooth Quadratic
			Z z		Close Path

			Possibly fail gracefully for these by moving to the final point
			A a		ArcTo (don't support)
		*/

		var cmd = chunk.command;
		var currdata = [];
		var iscmd = function(str){ return str.indexOf(cmd) > -1; };
		var p, h1;
		var lastpoint = patharr[patharr.length-1] || new PathPoint({'P':new Coord({'x':0,'y':0})});
		var prevx = lastpoint.P.x;
		var prevy = lastpoint.P.y;

		// debug('\t previous point: \t'+prevx+','+prevy);
		// debug('\t'+cmd+' ['+chunk.data+']');


		// handle command types
		if(iscmd('MmLlHhVv')){

			var xx = prevx;
			var yy = prevy;

			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=2
				currdata = [];
				currdata = chunk.data.splice(0,2);

				if(currdata.length % 2 !== 0 && iscmd('MmLl')) {
					showErrorMessageBox('Move or Line path command (M, m, L, l) was expecting 2 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<2) { currdata.push(currdata[currdata.length-1]+100); }
				}
				debug('\t command ' + cmd + ' while loop data ' + currdata);

				switch(cmd){
					case 'L':
					case 'M':
						// ABSOLUTE line to
						// ABSOLUTE move to
						xx = currdata[0];
						yy = currdata[1];
						break;
					case 'l':
					case 'm':
						// relative line to
						// relative move to
						xx = currdata[0] + prevx;
						yy = currdata[1] + prevy;
						break;
					case 'H':
						// ABSOLUTE horizontal line to
						xx = currdata[0];
						// chunk.data.unshift(currdata[1]);
						break;
					case 'h':
						// relative horizontal line to
						xx = currdata[0] + prevx;
						// chunk.data.unshift(currdata[1]);
						break;
					case 'V':
						// ABSOLUTE vertical line to
						yy = currdata[0];
						// chunk.data.unshift(currdata[1]);
						break;
					case 'v':
						// relative vertical line to
						yy = currdata[0] + prevy;
						// chunk.data.unshift(currdata[1]);
						break;
				}

				debug('\t linear end xx yy\t' + xx + ' ' + yy);
				p = new Coord({'x':xx, 'y':yy});
				debug('\t new point ' + p.x + '\t' + p.y);

				prevx = xx;
				prevy = yy;

				lastpoint.useh2 = false;
				patharr.push(new PathPoint({'P':p, 'H1':clone(p), 'H2':clone(p), 'type':'corner', 'useh1':false, 'useh2':true}));
				lastpoint = patharr[patharr.length-1];
			}

			debug('\t completed while loop');

		} else if(iscmd('CcQqTt')){
			// ABSOLUTE quadratic bezier curve to
			// relative quadratic bezier curve to
				// These will be converted to regular (cubic) bezier curves
			var q = false;
			if(iscmd('Qq')) {
				q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});

				if(cmd === 'q') chunk.data = convertQuadraticToCubic(chunk.data, 0, 0);
				else chunk.data = convertQuadraticToCubic(chunk.data, prevx, prevy);

				debug('\t Qq - chunk.data converted to ' + chunk.data);
			}

			// ABSOLUTE quadratic symmetric bezier curve to
			// relative quadratic symmetric bezier curve to
			if(iscmd('Tt')) {
				//lastpoint.makeSymmetric('H1');
				var qh = lastpoint.findQuadraticSymmetric();
				debug('\t findQuadSymm returned ' + json(qh));

				chunk.data.unshift(qh.y);
				chunk.data.unshift(qh.x);

				debug('\t Tt - chunk.data unshifted to ' + chunk.data);

				if(cmd === 't') {
					chunk.data[0] -= prevx;
					chunk.data[1] -= prevy;
					q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});
					chunk.data = convertQuadraticToCubic(chunk.data, 0, 0);
				} else {
					q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});
					chunk.data = convertQuadraticToCubic(chunk.data, prevx, prevy);
				}

				debug('\t Tt - chunk.data converted to ' + chunk.data);
			}

			// ABSOLUTE bezier curve to
			// relative bezier curve to
				// The three subsiquent x/y points are relative to the last command's x/y point
				// relative x/y point (n) is NOT relative to (n-1)

			currdata = [];
			// Loop through (potentially) PolyBeziers
			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=6
				currdata = [];
				currdata = chunk.data.splice(0,6);
				if(currdata.length % 6 !== 0) {
					showErrorMessageBox('Bezier path command (C or c) was expecting 6 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<6) { currdata.push(currdata[currdata.length-1]+100); }
				}
				debug('\t command ' + cmd + ' while loop data ' + currdata);

				// default absolute for C

				lastpoint.H2 = new Coord({'x': currdata[0], 'y': currdata[1]});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();
				h1 = new Coord({'x': currdata[2], 'y': currdata[3]});
				p = new Coord({'x': currdata[4], 'y': currdata[5]});

				if (iscmd('cqt')){
					// Relative offset for c
					lastpoint.H2.x += prevx;
					lastpoint.H2.y += prevy;
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;
					if(q){
						q.x += prevx;
						q.y += prevy;
					}
				}

				debug('\t bezier end Px Py\t'+p.x+' '+p.y+'\tH1x H1y:'+h1.x+' '+h1.y);
				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'Q':clone(q), 'useh1':true, 'useh2':true, 'type':'corner'}));
				lastpoint = patharr[patharr.length-1];
			}

			debug('\t completed while loop');

		} else if (iscmd('Ss')){
			// ABSOLUTE symmetric bezier curve to
			// relative symmetric bezier curve to


			currdata = [];
			// Loop through (potentially) PolyBeziers
			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=4
				currdata = [];
				currdata = chunk.data.splice(0,4);
				if(currdata.length % 4 !== 0) {
					showErrorMessageBox('Symmetric Bezier path command (S or s) was expecting 4 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<4) { currdata.push(currdata[currdata.length-1]+100); }
				}
				debug('\t command ' + cmd + ' while loop data ' + currdata);

				lastpoint.makeSymmetric('H1');
				lastpoint.useh2 = true;

				h1 = new Coord({'x': chunk.data[0], 'y': chunk.data[1]});
				p = new Coord({'x': chunk.data[2], 'y': chunk.data[3]});

				debug('\t point: ' + json(p, true));

				if (iscmd('s')){
					// Relative offset for st
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;
				}

				debug('\t bezier result px:'+p.x+' py:'+p.y+' h1x:'+h1.x+' h1y:'+h1.y);

				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'type':'corner', 'useh1':true, 'useh2':true}));
				lastpoint = patharr[patharr.length-1];
			}

			debug('\t completed while loop');

		} else if(iscmd('Zz')){
			// End Path
		} else {
			showErrorMessageBox('Unrecognized path command '+cmd+', ignoring and moving on...');
		}

		// Finish up last point
		if(islastpoint){
			var added = patharr[patharr.length-1];
			added.resolvePointType();
		}

		debug('\t Resulting Path Chunk');
		debug(json(patharr));

		debug(' ioSVG_handlePathChunk - END\n');

		return patharr;
	}

	function convertQuadraticToCubic(data, pc0x, pc0y) {
		// debug('\n convertQuadraticToCubic - START');
		// debug('\t data: ' + json(data, true));
		var re = [];
		var currdata, c1x, c1y, c2x, c2y, q0x, q0y, q1x, q1y, q2x, q2y;
		var basex = pc0x;
		var basey = pc0y;

		while(data.length){
			// Grab the next chunk of data and make sure it's length=4
			currdata = [];
			currdata = data.splice(0,4);
			// debug('\t data chunk: ' + json(currdata, true));

			if(currdata.length % 4 !== 0) {
				showErrorMessageBox('Quadratic Bezier path command (Q or q) was expecting 4 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
				while(currdata.length<4) { currdata.push(currdata[currdata.length-1]+100); }
			}

			q0x = basex;
			q0y = basey;
			q1x = currdata[0];
			q1y = currdata[1];
			q2x = currdata[2];
			q2y = currdata[3];

			c1x = q0x+((2/3)*(q1x-q0x));
			c1y = q0y+((2/3)*(q1y-q0y));

			c2x = q2x+((2/3)*(q1x-q2x));
			c2y = q2y+((2/3)*(q1y-q2y));

			re.push(c1x);
			re.push(c1y);
			re.push(c2x);
			re.push(c2y);
			re.push(q2x);
			re.push(q2y);

			basex = q2x;
			basey = q2y;
		}

		return re;
	}

// end of file