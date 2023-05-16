import { assert } from "chai";

describe("Input change event", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
	});

	it("fires change", async () => {
		const input1 = await browser.$("#input1").shadow$("input");
		const inputResult = await browser.$("#inputResult").shadow$("input");

		// Start typing.
		await input1.click();
		await input1.keys("a");
		await input1.keys("b");
		await input1.keys("c");

		// Click somewhere else to focus out - should fire change event.
		await inputResult.click();

		// Get back and continue typing.
		await input1.click();
		await input1.keys("d");
		await input1.keys("e");
		await input1.keys("f");

		// Click somewhere else to force focus out - should fire change event.
		await inputResult.click();

		assert.strictEqual(await inputResult.getValue(), "2", "change is called twice");
	});

	it("fires change on tab", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#inputChange-Suggestions").shadow$("input");
		const inputResult = await browser.$("#inputChangeResult").shadow$("input");

		await input.click();
		await input.keys("c");
		await input.keys("ArrowDown");
		await input.keys("Tab");

		assert.strictEqual(await inputResult.getValue(), "1", "change is called twice");
	});

	it("fires change only once when there was already a value on focus in", async () => {
		const input = await browser.$("#inputChange-Suggestions").shadow$("input");
		const inputResult = await browser.$("#inputChangeResult").shadow$("input");
		await browser.keys(["Shift", "Tab"]);
		await input.keys("Backspace");

		await input.keys("ArrowDown");
		await input.keys("ArrowDown");


		await input.keys("Tab");

		assert.strictEqual(await inputResult.getValue(), "2", "change is called once");
	});

	it("fires input", async () => {
		await browser.url(`test/pages/Input.html`);

		const input2 = await browser.$("#input2").shadow$("input");
		const inputLiveChangeResult = await browser.$("#inputLiveChangeResult").shadow$("input");

		await input2.click();
		await input2.keys("a");
		await input2.keys("b");
		await input2.keys("c");

		assert.strictEqual(await inputLiveChangeResult.getValue(), "3", "input is fired 3 times");
	});

	it("fires change when same value typed, but value is mutated via API in between", async () => {
		const inputChange = await browser.$("#inputChange").shadow$("input");
		const inputChangeResult = await browser.$("#inputChangeResult").shadow$("input");

		await inputChange.click();
		await inputChange.keys("a");
		await inputChange.keys("b");
		await inputChange.keys("c");

		// The submit event listener mutates the value via the API
		// Note: along with the sumbit event - the first change event is fired.
		await inputChange.keys("Enter");

		// Type the same value once again.
		await inputChange.keys("a");
		await inputChange.keys("b");
		await inputChange.keys("c");

		// Clicking on another input to force focus out,
		// which should trigger second change event, although same value is typed in.
		await inputChangeResult.click();

		assert.strictEqual(await inputChangeResult.getValue(), "2", "change is called twice");
	});

	it("Change event behaviour when focusing", async () => {
		await browser.url(`test/pages/Input.html`);

		// Setup
		const input = await browser.$("#myInput").shadow$("input");
		const focusoutInput = await browser.$("#myInput2").shadow$("input");
		const changeCount = await browser.$("#myInput-change-count");

		// Act
		await input.click();
		await input.keys("z");
		await focusoutInput.click();

		// // Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is called");

		// Act
		await input.click();
		await focusoutInput.click();

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is not called again");

		// Act
		await input.click();
		await input.keys("f");
		await browser.pause(1000); // GH Actions
		await focusoutInput.click();

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "2", "The change event is called for the changed value");
	});

	it("Change event behaviour when focusing + ENTER", async () => {
		await browser.url(`test/pages/Input.html`);

		// Setup
		const input = await browser.$("#myInput").shadow$("input");
		const focusoutInput = await browser.$("#input3").shadow$("input");
		const changeCount = await browser.$("#myInput-change-count");

		// Act
		await input.click();
		await input.keys("a");
		await input.keys("Enter");
		await focusoutInput.click();

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is called just once");

		// Act
		await input.click();
		await input.keys("Enter");

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is not called again");

		// Act
		await input.click();
		await input.keys("f");
		await input.keys("Enter");

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "2", "The change event is called for the changed value");
	});

	it("fires suggestion-scroll event", async () => {
		const input = await browser.$("#scrollInput").shadow$("input");
		const scrollResult = await browser.$("#scrollResult");

		// act - open suggestions
		await input.click();
		await input.keys("a");

		// act - scroll with keyboard
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");

		// assert
		const scrollTop = parseInt(await scrollResult.getProperty("value"));
		assert.isAbove(scrollTop, 0, "The suggestion-scroll event fired");

		// assert isSuggestionsScrollable
		const suggestionsScrollable = await browser.executeAsync(async done => {
			const input = document.getElementById("scrollInput");
			done(await input.isSuggestionsScrollable());
		});
		assert.ok(suggestionsScrollable,  "The suggestions popup is scrollable");

		// close suggestions
		await input.keys("Enter");
	});

	it("tests value removal when Input type is 'Number'", async () => {
		const input = await browser.$("#input-number3");
		const btn = await browser.$("#input-number3-focusout");

		// Press Backspace and focus out the
		await input.click();
		await input.keys("Backspace");
		await btn.click();

		assert.strictEqual(await input.getProperty("value"), "", "Input's value is removed");
	});

	it("tests removing fractional part of numeric value", async () => {
		const input1 = await browser.$("#input-number31");
		const input2 = await browser.$("#input-number32");
		const input3 = await browser.$("#input-number33");
		const input4 = await browser.$("#input-number34");
		const btn = await browser.$("#input-number3-focusout");

		// Press Backspace as many times as the number of digits after the delimiter
		// 4,333
		await input1.click();
		await input1.keys("Backspace");
		await input1.keys("Backspace");
		await input1.keys("Backspace");
		await btn.click();

		assert.strictEqual(await input1.getProperty("value"), "4", "Removed properly");

		// 4,3
		await input2.click();
		await input2.keys("Backspace");
		await btn.click();

		assert.strictEqual(await input2.getProperty("value"), "4", "Removed properly");

		// ,33
		await input3.click();
		await input3.keys("Backspace");
		await input3.keys("Backspace");
		await btn.click();

		assert.strictEqual(await input3.getProperty("value"), "", "Removed properly");

		// -1,33
		await input4.click();
		await input4.keys("Backspace");
		await input4.keys("Backspace");
		await btn.click();

		assert.strictEqual(await input4.getProperty("value"), "-1", "Removed properly");
	});

	it("tests removing fractional part of numeric value with 'e' notation and minus signs", async () => {
		const input = await browser.$("#input-number35");
		const inputResult = await browser.$("#input-number35_eventValue");

		await input.click();



		// -1.33e-2
		// Press Backspace to remove the "2" character
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "", "Value is empty string");

		// -1.33e-
		// Press Backspace to remove the "-" character
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "", "Value is empty string");

		// -1.33e
		// Press Backspace to remove the "e" character
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "-1.33", "Value is -1.33");

		// -1.33
		// Press Backspace to remove the number "3"
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "-1.3", "Value is -1.3");

		// -1.3
		// Press Backspace to remove the number "3"
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "-1", "Value is -1");

		// -1.
		// Press Backspace to remove the "." character
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "-1", "Value is -1");

		// -1
		// Press Backspace to remove the number "1"
		await input.keys("Backspace");
		assert.strictEqual(await inputResult.getProperty("value"), "", "Value is empty string");

		// -
		// Press 2 to add the number "2"
		await input.keys("2");
		assert.strictEqual(await inputResult.getProperty("value"), "-2", "Value is -2");
	});

});
