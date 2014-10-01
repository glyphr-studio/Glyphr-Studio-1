// start of file

//-------------------
// History Panel
//-------------------
	function makePanel_History(){

		var content = "<div class='navarea_header'>";

		content += makePanelSuperTitle();

		content += "<h1 class='paneltitle'>edit history</h1>";

		var q = _UI.history[_UI.navhere];

		content += "</div><div class='navarea_section'>";

		//debug("MAKEPANEL_HISTORY - rolling out queue\n" + json(q));

		content += "<button style='width:100px;' class='"+(q.length>0? "buttonsel": "buttondis")+"' onclick='history_pull();clickTool(\"pathedit\");'>undo" + ((q.length > 0) ? (" (" + q.length + ")") : "") + "</button><br>";
		content += "<table class='detail'>";

		var te, currchar;
		for(var e=q.length-1; e>=0; e--){
			te = q[e];

			if(te.charname !== currchar){
				content += "<tr><td colspan=3 ><div class='history_char'>"+getCharName(te.charname)+"</div></td></tr>";
				currchar = te.charname;
			}

			content += "<tr>"+
				"<td class='leftcol'>&nbsp;</td>"+
				"<td class='history_action'>"+te.description+"</td>"+
				"<td class='history_date'>"+new Date(te.date).toLocaleString()+"</td>"+
				"</tr>";
		}

		content += "</table>";
		content += "</div>";

		return content;
	}

// end of file