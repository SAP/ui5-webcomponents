import { assert } from "chai";

const getVisibleItems = async (combo) => {
	const items = await combo.$$("ui5-mcb-item");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

const getVisibleGroupItems = async (combo) => {
	const items = await combo.$$("ui5-mcb-item-group");
	const assignedItems = await Promise.all(items.map(async item => {
		return (await item.getProperty("assignedSlot")) ? item : null;
	}));

	return assignedItems.filter(item => item !== null);
};

describe("MultiComboBox general interaction", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
		await browser.setWindowSize(1920, 1080);
	});

	describe("keyboard handling", () => {
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

		it("Value should be reset on ESC key", async () => {
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

			assert.strictEqual(await mCombo.getProperty("value"), "Cosy", "Value should be reset to the initial one");

			await input2.click();
			await input2.keys("C");
			await input2.keys("Escape");

			assert.strictEqual(await mCombo2.getProperty("value"), "", "Value should be cleared on escape even if the suggesitons are openjed");
		});

		it("selects an item when enter is pressed and value matches a text of an item in the list", async () => {
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
			assert.strictEqual(await input.getAttribute("value-state"), "Negative", "Value state is changed to Negative");
			assert.strictEqual(await mcb.getProperty("valueStateDefaultText"), "This value is already selected.", "Value state text should be set to already selected");

			await browser.waitUntil(async() => {
				return await input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it("focuses the first item on arrow down then the input on arrow up. Value state header is not focused at all", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$(".inputIcon");
			const listItem = (await getVisibleItems(mcb))[0];

			await icon.click();
			await input.keys("ArrowDown");

			let activeElementHTML = await browser.execute(() => document.activeElement.shadowRoot.activeElement.outerHTML);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.ok(await listItem.matches(":focus"), "The first item is focused");

			await input.keys("ArrowUp");
			activeElementHTML = await browser.execute(() => document.activeElement.shadowRoot.activeElement.outerHTML);

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.notOk(await listItem.matches(":focus"), "The first item should not be focused");
		});

		it("focuses the first item on arrow down, then the input on arrow up", async () => {
			const mcb = await browser.$("#mcb-with-placeholder");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$(".inputIcon");
			const listItem = (await getVisibleItems(mcb))[0];

			await icon.click();
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.ok(await listItem.matches(":focus"), "The first item is focused");

			await input.keys("ArrowUp");

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.notOk(await listItem.matches(":focus"), "The first item is not focused");
		});

		it("focuses the item group, then select all item checkbox on arrow up", async () => {
			const mcb = await browser.$("#mcb-select-all-grouping");
			const input = await mcb.shadow$("input");
			const popover = await mcb.shadow$("ui5-responsive-popover");
			const checkbox = await popover.$("ui5-checkbox");
			const listItemGroup = await mcb.$("ui5-mcb-item-group");

			await input.click();
			await mcb.keys("F4");
			await input.keys("ArrowUp");

			assert.ok(await listItemGroup.matches(":focus"), "The first item is focused");

			await input.keys("ArrowUp");

			assert.ok(await checkbox.matches(":focus"), "The select all checkbox is focused");
		});

		it("should navigate through the items with arrow keys when the picker is closed", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The first item name is seleted");

			await mcb.keys("ArrowDown");
			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set back to the first item name");

			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value remains the same when pressing arrow up while the first item is set");
		});

		it("should only navigate through not already selected items with arrow keys when the picker is closed", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await input.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item is set");

			await input.keys("ArrowDown");
			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item remains set");

			await input.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item remains set");
		});

		it("should reset current navigation state on user input", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys("a");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set to the first item name");

			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Condensed", "The value is set to the third item name");

			await mcb.keys("a");
			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Longest word in the world 2", "The last item is selected if there is a custom value in the input");
		});

		it("arrow up when no item is selected should go to the last item", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowUp");

			assert.equal(await mcb.getProperty("value"), "Longest word in the world 2", "Last value should be selected");
		});

		it("should focus input after all tokens are deleted", async () => {
			const mcb = await browser.$("#mcb-compact");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Shift", "ArrowLeft"]);
			await mcb.keys("Delete");

			assert.equal(await mcb.getProperty("focused"), true, "Input should be focused");
		});

		it("first HOME should move caret to start of the input, second HOME should focus the first token, END should focus last token", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await mcb.click();
			await input.keys(['c', 'o', 'm', 'p']);
			await input.keys("Home");

			const caretPosition = await browser.executeAsync(done => {
				return done(document.querySelector("#mcb").shadowRoot.querySelector("input").selectionStart);
			});

			assert.equal(await caretPosition, 0, "The caret is at the start of the input");

			await input.keys("Home");
			assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");

			await input.keys("End");
			assert.equal(await tokens[tokens.length - 1].getProperty("focused"), true, "The last token is focused");

			await input.keys("End");
			assert.equal(await mcb.getProperty("focused"), true, "The input is focused");
		});

		it("CTRL + HOME focus the first item, CTRL + END should focus last item", async () => {
			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const firstItem = await mcb.$("ui5-mcb-item");
			const lastItem = await mcb.$("ui5-mcb-item:last-child");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys(['Control','End']);

			assert.ok(await lastItem.matches(":focus"), "The last item is focused");

			await mcb.keys(['Control','Home']);

			assert.ok(await firstItem.matches(":focus"), "The first item is focused");
		});

		it("should close the picker and focus the next element on TAB", async () => {
			const mcb = await browser.$("#mcb");
			const mcb2 = await browser.$("#mcb-no-typeahead");

			await mcb.click();
			await mcb.keys("F4");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");

			await mcb2.keys("F4");
			await mcb2.keys(["Shift", "Tab"]);

			assert.equal(await mcb2.getProperty("open"), false, "The next control is closed");
			assert.equal(await mcb.getProperty("focused"), true, "The previous control is focused");

			await mcb.keys(["a", "b", "c"]);
			await mcb.keys("F4");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed");
			assert.equal(await mcb.getProperty("value"), "abc", "The previous control value is set");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");
		});

		it("should close the picker and focus the next element on TAB over an item or value state header", async () => {
			const mcb = await browser.$("#mcb-warning");
			const input = await mcb.shadow$("input");
			const mcb2 = await browser.$("#mcb-error");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed after TAB on value state header");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused after TAB on value state header");

			await mcb2.keys("F4");
			await mcb2.keys("ArrowDown");
			await mcb2.keys("ArrowDown");
			await mcb2.keys(["Shift", "Tab"]);

			assert.equal(await mcb2.getProperty("open"), false, "The next control is closed after TAB on suggestion item");
			assert.equal(await mcb.getProperty("focused"), true, "The previous control is focused after TAB on suggestion item");

			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed after TAB on suggestion item");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused after TAB on suggestion item");
		});

		it("should select/unselect next/previous item on shift+arrow", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("Space");
			await mcb.keys(["Shift", "ArrowDown"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 2, "should have two items selected");

			await mcb.keys("ArrowDown");
			await mcb.keys(["Shift", "ArrowUp"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 1, "should have two items selected");
		});

		it("should move focus to the previous token with arrow left", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens[2].getProperty("focused"), true, "Last token should be focused");

			await mcb.keys("ArrowLeft");
			assert.strictEqual(await tokens[1].getProperty("focused"), true, "Second token should be focused");

			await mcb.keys("ArrowLeft");
			assert.strictEqual(await tokens[0].getProperty("focused"), true, "First token should be focused");
		});

		it("should navigate through the items with CTRL + arrow up/down keys when the picker is closed", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys(["Control", "ArrowDown"]);

			assert.equal(await mcb.getProperty("value"), "Cosy", "The first item name is selected");

			await mcb.keys(["Control", "ArrowDown"]);
			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys(["Control", "ArrowUp"]);
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set back to the first item name");

			await mcb.keys(["Control", "ArrowUp"]);
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value remains the same when pressing arrow up while the first item is set");
		});

		it("focuses the first item on CTRL + arrow down then the input on CTRL + arrow up", async () => {
			const mcb = await browser.$("#mcb-error");
			const icon = await mcb.shadow$(".inputIcon");
			const listItem = mcb.$("ui5-mcb-item");

			await icon.click();
			await mcb.keys(["Control", "ArrowDown"]);

			let activeElementHTML = await browser.execute(() => document.activeElement.shadowRoot.activeElement.outerHTML);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.ok(await listItem.matches(":focus"), "The first item is focused");

			await mcb.keys(["Control", "ArrowUp"]);
			activeElementHTML = await browser.execute(() => document.activeElement.shadowRoot.activeElement.outerHTML);

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.notOk(await listItem.matches(":focus"), "The first item is no longer focused");
		});

		it("should select all filtered items on CTRL+A", async () => {
			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys(["Control", "a"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 6, "All items are selected");

			await mcb.keys(["Control", "a"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 0, "All items are deselected");

			await input.click();
			await mcb.keys("c");
			await mcb.keys("ArrowDown");
			await mcb.keys(["Control", "a"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 3, "All filtered items are selected");

			await mcb.keys(["Control", "a"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 0, "All selected filtered items are deselected");
		});

		it("should copy a token with CTRL+C and paste it with CTRL+V", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			assert.strictEqual(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
			assert.ok(await mcb2.getProperty("open"), "Popover should be open");

			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "CondensedCondensed", "Pasting second time should append the as text");
		});

		it("should not be able to paste token with CTRL+V in read only multi combo box", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#readonly-value-state-mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			const mcb2Tokens = await mcb2.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await mcb2.getProperty("value"), "", "Token is not pasted into the second control");
			assert.equal(mcb2Tokens.length, 0, "No token was created.");
		});

		it("should cut a token with CTRL+X and paste it with CTRL+V", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "x"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it("should cut a token with SHIFT+DELETE and paste it with SHIFT+INSERT", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Shift", "Delete"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it("should copy a token with CTRL+INSERT and paste it with SHIFT+INSERT", async () => {
			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "Insert"]);
			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it("should select a token with CTRL+SPACE", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Control", "Space"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
		});

		it("CTRL+SPACE should do nothing when pressed in the input field", async () => {
			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys(["Shift", "Space"]);

			assert.strictEqual(await mcb.getProperty("value"), "", "Input field is empty");
		});

		it("F4 should focus the selected item or the first one if there is no selected", async () => {
			const mcb = await browser.$("#mcb");
			const listItem = await mcb.$$("ui5-mcb-item")[0];
			const listItem2 = await mcb.$$("ui5-mcb-item")[1];
			await mcb.click();
			await mcb.keys("F4");

			assert.ok(await listItem.matches(":focus"), "The first item is focused");

			await mcb.keys("ArrowDown");
			await mcb.keys("Space");
			await mcb.keys("F4");
			await mcb.keys("F4");

			assert.ok(await listItem2.matches(":focus"), "The second item is focused as it is selected");
		});

		it("Alt + Down should focus the corresponding item to the token from which the combination is pressed", async () => {
			const mcb = await browser.$("#mcb-items");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const listItem = await mcb.$$("ui5-mcb-item")[3];

			await tokens[2].click();
			await tokens[2].keys(["Alt", "ArrowDown"]);

			assert.ok(await listItem.matches(":focus"), "The selected item corresponding to the token is focused");
		});

		it("Alt + Down should focus the first item if no selected items are present", async () => {
			const mcb = await browser.$("#multi-acv");
			const listItem = await mcb.$("ui5-mcb-item");

			await mcb.click();
			await mcb.keys(["Alt", "ArrowDown"]);

			assert.ok(await listItem.matches(":focus"), "The first item is focused");
		});

		it("Alt + Down should not filter items", async () => {
			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");

			await input.click();
			await input.keys(["a", "b"]);
			await input.keys(["Alt", "ArrowDown"]);

			const listItem = await mcb.$("ui5-mcb-item");

			assert.ok(await listItem.matches(":focus"), "The items are not filtered and the first item is focused");
		});

		it("Alt + Down should focus the item corresponding to the text value", async () => {
			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const popover = await mcb.shadow$("ui5-responsive-popover");

			await input.click();
			await input.keys("ArrowDown");
			await input.keys("ArrowDown");
			await input.keys(["Alt", "ArrowDown"]);

			const listItem = await mcb.$$("ui5-mcb-item")[1];

			assert.ok(await listItem.matches(":focus"), "The second item is focused");
		});

		it("Backspace deletes token and forwards the focus to the last token without collapsing the tokenizer", async () => {
			const mcb = await browser.$("#n-more-many-items");
			const inner = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await inner.click();

			assert.strictEqual(tokens.length, 7, "7 Tokens are placed in the MCB");

			await inner.keys("Backspace");
			await inner.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 6, "6 Tokens are placed in the MCB");
			assert.ok(await tokens[tokens.length - 1].getProperty("focused"), "Last Token is focused");
		});

		it("Backspace should not delete tokens, when MCB is readonly", async () => {
			const mcb = await browser.$("#mcb-ro");
			const inner = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await inner.click();

			assert.strictEqual(tokens.length, 3, "3 Tokens are placed in the MCB");

			await inner.keys("Backspace");
			await inner.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 3, "3 Tokens are placed in the MCB");
			assert.ok(await tokens[tokens.length - 1].getProperty("focused"), "Last Token is focused");
		});

		it("should open/close popover on keyboard combination ctrl + i", async () => {
			const mcb = await browser.$("#truncated-token");
			const inner = await mcb.shadow$("input");
			const rpo = await mcb.shadow$("ui5-responsive-popover");

			await inner.click();
			await inner.keys(["Control", "i"]);
			assert.ok(await rpo.getProperty("open"), "Focused MCB - n-more popover should be opened");

			await inner.keys(["Control", "i"]);
			assert.notOk(await rpo.getProperty("open"), "Focused MCB - n-more popover should be closed");
		});

		it("shouldn't open popover on keyboard combination ctrl + i when there are no tokens", async () => {
			const mcb = await browser.$("#mcb-no-typeahead");
			const tokenizer = await mcb.shadow$("ui5-tokenizer");
			const rpo = await tokenizer.shadow$("ui5-responsive-popover");

			await mcb.click();
			await mcb.keys(["Control", "i"]);
			assert.notOk(await rpo.getProperty("open"), "n-more popover should be closed since no tokens");
		});
	});

	describe("General", () => {
		it("tests text selection on focus", async () => {
			const mcb = await $("#multi-acv");
			const mcb2 = await $("#mcb-with-placeholder");

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

		it("tests two-column layout", async () => {
			const mcb = await browser.$("#mcb-two-column-layout");
			const icon = await mcb.shadow$(".inputIcon");
			const listItem = await mcb.$("ui5-mcb-item");

			await icon.click();
			assert.strictEqual(await listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
			await icon.click();
		});

		it("placeholder tests", async () => {
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

		it("Should not open value state message when component is in readonly state", async () => {
			const mcb = await browser.$("#readonly-value-state-mcb");
			const popover = await mcb.shadow$("ui5-popover");

			await mcb.click();
			assert.notOk(await popover.getProperty("open"), "Popover with valueStateMessage should not be opened.");
		});

		it("Should not open value state popup when popover is open after clicking n more link", async () => {
			const mcb = await browser.$("#mcb-select-all-vs");

			await mcb.scrollIntoView();
			await mcb.click();

			const popover = await mcb.shadow$("ui5-responsive-popover");
			const valueStatePopover = await mcb.shadow$("ui5-popover");

			assert.notOk(await popover.getProperty("open"), "Popover with value state message header should not be opened.");
			assert.ok(await valueStatePopover.getProperty("open"), "Value state popover should be opened.");

			await mcb.keys("F4");
			await browser.keys("ArrowUp");
			await browser.keys("Enter");
			await browser.keys("Tab");

			const nMoreText = await mcb.shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");
			nMoreText.click();

			await browser.waitUntil(async () => mcb.getProperty("open"), {
				timeout: 1000,
				timeoutMsg: "Popover is open"
			});

			assert.ok(await popover.getProperty("open"), "Popover with value state message header should be opened.");
			assert.notOk(await valueStatePopover.getProperty("open"), "Value state popover should not be opened.");
		});

		it("Should apply correct text to the tokens overflow indicator", async () => {
			const mcNItems = await browser.$("#mc-items");
			const mcNMore = await browser.$("#mc-more");
			const tokenizerNItems = await mcNItems.shadow$("ui5-tokenizer");
			const tokenizerNMore = await mcNMore.shadow$("ui5-tokenizer");
			const nItemsLabel = await tokenizerNItems.shadow$(".ui5-tokenizer-more-text");
			const nMoreLabel = await tokenizerNMore.shadow$(".ui5-tokenizer-more-text");
			let resourceBundleText = null;

			resourceBundleText = await browser.executeAsync(done => {
				const mi = document.getElementById("mc-items");
				done({
					mcItemsLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_SHOW_ALL_ITEMS, 2),
					mcNMoreLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MULTIINPUT_SHOW_MORE_TOKENS, 1)
				});
			});
			assert.strictEqual(await nItemsLabel.getText(), resourceBundleText.mcItemsLabelText, "Text should be 2 Items");
			assert.strictEqual(await nMoreLabel.getText(), resourceBundleText.mcNMoreLabelText, "Text should be 1 More");
		});

		it("Should check clear icon availability", async () => {
			const cb = await browser.$("#clear-icon-cb");
			const inner = cb.shadow$("input");
			const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");

			assert.notOk(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to false when mcb has no value");

			await inner.click();
			await inner.keys("c");

			assert.ok(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to true upon typing");
		});

		it("Should check clear icon events", async () => {
			const cb = await browser.$("#clear-icon-cb");

			await cb.shadow$("input").click();
			await cb.shadow$("input").keys("c");

			const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");

			// focus out the combo
			await clearIcon.click();

			assert.strictEqual(await $("#clear-icon-change-count").getText(), "0", "change event is not fired");
			assert.strictEqual(await $("#clear-icon-input-count").getText(), "2", "input event is fired twice");
		});

		it("Should not fire submit event when confirming selection", async () => {
			const cb = await browser.$("#mcb-form");

			await cb.shadow$("input").click();
			await cb.shadow$("input").keys("A");
			await cb.shadow$("input").keys("Enter");

			assert.strictEqual(await $("#mcb-form-submit").getText(), "0", "submit event is not fired");

			await cb.shadow$("input").keys("Enter");

			assert.strictEqual(await $("#mcb-form-submit").getText(), "1", "submit event is now fired");
		});

		it("Should remove header when value state is reset", async () => {
			const mcb = $("#mcb-error");

			// click on arrow
			await mcb.shadow$("ui5-icon").click();

			// arrow down twice
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			// Enter to make selection
			await browser.keys("Space");

			// get value state header
			const valueStateHeader = await mcb.shadow$("ui5-responsive-popover div.ui5-valuestatemessage-header");

			assert.notOk(await valueStateHeader.isExisting(), "Value state header should not be rendered");
		});
	});

	describe("MultiComboBox Truncated Token", () => {
		it("should truncate token when single token is in the multicombobox and open popover on click", async () => {
			const mcb = await browser.$("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const tokenizer = await mcb.shadow$("ui5-tokenizer");
			const rpo = await tokenizer.shadow$("ui5-responsive-popover");
			const listItem = await rpo.$("ui5-li");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await token.click();

			assert.ok(await rpo.getProperty("open"), "More Popover should be open");
			assert.ok(await token.getProperty("selected"), "Token should be selected");
			assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
			assert.ok(await listItem.matches(":focus"), "Token's list item is focused");

			await token.click();

			assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
			assert.ok(await token.getProperty("focused"), "Token should be focused");
		});

		it("should close truncation popover and deselect selected tokens when clicked outside the component", async () => {
			const mcb = await browser.$("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const tokenizer = await mcb.shadow$("ui5-tokenizer");
			const rpo = await tokenizer.shadow$("ui5-responsive-popover");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await token.click();

			await browser.$("#dummy-btn").click();

			assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		});

		it("should close truncation popover and deselect selected tokens when clicked in input field", async () => {
			const mcb = await browser.$("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const tokenizer = await mcb.shadow$("ui5-tokenizer");
			const rpo = await tokenizer.shadow$("ui5-responsive-popover");
			const inner = await mcb.shadow$("input");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await inner.click();

			assert.notOk(await rpo.getProperty("open"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		});
	});

	describe("ARIA attributes", () => {
		it("aria-describedby value according to the tokens count and the value state", async () => {
			const mcb = await browser.$("#mcb-error");
			const innerInput = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const tokensCountITextId = `ui5-multi-combobox-hiddenText-nMore`;
			const valuestateITextId = `ui5-multi-combobox-valueStateDesc`;
			const ariaDescribedBy = `${tokensCountITextId} ${valuestateITextId}`;

			assert.strictEqual(tokens.length, 3, "should have three tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby has a reference for the value state and the tokens count");
		});

		it("aria-describedby value according to the tokens count", async () => {
			const mcb = await browser.$("#mcb-compact");

			await mcb.scrollIntoView();

			const innerInput = await mcb.shadow$("input");
			let invisibleText = await mcb.shadow$(".ui5-hidden-text");
			const inivisbleTextId = await invisibleText.getProperty("id");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			let resourceBundleText = null;

			let ariaHiddenText = await invisibleText.getHTML(false);

			assert.strictEqual(tokens.length, 2, "should have two tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
			assert.ok(await ariaHiddenText.includes("Contains 2 tokens"), "aria-describedby text is correct");

			await innerInput.click();
			await innerInput.keys("Backspace");
			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN));
			});

			ariaHiddenText = await invisibleText.getHTML(false);

			assert.strictEqual(tokens.length, 1, "should have one token");
			assert.ok(await ariaHiddenText.includes(resourceBundleText), "aria-describedby text is correct");

			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN));
			});

			ariaHiddenText = await invisibleText.getHTML(false);

			assert.strictEqual(tokens.length, 0, "should not have tokens");
			assert.ok(await ariaHiddenText.includes(resourceBundleText), "aria-describedby text is correct");


			await innerInput.click();
			await innerInput.keys("i");

			const firstItem = (await getVisibleItems(mcb))[0];
			await firstItem.click();

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			ariaHiddenText = await invisibleText.getHTML(false);

			assert.strictEqual(tokens.length, 1, "Token should be added");
			assert.ok(await ariaHiddenText.includes("Contains 1 token"),  "aria-describedby text is correct after adding token again");

		});

		it("Should apply aria-label from the accessibleName property", async () => {
			const mcb = await browser.$("#multi1");
			const innerInput = await mcb.shadow$("input");

			await mcb.scrollIntoView();

			assert.strictEqual(await innerInput.getAttribute("aria-label"), "MultiComboBox with predefined values", "aria-label attribute is correct.");
		});

		it("Should apply aria-label from the accessibleNameRef property", async () => {
			const mcb = await browser.$("#mcb-predefined-value");
			const innerInput = await mcb.shadow$("input");
			const mcbLabel = await browser.$("#mcbLabel");

			await mcb.scrollIntoView();

			assert.strictEqual(await innerInput.getAttribute("aria-label"), await mcbLabel.getHTML(false), "aria-label attribute is correct.");
		});

		it("Should apply aria-controls pointing to the responsive popover", async () => {
			const mcb = await browser.$("#mcb-predefined-value");
			const innerInput = await mcb.shadow$("input");
			const popover = await mcb.shadow$("ui5-responsive-popover");

			await mcb.scrollIntoView();

			assert.strictEqual(await innerInput.getAttribute("aria-controls"), await popover.getAttribute("id"), "aria-controls attribute is correct.");
		});

		it("Should render aria-haspopup attribute with value 'dialog'", async () => {
			const mcb = await browser.$("#mcb-compact");
			const innerInput = await mcb.shadow$("input");

			assert.strictEqual(await innerInput.getAttribute("aria-haspopup"), "dialog", "Should render aria-haspopup attribute with value 'dialog'");
		});

		it("Value state type should be added to the screen readers default value states announcement", async () => {
			const mCbWarning = await browser.$("#mcb-warning");
			const mCbSuccess = await browser.$("#mcb-success");
			const mCbError = await browser.$("#mcb-error");
			let input = await mCbWarning.shadow$("#ui5-multi-combobox-input");

			await input.click();

			let popover = await mCbWarning.shadow$("ui5-popover");
			let ariaHiddenText = await mCbWarning.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
			let valueStateText = await popover.$("div").getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Warning issued"), true, "Displayed value state message text is correct");

			input = await mCbError.shadow$("#ui5-multi-combobox-input");

			await mCbWarning.keys("Escape");
			await input.click();

			popover = await mCbError.shadow$("ui5-popover");

			ariaHiddenText = await mCbError.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
			valueStateText = await popover.$("div").getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Invalid entry"), true, "Displayed value state message text is correct");

			await mCbError.keys("Escape");
			await mCbSuccess.click();

			ariaHiddenText = await mCbSuccess.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		});

		it("Value state type should be added to the screen readers custom value states announcement", async () => {
			const mCbInformation = await browser.$("#mcb-information");

			await mCbInformation.click();
			await mCbInformation.keys("a");

			const valueStateText = await mCbInformation.$("div[slot='valueStateMessage']").getHTML(false);
			const ariaHiddenText = await mCbInformation.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Extra long text used as an information message"), true, "Displayed value state message text is correct");
		});
	});

	describe("Grouping", () => {
		it("Tests group filtering", async () => {
			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$(".inputIcon");
			let popover = await mcb.shadow$("ui5-responsive-popover");

			await arrow.click();

			let groupItems = await getVisibleGroupItems(mcb);
			let listItems = await getVisibleItems(mcb);

			assert.strictEqual(groupItems.length, 3, "Group items should be 3");
			assert.strictEqual(listItems.length, 12, "Items should be 12");

			await input.keys("B");

			popover = await mcb.shadow$("ui5-responsive-popover");
			groupItems = await getVisibleGroupItems(mcb);
			listItems = await getVisibleItems(mcb);

			assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
			assert.strictEqual(listItems.length, 1, "Filtered items should be 1");

			await input.keys("Backspace");
			await input.keys(['E', 'u', 'r', 'o', 'p', 'e']);

			assert.equal(await popover.getProperty("open"), false, "Popover should not be open");
		});

		it("Tests group item focusability", async () => {
			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$(".inputIcon");
			let groupItem;

			await arrow.click();
			await input.keys("ArrowDown");

			groupItem = (await getVisibleGroupItems(mcb))[0];

			assert.ok(await groupItem.matches(":focus"), "The first group header should be focused");
		});

		it("Tests group item focusability with keyboard", async () => {
			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");

			await input.click();
			await input.keys("F4");

			let firstItem = (await getVisibleItems(mcb))[0];

			assert.ok(await firstItem.matches(":focus"), "The first item inside the first group should be focused");
		});

		it("Group header keyboard handling", async () => {
			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$(".inputIcon");
			const popover = await mcb.shadow$("ui5-responsive-popover");
			let groupItem;

			await arrow.click();
			await input.keys("ArrowDown");

			groupItem = (await getVisibleGroupItems(mcb))[0];

			await groupItem.keys("Enter");

			assert.ok(await groupItem.matches(":focus"), "The first group header should be focused");
			assert.equal(await popover.getProperty("open"), true, "Popover should not be open");
			assert.strictEqual(await input.getValue(), "", "The value is not updated");

			groupItem = (await getVisibleGroupItems(mcb))[0];

			await groupItem.keys("Space");

			assert.ok(await groupItem.matches(":focus"), "The first group header should be focused");
			assert.equal(await popover.getProperty("open"), true, "Popover should not be open");
			assert.strictEqual(await input.getValue(), "", "The value is not updated)");

			groupItem = (await getVisibleGroupItems(mcb))[0];

			await groupItem.keys("ArrowUp");

			assert.notOk(await groupItem.matches(":focus"), "The first group header should not be focused");
			assert.equal(await mcb.getProperty("focused"), true, "The first group header should be focused");
		});

		it("Should not select group headers", async () => {
			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");

			await input.click();
			await mcb.setProperty("value", "Asia");
			await mcb.keys("Enter");

			let tokens = await browser.$("#mcb-grouping").shadow$$(".ui5-multi-combobox-token");
			let selectionChangeFired = await browser.execute(() => document.getElementById("selection-change-events-fired").textContent);

			assert.strictEqual(await input.getValue(), "Asia", "The value remains");
			assert.strictEqual(tokens.length, 0, "The group header is not tokenized");
			assert.strictEqual(selectionChangeFired, "", "SelectionChange event is not fired");
		});
	});
});
