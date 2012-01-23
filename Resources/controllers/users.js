Controllers.users = (function() {
	var Api = RestApi("users");
	var self = {};
	
	var show = function(user) {
		Nav.open(Views.users.show(self, user));
	}
	
// delegate methods
	
	self.getData = function(cb, user_id) {
		Api.all(cb, {id: user_id});
	};

	return {show : show}
})();
