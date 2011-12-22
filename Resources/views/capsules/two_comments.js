Views.capsules.two_comments = function(capsule) {
	var view = Ti.UI.createView({
		background: "transparent"
	});
	
	var addComment = function(old_left, comment) {
		var left_padding = old_left+30;
		
		var comment_view = Ti.UI.createView({
			backgroundColor:"#8E9DA4",
			width:90,
			height:68
		});
	
		var body = Ti.UI.createLabel({
			text:comment.content, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			left:left_padding+10,
			top:10,
			left:10, 
			height:"auto",
			width:"auto"
		});
	
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(comment.user.image), 
			left:left_padding+5,
			top:40,
			left:10,
			height:20,
			width:20
		});
	
		var user = Ti.UI.createLabel({
			text: "By " +comment.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"11dp",fontWeight:'regular'},
			color:"#333333",
			left:left_padding+20,
			top:45,
			right:5,
			height:"auto",
			width:"auto"
		});
		
		comment_view.add(body);
		comment_view.add(avatar);
		comment_view.add(user);
		view.add(comment_view);
		return left_padding;
	}
	
	reduce(addComment, 5, capsule.comments);
		
	return view;
}
