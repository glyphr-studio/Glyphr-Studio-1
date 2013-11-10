	
//	===================================
//	SAVE TO IMAGE FILE
//	===================================

/*
	Canvas2Image v0.1
	Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk
	MIT License [http://www.opensource.org/licenses/mit-license.php]

Canvas2Image.saveAsXXXX = function(oCanvasElement, bReturnImgElement, iWidth, iHeight) { ... }

var oCanvas = document.getElementById("thecanvas");

Canvas2Image.saveAsPNG(oCanvas);  // will prompt the user to save the image as PNG.

Canvas2Image.saveAsJPEG(oCanvas); // will prompt the user to save the image as JPEG. 
                                  // Only supported by Firefox.

Canvas2Image.saveAsBMP(oCanvas);  // will prompt the user to save the image as BMP.

// returns an <img> element containing the converted PNG image
var oImgPNG = Canvas2Image.saveAsPNG(oCanvas, true);   

// returns an <img> element containing the converted JPEG image (Only supported by Firefox)
var oImgJPEG = Canvas2Image.saveAsJPEG(oCanvas, true); 
                                                       
// returns an <img> element containing the converted BMP image
var oImgBMP = Canvas2Image.saveAsBMP(oCanvas, true); 


// all the functions also takes width and height arguments. 
// These can be used to scale the resulting image:

// saves a PNG image scaled to 100x100
Canvas2Image.saveAsPNG(oCanvas, false, 100, 100);

*/

var Canvas2Image;

function setupC2I(){
Canvas2Image = (
	function() {
		// check if we have canvas support
		var bHasCanvas = false;
		var oCanvas = document.createElement("canvas");
		if (oCanvas.getContext("2d")) {
			bHasCanvas = true;
		}

		// no canvas, bail out.
		if (!bHasCanvas) {
			return {
				saveAsBMP : function(){},
				saveAsPNG : function(){},
				saveAsJPEG : function(){}
			}
		}

		var bHasImageData = !!(oCanvas.getContext("2d").getImageData);
		var bHasDataURL = !!(oCanvas.toDataURL);
		var bHasBase64 = !!(window.btoa);

		var strDownloadMime = "image/octet-stream";

		// ok, we're good
		var readCanvasData = function(oCanvas) {
			var iWidth = parseInt(oCanvas.width);
			var iHeight = parseInt(oCanvas.height);
			return oCanvas.getContext("2d").getImageData(0,0,iWidth,iHeight);
		}

		// base64 encodes either a string or an array of charcodes
		var encodeData = function(data) {
			var strData = "";
			if (typeof data == "string") {
				strData = data;
			} else {
				var aData = data;
				for (var i=0;i<aData.length;i++) {
					strData += String.fromCharCode(aData[i]);
				}
			}
			return btoa(strData);
		}

		// creates a base64 encoded string containing BMP data
		// takes an imagedata object as argument
		var createBMP = function(oData) {
			var aHeader = [];
		
			var iWidth = oData.width;
			var iHeight = oData.height;

			aHeader.push(0x42); // magic 1
			aHeader.push(0x4D); 
		
			var iFileSize = iWidth*iHeight*3 + 54; // total header size = 54 bytes
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256);

			aHeader.push(0); // reserved
			aHeader.push(0);
			aHeader.push(0); // reserved
			aHeader.push(0);

			aHeader.push(54); // dataoffset
			aHeader.push(0);
			aHeader.push(0);
			aHeader.push(0);

			var aInfoHeader = [];
			aInfoHeader.push(40); // info header size
			aInfoHeader.push(0);
			aInfoHeader.push(0);
			aInfoHeader.push(0);

			var iImageWidth = iWidth;
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256);
		
			var iImageHeight = iHeight;
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256);
		
			aInfoHeader.push(1); // num of planes
			aInfoHeader.push(0);
		
			aInfoHeader.push(24); // num of bits per pixel
			aInfoHeader.push(0);
		
			aInfoHeader.push(0); // compression = none
			aInfoHeader.push(0);
			aInfoHeader.push(0);
			aInfoHeader.push(0);
		
			var iDataSize = iWidth*iHeight*3; 
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); 
		
			for (var i=0;i<16;i++) {
				aInfoHeader.push(0);	// these bytes not used
			}
		
			var iPadding = (4 - ((iWidth * 3) % 4)) % 4;

			var aImgData = oData.data;

			var strPixelData = "";
			var y = iHeight;
			do {
				var iOffsetY = iWidth*(y-1)*4;
				var strPixelRow = "";
				for (var x=0;x<iWidth;x++) {
					var iOffsetX = 4*x;

					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+2]);
					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+1]);
					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX]);
				}
				for (var c=0;c<iPadding;c++) {
					strPixelRow += String.fromCharCode(0);
				}
				strPixelData += strPixelRow;
			} while (--y);

			var strEncoded = encodeData(aHeader.concat(aInfoHeader)) + encodeData(strPixelData);

			return strEncoded;
		}


		// sends the generated file to the client
		var saveFile = function(strData) {
			document.location.href = strData;
		}

		var makeDataURI = function(strData, strMime) {
			return "data:" + strMime + ";base64," + strData;
		}

		// generates a <img> object containing the imagedata
		var makeImageObject = function(strSource) {
			var oImgElement = document.createElement("img");
			oImgElement.src = strSource;
			return oImgElement;
		}

		var scaleCanvas = function(oCanvas, iWidth, iHeight) {
			if (iWidth && iHeight) {
				var oSaveCanvas = document.createElement("canvas");
				oSaveCanvas.width = iWidth;
				oSaveCanvas.height = iHeight;
				oSaveCanvas.style.width = iWidth+"px";
				oSaveCanvas.style.height = iHeight+"px";

				var oSaveCtx = oSaveCanvas.getContext("2d");

				oSaveCtx.drawImage(oCanvas, 0, 0, oCanvas.width, oCanvas.height, 0, 0, iWidth, iHeight);
				return oSaveCanvas;
			}
			return oCanvas;
		}

		return {

			saveAsPNG : function(oCanvas, bReturnImg, iWidth, iHeight) {
				debug("SAVEASPNG: in function");
				if (!bHasDataURL) {
					debug("bhasdataurl false");
					return false;
				}
				//TRYING NOT TO SCALE
				//var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);
				//var strData = oScaledCanvas.toDataURL("image/png");
				var strData = oCanvas.toDataURL("image/png");
				debug("SAVEASPNG: data = " + strData);
				if (bReturnImg) {
					debug("SAVEASPNG: returning image object string (below)");
					return makeImageObject(strData);
				} else {
					debug("SAVEASPNG: saving file via SAVEFILE");
					saveFile(strData.replace("image/png", strDownloadMime));
				}
				return true;
			},

			saveAsJPEG : function(oCanvas, bReturnImg, iWidth, iHeight) {
				if (!bHasDataURL) {
					return false;
				}

				var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);
				var strMime = "image/jpeg";
				var strData = oScaledCanvas.toDataURL(strMime);
		
				// check if browser actually supports jpeg by looking for the mime type in the data uri.
				// if not, return false
				if (strData.indexOf(strMime) != 5) {
					return false;
				}

				if (bReturnImg) {
					return makeImageObject(strData);
				} else {
					saveFile(strData.replace(strMime, strDownloadMime));
				}
				return true;
			},

			saveAsBMP : function(oCanvas, bReturnImg, iWidth, iHeight) {
				if (!(bHasImageData && bHasBase64)) {
					return false;
				}

				var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);

				var oData = readCanvasData(oScaledCanvas);
				var strImgData = createBMP(oData);
				if (bReturnImg) {
					return makeImageObject(makeDataURI(strImgData, "image/bmp"));
				} else {
					saveFile(makeDataURI(strImgData, strDownloadMime));
				}
				return true;
			}
		};

	})();
}

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */

(function() {

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	c1 = str.charCodeAt(i++) & 0xff;
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	    out += "==";
	    break;
	}
	c2 = str.charCodeAt(i++);
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	    out += "=";
	    break;
	}
	c3 = str.charCodeAt(i++);
	out += base64EncodeChars.charAt(c1 >> 2);
	out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

if (!window.btoa) window.btoa = base64encode;
if (!window.atob) window.atob = base64decode;

})();