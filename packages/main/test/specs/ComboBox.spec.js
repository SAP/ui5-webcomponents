const assert = require("chai").assert;

describe("General interaction", () => {

	it ("Should open the popover when clicking on the arrow", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.notOk(await popover.getProperty("opened"), "Popover should not be displayed")

		await arrow.click();

		assert.ok(await popover.getProperty("opened"), "Popover should be displayed")
	});

	it ("Should close the popover when clicking on the arrow second time", async () => {
		const combo = await $("#combo");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await popover.getProperty("opened"), "Popover should be displayed")

		await arrow.click();

		assert.notOk(await popover.getProperty("opened"), "Popover should not be displayed")
	});

	it ("Items filtration", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		// act
		await arrow.click();

		// assert
		assert.strictEqual(listItems.length, 11, "All items are shown with selected item");

		// act
		await input.click();
		await browser.keys("Backspace");

		// assert
		listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 1, "Items are filtered on input value change");

	});

	it ("Should open the popover when typing a value", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const lazy = await browser.$("#lazy");
		const input = await combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("b");

		await browser.waitUntil(() => popover.getProperty("opened"), {
			timeout: 200,
			timeoutMsg: "Popover should be displayed"
		});

		assert.strictEqual(await input.getProperty("value"), "Bahrain", "Value should be Bahrain");


		// const selection = await browser.executeAsync(done => {
		// 	return window.getSelection().toString();
		// });

		// assert.strictEqual(selection, "ahrain", "ahrain should be selected");
		const listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.ok(await listItems[0].getProperty("selected"), "List Item should be selected");

		await lazy.click();

		assert.strictEqual(await combo.getProperty("value"), "Bahrain", "Value should be changed to Bahrain");
	});

	it ("Should filter items based on input", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo2");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		// act
		await arrow.click();

		// assert
		assert.strictEqual(listItems.length, 11, "Items should be 11");

		// act
		await input.keys("a");

		// assert
		listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 5, "Items should be 5");

		// act
		await input.keys("u");

		// assert
		listItems = await popover.$("ui5-list").$$("ui5-li");
		// assert.strictEqual(listItems.length, 2, "Items should be 2");

		// act
		await input.keys("zzz");
		listItems = await popover.$("ui5-list").$$("ui5-li");

		// assert
		assert.strictEqual(listItems.length, 0, "Items should be 0");
		assert.notOk(await popover.getProperty("opened"), "Popover should close");
	});

	it ("Should close popover on item click / change event", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo2");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		// act
		await input.click();
		await input.keys("b");

		// assert
		assert.ok(await popover.getProperty("opened"), "Popover should be opened");

		// act
		await input.keys("Enter");

		// assert
		assert.notOk(await popover.getProperty("opened"), "Popover should be closed");

		// act
		await arrow.click();
		await listItems[0].click();

		// assert
		assert.notOk(await popover.getProperty("opened"), "Popover should be closed");
	});

	it ("Tests change event", async () => {
		const dummyTarget = await browser.$("#combo");
		const placeholder = await browser.$("#change-placeholder");
		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const input = await combo.shadow$("[inner-input]");

		await input.click();

		assert.strictEqual(await placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(await counter.getText(), "0", "Call count should be 0");

		await dummyTarget.click();

		assert.strictEqual(await placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(await counter.getText(), "0", "Call count should be 0");

		await input.click();
		await input.keys("a");

		assert.strictEqual(await placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(await counter.getText(), "0", "Call count should be 0");

		await dummyTarget.click();

		assert.strictEqual(await placeholder.getText(), "Argentina", "Text should be empty");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");
	});

	it ("Tests change event", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const placeholder = await browser.$("#change-placeholder");
		const arrow = await combo.shadow$("[input-icon]");

		await arrow.click();

		// click on first item
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#change-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li")[0]).click();

		assert.strictEqual(await placeholder.getText(), "Argentina", "Text should not be empty");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await arrow.click();

		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await (await popover.$("ui5-list").$$("ui5-li"))[1].click();
		assert.strictEqual(await counter.getText(), "2", "Call count should be 2");
	});

	it ("Tests change event with value state and links", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#value-state-error");
		const placeholder = await browser.$("#change-placeholder");
		const arrow = await combo.shadow$("[input-icon]");

		await browser.executeAsync(done => {
			document.querySelector("[value-state='Error']").addEventListener("ui5-change", function(event) {
				document.getElementById("change-placeholder").innerHTML = event.target.value;
				document.getElementById("change-count").innerHTML = parseInt(document.getElementById("change-count").innerHTML) + 1;
			});
			done();
		});

		// open picker
		await arrow.click();

		await combo.keys("B");
		await combo.keys("a");

		assert.strictEqual(await placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(await counter.getText(), "0", "Call count should be 0");

		// click on first item
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#value-state-error");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const link = await popover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root a");

		await link.click();

		assert.strictEqual(await placeholder.getText(), "Bahrain", "Text should not be empty");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");
	});

	it ("Tests change event after pressing enter key", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const input = await combo.shadow$("[inner-input]");

		await input.click();

		await input.keys("Enter");
		await input.keys("Enter");
		await input.keys("Enter");
		await input.keys("Enter");

		assert.strictEqual(await counter.getText(), "0", "Call count should be 0");

		await input.keys("a");

		await input.keys("Enter");
		await input.keys("Enter");
		await input.keys("Enter");
		await input.keys("Enter");

		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await input.keys("b");

		await input.keys("Enter");

		assert.strictEqual(await counter.getText(), "2", "Call count should be 2");

	});

	it("should fire change event after the user has typed in value, but also selects it from the popover", async () => {
        await browser.url(`test/pages/ComboBox.html`);

		// Setup
		const changeValue = await browser.$("#change-placeholder");
        const counter = await browser.$("#change-count");
        const combo = await browser.$("#change-cb");
		const input = await combo.shadow$("[inner-input]");


		// Type something which is in the list
		await input.click();
		await input.keys("Bulgaria");

		// Click on the item
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#change-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li")[0]).click();


		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");
		assert.strictEqual(await changeValue.getText(), "Bulgaria", "The value should be changed accordingly");
    });

	it ("Value should be reset on ESC key", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo2");
		const input = await combo.shadow$("[inner-input]");

		await input.click();

		await input.keys("Al");
		// Close picker
		await input.keys("Escape");
		// Reset value
		await input.keys("Escape");

		assert.strictEqual(await combo.getProperty("value"), "", "Value should be cleared");

		await input.keys("Al");
		// Chose itemr
		await input.keys("Enter");
		// Clear current value
		await input.keys("");
		// Enter another value
		await input.keys("Al");
		// Reset value
		await input.keys("Escape");

		assert.strictEqual(await combo.getProperty("value"), "Algeria", "Value should be restored to the last confirmed one");
	});

	it ("Tests change event after type and item select", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const input = await combo.shadow$("[inner-input]");
		const placeholder = await browser.$("#change-placeholder");

		await input.click();
		await input.keys("a");

		// click on first item
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#change-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li"))[0].click();

		assert.strictEqual(await placeholder.getText(), "Argentina", "Text should be empty");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");
	});

	it ("Tests input event", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#input-count");
		const combo = await browser.$("#input-cb");
		const placeholder = await browser.$("#input-placeholder");
		const input = await combo.shadow$("#ui5-combobox-input");

		await input.click();
		await input.keys("ArrowDown");

		assert.strictEqual(await placeholder.getText(), "Argentina", "First items is selected");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await input.keys("ArrowUp");

		assert.strictEqual(await placeholder.getText(), "Argentina", "Selection not changed");
		assert.strictEqual(await counter.getText(), "1", "Input event is not fired when first item is selected and navigating with arrow up");

		await input.keys("ArrowDown");

		assert.strictEqual(await placeholder.getText(), "Germany", "Last item is selected");
		assert.strictEqual(await counter.getText(), "2", "Call count should be 2");

		await input.keys("ArrowDown");

		assert.strictEqual(await placeholder.getText(), "Germany", "Selection not changed");
		assert.strictEqual(await counter.getText(), "2", "Input event is not fired when last item is selected and navigating with arrow down");
	});

	it ("Tests Combo with contains filter", async () => {
		const combo = await browser.$("#contains-cb");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#contains-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();

		assert.strictEqual(listItems.length, 4, "Items should be 4");

		await input.keys("n");
		listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 3, "Items should be 3");

		await input.keys("a");
		listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 2, "Items should be 2");

		await input.keys("d");
		listItems = await popover.$("ui5-list").$$("ui5-li");
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Canada");
	});

	it ("Tests Combo with startswith filter", async () => {
		const combo = await browser.$("#startswith-cb");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#startswith-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();

		assert.strictEqual(listItems.length, 4, "Items should be 4");

		await input.keys("a");
		listItems = await popover.$("ui5-list").$$("ui5-li");
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Argentina");

		await input.keys("a");
		listItems = await popover.$("ui5-list").$$("ui5-li");
		assert.notOk(popover.opened, "Popover should be closed when no match");
	});

	it ("Tests selection-change event and its parameters", async () => {
		const combo = await browser.$("#combo");
		const label = await browser.$("#selection-change-event-result");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();

		const listItem = listItems[8];

		await listItem.click();

		assert.strictEqual(await label.getText(), await listItem.shadow$(".ui5-li-title").getText(), "event is fired correctly");
	});

	it ("Tests focused property when clicking on the arrow", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$("[input-icon]");

		assert.notOk(await combo.getProperty("focused"), "property focused should be false");

		await arrow.click();

		assert.ok(await combo.getProperty("focused"), "property focused should be true");
	});

	it ("Tests focused property when clicking on the input", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const input = await combo.shadow$("#ui5-combobox-input");

		assert.notOk(await combo.getProperty("focused"), "property focused should be false");

		await input.click();

		assert.ok(await combo.getProperty("focused"), "property focused should be true");
	});

	it ("Tests Combo with two-column layout", async () => {
		const combo = await browser.$("#combobox-two-column-layout");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combobox-two-column-layout");
		const arrow = await combo.shadow$("[input-icon]");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

		await arrow.click();
		assert.strictEqual(await listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
	});

	it ("Should not open value state message when component is in readonly state", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await browser.$("#readonly-value-state-cb");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#readonly-value-state-cb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		await cb.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover with valueStateMessage should not be opened.");
	});
});

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

describe("Accessibility", async () => {

	it ("Announce item on selection", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$("[input-icon]");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "List item 1 of 11 Selected";
		const itemAnnouncement2 = "List item 2 of 11 Selected";

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

	it ("Tests setting value programatically", async () => {
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

		let ariaHiddenText = await cbWarning.shadow$(`#${staticAreaItemClassName}-valueStateDesc`).getHTML(false);
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
		const ariaHiddenText = await cbError.shadow$(`#${staticAreaItemClassName}-valueStateDesc`).getHTML(false);

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
