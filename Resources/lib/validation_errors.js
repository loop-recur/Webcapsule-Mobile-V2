ValidationErrors = (function() {
	
	var toSentence = function(errors) {
		var _getName = function(name) { return name + " " + errors[name]; }
		return compose(join(", "), map(_getName), keys)(errors);
	};
	
	return {toSentence: toSentence}
})();