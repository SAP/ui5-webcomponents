import { assert } from "chai";

describe("Testing events", () => {

	it("Should fire input event on use interaction and change event after user interaction finish", async () => {
		const rangeSlider = await browser.$("#test-slider");
		const eventResultRangeSlider = await browser.$("#test-result-slider");

		await rangeSlider.click();

		assert.strictEqual(await eventResultRangeSlider.getProperty("endValue") , 4, "Both input event and change event are fired after user interaction");
	});

	it("Should fire change event after swapping the values", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#test-slider");
		const firstHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");


		await firstHandle.click();
		await firstHandle.dragAndDrop({ x: 200, y: 0 });
		await browser.pause(100);

		const changeEventStartValue = await browser.execute(() => document.querySelector("#change-event-startValue").innerText);
		const changeEventEndValue = await browser.execute(() => document.querySelector("#change-event-endValue").innerText);

		assert.strictEqual(changeEventStartValue, "2", "Values are swapped prior to the firing of change event");
		assert.strictEqual(changeEventEndValue, "3", "Values are swapped prior to the firing of change event");
	});

	it("Should not fire change event if the values are the same after interaction", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#test-slider");
		const firstHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		await rangeSlider.setProperty("startValue", 0);
		await firstHandle.click();
		await firstHandle.keys("Home");

		const changeEventStartValue = await browser.execute(() => document.querySelector("#change-event-startValue").innerText);

		assert.strictEqual(changeEventStartValue, "", "Change event is not fired if no value is changed");
	});

	it("Should fire input event with correctly swiped values", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#test-slider");
		const rangeSliderProgressBar = await rangeSlider.shadow$(".ui5-slider-progress");
		const firstHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");

		await firstHandle.click();
		await firstHandle.dragAndDrop({ x: 200, y: 0 });
		await browser.pause(100);

		const inputEventStartValue = await browser.execute(() => document.querySelector("#input-event-startValue").innerText);
		const inputEventEndValue = await browser.execute(() => document.querySelector("#input-event-endValue").innerText);

		assert.strictEqual(inputEventStartValue, "2", "The input event is fired with the correct values");
		assert.strictEqual(inputEventEndValue, "3", "The input event is fired with the correct values");
		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-valuenow"), "1", "aria-valuenow is set correctly");
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#test-slider");
		const eventResultRangeSlider = await browser.$("#test-result-slider");

		await rangeSlider.click();

		assert.strictEqual(await eventResultRangeSlider.getProperty("endValue") , 4, "Change event is not fired if the value is the same as before the start of the action");
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
