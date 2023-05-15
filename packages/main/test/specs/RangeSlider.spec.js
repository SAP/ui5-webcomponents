import { assert } from "chai";

describe("Testing Range Slider interactions", () => {

	it("Changing the current startValue is reflected", async () => {
		await browser.url(`test/pages/RangeSlider.html`);
		await browser.setWindowSize(1257, 2000);

		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:0%;", "Initially if no value is set, the Range Slider start-handle is at the beginning of the Range Slider");

		await rangeSlider.setProperty("startValue", 5);

		assert.strictEqual((await startHandle.getAttribute("style")).replace(" ", ""), "left:12.5%;", "Start-handle should be 12.5% from the start");

		await startHandle.dragAndDrop({ x: 90, y: 1 });

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

		await rangeSlider.dragAndDrop({ x: 90, y: 1 });

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 8, "startValue should be 8");
		assert.strictEqual(await rangeSlider.getProperty("endValue"), 33, "endValue should be 33");
	});

	it("Dragging the start-handle pass the end-handle should swap the values", async () => {
		const rangeSlider = await browser.$("#range-slider-tickmarks");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await rangeSlider.setProperty("endValue", 9);
		await startHandle.dragAndDrop({ x: 90, y: 1 });
		await browser.pause(100);

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
		await browser.url(`test/pages/RangeSlider.html`);

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
		await browser.url(`test/pages/RangeSlider.html`);

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
