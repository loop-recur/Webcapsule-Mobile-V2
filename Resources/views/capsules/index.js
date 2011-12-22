Views.capsules.index = function(delegate, win) {	
	var tableView = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:45,
		bottom:0,
		separatorColor:'transparent'
	});
	
	var refreshTable = function(data) {
		tableView.setData(map(createTableViewRow, data));
	}
		
	var subtabs = UI.SubTabs(win, delegate.feed_options, {skip_back : true, center: true});

	subtabs.delegate = {
		getContent : function(view, e) {			
			delegate.pickerDone(function(d){ refreshTable(d);}, e.source.id)
		}
	}
		
	var createTableViewRow = function(capsule) {
		var page_text_color = "#B1B2B4";
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:"images/backgrounds/webcap_feed_bg_with_photoindent.png",
			height:279,
			width:320,
			id: capsule.id,
			className:'capsule',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
	
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(capsule.activity.user.image), 
			left:20,
			top:9,
			height:59,
			width:59
		});
		
		row.add(avatar);
		
		var user = Ti.UI.createLabel({
			text: capsule.activity.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"15dp",fontWeight:'regular'},
			color:page_text_color,
			left:88,
			top:5,
			height:20,
			width:200
		});
		
		row.add(user);
		
		var added_new = Ti.UI.createLabel({
			text: "Added new "+capsule.activity.kind, 
			font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
			color:page_text_color,
			left:88,
			top:22,
			height:19,
			width:220
		});
		
		row.add(added_new);
		
		var added_icon = Ti.UI.createView({
			backgroundImage:"images/feed/webcap_feedicons_photo.png",
			width:31,
			height:23,
			left:88,
			top:38
		});
		
		row.add(added_icon);
		
		var name = Ti.UI.createLabel({
			text:"to " + capsule.name, 
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:22,
			top:61,
			height:17,
			width:225,
			textAlign:"right"
		});
		
		row.add(name);
		
		var capsule_creator = Ti.UI.createLabel({
			text:"a webcapsule created by " + capsule.user.full_name, 
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:22,
			top:75,
			height:17,
			width:225,
			textAlign:"right"
		});
	
		row.add(capsule_creator);
		
		var creator_avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(capsule.user.image), 
			right:20,
			top:65,
			height:45,
			width:45
		});
		
		row.add(creator_avatar);
		
		var created = Ti.UI.createLabel({
			text: "on " + Date.parse(capsule.created_at).toString("M/d/yy"),
			font:{fontFamily:'GillSans-Light',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:22,
			top:93,
			height:17,
			width:225,
			textAlign:"right"
		});
		
		row.add(created);
		
		var video_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_video_icon.png",
			height:14,
			width:18,
			left:22,
			bottom:35
		});
		
		row.add(video_icon);
		
		var photos_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_photo_icon.png",
			height:14,
			width:18,
			left:65,
			bottom:35
		});
		
		row.add(photos_icon);
		
		var comments_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_comments_icon.png",
			height:14,
			width:18,
			left:118,
			bottom:35
		});
		
		row.add(comments_icon);
		
		var views_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_views_icon.png",
			height:14,
			width:18,
			left:168,
			bottom:35
		});
		
		row.add(views_icon);
		
		var video_count = Ti.UI.createLabel({
			text:capsule.video_count,
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:41,
			bottom:31,
			width:30,
			height:21
		});
		
		row.add(video_count);
		
		var photo_count = Ti.UI.createLabel({
			text: capsule.photo_count,
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:84,
			bottom:31,
			width:30,
			height:21
		});
		
		row.add(photo_count);
		
		var comment_count = Ti.UI.createLabel({
			text:capsule.comment_count,
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:137,
			bottom:31,
			width:30,
			height:21
		});
		
		row.add(comment_count);
		
		var views_count = Ti.UI.createLabel({
			text:capsule.views,
			font:{fontFamily:'GillSans',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:187,
			bottom:31,
			width:30,
			height:21
		});
		
		row.add(views_count);
		
		var activity_content_view = Views.capsules[capsule.content_partial](capsule);
		activity_content_view.top = 110;
		activity_content_view.left = 20;
		activity_content_view.width = 300;
		activity_content_view.height = 90;
		
		row.add(activity_content_view);
		
		var go_to_capsule = Ti.UI.createButton({
			backgroundImage:"images/feed/webcap_feed_go_to_capsule_btn.png",
			height:30,
			width:93,
			right:10,
			bottom:25,
			id: capsule.id
		});
		
		go_to_capsule.addEventListener('click', delegate.tableClicked);
	
		row.add(go_to_capsule);
		
		return row;
	}
	
	var new_capsule = Ti.UI.createButton({
		title: "New Capsule",
		width: 150,
		height: 30,
		bottom: 10
	});
	
	new_capsule.addEventListener('click', Controllers.capsules.create);

	win.setRightNavButton(new_capsule);
		
	win.add(tableView);
	
	return win;
}
