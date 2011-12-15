Mocks = {};

Mocks.HttpClient = {
	setTimeout:jasmine.createSpy(),
	setRequestHeader:jasmine.createSpy(),
	open: jasmine.createSpy(),
	send: jasmine.createSpy()
};

Mocks.View = {
	render : jasmine.createSpy("render")
};

Mocks.Database = {execute : jasmine.createSpy(), close : jasmine.createSpy() };

Mocks.FakeFile = { write:jasmine.createSpy(), deleteFile:function(){}, exists:jasmine.createSpy()};
FakeGroup = { addTab:function(){}, addEventListener:function(){}, setActiveTab:function(){}, open:function(){} };
FakeiPhone = {AnimationStyle:function(){} };

Titanium = {
	include: function(){},
	Network: {createHTTPClient:function(){ return Mocks.HttpClient; }},
	Utils: {base64encode:function(){}},
	Filesystem: {applicationDataDirectory: "", getFile: function(){ return Mocks.FakeFile; }},
	UI: {createTabGroup:function(){return FakeGroup; },createWindow:function(){},createTab:function(){},iPhone:FakeiPhone},
	Database: { open:jasmine.createSpy(), execute:jasmine.createSpy() }
};

Ti = {
	API: {info: function(i){console.log(i)} },
	Utils: {md5HexDigest:function(){ return "123"; }},
};

function stubDb(response) {
	return jasmine.createSpy().andCallFake(function(obj, callbacks){
		if(typeof callbacks == "function") {
			callbacks(response);
		} else {
			callbacks.error ? callbacks.error(response) : callbacks.success(response);
		};
	});
};

function stubHttp(method, response, status) {
	status = status || 200;
	callback = (status == 200) ? "success" : "error";
	App.http_client[method] = jasmine.createSpy().andCallFake(function(url, params, callbacks) {
		response_obj = (status == 500) ? null : {responseText:response, status:status};
		callbacks[callback](response_obj);
	});
};
