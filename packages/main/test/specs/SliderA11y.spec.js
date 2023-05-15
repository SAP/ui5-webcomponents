import { assert } from "chai";

describe("Accessibility", async () => {
	it("Aria attributes are set correctly", async () => {
		await browser.url(`test/pages/Slider.html`);

		const slider = await browser.$("#basic-slider");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");
		const sliderId = await slider.getProperty("_id");

		assert.strictEqual(await sliderHandle.getAttribute("aria-labelledby"),
			`${sliderId}-accName ${sliderId}-sliderDesc`, "aria-labelledby is set correctly");
		assert.strictEqual(await sliderHandle.getAttribute("aria-valuemin"),
			`${await slider.getProperty("min")}`, "aria-valuemin is set correctly");
		assert.strictEqual(await sliderHandle.getAttribute("aria-valuemax"),
			`${await slider.getProperty("max")}`, "aria-valuemax is set correctly");
		assert.strictEqual(await sliderHandle.getAttribute("aria-valuenow"),
			`${await slider.getProperty("value")}`, "aria-valuenow is set correctly");
	});

	it("Click anywhere in the Slider should focus the Slider's handle", async () => {
		await browser.url(`test/pages/Slider.html`);

		const slider = await browser.$("#basic-slider");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		await slider.click();

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-slider");

		assert.ok(await slider.isFocused(), "Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await sliderHandle.getAttribute("class"), "Slider handle has the shadowDom focus");
	});

	it("Tab should focus the Slider and move the visible focus outline to the slider's handle", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		await browser.keys("Tab");

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-slider-with-tooltip");

		assert.ok(await slider.isFocused(), "Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await sliderHandle.getAttribute("class"), "Slider handle has the shadowDom focus");
	});

	it("Shift+Tab should focus the previous Slider and move the visible focus outline to the previous slider's handle", async () => {
		const slider = await browser.$("#basic-slider");
		const sliderHandle = await slider.shadow$(".ui5-slider-handle");

		await browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = await browser.custom$("activeElement", "#basic-slider");

		assert.ok(await slider.isFocused(), "Slider component is focused");
		assert.strictEqual(await browser.$(innerFocusedElement).getAttribute("class"), await sliderHandle.getAttribute("class"), "Slider handle has the shadowDom focus");
	});
});

describe("Accessibility: Testing keyboard handling", async () => {
	it("Right arrow should increase the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider");

		await slider.setProperty("value", 0);
		await browser.keys("ArrowRight");

		assert.strictEqual(await slider.getProperty("value"), 1, "Value is increased");
	});

	it("Left arrow should decrease the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider");

		await browser.keys("ArrowLeft");
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});

	it("Up arrow should increase the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider");

		await browser.keys("ArrowUp");
		assert.strictEqual(await slider.getProperty("value"), 1, "Value is increased");
	});

	it("Down arrow should increase the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider");

		await browser.keys("ArrowDown");
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});

	it("Ctrl + Right arrow should increase the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("Tab");
		await browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(await slider.getProperty("value"), 2, "Value is increased");
	});

	it("Ctrl + Left arrow should decrease the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys(["Control", "ArrowLeft"]);
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});

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

	it("PageUp should increase the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("PageUp");
		assert.strictEqual(await slider.getProperty("value"), 2, "Value is increased");
	});

	it("PageDown should decrease the value of the slider with a big increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("PageDown");
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is decreased");
	});

	it("A '+' key press should increase the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("+");
		assert.strictEqual(await slider.getProperty("value"), 1, "Value is increased");
	});

	it("A '-' key press should decrease the value of the slider with a small increment step", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("-");
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

	it("An 'End' key press should increase the value of the slider to its max", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("End");
		assert.strictEqual(await slider.getProperty("value"), 20, "Value is decreased");
	});

	it("A 'Home' key press should set the value of the slider to its minimum", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await browser.keys("Home");
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is increased");
	});

	it("A 'Esc' key press should return the value of the slider at its initial point at the time of its focusing", async () => {
		const slider = await browser.$("#basic-slider-with-tooltip");

		await slider.setProperty("value", 12);

		await browser.keys("Escape");
		assert.strictEqual(await slider.getProperty("value"), 0, "Value is increased");
	});
});
