Views.capsules.index = function(delegate) {
	var view = Ti.UI.createView({
		backgroundColor: "white"
	});
	
	var picker_row = Ti.UI.createTableViewRow({
		height:80,
		title: "picker"
	});
	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:82,
		bottom:0
	});
	
	var refreshTable = function(data) {
		tableView.setData(map(createTableViewRow, data));
		// tableView.appendRow(picker_row);
	}
	
	delegate.getAll(refreshTable);
	
	var slide_in =  Ti.UI.createAnimation({bottom:0});
	var slide_out =  Ti.UI.createAnimation({bottom:-251});
	
	var picker_view = Ti.UI.createView({
		height:251,
		bottom:-251,
		zIndex:99
	});
	
	var done =  Ti.UI.createButton({
		title:'Done',
		style:Ti.UI.iPhone.SystemButtonStyle.DONE
	});
	
	var spacer =  Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar =  Ti.UI.createToolbar({
		top:0,
		items:[spacer,done]
	});
	
	picker_view.add(toolbar);
	
	done.addEventListener('click', function(e) {
		delegate.pickerDone(refreshTable, picker.getSelectedRow(0).title);
		picker_view.animate(slide_out);
	});
	
	picker_row.addEventListener('click', function() {
		picker_view.animate(slide_in)
	});
	
	var picker = Ti.UI.createPicker({
		top:43,
		selectionIndicator:true
	});
	
	map(function(t){ picker.add(Ti.UI.createPickerRow({title : t})); }, delegate.pickerOptions);
	picker_view.add(picker);
	view.add(picker_view);
	
	var createTableViewRow = function(capsule) {

		var page_text_color = "#B1B2B4";
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:"images/backgrounds/webcap_feed_bg.png",
			height:279,
			id: capsule.id,
			className:'capsule'
		});
	
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(capsule.user.image), 
			left:12,
			top:12,
			height:59,
			width:59
		});
		
		row.add(avatar);
		
		var user = Ti.UI.createLabel({
			text: "by " +capsule.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
			color:page_text_color,
			left:78,
			top:9,
			height:19,
			width:220
		});
		
		row.add(user);
		
		var added_new = Ti.UI.createLabel({
			text: "added new ITEM TYPE GOES HERE", 
			font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
			color:page_text_color,
			left:78,
			top:9,
			height:19,
			width:220
		});
		
		row.add(added_new);
		
		var added_icon = Ti.UI.createView({
			backgroundImage:"images/feed/webcap_feedicons_photo.png",
			width:31,
			height:23,
			left:78,
			top:48
		});
		
		row.add(added_icon);
		
		var name = Ti.UI.createLabel({
			text:"to " + capsule.name, 
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:12,
			top:71,
			height:17,
			width:200
		});
		
		row.add(name);
		
		var capsule_creator = Ti.UI.createLabel({
			text:"a webcapsule created by " + capsule.user.full_name, 
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:12,
			top:87,
			height:17,
			width:200
		});
	
		row.add(capsule_creator);
		
		var created = Ti.UI.createLabel({
			text: "on " + Date.parse(capsule.created_at).toString("M/d/yy"),
			font:{fontFamily:'GillSans-Light',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:12,
			top:105,
			height:17,
			width:200
		});
		
		row.add(created);
		
		var video_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_video_icon.png",
			height:14,
			width:18,
			left:12,
			bottom:15
		});
		
		row.add(video_icon);
		
		var photos_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_photo_icon.png",
			height:14,
			width:18,
			left:65,
			bottom:15
		});
		
		row.add(photos_icon);
		
		var comments_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_comments_icon.png",
			height:14,
			width:18,
			left:122,
			bottom:15
		});
		
		row.add(comments_icon);
		
		var views_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_views_icon.png",
			height:14,
			width:18,
			left:175,
			bottom:15
		});
		
		row.add(views_icon);
		
		var video_count = Ti.UI.createLabel({
			text:"10",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:33,
			bottom:10,
			width:30,
			height:21
		});
		
		row.add(video_count);
		
		var photo_count = Ti.UI.createLabel({
			text:"1000",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:86,
			bottom:10,
			width:30,
			height:21
		});
		
		row.add(photo_count);
		
		var comment_count = Ti.UI.createLabel({
			text:"100",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:143,
			bottom:10,
			width:30,
			height:21
		});
		
		row.add(comment_count);
		
		var views_count = Ti.UI.createLabel({
			text:"1000",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:196,
			bottom:10,
			width:30,
			height:21
		});
		
		row.add(views_count);
		
		var go_to_capsule = Ti.UI.createbutton({
			backgroundImage:"images/capsule/webcap_feed_go_to_capsule_btn.png",
			height:30,
			width:93,
			right:10,
			bottom:15
		})
	
		row.add(go_to_capsule);
		
	
		return row;
	}
		
	tableView.addEventListener('click', delegate.tableClicked);
	tableView.appendRow(picker_row);
	view.add(tableView);
	
	return view;
}
