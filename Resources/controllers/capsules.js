Controllers.capsules = (function() {
	var Api = RestApi("capsules")
	, self = {};
	
	var index = function(win) {
		return Views.capsules.index(self, win);
	};
	
	var create = function() {
		Nav.open(Views.capsules.create(self));
	};
	
	var show = function(id, reset) {
		Ti.API.info("\n\n\n========make win=======\n\n\n");
		var win = Views.capsules.show(self, id);
		Ti.API.info("\n\n\n========win made=======\n\n\n");
		reset ? Main.resetNav(win) : Nav.open(win);
		Ti.API.info("\n\n\n========opend=======\n\n\n");
	};

	var update = function(capsule) {
		Nav.open(Views.capsules.update(self, capsule));
	};
	
// 	delegate methods
	self.getAll = Api.all;
	self.getSingle = Api.find;
	self.feed_options = ["Friends", "Mine", "Everybody", "Tagged"];
	
	self.mosaicClicked = function(e) {
		if(e.source.index == (null || undefined)) return;
		Nav.open(Gallery(self.getContents(e.source.capsule), e.source.index));
	}
	
	self.tabClicked = function(cb, value, params, options) {
		params = (params || {});
		options = (options || {preload: true});
		Api.all(cb, merge({feed_type : value.toLowerCase()}, params), options);
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
	
	self.getContents = function(capsule) {
		return flatten([capsule.comments, capsule.photos, capsule.videos, capsule.websnippets]);
	}
	
	return {index : index, show : show, update: update, create: create}
})();
