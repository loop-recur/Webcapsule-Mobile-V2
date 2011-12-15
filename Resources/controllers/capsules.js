Controllers.capsules = (function() {
	var Api = RestApi("capsules");
	var self = {};
	
	var index = function(win) {
		self.win = win;
		win.add(Views.capsules.index(self));
	};
	
	var show = function(id) {
		Nav.open(Views.capsules.show(self, id));
	};
	
	
// 	delegate methods

	self.getAll = Api.all;
	self.getSingle = Api.find;
	self.pickerOptions = ["Mine", "Friends", "Everyone", "Tagged"];
	
	self.tableClicked = function(e) {
		if(e.source.id) show(e.source.id);
	}
	
	self.showRowClicked = function(e) {
		if(e.source.kind) Nav.open(Views[e.source.kind].show(e.source.content));
	}
	
	self.pickerDone = function(cb, value) {
		Api.all(cb, {feed_type : value});
	}
	
	return {index : index, show : show}
})();
