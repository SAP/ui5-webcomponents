const assert = require("chai").assert;

describe("MultiComboBox general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");

	describe("toggling", () => {
		it("opens/closes", () => {
			const icon = browser.$("#multi1").shadow$("[input-icon]");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#multi1")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			icon.click();
			assert.ok(popover.getProperty("opened"), "Popover should be displayed in the viewport");

			icon.click();
			assert.ok(!popover.getProperty("opened"), "Popover should close");
		});

		it("Checks focus state", () => {
			const mcb = browser.$("#multi1");
			const input = mcb.shadow$("#ui5-multi-combobox-input");

			input.click();

			assert.ok(mcb.getProperty("focused"), "MultiComboBox should be focused.");

			input.keys("ArrowLeft");
			browser.pause(100);

			assert.notOk(mcb.getProperty("focused"), "MultiComboBox should no longer be focused.");

			input.keys("ArrowRight");
			browser.pause(100);

			assert.ok(mcb.getProperty("focused"), "MultiComboBox should be focused again.");
		});

		it("MultiComboBox open property is set correctly", () => {
			const mcb = browser.$("#multi1");
			const icon = browser.$("#multi1").shadow$("[input-icon]");
			const eventInput = $("#events-input");
			const callCountInput = $("#events-call-count");
			const resetBtn = $("#reset-btn");

			resetBtn.click();
			icon.click();
			assert.ok(mcb.getProperty("open"), "MultiComboBox should be opened");
			assert.strictEqual(eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(callCountInput.getValue(), "1", "Event should be called once");

			icon.click();
			assert.ok(!mcb.getProperty("open"), "MultiComboBox should be closed");

			assert.strictEqual(eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(callCountInput.getValue(), "2", "Event should be called once");

			resetBtn.click();
		});

		it("Opens selected items Popover", () => {
			browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");

			browser.setWindowSize(400, 1250);
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#multi1")
			const showMore = $("#multi1").shadow$(".ui5-multi-combobox-tokenizer").shadow$(".ui5-tokenizer-more-text");
			const allPopover = $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			showMore.click();

			assert.ok(allPopover.getProperty("opened"), "All popover should not be displayed");
		});
	});

	describe("selection and filtering", () => {
		browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
		browser.setWindowSize(1920, 1080);


		it("Opens all items popover, selects and deselects the first item", () => {
			const icon = browser.$("#mcb").shadow$("[input-icon]");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mcb")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = popover.$("ui5-list > ui5-li");
			const firstItemCheckbox = firstItem.shadow$("ui5-checkbox");
			const eventInput = $("#events-input");
			const paramsInput = $("#events-parameters");
			const callCountInput = $("#events-call-count");
			const resetBtn = $("#reset-btn");

			icon.click();

			assert.ok(popover.getProperty("opened"), "Popover should be displayed in the viewport");
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
			const input = browser.$("#mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mcb")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			input.click();
			input.keys("c");

			const list = popover.$(".ui5-multi-combobox-all-items-list");

			assert.ok(popover.getProperty("opened"), "Popover should be displayed in the viewport");
			assert.strictEqual(list.getProperty("items").length, 3, "3 items should be shown");

			input.keys("o");

			assert.strictEqual(list.getProperty("items").length, 3, "3 items should be shown");

			input.keys("m");

			assert.strictEqual(list.getProperty("items").length, 1, "1 items should be shown");

			input.keys("Backspace");

			assert.strictEqual(list.getProperty("items").length, 3, "3 items should be shown");
		});

		it("tests built in validation by typing a non existing option", () => {
			const mcb = $("#mcb-validation");
			const input = browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");
			const innerInput = browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");

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

		it("When item is clicked, the popover should be closed and the value in the input should be removed", () => {
			const input = browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#another-mcb")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			input.click();
			input.keys("c");

			assert.strictEqual(popover.getProperty("opened"), true, "The popover should be opened");
			assert.strictEqual(input.getValue(), "c", "Value is c (as typed)");

			firstItem.click();

			assert.strictEqual(popover.getProperty("opened"), false, "When the content is clicked, the popover should close");
			assert.strictEqual(input.getValue(), "", "When the content is clicked, the value should be removed");
		});

		it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", () => {
			const input = browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#another-mcb")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItemCheckbox = popover.$(".ui5-multi-combobox-all-items-list > ui5-li").shadow$("ui5-checkbox");

			input.click();
			input.keys("c");

			assert.strictEqual(popover.getProperty("opened"), true, "The popover should be opened");
			assert.strictEqual(input.getValue(), "c", "Value is c (as typed)");

			firstItemCheckbox.click();

			assert.strictEqual(popover.getProperty("opened"), true, "When the content is clicked, the popover should close");
			assert.strictEqual(input.getValue(), "c", "When the content is clicked, the value should be removed");
		});

		it("tests if n more is applied and corresponding popover", () => {
			$("#more-mcb").scrollIntoView();

			const nMoreText = browser.$("#more-mcb").shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			assert.ok(nMoreText.getText(), "1 More", "token 1 should be visible");
		});
	});

	describe("keyboard handling", () => {
		browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");

		it("tests backspace when combobox has an empty value", () => {
			let tokens = $("#multi1").shadow$$(".ui5-multi-combobox-token");
			const input = $("#multi1").shadow$("input");

			input.click();
			input.keys('Backspace');

			assert.strictEqual(tokens.length, 3, "3 tokens are visible");

			input.keys('Backspace');

			tokens = $("#multi1").shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 2, "2 tokens are visible");
		});
	});
});
