Views.capsules.index = function(delegate, win) {	
	var page = 1
	, rows = []
	, current_tab
	, can_load_more = true;
	
	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:45,
		bottom:0,
		separatorColor:'transparent'
	});
	
	var load_more_row = Ti.UI.createTableViewRow({
		backgroundImage:'images/feed/item_bg.png',
		height:80,
		width:320,
		id: "more"
	});
	
	var load_label = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:18,
			fontWeight:'bold'
		},
		left:100,
		top:30,
		height:20,
		width:190,
		text:"Load More",
		id: "more"
	});
	
	load_more_row.add(load_label);
	
	var refreshTable = function(data) {
		rows = data;
		var xs = map(Views.capsules.feedRow, rows);
		if(can_load_more) xs = cons(xs, load_more_row);
		table.setData(xs);
	}
	
	var loadDataForTable = function(cb) {
		delegate.tabClicked(function(d){ refreshTable(d); cb(); }, current_tab);
	}

	var new_capsule = Ti.UI.createButton({
		title: "New Capsule",
		width: 150,
		height: 30,
		bottom: 10
	});
	
	new_capsule.addEventListener('click', Controllers.capsules.create);

	win.setRightNavButton(new_capsule);
	
	var subtabs = UI.SubTabs(win, delegate.feed_options, {skip_back : true, center: true});

	subtabs.delegate = {
		getContent : function(view, e) {
			if(current_tab == e.source.id) return;
			current_tab = e.source.id;
			loadDataForTable(e);
		}
	}
	
	UI.enablePullToRefresh(table, loadDataForTable);
	
	var loadMore = function() {
		page += 1;
		delegate.tabClicked(function(xs) {
			can_load_more = (xs.length >= 10);
			refreshTable(cons(rows, xs));
		}, current_tab, {page: page}, {preload: false});
	}
	
	table.addEventListener('click', function(e) {
		if(!e.source.id) return;
		(e.rowData.id == "more") ? loadMore() : Controllers.capsules.show(e.source.id);
	});
		
	win.add(table);
		
	return win;
}
