import { assert } from "chai";

describe("General API", () => {
	before(async () => {
		await browser.url(`test/pages/FormBasic.html`);
	});

	it("tests Form, FormGroup and FormItem calculated state", async () => {
		const form = await browser.$("#testForm");

		// when layout="S1 M2 L3 XL6" is given

		assert.strictEqual(await form.getProperty("columnsS"), 2, "Columns in S is 1");
		assert.strictEqual(await form.getProperty("labelSpanS"), 12, "Label span in S is 12");
		// assert
		assert.strictEqual(await form.getProperty("columnsM"), 2, "Columns in M are 2");
		assert.strictEqual(await form.getProperty("labelSpanM"), 4, "Label span in M is 4");
		// assert
		assert.strictEqual(await form.getProperty("columnsL"), 3, "Columns in M are 2");
		assert.strictEqual(await form.getProperty("labelSpanL"), 4, "Label span in L is 4");
		// assert
		assert.strictEqual(await form.getProperty("columnsXL"), 6, "Columns in M are 2");
		assert.strictEqual(await form.getProperty("labelSpanXL"), 4, "Label span in XL is 4");
	});
	
});
