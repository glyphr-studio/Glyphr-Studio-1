// start of file
/**
	Page > Components
	HTML and associated functions for this page.
**/


	function loadPage_components(){
		// debug('\n loadPage_components - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		// initEventHandlers();
		clickEmptySpace();

		if(_UI.devmode && isval(_UI.dev_selected_shape)){
			selectShape(_UI.dev_selected_shape);
			_UI.dev_selected_shape = false;
		}

		_UI.selectedcomponent = _UI.selectedcomponent || getFirstID(_GP.components);

		if(getSelectedWorkItemShapes().length > 0)	_UI.selectedToolName = 'pathedit';
		else _UI.selectedToolName = 'pathaddpoint';

		redraw({calledby:'loadPage_components'});
	}


	function createNewComponent(pglyph){
		// debug('\n createNewComponent - START');

		pglyph = pglyph || new Glyph({'name':'Component ' + (getLength(_GP.components)+1)});
		var newid = generateNewID(_GP.components, 'com');
		_UI.selectedcomponent = newid;

		_GP.components[newid] = pglyph;

		//debug("Added New Component: " + newid + " JSON=" + json(_GP.components));

		return newid;
	}

	function deleteComponentConfirm(){
		var content = '<h1>Delete Component</h1>';
		content += '<b style="color:'+_UI.colors.error.medium+';">This action cannot be undone!</b> &nbsp; Are you sure you want to delete this Component?<br><br>';

		var uia = getSelectedWorkItem().usedin;
		if(uia.length > 0){
			content += 'This Component is linked to the following Glyphs as a Component Instance:<br><ul>';

			for(var ssu=0; ssu<uia.length; ssu++){
				content += ('<li>' + getGlyphName(uia[ssu]).replace(/LATIN /gi,'') + '</li>');
			}

			content += '</ul>';
			// content += '<br>The Component Instances in these Glyphs will also be deleted.<br><br>';
		}

		content += '<br><br><button class="buttonsel" onclick="deleteComponent();">delete this component</button> &nbsp; <button onclick="closeDialog();">cancel</button>';

		openDialog(content);
	}

	function deleteComponent(){
		// debug('\n deleteComponent - START');
		// debug('\t deleting ' + _UI.selectedcomponent);

		closeDialog();

		// Delete upstream Component Instances
		getSelectedWorkItem().deleteLinks(_UI.selectedcomponent);

		// Delete it
		var oldname = getSelectedWorkItemName();
		delete _GP.components[_UI.selectedcomponent];
		_UI.selectedcomponent = getFirstID(_GP.components);

		// history_put('Deleted ' + oldname);

		// debug('\t after delete ' + _GP.components);
		redraw({calledby:'deleteComponent'});

		// debug('deleteComponent - END\n');
	}

// end of file