Views.sharings.init = function(capsule_id, delegate) {
	var sharing = {message: "Check out this capsule!", capsule_id: capsule_id};
	
	var model = Ti.UI.createWindow({
		backgroundColor:"black",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	
	var win = Ti.UI.createView({
		width: 320,
		height: 376,
		navBarHidden:true,
		backgroundImage:"images/share/webcap_share_modal_with_icons.png",
		barColor:"black"
	});
	
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
		
	var share_button = Ti.UI.createButton({
		backgroundImage:"images/share/webcap_share_modal_share_btn.png",
		height:69,
		width:320,
		bottom:100
	});
	
	var cancel_button = Ti.UI.createButton({
		backgroundImage:"images/share/webcap_share_modal_cancel_btn.png",
		width: 320,
		height: 61,
		bottom:40,
		zIndex:30
	});
	
	var finish = function() {
		model.close();
	}

	share_button.addEventListener('click', function() {
		delegate.create(finish, sharing);
	});
	
	var facebook_switch = Ti.UI.createSwitch({
		value:false,
		top: 85,
		right: 90
	});
	
	var twitter_switch = Ti.UI.createSwitch({
		value:false,
		top: 135,
		right: 90
	});
	

	cancel_button.addEventListener('click', finish);
	
	win.add(share_button);
	win.add(facebook_switch);
	win.add(twitter_switch);
	win.add(cancel_button);
	
	model.add(win);
	model.open();
	
	facebook_switch.addEventListener('change', function(e) {
		facebook ? toggleFacebook(e.value) : connectFacebook(e.value);
	});
	
	twitter_switch.addEventListener('change', function(e) {
		twitter ? toggleTwitter(e.value) : connectTwitter(e.value);
	});
		
	function toggleFacebook(value) {
		Ti.API.info("\n\n\n========TOGGLING FACEBOOK=======\n\n\n");
		sharing.facebook = (value ? facebook.id : null);
		Ti.API.info("\n\n\n========sharing fb id is now "+sharing.facebook+"=======\n\n\n");
	}
	
	function toggleTwitter(value) {
		sharing.twitter = (value ? twitter.id : null);
	}
	
	function getAuth(name, user) {
		if(!user) user = App.getCurrentUser();
		var auth = select(".authentication.provider == '"+name+"'", user.authentications)[0];
		return auth ? auth.authentication : null;
	};
	
	function connectFacebook(value) {
		if(!value) return;
		Helpers.user.connectFacebook(function(user) {
			facebook = getAuth('facebook', user);
			toggleFacebook(true);
		});
	}
	
	function connectTwitter(value) {
		if(!value) return;
		Helpers.user.connectTwitter(function(user) {
			twitter = getAuth('twitter', user);
			toggleTwitter(true);
		});
	}
	
};
