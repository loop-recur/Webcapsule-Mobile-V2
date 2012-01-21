UI.createAvatar = function(attrs) {
	var view = Ti.UI.createView({left: attrs.left, right: attrs.right, top: attrs.top, bottom: attrs.bottom, width: 'auto', height: 'auto', zIndex: 20});
	
	var image = Ti.UI.createImageView(attrs);
	// if(App.getCurrentUser().id == attrs.id) 
	return image;
	var removeViews = function() {
		Eventer.fire("removeViews");
	}
		
	var setupButton = function(friend_view, friend_button) {
		var isFollowing = Controllers.followings.isFollowing(attrs.id);
		var method = isFollowing ? 'destroy' : 'create';
		var buttonListener = Controllers.followings[method].p(removeViews, {id: attrs.id});
		
		friend_button.addEventListener('click', buttonListener);
		friend_button.title = isFollowing ? "Unfollow" : "Follow";
	}
	
	var makeView = function() {
		log("making view");
		var position_top = attrs.top || attrs.bottom + 8;
		var position_left = attrs.left || attrs.right + 8;
		
		var friend_view = Ti.UI.createView({
			backgroundColor: 'white',
			borderRadius: 8,
			borderWidth: 1,
			borderColor: 'white',
			width: 160,
			height: 100,
			zIndex: 21,
			top: position_top,
			left: position_left
		});
		
		var friend_button = Ti.UI.createButton({
			width: 80,
			height: 30,
			zIndex: 99
		});
		
		var close_button = Ti.UI.createButton({
			title: "X",
			width: 40,
			height: 40,
			top: -2,
			right: -4,
			zIndex: 99
		});
		
		friend_view.add(friend_button);
		view.add(friend_view);
		friend_view.add(close_button);
		setupButton(friend_view, friend_button);

		close_button.addEventListener("click", function(){
			view.remove(friend_view);
		});
				
		Eventer.set("removeViews", function(){
			view.remove(friend_view);
		});
	}
	
	view.add(image);
	view.addEventListener('click', makeView);
	
	return view;
}
