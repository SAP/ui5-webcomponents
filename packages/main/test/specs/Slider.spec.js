const assert = require("chai").assert;

describe("Slider basic interactions", () => {
	browser.url("http://localhost:8080/test-resources/pages/Slider.html");

	it("Changing the current value is reflected", () => {
		const slider = browser.$("#basic-slider");
		const sliderHandle = slider.shadow$(".ui5-slider-handle");

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 0%;", "Initially if no value is set, the Slider handle is at the beginning of the Slider");

		browser.setWindowSize(1257, 2000);
		slider.setProperty("value", 3);

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 30%;", "Slider handle should be 30% from the start");

		slider.moveTo();
		slider.click();

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(slider.getProperty("value"), 5, "Slider current value should be 5");

		sliderHandle.dragAndDrop({ x: 300, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 80%;", "Slider handle should be 80% from the start of the slider");
		assert.strictEqual(slider.getProperty("value"), 8, "Slider current value should be 8");

		sliderHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 90%;", "Slider handle should be 90% from the start");
		assert.strictEqual(slider.getProperty("value"), 9, "Slider current value should be 9");

		sliderHandle.dragAndDrop({ x: 150, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 100%;", "Slider handle should be at the end of the slider and not beyond its boundaries");
		assert.strictEqual(slider.getProperty("value"), 10, "Slider current value should be 10");
	});

	it("Slider with floating min, max and step property", () => {
		const slider = browser.$("#basic-slider");

		slider.setProperty("min", -12.5);
		slider.setProperty("max", 47.5);
		slider.setProperty("step", 1.25);
		slider.setProperty("value", 21.25);

		slider.click({ x: -100 });
		assert.strictEqual(slider.getProperty("value"), 12.5, "Slider value should be lowered to 12.5");
	});

	it("Slider should not be interactive if the step property is 0", () => {
		const slider = browser.$("#inactive-slider");

		slider.click({ x: 200 });

		assert.strictEqual(slider.getProperty("value"), 0, "Slider with 0 step should still has its default value of 0");
	});

	it("Disabled slider is not interactive", () => {
		const slider = browser.$("#disabled-slider-with-tickmarks");

		slider.click({ x: 100 });

		assert.strictEqual(slider.getProperty("value"), 20, "Slider value should be the initially set one");
	});
});


describe("Slider elements - tooltip, step, tickmarks, labels", () => {

	it("Slider Tooltip is displayed showing the current value", () => {
		const slider = browser.$("#basic-slider-with-tooltip");
		const sliderTooltip = slider.shadow$(".ui5-slider-tooltip");
		const sliderHandle = slider.shadow$(".ui5-slider-handle");
		const sliderTooltipValue = slider.shadow$(".ui5-slider-tooltip-value");

		slider.moveTo();

		assert.strictEqual(slider.getProperty("_tooltipVisibility"), "visible", "Slider tooltip visibility property should be 'visible'");
		assert.strictEqual(sliderTooltip.getAttribute("style"), "visibility: visible;", "Slider tooltip should be shown");

		sliderHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(sliderTooltipValue.getText(), "2", "Slider tooltip should display value of 2");
	});

	it("Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", () => {
		const slider = browser.$("#slider-tickmarks-tooltips-labels");
		const labelsContainer = slider.shadow$(".ui5-slider-labels");
		const numberOfLabels = labelsContainer.$$("li").length;

		assert.strictEqual(numberOfLabels, 17, "17 labels should be rendered, 1 between each 3 tickmarks");
	});
});

describe("Properties synchronization and normalization", () => {

	it("If a negative number is set to the step property it should beconverted it to its positive equivalent", () => {
		const slider = browser.$("#slider-tickmarks-tooltips-labels");

		slider.setProperty("step", -15);

		assert.strictEqual(slider.getProperty("step"), 15, "Step value should be a positive number");
	});

	it("Should fallback to default value of 1 if step property is not a valid number", () => {
		const slider = browser.$("#slider-tickmarks-tooltips-labels");

		slider.setProperty("step", "String value");

		assert.strictEqual(slider.getProperty("step"), 1, "Step value should be its default value");
	});

	it("If min property is set to a greater number than the max property they should be swapped", () => {
		const slider = browser.$("#basic-slider");

		slider.setProperty("max", 10);
		slider.setProperty("min", 100);

		assert.strictEqual(slider.getProperty("min"), 10, "min property should be less than the max one");
		assert.strictEqual(slider.getProperty("max"), 100, "max property should be greater than the min one");
		assert.strictEqual(slider.getProperty("value"), 10, "value property should be within the boundaries of the swapped min and max props");

		slider.setProperty("min", 200);

		assert.strictEqual(slider.getProperty("min"), 100, "min property should be the 100");
		assert.strictEqual(slider.getProperty("max"), 200, "max property should be 200");
		assert.strictEqual(slider.getProperty("value"), 100, "value property should be within the boundaries of the swapped min and max props");
	});

	it("Should keep the current value between the boundaries of min and max properties", () => {
		const slider = browser.$("#basic-slider");

		slider.setProperty("value", 300);

		assert.strictEqual(slider.getProperty("value"), 200, "value prop should always be lower than the max value");

		slider.setProperty("value", 99);

		assert.strictEqual(slider.getProperty("value"), 100, "value prop should always be greater than the min value");
	});

	it("Should not 'stepify' current value if it is not in result of user interaction", () => {
		const slider = browser.$("#tickmarks-slider");

		slider.setProperty("value", 13);

		assert.strictEqual(slider.getProperty("value"), 13, "current value should not be stepped to the next step (14)");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", () => {
		const slider = browser.$("#basic-slider");
		const sliderHandle = slider.shadow$(".ui5-slider-handle");

		slider.setAttribute("dir", "rtl");
		slider.setProperty("min", 0);
		slider.setProperty("max", 10);
		slider.setProperty("step", 1);
		slider.setProperty("value", 0);

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 0%;", "Initially if no value is set, the Slider handle is at the beginning of the Slider");

		slider.setProperty("value", 3);

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 30%;", "Slider handle should be 30% from the start");

		slider.moveTo();
		slider.click();

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(slider.getProperty("value"), 5, "Slider current value should be 5");

		sliderHandle.dragAndDrop({ x: -300, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 80%;", "Slider handle should be 80% from the start of the slider");
		assert.strictEqual(slider.getProperty("value"), 8, "Slider current value should be 8");

		sliderHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 90%;", "Slider handle should be 90% from the start");
		assert.strictEqual(slider.getProperty("value"), 9, "Slider current value should be 9");

		sliderHandle.dragAndDrop({ x: -150, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 100%;", "Slider handle should be at the end of the slider and not beyond its boundaries");
		assert.strictEqual(slider.getProperty("value"), 10, "Slider current value should be 10");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", () => {
		const slider = browser.$("#slider-tickmarks-tooltips-labels");

		browser.setWindowSize(500, 2000);

		assert.strictEqual(slider.getProperty("_labelsOverlapping"), true, "state should reflect if any of the labels is overlapping with another");
		assert.strictEqual(slider.getProperty("_hiddenTickmarks"), true, "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});