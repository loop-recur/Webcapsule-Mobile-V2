UI.ButtonGroup = function() {	
	var buttons = argsToList(arguments);
	var registry = {};

	var makeActivatable = function(button) {
		registry[button.id] = {};
		registry[button.id].backgroundImage = button.backgroundImage;
		registry[button.id].backgroundSelectedImage = button.backgroundSelectedImage;
		return button;
	}
	
	var setInactive = function(button) {
		button.backgroundImage = registry[button.id].backgroundImage;
	}
	
	var setActive = function(button) {
		button.backgroundImage = registry[button.id].backgroundSelectedImage;
	}

	var toggleButtonState = function(e) {
		map(setInactive, buttons);
		setActive(e.source);
	}

	var addListeners = function(button) {
		button.addEventListener('click', toggleButtonState);
	}
	
	var activeButton = function() {
		return filter(isActive, buttons)[0];
	}
	
	var isActive = function(button) {
		return button.backgroundImage == registry[button.id].backgroundSelectedImage;
	}

	var init = map(compose(addListeners, makeActivatable));

	init(buttons);
	
	return {isActive : isActive, activeButton: activeButton};
}
