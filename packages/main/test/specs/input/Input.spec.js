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
	});
});

describe("Input general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Input.html`);
	});

	it("Should not open suggestions popover when focused", async () => {
		const input = await browser.$("#myInput2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// focus the input field which will display the suggestions
		await input.click();

		assert.ok(!(await popover.isDisplayedInViewport()), "The popover is not visible");
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
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputError");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-header");

		await inputShadowRef.click();

		assert.ok(await popover.getProperty("opened"), "Popover with valueStateMessage should be opened.");

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

	it("Value state type should be added to the screen readers default value states announcement", async () => {
		const inputError = await browser.$("#vs-error-default");
		const inputWarning = await browser.$("#vs-warning-default");
		const inputSuccess = await browser.$("#vs-success-default");
		const inputInformation = await browser.$("#vs-information-default");

		let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#vs-error-default");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		await inputError.click();

		let ariaHiddenText = await inputError.shadow$(".ui5-hidden-text").getText();
		let valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Error Invalid entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Invalid entry", "Displayed value state message text is correct");

		await inputWarning.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#vs-warning-default");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await inputWarning.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Warning Warning issued", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Warning issued", "Displayed value state message text is correct");

		await inputInformation.click();

		staticAreaItemClassName = await browser.getStaticAreaItemClassName("#vs-information-default");
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		ariaHiddenText = await inputInformation.shadow$(".ui5-hidden-text").getText();
		valueStateText = await popover.$("div").getText();

		assert.strictEqual(ariaHiddenText, "Value State Information Informative entry", "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText, "Informative entry", "Displayed value state message text is correct");

		await inputSuccess.click();
		assert.strictEqual(await inputSuccess.shadow$(".ui5-hidden-text").getText(), "Value State Success", "Hidden screen reader text is correct");
	});

	it("Value state type should be added to the screen readers custom value states announcement", async () => {
		const inputError = await browser.$("#inputError");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputError");

		inputError.click();
		inputError.keys("a");

		const popoverHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover").$(".ui5-valuestatemessage-header");
		const valueStateText = await popoverHeader.$("div").getText();
		const ariaHiddenText = await inputError.shadow$(`#${staticAreaItemClassName}-valueStateDesc`).getText();

		assert.strictEqual(ariaHiddenText.includes("Value State Error"), true, "Hidden screen reader text is correct");
		assert.strictEqual(valueStateText.includes("Custom error value state message"), true, "Displayed value state message text is correct");
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

	it("Tests disabled autocomplete(type-ahead)", async () => {
		let hasSelection;

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

	it("fires suggestion-item-preview", async () => {
		await browser.url(`test/pages/Input_quickview.html`);

		const inputItemPreview = await browser.$("#inputPreview2").shadow$("input");
		const suggestionItemPreviewRes = await browser.$("#suggestionItemPreviewRes");
		const EXPECTED_PREVIEW_ITEM_TEXT = "Laptop Lenovo";

		// act
		await inputItemPreview.click();
		await inputItemPreview.keys("c");

		await inputItemPreview.keys("ArrowDown");

		// assert
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputPreview2");
		const inputPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const helpPopover = await browser.$("#quickViewCard2");

		assert.strictEqual(await suggestionItemPreviewRes.getValue(), EXPECTED_PREVIEW_ITEM_TEXT, "First item has been previewed");
		assert.ok(await helpPopover.isDisplayedInViewport(), "The help popover is open.");
		assert.ok(await inputPopover.isDisplayedInViewport(), "The input popover is open.");

		// act
		const inputInHelpPopover = await browser.$("#searchInput2").shadow$("input");
		await inputInHelpPopover.click();

		// assert
		assert.notOk(await inputPopover.isDisplayedInViewport(), "The inpuit popover is closed as it lost the focus.");
		assert.ok(await helpPopover.isDisplayedInViewport(), "The help popover remains open as the focus is within.");
	});

	it("Should open suggestions popover when ui5-input is the first focusable element within a dialog", async () => {
		await browser.url(`test/pages/Input.html`);
		const input = await browser.$("#inputInDialog");
		const button = await browser.$("#btnOpenDialog");

		//act
		await button.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputInDialog");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
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
		const dynamicSuggestionsCount = await inputDynamicSuggestions.shadow$(`#${await inputDynamicSuggestions.getProperty("_id")}-suggestionsCount`);
		const suggestionsCount = await inputSuggestions.shadow$(`#${await inputSuggestions.getProperty("_id")}-suggestionsCount`);

		//act
		await inputDynamicSuggestions.click();

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "", "Suggestions count is not available");

		//act
		await dynamicSuggestionsInnerInput.keys("c");

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "4 results are available", "Suggestions count is available since value is entered");
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
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#readonly-value-state-input");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

		await input.click();

		assert.notOk(await popover.getProperty("opened"), "Popover with valueStateMessage should not be opened.");
	});

	it("Displays clear icon when typing and pressing it clears the value", async () => {
		await browser.url(`test/pages/Input.html`);

		const input = await $("#clear-input");
		const innerInput = await input.shadow$("input");
		const changeCounter = await $("#clear-input-change-event-count");
		const inputCounter = await $("#clear-input-input-event-count");

		assert.notOk(await input.getProperty("effectiveShowClearIcon"), "Clear icon should not be shown");

		// type
		await innerInput.click();
		await innerInput.keys("a");

		assert.ok(await input.getProperty("effectiveShowClearIcon"), "Clear icon should be shown");
		assert.strictEqual(await changeCounter.getText(), "0", "Change event not called yet");
		assert.strictEqual(await inputCounter.getText(), "1", "Input event called when typing");

		const clearIcon = await input.shadow$(".ui5-input-clear-icon-wrapper");

		// press clear icon
		await clearIcon.click();

		assert.strictEqual(await input.getProperty("value"), "", "Clear icon clear the value");
		assert.notOk(await input.getProperty("effectiveShowClearIcon"), "Clear icon should not be shown");
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
		assert.notOk(await input.getProperty("effectiveShowClearIcon"), "Clear icon should be not be shown when readonly");

		await readonly.click();
		assert.ok(await input.getProperty("effectiveShowClearIcon"), "Clear icon should be shown");

		await disable.click();
		assert.notOk(await input.getProperty("effectiveShowClearIcon"), "Clear icon should be not be shown when disabled");

		await disable.click();
		assert.ok(await input.getProperty("effectiveShowClearIcon"), "Clear icon should be shown");
	});

	it("Should open suggestions popover if openPicker() is called on focusin", async () => {
		const input = await browser.$("#openPickerInput");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#openPickerInput");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

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

	it("Change event should be fired only once, when a user types a value identical to a item and presses ENTER - #3732", async () => {
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

		await browser.executeAsync((done) =>{
			return done(document.getElementById("change-event-value").openPicker());
		});

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#change-event-value");
		const listItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("ui5-li-suggestion-item");

		await listItem.click();

		assert.strictEqual(await input.getValue(), "", "Input's value should be empty");
		assert.strictEqual(await inner.getValue(), "", "Inner input's value should be empty");
	});
});
