import { assert } from "chai";

describe("Slots work properly", () => {
	before(async () => {
		await browser.url("test/pages/AllTestElements.html");
	});

	it("Tests that properties exist on the element for each slot", async () => {
		const res = await browser.executeAsync(done => {
			const expectedValues = {};

			const el = document.getElementById("withContent");

			expectedValues.default = el.default.length > 0;
			expectedValues.other = el.other.length === 2;
			expectedValues.individual = el.individual.length === 2;
			expectedValues.items = el.items.length === 2;
			expectedValues.named = el.named === undefined;
			expectedValues.rowHeaderDefault = el["row-header"].length === 2;
			expectedValues.rowHeaderCamelCase = el.rowHeader.length === 2;

			done(expectedValues);
		});

		assert.strictEqual(res.default, true, "There are elements in the default property");
		assert.strictEqual(res.other, true, "There are 2 elements in the other property");
		assert.strictEqual(res.individual, true, "There are 2 elements in the individual property");
		assert.strictEqual(res.items, true, "There are 2 elements in the items property");
		assert.strictEqual(res.named, true, "There is no named property as propertyName changed it to items");
		assert.strictEqual(res.rowHeaderDefault, true, "There are 2 elements in the row-header accessor");
		assert.strictEqual(res.rowHeaderCamelCase, true, "There are 2 elements in the rowHeader accessor");
	});

	it("Tests that individualSlots modifies the slot property of slotted children", async () => {
		assert.strictEqual((await browser.$$("#withContent>[slot=individual]")).length, 0, "There are no children with slot=individual");
		assert.strictEqual((await browser.$$("#withContent>[slot=individual-1]")).length, 1, "The slot of the first child became individual-1");
		assert.strictEqual((await browser.$$("#withContent>[slot=individual-2]")).length, 1, "The slot of the second child became individual-2");
	});

	it("Tests that changing the slot attribute of children redistributes them across slot accessors", async () => {
		const defaultCount = (await browser.$("#withContent").getProperty("default")).length;
		const otherCount = (await browser.$("#withContent").getProperty("other")).length;
		const namedCount = (await browser.$("#withContent").getProperty("items")).length;

		const o1 = await browser.$("#o1");
		await o1.setAttribute("slot", ""); // move to default slot

		const o2  = await browser.$("#o2");
		await o2.setAttribute("slot", "named"); // move to "named" slot (with accessor "items")

		const newDefaultCount = (await browser.$("#withContent").getProperty("default")).length;
		const newOtherCount = (await browser.$("#withContent").getProperty("other")).length;
		const newNamedCount = (await browser.$("#withContent").getProperty("items")).length;

		assert.strictEqual(newDefaultCount, defaultCount + 1, "One more element in default accessor");
		assert.strictEqual(newOtherCount, otherCount - 2, "Two less elements in other accessor");
		assert.strictEqual(newNamedCount, namedCount + 1, "One more element in items accessor");
	});

});
