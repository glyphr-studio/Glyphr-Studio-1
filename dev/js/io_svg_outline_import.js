// start of file

//	--------------------------
//	Import SVG Outlines
//	--------------------------
	function ioSVG_convertTagsToChar(svgdata){
		// debug('\n ioSVG_convertTagsToChar \t Start');

		var newshapes = [];
		var data = {};
		var shapecounter = 0;
		var error = false;
		var grabtags = ['path', 'rect', 'polyline', 'polygon', 'ellipse', 'circle'];
		var jsondata;

		try {
			jsondata = convertXMLtoJSON(svgdata);
		} catch (e){
			importSVG_errorMessage(e.message);
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
				data.replace(/Z/gi,'z');
				data = data.split('z');

				for(var d=0; d<data.length; d++){
					if(data[d].length){
						newshapes.push(ioSVG_convertPathTag(data[d]));
						shapecounter++;
						newshapes[newshapes.length-1].name = ("SVG Path " + shapecounter);
					}
				}
			}
		}

		/*
			GET RECT TAGS
		*/

		// debug("IMPORTSVG_IMPORTCODE - rect data: ");
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

				data = shapetags.rect.attributes;

				if(data.x) rectmaxes.xmin = data.x*1;
				if(data.y) rectmaxes.ymin = data.y*1;
				if(data.width) rectmaxes.xmax = rectmaxes.xmin + (data.width*1);
				if(data.height) rectmaxes.ymax = rectmaxes.ymin + (data.height*1);

				// debug("IMPORTSVG_IMPORTCODE - Rect maxes: " + JSON.stringify(rectmaxes));

				shapecounter++;
				newshapes.push(new Shape({'path':rectPathFromMaxes(rectmaxes), 'name':("SVG Rectangle " + shapecounter)}));
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
					// debug("IMPORTSVG_IMPORTCODE - polyline data.points: " + JSON.stringify(data));
					var pparr = [];
					var tpp, tcoord;
					for(var co=0; co<data.length; co++){
						tpp = data[co].split(',');
						if(tpp.length === 2){
							tcoord = new Coord({"x":tpp[0], "y":tpp[1]});
							pparr[co] = new PathPoint({"P":tcoord, "H1":tcoord, "H2":tcoord, "useh1":false, "useh2":false});
						}
					}
					// debug(json(pparr));

					shapecounter++;
					newshapes.push(new Shape({'path':new Path({'pathpoints':pparr}), 'name':("SVG Polygon " + shapecounter)}));
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
				// debug("IMPORTSVG_IMPORTCODE - rect data: " + JSON.stringify(data));

				// if(ioSVG_checkForIgnored(shapetags[r])) error = true;

				radius = data.r || data.rx;
				ellipsemaxes.xmin = (data.cx*1) - (radius*1);
				ellipsemaxes.xmax = (data.cx*1) + (radius*1);

				radius = data.r || data.ry;
				ellipsemaxes.ymin = (data.cy*1) - (radius*1);
				ellipsemaxes.ymax = (data.cy*1) + (radius*1);

				shapecounter++;
				newshapes.push(new Shape({'path':ovalPathFromMaxes(ellipsemaxes), 'name':("SVG Oval " + shapecounter)}));
			}
		}


		if(shapecounter === 0) {
			importSVG_errorMessage("Could not find any SVG tags to import.  Supported tagas are: &lt;path&gt;, &lt;rect&gt;, &lt;polygon&gt;, &lt;polyline&gt;, and &lt;ellipse&gt;.");
			return;
		}

		if(error){
			importSVG_errorMessage("A transform attribute was found.  It will be ignored, probably resulting in unexpected shape outlines.  Check the Import SVG section of the Help page.");
		}

		// debug('ioSVG_convertTagsToChar \t End \n');
		return new Char({"charshapes":newshapes});
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
		if(tagname === obj.name){
			return obj;
		} else if (obj.content){
			for(var c=0; c<obj.content.length; c++){
				var sub = ioSVG_getFirstTagInstance(obj.content[c], tagname);
				if(sub) return sub;
			}
		} else return false;
	}

	function ioSVG_scrubAttr(s){
		// debug('ioSVG_scrubAttr');
		// debug('\t before: ' + s);
		var re = s.replace(/[^\w\s,#.]/gi, '');
		// debug('\t afters: ' + re);
		return re;
	}


	function ioSVG_convertPathTag(data) {
		// just path data
		// debug("ioSVG_convertPathTag - data is \n" + data);

		// Parse in the path data, comma separating everything
		data = data.replace(/(\s)/g, ',');
		data = data.replace(/-/g, ',-');
		if(data.charAt(0) === ' ') data = data.slice(1);

		var curr = 0;
		while(curr < data.length){
			if(ioSVG_isPathCommand(data.charAt(curr))){
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

		data = data.replace(/,,/g,',');
		if(data.charAt(0) === ',') data = data.slice(1);

		// debug("ioSVG_convertPathTag - parsed path data as \n" + data);

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

		// debug("ioSVG_convertPathTag - chunkarr data is \n" + json(chunkarr, true));

		// Turn the commands and data into Glyphr objects
		var patharr = [];
		for(var c=0; c<chunkarr.length; c++){
			// debug("\nHandling Path Chunk " + c);
			if(chunkarr[c].command){
				patharr = ioSVG_handlePathChunk(chunkarr[c], patharr, (c===chunkarr.length-1));
			}
		}

		// Combine 1st and last point
		var fp = patharr[0];
		var lp = patharr[patharr.length-1];
		if((fp.P.x===lp.P.x)&&(fp.P.y===lp.P.y)){
			// debug("ioSVG_convertPathTag - fp/lp same:\nFirst Point: "+json(fp)+"\nLast Point:  "+json(lp));
			fp.H1.x = lp.H1.x;
			fp.H1.y = lp.H1.y;
			fp.useh1 = lp.useh1;
			patharr.pop();
			fp.resolvePointType();
			// debug("ioSVG_convertPathTag - AFTER:\nFirst Point: "+json(fp));
		}

		var newshape = new Shape({"path":new Path({"pathpoints":patharr})});
		newshape.path.validate('IMPORTSVG');
		newshape.path.calcMaxes();

		// debug("IMPORTSVG_PARSEPATHTAG - unscaled shape: \n" + json(newshape));

		return newshape;
	}

	function ioSVG_isPathCommand(c){
		if('MmLlCcSsZzHhVv'.indexOf(c) > -1) return c;
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
			Z z		Close Path

			Possibly fail gracefully for these by moving to the final point
			A a		ArcTo (don't support)
			Q q		Quadratic Bezier (don't support)
			T t		Smooth Quadratic (don't support)
		*/

		var cmd = chunk.command;
		var p, h1;
		var lastpoint = patharr[patharr.length-1] || new PathPoint({"P":new Coord({"x":0,"y":0})});
		var prevx = lastpoint.P.x;
		var prevy = lastpoint.P.y;

		// debug("\tprevious point x y\t"+prevx+" "+prevy);
		// debug("\t"+cmd+" ["+chunk.data+"]");


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

			// debug("\tlinear end xx yy\t" + xx + " " + yy);
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
				// debug("\tCc getting data values for new point px:" + currdata[4] + " py:" + currdata[5]);

				lastpoint.H2 = new Coord({"x": currdata[0], "y": currdata[1]});
				lastpoint.useh2 = true;
				lastpoint.resolvePointType();
				h1 = new Coord({"x": currdata[2], "y": currdata[3]});
				p = new Coord({"x": currdata[4], "y": currdata[5]});

				if (cmd === 'c'){
					// Relative offset for c
					lastpoint.H2.x += prevx;
					lastpoint.H2.y += prevy;
					h1.x += prevx;
					h1.y += prevy;
					p.x += prevx;
					p.y += prevy;
				}

				// debug("\tbezier end Px Py\t"+p.x+" "+p.y+"\tH1x H1y:"+h1.x+" "+h1.y);

				patharr.push(new PathPoint({"P":p, "H1":h1, "H2":p, "useh1":true, "useh2":true}));
			}

		} else if (cmd === 'S' || cmd === 's'){
			// ABSOLUTE symmetric shorthand bezier curve to
			// relative symmetric shorthand bezier curve to
			lastpoint.makeSymmetric('H1');
			lastpoint.useh2 = true;

			h1 = new Coord({"x": chunk.data[0], "y": chunk.data[1]});
			p = new Coord({"x": chunk.data[2], "y": chunk.data[3]});

			if (cmd === 's'){
				// Relative offset for s
				h1.x += prevx;
				h1.y += prevy;
				p.x += prevx;
				p.y += prevy;
			}

			// debug("\tbezier result px:"+p.x+" py:"+p.y+" h1x:"+h1.x+" h1y:"+h1.y);

			patharr.push(new PathPoint({"P":p, "H1":h1, "H2":p, "type":"symmetric", "useh1":true, "useh2":true}));

		} else if(cmd === 'Z' || cmd === 'z'){
			// End Path
		} else {
			importSVG_errorMessage("Unrecognized path command "+cmd+", ignoring and moving on...");
		}

		var added = patharr[patharr.length-1];
		// debug("CREATED PATH POINT \n"+json(added));
		if(islastpoint) added.resolvePointType();

		return patharr;
	}



//	-------------------
//	XML to JSON
//	-------------------

	function convertXMLtoJSON(inputXML){
		var XMLdoc, XMLerror;
		// debug('convertXMLtoJSON \t PASSED\n' + inputXML);

		if (typeof window.DOMParser !== "undefined") {
			XMLdoc = (new window.DOMParser()).parseFromString(inputXML, "text/xml");
		} else if (typeof window.ActiveXObject !== "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
			XMLdoc = new window.ActiveXObject("Microsoft.XMLDOM");
			XMLdoc.async = "false";
			XMLdoc.loadXML(inputXML);
		} else {
			console.warn('No XML document parser found.');
			XMLerror = new SyntaxError('No XML document parser found.');
			throw XMLerror;
		}

		var parsererror = XMLdoc.getElementsByTagName("parsererror");
		if (parsererror.length) {
			var msgcon = XMLdoc.getElementsByTagName('div')[0].innerHTML;
			XMLerror = new SyntaxError(trim(msgcon));
			throw XMLerror;
		}

		return {
			'name' : XMLdoc.documentElement.nodeName,
			'attributes' : tag_getAttributes(XMLdoc.documentElement.attributes),
			'content' : tag_getContent(XMLdoc.documentElement)
		};


		function tag_getContent(parent) {
			var kids = parent.childNodes;
			// debug('\nTAG: ' + parent.nodeName + '\t' + parent.childNodes.length);

			if(kids.length === 0) return trim(parent.nodeValue);

			var result = [];
			var node, tagresult, tagcontent, tagattributes;

			for(var k=0; k<kids.length; k++){
				tagresult = {};
				node = kids[k];
				// debug('\n\t>>START kid ' + k + ' ' + node.nodeName);
				if(node.nodeName === '#comment') break;

				tagcontent = tag_getContent(node);
				tagattributes = tag_getAttributes(node.attributes);

				if(node.nodeName === '#text' && JSON.stringify(tagattributes) === '{}'){
					tagresult = trim(tagcontent);
				} else {
					tagresult.name = node.nodeName;
					tagresult.attributes = tagattributes;
					tagresult.content = tagcontent;
				}

				if(tagresult !== '') result.push(tagresult);

				// debug('\t>>END kid ' + k);
			}

			return result;
		}

		function tag_getAttributes(attributes) {
			if(!attributes || !attributes.length) return {};

			// debug('\t\t tag_getAttributes:');
			// debug(attributes);

			var result = {};
			var attr;

			for(var a=0; a<attributes.length; a++){
				attr = attributes[a];
				// debug('\t\t'+attr.name+' : '+attr.value);
				result[attr.name] = trim(attr.value);
			}

			return result;
		}

		function trim(text) {
			try { 
				text = text.replace(/^\s+|\s+$/g, '');
				return text.replace(/(\r\n|\n|\r|\t)/gm,"");
			} catch(e) { return ''; }
		}
	}

// end of file