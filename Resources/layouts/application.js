Nav = null;

Layouts.application = function(delegate) {
	var main = Ti.UI.createWindow();
	
	var win = Ti.UI.createWindow({
		title: "Feed",
		navBarHidden:false
	});
	
	delegate.root(win);
	
	Nav = Ti.UI.iPhone.createNavigationGroup({
	  window:win
	});
	
	main.add(Nav);

	main.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
}
