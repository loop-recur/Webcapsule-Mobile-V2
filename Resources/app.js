// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.include('initializers/init.js');
Titanium.Facebook.appid = "147009708687795";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream', "offline_access", "email"];

Ti.include('support/date.js');
Ti.include('support/tweeter/twitter_api.js');

isAndroid = false;

App.run();

App.setHost("http://localhost:3000/api");

Authenticator.isAuthenticated() ? Controllers.application.index() : Controllers.authentications.index();
