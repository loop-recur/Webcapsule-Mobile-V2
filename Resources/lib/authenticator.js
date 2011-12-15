Authenticator = (function() {

var _setHttpAuth = defn(function(type, file_contents) {
	App.http_client[type] = file_contents.toString();
	return App.http_client[type];
});

var _validate = function(type) {
	var file = FileCache.get(type);
	if(file.exists()) return _setHttpAuth(type, file.read());
}

var _makeAuthString = function(username, password) {
	return 'Basic ' + Ti.Utils.base64encode(username+":"+password);	
}
	
var isAuthenticated = function() {
	return _validate('credentials') || _validate('auth_token');
}

var authenticate = function(username, password) {
	var authstr = makeAuthString(username, password);
	App.http_client.credentials = authstr;
}

var setCredentials = compose(_setHttpAuth('credentials'), _makeAuthString);
var storeCredentials = compose(FileCache.set('credentials'), _makeAuthString);

return { isAuthenticated: isAuthenticated,
				authenticate: authenticate,
				storeCredentials: storeCredentials,
				setCredentials: setCredentials }

})();
