
//-------------------
// History Panel
//-------------------
	function makePanel_History(){

		var content = "<h1 class='paneltitle'>character edit history</h1>";
		var q = _UI.charundoq;

		if(_UI.navhere === 'linked shapes'){
			content = "<h1 class='paneltitle'>linked shapes history</h1>";
			q = _UI.linkedshapeundoq;
		}

		debug("MAKEPANEL_HISTORY - rolling out queue\n" + json(q));

		content += "<button class='"+(q.length>0? "": "buttondis")+"' onclick='pullundoq()'>undo" + ((q.length > 0) ? (" " + q.length) : "") + "</button><br>";
		content += "<table class='detail'>";

		var te, currchar;
		for(var e=q.length-1; e>=0; e--){
			te = q[e];

			if(te.char !== currchar){
				content += "<tr><td colspan=3 ><div class='history_char'>"+getCharName(te.char)+"</div></td></tr>";
				currchar = te.char;
			}

			content += "<tr>"+
				"<td class='leftcol'>&nbsp;</td>"+
				"<td class='history_action'>"+te.name+"</td>"+
				"<td class='history_date'>"+new Date(te.date).toLocaleString()+"</td>"+
				"</tr>";
		}

		content += "</table>";
		return content;
	}



