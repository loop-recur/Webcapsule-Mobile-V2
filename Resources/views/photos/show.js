Views.photos.show = function(photo) {
	var win = Ti.UI.createWindow({
		title: "Photos",
		backgroundColor: "white"
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