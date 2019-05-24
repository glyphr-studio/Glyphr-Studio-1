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
		var data = {};
		var shapecounter = 0;
		var error = false;
		var grabtags = ['path', 'rect', 'polyline', 'polygon', 'ellipse', 'circle'];
		var jsondata;

		try {
			jsondata = convertXMLtoJSON(svgdata);
		} catch (e){
			if(e.message === 'XMLdoc.getElementsByTagName(...)[0] is undefined'){
				e.message = 'No SVG Shape or Path Tags could be found.  Make sure the SVG code is in proper XML format.'
			}
			showErrorMessageBox(e.message);
			return;
		}

		var unsortedshapetags = ioSVG_getTags(jsondata, grabtags);
		var shapetags = {};

		// debug('\t unsorted shapetags from imported XML: ');
		// debug(unsortedshapetags);

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
				data = cleanAndFormatPathPointData(data);

				for(var d=0; d<data.length; d++){
					if(data[d].length){
						ppath = ioSVG_convertPathTag(data[d], newshapes);
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
			var pparr, tpp, tcoord, px, py;
			
			for(var po=0; po<poly.length; po++){
				data = poly[po].attributes.points;
				data = cleanAndFormatPathPointData(data);
				data = data[0].split(',');
				
				// debug('\t Polyline or Polygon data, cleaned & formatted:');
				// debug(data);

				if(data.length){
					pparr = [];
					
					for(var co=0; co<data.length; co+=2){
						px = data[co] || 0;
						py = data[co+1] || 0;
						
						tcoord = new Coord({'x':px, 'y':py});
						pparr.push(new PathPoint({'P':tcoord, 'H1':tcoord, 'H2':tcoord, 'useh1':false, 'useh2':false}));
						
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

		// debug(reglyph);

		// debug(' ioSVG_convertTagsToGlyph - END\n');
		return reglyph;
	}

	function cleanAndFormatPathPointData(data) {
		/*
			Takes a string representing input from a <path> tag's
			'd' attribute.

			Returns an array of strings.  Each array element
			representing one Glyphr Studio shape.  String will be 
			comma separated Path Commands and Values

		*/
		var returndata = [];

		// debug('\n cleanAndFormatPathPointData - START');
		// debug('\t dirty data\n\t ' + data);

		// Move commands for a path are treated as different Glyphr Shapes
		data = data.replace(/M/g,',z,M');
		data = data.replace(/m/g,',z,m');


		// Parse in the path data, comma separating everything
		data = data.replace(/(\s+)/g, ',');


		// Normalize Z end path command
		data = data.replace(/Z/gi,'z');


		// Put commas between Path Commands and preceeding numbers
		var curr = 0;
		while(curr < data.length){
			if(ioSVG_isPathCommand(data.charAt(curr))){
				data = (data.slice(0,curr)+','+data.charAt(curr)+','+data.slice(curr+1));
				curr++;
			}
			if(curr > 1000000) {
				showErrorMessageBox('SVG path data longer than a million points is super uncool.');
				return;
			} else {
				curr++;
			}
		}


		// Clean up negative numbers, and scientific notation numbers
		data = data.replace(/e-/g, '~~~');
		data = data.replace(/-/g, ',-');
		data = data.replace(/~~~/g, 'e-');


		// Clean up  whitespace
		// if(data.charAt(0) === ' ') data = data.slice(1);
		data = data.replace(/(\s+)/g, '');


		// Clean up some commas
		data = data.replace(/,+/g,',');
		if(data.charAt(0) === ',') data = data.slice(1);


		// Remove extra Z commands
		// debug('\t 2nd to last char ' + data.charAt(data.length-2));
		if(data.charAt(data.length-2) === 'z') data = data.slice(0, -2);
		// if(data.substr(-2) === ',z') data = data.slice(0, -2);
		// if(data.substr(0, 3) === ',z,') data = data.slice(3);
		// debug('\t first two chars are |' + data.substr(0,2) + '|');
		if(data.substring(0, 2) === 'z,') data = data.slice(2);


		// Clean up commas again
		data = data.replace(/,+/g,',');
		if(data.charAt(data.length-1) === ',') data = data.slice(0, -1);
		if(data.charAt(0) === ',') data = data.slice(1);


		// Check for 'double decimal' numbers
		data = data.split(',');
		var first = -1;
		var second = -1;
		var subsequence = '';

		data.forEach(function(v, i, a){
			// Search for two instances of '.'
			// debug('\t v: ' + v);
			first = v.indexOf('.');
			// debug('\t first: ' + first);
			
			if(first > -1){
				second = v.indexOf('.', (first+1));
				// debug('\t second: ' + second);
				if(second > -1){
					returndata.push(v.slice(0, second));
					subsequence = v.slice((second));
					// debug('\t just the tail: ' + subsequence);
					subsequence = subsequence.replace(/\./g, ',0.');
					if(subsequence.charAt(0) === ',') subsequence = subsequence.slice(1);
					// debug('\t added zeros: ' + subsequence);
					subsequence = subsequence.split(',');
					// debug('\t subsequence: ' + subsequence);
					returndata = returndata.concat(subsequence);
				
				} else {
					// no two instances of '.'
					returndata.push(v);
				}
			
			} else {
				// no two instances of '.'
				returndata.push(v);
			}
			
			first = -1;
			second = -1;
			subsequence = '';
		});



		// Make into an array
		returndata = returndata.join(',');
		returndata = returndata.split(',z');

		// debug('\t clean data\n\t ' + returndata);
		// debug(' cleanAndFormatPathPointData - END\n');

		return returndata;
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

	function ioSVG_convertPathTag(data, currentshapes) {
		// debug('\n ioSVG_convertPathTag - START');
		// debug('\t passed data ' + data);

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
			
				// debug('\t Handling command ' + command);
				// debug('\t With data ' + dataarr);

				chunkarr.push({'command':command, 'data':dataarr});
				commandpos = curr;
			}
			curr++;
		}

		// Fencepost
		dataarr = data.slice(commandpos+1, curr);
		command = data[commandpos];
		for(var j=0; j<dataarr.length; j++) dataarr[j] = Number(dataarr[j]);
		// debug('\t FENCEPOST');
		// debug('\t Handling command ' + command);
		// debug('\t With data ' + dataarr);
		chunkarr.push({'command':command, 'data':dataarr});

		// debug('\t chunkarr data is \n' + json(chunkarr, true));

		// Turn the commands and data into Glyphr objects
		var patharr = [];
		for(var c=0; c<chunkarr.length; c++){
			// debug('\n\t Path Chunk ' + c);
			// debug('\t ' + chunkarr[c].command + ' : ' + chunkarr[c].data);
			if(chunkarr[c].command){
				patharr = ioSVG_handlePathChunk(chunkarr[c], patharr, (c===chunkarr.length-1), currentshapes);
			}
		}

		// Combine 1st and last point
		var fp = patharr[0];
		var lp = patharr[patharr.length-1];
		// debug(`\t FPx = LPX / FPy = LPy\n\t ${fp.P.x} = ${lp.P.x} \n\t ${fp.P.y} = ${lp.P.y}`);

		if((round(fp.P.x, 4)===round(lp.P.x, 4))&&(round(fp.P.y, 4)===round(lp.P.y, 4))){
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

		// debug('\t unscaled path:');
		// debug(newpath);
		// debug(' ioSVG_convertTag - END\n');
		return newpath;
	}

	function ioSVG_isPathCommand(c){
		if('MmLlCcSsZzHhVvAaQqTt'.indexOf(c) > -1) return c;
		return false;
	}

	function ioSVG_handlePathChunk(chunk, patharr, islastpoint, currentshapes){
		// debug('\n ioSVG_handlePathChunk - START');
		// debug('\t chunk: ' + json(chunk, true));

		var cmd = chunk.command;
		var currdata = [];
		var iscmd = function(str){ return str.indexOf(cmd) > -1; };
		var p, nx, ny, h1;
		var prevx, prevy;

		// For relative path commands, figure out what the previous point is
		var lastpoint = false;
		
		if(patharr.length) {
			// Middle of current path, use the previous point
			lastpoint = patharr[patharr.length-1];
			// debug(`\t last point from current path`);

		} else if (currentshapes && currentshapes.length) {
			// First point in this compound path, look to the last
			// point in the previous path
			var lastshape = currentshapes[currentshapes.length-1];
			if(lastshape && lastshape.path && lastshape.path.pathpoints.length) {
				// lastpoint = lastshape.path.pathpoints[lastshape.path.pathpoints.length-1];
				lastpoint = lastshape.path.pathpoints[0];
				// debug(`\t last point from PREVIOUS path`);
			}
		}

		if(!lastpoint) {
			// Default to a new 0,0 point
			lastpoint = new PathPoint({'P':new Coord({'x':0,'y':0})});
			// debug(`\t Default last point`);
		}

		// debug(lastpoint);

		// debug('\t previous point: \t'+lastpoint.P.x+','+lastpoint.P.y);

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

			Partially supported, just draw a line to the end point
			A a		ArcTo
		*/


		if(iscmd('MmLlHhVv')){
			// ABSOLUTE line methods
			// relative line methods
			
			nx = lastpoint.P.x;
			ny = lastpoint.P.y;

			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=2
				currdata = [];
				currdata = chunk.data.splice(0,2);

				if(currdata.length % 2 !== 0 && iscmd('MmLl')) {
					showErrorMessageBox('Move or Line path command (M, m, L, l) was expecting 2 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<2) { currdata.push(currdata[currdata.length-1]+100); }
				}
				// debug('\n\t command ' + cmd + ' while loop data ' + currdata);

				prevx = lastpoint.P.x;
				prevy = lastpoint.P.y;

				switch(cmd){
					case 'L':
					case 'M':
						// ABSOLUTE line to
						// ABSOLUTE move to
						nx = currdata[0];
						ny = currdata[1];
						break;
					case 'l':
					case 'm':
						// relative line to
						// relative move to
						nx = currdata[0] + prevx;
						ny = currdata[1] + prevy;
						break;
					case 'H':
						// ABSOLUTE horizontal line to
						nx = currdata[0];
						// chunk.data.unshift(currdata[1]);
						break;
					case 'h':
						// relative horizontal line to
						nx = currdata[0] + prevx;
						// chunk.data.unshift(currdata[1]);
						break;
					case 'V':
						// ABSOLUTE vertical line to
						ny = currdata[0];
						// chunk.data.unshift(currdata[1]);
						break;
					case 'v':
						// relative vertical line to
						ny = currdata[0] + prevy;
						// chunk.data.unshift(currdata[1]);
						break;
				}

				// debug('\t linear end nx ny\t' + nx + ' ' + ny);
				p = new Coord({'x':nx, 'y':ny});
				// debug('\t new point ' + p.x + '\t' + p.y);

				lastpoint.useh2 = false;
				patharr.push(new PathPoint({'P':p, 'H1':clone(p), 'H2':clone(p), 'type':'corner', 'useh1':false, 'useh2':true}));
				lastpoint = patharr[patharr.length-1];
			}

			// debug('\t completed while loop');

		} else if (iscmd('Aa')){
			// ABSOLUTE arc to 
			// relative arc to 

			showErrorMessageBox('Arc To path commands (A or a) are not directly supported.  A straight line will be drawn from the begining to the end of the arc.');
			nx = lastpoint.P.x;
			ny = lastpoint.P.y;

			if(chunk.data.length % 7 !== 0) {
				showErrorMessageBox('Arc To path command (A or a) was expecting 7 arguments, was passed ['+chunk.data+']\n<br>Failing "gracefully" by just drawing a line to the last two data points as if they were a coordinate.');
				chunk.data.splice(0, chunk.data.length-2, 0,0,0,0,0);
			}

			while(chunk.data.length){
				currdata = [];
				currdata = chunk.data.splice(0,7);
				currdata = currdata.splice(5,2);
				// debug('\n\t command ' + cmd + ' while loop data ' + currdata);

				prevx = lastpoint.P.x;
				prevy = lastpoint.P.y;

				nx = currdata[0];
				ny = currdata[1];

				if(cmd === 'a'){
					nx += prevx;
					ny += prevy;
				}

				// debug('\t linear end nx ny\t' + nx + ' ' + ny);
				p = new Coord({'x':nx, 'y':ny});
				// debug('\t new point ' + p.x + '\t' + p.y);

				lastpoint.type = 'corner';
				lastpoint.useh2 = true;
				lastpoint.makePointedTo(p.x, p.y, false, 'H2', true);
				
				var pp = new PathPoint({'P':p, 'H1':clone(p), 'H2':clone(p), 'type':'corner', 'useh1':true, 'useh2':true});
				pp.makePointedTo(prevx, prevy, false, 'H1', true);
				patharr.push(pp);
				
				lastpoint = patharr[patharr.length-1];
			}

			// debug('\t completed while loop');

		} else if(iscmd('Qq')){
			// ABSOLUTE quadratic bezier curve to
			// relative quadratic bezier curve to

			currdata = [];
			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=4
				currdata = chunk.data.splice(0,4);
				if(currdata.length % 4 !== 0) {
					showErrorMessageBox('Quadratic Bezier path command (Q or q) was expecting 4 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<4) { currdata.push(currdata[currdata.length-1]+100); }
				}
				// debug('\n\n\t command ' + cmd + ' while loop data ' + currdata);

				if (iscmd('q')){
					// Relative offset for q
					prevx = lastpoint.P.x;
					prevy = lastpoint.P.y;
					currdata[0] += prevx;
					currdata[1] += prevy;
					currdata[2] += prevx;
					currdata[3] += prevy;

				}

				q = new Coord({'x': currdata[0], 'y':currdata[1]});
				currdata = [lastpoint.P.x, lastpoint.P.y].concat(currdata);
				currdata = convertQuadraticToCubic(currdata);
				// debug('\t command ' + cmd + ' after Q>C cnvrt ' + currdata);

				lastpoint.H2 = new Coord({'x': currdata[0], 'y': currdata[1]});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();

				h1 = new Coord({'x': currdata[2], 'y': currdata[3]});
				p = new Coord({'x': currdata[4], 'y': currdata[5]});


				// debug('\t bezier end Px Py\t'+p.x+' '+p.y+'\tH1x H1y:'+h1.x+' '+h1.y);

				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'Q':clone(q), 'useh1':true, 'useh2':true, 'type':'corner'}));
				lastpoint = patharr[patharr.length-1];
				
			}
			
			// debug('\t completed while loop');
			

		} else if(iscmd('Tt')) {
			// ABSOLUTE quadratic symmetric bezier curve to
			// relative quadratic symmetric bezier curve to

			currdata = [];
			// Loop through (potentially) PolyBeziers
			while(chunk.data.length){
				// Grab the next chunk of data and make sure it's length=2
				currdata = [];
				currdata = chunk.data.splice(0,2);
				if(currdata.length % 2 !== 0) {
					showErrorMessageBox('Symmetric Bezier path command (T or t) was expecting 2 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<2) { currdata.push(currdata[currdata.length-1]+100); }
				}
				// debug('\n\t command ' + cmd + ' while loop datas ' + currdata);

				if (iscmd('t')){
					// Relative offset for t
					prevx = lastpoint.P.x;
					prevy = lastpoint.P.y;
					currdata[0] += prevx;
					currdata[1] += prevy;
				}

				q = new Coord(findSymmetricPoint(lastpoint.P, lastpoint.Q));
				currdata = [lastpoint.P.x, lastpoint.P.y, q.x, q.y].concat(currdata);
				
				// debug('\t command ' + cmd + ' before Q>C cnvrt ' + currdata);
				currdata = convertQuadraticToCubic(currdata);
				// debug('\t command ' + cmd + ' afters Q>C cnvrt ' + currdata);

				lastpoint.H2 = new Coord({'x': currdata[0], 'y': currdata[1]});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();

				h1 = new Coord({'x': currdata[2], 'y': currdata[3]});
				p = new Coord({'x': currdata[4], 'y': currdata[5]});

				// debug('\t bezier end Px Py\t'+p.x+' '+p.y+'\tH1x H1y:'+h1.x+' '+h1.y);

				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'Q':clone(q), 'useh1':true, 'useh2':true, 'type':'corner'}));
				lastpoint = patharr[patharr.length-1];
				
			}
			
			// debug('\t completed while loop');
			

		} else if(iscmd('Cc')){
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
				// debug('\n\n\t command ' + cmd + ' while loop data ' + currdata);

				lastpoint.H2 = new Coord({'x': currdata[0], 'y': currdata[1]});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();

				h1 = new Coord({'x': currdata[2], 'y': currdata[3]});
				p = new Coord({'x': currdata[4], 'y': currdata[5]});

				if (iscmd('c')){
					// Relative offset for c
					prevx = lastpoint.P.x;
					prevy = lastpoint.P.y;
					lastpoint.H2.x += prevx;
					lastpoint.H2.y += prevy;
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;

				}

				// debug('\t bezier end Px Py\t'+p.x+' '+p.y+'\tH1x H1y:'+h1.x+' '+h1.y);
				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'useh1':true, 'useh2':true, 'type':'corner'}));
				lastpoint = patharr[patharr.length-1];
			}

			// debug('\t completed while loop');


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
				// debug('\n\t command ' + cmd + ' while loop data ' + currdata);

				lastpoint.makeSymmetric('H1');
				lastpoint.useh2 = true;

				h1 = new Coord({'x': currdata[0], 'y': currdata[1]});
				p = new Coord({'x': currdata[2], 'y': currdata[3]});

				// debug('\t P before: ' + json(p, true));

				if (iscmd('s')){
					// Relative offset for st
					prevx = lastpoint.P.x;
					prevy = lastpoint.P.y;
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;
				}
				
				// debug('\t P afters: ' + json(p, true));
				// debug('\t H1 after: ' + json(h1, true));

				

				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'type':'symmetric', 'useh1':true, 'useh2':true}));
				lastpoint = patharr[patharr.length-1];
			}

			// debug('\t completed while loop');


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

		// debug('\t Resulting Path Chunk');
		// debug(patharr);

		// debug(' ioSVG_handlePathChunk - END\n');

		return patharr;
	}

	function findSymmetricPoint(p, h){
		// debug('\n findSymmetricPoint - START');
		p = p || {x:0, y:0};
		h = h || {x:0, y:0};

		// debug('\t p: ' + json(p, true));
		// debug('\t h: ' + json(h, true));

		var re = {
			'x' : ((p.x - h.x) + p.x),
			'y' : ((p.y - h.y) + p.y)
		};

		// debug('\t returning ' + json(re, true));
		// debug(' findSymmetricPoint - END\n');

		return re;
	}

	function convertQuadraticToCubic(data) {
		// debug('\n convertQuadraticToCubic - START');
		// debug('\t data: ' + json(data, true));
		var re = [];

		var q0x = data[0];
		var q0y = data[1];
		var q1x = data[2];
		var q1y = data[3];
		var q2x = data[4];
		var q2y = data[5];

		var c1x = q0x+((2/3)*(q1x-q0x));
		var c1y = q0y+((2/3)*(q1y-q0y));

		var c2x = q2x+((2/3)*(q1x-q2x));
		var c2y = q2y+((2/3)*(q1y-q2y));

		re.push(c1x);
		re.push(c1y);
		re.push(c2x);
		re.push(c2y);
		re.push(q2x);
		re.push(q2y);

		return re;
	}

// end of file