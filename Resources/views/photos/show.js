Views.photos.show = function(photo) {
	var win = Ti.UI.createWindow({
		title: "Photos",
		backgroundColor: "white",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var getPage = function() {
		return '<html> \
		<head> \
		  <title>Expanded Image</title> \
		</head> \
		<body> \
		  <img src="'+Helpers.Application.assetPath(photo.full)+'" style="padding:0; margin:0 auto; width:100%; height: 100%;" /> \
		</body> \
		</html>'
	}
	
	var webview = Ti.UI.createWebView({
		scalesPageToFit: true,
		html: getPage(),
		width: "100%",
		height: "100%"
	});
	
	win.add(webview);
	
	return win;
}
