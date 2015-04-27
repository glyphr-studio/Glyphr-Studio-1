// start of file
/**
	IO > Import > SVG Outlines
	Takes a set of XML and pulls out any path or 
	shape data that could be converted into a 
	Glyphr Studio shape.  Ignores lots of XML tags 
	and attributes.
**/


	function ioSVG_convertTagsToGlyph(svgdata){
		// debug('\n ioSVG_convertTagsToGlyph \t Start');

		var newshapes = [];
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

		/*
			GET PATH TAGS
		*/

		if(shapetags.path.length){
			// debug('\t parsing PATH');
			data = '';
			for(var p=0; p<shapetags.path.length; p++){
				data = shapetags.path[p].attributes.d;

				// if(ioSVG_checkForIgnored(data)) error = true;

				// Compound Paths are treated as different Glyphr Shapes
				data = data.replace(/Z/gi,'z');
				data = data.split('z');
				// debug('\t split z, data into ' + data.length + ' Glyphr Studio shapes.');

				for(var d=0; d<data.length; d++){
					if(data[d].length){
						newshapes.push(ioSVG_convertPathTag(data[d]));
						shapecounter++;
						newshapes[newshapes.length-1].name = ('SVG Path ' + shapecounter);
					}
				}
			}
		}

		/*
			GET RECT TAGS
		*/

		// debug('IMPORTSVG_IMPORTCODE - rect data: ');
		// console.log(shapetags);

		if(shapetags.rect.length){
			// debug('\t parsing RECT');
			data = {};
			var rectmaxes = {};

			for(var r=0; r<shapetags.rect.length; r++){
				rectmaxes = {
					'xmax': 0,
					'xmin': 0,
					'ymax': 0,
					'ymin': 0
				};

				// if(ioSVG_checkForIgnored(shapetags.rect[r])) error = true;

				data = shapetags.rect.attributes || {};

				if(data.x) rectmaxes.xmin = data.x*1;
				if(data.y) rectmaxes.ymin = data.y*1;
				if(data.width) rectmaxes.xmax = rectmaxes.xmin + (data.width*1);
				if(data.height) rectmaxes.ymax = rectmaxes.ymin + (data.height*1);

				// debug('IMPORTSVG_IMPORTCODE - Rect maxes: ' + JSON.stringify(rectmaxes));

				shapecounter++;
				newshapes.push(new Shape({'path':rectPathFromMaxes(rectmaxes), 'name':('SVG Rectangle ' + shapecounter)}));
			}
		}


		/*
			GET POLYLINE OR POLYGON TAGS
		*/
		var poly = shapetags.polygon;
		poly = poly.concat(shapetags.polyline);

		if(poly.length){
			// debug('\t parsing POLY and POLYLINE');
			data = {};
			for(var po=0; po<poly.length; po++){
				data = poly[po].attributes.points;

				// if(ioSVG_checkForIgnored(data)) error = true;

				if(data.length){
					data = data.split(' ');
					// debug('IMPORTSVG_IMPORTCODE - polyline data.points: ' + JSON.stringify(data));
					var pparr = [];
					var tpp, tcoord;
					for(var co=0; co<data.length; co++){
						tpp = data[co].split(',');
						if(tpp.length === 2){
							tcoord = new Coord({'x':tpp[0], 'y':tpp[1]});
							pparr.push(new PathPoint({'P':tcoord, 'H1':tcoord, 'H2':tcoord, 'useh1':false, 'useh2':false}));
						}
					}
					// debug(json(pparr));

					shapecounter++;
					newshapes.push(new Shape({'path':new Path({'pathpoints':pparr}), 'name':('SVG Polygon ' + shapecounter)}));
				}
			}
		}

		/*
			GET ELLIPSE OR CIRCLE TAGS
		*/
		var round = shapetags.circle;
		round = round.concat(shapetags.ellipse);

		if(round.length){
			// debug('\t parsing CIRCLE and ELLIPSE');
			data = '';
			var ellipsemaxes, radius;
			for(var c=0; c<round.length; c++){
				ellipsemaxes = {
					'xmax': 0,
					'xmin': 0,
					'ymax': 0,
					'ymin': 0
				};
				data = round[c].attributes;
				// debug('IMPORTSVG_IMPORTCODE - rect data: ' + JSON.stringify(data));

				// if(ioSVG_checkForIgnored(shapetags[r])) error = true;

				radius = data.r || data.rx;
				ellipsemaxes.xmin = (data.cx*1) - (radius*1);
				ellipsemaxes.xmax = (data.cx*1) + (radius*1);

				radius = data.r || data.ry;
				ellipsemaxes.ymin = (data.cy*1) - (radius*1);
				ellipsemaxes.ymax = (data.cy*1) + (radius*1);

				shapecounter++;
				newshapes.push(new Shape({'path':ovalPathFromMaxes(ellipsemaxes), 'name':('SVG Oval ' + shapecounter)}));
			}
		}


		if(shapecounter === 0) {
			showErrorMessageBox('Could not find any SVG tags to import.  Supported tagas are: &lt;path&gt;, &lt;rect&gt;, &lt;polygon&gt;, &lt;polyline&gt;, and &lt;ellipse&gt;.');
			return;
		}

		if(error){
			showErrorMessageBox('A transform attribute was found.  It will be ignored, probably resulting in unexpected shape outlines.  Check the Import SVG section of the Help page.');
		}

		// debug('ioSVG_convertTagsToGlyph \t End \n');
		return new Glyph({'shapes':newshapes});
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

		var newshape = new Shape({'path': new Path({'pathpoints':patharr})});
		newshape.path.validate('IMPORTSVG');
		newshape.calcMaxes();

		// debug('\t unscaled shape:');
		// debug(newshape);
		// debug(' ioSVG_convertTag - END\n');
		return newshape;
	}

	function ioSVG_isPathCommand(c){
		if('MmLlCcSsZzHhVvAaQqTt'.indexOf(c) > -1) return c;
		return false;
	}

	function ioSVG_handlePathChunk(chunk, patharr, islastpoint){
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

			switch(cmd){
				case 'L':
				case 'M':
					// ABSOLUTE line to
					// ABSOLUTE move to
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

			// debug('\tlinear end xx yy\t' + xx + ' ' + yy);
			p = new Coord({'x':xx, 'y':yy});

			lastpoint.useh2 = false;
			patharr.push(new PathPoint({'P':p, 'H1':clone(p), 'H2':clone(p), 'type':'corner', 'useh1':false, 'useh2':true}));

		} else if(iscmd('CcQqTt')){
			// ABSOLUTE quadratic bezier curve to
			// relative quadratic bezier curve to
				// These will be converted to regular (cubic) bezier curves
			var q = false;
			if(iscmd('Qq')) {
				q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});

				if(cmd === 'q') chunk.data = convertQuadraticToCubic(chunk.data, 0, 0);
				else chunk.data = convertQuadraticToCubic(chunk.data, prevx, prevy);

				// debug('\t Qq - chunk.data converted to ' + chunk.data);
			}

			// ABSOLUTE quadratic symmetric bezier curve to
			// relative quadratic symmetric bezier curve to
			if(iscmd('Tt')) {
				//lastpoint.makeSymmetric('H1');
				var qh = lastpoint.findQuadraticSymmetric();
				// debug('\t findQuadSymm returned ' + json(qh));

				chunk.data.unshift(qh.y);
				chunk.data.unshift(qh.x);

				// debug('\t Tt - chunk.data unshifted to ' + chunk.data);

				if(cmd === 't') {
					chunk.data[0] -= prevx;
					chunk.data[1] -= prevy;
					q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});
					chunk.data = convertQuadraticToCubic(chunk.data, 0, 0);
				} else {
					q = new Coord({'x':chunk.data[0], 'y':chunk.data[1]});
					chunk.data = convertQuadraticToCubic(chunk.data, prevx, prevy);
				}

				// debug('\t Tt - chunk.data converted to ' + chunk.data);
			}

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
					showErrorMessageBox('Bezier path command (C or c) was expecting 6 arguments, was passed ['+currdata+']\n<br>Failing "gracefully" by filling in default data.');
					while(currdata.length<6) { currdata.push(currdata[currdata.length-1]+100); }
				}

				// default absolute for C
				// debug('\tCc getting data values for new point px:' + currdata[4] + ' py:' + currdata[5]);

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

				// debug('\tbezier end Px Py\t'+p.x+' '+p.y+'\tH1x H1y:'+h1.x+' '+h1.y);
				patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'Q':clone(q), 'useh1':true, 'useh2':true, 'type':'corner'}));
			}

		} else if (iscmd('Ss')){
			// ABSOLUTE symmetric bezier curve to
			// relative symmetric bezier curve to
			lastpoint.makeSymmetric('H1');
			lastpoint.useh2 = true;

			// POLYBEZIER WHILE LOOP

			h1 = new Coord({'x': chunk.data[0], 'y': chunk.data[1]});
			p = new Coord({'x': chunk.data[2], 'y': chunk.data[3]});

			// debug('\t point: ' + json(p, true));

			if (iscmd('s')){
				// Relative offset for st
				h1.x += prevx;
				h1.y += prevy;
				p.x += prevx;
				p.y += prevy;
			}

			// debug('\tbezier result px:'+p.x+' py:'+p.y+' h1x:'+h1.x+' h1y:'+h1.y);

			patharr.push(new PathPoint({'P':clone(p), 'H1':clone(h1), 'H2':clone(p), 'type':'corner', 'useh1':true, 'useh2':true}));

		} else if(iscmd('Zz')){
			// End Path
		} else {
			showErrorMessageBox('Unrecognized path command '+cmd+', ignoring and moving on...');
		}

		var added = patharr[patharr.length-1];
		// debug(added);

		if(islastpoint) added.resolvePointType();

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