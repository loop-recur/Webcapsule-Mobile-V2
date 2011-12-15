Views.capsules.show = function(delegate, id) {
	var view = Ti.UI.createWindow({
		title: "Capsule",
		backgroundColor: "white"
	});
	
	var table = Ti.UI.createTableView({
		backgroundColor:"white",
		top:82,
		bottom:0
	});
	
	var createTableViewRow = function(content) {
		var name = Ti.UI.createLabel({
			text:content.kind, 
			font:{fontFamily:'GillSans',fontSize:18,fontWeight:'regular'},
			color:"#444444",
			left:10,
			top:20,
			height:"auto",
			width:"auto",
			kind: content.kind,
			id: content.id,
			content: content
		});

		var row = Ti.UI.createTableViewRow({
			height:80,
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
	
	var finish = function(capsule) {
		var name = Ti.UI.createLabel({
			text:capsule.name, 
			font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
			color:"#444444",
			left:80,
			top:20,
			height:"auto",
			width:"auto"
		});
		
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(capsule.user.image), 
			left:5,
			top:20,
			height:87,
			width:87
		});
		
		var user = Ti.UI.createLabel({
			text: "By " +capsule.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
			color:"#333333",
			left:80,
			top:45,
			height:"auto",
			width:"auto"
		});
		
		var tagged = Ti.UI.createLabel({
			text: capsule.tags.length + " people tagged", 
			font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
			color:"#333333",
			left:10,
			top:105,
			height:"auto",
			width:"auto"
		});
		
		var created = Ti.UI.createLabel({
			text: Date.parse(capsule.created_at).toString("M/d/yy"),
			font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
			color:"#333333",
			left:10,
			top:120,
			height:"auto",
			width:"auto"
		});
		
		var mapview = Ti.Map.createView({
			mapType: Ti.Map.STANDARD_TYPE,
			height:60,
			width:60,
			top:40,
			right: 10,
			regionFit:true
		});

		view.add(avatar);
		view.add(name);
		view.add(user);
		view.add(tagged);
		view.add(created);
		view.add(mapview);
		
		var contents = flatten([capsule.comments, capsule.photos, capsule.videos]);

		refreshTable(contents);
	}
	
	delegate.getSingle(id, finish);
	
	table.addEventListener('click', delegate.showRowClicked);
	
	view.add(table);
	return view;
}
