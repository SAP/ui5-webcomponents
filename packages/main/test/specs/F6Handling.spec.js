const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("Button general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/F6TestPage.html`);
	});

	it("Tests F6/Shift + F6", async () => {
		const divButton = await browser.$("#div-button");
		const panel = await browser.$("ui5-panel");
		const panelButton = await browser.$("#panel-button");
		const table = await browser.$("ui5-table");
		const tr = await table.shadow$("tr");
		const listItem = await browser.$("#list-item");
		const tabContainer = await browser.$("ui5-tabcontainer");
		const tab = await tabContainer.shadow$(".ui5-tab-strip-item");

		await browser.keys("F6");
		let activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");

		await browser.keys("F6");
		assert.ok(panel.isFocusedDeepElement(await panelButton.getHTML()), "First focusable element in the panel is focused");

		await browser.keys("F6");
		assert.ok(table.isFocusedDeepElement(await tr.getHTML()), "First focusable element in the table is focused");

		await browser.keys("F6");
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await listItem.getHTML(), "First focusable element in the list is focused");

		await browser.keys("F6");
		assert.ok(tabContainer.isFocusedDeepElement(await tab.getHTML()), "First focusable element in the tab container is focused");

		await browser.keys("F6");
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");
		
		await browser.keys(["Shift", "F6"]);
		assert.ok(tabContainer.isFocusedDeepElement(await tab.getHTML()), "First focusable element in the tab container is focused");

		await browser.keys(["Shift", "F6"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await listItem.getHTML(), "First focusable element in the list is focused");

		await browser.keys(["Shift", "F6"]);
		assert.ok(table.isFocusedDeepElement(await tr.getHTML()), "First focusable element in the table is focused");

		await browser.keys(["Shift", "F6"]);
		assert.ok(panel.isFocusedDeepElement(await panelButton.getHTML()), "First focusable element in the panel is focused");

		await browser.keys(["Shift", "F6"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");
	});

	it("Tests Alt(Option) + Down/Alt(Option) + Up", async () => {
		const divButton = await browser.$("#div-button");
		const panel = await browser.$("ui5-panel");
		const panelButton = await browser.$("#panel-button");
		const table = await browser.$("ui5-table");
		const tr = await table.shadow$("tr");
		const listItem = await browser.$("#list-item");
		const tabContainer = await browser.$("ui5-tabcontainer");
		const tab = await tabContainer.shadow$(".ui5-tab-strip-item");
		const resetFocusButton = await browser.$("#reset-focus");
		await resetFocusButton.click();

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		let activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		assert.ok(panel.isFocusedDeepElement(await panelButton.getHTML()), "First focusable element in the panel is focused");

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		assert.ok(table.isFocusedDeepElement(await tr.getHTML()), "First focusable element in the table is focused");

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await listItem.getHTML(), "First focusable element in the list is focused");

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		assert.ok(tabContainer.isFocusedDeepElement(await tab.getHTML()), "First focusable element in the tab container is focused");

		await browser.keys(["Control", "Alt", "ArrowDown"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");
		
		await browser.keys(["Control", "Alt", "ArrowUp"]);
		assert.ok(tabContainer.isFocusedDeepElement(await tab.getHTML()), "First focusable element in the tab container is focused");

		await browser.keys(["Control", "Alt", "ArrowUp"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await listItem.getHTML(), "First focusable element in the list is focused");

		await browser.keys(["Control", "Alt", "ArrowUp"]);
		assert.ok(table.isFocusedDeepElement(await tr.getHTML()), "First focusable element in the table is focused");

		await browser.keys(["Control", "Alt", "ArrowUp"]);
		assert.ok(panel.isFocusedDeepElement(await panelButton.getHTML()), "First focusable element in the panel is focused");

		await browser.keys(["Control", "Alt", "ArrowUp"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await $(activeElement).getHTML(), await divButton.getHTML(), "First focusable element in the div is focused");
	});
});
