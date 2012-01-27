Views.capsules.two_comments = function(capsule) {
	var view = Ti.UI.createView({
		background: "transparent"
	});
	
	var addComment = function(old_left, comment) {
		var left_padding = old_left+30;
		
		var comment_view = Ti.UI.createView({
			backgroundImage:"images/usershow/webcap_comment_thumbnail_4across.png",
			width:81,
			height:81
		});
	
		var body = Ti.UI.createLabel({
			text:comment.content, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			left:left_padding+10,
			top:3,
			left:12, 
			height:35,
			width:55
		});
	
		var avatar = UI.createAvatar({
			image: Helpers.Application.assetPath(comment.user.image), 
			left:left_padding+5,
			top:42,
			right:10,
			height:20,
			width:20,
			user: comment.user
		});
		
		comment_view.add(body);
		comment_view.add(avatar);
		view.add(comment_view);
		return left_padding;
	}
	
	reduce(addComment, 5, capsule.comments);
		
	return view;
}
