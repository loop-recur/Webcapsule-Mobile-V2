describe("HttpClient", function() {
	var http_client, titanium_client, call_backs;

  beforeEach(function() {
		titanium_client = Mocks.FakeHttpClient;
		HTTPClientWithCache = function(){ return titanium_client; };
		spyOn(titanium_client, "open");
		spyOn(titanium_client, "send");
		spyOn(titanium_client, 'setRequestHeader');
		http_client = LoopRecur.HttpClient();
		http_client.base_url = "http://myurl.com";
		call_backs = {success: function(){}, error: function(){} };
  });

	it("uses credentials if it has them", function() {
		http_client.credentials = "encodedCredentials";
		http_client.get("http://myurl.com", call_backs);
		expect(titanium_client.setRequestHeader).toHaveBeenCalledWith('Authorization', 'encodedCredentials');
	});
	
	it("doesn't credentials if it doesn't have them", function() {
		http_client.get("http://myurl.com", call_backs);
		expect(titanium_client.setRequestHeader).not.toHaveBeenCalledWith('Authorization', 'encodedCredentials');
	});
	
	describe("Reguardless", function() {
		
		it("calls the callback.error on failure", function(){
			spyOn(call_backs, "error");
			titanium_client.send = jasmine.createSpy().andCallFake(function(){ titanium_client.options.onerror(); });
			http_client.post("/test", {test:"yup"}, call_backs);
			expect(call_backs.error).toHaveBeenCalled();
		});
		
		it("calls the callback.success on success", function(){
			spyOn(call_backs, "success");
			titanium_client.send = jasmine.createSpy().andCallFake(function(){ titanium_client.options.onload(); });
			http_client.get("/test", {test:"yup"}, call_backs);
			expect(call_backs.success).toHaveBeenCalled();
		});
	});

	describe("POST", function(){
		it("posts to the server", function() {
			http_client.post("/test", {test:"yup"}, call_backs);
			expect(titanium_client.open).toHaveBeenCalledWith("POST", "/test");
			expect(titanium_client.send).toHaveBeenCalledWith({ data: {test:"yup"}});
		});
		
		it("posts to the server w/o params", function() {
			http_client.post("/test", call_backs);
			expect(titanium_client.open).toHaveBeenCalledWith("POST", "/test");
			expect(titanium_client.send).toHaveBeenCalledWith({ data : {}});
		});
	});
	
	describe("GET", function(){
		it("gets to the server", function() {
			http_client.get("/whatever", {test:"yup", barf:"gross"}, call_backs);
			expect(titanium_client.open).toHaveBeenCalledWith("GET", "/whatever?test=yup&barf=gross&");
		});
		
		it("gets to the server w/o params", function() {
			http_client.get("/test", call_backs);
			expect(titanium_client.open).toHaveBeenCalledWith("GET", "/test");
		});
	});
});
