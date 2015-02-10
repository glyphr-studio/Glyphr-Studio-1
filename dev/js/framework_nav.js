// start of file

//-------------------
// Navigation
//-------------------

	function navigate(nap){
		// debug('>>> NAVIGATE STARTED - to ' + _UI.navhere + ', nav primary: ' + nap);

		if(_UI.navhere === 'firstrun'){
			makeLayout_Firstrun();
		} else if (_UI.popout){
			if(onCanvasEditPage()){
				makeLayout_PopOut();
			} else {
				popIn();
				makeLayout_PopIn(nap);
			}
		} else {
			makeLayout_PopIn(nap);
		}

		updateCursor();
		loadPageContent();
		getEditDocument().body.focus();
		// debug('>>> NAVIGATED - to ' + _UI.navhere);
	}


	function update_NavPanels() {
		//debug('UPDATE_NAVPANELS');
		if (_UI.popout){ make_NavPanels_PopOut(); }
		else { make_NavPanels_PopIn(); }
	}

//-------------------
// Layout - First Run
//-------------------
	function makeLayout_Firstrun(){
		document.getElementById('primaryScreenLayout').innerHTML = '<div id="mainwrapper"></div>';
	}


//-------------------
// Layout - pop OUT
//-------------------

	function popOut(){
		// debug('\n popOut - START');
		_UI.popout = window.open('', 'glyphr_popout');
		// debug('POPOUT - opened window, _UI.popout is ' + _UI.popout);
		// debug('POPOUT - getting css:\n' + document.styleSheets[0]);

		// Init window properties
        _UI.popout.document.write('<!doctype html>'+
			'<html>'+
			'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
				'<title>Glyphr Studio - Canvas</title>'+
			'</head>'+
			'<body>'+
				'<div id="secondaryScreenLayout"><div id="mainwrapper"></div></div>'+
			'</body>'+
			'</html>');

		// Main Screen
		document.title = 'Glyphr Studio - Tools';
        document.body.classList.add('poppedOut');

        // Second Screen
        _UI.popout.document.head.appendChild(document.styleSheets[0].ownerNode.cloneNode(true));
		_UI.popout.onBeforeUnload = popIn;
		_UI.popout.document.getElementById('mainwrapper').style.overflowY = 'hidden';

		// Paridy Functions
		for(var f in window){ if(window.hasOwnProperty(f) && !_UI.popout[f]){
			_UI.popout[f] = window[f];
			// debug('\t added ' + json(f));
		}}

		navigate();

		// debug(' popOut - END\n');
	}

	function makeLayout_PopOut(){
		// debug('\n makeLayout_PopOut - START');
		var onls = _UI.navhere === 'linked shapes';
		var onkern = _UI.navhere === 'kerning';

		var pol = '<table class="popout_table"><tr>';
		pol += '<td id="popout_pagenav"></td>';
		if(!onkern) pol += '<td id="popout_charchooser"></td>';
		pol += '<td id="popout_guides"></td>';
		pol += '<td id="popout_history"></td>';
		if(!onls && !onkern) pol += '<td id="popout_layerchooser"></td>';
		if(!onkern) pol += '<td id="popout_actions"></td>';
		pol += '<td id="popout_attributes"></td>';
		pol += '</tr></table>';

		document.getElementById('primaryScreenLayout').innerHTML = pol;
		//debug('MAKELAYOUT_POPOUT primaryscreenlayout.innerhtml:\n' + document.getElementById('primaryScreenLayout').innerHTML);
		make_NavPanels_PopOut();
		
		// debug(' makeLayout_PopOut - END\n');
	}

	function make_NavPanels_PopOut(){
		// debug('\n make_NavPanels_PopOut - START');
		//debug('\t\t primaryscreenlayout.innerhtml:\n' + document.getElementById('primaryScreenLayout').innerHTML);
		var onls = _UI.navhere === 'linked shapes';
		var once = _UI.navhere === 'character edit';
		var onlig = _UI.navhere === 'ligatures';
		var ontd = _UI.navhere === 'test drive';
		var onkern = _UI.navhere === 'kerning';
		var evmove = _UI.eventhandlers.currtool.dragging || _UI.eventhandlers.currtool.resizing;

		document.getElementById('popout_pagenav').innerHTML = makePanel_PageNav();

		if(once && !evmove) document.getElementById('popout_charchooser').innerHTML = makePanel_CharChooser();
		else if(onls) document.getElementById('popout_charchooser').innerHTML = makePanel_LinkedShapeChooser();
		else if (onlig) document.getElementById('popout_charchooser').innerHTML = makePanel_LigatureChooser();

		document.getElementById('popout_history').innerHTML = makePanel_History();

		if(!onls && !onkern) document.getElementById('popout_layerchooser').innerHTML = makePanel_LayerChooser();

		if(!onkern)document.getElementById('popout_actions').innerHTML = makePanel_Actions();

		document.getElementById('popout_guides').innerHTML = makePanel_Guides();

		if(ontd) document.getElementById('popout_attributes').innerHTML = makePanel_TestDriveAttributes();
		else if (onkern) document.getElementById('popout_attributes').innerHTML = makePanel_KerningAttributes();
		else document.getElementById('popout_attributes').innerHTML = makePanel_CharAttributes();

		updateSaveIcon();
		// debug('make_NavPanels_PopOut - END\n');
	}



//-------------------
// Layout - pop IN
//-------------------

	function popIn(){
		try { _UI.popout.close(); } catch (e) {}
        document.body.classList.remove('poppedOut');
		_UI.popout = false;
		navigate();
	}

	function makeLayout_PopIn(nap){
		// debug('\n makeLayout_PopIn - START');

		var pil = '<div id="mainwrapper"></div>';
		pil += '<div id="navarea_tabs" onMouseOver="mouseoutcec();"></div>';
		pil += '<div id="navarea_panel" onMouseOver="mouseoutcec();"></div>';
		document.getElementById('primaryScreenLayout').innerHTML = pil;

		mouseoutcec();

		var nh = _UI.navhere;

		if(nap){
			_UI.navprimaryhere = nap;
		} else {
			switch(nh){
				// case 'firstrun':  _UI.navprimaryhere = '';break;
 				case 'character edit': 	_UI.navprimaryhere = 'npChooser'; break;
				case 'linked shapes': 	_UI.navprimaryhere = 'npChooser'; break;
				case 'ligatures': 		_UI.navprimaryhere = 'npChooser'; break;
				case 'kerning': 		_UI.navprimaryhere = 'npAttributes'; break;
				case 'test drive': 		_UI.navprimaryhere = 'npAttributes'; break;
				case 'font settings': 	_UI.navprimaryhere = 'npNav'; break;
				case 'project settings':_UI.navprimaryhere = 'npNav'; break;
				case 'export font': 	_UI.navprimaryhere = 'npNav'; break;
				case 'import svg': 		_UI.navprimaryhere = 'npChooser'; break;
				case 'help': 			_UI.navprimaryhere = 'npNav'; break;
				case 'about': 			_UI.navprimaryhere = 'npNav'; break;
			}
		}

		// pages with redraw() call make_NavPanels_PopIn
		if(onCanvasEditPage()){
			document.getElementById('mainwrapper').style.overflowY = 'hidden';
		} else {
			make_NavPanels_PopIn();
			document.getElementById('mainwrapper').style.overflowY = 'scroll';
		}
	}

	function onCanvasEditPage() {
		var nh = _UI.navhere;
		return ( nh==='character edit' ||
					nh==='linked shapes' ||
					nh==='kerning' ||
					nh==='ligatures');
	}

	function onNoNavPage() {
		var nh = _UI.navhere;
		return ( nh==='font settings' ||
					nh==='project settings' ||
					nh==='export font' ||
					nh==='help' ||
					nh==='about');
	}

	function make_NavPanels_PopIn(){
		// debug('\n make_NavPanels_PopIn - START');
		// debug('\t navhere:' + _UI.navhere + ' navprimaryhere:' + _UI.navprimaryhere);

		var np = document.getElementById('navarea_panel');
		document.getElementById('navarea_tabs').innerHTML = makePanel_NavTabs();
		np.innerHTML = '';
		updateSaveIcon();

		if(onNoNavPage()) {
			_UI.navprimaryhere = 'npNav';
			np.innerHTML = makePanel_PageNav();
			return;
		}

		switch(_UI.navprimaryhere){
			case 'npChooser':
				// debug('\t case ' + npChooser);
				switch(_UI.navhere){
					case 'character edit': np.innerHTML = makePanel_CharChooser('selectChar'); break;
					case 'import svg': np.innerHTML = makePanel_CharChooser('importSVG_selectChar'); break;
					case 'linked shapes': np.innerHTML = makePanel_LinkedShapeChooser(); break;
					case 'ligatures': np.innerHTML = makePanel_LigatureChooser(); break;
				}
				break;

			case 'npAttributes':
				// debug('\t case ' + npAttributes);
				switch (_UI.navhere){
					case 'character edit':
					case 'linked shapes':
					case 'ligatures':
						np.innerHTML = makePanel_CharAttributes();
						np.innerHTML += makePanel_Actions();
					break;
					case 'kerning': np.innerHTML = makePanel_KerningAttributes(); break;
					case 'test drive': np.innerHTML = makePanel_TestDriveAttributes(); break;
				}
				break;

			case 'npNav': np.innerHTML = makePanel_PageNav(); break;
			case 'npLayers': np.innerHTML = makePanel_LayerChooser(); break;
			case 'npGuides': np.innerHTML = makePanel_Guides(); break;
			case 'npHistory': np.innerHTML = makePanel_History(); break;
			case 'npSave': saveGlyphrProjectFile(); break;
		}
		// debug('make_NavPanels_PopIn - END\n');
	}




//-------------------
// Shared stuff
//-------------------

	function getEditDocument(){
		if(_UI.popout){
			return _UI.popout.document;
		} else {
			return document;
		}
	}

	function loadPageContent(){
		switch(_UI.navhere){
			case 'firstrun':			loadPage_firstrun();		break;
			case 'font settings':		loadPage_fontsettings();	break;
			case 'project settings':	loadPage_projectsettings();	break;
			case 'export font':			loadPage_exportfont();		break;
			case 'import svg':			loadPage_importsvg();		break;
			case 'about':				loadPage_about();			break;
			case 'test drive':			loadPage_testdrive();		break;
			case 'linked shapes':		loadPage_linkedshapes();	break;
			case 'character edit':		loadPage_charedit();		break;
			case 'kerning':				loadPage_kerning();			break;
			case 'ligatures':			loadPage_ligatures();		break;
		}
	}

	function updateSaveIcon(){
		var fill = (onNoNavPage()? _UI.colors.gray.offwhite : _UI.colors.gray.l90);
		if(!_UI.projectsaved) fill = 'white';
		document.getElementById('npSave').innerHTML = makeIcon({'name': 'button_npSave', 'color': fill, 'hovercolor':'white'});
	}


	function makePanel_NavTabs(){
		var navarr = [];
		navarr.push('npNav');
		var wi = isWorkItemSelected();

		if(_UI.navprimaryhere !== 'npNav'){
			switch(_UI.navhere){
				case 'character edit':
				navarr.push('npChooser');
				navarr.push('npLayers');
				navarr.push('npAttributes');
				navarr.push('npHistory');
				navarr.push('npGuides');
				break;

				case 'linked shapes':
				navarr.push('npChooser');
				if(wi) navarr.push('npAttributes');
				if(wi) navarr.push('npHistory');
				if(wi) navarr.push('npGuides');
				break;

				case 'ligatures':
				navarr.push('npChooser');
				if(wi) navarr.push('npLayers');
				if(wi) navarr.push('npAttributes');
				if(wi) navarr.push('npHistory');
				if(wi) navarr.push('npGuides');
				break;

				case 'kerning':
				navarr.push('npAttributes');
				if(wi) navarr.push('npHistory');
				if(wi) navarr.push('npGuides');
				break;

				case 'test drive':
				navarr.push('npAttributes');
				break;

				case 'import svg':
				navarr.push('npChooser');
				break;
			}
		}

		var newsub = '';

		// defaults for logo
		var nfill = _UI.colors.blue.l85;
		var nhover = _UI.colors.gray.offwhite;

		if(_UI.navprimaryhere === 'npNav'){
			nfill = _UI.colors.blue.l35;
			nhover = _UI.colors.blue.l35;
			document.getElementById('navarea_tabs').style.backgroundColor = _UI.colors.gray.l90;
		} else {
			document.getElementById('navarea_tabs').style.backgroundColor = _UI.colors.gray.l80;
		}

		// Start putting together the tabs
		if(_UI.navprimaryhere === 'npNav'){
			newsub += '<div class="navarea_header"></div>';
		} else {
			newsub += '<div class="navarea_header" title="Navigate" style="background-color:'+_UI.colors.blue.l45+';"><button class="primarynavbutton" id="npNav" onclick="_UI.navprimaryhere=\'npNav\'; make_NavPanels_PopIn();">';
			newsub += makeIcon({'name': 'button_npNav', 'color': nfill, 'hovercolor': nhover});
			newsub += '</button></div>';
		}

		for(var i=1; i<navarr.length; i++){
			if(_UI.navprimaryhere === navarr[i]){
				nfill = _UI.colors.blue.l55;
				nhover = _UI.colors.blue.l55;
			} else {
				nfill = _UI.colors.gray.l90;
				nhover = 'white';
			}
			newsub += '<div class="panel_section" title="'+navarr[i].substr(2)+'"><button class="primarynavbutton" id="'+navarr[i]+'" onclick="_UI.navprimaryhere=\''+navarr[i]+'\'; make_NavPanels_PopIn();">';
			newsub += makeIcon({'name': ('button_'+navarr[i]), 'color': nfill, 'hovercolor':nhover});
			newsub += '</button></div>';
		}

		var savecolor = (onNoNavPage()? _UI.colors.gray.offwhite : _UI.colors.gray.l90);
		newsub += '<div class="panel_section" title="Save Glyphr Project File"><button class="primarynavbutton" id="npSave" onclick="saveGlyphrProjectFile();">';
		newsub += makeIcon({'name': 'button_npSave', 'color':savecolor, 'hovercolor':'white'});
		newsub += '</button></div>';

		// Bottom Left
		newsub += '<div style="position:absolute; bottom:15px; left:0px; width:70px; text-align:center; cursor:pointer;">';

		// Debug Dumps
		if(_UI.devmode){
			newsub += '<div id="devtools" style="display:none; margin-top:20px; width:70px; text-align:center;">';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_UI);">UI</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.projectsettings);">PS</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.metadata);">META</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.fontchars);">CHAR</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.kerning);">KRN</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.ligatures);">LIG</button><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="debug(_GP.linkedshapes);">LS</button><br><br>';
			newsub += '<button class="buttonsel" style="width:50px; padding:0px 4px;" onclick="console.clear();">clear</button><br><br>';
			newsub += '</div>';
			newsub += '<div style="color:slategray; text-align:center;" onclick="var dt=document.getElementById(\'devtools\'); dt.style.display = (dt.style.display === \'none\'? \'block\' : \'none\');">devtools';
			newsub += '</div><br><br>';
		}

		// Contribute!
		newsub += '<a href="#" style="color:'+_UI.colors.blue.l55+'; font-size:18px;" onclick="openDialog(make_ContributeHTML());">give<br>back!</a>';
		newsub += '</div>';

		return newsub;
	}


	function makePanel_PageNav(){
		var navarr = [
			'character edit',
			'linked shapes',
			'ligatures',
			'kerning',
			'test drive',
			'_',
			'font settings',
			'project settings',
			'_',
			'import svg',
			'export font',
			'_',
			'help',
			'about'
		];

		if(!_UI.popout){
			navarr = navarr.concat([
				'_',
				'feature',
				'email',
				'issue'
			]);
		}

		var newsub = '<div class="navarea_header" style="padding:12px 10px 8px 10px;">'+makeGlyphrStudioLogo({fill:'white', width:150})+'</div>';
		newsub += '<div class="panel_section">';

		var iconname, bc;

		for(var i=0; i<navarr.length; i++){
			bc = 'navtargetbutton';
			iconcolor = _UI.colors.blue.l25;
			if(navarr[i] === _UI.navhere) {
				bc = 'navtargetbuttonsel';
				iconcolor = _UI.colors.blue.l55;
			}

			if(navarr[i]==='_'){
				newsub += '<div style="height:10px;"></div>';
			} else if (navarr[i] === 'help'){
				newsub += '<a href="http://www.glyphrstudio.com/help" style="text-decoration:none;" target=_new class="navtargetbutton">'+
					'<div class="navtargeticon">'+makeIcon({'name':'nav_help', 'color':iconcolor, 'hovercolor':false, 'size':24})+'</div>'+
					'help</a>';
			} else if (navarr[i] === 'feature'){
				newsub += ('<a href="http://glyphrstudio.uservoice.com" class="navpanellink" target=_new>suggest a feature or improvement</a><br>');
			} else if (navarr[i] === 'email'){
				newsub += ('<a href="mailto:mail@glyphrstudio.com&subject=Hi%20Glyphr%20Studio&body='+genEmailContent()+'" class="navpanellink">email the glyphr studio team</a><br>');
			} else if (navarr[i] === 'issue'){
				newsub += ('<a href="https://github.com/mattlag/Glyphr-Studio/issues/new" target=_new class="navpanellink">create a new issue on github</a><br>');
			} else {
				iconname = 'nav_'+navarr[i].replace(' ','');
				newsub += '<button class="'+bc+'" onclick="_UI.navhere=\''+navarr[i]+'\'; _UI.selectedshape=-1; navigate();">'+
					'<div class="navtargeticon">'+makeIcon({'name':iconname, 'color':iconcolor, 'hovercolor':false, 'size':24})+'</div>'+
					navarr[i]+'</button>';
			}
		}
		
		newsub += '<div style="height:40px;"></div>';

		if(_UI.popout) {
			newsub += '<div class="popoutsave">';
			newsub += '<button class="primarynavbutton" id="npSave" style="margin-left:12px;" onclick="saveGlyphrProjectFile();"></button>';
			newsub += '<button title="one screen mode" class="tool" style="background-color:transparent; position:relative; top:-15px;" onclick="popIn();">'+makeToolButton({'name':'tool_popIn'})+'</button>';
			newsub += '</div>';
		}

		newsub += '</div>';

		return newsub;
	}

// end of file