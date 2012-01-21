Views.capsules.update = function(delegate, capsule) {
	var view = Ti.UI.createWindow({
		title: "Add Content",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var add_content_label = Ti.UI.createLabel({
		font:{fontFamily:'HelveticaNeue',fontSize:"20dp",fontWeight:'light'},
		color:"#515151",
		text:'Add Capsule Content',
		top:30,
		height:22,
		textAlign:"center"
	});
	
	view.add(add_content_label);
	
	var add_photo = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_content_photo.png",
		backgroundSelectedImage:"images/addnew/webcap_add_content_photo_active.png",
		height:133,
		width:133,
		top:70,
		left:25,
		kind:"photos"
	});
	
	var add_video = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_content_video.png",
		backgroundSelectedImage:"images/addnew/webcap_add_content_video_active.png",
		height:133,
		width:133,
		top:70,
		right:25,
		kind:"videos"
	});
	
	var add_comment = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_content_comment.png",
		backgroundSelectedImage:"images/addnew/webcap_add_content_comment_active.png",
		height:133,
		width:133,
		top:206,
		left:25,
		kind:"comments"
	});
	
	var add_websnippet = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_content_websnippet.png",
		backgroundSelectedImage:"images/addnew/webcap_add_content_websnippet_active.png",
		height:133,
		width:133,
		top:206,
		right:25,
		kind:"websnippets"
	});
	
	view.add(add_photo);
	view.add(add_video);
	view.add(add_comment);
	view.add(add_websnippet);
	
	
	add_photo.addEventListener('click', delegate.addContent(capsule));
	add_video.addEventListener('click', delegate.addContent(capsule));
	add_comment.addEventListener('click', delegate.addContent(capsule));
	add_websnippet.addEventListener('click', Controllers.websnippets.init.p(capsule.id));

	return view;
}