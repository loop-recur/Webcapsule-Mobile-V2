Controllers.application = (function() {
	var self = {}
	
	var index = Layouts.application.curry(self);
	
	
// delegate methods

	self.root = Controllers.capsules.index;
		
	return {index : index}
})();
