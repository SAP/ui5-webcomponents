const assert = require("chai").assert;

describe("Attributes propagation", () => {
	browser.url("http://localhost:8080/test-resources/pages/Input.html");

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
		assert.ok(browser.$("#input-required").shadow$(".ui5-input-inner").getAttribute("required"), "Required property was propagated");
	});

	it("Type attribute is propagated properly", () => {
		const sExpectedType = "number";
		assert.strictEqual(browser.$("#input-number").shadow$(".ui5-input-inner").getAttribute("type"), sExpectedType, "Type property was propagated");
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
	browser.url("http://localhost:8080/test-resources/pages/Input.html");

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

		assert.strictEqual(suggestionsInput.getValue(), "Condensed", "First item has been selected");

		inputResult.click();

		assert.strictEqual(inputResult.getValue(), "1", "suggestionItemSelect is fired once");
	});

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
});
