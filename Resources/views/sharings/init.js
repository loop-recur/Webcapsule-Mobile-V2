Views.sharings.init = function(capsule_id, delegate) {
	var sharing = {message: "Check out this capsule!", capsule_id: capsule_id};
	
	var win = Ti.UI.createWindow({
		width: 306,
		height: 110,
		modal: true,
		modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT,
		navBarHidden:true
	});
	
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
		
	var share_button = Ti.UI.createButton({
		title: "share",
  	right:5,
    width:83,
    height:49
	});
	
	var finish = function() {
		win.close();
	}

	share_button.addEventListener('click', function() {
		delegate.create(finish, sharing);
	});

	var facebook_button = Ti.UI.createButton({
		backgroundImage:"images/sharestory/fb_not_sharing.png",
		height:41,
		width:43,
		left:50
	});
	
	var twitter_button = Ti.UI.createButton({
		backgroundImage:"images/sharestory/tw_not_sharing.png",
		height:41,
		width:43,
		left:122
	});
	
	var cancel_button = Ti.UI.createButton({
		title:'X',
		right:5,
		top:3,
		width: 25,
		height: 25,
		zIndex:30
	});
	
	cancel_button.addEventListener('click', finish);
	
	win.add(share_button);
	win.add(facebook_button);
	win.add(twitter_button);
	win.add(cancel_button);
	
	win.open();

	if(facebook) toggleFacebook();
	if(twitter) toggleTwitter();
	
	facebook_button.addEventListener('click', function() {
		facebook ? toggleFacebook() : connectFacebook();
	});
	
	twitter_button.addEventListener('click', function() {
		twitter ? toggleTwitter() : connectTwitter();
	});
		
	function toggleFacebook() {
		if(facebook_button.backgroundImage == 'images/sharestory/fb_not_sharing.png') {
			sharing.facebook = facebook.id;
			facebook_button.backgroundImage = 'images/sharestory/fb_sharing.png';
		} else {
			facebook_button.backgroundImage = 'images/sharestory/fb_not_sharing.png';
			sharing.facebook = null;
		}
	}
	
	function toggleTwitter(state) {
		if(twitter_button.backgroundImage == 'images/sharestory/tw_not_sharing.png') {
			twitter_button.backgroundImage = "images/sharestory/tw_sharing.png";
			sharing.twitter = twitter.id;
		} else {
			twitter_button.backgroundImage = 'images/sharestory/tw_not_sharing.png';
			sharing.twitter = null;
		}
	}
	
	function getAuth(name, user) {
		if(!user) user = App.getCurrentUser();
		var auth = select(".authentication.provider == '"+name+"'", user.authentications)[0];
		return auth ? auth.authentication : null;
	};
	
	function connectFacebook() {
		Helpers.user.connectFacebook(function(user) {
			facebook = getAuth('facebook', user);
			toggleFacebook();
		});
	}
	
	function connectTwitter() {
		Helpers.user.connectTwitter(function(user) {
			twitter = getAuth('twitter', user);
			toggleTwitter();
		});
	}
	
};
