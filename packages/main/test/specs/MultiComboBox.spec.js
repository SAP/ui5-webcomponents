const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("MultiComboBox general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
	});

	describe("toggling", () => {
		it("opens/closes", async () => {
			const icon = await browser.$("#multi1").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi1")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await icon.click();
			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");

			await icon.click();
			assert.notOk(await popover.getProperty("opened"), "Popover should close");
		});

		it("Checks focus state", async () => {
			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");

			await input.click();

			assert.ok(await mcb.getProperty("focused"), "MultiComboBox should be focused.");

			await input.keys("ArrowLeft");

			await browser.waitUntil(async () => !(await mcb.getProperty("focused")), {
				timeout: 500,
				timeoutMsg: "MultiComboBox should no longer be focused"
			});

			await input.keys("ArrowRight");

			await browser.waitUntil(() => mcb.getProperty("focused"), {
				timeout: 500,
				timeoutMsg: "MultiComboBox should be focused again"
			});
		});

		it("MultiComboBox open property is set correctly", async () => {
			const mcb = await browser.$("#multi1");
			const icon = await browser.$("#multi1").shadow$("[input-icon]");
			const eventInput = await browser.$("#events-input");
			const callCountInput = await browser.$("#events-call-count");
			const resetBtn = await browser.$("#reset-btn");

			await resetBtn.click();
			await icon.click();
			assert.ok(await mcb.getProperty("open"), "MultiComboBox should be opened");
			assert.strictEqual(await eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(await callCountInput.getValue(), "1", "Event should be called once");

			await icon.click();
			assert.notOk(await mcb.getProperty("open"), "MultiComboBox should be closed");

			assert.strictEqual(await eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(await callCountInput.getValue(), "2", "Event should be called once");

			await resetBtn.click();
		});

		it("Opens selected items Popover", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);

			await browser.setWindowSize(400, 1250);
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi1")
			const showMore = await browser.$("#multi1").shadow$(".ui5-multi-combobox-tokenizer").shadow$(".ui5-tokenizer-more-text");
			const allPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await showMore.click();

			assert.ok(await allPopover.getProperty("opened"), "All popover should not be displayed");
		});
	});

	describe("selection and filtering", () => {
		before(async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);
		});

		it("Opens all items popover, selects and deselects the first item", async () => {
			const icon = await browser.$("#mcb").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$("ui5-list > ui5-li");
			const firstItemCheckbox = await firstItem.shadow$("ui5-checkbox");
			const eventInput = await browser.$("#events-input");
			const paramsInput = await browser.$("#events-parameters");
			const callCountInput = await browser.$("#events-call-count");
			const resetBtn = await browser.$("#reset-btn");

			await icon.click();

			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");
			assert.equal(await firstItem.getAttribute("selected"), null, "First item should not be selected");

			await firstItemCheckbox.click();

			assert.ok(await firstItem.getAttribute("selected"), "First item should be selected");
			assert.strictEqual(await eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(await paramsInput.getValue(), "1", "one parameter should be passed in event's details");
			assert.strictEqual(await callCountInput.getValue(), "1", "Event should be called once");

			await firstItemCheckbox.click();

			assert.equal(await firstItem.getAttribute("selected"), null, "First item should not be selected");
			assert.strictEqual(await eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(await paramsInput.getValue(), "0", "no parameter should be passed if no items are selected");
			assert.strictEqual(await callCountInput.getValue(), "2", "Event should be called once");

			await resetBtn.click();
		});

		it("When popover is opened via icon and item is selected/deselected, focus should return to the MultiComboBox", async () => {
			const icon = await browser.$("#mcb-success").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-success")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			await icon.click();

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");

			await firstItem.click();

			assert.ok(await browser.$("#mcb-success").getProperty("focused"), "MultiComboBox should be focused.");
		});

		it("Opens all items popover when start typing and filters items", async () => {
			const input = await browser.$("#mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await input.click();
			await input.keys("c");

			const list = await popover.$(".ui5-multi-combobox-all-items-list");

			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");
			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");

			await input.keys("o");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");

			await input.keys("m");

			assert.strictEqual((await list.getProperty("items")).length, 1, "1 items should be shown");

			await input.keys("Backspace");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");
		});

		it("tests built in validation by typing a non existing option", async () => {
			const mcb = await browser.$("#mcb-validation");
			const input = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");
			const innerInput = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");

			await innerInput.click();
			await innerInput.keys("c");

			assert.strictEqual(await innerInput.getValue(), "c", "Value is c (as typed)");

			await innerInput.keys("c");

			assert.strictEqual(await innerInput.getValue(), "c", "Value is still c (incorrect input is prevented)");
			assert.strictEqual(await input.getAttribute("value-state"), "Error", "Value state is changed to error");

			await browser.waitUntil(async () => {
				return await input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it("When item is clicked, the popover should be closed and the value in the input should be removed", async () => {
			const input = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#another-mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			await input.click();
			await input.keys("c");

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "c", "Value is c (as typed)");

			await firstItem.click();

			assert.notOk(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "", "When the content is clicked, the value should be removed");
			assert.ok(await browser.$("#another-mcb").getProperty("focused"), "MultiComboBox should be focused.");
		});

		it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", async () => {
			const input = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#another-mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItemCheckbox = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li").shadow$("ui5-checkbox");

			await input.click();
			await input.keys("c");

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "c", "Value is c (as typed)");

			await firstItemCheckbox.click();

			assert.ok(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "c", "When the content is clicked, the value should be removed");
		});

		it("tests if n more is applied and corresponding popover", async () => {
			$("#more-mcb").scrollIntoView();

			const nMoreText = await browser.$("#more-mcb").shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			assert.ok(await nMoreText.getText(), "1 More", "token 1 should be visible");
		});

		it("tests if clicking n more will prefilter items before opening the popover", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = await $("#more-mcb");
			const icon = await mcb.shadow$("[input-icon]");
			const nMoreText = await mcb.shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			await mcb.scrollIntoView();
			await nMoreText.click();

			await browser.waitUntil(async () => mcb.getProperty("open"), {
				timeout: 500,
				timeoutMsg: "Popover is open"
			});

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#more-mcb")
			const popover = await $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const list = await popover.$(".ui5-multi-combobox-all-items-list");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown (all selected)");

			await icon.click();

			await browser.waitUntil(async () => !(await mcb.getProperty("open")), {
				timeout: 500,
				timeoutMsg: "Popover should be closed"
			});

			await icon.click();

			await browser.waitUntil(async () => await mcb.getProperty("open"), {
				timeout: 500,
				timeoutMsg: "Popover should be open"
			});

			assert.strictEqual((await list.getProperty("items")).length, 4, "4 items should be shown");
		});

		it("tests filtering of items when nmore popover is open and user types in the input fueld", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = await $("#more-mcb");
			const nMoreText = await mcb.shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			await mcb.scrollIntoView();

			const input = await mcb.shadow$("input");

			await nMoreText.click();

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#more-mcb")
			const popover = await $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const list = await popover.$(".ui5-multi-combobox-all-items-list");
			const lastListItem = await list.$("ui5-li:last-child");

			await input.click();
			await input.keys("c");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown (all selected)");
			assert.notOk(await lastListItem.getProperty("selected"), "last item should not be selected");
		})
	});

	describe("keyboard handling", () => {
		before(async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
		});

		it("tests backspace when combobox has an empty value", async () => {
			let tokens = await browser.$("#multi1").shadow$$(".ui5-multi-combobox-token");
			const input = await browser.$("#multi1").shadow$("input");

			await input.click();
			await input.keys('Backspace');

			assert.strictEqual(tokens.length, 3, "3 tokens are visible");

			await input.keys('Backspace');

			tokens = await browser.$("#multi1").shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 2, "2 tokens are visible");
		});

		it ("Value should be reset on ESC key", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);

			const mCombo = await browser.$("#another-mcb");
			const mCombo2 = await browser.$("#more-mcb");
			const input = await mCombo.shadow$("#ui5-multi-combobox-input");
			const input2 = await mCombo2.shadow$("#ui5-multi-combobox-input");

			await input.click();
			await input.keys("C");
			await input.keys("Escape");
			await input.keys("Escape");

			assert.strictEqual(await mCombo.getProperty("value"), "", "Value should be reset to the initial one");

			await input.click();
			await input.keys("C");

			// Move focus to another element and bring it back
			await input2.click();
			await input.click();

			await input.keys("o");
			await input.keys("Escape");
			await input.keys("Escape");

			assert.strictEqual(await mCombo.getProperty("value"), "C", "Value should be reset to the initial one");

			await input2.click();
			await input2.keys("C");
			await input2.keys("Escape");

			assert.strictEqual(await mCombo2.getProperty("value"), "", "Value should be cleared on escape even if the suggesitons are openjed");
		});

		it ("selects an item when enter is pressed and value matches a text of an item in the list", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-with-placeholder");
			const input = await mcb.shadow$("input");

			await input.click();
			await input.keys(['c', 'o', 'm', 'p', 'a', 'c', 't']);
			await input.keys("Enter");

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 4, "4 tokens are visible");
			assert.strictEqual(await input.getValue(), "", "Input's value should be empty");

			await input.keys(['c', 'o', 's', 'y']);
			await input.keys("Enter");

			assert.strictEqual(await input.getValue(), "cosy", "value should remain cosy");
			assert.strictEqual(await input.getAttribute("value-state"), "Error", "Value state is changed to error");
			assert.strictEqual(await mcb.getProperty("valueStateText"), "This value is already selected.", "Value state text should be set to already selected");

			await browser.waitUntil(async() => {
				return await input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it ("focuses the value state header and item on arrow down then the value state and the input on arrow up", async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await input.keys("ArrowDown");

			let valueStateHeader = await browser.execute(staticArea => staticArea.shadowRoot.querySelector(".ui5-responsive-popover-header.ui5-valuestatemessage-root"), staticArea);
			let focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should be focused");

			await input.keys("ArrowDown");

			let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
			assert.notEqual(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should not be focused");

			await input.keys("ArrowUp");
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item is no longer focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header is focused again");

			await input.keys("ArrowUp");
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item should not be focused");
			assert.equal(focusedElement, null, "The value state header or item should not be focused");
		});

		it ("focuses the first item on arrow down, then the input on arrow up", async () => {
			const mcb = await browser.$("#mcb-with-placeholder");
			const input = await mcb.shadow$("input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-with-placeholder");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await input.click();
			await input.keys(["Alt", "ArrowDown"]);
			await input.keys("ArrowDown");

			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");

			await input.keys("ArrowUp");

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item is not focused");
		});
	});

	describe("General", () => {
		before(async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
		});

		it ("tests two-column layout", async () => {
			const mcb = await browser.$("#mcb-two-column-layout");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-two-column-layout");
			const icon = await mcb.shadow$("[input-icon]");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			await icon.click();
			assert.strictEqual(await listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
			await icon.click();
		});

		it ("placeholder tests", async () => {
			const mcb1 = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const mcb2 = await browser.$("#mcb-with-placeholder").shadow$("#ui5-multi-combobox-input");

			assert.strictEqual(await mcb1.getAttribute("placeholder"), "Some initial text", "Should have placeholder");
			assert.strictEqual(await mcb2.getAttribute("placeholder"), "", "Shouldn't have placeholder when there are tokens");
		});
	});

	describe("ARIA attributes", () => {
		before(async () => {
			await browser.url(`http://localhost:${PORT}/test-resources/pages/MultiComboBox.html`);
		});

		it ("aria-describedby value according to the tokens count and the value state", async () => {
			const mcb = await browser.$("#mcb-error");
			const innerInput = await mcb.shadow$("input");
			const invisibleText = await mcb.shadow$(".ui5-hidden-text");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const tokensCountITextId = `${await mcb.getProperty("_id")}-hiddenText-nMore`;
			const valuestateITextId = `${await mcb.getProperty("_id")}-valueStateDesc`;
			const ariaDescribedBy = `${tokensCountITextId} ${valuestateITextId}`;

			assert.strictEqual(tokens.length, 3, "should have three tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby has a reference for the value state and the tokens count");
		});

		it ("aria-describedby value according to the tokens count", async () => {
			const mcb = await browser.$("#mcb-compact");

			await mcb.scrollIntoView();

			const innerInput = await mcb.shadow$("input");
			let invisibleText = await mcb.shadow$(".ui5-hidden-text");
			const inivisbleTextId = await invisibleText.getProperty("id");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			let resourceBundleText = null;

			assert.strictEqual(tokens.length, 2, "should have two tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
			// assert.strictEqual(await invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");

			await innerInput.click();
			await innerInput.keys("Backspace");
			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN));
			});

			assert.strictEqual(tokens.length, 1, "should have one token");
			// assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN));
			});

			assert.strictEqual(tokens.length, 0, "should not have tokens");
			// assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");
		});
	});
});
