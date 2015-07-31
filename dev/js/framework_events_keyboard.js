// start of file
/**
	Framework > Event Handlers > Keyboard
	All keyboard handlers can be found here.
**/


	function keyup(event){
		var kc = getKeyFromEvent(event);
		// debug('Key Up:\t\t' + kc + ' from ' + event.which);
		if(!onCanvasEditPage()) return;

		var eh = _UI.eventhandlers;
		// debug('\t eh.lastTool = ' + eh.lastTool);

		// Ctrl
		if(kc === 'ctrl' || event.ctrlKey){
			// debug('\t CTRL');

			if(_UI.ms.shapes.getMembers().length < 2){
				// debug('\t Shapes < 2 setting to ' + eh.lastTool);
				_UI.selectedtool = eh.lastTool;
				if(_UI.selectedtool === 'shaperesize') setCursor('pointer');
				else updateCursor();
			} else {
				// debug('\t Shapes > 2, setting to pointer');
				_UI.selectedtool = 'shaperesize';
				setCursor('pointer');
			}
			
			eh.multi = false;
			redraw('Event Handler - Keyup Ctrl for multi select');
		}

		// Space
		if(kc === 'space' && eh.ismouseovercec){
			_UI.selectedtool = eh.lastTool;
			eh.isSpaceDown = false;
			updateCursor();
			redraw('Event Handler - Keyup Spacebar for pan toggle');
		}
	}

	function keypress(event){
		// debug('\n keypress - START');
		if(event.type !== 'keydown') return;
		if(_UI.navhere === 'openproject') return;

		var eh = _UI.eventhandlers;
		var overcanvas = eh.ismouseovercec;
		var kc = getKeyFromEvent(event);
		// debug('Key Press:\t' + kc + ' from ' + event.which);
		// debug(event);


		// s
		if(event.ctrlKey && kc==='s'){
			event.preventDefault();
			saveGlyphrProjectFile();
		}

		// g
		if(event.ctrlKey && kc==='g'){
			event.preventDefault();
			ioSVG_exportSVGfont();
		}

		// e
		if(event.ctrlKey && kc==='e'){
			event.preventDefault();
			ioOTF_exportOTFfont();
		}

		// q 
		// for dev mode clear console
		if(_UI.devmode && event.ctrlKey && kc==='q'){
			event.preventDefault();
			console.clear();
		}

		
		// Only allow the following stuff for canvas edit pages
		if(!onCanvasEditPage()) return;

		// Ctrl
		if((event.ctrlKey || kc==='ctrl') && !eh.multi){
			// debug('\t event.ctrlKey = true');
			// debug('\t selectedtool = ' + _UI.selectedtool);
			event.preventDefault();
			eh.multi = true;
			eh.lastTool = _UI.selectedtool;
			_UI.selectedtool = 'shaperesize';
			if(overcanvas) {
				setCursor('pointerPlus');
				// debug('\t setCursor finished for pointerPlus');
			}
			// debug('\t eh.lastTool = ' + eh.lastTool);
			redraw('Event Handler - Keydown Ctrl for multi select');
			return;
		}

		// Space
		if(kc === 'space' && overcanvas){
			event.preventDefault();
			if(!eh.isSpaceDown){
				eh.lastTool = _UI.selectedtool;
				_UI.selectedtool = 'pan';
				eh.isSpaceDown = true;
				setCursor('move');
			}
		}

		if(kc==='esc'){
			closeDialog();
		}

		// ?
		if(kc==='?' || kc==='¿'){
			event.preventDefault();
			toggleKeyboardTips();
		}

		// z
		if(kc==='undo' || (event.ctrlKey && kc==='z')){
			event.preventDefault();
			history_pull();
		}

		// plus
		if(event.ctrlKey && kc==='plus'){
			event.preventDefault();
			viewZoom(1.1);
			redraw('Zoom Keyboard Shortcut');
		}

		// minus
		if(event.ctrlKey && kc==='minus'){
			event.preventDefault();
			viewZoom(0.9);
			redraw('Zoom Keyboard Shortcut');
		}

		// 0
		if(event.ctrlKey && kc==='0'){
			event.preventDefault();
			setView(clone(_UI.defaultview));
			redraw('Zoom Keyboard Shortcut');
		}

		// left
		if(kc==='left' && overcanvas){
			event.preventDefault();
			nudge(-1,0);
		}

		// right
		if(kc==='right' && overcanvas){
			event.preventDefault();
			nudge(1,0);
		}

		// up
		if(kc==='up' && overcanvas){
			event.preventDefault();
			nudge(0,1);
		}

		// down
		if(kc==='down' && overcanvas){
			event.preventDefault();
			nudge(0,-1);
		}


		// Only allow above stuff on Kerning page
		if(_UI.navhere === 'kerning') return;

		// Only do the below stuff if the canvas has focus

		if(overcanvas){
			// del
			if(kc==='del' || kc==='backspace'){
				event.preventDefault();
				var singleton = _UI.ms.shapes.getSingleton();

				if(singleton && singleton.objtype !== 'componentinstance' && singleton.path.sp(false)){
					singleton.path.deletePathPoint();
					history_put('Delete Path Point');
					redraw('Keypress DEL or BACKSPACE');
				} else if (_UI.ms.shapes){
					deleteShape();
					history_put('Delete Shape');
					redraw('Keypress DEL or BACKSPACE');
				}
			}

			// ctrl + c
			if(event.ctrlKey && kc==='c'){
				event.preventDefault();
				copyShape();
			}

			// ctrl + v
			if(event.ctrlKey && kc==='v'){
				event.preventDefault();
				pasteShape();
				history_put('Paste Shape');
				redraw('Paste Shape');
			}


			// v
			if(kc === 'v') clickTool('shaperesize');

			// b
			if(kc === 'b') clickTool('pathedit');

		}
		// debug(' keypress - END\n');
	}

	function getKeyFromEvent (event) {
		//debug('GETKEYFROMEVENT - keyCode:' + event.keyCode + '\twhich:' + event.which);
		var specialGlyphs = {
			8:'backspace', 9:'tab', 13:'enter', 16:'shift', 17:'ctrl', 18:'alt', 20:'capslock', 26:'undo', 27:'esc', 32:'space', 33:'pageup', 34:'pagedown', 35:'end', 36:'home', 37:'left', 38:'up', 39:'right', 40:'down', 45:'ins', 46:'del', 91:'meta', 93:'meta', 187:'plus', 189:'minus', 224:'meta'
		};
		return specialGlyphs[parseInt(event.which)] || String.fromCharCode(event.which).toLowerCase();
	}

	function nudge(dx, dy) {
		var mx = (dx * _GP.projectsettings.spinnervaluechange);
		var my = (dy * _GP.projectsettings.spinnervaluechange);

		if(_UI.navhere === 'kerning'){
			getSelectedKern().value += (mx || my);
			redraw('Nudge');
		} else if(_UI.ms.shapes.count()){
			var singleton = _UI.ms.shapes.getSingleton();
			if(singleton && singleton.path.sp()){
				singleton.path.sp().updatePathPointPosition('P', mx, my);
			} else {
				_UI.ms.shapes.updateShapePosition(mx, my);
			}
			redraw('Nudge');
		}
	}

// end of file