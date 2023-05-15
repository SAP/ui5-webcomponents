import { assert } from "chai";


describe("MultiComboBox :: Keyboard Handling", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
	});

	it ("should close the picker and focus the next element on TAB", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should close the picker and focus the next element on TAB over an item or value state header", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should select/unselect next/previous item on shift+arrow", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should move focus to the previous token with arrow left", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should select multiple tokens and move focus with shift+arrow keys", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-error");
		const mcb2 = await browser.$("#mcb-warning");
		const input = await mcb.shadow$("input");
		const input2 = await mcb2.shadow$("input");


		await input.click();
		await mcb.keys("ArrowLeft");
		await mcb.keys(["Shift", "ArrowLeft"]);

		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
		assert.strictEqual(await tokens[1].getProperty("selected"), true, "Second token should be selected");
		assert.strictEqual(await tokens[1].getProperty("focused"), true, "Second token should be focused");

		await mcb.keys(["Shift", "ArrowLeft"]);

		assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
		assert.strictEqual(await tokens[1].getProperty("selected"), true, "Second token should be selected");
		assert.strictEqual(await tokens[0].getProperty("selected"), true, "First token should be selected");
		assert.strictEqual(await tokens[0].getProperty("focused"), true, "First token should be focused");

		await input2.click();
		await mcb2.keys("ArrowLeft");
		await mcb2.keys("ArrowLeft");
		await mcb2.keys("ArrowLeft");

		await mcb2.keys(["Shift", "ArrowRight"]);

		let tokens2 = await mcb2.shadow$$(".ui5-multi-combobox-token");

		assert.strictEqual(await tokens2[0].getProperty("selected"), true, "First token should be selected");
		assert.strictEqual(await tokens2[1].getProperty("selected"), true, "Second token should be selected");
		assert.strictEqual(await tokens2[1].getProperty("focused"), true, "second token should be focused");

		await mcb2.keys(["Shift", "ArrowRight"]);

		assert.strictEqual(await tokens2[2].getProperty("focused"), true, "Last token should be focused");
		assert.strictEqual(await tokens2[2].getProperty("selected"), true, "Last token should be selected");
		assert.strictEqual(await tokens2[1].getProperty("selected"), true, "Second token should be selected");
		assert.strictEqual(await tokens2[0].getProperty("selected"), true, "First token should be selected");
	});

	it ("should navigate through the items with CTRL + arrow up/down keys when the picker is closed", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("focuses the value state header and item on CTRL + arrow down then the value state and the input on CTRL + arrow up", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-error");
		const input = await mcb.shadow$("input");
		const icon = await mcb.shadow$("[input-icon]");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

		await icon.click();
		await mcb.keys(["Control", "ArrowDown"]);

		let valueStateHeader = await browser.execute(staticArea => staticArea.shadowRoot.querySelector(".ui5-responsive-popover-header.ui5-valuestatemessage-root"), staticArea);
		let focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

		assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
		assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should be focused");

		await mcb.keys(["Control", "ArrowDown"]);

		let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
		focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

		assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
		assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
		assert.notEqual(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should not be focused");

		await mcb.keys(["Control", "ArrowUp"]);
		focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

		assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
		assert.equal(await listItem.getProperty("focused"), false, "The first item is no longer focused");
		assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header is focused again");

		await mcb.keys(["Control", "ArrowUp"]);
		focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

		assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
		assert.equal(await listItem.getProperty("focused"), false, "The first item should not be focused");
		assert.equal(focusedElement, null, "The value state header or item should not be focused");
	});

	it ("should select all filtered items on CTRL+A", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should copy a token with CTRL+C and paste it with CTRL+V", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi1");
		const mcb2 = await browser.$("#mcb");
		const input = await mcb2.shadow$("input");
		const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		await tokens[1].click();
		await tokens[1].keys(["Control", "c"]);
		await input.click();
		await input.keys(["Control", "v"]);

		assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
	});

	it ("should not be able to paste tokenwith CTRL+V in read only multi combo box", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should cut a token with CTRL+X and paste it with CTRL+V", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should cut a token with SHIFT+DELETE and paste it with SHIFT+INSERT", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should copy a token with CTRL+INSERT and paste it with SHIFT+INSERT", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

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

	it ("should select a token with CTRL+SPACE", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-error");
		const input = await mcb.shadow$("input");

		await input.click();
		await mcb.keys("ArrowLeft");
		await mcb.keys(["Control", "Space"]);

		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
	});

	it ("CTRL+SPACE should do nothing when pressed in the input field", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");
		const input = await mcb.shadow$("input");

		await input.click();
		await mcb.keys(["Shift", "Space"]);

		assert.strictEqual(await mcb.getProperty("value"), "", "Input field is empty");
	});

	it ("F4 should focus the selected item or the first one if there is no selected", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await mcb.click();
		await mcb.keys("F4");

		const listItem = await popover.$("ui5-list").$("ui5-li");

		assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");

		await mcb.keys("ArrowDown");
		await mcb.keys("Space");
		await mcb.keys("F4");
		await mcb.keys("F4");

		const listItem2 = await popover.$("ui5-list").$$("ui5-li")[1];

		assert.equal(await listItem2.getProperty("focused"), true, "The second item is focused as it is selected");
	});

	it ("Alt + Down should focus the corresponding item to the token from which the combination is pressed", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb-items");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-items");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

		await tokens[2].click();
		await tokens[2].keys(["Alt", "ArrowDown"]);

		let listItem = await popover.$("ui5-list").$$("ui5-li")[3];

		assert.equal(await listItem.getProperty("focused"), true, "The selected item corresponding to the token is focused");
	});

	it ("Alt + Down should focus the first item if no selected items are present", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#multi-acv");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi-acv");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await mcb.click();
		await mcb.keys(["Alt", "ArrowDown"]);

		let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
		assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
	});

	it ("Alt + Down should not filter items", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");
		const input = await mcb.shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys(["a", "b"]);
		await input.keys(["Alt", "ArrowDown"]);

		let listItem = await popover.$("ui5-list").$$("ui5-li")[0];

		assert.equal(await listItem.getProperty("focused"), true, "The items are not filtered and the first item is focused");
	});

	it ("Alt + Down should focus the item corresponding to the text value", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mcb = await browser.$("#mcb");
		const input = await mcb.shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await input.click();
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys(["Alt", "ArrowDown"]);

		let listItem = await popover.$("ui5-list").$$("ui5-li")[1];

		assert.equal(await listItem.getProperty("focused"), true, "The second item should be focused");
	});

	it ("Backspace deletes token and forwards the focus to the last token without collapsing the tokenizer", async () => {
		const mcb = await $("#n-more-many-items");
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
});

describe("MultiComboBox :: ARIA attributes", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
	});

	it ("aria-describedby value according to the tokens count and the value state", async () => {
		const mcb = await browser.$("#mcb-error");
		const innerInput = await mcb.shadow$("input");
		const invisibleText = await mcb.shadow$(".ui5-hidden-text");
		let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
		const tokensCountITextId = `ui5-multi-combobox-hiddenText-nMore`;
		const valuestateITextId = `ui5-multi-combobox-valueStateDesc`;
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

	it ("Should apply aria-label from the accessibleName property", async () => {
		const mcb = await browser.$("#multi1");
		const innerInput = await mcb.shadow$("input");

		await mcb.scrollIntoView();

		assert.strictEqual(await innerInput.getAttribute("aria-label"), "MultiComboBox with predefined values", "aria-label attribute is correct.");
	});

	it ("Should apply aria-label from the accessibleNameRef property", async () => {
		const mcb = await browser.$("#mcb-predefined-value");
		const innerInput = await mcb.shadow$("input");
		const mcbLabel = await browser.$("#mcbLabel");

		await mcb.scrollIntoView();

		assert.strictEqual(await innerInput.getAttribute("aria-label"), await mcbLabel.getHTML(false), "aria-label attribute is correct.");
	});

	it("Value state type should be added to the screen readers default value states announcement", async () => {
		await browser.url(`test/pages/MultiComboBox.html`);

		const mCbWarning = await browser.$("#mcb-warning");
		const mCbSuccess = await browser.$("#mcb-success");
		const mCbError = await browser.$("#mcb-error");

		let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-warning");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		await mCbWarning.click();

		let ariaHiddenText = await mCbWarning.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
		let valueStateText = await popover.$("div").getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Warning issued"), true, "Displayed value state message text is correct");

		await mCbWarning.keys("Escape");
		await mCbError.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await mCbError.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
		valueStateText = await popover.$("div").getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Invalid entry"), true, "Displayed value state message text is correct");

		await mCbError.keys("Escape");
		await mCbSuccess.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-success");
		ariaHiddenText = await mCbSuccess.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
	});

	it("Value state type should be added to the screen readers custom value states announcement", async () => {
		const mCbInformation = await browser.$("#mcb-information");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-information");

		await mCbInformation.click();
		await mCbInformation.keys("a");

		const popoverHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover .ui5-valuestatemessage-header");
		const valueStateText = await popoverHeader.$("div").getHTML(false);
		const ariaHiddenText = await mCbInformation.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

		assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Extra long text used as an information message"), true, "Displayed value state message text is correct");
	});
});
