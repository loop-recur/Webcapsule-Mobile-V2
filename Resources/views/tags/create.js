Views.tags.create = function(delegate, capsule, tagged) {	
	var rows = [];
	var labels = map('.label', capsule.tags);
	
	var win = Ti.UI.createWindow({
		title: "Add Tags",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var activity = Ti.UI.createActivityIndicator({
		top:100, 
		height:100,
		width:100,
		zIndex: 20
	});
	activity.show();
	
	var search = Ti.UI.createSearchBar({
		barColor:'black',
		showCancel:true,
		hintText:'Enter a twitter, facebook or username...',
		height:40,
		top:0
	});
	
	var createTableViewRow = function(tag) {		
		var checkbox = Ti.UI.createImageView({
			image: 'images/tags/on.png',
			right: 10,
			width: 40,
			height: 40,
			visible: element(tag.label, labels)
		});
		
		var name = Ti.UI.createLabel({
			text: tag.label, 
			font:{fontFamily:'GillSans-Light',fontSize:"18dp",fontWeight:'regular'},
			color:"#333333",
			left:85,
			height:"auto",
			width:"auto",
			tag: tag,
			checkbox: checkbox
		});
		
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(tag.image),
			left: 10,
			width: 40,
			height: 40,
			tag: tag,
			checkbox: checkbox
		});
		
		var provider = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(tag.provider_icon),
			right: 100,
			width: 14,
			height: 14,
			tag: tag,
			checkbox: checkbox
		});
		
		var row = Ti.UI.createTableViewRow({
			tag: tag,
			checkbox: checkbox
		});
		
		row.add(name);
		row.add(avatar);
		row.add(provider);
		row.add(checkbox);
		return row;
	}

	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:40,
		visible: false
	});
	
	var done = Ti.UI.createButton({
		title: "Done",
		width: 80,
		height: 30,
		bottom: 10
	});
	
	var finishLoadingTags = function(tags) {
		rows = map(createTableViewRow, tags);
		activity.hide();
		table.setData(rows);
		table.visible = true;
		
		var refreshTable = function(value) {
			table.setData(filter(compose(match(new RegExp("^@?"+value, 'gi')), '.tag.label'), rows));
		}
		
		search.addEventListener('change', function(e) {
			if(e.value.length >= 1) refreshTable(e.value);
		});
	}
	
	search.addEventListener("touchstart", function(e){
		search.focus();
	});
	
	search.addEventListener('cancel', function(e) { 
		search.blur();
		Nav.close(win);
	});
	
	search.addEventListener('return', function(){
		search.blur();
	});
	
	table.addEventListener('click', function(e) {
		e.source.checkbox.visible = !e.source.checkbox.visible;
	});
	
	var getSelectedRows = function() {
		return filter('.checkbox.visible', rows);
	}
	
	var finish = function(tags) {
		tagged.text = tags.length+" people tagged";
		capsule.tags = tags;
		Nav.close(win);
	}
	
	done.addEventListener('click', compose(delegate.createTags(function(c){ finish(c); }, capsule), map('.tag'), getSelectedRows));

	win.add(search);
	win.add(table);
	win.add(activity);
	win.setRightNavButton(done);
	
	delegate.getAll(finishLoadingTags);
	
	return win;

}
