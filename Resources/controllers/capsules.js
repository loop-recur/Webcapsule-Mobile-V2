Controllers.capsules = (function() {
	var Api = RestApi("capsules");
	var self = {};
	
	var index = function(win) {
		return Views.capsules.index(self, win);
	};
	
	var create = function() {
		Nav.open(Views.capsules.create(self));
	};
	
	var show = function(id) {
		Nav.open(Views.capsules.show(self, id));
	};

	var update = function(capsule) {
		Nav.open(Views.capsules.update(self, capsule));
	};
	
// 	delegate methods
	self.getAll = Api.all;
	self.getSingle = Api.find;
	self.feed_options = ["Friends", "Mine", "Everybody", "Tagged"];
	
	self.showRowClicked = function(e) {
		if(e.source.kind) Nav.open(Views[e.source.kind].show(e.source.content));
	}
	
	self.pickerDone = function(cb, value) {
		Api.all(cb, {feed_type : value.toLowerCase()});
	}
	
	self.addContent = defn(function(capsule, e) {
		if(e.source.kind) Nav.open(Views[e.source.kind].create(self, capsule));
	});
	
	self.addComment = function(cb, capsule, value) {
		RestApi("comments").save(cb, {content: value, capsule_id: capsule.id});
	};
	
	self.addPhoto = function(cb, photo, progress_bar) {
		RestApi("photos").save(cb, photo, {progress_bar: progress_bar});
	};
	
	self.addVideo = function(cb, video, progress_bar) {
		RestApi("videos").save(cb, video, {progress_bar: progress_bar});
	};
	
	self.addWebsnippet = function(cb, snippet) {
		RestApi("websnippets").save(cb, snippet);
	};
	
	self.createCapsule = function(cb, capsule) {
		Api.save(cb, capsule);
	};
	
	return {index : index, show : show, update: update, create: create}
})();
