UI.SubTabs = function(win, tab_names, options) {	
	
	var width = Ti.Platform.displayCaps.platformWidth
	, backgroundImage = 'images/buttonbar/button2_selected.png'
	, backgroundSelectedImage = 'images/buttonbar/button2_unselected_shadow.png'
	, object = {}
	, options = options || {};
	
	var view = Ti.UI.createView({
		backgroundImage: "images/NCR_iPad2_main_bg.png"
	});
	
	var scrollview = Ti.UI.createView({
		top: 36,
		width:"100%",
		height:'100%'
	});
	
	var tabbedBarView = Ti.UI.createView({
    backgroundColor: '#111111',
    top: 0,
    height: 36
  });

	var tabbedBar = Ti.UI.createScrollView({
		top: 0,
    backgroundColor: 'transparent',
    height: 36,
		contentWidth:"auto",
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:false
	});
	

	var createTab = function(tab_name) {
		var base_width = 130;

		var index = tab_names.indexOf(tab_name);
		var left = ((index+1) * base_width);
		
		if(!options.center) {
			left = left - 130;
		} else {
			base_width = 120;
			var left = ((index+1) * 100) - 100;
		}
		
		var tab = Ti.UI.createButton({
	      backgroundImage: backgroundImage,
				backgroundSelectedImage: backgroundSelectedImage,
				title: tab_name,
	      height: 36,
				width: base_width,
				borderColor: "#444444",
				borderRadius: 1.0,
				font:{fontFamily:'GillSans',fontSize:"15dp",fontWeight:'regular'},
	      left: left,
	      id: tab_name
	  });
	
		tab.addEventListener('click', function(e) {
			App.removeChildren(scrollview, scrollview.children);
			object.delegate.getContent(scrollview, e);
		});
		
		return tab;
	}
	
	var buttons = map(createTab, tab_names);
	UI.ButtonGroup.apply(UI.ButtonGroup, buttons);
	
	map(function(t){ tabbedBar.add(t); }, buttons);
	
	if(!options.skip_back) {
		var backButton = Ti.UI.createButton({
			title: "Back",
			width: 50,
			height: 30,
			left: 0
		});

		backButton.addEventListener('click', function(e) {
			win.remove(view);
		});

		tabbedBar.add(backButton);
	}
	
	first(buttons).fireEvent('click', {});
	
	tabbedBarView.add(tabbedBar);
	view.add(tabbedBarView);
	view.add(scrollview);
	win.add(view);
	
	return object;
}