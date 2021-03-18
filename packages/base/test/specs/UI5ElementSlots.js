const assert = require("chai").assert;

describe("Slots work properly", () => {
	before(() => {
		browser.url("http://localhost:9191/test-resources/pages/AllTestElements.html");
	});

	it("Tests that properties exist on the element for each slot", () => {
		const res = browser.execute(() => {
			const expectedValues = {};

			const el = document.getElementById("withContent");

			expectedValues.default = el.default.length > 0;
			expectedValues.other = el.other.length === 2;
			expectedValues.individual = el.individual.length === 2;
			expectedValues.items = el.items.length === 2;
			expectedValues.named = el.named === undefined;

			return expectedValues;
		});

		assert.strictEqual(res.default, true, "There are elements in the default property");
		assert.strictEqual(res.other, true, "There are 2 elements in the other property");
		assert.strictEqual(res.individual, true, "There are 2 elements in the individual property");
		assert.strictEqual(res.items, true, "There are 2 elements in the items property");
		assert.strictEqual(res.named, true, "There is no named property as propertyName changed it to items");
	});

	it("Tests that individualSlots modifies the slot property of slotted children", () => {
		assert.strictEqual(browser.$$("#withContent>[slot=individual]").length, 0, "There are no children with slot=individual");
		assert.strictEqual(browser.$$("#withContent>[slot=individual-1]").length, 1, "The slot of the first child became individual-1");
		assert.strictEqual(browser.$$("#withContent>[slot=individual-2]").length, 1, "The slot of the second child became individual-2");
	});

});
