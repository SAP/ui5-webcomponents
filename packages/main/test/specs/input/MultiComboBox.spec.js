import { assert } from "chai";

describe("MultiComboBox general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
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

		it("Apply focus", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const focusBtn = await browser.$("#focus-mcb");

			assert.notOk(await mcb.getProperty("focused"), "MultiComboBox should not be focused.");

			await focusBtn.click();

			assert.ok(await mcb.getProperty("focused"), "MultiComboBox should be focused.");
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
			await browser.url(`test/pages/MultiComboBox.html`);

			await browser.setWindowSize(400, 1250);
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi1");
			const mcb = await browser.$("#multi1");
			const showMore = mcb.shadow$(".ui5-multi-combobox-tokenizer").shadow$(".ui5-tokenizer-more-text");
			const allPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await mcb.scrollIntoView();
			await showMore.click();

			assert.ok(await allPopover.getProperty("opened"), "All popover should not be displayed");
		});

		it("Checks if tokenizer is expanded when adding items dynamically", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const btn = await $("#add");
			const mcb = await $("#mcb-dynamic-selection");

			await btn.click();

			const inlinedTokens = await mcb.shadow$$("ui5-token:not([overflows])");

			assert.ok(inlinedTokens.length > 0, "Token is displayed");
		});
	});

	describe("selection and filtering", () => {
		before(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
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

			// The first backspace deletes the autocompleted part
			await input.keys("Backspace");
			await input.keys("Backspace");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");
		});

		it("tests built in validation by typing a non existing option", async () => {
			const mcb = await browser.$("#mcb-validation");
			const input = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");
			const innerInput = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");

			await innerInput.click();
			await innerInput.keys("c");

			assert.strictEqual(await innerInput.getValue(), "Cosy", "Value is correct");

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
			assert.strictEqual(await input.getValue(), "Cosy", "Value is correct");

			await firstItem.click();

			assert.notOk(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "", "When the content is clicked, the value should be the removed");
			assert.ok(await browser.$("#another-mcb").getProperty("focused"), "MultiComboBox should be focused.");
		});

		it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", async () => {
			const input = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#another-mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItemCheckbox = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li").shadow$("ui5-checkbox");

			await input.click();
			await input.keys("c");
			await browser.pause(500);

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "Compact", "Value is correct");

			await firstItemCheckbox.click();

			assert.ok(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "c", "When the content is clicked, the value should be the typed-in value");
		});

		it("tests if n more is applied and corresponding popover", async () => {
			$("#more-mcb").scrollIntoView();

			const nMoreText = await browser.$("#more-mcb").shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			assert.ok(await nMoreText.getText(), "1 More", "token 1 should be visible");
		});

		it("tests if clicking n more will prefilter items before opening the popover", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
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

		it("tests if tokenizer is scrolled to the end when expanded and to start when narrowed", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await input.click();

			let tokenizerContentScrollLeft = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			assert.notEqual(tokenizerContentScrollLeft, 0, "tokenizer is not scrolled to start");

			await input.keys('Tab');

			tokenizerContentScrollLeft = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			assert.strictEqual(tokenizerContentScrollLeft, 0, "tokenizer is scrolled to start");
		});

		it("tests if tokenizer is scrolled on keyboard navigation through the tokens", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await input.click();
			await input.keys('ArrowLeft');

			let scrollLeftFirstToken = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			await input.keys('ArrowLeft');
			let scrollLeftSecondToken = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

			assert.notEqual(scrollLeftFirstToken, scrollLeftSecondToken, "tokenizer is scrolled when navigating through the tokens");

			await input.keys('ArrowRight');
			let newScrollLeft =  await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

			assert.notEqual(newScrollLeft, scrollLeftSecondToken, "tokenizer is scrolled when navigating through the tokens");
		})

		it("tests if tokenizer is not expanded/collapsed when the suggestions are opened from a selected token", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			let tokenizer = await mcb.shadow$("ui5-tokenizer")
			let tokens = await browser.$("#more-mcb").shadow$$(".ui5-multi-combobox-token");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await tokens[1].click();
			await tokens[1].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), false, "tokenizer is scrolled when navigating through the tokens");

			await tokens[1].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), false, "tokenizer is scrolled when navigating through the tokens");

			tokens = await browser.$("#more-mcb").shadow$$(".ui5-multi-combobox-token");

			await input.click();
			await tokens[2].click();
			await tokens[2].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), true, "tokenizer is scrolled when navigating through the tokens");

			await tokens[2].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), true, "tokenizer is scrolled when navigating through the tokens");
		})

		it("tests filtering of items when nmore popover is open and user types in the input fueld", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
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

		it("Tests autocomplete(type-ahead)", async () => {
			let hasSelection;

			const input = await browser.$("#mcb").shadow$("input");
			const EXPTECTED_VALUE = "Compact";

			await input.click();
			await input.keys("com");

			hasSelection = await browser.execute(() =>{
				const input = document.getElementById("mcb").shadowRoot.querySelector("input");
				return input.selectionEnd - input.selectionStart > 0;
			});


			assert.strictEqual(await input.getProperty("value"), EXPTECTED_VALUE, "Value is autocompleted");
			assert.strictEqual(hasSelection, true, "Autocompleted text is selected");
		});

		it("Tests disabled autocomplete(type-ahead)", async () => {
			let hasSelection;

			const input = await browser.$("#mcb-no-typeahead").shadow$("input");

			await input.click();
			await input.keys("c");

			assert.strictEqual(await input.getProperty("value"), "c", "Value is not autocompleted");
		});

		it("Should make a selection on ENTER and discard on ESC", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			let tokens;

			const mcb = await browser.$("#mcb");
			const sExpected = "Cosy";
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")

			await mcb.click();
			await mcb.keys("c");
			await mcb.keys("Enter");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await mcb.getProperty("value"), "", "Value is autocompleted");
			assert.strictEqual(tokens.length, 1, "should have one token");

			await mcb.click();
			await mcb.keys("c");
			await mcb.keys("Escape");

			assert.strictEqual(await mcb.getProperty("value"), "c", "Value is autocompleted");
		});

		it ("should reset typeahead on item navigation and restore it on focus input", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await mcb.keys("c");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The input value is autocompleted");

			await mcb.keys("ArrowDown");
			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
			assert.equal(await mcb.getProperty("value"), "c", "The input typeahead is cleared");

			await input.keys("ArrowUp");

			assert.equal(await listItem.getProperty("focused"), false, "The first item is not focused");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The input value is autocompleted");
		});

		it("tests if clicking delete icon of a token removes it from the selection", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = await $("#mcb-long-token");
			const inner = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await inner.click();

			const token = await mcb.shadow$("ui5-tokenizer ui5-token");
			const deleteIcon = await token.shadow$(".ui5-token--icon");

			await deleteIcon.click();

			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 0, "Long token should be deleted" );
		});
	});

	describe("General", () => {
		before(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
		});

		it ("tests text selection on focus", async () => {
			const mcb = await browser.$("#multi-acv");
			const mcb2 = await browser.$("#mcb-with-placeholder");

			await mcb.click();

			const selectionStartIndex = await browser.execute(() => {
				return document.querySelector("#multi-acv").shadowRoot.querySelector("input").selectionStart;
			});
			const selectionEndIndex = await browser.execute(() => {
				return document.querySelector("#multi-acv").shadowRoot.querySelector("input").selectionEnd;
			});

			assert.equal(await selectionStartIndex, 0, "The selection starts from the beginning of the value");
			assert.equal(await selectionEndIndex, 3, "The whole value is selected");

			await mcb.keys("Tab");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");

			await mcb2.keys(["Shift", "Tab"]);
			assert.equal(await selectionStartIndex, 0, "The selection starts from the beginning of the value");
			assert.equal(await selectionEndIndex, 3, "The whole value is selected");


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

		it("placeholder tests for programmatically selected items", async () => {
			const innerInputSel = "#ui5-multi-combobox-input";

			const mcb1 = await browser.$("#mcb-init-selected-item");
			let innerInput1 = await mcb1.shadow$(innerInputSel);
			const toggleItemBtn1 = await browser.$("#sel");

			const mcb2 = await browser.$("#mcb-init-nonselected-item");
			let innerInput2 = await mcb2.shadow$(innerInputSel);
			const toggleItemBtn2 = await browser.$("#sel2");

			// Preselected item
			assert.strictEqual(await innerInput1.getAttribute("placeholder"), "", "Shouldn't have placeholder as there is a preselected item");

			toggleItemBtn1.click();

			innerInput1 = await mcb1.shadow$(innerInputSel);
			assert.strictEqual(await innerInput1.getAttribute("placeholder"), "Placeholder", "Should have placeholder as the item is programmatically deselected");

			// No preselected item
			assert.strictEqual(await innerInput2.getAttribute("placeholder"), "Placeholder", "Should have placeholder as no item is selected");

			toggleItemBtn2.click();

			innerInput2 = await mcb2.shadow$(innerInputSel);
			assert.strictEqual(await innerInput2.getAttribute("placeholder"), "", "Shouldn't have placeholder as an item is programmatically selected");
		});

		it ("Should not open value state message when component is in readonly state", async () => {
			const mcb = await browser.$("#readonly-value-state-mcb");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#readonly-value-state-mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

			await mcb.click();
			assert.notOk(await popover.getProperty("opened"), "Popover with valueStateMessage should not be opened.");
		});
	});
});
