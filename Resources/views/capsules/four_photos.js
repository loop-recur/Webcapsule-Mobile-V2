Views.capsules.four_photos = function(capsule) {
	var view = Ti.UI.createScrollView({
		width:320,
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:false,
	});
	
	function addImage(old_left, photo) {
		var left_padding = old_left+90;
		
		var image = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(photo.url),
			left:old_left+10,
			height:70,
			width:80
		});

		view.add(image);
		return left_padding;
	}
	
	reduce(addImage, 5, capsule.photos);
	
	return view;
}
