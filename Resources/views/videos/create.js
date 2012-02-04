Views.videos.create = function(delegate, capsule) {	
	var win = Ti.UI.createWindow({
		title: "Add Video",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		barColor:"black"
	});
	
	var placeholder = Ti.UI.createView({
		backgroundImage:"images/addnew/webcap_addcontent_video_placeholder.png",
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
		Ti.API.info("\n\n\n========finshing!!!!=======\n\n\n");
		// alert("Video added!");
		Controllers.capsules.show(capsule.id, true);
	}
	
	var save = function(e) {
		Ti.API.info("\n\n\n========sAVE!!!!!=======\n\n\n");
		var video = {upload : e.media, capsule_id: capsule.id};
		Ti.API.info("\n\n\n========ADD PBAR=======\n\n\n");
		win.add(progress_bar);
		progress_bar.show();
		Ti.API.info("\n\n\n========ADD PBAR done=======\n\n\n");
		delegate.addVideo(finish, video, progress_bar);
		Ti.API.info("\n\n\n========delegate done=======\n\n\n");
	}

	var edit = defn(function(saveIt, e) {
		if(saveIt) Ti.Media.saveToPhotoGallery(e.media);
		
		Ti.API.info("\n\n\n========start editing=======\n\n\n");
		setTimeout(function() {
			Ti.Media.startVideoEditing({
				media: e.media,
				videoQuality: Ti.Media.QUALITY_MED,
				success:save
			});
		}, 500);
	});

	var takeVideo = function() {
		Ti.Media.showCamera({
			success: edit(true),
			cancel:function(){},
			error:function(error){ alert('Camera does not appear to be working: ' + error.code); },
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
			autohide:true
		});
	}

	var chooseVideo = function() {
		Ti.Media.openPhotoGallery({
			success: edit(false),
			cancel:function(){},
			error:function(error){ alert('Camera does not appear to be working: ' + error.code); },
			allowEditing:true,
			videoQuality: Ti.Media.QUALITY_MED,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
		});	
	}
	
	
	var choose_video = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_video_choose_btn.png",
		width: 320,
		height:71,
		top:250
	});

	var take_video = Ti.UI.createButton({
		backgroundImage:"images/addnew/webcap_add_video_take_btn.png",
		width: 320,
		height:71,
		top:320
	});
	
	win.add(choose_video);
	win.add(take_video);

	choose_video.addEventListener('click', function(){ chooseVideo(); });
	take_video.addEventListener('click', function(){ takeVideo(); });

	return win;

}
