Views.videos.show = function(video) {	
	var win = Ti.UI.createWindow({
		title: "Videos",
		backgroundColor: "white"
	});
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		url:Helpers.Application.assetPath(video.url)
	});
	
	win.add(player);
	
	return win;
}
