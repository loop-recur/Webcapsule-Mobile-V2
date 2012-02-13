Main = null;
Nav = null;

Layouts.application = function(delegate) {
	Main = Ti.UI.createWindow({orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]});
	
	var win = Ti.UI.createWindow({
		title: "Feed",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		navBarHidden:false,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});
	
	var createNav = function() {
		Nav = Ti.UI.iPhone.createNavigationGroup({ window:win });		
		Main.add(Nav);
	}
	
	Main.resetNav = function(w) {
		Nav.close();
		Main.remove(Nav);
		createNav();
		setTimeout(function() { Nav.open(w); }, 200);
	}
	
	createNav();

	Main.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	delegate.root(win);
}
