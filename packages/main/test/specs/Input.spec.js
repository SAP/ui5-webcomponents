const assert = require("assert");

describe("Input general interaction", () => {
	browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/Input.html");

	it("fires change", () => {
		const input1 = browser.findElementDeep("#input1 >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		input1.click();
		input1.setValue("abc");
		inputResult.click();

		input1.click();
		input1.setValue("def");
		inputResult.click();

		assert.strictEqual(inputResult.getProperty("value"), "2", "change is called twice");
	});

	it("fires liveChange", () => {
		const input2 = browser.findElementDeep("#input2 >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");

		input2.click();
		input2.keys("abc");

		assert.strictEqual(inputResult.getProperty("value"), "3", "liveChange is fired 3 times");
	});

	it("handles suggestions", () => {
		let item;
		const suggestionsInput = browser.findElementDeep("#myInput >>> input");
		const inputResult = browser.findElementDeep("#inputResult >>> input");
		const popover = browser.findElementDeep("#myInput >>> ui5-popover >>> .sapMPopover");

		suggestionsInput.click();
		suggestionsInput.keys("p");

		assert.ok(popover.isDisplayedInViewport(), "suggestions are opened.");
		
		item = $("#myInput ui5-li[slot=suggestionItems-1]");
		item.click();

		assert.ok(!popover.isDisplayedInViewport(), "suggestions are closed");
		assert.strictEqual(suggestionsInput.getProperty("value"), "Portugal", "First item has been selected");
		assert.strictEqual(inputResult.getProperty("value"), "1", "suggestionItemSelected event called once");

		suggestionsInput.keys("\b");
		item = $("#myInput ui5-li[slot=suggestionItems-1]");
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
});