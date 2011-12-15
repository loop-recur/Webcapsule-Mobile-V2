Layouts = {};

Layouts.replaceContent = function(new_content) {		
	if(Layouts.current_content) Layouts.content_window.remove(Layouts.current_content);
	Layouts.content_window.add(new_content);
	Layouts.current_content = new_content;
};
