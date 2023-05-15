import { assert } from "chai";

describe("Accessibility", async () => {

	it ("Announce item on selection", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "List item 1 of 11";
		const itemAnnouncement2 = "List item 2 of 11";

		await arrow.click();

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), "", "Span value should be empty.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement1, "Span value is correct.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement2, "Span value is correct.")
	});

	it ("Announce item with additional text on selection", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combobox-two-column-layout");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "DZ List item 1 of 10";
		const itemAnnouncement2 = "AR List item 2 of 10";

		await arrow.click();

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), "", "Span value should be empty.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement1, "Span value is correct.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement2, "Span value is correct.")
	});

	it ("Announce group item when accessed via keyboard", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "Group Header A List item 1 of 17";
		const itemAnnouncement2 = "Group Header Donut List item 6 of 17";

		await arrow.click();

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), "", "Span value should be empty.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement1, "Span value is correct.")

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement2, "Span value is correct.")
	});

	it ("Tests setting value programmatically", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const btn = await browser.$("#value-set-btn");
		const inner = await combo.shadow$("input");

		assert.strictEqual(await combo.getProperty("value"), "Bulgaria", "Initial Value should be Bulgaria");

		await btn.click();

		assert.strictEqual(await combo.getProperty("value"), "new value", "ComboBox value should be set to 'new value'");
		assert.strictEqual(await inner.getProperty("value"), "new value", "ComboBox value should be set to 'new value'");
	});

	it ("Should focus the ComboBox with the API", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const focusBtn = await browser.$("#combo-focus");

		await focusBtn.click();

		assert.ok(await combo.getProperty("focused"), "ComboBox to be focused");
	});

	it("Value state type should be added to the screen readers default value states announcement", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cbWarning = await browser.$("#vs-warning-default");
		const cbSuccess = await browser.$("#vs-success-default");
		const cbInformation = await browser.$("#vs-information-default");

		let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#vs-warning-default");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		await cbWarning.click();

		let ariaHiddenText = await cbWarning.shadow$(`#value-state-description`).getHTML(false);
		let valueStateText = await popover.$("div").getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Warning issued"), true, "Displayed value state message text is correct");

		await cbWarning.keys("Escape");
		await cbInformation.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#vs-information-default");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await cbInformation.shadow$(".ui5-hidden-text").getHTML(false);
		valueStateText = await popover.$("div").getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Informative entry"), true, "Displayed value state message text is correct");

		await cbInformation.keys("Escape");
		await cbSuccess.click();

		ariaHiddenText = await cbSuccess.shadow$(".ui5-hidden-text").getHTML(false);
		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
	});

	it("Value state type should be added to the screen readers custom value states announcement", async () => {
		const cbError = await browser.$("#value-state-error");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#value-state-error");

		await cbError.click();
		await cbError.keys("a");

		const popoverHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover .ui5-valuestatemessage-header");
		const valueStateText = await popoverHeader.$("div").getHTML(false);
		const ariaHiddenText = await cbError.shadow$(`#value-state-description`).getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Custom error"), true, "Displayed value state message text is correct");
	});
});

describe("Keyboard navigation", async () => {
	it ("Should focus the first item on arrow down and then the input on arrow up",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem, listItem;

		await arrow.click();
		await input.keys("ArrowDown");

		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];

		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");

		await input.keys("ArrowUp");
		assert.strictEqual(await combo.getProperty("focused"), true, "The input should be focused");

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		listItem = await popover.$("ui5-list").$$("ui5-li")[0];

		assert.strictEqual(await listItem.getProperty("focused"), true, "The first list item after the group header should be focused");

		await input.keys("ArrowUp");

		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Should focus the value state header and then the input", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#value-state-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let valueStateHeader, groupItem;

		await arrow.click();
		await input.keys("ArrowDown");

		valueStateHeader = await popover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root");

		assert.strictEqual(await combo.getProperty("_isValueStateFocused"), true, "The value state header should be focused");
		assert.strictEqual(await combo.getProperty("focused"), false, "The input should not be focused");
		assert.notEqual(await valueStateHeader.getAttribute("focused"), null, "The value state header should be focused");

		await input.keys("ArrowUp");
		assert.strictEqual(await combo.getProperty("focused"), true, "The input should be focused");
		assert.strictEqual(await combo.getProperty("_isValueStateFocused"), false, "Value State should not be focused");
		assert.strictEqual(await valueStateHeader.getAttribute("focused"), null, "The value state header should not be focused");

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];

		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Previous focus should not remain on the item after reopening the picker and choosing another one", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#value-state-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItem, prevListItem;

		await input.click();
		await input.keys("A");

		listItem = await popover.$("ui5-list").$$("ui5-li")[1];

		assert.strictEqual(await listItem.getProperty("focused"), false, "The selected item is not focused");

		await arrow.click();

		// Got to the last item and press ENTER
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("Enter");

		await arrow.click();

		listItem = await popover.$("ui5-list").$$("ui5-li")[3];

		await listItem.click();

		await arrow.click();
		prevListItem = await popover.$("ui5-list").$$("ui5-li")[5];

		assert.strictEqual(await prevListItem.getProperty("focused"), false, "The previously focused item is no longer focused");
	});

	it ("Navigates back and forward through the items when the suggestions are closed", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#value-state-grouping");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItem, prevListItem;

		await input.click();
		await input.keys("ArrowDown");

		assert.equal(await combo.getProperty("value"), "Argentina", "The value is updated with the first suggestion item text");
		assert.equal(await combo.getProperty("focused"), true, "The input is focused");

		await input.keys("ArrowDown");

		assert.strictEqual(await combo.getProperty("value"), "Australia", "The value is updated with the next item text");
		assert.equal(await combo.getProperty("focused"), true, "The input is focused");

		await input.keys("ArrowUp");

		assert.strictEqual(await combo.getProperty("value"), "Argentina", "The value is updated with the previous item text");
		assert.equal(await combo.getProperty("focused"), true, "The input is focused");

		await input.keys("ArrowUp");

		assert.strictEqual(await combo.getProperty("value"), "Argentina", "The value is still the first item text");
		assert.equal(await combo.getProperty("focused"), true, "The input is focused");

		await arrow.click();

		prevListItem = await popover.$("ui5-list").$$("ui5-li")[5];

		assert.strictEqual(await prevListItem.getProperty("focused"), false, "The previously focused item is no longer focused");
	});

	it ("Should focus the next/previous focusable element on TAB/SHIFT+TAB",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const arrow = await combo.shadow$("[input-icon]");

		const prevCombo = await browser.$("#value-state-grouping");
		const nextCombo = await browser.$("#combobox-two-column-layout");

		await arrow.click();
		await combo.keys("Tab");

		assert.strictEqual(await nextCombo.getProperty("focused"), true, "The next combobox should be focused");

		await arrow.click();
		await browser.keys(["Shift", "Tab"]);

		assert.strictEqual(await prevCombo.getProperty("focused"), true, "The previous combobox should be focused");
	});

	it ("Should select the corresponding item on home/pgup/pgdown/end",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#combo2");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		const pickerIcon = await comboBox.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItem;

		// Opened picker
		await pickerIcon.click();
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		await input.keys("Home");
		listItem = await respPopover.$("ui5-list").$("ui5-li");
		assert.strictEqual(await listItem.getProperty("focused"), true, "The first item should be focused on HOME");
		assert.strictEqual(await comboBox.getProperty("focused"), false, "The ComboBox should not be focused");

		await input.keys("End");
		listItem = await respPopover.$("ui5-list").$$("ui5-li")[10];
		assert.strictEqual(await listItem.getProperty("focused"), true, "The last item should be focused on END");

		await input.keys("PageUp");
		listItem = await respPopover.$("ui5-list").$("ui5-li");
		assert.strictEqual(await listItem.getProperty("focused"), true, "The -10 item should be focused on PAGEUP");

		await input.keys("PageDown");
		listItem = await respPopover.$("ui5-list").$$("ui5-li")[10];
		assert.strictEqual(await listItem.getProperty("focused"), true, "The +10 item should be focused on PAGEDOWN");

		// Closed picker
		await pickerIcon.click();

		// Clearing typed in value to prevent default behavior of HOME
		await comboBox.setProperty("value", "");

		await input.keys("Home");
		assert.strictEqual(await input.getProperty("value"), "Algeria", "The first item should be selected on HOME");

		// Clearing typed in value to prevent default behavior of END
		await comboBox.setProperty("value", "");

		await input.keys("End");
		assert.strictEqual(await input.getProperty("value"), "Chile", "The last item should be selected on END");

		await input.keys("PageUp");
		assert.strictEqual(await input.getProperty("value"), "Algeria", "The -10 item should be selected on PAGEUP");

		await input.keys("PageDown");
		assert.strictEqual(await input.getProperty("value"), "Chile", "The +10 item should be selected on PAGEDOWN");
	});
});
