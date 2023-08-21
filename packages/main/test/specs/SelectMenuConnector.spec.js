import { assert } from "chai";

describe("Select Menu Connector integration", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/SelectMenuLifecycle.html`);
	});

	it("Changing the menu property connects and disconnects", async () => {
		const select = await browser.$("#sel1");
		const selectLabel = select.shadow$(".ui5-select-label-root");

		let selectText = await selectLabel.getText();
		assert.strictEqual(selectText, "", "Select with no options and no menu is empty.");

		// Connect the select to a menu
		await select.setAttribute("menu", "menu1");

		selectText = await selectLabel.getText();
		assert.include(selectText, "Skirt [3]", "When connected to a menu, the select should update its label");

		// Connect the select to another menu
		await select.setAttribute("menu", "menu2");

		selectText = await selectLabel.getText();
		assert.include(selectText, "Phone", "When connected to another menu, the select should update its label");
	});

	it("Waiting for a menu to be rendered works", async () => {
		const select = await browser.$("#sel1");
		const menu = await browser.$("#menu1");
		const selectLabel = select.shadow$(".ui5-select-label-root");

		let selectText = await selectLabel.getText();
		assert.strictEqual(selectText, "", "Select with no options and no menu is empty.");

		// A menu on the page now matches the "menu" property of the select
		await menu.setAttribute("id", "NO_MENU_WITH_THIS_ID");
		await browser.pause(1000); // wait for the polling to take effect

		selectText = await selectLabel.getText();
		assert.include(selectText, "Skirt [3]", "When connected to a menu, the select should update its label");
	});
});
