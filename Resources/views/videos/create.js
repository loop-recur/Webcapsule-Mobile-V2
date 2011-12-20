Views.videos.create = function(delegate, capsule) {	
	var win = Ti.UI.createWindow({
		title: "Add Video",
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
		alert("Video added!");
		Controllers.capsules.show(capsule.id);
	}
	
	var save = function(e) {
		var video = {upload : e.media, capsule_id: capsule.id};
		win.add(progress_bar);
		progress_bar.show();
		delegate.addVideo(finish, video, progress_bar);
	}

	var edit = function(e) {
		Ti.Media.saveToPhotoGallery(e.media);
		Ti.Media.startVideoEditing({
			media: e.media,
			videoQuality: Ti.Media.QUALITY_MED,
			success:save
		});
	}

	var takeVideo = function() {
		Ti.Media.showCamera({
			success: edit,
			cancel:function(){ win.close(); },
			error:function(error){ alert('Camera does not appear to be working: ' + error.code); },
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
			autohide:true
		});
	}

	var chooseVideo = function() {
		Ti.Media.openPhotoGallery({
			success: edit,
			cancel:function(){ win.close(); },
			error:function(error){ alert('Camera does not appear to be working: ' + error.code); },
			allowEditing:true,
			videoQuality: Ti.Media.QUALITY_MED,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
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
		data: map(createTableViewRow, ["Choose Video", "Take Video"])
	});

	table.addEventListener('click', function(e) {
		e.source.kind == "Choose Video" ? chooseVideo() : takeVideo();
	});

	win.add(table);
	return win;

}
