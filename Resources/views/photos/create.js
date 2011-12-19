Views.photos.create = function(delegate, capsule) {
	
	var win = Ti.UI.createWindow({
		title: "Add Photo",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
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
		Controllers.capsules.show(capsule.id);
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
			cancel:function(){ win.close(); },
			error:function(error) { alert('Camera does not appear to be working: ' + error.code); },
			saveToPhotoGallery:true,
			allowEditing:false,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	var choosePhoto = function() {
		Ti.Media.openPhotoGallery({	
			success:save,
			cancel:function(){ win.close(); },
			error:function(error) { alert('Camera does not appear to be working: ' + error.code); },
			allowEditing:false,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});	
	}

	var createTableViewRow = function(kind) {
		var row = Ti.UI.createTableViewRow({
			title: kind,
			kind: kind
		});

		return row;
	}

	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:250,
		bottom:0,
		data: map(createTableViewRow, ["Choose Photo", "Take Photo"])
	});

	table.addEventListener('click', function(e) {
		e.source.kind == "Choose Photo" ? choosePhoto() : takePhoto();
	});

	win.add(table);
	return win;
}
