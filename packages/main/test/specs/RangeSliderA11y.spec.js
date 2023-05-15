import { assert } from "chai";

describe("Accessibility", async () => {
	it("Aria attributes of the progress bar are set correctly", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

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
		assert.strictEqual(await rangeSliderProgressBar.getAttribute("aria-valuenow"), "20", "aria-valuenow is set correctly");
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
		await browser.pause(100);

		assert.strictEqual(await rangeSliderStartHandleSpan.getText(), "Left handle", "Start Handle text is correct after swap");
		assert.strictEqual(await rangeSliderEndHandleSpan.getText(), "Right handle", "End Handle text is correct after swap");
	});

	it("Click anywhere in the  Range Slider should focus the closest handle", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

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
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const rangeSliderSelection = await rangeSlider.shadow$(".ui5-slider-progress");

		await rangeSlider.setProperty("endValue", 60);
		await rangeSlider.click();

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await rangeSliderSelection.getAttribute("class"), "RangeSlider progress bar has the shadowDom focus");
	});


	it("When not yet focused, 'Tab' should focus the Range Slider and move the focus to the progress bar", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

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
		await browser.pause(100);

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});

describe("Accessibility: Testing keyboard handling", async () => {
	it("When progress bar is focused 'Right Arrow' key should increase both values of the Range Slider with a small increment step", async () => {
		await browser.url(`test/pages/RangeSlider.html`);
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
		await browser.url(`test/pages/RangeSlider.html`);

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
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		await startHandle.click();
		await startHandle.dragAndDrop({ x: 800, y: 0 });
		await browser.pause(100);

		let innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.ok(await rangeSlider.getProperty("endValue") > await rangeSlider.getProperty("startValue"), "The original start-value is set to min and switched as a end-value");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});

	it("When one handle come across the other and the values are swapped the focus must be switched between the handles", async () => {
		await browser.url(`test/pages/RangeSlider.html`);

		const rangeSlider = await browser.$("#basic-range-slider");
		const startHandle = await rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = await rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.setProperty("startValue", 10);

		await endHandle.click();
		await endHandle.dragAndDrop({ x: -300, y: 0 });
		await browser.pause(100);

		let innerFocusedElement = await browser.custom$("activeElement", "#basic-range-slider");

		assert.strictEqual(await rangeSlider.getProperty("startValue"), 0, "The original end-value is set to min and switched as a start-value");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await startHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});
