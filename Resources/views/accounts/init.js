Views.accounts.init = function(delegate) {	
	var win = Ti.UI.createWindow({
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});

	var full_name = Ti.UI.createTextField({  
			backgroundImage:"images/login/webcap_login_input_box.png",
			backgroundSelectedImage:"images/login/webcap_login_input_box_active.png",  
			paddingLeft:15,
			paddingBottom:5,
			borderRadius:4,
	    width:260,  
	    height:56, 
	    hintText:'Full Name', 
			font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'}, 
	    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,
			top:30
	});  

	full_name.addEventListener('return', function() {
		email.focus();
	});

	var email = Ti.UI.createTextField({ 
	    backgroundImage:"images/login/webcap_login_input_box.png",
			backgroundSelectedImage:"images/login/webcap_login_input_box_active.png",  
			paddingLeft:15,
			paddingBottom:5,
			borderRadius:4,
	    width:260,  
	    height:56, 
	    hintText:'Email', 
			font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'}, 
	    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,
			top:87
	});
	
	email.addEventListener('return', function() {
		password.focus();
	});

	var password = Ti.UI.createTextField({
	    backgroundImage:"images/login/webcap_login_input_box.png",
			backgroundSelectedImage:"images/login/webcap_login_input_box_active.png",  
			paddingLeft:15,
			paddingBottom:5,
			borderRadius:4,
	    width:260,  
	    height:56, 
	    hintText:'Password',
			passwordMask:true, 
			font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'}, 
	    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,
			top:144
	});

	password.addEventListener('return', function() {
		password_confirm.focus();
	});

	var password_confirm = Ti.UI.createTextField({  
	    backgroundImage:"images/login/webcap_login_input_box.png",
			backgroundSelectedImage:"images/login/webcap_login_input_box_active.png",  
			paddingLeft:15,
			paddingBottom:5,
			borderRadius:4,
	    width:260,  
	    height:56, 
	    hintText:'Confirm Password', 
			passwordMask:true,
			font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'}, 
	    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,
			top:201 
	});

	// var create_account_button = Ti.UI.createButton({  
	//     value:false,
	// 		title: "create",
	//     bottom:160,
	//   	right:10,
	//     width:133,
	//     height:49
	// });

	var create_account_button = Ti.UI.createButton({
		backgroundImage:"images/login/webcap_create_new_user_btn.png",
		backgroundSelectedImage:"images/login/webcap_create_new_user_btn_active.png",
		top:275,
		height:55,
		width:290
	});

	var cancel_button = Ti.UI.createButton({
		backgroundImage:"images/share/webcap_share_modal_cancel_btn.png",
		width: 320,
		height: 61,
		bottom:60,
		zIndex:30
	});

	cancel_button.addEventListener('click', function() {
		win.close();
	});
	
	var finish = function() {
		win.close();
	}

	create_account_button.addEventListener('click', function(){
		delegate.create(finish, {full_name: full_name.value, email: email.value, password: password.value, password_confirm: password_confirm.value})
	});

	win.add(full_name);
	win.add(email);
	win.add(password_confirm);
	win.add(password);
	win.add(create_account_button);
	win.add(cancel_button);
  win.open();
}
