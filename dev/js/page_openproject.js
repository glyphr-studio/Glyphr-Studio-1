 // start of file
/**
	Page > Open Project
	The first page you see when you open Glyphr Studio.
	HTML and associated functions for this page.
**/


	function loadPage_openproject(){
		// debug("LOADING PAGE >> loadPage_openproject");

		var ct = '<table style="height:100%; width:100%;"><tr>'+
		'<td id="openprojecttableleft" vertical-align="middle">'+
			'<div id="splashscreenlogo"></div>'+
			'<div class="splashvername">'+_UI.thisGlyphrStudioVersion+'<br></div>'+
			'<div class="splashvernum">'+_UI.thisGlyphrStudioVersionNum+'<br></div>'+
			'<div class="splashblurb">'+
				'For more informaiton visit <a href="http://www.glyphrstudio.com" target=_new>www.glyphrstudio.com</a><br>'+
				'Glyphr Studio is licensed under a <a href="https://www.gnu.org/licenses/gpl.html" target="_new">GNU General Public License</a>, ' +
				'which is a free / open source "copyleft" license. You are free to use, distribute, and modify Glyphr Studio as long as ' +
				'this license and its freeness stays intact.'+
			'</div>'+
			'<input style="display:none;" type="file" id="filechooser"/>'+
		'</td>'+
		'<td id="openprojecttableright" vertical-align="middle">' + make_ImportOrCreateNew() + '</td>'+
		'</tr></table>';

		var mp = document.getElementById('mainwrapper');
		mp.innerHTML = ct;
		mp.style.marginLeft = '0px';
		document.getElementById('openprojecttableright').addEventListener('dragover', handleDragOver, false);
		document.getElementById('openprojecttableright').addEventListener('drop', handleDrop, false);
		document.getElementById('openprojecttableright').addEventListener('dragleave', handleDragLeave, false);
		document.getElementById('openprojecttableleft').addEventListener('dragover', handleDragOver, false);
		document.getElementById('openprojecttableleft').addEventListener('drop', handleDrop, false);
		document.getElementById('openprojecttableleft').addEventListener('dragleave', handleDragLeave, false);
		document.getElementById('filechooser').addEventListener('change', handleDrop, false);
		window.addEventListener('message', handleMessage, false);
		if ( window.opener ) { window.opener.postMessage('ready', '*'); }
		openproject_changeTab();

		document.getElementById('splashscreenlogo').innerHTML = makeGlyphrStudioLogo({'fill':'white', 'width':400});
	}

	function make_ImportOrCreateNew(){
		// TABS
		var con = '<div class="openproject_tabs">'+
			'<button onclick="openproject_changeTab(\'new\');">new</button>'+
			'<button onclick="openproject_changeTab(\'load\');">load</button>'+
			'<button onclick="openproject_changeTab(\'examples\');">examples</button>'+
			// '<button onclick="openproject_changeTab(\'recent\');">recent</button>'+
		'</div>';

		// LOAD
		con += '<div class="openproject_tile" id="load_content" style="display: none;">'+
					'<h2>Load a file</h2>'+
					'<button onclick="document.getElementById(\'filechooser\').click();" class="buttonsel">Browse for a File</button>&ensp; or Drag and Drop:'+
					'<div id="droptarget">'+
						'Glyphr Studio Project &ensp;(.txt)<br>'+
						'Open Type or True Type Font &ensp;(.otf or .ttf)<br>'+
						'SVG Font &ensp;(.svg)'+
					'</div>'+
					'<div style="width:335px;">'+ makeErrorMessageBox() + '</div>'+
				'</div>';

		// NEW
		con += '<div class="openproject_tile" id="new_content" style="display: none;">'+
					'<h2>Start a new Glyphr Project</h2>'+
					'Project name: &nbsp; <input id="newprojectname" type="text" value="My Font"/><br>'+
					'<button onclick="newGlyphrProject(); navigate();" class="buttonsel">Start a new font from scratch</button>'+
				'</div>';

		// EXAMPLES
		con += '<div class="openproject_tile" id="examples_content" style="display: none;">'+
					'<h2>Load an Example project</h2>'+
					'Modegg is a project that utilizes Glyphr Studio features, like Components.  '+
					'Merriweather Sans is an open-source font imported from an Open Type file.<br><br>'+
					'<button onclick="openproject_loadSample(true);" class="buttonsel">Modegg</button><br>'+
					'<button onclick="openproject_loadSample(false);" class="buttonsel">Merriweather Sans</button><br>'+
				'</div>';

		// RECENT

		return con;
	}

	function openproject_changeTab (tab) {
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
		// debug('\n handleDrop - START');
		document.getElementById('openprojecttableright').innerHTML = 'Loading File...';
		document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;

		evt.stopPropagation();
		evt.preventDefault();

		var f = evt.dataTransfer || document.getElementById('filechooser');
		f = f.files[0];
		// debug('\t filename: ' + f.name);
		var fname = f.name.split('.');
		fname = fname[fname.length-1].toLowerCase();
		// debug('\t fname = ' + fname);

		var reader = new FileReader();

		if(fname === 'otf' || fname === 'ttf'){
			reader.onload = function(){
				// debug('\n reader.onload::OTF or TTF - START');
				ioOTF_importOTFfont(false, reader.result);
				// debug(' reader.onload:: OTF or TTF - END\n');
			};

			reader.readAsArrayBuffer(f);

		} else if (fname === 'svg' || fname === 'txt'){
			reader.onload = function() {
				// debug('\n reader.onload::SVG or TXT - START');
				if(fname === 'svg') {
					// debug('\t File = .svg');
					_UI.droppedFileContent = reader.result;
					ioSVG_importSVGfont(false);

				} else if(fname === 'txt') {
					// debug('\t File = .txt');
					importGlyphrProjectFromText(reader.result);
					navigate();

				}
				// debug(' reader.onload::SVG OR TXT - END\n');
			};

			reader.readAsText(f);

		} else {
			var con = '<h3>Unsupported file type</h3>';
			con += 'Glyphr Studio can\'t import .' + fname + ' files.<br>';
			con += 'Try loading another file.';
			document.getElementById('openprojecttableright').innerHTML = make_ImportOrCreateNew();
			openproject_changeTab('load');
			showErrorMessageBox(con);
			document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;
		}

		// debug(' handleDrop - END\n');
	}

	function handleMessage(evt) {
		_UI.droppedFileContent = evt.data;
		ioSVG_importSVGfont(false);
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';

		var frtr = document.getElementById('openprojecttableright');
		frtr.style.backgroundColor = _UI.colors.blue.l95;
		frtr.innerHTML = 'Drop it!';
	}

	function handleDragLeave(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var frtr = document.getElementById('openprojecttableright');
		frtr.style.backgroundColor = _UI.colors.gray.offwhite;
		frtr.innerHTML = make_ImportOrCreateNew();
		openproject_changeTab('load');
	}

	function openproject_loadSample (usedefault) {
		document.getElementById('examples_content').innerHTML = '<h2>Load an Example project</h2>Loading example project...';

		setTimeout(function(){
			var gp = usedefault? _UI.sampleproject : _UI.merriweathersans;
			importGlyphrProjectFromText(gp);
			navigate();
		}, 5);
	}

// end of file