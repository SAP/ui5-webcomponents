import { assert } from "chai";

describe("CheckBox general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/CheckBox.html`);
	});

	it("tests checked default value is false", async () => {
		const checkBox = await browser.$("#cb1");

		assert.notOk(await checkBox.getProperty("checked"), "Check if default value for checked is false");
	});

	it("tests change event", async () => {
		const checkBox = await browser.$("#cb1");
		const field = await browser.$("#field");

		await checkBox.click();
		await checkBox.keys("Space");
		await checkBox.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should be fired 3 times");
	});

	it("tests change event not fired, when disabled", async () => {
		const checkBox = await browser.$("#cb2");
		const field = await browser.$("#field");

		await checkBox.click();
		await checkBox.keys("Space");
		await checkBox.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more");
	});

	it("tests truncating and wrapping", async () => {
		const CHECKBOX_DEFAULT_HEIGHT = 44;
		const truncatingCb = await browser.$("#truncatingCb").shadow$(".ui5-checkbox-root");
		const wrappingCb = await browser.$("#wrappingCb");

		const truncatingCbHeight = await truncatingCb.getSize("height");
		const wrappingCbHeight = await wrappingCb.getSize("height");

		assert.strictEqual(truncatingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is : " + truncatingCbHeight);
		assert.isAbove(wrappingCbHeight, CHECKBOX_DEFAULT_HEIGHT, "The size of the checkbox is more than: " + CHECKBOX_DEFAULT_HEIGHT);
	});

	it("tests accessible-name and accessible-name-ref", async () => {
		const defaultCb = await browser.$("#cb2").shadow$(".ui5-checkbox-root");
		const accCheckBox = await browser.$("#accCb").shadow$(".ui5-checkbox-root");
		const accNameRefCheckBox = await browser.$("#accCb1").shadow$(".ui5-checkbox-root");

		const EXPECTED_ARIA_LABEL = "Hello world";
		const EXPECTED_ARIA_LABEL_NAME_REF = "ACC Test - aria-label";

		assert.strictEqual(await defaultCb.getAttribute("aria-label"), null, "aria-label is not set");
		assert.strictEqual(await accCheckBox.getAttribute("aria-label"), EXPECTED_ARIA_LABEL, "aria-label is set");
		assert.strictEqual(await accNameRefCheckBox.getAttribute("aria-label"), EXPECTED_ARIA_LABEL_NAME_REF, "aria-label is set");
	});

	it("tests ui5-icon", async () => {
		const checkboxChecked = await browser.$("#checkboxChecked").shadow$(".ui5-checkbox-icon");

		assert.strictEqual(await checkboxChecked.getAttribute("aria-hidden"), "true", "aria-hidden is set");
	});

	it("tests change event - value is changed", async () => {
		const defaultCb = await browser.$("#cb1");
		const currentChecked = await defaultCb.getProperty("checked");

		await defaultCb.click();

		assert.strictEqual(await defaultCb.getProperty("checked"), !currentChecked, "The checkbox is checked");
	});

	it("tests change event preventDefault - value is not changed", async () => {
		const defaultPreventedCbs = await browser.$$(".defaultPreventedCb");
		for(const defaultPreventedCb of defaultPreventedCbs) {
			const state = {
				checked: await defaultPreventedCb.getProperty("checked"),
				indeterminate: await defaultPreventedCb.getProperty("indeterminate"),
			}

			await defaultPreventedCb.click();

			assert.strictEqual(await defaultPreventedCb.getProperty("checked"), state.checked, "The checkbox checked is not changed");
			assert.strictEqual(await defaultPreventedCb.getProperty("indeterminate"), state.indeterminate, "The checkbox indeterminate is not changed");
		}
	});
});
