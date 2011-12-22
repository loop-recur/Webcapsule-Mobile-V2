Views.capsules.video_screenshot = function(capsule) {
	var view = Ti.UI.createView({
		background: "transparent"
	});

	var screenshot = Ti.UI.createImageView({
		image: Helpers.Application.assetPath(first(capsule.videos).screenshot),
		height:87,
		width:87
	});

	view.add(screenshot);
		
	return view;
}
