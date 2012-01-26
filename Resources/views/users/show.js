Views.users.show = function(delegate, user) {
	var page_text_color = "#B1B2B4";
	
	var win = Ti.UI.createWindow({
		title: "User",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var follow_button = Ti.UI.createButton({
		width: 80,
		height: 30,
		right:10
	});
	
	var info_view = Ti.UI.createView({
		backgroundImage:"images/backgrounds/webcap_capsule_info_overlay.png",
		top:0,
		height:150
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
		font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
		color:page_text_color,
		left:80,
		top:9,
		height:60,
		width:138
	});
	
	info_view.add(name);
	
	var views_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_stats_views_icon.png",
		height:14,
		width:18,
		left:12,
		top:90
	});
	
	info_view.add(views_icon);
	
	var following_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_stats_webcapsule_icon.png",
		height:14,
		width:18,
		left:65,
		top:105
	});
	
	info_view.add(following_icon);
	
	var followers_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_stats_followers_icon.png",
		height:14,
		width:18,
		left:122,
		top:120
	});
	
	info_view.add(followers_icon);
	
	var webcapsules_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_stats_webcapsules_icon.png",
		height:14,
		width:18,
		left:175,
		top:135
	});
	
	info_view.add(webcapsules_icon);
	
	var views_count = Ti.UI.createLabel({
		text:user.view_count,
		font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
		color:page_text_color,
		left:33,
		top:90,
		width:30,
		height:21
	});
	
	info_view.add(views_count);
	
	
	var followers_count = Ti.UI.createLabel({
		text:user.view_count,
		font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
		color:page_text_color,
		left:33,
		top:105,
		width:30,
		height:21
	});
	
	info_view.add(followers_count);
	
	var followees_count = Ti.UI.createLabel({
		text:user.capsule_count,
		font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
		color:page_text_color,
		left:33,
		top:120,
		width:30,
		height:21
	});
	
	info_view.add(followees_count);
	
	var webcapsule_count = Ti.UI.createLabel({
		text:user.capsule_count,
		font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
		color:page_text_color,
		left:33,
		top:135,
		width:30,
		height:21
	});
	
	info_view.add(webcapsule_count);
	
	if(App.getCurrentUser().id != user.id) info_view.add(follow_button);
	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:105,
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
		follow_button.title = isFollowing() ? "Unfollow" : "Follow";
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
	win.add(info_view);
	
	return win;
}
