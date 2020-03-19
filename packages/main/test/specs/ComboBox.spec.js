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

	it ("Should open the popover when typing a value", () => {
		browser.url("http://localhost:8080/test-resources/pages/ComboBox.html");

		const combo = $("#combo");
		const lazy = $("#lazy");
		const input = combo.shadow$("#ui5-combobox-input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#combo");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItems = popover.$("ui5-list").$$("ui5-li");

		input.click();
		input.keys("b");

		assert.ok(popover.getProperty("opened"), "Popover should be displayed");
		assert.strictEqual(input.getProperty("value"), "Bahrain", "Value should be Bahrain");


		const selection = browser.execute(() => {
			return window.getSelection().toString();
		});

		assert.strictEqual(selection, "ahrain", "ahrain should be selected");
		assert.strictEqual(combo.getProperty("value"), "Bulgaria", "Value should be Bulgaria");
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

		arrow.click();

		assert.strictEqual(listItems.length, 11, "Items should be 11");

		input.keys("a");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 5, "Items should be 5");

		input.keys("u");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 2, "Items should be 2");
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
		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(listItems[0].getText(), "Canada");
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
		assert.strictEqual(listItems.length, 1, "Items should be 1");
		assert.strictEqual(listItems[0].getText(), "Argentina");

		input.keys("a");
		listItems = popover.$("ui5-list").$$("ui5-li");
		assert.strictEqual(listItems.length, 0, "Items should be 0");
	});
});