import { assert } from "chai";

describe("Input HOME navigation", () => {
	it("Should move caret to beginning of input with HOME if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		await suggestionsInput.keys("Home");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		const caretPosition = await browser.execute(() =>{
			return document.getElementById("myInput2").getCaretPosition();
		});

		assert.strictEqual(caretPosition, 0, "Caret has been moved to beginning of Input");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
	});

	it("Should focus the first item from the suggestions popover with HOME", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");

		assert.strictEqual(await suggestionsInput.getValue(), "Cozy", "First item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "First list item is focused");
	});

	it("Should focus the value state header from the suggestions popover with HOME", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#inputError");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputError");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const valueStateHeader = await respPopover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		const groupHeader = await respPopover.$("ui5-list").$("ui5-li-groupHeader");

		assert.strictEqual(await suggestionsInput.getValue(), "a", "Input's value should be the typed-in value");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await suggestionsInput.getProperty("_isValueStateFocused"), true, "Value State should not be focused");
		assert.notEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is focused");
	});

	it("Should focus the group header from the suggestions popover with HOME", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		const groupHeader = await respPopover.$("ui5-list").$("ui5-li-groupHeader");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), true, "Group header is focused");

	});
});

describe("Input END navigation", () => {
	it("Should move caret to end of input with END if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		await suggestionsInput.keys("ArrowLeft");
		await suggestionsInput.keys("End");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		const caretPosition = await browser.execute(() =>{
			return document.getElementById("myInput2").getCaretPosition();
		});

		assert.strictEqual(caretPosition, 4, "Caret has been moved to end of Input");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
	});

	it("Should focus the last item from the suggestions popover with END", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#inputCompact");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#inputCompact");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		// Moving focus to suggestions popover, because by design END only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("End");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item:last-child");

		assert.strictEqual(await suggestionsInput.getValue(), "Chili", "Last item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "Last list item is focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	it("PAGEUP and PAGEDOWN should do nothing if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		let caretPosition = await browser.execute(() =>{
			return document.getElementById("myInput2").getCaretPosition();
		});

		assert.strictEqual(caretPosition, 4, "Caret is at end of Input");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "Responsive popover is open and first list item is not focused");

		await suggestionsInput.keys("PageUp");

		caretPosition = await browser.execute(() =>{
			return document.getElementById("myInput2").getCaretPosition();
		});

		assert.strictEqual(caretPosition, 4, "Caret is still at end of Input");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "Responsive popover remains open and first list item is not focused");

		await suggestionsInput.keys("PageDown");

		caretPosition = await browser.execute(() =>{
			return document.getElementById("myInput2").getCaretPosition();
		});

		assert.strictEqual(caretPosition, 4, "Caret is still at end of Input");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "Responsive popover remains open and first list item is not focused");

	});
	
	it("Should focus the tenth item from the suggestions popover with PAGEDOWN", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design PAGEDOWN does nothing if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("PageDown");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const tenthListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item:nth-child(11)");

		assert.strictEqual(await suggestionsInput.getValue(), "Azerbaijan", "Tenth item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await tenthListItem.getProperty("focused"), true, "Tenth list item is focused");
	});

	it("Should focus the -10 item/group header from the suggestions popover with PAGEUP", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput");
		await suggestionsInput.scrollIntoView();

		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design PAGEUP does nothing if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("PageDown");
		await suggestionsInput.keys("PageUp");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const groupHeader = await respPopover.$("ui5-list").$("ui5-li-groupheader");

		assert.strictEqual(await suggestionsInput.getValue(), "a", "No item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), true, "Group header is focused");
	});
});

describe("Input arrow navigation", () => {

	it("handles suggestions via keyboard, should not fire suggestionItemSelect on inactive item", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2").shadow$("input");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("Enter");

		assert.strictEqual(await suggestionsInput.getValue(), "Cozy", "First item has been selected");
		assert.strictEqual(await inputResult.getValue(), "1", "suggestionItemSelected event called once");

		await suggestionsInput.keys("Backspace"); // to open the suggestions pop up once again
		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await suggestionsInput.getValue(), "Coz",
			"The input is still focused");

		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("Enter");

		assert.strictEqual(await suggestionsInput.getValue(), "Coz", "Inactive item text is not applied as input's value");
		assert.strictEqual(await inputResult.getValue(), "1", "suggestionItemSelect is not fired as item is 'Inactive'");
	});

	it("Should navigate up and down through the suggestions popover with arrow keys", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");
		await suggestionsInput.keys("ArrowDown");

		const respPopover = await browser.$(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");

		assert.strictEqual(await suggestionsInput.getValue(), "Cozy", "First item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "First list item is focused");

		await suggestionsInput.keys("ArrowDown");
		const secondListItem = await respPopover.$("ui5-list").$$("ui5-li-suggestion-item")[1];

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await secondListItem.getProperty("focused"), true, "Second list item is focused");

		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await firstListItem.getProperty("focused"), true, "First list item is focused");
		assert.strictEqual(await secondListItem.getProperty("focused"), false, "Second list item is not focused");

		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
	});

	it("Value state header and group headers should be included in the arrow navigation", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#inputError");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputError");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");
		await suggestionsInput.keys("ArrowDown");

		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const valueStateHeader = await respPopover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		const groupHeader = await respPopover.$("ui5-list").$("ui5-li-groupHeader");

		assert.strictEqual(await suggestionsInput.getValue(), "a", "Input's value should be the typed-in value");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await suggestionsInput.getProperty("_isValueStateFocused"), true, "Value State should not be focused");
		assert.notEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is focused");

		await suggestionsInput.keys("ArrowDown");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), true, "Group header is focused");
		assert.strictEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is not focused");

		await suggestionsInput.keys("ArrowDown");

		assert.strictEqual(await suggestionsInput.getValue(), "Afghanistan", "Input's value should be the text of the selected item");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "First list item is focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is no longer focused");
		assert.strictEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is not focused");

		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), true, "Group header is focused");
		assert.strictEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is not focused");


		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await suggestionsInput.getProperty("_isValueStateFocused"), true, "Value State should not be focused");
		assert.notEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is focused");

		await suggestionsInput.keys("ArrowUp");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), true, "Input is focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await valueStateHeader.getAttribute("focused"), null, "Value state header is not focused");
	});
});
