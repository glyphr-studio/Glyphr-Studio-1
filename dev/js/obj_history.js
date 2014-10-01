// start of file

//-------------------
// History Object
//-------------------

	function History(oa) {
		this.queue = [];
		this.parent = oa.parent;
	}

	History.prototype.put = function(des) {
		this.queue.push({
			'charname': getCurrentWorkingObjectName(),
			'description': des,
			'date': new Date().getTime(),
			'state': clone(this.parent)
		});
		setProjectAsUnsaved();
	};

	History.prototype.pull = function() {
		if(this.queue.length > 0){
			this.parent = this.queue.pop().state;
			redraw('history_pull');
		}
		//if(_UI.navhere === 'character edit') redraw('history_pull');
		//else if (_UI.navhere === 'import svg') update_NavPanels();

		var empty = true;
		for(var q in _UI.history){ if(_UI.history.hasOwnProperty(q)){
			if(_UI.history[q].queue.length){
				empty = false;
				break;
			}
		}}
		if(empty) setProjectAsSaved();
	};
	
	// Global Accessor Functions
	function history_put(dsc){ _UI.history[_UI.navhere].put(dsc); }
	function history_pull(){ _UI.history[_UI.navhere].pull(); }
	function history_length() { return _UI.history[_UI.navhere].queue.length || 0; }
	
	// Name Stuff
	function getCurrentWorkingObjectName() {
		switch(_UI.navhere){
			case 'character edit':
			case 'linked shapes':
				return getSelectedCharName();
			case 'ligatures':
				return 'ligature ' + getSelectedCharName();
			case 'kerning':
				return getSelectedKernName();
		}

		return 'no working object';
	}

// end of file