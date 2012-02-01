Layouts.login = function(delegate) {
	
	var doLogin = function() {
		delegate.login_with_credentials(username.value, password.value, function(){
			win.close();
		});
	}
	
	var win = Ti.UI.createWindow({
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT],
		barColor:"black"
	});
	
	var logo = Ti.UI.createView({
		backgroundImage:"images/login/webcap_logo_large.png",
		width:171,
		height:28,
		top:80
	});
	
	var username = Ti.UI.createTextField({
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
		top:135
	});

	username.addEventListener('return', function() {
		password.focus();
	});

	var password = Ti.UI.createTextField({
		backgroundImage:"images/login/webcap_login_input_box.png",
		backgroundSelectedImage:"images/login/webcap_login_input_box_active.png",
    top:192,  
    width:260,
    height:56,
		paddingLeft:15,
		paddingBottom:5,  
    hintText:'Password',
		font:{fontFamily:'GillSans',fontSize:"16dp",fontWeight:'regular'},
    passwordMask:true,
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType:Ti.UI.RETURNKEY_GO,
		borderRadius:4
	});

	password.addEventListener('return', doLogin);

	var login_button = Ti.UI.createButton({  
    value:false,
		top:50,
  	right:10,
    width:49,  
    height:133
	});

	login_button.addEventListener('click', doLogin);

	var login_twitter = Ti.UI.createButton({
		backgroundImage:"images/login/webcap_login_with_twitter_btn.png",
		backgroundSelectedImage:"images/login/webcap_login_with_twitter_btn_active.png",
		top:267,
		height:55,
		width:290
	});
	
	var login_facebook = Ti.UI.createButton({
		backgroundImage:"images/login/webcap_login_with_facebook_btn.png",
		backgroundSelectedImage:"images/login/webcap_login_with_facebook_btn_active.png",
		top:330,
		height:55,
		width:290
	});

	var create_account = Ti.UI.createButton({
		backgroundImage:"images/login/webcap_create_new_user_btn.png",
		backgroundSelectedImage:"images/login/webcap_create_new_user_btn_active.png",
		top:393,
		height:55,
		width:290
	});
	
	create_account.addEventListener('click', Controllers.accounts.init);
	
	// TODO: spash
	login_twitter.addEventListener('click', function(){
		Helpers.user.connectTwitter({
			success: function(user) {
				win.close();
			},
			error: function(){ alert("Couldn't login you in with Twitter"); }
		});
	});
	
	login_facebook.addEventListener('click', function(){
		Helpers.user.connectFacebook({
			success: function(user) {
				win.close();
			},
			error: function(){ alert("Couldn't authorize Facebook"); }
		});
	});
	
	win.add(logo);
	win.add(username);
	win.add(password);

	win.add(login_facebook);
	win.add(login_twitter);
	win.add(create_account);
	win.open();
}
