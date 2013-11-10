function updatehelp(){
	//debug("UPDATEHELP()");
	
var content = "<div class='pagecontent textpage'><h1>Help</h1>" +
	"<a name='top'></a>" +
	"Peruse the document, but if you have any other questions, you can email <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out." +
	"<table cellpadding=0 cellspacing=0 border=0><tr><td style='width:700px; padding-right:20px;'>" +
	"<a name='gnl'></a>" +
	"<h2>General Navigation and Layout</h2>" +
	"Glyphr Studio is laid out quite simply, but probably differently than other programs.  The main navigation is across the top bar.  From left to right, the top bar contains:" +
	"<ul>" +
	"<li>A small Save button that looks like a 3.5 inch floppy disk.  This button will bring up your Glyphr Project code that you can copy/paste to a text file to save your project.</li>" +
	"<li>Black Navigation buttons </li>" +
	"<ul>" +
	"<li>For all sections there is at least one Navigation button, right after the small Save button.  When clicked on, this displays all the pages within Glyphr Studio.</li>" +
	"<li>The second Navigation button only appears on the Character Edit and Seed Shapes sections.  This button chooses the Character or Seed Shape to currently edit.</li>  " +
	"</ul>" +
	"<li>(for Dev editions, the 'Show Debug Thingy' button is on the far right)</li>" +
	"</ul>" +
	"On the Character Edit and Seed Shapes sections, the main lower section is split between the Attributes area on the left, and the Editing Canvas on the right. " +

	"<a name='s'></a>" +
	"<h2>Shapes<a href='#top' class='btt'>back to top</a></h2>" +
	"The follwing Editing and Attributes help topics apply to the Charcter Edit section, and the Seed Shapes section." +
	"<a name='et'></a>" +
	"<h3>Editing Tools</h3>" +
	"In the Upper Left hand side of the Editing Canvas there are 10 tools.  The currently selected tool has a blue background.  The tools, from left to right, are:" +
	"<ul>" +
	"<li><b>Shape Select</b> – this tool selects, moves, and resizes shapes on the Editing Canvas.  It cannot edit the individual path points.</li>" +
	"<li><b>Point Select</b> – this tool will select and edit individual Path Points and Handles.  It cannot move or resize shapes.</li>" +
	"<li><b>New Rectangle / New Oval</b> – these tools will draw new Rectangles or Ovals to the Editing Canvas.</li>" +
	"<li><b>New Path</b> – This tool will draw a new path on the Editing Canvas.  Click multiple times, each time will add a Path Point to the new path.  Click and drag will both add a point and position the second Handle for that Path Point once the mouse button is released.  Click the first point in the path to close the path, or click any other tool to stop creating the new path.</li>" +
	"<li><b>Pan Tool</b> – This tool will allow you to move the canvas up/down/left/right.<br><i>The Keyboard Shortcut for this tool is the Spacebar.</i></li>" +
	"<li><b>Zoom In / Zoom Out</b> – The plus / minus buttons will increase or decrease the size of the Editing Canvas.<br><i>The Keyboard Shortcut for this tool is the Mouse Scroll Wheel.</i></li>" +
	"<li><b>1:1 Button</b> – This will set the Zoom level where 1 Pixel = 1 Em Unit.</li>" +
	"<li><b>M Button</b> (Em Square Button) – This will set the Zoom level to display the entire Em square editable area for that character.</li>" +
	"<li><b>Zoom Percent</b> – displays the current zoom level (read only).</li>" +
	"</ul>" +

	"<a name='sa'></a>" +
	"<h3>Shape Attributes</h3>" +
	"<ul>" +
	"<li><b>Name</b> - Any name you want to give this shape.</li>" +
	"<li><b>X/Y</b> - The shape’s coordinates, as defined by the blue bounding box’s upper left corner.  These attributes are set in Em Units.  These attributes are lockable.</li>" +
	"<li><b>Height / Width</b> - Overall size dimensions of the shape.  These attributes are set in Em Units.  These attributes are lockable.</li>" +
	"<li><b>Closed Path</b> - If selected, this will connect the first and the last points in the path.</li>" +
	"</ul>" +

	"<a name='ppa'></a>" +
	"<h3>Path Point Attributes</h3>" +
	"These attributes are only shown when the Point Select tool is being used." +
	"<ul>" +
	"<li><b>Selected Point</b> - Displays which point is currently selected.  0 is the first Path Point.</li>" +
	"<li><b>Point Type</b> - Each Path Point has handles that controls the curve of the path before and after it.  There are three kinds of Point Types: Corner (Handles can be anywhere), Flat (Handles will be in line with each other), and Symmetric (Handles will be in-line with each other and equidistant from the Path Point).</li>" +
	"<li><b>Point X/Y</b> - The Path Point’s coordinates.  These attributes are set in Em Units.  These attributes are lockable.</li>" +
	"<li><b>Use Handle 1/2</b> - deselecting this will cause that handle to have no impact on the curvature of the path.</li>" +
	"<li><b>Handle 1 X/Y & Handle 2 X/Y</b> - The Handle’s coordinates.  These attributes are set in Em Units.  These attributes are lockable. </li>" +
	"</ul>" +

	"<a name='ss'></a>" +
	"<h2>Seed Shapes<a href='#top' class='btt'>back to top</a></h2>" +
	"Seed Shapes are individual shapes that can be added to many Characters.  Any time the Seed Shape is edited, all the Characters that use that Seed Shape are updated.  There are many individual letter forms that are shared across characters in a single font – for example the round o form of the letters b,d,g,o,p,q.  Seed Shapes were designed to make it easy to keep similar letter forms consistent across a font.<br><br>" +
	"Creating new Seed Shapes, and adding a Seed Shape to a character can be done through the Actions list, located to the left of the Editing Canvas. The Seed Shapes page is very similar to the Character Edit page.  Each Seed Shape is just a single Shape, so there are no shape layers, or add shape buttons.  The Seed Shapes page also displays all the shapes that use the current Seed Shape – they are displayed as a thumbnail in the lower left, and update as the Seed Shape is edited.  Clicking on one of these thumbnails will navigate to the Character Edit page for that character.<br><br>" +
	"Once in Character Edit, selecting a Seed Shape will display a short list of Attributes.  A Seed Shape Instance can be given a specific name per-character to which it’s added.  The default location for the Seed Shape Instance is the location of the original Seed Shape.  Unchecking “Use Seed Shape Position” will bring up options to move the Seed Shape Instance – the X/Y coordinates are not absolute, they are a delta from the original Seed Shape X/Y coordinates.  Clicking the “Edit this Seed Shape” button will navigate back to Seed Shapes where that Seed Shape can be edited." +

	"<a name='td'></a>" +
	"<h2>Test Drive<a href='#top' class='btt'>back to top</a></h2>" +
	"The Test Drive area is where your font can be tried out in real time.  Typing in the upper textbox will display that same text in your font face in the lower box.<br><br>" +
	"On the right, there is a list of Pangram buttons that will populate the upper textbox with sentences that contain all the letters of the alphabet.  Similarly, there are buttons that will populate the upper textbox with certain character sets.<br><br>" +
	"The Options area lets you change how your font is drawn to the lower box, including options for Font Size, Line Spacing, and Character Spacing.<br><br>" +
	"The “Generate PNG File” button will bring up a textbox with an image of whatever is displayed in the lower box.  Right-click the image to save the PNG file." +

	"<a name='fsfm'></a>" +
	"<h2>Font Settings and Font Metadata<a href='#top' class='btt'>back to top</a></h2>" +

	"<a name='fs'></a>" +
	"<h3>Font Settings</h3>" +
	"Font settings deal with global attributes that affect all characters in your font, and the environment in which your font is edited.  It has the following settings:" +
	"<ul>" +
	"<li><b>Units per Em</b> – all fonts use a system of “Em Units” to store character coordinate data.  The default Em size is 2048 units, a common size for fonts.  When you edit the point or handle position of a character, the coordinate system has a max of whatever this is set to, both in x and y directions." +
	"<li><b>Grid System</b> – Most fonts use a grid system to aid designing commonalities between characters.  This number is how many divisions the Em Square is divided into.  While editing, viewing the grid can be toggled on and off to avoid distraction." +
	"<li><b>Character Proportions</b> - Characters are, essentially, divided into three main horizontal bands.  This setting will place guidelines at specific grid positions, further helping the design of commonalities between characters.  The total of these three measurements must equal the total number of grid divisions specified above." +
	"<li><b>Overshoot Guideline</b> – Round characters are slightly larger than their square-terminated counterparts.  Specifying an overshoot guideline will help make these dimensions consistent across characters." +
	"<li><b>Default Kerning</b> – Any character can have a custom width specified.  You can do this by de-selecting all shapes, and then de-selecting the “auto width” setting for that character.  If the “auto-width” setting is set for that character, the total width of that character will be computed as the farthest right hand edge, plus the Default Kerning value." +
	"</ul>" +

	"<a name='fm'></a>" +
	"<h3>Font Metadata</h3>" +
	"The Font Metadata section is where you can edit information that describes your font.  Some of this information includes Name, Family Name, Weight, Description, Copyright, and more.  If you export a font from a Glyphr project, this font metadata will be included in the newly created font." +

	"<a name='ose'></a>" +
	"<h2>Opening, Saving, and Exporting<a href='#top' class='btt'>back to top</a></h2>" +

	"<a name='sp'></a>" +
	"<h3>Save Project</h3>" +
	"As of Beta 2, the only way to save a Glyphr Project is to copy some code, paste it into a program like Notepad, and then save a text file.  Obviously, this isn’t the most awesome way to save a project, and hopefully ‘Easier Saving’ will be accomplished in Beta 3.<br><br>" +
	"There are two ways to get to the Glyphr Project code to copy/paste: navigate to the Save Project page, or press the small Save Icon next to the Glyphr logo in the upper left corner." +

	"<a name='op'></a>" +
	"<h3>Open Project</h3>" +
	"There are two options for opening a new Glyphr Project: selecting a previously-saved Glyphr Project text file, or starting a new font from scratch.  To start a new project from scratch, edit the Font Name and hit the button to begin.  The Font Name can be edited at any time from the Font Metadata page." +

	"<a name='ha'></a>" +
	"<h2>Help and About<a href='#top' class='btt'>back to top</a></h2>" +

	"<a name='h'></a>" +
	"<h3>Help</h3>" +
	"Really?  For more Help on the Help Page, see the ‘Help and About’ section of the Help Page." +

	"<a name='a'></a>" +
	"<h3>About</h3>" +
	"The About page is where you can find the Detailed Version Number for Glyphr.  If you email us about a bug, having this version number is crucial, since the code base is changing daily.<br><br>" +
	"There’s probably also some info on what’s new in this version, and a tentative roadmap for the next version." +

	"<a name='debug'></a>" +
	"<h2>Debug and the Debug Thingy&#8482;<a href='#top' class='btt'>back to top</a></h2>" +
	"If you downloaded the Dev Edition of Glyphr, then one of the features is a low-level debug console, which is named the Debug Thingy&#8482;.  If you are digging through the code, you may notice a function called debug(“some text”);  This function will add “some text” to a list, and when you press the Debug Thingy&#8482; button in the upper right hand side of the console, this list of debug outputs will be shown.   This is not really any kind of advanced JavaScript debugging, but it is much better than hundreds of alert(“some text”) functions sprinkled throughout thousands of lines of code.<br><br>" +
	"There are also two invisible Canvas elements that are used to support the Editing Canvas, one is used for click detection and the other is used to calculate the max bounds of Path shapes.  The Debug Thingy&#8482; also visually displays the last state of these two invisible Canvas elements.<br><br>" +
	"More information about the debug and timer function is in the header of the debug.js file.<br><br>		Question: Is the Debug Thingy&#8482; really &#8482;?<br>" +
	"Answer: No." +

	"<a name='compat'></a>" +
	"<h2>Browser Compatibility</h2>" +
	"Glyphr was tested through development using Internet Explorer 10.<br>" +
	"It should work with any modern HTML5 browser, but it was quickly tested on Firefox and Chrome as well, all on Windows 7.<br>" +
	"If you run into any issues, I'd love to hear about them: <a href='javascript:sendBugEmail()'>mail@glyphrstudio.com</a>." +

	"</td><td>" +

	"<h2 style='margin-left:0px; margin-top:30px;'>Contents</h3>" +
	"<ul>" +
	"<li><a href='#gnl'>General Navigation and Layout</a></li>" +
	"<li><a href='#s'>Shapes</a></li>" +
	"<ul>" +
	"<li><a href='#et'>Editing Tools</a></li>" +
	"<li><a href='#sa'>Shape Attributes</a></li>" +
	"<li><a href='#ppa'>Path Point Attributes</a></li>" +
	"</ul>" +
	"<li><a href='#ss'>Seed Shapes</a></li>" +
	"<li><a href='#td'>Test Drive</a></li>" +
	"<li><a href='#fsfm'>Font Settings and Font Metadata</a></li>" +
	"<ul>" +
	"<li><a href='#fs'>Font Settings</a></li>" +
	"<li><a href='#fm'>Font Metadata</a></li>" +
	"</ul>" +
	"<li><a href='#ose'>Opening, Saving, and Exporting</a></li>" +
	"<ul>" +
	"<li><a href='#sp'>Save Project</a></li>" +
	"<li><a href='#op'>Open Project</a></li>" +
	"</ul>" +
	"<li><a href='#ha'>Help and About</a></li>" +
	"<ul>" +
	"<li><a href='#h'>Help</a></li>" +
	"<li><a href='#a'>About</a></li>" +
	"</ul>" +
	"<li><a href='#debug'>Debug and the Debug Thingy&#8482;</a></li>" +
	"<li><a href='#compat'>Browser Compatibility</a></li>" +
	"</ul>" +

	"</td></tr></table>";
	
	document.getElementById("mainpane").innerHTML = content;
}

