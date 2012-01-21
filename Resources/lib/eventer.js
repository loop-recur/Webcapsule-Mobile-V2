Eventer = {
	set: function(name, fun) {
		if(!Eventer[name]) Eventer[name] = [];
		 Eventer[name].push(fun);
	},
	
	fire: function(name) {
		if(!Eventer[name]) return log("no event by that name");
		map(function(f){ f.apply(null, arguments); }, Eventer[name]);
		Eventer[name] = null;
	}
};
