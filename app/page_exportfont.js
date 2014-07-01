
	function loadPage_exportfont(){
		// debug("LOADING PAGE >> loadPage_exportfont");
		var content = "<div class='pagecontent textpage'><h1>Export Font</h1>" +
		"To transform your Glyphr Project into an OTF font, you must use a tool called TTX. " +
		"You can learn more about TTX, and find donwload links for it, over at <a href='http://www.glyphrstudio.com/ttx/' target=_new>glyphrstudio.com/ttx</a>. " +
		"Generate the .xml file below.  Once you have TTX installed, simply drag your .xml file over the TTX .exe " +
		"program icon, and an OTF font will be generated.<br><br>" +
		"<button class='buttonsel' onclick='triggerTTXFileDownload()'>Generate TTX XML File</button>" +
		"<br>"+
		"<div class='ttxnote'>"+
		"<h2 style='margin:0px 0px 16px 0px;'>A note on TTX support</h2>"+
		"The main vision of Glyphr Studio is to enable people to easily create and save a font.  The second part of this vision, the saving part, is difficult to do straight from a browser.  There are many exciting projects underway in the open source community that will help to do this in the future... but they are not done yet.<br><br>"+
		"Saving a TTX XML file was a stopgap measure on the road to 'easy saving'.  Glyphr Studio Beta 5 will support exporting a SVG Font.  The good news here is that there are free services online that will convert a SVG Font to any other type of font you want.  This is also a stopgap measure, but it is much easier than installing and running TTX.<br><br>"+
		"As of Beta 4, support for TTX is deprecated – meaning we just barely kept it up and running, but it is not robust or fully tested.  In Beta 5 it will be removed completely and replaced with exporting SVG Fonts.  And, hopefully in a short period of time after Beta 5, we'll have an 'easy save' straight to a font file from your browser.<br><br>"+
		"&emsp;&emsp;&emsp;Thank you,<br><br>"+
		"&emsp;&emsp;&emsp;- the Glyphr Studio team"+
		"</div></div>";

		getEditDocument().getElementById("mainwrapper").innerHTML = content;
	}