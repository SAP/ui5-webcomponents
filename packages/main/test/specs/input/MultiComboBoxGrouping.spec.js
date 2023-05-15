import { assert } from "chai";

describe("MultiComboBox :: Grouping", () => {
	it ("Tests group filtering", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-grouping");
		const input = await mcb.shadow$("#ui5-multi-combobox-input");
		const arrow = await mcb.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();

		assert.strictEqual(groupItems.length, 3, "Group items should be 3");
		assert.strictEqual(listItems.length, 12, "Items should be 12");

		await input.keys("B");

		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
		listItems = await popover.$("ui5-list").$$("ui5-li");

		assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
		assert.strictEqual(listItems.length, 1, "Filtered items should be 1");

		await input.keys("Backspace");
		await input.keys(['E', 'u', 'r', 'o', 'p', 'e']);

		assert.equal(await popover.getProperty("opened"), false, "Popover should not be open");
	});

	it ("Tests group item focusability", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-grouping");
		const input = await mcb.shadow$("#ui5-multi-combobox-input");
		const arrow = await mcb.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		await arrow.click();
		await input.keys("ArrowDown");

		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];

		assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Group header keyboard handling", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-grouping");
		const input = await mcb.shadow$("#ui5-multi-combobox-input");
		const arrow = await mcb.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		await arrow.click();
		await input.keys("ArrowDown");


		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];
		await groupItem.keys("Enter");

		assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
		assert.equal(await popover.getProperty("opened"), true, "Popover should not be open");
		assert.strictEqual(await input.getValue(), "", "The value is not updated");

		await groupItem.keys("Space");

		assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
		assert.equal(await popover.getProperty("opened"), true, "Popover should not be open");
		assert.strictEqual(await input.getValue(), "", "The value is not updated)");

		await groupItem.keys("ArrowUp");

		assert.equal(await groupItem.getProperty("focused"), false, "The first group header should be focused");
		assert.equal(await mcb.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Should not select group headers", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-grouping");
		const input = await mcb.shadow$("#ui5-multi-combobox-input");

		await input.click();
		await mcb.setProperty("value", "Asia");
		await mcb.keys("Enter");

		let tokens = await browser.$("#mcb-grouping").shadow$$(".ui5-multi-combobox-token");
		let selectionChangeFired = await browser.execute(() => document.getElementById("selection-change-events-fired").textContent);

		assert.strictEqual(await input.getValue(), "Asia", "The value remains");
		assert.strictEqual(tokens.length, 0, "The group header is not tokenized");
		assert.strictEqual(selectionChangeFired, "", "SelectionChange event is not fired");
	});
});