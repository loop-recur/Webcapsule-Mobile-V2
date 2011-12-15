TempId = {};

TempId.generate = function() {
	var date = new Date;
	return "temp-" + Ti.Utils.md5HexDigest(date.toString());
};

TempId.isTemp = function(id) {
	return id.toString().match(/^temp/i);
};
