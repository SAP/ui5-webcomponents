const assert = require("chai").assert;

describe("General interaction", () => {

	it ("Should open the popover when clicking on the arrow", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(!popover.getProperty("opened"), "Popover should not be displayed")

		arrow.click();

		assert.ok(popover.getProperty("opened"), "Popover should be displayed")
	});

	it ("Items filtration", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

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
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

		const combo = $("#combo");
		const lazy = $("#lazy");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		input.click();
		input.keys("b");

		assert.ok(popover.getProperty("opened"), "Popover should be displayed");
		assert.strictEqual(input.getProperty("value"), "Bahrain", "Value should be Bahrain");


		const selection = browser.execute(() => {
			return window.getSelection().toString();
		});

		assert.strictEqual(selection, "ahrain", "ahrain should be selected");
		assert.strictEqual(combo.getProperty("value"), "Bulgaria", "Value should be Bulgaria");
		const listItems = popover.$("ui5-list").$$("ui5-li");
		assert.ok(listItems[0].getProperty("selected"), "List Item should be selected");

		lazy.click();

		assert.strictEqual(combo.getProperty("value"), "Bahrain", "Value should be changed to Bahrain");
	});

	it ("Should filter items based on input", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

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
		assert.strictEqual(listItems.length, 2, "Items should be 2");

		// act
		input.keys("zzz");
		listItems = popover.$("ui5-list").$$("ui5-li");

		// assert
		assert.strictEqual(listItems.length, 0, "Items should be 0");
		assert.notOk(popover.getProperty("opened"), "Popover should close");
	});

	it ("Should close popover on item click / change event", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

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
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

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
	});

	it ("Tests input event", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

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
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

		const combo = $("#combo");
		const arrow = combo.shadow$("[input-icon]");

		assert.ok(!combo.getProperty("focused"), "property focused should be false");

		arrow.click();

		assert.ok(combo.getProperty("focused"), "property focused should be true");
	});

	it ("Tests focused property when clicking on the input", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

		const combo = $("#combo");
		const input = combo.shadow$("#ui5-combobox-input");

		assert.ok(!combo.getProperty("focused"), "property focused should be false");

		input.click();

		assert.ok(combo.getProperty("focused"), "property focused should be true");
	});
});
