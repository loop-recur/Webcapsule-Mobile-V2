Controllers.authentications = (function() {
	var Api = RestApi("accounts");
	var self = {};
	
	self.login_with_credentials = function(username, password, cb) {
		Authenticator.setCredentials(username, password);
		
		Api.all({
			success: function(user) {
				App.setCurrentUser(user);
				Authenticator.storeCredentials(username, password);
				Controllers.application.index();
				cb();
			},
			error: function() { alert("Invalid Login"); }
		});
	}
	
	var index = Layouts.login.curry(self);
	
	return {index : index}
})();
