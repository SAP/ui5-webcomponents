const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Attributes propagation", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);
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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);
	});

	it("Should not open suggestions popover when focused", async () => {
		const input = await browser.$("#myInput2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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

	it("handles suggestions", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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
		const suggestionsInput = await browser.$("#myInputEsc").shadow$("input");

		// act
		await suggestionsInput.click();
		await suggestionsInput.keys("ch");
		await suggestionsInput.keys("ArrowDown");

		// assert
		assert.strictEqual(await suggestionsInput.getValue(), "Chromium",
			"The value is updated as the item has been previewed.");

		// act
		await suggestionsInput.keys("Escape");

		// assert
		assert.strictEqual(await suggestionsInput.getValue(), "ch",
			"The value is restored as ESC has been pressed.");
	});

	it("input value should be cleared with ESC", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

		const suggestionsInput = await browser.$("#myInputEsc").shadow$("input");

		await suggestionsInput.click();
		await suggestionsInput.keys("Some value");

		// Close sugggestions
		await suggestionsInput.keys("Escape");
		// Clear value
		await suggestionsInput.keys("Escape");

		assert.strictEqual(await suggestionsInput.getValue(), "", "The value is restored as ESC has been pressed.");

		await suggestionsInput.keys("Some value");
		await suggestionsInput.keys("Enter");
		await suggestionsInput.keys("Another value");

		// Close sugggestions
		await suggestionsInput.keys("Escape");
		// Clear value
		await suggestionsInput.keys("Escape");

		assert.strictEqual(await suggestionsInput.getValue(), "Some value", "The value is restored to the last confirmed by 'ENTER' press one.");
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

	it("Tests suggestions highlighting", async () => {
		const input = await browser.$("#myInputHighlighted").shadow$("input");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInputHighlighted");
		const EXPTECTED_TEXT = "<b>Ad</b>am";

		await input.click();
		await input.keys("ad");

		const respPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = await respPopover.$("ui5-list").$("ui5-li-suggestion-item");

		assert.ok(await respPopover.isDisplayedInViewport(), "The popover is visible");
		const firstItemHtml = await firstListItem.getHTML();
		assert.include(firstItemHtml, EXPTECTED_TEXT, "The suggestions is highlighted.");
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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input_quickview.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);
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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

		const inputDynamicSuggestions = await $("#inputCompact");
		const inputSuggestions = await $("#myInput2");
		const dynamicSuggestionsInnerInput = await inputDynamicSuggestions.shadow$("input");
		const dynamicSuggestionsCount = await inputDynamicSuggestions.shadow$(`#${await inputDynamicSuggestions.getProperty("_id")}-suggestionsCount`);
		const suggestionsCount = await inputSuggestions.shadow$(`#${await inputSuggestions.getProperty("_id")}-suggestionsCount`);

		//act
		await dynamicSuggestionsInnerInput.click();

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "", "Suggestions count is not available");

		//act
		await dynamicSuggestionsInnerInput.keys("c");

		//assert
		assert.strictEqual(await dynamicSuggestionsCount.getText(), "4 results are available", "Suggestions count is available since value is entered");
		await dynamicSuggestionsInnerInput.keys("Backspace");

		//act
		await inputSuggestions.click();
		await (await inputSuggestions.shadow$("input")).keys("c");

		//assert
		assert.strictEqual(await suggestionsCount.getText(), "5 results are available", "Suggestions count is available since the suggestions popover is opened");
	});

	it("Should close the Popover when no suggestions are available", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

		const input = await $("#myInput");
		const innerInput = await input.shadow$("input");

		await innerInput.keys("A");
		await innerInput.keys("Space");

		assert.notOk(await input.getProperty("open"), "Input's Suggestion Popover should not be open");
	});
});

describe("Input arrow navigation", () => {

	it("handles suggestions via keyboard, should not fire suggestionItemSelect on inactive item", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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

describe("XSS tests for suggestions", () => {
	it("add suggestion item with XSS", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

		const btn = await $("#xss-btn");
		const span = await $("#xss-result");

		await btn.click();

		assert.strictEqual(await span.getText(), "NO XSS", "No XSS issues found")
	});

	it("tests dangerous items highlighting", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Input.html`);

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
