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

			done(expectedValues);
		});

		assert.strictEqual(res.default, true, "There are elements in the default property");
		assert.strictEqual(res.other, true, "There are 2 elements in the other property");
		assert.strictEqual(res.individual, true, "There are 2 elements in the individual property");
		assert.strictEqual(res.items, true, "There are 2 elements in the items property");
		assert.strictEqual(res.named, true, "There is no named property as propertyName changed it to items");
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

		await browser("#o1").setAttribute("slot", ""); // move to default slot
		await browser("#o2").setAttribute("slot", "named"); // move to "named" slot (with accessor "items")

		const newDefaultCount = (await browser.$("#withContent").getProperty("default")).length;
		const newOtherCount = (await browser.$("#withContent").getProperty("other")).length;
		const newNamedCount = (await browser.$("#withContent").getProperty("items")).length;

		assert.ok(newDefaultCount === defaultCount + 1, "One more element in default accessor");
		assert.ok(newOtherCount === newOtherCount - 2, "Two less elements in other accessor");
		assert.ok(newNamedCount === newNamedCount + 1, "One more element in items accessor");
	});

});
