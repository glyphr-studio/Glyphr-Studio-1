// start of file
/**
	Page > About
	HTML and associated functions for this page.
**/

function loadPage_about() {
	// debug('LOADING PAGE >> loadPage_about');
	var content =
		'<div class="pagecontent textpage aboutpage" style="margin-top:18px;">' +
		makeGlyphrStudioLogo({ width: 376, fill: _UI.colors.blue.l55 }) +
		'<h2 style="margin-bottom:8px; margin-top:8px;">' +
		_UI.thisGlyphrStudioVersion +
		'</h2>' +
		'<div style="margin-bottom:18px;">' +
		_UI.thisGlyphrStudioVersionNum +
		'<br>' +
		'Last updated on ' +
		new Date(_UI.thisGlyphrStudioVersionDate).toDateString() +
		'. ' +
		'<a style="font-size:14px;" href="https://www.glyphrstudio.com/help/overview_updates.html" target="_blank">Find out WTF happened in this update.</a></div>' +
		'<table>' +
		'<tr><td><i>Website: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://www.glyphrstudio.com" target="_blank">glyphrstudio.com</a> for all the info.</td></tr>' +
		'<tr><td><i>Email: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="mailto:mail@glyphrstudio.com" target="blank">mail@glyphrstudio.com</a> with any questions, and we"d be happy to help out.</td></tr>' +
		'<tr><td><i>Help & Docs: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://www.glyphrstudio.com/help/" target="_blank">glyphrstudio.com/help</a> for app details and more information.</td></tr>' +
		'<tr><td><i>Blog: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://www.glyphrstudio.com/blog/" target="_blank">glyphrstudio.com/blog</a> for verbose updates and announcements.</td></tr>' +
		'<tr><td><i>Mastodon: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://typo.social/@glyphrstudio" target="_blank">@glyphrstudio@typo.social</a> for short updates and announcements.</td></tr>' +
		'<tr><td><i>Reddit: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://www.reddit.com/r/GlyphrStudio/" target="_blank">reddit.com/r/GlyphrStudio</a> for announcements and discussions.</td></tr>' +
		'<tr><td><i>Twitter: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://twitter.com/glyphrstudio" target="_blank">@glyphrstudio</a> for short updates and announcements.</td></tr>' +
		'<tr><td><i>GitHub: &nbsp;&nbsp;&nbsp;</i></td><td> <a href="https://github.com/glyphr-studio" target="_blank">github.com/glyphr-studio</a> for dev and code related stuff.</td></tr>' +
		'</table>' +
		'<br>' +
		'<h1>This Glyphr Project</h1>' +
		'<p>' +
		'The currently opened project was initially created with: ' +
		'<span style="font-weight:bold; color:rgb(102, 107, 112);">Version ' +
		_GP.projectsettings.initialversionnum +
		' </span> ' +
		'</p>' +
		'<br><br>' +
		make_ContributeHTML() +
		'<br><br>' +
		'<h1>License</h1>' +
		'<p>' +
		"Glyphr Studio is licensed under a <a href='https://www.gnu.org/licenses/gpl.html' target='_blank'>GNU General Public License</a>.<br>" +
		"Which is a free / open source 'copyleft' license. You are free to use, distribute, and modify Glyphr Studio as long as " +
		'this license and its freeness stays intact.' +
		'</p>' +
		'<br><br>';

	var wrapper = getEditDocument().getElementById('mainwrapper');
	wrapper.innerHTML = content;
}

function make_ContributeHTML() {
	var content =
		'<h1>Contribute!</h1>' +
		'<p>' +
		'If you think Glyphr Studio is pretty cool, there are two huge ways you can make it better!<br>' +
		'<ul><li><span style="font-weight:bold; color:rgb(102, 107, 112);">Send Feedback</span> - ' +
		'Use new features and let us know if you run into issues.  Follow us on Twitter and read the Blog, and participate in discussions. ' +
		'Be vocal, and let us know what we should do next!</li>' +
		'<li><span style="font-weight:bold; color:rgb(102, 107, 112);">Make a Monetary Contribution</span> - ' +
		'Glyphr Studio will always be free, and we think that is very important.  But, it does take some money to keep it going. ' +
		'Contributions of even small amounts of money help keep the Glyphr Studio effort going strong!<br><br>' +
		'<a href="https://ko-fi.com/glyphrstudio" target="_blank" class="donateLinkButton">' +
		'<img src="data:image/png;base64,' +
		donateKofiSrc +
		'" alt="Support me on Ko-fi" /></a>' +
		'<a href="https://www.paypal.com/donate/?hosted_button_id=35R85K8X5MGFQ" target="_blank" class="donateLinkButton">' +
		'&nbsp;' +
		'<img src="data:image/png;base64,' +
		donatePaypalSrc +
		'" alt="PayPal - The safer, easier way to pay online!" /></a>' +
		'</li></ul></p>';

	return content;
}

var donateKofiSrc =
	'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';
var donatePaypalSrc =
	'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';
