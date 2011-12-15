FileCache = (function() {
	
var data_dir = Ti.Filesystem.applicationDataDirectory;
	
var get = function(name) {
	return Ti.Filesystem.getFile(data_dir, name);
}

var set = defn(function(name, data) {
	var file = Ti.Filesystem.getFile(data_dir,name);
	file.write(data);
	return data;
});

return {get : get, set: set}

})();