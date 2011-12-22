Views.comments.create = function(delegate, capsule) {
	var win = Ti.UI.createWindow({
		title: "Add Comment",
		backgroundImage:"images/backgrounds/webcap_main_linen_bg.png"
	});
	
	var field_bg = Ti.UI.createView({
		backgroundImage:"images/addnew/webcap_addcontent_recessedbox.png",
		height:200,
		width:278,
		top:30
	});
	
	win.add(field_bg);
	
	var field = Ti.UI.createTextArea({
		backgroundColor:"transparent",
		paddingLeft:10,
		paddingTop:10,
		paddingRight:20,
		value:'Add Comment...',
		height:192,
		width:265,
		left:8,
		top:8,
		textAlign:'left',
		font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight:'regular'},
		returnKeyType:Ti.UI.RETURNKEY_DONE,
	});
	
	field_bg.add(field);
	

	var ok_button = Ti.UI.createButton({  
	    backgroundImage:"images/addnew/webcap_addcontent_addcomment_btn.png",
			bottom:18,
	    width:320,  
	    height:65
	});
	
	win.add(ok_button);
	
	field.addEventListener('focus', function() {
		if(field.value === "Add Comment...") field.value = "";
	});
	
	ok_button.addEventListener('click', function(){
		delegate.addComment(finish, capsule, field.value);
	});
	
	finish = function(){
		alert("Comment added!");
		Controllers.capsules.show(capsule.id);
	}
	
	return win;
}
