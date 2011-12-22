Views.videos.show = function(video) {	
	var win = Ti.UI.createWindow({
		title: "Videos",
		backgroundColor: "white",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var player = Ti.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		url:Helpers.Application.assetPath(video.url)
	});
	
	win.add(player);
	
	return win;
}
