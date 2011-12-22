Helpers.user = {};

Helpers.user.canEdit = function(item, capsule) {
	var user = App.getCurrentUser();

	function isItemCreator() {
		return item.user_id && item.user_id == user.id
	};
	
	function isStoryCreator() {
		if(!capsule) return false;
		return item.capsule_id && item.capsule_id == capsule.id && capsule.user_id == user.id
	};
	
	return isItemCreator() || isCapsuleCreator();
};


Helpers.user.connectFacebook = function(callbacks) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'facebook.config');
	
	Ti.Facebook.loggedIn ? saveFacebookAuth() : Ti.Facebook.authorize();	
	
	var run = false;
	Ti.Facebook.addEventListener('login', function(e) {
		if(!run) {
			run = true;
			file.write(JSON.stringify(e.data));
			saveFacebookAuth();
		}
	});
	
	function saveFacebookAuth() {
		var data = JSON.parse(file.read());
		
		if(data) {
			data.provider = "facebook";
			data.token = Ti.Facebook.accessToken;
			App.action(undefined, "omniauth_callbacks#create", {
				data : data,
				success : callbacks.success,
				error : callbacks.error
			});
		} else {
			callbacks.error();
		}
	};
};

Helpers.user.connectTwitter = function(callbacks) {
	Ti.API.info("making new birdhouse");
	b = new BirdHouse({consumer_key: "CgIDnN8kDKPu1uKhMK5Qg", consumer_secret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI", callback_url: "/webcapsule://" });
	b.authorize(saveTwitterAuth);
	
	function saveTwitterAuth(data) {
		if(data) {
			Ti.API.info("data!");
			data.id = data.user_id;
			data.token = data.oauth_token;
			data.secret = data.oauth_token_secret;
			data.provider = "twitter";
			App.action(undefined, "omniauth_callbacks#create", {
				data : data,
				success : callbacks.success,
				error : callbacks.error
			});
		}	else {
			Ti.API.info("no data");
			callbacks.error();
			b.deauthorize();
		}
	};
};
