Layouts.geolocation = function(story) {	
	Ti.include("version.js");
	
	Ti.Geolocation.preferredProvider = "gps";
	var tries = 0;

	if (isIPhone3_2_Plus()) { Ti.Geolocation.purpose = "Find location to mark video";};

	function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}
	
	function runIt() {
		var locationAdded = false;

		if (Titanium.Geolocation.locationServicesEnabled==false)
		{
			Titanium.UI.createAlertDialog({title:'Webcapsule', message:'Your device has geo turned off - turn it on.'}).show();
		}
		else
		{
			if (Titanium.Platform.name != 'android') {
				var authorization = Titanium.Geolocation.locationServicesAuthorization
				if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title:'Webcapsule',
						message:'You have disallowed Webcapsule from running geolocation services.'
					}).show();
				}
				else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title:'Webcapsule',
						message:'Your system has disallowed Webcapsule from running geolocation services.'
					}).show();
				}
			}

			// SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
			// Titanium.Geolocation.ACCURACY_BEST
			// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
			// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
			// Titanium.Geolocation.ACCURACY_KILOMETER
			// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS;
			Titanium.Geolocation.distanceFilter = 100;

			//
			// GET CURRENT POSITION - THIS FIRES ONCE
			//
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('Please double check you have location turned on.');
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;

				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			});

			//
			// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
			//
			var locationCallback = function(e) {
				if (!e.success || e.error) {
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;

				Titanium.Geolocation.distanceFilter = 200; //changed after first location event

				setTimeout(function()
				{},100);

				// reverse geo
				Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt) {
					Ti.API.info("IN CALLBACK: "+ evt.success);
					var story = Views.stories._form.source;

					if (evt.success) {
						var places = evt.places;
						if (places && places.length) {
							story.where = places[0].address;
							Titanium.Geolocation.removeEventListener('location', locationCallback);

							try{ Views.stories._form.toggle_geolocation(true); } catch(e){};
							Ti.API.debug("ADDRESS FOUND AND SET");
							Ti.API.info(places[0].address);
						} else {
							story.where = "";
						}
						Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
					}
					else {
						tries += 1;
						if(tries >= 4) {
							Titanium.Geolocation.removeEventListener('location', locationCallback);
							alertUser();
						}

						Ti.API.info("Code translation: "+translateErrorCode(e.code));
					}
				});
			};

			Titanium.Geolocation.addEventListener('location', locationCallback);

			locationAdded = true;
		}
	}
	
	var alerted = false;
	function alertUser() {
		if(!alerted) {
			alert("Sorry, we could not locate you at this time.  Please try again later.");
			alerted = true;
		}
	}
	
	setTimeout(runIt, 100);
};