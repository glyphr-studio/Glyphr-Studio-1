// start of file

//-------------------
// History Panel
//-------------------
	function makePanel_Guides(){

		var content = "";

		if(!_UI.popout) {
			content += "<h1 class='panelsupertitle'>"+_UI.navhere.toUpperCase();
			content += "<span class='supertitleseperator'>&#x276F;&#x276F;</span>";
			content += getSelectedChar().charhtml;
			content += "</h1>";
		}

		content += "<h1 class='paneltitle'>guides</h1>";

		return content;
	}

// end of file