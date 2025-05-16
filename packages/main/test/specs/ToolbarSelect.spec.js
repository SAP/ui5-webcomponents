import { assert } from "chai";

describe("Toolbar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ToolbarSelect.html`);
	});

	it("Should render the select with the correct attributes", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const select = await toolbar.$("ui5-toolbar-select").shadow$("ui5-select");
		const valueState = await select.getAttribute("value-state");

		assert.strictEqual(valueState, "Critical", "Select value state is correct");
	});

	it("Should render the select with disabled property correctly", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const select =  await toolbar.$("ui5-toolbar-select[disabled]").shadow$("ui5-select");
		const disabled = await select.getAttribute("disabled");

		assert.strictEqual(disabled, "true", "Disabled select is rendered correctly");
	});

	it("Should render accessible name correctly", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const select = await toolbar.$("ui5-toolbar-select").shadow$("ui5-select");

		const accessibleName = await select.getAttribute("accessible-name");
		const accessibleNameRef = await select.getAttribute("accessible-name-ref");

		assert.strictEqual(accessibleName, "Add", "Select accessible name is correct");
		assert.strictEqual(accessibleNameRef, "title", "Select accessible name ref is correct");
	});

	// Events

	it("Should fire change event on selection change", async () => {
		const toolbar = await browser.$("ui5-toolbar");
		const select = await toolbar.$("ui5-toolbar-select").shadow$("ui5-select");
		const selectResult = await browser.$("input[placeholder='Changed']");

		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Enter");

		const selectResultText = await selectResult.getValue();

		assert.strictEqual(selectResultText, "1", "Select change event is fired correctly");
	});
});
