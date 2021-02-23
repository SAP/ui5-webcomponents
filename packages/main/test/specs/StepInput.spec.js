const assert = require("chai").assert;

describe("Attributes propagation", () => {

	it("'placeholder' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const sExpected = "New placeholder text";

		browser.execute(() => {
			siCozy.setAttribute("placeholder", "New placeholder text");
		});
		assert.strictEqual(browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("placeholder"), sExpected, "The 'placeholder' was set correctly");
	});

	it("'min' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const sExpected = "0";

		browser.execute(() => {
			siCozy.setAttribute("min", "0");
		});
		assert.strictEqual(browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("min"), sExpected, "The 'min' was set correctly");
	});

	it("'max' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const sExpected = "10";

		browser.execute(() => {
			siCozy.setAttribute("max", "10");
		});
		assert.strictEqual(browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("max"), sExpected, "The 'max' was set correctly");
	});

	it("'step' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const sExpected = "2";

		browser.execute(() => {
			siCozy.setAttribute("step", "2");
		});
		assert.strictEqual(browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("step"), sExpected, "The 'step' was set correctly");
	});

	it("'disabled' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		assert.ok(browser.$("#stepInputDisabled").shadow$('.ui5-step-input-input').shadow$("input").getAttribute("disabled"), "The 'disabled' property was propagated");
	});

	it("'redonly' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		assert.ok(browser.$("#stepInputReadOnly").shadow$('.ui5-step-input-input').shadow$("input").getAttribute("readonly"), "The 'readonly' property was propagated");
	});

	it("'value' attribute is propagated properly", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const sExpectedValue = "5";

		browser.execute(() => {
				siCozy.value = 5;
		});

		assert.strictEqual(browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').getValue(), sExpectedValue, "Value property was set correctly");
	});

});

describe("Keyboard interactions", () => {

	it("'ArrowUp' increases the value if it is less than 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const initValue = siMinMax.getProperty("value");

		// focus the step input field
		siMinMax.click();
		siMinMax.keys("ArrowUp");

		assert.strictEqual(siMinMax.getProperty("value"), initValue + 1, "Value is increased correctly to " + (initValue + 1));
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), initValue + 5, "Value is increased correctly to " + (initValue + 5));
	});

	it("'ArrowUp' does not increase the value if it is greater than 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");

		siMinMax.setProperty("value", maxValue - 1);

		// focus the step input field
		siMinMax.click();
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is not increased to " + (maxValue + 1));
	});

	it("'ArrowDown' decreases the value if it is greater than 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", maxValue);

		// focus the step input field
		siMinMax.click();
		siMinMax.keys("ArrowDown");

		assert.strictEqual(siMinMax.getProperty("value"), maxValue - 1, "Value is decreased correctly to " + (maxValue - 1));
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		assert.strictEqual(siMinMax.getProperty("value"), maxValue - 5, "Value is decreased correctly to " + (maxValue - 5));
	});

	it("'ArrowDown' does not decrease the value if it is less than 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", minValue + 1);

		// focus the step input field
		siMinMax.click();
		siMinMax.keys("ArrowDown");
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is decreased correctly to " + minValue);
		siMinMax.keys("ArrowDown");
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is not decreased to " + (minValue - 1));
	});

	it("'Shift+PageUp' sets the value to the 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");

		// focus the step input field
		siMinMax.click();
		siMinMax.keys(["Shift", "PageUp"]);
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
	});

	it("'Shift+PageDown' sets the value to the 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", maxValue);

		// focus the step input field
		siMinMax.click();
		siMinMax.keys(["Shift", "PageDown"]);
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
	});

	it("'Ctrl+Shift+ArrowUp' sets the value to the 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");

		// focus the step input field
		siMinMax.click();
		siMinMax.keys(["Control", "Shift", "ArrowUp"]);
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
	});

	it("'Ctrl+Shift+ArrowDown' sets the value to the 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", maxValue);

		// focus the step input field
		siMinMax.click();
		siMinMax.keys(["Control", "Shift", "ArrowDown"]);
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
	});

	it("'Escape' restores the previous value", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const initValue = siMinMax.getProperty("value");

		// focus the step input field
		siMinMax.click();
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), initValue + 4, "Value is increased correctly to " + (initValue + 4));
		siMinMax.keys("Escape");
		assert.strictEqual(siMinMax.getProperty("value"), initValue, "Value is restored correctly to " + initValue);
	});

	it("Manual input changes the value", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");

		// focus the step input field
		siMinMax.doubleClick();
		siMinMax.keys("6");
		siMinMax.keys("Enter");
		assert.strictEqual(siMinMax.getProperty("value"), 6, "Value is changed correctly to 6");
	});

});

describe("Inc/Dec buttons interactions", () => {

	it("'Increase' button increases the value if it is less than 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const incButton = siMinMax.shadow$(".ui5-step-inc");
		const initValue = siMinMax.getProperty("value");

		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), initValue + 1, "Value is increased correctly to " + (initValue + 1));
		incButton.click();
		incButton.click();
		incButton.click();
		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), initValue + 5, "Value is increased correctly to " + (initValue + 5));
	});

	it("'Increase' button does not increase the value if it is greater than 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const incButton = siMinMax.shadow$(".ui5-step-inc");
		const initValue = siMinMax.getProperty("value");
		const maxValue = siMinMax.getProperty("max");

		siMinMax.setProperty("value", maxValue - 1);

		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is not increased to " + (maxValue + 1));
	});

	it("'Decrease' button decreases the value if it is greater than 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const decButton = siMinMax.shadow$(".ui5-step-dec");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", maxValue);

		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), maxValue - 1, "Value is increased correctly to " + (maxValue - 1));
		decButton.click();
		decButton.click();
		decButton.click();
		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), maxValue - 5, "Value is increased correctly to " + (maxValue - 5));
	});

	it("'Decrease' button does not decrease the value if it is less than 'min'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const decButton = siMinMax.shadow$(".ui5-step-dec");
		const minValue = siMinMax.getProperty("min");

		siMinMax.setProperty("value", minValue + 1);

		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is decreased correctly to " + minValue);
		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is not decreased to " + (minValue - 1));
	});

});

describe("'change' event firing", () => {

	it("'Increase' and 'Decrease' buttons should fire 'change' event on each click only if value is between 'min' and 'max'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const incButton = siMinMax.shadow$(".ui5-step-inc");
		const decButton = siMinMax.shadow$(".ui5-step-dec");
		const changeResult = $("#changeResult");
		const maxValue = siMinMax.getProperty("max");
		const minValue = siMinMax.getProperty("min");

		incButton.click();
		incButton.click();
		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(changeResult.getProperty("value")), 3, "'change' event is fired 3 times");
		incButton.click();
		incButton.click();
		incButton.click();
		incButton.click();
		incButton.click();
		incButton.click();
		incButton.click();
		// 2 more clicks after max is reached
		incButton.click();
		incButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		assert.strictEqual(Number(changeResult.getProperty("value")), 10, "'change' event is fired only 10 times");

		decButton.click();
		decButton.click();
		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), 7, "Value is increased correctly to 7");
		assert.strictEqual(Number(changeResult.getProperty("value")), 13, "'change' event is fired 13 times");
		decButton.click();
		decButton.click();
		decButton.click();
		decButton.click();
		decButton.click();
		decButton.click();
		decButton.click();
		// 2 more clicks after min is reached
		decButton.click();
		decButton.click();
		assert.strictEqual(siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
		assert.strictEqual(Number(changeResult.getProperty("value")), 20, "'change' event is fired only 20 times");
	});

	it("'change' event should not be fired when 'ArrowUp'/'ArrowDown' are pressed without 'Enter' after that", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const changeResult = $("#changeResult");

		siMinMax.click();
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		assert.strictEqual(siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
	});

	it("'change' event should not be fired when previous value is restored with 'Escape'", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const changeResult = $("#changeResult");

		siMinMax.click();
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		assert.strictEqual(siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
		siMinMax.keys("Escape");
		assert.strictEqual(siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
	});

	it("'change' event should be fired when 'ArrowUp'/'ArrowDown' are pressed with 'Enter' after that", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const changeResult = $("#changeResult");

		siMinMax.click();
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("Enter");
		assert.strictEqual(siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("ArrowDown");
		siMinMax.keys("Enter");
		assert.strictEqual(siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired after manual entry and 'Enter' pressed after that", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siMinMax = $("#stepInputMinMax");
		const changeResult = $("#changeResult");

		siMinMax.doubleClick();
		siMinMax.keys("1");
		siMinMax.keys("Enter");
		assert.strictEqual(siMinMax.getProperty("value"), 1, "Value is increased correctly to 1");
		assert.strictEqual(Number(changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		siMinMax.doubleClick();
		siMinMax.keys("6");
		siMinMax.keys("Enter");
		assert.strictEqual(siMinMax.getProperty("value"), 6, "Value is increased correctly to 6");
		assert.strictEqual(Number(changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired after focus out", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const siMinMax = $("#stepInputMinMax");
		const changeResult = $("#changeResult");

		siMinMax.click();
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siMinMax.keys("ArrowUp");
		siCozy.click();
		assert.strictEqual(siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		siMinMax.doubleClick();
		siMinMax.keys("1");
		siCozy.click();
		assert.strictEqual(siMinMax.getProperty("value"), 1, "Value is increased correctly to 1");
		assert.strictEqual(Number(changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

});

describe("Accessibility related parameters", () => {

	it("'step', 'min', 'max', 'aria-required' and 'aria-label' attributes presence", () => {
		browser.url("http://localhost:8080/test-resources/pages/StepInput.html");
		const siCozy = $("#stepInputCozy");
		const siInner = siCozy.shadow$('.ui5-step-input-input').shadow$("input");

		siCozy.setProperty("step", 5);
		assert.strictEqual(siInner.getAttribute("min"), "", "'step' attribute doesn't exist");
		siCozy.setProperty("min", -10);
		assert.strictEqual(siInner.getAttribute("max"), "", "'step' attribute doesn't exist");
		siCozy.setProperty("max", 20);
		siCozy.setProperty("required", true);
		siCozy.setProperty("ariaLabel", "test-aria-label");

		assert.strictEqual(siInner.getAttribute("step"), "5", "'step' attribute exists and has correct value 5");
		assert.strictEqual(siInner.getAttribute("min"), "-10", "'min' attribute exists and has correct value -10");
		assert.strictEqual(siInner.getAttribute("max"), "20", "'max' attribute exists and has correct value 20");
		assert.strictEqual(siInner.getAttribute("aria-required"), "true", "'required' attribute exists");
		assert.strictEqual(siInner.getAttribute("aria-label"), "test-aria-label", "'aria-label' attribute exists and has correct value 'test-aria-label'");
	});

});