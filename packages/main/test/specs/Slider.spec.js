import { assert } from "chai";

describe("Slider basic interactions", () => {

	it("Changing the current value is reflected", async () => {
		await browser.url(`test/pages/Slider.html`);

		const slider = await browser.$("#basic-slider");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		assert.strictEqual((await sliderHandle.getCSSProperty("left")).value, "0px", "Initially if no value is set, the Slider handle is at the beginning of the Slider");

		await browser.setWindowSize(1257, 2000);
		await slider.setProperty("value", 3);

		assert.strictEqual(await sliderHandle.getAttribute("style"), "left: 30%;", "Slider handle should be 30% from the start");

		await slider.click();

		assert.strictEqual(await sliderHandle.getAttribute("style"), "left: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(await slider.getProperty("value"), 5, "Slider current value should be 5");

		await sliderHandle.dragAndDrop({ x: 300, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "left: 80%;", "Slider handle should be 80% from the start of the slider");
		assert.strictEqual(await slider.getProperty("value"), 8, "Slider current value should be 8");

		await sliderHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "left: 90%;", "Slider handle should be 90% from the start");
		assert.strictEqual(await slider.getProperty("value"), 9, "Slider current value should be 9");

		await sliderHandle.dragAndDrop({ x:-100, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "left: 80%;", "Slider handle should be at the end of the slider and not beyond its boundaries");
		assert.strictEqual(await slider.getProperty("value"), 8, "Slider current value should be 8");
	});

	it("Slider with floating min, max and step property", async () => {
		const slider = await browser.$("#basic-slider");

		await slider.setProperty("min", -12.5);
		await slider.setProperty("max", 47.5);
		await slider.setProperty("step", 1.25);
		await slider.setProperty("value", 21.25);

		await slider.click({ x: -100 });
		assert.strictEqual(await slider.getProperty("value"), 12.5, "Slider value should be lowered to 12.5");
	});

	it("Slider should not be interactive if the step property is 0", async () => {
		const slider = await browser.$("#inactive-slider");

		await slider.click();

		assert.strictEqual(await slider.getProperty("value"), 0, "Slider with 0 step should still has its default value of 0");
	});

	it("Disabled slider is not interactive", async () => {
		const slider = await browser.$("#disabled-slider-with-tickmarks");

		assert.notOk(await slider.isClickable(), "Range Slider should be disabled");
	});
});

describe("Properties synchronization and normalization", () => {

	it("If a negative number is set to the step property its positive equivalent should be used as effective value", async () => {
		const slider = await browser.$("#slider-tickmarks-labels");

		await slider.setProperty("step", -7);

		assert.strictEqual(await slider.getProperty("step"), -7, "The step property should not be changed itself");

		await slider.click();

		assert.strictEqual(await slider.getProperty("value"), 1, "The current value should be 'stepified' by 7");
	});

	it("If step property is not a valid number its value should fallback to 1", async () => {
		const slider = await browser.$("#slider-tickmarks-labels");

		await slider.setProperty("step", 2);
		await slider.setProperty("step", "String value");
		await slider.click();

		assert.strictEqual(await slider.getProperty("step"), 1, "Step property should be set to its defaut value");
		assert.strictEqual(await slider.getProperty("value"), 0, "The current value should be 'stepified' by 1");
	});

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", async () => {
		const slider = await browser.$("#slider-tickmarks-labels");

		assert.strictEqual((await slider.getProperty("_labels")).length, 21, "Labels must be 21 - 1 for every 2 tickmarks (and steps)");

		await slider.setProperty("step", 2);

		assert.strictEqual((await slider.getProperty("_labels")).length, 11, "Labels must be 12 - 1 for every 2 tickmarks (and 4 current value points)");

		await slider.setProperty("labelInterval", 4);

		assert.strictEqual((await slider.getProperty("_labels")).length, 6, "Labels must be 6 - 1 for every 4 tickmarks (and 8 current value points)");
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", async () => {
		const slider = await browser.$("#basic-slider");

		await slider.setProperty("value", 2);
		await slider.setProperty("max", 10);
		await slider.setProperty("min", 100);

		assert.strictEqual(await slider.getProperty("max"), 10, "min property itself should not be normalized");
		assert.strictEqual(await slider.getProperty("min"), 100, "max property itself should not be normalized");
		assert.strictEqual(await slider.getProperty("value"), 10, "value property should be within the boundaries of the normalized 'effective' min and max values");
	});

	it("Should keep the current value between the boundaries of min and max properties", async () => {
		const slider = await browser.$("#basic-slider");

		await slider.setProperty("min", 100);
		await slider.setProperty("max", 200);
		await slider.setProperty("value", 300);

		assert.strictEqual(await slider.getProperty("value"), 200, "value prop should always be lower than the max value");

		await slider.setProperty("value", 99);

		assert.strictEqual(await slider.getProperty("value"), 100, "value prop should always be greater than the min value");
	});
});

describe("Slider elements - tooltip, step, tickmarks, labels", () => {

	it("Slider Tooltip is displayed showing the current value", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const sliderTooltip = await slider.shadow$(".ui5-slider-tooltip");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");
		const sliderTooltipValue = await slider.shadow$(".ui5-slider-tooltip-value");

		await slider.moveTo();

		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "visible", "Slider tooltip should be shown");

		await sliderHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(await sliderTooltipValue.getText(), "2", "Slider tooltip should display value of 2");
	});

	it("Slider Tooltip should become visible when slider is focused", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const sliderTooltip = await slider.shadow$(".ui5-slider-tooltip");
		const basicSlider = await browser.$("#basic-slider");

		await basicSlider.click();

		// initial state
		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "hidden", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "hidden", "Slider tooltip should be shown");

		await slider.click();

		// slider is focused
		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "visible", "Slider tooltip should be shown");
	});

	it("Slider Tooltip should stay visible when slider is focused and mouse moves away", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const sliderTooltip = await slider.shadow$(".ui5-slider-tooltip");

		await slider.click();

		// slider is focused
		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "visible", "Slider tooltip should be shown");

		// move mouse away - fires mouseout
		await slider.moveTo(0, -100);

		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "visible", "Slider tooltip should be shown");
	});

	it("Slider Tooltip should become hidden when slider is looses focus", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const anotherSlider = await browser.$("#basic-slider");
		const sliderTooltip = await slider.shadow$(".ui5-slider-tooltip");

		await slider.click();

		// slider is focused
		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "visible", "Slider tooltip should be shown");

		// move mouse away - fires mouseout
		await anotherSlider.click();

		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "hidden", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual((await sliderTooltip.getCSSProperty("visibility")).value, "hidden", "Slider tooltip should be shown");
	});

	it("Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", async () => {
		const slider = await browser.$("#slider-tickmarks-tooltips-labels");
		const labelsContainer = await slider.shadow$(".ui5-slider-labels");
		const numberOfLabels = (await labelsContainer.$$("li")).length;

		assert.strictEqual(numberOfLabels, 17, "17 labels should be rendered, 1 between each 3 tickmarks");
	});

	it("Should not 'stepify' current value if it is not in result of user interaction", async () => {
		const slider = await browser.$("#tickmarks-slider");

		await slider.setProperty("value", 13);

		assert.strictEqual(await slider.getProperty("value"), 13, "current value should not be stepped to the next step (14)");
	});
});
