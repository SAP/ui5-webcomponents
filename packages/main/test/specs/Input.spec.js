const assert = require("assert");

describe("Input general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Input.html");

	it("fires change", () => {
		const input1 = browser.findElementDeep("#input1 >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		// Start typing.
		input1.click();
		input1.keys("abc");

		// Click somewhere else to focus out - should fire change event.
		inputResult.click();

		// Get back and continue typing.
		input1.click();
		input1.keys("def");

		// Click somewhere else to force focus out - should fire change event.
		inputResult.click();

		assert.strictEqual(inputResult.getProperty("value"), "2", "change is called twice");
	});

	it("fires input", () => {
		const input2 = browser.findElementDeep("#input2 >>> input");
		const inputLiveChangeResult = browser.findElementDeep("#inputLiveChangeResult >>> input");

		input2.click();
		input2.setValue("abc");

		assert.strictEqual(inputLiveChangeResult.getProperty("value"), "3", "input is fired 3 times");
	});

	it("fires change when same value typed, but value is mutated via API in between", () => {
		const inputChange = browser.findElementDeep("#inputChange >>> input");
		const inputChangeResult = browser.findElementDeep("#inputChangeResult >>> input");

		inputChange.click();
		inputChange.keys("abc");

		// The submit event listener mutates the value via the API
		// Note: along with the sumbit event - the first change event is fired.
		inputChange.keys("Enter");

		// Type the same value once again.
		inputChange.keys("abc");

		// Clicking on another input to force focus out,
		// which should trigger second change event, although same value is typed in.
		inputChangeResult.click();

		assert.strictEqual(inputChangeResult.getProperty("value"), "2", "change is called twice");
	});

	it("handles suggestions", () => {
		let item;
		const suggestionsInput = browser.findElementDeep("#myInput >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
		const popover = browser.findElementDeep("#myInput >>> ui5-popover >>> .sapMPopover");

		suggestionsInput.click();
		suggestionsInput.keys("p");

		assert.ok(popover.isDisplayedInViewport(), "suggestions are opened.");
		
		item = $("#myInput ui5-li:first-child");
		item.click();

		assert.ok(!popover.isDisplayedInViewport(), "suggestions are closed");
		assert.strictEqual(suggestionsInput.getProperty("value"), "Portugal", "First item has been selected");
		assert.strictEqual(inputResult.getProperty("value"), "1", "suggestionItemSelected event called once");

		suggestionsInput.keys("\b");
		item = $("#myInput ui5-li:first-child");
		item.click();

		assert.strictEqual(suggestionsInput.getProperty("value"), "Portugal", "First item has been selected again");
		assert.strictEqual(inputResult.getProperty("value"), "2", "suggestionItemSelected event called for second time");
	});

	it("handles suggestions via keyboard", () => {
		const suggestionsInput = browser.findElementDeep("#myInput2 >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		suggestionsInput.click();
		suggestionsInput.keys("c");
		suggestionsInput.keys("ArrowDown");
		suggestionsInput.keys("Enter");

		assert.strictEqual(suggestionsInput.getProperty("value"), "Cozy", "First item has been selected");
		assert.strictEqual(inputResult.getProperty("value"), "3", "suggestionItemSelected event called once");

		suggestionsInput.keys("\b");
		suggestionsInput.keys("ArrowUp");
		suggestionsInput.keys("Space");

		assert.strictEqual(suggestionsInput.getProperty("value"), "Condensed", "First item has been selected");
		assert.strictEqual(inputResult.getProperty("value"), "4", "suggestionItemSelected event called once");
	});

	/*
	it("sets empty value to an input", () => {
		const input1 = browser.findElementDeep("#input1");
		const innerInput = browser.findElementDeep("#input1 >>> input");

		input1.setProperty("value", "");

		assert.strictEqual(input1.getProperty("value"), "", "Property value should be empty");
		assert.strictEqual(innerInput.getProperty("value"), "", "Inner's property value should be empty");
	});
	*/
});
