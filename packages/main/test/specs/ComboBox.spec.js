const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("General interaction", () => {

	it ("Should open the popover when clicking on the arrow", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(!popover.getProperty("opened"), "Popover should not be displayed")

		arrow.click();

		assert.ok(popover.getProperty("opened"), "Popover should be displayed")
	});

	it ("Items filtration", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		// act
		arrow.click();

		// assert
		assert.strictEqual(listItems.length, 11, "All items are shown with selected item");

		// act
		input.click();
		browser.keys("Backspace");

		// assert
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 1, "Items are filtered on input value change");

	});

	it ("Should open the popover when typing a value", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const lazy = $("#lazy");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		input.click();
		input.keys("b");

		browser.pause(200);
		assert.ok(popover.getProperty("opened"), "Popover should be displayed");
		assert.strictEqual(input.getProperty("value"), "Bahrain", "Value should be Bahrain");


		// const selection = browser.execute(() => {
		// 	return window.getSelection().toString();
		// });

		// assert.strictEqual(selection, "ahrain", "ahrain should be selected");
		const listItems = popover.$("ui5-list").$$("ui5-li");
		assert.ok(listItems[0].getProperty("selected"), "List Item should be selected");

		lazy.click();

		assert.strictEqual(combo.getProperty("value"), "Bahrain", "Value should be changed to Bahrain");
	});

	it ("Should filter items based on input", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo2");
		const arrow = combo.shadow$("[input-icon]");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo2");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		// act
		arrow.click();

		// assert
		assert.strictEqual(listItems.length, 11, "Items should be 11");

		// act
		input.keys("a");

		// assert
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 5, "Items should be 5");

		// act
		input.keys("u");

		// assert
		listItems = popover.$("ui5-list").$$("ui5-li");
		// assert.strictEqual(listItems.length, 2, "Items should be 2");

		// act
		input.keys("zzz");
		listItems = popover.$("ui5-list").$$("ui5-li");

		// assert
		assert.strictEqual(listItems.length, 0, "Items should be 0");
		assert.notOk(popover.getProperty("opened"), "Popover should close");
	});

	it ("Should close popover on item click / change event", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo2");
		const arrow = combo.shadow$("[input-icon]");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo2");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		// act
		input.click();
		input.keys("b");

		// assert
		assert.ok(popover.getProperty("opened"), "Popover should be opened");

		// act
		input.keys("Enter");

		// assert
		assert.notOk(popover.getProperty("opened"), "Popover should be closed");

		// act
		arrow.click();
		listItems[0].click();

		// assert
		assert.notOk(popover.getProperty("opened"), "Popover should be closed");
	});

	it ("Tests change event", () => {
		const dummyTarget = $("#combo");
		const placeholder = $("#change-placeholder");
		const counter = $("#change-count");
		const combo = $("#change-cb");
		const input = combo.shadow$("[inner-input]");

		input.click();

		assert.strictEqual(placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(counter.getText(), "0", "Call count should be 0");

		dummyTarget.click();

		assert.strictEqual(placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(counter.getText(), "0", "Call count should be 0");

		input.click();
		input.keys("a");

		assert.strictEqual(placeholder.getText(), "", "Text should be empty");
		assert.strictEqual(counter.getText(), "0", "Call count should be 0");

		dummyTarget.click();

		assert.strictEqual(placeholder.getText(), "Argentina", "Text should be empty");
		assert.strictEqual(counter.getText(), "1", "Call count should be 1");
	});

	it ("Tests change event", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const counter = $("#change-count");
		const combo = $("#change-cb");
		const placeholder = $("#change-placeholder");
		const arrow = combo.shadow$("[input-icon]");

		arrow.click();

		// click on first item
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#change-cb");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		popover.$("ui5-list").$$("ui5-li")[0].click();

		assert.strictEqual(placeholder.getText(), "Argentina", "Text should be empty");
		assert.strictEqual(counter.getText(), "1", "Call count should be 1");

		arrow.click();

		assert.strictEqual(counter.getText(), "1", "Call count should be 1");

		arrow.click();

		popover.$("ui5-list").$$("ui5-li")[1].click();
		assert.strictEqual(counter.getText(), "2", "Call count should be 2");
	});

	it ("Tests change event after pressing enter key", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const counter = $("#change-count");
		const combo = $("#change-cb");
		const input = combo.shadow$("[inner-input]");

		input.click();

		input.keys("Enter");
		input.keys("Enter");
		input.keys("Enter");
		input.keys("Enter");

		assert.strictEqual(counter.getText(), "0", "Call count should be 0");

		input.keys("a");

		input.keys("Enter");
		input.keys("Enter");
		input.keys("Enter");
		input.keys("Enter");

		assert.strictEqual(counter.getText(), "1", "Call count should be 1");

	});

	it ("Tests change event after type and item select", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const counter = $("#change-count");
		const combo = $("#change-cb");
		const input = combo.shadow$("[inner-input]");
		const placeholder = $("#change-placeholder");

		input.click();
		input.keys("a");

		// click on first item
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#change-cb");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		popover.$("ui5-list").$$("ui5-li")[0].click();

		assert.strictEqual(placeholder.getText(), "Argentina", "Text should be empty");
		assert.strictEqual(counter.getText(), "1", "Call count should be 1");
	});

	it ("Tests input event", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const counter = $("#input-count");
		const combo = $("#input-cb");
		const placeholder = $("#input-placeholder");
		const input = combo.shadow$("#ui5-combobox-input");

		input.click();
		input.keys("ArrowDown");

		assert.strictEqual(placeholder.getText(), "Argentina", "First items is selected");
		assert.strictEqual(counter.getText(), "1", "Call count should be 1");

		input.keys("ArrowUp");

		assert.strictEqual(placeholder.getText(), "Argentina", "Selection not changed");
		assert.strictEqual(counter.getText(), "1", "Input event is not fired when first item is selected and navigating with arrow up");

		input.keys("ArrowDown");

		assert.strictEqual(placeholder.getText(), "Germany", "Last item is selected");
		assert.strictEqual(counter.getText(), "2", "Call count should be 2");

		input.keys("ArrowDown");

		assert.strictEqual(placeholder.getText(), "Germany", "Selection not changed");
		assert.strictEqual(counter.getText(), "2", "Input event is not fired when last item is selected and navigating with arrow down");
	});

	it ("Tests Combo with contains filter", () => {
		const combo = $("#contains-cb");
		const input = combo.shadow$("#ui5-combobox-input");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#contains-cb");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		arrow.click();

		assert.strictEqual(listItems.length, 4, "Items should be 4");

		input.keys("n");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 3, "Items should be 3");

		input.keys("a");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 2, "Items should be 2");

		input.keys("d");
		listItems = popover.$("ui5-list").$$("ui5-li");
		const firstListItemText = listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Canada");
	});

	it ("Tests Combo with startswith filter", () => {
		const combo = $("#startswith-cb");
		const input = combo.shadow$("#ui5-combobox-input");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#startswith-cb");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		arrow.click();

		assert.strictEqual(listItems.length, 4, "Items should be 4");

		input.keys("a");
		listItems = popover.$("ui5-list").$$("ui5-li");
		const firstListItemText = listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Argentina");

		input.keys("a");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.notOk(popover.opened, "Popover should be closed when no match");
	});

	it ("Tests selection-change event and its parameters", () => {
		const combo = $("#combo");
		const label = $("#selection-change-event-result");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		arrow.click();

		const listItem = listItems[8];

		listItem.click();

		assert.strictEqual(label.getText(), listItem.shadow$(".ui5-li-title").getText(), "event is fired correctly");
	});

	it ("Tests focused property when clicking on the arrow", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");

		assert.ok(!combo.getProperty("focused"), "property focused should be false");

		arrow.click();

		assert.ok(combo.getProperty("focused"), "property focused should be true");
	});

	it ("Tests focused property when clicking on the input", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const input = combo.shadow$("#ui5-combobox-input");

		assert.ok(!combo.getProperty("focused"), "property focused should be false");

		input.click();

		assert.ok(combo.getProperty("focused"), "property focused should be true");
	});

	it ("Tests Combo with two-column layout", () => {
		const combo = $("#combobox-two-column-layout");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combobox-two-column-layout");
		const arrow = combo.shadow$("[input-icon]");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItem = popover.$("ui5-list").$$("ui5-li")[0];

		arrow.click();
		assert.strictEqual(listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
	});
});

describe("Grouping", () => {

	it ("Tests group filtering", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo-grouping");
		const input = combo.shadow$("#ui5-combobox-input");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo-grouping");
		let popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItems = popover.$("ui5-list").$$("ui5-li-groupheader");
		let listItems = popover.$("ui5-list").$$("ui5-li");

		arrow.click();
		assert.strictEqual(groupItems.length, 4, "Group items should be 4");
		assert.strictEqual(listItems.length, 13, "Items should be 13");

		input.keys("c");

		popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		groupItems = popover.$("ui5-list").$$("ui5-li-groupheader");
		listItems = popover.$("ui5-list").$$("ui5-li");

		assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
		assert.strictEqual(listItems.length, 2, "Filtered items should be 2");
	});

	it ("Tests group item focusability", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo-grouping");
		const input = combo.shadow$("#ui5-combobox-input");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo-grouping");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		arrow.click();
		input.keys("ArrowDown");

		groupItem = popover.$("ui5-list").$$("ui5-li-groupheader")[0];

		assert.strictEqual(groupItem.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Tests input value while group item is focused", () => {
		const combo = $("#combo-grouping");
		const input = combo.shadow$("#ui5-combobox-input");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo-grouping");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let groupItem;

		input.keys("a");
		input.keys("ArrowDown");
		input.keys("ArrowDown");
		input.keys("ArrowDown");
		input.keys("ArrowDown");
		input.keys("ArrowDown");
		input.keys("ArrowDown");

		groupItem = popover.$("ui5-list").$$("ui5-li-groupheader")[1];

		assert.strictEqual(groupItem.getProperty("focused"), true, "The second group header should be focused");
		assert.strictEqual(combo.getProperty("filterValue"), "a", "Filter value should be the initial one");
		assert.strictEqual(combo.getProperty("value"), "a", "Temp value should be reset to the initial filter value - no autocomplete");
	});
});

describe("Accessibility", () => {

	it ("Announce item on selection", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");
		const input = combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = $(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "List item 1 of 11 Selected";
		const itemAnnouncement2 = "List item 2 of 11 Selected";

		arrow.click();

		assert.strictEqual(invisibleMessageSpan.getHTML(false), "", "Span value should be empty.")

		input.keys("ArrowDown");

		assert.strictEqual(invisibleMessageSpan.getHTML(false), itemAnnouncement1, "Span value is correct.")

		input.keys("ArrowDown");

		assert.strictEqual(invisibleMessageSpan.getHTML(false), itemAnnouncement2, "Span value is correct.")
	});

	it ("Tests setting value programatically", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const btn = $("#value-set-btn");
		const inner = combo.shadow$("input");

		assert.strictEqual(combo.getProperty("value"), "Bulgaria", "Initial Value should be Bulgaria");

		btn.click();

		assert.strictEqual(combo.getProperty("value"), "new value", "ComboBox value should be set to 'new value'");
		assert.strictEqual(inner.getProperty("value"), "new value", "ComboBox value should be set to 'new value'");
	});

	it ("Should focus the ComboBox with the API", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/ComboBox.html`);

		const combo = $("#combo");
		const focusBtn = $("#combo-focus");

		focusBtn.click();

		assert.ok(combo.getProperty("focused"), "ComboBox to be focused");
	});
});
