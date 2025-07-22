import { assert } from "chai";
const KEYS = {
	ENTER: '\uE007',
	SPACE: '\ue00D',
}

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

	it("tests readonly space and enter keys active state", async () => {
		const checkBox = await browser.$("#cbReadonly");

		await checkBox.click(); // force focus

		// Setup for SPACE Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [{ type: 'keyDown', value: KEYS.SPACE }],
			}]);
		// Action
		assert.strictEqual(await checkBox.getAttribute("active"), null, "Space doesn't trigger active attr");
		await browser.releaseActions();

		// Setup for ENTER Key
		await browser.performActions([{
			type: 'key',
			id: 'keyboard3',
			actions: [{ type: 'keyDown', value: KEYS.ENTER }],
			}]);
		// Action
		assert.strictEqual(await checkBox.getAttribute("active"), null, "Enter doesn't trigger active attr");
		await browser.releaseActions();
	});

	it("tests change event not fired, when disabled", async () => {
		const checkBox = await browser.$("#cb2");
		const field = await browser.$("#field");

		await checkBox.click();
		await checkBox.keys("Space");
		await checkBox.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "Change event should not be called any more");
	});

	it("tests change events not fired when displayOnly", async () => {
		const checkBox = await browser.$("#displayOnlyCb");
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

	it("tests _accInfo", async () => {
		const cbCustomAria = await browser.$("#accCustomAria").shadow$(".ui5-checkbox-root");

		const EXPECTED_ROLE = "presentation";

		assert.strictEqual(await cbCustomAria.getAttribute("role"), EXPECTED_ROLE, "aria role is custom set");
		assert.notOk(await cbCustomAria.getAttribute("aria-checked"), "aria-checked should not be rendered if not set in _accInfo");
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

	it("tests form submission when checkbox is required, but unchecked", async () => {
		const submitButton = await browser.$("#cbSubmit");

		await submitButton.click();

		assert.strictEqual(await browser.$("#cbFormSubmitted").getValue(), "false", "Form is not submitted");
	});

	it("tests form submission when checkbox is checked and button is clicked", async () => {
		const thirdCheckbox = await browser.$("#cbItem3");
		const submitButton = await browser.$("#cbSubmit");

		await thirdCheckbox.click();
		await submitButton.click();

		assert.strictEqual(await browser.$("#cbFormSubmitted").getValue(), "true", "Form is submitted");
	});

	it("tests displayOnly mode - checkbox cannot be toggled", async () => {
		const checkBox = await browser.$("#displayOnlyCb");
		const initialCheck = await checkBox.getProperty("checked");

		await checkBox.click();

		assert.strictEqual(await checkBox.getProperty("checked"), initialCheck, "Checkbox state should not be changed");
	});

	it("tests displayOnly mode - checkbox is not focusable", async () => {
		const checkBox = await browser.$("#displayOnlyCb");

		await checkBox.click();

		assert.strictEqual(await checkBox.isFocused(), false, "Checkbox should not be focusable");
	});

	it("tests displayOnly mode - checkbox is not in the tab chain", async () => {
		const checkbox = await browser.$("#displayOnlyCb").shadow$(".ui5-checkbox-root");
		assert.strictEqual(await checkbox.getAttribute("tabindex"), null, "Checkbox should not be in the tab chain");
	});

	it("tests displayOnly mode - displays the correct icon", async () => {
		const checkBox = await browser.$("#displayOnlyCb");
		const icon = await checkBox.shadow$("ui5-icon");

		assert.strictEqual(await icon.getAttribute("name"), "border", "Displays the correct icon for not checked");

		await checkBox.setAttribute("checked", "true");
		assert.strictEqual(await icon.getAttribute("name"), "complete", "Displays the correct icon for checked");

		await checkBox.setAttribute("indeterminate", "true");
		assert.strictEqual(await icon.getAttribute("name"), "tri-state", "Displays the correct icon for indeterminate checked");
	});
});
