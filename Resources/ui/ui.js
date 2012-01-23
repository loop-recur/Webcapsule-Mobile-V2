UI.createAvatar = function(attrs) {	
	var image = Ti.UI.createImageView(merge(attrs, {zIndex: 99}));
	
	image.addEventListener('click', function() {
		Controllers.users.show(attrs.user);
	});
	
	return image;
}
