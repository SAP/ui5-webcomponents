import { assert } from "chai";

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
