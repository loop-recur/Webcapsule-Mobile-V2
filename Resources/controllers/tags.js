Controllers.tags = (function() {
	var Api = RestApi("tags");
	var self = {};
	
	var create = function(capsule) {
		Nav.open(Views.tags.create(self, capsule));
	}
	
	
// delegate methods
	
	self.getAll = Api.all;
	
	self.createTags = defn(function(cb, capsule, tags) {
		Api.save(cb, {tags: map(JSON.stringify, tags), capsule_id: capsule.id});
	});
		
	return {create : create}
})();
