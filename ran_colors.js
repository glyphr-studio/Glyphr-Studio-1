	/*
		OS Blue:					#00aaff
		primary nav background:		
		primary nav dark icon:		rgb(153,153,153)
		
		rgb(250,250,250)	#FAFAFA		Off White
		rgb(229,229,229)	#E5E5E5		90% gray
		rgb(204,204,204)	#CCCCCC		80% gray
		rgb(178,178,178)	#B2B2B2		70% gray
		rgb(153,153,153)	#999999		60% gray
		rgb(127,127,127)	#7F7F7F		50% gray
		rgb(102,102,102)	#666666		40% gray
		rgb(76,76,76)		#4C4C4C		30% gray
		rgb(51,51,51)		#333333		20% gray
		rgb(25,25,25)		#191919		10% gray

	*/

// GLOBAL COLORS

var color_accent = "#00aaff";	//os accent base color  
var color_accent_light = shiftColor(color_accent, .5, true);

var color_glyphfill = "#000000";		//shape base color
var color_grid = "rgb(240,240,240)";	//grid base color
var color_guideline = "#CC4F22";		//guide base color

var color_darktext = "#191919";		//os text color
var color_lighttext = "#CCCCCC";	//os light text
var color_bg = "#4C4C4C";			//os background color

var color_canvasbutton_disabled = "rgb(102,102,102)";
var color_canvasbutton_unselected = color_lighttext;
var color_canvasbutton_selected = color_accent;

function shiftColor(c, percent, lighter){
	percent = Math.max(0,Math.min(percent,1));
	var val = new Object();
	
	if(c.charAt(0)=="#"){
		c = c.substring(1,7);
		val.r = parseInt(c.substring(0,2),16);
		val.g = parseInt(c.substring(2,4),16);
		val.b = parseInt(c.substring(4,6),16);
	} else if (c.substring(0,4) == "rgb("){
		c = c.split("(")[1].split(")")[0].split(",");
		val.r = c[0];
		val.g = c[1];
		val.b = c[2];
	} else {
		val.r = 0;
		val.g = 0;
		val.b = 0;
	}
	
	val.r = Math.max(0,Math.min(val.r,255));
	val.g = Math.max(0,Math.min(val.g,255));
	val.b = Math.max(0,Math.min(val.b,255));
	
	if(lighter){
		val.r = Math.round(((255-(val.r*1))*percent)+(val.r*1));
		val.g = Math.round(((255-(val.g*1))*percent)+(val.g*1));
		val.b = Math.round(((255-(val.b*1))*percent)+(val.b*1));
	} else {
		val.r = Math.round((val.r*1)-(val.r*percent));
		val.g = Math.round((val.g*1)-(val.g*percent));
		val.b = Math.round((val.b*1)-(val.b*percent));
	}

	return "rgb("+val.r+","+val.g+","+val.b+")";
}


/*
rgbtohex(n){
	n = parseInt(n,10);
	if (isNaN(n)) return "00";
	n = Math.max(0,Math.min(n,255));
	return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}
*/




// Helper Function
var hasThrownCSSError = false;

function changecss(theClass,element,value) {
	var cssr = document.styleSheets[0].cssRules;
	if(cssr){
		for (var R = 0; R < cssr.length; R++) {
			if (cssr[R].selectorText == theClass) {
				if(cssr[R].style[element]){
					cssr[R].style[element] = value;
				} else {
					try{
						document.styleSheets[0].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[0][cssRules].length);
					} catch(err){
						try{
							document.styleSheets[0].addRule(theClass,element+': '+value+';');
						} catch(err){}
					}
				}
			}
		}
	} else {
		if(!hasThrownCSSError){
			//alert("ERROR\nDynamic CSS Stylesheet rules could not be detected.\nStuff is going to look strange.");
			hasThrownCSSError = true;
		}
	}
}