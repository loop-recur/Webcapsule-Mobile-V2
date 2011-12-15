describe("db", function() {
	var db;
	
  beforeEach(function() {
		db = LoopRecur.Db(Titanium.Database, true);
		Titanium.Database.open = function() { return Mocks.Database };
	  db.use("tests");
	});
	
	describe("a new db", function() {
		it("creates a database when it doesn't exist", function() {
			db.create("my_table", {name : "string", favorite_id : "integer"});
		  expect(Mocks.Database.execute).toHaveBeenCalledWith('CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT NULL, name STRING, favorite_id INTEGER)');
		});
	});
	
	describe("a previous db", function() {
	  beforeEach(function() {
	    db.create("my_table", {name : "string", favorite_id : "integer", handle : "string"});
	  });
	
		it("drops a database", function() {
			db.drop("my_table");
		  expect(Mocks.Database.execute).toHaveBeenCalledWith('DROP TABLE my_table');
		});
	
		it("saves a record", function() {
			db.save('my_table', {name : "blam", favorite_id : 2, handle : ""});
			expect(Mocks.Database.execute).toHaveBeenCalledWith("INSERT OR REPLACE INTO my_table (name, favorite_id, handle) VALUES (?,?,?)", ["blam", 2, ""]);
		});
		
		
		describe("a previous record", function() {
			var my_record;
		
			it("finds a record", function() {
				db.find('my_table', {id : 1, favorite_id : 2}, function() {});
				expect(Mocks.Database.execute).toHaveBeenCalledWith("SELECT * FROM my_table WHERE id=? AND favorite_id=?", [1, 2]);
			});
			
			it("runs the callback when finding a record", function() {
				var myFun = jasmine.createSpy("cb");
				db.find('my_table', {id : 1, favorite_id : 2}, myFun);
				expect(myFun).toHaveBeenCalled();
			});
			
			it("finds all records", function() {
			  db.find('my_table', {}, function() {});
				expect(Mocks.Database.execute).toHaveBeenCalledWith("SELECT * FROM my_table");
			});
			
			it("delets a record", function() {
			  db.destroy('my_table', {id : 2}, function() {});
				expect(Mocks.Database.execute).toHaveBeenCalledWith("DELETE FROM my_table WHERE id=?", [2]);
			});
			
			it("updates a record", function() {
				db.save('my_table', {id : 1, name : "blam", favorite_id : 4});
				expect(Mocks.Database.execute).toHaveBeenCalledWith("INSERT OR REPLACE INTO my_table (id, name, favorite_id) VALUES (?,?,?)", [1, "blam", 4]);
			});
		});
	});
	
});
