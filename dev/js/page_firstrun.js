 // start of file

	function loadPage_firstrun(){
		// debug("LOADING PAGE >> loadPage_firstrun");

		var ct = '<table style="height:100%; width:100%;"><tr>'+
		'<td id="firstruntableleft" vertical-align="middle"><div id="splashscreenlogo"></div>'+
			'<div class="splashver">'+_UI.thisGlyphrStudioVersion+'<br>'+
			'<div class="splashver">'+_UI.thisGlyphrStudioVersionNum+'<br></div>'+
			'For more informaiton visit <a href="http://www.glyphrstudio.com" target=_new>www.glyphrstudio.com</a><br>'+
			'Glyphr Studio is licensed under a <a href="https://www.gnu.org/licenses/gpl.html" target="_new">GNU General Public License</a>.<br>' +
			'Which is a free / open source "copyleft" license. You are free to use, distribute, and modify Glyphr Studio as long as ' +
			'this license and its freeness stays intact.</div></td>'+
		'<td id="firstruntableright" vertical-align="middle">' + make_ImportOrCreateNew() + '</td>'+
		'</tr></table>';

		var mp = document.getElementById('mainwrapper');
		mp.innerHTML = ct;
		mp.style.marginLeft = '0px';
		document.getElementById('firstruntableright').addEventListener('dragover', handleDragOver, false);
		document.getElementById('firstruntableright').addEventListener('drop', handleDrop, false);
		document.getElementById('firstruntableright').addEventListener('dragleave', handleDragLeave, false);
		document.getElementById('firstruntableleft').addEventListener('dragover', handleDragOver, false);
		document.getElementById('firstruntableleft').addEventListener('drop', handleDrop, false);
		document.getElementById('firstruntableleft').addEventListener('dragleave', handleDragLeave, false);
		document.getElementById('filechooser').addEventListener('change', handleDrop, false);
		window.addEventListener('message', handleMessage, false);
		if ( window.opener ) { window.opener.postMessage('ready', '*'); }
		firstrun_changeTab();

		document.getElementById('splashscreenlogo').innerHTML = makeGlyphrStudioLogo({'fill':'white', 'width':400});
	}

	function make_ImportOrCreateNew(){
		// TABS
		var con = '<div class="firstrun_tabs">'+
			'<button onclick="firstrun_changeTab(\'new\');">new</button>'+
			'<button onclick="firstrun_changeTab(\'load\');">load</button>'+
			'<button onclick="firstrun_changeTab(\'examples\');">examples</button>'+
			// '<button onclick="firstrun_changeTab(\'recent\');">recent</button>'+
		'</div>';

		// LOAD
		con += '<div class="firstrun_tile" id="load_content" style="display: none;">'+
					'<h2>Load a file</h2>'+
					'<button onclick="document.getElementById(\'filechooser\').click();" class="buttonsel">Browse for a File</button>&ensp; or Drag and Drop:'+
					'<div id="droptarget">Glyphr Studio Project File &ensp;(.txt)<br>SVG Font File &ensp;(.svg)</div>'+
					'<div style="width:335px;">'+ makeErrorMessageBox() + '</div>'+
				'</div>'+
				'<input style="display:none;" type="file" id="filechooser"/>';

		// NEW
		con += '<div class="firstrun_tile" id="new_content" style="display: none;">'+
					'<h2>Start a new Glyphr Project</h2>'+
					'Project name: &nbsp; <input id="newprojectname" type="text" value="My Font"/><br>'+
					'<button onclick="newGlyphrProject(); navigate();" class="buttonsel">Start a new font from scratch</button>'+
				'</div>';

		// EXAMPLES
		con += '<div class="firstrun_tile" id="examples_content" style="display: none;">'+
					'<h2>Load an Example project</h2>'+
					'<button onclick="" class="buttonsel">Modegg v3</button><br>'+
					'<button onclick="" class="buttonsel">Merriweather Sans</button><br>'+
				'</div>';

		// RECENT

		return con;
	}

	function firstrun_changeTab (tab) {
		var uinew = document.getElementById('new_content');
		var uiload = document.getElementById('load_content');
		var uiexamples = document.getElementById('examples_content');
		// var uirecent = document.getElementById('recent_content');

		uinew.style.display = 'none';
		uiload.style.display = 'none';
		uiexamples.style.display = 'none';
		// uirecent.style.display = 'none';

		if(tab === 'load') uiload.style.display = 'block';
		else if(tab === 'examples') uiexamples.style.display = 'block';
		// else if(tab === 'recent') uirecent.style.display = 'block';
		else uinew.style.display = 'block';	// default to new

	}

	function handleDrop(evt) {
		document.getElementById('droptarget').innerHTML = 'Loading File...';
		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;

		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer || document.getElementById('filechooser');
		f = f.files[0];

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function() {
			return function(e) {
				// debug('\n reader.onload - START');
				// debug('\t filename: ' + f.name);
				var fname = f.name.split('.');
				fname = fname[fname.length-1].toLowerCase();
				var con;

				if(fname === 'svg') {
					// debug('\t File = .svg');
					_UI.droppedFileContent = reader.result;
					ioSVG_importSVGfont(false);
				} else if(fname === 'txt') {
					// debug('\t File = .txt');
					importGlyphrProjectFromText(reader.result);
					navigate();
				} else {
					con = 'Could not read .' + fname + ' file type.';
					con += '<br>Try loading another .svg or .txt file...';
					document.getElementById('droptarget').innerHTML = con;
					document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;
				}

				// debug(' reader.onload - END\n');
			};
		})(f);

		reader.readAsText(f);

	}

	function handleMessage(evt) {
		_UI.droppedFileContent = evt.data;
		ioSVG_importSVGfont(false);
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'move';

		firstrun_changeTab('load');

		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.blue.l95;
		document.getElementById('droptarget').innerHTML = 'Drop it!';
	}

	function handleDragLeave(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		document.getElementById('firstruntableright').style.backgroundColor = _UI.colors.gray.offwhite;
		document.getElementById('droptarget').innerHTML = 'Glyphr Project File (.txt)<br>SVG Font File (.svg)';
	}

// end of file