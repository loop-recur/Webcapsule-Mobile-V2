Views.capsules.new_capsule = function(capsule) {
	var view = Ti.UI.createView({
		background: "transparent"
	});

	var name = Ti.UI.createLabel({
		text: capsule.name,
		font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
		left:80,
		top:9,
		height:60,
		width:138
	});

	view.add(name);
		
	return view;
}
