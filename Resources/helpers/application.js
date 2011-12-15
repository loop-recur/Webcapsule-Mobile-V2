Helpers.Application = {};

Helpers.Application.addDp = function() {
	var _sum = reduce.p('+', 0);
	var _getInts = map.p(Helpers.Application.extractInteger);
	return compose('+"dp"', _sum, _getInts, argsToList)(arguments);
}

Helpers.Application.extractInteger = function(str) {
    var str = new String(str);
    return parseInt(str.replace("dp", ""));
}


Helpers.Application.assetPath = function(path) {
	return App.base_url.replace("/api", "")+path;
}