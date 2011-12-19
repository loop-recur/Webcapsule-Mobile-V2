Helpers.images = {};

Helpers.images.resize = function(image, width, height) {
	var imageView = Ti.UI.createImageView({
           image:image,
           width:width,
           height:height
       });

  return imageView.toImage();
}
