LoopRecur.Db = function(_db, isAndroid) {
	var db_name;

	function use(name) {
		db_name = name;
	}
	
	function _getInstance() {
		return _db.open(db_name);
	}
	
	function _execute(args, replace, cb) {
		var instance = _getInstance();
		if(instance) {
			retry = false;
			var rows = replace ? instance.execute(args, replace) : instance.execute(args);
			if(typeof cb == "function") cb(_makeObjects(rows));
			if(rows) rows.close();
			instance.close();
		} else {
			if(retry) return false	;
			_execute(args, replace, cb);
			retry = true;
		}
	}
	
	function create(table_name, fields) {
		var start = "id INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT NULL"
		var sql_fields = reduce("y += ', '+ x[0] +' ' +x[1].toUpperCase()", start, _toArray(fields));
		_execute('CREATE TABLE IF NOT EXISTS '+table_name+' ('+sql_fields+')');
	}
	
	function drop(table_name) {
		_execute('DROP TABLE IF EXISTS '+table_name);
	}
	
	var delete_all = defn(function(table_name, cb) {
		_execute("DELETE FROM "+table_name, false, cb);
	});
	
	var find = defn(function(table_name, query, cb) {
		var arr = _toArray(query);
		
		if(arr.length < 1) {
			_execute("SELECT * FROM "+table_name, null, cb);
		} else {
			_keysVals(query, function(keys, vals) {
				var real_keys = map('x+"=?"',keys).join(" AND ");
				_execute("SELECT * FROM "+table_name+" WHERE "+real_keys, vals, cb);
			});
		}
	});
	
	var save = defn(function(table_name, fields) {
		_keysVals(fields, function(keys, vals) {
			var keys = keys.join(", ");
			var qmarks = map("'?'", vals).join(',');
			_execute("INSERT OR REPLACE INTO "+table_name+" ("+keys+") VALUES ("+qmarks+")", vals);
		});
	});
	
	function destroy(table_name, query) {
		_keysVals(query, function(keys, vals) {
			var real_keys = map('x+"=?"',keys).join(" AND ");
			_execute("DELETE FROM "+table_name+" WHERE "+real_keys, vals);
		});		
	}
	
	function _keysVals(fields, fun) {
		var keys_and_vals = zip.apply(null, _toArray(fields));
		fun(keys_and_vals[0], keys_and_vals[1]);
	}
	
	function _toArray(o) {
		var keys = [];
		for (var key in o) { keys.push([key, o[key]]); }
		return keys;
	}
	
	function _makeObjects(results) {
		if(!results) return;
		var objs = [];
		try{
			var count = isAndroid ? results.fieldCount : results.fieldCount();
		} catch(e) {
			return [];
		}
		
		
		
		_mapRows(function(){
			var newObject = {};
			for(var i=0; i<count; i++){ newObject[results.fieldName(i)] = results.field(i); }
			objs.push(newObject);
		}, results);
		
		return objs;
	}
	
	function _mapRows(fun, rs) {
		if(!rs) return;
		
		while (rs.isValidRow())
		{
			fun(rs);
			rs.next();
		}
	}
	
	return {use : use, create : create, drop : drop, save : save, find : find, destroy : destroy, delete_all : delete_all}
};
