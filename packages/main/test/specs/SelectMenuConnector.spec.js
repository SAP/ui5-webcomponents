import { assert } from "chai";

describe("Select Menu general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/SelectMenuLifecycle.html`);
	});

	it("first option is selected by default", async () => {
		const select = await browser.$("#sel1");
		const selectLabel = select.shadow$(".ui5-select-label-root");

		let selectText = await selectLabel.getText();
		assert.strictEqual(selectText, "", "Select with no options and no menu is empty.");

		// Connect the select to a menu
		select.setAttribute("id", "menu1");

		selectText = await selectLabel.getText();
		assert.include(selectText, "Skirt [3]", "When connected to a menu, the select should update its label");

		// Connect the select to another menu
		select.setAttribute("id", "menu2");

		selectText = await selectLabel.getText();
		assert.include(selectText, "Phone", "When connected to another menu, the select should update its label");
	});
});
