import { assert } from "chai";


describe("MultiComboBox :: Keyboard Handling", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
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
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("selects an item when enter is pressed and value matches a text of an item in the list", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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
		assert.strictEqual(await mcb.getProperty("valueStateDefaultText"), "This value is already selected.", "Value state text should be set to already selected");

		await browser.waitUntil(async() => {
			return await input.getAttribute("value-state") === "None";
		}, 2500, "expect value state to be different after 2.5 seconds");
	});

	it ("focuses the value state header and item on arrow down then the value state and the input on arrow up", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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
		const icon = await mcb.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-with-placeholder");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

		await icon.click();
		await mcb.keys("ArrowDown");

		const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

		assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
		assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");

		await input.keys("ArrowUp");

		assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
		assert.equal(await listItem.getProperty("focused"), false, "The first item is not focused");
	});

	it ("should navigate through the items with arrow keys when the picker is closed", async () => {
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

	it ("should only navigate through not already selected items with arrow keys when the picker is closed", async () => {
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

	it ("should reset current navigation state on user input", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("arrow up when no item is selected should go to the last item", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");

		await mcb.click();
		await mcb.keys("ArrowUp");

		assert.equal(await mcb.getProperty("value"), "Longest word in the world 2", "Last value should be selected");
	});

	it ("Clicking delete icon should delete token and place the focus on the previous one", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		const secondToken = tokens[1];
		const deleteIcon =  await tokens[0].shadow$("ui5-icon");

		await secondToken.click();
		await deleteIcon.click();

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.equal(await tokens.length, 2, "should have two tokens");
		assert.equal(await tokens[0].getProperty("focused"), true, "Previous token is focused");
		assert.equal(await tokens[0].getProperty("text"), "Condensed", "The selected token should not be deleted.");
	});

	it ("BACKSPACE should delete token and place the focus on the previous one", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		const input = await mcb.shadow$("input");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		const secondToken = tokens[1];

		await secondToken.click();
		await mcb.keys("Backspace");

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.equal(await tokens.length, 2, "should have two tokens");
		assert.equal(await tokens[0].getProperty("focused"), true, "Previous token is focused");
	});

	it ("DELETE should delete token and place the focus on the next one", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		const input = await mcb.shadow$("input");

		await input.click();
		await mcb.keys("ArrowLeft");
		await mcb.keys("ArrowLeft");

		await mcb.keys("Delete");

		const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.equal(await tokens.length, 2, "should have two tokens");
		assert.equal(await tokens[1].getProperty("focused"), true, "Previous token is focused");
	});

	it ("BACKSPACE should delete token all selected tokens and place the focus on the first token before the deleted ones", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-items");
		const input = await mcb.shadow$("input");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		const fourthToken = tokens[3];

		await fourthToken.click();
		await mcb.keys(["Shift", "ArrowLeft"]);
		await mcb.keys("Backspace");

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		assert.equal(await tokens.length, 3, "should have three tokens");
		assert.equal(await tokens[1].getProperty("focused"), true, "Second token is focused");
	});

	it ("DELETE should delete token all selected tokens and place the focus on the first token after the deleted ones", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-items");
		const input = await mcb.shadow$("input");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		const fourthToken = tokens[3];

		await fourthToken.click();
		await mcb.keys(["Shift", "ArrowLeft"]);
		await mcb.keys("Delete");

		tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.equal(await tokens.length, 3, "should have two tokens");
		assert.equal(await tokens[2].getProperty("focused"), true, "Last token is focused");
	});

	it ("should focus input after all tokens are deleted", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-compact");
		const input = await mcb.shadow$("input");

		await input.click();
		await mcb.keys("ArrowLeft");
		await mcb.keys(["Shift", "ArrowLeft"]);
		await mcb.keys("Delete");

		assert.equal(await mcb.getProperty("focused"), true, "Input should be focused");
	});

	it ("first HOME should move caret to start of the input, second HOME should focus the first token, END should focus last token", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("CTRL + HOME focus the first token, CTRL + END should focus last token", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-error");
		const input = await mcb.shadow$("input");
		const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		await tokens[1].click();
		await input.keys(['Control','Home']);

		assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");

		await input.keys(['Control','End']);
		assert.equal(await tokens[tokens.length - 1].getProperty("focused"), true, "The last token is focused");
	});

	it ("CTRL + HOME focus the first item, CTRL + END should focus last item", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");
		const input = await mcb.shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);


		await input.click();
		await mcb.keys("F4");
		await mcb.keys("ArrowDown");
		await mcb.keys(['Control','End']);

		const lastItem = await popover.$("ui5-list").$$("ui5-li")[5];
		assert.equal(await lastItem.getProperty("focused"), true, "The last item is focused");

		await mcb.keys(['Control','Home']);

		const firstItem = await popover.$("ui5-list").$("ui5-li");
		assert.equal(await firstItem.getProperty("focused"), true, "The first item is focused");

	});

	it ("SHIFT + HOME should select all tokens from the current one to the first one", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		const input = await mcb.shadow$("input");
		const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		await tokens[1].click();
		await input.keys(['Shift','Home']);

		assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");
		assert.equal(await tokens[0].getProperty("selected"), true, "The first token is selected");
		assert.equal(await tokens[1].getProperty("selected"), true, "The second token is selected");
		assert.equal(await tokens[2].getProperty("selected"), false, "The last token is not selected");
	});

	it ("SHIFT + END should select all tokens from the current one to the last one", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		const input = await mcb.shadow$("input");
		const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		await tokens[1].click();
		await input.keys(['Shift','End']);

		assert.equal(await tokens[2].getProperty("focused"), true, "The last token is focused");
		assert.equal(await tokens[2].getProperty("selected"), true, "The last token is selected");
		assert.equal(await tokens[1].getProperty("selected"), true, "The second token is selected");
		assert.equal(await tokens[0].getProperty("selected"), false, "The first token is not selected");
	});
});
