// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.include('initializers/init.js');
Titanium.Facebook.appid = "147009708687795";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream', "offline_access", "email"];

Ti.include('support/date.js');
Ti.include('support/oauth.js');
Ti.include('support/sha1.js');
Ti.include('support/birdhouse.js');

isAndroid = false;

App.run();

Authenticator.isAuthenticated() ? Controllers.application.index() : Controllers.authentications.index();
