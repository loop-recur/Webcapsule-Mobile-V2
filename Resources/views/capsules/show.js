Views.capsules.show = function(delegate, id) {
	var view = Ti.UI.createWindow({
		title: "Capsule",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var table = Ti.UI.createTableView({
		backgroundColor:"transparent",
		top:250,
		bottom:0
	});
	
	var createTableViewRow = function(content) {
		var name = Ti.UI.createLabel({
			text:content.kind, 
			font:{fontFamily:'GillSans',fontSize:18,fontWeight:'regular'},
			color:"#444444",
			left:10,
			height:"auto",
			width:"auto",
			kind: content.kind,
			id: content.id,
			content: content
		});

		var row = Ti.UI.createTableViewRow({
			height:30,
			id: content.id,
			kind: content.kind,
			className:content.kind,
			content: content
		});
	
		row.add(name);
	
		return row;
	}
	
	var refreshTable = function(data) {
		table.setData(map(createTableViewRow, data));
	}
	
	var finish = function(capsule) {
		
		var page_text_color = "#B1B2B4";
		
		var info_view = Ti.UI.createView({
			backgroundImage:"images/backgrounds/webcap_capsule_info_overlay.png",
			top:0,
			height:250
		});
		
		var avatar = Ti.UI.createImageView({
			image: Helpers.Application.assetPath(capsule.user.image), 
			left:12,
			top:12,
			height:59,
			width:59
		});
		
		info_view.add(avatar);
		
		var name = Ti.UI.createLabel({
			text:capsule.name, 
			font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
			color:page_text_color,
			left:80,
			top:9,
			height:60,
			width:138
		});
		
		info_view.add(name);
		
		var share = Ti.UI.createButton({
			backgroundImage:"images/capsule/webcap_share_btn.png",
			width:66,
			height:29,
			top:11,
			left:235
		});
		
		info_view.add(share);
		
		var user = Ti.UI.createLabel({
			text: "by " +capsule.user.full_name, 
			font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
			color:page_text_color,
			left:12,
			top:80,
			height:21,
			width:200
		});
		
		info_view.add(user);
		
		var tagged_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_tiny_tag_icon.png",
			height:14,
			width:14,
			left:12,
			top:118
		});
		
		info_view.add(tagged_icon);
		
		var tagged = Ti.UI.createLabel({
			text: capsule.tags.length + " people tagged", 
			font:{fontFamily:'GillSans-Light',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:35,
			top:115,
			height:21,
			width:114
		});
		
		info_view.add(tagged);
		
		var created = Ti.UI.createLabel({
			text: "originally created " + Date.parse(capsule.created_at).toString("M/d/yy"),
			font:{fontFamily:'GillSans-Light',fontSize:"12dp",fontWeight:'regular'},
			color:page_text_color,
			left:12,
			top:131,
			height:21,
			width:141
		});
		
		info_view.add(created);
		
		var mapview = Ti.Map.createView({
			mapType: Ti.Map.STANDARD_TYPE,
			height:64,
			width:67,
			top:76,
			left:235,
			borderRadius:8,
			regionFit:true,
			animate:true,
			pincolor:Titanium.Map.ANNOTATION_RED,
			userLocation:false
		});
		
		info_view.add(mapview);
		
		var video_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_video_icon.png",
			height:14,
			width:18,
			left:12,
			top:177
		});
		
		info_view.add(video_icon);
		
		var photos_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_photo_icon.png",
			height:14,
			width:18,
			left:65,
			top:177
		});
		
		info_view.add(photos_icon);
		
		var comments_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_comments_icon.png",
			height:14,
			width:18,
			left:122,
			top:177
		});
		
		info_view.add(comments_icon);
		
		var views_icon = Ti.UI.createView({
			backgroundImage:"images/capsule/webcap_stats_views_icon.png",
			height:14,
			width:18,
			left:175,
			top:177
		});
		
		info_view.add(views_icon);
		
		var video_count = Ti.UI.createLabel({
			text:"10",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:33,
			top:172,
			width:30,
			height:21
		});
		
		info_view.add(video_count);
		
		var photo_count = Ti.UI.createLabel({
			text:"1000",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:86,
			top:172,
			width:30,
			height:21
		});
		
		info_view.add(photo_count);
		
		var comment_count = Ti.UI.createLabel({
			text:"100",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:143,
			top:172,
			width:30,
			height:21
		});
		
		info_view.add(comment_count);
		
		var views_count = Ti.UI.createLabel({
			text:"1000",
			font:{fontFamily:'GillSans',fontSize:"14dp",fontWeight:'regular'},
			color:page_text_color,
			left:196,
			top:172,
			width:30,
			height:21
		});
		
		info_view.add(views_count);
		
		var compress = Ti.UI.createButton({
			backgroundImage:"images/capsule/webcap_show_hide_up.png",
			height:17,
			width:30,
			left:270,
			top:177
		});
		
		info_view.add(compress);
		
		view.add(info_view);
		
		var contents = flatten([capsule.comments, capsule.photos, capsule.videos]);

		refreshTable(contents);
	}
	
	delegate.getSingle(id, finish);
	
	table.addEventListener('click', delegate.showRowClicked);
	
	view.add(table);
	return view;
}
