const assert = require("assert");

describe("MultiComboBox general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/MultiComboBox.html");

	describe("selection and filtering", () => {

		it("Opens all items popover, selects and deselects the first item", () => {
			const icon = browser.findElementDeep("#mcb >>> #ui5-multi-combobox--input ui5-icon");
			const popover = browser.findElementDeep("#mcb >>> .ui5-multi-combobox-all-items--popover");
			const firstItem = browser.findElementDeep("#first-item");
			const firstItemCheckbox = browser.findElementDeep("#mcb >>> .ui5-multi-combobox-all-items--popover ui5-li[slot=items-1] >>> ui5-checkbox");
			const eventInput = $("#events-input");
			const paramsInput = $("#events-parameters");
			const callCountInput = $("#events-call-count");
			const resetBtn = $("#reset-btn");
			
			icon.click();

			assert.ok(popover.isDisplayedInViewport(), "Popover should be displayed in the viewport");
			assert.equal(firstItem.getAttribute("selected"), null, "First item should not be selected");

			firstItemCheckbox.click();

			assert.ok(firstItem.getAttribute("selected"), "First item should be selected");
			assert.strictEqual(eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(paramsInput.getValue(), "1", "one parameter should be passed in event's details");
			assert.strictEqual(callCountInput.getValue(), "1", "Event should be called once");

			firstItemCheckbox.click();

			assert.equal(firstItem.getAttribute("selected"), null, "First item should not be selected");
			assert.strictEqual(eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(paramsInput.getValue(), "0", "no parameter should be passed if no items are selected");
			assert.strictEqual(callCountInput.getValue(), "2", "Event should be called once");

			resetBtn.click();
		});

		it("Opens all items popover when start typing and filters items", () => {
			const input = browser.findElementDeep("#mcb >>> #ui5-multi-combobox--input >>> input");
			const popover = browser.findElementDeep("#mcb >>> .ui5-multi-combobox-all-items--popover");

			input.click();
			input.keys("c");

			const list = browser.findElementDeep("#mcb >>> .ui5-multi-combobox-all-items--popover ui5-list");

			assert.ok(popover.isDisplayedInViewport(), "Popover should be displayed in the viewport");
			assert.strictEqual(list.getProperty("items").length, 3, "3 items should be shown");

			input.keys("o");

			assert.strictEqual(list.getProperty("items").length, 3, "3 items should be shown");

			input.keys("m");

			assert.strictEqual(list.getProperty("items").length, 1, "1 items should be shown");

			input.keys("Backspace");

			assert.strictEqual(list.getProperty("items").length, 3, "1 items should be shown");
		});

		it("tests validate-input by typing a non existing option", () => {
			const mcb = $("#mcb-validation");
			const input = browser.findElementDeep("#mcb-validation >>> #ui5-multi-combobox--input");
			const innerInput = browser.findElementDeep("#mcb-validation >>> #ui5-multi-combobox--input >>> input");

			innerInput.click();
			innerInput.keys("c");

			assert.strictEqual(innerInput.getValue(), "c", "Value is c (as typed)");

			innerInput.keys("c");

			assert.strictEqual(innerInput.getValue(), "c", "Value is still c (incorrect input is prevented)");
			assert.strictEqual(input.getAttribute("value-state"), "Error", "Value state is changed to error");

			browser.waitUntil(() => {
				return input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it("tests if n more is applied and corresponding popover", () => {
			$("#more-mcb").scrollIntoView();

			const token1 = browser.findElementDeep("#more-mcb >>> ui5-tokenizer ui5-token[slot='tokens-1']");
			const token2 = browser.findElementDeep("#more-mcb >>> ui5-tokenizer ui5-token[slot='tokens-2']");
			const token3 = browser.findElementDeep("#more-mcb >>> ui5-tokenizer ui5-token[slot='tokens-3']");

			assert.ok(token1.isDisplayed(), "token 1 should be visible");
			assert.ok(token2.isDisplayed(), "token 2 should be visible");
			assert.ok(!token3.isDisplayed(), "token 3 should not be visible");
		});
	});
});
