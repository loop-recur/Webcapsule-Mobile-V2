Views.capsules.mosaic = function(capsule, rowClicked) {	
	var contents = flatten([capsule.comments, capsule.photos, capsule.videos, capsule.websnippets]);
	
	var left_margin = 10;
	var top_margin = 10;
	
	var view = Ti.UI.createScrollView({
		backgroundColor:"transparent",
		height: 200,
		width:320,
		contentWidth:318,
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:false,
		bottom:0,
		left:0
	});
	
	var makeWebsnippet = function(websnippet) {
		var websnippet_view = Ti.UI.createView({
			backgroundColor:"transparent",
		});
	
		var body = Ti.UI.createLabel({
			text:websnippet.body, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			left:10,
			top:10,
			height:"auto",
			width:"auto"
		});
	
		var avatar = UI.createAvatar({
			image: Helpers.Application.assetPath(websnippet.user.image), 
			left:5,
			top:40,
			height:20,
			width:20,
			id: websnippet.user_id
		});
	
		var user = Ti.UI.createLabel({
			text: "By " +websnippet.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"11dp",fontWeight:'regular'},
			color:"#333333",
			left:20,
			top:45,
			height:"auto",
			width:"auto"
		});
		
		websnippet_view.add(body);
		websnippet_view.add(avatar);
		websnippet_view.add(user);
		return websnippet_view;
	}
	
	var makeComment = function(comment) {
		var comment_view = Ti.UI.createView({
			backgroundColor:"transparent",
		});
	
		var body = Ti.UI.createLabel({
			text:comment.content, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			left:10,
			top:10,
			height:"auto",
			width:"auto"
		});
	
		var avatar = UI.createAvatar({
			image: Helpers.Application.assetPath(comment.user.image), 
			left:5,
			top:40,
			height:20,
			width:20,
			id: comment.user.id
		});
	
		var user = Ti.UI.createLabel({
			text: "By " +comment.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"11dp",fontWeight:'regular'},
			color:"#333333",
			left:20,
			top:45,
			height:"auto",
			width:"auto"
		});
		
		comment_view.add(body);
		comment_view.add(avatar);
		comment_view.add(user);
		return comment_view;
	}
	
	var makeVideo = function(video) {
		return image_view = Ti.UI.createImageView({
			image:Helpers.Application.assetPath(video.screenshot),
			width: 'auto',
			height: 'auto'
		});
	}
	
	var makePhoto = function(photo) {
		return image_view = Ti.UI.createImageView({
			image:Helpers.Application.assetPath(photo.thumb)
		});
	}
	
	var addContent = function(top, left, content) {
		var content_view;
		if(content.kind == "photos") content_view = makePhoto(content);
		if(content.kind == "comments") content_view = makeComment(content);
		if(content.kind == "videos") content_view = makeVideo(content);
		if(content.kind == "websnippets") content_view = makeWebsnippet(content);
		
		content_view.top = top;
		content_view.left = left;
		content_view.id = content.id;
		content_view.kind = content.kind;
		content_view.content = content;
		content_view.borderColor = "black";
		content_view.borderWidth = 1;
		content_view.borderRadius = 1;
		content_view.width = 80;
		content_view.height = 80;
		

		view.add(content_view);
		
		content_view.addEventListener('click', rowClicked);
	}
	
	var buildContent = function(position, content) {
		var horizontal_spacing = 80
		, vertical_spacing = 80
		, new_left = position.left + horizontal_spacing
		, new_top = position.top;
		
		addContent(position.top, position.left, content);
		
		if(new_left > 400) {
			new_top = position.top + vertical_spacing;
			new_left = 0;
		}
		
		return {left: new_left, top: new_top}
	}
	
	reduce(buildContent, {left : 0, top : 35}, contents);
	
	Ti.App.addEventListener('expand', function(e) {
		view.height = 200;
	});
	
	Ti.App.addEventListener('collapse', function(e) {
		view.height = 350;
	});
	
	return view;
}