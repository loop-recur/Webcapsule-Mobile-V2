Controllers.authentications = (function() {
	var Api = RestApi("accounts");
	var self = {};

	self.login_with_credentials = function(username, password, cb) {
		Authenticator.setCredentials(username, password);
		
		Api.all({
			success: signIn.p(cb, username, password),
			error: function() { alert("Invalid Login"); }
		});
	}
	
	var index = Layouts.login.curry(self);
	
	var signIn = function(cb, username, password, user) {
		App.setCurrentUser(user);
		Authenticator.storeCredentials(username, password);
		Controllers.application.index();
		cb();
	}
	
	var refreshUser = function(cb) {
		Api.all(compose(cb, App.setCurrentUser));
	}
	
	return {index : index, signIn: signIn, refreshUser: refreshUser}
})();
