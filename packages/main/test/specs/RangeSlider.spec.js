const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Testing Range Slider interactions", () => {

	it("Changing the current startValue is reflected", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);
		await browser.setWindowSize(1257, 2000);

		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:0%;", "Initially if no value is set, the Range Slider start-handle is at the beginning of the Range Slider");

		await rangeSlider.setProperty("startValue", 5);

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:12.5%;", "Start-handle should be 12.5% from the start");

		await startHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:20%;", "Start-handle should be 20% from the start of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 8, "Range Slider startValue should be 8");

		await startHandle.click({ x: -100 });

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:12.5%;", "Start-handle should be again 12.5% from the start");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 5, "Current startValue should be again 5");
	});

	it("Changing the endValue is reflected", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		assert.strictEqual((await endHandle.getAttribute("style")).replace(" ", ""), "left:50%;", "Range Slider end-handle is should be 50% from the start the Range Slider");
		await rangeSlider.setProperty("endValue", 10);

		assert.strictEqual((await endHandle.getAttribute("style")).replace(" ", ""), "left:25%;", "End-handle should be 25% from the start");

		await rangeSlider.click();

		assert.strictEqual((await endHandle.getAttribute("style")).replace(" ", ""), "left:50%;", "Range Slider end-handle should be in the middle of the slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "Range Slider endValue should be 20");

		await endHandle.click({ x: 100 });

		assert.strictEqual((await endHandle.getAttribute("style")).replace(" ", ""), "left:57.5%;", "End-handle should be 57.5%% from the start of the Range slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 23, "Range Slider current endValue should be 23");

		await endHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual((await endHandle.getAttribute("style")).replace(" ", ""), "left:50%;", "End-handle should be back to 50% from the start of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "Current endValue should be 20");
	});

	it("Click within the selected range should not change any value", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");

		await rangeSlider.setProperty("endValue", 30);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 5, "startValue should be 5");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "endValue value should be 30");

		await rangeSlider.click();

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 5, "startValue should still be 5");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "endValue value should still be 30");
	});

	it("Dragging the selected range should change both values and handles", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 8, "startValue should be 8");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 33, "endValue should be 33");
	});

	it("Dragging the start-handle pass the end-handle should swap the values", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.setProperty("endValue", 9);

		await startHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 9, "startValue should swapped with the endValue and should be 9");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 11, "endValue should swapped with the startValue and should be 11");
	});

	it("Dragging the whole range selection should always keep the initially selected range and be within min/max values", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.setProperty("endValue", 30);

		await rangeSlider.dragAndDrop({ x: -500, y: 1 });

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "startValue should be 0 as the selected range has reached the start of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "endValue should be 21 and no less, the initially selected range should be preserved");

		await rangeSlider.dragAndDrop({ x: 600, y: 1 });

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 19, "startValue should be 19 and no more, the initially selected range should be preserved");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 40, "endValue should be 40 as the selected range has reached the end of the Range Slider");
	});

	it("Range Slider should not be interactive if the step property is 0", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await rangeSlider.setProperty("step", 0);
		await rangeSlider.click();

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "Range Slider endValue should be the same");
	});

	it("Disabled Range Slider is not interactive", async () => {
		const rangeSlider = await browser.$("#disabled-range-slider");

		assert.notOk(await rangeSlider.isClickable(), "Range Slider should be disabled");
	});
});

describe("Range Slider elements - tooltip, step, tickmarks, labels", () => {
	it("Range Slider tooltips are displayed showing the current value", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
		const rangeSliderStartTooltipValue = await rangeSliderStartTooltip.shadow$(".ui5-slider-tooltip-value");
		const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
		const rangeSliderEndTooltipValue = await rangeSliderEndTooltip.shadow$(".ui5-slider-tooltip-value");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.moveTo();

		assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "visible", "Range Slider tooltips visibility property should be 'visible'");
		assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: visible;", "Range Slider start tooltip should be shown");
		assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: visible;", "Range Slider end tooltip should be shown");

		await rangeSlider.setProperty("startValue", 65);
		await rangeSlider.moveTo();

		assert.strictEqual(await rangeSliderStartTooltipValue.getText(), "65", "Range Slider start tooltip should display value of 65");

		await rangeSlider.setProperty("endValue", 115);
		await rangeSlider.moveTo();

		assert.strictEqual(await rangeSliderEndTooltipValue.getText(), "115", "Range Slider end tooltip should display value of 65");
	});

	it("Range Slider tooltips should become visible when range slider is focused", async () => {
		const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
		const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
		const otherRangeSlider = await browser.$("#basic-range-slider");

		await otherRangeSlider.moveTo();
		await otherRangeSlider.click();
		await browser.keys("Tab");

		assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "visible", "Range Slider tooltips visibility property should be 'visible'");
		assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: visible;", "Range Slider start tooltip should be shown");
		assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: visible;", "Range Slider end tooltip should be shown");
	});

	it("Range Slider tooltips should stay visible when mouse is moved out but range slider is still focused", async () => {
		const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
		const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
		const otherRangeSlider = await browser.$("#basic-range-slider");

		await rangeSlider.moveTo();
		await otherRangeSlider.moveTo();

		assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "visible", "Range Slider tooltips visibility property should be 'visible'");
		assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: visible;", "Range Slider start tooltip should be shown");
		assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: visible;", "Range Slider end tooltip should be shown");
	});

	it("Range Slider tooltips should become hidden if the range slider looses the focus", async () => {
		const rangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderStartTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--start");
		const rangeSliderEndTooltip = await rangeSlider.shadow$(".ui5-slider-tooltip--end");
		const otherRangeSlider = await browser.$("#basic-range-slider");

		await otherRangeSlider.moveTo();
		await otherRangeSlider.click();

		assert.strictEqual(await rangeSlider.getProperty("_tooltipVisibility"), "hidden", "Range Slider tooltips visibility property should be 'hidden'");
		assert.strictEqual(await rangeSliderStartTooltip.getAttribute("style"), "visibility: hidden;", "Range Slider start tooltip should be hidden");
		assert.strictEqual(await rangeSliderEndTooltip.getAttribute("style"), "visibility: hidden;", "Range Slider end tooltip should be hidden");

	});

	it("Range Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
		const labelsContainer = await rangeSlider.shadow$(".ui5-slider-labels");
		const numberOfLabels = (await labelsContainer.$$("li")).length;

		assert.strictEqual(numberOfLabels, 12, "12 labels should be rendered, 1 between every 4 tickmarks");
	});
});

describe("Properties synchronization and normalization", () => {

	it("Should fallback to default value of 1 if step property is not a valid number", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("step", "String value");

		assert.strictEqual(await rangeSlider.getProperty("step"), 1, "Step value should be its default value");
	});

	it("If a negative number is set to the step property its positive equivalent should be used as effective value", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("step", -7);

		assert.strictEqual(await rangeSlider.getProperty("step"), -7, "Step value should be a positive number");

		await rangeSlider.click();

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "The current value should be 'stepified' by 7");
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("startValue", 2);
		await rangeSlider.setProperty("max", 10);
		await rangeSlider.setProperty("min", 100);

		assert.strictEqual(await rangeSlider.getProperty("min"), 100, "min property itself should not be normalized");
		assert.strictEqual(await rangeSlider.getProperty("max"), 10, "max property itself should not be normalized");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "startValue property should be within the boundaries of the effective (swapped) min and max props");
	});

	it("Should keep the current values between the boundaries of min and max properties", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("min", 100);
		await rangeSlider.setProperty("max", 200);

		await rangeSlider.setProperty("endValue", 300);

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 200, "value prop should always be lower than the max value");

		await rangeSlider.setProperty("startValue", 99);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 100, "value prop should always be greater than the min value");
	});

	it("Should not 'stepify' current value if it is not in result of user interaction", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("min", 0);
		await rangeSlider.setProperty("max", 44);
		await rangeSlider.setProperty("step", 1.25);
		await rangeSlider.setProperty("startValue", 14);
		await rangeSlider.setProperty("endValue", 24);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 14, "startValue should not be stepped to the next step (15)");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 24, "endValue should not be stepped to the next step (25)");
	});

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setProperty("max", 0);
		await rangeSlider.setProperty("min", 40);
		await rangeSlider.setProperty("step", 1);

		assert.strictEqual((await rangeSlider.getProperty("_labels")).length, 21, "Labels must be 21 - 1 for every 2 tickmarks (and steps)");

		await rangeSlider.setProperty("step", 2);

		assert.strictEqual((await rangeSlider.getProperty("_labels")).length, 11, "Labels must be 12 - 1 for every 2 tickmarks (and 4 current value points)");

		await rangeSlider.setProperty("labelInterval", 4);

		assert.strictEqual((await rangeSlider.getProperty("_labels")).length, 6, "Labels must be 6 - 1 for every 4 tickmarks (and 8 current value points)");
	});
});

describe("Testing events", () => {

	it("Should fire input event on use interaction and change event after user interaction finish", async () => {
		const rangeSlider = await browser.$("#test-slider");
		const eventResultRangeSlider = await browser.$("#test-result-slider");

		await rangeSlider.click();

		assert.strictEqual(await eventResultRangeSlider.getProperty("endValue") , 4, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", async () => {
		const rangeSlider = await browser.$("#test-slider");
		const eventResultRangeSlider = await browser.$("#test-result-slider");

		await rangeSlider.click();

		assert.strictEqual(await eventResultRangeSlider.getProperty("endValue") , 4, "Change event is not fired if the value is the same as before the start of the action");
	});
});


describe("Accessibility", async () => {
	it("Aria attributes of the progress bar are set correctly", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const rangeSliderProgressBar = await rangeSlider.shadow$(".ui5-slider-progress");
		const rangeSliderId = await rangeSlider.getProperty("_id");

		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-labelledby"),
			`${rangeSliderId}-accName ${rangeSliderId}-sliderDesc`, "aria-labelledby is set correctly");
		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-valuemin"),
			`${await rangeSlider.getProperty("min")}`, "aria-valuemin is set correctly");
		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-valuemax"),
			`${await rangeSlider.getProperty("max")}`, "aria-valuemax is set correctly");
		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-valuetext"),
			`From ${await rangeSlider.getProperty("startValue")} to ${await rangeSlider.getProperty("endValue")}`, "aria-valuetext is set correctly");
	});

	it("Aria attributes of the start handle are set correctly", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const rangeSliderId = await rangeSlider.getProperty("_id");

		assert.strictEqual(await startHandle.getAttribute("aria-labelledby"),
			`${rangeSliderId}-accName ${rangeSliderId}-startHandleDesc`, "aria-labelledby is set correctly");
		assert.strictEqual(await startHandle.getAttribute("aria-valuemin"),
			`${await rangeSlider.getProperty("min")}`, "aria-valuemin is set correctly");
		assert.strictEqual(await startHandle.getAttribute("aria-valuemax"),
			`${await rangeSlider.getProperty("max")}`, "aria-valuemax is set correctly");
		assert.strictEqual(await startHandle.getAttribute("aria-valuenow"),
			`${await rangeSlider.getProperty("startValue")}`, "aria-valuenow is set correctly");
	});

	it("Aria attributes of the end handle are set correctly", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");
		const rangeSliderId = await rangeSlider.getProperty("_id");

		assert.strictEqual(await endHandle.getAttribute("aria-labelledby"),
			`${rangeSliderId}-accName ${rangeSliderId}-endHandleDesc`, "aria-labelledby is set correctly");
		assert.strictEqual(await endHandle.getAttribute("aria-valuemin"),
			`${await rangeSlider.getProperty("min")}`, "aria-valuemin is set correctly");
		assert.strictEqual(await endHandle.getAttribute("aria-valuemax"),
			`${await rangeSlider.getProperty("max")}`, "aria-valuemax is set correctly");
		assert.strictEqual(await endHandle.getAttribute("aria-valuenow"),
			`${await rangeSlider.getProperty("endValue")}`, "aria-valuenow is set correctly");
	});

	it("Aria-labelledby text is mapped correctly when values are swapped", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const rangeSliderId = await rangeSlider.getProperty("_id");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const rangeSliderStartHandleSpan = await rangeSlider.shadow$(`#${rangeSliderId}-startHandleDesc`);
		const rangeSliderEndHandleSpan = await rangeSlider.shadow$(`#${rangeSliderId}-endHandleDesc`);

		await rangeSlider.setProperty("endValue", 9);
		await startHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(await rangeSliderStartHandleSpan.getText(), "Left handle", "Start Handle text is correct after swap");
		assert.strictEqual(await rangeSliderEndHandleSpan.getText(), "Right handle", "End Handle text is correct after swap");
	});

	it("Click anywhere in the  Range Slider should focus the closest handle", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderStartHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const rangeSliderEndHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.click();

		let innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderEndHandle.getAttribute("class"), "RangeSlider second handle has the shadowDom focus");

		await rangeSlider.setProperty("startValue", 30);
		await rangeSliderStartHandle.click({ x: -200});

		innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderStartHandle.getAttribute("class"), "RangeSlider second handle has the shadowDom focus");
	});

	it("Click currently selected range should focus it", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderSelection = await rangeSlider.shadow$(".ui5-slider-progress");

		await rangeSlider.setProperty("endValue", 60);
		await rangeSlider.click();

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderSelection.getAttribute("class"), "RangeSlider progress bar has the shadowDom focus");
	});


	it("When not yet focused, 'Tab' should focus the Range Slider and move the focus to the progress bar", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderSelection = await rangeSlider.shadow$(".ui5-slider-progress");

		await browser.keys("Tab");

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.ok(await rangeSlider.isFocused(), "Range Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderSelection.getAttribute("class"), "Range Slider progress tracker has the shadowDom focus");
	});

	it("When progress bar has the focus, 'Tab' should move the focus to the first handle", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderStartHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		await browser.keys("Tab");

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderStartHandle.getAttribute("class"), "Range Slider first handle has the hadowDom focus");
	});

	it("When the first handle has the focus, 'Tab' should focus the second handle", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderEndHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await browser.keys("Tab");

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderEndHandle.getAttribute("class"), "Range Slider second handle has the shadowDom focus");
	});

	it("When the second handle has the focus, 'Tab' should move the focus away from the Range Slider", async () => {
		const currentRangeSlider = await browser.$("#basic-range-slider");
		const nextRangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderSelection = await nextRangeSlider.shadow$(".ui5-slider-progress");

		await browser.keys("Tab");

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider-with-tooltip");

		assert.notOk(await currentRangeSlider.isFocused(), "First RangeSlider component is now not focused");

		assert.ok(await nextRangeSlider.isFocused(), "Next RangeSlider is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderSelection.getAttribute("class"), "Next Range Slider second handle has the shadowDom focus");
	});

	it("Shift+Tab should focus the previous Range Slider and move the focus to its second handle", async () => {
		const currentRangeSlider = await browser.$("#basic-range-slider-with-tooltip");
		const previousRangeSlider = await browser.$("#basic-range-slider");
		const previousRangeSliderEndHandle = await previousRangeSlider.shadow$(".ui5-slider-handle--end");

		await browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.notOk(await currentRangeSlider.isFocused(), "First RangeSlider component is now not focused");

		assert.ok(await previousRangeSlider.isFocused(), "Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await previousRangeSliderEndHandle.getAttribute("class"), "Previous Range Slider second handle now has the shadowDom focus");
	});

	it("When the second handle has the focus, 'Shift' + 'Tab' should move the focus to the first handle", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderStartHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		await browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderStartHandle.getAttribute("class"), "Range Slider first handle has the shadowDom focus");
	});

	it("When the first handle has the focus, 'Shift' + 'Tab' should move the focus to the progress bar", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderSelection = await rangeSlider.shadow$(".ui5-slider-progress");

		await browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderSelection.getAttribute("class"), "Range Slider first handle has the shadowDom focus");
	});

	it("When the progress bar has the focus, 'Shift' + 'Tab' should move the focus away from the Range Slider", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);

		assert.notOk(await rangeSlider.isFocused(), "First RangeSlider component is now not focused");
	});

	it("When one handle come across the other and the values are swapped the focus must be switched between the handles", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await startHandle.dragAndDrop({ x: 400, y: 1 });
		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});


describe("Accessibility: Testing keyboard handling", async () => {
	it("When progress bar is focused 'Right Arrow' key should increase both values of the Range Slider with a small increment step", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("Tab");
		await browser.keys("ArrowRight");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When progress bar is focused 'Left Arrow' key should decrease both values of the Range Slider with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("ArrowLeft");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Up Arrow' key should increase both values of the Range Slider with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("ArrowUp");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When progress bar is focused 'Down' key should decrease both values of the Range Slider with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("ArrowDown");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Control' + 'Right Arrow' key should increase both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Control' + 'Left Arrow' key should decrease both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Control' + 'Up Arrow' key should increase both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Control' + 'Down' key should decrease both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Page Up' key should increase both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("PageUp");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Page Down' key should decrease both values of the Range Slider with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("PageDown");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused the '+' key should increase both values of the Range Slider with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const numpadAdd = "\uE025";

		await browser.keys("+");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is increased");

		await browser.keys(numpadAdd);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 2, "start-value is increased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 22, "end-value is increased");
	});

	it("When progress bar is focused the '-' key should decrease both values of the Range Slider with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const numpadSubtract = "\uE027";

		await browser.keys("-");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is decreased");

		await browser.keys(numpadSubtract);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused an 'End' key press should offset the selected range to the end of the Range Slider", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("End");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 80, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 100, "end-value is decreased");
	});

	it("When progress bar is focused a 'Home' key press should offset the selected range to the start of the Range Slider", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("Home");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("A 'Esc' key press should return the values of the Range Slider at their initial point at the time of its focusing", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await rangeSlider.setProperty("startValue", 24);
		await rangeSlider.setProperty("endValue", 42);

		await browser.keys("Escape");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Right Arrow' key should increase its value with a small increment step", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("Tab");
		await browser.keys("Tab");
		await browser.keys("ArrowRight");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("ArrowRight");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When a handle is focused 'Left Arrow' key should decrease its value with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("ArrowLeft");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("ArrowLeft");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Up Arrow' key should increase its value with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("ArrowUp");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("ArrowUp");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is decreased");
	});

	it("When a handle is focused 'Down' key should decrease its value with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("ArrowDown");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("ArrowDown");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Control' + 'Right Arrow' key should increase its value with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When a handle is focused 'Control' + 'Left Arrow' key should decrease its vale with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		await browser.keys("Tab");
		await browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Control' + 'Up Arrow' key should increase its value with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When handle is focused 'Control' + 'Down' key should decrease its value with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		await browser.keys("Tab");
		await browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Page Up' key should increase its value with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		await browser.keys(["Shift", "Tab"]);
		await browser.keys("PageUp");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("PageUp");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When a handle is focused 'Page Down' key should decrease its value with a big increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("PageDown");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		await browser.keys("Tab");
		await browser.keys("PageDown");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle focused the '+' key should increase its value with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const numpadAdd = "\uE025";

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("+");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		await browser.keys(numpadAdd);
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 2, "start-value is increased");

		await browser.keys("Tab");
		await browser.keys("+");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is increased");

		await browser.keys(numpadAdd);
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 22, "end-value is increased");

	});

	it("When a handle focused the '-' key should decrease its value with a small increment step", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const numpadSubtract = "\uE027";

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("-");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 1, "start-value is decreased");

		await browser.keys(numpadSubtract);
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		await browser.keys("Tab");
		await browser.keys("-");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 21, "end-value is decreased");

		await browser.keys(numpadSubtract);
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 20, "end-value is decreased");

	});

	it("When a handle is focused an 'End' key press should set its value to the maximum allowed", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys("End");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 100, "end-value is decreased");
	});

	it("When a handle is focused a 'Home' key press should set its value to the start of the Range Slider", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");

		await browser.keys(["Shift", "Tab"]);
		await browser.keys("Home");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
	});

	it("When one handle come across the other and the values are swapped the focus must be switched between the handles", async () => {
		const rangeSlider = await browser.$("#basic-range-slider");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.setProperty("endValue", 20);
		await startHandle.click();
		await browser.keys("End");

		let innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await rangeSlider.getProperty("endValue"), 100, "The original end-value is set to min and switched as a start-value");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");

		await browser.keys("Home");

		innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "The original end-value is set to min and switched as a start-value");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await startHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.setAttribute("dir", "rtl");
		await rangeSlider.setProperty("min", 0);
		await rangeSlider.setProperty("max", 10);
		await rangeSlider.setProperty("step", 1);
		await rangeSlider.setProperty("startValue", 0);
		await rangeSlider.setProperty("endValue", 4);

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 0%;", "Initially if no value is set, the start-handle is 0% from the right side of the Range Slider");
		assert.strictEqual(await endHandle.getAttribute("style"), "right: 40%;", "End-handle should be 40 percent from the right side of the Range Slider");

		await rangeSlider.setProperty("startValue", 3);

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 30%;", "Start-handle should be 30% from the right end of the Range Slider");

		await rangeSlider.click();

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 50%;", "End-handle should be at the middle of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 5, "endValue should be 5");

		await endHandle.dragAndDrop({ x: -200, y: 1 });

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 80%;", "End-handle should be 80% from the right of the slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 8, "endValue should be 8");

		await endHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 90%;", "End-handle should be 90% from the right of the slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 9, "endValue should be 9");

		await startHandle.dragAndDrop({ x: 350, y: 1 });

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 0%;", "Slider handle should be 0% at the right of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "startValue should be 0");
	});

	it("Testing RTL KBH support", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");
		const rangeSliderSelection = await rangeSlider.shadow$(".ui5-slider-progress");
		
		await rangeSlider.setAttribute("dir", "rtl");
		await rangeSlider.setProperty("min", 0);
		await rangeSlider.setProperty("max", 10);
		await rangeSlider.setProperty("step", 1);
		await rangeSlider.setProperty("startValue", 3);
		await rangeSlider.setProperty("endValue", 7);

		const secondActiveTickmark = await rangeSlider.shadow$$(".ui5-slider-tickmark.ui5-slider-tickmark-in-range")[1];

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 30%;", "Initially if no value is set, the start-handle is 30% from the right side of the Range Slider");
		assert.strictEqual(await endHandle.getAttribute("style"), "right: 70%;", "End-handle should be 70% from the right side of the Range Slider");

		// Selection Range
		await secondActiveTickmark.click();
		await rangeSliderSelection.keys("ArrowLeft");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 40%;", "Start-handle is 40% from the right side of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 4, "startValue should be 4");
		assert.strictEqual(await endHandle.getAttribute("style"), "right: 80%;", "End-handle should be 80% from the right side of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 8, "startValue should be 8");

		await rangeSliderSelection.keys("ArrowRight");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 30%;", "Start-handle is 30% from the right side of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 3, "startValue should be 3");
		assert.strictEqual(await endHandle.getAttribute("style"), "right: 70%;", "End-handle should be 70% from the right side of the Range Slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 7, "startValue should be 7");

		// Start Handle
		await startHandle.click();
		await startHandle.keys("ArrowLeft");
		await startHandle.keys("ArrowLeft");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 50%;", "Start-handle should be 50% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 5, "startValue should be 5");

		await startHandle.keys("ArrowRight");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 40%;", "Start-handle should be 40% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 4, "startValue should be 4");

		await startHandle.keys("Home");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 0%;", "Start-handle should be 0% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "startValue should be 0");

		await startHandle.keys("ArrowRight");

		assert.strictEqual(await startHandle.getAttribute("style"), "right: 0%;", "Start-handle should be 0% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "startValue should be 0");

		// End Handle
		await endHandle.click();
		await endHandle.keys("ArrowLeft");
		await endHandle.keys("ArrowLeft");

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 90%;", "End-handle should be 90% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 9, "endValue should be 9");

		await endHandle.keys("ArrowRight");

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 80%;", "End-handle should be 80% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 8, "endValue should be 8");

		await endHandle.keys("End");

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 100%;", "End-handle should be 100% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 10, "endValue should be 10");

		await endHandle.keys("ArrowLeft");

		assert.strictEqual(await endHandle.getAttribute("style"), "right: 100%;", "End-handle should be 100% from the right of the range slider");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 10, "endValue should be 10");

	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks-labels");

		await rangeSlider.setAttribute("dir", "ltr");
		await rangeSlider.setProperty("min", 0);
		await rangeSlider.setProperty("max", 44);
		await rangeSlider.setProperty("step", 1.25);

		await browser.setWindowSize(400, 2000);

		assert.ok(await rangeSlider.getProperty("_labelsOverlapping"), "state should reflect if any of the labels is overlapping with another");
		assert.ok(await rangeSlider.getProperty("_hiddenTickmarks"), "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});
