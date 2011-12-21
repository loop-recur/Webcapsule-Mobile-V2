Views.capsules.show = function(delegate, id) {
	var win = Ti.UI.createWindow({
		title: "Capsule",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
			
	var finish = function(capsule) {
		var mosaic = Views.capsules.mosaic(capsule, delegate.showRowClicked);
		win.add(mosaic);
		var top_bar = Views.capsules.top_bar(capsule);
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
		
		// BEGIN TAGS
		Ti.App.addEventListener("tagsAdded", function(e) {
			log("=======TAGS ADDED======");
			log(e.tags);
		});

		var tags = Ti.UI.createButton({
			title: "Tags",
			width: 150,
			height: 30,
			bottom: 10
		});

		tags.addEventListener('click', Controllers.tags.create.p(capsule));

		win.setLeftNavButton(tags);
		// END TAGS
	}
	
	delegate.getSingle(finish, {id: id});

	return win;
}
