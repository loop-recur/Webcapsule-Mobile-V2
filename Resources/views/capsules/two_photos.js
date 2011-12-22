Views.capsules.two_photos = function(capsule) {
	var view = Ti.UI.createView({
		background: "transparent"
	});
	
	function addImage(old_left, photo) {
		var left_padding = old_left+90;
		
		var image = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(photo.url),
			left:old_left+10,
			height:87,
			width:87
		});

		view.add(image);
		return left_padding;
	}
	
	reduce(addImage, 5, capsule.photos);
	
	return view;
}
