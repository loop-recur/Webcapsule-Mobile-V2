Bootstrap = {};

Bootstrap.run = function() {
	includeAllFiles();
	App.http_client = LoopRecur.HttpClient();
	
	function includeAllFiles() {
		Views[Ti.Platform.osname] = {};
		Layouts[Ti.Platform.osname] = {};
		map(includeFile, FileList);
	}

	function includeFile(name) {
		makeNamespace(name);
		makeViewNamespace(name);
		if(shouldInclude(name)) Titanium.include(name);
	}
	
	function isView(name) {
		return name.match(/views|layouts/i);
	};
	
	function shouldInclude(name) {
		if(!isView(name)) return true;
		if(name.match(new RegExp('(iphone|ipad|android)')) && name.indexOf(Ti.Platform.osname) < 0) return false;
		return true;
	}

	function makeNamespace(name) {
		var kinds = {"views": Views, "controllers": Controllers, "layouts": Layouts, "config": Config, "lib": Lib, "helpers": Helpers, "ui": UI};
		var paths = name.split('/');
		var kind = paths[0];
		var namespace = paths[1];
		if(!kinds[kind][namespace]) kinds[kind][namespace] = {};
		return name;
	};
	
	function makeViewNamespace(name) {
		if(!isView(name)) return;
		var name = name.replace(new RegExp('(iphone|ipad|android)\\/'), "");
		var paths = name.split('/');
		var kind = paths[0];
		var namespace = paths[1].replace(".js", "");
		if(!Views[Ti.Platform.osname][namespace]) Views[Ti.Platform.osname][namespace] = {};
	}

	function runEnvironment() {
		var isIphone = Titanium.Filesystem.resourcesDirectory.split("/")[1] === "var";
		var environment = isIphone ? "production" : "development";
		App.environments[environment]();
	}
};
