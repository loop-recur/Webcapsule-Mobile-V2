Views.capsules.show = function(delegate, id) {
	var win = Ti.UI.createWindow({
		title: "Capsule",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});
			
	var finish = function(capsule) {
		var mosaic = Views.capsules.mosaic(capsule, delegate);
		win.add(mosaic);
		var top_bar = Views.capsules.top_bar(capsule, delegate);
		win.add(top_bar);
		
		var add_to_capsule = Ti.UI.createButton({
			title: "Add Content",
			width: 100,
			height: 30,
			bottom: 10
		});
		
		add_to_capsule.addEventListener('click', function(e) {
			Controllers.capsules.update(capsule);
		});

		win.setRightNavButton(add_to_capsule);
	}
	
	UI.feedButton(win);
	
	delegate.getSingle(finish, {id: id}, {preload: true});

	return win;
}
