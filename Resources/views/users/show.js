Views.users.show = function(delegate, user) {
	var page_text_color = "#B1B2B4";
	
	var win = Ti.UI.createWindow({
		title: "User",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		barColor:"black"
	});
	
	var follow_button = Ti.UI.createButton({
		width: 91,
		left:80,
		height: 23,
		top: 50
	});
	
	var info_view = Ti.UI.createView({
		backgroundImage:"images/backgrounds/webcap_capsule_info_overlay.png",
		top:0,
		height:115
	});
	
	var stats_view = Ti.UI.createView({
		top:35,
		right:10,
		height:60,
		width:130
	});
	
	var avatar = UI.createAvatar({
		image: Helpers.Application.assetPath(user.image), 
		left:12,
		top:12,
		height:59,
		width:59,
		user: user
	});
	
	info_view.add(avatar);
	
	var name = Ti.UI.createLabel({
		text:user.full_name, 
		font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'},
		color:page_text_color,
		left:80,
		top:12,
		height:20,
		width:130
	});
	
	info_view.add(name);
	
	var views_icon = Ti.UI.createView({
		backgroundImage:"images/usershow/webcap_user_views_number.png",
		height:12,
		width:14,
		left:0,
		top:0
	});
	
	stats_view.add(views_icon);
	
	var following_icon = Ti.UI.createView({
		backgroundImage:"images/usershow/webcap_user_followers_number.png",
		height:12,
		width:14,
		left:0,
		top:15
	});
	
	stats_view.add(following_icon);
	
	var followers_icon = Ti.UI.createView({
		backgroundImage:"images/usershow/webcap_user_following_number.png",
		height:12,
		width:14,
		left:0,
		bottom:15
	});
	
	stats_view.add(followers_icon);
	
	var webcapsules_icon = Ti.UI.createView({
		backgroundImage:"images/usershow/webcap_user_wc_number.png",
		height:12,
		width:14,
		left:0,
		bottom:0
	});
	
	stats_view.add(webcapsules_icon);
	
	var views_count = Ti.UI.createLabel({
		text:"views " + user.view_count,
		font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
		color:page_text_color,
		left:18,
		top:0,
		width:"auto",
		height:12
	});
	
	stats_view.add(views_count);
	
	
	var followers_count = Ti.UI.createLabel({
		text:"followers: " + user.view_count,
		font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
		color:page_text_color,
		left:18,
		top:15,
		width:"auto",
		height:12
	});
	
	stats_view.add(followers_count);
	
	var followees_count = Ti.UI.createLabel({
		text:"following: " + user.capsule_count,
		font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
		color:page_text_color,
		left:18,
		bottom:15,
		width:"auto",
		height:12
	});
	
	stats_view.add(followees_count);
	
	var webcapsule_count = Ti.UI.createLabel({
		text:"webcapsules: " + user.capsule_count,
		font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
		color:page_text_color,
		left:18,
		bottom:0,
		width:"auto",
		height:12
	});
	
	stats_view.add(webcapsule_count);
	
	if(App.getCurrentUser().id != user.id) info_view.add(follow_button);
	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:120,
		bottom:0,
		separatorColor:'transparent'
	});
	
	var refreshTable = function(data) {
		tableView.setData(map(Views.capsules.feedRow, data));
	}
	
	var isFollowing = function() {
		return Controllers.followings.isFollowing(user.id);
	}
	
	var updateButton = function() {		
		// follow_button.title = isFollowing() ? "Unfollow" : "Follow";
		follow_button.backgroundImage = isFollowing() ? "images/usershow/webcap_user_unfollow_btn.png" : "images/usershow/webcap_user_follow_btn.png";
	}
	
	var follow = function() {
		var method = isFollowing() ? 'destroy' : 'create';
		Controllers.followings[method](updateButton, {id: user.id});
	}
	
	var setupButton = function() {
		updateButton();
		follow_button.addEventListener('click', follow);
	}

	setupButton();
	
	delegate.getData(refreshTable, user.id);
		
	win.add(tableView);
	info_view.add(stats_view);
	win.add(info_view);
	
	return win;
}
