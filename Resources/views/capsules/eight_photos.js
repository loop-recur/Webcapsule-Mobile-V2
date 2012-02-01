Views.capsules.eight_photos = function(capsule) {
	var view = Ti.UI.createView({
		top:0,
		backgroundColor: "transparent",
		width:'auto'
	});
	
	function addImage(old_left, photo) {
		var left_padding = old_left+115;
		
		var image = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(photo.url),
			left:old_left+10,
			height:100,
			width:110
		});

		view.add(image);
		return left_padding;
	}
	
	reduce(addImage, 5, capsule.photos);
	
	return view;
}
