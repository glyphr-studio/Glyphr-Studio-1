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
		if(kc === 'ctrl'){
			// debug('\t CTRL');
			updateCursor();
			eh.multi = false;
			redraw({calledby:'Event Handler - Keyup Ctrl for multi select', redrawpanels: false});
		}


		// Space
		if(kc === 'space' && eh.ismouseovercec){
			_UI.selectedtool = eh.lastTool;
			eh.isSpaceDown = false;
			updateCursor();
			redraw({calledby:'Event Handler - Keyup Spacebar for pan toggle', redrawcanvas:false});
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
			showToast('Exporting SVG font file...'); 
			setTimeout(ioSVG_exportSVGfont, 500);
		}

		// e
		if(event.ctrlKey && kc==='e'){
			event.preventDefault();
			showToast('Exporting OTF font file...'); 
			setTimeout(ioOTF_exportOTFfont, 500);
		}

		// q
		// for dev mode clear console
		if(_UI.devmode && event.ctrlKey && kc==='q'){
			event.preventDefault();
			console.clear();
		}


		// Only allow the following stuff for canvas edit pages
		if(!onCanvasEditPage()) return;
		var em = getEditMode();

		// Ctrl
		if((event.ctrlKey || kc==='ctrl') && !eh.multi){
			// debug('\t event.ctrlKey = true');
			// debug('\t selectedtool = ' + _UI.selectedtool);
			event.preventDefault();
			eh.multi = true;

			if(overcanvas) {
				if(em === 'pointer') setCursor('pointerPlus');
				if(em === 'pen') setCursor('penPlus');
			}

			// debug('\t eh.lastTool = ' + eh.lastTool);
			redraw({calledby:'Event Handler - Keydown Ctrl for multi select', redrawpanels:false});
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
		if(kc==='undo' || (eh.multi && kc==='z')){
			event.preventDefault();
			history_pull();
		}

		// plus
		if(eh.multi && kc==='plus'){
			event.preventDefault();
			viewZoom(1.1);
			redraw({calledby:'Zoom Keyboard Shortcut', redrawcanvas:false});
		}

		// minus
		if(eh.multi && kc==='minus'){
			event.preventDefault();
			viewZoom(0.9);
			redraw({calledby:'Zoom Keyboard Shortcut', redrawcanvas:false});
		}

		// 0
		if(eh.multi && kc==='0'){
			event.preventDefault();
			setView(clone(_UI.defaultview));
			redraw({calledby:'Zoom Keyboard Shortcut', redrawcanvas:false});
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
				var mode = getEditMode();

				if(mode === 'pen'){
					_UI.ms.points.deletePathPoints();
					history_put('Delete Path Point');
					redraw({calledby:'Keypress DEL or BACKSPACE'});
				} else if (mode === 'pointer'){
					_UI.ms.shapes.deleteShapes();
					history_put('Delete Shape');
					redraw({calledby:'Keypress DEL or BACKSPACE'});
				}
			}

			// ctrl + c
			if(eh.multi && kc==='c'){
				event.preventDefault();
				copyShape();
			}

			// ctrl + v
			if(eh.multi && kc==='v'){
				event.preventDefault();
				pasteShape();
				history_put('Paste Shape');
				redraw({calledby:'Paste Shape'});
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
		var em = getEditMode();

		if(em === 'kern'){
			getSelectedKern().value += (mx || my);
		} else if(em === 'pointer'){
				_UI.ms.shapes.updateShapePosition(mx, my);
		} else if(em === 'pen'){
				_UI.ms.points.updatePathPointPosition('P', mx, my);
		}

		redraw({calledby:'Nudge'});

	}

// end of file