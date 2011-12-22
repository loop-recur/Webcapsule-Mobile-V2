Controllers.tags = (function() {
	var Api = RestApi("tags");
	var self = {};
	
	var create = function(capsule, tagged) {
		Nav.open(Views.tags.create(self, capsule, tagged));
	}
	
	
// delegate methods
	
	self.getAll = Api.all;
	
	self.createTags = defn(function(cb, capsule, tags) {
		Api.save(cb, {tags: map(JSON.stringify, tags), capsule_id: capsule.id});
	});
		
	return {create : create}
})();
