import { assert } from "chai";

describe("Attributes propagation", () => {

	it("'placeholder' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const sExpected = "New placeholder text";

		await siCozy.setAttribute("placeholder", "New placeholder text");
		assert.strictEqual(await browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("placeholder"), sExpected, "The 'placeholder' was set correctly");
	});

	it("'min' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const sExpected = "0";

		await siCozy.setAttribute("min", "0");
		assert.strictEqual(await browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("min"), sExpected, "The 'min' was set correctly");
	});

	it("'max' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const sExpected = "10";

		await siCozy.setAttribute("max", "10");
		assert.strictEqual(await browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("max"), sExpected, "The 'max' was set correctly");
	});

	it("'step' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const sExpected = "2";

		await siCozy.setAttribute("step", "2");
		assert.strictEqual(await browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').shadow$("input").getProperty("step"), sExpected, "The 'step' was set correctly");
	});

	it("'disabled' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		assert.ok(await browser.$("#stepInputDisabled").shadow$('.ui5-step-input-input').shadow$("input").getAttribute("disabled"), "The 'disabled' property was propagated");
	});

	it("'redonly' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		assert.ok(await browser.$("#stepInputReadOnly").shadow$('.ui5-step-input-input').shadow$("input").getAttribute("readonly"), "The 'readonly' property was propagated");
	});

	it("'value' attribute is propagated properly", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const sExpectedValue = "5";

		await siCozy.setProperty("value",5);

		assert.strictEqual(await browser.$("#stepInputCozy").shadow$('.ui5-step-input-input').getValue(), sExpectedValue, "Value property was set correctly");
	});

});

describe("Keyboard interactions", () => {

	it("'ArrowUp' increases the value if it is less than 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const initValue = await siMinMax.getProperty("value");

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys("ArrowUp");

		assert.strictEqual(await siMinMax.getProperty("value"), initValue + 1, "Value is increased correctly to " + (initValue + 1));
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), initValue + 5, "Value is increased correctly to " + (initValue + 5));
	});

	it("'ArrowUp' does not increase the value if it is greater than 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");

		await siMinMax.setProperty("value", maxValue - 1);

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is not increased to " + (maxValue + 1));
	});

	it("'ArrowDown' decreases the value if it is greater than 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", maxValue);

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys("ArrowDown");

		assert.strictEqual(await siMinMax.getProperty("value"), maxValue - 1, "Value is decreased correctly to " + (maxValue - 1));
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue - 5, "Value is decreased correctly to " + (maxValue - 5));
	});

	it("'ArrowDown' does not decrease the value if it is less than 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", minValue + 1);

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys("ArrowDown");
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is decreased correctly to " + minValue);
		await siMinMax.keys("ArrowDown");
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is not decreased to " + (minValue - 1));
	});

	it("'Shift+PageUp' sets the value to the 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys(["Shift", "PageUp"]);
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
	});

	it("'Shift+PageDown' sets the value to the 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", maxValue);

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys(["Shift", "PageDown"]);
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
	});

	it("'Ctrl+Shift+ArrowUp' sets the value to the 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys(["Control", "Shift", "ArrowUp"]);
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
	});

	it("'Ctrl+Shift+ArrowDown' sets the value to the 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", maxValue);

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys(["Control", "Shift", "ArrowDown"]);
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
	});

	it("'Escape' restores the previous value", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const initValue = await siMinMax.getProperty("value");

		// focus the step input field
		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), initValue + 4, "Value is increased correctly to " + (initValue + 4));
		await siMinMax.keys("Escape");
		assert.strictEqual(await siMinMax.getProperty("value"), initValue, "Value is restored correctly to " + initValue);
	});

	it("Manual input changes the value", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");

		// focus the step input field
		await siMinMax.doubleClick();
		await siMinMax.keys("6");
		await siMinMax.keys("Enter");
		assert.strictEqual(await siMinMax.getProperty("value"), 6, "Value is changed correctly to 6");
	});

});

describe("Inc/Dec buttons interactions", () => {

	it("'Increase' button increases the value if it is less than 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const incButton = await siMinMax.shadow$(".ui5-step-inc");
		const initValue = await siMinMax.getProperty("value");

		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), initValue + 1, "Value is increased correctly to " + (initValue + 1));
		await incButton.click();
		await incButton.click();
		await incButton.click();
		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), initValue + 5, "Value is increased correctly to " + (initValue + 5));
	});

	it("'Increase' button does not increase the value if it is greater than 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const incButton = await siMinMax.shadow$(".ui5-step-inc");
		const initValue = await siMinMax.getProperty("value");
		const maxValue = await siMinMax.getProperty("max");

		await siMinMax.setProperty("value", maxValue - 1);

		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is not increased to " + (maxValue + 1));
	});

	it("'Decrease' button decreases the value if it is greater than 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const decButton = await siMinMax.shadow$(".ui5-step-dec");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", maxValue);

		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue - 1, "Value is increased correctly to " + (maxValue - 1));
		await decButton.click();
		await decButton.click();
		await decButton.click();
		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue - 5, "Value is increased correctly to " + (maxValue - 5));
	});

	it("'Decrease' button does not decrease the value if it is less than 'min'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const decButton = await siMinMax.shadow$(".ui5-step-dec");
		const minValue = await siMinMax.getProperty("min");

		await siMinMax.setProperty("value", minValue + 1);

		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is decreased correctly to " + minValue);
		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is not decreased to " + (minValue - 1));
	});

});

describe("'change' event firing", () => {

	it("'Increase' and 'Decrease' buttons should fire 'change' event on each click only if value is between 'min' and 'max'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const incButton = await siMinMax.shadow$(".ui5-step-inc");
		const decButton = await siMinMax.shadow$(".ui5-step-dec");
		const changeResult = await browser.$("#changeResult");
		const maxValue = await siMinMax.getProperty("max");
		const minValue = await siMinMax.getProperty("min");

		await incButton.click();
		await incButton.click();
		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 3, "'change' event is fired 3 times");
		await incButton.click();
		await incButton.click();
		await incButton.click();
		await incButton.click();
		await incButton.click();
		await incButton.click();
		await incButton.click();
		// 2 more clicks after max is reached
		await incButton.click();
		await incButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), maxValue, "Value is increased correctly to " + maxValue);
		assert.strictEqual(Number(await changeResult.getProperty("value")), 10, "'change' event is fired only 10 times");

		await decButton.click();
		await decButton.click();
		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 7, "Value is increased correctly to 7");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 13, "'change' event is fired 13 times");
		await decButton.click();
		await decButton.click();
		await decButton.click();
		await decButton.click();
		await decButton.click();
		await decButton.click();
		await decButton.click();
		// 2 more clicks after min is reached
		await decButton.click();
		await decButton.click();
		assert.strictEqual(await siMinMax.getProperty("value"), minValue, "Value is increased correctly to " + minValue);
		assert.strictEqual(Number(await changeResult.getProperty("value")), 20, "'change' event is fired only 20 times");
	});

	it("'change' event should not be fired when 'ArrowUp'/'ArrowDown' are pressed without 'Enter' after that", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		assert.strictEqual(await siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
	});

	it("'change' event should not be fired when previous value is restored with 'Escape'", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
		await siMinMax.keys("Escape");
		assert.strictEqual(await siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 0, "'change' event is fired 0 times");
	});

	it("'change' event should be fired when 'ArrowUp'/'ArrowDown' are pressed with 'Enter' after that", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("Enter");
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("ArrowDown");
		await siMinMax.keys("Enter");
		assert.strictEqual(await siMinMax.getProperty("value"), 0, "Value is increased correctly to 0");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired after manual entry and 'Enter' pressed after that", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.doubleClick();
		await siMinMax.keys("1");
		await siMinMax.keys("Enter");
		assert.strictEqual(await siMinMax.getProperty("value"), 1, "Value is increased correctly to 1");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		await siMinMax.doubleClick();
		await siMinMax.keys("6");
		await siMinMax.keys("Enter");
		assert.strictEqual(await siMinMax.getProperty("value"), 6, "Value is increased correctly to 6");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired after focus out", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siCozy.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		await siMinMax.doubleClick();
		await siMinMax.keys("1");
		await siCozy.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 1, "Value is increased correctly to 1");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired once after element deleted and focus out", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const siMinMax = await browser.$("#stepInputMinMax");
		const changeResult = await browser.$("#changeResult");

		await siMinMax.click();
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siMinMax.keys("ArrowUp");
		await siCozy.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 3, "Value is increased correctly to 3");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 1, "'change' event is fired 1 time");
		await siMinMax.doubleClick();
		await siMinMax.keys("Backspace");
		await siCozy.click();
		assert.strictEqual(await siMinMax.getProperty("value"), 0, "Value is increased correctly to 1");
		assert.strictEqual(Number(await changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

	it("'change' event should be fired after changing value programatically and then manual entry of the previous value and focus out", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siChange1 = await browser.$("#stepInputChange1");
		const siChange2 = await browser.$("#stepInputChange2");
		const incButton = await siChange1.shadow$(".ui5-step-inc");
		const initValue1 = await siChange1.getProperty("value");
		const initValue2 = await siChange2.getProperty("value");
		const changeResult = await browser.$("#changeResult");

		await incButton.click();
		const newValue1 = await siChange1.getProperty("value");
		assert.strictEqual(await siChange1.getProperty("value"), initValue1 + 1000, "Value of the first step input is increased correctly to " + (initValue1 + 1000));
		assert.strictEqual(await siChange2.getProperty("value"), newValue1 + 999, "Value of the second step input is increased correctly to " + (newValue1 + 999));
		assert.strictEqual(Number(await changeResult.getProperty("value")), 1, "'change' event is fired 1 time");

		await siChange2.doubleClick();
		await siChange2.keys(initValue2.toString());
		await siChange2.keys("Tab");
		assert.strictEqual(await siChange2.getProperty("value"), initValue2, "Value of the second step input is set correctly to " + initValue2);
		assert.strictEqual(Number(await changeResult.getProperty("value")), 2, "'change' event is fired 2 times");
	});

});

describe("Accessibility related parameters", async () => {

	it("'step', 'min', 'max', 'aria-required' and 'aria-label' attributes presence", async () => {
		await browser.url(`test/pages/StepInput.html`);
		const siCozy = await browser.$("#stepInputCozy");
		const siInner = await siCozy.shadow$('.ui5-step-input-input').shadow$("input");

		assert.strictEqual(await siInner.getAttribute("min"), null, "'min' attribute doesn't exist");
		assert.strictEqual(await siInner.getAttribute("max"), null, "'max' attribute doesn't exist");
		await siCozy.setProperty("step", 5);
		await siCozy.setProperty("min", -10);
		await siCozy.setProperty("max", 20);
		await siCozy.setProperty("required", true);
		await siCozy.setProperty("accessibleName", "test-aria-label");

		assert.strictEqual(await siInner.getAttribute("step"), "5", "'step' attribute exists and has correct value 5");
		assert.strictEqual(await siInner.getAttribute("min"), "-10", "'min' attribute exists and has correct value -10");
		assert.strictEqual(await siInner.getAttribute("max"), "20", "'max' attribute exists and has correct value 20");
		assert.strictEqual(await siInner.getAttribute("aria-required"), "true", "'required' attribute exists");
		assert.strictEqual(await siInner.getAttribute("aria-label"), "test-aria-label", "'aria-label' attribute exists and has correct value 'test-aria-label'");
	});

});