Layouts.login = function(delegate) {
	
	var doLogin = function() {
		delegate.login_with_credentials(username.value, password.value, function(){
			win.close();
		});
	}
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#ffffffff'
	});
	
	var username = Ti.UI.createTextField({  
		paddingLeft:5,
		borderRadius:4,
    width:250,  
    height:35, 
    hintText:'Email',  
    keyboardType:Ti.UI.KEYBOARD_EMAIL,  
    returnKeyType:Ti.UI.RETURNKEY_NEXT,
		top:100
	});

	username.addEventListener('return', function() {
		password.focus();
	});

	var password = Ti.UI.createTextField({
    top:142,  
    width:250,
    height:35,
		paddingLeft:5,  
    hintText:'Password',
    passwordMask:true,
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType:Ti.UI.RETURNKEY_GO,
		borderRadius:4
	});

	password.addEventListener('return', doLogin);

	var login_button = Ti.UI.createButton({  
    value:false,
		top:195,
  	right:10,
    width:49,  
    height:133
	});

	login_button.addEventListener('click', doLogin);

	var login_twitter = Ti.UI.createButton({
		title: "twitter",
		top:277,
		height:55,
		width:290
	});
	
	var login_facebook = Ti.UI.createButton({
		title: "facebook",
		top:340,
		height:55,
		width:290
	});
	

	var create_account = Ti.UI.createButton({
		top:403,
		height:55,
		width:290
	});
	
	win.add(username);
	win.add(password);
	win.add(login_button);
	win.add(login_facebook);
	win.add(login_twitter);
	win.add(create_account);
	win.open();
}
