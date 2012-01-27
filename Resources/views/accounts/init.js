Views.accounts.init = function(delegate) {	
	var win = Ti.UI.createWindow({
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		//barColor:'black'
	});

	var full_name = Ti.UI.createTextField({  
	    paddingLeft:5,
			top:30,   
	    width:290,  
	    height:35,  
	    hintText:'Full Name',  
	    keyboardType:Ti.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,  
	    borderRadius:4
	});  

	full_name.addEventListener('return', function() {
		email.focus();
	});

	var email = Ti.UI.createTextField({ 
	    paddingLeft:5,
			top:80,   
	    width:290,  
	    height:35,  
	    hintText:'Email',  
	    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,  
	    borderRadius:4
	});
	
	email.addEventListener('return', function() {
		password.focus();
	});

	var password = Ti.UI.createTextField({
	    top:130,
			paddingLeft:5, 
	    width:290,  
	    height:35,  
	    hintText:'Password',  
	    passwordMask:true,  
	    keyboardType:Ti.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Ti.UI.RETURNKEY_NEXT,  
	    borderRadius:4  
	});

	password.addEventListener('return', function() {
		password_confirm.focus();
	});

	var password_confirm = Ti.UI.createTextField({  
	    paddingLeft:5,
			top:180,  
	    width:290,  
	    height:35,  
	    hintText:'Confirm Password',  
	    passwordMask:true,  
	    keyboardType:Ti.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Ti.UI.RETURNKEY_DONE,  
	    borderRadius:4 
	});

	var create_account_button = Ti.UI.createButton({  
	    value:false,
			title: "create",
	    bottom:160,
	  	right:10,
	    width:133,
	    height:49
	});

	var cancel_button = Ti.UI.createButton({  
	    value:false,
			title: "cancel",
	    bottom:160,
	  	left:10,
	    width:133,  
	    height:49
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
