
//-------------------------------------------------------
// CHAR OBJECT
//-------------------------------------------------------
	function Char(oa){
		this.objtype = 'char';

		this.isautowide = isVal(oa.isautowide)? oa.isautowide:true;
		this.leftsidebearing = isVal(oa.leftsidebearing)? oa.leftsidebearing:false;
		this.charwidth = isVal(oa.charwidth)? oa.charwidth:0;
		this.charname = oa.charname || "ERROR_CHARNAME";
		this.charvalue = oa.charvalue || "ERROR_CHARVALUE";
		this.cmapcode = oa.cmapcode || "ERROR_CMAPCODE";

		//this.hints = oa.hints || {};
		//this.counters = oa.counters || {};
		this.charshapes = oa.charshapes || [];
	}



//-------------------------------------------------------
// CHAR METHODS
//-------------------------------------------------------


	Char.prototype.drawCharToArea = function(lctx, size, offsetX, offsetY){
		var ps = _GP.projectsettings;
		var sl = this.charshapes;
		var width = 0;
		//debug("DRAWCHARTOAREA - starting " + this.charcode + " \t offsetx: " + offsetX + " \t offsety: " + offsetY + " \t size (zoom): " +size);
		
		if(isNaN(this.charcode)){
			//assumes one shape per ss
			sl = [_GP.linkedshapes[this.charcode].shape];
		} else {
			width = (this.charwidth*size);
			if(this.isautowide){ 
				//debug("---------------- for " + this.charname + " isautowide=false, adding left side bearing width " + (ps.defaultlsb*size) + " to width " + width);
				width += (ps.defaultlsb*size); 
			}
		}

		var tempv = clone(_UI.viewport);
		_UI.viewport.originx = offsetX;
		_UI.viewport.originy = offsetY;
		_UI.viewport.zoom = size;	
		
		var sh = {};
		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			sh = sl[j];
			//debug("---------------- starting shape " + sh.name);
			sh.path.drawPath(lctx);
		}
		lctx.fillStyle = _GP.projectsettings.color_glyphfill;
		lctx.closePath();
		lctx.fill("nonzero");

		_UI.viewport = tempv;
		//debug("---------------- done with " + this.charcode + "\n");
		
		return width;
	}



//-------------------------------------------------------
// CHAR FUNCTIONS
//-------------------------------------------------------
	function createNewFontObject(){
		var font = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
		new Char({"charname":"SPACE", "charvalue":"(space)", "cmapcode":"0x20"}), 
		new Char({"charname":"EXCLAMATION MARK", "charvalue":"!", "cmapcode":"0x21"}), 
		new Char({"charname":"QUOTATION MARK", "charvalue":'"', "cmapcode":"0x22"}), 
		new Char({"charname":"NUMBER SIGN", "charvalue":"#", "cmapcode":"0x23"}), 
		new Char({"charname":"DOLLAR SIGN", "charvalue":"$", "cmapcode":"0x24"}), 
		new Char({"charname":"PERCENT SIGN", "charvalue":"%", "cmapcode":"0x25"}), 
		new Char({"charname":"AMPERSAND", "charvalue":"&", "cmapcode":"0x26"}), 
		new Char({"charname":"APOSTROPHE", "charvalue":"'", "cmapcode":"0x27"}), 
		new Char({"charname":"LEFT PARENTHESIS", "charvalue":"(", "cmapcode":"0x28"}), 
		new Char({"charname":"RIGHT PARENTHESIS", "charvalue":")", "cmapcode":"0x29"}), 
		new Char({"charname":"ASTERISK", "charvalue":"*", "cmapcode":"0x2a"}), 
		new Char({"charname":"PLUS SIGN", "charvalue":"+", "cmapcode":"0x2b"}), 
		new Char({"charname":"COMMA", "charvalue":",", "cmapcode":"0x2c"}), 
		new Char({"charname":"HYPHEN-MINUS", "charvalue":"-", "cmapcode":"0x2d"}), 
		new Char({"charname":"FULL STOP", "charvalue":".", "cmapcode":"0x2e"}), 
		new Char({"charname":"SOLIDUS", "charvalue":"/", "cmapcode":"0x2f"}), 
		new Char({"charname":"DIGIT ZERO", "charvalue":"0", "cmapcode":"0x30"}), 
		new Char({"charname":"DIGIT ONE", "charvalue":"1", "cmapcode":"0x31"}), 
		new Char({"charname":"DIGIT TWO", "charvalue":"2", "cmapcode":"0x32"}), 
		new Char({"charname":"DIGIT THREE", "charvalue":"3", "cmapcode":"0x33"}), 
		new Char({"charname":"DIGIT FOUR", "charvalue":"4", "cmapcode":"0x34"}), 
		new Char({"charname":"DIGIT FIVE", "charvalue":"5", "cmapcode":"0x35"}), 
		new Char({"charname":"DIGIT SIX", "charvalue":"6", "cmapcode":"0x36"}), 
		new Char({"charname":"DIGIT SEVEN", "charvalue":"7", "cmapcode":"0x37"}), 
		new Char({"charname":"DIGIT EIGHT", "charvalue":"8", "cmapcode":"0x38"}), 
		new Char({"charname":"DIGIT NINE", "charvalue":"9", "cmapcode":"0x39"}), 
		new Char({"charname":"COLON", "charvalue":":", "cmapcode":"0x3a"}), 
		new Char({"charname":"SEMICOLON", "charvalue":";", "cmapcode":"0x3b"}), 
		new Char({"charname":"LESS-THAN SIGN", "charvalue":"<", "cmapcode":"0x3c"}), 
		new Char({"charname":"EQUALS SIGN", "charvalue":"=", "cmapcode":"0x3d"}), 
		new Char({"charname":"GREATER-THAN SIGN", "charvalue":">", "cmapcode":"0x3e"}), 
		new Char({"charname":"QUESTION MARK", "charvalue":"?", "cmapcode":"0x3f"}), 
		new Char({"charname":"COMMERCIAL AT", "charvalue":"@", "cmapcode":"0x40"}), 
		new Char({"charname":"LATIN CAPITAL LETTER A", "charvalue":"A", "cmapcode":"0x41"}), 
		new Char({"charname":"LATIN CAPITAL LETTER B", "charvalue":"B", "cmapcode":"0x42"}), 
		new Char({"charname":"LATIN CAPITAL LETTER C", "charvalue":"C", "cmapcode":"0x43"}), 
		new Char({"charname":"LATIN CAPITAL LETTER D", "charvalue":"D", "cmapcode":"0x44"}), 
		new Char({"charname":"LATIN CAPITAL LETTER E", "charvalue":"E", "cmapcode":"0x45"}), 
		new Char({"charname":"LATIN CAPITAL LETTER F", "charvalue":"F", "cmapcode":"0x46"}), 
		new Char({"charname":"LATIN CAPITAL LETTER G", "charvalue":"G", "cmapcode":"0x47"}), 
		new Char({"charname":"LATIN CAPITAL LETTER H", "charvalue":"H", "cmapcode":"0x48"}), 
		new Char({"charname":"LATIN CAPITAL LETTER I", "charvalue":"I", "cmapcode":"0x49"}), 
		new Char({"charname":"LATIN CAPITAL LETTER J", "charvalue":"J", "cmapcode":"0x4a"}), 
		new Char({"charname":"LATIN CAPITAL LETTER K", "charvalue":"K", "cmapcode":"0x4b"}), 
		new Char({"charname":"LATIN CAPITAL LETTER L", "charvalue":"L", "cmapcode":"0x4c"}), 
		new Char({"charname":"LATIN CAPITAL LETTER M", "charvalue":"M", "cmapcode":"0x4d"}), 
		new Char({"charname":"LATIN CAPITAL LETTER N", "charvalue":"N", "cmapcode":"0x4e"}), 
		new Char({"charname":"LATIN CAPITAL LETTER O", "charvalue":"O", "cmapcode":"0x4f"}), 
		new Char({"charname":"LATIN CAPITAL LETTER P", "charvalue":"P", "cmapcode":"0x50"}), 
		new Char({"charname":"LATIN CAPITAL LETTER Q", "charvalue":"Q", "cmapcode":"0x51"}), 
		new Char({"charname":"LATIN CAPITAL LETTER R", "charvalue":"R", "cmapcode":"0x52"}), 
		new Char({"charname":"LATIN CAPITAL LETTER S", "charvalue":"S", "cmapcode":"0x53"}), 
		new Char({"charname":"LATIN CAPITAL LETTER T", "charvalue":"T", "cmapcode":"0x54"}), 
		new Char({"charname":"LATIN CAPITAL LETTER U", "charvalue":"U", "cmapcode":"0x55"}), 
		new Char({"charname":"LATIN CAPITAL LETTER V", "charvalue":"V", "cmapcode":"0x56"}), 
		new Char({"charname":"LATIN CAPITAL LETTER W", "charvalue":"W", "cmapcode":"0x57"}), 
		new Char({"charname":"LATIN CAPITAL LETTER X", "charvalue":"X", "cmapcode":"0x58"}), 
		new Char({"charname":"LATIN CAPITAL LETTER Y", "charvalue":"Y", "cmapcode":"0x59"}), 
		new Char({"charname":"LATIN CAPITAL LETTER Z", "charvalue":"Z", "cmapcode":"0x5a"}), 
		new Char({"charname":"LEFT SQUARE BRACKET", "charvalue":"[", "cmapcode":"0x5b"}), 
		new Char({"charname":"REVERSE SOLIDUS", "charvalue":"\\", "cmapcode":"0x5c"}), 
		new Char({"charname":"RIGHT SQUARE BRACKET", "charvalue":"]", "cmapcode":"0x5d"}), 
		new Char({"charname":"CIRCUMFLEX ACCENT", "charvalue":"^", "cmapcode":"0x5e"}), 
		new Char({"charname":"LOW LINE", "charvalue":"_", "cmapcode":"0x5f"}), 
		new Char({"charname":"GRAVE ACCENT", "charvalue":"`", "cmapcode":"0x60"}), 
		new Char({"charname":"LATIN SMALL LETTER A", "charvalue":"a", "cmapcode":"0x61"}), 
		new Char({"charname":"LATIN SMALL LETTER B", "charvalue":"b", "cmapcode":"0x62"}), 
		new Char({"charname":"LATIN SMALL LETTER C", "charvalue":"c", "cmapcode":"0x63"}), 
		new Char({"charname":"LATIN SMALL LETTER D", "charvalue":"d", "cmapcode":"0x64"}), 
		new Char({"charname":"LATIN SMALL LETTER E", "charvalue":"e", "cmapcode":"0x65"}), 
		new Char({"charname":"LATIN SMALL LETTER F", "charvalue":"f", "cmapcode":"0x66"}), 
		new Char({"charname":"LATIN SMALL LETTER G", "charvalue":"g", "cmapcode":"0x67"}), 
		new Char({"charname":"LATIN SMALL LETTER H", "charvalue":"h", "cmapcode":"0x68"}), 
		new Char({"charname":"LATIN SMALL LETTER I", "charvalue":"i", "cmapcode":"0x69"}), 
		new Char({"charname":"LATIN SMALL LETTER J", "charvalue":"j", "cmapcode":"0x6a"}), 
		new Char({"charname":"LATIN SMALL LETTER K", "charvalue":"k", "cmapcode":"0x6b"}), 
		new Char({"charname":"LATIN SMALL LETTER L", "charvalue":"l", "cmapcode":"0x6c"}), 
		new Char({"charname":"LATIN SMALL LETTER M", "charvalue":"m", "cmapcode":"0x6d"}), 
		new Char({"charname":"LATIN SMALL LETTER N", "charvalue":"n", "cmapcode":"0x6e"}), 
		new Char({"charname":"LATIN SMALL LETTER O", "charvalue":"o", "cmapcode":"0x6f"}), 
		new Char({"charname":"LATIN SMALL LETTER P", "charvalue":"p", "cmapcode":"0x70"}), 
		new Char({"charname":"LATIN SMALL LETTER Q", "charvalue":"q", "cmapcode":"0x71"}), 
		new Char({"charname":"LATIN SMALL LETTER R", "charvalue":"r", "cmapcode":"0x72"}), 
		new Char({"charname":"LATIN SMALL LETTER S", "charvalue":"s", "cmapcode":"0x73"}), 
		new Char({"charname":"LATIN SMALL LETTER T", "charvalue":"t", "cmapcode":"0x74"}), 
		new Char({"charname":"LATIN SMALL LETTER U", "charvalue":"u", "cmapcode":"0x75"}), 
		new Char({"charname":"LATIN SMALL LETTER V", "charvalue":"v", "cmapcode":"0x76"}), 
		new Char({"charname":"LATIN SMALL LETTER W", "charvalue":"w", "cmapcode":"0x77"}), 
		new Char({"charname":"LATIN SMALL LETTER X", "charvalue":"x", "cmapcode":"0x78"}), 
		new Char({"charname":"LATIN SMALL LETTER Y", "charvalue":"y", "cmapcode":"0x79"}), 
		new Char({"charname":"LATIN SMALL LETTER Z", "charvalue":"z", "cmapcode":"0x7a"}), 
		new Char({"charname":"LEFT CURLY BRACKET", "charvalue":"{", "cmapcode":"0x7b"}), 
		new Char({"charname":"VERTICAL LINE", "charvalue":"|", "cmapcode":"0x7c"}), 
		new Char({"charname":"RIGHT CURLY BRACKET", "charvalue":"}", "cmapcode":"0x7d"}), 
		new Char({"charname":"TILDE", "charvalue":"~", "cmapcode":"0x7e"})
	];	

	return font;

}

//	-----------------
//	Conversions
//	-----------------

var charToUnicode = {
	" ":32,"!":33,'"':34,"#":35,"$":36,"%":37,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,",: 44,"-":45,".":46,"/":47,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,":":58,",: 59,"<":60,"=":61,">":62,"?":63,"@":64,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"[":91,"\\":92,"]":93,"^":94,"_":95,"`":96,"a":97,"b":98,"c":99,"d":100,"e":101,"f":102,"g":103,"h":104,"i":105,"j":106,"k":107,"l":108,"m":109,"n":110,"o":111,"p":112,"q":113,"r":114,"s":115,"t":116,"u":117,"v":118,"w":119,"x":120,"y":121,"z":122,"{":123,"|":124,"}":125,"~":126
};
