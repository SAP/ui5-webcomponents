import { assert } from "chai";

describe("Slider elements - tooltip, step, tickmarks, labels", () => {

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

	it("Slider Tooltip should not be closed on focusout if input tooltip is clicked", async () => {
		const slider = await browser.$("#slider-tickmarks-labels");
		const sliderTooltipInput = await slider.shadow$(".ui5-slider-tooltip ui5-input");

		await slider.click();
		assert.strictEqual(await slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");

		await sliderTooltipInput.click();

		assert.strictEqual(await sliderTooltipInput.getProperty("focused"), true, "The tooltip is not closed and the input is focused");
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

	it("Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", async () => {
		const slider = await browser.$("#slider-tickmarks-tooltips-labels");
		const labelsContainer = await slider.shadow$(".ui5-slider-labels");
		const numberOfLabels = (await labelsContainer.$$("li")).length;

		assert.strictEqual(numberOfLabels, 17, "17 labels should be rendered, 1 between each 3 tickmarks");
	});
});

describe("Accessibility", async () => {

	it("Click anywhere in the Slider should focus the Slider's handle", async () => {
		await browser.url(`test/pages/Slider.html`);

		const slider = await browser.$("#basic-slider");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		await slider.click();

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-slider");

		assert.ok(await slider.isFocused(), "Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await sliderHandle.getAttribute("class"), "Slider handle has the shadowDom focus");
	});
});


describe("Accessibility: Testing keyboard handling", async () => {

	it("Ctrl + Up arrow should increase the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys(["Control", "ArrowUp"]);
		assert.strictEqual(await slider.getProperty("value"), 2, "Value is increased");
	});

	it("Ctrl + Down arrow should increase the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys(["Control", "ArrowDown"]);
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});

	it("A numpad '+' key press should increase the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const numpadAdd = "\uE025";

		await browser.keys(numpadAdd);
		assert.strictEqual(await slider.getProperty("value"), 1, "Value is increased");
	});

	it("A numpad '-' key press should decrease the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const numpadSubtract = "\uE027";

		await browser.keys(numpadSubtract);
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", async () => {
		const slider = await browser.$("#basic-slider-rtl");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");
		const sliderHandleContainer = await slider.shadow$(".ui5-slider-handle-container");

		assert.strictEqual((await sliderHandleContainer.getCSSProperty("right")).value, "0px", "Initially if no value is set, the Slider handle is at the right of the Slider");

		await slider.setProperty("value", 3);
		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 30%;", "Slider handle should be 30% from the right");

		await slider.click();

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(await slider.getProperty("value"), 5, "Slider current value should be 5");

		await sliderHandle.dragAndDrop({ x: -300, y: 1 });

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 80%;", "Slider handle should be 80% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 8, "Slider current value should be 8");

		await sliderHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 90%;", "Slider handle should be 90% from the right");
		assert.strictEqual(await slider.getProperty("value"), 9, "Slider current value should be 9");

		await sliderHandle.dragAndDrop({ x: -150, y: 1 });

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 100%;", "Slider handle should be at the left of the slider and not beyond its boundaries");
		assert.strictEqual(await slider.getProperty("value"), 10, "Slider current value should be 10");
	});

	it("Testing RTL KBH support", async () => {
		const slider = await browser.$("#basic-slider-rtl");
		const sliderHandleContainer = await slider.shadow$(".ui5-slider-handle-container");

		await slider.setProperty("value", 0);
		assert.strictEqual((await sliderHandleContainer.getCSSProperty("right")).value, "0px", "Initially if no value is set, the Slider handle is at the right of the Slider");

		await slider.keys("ArrowLeft");
		await slider.keys("ArrowLeft");

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 20%;", "Slider handle should be 20% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 2, "Slider current value should be 2");

		await slider.keys("ArrowRight");

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 10%;", "Slider handle should be 10% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 1, "Slider current value should be 1");
	});

	it("Testing RTL KBH support - arrow up and down", async () => {
		const slider = await browser.$("#basic-slider-rtl");
		const sliderHandleContainer = await slider.shadow$(".ui5-slider-handle-container");

		await slider.setProperty("value", 0);
		assert.strictEqual((await sliderHandleContainer.getCSSProperty("right")).value, "0px", "Initially if no value is set, the Slider handle is at the right of the Slider");

		await slider.keys("ArrowUp");
		await slider.keys("ArrowUp");

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 20%;", "Slider handle should be 20% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 2, "Slider current value should be 2");

		await slider.keys("ArrowDown");

		assert.strictEqual(await sliderHandleContainer.getAttribute("style"), "right: 10%;", "Slider handle should be 10% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 1, "Slider current value should be 1");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", async () => {
		const slider = await browser.$("#slider-tickmarks-tooltips-labels");

		await browser.setWindowSize(400, 2000);

		assert.ok(await slider.getProperty("_labelsOverlapping"), "state should reflect if any of the labels is overlapping with another");
		assert.ok(await slider.getProperty("_hiddenTickmarks"), "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});
