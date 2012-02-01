Views.photos.create = function(delegate, capsule) {
	
	var win = Ti.UI.createWindow({
		title: "Add Photo",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});
	
	var placeholder = Ti.UI.createView({
		backgroundImage:"images/addnew/webcap_addcontent_photo_placeholder.png",
		height:116,
		width:180,
		top:60
	});
	
	win.add(placeholder);
	
	var progress_bar = Ti.UI.createProgressBar({
		min:0,
		max: 1,
		value:0,
		width:400,
		height:80,
		top: 20
	});
	
	var finish = function() {
		alert("Photo added!");
		Controllers.capsules.show(capsule.id, true);
	}
	
	var save = function(event) {
		var image = Helpers.images.resize(event.media,375,638);
		win.add(progress_bar);
		progress_bar.show();
		delegate.addPhoto(finish, {upload : image, capsule_id: capsule.id}, progress_bar);
	}
	
	var takePhoto = function() {
		Ti.Media.showCamera({	
			success:save,
			cancel:function(){ },
			error:function(error) { alert('Camera does not appear to be working: ' + error.code); },
			saveToPhotoGallery:true,
			allowEditing:false,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	var choosePhoto = function() {
		Ti.Media.openPhotoGallery({	
			success:save,
			cancel:function(){ },
			error:function(error) { alert('Camera does not appear to be working: ' + error.code); },
			allowEditing:false,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});	
	}

	var choose_photo = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_photo_choose_btn.png",
		width: 320,
		height:71,
		top:250
	});

	var take_photo = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_photo_take_btn.png",
		width: 320,
		height:71,
		top:320
	});
	
	win.add(choose_photo);
	win.add(take_photo);

	choose_photo.addEventListener('click', function(){ choosePhoto(); });
	take_photo.addEventListener('click', function(){ takePhoto(); });

	return win;
}
