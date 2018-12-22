// start of file
/**
	Framework > Unicode
	Anything having to do with / working with
	Unicode values.  Also working with Unicode
	ranges, like basic latin.
**/


//	--------------------
//	Conversion Functions
//	--------------------
	function decToHex(d) { var dr = Number(d).toString(16); while(dr.length < 4) { dr = '0'+dr; } return '0x'+dr.toUpperCase(); }

	function decToHTML(d) { return hexToHTML(decToHex(d)); }

	function charToHex(s) {
		var result = '';
		for(var i=0; i<s.length; i++) result += decToHex(String(s).charCodeAt(i));
		return result;
	}

	function charsToHexArray(s) {
		var result = [];
		for(var i=0; i<s.length; i++) result.push(decToHex(String(s).charCodeAt(i)));
		return result;
	}

	function hexToChars(u) {
		if(String(u).charAt(1) !== 'x') u = String(decToHex(u));
		// debug('\n hexToChars - START');
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
		if(!h || h.indexOf('0x') < 0) return false;

		h = String(h).split('0x');
		var result = '';
		for(var i=0; i<h.length; i++){ if(h[i] !== ''){
			h[i] = ('0x'+h[i]);
			h[i] = parseInt(h[i],16);
			if(h[i]) result += ('&#'+h[i]+';');
		}}
		return result;
	}

	function hexToUnicodeHex(h){
		return (h.replace(/0x/, '&#x') + ';');
	}

	function parseUnicodeInput(str) {
		// takes any kind or number of input
		// Unicode, Hex, or glyph
		// and returns an array of padded hex values

		// debug('\n parseUnicodeInput - START');
		// debug('\t passed ' + str);

        if(!str) return false;

		var entries = [];
		var results = [];

		if(isInputUnicode(str)) {
            // debug(`\t U+ format detected`);            
			str = str.replace(/u\+/g, 'U+');
            entries = str.split('U+');

		} else if (isInputHex(str)) {
            // debug(`\t 0x format detected`);            
			str = str.replace(/0X/g, '0x');
            entries = str.split('0x');

		} else {
            // debug(`\t Number detected`);
			return charsToHexArray(str);
		}

		var te;
		for(var e=0; e<entries.length; e++){
			te = entries[e];
            te = te.replace(/;/g, '');
            
            if(!validateHex(te, true)) return false;

			if(te !== ''){
				while(te.length < 4) te = '0'+te;
				te = ('0x'+te.toUpperCase());
				// debug('\t parsed ' + e + ' as ' + te);
				results.push(te);
			}
		}

		// debug('\t returning ' + JSON.stringify(results));
		// debug('parseUnicodeInput - END\n');
		return results;
	}

	function isInputUnicode(str) {
        str = str.replace(/u\+/g, 'U+');
        if(str.length <= 3) return 0;

        var count = 0;
		var pos = str.indexOf('U+');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('U+', pos+3);
		}
		return count;
	}

	function isInputHex(str) {
        str = str.replace(/0X/g, '0x');
        if(str.length <= 3) return 0;

        var count = 0;
		var pos = str.indexOf('0x');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('0x', pos+3);
		}
		return count;
	}
	
	function validateHex(str, dontcheckprefix) {
		var green = '0123456789ABCDEF';
		str = str.toString();
		str = str.toUpperCase();
        
        if(!dontcheckprefix) {
            if(str.startsWith('U+') || str.startsWith('0X')) {
                str = str.substring(2);
            }
        }

		if(str.length > 4) return false;

		for(var c=0; c<str.length; c++){
			if(green.indexOf(str.charAt(c)) === -1) return false;
		}

		return true;
	}

	function unicodeInputHelp() {
        var re = '<h1>Using Unicode Values</h1>'+
            'Unicode is a format used by fonts that assigns an ID number to every glyph. Glyphr Studio uses<br>'+
            'this format for importing fonts, and for identifying glyphs, kern pairs, and ligatures.<br><br>'+
			'Glyphr Studio accepts three flavors of this ID number:<br>'+
			'<ul>'+
				'<li><b>Hexadecimal Number</b> - a base-16 number with a 0x prefix. <br>For example, <pre>0x4E</pre> corresponds to Capital N.</li>'+
				'<li><b>Unicode Number</b> - a base-16 number with a U+ prefix. <br>For example, <pre>U+4E</pre> corresponds to Capital N.</li>'+
				'<li><b>Character</b> - the ID of any character that you type or copy-paste will be recognized.</li>'+
            '</ul>'+
            '<br>'+
            'When you input any of these formats, Glyphr Studio will validate the input, and convert it to<br>'+
            'a four digit hex format (like <pre>0x004E</pre>).<br><br>'+
            'Note: Glyphr Studio is limited to the Basic Multilingual Plane, Unicode <pre>U+0000</pre> through <pre>U+FFFF</pre>.<br>'+
            'Unicode range notation is not supported.'+
			'';
		return re;
	}


//	-----------------
//	Glyph Name Wrapper
//	-----------------

	function getUnicodeName(ch) {
		// debug('\n getUnicodeName - START');
		// debug('\t passed ' + ch);
		ch = ''+ch;
		var re;
		
		if(_UI && _UI.unicodeNames && _UI.unicodeNames[ch]){
		 	return _UI.unicodeNames[ch];
		} else {
            return getUnicodeBlockName(ch);
        }

		// debug(' getUnicodeName - END - returning ' + re + '\n');
		return re;
	}

    function getUnicodeBlockName(ch) {
        var chn = ch*1;
        var block;

        for(var i=0; i<_UI.unicodeBlocks.length; i++){
            block = _UI.unicodeBlocks[i];
            if(chn >= block.begin && chn <= block.end){
                return block.name + ' - ' + ch.substr(2);
            }
        }

        return '[name not found]';
    }

	function getUnicodeShortName(ch) {
		// debug('\n getUnicodeShortName - START');
		// debug('\t passed ' + ch);
		ch = ''+ch;
		var name = _UI.unicodeShortNames[ch];
		if(!name) {
			name = getUnicodeName(ch);
			if(name && name !== '[name not found]') name = name.replace(/latin /gi, '').replace(/ /g, '').substr(0,20);
			else name = '[name not found]';
		}

		// debug(' getUnicodeShortName - returning ' + name + ' - END\n');
		return name;
	}

// end of file