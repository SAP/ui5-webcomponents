const assert = require("chai").assert;

describe("Attributes propagation", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Input.html");
	});

	it("Should change the placeholder of the inner input", () => {
		const input = $("#myInput");
		const sExpected = "New placeholder text";

		browser.execute(() => {
			input.setAttribute("placeholder", "New placeholder text");
		});

		assert.strictEqual(input.shadow$("input").getProperty("placeholder"), sExpected, "The placeholder was set correctly");
	});

	it("Disabled attribute is propagated properly", () => {
		assert.ok(browser.$("#input-disabled").shadow$(".ui5-input-inner").getAttribute("disabled"), "Disabled property was propagated");
	});

	it("Redonly attribute is propagated properly", () => {
		assert.ok(browser.$("#input-readonly").shadow$(".ui5-input-inner").getAttribute("readonly"), "Readonly property was propagated");
	});

	it("Required attribute is propagated properly", () => {
		assert.strictEqual(browser.$("#input-required").shadow$(".ui5-input-inner").getAttribute("aria-required"), "true", "Aria-required attribute is set correctly");
		assert.strictEqual(browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("aria-required"), "false", "Aria-required attribute is set correctly");
	});

	it("Type attribute is propagated properly", () => {
		const sExpectedType = "number";
		assert.strictEqual(browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("type"), sExpectedType, "Type property was propagated");
		assert.strictEqual(browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("step"), "any", "The step attr is set");
	});

	it("Value attribute is propagated properly", () => {
		const sExpectedValue = "Test test";

		browser.execute(() => {
				document.getElementById("input3").value = "Test test";
		});

		assert.strictEqual(browser.$("#input3").shadow$(".ui5-input-inner").getValue(), sExpectedValue, "Value property was set correctly");
	});

	it("sets empty value to an input", () => {
		const input1 = browser.$("#input1");
		const innerInput = browser.$("#input1").shadow$("input");

		input1.setProperty("value", "");

		assert.strictEqual(input1.getValue(), "", "Property value should be empty");
		assert.strictEqual(innerInput.getValue(), "", "Inner's property value should be empty");
	});
});

describe("Input general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/Input.html");
	});

	it("Should open suggestions popover when focused", () => {
		const input = $("#myInput2");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#myInput2");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// focus the input field which will display the suggestions
		input.click();

		assert.ok(popover.isDisplayedInViewport(), "The popover is visible");
	});

	it("fires change", () => {
		const input1 = $("#input1").shadow$("input");
		const inputResult = $("#inputResult").shadow$("input");

		// Start typing.
		input1.click();
		input1.keys("a");
		input1.keys("b");
		input1.keys("c");

		// Click somewhere else to focus out - should fire change event.
		inputResult.click();

		// Get back and continue typing.
		input1.click();
		input1.keys("d");
		input1.keys("e");
		input1.keys("f");

		// Click somewhere else to force focus out - should fire change event.
		inputResult.click();

		assert.strictEqual(inputResult.getValue(), "2", "change is called twice");
	});

	it("fires input", () => {
		const input2 = $("#input2").shadow$("input");
		const inputLiveChangeResult = $("#inputLiveChangeResult").shadow$("input");

		input2.click();
		input2.keys("a");
		input2.keys("b");
		input2.keys("c");

		assert.strictEqual(inputLiveChangeResult.getValue(), "3", "input is fired 3 times");
	});

	it("fires change when same value typed, but value is mutated via API in between", () => {
		const inputChange = $("#inputChange").shadow$("input");
		const inputChangeResult = $("#inputChangeResult").shadow$("input");

		inputChange.click();
		inputChange.keys("a");
		inputChange.keys("b");
		inputChange.keys("c");

		// The submit event listener mutates the value via the API
		// Note: along with the sumbit event - the first change event is fired.
		inputChange.keys("Enter");

		// Type the same value once again.
		inputChange.keys("a");
		inputChange.keys("b");
		inputChange.keys("c");

		// Clicking on another input to force focus out,
		// which should trigger second change event, although same value is typed in.
		inputChangeResult.click();

		assert.strictEqual(inputChangeResult.getValue(), "2", "change is called twice");
	});

	it("fires suggestion-scroll event", () => {
		const input = $("#scrollInput").shadow$("input");
		const scrollResult = $("#scrollResult");

		// act - open suggestions
		input.click();
		input.keys("a");

		// act - scroll with keyboard
		input.keys("ArrowUp");
		input.keys("ArrowUp");
		input.keys("ArrowUp");

		// assert
		const scrollTop = scrollResult.getProperty("value");
		assert.ok(scrollTop > 0, "The suggestion-scroll event fired");

		// assert isSuggestionsScrollable
		const suggestionsScrollable = browser.execute(async () => {
			const input = document.getElementById("scrollInput");
			return (await input.isSuggestionsScrollable());
		});
		assert.equal(suggestionsScrollable, true, "The suggestions popup is scrollable");

		// close suggestions
		input.keys("Enter");
	});

	it("handles suggestions", () => {
		browser.url("http://localhost:8080/test-resources/pages/Input.html");

		let item;
		const suggestionsInput = $("#myInput").shadow$("input");
		const inputResult = $("#inputResult").shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#myInput")
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		suggestionsInput.click();
		suggestionsInput.keys("p");

		assert.ok(popover.getProperty("opened"), "suggestions are opened.");

		// This test is passing when the test is executed on browser that is NOT headless

		// item = $("#myInput").$$("ui5-li")[0];


		// item.click();

		// assert.ok(!popover.getProperty("opened"), "suggestions are closed");
		// assert.strictEqual(suggestionsInput.getValue(), "Portugal", "First item has been selected");
		// assert.strictEqual(inputResult.getValue(), "1", "suggestionItemSelected event called once");

		// suggestionsInput.keys("\b");
		// item = $("#myInput").$$("ui5-li")[0];
		// item.click();

		// assert.strictEqual(suggestionsInput.getValue(), "Portugal", "First item has been selected again");
		// assert.strictEqual(inputResult.getValue(), "2", "suggestionItemSelected event called for second time");
	});

	it("handles suggestions via keyboard", () => {
		browser.url("http://localhost:8080/test-resources/pages/Input.html");

		const suggestionsInput = $("#myInput2").shadow$("input");
		const inputResult = $("#inputResult").shadow$("input");

		suggestionsInput.click();
		suggestionsInput.keys("c");
		suggestionsInput.keys("ArrowDown");
		suggestionsInput.keys("Enter");

		assert.strictEqual(suggestionsInput.getValue(), "Cozy", "First item has been selected");
		assert.strictEqual(inputResult.getValue(), "1", "suggestionItemSelected event called once");

		suggestionsInput.keys("c"); // to open the suggestions pop up once again
		suggestionsInput.keys("ArrowUp");

		assert.strictEqual(suggestionsInput.getValue(), "",
			"The Last item 'Inactive Condensed' has been selected, producing empty string as 'Inactive'");

		inputResult.click();

		assert.strictEqual(inputResult.getValue(), "1", "suggestionItemSelect is not fired as item is 'Inactive'");
	});

	it("handles suggestions selection cancel with ESC", () => {
		const suggestionsInput = $("#myInputEsc").shadow$("input");

		// act
		suggestionsInput.click();
		suggestionsInput.keys("ch");
		suggestionsInput.keys("ArrowDown");

		// assert
		assert.strictEqual(suggestionsInput.getValue(), "Chromium",
			"The value is updated as the item has been previewed.");

		// act
		suggestionsInput.keys("Escape");

		// assert
		assert.strictEqual(suggestionsInput.getValue(), "ch",
			"The value is restored as ESC has been pressed.");
	});

	it("handles group suggestion item via keyboard", () => {
		const suggestionsInput = $("#myInputGrouping").shadow$("input");
		const inputResult = $("#inputResultGrouping").shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#myInputGrouping");
		const respPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		suggestionsInput.click();
		suggestionsInput.keys("ArrowDown");
		suggestionsInput.keys("Enter");
		browser.pause(300);

		assert.ok(respPopover.getProperty("opened"), "Popover should not be closed after trying to select a group header.");
		assert.strictEqual(suggestionsInput.getValue(), "", "Group item is not selected");
		assert.strictEqual(inputResult.getValue(), "", "suggestionItemSelected event is not called");
	});

	it("checks if the suggestions popover width is the same as the input width when there is a long suggestion", () => {
		const input = $("#suggestionsPopoverWidth");
		const nativeInput = $("#suggestionsPopoverWidth").shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#suggestionsPopoverWidth");
		const listItem = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("ui5-li-suggestion-item");

		nativeInput.click();
		nativeInput.keys("a");

		assert.strictEqual(input.getSize('width'), listItem.getSize('width'));
	})

	it("Input's maxlength property is set correctly", () => {
		const input5 = $("#input-tel");
		const inputShadowRef = $("#input-tel").shadow$("input");

		inputShadowRef.click();

		for (let i = 0; i <15 ; i++) {
			inputShadowRef.keys("c");
		}

		assert.strictEqual(inputShadowRef.getProperty("value").length, 10, "Input's value should not exceed 10 characters.");
		assert.ok(input5.getProperty("maxlength"), "Input's maxlength property should be applied.");
		assert.strictEqual(inputShadowRef.getAttribute("maxlength"), "10", "Input's maxlength attribute should be applied.");
	});

	it("Checks if valueStateMessage is shown", () => {
		const inputShadowRef = browser.$("#inputError").shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#inputError");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const respPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-header");

		inputShadowRef.click();

		assert.ok(popover.getProperty("opened"), "Popover with valueStateMessage should be opened.");

		inputShadowRef.keys("a");

		assert.ok(respPopover, "Responsive popover with valueStateMessage should be opened.");
	});

	it("Checks if aria-describedby is renderd if not neccessary", () => {
		const input = browser.$("#input-max-length"); // Input with no show-suggestions attribute
		const innerInput = input.shadow$("input");

		assert.notOk(innerInput.getAttribute("aria-describedby"), "aria-describedby is not rendered");
	});

	it("Checks if aria-label is reflected in the shadow DOM", () => {
		const input = browser.$("#aria-label-input");
		const innerInput = input.shadow$("input");
		const NEW_TEXT = "New cool text";

		assert.strictEqual(input.getAttribute("aria-label"), innerInput.getAttribute("aria-label"), "aria-label is reflected in the shadow DOM")

		input.setAttribute("aria-label", NEW_TEXT);

		assert.strictEqual(innerInput.getAttribute("aria-label"), NEW_TEXT, "aria-label is reflected in the shadow DOM")
	});

	it("Tests suggestions highlighting", () => {
		const input = browser.$("#myInputHighlighted").shadow$("input");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#myInputHighlighted");
		const EXPTECTED_TEXT = "<b>Ad</b>am";

		input.click();
		input.keys("ad");

		const respPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const firstListItem = respPopover.$("ui5-list").$("ui5-li-suggestion-item");

		assert.ok(respPopover.isDisplayedInViewport(), "The popover is visible");
		assert.ok(firstListItem.getHTML().indexOf(EXPTECTED_TEXT) !== -1, "The suggestions is highlighted.");
	});

	it("Doesn't remove value on number type input even if locale specific delimiter/multiple delimiters", () => {
		const input = browser.$("#input-number2");

		input.click();
		input.keys("1");
		input.keys(".");
		input.keys("2");
		input.keys("2");
		input.keys(".");
		input.keys("3");
		input.keys("3");
		input.keys("Tab");

		browser.pause(500);
		assert.strictEqual(parseFloat(input.getProperty("value")).toPrecision(3), "1.22", "Value is not lost");
	});

	it("fires suggestion-item-preview", () => {
		browser.url("http://localhost:8080/test-resources/pages/Input_quickview.html");

		const inputItemPreview = $("#inputPreview2").shadow$("input");
		const suggestionItemPreviewRes = $("#suggestionItemPreviewRes");
		const EXPECTED_PREVIEW_ITEM_TEXT = "Laptop Lenovo";

		// act
		inputItemPreview.click();
		inputItemPreview.keys("c");

		inputItemPreview.keys("ArrowDown");

		// assert
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#inputPreview2");
		const inputPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const helpPopover = browser.$("#quickViewCard2");

		assert.strictEqual(suggestionItemPreviewRes.getValue(), EXPECTED_PREVIEW_ITEM_TEXT, "First item has been previewed");
		assert.ok(helpPopover.isDisplayedInViewport(), "The help popover is open.");
		assert.ok(inputPopover.isDisplayedInViewport(), "The input popover is open.");

		// act
		const inputInHelpPopover = browser.$("#searchInput2").shadow$("input");
		inputInHelpPopover.click();

		// assert
		assert.notOk(inputPopover.isDisplayedInViewport(), "The inpuit popover is closed as it lost the focus.");
		assert.ok(helpPopover.isDisplayedInViewport(), "The help popover remains open as the focus is within.");
	});

	it("Should open suggestions popover when ui5-input is the first focusable element within a dialog", () => {
		browser.url("http://localhost:8080/test-resources/pages/Input.html");
		const input = $("#inputInDialog");
		const button = browser.$("#btnOpenDialog");

		//act
		button.click();

		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#inputInDialog");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		//assert
		assert.ok(popover.isDisplayedInViewport(), "The popover is visible");
	});
});
