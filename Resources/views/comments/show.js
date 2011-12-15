Views.comments.show = function(comment) {
	var win = Ti.UI.createWindow({
		title: "Comments",
		backgroundColor: "white"
	});
	
	var body = Ti.UI.createLabel({
		text:comment.content, 
		font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
		color:"#444444",
		left:10,
		top:100,
		height:"auto",
		width:"auto"
	});
	
	var avatar = Ti.UI.createImageView({
		image: Helpers.Application.assetPath(comment.user.image), 
		left:5,
		top:20,
		height:87,
		width:87
	});
	
	var user = Ti.UI.createLabel({
		text: "By " +comment.user.full_name, 
		font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
		color:"#333333",
		left:80,
		top:45,
		height:"auto",
		width:"auto"
	});
	
	
	win.add(body);
	win.add(avatar);
	win.add(user);
	
	return win;
}