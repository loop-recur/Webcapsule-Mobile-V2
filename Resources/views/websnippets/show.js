Views.websnippets.show = function(websnippet) {
	var win = Ti.UI.createView({
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
	});	
	
	var body = Ti.UI.createLabel({
		text:websnippet.body, 
		font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
		color:"#444444",
		left:10,
		top:120,
		height:"auto",
		width:"auto"
	});
	
	var avatar = UI.createAvatar({
		image: Helpers.Application.assetPath(websnippet.user.image), 
		left:5,
		top:20,
		height:87,
		width:87,
		user: websnippet.user
	});
	
	var user = Ti.UI.createLabel({
		text: "By " +websnippet.user.full_name, 
		font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
		color:"#333333",
		left:100,
		top:45,
		height:"auto",
		width:"auto"
	});
	
	
	win.add(body);
	win.add(avatar);
	win.add(user);
	
	return win;
}