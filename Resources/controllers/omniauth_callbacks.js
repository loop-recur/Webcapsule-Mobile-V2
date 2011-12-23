Controllers.omniauth_callbacks = (function() {
	var Api = RestApi("omniauth_callbacks");
	
	var create = function(cb, data) {
		
		var finish = function(user) {
			if(!user) {return params.error()};
			App.setCurrentUser(user);
			App.http_client.auth_token = user.authentication_token;
			Authenticator.storeAuthToken(user.authentication_token);
			Controllers.application.index();
			cb(user);
		}
		
		Api.save(finish, data);
	}
	
	return {create: create}
})();
