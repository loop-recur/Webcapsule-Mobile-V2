Views.capsules.index = function(delegate) {
	var view = Ti.UI.createView({
		backgroundColor: "white"
	});
	
	var picker_row = Ti.UI.createTableViewRow({
		height:80,
		title: "picker"
	});
	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:82,
		bottom:0
	});
	
	var refreshTable = function(data) {
		tableView.setData(map(createTableViewRow, data));
		// tableView.appendRow(picker_row);
	}
	
	delegate.getAll(refreshTable);
	
	var slide_in =  Ti.UI.createAnimation({bottom:0});
	var slide_out =  Ti.UI.createAnimation({bottom:-251});
	
	var picker_view = Ti.UI.createView({
		height:251,
		bottom:-251,
		zIndex:99
	});
	
	var done =  Ti.UI.createButton({
		title:'Done',
		style:Ti.UI.iPhone.SystemButtonStyle.DONE
	});
	
	var spacer =  Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar =  Ti.UI.createToolbar({
		top:0,
		items:[spacer,done]
	});
	
	picker_view.add(toolbar);
	
	done.addEventListener('click', function(e) {
		delegate.pickerDone(refreshTable, picker.getSelectedRow(0).title);
		picker_view.animate(slide_out);
	});
	
	picker_row.addEventListener('click', function() {
		picker_view.animate(slide_in)
	});
	
	var picker = Ti.UI.createPicker({
		top:43,
		selectionIndicator:true
	});
	
	map(function(t){ picker.add(Ti.UI.createPickerRow({title : t})); }, delegate.pickerOptions);
	picker_view.add(picker);
	view.add(picker_view);
	
	var createTableViewRow = function(capsule) {
		var name = Ti.UI.createLabel({
			text:capsule.name, 
			font:{fontFamily:'GillSans',fontSize:18,fontWeight:'regular'},
			color:"#444444",
			left:10,
			top:20,
			height:"auto",
			width:"auto",
			id: capsule.id
		});

		var row = Ti.UI.createTableViewRow({
			height:80,
			id: capsule.id,
			className:'capsule'
		});
	
		row.add(name);
	
		return row;
	}
		
	tableView.addEventListener('click', delegate.tableClicked);
	tableView.appendRow(picker_row);
	view.add(tableView);
	
	return view;
}
