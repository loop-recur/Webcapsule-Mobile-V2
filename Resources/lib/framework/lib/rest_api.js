RestApi = function(name) {
	pub_obj = {};
	
	function all(callbacks, params, options) {
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
						
		callbacks.error = function(r) {
			r ? oldError(r.responseText) : oldError();
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		callApi("get", getPath(), callbacks, params, options);
	};
	
	function find(callbacks, params, options) {
		var id = params.id;
		var oldSuccess = callbacks.success || callbacks;
				
		callbacks.error = function(r) {
			oldSuccess(null);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		callApi("get", getPath(id), callbacks, {}, params, options);
	};
	
	function save(callbacks, obj, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
		options = options || {};

		callbacks.error = function(r) {
			r ? oldError(JSON.parse(r.responseText)) : oldError();
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		var path = options.path ? options.path : getPath(obj.id);
		callApi("post", path, callbacks, obj, options);
	};
	
	function destroy(callbacks, obj, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		callApi("destroy", getPath(obj.id), callbacks, obj, options);
	};

	
// private

	function getPath(id) {
		var base_path = "/"+name;
		if(id && !TempId.isTemp(id)) base_path = base_path +"/"+id;
		return base_path+".json";
	};
	
	function callApi(method, path, callbacks, params, options) {
		params = params || {};
		options = options || {};
		options.success = function(r) { callbacks.success(r); };
		options.error = function(r) { callbacks.error(r); };
		
		App.http_client[method](path, params, options);
	};
			
	pub_obj = {
		all: all,
		find: find,
		save: save,
		destroy: destroy
	};
	
	return pub_obj;
};
