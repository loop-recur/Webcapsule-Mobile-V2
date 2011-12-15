SchemaLoad = (function() {
	
var createDb = function(config) {
	if(config.redo) map(App.db.drop, keys(Schema));
	for(table in Schema) App.db.create(table, Schema[table]);	
}

return {createDb : createDb}	

})();
