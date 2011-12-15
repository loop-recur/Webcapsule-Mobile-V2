LoopRecur.HttpClient = function() {
	var current_client;
	
	function getClient() {
		current_client = new HTTPClientWithCache({baseUrl: App.base_url, retryCount: 0, cacheSeconds: 0});
		return current_client;
	}
		
	function post(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		prepare("POST", url, call_backs).send({data : params});
	}
	
	function get(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		url = url+queryString(params);
		prepare("GET", url, call_backs).send();
	}
	
	function destroy(url, params_or_call_backs, call_backs) {
		var fixed_args = fixArgs(params_or_call_backs, call_backs);
		call_backs = fixed_args[0];
		params = fixed_args[1];
		url = url+queryString(params);
		prepare("DELETE", url, call_backs).send();
	}
	
	function expireCache() {
		(current_client || getClient()).prune_cache(1);
	}
	
// private

	function fixArgs(params_or_call_backs, call_backs) {
		params = params_or_call_backs;
		if(params_or_call_backs.success) {
			call_backs = params_or_call_backs;
			params = {};
		}
		if(priv_obj.auth_token) {
			params.auth_token = priv_obj.auth_token;
		}
		return [call_backs, params];
	}

	function prepare(method, url, call_backs) {
		client = getClient();
		var progress_bar = call_backs.progress_bar;
		client.options.preload = call_backs.preload;
		if(progress_bar) client.options.onsendstream = function(e){ progress_bar.value = e.progress };
		client.options.onload = call_backs.success;
		client.options.onerror = call_backs.error;
		client.open(method, url);
		setHeaders(client);
		return client;
	}

	function queryString(params) {
		var keys = [];
		for (var key in params) { keys.push([key, params[key]]); };
		var qstring = reduce("y += x[0] + '=' + x[1] + '&'".lambda(), "", keys);
		if (qstring !== "") qstring = '?'+qstring;
		return qstring;
	}
	
	function setHeaders(client) {
		if(priv_obj.credentials){
			client.setRequestHeader('Authorization', priv_obj.credentials);
		} else {
			client.setRequestHeader('Authorization', "not logged in"); //hack to get it to send json correctly
		}
		// client.setRequestHeader("content-type", "application/json");
	}
	
	var priv_obj = {post: post, get: get, destroy : destroy, expireCache : expireCache};
	return priv_obj;
};
