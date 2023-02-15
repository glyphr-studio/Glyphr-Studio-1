// start of file
/**
	Framework > Event Handlers > Keyboard
	All keyboard handlers can be found here.
**/

function keyUp(event) {
	var kc = getKeyFromEvent(event);
	// debug(`\n keyUp - ${kc} - START`);

	var eh = _UI.eventhandlers;
	if (kc === eh.keyDown) eh.keyDown = false;
	// stopDefaultStuff(event);

	// debug('Key Up:\t\t' + kc + ' from ' + event.which);
	// debug(event);

	// MODIFIER KEYS

	// Shift
	if (event.which === 16) {
		// debug(`\t handling shift`);
		eh.isShiftDown = false;
	}

	if (!onCanvasEditPage()) return;

	// Ctrl
	var ctrlKey = event.ctrlKey || event.metaKey || event.which == 17;
	if (ctrlKey) {
		// debug(`\t handling ctrl`);
		eh.isCtrlDown = false;
		var editMode = getEditMode();
		if (editMode === 'arrow') setCursor('arrow');
		if (editMode === 'pen') setCursor('pen');

		redraw({
			calledby: 'Event Handler - keyUp Ctrl for multi select',
			redrawpanels: false,
		});
	}

	// Space
	if (kc === 'space' && eh.ismouseovercec) {
		// debug(`\t handling space`);
		togglePanOff();
	}

	// debug(` keyUp - ${kc} - END\n\n`);
}

function keyDown(event) {
	var kc = getKeyFromEvent(event);
	// debug(`\n keyDown - ${kc} - START`);

	var eh = _UI.eventhandlers;
	var editMode = getEditMode();
	var overCanvas = eh.ismouseovercec;
	var singleKeys = '?¿/bvc0zaqoegs';
	var nameKeys = [
		'minus',
		'plus',
		'undo',
		'esc',
		'del',
		'backspace',
		'up',
		'down',
		'left',
		'right',
	];
	// debug(event);
	// debug('\t Key Press:\t' + kc + ' from ' + event.which);

	/**
	 * MODIFIER KEYS
	 */
	// Shift
	if (event.which === 16) {
		eh.isShiftDown = true;
		// debug(` keyDown - shift - END\n\n`);
		return;
	}

	// Space
	// and middle mouse wheel click
	if (kc === 'space') {
		stopDefaultStuff(event);
		togglePanOn();
		return;
	}

	// Ctrl
	if (event.ctrlKey || event.metaKey || event.which == 17) {
		eh.isCtrlDown = true;

		if (overCanvas) {
			if (editMode === 'arrow') setCursor('arrowPlus');
			if (editMode === 'pen') setCursor('penPlus');
		}

		redraw({
			calledby: 'Event Handler - Keydown Ctrl for multi select',
			redrawpanels: false,
		});
	}

	// Glyphr Studio clipboard for shapes takes precidence
	// over OS clipboard for SVG code.
	if (eh.isCtrlDown && kc === 'v') {
		if (_UI.clipboardshape) {
			// Continue to Glyphr Studio paste
		} else {
			// Return before stopDefaultStuff is called
			// debug(` keyDown - ctrl v - END\n\n`);
			return;
		}
	}

	// Only continue if there is actually a handler for a key.
	if (singleKeys.indexOf(kc) < 0 && nameKeys.indexOf(kc) < 0) {
		// debug(` keyDown - NO SHORTCUT FOR ${kc} - END\n\n`);
		return;
	}

	// If something other than a single modifier key was pressed
	// prevent default and bubbling and continue.
	stopDefaultStuff(event);

	/**
	 * START HANDLING KEYS
	 **/

	// ctrl shift s (save as)
	// ctrl s (save)
	if (eh.isCtrlDown && eh.isShiftDown && kc === 's') {
		saveGlyphrProjectFile(false); // save as for electron
	} else if (eh.isCtrlDown && kc === 's') {
		saveGlyphrProjectFile(true); // overwrite for electron
	}

	// g
	if (eh.isCtrlDown && kc === 'g') {
		showToast('Exporting SVG font file...');
		setTimeout(ioSVG_exportSVGfont, 500);
	}

	// e
	if (eh.isCtrlDown && kc === 'e') {
		showToast('Exporting OTF font file...');
		setTimeout(ioOTF_exportOTFfont, 500);
	}

	// o
	if (eh.isCtrlDown && kc === 'o') {
		// debug('\t pressed Ctrl + O');
		window.open('https://www.glyphrstudio.com/online', '_blank');
	}

	// q (for dev mode clear console)
	if (_UI.devmode && eh.isCtrlDown && kc === 'q') console.clear();

	// Esc
	if (kc === 'esc') closeDialog();

	/**
	 * Only allow the following stuff for canvas edit pages
	 **/
	if (!onCanvasEditPage()) {
		// debug(` keyDown - NOT ON CANVAS EDIT PAGE - ${kc} - END\n\n`);
		return;
	}

	// Ctrl z
	if (kc === 'undo' || (eh.isCtrlDown && kc === 'z')) history_pull();

	// Ctrl plus
	if (eh.isCtrlDown && kc === 'plus') {
		viewZoom(1.1);
		redraw({ calledby: 'Zoom Keyboard Shortcut', redrawcanvas: false });
	}

	// Ctrl minus
	if (eh.isCtrlDown && kc === 'minus') {
		viewZoom(0.9);
		redraw({ calledby: 'Zoom Keyboard Shortcut', redrawcanvas: false });
	}

	// Ctrl 0
	if (eh.isCtrlDown && kc === '0') {
		autoCalculateView();
		redraw({ calledby: 'Zoom Keyboard Shortcut', redrawcanvas: false });
	}

	// left
	if (kc === 'left' && overCanvas) nudge(-1, 0, event);

	// right
	if (kc === 'right' && overCanvas) nudge(1, 0, event);

	// up
	if (kc === 'up' && overCanvas) nudge(0, 1, event);

	// down
	if (kc === 'down' && overCanvas) nudge(0, -1, event);

	/**
	 * Don't do the below stuff on Kerning page
	 **/
	if (_UI.current_page === 'kerning') {
		// debug(` keyDown - ON KERNING PAGE - ${kc} - END\n\n`);
		return;
	}

	/**
	 * Only do the below stuff if the canvas has focus
	 **/
	if (overCanvas) {
		// debug(`\t >> Over canvas actions`);

		// Ctrl a
		if (eh.isCtrlDown && kc === 'a') {
			var swis = getSelectedWorkItemShapes();
			if (swis.length) {
				swis.forEach(function (shape) {
					_UI.ms.shapes.members.push(shape);
					// debug(_UI.ms.shapes.members);
				});
			}
			redraw({
				calledby: 'Event Handler - Select all path points',
				redrawpanels: false,
			});
			return;
		}

		// del
		if (kc === 'del' || kc === 'backspace') {
			editMode = getEditMode();

			if (editMode === 'pen') {
				_UI.ms.points.deletePathPoints();
				history_put('Delete Path Point');
				redraw({ calledby: 'keyDown DEL or BACKSPACE' });
			} else if (editMode === 'arrow') {
				_UI.ms.shapes.deleteShapes();
				history_put('Delete Shape');
				redraw({ calledby: 'keyDown DEL or BACKSPACE' });
			}
		}

		// Ctrl c
		if (eh.isCtrlDown && kc === 'c') copyShape();

		// Ctrl v
		if (eh.isCtrlDown && kc === 'v') {
			var pasted = pasteShape();
			if (pasted) {
				history_put(
					pasted > 1 ? 'Pasted ' + pasted + ' shapes' : 'Pasted 1 shape'
				);
				redraw({ calledby: 'Paste Shape' });
			} else {
				// debug('CTRL+V TRIGGERED FROM KEY HANDLER NOT PASTE HANDLER');
			}
		}

		// v
		if (kc === 'v') clickTool('shaperesize');

		// b
		if (kc === 'b') clickTool('pathedit');

		// ?
		if (kc === '?' || kc === '¿' || kc === '/') toggleKeyboardTips();
	}
	// debug(` keyDown - ${kc} - END\n`);
}

function togglePanOn() {
	var eh = _UI.eventhandlers;
	if (eh.ismouseovercec && _UI.selectedToolName !== 'pan') {
		eh.eh_pantool.mousedown();
		eh.lastToolName = _UI.selectedToolName;
		eh.currentTool = eh.eh_pantool;
		_UI.selectedToolName = 'pan';
		setCursor('move');
	}
	redraw({
		calledby: 'Event Handler - togglePanOn',
		redrawpanels: false,
	});
}

function togglePanOff() {
	var eh = _UI.eventhandlers;
	eh.eh_pantool.mouseup();
	clickTool(eh.lastToolName);
	eh.lastToolName = _UI.selectedToolName;
	updateCursor();
	redraw({
		calledby: 'Event Handler - togglePanOff',
		redrawcanvas: false,
	});
}

function getKeyFromEvent(event) {
	// debug('GETKEYFROMEVENT - keyCode:' + event.keyCode + '\twhich:' + event.which);
	var specialGlyphs = {
		8: 'backspace',
		9: 'tab',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		20: 'capslock',
		26: 'undo',
		27: 'esc',
		32: 'space',
		33: 'pageup',
		34: 'pagedown',
		35: 'end',
		36: 'home',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		45: 'ins',
		46: 'del',
		61: 'plus',
		91: 'meta',
		93: 'meta',
		173: 'minus',
		187: 'plus',
		189: 'minus',
		224: 'meta',
	};
	return (
		specialGlyphs[parseInt(event.which)] ||
		String.fromCharCode(event.which).toLowerCase()
	);
}

function stopDefaultStuff(event) {
	event.stopPropagation();
	event.preventDefault();
}

function nudge(dx, dy, ev) {
	if (ev.ctrlKey) return;

	var multiplyer = _UI.eventhandlers.isShiftDown ? 10 : 1;

	var mx = dx * _GP.projectsettings.spinnervaluechange * multiplyer;
	var my = dy * _GP.projectsettings.spinnervaluechange * multiplyer;
	var editMode = getEditMode();

	if (editMode === 'kern') {
		var nv = getSelectedKern().value + (mx || my);
		updateKernValue(getSelectedKernID(), nv);
		redraw({ calledby: 'Nudge kern value', redrawpanels: false });
	} else if (editMode === 'arrow') {
		_UI.ms.shapes.updateShapePosition(mx, my);
		redraw({ calledby: 'Nudge shape' });
	} else if (editMode === 'pen') {
		_UI.ms.points.getMembers().forEach(function (o, i) {
			o.updatePathPointPosition('P', mx, my);
		});
		redraw({ calledby: 'Nudge path point' });
	}
}

// end of file
