import { assert } from "chai";

describe("Grouping", () => {

	it ("Tests group filtering", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo-grouping");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();
		assert.strictEqual(groupItems.length, 4, "Group items should be 4");
		assert.strictEqual(listItems.length, 13, "Items should be 13");

		await input.keys("c");

		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
		listItems = await popover.$("ui5-list").$$("ui5-li");

		assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
		assert.strictEqual(listItems.length, 2, "Filtered items should be 2");
	});

	it ("Tests group item focusability", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		await arrow.click();
		await input.keys("ArrowDown");

		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];

		assert.ok(await groupItem.getProperty("focused"),  "The first group header should be focused");
	});

	it ("Tests input value while group item is focused", async () => {
		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		await input.keys("a");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[1];

		assert.ok(await groupItem.getProperty("focused"),  "The second group header should be focused");
		assert.strictEqual(await combo.getProperty("filterValue"), "a", "Filter value should be the initial one");
		assert.strictEqual(await combo.getProperty("value"), "", "Temp value should be reset to the initial filter value - no autocomplete");
	});
});

