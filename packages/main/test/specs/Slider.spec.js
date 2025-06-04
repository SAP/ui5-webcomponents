import { assert } from "chai";

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
