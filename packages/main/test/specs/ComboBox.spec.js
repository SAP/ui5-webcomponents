import { assert } from "chai";

const getVisibleItems = async (combo) => {
	const items = await combo.$$("ui5-cb-item");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

const getVisibleGroupItems = async (combo) => {
	const items = await combo.$$("ui5-cb-item-group");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

describe("General interaction", () => {

	it ("Should open the popover when clicking on the arrow", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");

		assert.notOk(await popover.getProperty("open"), "Popover should not be displayed")

		await arrow.click();

		assert.ok(await popover.getProperty("open"), "Popover should be displayed")
	});

	it ("Should close the popover when clicking on the arrow second time", async () => {
		const combo = await $("#combo");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");

		assert.ok(await popover.getProperty("open"), "Popover should be displayed")

		await arrow.click();

		assert.notOk(await popover.getProperty("open"), "Popover should not be displayed")
	});

	it ("Items filtration", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await $("#combo");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		let listItems = await combo.$$("ui5-cb-item");

		// act
		await arrow.click();

		// assert
		assert.strictEqual((await getVisibleItems(combo)).length, 11, "All items are shown with selected item");

		// act
		await input.click();
		await browser.keys("Backspace");

		// assert
		listItems = await combo.$$("ui5-cb-item");
		assert.strictEqual((await getVisibleItems(combo)).length, 1, "Items are filtered on input value change");
	});

	it ("Should open the popover when typing a value", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await $("#combo");
		const lazy = await $("#lazy");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("b");

		await browser.waitUntil(() => popover.getProperty("open"), {
			timeout: 200,
			timeoutMsg: "Popover should be displayed"
		});

		assert.strictEqual(await input.getProperty("value"), "Bahrain", "Value should be Bahrain");


		const selection = await browser.executeAsync(done => {
			return done(window.getSelection().toString());
		});

		assert.strictEqual(selection, "ahrain", "ahrain should be selected");
		const listItems = (await getVisibleItems(combo));
		assert.ok(await listItems[0].getProperty("selected"), "List Item should be selected");

		await lazy.click();

		assert.strictEqual(await combo.getProperty("value"), "Bahrain", "Value should be changed to Bahrain");
	});

	it ("Should filter items based on input with filter='None' and lazy loading", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#cb-filter-none");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let listItems = await combo.$$("ui5-cb-item");

		// act
		await input.click();

		// act
		await input.keys("I");

		setTimeout(async () => {
			listItems = await getVisibleItems(combo);
			const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

			// assert
			assert.strictEqual(listItems.length, 5, "Items should be 5");
			assert.strictEqual(firstListItemText, "I #1", "First item should have text.");
		}, 1000)
	});

	it ("Should filter items based on input", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo2");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let listItems = await combo.$$("ui5-cb-item");

		// act
		await arrow.click();

		// assert
		assert.strictEqual(listItems.length, 11, "Items should be 11");

		// act
		await input.keys("a");

		// assert
		listItems = await getVisibleItems(combo);
		assert.strictEqual(listItems.length, 5, "Items should be 5");

		// act
		await input.keys("u");

		// assert
		listItems = await getVisibleItems(combo);
		// assert.strictEqual(listItems.length, 2, "Items should be 2");

		// act
		await input.keys("z");
		await input.keys("z");
		await input.keys("z");
		listItems = await getVisibleItems(combo);

		// assert
		assert.notOk(listItems.some(item => item._isVisible), "Rendered items should be 0");
		assert.notOk(await popover.getProperty("open"), "Popover should close");
	});

	it ("Should close popover on item click / change event", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await $("#combo2");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let listItems = await getVisibleItems(combo);

		// act
		await input.click();
		await input.keys("b");

		// assert
		assert.ok(await popover.getProperty("open"), "Popover should be opened");

		// act
		await input.keys("Enter");

		// assert
		assert.notOk(await popover.getProperty("open"), "Popover should be closed");

		// act
		await arrow.click();

		assert.ok(await popover.getProperty("open"), "Popover should be displayed")

		listItems = await getVisibleItems(combo);
		await (await listItems[0].shadow$("li")).click();

		// assert
		assert.notOk(await popover.getProperty("open"), "Popover should be closed");
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
		const arrow = await combo.shadow$(".inputIcon");

		await combo.scrollIntoView();
		await arrow.click();

		// click on first item
		await (await combo.$$("ui5-cb-item"))[0].click();

		assert.strictEqual(await placeholder.getText(), "Argentina", "Text should not be empty");
		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await arrow.click();

		assert.strictEqual(await counter.getText(), "1", "Call count should be 1");

		await (await combo.$$("ui5-cb-item"))[1].click();
		assert.strictEqual(await counter.getText(), "2", "Call count should be 2");
	});

	it ("Tests change event with value state and links", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#value-state-error");
		const placeholder = await browser.$("#change-placeholder");
		const arrow = await combo.shadow$(".inputIcon");

		await browser.executeAsync(done => {
			document.querySelector("[value-state='Negative']").addEventListener("ui5-change", function(event) {
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
		const link = await combo.$("div[slot='valueStateMessage'] ui5-link");

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

		await combo.scrollIntoView();

		// Type something which is in the list
		await input.click();
		await input.keys("Bulgaria");

		// Click on the item
		await ((await getVisibleItems(combo))[0]).click();

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

	it ("Tests change event on open picker and item navigation", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("[inner-input]");

		await arrow.click();
		await input.keys("ArrowDown");

		assert.strictEqual(await counter.getText(), "0", "Change event should not be fired on item navigation.");

		await (await combo.$$("ui5-cb-item"))[0].click();

		assert.strictEqual(await counter.getText(), "1", "Change event should be fired on item selection.");
	});

	it ("Tests change event on closed picker and item navigation", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await browser.$("#change-count");
		const combo = await browser.$("#change-cb");
		const input = await combo.shadow$("[inner-input]");

		await input.click();
		await input.keys("ArrowDown");

		assert.strictEqual(await counter.getText(), "0", "Change event should not be fired on inline item navigation.");

		await input.keys("ArrowDown");

		assert.strictEqual(await counter.getText(), "0", "Change event should not be fired on inline item navigation.");

		await input.keys("Enter");

		assert.strictEqual(await counter.getText(), "1", "Change event should be fired on item selection.");
	});

	it ("Tests change event after type and item select", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const counter = await $("#change-count");
		const combo = await $("#change-cb");
		const input = await combo.shadow$("[inner-input]");
		const placeholder = await $("#change-placeholder");

		await combo.scrollIntoView();

		await input.click();
		await input.keys("a");

		// click on first item
		const items = await getVisibleItems(combo);

		await items[0].click();

		assert.strictEqual(await placeholder.getText(), "Argentina", "Text should correspond to item.");
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
		const arrow = await combo.shadow$(".inputIcon");
		await arrow.click();

		let listItems = await getVisibleItems(combo);

		assert.strictEqual(listItems.length, 4, "Items should be 4");

		await input.keys("n");
		listItems = await getVisibleItems(combo);
		assert.strictEqual(listItems.length, 3, "Items should be 3");

		await input.keys("a");
		listItems = await getVisibleItems(combo);
		assert.strictEqual(listItems.length, 2, "Items should be 2");

		await input.keys("d");
		listItems = await getVisibleItems(combo);
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Canada");
	});

	it ("Tests Combo with startswith filter", async () => {
		const combo = await browser.$("#startswith-cb");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");

		await arrow.click();

		let listItems = await getVisibleItems(combo);
		assert.strictEqual(listItems.length, 4, "Items should be 4");

		await input.keys("a");
		listItems = await getVisibleItems(combo);
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(firstListItemText, "Argentina");

		await input.keys("a");
		listItems = await combo.$$("ui5-cb-item");
		assert.notOk(popover.open, "Popover should be closed when no match");
	});

	it ("Tests selection-change event and its parameters", async () => {
		const combo = await browser.$("#combo");
		const label = await browser.$("#selection-change-event-result");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let listItems = await combo.$$("ui5-cb-item");

		await arrow.click();

		const listItem = listItems[7];
		const listItemText = await listItem.shadow$(".ui5-li-title").getText();

		await listItem.click();

		assert.strictEqual(await label.getText(), listItemText, "event is fired correctly");
	});

	it ("Tests selection-change event when type text after selection", async () => {
		const combo = await browser.$("#combo");
		let label = await browser.$("#selection-change-event-result");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let listItems = await combo.$$("ui5-cb-item");

		await arrow.click();
		await combo.keys("Backspace");
		await combo.keys("A");

		const fisrtListItem = listItems[0];

		assert.strictEqual(await label.getText(), await fisrtListItem.shadow$(".ui5-li-title").getText(), "event is fired correctly");
	});

	it ("Tests focused property when clicking on the arrow", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$(".inputIcon");

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
		const combo = await $("#combobox-two-column-layout");
		const arrow = await combo.shadow$(".inputIcon");
		const listItem = (await getVisibleItems(combo))[0];

		await arrow.click();
		assert.strictEqual(await listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
	});

	it ("Should not open value state message when component is in readonly state", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await browser.$("#readonly-value-state-cb");
		const popover = await cb.shadow$("ui5-popover");

		await cb.click();
		assert.notOk(await popover.isDisplayedInViewport(), "Popover with valueStateMessage should not be opened.");
	});

	it ("Should add items dynamically items to the picker", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await $("#dynamic-items");
		const btn = await $("#add-items-btn");
		const arrow = await cb.shadow$(".inputIcon");

		await btn.click();
		await arrow.click();

		const initialListItems = await getVisibleItems(cb);

		await browser.pause(2000);

		const updatedListItems = await getVisibleItems(cb);

		assert.notEqual(initialListItems.length, updatedListItems.length, "item count should be updated");
	});

	it ("Should check clear icon availability", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await $("#clear-icon-cb");
		const inner = cb.shadow$("input");
		const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");

		assert.ok(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to true when cb has a value");

		await clearIcon.click();

		assert.notOk(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to false when cb has no value");

		await inner.click();
		await inner.keys("c");

		assert.ok(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to true upon typing");
	});

	it ("Should check clear icon events", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await $("#clear-icon-cb");
		const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");

		await clearIcon.click();
		// focus out the combo
		await $("#dynamic-items").click();

		assert.strictEqual(await $("#clear-icon-change-count").getText(), "1", "change event is fired once");
		assert.strictEqual(await $("#clear-icon-input-count").getText(), "1", "input event is fired once");
	});

	it ("Should show all items if value does not match any item and arrow is pressed", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cb = await $("#combo");
		const arrow = await cb.shadow$(".inputIcon");
		const input = cb.shadow$("input");

		await input.click();
		await input.keys("z");
		await arrow.click();

		let listItems = await getVisibleItems(cb);

		// assert
		assert.strictEqual(listItems.length, 11, "All items are shown");
	});
});

describe("Grouping", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/ComboBox.html`);
	});

	it ("Tests group filtering", async () => {
		const combo = await $("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		let listItems;
		let groupItems;

		await arrow.click();

		groupItems = (await getVisibleGroupItems(combo));
		listItems = (await getVisibleItems(combo));

		assert.strictEqual(groupItems.length, 4, "Group items should be 4");
		assert.strictEqual(listItems.length, 13, "Items should be 13");

		await input.keys("c");

		groupItems = (await getVisibleGroupItems(combo));
		listItems = (await getVisibleItems(combo));

		assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
		assert.strictEqual(listItems.length, 2, "Filtered items should be 2");
	});

	it ("Tests group item focusability", async () => {
		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");

		await arrow.click();
		await input.keys("ArrowDown");

		const groupItem = (await getVisibleGroupItems(combo))[0];

		assert.ok(await groupItem.getProperty("focused"),  "The first group header should be focused");
	});

	it ("Tests input value while group item is focused", async () => {
		const combo = await $("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");

		await input.click();
		await input.keys("a");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		const groupItem = (await getVisibleGroupItems(combo))[1];

		assert.ok(await groupItem.getProperty("focused"),  "The second group header should be focused");
		assert.strictEqual(await combo.getProperty("filterValue"), "a", "Filter value should be the initial one");
		assert.strictEqual(await combo.getProperty("value"), "", "Temp value should be reset to the initial filter value - no autocomplete");
	});

	it ("Pressing enter on a group item should not close the picker", async () => {
		const combo = await browser.$("#combo-grouping");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");

		await arrow.click();
		await input.keys("ArrowDown");
		await input.keys("Enter");

		assert.ok(await popover.getProperty("open"), "Popover remains open");
	});

	it ("Grouped items should be filtered and with the correct role attributes", async () => {
		const combo = await $("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const popover = await combo.shadow$("ui5-responsive-popover");
		const list = await popover.$("ui5-list");

		await input.click();
		await input.keys("a");

		const listItem = (await getVisibleItems(combo))[0];

		assert.ok(await listItem, "The filtered item is shown");
		assert.strictEqual(await list.getAttribute("accessible-role"), "ListBox", "The list item has the correct role attribute");
		assert.strictEqual(await listItem.shadow$("li").getAttribute("role"), "option", "The list item has the correct role attribute");
		assert.strictEqual((await getVisibleItems(combo)).length, 5, "Group items are filtered correctly");
	});
});

describe("Accessibility", async () => {

	it ("Announce item on selection", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "List item 10 of 11";
		const itemAnnouncement2 = "List item 11 of 11";

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
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "CA List item 9 of 10";
		const itemAnnouncement2 = "CL List item 10 of 10";

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
		const arrow = await combo.shadow$(".inputIcon");
		const input = await combo.shadow$("#ui5-combobox-input");
		const invisibleMessageSpan = await browser.$(".ui5-invisiblemessage-polite");
		const itemAnnouncement1 = "Group Header A";
		const itemAnnouncement2 = "Group Header Donut";
		const itemAnnouncement3 = "List item 1 of 13";

		await arrow.click();

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), "", "Span value should be empty.")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement1, "First group header is announced")

		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement3, "First list item is announced")

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		assert.strictEqual(await invisibleMessageSpan.getHTML(false), itemAnnouncement2, "Second group header is announced")
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

		let popover = await cbWarning.shadow$("ui5-popover");

		await cbWarning.click();

		let ariaHiddenText = await cbWarning.shadow$(`#value-state-description`).getHTML(false);
		let valueStateText = await popover.$("div").getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Warning issued"), true, "Displayed value state message text is correct");

		await cbWarning.keys("Escape");
		await cbInformation.click();

		popover = await cbInformation.shadow$("ui5-popover");

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

		await cbError.click();
		await cbError.keys("a");

		const valueStateText = await cbError.$("div[slot='valueStateMessage']").getHTML(false);
		const ariaHiddenText = await cbError.shadow$(`#value-state-description`).getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Custom error"), true, "Displayed value state message text is correct");
	});

	it("Should render aria-haspopup attribute with value 'dialog'", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const innerInput = await combo.shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-haspopup"), "dialog", "Should render aria-haspopup attribute with value 'dialog'");
	});

	it("Should apply aria-controls pointing to the responsive popover", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo");
		const innerInput = await combo.shadow$("input");
		const popover = await combo.shadow$("ui5-responsive-popover");

		await combo.scrollIntoView();

		assert.strictEqual(await innerInput.getAttribute("aria-controls"), await popover.getAttribute("id"), "aria-controls attribute is correct.");
	});
});

describe("Keyboard navigation", async () => {
	beforeEach(async () => {
		await browser.url(`test/pages/ComboBox.html`);
	});

	it ("Should focus the first item on arrow down and then the input on arrow up",  async () => {
		const combo = await $("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		let groupItem, listItem;

		await arrow.click();
		await input.keys("ArrowDown");

		groupItem = (await getVisibleGroupItems(combo))[0];

		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");

		await input.keys("ArrowUp");
		assert.strictEqual(await combo.getProperty("focused"), true, "The input should be focused");

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		listItem = (await getVisibleItems(combo))[0];

		assert.strictEqual(await listItem.getProperty("focused"), true, "The first list item after the group header should be focused");

		await input.keys("ArrowUp");

		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");
	});

	it ("Should not focus the value state header", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await $("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		const popover = await combo.shadow$("ui5-responsive-popover");
		let valueStateHeader, groupItem;

		await arrow.click();
		await input.keys("ArrowDown");

		valueStateHeader = await popover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root");

		assert.strictEqual(await combo.getProperty("focused"), false, "The input should not be focused");
		assert.strictEqual(await valueStateHeader.hasClass("ui5-responsive-popover-header--focused"), false, "The value state header should not be focused");

		groupItem = (await getVisibleGroupItems(combo))[0];
		assert.strictEqual(await groupItem.getProperty("focused"), true, "The first group header should be focused");

		await input.keys("ArrowUp");
		assert.strictEqual(await combo.getProperty("focused"), true, "The input should be focused");
		assert.strictEqual(await valueStateHeader.hasClass("ui5-responsive-popover-header--focused"), false, "The value state header should not be focused");
	});

	it ("Previous focus should not remain on the item after reopening the picker and choosing another one", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await $("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		let listItem, prevListItem;

		await input.click();
		await input.keys("A");

		listItem = (await getVisibleItems(combo))[1];

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

		listItem = (await getVisibleItems(combo))[3];

		await listItem.click();

		await arrow.click();
		prevListItem = (await getVisibleItems(combo))[5];

		assert.strictEqual(await prevListItem.getProperty("focused"), false, "The previously focused item is no longer focused");
	});

	it ("Navigates back and forward through the items when the suggestions are closed", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");
		let prevListItem;

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

		prevListItem = (await getVisibleItems(combo))[5];

		assert.strictEqual(await prevListItem.getProperty("focused"), false, "The previously focused item is no longer focused");
	});

	it ("Navigates back and forward through items in multiple groups", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#value-state-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");

		await input.click();

		for (let i = 0; i < 5; i++) {
			await input.keys("ArrowDown");
		}

		assert.equal(await combo.getProperty("value"), "Bahrain", "The value is updated with the first suggestion item of the second group");

		for (let i = 0; i < 4; i++) {
			await input.keys("ArrowUp");
		}

		assert.strictEqual(await combo.getProperty("value"), "Argentina", "The value is updated with the first suggestion item of the first group");
	});

	it ("Should focus the next/previous focusable element on TAB/SHIFT+TAB",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const arrow = await combo.shadow$(".inputIcon");

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
		const pickerIcon = await comboBox.shadow$(".inputIcon");
		let listItem;

		// Opened picker
		await pickerIcon.click();
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		await input.keys("Home");
		listItem = (await getVisibleItems(comboBox))[0];
		assert.strictEqual(await listItem.getProperty("focused"), true, "The first item should be focused on HOME");
		assert.strictEqual(await comboBox.getProperty("focused"), false, "The ComboBox should not be focused");

		await input.keys("End");
		listItem = (await getVisibleItems(comboBox))[10];
		assert.strictEqual(await listItem.getProperty("focused"), true, "The last item should be focused on END");

		await input.keys("PageUp");
		listItem = (await getVisibleItems(comboBox))[0];
		assert.strictEqual(await listItem.getProperty("focused"), true, "The -10 item should be focused on PAGEUP");

		await input.keys("PageDown");
		listItem = (await getVisibleItems(comboBox))[10];
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

	it ("Should select previous item when the last suggestion is selected and the picker is closed",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");

		await combo.click();
		await combo.keys("PageDown");
		await combo.keys("PageDown");
		await combo.keys("ArrowUp");

		assert.strictEqual(await combo.getProperty("value"), "Albania", "The value is updated correctly");
	});

	it ("Should keep the value from the selected items after closing the picker",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#combo-grouping");
		const arrow = await combo.shadow$(".inputIcon");

		await arrow.click();
		await combo.keys("ArrowDown");
		await combo.keys("ArrowDown");

		assert.strictEqual(await combo.getProperty("value"), "Algeria", "The value is updated correctly");

		await combo.keys("F4");

		assert.strictEqual(await combo.getProperty("value"), "Algeria", "The value remains in the input field after picker is closed");
	});

	it ("Should select first matching item",  async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#same-name-suggestions-cb");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		const popover = await comboBox.shadow$("ui5-responsive-popover");

		// Opened picker
		await input.click();
		await input.keys("A");

		await browser.waitUntil(() => popover.getProperty("open"), {
			timeout: 200,
			timeoutMsg: "Popover should be displayed"
		});

		assert.strictEqual(await input.getProperty("value"), "Argentina", "Value should be Argentina");

		const listItems = await getVisibleItems(comboBox);

		assert.ok(await listItems[0].getProperty("selected"), "List Item should be selected");
		assert.notOk(await listItems[1].getProperty("selected"), "List Item should not be selected");
	});

	it("Should select the matching item when input has matching value and F4 is pressed", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await $("#combo");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		const value = await input.getProperty("value");

		await comboBox.click();
		await comboBox.keys("F4");

		const selectedListItem = (await getVisibleItems(comboBox))[8];

		assert.strictEqual(await selectedListItem.shadow$(".ui5-li-title").getText(), value, "Selected item is correct.");
	});

	it("Should not select an item when input value does not match any item and F4 is pressed", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#combo");
		const input = await comboBox.shadow$("#ui5-combobox-input");

		await input.click();
		await input.keys("test");

		await comboBox.keys("F4");


		const popover = await comboBox.shadow$("ui5-responsive-popover");
		const selectedListItems = await popover.$("ui5-list").$$("ui5-li[selected]");

		assert.strictEqual(selectedListItems.length, 0, "No item selected.");
	});

	it("Should select the first non-group item when input value is empty and F4 is pressed (no grouping)", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#combo2");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		let value = await input.getProperty("value");

		assert.strictEqual(value, "", "Default value should be empty.");

		await input.click();
		await comboBox.keys("F4");

		const listItems = await getVisibleItems(comboBox);
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		value = await input.getProperty("value");
		assert.strictEqual(value, firstListItemText, "First item is selected.");
	});

	it("Should select the first non-group item when input value is empty and F4 is pressed (with grouping)", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#combo-grouping");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		let value = await input.getProperty("value");

		assert.strictEqual(value, "", "Default value should be empty.");

		await input.click();
		await comboBox.keys("F4");

		const listItems = await getVisibleItems(comboBox);
		const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

		value = await input.getProperty("value");
		assert.strictEqual(value, firstListItemText, "First non-group item is selected.");
	});

	it("Switching focus between combo-boxes on 'Tab' should close the value state message of the previously focused combo-box", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox1 = await browser.$("#value-state-error");
		const comboBox2 = await browser.$("#vs-warning-default");

		await comboBox1.click();

		const valueState1 = await comboBox1.shadow$("ui5-popover");
		const valueState2 = await comboBox2.shadow$("ui5-popover");

		assert.ok(await valueState1.getProperty("open"), "Combo-box in focus should have open value state message.");
		assert.notOk(await valueState2.isExisting(), "Combo-box not in focus should not have value state message.");

		await comboBox1.keys("Tab");

		assert.ok(await valueState2.getProperty("open"), "Combo-box in focus should have open value state message.");
		assert.notOk(await valueState1.isExisting(), "Combo-box not in focus should not have value state message.");
	});

	it("Value state message of type 'Information' is opened on focusing the combo-box", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#vs-information-default");
		await comboBox.click();

		const valueState = await comboBox.shadow$("ui5-popover");

		assert.ok(await valueState.isExisting(), "Value state message exists.");
		assert.ok(await valueState.getProperty("open"), "Combo-box in focus should have open value state message.");
	});

	it("Pressing a link inside value state message popover and pressing 'Tab' after that closes the popover", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#value-state-error");
		await comboBox.click();

		const valueState = await comboBox.shadow$("ui5-popover");

		await comboBox.$("div[slot='valueStateMessage'] ui5-link").click();
		await comboBox.keys("Tab");

		assert.notOk(await valueState.isExisting(), "Value state message is closed.");
	});

	it ("Tests disabled autocomplete(type-ahead)", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const comboBox = await browser.$("#combo-without-type-ahead");
		const input = await comboBox.shadow$("#ui5-combobox-input");
		const popover = await comboBox.shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("b");

		await browser.waitUntil(() => popover.getProperty("open"), {
			timeout: 200,
			timeoutMsg: "Popover should be displayed"
		});

		assert.strictEqual(await input.getProperty("value"), "b", "Value is not autocompleted");
	});

	it ("Should scroll to items that are in the scroll area upon navigation", async () => {
		await browser.url(`test/pages/ComboBox.html`);
		await browser.setWindowSize(1000, 400);

		const combo = await browser.$("#combo-grouping");
		const input = await combo.shadow$("#ui5-combobox-input");
		const arrow = await combo.shadow$(".inputIcon");


		await combo.scrollIntoView();

		await arrow.click();

		let isInVisibleArea = await browser.executeAsync(async done => {
			const combobox = document.getElementById("combo-grouping");
			const picker = await combobox._getPicker();
			const listItem = combobox.querySelector("ui5-cb-item-group:last-child ui5-cb-item:last-child");
			const scrollableRect = picker.shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const elementRect = listItem.getBoundingClientRect();

			// Check if the element is within the visible area
			const isElementAboveViewport = elementRect.bottom < scrollableRect.top;
			const isElementBelowViewport = elementRect.top > scrollableRect.bottom;
			const isElementLeftOfViewport = elementRect.right < scrollableRect.left;
			const isElementRightOfViewport = elementRect.left > scrollableRect.right;

			const isListItemInVisibleArea =  (
				!isElementAboveViewport &&
				!isElementBelowViewport &&
				!isElementLeftOfViewport &&
				!isElementRightOfViewport
			);

			done(isListItemInVisibleArea);
		});

		assert.notOk(isInVisibleArea, "Item should not be displayed in the viewport");

		// click ArrowDown 16 times
		for (let i = 0; i < 16; i++) {
            await browser.keys("ArrowDown"),
            await browser.pause(10);
        }

		isInVisibleArea = await browser.executeAsync(async done => {
			const combobox = document.getElementById("combo-grouping");
			const picker = await combobox._getPicker();
			const listItem = combobox.querySelector("ui5-cb-item-group:last-child ui5-cb-item:last-child");
			const scrollableRect = picker.shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const elementRect = listItem.getBoundingClientRect();

			// Check if the element is within the visible area
			const isElementAboveViewport = elementRect.bottom < scrollableRect.top;
			const isElementBelowViewport = elementRect.top > scrollableRect.bottom;
			const isElementLeftOfViewport = elementRect.right < scrollableRect.left;
			const isElementRightOfViewport = elementRect.left > scrollableRect.right;

			const isListItemInVisibleArea =  (
				!isElementAboveViewport &&
				!isElementBelowViewport &&
				!isElementLeftOfViewport &&
				!isElementRightOfViewport
			);

			done(isListItemInVisibleArea);
		});

		assert.ok(isInVisibleArea, "Item should be displayed in the viewport");

		await input.keys("Home");

		let isFirstItemInVisibleArea = await browser.executeAsync(async done => {
			const combobox = document.getElementById("combo-grouping");
			const picker = await combobox._getPicker();
			const firstListItem = combobox.querySelector("ui5-cb-item-group:first-child ui5-cb-item:first-child");
			const scrollableRect = picker.shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const firstItemBoundingClientRect = firstListItem.getBoundingClientRect();

			// Check if the element is within the visible area
			const isFirstItemAboveViewport = firstItemBoundingClientRect.bottom < scrollableRect.top;
			const isFirstItemBelowViewport = firstItemBoundingClientRect.top > scrollableRect.bottom;
			const isFirstItemLeftOfViewport = firstItemBoundingClientRect.right < scrollableRect.left;
			const isFirstItemRightOfViewport = firstItemBoundingClientRect.left > scrollableRect.right;

			const isFirstItemInVisibleArea =  (
				!isFirstItemAboveViewport &&
				!isFirstItemBelowViewport &&
				!isFirstItemLeftOfViewport &&
				!isFirstItemRightOfViewport
			);

			done(isFirstItemInVisibleArea);
		});

		assert.ok(isFirstItemInVisibleArea, "The first item should be displayed in the viewport");

		let isLastItemInVisibleArea = await browser.executeAsync(async done => {
			const combobox = document.getElementById("combo-grouping");
			const picker = await combobox._getPicker();
			const lastListItem = combobox.querySelector("ui5-cb-item-group:first-child ui5-cb-item:first-child");
			const scrollableRect = picker.shadowRoot.querySelector(".ui5-popup-content").getBoundingClientRect();
			const lastItemBoundingClientRect = lastListItem.getBoundingClientRect();

			// Check if the element is within the visible area
			const isLastItemAboveViewport = lastItemBoundingClientRect.bottom < scrollableRect.top;
			const isLastItemBelowViewport = lastItemBoundingClientRect.top > scrollableRect.bottom;
			const isLastItemLeftOfViewport = lastItemBoundingClientRect.right < scrollableRect.left;
			const isLastItemRightOfViewport = lastItemBoundingClientRect.left > scrollableRect.right;

			const isLastItemInVisibleArea =  (
				!isLastItemAboveViewport &&
				!isLastItemBelowViewport &&
				!isLastItemLeftOfViewport &&
				!isLastItemRightOfViewport
			);

			done(isLastItemInVisibleArea);
		});

		assert.ok(isLastItemInVisibleArea, "The first item should be displayed in the viewport");
	});

	it ("Should get the physical DOM reference for the cb item", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const cbItemDomRef = await browser.executeAsync(done => {
			return done(document.getElementById("cbi").getDomRef());
		});

		assert.ok(cbItemDomRef, "ComboBoxItem's DOM reference exists");
	});

});
