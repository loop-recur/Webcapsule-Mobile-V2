RestApi = function(name) {
	pub_obj = {};
	
	function all(callbacks, params, options) {
		
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
						
		callbacks.error = function(r) {
			if(r) oldError(r.responseText);
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		callApi("get", getPath(), callbacks, params, options);
	};
	
	function find(id, callbacks, params, options) {
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
	
	function save(obj, callbacks, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
					old_record ? Helpers.array_funs.replace(Cache[name], old_record, obj) : Cache[name].unshift(obj);
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
				old_record ? Helpers.array_funs.replace(Cache[name], old_record, json) : Cache[name].unshift(json);
			}
			oldSuccess(json);
		};
		
		var path = options.path ? options.path : getPath(obj.id);
		callApi("post", path, callbacks, obj, options);
	};
	
	function destroy(obj, callbacks, options) {
		var id = obj.id;
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || function(){};
				
		callbacks.error = function(r) {
			if(r) {
				oldError(r.responseText);
			} else {
				if(Cache[name]) {
					var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
					if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
				}
				oldSuccess(old_record);
			}
		};
		
		callbacks.success = function(r) {
			var json = JSON.parse(r.responseText);
			if(Cache[name]) {
				var old_record = select("id == x.id".lambda().p(id), Cache[name])[0];
				if(old_record){ Helpers.array_funs.remove(Cache[name], old_record); };
			}
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
