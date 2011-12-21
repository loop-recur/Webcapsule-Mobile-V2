Views.capsules.create = function(delegate) {
	
	var page_text_color = "#B1B2B4";
	
	var win = Ti.UI.createWindow({
		title: "Create Capsule",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var view = Ti.UI.createView({
		backgroundImage:"images/backgrounds/webcap_capsule_info_overlay.png",
		top:0,
		height:250
	});
	
	win.add(view);
	
	var avatar = Ti.UI.createImageView({
		image:App.getCurrentUser().image, 
		left:12,
		top:12,
		height:59,
		width:59
	});
	
	view.add(avatar);

	var name = Ti.UI.createTextField({
		font:{fontFamily:'GillSans',fontSize:"18dp",fontWeight:'regular'},
		paddingLeft:5,
		color:page_text_color,
    width:220,
    height:20, 
    hintText:'Type Capsule Name...',
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		top:12,
		left:75
	});
	
	view.add(name);
	
	var when = Ti.UI.createTextField({
    width:150,  
    height:18, 
		color:page_text_color,
		font:{fontFamily:'GillSans-Light',fontSize:"16dp",fontWeight:'regular'},
    value:Date.today().toString('M/d/yy'),
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		top:73,
		left:13,
	});	
	
	view.add(when);
	
	var seal_area = Ti.UI.createView({
		height:30,
		width:90,
		left:12,
		top:100
	});
	
	view.add(seal_area);
	
	var seal_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_calendar_icon.png",
		width:23,
		height:23,
		left:0
	});
	
	seal_area.add(seal_icon);
	
	var seal_date = Ti.UI.createLabel({
		font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
		color:page_text_color,
		text:'to be sealed:',
		width:65,
		top:0,
		left:25,
		height:15
	});
	
	seal_area.add(seal_date);
	
	var seal_optional = Ti.UI.createLabel({
		font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
		color:page_text_color,
		text:'(optional)',
		width:70,
		bottom:0,
		left:25,
		height:15
	});
	
	seal_area.add(seal_optional);
	
	var access_label = Ti.UI.createLabel({
		text:'Private:',
		font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
		color:page_text_color,
		width:55,
		height:24,
		top:91
	});
	
	view.add(access_label);

	var access_switch = Ti.UI.createSwitch({
		value:false,
		top:117
	});
	
	view.add(access_switch);
	
	
	var tag_area = Ti.UI.createView({
		height:30,
		width:90,
		right:12,
		top:100
	});
	
	view.add(tag_area);
	
	var tag_icon = Ti.UI.createView({
		backgroundImage:"images/capsule/webcap_tag_icon.png",
		width:23,
		height:23,
		left:0
	});
	
	tag_area.add(tag_icon);
	
	var tag_date = Ti.UI.createLabel({
		font:{fontFamily:'GillSans-Light',fontSize:"13dp",fontWeight:'regular'},
		color:page_text_color,
		text:"tag people",
		width:65,
		top:0,
		left:25
	});
	
	tag_area.add(tag_date);
	
	
	var where = Ti.UI.createTextField({
		font:{fontFamily:'GillSans-Light',fontSize:"16dp",fontWeight:'regular'},
		color:page_text_color,
		paddingLeft:5,
		borderRadius:1,
		borderColor:"black",
    width:220,  
    height:25,
		hintText:"Type location...",
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		bottom:40
	});
	
	view.add(where);
	
	
	var save_button = Ti.UI.createButton({  
		backgroundImage:"images/capsule/webcap_indented_plus_sign.png",
		color:page_text_color,
		top:255,
    width:76,  
    height:75
	});
	
	win.add(save_button);
	
	var add_memories_label = Ti.UI.createLabel({
		font:{fontFamily:'Helvetica',fontSize:"20dp",fontWeight:'regular'},
		color:"black",
		text:'Start adding your memories!',
		top:338,
		height:25,
		textAlign:"center"
	});
	
	win.add(add_memories_label);
	
	
	finish = function(capsule) {
		log("=============Capsule");
		log(capsule);
		Controllers.capsules.show(capsule.id);
	}
	
	if(Geolocator.servicesIsEnabled()) {
		Geolocator.getCurrentAddress(function(currentAddress) {
			where.value = currentAddress;
		});
	} else {
		where.hintText = "No geolocation enabled, please type in address";
	}

	

	save_button.addEventListener('click', function() {
		if(!name.value) name.value = "Untitled Capsule";
		var access = access_switch.value ? "private" : "public";
		delegate.createCapsule(finish, {name : name.value, access: access, when : new Date(), where: where.value});
	});


	return win;
}
