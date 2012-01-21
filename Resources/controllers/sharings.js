Controllers.sharings = (function() {
	var Api = RestApi("sharings");
	var self = {};
	
	var init = function(capsule_id) {
		Views.sharings.init(capsule_id, self);
	}
	
// delegate methods
	
	self.create = Api.save;
			
	return {init : init}
})();
