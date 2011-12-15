describe("RestApi", function() {	
	var rest_api, successFun, errorFun, stories_response, story_response, story, stories;
	
	beforeEach(function() {
		App = {};
		App.http_client = LoopRecur.HttpClient(Mocks.FakeHttpClient);
		successFun = jasmine.createSpy("success_fun");
		errorFun = jasmine.createSpy("error_fun");
		story_response = "{\"id\":\"2\", \"title\":\"Yo\"}";
		stories_response = "["+story_response+"]";
		story = JSON.parse(story_response);
		stories = JSON.parse(stories_response);
		rest_api = RestApi("stories");
  });

	describe("all", function() {
		beforeEach(function() {
			Cache.stories = {};
		});
		
		describe("success", function() {
		  beforeEach(function() {
				stubHttp("get", stories_response);
				rest_api.all(successFun, {awesome : true});
		  });

			it("calls the correct url", function() {
				expect(App.http_client.get).toHaveBeenCalledWith("/stories.json", {awesome : true}, {
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
			});

			it("calls the success fun", function() {
				expect(successFun).toHaveBeenCalledWith(stories);
			});
			
			it("recaches the response", function() {
				expect(Cache.stories).toEqual(stories);
			});
		});

		describe("error", function() {
			beforeEach(function() {
				stubHttp("get", stories_response, true);
		  });

			it("calls the error callback", function() {
				rest_api.all({success: successFun, error: errorFun});
				expect(errorFun).toHaveBeenCalledWith(stories_response);
				expect(successFun).toHaveBeenCalledWith(Cache.stories);
			});

			it("calls success with the last response", function() {
				rest_api.all(successFun);
				expect(successFun).toHaveBeenCalledWith(Cache.stories);
			});
		});
	});
	
	
	describe("find", function() {
		beforeEach(function() {
		  Cache.stories = [story];
		});
		
		describe("success", function() {
		  beforeEach(function() {
				stubHttp("get", story_response);
		  });

			it("calls the correct url", function() {
				rest_api.find(2, successFun);
				expect(App.http_client.get).toHaveBeenCalledWith("/stories/2.json", {}, {
			        success: jasmine.any(Function),
							error: jasmine.any(Function)
			    });
			});

			it("calls the success fun", function() {
				rest_api.find(2, successFun);
				expect(successFun).toHaveBeenCalledWith(story);
			});
			
			it("recaches the response", function() {
				Cache.stories = [{id: 2, name: "whatever"}];
				rest_api.find(2, successFun);
				expect(Cache.stories).toEqual([story]);
			});
			
			it("pushes a new story into the cache if it didn't exist", function() {
				Cache.stories = [{id: 1, name: "whatever"}];
				rest_api.find(2, successFun);
				expect(Cache.stories).toEqual([story, {id: 1, name: "whatever"}]);
			});
		});
		
		describe("error", function() {
			beforeEach(function() {
				stubHttp("get", story_response, 500);
		  });

			it("calls success with the last response", function() {
				rest_api.find(2, successFun);
				expect(successFun).toHaveBeenCalledWith(story);
			});
			
			it("recaches the response", function() {
				rest_api.find(2, successFun);
				expect(Cache.stories).toEqual([story]);
			});
		});
	});
	
	
	describe("save", function() {
		describe("success", function() {
		  beforeEach(function() {
				stubHttp("post", story_response);
		  });

			it("calls the right url", function() {
				rest_api.save({name : "fake"}, successFun, {progress_bar: "bar"});
				expect(App.http_client.post).toHaveBeenCalledWith("/stories.json", {name: "fake"}, {
						progress_bar: "bar",
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
			});

			it("calls the right url when temp", function() {
				var story = {name : "fake", id : "temp-123"};
				rest_api.save(story, successFun, {progress_bar: "bar"});
				expect(App.http_client.post).toHaveBeenCalledWith("/stories.json", story, {
						progress_bar: "bar",
		        success: jasmine.any(Function),
						error: jasmine.any(Function)
		    });
			});

			it("calls the success fun", function() {
				rest_api.save({name : "fake"}, successFun, {progress_bar: "bar"});
				expect(successFun).toHaveBeenCalledWith(story);
			});
			
			it("pushes a new story into the cache if it didn't exist", function() {
				Cache.stories = [{id: 1, name: "whatever"}];
				rest_api.save({name : "fake"}, successFun, {progress_bar: "bar"});
				expect(Cache.stories).toEqual([story, {id: 1, name: "whatever"}]);
			});
			
			it("recaches the response", function() {
				Cache.stories = [{id: "temp-123", name: "whatever"}];
				rest_api.save({id: "temp-123", name : "fake"}, successFun, {progress_bar: "bar"});
				expect(Cache.stories).toEqual([story]);
			});
		});
		
		describe("error", function() {
			
			describe("validation error", function() {
			  beforeEach(function() {
					stubHttp("post", story_response, 400);
					rest_api.save({name : "fake"}, {success:successFun, error: errorFun}, {progress_bar: "bar"});
			  });
			
				it("calls the error callback", function() {
					expect(errorFun).toHaveBeenCalledWith(story_response);
				});

				it("doesn't call success with the response", function() {
					expect(successFun).not.toHaveBeenCalledWith({name : "fake"});
				});
			});
		
			describe("Server down", function() {
				beforeEach(function() {
					stubHttp("post", story_response, 500);
					rest_api.save({name : "fake"}, {success:successFun, error: errorFun}, {progress_bar: "bar"});
			  });
			
				it("doesn't call the error callback", function() {
					expect(errorFun).not.toHaveBeenCalledWith(story_response);
				});

				it("calls success with the cached response", function() {
					expect(successFun).toHaveBeenCalledWith({name : "fake"});
				});

				it("pushes a new story into the cache if it didn't exist", function() {
					Cache.stories = [{id: 1, name: "whatever"}];
					rest_api.save({id: "temp-123", name : "fake"}, successFun, {progress_bar: "bar"});
					expect(Cache.stories).toEqual([{id: "temp-123", name: "fake"}, {id: 1, name: "whatever"}]);
				});

				it("updates the cache", function() {
					Cache.stories = [{id: "temp-123", name: "whatever"}];
					rest_api.save({id: "temp-123", name : "fake"}, successFun, {progress_bar: "bar"});
					expect(Cache.stories).toEqual([{id: "temp-123", name: "fake"}]);
				});
			});
		});
		
	});
	
});
