Controllers.websnippets = (function() {
	var Api = RestApi("websnippets");
	var self = {};
	
	var init = function(capsule_id) {
		Nav.open(Views.websnippets.init(self, capsule_id));
	}
	
// delegate methods
	
	self.getAll = function(cb, capsule_id) {
		Api.all(cb, {capsule_id: capsule_id});
	};
	
	self.create = function(cb, capsule_id, current_tab, snippets) {
		var params = {current_tab : current_tab, capsule_id: capsule_id, websnippets: join("|||", snippets)}
		Api.save(cb, params);
	};
		
	return {init : init}
})();
