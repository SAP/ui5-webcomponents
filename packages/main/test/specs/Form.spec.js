import { assert } from "chai";

describe("General API", () => {
	before(async () => {
		await browser.url(`test/pages/form/FormBasic.html`);
	});

	it("tests calculated state of Form with layout='S1 M2 L3 XL6' and label-span='S12 M4 L4 XL4'", async () => {
		const form = await browser.$("#testForm1");

		// Given that layout="S1 M2 L3 XL6" and label-span="S12 M4 L4 XL4"
		assert.strictEqual(await form.getProperty("columnsS"), 1, "Columns in S is 1.");
		assert.strictEqual(await form.getProperty("labelSpanS"), 12, "Label span in S is 12.");

		assert.strictEqual(await form.getProperty("columnsM"), 2, "Columns in M are 2.");
		assert.strictEqual(await form.getProperty("labelSpanM"), 4, "Label span in M is 4.");

		assert.strictEqual(await form.getProperty("columnsL"), 3, "Columns in L are 3.");
		assert.strictEqual(await form.getProperty("labelSpanL"), 4, "Label span in L is 4.");

		assert.strictEqual(await form.getProperty("columnsXl"), 6, "Columns in XL are 6.");
		assert.strictEqual(await form.getProperty("labelSpanXl"), 4, "Label span in XL is 4.");
	});

	it("tests calculated state of Form with layout='S1 M2 L2 XL3' label-span='S12 M12 L12 XL12'", async () => {
		const form = await browser.$("#testForm2");

		// Given that layout="S1 M2 L3 XL6" and label-span="S12 M4 L4 XL4"
		assert.strictEqual(await form.getProperty("columnsS"), 1, "Columns in S is 1.");
		assert.strictEqual(await form.getProperty("labelSpanS"), 12, "Label span in S is 12.");

		assert.strictEqual(await form.getProperty("columnsM"), 2, "Columns in M are 2.");
		assert.strictEqual(await form.getProperty("labelSpanM"), 12, "Label span in M is 12.");

		assert.strictEqual(await form.getProperty("columnsL"), 2, "Columns in L are 2.");
		assert.strictEqual(await form.getProperty("labelSpanL"), 12, "Label span in L is 12.");

		assert.strictEqual(await form.getProperty("columnsXl"), 3, "Columns in XL are 3.");
		assert.strictEqual(await form.getProperty("labelSpanXl"), 12, "Label span in XL is 12.");
	});

	it("tests calculated state of two FormGroups in layout='S1 M2 L3 XL4'", async () => {
		const formGr1 = await browser.$("#testFormGroup4");
		const formGr2 = await browser.$("#testFormGroup5");
	
		// Gven that there are 2 groups and layout="S1 M2 L3 XL4"
		assert.strictEqual(await formGr1.getProperty("colsS"), 1, "In S both groups take by 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsS"), 1, "In M both groups take by 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsM"), 1, "In M both groups take by 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsM"), 1, "In M both groups take by 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsL"), 1, "Group1 takes 1 column in L.");
		assert.strictEqual(await formGr2.getProperty("colsL"), 2, "Group1 takes 2 columns in L.");

		assert.strictEqual(await formGr1.getProperty("colsXl"), 2, "In XL both groups take 2 cols each.");
		assert.strictEqual(await formGr2.getProperty("colsXl"), 2, "In XL both groups take 2 cols each.");
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL6'", async () => {
		const formGr1 = await browser.$("#testFormGroup1");
		const formGr2 = await browser.$("#testFormGroup2");
		const formGr3 = await browser.$("#testFormGroup3");

		// Gven that there are 3 groups and layout="S1 M2 L3 XL6"
		assert.strictEqual(await formGr1.getProperty("colsS"), 1, "In S all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsS"), 1, "In S all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsS"), 1, "In S all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsM"), 1, "In M all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsM"), 1, "In M all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsM"), 1, "In M all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsL"), 1, "In L all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsL"), 1, "In L all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsL"), 1, "In L all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsXl"), 2, "In XL both groups take 2 cols each.");
		assert.strictEqual(await formGr2.getProperty("colsXl"), 2, "In XL both groups take 2 cols each.");
		assert.strictEqual(await formGr3.getProperty("colsXl"), 2, "In XL both groups take 2 cols each.");
	});

	it("tests calculated state of three FormGroups in layout='S1 M2 L3 XL4'", async () => {
		const formGr1 = await browser.$("#testFormGroup6");
		const formGr2 = await browser.$("#testFormGroup7");
		const formGr3 = await browser.$("#testFormGroup8");

		// Gven that there are 3 groups and layout="S1 M2 L3 XL4"
		assert.strictEqual(await formGr1.getProperty("colsS"), 1, "In S all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsS"), 1, "In S all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsS"), 1, "In S all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsM"), 1, "In M all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsM"), 1, "In M all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsM"), 1, "In M all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsL"), 1, "In L all groups take 1 column.");
		assert.strictEqual(await formGr2.getProperty("colsL"), 1, "In L all groups take 1 column.");
		assert.strictEqual(await formGr3.getProperty("colsL"), 1, "In L all groups take 1 column.");

		assert.strictEqual(await formGr1.getProperty("colsXl"), 1, "In XL first group takes 1 col.");
		assert.strictEqual(await formGr2.getProperty("colsXl"), 2, "In XL second group takes 2 cols.");
		assert.strictEqual(await formGr3.getProperty("colsXl"), 1, "In XL third group takes 1 col.");
	});
	
});
