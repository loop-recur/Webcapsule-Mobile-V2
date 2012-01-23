Views.capsules.index = function(delegate, win) {	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:45,
		bottom:0,
		separatorColor:'transparent'
	});
	
	var refreshTable = function(data) {
		tableView.setData(map(Views.capsules.feedRow, data));
	}
		
	var subtabs = UI.SubTabs(win, delegate.feed_options, {skip_back : true, center: true});

	subtabs.delegate = {
		getContent : function(view, e) {			
			delegate.pickerDone(function(d){ refreshTable(d);}, e.source.id)
		}
	}
		
	var new_capsule = Ti.UI.createButton({
		title: "New Capsule",
		width: 150,
		height: 30,
		bottom: 10
	});
	
	new_capsule.addEventListener('click', Controllers.capsules.create);

	win.setRightNavButton(new_capsule);
		
	win.add(tableView);
	
	return win;
}
