Views.capsules.update = function(delegate, capsule) {
	var view = Ti.UI.createWindow({
		title: "Add Content",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var createTableViewRow = function(kind) {
		var row = Ti.UI.createTableViewRow({
			title: kind,
			kind: kind
		});
	
		return row;
	}
	
	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:250,
		bottom:0,
		data: map(createTableViewRow, delegate.content_types)
	});
		
	table.addEventListener('click', delegate.addContent(capsule));
	
	view.add(table);
	return view;
}