Environments = {
	development: function(){
		App.setHost("http://localhost:3000/api");
	},
	
	production: function() {
		App.setHost("http://webcapsule.com/api");
	}
}
