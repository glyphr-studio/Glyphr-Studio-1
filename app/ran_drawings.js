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

_UI.icons.button_npChar = '<path d="M14.6,20.2v2.4H9.9v-1.7c-1.3,1.3-2.7,1.9-4.3,1.9c-1.2,0-2.3-0.4-3.2-1.2C1.5,20.8,1,19.7,1,18.5c0-1.3,0.5-2.3,1.5-3.2c1-0.8,2.1-1.3,3.5-1.3c1.3,0,2.5,0.4,3.7,1.2v-1.3c0-0.7-0.1-1.2-0.2-1.6c-0.1-0.4-0.4-0.7-0.9-1c-0.5-0.3-1.1-0.5-1.9-0.5c-1.3,0-2.3,0.5-2.9,1.6l-2.6-0.7c1.1-2.1,3.1-3.2,5.9-3.2c1,0,1.9,0.1,2.7,0.4c0.7,0.3,1.3,0.6,1.7,1.1c0.4,0.4,0.6,0.9,0.7,1.4c0.1,0.5,0.2,1.3,0.2,2.4v6.3H14.6z M9.7,17.5c-1.2-0.9-2.3-1.4-3.5-1.4c-0.7,0-1.4,0.2-1.9,0.6c-0.5,0.4-0.7,1-0.7,1.7c0,0.6,0.2,1.2,0.7,1.6c0.4,0.4,1,0.6,1.8,0.6c1.3,0,2.5-0.5,3.7-1.6V17.5z"/><path d="M17,22.6v-2.4h2.4V5.4H17V3h5v7.9c1.3-1.5,3-2.3,4.9-2.3c1.9,0,3.4,0.6,4.7,1.9c1.3,1.3,1.9,3,1.9,5.1c0,2-0.6,3.7-1.9,5.1c-1.2,1.4-2.8,2.1-4.8,2.1c-1.1,0-2.1-0.2-3-0.7c-0.9-0.5-1.5-1-1.9-1.6v2H17z M22.1,15.8c0,1.4,0.4,2.5,1.3,3.4c0.9,0.8,1.9,1.2,3,1.2c1.2,0,2.2-0.4,3.1-1.3c0.9-0.9,1.3-2.1,1.3-3.5c0-1.4-0.4-2.5-1.3-3.3c-0.9-0.8-1.9-1.2-3-1.2c-1.1,0-2.1,0.4-3,1.2C22.6,13.1,22.1,14.2,22.1,15.8z"/><path d="M48.6,8.8v5.1h-2.4c-0.1-1-0.5-1.7-1.2-2.3c-0.7-0.5-1.5-0.8-2.4-0.8c-1.2,0-2.2,0.4-2.9,1.3c-0.8,0.8-1.1,2-1.1,3.3c0,1.3,0.4,2.4,1.1,3.4c0.7,1,1.7,1.5,3.1,1.5c1.9,0,3.2-0.9,4.1-2.7l2.2,1c-1.2,2.7-3.4,4.1-6.4,4.1c-2.2,0-3.9-0.7-5.1-2.2c-1.2-1.5-1.9-3.2-1.9-5.1c0-2.1,0.7-3.8,2-5.1c1.4-1.3,2.9-2,4.7-2c1.5,0,2.8,0.4,3.8,1.3v-1H48.6z"/><path d="M8.8,36L6.1,39h1.8v2.4H1.3V39h2l4.1-4.6l-3.9-4.2H1.6v-2.4H8v2.4H6.3l2.4,2.7l2.4-2.7H9.7v-2.4h6.4v2.4h-2.2l-3.7,4.2l4.2,4.6h1.7v2.4H9.7V39h1.9L8.8,36z"/><path d="M26,41.2l-4.5-11h-2.3v-2.4H26v2.4h-1.6l2.9,7.5l2.9-7.5h-1.8v-2.4H35v2.4h-2l-6.7,17.3h-4.5v-2.3h2.7L26,41.2z"/><path d="M37.3,41.4v-2.2l8.5-9.2h-5.6v2.6h-2.3v-4.8H49v2.4l-8.6,9h6.2v-2.8H49v5H37.3z"/>';

_UI.icons.button_npLayers = '<polygon points="25,22 1,11.5 25,1 49,11.5"/><polygon points="25,31 1,20.5 9,17 25,24 41,17 49,20.5"/><polygon points="25,40 1,29.5 9,26 25,33 41,26 49,29.5"/><polygon points="25,49 1,38.5 9,35 25,42 41,35 49,38.5"/>';

_UI.icons.button_npHistory = '<path d="M43.8,11.6L43,12.3c3.1,3.6,5,8.3,5,13.5c0,11.4-9.3,20.7-20.7,20.7c-9.2,0-17-6.1-19.7-14.4l-1,0.3c2.8,8.8,11,15.1,20.7,15.1c12,0,21.7-9.7,21.7-21.7C49,20.4,47,15.4,43.8,11.6z"/><path d="M27.3,2C15.2,2,5.2,11,3.7,22.7H1l5.1,8.1l5.1-8.1H8.8C10.3,13.8,18,7.1,27.3,7.1c5.2,0,9.8,2.1,13.2,5.5L44.1,9C39.8,4.7,33.8,2,27.3,2z"/><polygon points="35.9,18.2 34.8,17.1 27.4,24.5 25.4,20.4 24,21 26.3,25.6 22.7,29.2 23.8,30.3 27,27 34.1,41.2 35.5,40.6 28.2,25.9"/>';

_UI.icons.button_npAttributes = '<polygon points="2,9 9,16 18,5 15,2 9,10 5,6"/><polygon points="20,45 1,45 1,46 20,46 20,45"/><polygon points="20,37 1,37 1,38 20,38 20,37"/><polygon points="20,41 1,41 1,42 20,42 20,41"/><polygon points="20,28 1,28 1,29 20,29 20,28"/><polygon points="20,20 1,20 1,21 20,21 20,20"/><polygon points="20,24 1,24 1,25 20,25 20,24"/><polygon points="49,12 20,12 20,13 49,13 49,12"/><polygon points="49,4 20,4 20,5 49,5 49,4"/><polygon points="49,8 20,8 20,9 49,9 49,8"/><path d="M24,18v13h25V18H24z M26,27l5-5l5,5H26z M42,27l-5-5h10L42,27z"/><path d="M24,35v13h25V35H24z M26,44l5-5l5,5H26z M42,44l-5-5h10L42,44z"/>';

_UI.icons.button_npSave = '<rect x="19" y="28" width="1" height="5"/><rect x="33" y="17" width="4" height="2"/><rect x="19" y="13" width="2" height="11"/><rect x="29" y="13" width="2" height="11"/><rect x="19" y="23" width="12" height="2"/><rect x="22" y="28" width="9" height="5"/><rect x="19" y="28" width="11" height="1"/><rect x="19" y="32" width="11" height="1"/><polygon points="18,35 15,32 15,15 37,15 37,13 13,13 13,32.8 17.2,37 37,37 37,35"/><polygon points="37,13 35,13 35,15 35,35 35,37 37,37"/>';





//-------------------
// Logos
//-------------------

	function makeGlyphrStudioLogo(oa){
		var fill = oa.fill || "#00AAE1";
		var width = oa.width || 186;
		var height = width * (56/186);	// dimensions of the native logo

		var re = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="'+width+'px" height="'+height+'px" viewBox="0 0 '+width+' '+height+'" enable-background="new 0 0 '+width+' '+height+'" xml:space="preserve">'+
			'<g id="LOGO" fill="'+fill+'" transform="scale('+ (width/186) +')" >'+
			'<polygon points="41,41 37,41 37,1 43,1 43,5 41,5"/>'+
			'<path d="M18,12C9.5,12,1,17.8,1,29c0,8.6,8.8,12.5,17,12.5c4.7,0,9.6-1.3,13-4.1V43c0,5.8-6.7,8.5-13,8.5'+
			'	c-5.5,0-11.3-2-12.7-6.4H7V41H1v2c0,8.6,8.8,12.5,17,12.5c8.2,0,17-3.9,17-12.5V29C35,17.8,26.5,12,18,12z M18,37.5'+
			'	c-6.2,0-13-2.7-13-8.5c0-8.9,6.7-13,13-13c6.2,0,13,4.1,13,13C31,34.8,24.2,37.5,18,37.5z"/>'+
			'<path d="M96,12c-8.5,0-17,5.8-17,17v26h6V51h-2V37.5c3.3,2.7,8.3,4.1,13,4.1c8.2,0,17-3.9,17-12.5'+
			'	C113,17.8,104.5,12,96,12z M96,37.5c-6.2,0-13-2.7-13-8.5c0-8.9,6.7-13,13-13c6.2,0,13,4.1,13,13C109,34.8,102.2,37.5,96,37.5z"/>'+
			'<path d="M157,41h-6V29c0-6.5,2.8-11.7,8-14.7c5.5-3.2,12.6-3.2,18,0c5.2,3,8,8.2,8,14.7H181c0-5-2.1-8.9-6-11.2'+
			'	c-4.2-2.4-9.8-2.4-14,0c-3.9,2.2-6,6.2-6,11.2v8h2V41z"/>'+
			'<path d="M73,13v16c0,5.8-6.7,8.5-13,8.5c-6.2,0-13-2.7-13-8.5V17h2V13h-6v16.5h0c0.3,8.3,9,12,17,12'+
			'	c4.7,0,9.6-1.3,13-4.1V43c0,5.8-6.7,8.5-13,8.5c-5.5,0-11.3-2-12.7-6.4H49V41h-6v2c0,8.6,8.8,12.5,17,12.5c8.2,0,17-3.9,17-12.5V29'+
			'	V13H73z"/>'+
			'<path d="M132,12c-4.8,0-9.7,1.9-13,5.6V5h2V1h-6V41h6V37h-2v-8c0-8.9,6.7-13,13-13c6.2,0,13,4.1,13,13v12h4.1V29'+
			'	C149,17.8,140.5,12,132,12z"/>'+
			'<path d="M152.9,49c-0.4,0-0.8,0-1.1-0.1c-0.3-0.1-0.6-0.2-0.8-0.3v-1h0.1c0.3,0.2,0.5,0.4,0.9,0.5'+
			'	c0.3,0.1,0.6,0.2,0.9,0.2c0.4,0,0.7-0.1,1-0.3c0.2-0.2,0.3-0.4,0.3-0.7c0-0.2-0.1-0.4-0.2-0.6c-0.1-0.1-0.3-0.3-0.5-0.3'+
			'	c-0.2-0.1-0.3-0.1-0.5-0.1c-0.1,0-0.3-0.1-0.6-0.1c-0.2-0.1-0.4-0.1-0.5-0.2c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.4'+
			'	c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.5,0.2-0.9,0.5-1.2c0.4-0.3,0.8-0.5,1.4-0.5c0.3,0,0.6,0,0.9,0.1c0.3,0.1,0.6,0.2,0.8,0.3v0.9h-0.1'+
			'	c-0.2-0.2-0.4-0.3-0.7-0.4c-0.3-0.1-0.6-0.2-0.9-0.2c-0.4,0-0.6,0.1-0.9,0.2c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.2,0.1,0.4,0.2,0.6'+
			'	c0.1,0.1,0.3,0.2,0.6,0.3c0.2,0,0.4,0.1,0.6,0.1c0.2,0.1,0.4,0.1,0.6,0.2c0.4,0.1,0.7,0.3,0.9,0.5c0.2,0.2,0.3,0.5,0.3,0.9'+
			'	c0,0.2,0,0.4-0.1,0.7c-0.1,0.2-0.2,0.4-0.4,0.6c-0.2,0.2-0.4,0.3-0.6,0.4C153.5,48.9,153.2,49,152.9,49z"/>'+
			'<path d="M157.4,48.9v-5.1h-1.9v-0.7h4.6v0.7h-1.9v5.1H157.4z"/>'+
			'<path d="M162.7,49c-0.3,0-0.6,0-0.9-0.1c-0.3-0.1-0.5-0.2-0.6-0.4c-0.2-0.2-0.3-0.4-0.4-0.7c-0.1-0.3-0.1-0.6-0.1-1'+
			'	v-3.6h0.8v3.6c0,0.3,0,0.5,0.1,0.7c0,0.2,0.1,0.3,0.2,0.5c0.1,0.2,0.2,0.3,0.4,0.4c0.2,0.1,0.4,0.1,0.6,0.1c0.2,0,0.5,0,0.6-0.1'+
			'	c0.2-0.1,0.3-0.2,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.5c0-0.2,0.1-0.4,0.1-0.7v-3.6h0.8v3.6c0,0.4,0,0.7-0.1,1c-0.1,0.3-0.2,0.5-0.4,0.7'+
			'	c-0.2,0.2-0.4,0.3-0.6,0.4C163.4,48.9,163.1,49,162.7,49z"/>'+
			'<path d="M170.4,46c0,0.5-0.1,1-0.3,1.4c-0.2,0.4-0.5,0.8-0.9,1c-0.3,0.2-0.6,0.3-0.9,0.4c-0.3,0.1-0.7,0.1-1.1,0.1'+
			'	h-1.3v-5.7h1.3c0.5,0,1,0,1.3,0.1c0.3,0.1,0.6,0.2,0.8,0.3c0.4,0.2,0.7,0.6,0.9,1C170.3,45,170.4,45.4,170.4,46z M169.6,46'+
			'	c0-0.4-0.1-0.8-0.2-1.1c-0.1-0.3-0.4-0.6-0.7-0.7c-0.2-0.1-0.4-0.2-0.7-0.3c-0.2-0.1-0.5-0.1-0.9-0.1h-0.6v4.4h0.6'+
			'	c0.3,0,0.6,0,0.9-0.1c0.3-0.1,0.5-0.2,0.7-0.3c0.3-0.2,0.5-0.4,0.6-0.7C169.5,46.8,169.6,46.4,169.6,46z"/>'+
			'<path d="M173.2,48.9H171v-0.6h0.7v-4.6H171v-0.6h2.2v0.6h-0.7v4.6h0.7V48.9z"/>'+
			'<path d="M178.2,43.8c0.2,0.3,0.4,0.6,0.5,0.9c0.1,0.4,0.2,0.8,0.2,1.3c0,0.5-0.1,0.9-0.2,1.3'+
			'	c-0.1,0.4-0.3,0.7-0.5,0.9c-0.2,0.3-0.5,0.5-0.8,0.6c-0.3,0.1-0.7,0.2-1,0.2c-0.4,0-0.7-0.1-1-0.2c-0.3-0.1-0.6-0.3-0.8-0.6'+
			'	c-0.2-0.3-0.4-0.6-0.5-0.9c-0.1-0.4-0.2-0.8-0.2-1.3c0-0.5,0.1-0.9,0.2-1.3c0.1-0.4,0.3-0.7,0.5-0.9c0.2-0.3,0.5-0.4,0.8-0.6'+
			'	c0.3-0.1,0.7-0.2,1-0.2c0.4,0,0.7,0.1,1.1,0.2C177.8,43.3,178,43.5,178.2,43.8z M178.1,46c0-0.4,0-0.7-0.1-1'+
			'	c-0.1-0.3-0.2-0.5-0.3-0.7c-0.2-0.2-0.3-0.3-0.5-0.4c-0.2-0.1-0.5-0.1-0.7-0.1c-0.3,0-0.5,0-0.7,0.1c-0.2,0.1-0.4,0.2-0.5,0.4'+
			'	c-0.2,0.2-0.3,0.4-0.3,0.7c-0.1,0.3-0.1,0.6-0.1,1c0,0.8,0.2,1.3,0.5,1.7c0.3,0.4,0.7,0.6,1.3,0.6c0.5,0,1-0.2,1.3-0.6'+
			'	C178,47.3,178.1,46.7,178.1,46z"/>'+
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

	var color_outline = _UI.colors.accent;
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
	'outline': '<rect x="4" width="1" height="17"/><rect x="5" y="1" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="11" y="7" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="11" y="12" width="5" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="13" y="9" width="1" height="1"/><rect x="14" y="10" width="1" height="1"/><rect x="15" y="11" width="1" height="1"/><rect x="11" y="18" width="2" height="1"/><rect x="5" y="16" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="7" y="14" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="14" width="1" height="2"/><rect x="10" y="16" width="1" height="2"/><rect x="11" y="12" width="1" height="2"/><rect x="12" y="14" width="1" height="2"/><rect x="13" y="16" width="1" height="2"/>'};

_UI.icons.tool_shapeResize = {
	'fill': '<rect x="1" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="8" y="8" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="1" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/>',
	'outline': '<rect x="16" y="5" width="1" height="10"/><rect x="5" y="16" width="10" height="1"/><rect x="5" y="3" width="10" height="1"/><rect x="3" y="5" width="1" height="10"/><rect x="1" y="1" width="4" height="1"/><rect x="1" y="4" width="4" height="1"/><rect x="1" y="1" width="1" height="4"/><rect x="4" y="1" width="1" height="4"/><rect x="15" y="1" width="4" height="1"/><rect x="15" y="4" width="4" height="1"/><rect x="15" y="1" width="1" height="4"/><rect x="18" y="1" width="1" height="4"/><rect x="15" y="15" width="4" height="1"/><rect x="15" y="18" width="4" height="1"/><rect x="15" y="15" width="1" height="4"/><rect x="18" y="15" width="1" height="4"/><rect x="1" y="15" width="4" height="1"/><rect x="1" y="18" width="4" height="1"/><rect x="1" y="15" width="1" height="4"/><rect x="4" y="15" width="1" height="4"/><rect x="8" y="8" width="4" height="1"/><rect x="8" y="11" width="4" height="1"/><rect x="8" y="8" width="1" height="4"/><rect x="11" y="8" width="1" height="4"/>'};

_UI.icons.tool_newRect = {
	'fill': '<rect x="2" y="2" width="12" height="12"/>', 
	'outline':'<rect x="1" y="1" width="13" height="1"/><rect x="1" y="13" width="13" height="1"/><rect x="14" y="16" width="5" height="1"/><rect x="1" y="2" width="1" height="12"/><rect x="13" y="2" width="1" height="12"/><rect x="16" y="14" width="1" height="5"/>'};

_UI.icons.tool_newOval = {
	'fill': '<rect x="6" y="2" width="4" height="1"/><rect x="6" y="12" width="4" height="1"/><rect x="5" y="10.1" width="4" height="1"/><rect x="2" y="6" width="1" height="3"/><rect x="13" y="6" width="1" height="3"/><rect x="11" y="5.1" width="1" height="3"/><rect x="3" y="3" width="10" height="9"/>',
	'outline': '<rect x="6" y="1" width="4" height="1"/><rect x="4" y="2" width="2" height="1"/><rect x="6" y="13" width="4" height="1"/><rect x="1" y="6" width="1" height="3"/><rect x="2" y="4" width="1" height="2"/><rect x="10" y="2" width="2" height="1"/><rect x="13" y="4" width="1" height="2"/><rect x="4" y="12" width="2" height="1"/><rect x="2" y="9" width="1" height="2"/><rect x="10" y="12" width="2" height="1"/><rect x="13" y="9" width="1" height="2"/><rect x="14" y="6" width="1" height="3"/><rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="12" y="3" width="1" height="1"/><rect x="12" y="11" width="1" height="1"/><rect x="3" y="11" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/>'};

_UI.icons.tool_newPath = {
	'fill': '<rect x="5" y="2" width="5" height="13"/><rect x="10" y="4" width="2" height="11"/><rect x="3" y="9" width="2" height="6"/><rect x="6" y="15" width="3" height="1"/><rect x="12" y="6" width="2" height="7"/><rect x="2" y="2" width="3" height="1"/><rect x="4" y="3" width="3" height="1"/>',
	'outline': '<rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="8" y="2" width="2" height="1"/><rect x="2" y="1" width="6" height="1"/><rect x="6" y="16" width="3" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="12" y="5" width="1" height="1"/><rect x="1" y="1" width="1" height="2"/><rect x="2" y="3" width="2" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="2" y="10" width="1" height="4"/><rect x="3" y="9" width="1" height="1"/><rect x="3" y="14" width="1" height="1"/><rect x="5" y="5" width="1" height="3"/><rect x="4" y="8" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/><rect x="11" y="14" width="1" height="1"/><rect x="9" y="15" width="2" height="1"/><rect x="4" y="15" width="2" height="1"/><rect x="13" y="11" width="1" height="2"/><rect x="13" y="6" width="1" height="2"/><rect x="14" y="8" width="1" height="3"/>'};

_UI.icons.tool_popOut = {'outline':'<rect x="18" y="1" width="1" height="11"/><rect x="6" y="1" width="2" height="11"/><rect x="6" y="1" width="13" height="1"/><rect x="6" y="11" width="13" height="1"/><rect x="13" y="11" width="1" height="8"/><rect x="1" y="8" width="2" height="11"/><rect x="1" y="8" width="7" height="1"/><rect x="1" y="18" width="13" height="1"/>'};

_UI.icons.tool_popIn = {'outline':'<rect x="1" y="1" width="2" height="18"/><rect x="7" y="1" width="2" height="18"/><rect x="18" y="1" width="1" height="17"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/>'};

_UI.icons.tool_zoomEm = {'outline':'<rect x="1" y="1" width="1" height="18"/><rect x="4" y="4" width="2" height="12"/><rect x="14" y="4" width="2" height="12"/><rect x="13" y="5" width="2" height="2"/><rect x="12" y="6" width="2" height="2"/><rect x="10" y="8" width="2" height="2"/><rect x="5" y="5" width="2" height="2"/><rect x="6" y="6" width="2" height="2"/><rect x="7" y="7" width="2" height="2"/><rect x="11" y="7" width="2" height="2"/><rect x="9" y="9" width="2" height="2"/><rect x="8" y="8" width="2" height="2"/><rect x="4" y="4" width="2" height="2"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/>'};

_UI.icons.tool_zoom1to1 = {'outline':'<rect x="5" y="4" width="2" height="12"/><rect x="14" y="4" width="2" height="12"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="1" width="1" height="18"/><rect x="13" y="5" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="9" y="11" width="2" height="2"/><rect x="9" y="7" width="2" height="2"/><rect x="1" y="1" width="18" height="1"/><rect x="1" y="18" width="18" height="1"/>'};

_UI.icons.tool_zoomIn = {'outline':'<rect x="9" y="3" width="2" height="14"/><rect x="3" y="9" width="14" height="2"/>'};

_UI.icons.tool_zoomOut = {'outline':'<rect x="3" y="9" width="14" height="2"/>'};

_UI.icons.tool_pan = {
	'fill':'<rect x="9" y="1" width="2" height="18"/><rect x="1" y="9" width="18" height="2"/><rect x="2" y="7" width="2" height="6"/><rect x="7" y="16" width="6" height="2"/><rect x="16" y="7" width="2" height="6"/><rect x="7" y="2" width="6" height="2"/>',
	'outline':'<rect x="8" y="4" width="1" height="5"/><rect x="8" y="11" width="1" height="5"/><rect x="11" y="4" width="1" height="5"/><rect x="11" y="11" width="1" height="5"/><rect x="4" y="8" width="4" height="1"/><rect x="11" y="8" width="5" height="1"/><rect x="4" y="11" width="4" height="1"/><rect x="4" y="12" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="2" y="12" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect x="0" y="9" width="1" height="2"/><rect x="1" y="8" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="11" y="11" width="5" height="1"/><rect x="12" y="15" width="2" height="1"/><rect x="6" y="15" width="2" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="13" y="16" width="1" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="9" y="19" width="2" height="1"/><rect x="8" y="18" width="1" height="1"/><rect x="7" y="17" width="1" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="15" y="6" width="1" height="2"/><rect x="15" y="12" width="1" height="2"/><rect x="17" y="7" width="1" height="1"/><rect x="16" y="6" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="19" y="9" width="1" height="2"/><rect x="18" y="11" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="6" y="4" width="2" height="1"/><rect x="12" y="4" width="2" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="9" y="0" width="2" height="1"/><rect x="11" y="1" width="1" height="1"/><rect x="12" y="2" width="1" height="1"/><rect x="13" y="3" width="1" height="1"/>'};




//	--------------------
//	Custom UI
//	--------------------


function makePointButton(type, selected) {
	var color = _UI.colors.g4;
	var bgcolor = 'transparent';

	if(selected){
		color = _UI.colors.accent;
		bgcolor = _UI.colors.offwhite;
	}

	//debug("MAKEPOINTBUTTON - " + type + " selected: " + selected + " color: " + color);
	var re = ""; 
	
	re += '<button class="pointtypebutton" style="background-color:'+bgcolor+';" ';
	re += 'onclick="ss().path.sp().type = \''+type+'\'; putundoq(\'Point Type: '+type+'\'); redraw(\'pointDetails\');" ';
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
//	LOCK, SPINNER, CHECKBOX
//	-----------------------

function lockUI(varname, islocked){
	var re = "<button class='customui' style='padding-top:1px;' "+
	'onclick="'+varname+'='+!islocked+'; redraw(\'Lock UI\');">'+
	'<svg version="1.1" '+
	'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+
	'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20">'+
	'<g fill="'+(islocked? _UI.colors.accent : _UI.colors.g8)+'">'+
	'<rect y="6" width="10" height="8"/>'+
	'<rect x="1" y="2" width="2" height="4"/>'+
	'<rect x="7" y="2" width="2" height="4"/>'+
	'<rect x="6" y="1" width="2" height="2"/>'+
	'<rect x="2" y="1" width="2" height="2"/>'+
	'<rect x="3" width="4" height="2"/>'+
	'</g></svg></button>';

	return re;
}

function checkUI(onclick, ischecked){
	//debug("CHECKUI -  onclick:" + onclick + " ischecked:" + ischecked);

	var re = "<button class='customui' style='position:relative; top:-2px;' "+
	"onclick='"+onclick+"'> "+
	'<svg version="1.1" '+
	'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+
	'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20">'+
	'<rect y="4" fill="'+_UI.colors.g8+'" width="16" height="16"/>'+
	(ischecked? ('<polygon fill="'+_UI.colors.accent+'" points="1,11.8 7.6,19 19,5.2 16.6,1 7.6,14.2 3.4,8.8"/>') : '')+
	'</g></svg></button>';

	return re;
}

function helpUI(message){
	var re = "<button class='customui' "+
	'title="quick help tip" '+
	//'onclick="openDialog(\''+message+'\');">'+
	"onclick='openDialog(\""+message+"\");'>"+
	'<svg version="1.1" '+
	'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+
	'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20">'+
	'<g fill="'+_UI.colors.g8+'">'+
	'<rect x="5" y="2" width="9" height="15"/>'+
	'<rect y="9" width="1" height="1"/>'+
	'<rect x="1" y="8" width="1" height="3"/>'+
	'<rect x="2" y="7" width="1" height="5"/>'+
	'<rect x="3" y="6" width="1" height="7"/>'+
	'<rect x="4" y="3" width="1" height="13"/>'+
	'<rect x="14" y="3" width="1" height="13"/>'+
	'</g>'+
	'<g fill="white">'+
	'<rect x="6" y="5" width="1" height="2"/>'+
	'<rect x="8" y="4" width="4" height="1"/>'+
	'<rect x="7" y="4" width="1" height="2"/>'+
	'<rect x="9" y="10" width="1" height="3"/>'+
	'<rect x="9" y="14" width="1" height="1"/>'+
	'<rect x="11" y="4" width="1" height="2"/>'+
	'<rect x="12" y="5" width="1" height="4"/>'+
	'<rect x="9" y="9" width="2" height="1"/>'+
	'<rect x="11" y="8" width="1" height="2"/>'+
	'</g></svg></button>';

	//debug("HELPUI - output:\n"+re);
	return re;
}