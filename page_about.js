
function updateabout(){

	var content = "<div class='pagecontent textpage'><h1>About Glyphr</h1>" + 
	"<h2 style='margin-bottom:12px;'>"+_UI.thisGlyphrStudioVersion+"</h2>" + 
	"For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>" + 
	"Any questions? Hit up <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out." + 
	"<br><br>" + 
	"The currently opened project was created with: " + _GP.projectsettings.version + "<br>" + 
	"Glyphr projects may be incompatible with different Beta versions of Glyphr Studio.<br><br>" + 
	"Glyphr is licensed under a <a href='http://creativecommons.org/licenses/by-sa/3.0/' target=_new>Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br>" + 
	"Which basically means you can use Glyphr for commercial purposes, remix and adapt Glyphr to your own needs, and re-share Glyphr with the same license applied." + 
	"<br><br>";

	document.getElementById("mainpane").innerHTML = content;
}