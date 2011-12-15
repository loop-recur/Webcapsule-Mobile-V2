take = defn(function(n, xs) {
	var result = [];
	
	for(var i=0;i<xs.length;i++ ) {
		if(xs[i] != null) result.push(xs[i]);
		if(result.length>=n) break;
	};
	return result;
});

drop = defn(function(n, xs) {
	xs.splice(0, n);
	return xs;
});

nTimes = defn(function(times, fun) {
	var result = [];
	for(var i=0;i<times;i++ ){ result = cons(fun(), result); }
	return result;
});

log = function(s) {
	Ti.API.info(s);
	return s;
}

unshift = defn(function(xs, other) {
	return other.concat(xs);
})

cons = defn(function(xs, other) {
	return [xs].concat(other);
});

repeat = defn(function(arg, n) {	
	return nTimes(n, id.curry(arg));
});

idx = defn(function(i, xs) {
	return xs[i];
});

first = function(xs) {
	return xs[0];
};

rest = function(xs) {
	return (typeof xs == "string") ? xs.substr(1, xs.length) : xs.splice(1, xs.length);
};

last = function(xs) {
	return xs[xs.length -1];
};

random = function(i) {
	return Math.floor(Math.random()*i);
}

groups_of = defn(function(n, xs) {
	if(xs.length === 0) return [];
	return cons(take(n, xs), groups_of(n, drop(n,xs)));
});

strip = function(str) {
	return str.replace(/\s+/, "");
}

split = defn(function(token, xs) {
	return xs.split(token);
});

join = defn(function(token, xs) {
	return xs.join(token);
});

reverse = defn(function(xs) {
	return xs.reverse();
});

match = defn(function(expr, x) {
	return x.match(expr);
})

nnnot = function(bool) {
	return !bool;
}

replace = defn(function(pattern, sub, str) {
	return str.replace(pattern, sub);
});

flip = function(fn) {
	return fn.flip();
}

subtract = defn(function(x,y){
	return y - x;
});

words = function(x){
	return x.split(/\s+/);
};

unwords = function(xs){
	return xs.join(" ");
};

uniq = function(xs) {
	var result = [];
	for(var i=0;i<xs.length;i++ ) { if(result.indexOf(xs[i]) < 0) result.push(xs[i]); };
	return result;
}

uniqBy = defn(function(fun, xs) {
	var result = [];
	for(var i=0;i<xs.length;i++ ) { if(compose(uniq, map(fun))(result) < 1) result.push(xs[i]); };
	return result;
})

when = defn(function(pred, f) {
	return function() {
		if(pred.apply(this, arguments)) return f.apply(this, arguments);
	}
});

ifelse = defn(function(pred, f, g) {
	return function() {
		return pred.apply(this, arguments) ? f.apply(this, arguments) : g.apply(this, arguments);
	}
});

var tupleToObj = function(xs) {
	var obj = {};
	for(var i=0;i<xs.length;i++ ) {
		obj[xs[i][0]] = xs[i][1];
	}
	return obj;
}

set = function(attribute, fun) {
	var f = fun.toFunction()
	return function(x) {
		x[attribute] = f(x);
		return x;
	}
	
};

omap = defn(function(fun, obj) {
	var results = [];
	for(i in obj) { results = cons(fun(i, obj[i]), results); }
	return results;
});

keys = function(obj) {
	return omap(function(key, value){return key}, obj);
}

merge = function(x,y) {
	for(property in y) {
		if(y[property]) x[property] = y[property];
	}
	return x;
}

sortBy = defn(function(fun, xs) {
	// altered from prototype
	var _sortBy = function(iterator, xs, context) {
	  return map('.value', map(function(value, index) {
	    return {
	      value: value,
	      criteria: iterator.call(context, value, index)
	    };
	  }, xs).sort(function(left, right) {
	    var a = left.criteria, b = right.criteria;
	    return a < b ? -1 : a > b ? 1 : 0;
	  }));
	}
	var f = fun.toFunction();
	return _sortBy(f, xs);
});

groupBy = defn(function(fun, xs) {
	var f = fun.toFunction();
	var _makeHash = function(obj, x) {
		var val = f(x);
		if(!obj[val]) obj[val] = [];
		obj[val].push(x);
		return obj;
	}
	
	return reduce(_makeHash, {}, xs);
});

argsToList = function(x){
	return Array.prototype.slice.call(x);
}

flatten = reduce(function(a,b){return a.concat(b);}, []);

capitalize = function(xs) {
	return xs[0].toUpperCase() + xs.slice(1, xs.length);
}

fireEvent = function(name, args) {
	if(!args) args = {};
	Ti.App.fireEvent(name, args);
};

empty = function(xs) {
	return xs.length < 1;
}

headTail = defn(function(fun, xs) {
	return fun.apply(fun, [first(xs), rest(xs)]);
});
