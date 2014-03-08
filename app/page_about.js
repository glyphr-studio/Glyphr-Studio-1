
function loadPage_about(){
	debug("LOADING PAGE >> loadPage_about");
	var content = "<div class='pagecontent textpage'><h1>About Glyphr Studio</h1>" +
	"<h2 style='margin-bottom:12px;'>"+_UI.thisGlyphrStudioVersion+"</h2>" +
	"For more informaiton visit <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a><br>" +
	"Any questions? Hit up <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a>, and we'd be happy to help out." +
	"<br><br>" +
	"The currently opened project was created with: " + _GP.projectsettings.version + "<br>" +
	"Glyphr projects may be incompatible with different Beta versions of Glyphr Studio.<br><br>" +
	"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
	"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
	"this license and it's freeness stays intact." +
	"<br><br>";

	getEditDocument().getElementById("mainwrapper").innerHTML = content;
}