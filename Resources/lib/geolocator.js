Geolocator = (function() {		
	Ti.Geolocation.preferredProvider = "gps";
	if (!isAndroid) { Ti.Geolocation.purpose = "Find location to nearby address for video";};

var servicesIsEnabled = function() {
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

var _makeCoords = function(array) {
	return {latitude: array[0], longitude: array[1]}
}

var getCoordsForAddress = function(cb, address) {
	if(!address) return;
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', 'http://maps.googleapis.com/maps/geo?output=json&q=' + address);
	xhr.onload = function() {
    var json = JSON.parse(this.responseText);
		if(json.Status.code == 200) compose(cb, _makeCoords, pluck('coordinates'), pluck('Point'), first, pluck('Placemark'))(json);
	};
	xhr.send();
}


var getCurrentAddress = function(cb) {
	var tries = 0;
	
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

	
var getCurrentCoordinates = function(callback) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
	Ti.Geolocation.distanceFilter = 100;
	
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) return alert('Please double check you have location turned on.');
		if(callback) callback(e.coords);
	});
}
	
	return { getCurrentCoordinates : getCurrentCoordinates
					, servicesIsEnabled : servicesIsEnabled
					, getCurrentAddress: getCurrentAddress
					, getCoordsForAddress: getCoordsForAddress
				 }
})();
