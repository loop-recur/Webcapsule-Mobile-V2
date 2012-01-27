Nav = null;

Layouts.application = function(delegate) {
	var main = Ti.UI.createWindow({
		//barColor:'black'
	});
	
	var win = Ti.UI.createWindow({
		title: "Feed",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		navBarHidden:false,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	
	Nav = Ti.UI.iPhone.createNavigationGroup({
	  window:win
	});
	
	main.add(Nav);

	main.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	delegate.root(win);
}
