Views.comments.create = function(delegate, capsule) {
	var win = Ti.UI.createWindow({
		title: "Comments",
		backgroundColor: "white"
	});
	
	var field = Ti.UI.createTextArea({
		backgroundColor:false,
		value:'Add Comment...',
		height:55,
		width:275,
		top:15,
		textAlign:'left',
		font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'regular'}
	});
	
	var ok_button = Ti.UI.createButton({  
	    value:'Add comment',
	  	right:15,
			bottom:18,
	    width:83,  
	    height:49
	});
	
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
	
	win.add(field);
	win.add(ok_button);
	
	return win;
}
