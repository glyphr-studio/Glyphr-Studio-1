
function loadPage_about(){
	debug("LOADING PAGE >> loadPage_about");
	var content = "<div class='pagecontent textpage'><h1>About Glyphr Studio</h1>" +
	"<h2 style='margin-bottom:12px; margin-top:0px;'>"+_UI.thisGlyphrStudioVersion+"</h2>" +
	"<table>"+
	"<tr><td><i>Website: &nbsp;&nbsp;&nbsp;</i></td><td> <a href='http://www.glyphrstudio.com' target=_new>www.glyphrstudio.com</a> for all the info.</td></tr>" +
	"<tr><td><i>Email: &nbsp;&nbsp;&nbsp;</i></td><td> <a href='mailto:mail@glyphrstudio.com'>mail@glyphrstudio.com</a> with any questions, and we'd be happy to help out.</td></tr>" +
	"<tr><td><i>Twitter: &nbsp;&nbsp;&nbsp;</i></td><td> <a href='https://twitter.com/glyphrstudio' target=_new>@glyphrstudio</a> for updates and announcements.</td></tr>" +
	"<tr><td><i>GitHub: &nbsp;&nbsp;&nbsp;</i></td><td> <a href='https://github.com/mattlag/Glyphr-Studio/' target=_new>github.com/mattlag/Glyphr-Studio/</a> for dev and code related stuff.</td></tr>" +
	"</table>"+

	"<h1>This Glyphr Project</h1>"+
	"The currently opened project was created with: <span style='font-weight:bold; color:rgb(102, 107, 112);'>" + _GP.projectsettings.version + " </span><br>" +
	"Glyphr Projects may be incompatible with different Beta versions of Glyphr Studio." +

	"<h1>License</h1>"+
	"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_new'>GNU General Public License</a>.<br>" +
	"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
	"this license and it's freeness stays intact." +
	"<br><br>";

	getEditDocument().getElementById("mainwrapper").innerHTML = content;
}