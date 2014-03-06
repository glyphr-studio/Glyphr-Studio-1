var LoadPage = function() {};

	LoadPage.prototype.loadPage_openproject = function() {
		debug("LOADING PAGE >> loadPage_openproject");
		var ct = "<div class='pagecontent textpage'><h1>Open Project</h1>" +
		"<h2>But wait!</h2>If you open a new project, your current project will be lost.  Be sure to download a Glyphr " +
		"project file if you want to save your current project.<br><br>" +
		"<input type='button' class='button'style='padding:10px;' value='Save current project' onclick='triggerProjectFileDownload();'/><br><br>" +
		"<h2>Okay, now...</h2>";
		
		ct += this.importOrCreateNew();
		ct += "</div>";
		
		document.getElementById("mainwrapper").innerHTML = ct;
		document.getElementById("droptarget").addEventListener('dragover', this.handleDragOver, false);
		document.getElementById("droptarget").addEventListener('drop', this.handleDrop, false);
	};
	
	LoadPage.prototype.loadPage_firstrun = function() {
		debug("LOADING PAGE >> loadPage_firstrun");
		var ct = "<div class='splashscreen textpage'><canvas id='splashscreencanvas' height=494 width=800></canvas>";
		ct += "<div class='splashver'>"+_UI.thisGlyphrStudioVersion+"<br><br>";
		ct += "For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>";
		ct += "Glyphr Studio is licensed under a <a href='http://creativecommons.org/licenses/by-sa/3.0/' target=_new>Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br>";
		ct += "Which basically means you can use Glyphr Studio for commercial purposes, remix and adapt Glyphr Studio to your own needs, and re-share Glyphr Studio with the same license applied.";
		ct += "</div>";
		ct += this.importOrCreateNew();
		ct += "</div>";
		
		var mp = document.getElementById("mainwrapper");
		mp.innerHTML = ct;
		mp.style.marginLeft = "0px";
/*
		document.getElementById("navarea_tabs").style.display = "none";
		document.getElementById("navarea_panel").style.display = "none";
		document.getElementById("logocanvas").style.display = "none";
		*/
		document.getElementById("droptarget").addEventListener('dragover', this.handleDragOver, false);
		document.getElementById("droptarget").addEventListener('drop', this.handleDrop, false);

		drawSplashScreen();
	};

	LoadPage.prototype.hydrateGlyphrProject = function(data) {
		_GP = clone(_UI.default_GP);
		
		// Project Settings
		if(data.projectsettings) _GP.projectsettings = clone(data.projectsettings);
		
		// Open Type Properties
		if(data.opentypeproperties) _GP.opentypeproperties = clone(data.opentypeproperties);

		// Linked Shapes
		for (var ssid in data.linkedshapes) {
			if(data.linkedshapes.hasOwnProperty(ssid)){
				_GP.linkedshapes[ssid] = new LinkedShape(data.linkedshapes[ssid]);
			}
		}
		
		// Characters
		for (var i = 0; i < data.fontchars.length; i++) {
			if(data.fontchars[i]){
				_GP.fontchars[i*1] = new Char(data.fontchars[i]);
			}
		}

		//debug("\n\nHDRYATEGLYPHRPROJECT: PASSED \n" + JSON.stringify(data));
		//debug("\n\nHDRYATEGLYPHRPROJECT: HYDRATED \n" + JSON.stringify(_GP));

		this.finalizeGlyphrProject();
	};

	LoadPage.prototype.importOrCreateNew = function(){
		var con = "<table style='width:100%;'><tr><td style='padding-right:50px; width:45%;'>"+
						"<h3>Load an existing Glyphr Project</h3>"+
						"<div id='droptarget'>drop file here...</div>"+
					"</td><td style='width:9%'>&nbsp;</td>"+
					"</td><td style='width:45%;'>"+
						"<h3>Start a new Glyphr Project</h3>"+
						"Project name: &nbsp; <input id='newprojectname' type='text' value='My Font'/><br>"+
						"<input type='button' class='buttonsel' value=' Start a new font from scratch ' onclick='LoadPage.newGlyphrProject()'><br><br>"+
					"</td></tr></table>";
		
		return con;
	};
		
	LoadPage.prototype.newGlyphrProject = function(){
		var fn = document.getElementById("newprojectname").value;
		fn = (fn? fn : "My Font");
		
		_GP = clone(_UI.default_GP);
		
		_GP.projectsettings.name = fn;
		_GP.opentypeproperties.name[1].val = fn;
		_GP.opentypeproperties.name[3].val = (fn + " 1.0");
		_GP.opentypeproperties.name[4].val = fn;
		_GP.opentypeproperties.name[6].val = fn;
		setOTprop("cff", "FullName", fn);
		setOTprop("cff", "FamilyName", fn);

		setOTprop("head", "created", ttxDateString());
		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;

		_GP.fontchars = createNewFontcharsArray();
	
		_GP.linkedshapes = {};
		_GP.linkedshapes["id0"] = new LinkedShape({"shape": new Shape({})});

		this.finalizeGlyphrProject();
	};
	
	LoadPage.prototype.finalizeGlyphrProject = function(){
		//debug("FINALIZEGLYPHRPROJECT - start of function");
		_UI.charcurrstate = clone(_GP.fontchars);
		_UI.linkcurrstate = clone(_GP.linkedshapes);
		
		if(!isval(_GP.projectsettings.linkedshapecounter)){
			_GP.projectsettings.linkedshapecounter = 0;
		}

		_UI.selectedchar = 97;
		_UI.shownlinkedshape = getFirstLinkedShape();
		
		resetThumbView();

		_UI.navhere = "character edit";
		navigate();
	};

	LoadPage.prototype.loadPage_exportfont = function(){
		debug("LOADING PAGE >> loadPage_exportfont");
		var con = document.getElementById("mainwrapper");
		con.innerHTML = "<div class='pagecontent textpage'><h1>Export Font</h1>" +
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " +
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " +
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " +
		"program icon, and an OTF font will be generated.<br><br>" +
		"<input type='button' class='buttonsel' value='Generate TTX XML File' onclick='triggerTTXFileDownload()'></input>" +
		"<br><br></div>";
	};

	LoadPage.prototype.loadPage_help = function(){
		debug("LOADING PAGE >> loadPage_help");
		var content = "<div class='textpage pagecontent'><a name='top'></a>";
		content += "<h1>Help</h1><p>Peruse the document, but if you have any other questions, you can email <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out.</p><h3>jump to a section</h3><p><a href='#nav_and_layout'>Navigation and Layout</a></p><p>Editing: &nbsp; <a href='#page_char_edit_and_linked_shapes'>Character Edit and Linked Shape Pages</a> &nbsp;<a href='#shape_editing'>Shape Editing</a> &nbsp;<a href='#edit_canvas_tools'>Canvas Tools</a> &nbsp;<br/>Attributes Panels: &nbsp; <a href='#attributes_character'>Character</a> &nbsp;<a href='#attributes_shape'>Shape</a> &nbsp;<a href='#attributes_path_point'>Path Point</a> &nbsp;<a href='#attributes_linked_shape'>Linked Shape</a> &nbsp;</p><p>Other Pages: &nbsp; <a href='#page_test_drive'>Test Drive</a> &nbsp;<a href='#page_font_settings'>Font Settings</a> &nbsp;<a href='#page_project_settings'>Project Settings</a> &nbsp;<a href='#page_open_project'>Open Project</a> &nbsp;<a href='#page_export_font'>Export Font</a> &nbsp;<a href='#page_about'>About</a> &nbsp;</p><br/><a name = 'nav_and_layout'></a><h2>Navigation and Layout</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Glyphr Studio work space has three vertical areas: from left to right, the Navigation Bar, the Panel, and the Main Content area.  Selecting an icon in the Navigation Bar will update the Panel and the Main Content areas.  The top option in the Navigation Bar displays all the main pages in the Panel, allowing you to navigate around Glyphr Studio.</p><p>Some of the pages have additional Navigation Bar icons - like Attributes, Layers, and Character Selection - that are specific to character editing, or other activities.</p><p>The bottom-most icon in the Navigation Bar is a save icon - it does not actually navigate anywhere, but instead is just an omnipresent shortcut to save your Glyphr Project.  When there are changes that have not been saved, the save icon becomes slightly highlighted, and a diamond icon ❖ will be added to the browser title.</p><br/><a name = 'page_char_edit_and_linked_shapes'></a><h2>Character Edit and Linked Shapes pages</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Character Edit and Linked Shapes pages have many shape editing controls in common.  Linked Shapes are single outlines that can be inserted into many characters of a font.  Updating the Linked Shape will also update all the Linked Shape instances.  Characters in your font can have many shapes (both linked and not), so there is an added concept of Layers on the Character Edit page.</p><p>Linked Shapes are individual shapes that can be added to many Characters. Any time the Linked Shape is edited, all the Characters that use that Linked Shape are updated. There are many individual letter forms that are shared across characters in a single font - for example the round o form of the letters b, d, g, o, p, q. Linked Shapes were designed to make it easy to keep similar letter forms consistent across a font.</p><p>Creating new Linked Shapes, and adding a Linked Shape to a character can be done through the Actions list in the Attributes Panel. The Linked Shapes page is very similar to the Character Edit page. Each Linked Shape is just a single Shape, so there are no shape layers, or add shape buttons. The Linked Shapes page also displays all the shapes that use the current Linked Shape - they are displayed as a thumbnail in the lower left, and update as the Linked Shape is edited. Clicking on one of these thumbnails will navigate to the Character Edit page for that character.</p><br/><a name = 'shape_editing'></a><h2>Shape Editing</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Shape Editing concepts can be found on the Character Edit and Linked Shape pages.  In general, a font is just a collection of data, which can be represented hierarchically as:</p><p>Font<br/>- Character<br/>-- Shape<br/>--- Path<br/>---- Path Point<br/>----- Point and Handles<br/></p><p>This data, along with metadata and attributes for each, can be edited either in the Attributes Panel, or interactively using the Edit Canvas in the Content Area.</p><p>Many of these attributes can be locked by selecting the small lock icon to the left of the attribute.  This will stop this attribute from accidentally being changed, and in most cases, will limit what can be done on the Edit Canvas.</p><p>Unless otherwise noted, most attributes are in Em units.</p><br/><a name = 'edit_canvas_tools'></a><h2>Edit Canvas Tools</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>In the Upper Left hand side of the Edit Canvas there are 10 tools. The currently selected tool has a blue background. The tools, from left to right, are:<ul>	<li><b>Point Select</b> - Selects and edits individual Path Points and Handles. It cannot move or resize shapes.</li>	<li><b>Shape Select</b> - Selects, moves, and resizes shapes. It cannot edit the individual path points.</li>	<li><b>New Rectangle / New Oval</b> - Click and drag to draw new Rectangles or Ovals.</li>	<li><b>New Path</b> - Draws a new path. Single clicking will create Path Points that do not have handles.  Clicking and dragging will add a Path Point where the click began, and also a symmetrical handle where the click ends.  To stop adding new Path Points, either click the first Path Point, or click off the Edit Canvas.</li>	<li><b>Pan Tool</b> - Moves the canvas up/down/left/right.<br/>The Keyboard Shortcut for this tool is the Spacebar.</li>	<li><b>Zoom In / Zoom Out</b> - The plus / minus buttons will increase or decrease the size of the Edit Canvas.<br/>The Keyboard Shortcut for this tool is the Mouse Scroll Wheel.</li>	<li><b>1:1 Button</b> - Sets the Zoom level where 1 Pixel = 1 Em Unit.</li>	<li><b>M Button (Em Square Button)</b> - Sets the Zoom level to display the entire Em square area </li>	<li><b>Zoom Percent</b> - Displays the current zoom level (read only).</li></ul></p><br/><a name = 'attributes_character'></a><h2>Attributes Panel - Character</h2>(Character Edit Page)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p>When no shape is selected, the Attributes Panel shows attributes for the currently selected Character.<ul>	<li><b>Auto Width</b> - When selected, the width of the character will be calculated automatically based on the farthest right edge of all the Shapes in that character.</li>	<li><b>Width (em units)</b> - If Auto Width is set, this is a read-only attribute for how wide the character is in Em Units.  If Auto Width is not set, a width can be set manually for the character.</li>	<li><b>Width (em %)</b> - Read only display of how wide the character is as compared to the Em square.</li>	<li><b>Use Default Left Side Bearing</b> - When selected, the global default Left Side Bearing will be used for this character.  The Default Left Side Bearing can be updated in on the Font Settings page.  When not selected, the Left Side Bearing can be set manually for this character.</li>	<li><b>Left Side Bearing</b> - If Use Default Left Side Bearing is selected, this displays the inherited value.  If Use Default Left Side Bearing is not selected, this is where a custom value can be entered.</li>	<li><b>Number of Shapes</b> - A read only count of the number of shapes in this character.</li></ul></p><br/><a name = 'attributes_shape'></a><h2>Attributes Panel - Shape</h2>(Character Edit and Linked Shape Pages)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Name</b> - Any name you want to give this shape.</li>	<li><b>X/Y</b> - The shape's coordinates, as defined by the blue bounding box's upper left corner. </li>	<li><b>Height / Width</b> - Overall size dimensions of the shape. </li>	<li><b>Direction</b> - he clockwise or counterclockwise direction of Path Points along a Path determine if that path will additively or subtractively overlap with other Shapes in the character.</li></ul></p><br/><a name = 'attributes_path_point'></a><h2>Attributes Panel - Path Point </h2>(Character Edit and Linked Shape Pages)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Selected Point</b> - Displays which point is currently selected. 0 is the first Path Point.</li>	<li><b>Point Type</b> - Each Path Point has two handles that control the curve of the path before and after it. There are three kinds of Point Types: Corner (Handles can be anywhere), Flat (Handles will be in line with each other), and Symmetric (Handles will be in-line with each other and equidistant from the Path Point).</li>	<li><b>Point X/Y</b> - The Path Point's coordinates. </li>	<li><b>Use Handle 1/2</b> - Deselecting this will remove the handle, such that it will not impact the curvature of the path.</li>	<li><b>Handle 1 X/Y & Handle 2 X/Y</b> - The Handle's coordinates. </li></ul></p><br/><a name = 'attributes_linked_shape'></a><h2>Attributes Panel - Linked Shape Instance</h2>(Linked Shape Page)<br/><a href='#top'><span class='unit'>(back to top)</span></a><p><ul>	<li><b>Name</b> - Any name you want to give this Linked Shape Instance.  Can be different than the Linked Shape itself.</li>	<li><b>Use Linked Shape Position</b> - By default, a Linked Shape Instance is locked to the position of the Linked Shape.  Unchecking this option will give you the option to move the Linked Shape Instance.</li>	<li><b>ΔX / ΔY</b> - When Use Linked Shape Position is unselected, these coordinates are used to move the Linked Shape Instance to a new location.  These are delta values, meaning they are relative to the original Linked Shape.</li>	<li><b>Linked Shape Name</b> - A read-only value of the Linked Shape that this Linked Shape Instance is linked to.</li>	<li><b>Edit This Linked Shape (action button)</b> - This will navigate to the Linked Shapes page, and allow you to make changes to the original Linked Shape.</li></ul></p><br/><a name = 'page_test_drive'></a><h2>Test Drive Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>The Test Drive page is where your font can be tried out in real time. Typing in the upper textbox will display that same text in your font face in the lower box.</p><p>In the Attributes Panel, there is a list of Pangram buttons that will populate the upper textbox with sentences that contain all the letters of the alphabet. Similarly, there are buttons that will populate the upper textbox with certain character sets.</p><p>The Options area lets you change how your font is drawn to the lower box, including options for Font Size, Line Spacing, and Character Spacing.</p><p>The 'Generate PNG File' button will launch a new tab with an image of whatever is displayed in the lower box. Right-click the image to save the PNG file.</p><br/><a name = 'page_font_settings'></a><h2>Font Settings Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Font settings deal with global attributes that affect all characters in your font.  Glyphr Studio uses the properties in the Font Settings section to display and edit shapes:<ul>	<li><b>Character Proportions</b> - Characters have a total height of 1000 Units, called Em Units.  The baseline of that character splits the upper and lower portions of the character vertically.  Input an Ascent Height, and the Descent Height will be calculated automatically.</li>	<li><b>Default Left Side Bearing</b> - All characters a small amount of space to their left that separates them from another character to their left.  Individual Left Side Bearings can be edited in the Attributes Panel of that character.  But, to make things easier, if a specific Left Side Bearing is not set, this Default Left Side Bearing will be applied.</li>	<li><b>Line Gap</b> - This is the space between the bottom of the Em square of one line, and the top of the Em square of characters on a line underneath.</li></ul>Open Type Properties are a set of font metadata that is saved with the font file.  They include things like Font Name, Version Number, and other descriptive information.</p><br/><a name = 'page_project_settings'></a><h2>Project Settings Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>This information does not necessarily have a direct effect on the Font itself, but is used to help with designing your font.  This information is saved when a Glyphr Project is saved, and will be imported when a saved project is loaded.  Viewing the Grids and Guides can be toggled from the Actions section of the Attribute Panel.<ul>	<li><b>Project Name</b> - Initially, this project name is used as the Font Name as well.  But, the Glyphr Project can have a different name from the Font itself, which can be edited here.</li>	<li><b>Grid System</b> - This can be helpful in visualizing shape dimensions, it draws a light gray grid across the Edit Canvas.  Input a number of divisions per Em.</li>	<li><b>X Height</b> - another main dividing line within a character is the 'x height'.  It is a shorthand way of describing the average height of lowercase letters in a font.</li>	<li><b>Overshoot</b> - Usually rounded shapes extend a small amount past guide lines, so rounded shapes visually appear to line up with squared shapes.  This will draw a light overshoot guideline past the Cap Height, X Height, and Baseline guidelines.</li></ul></p><br/><a name = 'page_open_project'></a><h2>Open Project Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>There are two options for opening a new Glyphr Project: loading a previously-saved Glyphr Project file, or starting a new font from scratch. To load an existing Glyphr Project file, drag and drop the file onto the area indicated. To start a new project from scratch, edit the Project Name. The Font Name can be edited at any time from the Font Metadata page.</p><p>Loading or starting a new Glyphr Project will delete the current Glyphr Project, so be sure to save your existing project before loading or starting a new one.</p><br/><a name = 'page_export_font'></a><h2>Export Font Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>This page has information about TTX, a program used to turn font files into XML, and XML files back into fonts.  Glyphr uses TTX as an intermediary step to create a font file.  Glyphr will generate a TTX XML file for you, which you can then use to generate an OpenType font file.</p><p>More information can be found at <a href='http://www.glyphrstudio.com/ttx' target=_new>glyphrstudio.com/ttx</a></p><br/><a name = 'page_about'></a><h2>About Page</h2><a href='#top'><span class='unit'>(back to top)</span></a><p>Displays various information about the currently loaded Glyphr Project, and the current Glyphr Studio being used.  Glyphr Projects created with different versions of Glyphr Studio may not play nicely together.</p>";
		content += "</div>";
		document.getElementById("mainwrapper").innerHTML = content;
	};

	// Event Handlers

	LoadPage.prototype.handleDrop = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer.files[0]; // FileList object only first file
		var reader = new FileReader();
		var fcontent = "";

		document.getElementById("droptarget").innerHTML = "Loading File...";
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				//console.log(reader.result);
				fcontent = JSON.parse(reader.result);
				if(fcontent.projectsettings.version){
					LoadPage.hydrateGlyphrProject(fcontent);
					//debug("Loading project; " + _GP.projectsettings.name);
				} else {
					document.getElementById("droptarget").innerHTML = "drop file here...";
					alert("File does not appear to be a Glyphr Project, try again...");
				}
			};
		})(f);

		reader.readAsText(f);
		
	};

	LoadPage.prototype.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	};