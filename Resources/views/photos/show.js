Views.photos.show = function(photo) {
	var win = Ti.UI.createView({});
	
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
