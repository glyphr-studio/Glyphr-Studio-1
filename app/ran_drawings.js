//-------------------
// Icons
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
//	NAVIGATION
//	---------------------

	function draw_primaryNav_navigate(lctx, fill){

		if(fill === _UI.colors.accent) {
			lctx.fillStyle = fill;
		} else {
			lctx.fillStyle = _UI.colors.offwhite;
		}

		//lctx.fillStyle = fill;

		// layer1/Group
		lctx.save();

		// layer1/Group/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(25.0, 9.2);
		lctx.bezierCurveTo(19.3, 9.2, 13.2, 12.5, 13.2, 19.8);
		lctx.bezierCurveTo(13.2, 24.5, 19.2, 27.0, 25.0, 27.0);
		lctx.bezierCurveTo(30.8, 27.0, 36.8, 24.5, 36.8, 19.8);
		lctx.bezierCurveTo(36.8, 12.5, 30.7, 9.2, 25.0, 9.2);
		lctx.closePath();
		lctx.fill();

		// layer1/Group/Compound Path
		lctx.beginPath();

		// layer1/Group/Compound Path/Path
		lctx.moveTo(46.0, 4.0);
		lctx.bezierCurveTo(42.0, 0.0, 36.0, 0.0, 25.0, 0.0);
		lctx.bezierCurveTo(14.0, 0.0, 8.0, 0.0, 4.0, 4.0);
		lctx.bezierCurveTo(0.0, 8.0, 0.0, 14.0, 0.0, 25.0);
		lctx.bezierCurveTo(0.0, 36.0, 0.0, 42.0, 4.0, 46.0);
		lctx.bezierCurveTo(8.0, 50.0, 14.0, 50.0, 25.0, 50.0);
		lctx.bezierCurveTo(36.0, 50.0, 42.0, 50.0, 46.0, 46.0);
		lctx.bezierCurveTo(50.0, 42.0, 50.0, 36.0, 50.0, 25.0);
		lctx.bezierCurveTo(50.0, 14.0, 50.0, 8.0, 46.0, 4.0);
		lctx.closePath();

		// layer1/Group/Compound Path/Path
		lctx.moveTo(39.6, 33.8);
		lctx.lineTo(39.6, 33.8);
		lctx.bezierCurveTo(39.6, 36.9, 37.9, 39.6, 34.8, 41.4);
		lctx.bezierCurveTo(32.2, 42.9, 28.7, 43.7, 25.0, 43.7);
		lctx.bezierCurveTo(21.3, 43.7, 17.8, 42.9, 15.2, 41.4);
		lctx.bezierCurveTo(12.1, 39.6, 10.4, 36.9, 10.4, 33.8);
		lctx.lineTo(10.4, 33.8);
		lctx.lineTo(10.4, 30.9);
		lctx.lineTo(16.1, 30.9);
		lctx.lineTo(16.1, 33.8);
		lctx.lineTo(13.2, 33.8);
		lctx.bezierCurveTo(13.4, 38.4, 19.2, 40.8, 25.0, 40.8);
		lctx.bezierCurveTo(30.8, 40.8, 36.8, 38.4, 36.8, 33.7);
		lctx.lineTo(36.8, 26.1);
		lctx.bezierCurveTo(36.2, 26.6, 35.5, 27.1, 34.8, 27.5);
		lctx.bezierCurveTo(32.2, 29.1, 28.7, 29.9, 25.0, 29.9);
		lctx.bezierCurveTo(21.3, 29.9, 17.8, 29.1, 15.2, 27.5);
		lctx.bezierCurveTo(12.1, 25.7, 10.4, 23.0, 10.4, 19.8);
		lctx.bezierCurveTo(10.4, 15.6, 12.0, 12.1, 15.0, 9.6);
		lctx.bezierCurveTo(17.7, 7.5, 21.2, 6.3, 25.0, 6.3);
		lctx.bezierCurveTo(28.8, 6.3, 32.3, 7.5, 35.0, 9.6);
		lctx.bezierCurveTo(38.0, 12.1, 39.6, 15.6, 39.6, 19.8);
		lctx.bezierCurveTo(39.6, 19.9, 39.6, 19.9, 39.6, 19.9);
		lctx.lineTo(39.6, 19.9);
		lctx.lineTo(39.6, 33.8);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
		lctx.restore();
	}

	function draw_primaryNav_character(lctx, fill){

		lctx.fillStyle = fill;

		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(13.6, 17.2);
		lctx.lineTo(13.6, 19.6);
		lctx.lineTo(8.9, 19.6);
		lctx.lineTo(8.9, 17.9);
		lctx.bezierCurveTo(7.6, 19.2, 6.2, 19.8, 4.6, 19.8);
		lctx.bezierCurveTo(3.4, 19.8, 2.3, 19.4, 1.4, 18.6);
		lctx.bezierCurveTo(0.5, 17.8, 0.0, 16.7, 0.0, 15.5);
		lctx.bezierCurveTo(0.0, 14.2, 0.5, 13.2, 1.5, 12.3);
		lctx.bezierCurveTo(2.4, 11.5, 3.6, 11.1, 5.0, 11.1);
		lctx.bezierCurveTo(6.2, 11.1, 7.5, 11.5, 8.7, 12.2);
		lctx.lineTo(8.7, 10.9);
		lctx.bezierCurveTo(8.7, 10.2, 8.6, 9.7, 8.5, 9.3);
		lctx.bezierCurveTo(8.3, 8.9, 8.0, 8.6, 7.5, 8.3);
		lctx.bezierCurveTo(7.1, 8.0, 6.4, 7.8, 5.7, 7.8);
		lctx.bezierCurveTo(4.3, 7.8, 3.3, 8.4, 2.7, 9.4);
		lctx.lineTo(0.2, 8.7);
		lctx.bezierCurveTo(1.3, 6.6, 3.3, 5.6, 6.1, 5.6);
		lctx.bezierCurveTo(7.1, 5.6, 8.0, 5.7, 8.7, 6.0);
		lctx.bezierCurveTo(9.5, 6.3, 10.0, 6.6, 10.4, 7.1);
		lctx.bezierCurveTo(10.7, 7.5, 11.0, 8.0, 11.1, 8.5);
		lctx.bezierCurveTo(11.2, 9.0, 11.3, 9.8, 11.3, 10.9);
		lctx.lineTo(11.3, 17.2);
		lctx.lineTo(13.6, 17.2);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(8.7, 14.5);
		lctx.bezierCurveTo(7.5, 13.6, 6.3, 13.2, 5.2, 13.2);
		lctx.bezierCurveTo(4.4, 13.2, 3.8, 13.4, 3.3, 13.8);
		lctx.bezierCurveTo(2.8, 14.2, 2.6, 14.8, 2.6, 15.5);
		lctx.bezierCurveTo(2.6, 16.1, 2.8, 16.6, 3.2, 17.1);
		lctx.bezierCurveTo(3.7, 17.5, 4.2, 17.7, 5.0, 17.7);
		lctx.bezierCurveTo(6.3, 17.7, 7.5, 17.2, 8.7, 16.1);
		lctx.lineTo(8.7, 14.5);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(16.0, 19.6);
		lctx.lineTo(16.0, 17.2);
		lctx.lineTo(18.4, 17.2);
		lctx.lineTo(18.4, 2.4);
		lctx.lineTo(16.0, 2.4);
		lctx.lineTo(16.0, 0.0);
		lctx.lineTo(21.0, 0.0);
		lctx.lineTo(21.0, 7.9);
		lctx.bezierCurveTo(22.4, 6.3, 24.0, 5.6, 26.0, 5.6);
		lctx.bezierCurveTo(27.8, 5.6, 29.4, 6.2, 30.7, 7.5);
		lctx.bezierCurveTo(32.0, 8.8, 32.6, 10.5, 32.6, 12.6);
		lctx.bezierCurveTo(32.6, 14.6, 32.0, 16.3, 30.7, 17.7);
		lctx.bezierCurveTo(29.5, 19.1, 27.9, 19.8, 26.0, 19.8);
		lctx.bezierCurveTo(24.9, 19.8, 23.9, 19.6, 23.0, 19.1);
		lctx.bezierCurveTo(22.1, 18.6, 21.4, 18.1, 21.0, 17.5);
		lctx.lineTo(21.0, 19.6);
		lctx.lineTo(16.0, 19.6);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(21.1, 12.8);
		lctx.bezierCurveTo(21.1, 14.2, 21.6, 15.3, 22.4, 16.2);
		lctx.bezierCurveTo(23.3, 17.0, 24.3, 17.4, 25.4, 17.4);
		lctx.bezierCurveTo(26.6, 17.4, 27.6, 17.0, 28.5, 16.1);
		lctx.bezierCurveTo(29.4, 15.2, 29.8, 14.0, 29.8, 12.5);
		lctx.bezierCurveTo(29.8, 11.1, 29.4, 10.0, 28.5, 9.2);
		lctx.bezierCurveTo(27.7, 8.4, 26.6, 8.0, 25.5, 8.0);
		lctx.bezierCurveTo(24.4, 8.0, 23.3, 8.4, 22.5, 9.2);
		lctx.bezierCurveTo(21.6, 10.1, 21.1, 11.2, 21.1, 12.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(47.6, 5.8);
		lctx.lineTo(47.6, 10.9);
		lctx.lineTo(45.2, 10.9);
		lctx.bezierCurveTo(45.1, 9.9, 44.6, 9.2, 44.0, 8.7);
		lctx.bezierCurveTo(43.3, 8.1, 42.5, 7.9, 41.6, 7.9);
		lctx.bezierCurveTo(40.4, 7.9, 39.4, 8.3, 38.7, 9.2);
		lctx.bezierCurveTo(37.9, 10.0, 37.5, 11.1, 37.5, 12.5);
		lctx.bezierCurveTo(37.5, 13.8, 37.9, 14.9, 38.6, 15.9);
		lctx.bezierCurveTo(39.3, 16.9, 40.4, 17.4, 41.7, 17.4);
		lctx.bezierCurveTo(43.6, 17.4, 44.9, 16.5, 45.8, 14.7);
		lctx.lineTo(48.0, 15.7);
		lctx.bezierCurveTo(46.8, 18.4, 44.6, 19.8, 41.6, 19.8);
		lctx.bezierCurveTo(39.4, 19.8, 37.7, 19.1, 36.5, 17.6);
		lctx.bezierCurveTo(35.3, 16.1, 34.6, 14.4, 34.6, 12.5);
		lctx.bezierCurveTo(34.6, 10.4, 35.3, 8.7, 36.7, 7.4);
		lctx.bezierCurveTo(38.0, 6.1, 39.6, 5.4, 41.3, 5.4);
		lctx.bezierCurveTo(42.9, 5.4, 44.1, 5.8, 45.2, 6.7);
		lctx.lineTo(45.2, 5.8);
		lctx.lineTo(47.6, 5.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(7.8, 33.0);
		lctx.lineTo(5.1, 36.0);
		lctx.lineTo(6.9, 36.0);
		lctx.lineTo(6.9, 38.4);
		lctx.lineTo(0.3, 38.4);
		lctx.lineTo(0.3, 36.0);
		lctx.lineTo(2.3, 36.0);
		lctx.lineTo(6.3, 31.4);
		lctx.lineTo(2.4, 27.2);
		lctx.lineTo(0.6, 27.2);
		lctx.lineTo(0.6, 24.8);
		lctx.lineTo(7.0, 24.8);
		lctx.lineTo(7.0, 27.2);
		lctx.lineTo(5.3, 27.2);
		lctx.lineTo(7.7, 29.8);
		lctx.lineTo(10.1, 27.2);
		lctx.lineTo(8.7, 27.2);
		lctx.lineTo(8.7, 24.8);
		lctx.lineTo(15.2, 24.8);
		lctx.lineTo(15.2, 27.2);
		lctx.lineTo(12.9, 27.2);
		lctx.lineTo(9.2, 31.4);
		lctx.lineTo(13.4, 36.0);
		lctx.lineTo(15.2, 36.0);
		lctx.lineTo(15.2, 38.4);
		lctx.lineTo(8.7, 38.4);
		lctx.lineTo(8.7, 36.0);
		lctx.lineTo(10.6, 36.0);
		lctx.lineTo(7.8, 33.0);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(25.0, 38.2);
		lctx.lineTo(20.5, 27.2);
		lctx.lineTo(18.3, 27.2);
		lctx.lineTo(18.3, 24.8);
		lctx.lineTo(25.0, 24.8);
		lctx.lineTo(25.0, 27.2);
		lctx.lineTo(23.4, 27.2);
		lctx.lineTo(26.3, 34.7);
		lctx.lineTo(29.2, 27.2);
		lctx.lineTo(27.4, 27.2);
		lctx.lineTo(27.4, 24.8);
		lctx.lineTo(34.0, 24.8);
		lctx.lineTo(34.0, 27.2);
		lctx.lineTo(32.0, 27.2);
		lctx.lineTo(25.2, 44.5);
		lctx.lineTo(20.7, 44.5);
		lctx.lineTo(20.7, 42.2);
		lctx.lineTo(23.4, 42.2);
		lctx.lineTo(25.0, 38.2);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(36.3, 38.4);
		lctx.lineTo(36.3, 36.2);
		lctx.lineTo(44.8, 27.0);
		lctx.lineTo(39.2, 27.0);
		lctx.lineTo(39.2, 29.6);
		lctx.lineTo(36.9, 29.6);
		lctx.lineTo(36.9, 24.8);
		lctx.lineTo(48.0, 24.8);
		lctx.lineTo(48.0, 27.2);
		lctx.lineTo(39.4, 36.2);
		lctx.lineTo(45.7, 36.2);
		lctx.lineTo(45.7, 33.4);
		lctx.lineTo(48.0, 33.4);
		lctx.lineTo(48.0, 38.4);
		lctx.lineTo(36.3, 38.4);
		lctx.closePath();
		lctx.fill();
	}

	function draw_primaryNav_layers(lctx, fill){

		lctx.fillStyle = fill;

		// shapes/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(24.0, 21.0);
		lctx.lineTo(0.0, 10.5);
		lctx.lineTo(24.0, 0.0);
		lctx.lineTo(48.0, 10.5);
		lctx.lineTo(24.0, 21.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 30.0);
		lctx.lineTo(0.0, 19.5);
		lctx.lineTo(8.0, 16.0);
		lctx.lineTo(24.0, 23.0);
		lctx.lineTo(40.0, 16.0);
		lctx.lineTo(48.0, 19.5);
		lctx.lineTo(24.0, 30.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 39.0);
		lctx.lineTo(0.0, 28.5);
		lctx.lineTo(8.0, 25.0);
		lctx.lineTo(24.0, 32.0);
		lctx.lineTo(40.0, 25.0);
		lctx.lineTo(48.0, 28.5);
		lctx.lineTo(24.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 48.0);
		lctx.lineTo(0.0, 37.5);
		lctx.lineTo(8.0, 34.0);
		lctx.lineTo(24.0, 41.0);
		lctx.lineTo(40.0, 34.0);
		lctx.lineTo(48.0, 37.5);
		lctx.lineTo(24.0, 48.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}

	function draw_primaryNav_history(lctx, fill){

		lctx.fillStyle = fill;

		// history/Path
		lctx.beginPath();
		lctx.moveTo(42.3, 9.5);
		lctx.lineTo(41.5, 10.2);
		lctx.bezierCurveTo(44.6, 13.8, 46.5, 18.4, 46.5, 23.5);
		lctx.bezierCurveTo(46.5, 34.8, 37.3, 44.0, 26.0, 44.0);
		lctx.bezierCurveTo(16.9, 44.0, 9.1, 38.0, 6.5, 29.7);
		lctx.lineTo(5.5, 30.1);
		lctx.bezierCurveTo(8.3, 38.7, 16.4, 45.0, 26.0, 45.0);
		lctx.bezierCurveTo(37.9, 45.0, 47.5, 35.4, 47.5, 23.5);
		lctx.bezierCurveTo(47.5, 18.2, 45.5, 13.3, 42.3, 9.5);
		lctx.closePath();
		lctx.fill();

		// history/Path
		lctx.beginPath();
		lctx.moveTo(26.0, 0.0);
		lctx.bezierCurveTo(14.1, 0.0, 4.2, 9.0, 2.7, 20.5);
		lctx.lineTo(0.0, 20.5);
		lctx.lineTo(5.0, 28.5);
		lctx.lineTo(10.0, 20.5);
		lctx.lineTo(7.8, 20.5);
		lctx.bezierCurveTo(9.2, 11.7, 16.8, 5.0, 26.0, 5.0);
		lctx.bezierCurveTo(31.1, 5.0, 35.7, 7.1, 39.1, 10.4);
		lctx.lineTo(42.6, 6.9);
		lctx.bezierCurveTo(38.4, 2.6, 32.5, 0.0, 26.0, 0.0);
		lctx.closePath();
		lctx.fill();

		// history/Path
		lctx.beginPath();
		lctx.moveTo(34.5, 16.0);
		lctx.lineTo(33.4, 15.0);
		lctx.lineTo(26.2, 22.2);
		lctx.lineTo(24.1, 18.2);
		lctx.lineTo(22.8, 18.8);
		lctx.lineTo(25.1, 23.4);
		lctx.lineTo(21.5, 27.0);
		lctx.lineTo(22.5, 28.0);
		lctx.lineTo(25.8, 24.8);
		lctx.lineTo(32.8, 38.8);
		lctx.lineTo(34.1, 38.2);
		lctx.lineTo(26.9, 23.7);
		lctx.lineTo(34.5, 16.0);
		lctx.closePath();
		lctx.fill();
	}


	function draw_primaryNav_attributes(lctx, fill){

		lctx.fillStyle = fill;

		// newAttributes/Check
		lctx.beginPath();
		lctx.moveTo(1.0, 7.0);
		lctx.lineTo(8.0, 14.0);
		lctx.lineTo(17.0, 3.0);
		lctx.lineTo(14.0, 0.0);
		lctx.lineTo(8.0, 8.0);
		lctx.lineTo(4.0, 4.0);
		lctx.lineTo(1.0, 7.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 43.0);
		lctx.lineTo(0.0, 43.0);
		lctx.lineTo(0.0, 44.0);
		lctx.lineTo(19.0, 44.0);
		lctx.lineTo(19.0, 43.0);
		lctx.lineTo(19.0, 43.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 35.0);
		lctx.lineTo(0.0, 35.0);
		lctx.lineTo(0.0, 36.0);
		lctx.lineTo(19.0, 36.0);
		lctx.lineTo(19.0, 35.0);
		lctx.lineTo(19.0, 35.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 39.0);
		lctx.lineTo(0.0, 39.0);
		lctx.lineTo(0.0, 40.0);
		lctx.lineTo(19.0, 40.0);
		lctx.lineTo(19.0, 39.0);
		lctx.lineTo(19.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 26.0);
		lctx.lineTo(0.0, 26.0);
		lctx.lineTo(0.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 26.0);
		lctx.lineTo(19.0, 26.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 18.0);
		lctx.lineTo(0.0, 18.0);
		lctx.lineTo(0.0, 19.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(19.0, 18.0);
		lctx.lineTo(19.0, 18.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 22.0);
		lctx.lineTo(0.0, 22.0);
		lctx.lineTo(0.0, 23.0);
		lctx.lineTo(19.0, 23.0);
		lctx.lineTo(19.0, 22.0);
		lctx.lineTo(19.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 10.0);
		lctx.lineTo(19.0, 10.0);
		lctx.lineTo(19.0, 11.0);
		lctx.lineTo(48.0, 11.0);
		lctx.lineTo(48.0, 10.0);
		lctx.lineTo(48.0, 10.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 2.0);
		lctx.lineTo(19.0, 2.0);
		lctx.lineTo(19.0, 3.0);
		lctx.lineTo(48.0, 3.0);
		lctx.lineTo(48.0, 2.0);
		lctx.lineTo(48.0, 2.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 6.0);
		lctx.lineTo(19.0, 6.0);
		lctx.lineTo(19.0, 7.0);
		lctx.lineTo(48.0, 7.0);
		lctx.lineTo(48.0, 6.0);
		lctx.lineTo(48.0, 6.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 16.0);
		lctx.lineTo(23.0, 29.0);
		lctx.lineTo(48.0, 29.0);
		lctx.lineTo(48.0, 16.0);
		lctx.lineTo(23.0, 16.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 25.0);
		lctx.lineTo(30.0, 20.0);
		lctx.lineTo(35.0, 25.0);
		lctx.lineTo(25.0, 25.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 25.0);
		lctx.lineTo(36.0, 20.0);
		lctx.lineTo(46.0, 20.0);
		lctx.lineTo(41.0, 25.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 33.0);
		lctx.lineTo(23.0, 46.0);
		lctx.lineTo(48.0, 46.0);
		lctx.lineTo(48.0, 33.0);
		lctx.lineTo(23.0, 33.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 42.0);
		lctx.lineTo(30.0, 37.0);
		lctx.lineTo(35.0, 42.0);
		lctx.lineTo(25.0, 42.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 42.0);
		lctx.lineTo(36.0, 37.0);
		lctx.lineTo(46.0, 37.0);
		lctx.lineTo(41.0, 42.0);
		lctx.closePath();
		lctx.fill();
	}

	function draw_primaryNav_save(lctx, fill){

		lctx.fillStyle = fill;

		// save/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(32.0, 16.0);
		lctx.lineTo(36.0, 16.0);
		lctx.lineTo(36.0, 18.0);
		lctx.lineTo(32.0, 18.0);
		lctx.lineTo(32.0, 16.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 12.0);
		lctx.lineTo(20.0, 12.0);
		lctx.lineTo(20.0, 23.0);
		lctx.lineTo(18.0, 23.0);
		lctx.lineTo(18.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(28.0, 12.0);
		lctx.lineTo(30.0, 12.0);
		lctx.lineTo(30.0, 23.0);
		lctx.lineTo(28.0, 23.0);
		lctx.lineTo(28.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 22.0);
		lctx.lineTo(30.0, 22.0);
		lctx.lineTo(30.0, 24.0);
		lctx.lineTo(18.0, 24.0);
		lctx.lineTo(18.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(21.0, 27.0);
		lctx.lineTo(30.0, 27.0);
		lctx.lineTo(30.0, 32.0);
		lctx.lineTo(21.0, 32.0);
		lctx.lineTo(21.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(29.0, 27.0);
		lctx.lineTo(29.0, 28.0);
		lctx.lineTo(18.0, 28.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 31.0);
		lctx.lineTo(29.0, 31.0);
		lctx.lineTo(29.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 31.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(17.0, 34.0);
		lctx.lineTo(14.0, 31.0);
		lctx.lineTo(14.0, 14.0);
		lctx.lineTo(36.0, 14.0);
		lctx.lineTo(36.0, 12.0);
		lctx.lineTo(12.0, 12.0);
		lctx.lineTo(12.0, 31.8);
		lctx.lineTo(16.2, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 34.0);
		lctx.lineTo(17.0, 34.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(36.0, 12.0);
		lctx.lineTo(34.0, 12.0);
		lctx.lineTo(34.0, 14.0);
		lctx.lineTo(34.0, 34.0);
		lctx.lineTo(34.0, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 12.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}


//	---------------------
//	TOOLS
//	---------------------

function drawNewPathButton(lctx, bgcolor, outlinecolor){
	// newPath/BG
	lctx.fillStyle = bgcolor;

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 8.0);
	lctx.lineTo(11.0, 8.0);
	lctx.lineTo(11.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline
	lctx.fillStyle = outlinecolor;

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(8.0, 11.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 12.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewOvalButton(lctx, bgcolor, outlinecolor){
	// newOval/BG
	lctx.fillStyle = bgcolor;

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(4.0, 2.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(2.0, 4.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 7.0);
	lctx.lineTo(10.0, 7.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Group
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline
	lctx.fillStyle = outlinecolor;

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(8.0, 0.0);
	lctx.lineTo(8.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 11.0);
	lctx.lineTo(4.0, 11.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 7.0);
	lctx.lineTo(0.0, 7.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.lineTo(12.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewRectButton(lctx, bgcolor, outlinecolor){
	// newRect/BG
	lctx.fillStyle = bgcolor;

	// newRect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(11.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline
	lctx.fillStyle = outlinecolor;

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(12.0, 0.0);
	lctx.lineTo(12.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(12.0, 1.0);
	lctx.lineTo(12.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}

function drawShapeResizeButton(lctx, bgcolor, outlinecolor){

	// FILLS
	lctx.fillStyle = bgcolor;

	// shapeMove/Path
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();


	// OUTLINES
	lctx.fillStyle = outlinecolor;

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(3.0, 12.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();


	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(14.0, 3.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(11.0, 0.0);
	lctx.lineTo(11.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(13.0, 14.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();
}

function drawPathEditButton(lctx, bgcolor, outlinecolor){

	// shapeSelect/BG
	lctx.fillStyle = bgcolor;

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 18.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(8.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 18.0);
	lctx.lineTo(8.0, 18.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(9.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 14.0);
	lctx.lineTo(5.0, 14.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 16.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 12.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(9.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 12.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 16.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(2.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 3.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 15.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 13.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline
	lctx.fillStyle = outlinecolor;

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 17.0);
	lctx.lineTo(0.0, 17.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(7.0, 6.0);
	lctx.lineTo(7.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(12.0, 12.0);
	lctx.lineTo(12.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 19.0);
	lctx.lineTo(7.0, 19.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 19.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 17.0);
	lctx.lineTo(1.0, 17.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(6.0, 14.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(5.0, 16.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 16.0);
	lctx.lineTo(7.0, 16.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(6.0, 18.0);
	lctx.lineTo(6.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(7.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(8.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 16.0);
	lctx.lineTo(10.0, 16.0);
	lctx.lineTo(10.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 16.0);
	lctx.closePath();
	lctx.fill();
}

function drawPanButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(5.0, 3.0);
	lctx.lineTo(5.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 2.0);
	lctx.lineTo(6.0, 2.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 1.0);
	lctx.lineTo(7.0, 1.0);
	lctx.lineTo(7.0, 0.0);
	lctx.lineTo(9.0, 0.0);
	lctx.lineTo(9.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 13.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(13.0, 8.0);
	lctx.lineTo(13.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 4.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 5.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(14.0, 9.0);
	lctx.lineTo(14.0, 5.0);
	lctx.lineTo(13.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 6.0);
	lctx.lineTo(14.0, 8.0);
	lctx.lineTo(15.0, 8.0);
	lctx.lineTo(15.0, 6.0);
	lctx.lineTo(14.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(3.0, 8.0);
	lctx.lineTo(3.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 5.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 6.0);
	lctx.lineTo(2.0, 8.0);
	lctx.lineTo(1.0, 8.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoomInButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(7.0, 3.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(9.0, 13.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoomOutButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoom1to1Button(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(12.0, 3.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(12.0, 5.0);
	lctx.lineTo(12.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoomEmButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.save();
	lctx.beginPath();
	lctx.moveTo(1.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(1.0, 11.0);
	lctx.lineTo(1.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(12.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(8.0, 4.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(6.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(14.0, 11.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 12.0);
	lctx.lineTo(14.0, 12.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(14.0, 1.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();
}

function drawPopOutButton(){
	var b = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="12px" viewBox="0 0 14 12" enable-background="new 0 0 14 12" xml:space="preserve">'+
		'<rect y="3" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="10" y="8" fill="rgb(0,170,225)" width="1" height="4"/>'+
		'<rect y="11" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'<rect y="3" fill="rgb(0,170,225)" width="4" height="1"/>'+
		'<rect x="3" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="13" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="3" y="8" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'<rect x="3" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'</svg>';

	return b;
}

function drawPopInButton(){
	var b = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="12px" viewBox="0 0 14 12" enable-background="new 0 0 14 12" xml:space="preserve">'+
		'<rect fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect x="5" fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect x="13" fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect y="11" fill="rgb(0,170,225)" width="14" height="1"/>'+
		'<rect fill="rgb(0,170,225)" width="14" height="1"/>'+
		'</svg>';

	return b;
}

//	----------------------
//	POINT TYPES
//	----------------------

function drawPointCornerButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointCorner/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(5.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 13.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 13.0);
	lctx.closePath();
	lctx.fill();


}

function drawPointFlatButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointFlat/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

}

function drawPointSymmetricButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointSymmetric/Path

	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 13.0);
	lctx.lineTo(11.0, 13.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(13.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

}



//	-----------------------
//	LOCK, SPINNER, CHECKBOX
//	-----------------------

function drawLockButton(obj, c) {
	//debug("DRAWLOCKBUTTON obj/c: " + obj + "," + c);

	var lctx = obj.getContext('2d');
	lctx.fillStyle = c;

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 4.0);
	lctx.lineTo(6.0, 4.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(5.0, 1.0);
	lctx.lineTo(5.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(5.0, 0.0);
	lctx.lineTo(5.0, 1.0);
	lctx.closePath();
	lctx.fill();

	//debug("END OF DRAWLOCKBUTTON");
}

function drawCheckbox(obj, ischecked) {
	var lctx = obj.getContext('2d');

	//Box
	lctx.fillStyle = _UI.colors.text_light;
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(0.0, 15.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	if(ischecked){
		//Check
		lctx.fillStyle = _UI.colors.accent;
		lctx.beginPath();
		lctx.moveTo(0.0, 9.0);
		lctx.lineTo(5.5, 15.0);
		lctx.lineTo(15.0, 3.5);
		lctx.lineTo(13.0, 0.0);
		lctx.lineTo(5.5, 11.0);
		lctx.lineTo(2.0, 6.5);
		lctx.lineTo(0.0, 9.0);
		lctx.closePath();
		lctx.fill();
	}
}


