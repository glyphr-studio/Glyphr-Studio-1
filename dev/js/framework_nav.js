// start of file
/**
	Framework > Navigation
	This is all the logic around navigating around
	various pages of the framework.  It also
	handles the layouts for single screen mode and
	tearout / two screen mode.
**/


//-------------------
// Navigation
//-------------------

	function navigate(oa){
		// debug('>>> NAVIGATE STARTED');
		// debug([oa]);

		oa = oa || {};

		clickEmptySpace();
		clearCanvasHotspots();

		if(oa.page && _UI.current_page !== oa.page){
			_UI.current_page = oa.page;
			_UI.current_panel = false;
		} else {
			_UI.current_panel = oa.panel || _UI.current_panel;
			// _UI.last_panel = oa.panel || _UI.last_panel;
		}

		if(!_UI.current_panel) setDefaultPanel();
		if(onChooserPanelPage()) setDefaultGlyphChooserPanel();
		if(oa.forcepanel) _UI.current_panel = oa.panel;

		// debug('\t page  set to ' + _UI.current_page);
		// debug('\t panel set to ' + _UI.current_panel);

		if(_UI.current_page === 'openproject'){
			makeLayout_OpenProject();
		} else if (_UI.popout){
			if(onCanvasEditPage()){
				makeLayout_PopOut();
			} else {
				popIn();
				makeLayout_PopIn();
			}
		} else {
			makeLayout_PopIn();
		}

		updateCursor();
		loadPageContent();
		getEditDocument().body.focus();
		// debug('>>> NAVIGATED - to ' + _UI.current_page);
	}


	function update_NavPanels() {
		// debug('\n update_NavPanels - START');
		if (_UI.popout){ make_NavPanels_PopOut(); }
		else { make_NavPanels_PopIn(); }
		// debug(' update_NavPanels - END\n');
	}

//-------------------
// Layout - First Run
//-------------------
	function makeLayout_OpenProject(){
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
				'<span id="toast"></span>'+
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

		// Parity Functions
		for(var f in window){ if(window.hasOwnProperty(f) && !_UI.popout[f]){
			_UI.popout[f] = window[f];
			// debug('\t added ' + json(f));
		}}

		// Document Key Listeners
		getEditDocument().addEventListener('keypress', keypress, false);
		getEditDocument().addEventListener('keydown', keypress, false);
		getEditDocument().addEventListener('keyup', keyup, false);

		navigate();

		// debug(' popOut - END\n');
	}

	function makeLayout_PopOut(){
		// debug('\n makeLayout_PopOut - START');
		var onkern = _UI.current_page === 'kerning';

		var pol = '<table class="popout_table"><tr>';
		pol += '<td id="popout_pagenav"></td>';
		if(!onkern) pol += '<td id="popout_glyphchooser"></td>';
		pol += '<td id="popout_guides"></td>';
		pol += '<td id="popout_history"></td>';
		if(!onkern) pol += '<td id="popout_layerchooser"></td>';
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
		var onge = _UI.current_page === 'glyph edit';
		var oncom = _UI.current_page === 'components';
		var onlig = _UI.current_page === 'ligatures';
		var ontd = _UI.current_page === 'test drive';
		var onkern = _UI.current_page === 'kerning';
		var evmove = _UI.eventhandlers.currtool.dragging || _UI.eventhandlers.currtool.resizing;

		document.getElementById('popout_pagenav').innerHTML = makePanel_PageNav();

		if((onge || onlig || oncom) && !evmove) document.getElementById('popout_glyphchooser').innerHTML = makePanel_GlyphChooser();

		document.getElementById('popout_history').innerHTML = makePanel_History();

		if(!onkern) document.getElementById('popout_layerchooser').innerHTML = makePanel_LayerChooser();

		if(!onkern)document.getElementById('popout_actions').innerHTML = makePanel_Actions();

		document.getElementById('popout_guides').innerHTML = makePanel_Guides();

		if(ontd) document.getElementById('popout_attributes').innerHTML = makePanel_TestDriveAttributes();
		else if (onkern) document.getElementById('popout_attributes').innerHTML = makePanel_KerningAttributes();
		else document.getElementById('popout_attributes').innerHTML = makePanel_GlyphAttributes();

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

	function makeLayout_PopIn(){
		// debug('\n makeLayout_PopIn - START');
		// debug('\t nap = ' + nap);

		var pil = '<div id="mainwrapper"></div>';
		pil += '<div id="navarea_tabs" onmouseover="mouseoutcec();"></div>';
		pil += '<div id="navarea_panel" onmouseover="mouseoutcec();"></div>';
		document.getElementById('primaryScreenLayout').innerHTML = pil;

		mouseoutcec();

		// pages with redraw call make_NavPanels_PopIn
		if(onCanvasEditPage()){
			document.getElementById('mainwrapper').style.overflowY = 'hidden';
		} else {
			make_NavPanels_PopIn();
			document.getElementById('mainwrapper').style.overflowY = 'scroll';

			// Document Key Listeners
			getEditDocument().addEventListener('keypress', keypress, false);
			getEditDocument().addEventListener('keydown', keypress, false);
			getEditDocument().addEventListener('keyup', keyup, false);
		}

		// debug(' makeLayout_PopIn - END\n');
	}

	function setDefaultPanel() {
		// debug('\n setDefaultPanel - START');
		// debug('\t panel was ' + _UI.current_panel);
		// debug('\t on page ' + _UI.current_page);

		var nh = _UI.current_page;

		switch(nh){
			case 'glyph edit': 		_UI.current_panel = 'npChooser';	break;
			case 'components': 		_UI.current_panel = 'npChooser';	break;
			case 'ligatures': 		_UI.current_panel = 'npChooser';	break;
			case 'import svg': 		_UI.current_panel = 'npChooser';	break;
			case 'kerning': 		_UI.current_panel = 'npAttributes'; break;
			case 'test drive': 		_UI.current_panel = 'npAttributes'; break;
			case 'global actions': 	_UI.current_panel = 'npNav'; 		break;
			case 'font settings': 	_UI.current_panel = 'npNav'; 		break;
			case 'project settings':_UI.current_panel = 'npNav'; 		break;
			case 'export font': 	_UI.current_panel = 'npNav'; 		break;
			case 'help': 			_UI.current_panel = 'npNav'; 		break;
			case 'about': 			_UI.current_panel = 'npNav'; 		break;
		}

		// debug('\t panel is now ' + _UI.current_panel);
		// debug(' setDefaultPanel - END\n');
	}

	function setDefaultGlyphChooserPanel() {
		// debug('\n setDefaultGlyphChooserPanel - START');
		var nh = _UI.current_page;

		switch(nh){
			case 'glyph edit':
				// debug('\t case glyph edit');
				if(_UI.glyphchooser.panel.fname !== 'selectGlyph'){
					_UI.glyphchooser.panel = {fname:'selectGlyph', selected:'glyphs', choices:'glyphs'};
				}
				break;
			case 'components':
				// debug('\t case components');
				_UI.glyphchooser.panel = {fname:'selectComponent', selected:'components', choices:'components'};
				break;
			case 'ligatures':
				// debug('\t case ligatures');
				_UI.glyphchooser.panel = {fname:'selectLigature', selected:'ligatures', choices:'ligatures'};
				break;
			case 'import svg':
				// debug('\t case import svg');
				if(_UI.glyphchooser.panel.fname !== 'importSVG_selectGlyph'){
			 		_UI.glyphchooser.panel = {fname:'importSVG_selectGlyph', selected:'glyphs', choices:'all'};
			 	}
				break;
		}

		// debug(' setDefaultGlyphChooserPanel - END\n');
	}

	function onChooserPanelPage() {
		var nh = _UI.current_page;
		return ( nh==='glyph edit' ||
					nh==='components' ||
					nh==='kerning' ||
					nh==='import svg' ||
					nh==='ligatures');
	}

	function onCanvasEditPage() {
		var nh = _UI.current_page;
		return ( nh==='glyph edit' ||
					nh==='components' ||
					nh==='kerning' ||
					nh==='ligatures');
	}

	function onNoNavPage() {
		var nh = _UI.current_page;
		return ( nh==='font settings' ||
					nh==='project settings' ||
					nh==='global actions' ||
					nh==='export font' ||
					nh==='help' ||
					nh==='about');
	}

	function make_NavPanels_PopIn(){
		// debug('\n make_NavPanels_PopIn - START');
		// debug('\t current_page: ' + _UI.current_page + '\tnavprimaryhere: ' + _UI.current_panel);

		var np = document.getElementById('navarea_panel');
		document.getElementById('navarea_tabs').innerHTML = makePanel_NavTabs();
		np.innerHTML = '';
		closeDialog();
		updateSaveIcon();


		if(!_UI.current_panel) setDefaultPanel();
		// if(_UI.current_page === 'import svg') _UI.current_panel = 'npChooser';

		if(onNoNavPage() || _UI.current_panel === 'npNav') {
			_UI.current_panel = 'npNav';
			np.innerHTML = makePanel_PageNav();
			document.getElementById('npSave').style.display = 'none';
			return;
		} else {
			document.getElementById('npSave').style.display = 'block';
		}

		switch(_UI.current_panel){
			case 'npChooser':
				// debug('\t case npChooser');
				np.innerHTML = makePanel_GlyphChooser();
				break;

			case 'npAttributes':
				// debug('\t case npAttributes');
				switch (_UI.current_page){
					case 'glyph edit':
					case 'components':
					case 'ligatures':
						np.innerHTML = makePanel_GlyphAttributes();
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
		}

		// debug(' make_NavPanels_PopIn - END\n');
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
		switch(_UI.current_page){
			case 'openproject':			loadPage_openproject();		break;
			case 'global actions':		loadPage_globalactions();	break;
			case 'font settings':		loadPage_fontsettings();	break;
			case 'project settings':	loadPage_projectsettings();	break;
			case 'export font':			loadPage_exportfont();		break;
			case 'import svg':			loadPage_importsvg();		break;
			case 'about':				loadPage_about();			break;
			case 'test drive':			loadPage_testdrive();		break;
			case 'components':			loadPage_components();		break;
			case 'glyph edit':			loadPage_glyphedit();		break;
			case 'kerning':				loadPage_kerning();			break;
			case 'ligatures':			loadPage_ligatures();		break;
		}
	}

	function makePanel_NavTabs(){
		// debug('\n makePanel_NavTabs - START');
		var navarr = [];
		navarr.push('npNav');
		var wi = existingWorkItem();

		if(_UI.current_panel !== 'npNav'){
			switch(_UI.current_page){
				case 'glyph edit':
				navarr.push('npChooser');
				navarr.push('npLayers');
				navarr.push('npAttributes');
				navarr.push('npHistory');
				navarr.push('npGuides');
				break;

				case 'components':
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

		if(_UI.current_panel === 'npNav'){
			nfill = _UI.colors.blue.l35;
			nhover = _UI.colors.blue.l35;
			document.getElementById('navarea_tabs').style.backgroundColor = _UI.colors.gray.l90;
		} else {
			document.getElementById('navarea_tabs').style.backgroundColor = _UI.colors.gray.l80;
		}

		// Start putting together the tabs
		if(_UI.current_panel === 'npNav'){
			newsub += '<div class="navarea_header">';
			if(!onNoNavPage()){
				newsub += '<button class="primarynavbutton" id="npNav" onclick="clickHamburger();">';
				newsub += makeIcon({'name':'button_npBack', 'color':_UI.colors.blue.l65, 'hovercolor':_UI.colors.blue.l85});
				newsub += '</button>';
			}
			newsub += '</div>';
		} else {
			newsub += '<div class="navarea_header" title="Navigate" style="background-color:'+_UI.colors.blue.l45+';">';
			newsub += '<button class="primarynavbutton" id="npNav" onclick="clickHamburger();">';
			newsub += makeIcon({'name':'button_npNav', 'color':nfill, 'hovercolor':nhover});
			newsub += '</button></div>';
		}

		for(var i=1; i<navarr.length; i++){
			if(_UI.current_panel === navarr[i]){
				nfill = _UI.colors.blue.l55;
				nhover = _UI.colors.blue.l55;
			} else {
				nfill = _UI.colors.gray.l90;
				nhover = 'white';
			}
			newsub += '<div class="np_section" title="'+navarr[i].substr(2)+'"><button class="primarynavbutton" id="'+navarr[i]+'" onclick="navigate({panel:\''+navarr[i]+'\'});">';
			newsub += makeIcon({'name': ('button_'+navarr[i]), 'color': nfill, 'hovercolor':nhover});
			newsub += '</button></div>';
		}

		// Bottom Left
		newsub += '<div style="position:absolute; bottom:15px; left:0px; width:70px; text-align:center; cursor:pointer;">';

		// Contribute!
		newsub += '<a href="#" style="color:'+_UI.colors.blue.l55+'; font-size:18px;" onclick="openDialog(make_ContributeHTML());">give<br>back!</a>';
		newsub += '</div>';

		// debug(' makePanel_NavTabs - END\n');
		return newsub;
	}

	function clickHamburger() {
		// debug('\n clickHamburger - START');
		// debug('\t current_panel: ' + _UI.current_panel);
		// debug('\t last_panel: ' + _UI.last_panel);

		if(_UI.current_panel === 'npNav'){
			navigate({panel:_UI.last_panel});
		} else {
			_UI.last_panel = _UI.current_panel;
			navigate({panel:'npNav'});
		}

		// debug('\t current_panel: ' + _UI.current_panel);
		// debug('\t last_panel: ' + _UI.last_panel);
		// debug(' clickHamburger - END\n');
	}

	function makePanel_PageNav(){
		var navarr = [];
		navarr.push('glyph edit');
		navarr.push('components');
		navarr.push('ligatures');
		navarr.push('kerning');
		navarr.push('test drive');
		navarr.push('_');
		navarr.push('global actions');
		navarr.push('font settings');
		navarr.push('project settings');
		navarr.push('_');
		navarr.push('import svg');
		if(_UI.popout){
			navarr.push('_');
			navarr.push('popin');
		} else {
			navarr.push('export font');
		}
		if(!_UI.popout) navarr.push('_');
		navarr.push('help');
		navarr.push('about');
		if(!_UI.popout){
			navarr.push('_');
			navarr.push('newproject');
			navarr.push('feature');
			navarr.push('email');
			navarr.push('issue');
		}

		var newsub = '<div class="navarea_header" style="padding:12px 10px 8px 10px;">'+makeGlyphrStudioLogo({fill:'white', width:150})+'</div>';
		newsub += '<div class="panel_section">';

		var iconname, bc;

		for(var i=0; i<navarr.length; i++){
			bc = 'navtargetbutton';
			iconcolor = _UI.colors.blue.l25;
			if(navarr[i] === _UI.current_page) {
				bc = 'navtargetbuttonsel';
				iconcolor = _UI.colors.blue.l55;
			}

			if(navarr[i]==='_'){
				newsub += '<div style="height:12px;"></div>';
			
			} else if (navarr[i] === 'popin'){
				newsub += '<div style="cursor:pointer; background-color:rgb(0,113,170); height:32px; position:relative; left:-10px; top:-4px; padding:50px 0px 0px 14px;" title="one screen mode" onclick="popIn();">'+
					makeIcon({'name':'tool_popIn', 'color':'white', 'hovercolor':'white', 'size':20, 'width':25, 'height':25})+
					'<span style="position:relative; top:-5px; margin-left:10px; color:white;">Pop In</span>'+
					'</div>';
			
			} else if (navarr[i] === 'help'){
				newsub += '<a href="http://help.glyphrstudio.com/" style="text-decoration:none; color:rgb(51, 56, 61);" target="_blank" class="navtargetbutton">'+
					'<div class="navtargeticon">'+makeIcon({'name':'nav_help', 'color':iconcolor, 'hovercolor':false, 'size':50, 'width':25, 'height':25})+'</div>'+
					'help</a>';
			
			} else if (navarr[i] === 'email'){
				newsub += ('<a href="mailto:mail@glyphrstudio.com?subject=Hi%20Glyphr%20Studio&amp;body='+genEmailContent()+'" target="_blank" class="navpanellink">Email the glyphr studio team</a><br>');
			
			} else if (navarr[i] === 'newproject'){
				newsub += ('<a href="http://glyphrstudio.com/online" class="navpanellink" target="_blank">Open a new project (Ctrl + O)</a><br>');
			
			} else if (navarr[i] === 'feature'){
				newsub += ('<a href="http://glyphrstudio.uservoice.com" class="navpanellink" target="_blank">Suggest a feature or improvement</a><br>');
			
			} else if (navarr[i] === 'issue'){
				newsub += ('<a href="https://github.com/mattlag/Glyphr-Studio/issues/new" target="_blank" class="navpanellink">Create a new issue on github</a><br>');
			
			} else if (navarr[i] === _UI.current_page){
				iconname = 'nav_'+navarr[i].replace(' ','');
				newsub += '<button class="'+bc+'" onclick="clickHamburger();">'+
					'<div class="navtargeticon">'+makeIcon({'name':iconname, 'color':iconcolor, 'hovercolor':false, 'size':50, 'width':25, 'height':25})+'</div>'+
					navarr[i]+'</button>';
			
			} else {
				iconname = 'nav_'+navarr[i].replace(' ','');
				newsub += '<button class="'+bc+'" onclick="navigate({page:\''+navarr[i]+'\'});">'+
					'<div class="navtargeticon">'+makeIcon({'name':iconname, 'color':iconcolor, 'hovercolor':false, 'size':50, 'width':25, 'height':25})+'</div>'+
					navarr[i]+'</button>';
			}
		}

		newsub += '</div>';

		return newsub;
	}

// end of file