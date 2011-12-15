describe("ApplicationSpec", function() {	
	
	it("adds two dp values together", function() {
		expect(Helpers.Application.addDp("1dp", "2dp")).toEqual("3dp");
	});
	
	it("adds three dp values together", function() {
		expect(Helpers.Application.addDp("1dp", "2dp", "3dp")).toEqual("6dp");
	});
	
	it("adds 4 dp values together", function() {
		expect(Helpers.Application.addDp("1dp", "2dp", "3dp", "4dp")).toEqual("10dp");
	});
	
	it("adds 2 dp values and 1 non dp value together", function() {
		expect(Helpers.Application.addDp("1dp", "2dp", 2)).toEqual("5dp");
	});
	
	it("adds 2 dp values and 2 non dp value together", function() {
		expect(Helpers.Application.addDp("1dp", "2dp", 2, 3)).toEqual("8dp");
	});
	
});
