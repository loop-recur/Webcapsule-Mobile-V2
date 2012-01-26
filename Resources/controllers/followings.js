Controllers.followings = (function() {
	var Api = RestApi("followings");
	
	var _refreshUser = function(cb) {
		Controllers.authentications.refreshUser(cb);
	}
	
	var all = Api.all;
		
	var create = function(cb, attrs) {
		Ti.API.info("\n\n\n========create=======\n\n\n");
		Api.save(_refreshUser.p(cb), attrs);
	}
	
	var destroy = function(cb, attrs) {
		Api.destroy(_refreshUser.p(cb), attrs);
	}
	
	var isFollowing = function(id) {
		return (App.getCurrentUser().following_ids || []).indexOf(id) >= 0;
	}
	
	return {all: all, create: create, destroy: destroy, isFollowing: isFollowing}
})();
