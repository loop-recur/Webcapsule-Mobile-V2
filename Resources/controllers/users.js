Controllers.users = (function() {
	var Api = RestApi("users");
	var self = {};
	
	var show = function(user) {
		Nav.open(Views.users.show(self, user));
	}
	
// delegate methods
	
	self.getData = Api.all;

	return {show : show}
})();
