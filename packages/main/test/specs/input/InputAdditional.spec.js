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

describe("General interaction with suggestions", () => {

	it("handles suggestions", async () => {
		await browser.url(`test/pages/Input.html`);

		let item;
		const suggestionsInput = await browser.$("#myInput").shadow$("input");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput")
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await suggestionsInput.click();
		await suggestionsInput.keys("p");

		assert.ok(await popover.getProperty("opened"), "suggestions are opened.");

		// This test is passing when the test is executed on browser that is NOT headless

		// item = await browser.$("#myInput").$$("ui5-li")[0];


		// await item.click();

		// assert.ok(!await popover.getProperty("opened"), "suggestions are closed");
		// assert.strictEqual(await suggestionsInput.getValue(), "Portugal", "First item has been selected");
		// assert.strictEqual(await inputResult.getValue(), "1", "suggestionItemSelected event called once");

		// await suggestionsInput.keys("\b");
		// item = await browser.$("#myInput").$$("ui5-li")[0];
		// await item.click();

		// assert.strictEqual(await suggestionsInput.getValue(), "Portugal", "First item has been selected again");
		// assert.strictEqual(await inputResult.getValue(), "2", "suggestionItemSelected event called for second time");
	});

	it("handles suggestions selection cancel with ESC", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInputEsc");

		// act
		await suggestionsInput.click();
		await suggestionsInput.keys("c");
		await suggestionsInput.keys("ArrowDown");

		// assert
		assert.strictEqual(await suggestionsInput.getValue(), "Chromium",
			"The value is updated as the item has been previewed.");

		// act
		await suggestionsInput.keys("Escape");

		// assert
		assert.strictEqual(await suggestionsInput.getProperty("value"), "c",
			"The value is restored as ESC has been pressed.");
	});

	it("Input value should correspond to suggestion item when it is clicked", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput").shadow$("input");

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// paste a value completely corresponding to item text
		await suggestionsInput.click();
		await suggestionsInput.setValue("China");

		// select the item
		let firstSuggestion = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		await firstSuggestion.click();

		// without performing focus out delete the last character
		await suggestionsInput.keys("Backspace");

		// select the same item again
		await firstSuggestion.click();

		assert.strictEqual(await suggestionsInput.getValue(), "China", "Input value should correspond to item text.");
	});

	it("input value should be cleared with ESC", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInputEsc").shadow$("input");

		await suggestionsInput.click();
		await suggestionsInput.keys("Some value");

		// Close sugggestions
		await suggestionsInput.keys("Escape");
		// Clear value
		await suggestionsInput.keys("Escape");

		assert.strictEqual(await suggestionsInput.getValue(), "", "The value is restored as ESC has been pressed.");

		await suggestionsInput.keys(["a", "b", "c"]);
		await suggestionsInput.keys("Enter");
		await suggestionsInput.keys(["c", "b", "a"]);

		// Close sugggestions
		await suggestionsInput.keys("Escape");
		// Clear value
		await suggestionsInput.keys("Escape");

		assert.strictEqual(await suggestionsInput.getValue(), "abc", "The value is restored to the last confirmed by 'ENTER' press one.");
	});

	it("handles group suggestion item via keyboard", async () => {

		const suggestionsInput = await browser.$("#myInputGrouping").shadow$("input");
		const inputResult = await browser.$("#inputResultGrouping").shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInputGrouping");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await suggestionsInput.click();
		await suggestionsInput.keys("C");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("Enter");
		await browser.pause(300);

		assert.strictEqual(await suggestionsInput.getValue(), "C", "Group item is not selected");
		assert.strictEqual(await inputResult.getValue(), "", "suggestionItemSelected event is not called");
	});

	it("should select typeaheaded item on mouse click and remove value text selection", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput").shadow$("input");
		const changeEventResult = await browser.$("#inputResult").shadow$("input");
		const suggestionSelectEventResult = await browser.$("#input-selection-event-test").shadow$("input");

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await suggestionsInput.click();
		await suggestionsInput.keys("C");
		await browser.pause(300);

		const firstSuggestion = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");
		await firstSuggestion.click();

		const valueNotSelected = await browser.execute(() =>{
			const input = document.getElementById("myInput").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart === 0;
		});

		assert.strictEqual(await changeEventResult.getValue(), "1", "Change is fired once");
		assert.strictEqual(await suggestionSelectEventResult.getValue(), "1", "suggestion-item-select is fired once");
		assert.strictEqual(await valueNotSelected, true, "Value is no longer type aheaded (autocompleted)");
	});

	it("should select typeaheaded item on mouse click and remove value text selection", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput").shadow$("input");
		const changeEventResult = await browser.$("#inputResult").shadow$("input");
		const suggestionSelectEventResult = await browser.$("#input-selection-event-test").shadow$("input");

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await suggestionsInput.click();
		await suggestionsInput.keys("C");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		const secondSuggestion = await respPopover.$("ui5-list").$$("ui5-li-suggestion-item")[1];
		await secondSuggestion.click();

		const valueNotSelected = await browser.execute(() =>{
			const input = document.getElementById("myInput").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart === 0;
		});

		assert.strictEqual(await suggestionsInput.getValue(), "Cuba", "Item is selected");
		assert.strictEqual(await changeEventResult.getValue(), "1", "Change is fired once");
		assert.strictEqual(await suggestionSelectEventResult.getValue(), "1", "suggestion-item-select is fired once");
		assert.strictEqual(await valueNotSelected, true, "Value is no longer type aheaded (autocompleted)");
	});

	it("should remove input's focus when group header item is clicked", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#myInputGrouping");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInputGrouping");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const groupHeader = await respPopover.$("ui5-list").$("ui5-li-groupHeader");

		await input.click();
		await input.keys("C");
		await groupHeader.click();

		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await input.getProperty("focused"), true, "Input is focused");

	});

	it("checks if the suggestions popover width is minimum the size of the input", async () => {
		const input = await browser.$("#myInputGrouping");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInputGrouping");
		const listItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("ui5-li-suggestion-item");

		await input.click();
		await input.keys("a");

		assert.strictEqual(await input.getSize('width'), await listItem.getSize('width'), "Suggestions' popover width is minimum the size of the input");
	});

	it("checks if suggestions popover width is maximum 40rem if input isn't wider", async () => {
		const input = await browser.$("#long-sugg");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#long-sugg");
		const listItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("ui5-li-suggestion-item");

		await input.click();
		await input.keys("a");

		assert.strictEqual(await listItem.getSize('width'), 640, "Suggestions popover's width is maximum 40rem if the input isn't wider than that");
	});

	describe("XSS tests for suggestions", () => {
		it("add suggestion item with XSS", async () => {
			await browser.url(`test/pages/Input.html`);

			const btn = await $("#xss-btn");
			const span = await $("#xss-result");

			await btn.click();

			assert.strictEqual(await span.getText(), "NO XSS", "No XSS issues found")
		});

		it("tests dangerous items highlighting", async () => {
			await browser.url(`test/pages/Input.html`);

			const input = await $("#xss-input");

			await input.keys("a");

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#xss-input");
			const listItems = await $(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$$("ui5-li-suggestion-item");
			const expected = [
				"",
				"<b></b>",
				"3412test1234",
				"[[[b]]]",
				"&amp;",
			];

			await Promise.all(listItems.map(async (item, index) => {
				assert.strictEqual(await item.getProperty("innerText"), expected[index], "Items text should be escaped");
			}));
		});
	});
});

describe("Lazy loading", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/InputsLazyLoading.html`);
	});

	it("Lazy loading opens the picker once items are populated", async () => {
		const input = await $("#field");
		const inner = await input.shadow$("input");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#field");
		const respPopover = await $(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("a");

		await browser.waitUntil(() => respPopover.getProperty("opened"), {
			timeout: 3000,
			timeoutMsg: "Popover should be displayed"
		});
	});

	it("Does not reopeon picker on focus in", async () => {
		const input = await $("#field");
		const inner = await input.shadow$("input");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#field");
		const respPopover = await $(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("a");

		// go to next focusable
		await browser.keys(["Shift", "Tab"]);

		// go to previous
		await browser.keys("Tab");

		await browser.pause(3000);

		assert.notOk(await respPopover.getProperty("opened"), "Picker should not be open");
	});

	it("Should not close picker when items are updated", async () => {
		const input = await $("#field1");
		const inner = await input.shadow$("input");
		const staticAreaClassName = await browser.getStaticAreaItemClassName("#field1");
		const respPopover = await $(`.${staticAreaClassName}`).shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("S");

		await browser.waitUntil(() => respPopover.getProperty("opened"), {
			timeout: 2000,
			timeoutMsg: "Popover should be displayed"
		});

		await inner.keys("b");

		assert.strictEqual(await respPopover.getProperty("opened"), true, "Picker should not be open");
	});
});
