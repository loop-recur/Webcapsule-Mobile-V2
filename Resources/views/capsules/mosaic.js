Views.capsules.mosaic = function(capsule, rowClicked) {	
	var contents = flatten([capsule.comments, capsule.photos, capsule.videos]);
	
	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:250,
		bottom:0
	});
	
	var createTableViewRow = function(content) {
		var name = Ti.UI.createLabel({
			text:content.kind, 
			font:{fontFamily:'GillSans',fontSize:18,fontWeight:'regular'},
			color:"#444444",
			left:10,
			height:"auto",
			width:"auto",
			kind: content.kind,
			id: content.id,
			content: content
		});

		var row = Ti.UI.createTableViewRow({
			height:30,
			id: content.id,
			kind: content.kind,
			className:content.kind,
			content: content
		});
	
		row.add(name);
	
		return row;
	}
	
	var refreshTable = function(data) {
		table.setData(map(createTableViewRow, data));
	}
	
	table.addEventListener('click', rowClicked);
	
	refreshTable(contents);
	return table;
}