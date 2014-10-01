// start of file

//	--------------------
//	Conversion Functions
//	--------------------
	function decToHex(d) { var dr = Number(d).toString(16); while(dr.length < 4) { dr = '0'+dr; } return '0x'+dr.toUpperCase(); }
	function padHexString (h) { h = (''+h).substr(2); while(h.length < 4) h = '0'+h; return '0x'+h.toUpperCase(); }
	function decToHTML(d) { return hexToHTML(decToHex(d)); }

	function charToHex(s) { 
		var result = '';
		for(var i=0; i<s.length; i++) result += decToHex(String(s).charCodeAt(i));
		return result;
	}

	function charToHexArray(s) {
		var result = [];
		for(var i=0; i<s.length; i++) result.push(decToHex(String(s).charCodeAt(i)));
		return result;
	}

	function hexToChar(u) {
		if(String(u).charAt(1) !== 'x') u = String(decToHex(u));
		// debug('\n hexToChar - START');
		// debug('\t passed ' + u + ' which is a ' + typeof u);
		u = u.split('0x');
		var result = '';
		for(var i=0; i<u.length; i++){ if(u[i] !== ''){
			u[i] = String.fromCharCode('0x'+u[i]);
			// debug('\t added ' + u[i]);
			if(u[i]) result += u[i];
		}}
		// debug(' hexToHTML - END\n');
		return result;
	}

	function hexToHTML(h) {
		// debug('\n hexToHTML - START');
		// debug('\t passed ' + h);
		h = String(h).split('0x');
		var result = '';
		for(var i=0; i<h.length; i++){ if(h[i] !== ''){
			h[i] = ('0x'+h[i]);
			h[i] = parseInt(h[i],16);
			if(h[i]) result += ('&#'+h[i]+';');
		}}
		return result;
	}

	function parseUnicodeInput(str) {
		// takes any kind or number of input
		// Unicode, Hex, or character
		// and returns an array of padded hex values

		debug('\n parseUnicodeInput - START');
		debug('\t passed ' + str);
		if(!str) return false;
		
		var entries = [];
		var results = [];

		var prefix = str.substr(0,2);
		if(isInputUnicode(str)) {
			str = str.replace(/u+/g, 'U+');
			entries = str.split('U+');
		} else if (isInputHex(str)) {
			str = str.replace(/0X/g, '0x');
			entries = str.split('0x');
		} else {
			return charToHexArray(str);
		}

		var te;
		for(var e=0; e<entries.length; e++){
			te = entries[e];
			if(te !== ''){
				while(te.length < 4) te = '0'+te;
				te = ('0x'+te.toUpperCase());
				debug('\t parsed ' + e + ' as ' + te);
				results.push(te);
			}
		}

		debug('\t returning ' + JSON.stringify(results));
		debug('parseUnicodeInput - END\n');
		return results;
	}

	function isInputUnicode(str) {
		str = str.replace(/u+/g, 'U+');
		var count = 0;
		var pos = str.indexOf('U+');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('U+', pos+2);
		}
		return count;
	}

	function isInputHex(str) {
		str = str.replace(/0X/g, '0x');
		var count = 0;
		var pos = str.indexOf('0x');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('0x', pos+2);
		}
		return count;
	}
//	--------------------
//	Range functions
//	--------------------
	function addCustomCharacterRange(){
		var newrange = {'begin':0, 'end':0};
		newrange.begin = parseUnicodeInput(document.getElementById('customrangebegin').value)[0];
		newrange.end = parseUnicodeInput(document.getElementById('customrangeend').value)[0];
		document.getElementById('customrangebegin').value = '';
		document.getElementById('customrangeend').value = '';

		if(isNaN(newrange.begin) || isNaN(newrange.end)){
			document.getElementById('customrangeerror').style.display = 'block';
			setTimeout(function(){document.getElementById('customrangeerror').style.display = 'none';}, 2500);
		} else {

			// flip
			if(newrange.begin > newrange.end){
				var tempbegin = newrange.begin;
				newrange.begin = newrange.end;
				newrange.end = tempbegin;
			}

			// maxes
			newrange.begin = Math.max(newrange.begin, (_UI.charrange.latinextendedb.end+1));
			newrange.end = Math.max(newrange.end, (_UI.charrange.latinextendedb.end+2));
			newrange.begin = Math.min(newrange.begin, 0xFFFE);
			newrange.end = Math.min(newrange.end, 0xFFFF);

			// format
			newrange.begin = decToHex(newrange.begin);
			newrange.end = decToHex(newrange.end);

			// Update
			_GP.projectsettings.charrange.custom.unshift(newrange);
			updateCustomRangeTable();
		}
	}

	function updateCustomRangeTable(){
		var cr = _GP.projectsettings.charrange.custom;
		//debug('UPDATECUSTOMRANGETABLE - \n\t custom is ' + JSON.stringify(cr));
		var content = '';
		if(cr.length){
			content += 'Existing custom character ranges:<br><table style="margin-top:8px;">';
			for(var c=0; c<cr.length; c++){
				content += '<tr><td class="customrangeline">';
				content += cr[c].begin + '&nbsp;&nbsp;through&nbsp;&nbsp;' + cr[c].end + '&nbsp;&nbsp;';
				content += '</td><td>';
				content += '<button onclick="removeCustomCharacterRange('+c+');">remove</button>';
				content += '</td></tr>';
			}
			content += '</table><br>';
			content += 'Note, removing a custom range will not delete character data from your Glyphr Project.  ';
			content += 'Custom ranges only determine what is shown in the UI, and what is exported to fonts.';
		}
		document.getElementById('customrangetable').innerHTML = content;
	}

	function removeCustomCharacterRange(i){
		var cr = _GP.projectsettings.charrange.custom;
		//debug('REMOVECUSTOMCHARACTERRANGE - called on index ' + i + '\n\t custom is ' + JSON.stringify(cr));
		cr.splice(i,1);
		updateCustomRangeTable();
		//debug('REMOVECUSTOMCHARACTERRANGE - \n\t custom is ' + JSON.stringify(cr));
	}


//	-----------------
//	Char Name Wrapper
//	-----------------

	function getUnicodeName(ch) {
		ch = ''+ch;
		var re = _UI.unicodenames[ch];

		var chn = ch*1;
		if(chn > 0x4E00 && chn < 0xA000){
			return 'CJK Unified Ideograph ' + ch.substr(2);
		}

		return re || false;
	}

//	-----------------
//	Global Vars
//	-----------------

	_UI.basiclatinorder = ['0x0041','0x0042','0x0043','0x0044','0x0045','0x0046','0x0047','0x0048','0x0049','0x004A','0x004B','0x004C','0x004D','0x004E','0x004F','0x0050','0x0051','0x0052','0x0053','0x0054','0x0055','0x0056','0x0057','0x0058','0x0059','0x005A','0x0061','0x0062','0x0063','0x0064','0x0065','0x0066','0x0067','0x0068','0x0069','0x006A','0x006B','0x006C','0x006D','0x006E','0x006F','0x0070','0x0071','0x0072','0x0073','0x0074','0x0075','0x0076','0x0077','0x0078','0x0079','0x007A','0x0030','0x0031','0x0032','0x0033','0x0034','0x0035','0x0036','0x0037','0x0038','0x0039','0x0021','0x0022','0x0023','0x0024','0x0025','0x0026','0x0027','0x0028','0x0029','0x002A','0x002B','0x002C','0x002D','0x002E','0x002F','0x003A','0x003B','0x003C','0x003D','0x003E','0x003F','0x0040','0x005B','0x005C','0x005D','0x005E','0x005F','0x0060','0x007B','0x007C','0x007D','0x007E','0x0020'];
	_UI.charrange = {
		'basiclatin': {'begin':0x0020, 'end':0x007E},
		'latinsuppliment': {'begin':0x0080, 'end': 0x00FF},
		'latinextendeda': {'begin':0x0100, 'end':0x017F},
		'latinextendedb': {'begin':0x0180, 'end':0x024F}
	};
// end of file