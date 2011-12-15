map_async = defn(function(fn, array, cb) {
  var results = []
	, pending = array.length;
	
	var semaphore = function(r) {
		results.push(r);
		if (!--pending) cb(flatten(results));
	};
	
	array.forEach(function(a) {
		fn(a, semaphore);
	});	
});


reduce_async = function(fn, acc, array, cb) {
	var pending = array.length;
	
	var semaphore = function(r) {
		if (!--pending) cb(r);
	};
	
	array.forEach(function(x) {
		fn(acc, x, semaphore);
	});	
}
