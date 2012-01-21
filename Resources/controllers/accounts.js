Controllers.accounts = (function() {
	var Api = RestApi("accounts");
	var self = {};
	
	var init = function() {
		return Views.accounts.init(self);
	}
	
	self.create = function(cb, account) {
		Api.save({
			success: Controllers.authentications.signIn.p(cb, account.username, account.password),
			error: function(e) { alert(ValidationErrors.toSentence(e)); }
		}, account);
	}
	
	return {init : init}
})();
