Views.capsules.mosaic = function(capsule, delegate) {	
	var contents = delegate.getContents(capsule);
	
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
			backgroundImage:"images/usershow/webcap_comment_thumbnail.png",
			height:110,
			width:110
		});
		
		var body = Ti.UI.createLabel({
			text:websnippet.body, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			top:10,
			height:56,
			width:76
		});
	
		var avatar = UI.createAvatar({
			image: Helpers.Application.assetPath(websnippet.user.image), 
			right:17,
			bottom:22,
			height:20,
			width:20,
			user: websnippet.user
		});

		websnippet_view.add(body);
		websnippet_view.add(avatar);
		return websnippet_view;
	}
	
	var makeComment = function(comment) {
		var comment_view = Ti.UI.createView({
			backgroundImage:"images/usershow/webcap_comment_thumbnail.png",
			height:110,
			width:110
		});
	
		var body = Ti.UI.createLabel({
			text:comment.content, 
			font:{fontFamily:'GillSans',fontSize:"11dp",fontWeight:'regular'},
			color:"#444444",
			top:10,
			height:56,
			width:76
		});
	
		var avatar = UI.createAvatar({
			image: Helpers.Application.assetPath(comment.user.image), 
			right:17,
			bottom:22,
			height:20,
			width:20,
			user: comment.user
		});
		
		comment_view.add(body);
		comment_view.add(avatar);
		return comment_view;
	}
	
	var makeVideo = function(video) {
		return image_view = Ti.UI.createImageView({
			image:Helpers.Application.assetPath(video.screenshot),
			width: 'auto',
			height: 'auto',
			backgroundColor:"#757171"
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
		
		content_view.index = contents.indexOf(content);
		content_view.capsule = capsule;
		content_view.top = top;
		content_view.left = left;
		content_view.borderColor = "transparent";
		content_view.borderWidth = 1;
		content_view.borderRadius = 1;
		content_view.width = 110;
		content_view.height = 110;
		

		view.add(content_view);
		
		content_view.addEventListener('click', delegate.mosaicClicked);
	}
	
	var buildContent = function(position, content) {
		var horizontal_spacing = 110
		, vertical_spacing = 110
		, new_left = position.left + horizontal_spacing
		, new_top = position.top;
		
		addContent(position.top, position.left, content);
		
		if(new_left > 250) {
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