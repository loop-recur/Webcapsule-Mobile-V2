Views.capsules.create = function(delegate) {
	var win = Ti.UI.createWindow({
		title: "Create Capsule",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var name = Ti.UI.createTextField({
		paddingLeft:5,
		borderRadius:1,
		borderColor:"black",
    width:220,  
    height:56, 
    hintText:'Name',
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		top:50
	});

	var access_label = Ti.UI.createLabel({
		text:'Private:',
		top:150,
		left:50
	});

	var access_switch = Ti.UI.createSwitch({
		value:true,
		top:150,
		left:120
	});

	var save_button = Ti.UI.createButton({  
    value:"Save",
		top:250,
    width:150,  
    height:50
	});
	
	finish = function(capsule) {
		log("=============Capsule");
		log(capsule);
		Controllers.capsules.show(capsule.id);
	}

	save_button.addEventListener('click', function() {
		if(!name.value) name.value = "Untitled Capsule";
		var access = access_switch.value ? "private" : "public";
		delegate.createCapsule(finish, {name : name.value, access: access, when : new Date(), where: "Here"});
	});
	
	win.add(name);
	win.add(access_label);
	win.add(access_switch);
	win.add(save_button);

	return win;
}
