import { assert } from "chai";

describe("Attributes propagation", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
	});

	it("Should change the placeholder of the inner input", async () => {
		const input = await browser.$("#myInput");
		const sExpected = "New placeholder text";

		await input.setAttribute("placeholder", "New placeholder text");

		assert.strictEqual(await input.shadow$("input").getProperty("placeholder"), sExpected, "The placeholder was set correctly");
	});

	it("Disabled attribute is propagated properly", async () => {
		assert.ok(await browser.$("#input-disabled").shadow$(".ui5-input-inner").getAttribute("disabled"), "Disabled property was propagated");
	});

	it("Redonly attribute is propagated properly", async () => {
		assert.ok(await browser.$("#input-readonly").shadow$(".ui5-input-inner").getAttribute("readonly"), "Readonly property was propagated");
	});

	it("Required attribute is propagated properly", async () => {
		assert.strictEqual(await browser.$("#input-required").shadow$(".ui5-input-inner").getAttribute("aria-required"), "true", "Aria-required attribute is set correctly");
		assert.strictEqual(await browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("aria-required"), "false", "Aria-required attribute is set correctly");
	});

	it("Type attribute is propagated properly", async () => {
		const sExpectedType = "number";
		assert.strictEqual(await browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("type"), sExpectedType, "Type property was propagated");
		assert.strictEqual(await browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("step"), "any", "The step attr is set");
	});

	it("Value attribute is propagated properly", async () => {
		const sExpectedValue = "Test test";

		await browser.$("#input3").setProperty("value", "Test test");

		assert.strictEqual(await browser.$("#input3").shadow$(".ui5-input-inner").getValue(), sExpectedValue, "Value property was set correctly");
	});

	it("sets empty value to an input", async () => {
		const input1 = await browser.$("#input1");
		const innerInput = await browser.$("#input1").shadow$("input");

		await input1.setProperty("value", "");

		assert.strictEqual(await input1.getValue(), "", "Property value should be empty");
		assert.strictEqual(await innerInput.getValue(), "", "Inner's property value should be empty");

		await input1.setProperty("value", "new value");
		await browser.executeAsync(done => {
			document.getElementById("input1").value = null;
			done();
		});

		assert.strictEqual(await input1.getAttribute("value"), null, "Property value should be null");
		assert.strictEqual(await innerInput.getAttribute("value"), null, "Value attribute should be null");
	});
});

describe("Input general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
	});

	it("Should not open suggestions popover when focused", async () => {
		const input = await browser.$("#myInput");
		const popover = await input.shadow$("ui5-responsive-popover");

		// focus the input field which will display the suggestions
		await input.click();

		assert.ok(!(await popover.isDisplayedInViewport()), "The popover is not visible");
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

	it("fires select event", async () => {
		const inputInner = await browser.$("#selectInput").shadow$("input");
		const selectResult = await browser.$("#select-event-counter");

		await inputInner.doubleClick();

		assert.strictEqual(await selectResult.getText(), "1", "select is called");
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
		const focusoutInput = await browser.$("#inputCompact").shadow$("input");
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

	it("Input event is fired when user uses arrow keys to increase/decrease numeric value", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#input-number3");
		await input.scrollIntoView();
		await input.click();

		await input.keys("ArrowUp");
		await input.keys("ArrowDown");

		const inputChangeCount = await browser.$("#input-number3-change-count");

		assert.strictEqual( await inputChangeCount.getProperty("value"), "2", "Input event is fired when navigating with arrow keys");
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

	it("handles suggestions", async () => {
		await browser.url(`test/pages/Input.html`);

		let item;
		const suggestionsInput = await browser.$("#myInput").shadow$("input");
		const inputResult = await browser.$("#inputResult").shadow$("input");
		const input = await browser.$("#myInput");
		const popover = await input.shadow$("ui5-responsive-popover");

		await suggestionsInput.click();
		await suggestionsInput.keys("p");

		assert.ok(await popover.getProperty("open"), "suggestions are opened.");

		// This test is passing when the test is executed on browser that is NOT headless

		// item = await browser.$("#myInput").$$("ui5-li")[0];


		// await item.click();

		// assert.ok(!await popover.getProperty("open"), "suggestions are closed");
		// assert.strictEqual(await suggestionsInput.getValue(), "Portugal", "First item has been selected");

		// await suggestionsInput.keys("\b");
		// item = await browser.$("#myInput").$$("ui5-li")[0];
		// await item.click();

		// assert.strictEqual(await suggestionsInput.getValue(), "Portugal", "First item has been selected again");
	});

	it("Input value should correspond to suggestion item when it is clicked", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput").shadow$("input");

		const input = await browser.$("#myInput");
		const respPopover = await input.shadow$("ui5-responsive-popover");

		// paste a value completely corresponding to item text
		await suggestionsInput.click();
		await suggestionsInput.setValue("China");

		// select the item
		let firstSuggestion = await input.$("ui5-suggestion-item");
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

	it("should select typeaheaded item on mouse click and remove value text selection", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#myInput");
		const suggestionsInput = input.shadow$("input");
		const changeEventResult = await browser.$("#inputResult").shadow$("input");

		await suggestionsInput.click();
		await suggestionsInput.keys("C");
		await browser.pause(300);

		const firstSuggestion = await input.$("ui5-suggestion-item");
		await firstSuggestion.click();

		const valueNotSelected = await browser.execute(() =>{
			const input = document.getElementById("myInput").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart === 0;
		});

		assert.strictEqual(await changeEventResult.getValue(), "1", "Change is fired once");
		assert.strictEqual(await valueNotSelected, true, "Value is no longer type aheaded (autocompleted)");
	});

	it("should select typeaheaded item on mouse click and remove value text selection", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await browser.$("#myInput");
		const suggestionsInput = input.shadow$("input");
		const changeEventResult = await browser.$("#inputResult").shadow$("input");

		await suggestionsInput.click();
		await suggestionsInput.keys("C");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		const secondSuggestion = await input.$("ui5-suggestion-item:nth-of-type(2)");
		await secondSuggestion.click();

		const valueNotSelected = await browser.execute(() =>{
			const input = document.getElementById("myInput").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart === 0;
		});

		assert.strictEqual(await suggestionsInput.getValue(), "Cuba", "Item is selected");
		assert.strictEqual(await changeEventResult.getValue(), "1", "Change is fired once");
		assert.strictEqual(await valueNotSelected, true, "Value is no longer type aheaded (autocompleted)");
	});

	it("should remove input's focus when group header item is clicked", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#myInputGrouping");

		await input.click();
		await input.keys("C");

		const groupHeader = await input.$("ui5-suggestion-item-group").shadow$("[ui5-li-group-header]");

		await groupHeader.click();

		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await input.getProperty("focused"), true, "Input is focused");
	});

	it("checks if the suggestions popover width is minimum the size of the input", async () => {
		const input = await browser.$("#myInputGrouping");
		const listItem = await input.$("ui5-suggestion-item");

		await input.click();
		await input.keys("a");

		assert.strictEqual(await input.getSize('width'), await listItem.getSize('width'), "Suggestions' popover width is minimum the size of the input");
	});

	it("checks if suggestions popover width is maximum 40rem if input isn't wider", async () => {
		const input = await $("#long-sugg");
		const listItem = await input.$("ui5-suggestion-item");

		await input.click();
		await input.keys("a");

		assert.strictEqual(await listItem.getSize('width'), 640, "Suggestions popover's width is maximum 40rem if the input isn't wider than that");
	});

	it("Input's maxlength property is set correctly", async () => {
		const input5 = await browser.$("#input-tel");
		const inputShadowRef = await browser.$("#input-tel").shadow$("input");

		await inputShadowRef.click();

		for (let i = 0; i <15 ; i++) {
			await inputShadowRef.keys("c");
		}

		assert.strictEqual((await inputShadowRef.getProperty("value")).length, 10, "Input's value should not exceed 10 characters.");
		assert.ok(await input5.getProperty("maxlength"), "Input's maxlength property should be applied.");
		assert.strictEqual(await inputShadowRef.getAttribute("maxlength"), "10", "Input's maxlength attribute should be applied.");
	});

	it("Checks if valueStateMessage is shown", async () => {
		const inputShadowRef = await browser.$("#inputError").shadow$("input");
		const input = await browser.$("#inputError");
		const popover = await input.shadow$("ui5-popover");
		const respPopover = await input.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-header");

		await inputShadowRef.click();

		assert.ok(await popover.getProperty("open"), "Popover with valueStateMessage should be opened.");

		await inputShadowRef.keys("a");

		assert.ok(respPopover, "Responsive popover with valueStateMessage should be opened.");
	});

	it("Checks if aria-describedby is renderd if not neccessary", async () => {
		const input = await browser.$("#input-max-length"); // Input with no show-suggestions attribute
		const innerInput = await input.shadow$("input");

		assert.notOk(await innerInput.getAttribute("aria-describedby"), "aria-describedby is not rendered");
	});

	it("Checks if aria-label is reflected in the shadow DOM", async () => {
		const input = await browser.$("#aria-label-input");
		const innerInput = await input.shadow$("input");
		const NEW_TEXT = "New cool text";

		assert.strictEqual(await input.getAttribute("accessible-name"), await innerInput.getAttribute("aria-label"), "aria-label is reflected in the shadow DOM")

		await input.setAttribute("accessible-name", NEW_TEXT);

		assert.strictEqual(await innerInput.getAttribute("aria-label"), NEW_TEXT, "aria-label is reflected in the shadow DOM")
	});

	it("Checks if aria-invalid is set correctly", async () => {
		const inputError = await browser.$("#inputError");
		const inputWarning = await browser.$("#input1");
		const innerInputError = await inputError.shadow$("input");
		const innerInputWarning = await inputWarning.shadow$("input");

		assert.notOk(await innerInputWarning.getAttribute("aria-invalid"), "aria-invalid is not rendered");
		assert.strictEqual(await innerInputError.getAttribute("aria-invalid"), "true", "aria-invalid is set to true");
	});

	it("Should render aria-haspopup attribute with value 'dialog'", async () => {
		const input = await browser.$("#myInput");
		const innerInput = await input.shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-haspopup"), "dialog", "Should render aria-haspopup attribute with value 'dialog'");
	});

	it("Value state type should be added to the screen readers default value states announcement", async () => {
		const inputError = await browser.$("#vs-error-default");
		const inputWarning = await browser.$("#vs-warning-default");
		const inputSuccess = await browser.$("#vs-success-default");
		const inputInformation = await browser.$("#vs-information-default");

		let popover = await inputError.shadow$("ui5-popover");

		await inputError.click();

		let ariaHiddenText = await inputError.shadow$(".ui5-hidden-text").getText();
		let valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Error Invalid entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Invalid entry", "Displayed value state message text is correct");

		await inputWarning.click();

		popover = await inputWarning.shadow$("ui5-popover");

		ariaHiddenText = await inputWarning.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Warning Warning issued", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Warning issued", "Displayed value state message text is correct");

		await inputInformation.click();

		popover = await inputInformation.shadow$("ui5-popover");

		ariaHiddenText = await inputInformation.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Information Informative entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Informative entry", "Displayed value state message text is correct");

		await inputSuccess.click();
		assert.strictEqual(await inputSuccess.shadow$(".ui5-hidden-text").getText(), "Value State Success", "Hidden screen reader text is correct");
	});

	it("Value state type should be added to the screen readers custom value states announcement", async () => {
		const inputError = await browser.$("#inputError");

		inputError.click();
		inputError.keys("a");

		const ariaHiddenText = await inputError.shadow$(`#valueStateDesc`).getText();

		assert.strictEqual(ariaHiddenText.includes("Value State Error"), true, "Hidden screen reader text is correct");
	});

	it("Tests autocomplete(type-ahead)", async () => {
		let hasSelection;

		const input = await browser.$("#myInputHighlighted").shadow$("input");
		const EXPTECTED_VALUE = "Adam D";

		await input.click();
		await input.keys("a");

		hasSelection = await browser.execute(() =>{
			const input = document.getElementById("myInputHighlighted").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart > 0;
		});


		assert.strictEqual(await input.getProperty("value"), EXPTECTED_VALUE, "Value is autocompleted");
		assert.strictEqual(hasSelection, true, "Autocompleted text is selected");
	});

	it("Tests autocomplete(type-ahead) of custom suggestions", async () => {
		let hasSelection;

		const input = await $("#input-custom-flat").shadow$("input");
		const EXPTECTED_VALUE = "Albania";

		await input.click();
		await input.keys("a");

		hasSelection = await browser.execute(() => {
			const input = document.getElementById("input-custom-flat").shadowRoot.querySelector("input");
			return input.selectionEnd - input.selectionStart > 0;
		});

		assert.strictEqual(await input.getProperty("value"), EXPTECTED_VALUE, "Value is autocompleted");
		assert.ok(hasSelection, "Autocompleted text is selected");
	});

	it("Tests disabled autocomplete(type-ahead)", async () => {
		const input = await browser.$("#input-disabled-autocomplete").shadow$("input");

		await input.click();
		await input.keys("c");

		assert.strictEqual(await input.getProperty("value"), "c", "Value is not autocompleted");
	});

	it("Doesn't remove value on number type input even if locale specific delimiter/multiple delimiters", async () => {
		const input = await browser.$("#input-number2");

		await input.click();
		await input.keys("1");
		await input.keys(".");
		await input.keys("2");
		await input.keys("2");
		await input.keys(".");
		await input.keys("3");
		await input.keys("3");
		await input.keys("Tab");

		assert.strictEqual(parseFloat(await input.getProperty("value")).toPrecision(3), "1.22", "Value is not lost");
	});

	it("fires selection-change", async () => {
		await browser.url(`test/pages/Input_quickview.html`);

		const inputItemPreview = await browser.$("#inputPreview2").shadow$("input");
		const selectionChangeRes = await browser.$("#selectionChangeRes");
		const EXPECTED_PREVIEW_ITEM_TEXT = "Laptop Lenovo";

		// act
		await inputItemPreview.click();
		await inputItemPreview.keys("c");

		await inputItemPreview.keys("ArrowDown");

		// assert
		const inputElement = await browser.$("#inputPreview2")
		const inputPopover = await inputElement.shadow$("ui5-responsive-popover");
		const helpPopover = await browser.$("#quickViewCard2");

		assert.strictEqual(await selectionChangeRes.getValue(), EXPECTED_PREVIEW_ITEM_TEXT, "First item has been previewed");
		assert.ok(await helpPopover.isDisplayedInViewport(), "The help popover is open.");
		assert.ok(await inputPopover.isDisplayedInViewport(), "The input popover is open.");

		// act
		const inputInHelpPopover = await browser.$("#searchInput2").shadow$("input");
		await inputInHelpPopover.click();

		// assert
		assert.notOk(await inputPopover.isDisplayedInViewport(), "The inpuit popover is closed as it lost the focus.");
		assert.ok(await helpPopover.isDisplayedInViewport(), "The help popover remains open as the focus is within.");
	});

	it("fires open event when suggestions picker is opened on typing", async () => {
		await browser.url(`test/pages/Input.html`);
		const input = await browser.$("#myInput");
		await input.click();
		await input.keys("a");

		const popover = await input.shadow$("ui5-responsive-popover");

		assert.ok(await popover.isDisplayedInViewport(), "The popover is visible");
		assert.strictEqual( await $("#myInput-open-picker").getHTML(false), "Open", "The open event is fired");
	});

	it("fires close event when suggestions picker is closed", async () => {
		await browser.url(`test/pages/Input.html`);
		const input = await browser.$("#myInput");
		await input.click();
		await input.keys("a");

		const popover = await input.shadow$("ui5-responsive-popover");
		const listItem = await input.$("ui5-suggestion-item-group ui5-suggestion-item");
		await listItem.click();

		assert.notOk(await popover.isDisplayedInViewport(), "The popover is not visible");
		assert.strictEqual( await $("#myInput-open-picker").getHTML(false), "Close", "The close event is fired");
	});

	it("Should open suggestions popover when ui5-input is the first focusable element within a dialog", async () => {
		await browser.url(`test/pages/Input.html`);
		const input = await browser.$("#inputInDialog");
		const button = await browser.$("#btnOpenDialog");

		//act
		await button.click();

		const popover = await input.shadow$("ui5-responsive-popover");
		const dialog = await browser.$("#inputInDialog");

		await input.keys("c");

		//assert
		assert.ok(await popover.isDisplayedInViewport(), "The popover is visible");

		// act
		await input.keys("ArrowDown");
		await browser.keys("Escape");

		// assert
		assert.notOk(await popover.isDisplayedInViewport(), "The popover is not visible");
		assert.ok(await dialog.isDisplayedInViewport(), "The dialog is opened.");
	});

	it("Suggestions count should be read out when necessary", async () => {
		await browser.url(`test/pages/Input.html`);

		const inputDynamicSuggestions = await $("#inputCompact");
		const inputSuggestions = await $("#myInput2");
		const dynamicSuggestionsInnerInput = await inputDynamicSuggestions.shadow$("input");
		const dynamicSuggestionsCount = await inputDynamicSuggestions.shadow$(`#suggestionsCount`);
		const suggestionsCount = await inputSuggestions.shadow$(`#suggestionsCount`);

		//act
		await inputDynamicSuggestions.click();

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "", "Suggestions count is not available");

		//act
		await dynamicSuggestionsInnerInput.keys("c");

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "3 results are available", "Group items should be excluded of the count of available results.");
		await dynamicSuggestionsInnerInput.keys("Backspace");

		// Close suggestions to not intercept the click in the input below for the last test
		await dynamicSuggestionsInnerInput.keys("Escape");

		//act
		await inputSuggestions.click();
		await (await inputSuggestions.shadow$("input")).keys("c");

		//assert
		assert.strictEqual(await suggestionsCount.getText(), "5 results are available", "Suggestions count is available since the suggestions popover is opened");
	});

	it("Should close the Popover when no suggestions are available", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#myInput");
		const innerInput = await input.shadow$("input");

		await innerInput.keys("A");
		await innerInput.keys("Space");

		assert.notOk(await input.getProperty("open"), "Input's Suggestion Popover should not be open");
	});

	it("Should not open value state message when input is in readonly state", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#readonly-value-state-input");
		const popover = await input.shadow$("ui5-popover");

		await input.click();

		assert.notOk(await popover.getProperty("open"), "Popover with valueStateMessage should not be opened.");
	});

	it("Displays clear icon when typing and pressing it clears the value", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#clear-input");
		const innerInput = await input.shadow$("input");
		const changeCounter = await $("#clear-input-change-event-count");
		const inputCounter = await $("#clear-input-input-event-count");

		assert.notOk(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should not be shown");

		// type
		await innerInput.click();
		await innerInput.keys("a");

		assert.ok(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should be shown");
		assert.strictEqual(await changeCounter.getText(), "0", "Change event not called yet");
		assert.strictEqual(await inputCounter.getText(), "1", "Input event called when typing");

		const clearIcon = await input.shadow$(".ui5-input-clear-icon-wrapper");

		// press clear icon
		await clearIcon.click();

		assert.strictEqual(await input.getProperty("value"), "", "Clear icon clear the value");
		assert.notOk(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should not be shown");
		assert.strictEqual(await changeCounter.getText(), "0", "Change event should not be called on clearIcon click");
		assert.strictEqual(await inputCounter.getText(), "2", "Input event called when typing or clear action is done");
	});

	it("Change event is called when value of input is cleared with clear icon and input is focused out", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#clear-input");
		const innerInput = await input.shadow$("input");
		const changeCounter = await $("#clear-input-change-event-count");
		const inputCounter = await $("#clear-input-input-event-count");

		// type
		await innerInput.click();
		await innerInput.keys("a");
		await changeCounter.click();

		const clearIcon = await input.shadow$(".ui5-input-clear-icon-wrapper");

		// press clear icon
		await clearIcon.click();

		assert.strictEqual(await changeCounter.getText(), "1", "Change event called once (typing)");
		assert.strictEqual(await inputCounter.getText(), "2", "Input event called when value is cleared by clear icon");
	});

	it("Change event calling after clear icon is pressed", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#clear-input");
		const innerInput = await input.shadow$("input");
		const changeCounter = await $("#clear-input-change-event-count");
		const inputCounter = await $("#clear-input-input-event-count");

		// type
		await innerInput.click();
		await innerInput.keys("a");
		await changeCounter.click();

		const clearIcon = await input.shadow$(".ui5-input-clear-icon-wrapper");

		// press clear icon
		await clearIcon.click();
		await changeCounter.click();

		assert.strictEqual(await changeCounter.getText(), "2", "Change event called second time");
		assert.strictEqual(await inputCounter.getText(), "2", "Input event called when value is cleared by clear icon");

		await innerInput.click();
		await innerInput.keys("a");
		await changeCounter.click();
		await clearIcon.click();
		await innerInput.keys("a");
		await changeCounter.click();


		assert.strictEqual(await changeCounter.getText(), "3", "Change event called three times");
		assert.strictEqual(await inputCounter.getText(), "5", "Input event called when value is cleared by clear icon or typed in");
	});

	it("Setting readonly or disabled hides clear icon", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#clear-input-compact");
		const readonly = await $("#clear-icon-readonly-toggle");
		const disable = await $("#clear-icon-disabled-toggle");

		await readonly.click();
		assert.notOk(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should be not be shown when readonly");

		await readonly.click();
		assert.ok(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should be shown");

		await disable.click();
		assert.notOk(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should be not be shown when disabled");

		await disable.click();
		assert.ok(await input.getProperty("_effectiveShowClearIcon"), "Clear icon should be shown");
	});

	it("Should open suggestions popover if open is set on focusin", async () => {
		const input = await browser.$("#openPickerInput");
		const popover = await input.shadow$("ui5-responsive-popover");

		await input.click();

		assert.ok(await popover.isDisplayedInViewport(), "The popover is visible");
	});

	it("Private property for input value should be in sync, when value gets updated programatically - #5635", async () => {
		const inputChange = await browser.$("#input-change-1").shadow$("input");
		const clearButton = await browser.$("#clear-button");
		const changeCount = await browser.$("#input-change-count-1");

		await inputChange.click();
		await inputChange.keys("1");
		await inputChange.keys("2");
		await inputChange.keys("Enter");

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is called");

		// clear the input
		await clearButton.click();

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is not called again, since the value is changed programatically");

		// Type the same value once again.
		await inputChange.click();
		await inputChange.keys("1");
		await inputChange.keys("2");
		await inputChange.keys("Enter");

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "2", "The change event is called now, since the value is updated");
	});

	it("Change event should be fired only once, when a user types a value identical to an item and presses ENTER - #3732", async () => {
		const inputChange = await browser.$("#input-change-2").shadow$("input");
		const changeCount = await browser.$("#input-change-count-2");

		await inputChange.click();
		await inputChange.keys("s");
		await inputChange.keys("o");
		await inputChange.keys("f");
		await inputChange.keys("Enter");

		// Assert
		assert.strictEqual(await changeCount.getHTML(false), "1", "The change event is called only once");
	});

	it("Value should be updated correctly, when using DEL - #4340", async () => {
		const inputChange = await browser.$("#input-change-3").shadow$("input");
		const changeValue = await browser.$("#input-change-value-3");

		await inputChange.click();

		// go to previous element
		await inputChange.keys(["Shift", "Tab"]);

		// go to input
		await browser.keys("Tab");

		// delete value
		await inputChange.keys("Delete");

		// focus out
		await inputChange.keys("Tab");

		// Assert
		assert.strictEqual(await changeValue.getHTML(false), "", "The change event should pass a correct value");
	});

	it("Changes text if cleared in change event handler", async () => {
		const input = await $("#change-event-value");
		const inner = await input.shadow$("input");

		await input.scrollIntoView();

		await browser.execute(() =>{
			document.getElementById("change-event-value").open = true;
		});

		const listItem = await input.$("ui5-suggestion-item");

		await listItem.click();

		assert.strictEqual(await input.getValue(), "", "Input's value should be empty");
		assert.strictEqual(await inner.getValue(), "", "Inner input's value should be empty");
	});

	it("Tests prevented input event", async () => {
		const input = await $("#prevent-input-event");
		const innerInput = await input.shadow$("input");

		await input.click();

		await innerInput.keys("a");
		await innerInput.keys("b");
		await innerInput.keys("c");
		await innerInput.keys("d");

		// forth input should be prevented
		assert.strictEqual(await input.getValue(), "abc", "The value is correct");
	});

	it("Tests prevented input event with clear icon", async () => {
		const input = await $("#prevent-input-event-clear-icon");
		const clearIcon = await input.shadow$(".ui5-input-clear-icon-wrapper");

		await clearIcon.click();

		assert.strictEqual(await input.getValue(), "Test", "The value is not cleared");
	});
});

describe("Input HOME navigation", () => {
	it("Should move caret to beginning of input with HOME if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		await suggestionsInput.keys("Home");

		const firstListItem = await suggestionsInput.$("ui5-suggestion-item");
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

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const firstListItem = await suggestionsInput.$("ui5-suggestion-item");

		assert.strictEqual(await suggestionsInput.getValue(), "Cozy", "First item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "First list item is focused");
	});

	it("Should focus the value state header from the suggestions popover with HOME", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#inputError");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const respPopover = await suggestionsInput.shadow$("ui5-responsive-popover");
		const valueStateHeader = await respPopover.$(".ui5-responsive-popover-header.ui5-valuestatemessage-root");
		const firstListItem = suggestionsInput.$("ui5-suggestion-item");
		const groupHeader = suggestionsInput.$("ui5-suggestion-item-group");

		assert.strictEqual(await suggestionsInput.getValue(), "a", "Input's value should be the typed-in value");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), false, "Group header is not focused");
		assert.strictEqual(await suggestionsInput.getProperty("_isValueStateFocused"), true, "Value State should not be focused");
		assert.strictEqual(await valueStateHeader.hasClass("ui5-responsive-popover-header--focused"), true, "Value state header is focused");
	});

	it("Should focus the group header from the suggestions popover with HOME", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput");

		await suggestionsInput.click();
		await suggestionsInput.keys("a");

		// Moving focus to suggestions popover, because by design HOME only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("Home");

		const respPopover = await suggestionsInput.shadow$("ui5-responsive-popover");
		const firstListItem = await suggestionsInput.$("ui5-suggestion-item");
		const groupHeader = await suggestionsInput.$("ui5-suggestion-item-group");

		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), false, "First list item is not focused");
		assert.strictEqual(await groupHeader.getProperty("focused"), true, "Group header is focused");

	});
});

describe("Input END navigation", () => {
	it("Should move caret to end of input with END if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		await suggestionsInput.keys("ArrowLeft");
		await suggestionsInput.keys("End");

		const firstListItem = await suggestionsInput.$("ui5-suggestion-item");
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

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		// Moving focus to suggestions popover, because by design END only moves the caret if focus is on input
		await suggestionsInput.keys("ArrowDown");

		await suggestionsInput.keys("End");

		const firstListItem = await suggestionsInput.$("ui5-suggestion-item:last-of-type");

		assert.strictEqual(await suggestionsInput.getValue(), "Chili", "Last item has been selected");
		assert.strictEqual(await suggestionsInput.getProperty("focused"), false, "Input is not focused");
		assert.strictEqual(await firstListItem.getProperty("focused"), true, "Last list item is focused");
	});
});

describe("Input PAGEUP/PAGEDOWN navigation", () => {
	it("PAGEUP and PAGEDOWN should do nothing if focus is on Input", async () => {
		await browser.url(`test/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInput2");

		await suggestionsInput.click();
		await suggestionsInput.keys("c");

		const firstListItem = await suggestionsInput.$("ui5-suggestion-item");
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

		const listItems = await input.shadow$("ui5-responsive-popover").$$("ui5-suggestion-item");
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

describe("Lazy loading", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/InputsLazyLoading.html`);
	});

	it("Lazy loading opens the picker once items are populated", async () => {
		const input = await $("#field");
		const inner = await input.shadow$("input");
		const respPopover = await input.shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("a");

		await browser.waitUntil(() => respPopover.getProperty("open"), {
			timeout: 3000,
			timeoutMsg: "Popover should be displayed"
		});
	});

	it("Does not reopeon picker on focus in", async () => {
		const input = await $("#field");
		const inner = await input.shadow$("input");
		const respPopover = await input.shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("a");

		// go to next focusable
		await browser.keys(["Shift", "Tab"]);

		// go to previous
		await browser.keys("Tab");

		await browser.pause(3000);

		assert.notOk(await respPopover.getProperty("open"), "Picker should not be open");
	});

	it("Should not close picker when items are updated", async () => {
		const input = await $("#field1");
		const inner = await input.shadow$("input");
		const respPopover = await input.shadow$("ui5-responsive-popover");

		await inner.click();
		await inner.keys("S");

		await browser.waitUntil(() => respPopover.getProperty("open"), {
			timeout: 2000,
			timeoutMsg: "Popover should be displayed"
		});

		await inner.keys("b");

		assert.strictEqual(await respPopover.getProperty("open"), true, "Picker should not be open");
	});
});

describe("Selection-change event", () => {
	it("Selection-change event fires when interacting with Arrow UP and Arrow DOWN keys", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#input-selection-change");
		const inner = await input.shadow$("input");

		await inner.click();
		await inner.keys("C");
		await input.keys("ArrowDown");
		await input.keys("ArrowDown");
		await input.keys("ArrowUp");

		const selectionChangeCount = await $("#input-selection-change-count");
		assert.strictEqual(await selectionChangeCount.getText(), "3", "Selection-change event was fired 3 times");
	});

	it("Selection-change event fires when suggestion item is selected by clicking on it without previously selected", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#input-selection-change");
		const inner = await input.shadow$("input");
		const selectionChangeCount = await $("#input-selection-change-count");

		await inner.click();
		await inner.keys("C");

		// select first item
		await input.keys("ArrowDown");
		assert.strictEqual(await selectionChangeCount.getText(), "1", "Selection-change event was fired 1 time");

		// click on second item
		const suggestionItems = await input.$$("ui5-suggestion-item");
		await suggestionItems[2].click();

		assert.strictEqual(await selectionChangeCount.getText(), "2", "Selection-change event was fired 2 times");
	});

	it("Selection-change event does not fire when item is clicked but focus is already on it", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#input-selection-change");
		const inner = await input.shadow$("input");
		const selectionChangeCount = await $("#input-selection-change-count");

		await inner.click();
		await inner.keys("C");

		// select first item
		await input.keys("ArrowDown");
		assert.strictEqual(await selectionChangeCount.getText(), "1", "Selection-change event was fired once");

		// click on first item
		const firstSuggestion = await input.$("ui5-suggestion-item");
		await firstSuggestion.click();

		assert.strictEqual(await selectionChangeCount.getText(), "1", "Selection-change event was fired once");
	});
});

describe("Property open", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
	});

	it("Suggestions picker is open when attribute open is set to true", async () => {
		const input = await browser.$("#input-suggestions-open");
		await input.scrollIntoView();

		await browser.execute(() => {
			document.querySelector("#input-suggestions-open").open = true;
		});

		const respPopover = await input.shadow$("ui5-responsive-popover");
		const suggestionItems = await input.$$("ui5-suggestion-item");

		assert.strictEqual(await respPopover.getProperty("open"), true, "Suggestions popover is open");
		assert.strictEqual(suggestionItems.length, 3, "Suggestions popover displays 3 items");
	});

	it("Suggestions picker is closed when attribute open is set to false", async () => {
		const input = await browser.$("#input-suggestions-open");
		const respPopover = await input.shadow$("ui5-responsive-popover");

		await browser.execute(() =>{
			document.querySelector("#input-suggestions-open").open = false;
		});

		assert.strictEqual(await respPopover.getProperty("open"), false, "Suggestions popover is closed");
	});
});