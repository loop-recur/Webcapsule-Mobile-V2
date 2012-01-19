Views.photos.show = function(photo) {
	var win = Ti.UI.createWindow({
		title: "Photos",
		backgroundColor: "white",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var image = Ti.UI.createImageView({
		image: Helpers.Application.assetPath(photo.url), 
		top:20,
		height:'auto',
		width:'auto'
	});
	
	win.add(image);
	
	return win;
}