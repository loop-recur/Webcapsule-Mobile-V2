Gallery = function(contents, index) {
	var current_view;
	
	var win = Ti.UI.createWindow({
		title: "Capsule",
		backgroundColor: "white",
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
	});
	
	var showContent = function() {
		var content = contents[index];
		var next_view = Views[content.kind].show(content)
		if(!current_view) {
			win.add(next_view);
		} else {
			current_view.animate({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT, view: next_view});
			current_view = next_view;
		}
	}
	
	win.addEventListener('swipe', function(e) {
		if((e.direction == "left") && contents[index+1]) {
			index += 1;
		} else if((e.direction == "right") && contents[index-1]) {
			index -= 1;
		}
		showContent();
	});
	
	showContent();
	
	return win;
}
