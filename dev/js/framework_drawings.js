// start of file

//-------------------
// 50px Icons
//-------------------
	function makeIcon(oa) {
		var size = oa.size || 50;
		var color = oa.color || 'rgb(76,81,86)';
		var hovercolor = oa.hovercolor || 'rgb(0,170,225)';

		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'x="0px" y="0px" width="'+size+'px" height="'+size+'px" viewBox="0 0 50 50"> ';
		re += '<defs></defs> ';
		re += '<rect fill="transparent" width="'+size+'" height="'+size+'" ';
		re += 'onmouseover="var gs=this.parentNode.getElementsByTagName(\'g\'); for(var i=0; i<gs.length; i++){gs[i].style.fill=\''+hovercolor+'\';}" ';
		re += 'onmouseout="var gs=this.parentNode.getElementsByTagName(\'g\'); for(var i=0; i<gs.length; i++){gs[i].style.fill=\''+color+'\';}" ';
		re += '"/> ';
		re += '<g pointer-events="none" fill="'+color+'">';
		re += _UI.icons[oa.name];
		re += '</g>';
		re += '</svg>';

		return re;
	}

	_UI.icons.keyboard = '<rect x="12" y="29" width="26" height="7"/><rect y="29" width="10" height="7"/><rect y="21" width="8" height="6"/><rect x="10" y="21" width="6" height="6"/><rect x="18" y="21" width="6" height="6"/><rect x="26" y="21" width="6" height="6"/><rect x="34" y="21" width="6" height="6"/><rect x="42" y="21" width="8" height="6"/><rect x="6" y="13" width="6" height="6"/><rect x="14" y="13" width="6" height="6"/><rect x="22" y="13" width="6" height="6"/><rect x="38" y="13" width="6" height="6"/><rect x="30" y="13" width="6" height="6"/><rect x="46" y="13" width="4" height="6"/><rect y="13" width="4" height="6"/><rect x="40" y="29" width="10" height="7"/>';

	_UI.icons.button_npNav = '<path d="M45.2,4.8C41.4,1,35.5,1,25,1S8.6,1,4.8,4.8S1,14.5,1,25s0,16.4,3.8,20.2S14.5,49,25,49s16.4,0,20.2-3.8S49,35.5,49,25S49,8.6,45.2,4.8z M39.7,33c0,7.4-7.6,10.8-14.7,10.8c-7.1,0-14.7-3.4-14.7-10.8v-1.8h5.2v3.5H14c1.2,3.8,6.2,5.6,11,5.6c5.4,0,11.2-2.3,11.2-7.3v-4.8c-2.9,2.4-7.1,3.5-11.2,3.5c-7.1,0-14.7-3.4-14.7-10.8c0-9.7,7.4-14.7,14.7-14.7c7.3,0,14.7,5.1,14.7,14.7V33z"/><path d="M25,9.7c-5.4,0-11.2,3.5-11.2,11.2c0,5,5.8,7.3,11.2,7.3c5.4,0,11.2-2.3,11.2-7.3C36.2,13.2,30.4,9.7,25,9.7z"/>';

	_UI.icons.button_npChooser = '<path d="M14.6,20.2v2.4H9.9v-1.7c-1.3,1.3-2.7,1.9-4.3,1.9c-1.2,0-2.3-0.4-3.2-1.2C1.5,20.8,1,19.7,1,18.5c0-1.3,0.5-2.3,1.5-3.2c1-0.8,2.1-1.3,3.5-1.3c1.3,0,2.5,0.4,3.7,1.2v-1.3c0-0.7-0.1-1.2-0.2-1.6c-0.1-0.4-0.4-0.7-0.9-1c-0.5-0.3-1.1-0.5-1.9-0.5c-1.3,0-2.3,0.5-2.9,1.6l-2.6-0.7c1.1-2.1,3.1-3.2,5.9-3.2c1,0,1.9,0.1,2.7,0.4c0.7,0.3,1.3,0.6,1.7,1.1c0.4,0.4,0.6,0.9,0.7,1.4c0.1,0.5,0.2,1.3,0.2,2.4v6.3H14.6z M9.7,17.5c-1.2-0.9-2.3-1.4-3.5-1.4c-0.7,0-1.4,0.2-1.9,0.6c-0.5,0.4-0.7,1-0.7,1.7c0,0.6,0.2,1.2,0.7,1.6c0.4,0.4,1,0.6,1.8,0.6c1.3,0,2.5-0.5,3.7-1.6V17.5z"/><path d="M17,22.6v-2.4h2.4V5.4H17V3h5v7.9c1.3-1.5,3-2.3,4.9-2.3c1.9,0,3.4,0.6,4.7,1.9c1.3,1.3,1.9,3,1.9,5.1c0,2-0.6,3.7-1.9,5.1c-1.2,1.4-2.8,2.1-4.8,2.1c-1.1,0-2.1-0.2-3-0.7c-0.9-0.5-1.5-1-1.9-1.6v2H17z M22.1,15.8c0,1.4,0.4,2.5,1.3,3.4c0.9,0.8,1.9,1.2,3,1.2c1.2,0,2.2-0.4,3.1-1.3c0.9-0.9,1.3-2.1,1.3-3.5c0-1.4-0.4-2.5-1.3-3.3c-0.9-0.8-1.9-1.2-3-1.2c-1.1,0-2.1,0.4-3,1.2C22.6,13.1,22.1,14.2,22.1,15.8z"/><path d="M48.6,8.8v5.1h-2.4c-0.1-1-0.5-1.7-1.2-2.3c-0.7-0.5-1.5-0.8-2.4-0.8c-1.2,0-2.2,0.4-2.9,1.3c-0.8,0.8-1.1,2-1.1,3.3c0,1.3,0.4,2.4,1.1,3.4c0.7,1,1.7,1.5,3.1,1.5c1.9,0,3.2-0.9,4.1-2.7l2.2,1c-1.2,2.7-3.4,4.1-6.4,4.1c-2.2,0-3.9-0.7-5.1-2.2c-1.2-1.5-1.9-3.2-1.9-5.1c0-2.1,0.7-3.8,2-5.1c1.4-1.3,2.9-2,4.7-2c1.5,0,2.8,0.4,3.8,1.3v-1H48.6z"/><path d="M8.8,36L6.1,39h1.8v2.4H1.3V39h2l4.1-4.6l-3.9-4.2H1.6v-2.4H8v2.4H6.3l2.4,2.7l2.4-2.7H9.7v-2.4h6.4v2.4h-2.2l-3.7,4.2l4.2,4.6h1.7v2.4H9.7V39h1.9L8.8,36z"/><path d="M26,41.2l-4.5-11h-2.3v-2.4H26v2.4h-1.6l2.9,7.5l2.9-7.5h-1.8v-2.4H35v2.4h-2l-6.7,17.3h-4.5v-2.3h2.7L26,41.2z"/><path d="M37.3,41.4v-2.2l8.5-9.2h-5.6v2.6h-2.3v-4.8H49v2.4l-8.6,9h6.2v-2.8H49v5H37.3z"/>';

	_UI.icons.button_npLayers = '<polygon points="25,22 1,11.5 25,1 49,11.5"/><polygon points="25,31 1,20.5 9,17 25,24 41,17 49,20.5"/><polygon points="25,40 1,29.5 9,26 25,33 41,26 49,29.5"/><polygon points="25,49 1,38.5 9,35 25,42 41,35 49,38.5"/>';

	_UI.icons.button_npGuides = '<polygon points="4,33 10,39 10,33 "/><polygon points="48,44 0,44 0,46 48,46 48,44 "/><polygon points="48,13 0,13 0,15 48,15 48,13 "/><polygon points="48,6 0,6 0,7 48,7 48,6 "/><polygon points="48,2 0,2 0,4 48,4 48,2 "/><polygon points="48,29 0,29 0,33 48,33 48,29 "/><polygon points="14,0 10,0 10,48 14,48 14,0 "/><polygon points="44.7,0 43.7,0 43.7,48 44.7,48 44.7,0 "/>';

	_UI.icons.button_npHistory = '<path d="M43.8,11.6L43,12.3c3.1,3.6,5,8.3,5,13.5c0,11.4-9.3,20.7-20.7,20.7c-9.2,0-17-6.1-19.7-14.4l-1,0.3c2.8,8.8,11,15.1,20.7,15.1c12,0,21.7-9.7,21.7-21.7C49,20.4,47,15.4,43.8,11.6z"/><path d="M27.3,2C15.2,2,5.2,11,3.7,22.7H1l5.1,8.1l5.1-8.1H8.8C10.3,13.8,18,7.1,27.3,7.1c5.2,0,9.8,2.1,13.2,5.5L44.1,9C39.8,4.7,33.8,2,27.3,2z"/><polygon points="35.9,18.2 34.8,17.1 27.4,24.5 25.4,20.4 24,21 26.3,25.6 22.7,29.2 23.8,30.3 27,27 34.1,41.2 35.5,40.6 28.2,25.9"/>';

	_UI.icons.button_npAttributes = '<polygon points="2,9 9,16 18,5 15,2 9,10 5,6"/><polygon points="20,45 1,45 1,46 20,46 20,45"/><polygon points="20,37 1,37 1,38 20,38 20,37"/><polygon points="20,41 1,41 1,42 20,42 20,41"/><polygon points="20,28 1,28 1,29 20,29 20,28"/><polygon points="20,20 1,20 1,21 20,21 20,20"/><polygon points="20,24 1,24 1,25 20,25 20,24"/><polygon points="49,12 20,12 20,13 49,13 49,12"/><polygon points="49,4 20,4 20,5 49,5 49,4"/><polygon points="49,8 20,8 20,9 49,9 49,8"/><path d="M24,18v13h25V18H24z M26,27l5-5l5,5H26z M42,27l-5-5h10L42,27z"/><path d="M24,35v13h25V35H24z M26,44l5-5l5,5H26z M42,44l-5-5h10L42,44z"/>';

	_UI.icons.button_npSave = '<rect x="19" y="28" width="1" height="5"/><rect x="33" y="17" width="4" height="2"/><rect x="19" y="13" width="2" height="11"/><rect x="29" y="13" width="2" height="11"/><rect x="19" y="23" width="12" height="2"/><rect x="22" y="28" width="9" height="5"/><rect x="19" y="28" width="11" height="1"/><rect x="19" y="32" width="11" height="1"/><polygon points="18,35 15,32 15,15 37,15 37,13 13,13 13,32.8 17.2,37 37,37 37,35"/><polygon points="37,13 35,13 35,15 35,35 35,37 37,37"/>';





//-------------------
// Logos
//-------------------

		function makeGlyphrStudioLogo(oa){
			oa = oa || {};
			var fill = oa.fill || _UI.colors.accent_65;
			var width = oa.width || 184;
			var height = width * (55/184);	// dimensions of the native logo

			var re = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="'+width+'px" height="'+height+'px" viewBox="0 0 '+width+' '+height+'" enable-background="new 0 0 '+width+' '+height+'" xml:space="preserve">'+
				'<g id="LOGO" fill="'+fill+'" transform="scale('+ (width/184) +')" >'+
				'<polygon points="42,0 36,0 36,40 40,40 40,4 42,4"/>'+
				'<path d="M17,11C8.6,11,0,16.8,0,28c0,8.6,8.8,12.5,17,12.5c4.7,0,9.7-1.3,13-4.1V42c0,5.8-6.7,8.5-13,8.5c-5.5,0-11.4-2-12.7-6.5H6v-4H0v2c0,8.6,8.8,12.5,17,12.5S34,50.6,34,42V28C34,16.8,25.4,11,17,11z M17,36.5c-6.3,0-13-2.7-13-8.5c0-8.9,6.7-13,13-13s13,4.1,13,13C30,33.8,23.3,36.5,17,36.5z"/>'+
				'<path d="M95,11c-8.4,0-17,5.8-17,17v26h6v-4h-2V36.4c3.3,2.8,8.3,4.1,13,4.1c8.2,0,17-3.9,17-12.5C112,16.8,103.4,11,95,11z M95,36.5c-6.3,0-13-2.7-13-8.5c0-8.9,6.7-13,13-13s13,4.1,13,13C108,33.8,101.3,36.5,95,36.5z"/>'+
				'<path d="M176,13.4c-5.5-3.2-12.5-3.2-18,0c-5.2,3-8,8.2-8,14.6v12h6v-4h-2v-8c0-5,2.1-8.9,6-11.2c4.2-2.4,9.8-2.4,14,0c3.9,2.2,6,6.2,6,11.2h4C184,21.5,181.2,16.3,176,13.4z"/>'+
				'<path d="M72,28c0,5.8-6.7,8.5-13,8.5S46,33.8,46,28V16h2v-4h-6v16.5h0c0.3,8.2,8.9,12,17,12c4.7,0,9.7-1.3,13-4.1V42c0,5.8-6.7,8.5-13,8.5c-5.5,0-11.4-2-12.7-6.5H48v-4h-6v2c0,8.6,8.8,12.5,17,12.5S76,50.6,76,42V28V12h-4V28z"/>'+
				'<path d="M144,40h4V28c0-11.2-8.6-17-17-17c-4.8,0-9.7,1.9-13,5.7V4h2V0h-6v40h6v-4h-2v-8c0-8.9,6.7-13,13-13s13,4.1,13,13V40z"/>'+
				'<path d="M159.5,42.8h0.6v2.9c0,1.4-1,2-2,2c-0.9,0-2-0.6-2-2v-2.9h0.6v-0.7h-1.3v3.6c0,1.8,1.3,2.7,2.7,2.7c1.3,0,2.7-0.9,2.7-2.7v-3.6h-1.3V42.8z"/>'+
				'<path d="M175.7,42.1c-0.7,0-1.3,0.2-1.8,0.7c-0.6,0.5-0.8,1.2-0.8,2v0.9c0,0.8,0.3,1.5,0.8,2c0.5,0.4,1.1,0.7,1.8,0.7c1.3,0,2.7-0.9,2.7-2.7v-0.9C178.3,43,177,42.1,175.7,42.1z M177.7,45.7c0,1.4-1,2-2,2c-0.5,0-1-0.2-1.4-0.5c-0.4-0.4-0.6-0.9-0.6-1.5v-0.9c0-0.6,0.2-1.1,0.6-1.5c0.4-0.3,0.8-0.5,1.4-0.5c0.9,0,2,0.6,2,2V45.7z"/>'+
				'<path d="M143.7,44.8v0.8h4v0.1c0,1.4-1,2-1.9,2h-1.4v-0.6h-0.7v1.3h2.1c1.3,0,2.6-0.9,2.6-2.7v-0.8h-4v-0.1c0-1.4,1-2,2-2h1.3v0.6h0.7v-1.3h-2C145.1,42.1,143.7,42.9,143.7,44.8z"/>'+
				'<polygon points="149.5,43.4 150.2,43.4 150.2,42.8 151.5,42.8 151.5,47.7 151,47.7 151,48.3 152.8,48.3 152.8,47.7 152.2,47.7 152.2,42.8 153.5,42.8 153.5,43.4 154.2,43.4 154.2,42.1 149.5,42.1"/>'+
				'<polygon points="167.3,43.4 168,43.4 168,42.8 169.3,42.8 169.3,47.7 168,47.7 168,47.1 167.3,47.1 167.3,48.3 172,48.3 172,47.1 171.3,47.1 171.3,47.7 170,47.7 170,42.8 171.3,42.8 171.3,43.4 172,43.4 172,42.1 167.3,42.1"/>'+
				'<path d="M163.6,42.1h-1.7v6.3h1.7c1.8,0,2.7-1.3,2.7-2.7v-0.9C166.3,43.4,165.4,42.1,163.6,42.1z M165.6,45.7c0,0.9-0.6,2-2,2h-1v-4.9h1c1.4,0,2,1,2,2V45.7z"/>'+
				'</g></svg>';
			return re;
		}

		function makeFloatLogo() {
			return '<div id="floatlogo">'+makeGlyphrStudioLogo({})+'</div>';
		}




//	---------------------
//	TOOLS
//	---------------------
	function makeToolButton(oa) {
		//debug("MAKETOOLBUTTON - oa: " + json(oa));

		var color_outline = _UI.colors.accent_65;
		var color_fill = 'transparent';

		if(oa.selected){
			color_outline = 'black';
			color_fill = 'white';
		}

		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20"> ';

		var ic = _UI.icons[oa.name];
		if(ic.fill && oa.selected){
			re += '<g pointer-events="none" fill="'+color_fill+'">';
			re += ic.fill;
			re += '</g>';
		}

		re += '<g pointer-events="none" fill="'+color_outline+'">';
		re += ic.outline;
		re += '</g>';

		re += '</svg>';

		return re;
	}

	_UI.icons.tool_pathEdit = {
		'fill': '<rect x="11" y="14" width="1" height="4"/><rect x="12" y="16" width="1" height="2"/><rect x="9" y="12" width="1" height="2"/><rect x="5" y="3" width="2" height="1"/><rect x="10" y="7" width="1" height="9"/><rect x="5" y="6" width="5" height="6"/><rect x="12" y="9" width="1" height="3"/><rect x="11" y="8" width="1" height="4"/><rect x="14" y="11" width="1" height="1"/><rect x="13" y="10" width="1" height="2"/><rect x="5" y="15" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="5" y="14" width="2" height="1"/><rect x="5" y="13" width="3" height="1"/><rect x="5" y="4" width="3" height="1"/><rect x="5" y="12" width="4" height="1"/><rect x="5" y="5" width="4" height="1"/>',
		'outline': '<rect x="4" width="1" height="17"/><rect x="5" y="1" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="11" y="7" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="11" y="12" width="5" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="13" y="9" width="1" height="1"/><rect x="14" y="10" width="1" height="1"/><rect x="15" y="11" width="1" height="1"/><rect x="11" y="18" width="2" height="1"/><rect x="5" y="16" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="7" y="14" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="14" width="1" height="2"/><rect x="10" y="16" width="1" height="2"/><rect x="11" y="12" width="1" height="2"/><rect x="12" y="14" width="1" height="2"/><rect x="13" y="16" width="1" height="2"/>'
	};

	_UI.icons.tool_shapeResize = {
		'fill': '<rect x="1" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="8" y="8" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="1" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/>',
		'outline': '<rect x="16" y="5" width="1" height="10"/><rect x="5" y="16" width="10" height="1"/><rect x="5" y="3" width="10" height="1"/><rect x="3" y="5" width="1" height="10"/><rect x="1" y="1" width="4" height="1"/><rect x="1" y="4" width="4" height="1"/><rect x="1" y="1" width="1" height="4"/><rect x="4" y="1" width="1" height="4"/><rect x="15" y="1" width="4" height="1"/><rect x="15" y="4" width="4" height="1"/><rect x="15" y="1" width="1" height="4"/><rect x="18" y="1" width="1" height="4"/><rect x="15" y="15" width="4" height="1"/><rect x="15" y="18" width="4" height="1"/><rect x="15" y="15" width="1" height="4"/><rect x="18" y="15" width="1" height="4"/><rect x="1" y="15" width="4" height="1"/><rect x="1" y="18" width="4" height="1"/><rect x="1" y="15" width="1" height="4"/><rect x="4" y="15" width="1" height="4"/><rect x="8" y="8" width="4" height="1"/><rect x="8" y="11" width="4" height="1"/><rect x="8" y="8" width="1" height="4"/><rect x="11" y="8" width="1" height="4"/>'
	};

	_UI.icons.tool_newRect = {
		'fill': '<rect x="2" y="2" width="12" height="12"/>',
		'outline':'<rect x="1" y="1" width="13" height="1"/><rect x="1" y="13" width="13" height="1"/><rect x="14" y="16" width="5" height="1"/><rect x="1" y="2" width="1" height="12"/><rect x="13" y="2" width="1" height="12"/><rect x="16" y="14" width="1" height="5"/>'
	};

	_UI.icons.tool_newOval = {
		'fill': '<rect x="6" y="2" width="4" height="1"/><rect x="6" y="12" width="4" height="1"/><rect x="5" y="10.1" width="4" height="1"/><rect x="2" y="6" width="1" height="3"/><rect x="13" y="6" width="1" height="3"/><rect x="11" y="5.1" width="1" height="3"/><rect x="3" y="3" width="10" height="9"/>',
		'outline': '<rect x="6" y="1" width="4" height="1"/><rect x="4" y="2" width="2" height="1"/><rect x="6" y="13" width="4" height="1"/><rect x="1" y="6" width="1" height="3"/><rect x="2" y="4" width="1" height="2"/><rect x="10" y="2" width="2" height="1"/><rect x="13" y="4" width="1" height="2"/><rect x="4" y="12" width="2" height="1"/><rect x="2" y="9" width="1" height="2"/><rect x="10" y="12" width="2" height="1"/><rect x="13" y="9" width="1" height="2"/><rect x="14" y="6" width="1" height="3"/><rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="12" y="3" width="1" height="1"/><rect x="12" y="11" width="1" height="1"/><rect x="3" y="11" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/>'
	};

	_UI.icons.tool_newPath = {
		'fill': '<rect x="5" y="2" width="5" height="13"/><rect x="10" y="4" width="2" height="11"/><rect x="3" y="9" width="2" height="6"/><rect x="6" y="15" width="3" height="1"/><rect x="12" y="6" width="2" height="7"/><rect x="2" y="2" width="3" height="1"/><rect x="4" y="3" width="3" height="1"/>',
		'outline': '<rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="8" y="2" width="2" height="1"/><rect x="2" y="1" width="6" height="1"/><rect x="6" y="16" width="3" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="12" y="5" width="1" height="1"/><rect x="1" y="1" width="1" height="2"/><rect x="2" y="3" width="2" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="2" y="10" width="1" height="4"/><rect x="3" y="9" width="1" height="1"/><rect x="3" y="14" width="1" height="1"/><rect x="5" y="5" width="1" height="3"/><rect x="4" y="8" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/><rect x="11" y="14" width="1" height="1"/><rect x="9" y="15" width="2" height="1"/><rect x="4" y="15" width="2" height="1"/><rect x="13" y="11" width="1" height="2"/><rect x="13" y="6" width="1" height="2"/><rect x="14" y="8" width="1" height="3"/>'
	};

	_UI.icons.tool_popOut = {'outline':'<rect x="18" y="1" width="1" height="11"/><rect x="6" y="1" width="2" height="11"/><rect x="6" y="1" width="13" height="1"/><rect x="6" y="11" width="13" height="1"/><rect x="13" y="11" width="1" height="8"/><rect x="1" y="8" width="2" height="11"/><rect x="1" y="8" width="7" height="1"/><rect x="1" y="18" width="13" height="1"/>'};

	_UI.icons.tool_popIn = {'outline':'<rect x="1" y="1" width="2" height="18"/><rect x="7" y="1" width="2" height="18"/><rect x="18" y="1" width="1" height="17"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/>'};

	_UI.icons.tool_zoomEm = {'outline':'<rect x="1" y="1" width="1" height="18"/><rect x="4" y="4" width="2" height="12"/><rect x="14" y="4" width="2" height="12"/><rect x="13" y="5" width="2" height="2"/><rect x="12" y="6" width="2" height="2"/><rect x="10" y="8" width="2" height="2"/><rect x="5" y="5" width="2" height="2"/><rect x="6" y="6" width="2" height="2"/><rect x="7" y="7" width="2" height="2"/><rect x="11" y="7" width="2" height="2"/><rect x="9" y="9" width="2" height="2"/><rect x="8" y="8" width="2" height="2"/><rect x="4" y="4" width="2" height="2"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/>'};

	_UI.icons.tool_zoom1to1 = {'outline':'<rect x="5" y="4" width="2" height="12"/><rect x="14" y="4" width="2" height="12"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="1" width="1" height="18"/><rect x="13" y="5" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="9" y="11" width="2" height="2"/><rect x="9" y="7" width="2" height="2"/><rect x="1" y="1" width="18" height="1"/><rect x="1" y="18" width="18" height="1"/>'};

	_UI.icons.tool_zoomIn = {'outline':'<rect x="9" y="3" width="2" height="14"/><rect x="3" y="9" width="14" height="2"/>'};

	_UI.icons.tool_zoomOut = {'outline':'<rect x="3" y="9" width="14" height="2"/>'};

	_UI.icons.tool_pan = {
		'fill':'<rect x="9" y="1" width="2" height="18"/><rect x="1" y="9" width="18" height="2"/><rect x="2" y="7" width="2" height="6"/><rect x="7" y="16" width="6" height="2"/><rect x="16" y="7" width="2" height="6"/><rect x="7" y="2" width="6" height="2"/>',
		'outline':'<rect x="8" y="4" width="1" height="5"/><rect x="8" y="11" width="1" height="5"/><rect x="11" y="4" width="1" height="5"/><rect x="11" y="11" width="1" height="5"/><rect x="4" y="8" width="4" height="1"/><rect x="11" y="8" width="5" height="1"/><rect x="4" y="11" width="4" height="1"/><rect x="4" y="12" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="2" y="12" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect x="0" y="9" width="1" height="2"/><rect x="1" y="8" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="11" y="11" width="5" height="1"/><rect x="12" y="15" width="2" height="1"/><rect x="6" y="15" width="2" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="13" y="16" width="1" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="9" y="19" width="2" height="1"/><rect x="8" y="18" width="1" height="1"/><rect x="7" y="17" width="1" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="15" y="6" width="1" height="2"/><rect x="15" y="12" width="1" height="2"/><rect x="17" y="7" width="1" height="1"/><rect x="16" y="6" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="19" y="9" width="1" height="2"/><rect x="18" y="11" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="6" y="4" width="2" height="1"/><rect x="12" y="4" width="2" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="9" y="0" width="2" height="1"/><rect x="11" y="1" width="1" height="1"/><rect x="12" y="2" width="1" height="1"/><rect x="13" y="3" width="1" height="1"/>'
	};

	_UI.icons.tool_kern = {
		'fill':'<rect x="1" y="9" width="18" height="2"/><rect x="2" y="7" width="2" height="6"/><rect x="16" y="7" width="2" height="6"/>',
		'outline':'<rect x="4" y="8" width="12" height="1"/><rect x="4" y="11" width="12" height="1"/><rect x="4" y="12" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="2" y="12" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect y="9" width="1" height="2"/><rect x="1" y="8" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="15" y="6" width="1" height="2"/><rect x="15" y="12" width="1" height="2"/><rect x="17" y="7" width="1" height="1"/><rect x="16" y="6" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="19" y="9" width="1" height="2"/><rect x="18" y="11" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="9" y="2" width="2" height="16"/>'
	};


//	--------------------
//	Custom UI
//	--------------------

	function makePointButton(type, selected) {
		var color = _UI.colors.gray_40;
		var bgcolor = 'transparent';

		if(selected){
			color = _UI.colors.accent_65;
			bgcolor = _UI.colors.offwhite;
		}

		//debug("MAKEPOINTBUTTON - " + type + " selected: " + selected + " color: " + color);
		var re = "";

		re += '<button class="pointtypebutton" style="background-color:'+bgcolor+';" ';
		re += 'onclick="ss().path.sp().type = \''+type+'\'; history_put(\'Point Type: '+type+'\'); redraw(\'pointDetails\');" ';
		re += 'title="point type: '+type+'" ';
		re += '>';
		re += '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" ';
		re += '><g fill="'+color+'">';
		re += '<rect x="8" y="8" width="1" height="4"/>';
		re += '<rect x="11" y="8" width="1" height="4"/>';
		re += '<rect x="8" y="8" width="4" height="1"/>';
		re += '<rect x="8" y="11" width="4" height="1"/>';
		re += '<rect x="4" y="4" width="1" height="1"/>';
		re += '<rect x="5" y="5" width="1" height="1"/>';
		re += '<rect x="6" y="6" width="1" height="1"/>';
		re += '<rect x="7" y="7" width="1" height="1"/>';
		re += '<circle cx="3" cy="3" r="1.5"/>';

		switch(type){
			case "corner":
				re += '<rect x="7" y="12" width="1" height="1"/>';
				re += '<rect x="6" y="13" width="1" height="1"/>';
				re += '<rect x="5" y="14" width="1" height="1"/>';
				re += '<rect x="4" y="15" width="1" height="1"/>';
				re += '<circle cx="3" cy="17" r="1.5"/>';
				break;

			case "symmetric":
				re += '<rect x="12" y="12" width="1" height="1"/>';
				re += '<rect x="13" y="13" width="1" height="1"/>';
				re += '<rect x="14" y="14" width="1" height="1"/>';
				re += '<rect x="15" y="15" width="1" height="1"/>';
				re += '<circle cx="17" cy="17" r="1.5"/>';
				break;

			case "flat":
				re += '<rect x="12" y="12" width="1" height="1"/>';
				re += '<rect x="13" y="13" width="1" height="1"/>';
				re += '<circle cx="15" cy="15" r="1.5"/>';
				break;
		}

		re += '</g></svg></button>';

		return re;
	}



//	-----------------------
//	LOCK, CHECKBOX, HELP
//	-----------------------

	function lockUI(varname, doredraw){
		//debug("CHECKUI -  varname:" + varname + " doredraw:" + doredraw);
		var idname = varname.split("()");
		idname = idname[idname.length-1];
		var currbool = eval(varname);
		var restcolor = _UI.colors.gray_80;
		var selcolor = _UI.colors.accent_65;

		var re = '<svg '+
			'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" '+
			'x="0px" y="0px" width="26px" height="26px" viewBox="0 0 26 26" enable-background="new 0 0 26 26" '+
			'id='+idname+' '+
			'class="lockui" '+
			'onclick="' +
				'debug(\'Clicked on checkbox '+varname+'\'); ' +
				'toggle(\''+varname+'\'); ' +
				//'history_put(\'Toggled '+idname+': '+!currbool+'\'); '+
				(doredraw? 'redraw(\'checkbox '+idname+'\');"' : '"') +
			'>';
		re += '<path fill="'+(currbool? selcolor : restcolor)+'" d="M17,12V8h-1V7h-1V6h-4v1h-1v1H9v4H8v8h10v-8H17z M15,12h-4V9h1V8h2v1h1V12z"/>';
		re += '</svg>';
		return re;
	}

	function checkUI(varname, doredraw, invert){
		//debug("CHECKUI -  varname:" + varname + " doredraw:" + doredraw);
		var idname = varname.split('.');
		idname = idname[idname.length-1];
		var currbool = eval(varname);
		if(invert) currbool = !currbool;

		var re = '<input type="checkbox"';
		re += (currbool? ' checked ' : ' ');
		re += 'id="'+idname+'"';
		re += 'onclick="toggle(\''+varname+'\');';

		if(doredraw){
			re += ' history_put(\'Toggled '+idname+': '+!currbool+'\');';
			re += ' redraw(\'checkbox '+idname+'\');';
		}

		re += '"/>';

		return re;
	}

	function helpUI(message){
		var re = "<button class='customui' style='margin-left:4px;' "+
		'title="quick help tip" '+
		'onclick="openDialog(\''+message+'\');">'+
		'<svg version="1.1" '+
		'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+
		'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20">'+
			'<circle fill="'+_UI.colors.gray_80+'" cx="9" cy="9" r="9"/>'+
			'<path fill="'+_UI.colors.gray_90+'" d="M8,12v-1c0-0.8,0.4-1.2,0.7-1.7C9,9,9.5,8.5,10.2,7.9c0.5-0.4,0.8-0.7,1-1c0.2-0.3,0.2-0.5,0.2-0.8c0-0.6-0.2-1.1-0.7-1.5C10.2,4.2,9.7,4,9.1,4C8.4,4,7.9,4.1,7.4,4.5C7,4.9,6.7,5.5,6.6,6.3L5,6.1C5.2,5,5.6,4.2,6.3,3.6S7.9,2.8,9,2.8c1.1,0,2.1,0.3,2.8,0.9S13,5,13,5.9c0,0.5-0.1,1-0.4,1.4c-0.2,0.4-0.7,0.9-1.5,1.5c-0.6,0.5-1,0.9-1.2,1.2c-0.2,0.3-0.2,0.2-0.3,0.9L8,12z"/>'+
			'<ellipse fill="'+_UI.colors.gray_90+'" cx="8.8" cy="14.5" rx="1.4" ry="1.2"/>'+
		'</svg></button>';

		//debug("HELPUI - output:\n"+re);
		return re;
	}

// end of file