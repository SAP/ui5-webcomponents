const assert = require("chai").assert;

describe("Slider basic interactions", () => {

	it("Changing the current value is reflected", () => {
		browser.url("http://localhost:8080/test-resources/pages/Slider.html");

		const slider = browser.$("#basic-slider");
		const sliderHandle = slider.shadow$(".ui5-slider-handle");

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 0%;", "Initially if no value is set, the Slider handle is at the beginning of the Slider");

		browser.setWindowSize(1257, 2000);
		slider.setProperty("value", 3);

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 30%;", "Slider handle should be 30% from the start");

		slider.click();

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(slider.getProperty("value"), 5, "Slider current value should be 5");

		sliderHandle.dragAndDrop({ x: 300, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 80%;", "Slider handle should be 80% from the start of the slider");
		assert.strictEqual(slider.getProperty("value"), 8, "Slider current value should be 8");

		sliderHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 90%;", "Slider handle should be 90% from the start");
		assert.strictEqual(slider.getProperty("value"), 9, "Slider current value should be 9");

		sliderHandle.dragAndDrop({ x:-100, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "left: 80%;", "Slider handle should be at the end of the slider and not beyond its boundaries");
		assert.strictEqual(slider.getProperty("value"), 8, "Slider current value should be 8");
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

		slider.click();

		assert.strictEqual(slider.getProperty("value"), 0, "Slider with 0 step should still has its default value of 0");
	});

	it("Disabled slider is not interactive", () => {
		const slider = browser.$("#disabled-slider-with-tickmarks");

		assert.strictEqual(slider.isClickable(), false, "Range Slider should be disabled");
	});
});

describe("Properties synchronization and normalization", () => {

	it("If a negative number is set to the step property its positive equivalent should be used as effective value", () => {
		const slider = browser.$("#slider-tickmarks-labels");

		slider.setProperty("step", -7);

		assert.strictEqual(slider.getProperty("step"), -7, "The step property should not be changed itself");

		slider.click();

		assert.strictEqual(slider.getProperty("value"), 1, "The current value should be 'stepified' by 7");
	});

	it("If step property is not a valid number its value should fallback to 1", () => {
		const slider = browser.$("#slider-tickmarks-labels");

		slider.setProperty("step", 2);
		slider.setProperty("step", "String value");
		slider.click();

		assert.strictEqual(slider.getProperty("step"), 1, "Step property should be set to its defaut value");
		assert.strictEqual(slider.getProperty("value"), 0, "The current value should be 'stepified' by 1");
	});

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", () => {
		const slider = browser.$("#slider-tickmarks-labels");

		assert.strictEqual(slider.getProperty("_labels").length, 21, "Labels must be 21 - 1 for every 2 tickmarks (and steps)");

		slider.setProperty("step", 2);

		assert.strictEqual(slider.getProperty("_labels").length, 11, "Labels must be 12 - 1 for every 2 tickmarks (and 4 current value points)");
		
		slider.setProperty("labelInterval", 4);

		assert.strictEqual(slider.getProperty("_labels").length, 6, "Labels must be 6 - 1 for every 4 tickmarks (and 8 current value points)");
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", () => {
		const slider = browser.$("#basic-slider");

		slider.setProperty("value", 2);
		slider.setProperty("max", 10);
		slider.setProperty("min", 100);

		assert.strictEqual(slider.getProperty("max"), 10, "min property itself should not be normalized");
		assert.strictEqual(slider.getProperty("min"), 100, "max property itself should not be normalized");
		assert.strictEqual(slider.getProperty("value"), 10, "value property should be within the boundaries of the normalized 'effective' min and max values");
	});

	it("Should keep the current value between the boundaries of min and max properties", () => {
		const slider = browser.$("#basic-slider");

		slider.setProperty("min", 100);
		slider.setProperty("max", 200);
		slider.setProperty("value", 300);

		assert.strictEqual(slider.getProperty("value"), 200, "value prop should always be lower than the max value");

		slider.setProperty("value", 99);

		assert.strictEqual(slider.getProperty("value"), 100, "value prop should always be greater than the min value");
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

	it("Should not 'stepify' current value if it is not in result of user interaction", () => {
		const slider = browser.$("#tickmarks-slider");

		slider.setProperty("value", 13);

		assert.strictEqual(slider.getProperty("value"), 13, "current value should not be stepped to the next step (14)");
	});
});

describe("Testing events", () => {

	it("Should fire input event on use interaction and change event after user interaction finish", () => {
		const slider = browser.$("#test-slider");
		const eventResultSlider = browser.$("#test-result-slider");

		slider.click();

		assert.strictEqual(eventResultSlider.getProperty("value") , 3, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", () => {
		const slider = browser.$("#test-slider");
		const eventResultSlider = browser.$("#test-result-slider");

		slider.click();

		assert.strictEqual(eventResultSlider.getProperty("value") , 3, "Change event is not fired if the value is the same as before the start of the action");
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

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 0%;", "Initially if no value is set, the Slider handle is at the right of the Slider");

		slider.setProperty("value", 3);

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 30%;", "Slider handle should be 30% from the right");

		slider.click();

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 50%;", "Slider handle should be in the middle of the slider");
		assert.strictEqual(slider.getProperty("value"), 5, "Slider current value should be 5");

		sliderHandle.dragAndDrop({ x: -300, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 80%;", "Slider handle should be 80% from the right of the slider");
		assert.strictEqual(slider.getProperty("value"), 8, "Slider current value should be 8");

		sliderHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 90%;", "Slider handle should be 90% from the right");
		assert.strictEqual(slider.getProperty("value"), 9, "Slider current value should be 9");

		sliderHandle.dragAndDrop({ x: -150, y: 1 });

		assert.strictEqual(sliderHandle.getAttribute("style"), "right: 100%;", "Slider handle should be at the left of the slider and not beyond its boundaries");
		assert.strictEqual(slider.getProperty("value"), 10, "Slider current value should be 10");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", () => {
		const slider = browser.$("#slider-tickmarks-tooltips-labels");

		browser.setWindowSize(400, 2000);

		assert.strictEqual(slider.getProperty("_labelsOverlapping"), true, "state should reflect if any of the labels is overlapping with another");
		assert.strictEqual(slider.getProperty("_hiddenTickmarks"), true, "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});