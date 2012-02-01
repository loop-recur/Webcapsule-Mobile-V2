Views.websnippets.init = function(delegate, capsule_id) {
	var rows = []
	, facebook
	, twitter
	, current_tab;
	
	var win = Ti.UI.createWindow({
		title: "Add Websnippets",
		backgroundImage:"images/backgrounds/webcap_snippet_feed_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});

	var activity = Ti.UI.createActivityIndicator({
		height:100,
		width:100,
		zIndex: 20
	});
	activity.show();
	
	var createTableViewRow = function(snippet) {		
		var checkbox = Ti.UI.createImageView({
			image: 'images/tags/on.png',
			right: 10,
			width: 40,
			height: 40,
			visible: false
		});
		
		var name = Ti.UI.createLabel({
			text: snippet, 
			font:{fontFamily:'GillSans-Light',fontSize:"16dp",fontWeight:'regular'},
			color:"#333333",
			height:"auto",
			width:265,
			left:15,
			snippet: snippet,
			checkbox: checkbox
		});
		
		var row = Ti.UI.createTableViewRow({
			backgroundColor: "transparent",
			snippet: snippet,
			checkbox: checkbox,
			height:name.height + 15
		});
		
		row.add(name);
		row.add(checkbox);
		return row;
	}

	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		separatorColor:"#B9BFC1",
		visible: false
	});
	
	var done = Ti.UI.createButton({
		title: "Done",
		width: 80,
		height: 30,
		bottom: 10
	});
	
	var finishLoading = function(response) {
		facebook = response.facebook || ["No statuses"];
		twitter = response.twitter || ["No tweets"];
		
		var subtabs = UI.SubTabs(win, ["Facebook", "Twitter"], {skip_back : true, center: true});

		subtabs.delegate = {
			getContent : function(view, e) {
				view.add(table);
				var snippets = (e.source.id == "Facebook") ? facebook : twitter;
				rows = map(createTableViewRow, snippets);
				activity.hide();
				table.setData(rows);
				table.visible = true;
				current_tab = e.source.id;
			}
		}
	}
	
	table.addEventListener('click', function(e) {
		e.source.checkbox.visible = !e.source.checkbox.visible;
	});
	
	var getSelectedRows = function() {
		return filter('.checkbox.visible', rows);
	}
	
	var finish = function(snippets) {
		alert("Websnippet added!");
		Controllers.capsules.show(capsule_id, true);
	}
	
	var create = function(snippets) {
		delegate.create(finish, capsule_id, current_tab, snippets);
	}
	
	done.addEventListener('click', compose(create, map('.snippet'), getSelectedRows));

	win.add(table);
	win.add(activity);
	win.setRightNavButton(done);
	
	delegate.getAll(finishLoading, capsule_id);
	
	return win;
}
