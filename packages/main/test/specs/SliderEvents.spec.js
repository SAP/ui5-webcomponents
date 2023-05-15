import { assert } from "chai";

describe("Testing events", () => {

	it("Should fire input event on use interaction and change event after user interaction finish", async () => {
		await browser.url(`test/pages/Slider.html`);

		const slider = await browser.$("#test-slider");
		const eventResultSlider = await browser.$("#test-result-slider");

		await slider.click();

		assert.strictEqual(await eventResultSlider.getProperty("value") , 3, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", async () => {
		const slider = await browser.$("#test-slider");
		const eventResultSlider = await browser.$("#test-result-slider");

		await slider.click();

		assert.strictEqual(await eventResultSlider.getProperty("value") , 3, "Change event is not fired if the value is the same as before the start of the action");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", async () => {
		const slider = await browser.$("#basic-slider-rtl");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		assert.strictEqual((await sliderHandle.getCSSProperty("right")).value, "0px", "Initially if no value is set, the Slider handle is at the right of the Slider");

		await slider.setProperty("value", 3);
		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 30%;", "Slider handle should be 30% from the right");

		await slider.click();

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(await slider.getProperty("value"), 5, "Slider current value should be 5");

		await sliderHandle.dragAndDrop({ x: -300, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 80%;", "Slider handle should be 80% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 8, "Slider current value should be 8");

		await sliderHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 90%;", "Slider handle should be 90% from the right");
		assert.strictEqual(await slider.getProperty("value"), 9, "Slider current value should be 9");

		await sliderHandle.dragAndDrop({ x: -150, y: 1 });

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 100%;", "Slider handle should be at the left of the slider and not beyond its boundaries");
		assert.strictEqual(await slider.getProperty("value"), 10, "Slider current value should be 10");
	});

	it("Testing RTL KBH support", async () => {
		const slider = await browser.$("#basic-slider-rtl");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		await slider.setProperty("value", 0);
		assert.strictEqual((await sliderHandle.getCSSProperty("right")).value, "0px", "Initially if no value is set, the Slider handle is at the right of the Slider");

		await slider.keys("ArrowLeft");
		await slider.keys("ArrowLeft");

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 20%;", "Slider handle should be 20% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 2, "Slider current value should be 2");

		await slider.keys("ArrowRight");

		assert.strictEqual(await sliderHandle.getAttribute("style"), "right: 10%;", "Slider handle should be 10% from the right of the slider");
		assert.strictEqual(await slider.getProperty("value"), 1, "Slider current value should be 1");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", async () => {
		const slider = await browser.$("#slider-tickmarks-tooltips-labels");

		await browser.setWindowSize(400, 2000);

		assert.ok(await slider.getProperty("_labelsOverlapping"), "state should reflect if any of the labels is overlapping with another");
		assert.ok(await slider.getProperty("_hiddenTickmarks"), "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});
