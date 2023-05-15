import { assert } from "chai";

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

	it ("Should filter items based on input with filter='None' and lazy loading", async () => {
		await browser.url(`test/pages/ComboBox.html`);

		const combo = await browser.$("#cb-filter-none");
		const input = await combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#cb-filter-none");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		// act
		await input.click();

		// act
		await input.keys("I");

		setTimeout(async () => {
			listItems = await popover.$("ui5-list").$$("ui5-li");
			const firstListItemText = await listItems[0].shadow$(".ui5-li-title").getText();

			// assert
			assert.strictEqual(listItems.length, 5, "Items should be 5");
			assert.strictEqual(firstListItemText, "I #1", "First item should have text.");
		}, 1000)
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
		await input.keys("z");
		await input.keys("z");
		await input.keys("z");
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

		const listItem = listItems[7];
		const listItemText = await listItem.shadow$(".ui5-li-title").getText();

		await listItem.click();

		assert.strictEqual(await label.getText(), listItemText, "event is fired correctly");
	});

	it ("Tests selection-change event when type text after selection", async () => {
		const combo = await browser.$("#combo");
		let label = await browser.$("#selection-change-event-result");
		const arrow = await combo.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let listItems = await popover.$("ui5-list").$$("ui5-li");

		await arrow.click();
		await combo.keys("Backspace");
		await combo.keys("A");

		const fisrtListItem = listItems[0];

		assert.strictEqual(await label.getText(), await fisrtListItem.shadow$(".ui5-li-title").getText(), "event is fired correctly");
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
