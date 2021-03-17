const assert = require("chai").assert;

describe("MultiComboBox general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
	});

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
			browser.pause(300);

			assert.notOk(mcb.getProperty("focused"), "MultiComboBox should no longer be focused.");

			input.keys("ArrowRight");
			browser.pause(500);

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
		before(() => {
			browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
			browser.setWindowSize(1920, 1080);
		});

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

		it("When popover is opened via icon and item is selected/deselected, focus should return to the MultiComboBox", () => {
			const icon = browser.$("#mcb-success").shadow$("[input-icon]");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mcb-success")
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			icon.click();

			assert.strictEqual(popover.getProperty("opened"), true, "The popover should be opened");

			firstItem.click();

			assert.ok(browser.$("#mcb-success").getProperty("focused"), "MultiComboBox should be focused.");
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
			assert.ok(browser.$("#another-mcb").getProperty("focused"), "MultiComboBox should be focused.");
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
		before(() => {
			browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
		});

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

	describe("General", () => {
		before(() => {
			browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
		});

		it ("tests two-column layout", () => {
			const mcb = $("#mcb-two-column-layout");
			const staticAreaItemClassName = browser.getStaticAreaItemClassName("#mcb-two-column-layout");
			const icon = mcb.shadow$("[input-icon]");
			const popover = browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const listItem = popover.$("ui5-list").$$("ui5-li")[0];

			icon.click();
			assert.strictEqual(listItem.shadow$(".ui5-li-info").getText(), "DZ", "Additional item text should be displayed");
			icon.click();
		});

		it ("placeholder tests", () => {
			const mcb1 = browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const mcb2 = browser.$("#mcb-with-placeholder").shadow$("#ui5-multi-combobox-input");

			assert.strictEqual(mcb1.getAttribute("placeholder"), "Some initial text", "Should have placeholder");
			assert.strictEqual(mcb2.getAttribute("placeholder"), "", "Shouldn't have placeholder when there are tokens");
		});
	});

	describe("ARIA attributes", () => {
		before(() => {
			browser.url("http://localhost:8080/test-resources/pages/MultiComboBox.html");
		});

		it ("aria-describedby value according to the tokens count and the value state", () => {
			const mcb = $("#mcb-error");
			const innerInput = mcb.shadow$("input");
			const invisibleText = mcb.shadow$(".ui5-hidden-text");
			let tokens = mcb.shadow$$(".ui5-multi-combobox-token");
			const tokensCountITextId = `${mcb.getProperty("_id")}-hiddenText-nMore`;
			const valuestateITextId = `${mcb.getProperty("_id")}-valueStateDesc`;
			const ariaDescribedBy = `${tokensCountITextId} ${valuestateITextId}`;

			assert.strictEqual(tokens.length, 3, "should have three tokens");
			assert.strictEqual(innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby has a reference for the value state and the tokens count");
		});

		it ("aria-describedby value according to the tokens count", () => {
			const mcb = $("#mcb-compact");

			mcb.scrollIntoView();
			browser.pause(500);

			const innerInput = mcb.shadow$("input");
			const invisibleText = mcb.shadow$(".ui5-hidden-text");
			const inivisbleTextId = invisibleText.getProperty("id");
			let tokens = mcb.shadow$$(".ui5-multi-combobox-token");
			let resourceBundleText = null;

			assert.strictEqual(tokens.length, 2, "should have two tokens");
			assert.strictEqual(innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
			assert.strictEqual(invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");

			innerInput.click();
			innerInput.keys("Backspace");
			innerInput.keys("Backspace");

			tokens = mcb.shadow$$(".ui5-multi-combobox-token");

			resourceBundleText = browser.execute(() => {
				const mcb = document.getElementById("mcb-compact");
				return mcb.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN);
			});

			assert.strictEqual(tokens.length, 1, "should have one token");
			assert.strictEqual(invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

			innerInput.keys("Backspace");

			tokens = mcb.shadow$$(".ui5-multi-combobox-token");
			resourceBundleText = browser.execute(() => {
				const mcb = document.getElementById("mcb-compact");
				return mcb.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN);
			});

			assert.strictEqual(tokens.length, 0, "should not have tokens");
			assert.strictEqual(invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");
		});
	});
});
