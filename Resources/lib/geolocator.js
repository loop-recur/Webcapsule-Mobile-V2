Geolocator = (function() {		
	Ti.Geolocation.preferredProvider = "gps";
	if (!isAndroid) { Ti.Geolocation.purpose = "Find location to nearby address for video";};

servicesIsEnabled = function() {
	if (!Ti.Geolocation.locationServicesEnabled) {
		return false;
	} else {
		if (!isAndroid) {
			var authorization = Ti.Geolocation.locationServicesAuthorization;
			if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
				return false;
			}
		}
	}
	return true;
}


getCurrentAddress = function(cb) {
	var locationCallback = function(e) {
		if (!e.success || e.error) return log("Code translation: "+e.code);
		
		var longitude = e.coords.longitude
		, latitude = e.coords.latitude
		, altitude = e.coords.altitude
		, heading = e.coords.heading
		, accuracy = e.coords.accuracy
		, speed = e.coords.speed
		, timestamp = e.coords.timestamp
		, altitudeAccuracy = e.coords.altitudeAccuracy;
		
		Ti.Geolocation.distanceFilter = 200;
		
		// reverse geo
		Ti.Geolocation.reverseGeocoder(latitude,longitude,function(evt) {
			if (evt.success) {
				var places = evt.places;
				if (places && places.length) {
					cb(places[0].address);
					Ti.Geolocation.removeEventListener('location', locationCallback);
				} else {
					cb("Could not find address");
				}
				Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
			}
			else {
				tries += 1;
				if(tries >= 4) {
					Ti.Geolocation.removeEventListener('location', locationCallback);
					Ti.API.info("Code translation: "+e.code);
				}
			}
		});
	}
	Ti.Geolocation.addEventListener('location', locationCallback);
	getCurrentCoordinates();
}

	
getCurrentCoordinates = function(callback) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
	Ti.Geolocation.distanceFilter = 100;
	
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) return alert('Please double check you have location turned on.');
		if(callback) callback(e.coords);
	});
}
	
	return {getCurrentCoordinates : getCurrentCoordinates, servicesIsEnabled : servicesIsEnabled, getCurrentAddress: getCurrentAddress}
})();
