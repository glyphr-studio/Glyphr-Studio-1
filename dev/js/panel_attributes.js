// start of file

//-------------------
// Panel Attributes
//-------------------
	function makePanel_CharAttributes(){
		//debug("UPDATECHAREDITDETAILS");

		var s = ss("update details");

		var ispointsel = false;
		if(s && !s.link) ispointsel = s.path.sp(false);
		if(_UI.selectedtool !== 'pathedit') ispointsel = false;

		var content = "<div class='navarea_header'>";

		content += makePanelSuperTitle();

		content += "<h1 class='paneltitle'>attributes</h1>";

		content += "</div><div class='navarea_section'>";

		content += "<table class='detail'>";

		//debug("UPDATEDETAILS - _UI.selectedshape: " + _UI.selectedshape + " - s.name: " + s.name + " - navhere: " + _UI.navhere);
		if (_UI.navhere === "character edit" || _UI.navhere === 'ligatures'){
			//debug("UPDATEDETAILS - detected navhere = character edit");
			if(s && s.link){
				// linked shape selected
				//debug("UPDATEDETAILS: linked shape selected");
				content += linkedShapeInstanceDetails(s);
			} else if (s){
				// regular shape selected
				//debug("UPDATEDETAILS: regular shape selected");
				content += shapeDetails(s);
				if(ispointsel){ content += pointDetails(s); }
			} else {
				// no shape selected
				//debug("UPDATEDETAILS: no shape selected");
				content += charDetails();
			}

			content += "</table><br>";

		} else if (_UI.navhere === "linked shapes"){
			//debug("UPDATEDETAILS - detected navhere = linked shapes");
			if (s){
				content += shapeDetails(s);
				if(ispointsel){
					content += pointDetails(s);
				}
			}
			content += linkedShapeCharDetails();
			content += "</table><br>";
		}

		content += "</div>";

		return content;
	}


	function charDetails(s){

		var sc = getSelectedChar();
		sc.calcCharMaxes();
		var content = "";
		var numshapes = getSelectedCharShapes().length;

		content += "<tr><td colspan=3><h3> bulk-transform character shapes </h3></td></tr>";

		if(numshapes > 1){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> x position </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharPosition(this.value, false, true); putundoq(\"Character X Position : \"+this.value); redraw(\"Character Details - X Position\");}'"+
				" value='" + round(sc.maxes.xmin, 3) + "' >" + spinner() + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> y position </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharPosition(false, this.value, true); putundoq(\"Character Y Position : \"+this.value); redraw(\"Character Details - Y Position\");}'"+
				" value='" + round(sc.maxes.ymax, 3) + "' >" + spinner() + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> width </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharSize(this.value,false,"+sc.ratiolock+"); putundoq(\"Character Width : \"+this.value); redraw(\"Character Details - Width\");}'"+
				" value='" + round(sc.maxes.xmax-sc.maxes.xmin, 3) + "' >" + spinner() + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> height </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				"onchange='if(!_UI.redrawing){getSelectedChar().setCharSize(false,this.value,"+sc.ratiolock+"); putundoq(\"Character Height : \"+this.value); redraw(\"Character Details - Height\");}'"+
				" value='" + round(sc.maxes.ymax-sc.maxes.ymin, 3) + "' >" + spinner() + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> lock aspect ratio </td>"+
				"<td class='rightcol'>"+checkUI("getSelectedChar().ratiolock")+"</td></tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td><td colspan=2>"+
				"<table class='actionsgrid'><tr><td>"+
				"<button onclick='getSelectedChar().flipNS(); putundoq(\"Flip Character : Horizontal\"); redraw(\"Character Details - FlipNS\");'>Flip Vertical</button>"+
				"<button onclick='getSelectedChar().flipEW(); putundoq(\"Flip Character : Vertical\"); redraw(\"Character Details - FlipEW\");'>Flip Horizontal</button>"+
				"</td></tr></table>"+
				"</td></tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
			"<td colspan=2><i>This character needs to have at least two shapes in order to bulk-transform.</i></td>"+
			"</tr>";
		}


		// AUTO CHAR WIDTH
		content += "<tr><td colspan=3><h3> character width </h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> automatically calculate </td>"+
				"<td class='rightcol'>"+checkUI("getSelectedChar().isautowide",true)+"</td>"+
				"</tr>";

		if(!sc.isautowide){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> character width <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				round(sc.charwidth, 3) + "' onchange='getSelectedChar().charwidth = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
				"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> character width <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input type='text' disabled='disabled' value='"+
				round(sc.charwidth, 3) + "'/></td>"+
				"</tr>";
		}


		// LEFT SIDE BEARING
		content += "<tr><td colspan=3><h3> left side bearing </h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> use default </td>"+
				"<td class='rightcol'>"+checkUI("getSelectedChar().leftsidebearing", true, true)+"</td>"+
				"</tr>";

		if(sc.leftsidebearing){
			if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				sc.leftsidebearing + "' onchange='getSelectedChar().leftsidebearing = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
				"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td>left side bearing <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input type='text' disabled='disabled' value='"+
				round(_GP.projectsettings.defaultlsb, 3) + "'/></td>"+
				"</tr>";
		}


		// RIGHT SIDE BEARING
		content += "<tr><td colspan=3><h3> right side bearing </h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> use default </td>"+
				"<td class='rightcol'>"+checkUI("getSelectedChar().rightsidebearing", true, true)+"</td>"+
				"</tr>";

		if(sc.rightsidebearing){
			if(sc.rightsidebearing === true) sc.rightsidebearing = _GP.projectsettings.defaultrsb;
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td>right side bearing <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				sc.rightsidebearing + "' onchange='getSelectedChar().rightsidebearing = (this.value*1); redraw(\"charDetails\");'>"+spinner()+"</td>"+
				"</tr>";
		} else {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td>right side bearing <span class='unit'>(em units)</span> </td>"+
				"<td class='rightcol'><input type='text' disabled='disabled' value='"+
				round(_GP.projectsettings.defaultrsb, 3) + "'/></td>"+
				"</tr>";
		}


		return content;

	}

	function shapeDetails(s){

		//debug("SHAPEDETAILS - Drawing Shape Details");
		var content = "";
		content += "<tr><td colspan=2><h3 style='margin:0px;'>shape</h3></td><td style='width:200px'>&nbsp;</td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> name </td>"+
				"<td class='rightcol'>"+
				"<input class='input' style='width:90%;' type='text' value='" + s.name + "' onchange='ss().changeShapeName(this.value);'></td>"+
				"</tr>";

		if(!_UI.eventhandlers.tempnewbasicshape){
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock")+"</td>"+
				"<td> shape x </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				(s.xlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathPosition(this.value, false); putundoq(\"Shape X Position : \"+this.value); redraw(\"shapeDetails - X Position\");}'")+
				" value='" + round(s.path.maxes.xmin, 3) + "' >" + (s.xlock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock")+"</td>"+
				"<td> shape y </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				(s.ylock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathPosition(false, this.value); putundoq(\"Shape Y Position : \"+this.value); redraw(\"shapeDetails - Y Position\");}'")+
				" value='" + round(s.path.maxes.ymax, 3) + "' >" + (s.ylock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",true)+"</td>"+
				"<td> width </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				(s.wlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathSize(this.value,false,ss().ratiolock); putundoq(\"Shape Width : \"+this.value); redraw(\"shapeDetails - Width\");}'")+
				" value='" + round(s.path.maxes.xmax-s.path.maxes.xmin, 3) + "' >" + (s.wlock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",true)+"</td>"+
				"<td> height </td>"+
				"<td class='rightcol'><input class='input' type='text' "+
				(s.hlock? "disabled='disabled'" : "onchange='if(!_UI.redrawing){ss().path.setPathSize(false,this.value,ss().ratiolock); putundoq(\"Shape Height : \"+this.value); redraw(\"shapeDetails - Height\");}'")+
				" value='" + round(s.path.maxes.ymax-s.path.maxes.ymin, 3) + "' >" + (s.hlock? "" : spinner()) + "</td>"+
				"</tr>";

		} else {
			content += "<tr><td class='leftcol'>"+lockUI("ss().xlock")+"</td>"+
				"<td> x </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				round(_UI.eventhandlers.tempnewbasicshape.xmin, 3) + "'>&nbsp;</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().ylock")+"</td>"+
				"<td> y </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				round(_UI.eventhandlers.tempnewbasicshape.ymax, 3) + "'>&nbsp;</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().wlock",true)+"</td>"+
				"<td> width </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				Math.abs(round(_UI.eventhandlers.tempnewbasicshape.xmax-_UI.eventhandlers.tempnewbasicshape.xmin, 3)) + "'>&nbsp;</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+lockUI("ss().hlock",true)+"</td>"+
				"<td> height </td>"+
				"<td class='rightcol'><input class='input' type='text' value='"+
				Math.abs(round(_UI.eventhandlers.tempnewbasicshape.ymax-_UI.eventhandlers.tempnewbasicshape.ymin, 3)) + "'>&nbsp;</td>"+
				"</tr>";
		}

		var overlaphelptext = "<h1>Overlap Mode</h1><br><br><div style=\\&apos;width:500px;\\&apos;>"+
			"The Path Points that make up a shape outline have either a clockwise or counter-clockwise direction. "+
			"This path direction is also known as a path&rsquo;s &ldquo;winding&rdquo;. "+
			"Shapes with the same winding will combine, opposite windings will cut-out.<br><br>"+
			"For example, to create the character &lsquo;o&rsquo;, draw two overlapping oval shapes. "+
			"If the outside oval has a clockwise winding, select the inside oval and change it&rsquo;s winding to counter-clockwise. "+
			"This will result in the inside oval appearing in reverse (or cutting out) in relation to the outside oval.</div><br><br>"+
			"<table style=\\&apos;width:350px;\\&apos;><tr><td style=\\&apos;text-align:center;\\&apos;><span style=\\&apos;font-size:1.2em;\\&apos;>Same Winding</span><br></td><td style=\\&apos;text-align:center;\\&apos;><span style=\\&apos;font-size:1.2em;\\&apos;>Different Winding</span><br></td></tr>"+
			"<td style=\\&apos;text-align:center;\\&apos;><br><img src=\\&apos;data:image/png;base64,"+
			"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"+
			"\\&apos;></td><td style=\\&apos;text-align:center;\\&apos;><br><img src=\\&apos;data:image/png;base64,"+
			"iVBORw0KGgoAAAANSUhEUgAAAJ4AAABkCAYAAAB3jIkEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAChtJREFUeNrsXS1020gQ3hQ2oCYpjXADahIc4R6IyZXauCQh5T56xFdw2DH1ATvgjtrGAXZAS63QBtgFCdXp21lZ8k8cO5G0q9md97bKe/3bmf3mm5ldaVYIJ040yIHxM+yGlejXqhrH6inUs7Llb86jMVE/43mnnhPx+WBuoJ6xjl40PirdPDW2yUTpGqzoGDjg7Q+0WjTOouFLwweRLTHu7+j5GNn5Z2TX+y22PYrW63003kb/nBet59ExPT2JW/zFYTRG0ehrAWI39JV+pOe90uf7SCx+fpiTvtvkxKfncaTXe6Ujfj6szFM6DiMdJw5464vgKbDVpdf/GNICyOcw+/8Pi/UhGidn9CSW6CgQBjnqCR3Ppa73QUXc9BM9HzLGPhxP6hnpeFoDEAOpH/Q0AIQHmgEXg60mF+HmWsjnQ4EEdFihhTk9p2eyOP0MneoiGg0Jtn+/kY73BUdCMKFfJx2PvEA52l9Gph25hdJueBmNqfh7GopPl2G0+GH0O/oH5oH5YF6YXzdsqND/slDaDXvRCMWXdhgtvBk6YpzWQvG1F8q5dcO2cg7WoGtGYyaag1D4DXMW4qnFwTwxXzjKfoAbiPYsFL83zXGqTePII6dgC0CEVDDIn+MwyjvMBtzqwHwJgFOVGjwdUrF4ZQDcdgC2XszyBgHOW3i/6Qz33MD8KQQP1pghZnIsXpkAtwmACcs3ygq6S6lAo1XuxVjNAaFPHH6x99YNx5LJTcrhskgzQBbkZJWyAK4iJwx2KFtY3Sf8UlgiIHLUEU5GBchsa4phzO47JooJc2G5TQtC+dBUVq1gBk5stynFIPZrmQq6hmQAbEdwXQTkQAir6RAU6132HHbbgGOt6m0I6FrSK7iG1tj45PntJ5ke1SxX/cH0VHiMzQBfvIXAOdwkoGs8m2YgDHO1A0aSZlT1gg4UjBBkM+iWC6uxJeCb6QFfDDquRcS+oLMXfF6RoGvKBXFMtw18vHO+BHwF5XxYCO45HVicTimar95a4lztpsFXwD4d7+oVg7YO2hnYy5f24u6kWdlra/jgvE+HQUdi2YUPHK2BPTnnwki5XpqW7GDAgTyR4Aw6nFHmkTDjhIO77egYMeNK1wavhW7ktbWcosWUfbRAMZVZvkevNs3Y53V0IN7LMT/22e8EJPlxM5sQy/UNjPUwke+2AI4WcezE2ZYopOjNHe81hqpJL+UcYjFo66Qh8pa4QEMuyb9AG7zGUFP2+1CUlwxEUQKAA+icbZrky74zUOYGehX4xuwdGoUUiOtFbMe9oCia7dKFBnenflEK49iuCPAN2LMe9NuL9WzI7SgUDIQuscG5MXZ2blSy9oQBvR+x2JPOrO2PvtlgjroYdgRrifuHZNUf5eXSEZ8ueNt6eIVfa6v7em/W9pnwh+gPMwbeOS26frlSnZz42hrNiW76BL4tjFfT0slIB+Nh0XULtUTrq/kwZr0ORdItwDuXrcK4g+6wYlLHzGvFwHyFWs9V0+H2zVqYvekzB54xYTaWPvtwC0HzyVS4TTOeL9uePjDv00dhbWjMfKgx4kR1JmXMetcUUTcA74x9mPVUb2DD+gHLcIu2uJyFWgr7mxnvx5A/8Exiu1T6zZ7x4obiajM5Dbzqsx3Gyy4fJKvcGjiziXIKG1ivmgAPKIzb23OW956ZjBfneSfcWQ/XcMg7PBaM57FnO8l4PrGLmRLIKwL4V7beCvBueStNizo3uL3+LXvg4VIcVWDEwPvI/rSCwqzJtB4I7yP/AmOlqq2wB95b4zdoA/abyFLLiawpEuBxF6oaR845NMvjfInxqrncGeZkn8p2aMWWykqodeKkGKEtO88Bz0nBOd6tA54TF2qdOOA5cZKj0F5lkADPhj0kk6X0NybuKISzBfAmNpXyhkqV/WtpG0It/+vB6SWIM4dvzaLOoxPgHTNnvEfjfctj/1paDLzPB8MYeLfsczxiPN9o4NnxhtAS4wXs3/mP2cTcJN6WN4SGy8Dj/i4YhJJ3U3MKCz498AlrC+DhgBrAc+FWjxAL838LnPbwbtOMRxTI/UsnyqFMfNvSt2IrJfWVXxp4E9u+7TRIztizHSLqkbf4pjkNvJEl33ZW9F7y+wTjfR/xtv1KB4cEeOgVByrkXmQQ69UNyu88WVhw71lD0XS0DjwS/i2zqE2HSdTOv1ESilbCVf8p4F0Lv84ceIuWWaaE27oVreFQQ6Raw60zng3hlhhGv4fZEmaJzJZawy0Djz52vhK/Me/L+983/NowYCYN2faX8xktSIyK1qungUfSEWcN3sDD1gVVt7oVvRAj5o3OicSuVjs4rAMPpxho1eozB98/f+gNtwB9MKmw/qwURQWRWGd3o7jLP/IGnrug0BlGA9u5K7uccTTc3uic+hkDjeU/4C56yxJ0l/L6dOfQW43kW3FDN4AAQOQPOrqhm/v9ZV/aG+8v29dYPfG1x9tQAAIAsXLfVg7A68lFcbbcw0tPa7wN1mjlW2jgpkju0QO60a2Yl85o2oxmofNSiB1kbby2aA5sCRPVjG03YB9iqUjLIV0hrx3LkMR/G2Ca2ddo3bApixfO0cKrxlVsLa88pSpRzX0PCsVUFiEDe6FYECwM5xSFdgVaeW8J1CwyZvvVTso5r0vs1BOFiC2eTOGj6SLD1mJiXOxH8lgQ7uBLcpeGA50JoEtXuvaA73Jn0HGvYLWCzk7ma1vNdEg/qPAam9GDBqGoG4asjX7kJQXHqtFJf/6gI/3HZjU+QrUL43Pe54PxsYlOxveWGJ/zwf8ujK8ZfFW5KFgcMATvc92Z3OsDC3BOMz5dhjKaFfH2TgYnHFR0cN3Dgl7EAJRoczyVAHEQu08NbPmxQ+hFMsqF/aAHJdczpV9Fsh5eLuDkZGA5cqxWObvRp9kPZ6BlZgbMP85z1osLcrKypxjIU6mAmGr7CCpjAPoLZihb5Yf50utSg62LQU7WWoTfMgEwCauzF53UlACADelNMQBNZUDMKwHcdM+TC0+xovkABMOlAcf+khcC4ECGLlSIplSFAAnmQyF18KpOAwkAKQSbkgPGTkUhVRvgDrRvv6CNA1p14av6YYca6hTZ/Ry9PdDNCI1lvCraLKCDzre4c2UmeS71abkQD3NP6ofuUEU26onbhJ2eJ52bSMcrXUt/YBQLChFZRviyrwlaO/wYUSPFLIEIoKEjFhoFYhHQHpXANsp9IcjR6tLRAEL0PUYnUDyzbkV74lOzHOhJTXPwH3Skrql2YQ54q8UINU88k090U7qb0OI8/BJLjao39R45SdUAMPrhOwIbbi+izvZDQd0ph7JXjB4dvSUd0fUdev2MMHF/F7fNpT/7M1h3Pq+adOmP9UJX9dixCGgTpWd/tWmOA97uTIGFwvOdSO6qqIjN91bA4PPUz7/UM8gshOax9US6VJVe6U7om6rpudIp/vlW0B0SgTZn2kP+F2AAw6cPzxGbmzkAAAAASUVORK5CYII="+
			"\\&apos;></td></tr></table>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
			"<td> overlap mode "+helpUI(overlaphelptext)+" </td>"+
			"<td class='rightcol'><input type='text' disabled='disabled'"+
			" value='"+(s.path.winding===0?"unknown":(s.path.winding>0?"counterclockwise":"clockwise"))+"'/>"+
			"<button onclick='ss().path.reversePath();putundoq(\"Reverse Path Direction\");redraw(\"shapeDetails - Clockwise\");' class='spinnerbutton' style='width:40px;'>"+(s.path.winding>0?"&#8635":"&#8634")+"</button></td>"+
			"</tr>";

		if(_UI.selectedtool !== "pathedit") {
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> lock aspect ratio </td>"+
				"<td class='rightcol'>"+checkUI("ss().ratiolock",true)+"</tr>";
		}

		//debug("<b>SHAPE DETAILS OUTPUT:<b><br><textarea rows=9 cols=3000>" + content + "</textarea>");
		return content;
	}

	function pointDetails(s){
		var tp = s.path.sp();
		var content = "";
		content += "<tr><td colspan=3><h3>path point</h3></td></tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td>"+
			"<td> selected point </td>"+
			"<td class='rightcol'><input class='input' type='text' value='" + s.path.sp(true) + "' onchange='ss().path.selectPathPoint(this.value); redraw(\"pointDetails\");'>"+spinner()+"</td>"+
			"</tr>";

		content += "<tr><td class='leftcol'>&nbsp;</td><td> point type </td><td class='rightcol'>  ";
		content += makePointButton('symmetric', (tp.type==='symmetric'));
		content += makePointButton('flat', (tp.type==='flat'));
		content += makePointButton('corner', (tp.type==='corner'));
		content += "</td></tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.xlock")+"</td>"+
			"<td> point x </td>"+
			"<td class='rightcol'><input class='input' type='text' " + (tp.P.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"P\", (this.value), \"null\"); putundoq(\"Point X Position : \"+this.value); redraw(\"pointDetails\");'")+
			" value='" + round(tp.P.x, 3) + "' >" + (tp.P.xlock? "" : spinner()) + "</td>"+
			"</tr>";

		content += "<tr><td class='leftcol'>"+lockUI("ss().path.sp().P.ylock")+"</td>"+
			"<td> point y </td>"+
			"<td class='rightcol'><input class='input' type='text' " + (tp.P.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"P\", \"null\", (this.value)); putundoq(\"Point Y Position : \"+this.value); redraw(\"pointDetails\");'")+
			" value='" + round(tp.P.y, 3) + "' >" + (tp.P.ylock? "" : spinner()) + "</td>"+
			"</tr>";

		content += "<tr><td colspan=3><h3>handle 1 <span class='unit'>(before the point)</span></h3></td></tr>";

		var issymmetric = tp.type === 'symmetric';
		if(!issymmetric){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> use handle 1 </td>"+
				"<td class='rightcol'>"+checkUI("ss().path.sp().useh1",true)+"</td>"+
				"</tr>";
		}

		if(tp.useh1){
			content += "<tr><td class='leftcol'>"+(issymmetric? "&nbsp;" : lockUI("ss().path.sp().H1.xlock"))+"</td>"+
				"<td> handle 1 x </td>"+
				"<td class='rightcol'><input class='input' type='text' " + (tp.H1.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"H1\", (this.value), \"null\"); putundoq(\"H1 X Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
				" value='" + round(tp.H1.x, 3) + "' >" + (tp.H1.xlock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+(issymmetric? "&nbsp;" : lockUI("ss().path.sp().H1.ylock"))+"</td>"+
				"<td> handle 1 y </td>"+
				"<td class='rightcol'><input class='input' type='text' " + (tp.H1.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"H1\", \"null\", (this.value)); putundoq(\"H1 Y Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
				" value='" + round(tp.H1.y, 3) + "' >" + (tp.H1.ylock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> angle <span class='unit'>(degrees)</span></td>"+
				"<td class='rightcol'><input type='text' disabled='disabled' value='"+(round(tp.getHandleAngle(tp.H1)*180/Math.PI,3) || 0)+"'></td>"+
				"</tr>";
		}

		content += "<tr><td colspan=3><h3>handle 2 <span class='unit'>(after the point)</span></h3></td></tr>";

		if(!issymmetric){
			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> use handle 2 </td>"+
				"<td class='rightcol'>"+checkUI("ss().path.sp().useh2",true)+"</td>"+
				"</tr>";
		}

		if(tp.useh2){
			content += "<tr><td class='leftcol'>"+(issymmetric? "&nbsp;" : lockUI("ss().path.sp().H2.xlock"))+"</td>"+
				"<td> handle 2 x </td>"+
				"<td class='rightcol'><input class='input' type='text' " + (tp.H2.xlock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"H2\", (this.value), \"null\"); putundoq(\"H2 X Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
				" value='" + round(tp.H2.x, 3) + "' >" + (tp.H2.xlock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>"+(issymmetric? "&nbsp;" : lockUI("ss().path.sp().H2.ylock"))+"</td>"+
				"<td> handle 2 y </td>"+
				"<td class='rightcol'><input class='input' type='text' " + (tp.H2.ylock? "disabled='disabled'" : "onchange='ss().path.sp().setPathPointPosition(\"H2\", \"null\", (this.value)); putundoq(\"H2 Y Position : \"+round(this.value)); redraw(\"pointDetails\");'")+
				" value='" + round(tp.H2.y, 3) + "' >" + (tp.H2.ylock? "" : spinner()) + "</td>"+
				"</tr>";

			content += "<tr><td class='leftcol'>&nbsp;</td>"+
				"<td> angle <span class='unit'>(degrees)</span></td>"+
				"<td class='rightcol'><input type='text' disabled='disabled' value='"+(round(tp.getHandleAngle(tp.H2)*180/Math.PI,3) || 0)+"'></td>"+
				"</tr>";
		}

		return content;
	}


//	------------------------
//	KERN ATTRIBUTES
//	------------------------

	function makePanel_KerningAttributes() {
		var content = '<div class="navarea_header">';

		content += makePanelSuperTitle();

		content += '<h1 class="paneltitle">Pairs</h1>';

		content += '</div><div class="navarea_section">';

		var rows = '';
		for(var k in _GP.kerning){ if(_GP.kerning.hasOwnProperty(k)){
			rows += makeOneKernPairRow(_GP.kerning[k], k);
		}}

		if(rows === '') rows = 'No kern pairs exist yet.  Press the "New Kern Pair" button below to get started.';

		content += rows;
		content += '</div><div class="navarea_section">';

		content += '<h1 class="paneltitle">actions</h1>';
		content += '<table class="actionsgrid"><tr>';
		content += '<td><h3>kern pair</h3>'+
					'<button onclick="showNewKernPairDialog();">new kern pair</button><br>'+
					'<button onclick="deleteKernPairConfirm();">delete kern pair</button><br>'+
					'<td></td><td></td>'+
					'</tr></table>';

		content += '</div>';

		return content;
	}

	function makeOneKernPairRow(k, id) {
		var re = '<table class="guiderow"><tr>';
		re += '<td><input type="text" value="' + k.leftgroup.join('') + '" style="text-align:right;"></td>';
		re += '<td><input type="text" value="' + k.rightgroup.join('') + '"></td>';
		re += '<td><input type="number" value="' + k.value + '" onchange="updateKernValue(\''+id+'\', this.value);"></td>';
		re += '</tr></table>';
		return re;
	}

	function updateKern(id, attr, val) {
		_GP.kerning[id].value = val;
		redraw();
	}

	function showNewKernPairDialog() {
		var con = '<h1>New Kern Pair</h1>';
		con += '<div style="width:500px;">';
		con += 'Create a new kern pair by specifying a character for the left and right sides. ';
		con += 'Each side of the kern pair can also be a group of characters.  When any character from the left side is displayed before any character in the right side, the pair will be kerned. ';
		con += 'Characters can also be specified in Unicode format (like U+0066) or hexadecimal format (like 0x0066). ';
		con += 'Hexadecimal, Unicode, and regular character formats cannot be mixed - choose one type!<br><br>';
		con += '<h3>Kern Pair Characters</h3>';
		con += '<input type="text" id="leftgroup" style="font-size:24px; width:45%; padding:8px; text-align:right;"/>';
		con += '<input type="text" id="rightgroup" style="font-size:24px; width:45%; padding:8px;"/><br>';
		con += makeErrorMessageBox();
		con += '<br>';
		con += '<button class="buttonsel" onclick="createNewKernPair();">create new kern pair</button>';
		con += '</div>';

		openDialog(con);
	}

	function createNewKernPair() {
		var l = document.getElementById('leftgroup').value;
		var r = document.getElementById('rightgroup').value;

		l = l.split('').filter(function(elem, pos) { return l.indexOf(elem) === pos;});
		r = r.split('').filter(function(elem, pos) { return r.indexOf(elem) === pos;});

		var id = generateNewID(_GP.kerning, 'kern');

		_GP.kerning[id] = new HKern({'leftgroup':l, 'rightgroup':r});

		closeDialog();
		_UI.selectedkern = id;
		redraw();
	}

	function deleteKernPairConfirm() {
		
	}

// end of file