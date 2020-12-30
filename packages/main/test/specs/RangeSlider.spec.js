const assert = require("chai").assert;

describe("Testing Range Slider interactions", () => {

	it("Changing the current startValue is reflected", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");
		browser.setWindowSize(1257, 2000);

		const rangeSlider = browser.$("#range-slider-tickmarks");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");

		assert.strictEqual(startHandle.getAttribute("style"), "left: 0%;", "Initially if no value is set, the Range Slider start-handle is at the beginning of the Range Slider");

		rangeSlider.setProperty("startValue", 5);

		assert.strictEqual(startHandle.getAttribute("style"), "left: 12.5%;", "Start-handle should be 12.5% from the start");

		startHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(startHandle.getAttribute("style"), "left: 20%;", "Start-handle should be 20% from the start of the Range Slider");
		assert.strictEqual(rangeSlider.getProperty("startValue"), 8, "Range Slider startValue should be 8");

		startHandle.click({ x: -100 });

		assert.strictEqual(startHandle.getAttribute("style"), "left: 12.5%;", "Start-handle should be again 12.5% from the start");
		assert.strictEqual(rangeSlider.getProperty("startValue"), 5, "Current startValue should be again 5");
	});

	it("Changing the endValue is reflected", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		assert.strictEqual(endHandle.getAttribute("style"), "left: 50%;", "Range Slider end-handle is should be 50% from the start the Range Slider");
		rangeSlider.setProperty("endValue", 10);

		assert.strictEqual(endHandle.getAttribute("style"), "left: 25%;", "End-handle should be 25% from the start");

		rangeSlider.click();

		assert.strictEqual(endHandle.getAttribute("style"), "left: 50%;", "Range Slider end-handle should be in the middle of the slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "Range Slider endValue should be 20");

		endHandle.click({ x: 100 });

		assert.strictEqual(endHandle.getAttribute("style"), "left: 57.5%;", "End-handle should be 57.5%% from the start of the Range slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 23, "Range Slider current endValue should be 23");

		endHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(endHandle.getAttribute("style"), "left: 50%;", "End-handle should be back to 50% from the start of the Range Slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "Current endValue should be 20");
	});

	it("Click within the selected range should not change any value", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks");

		rangeSlider.setProperty("endValue", 30);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 5, "startValue should be 5");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "endValue value should be 30");

		rangeSlider.click();

		assert.strictEqual(rangeSlider.getProperty("startValue"), 5, "startValue should still be 5");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "endValue value should still be 30");
	});

	it("Dragging the selected range should change both values and handles", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(rangeSlider.getProperty("startValue"), 8, "startValue should be 8");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 33, "endValue should be 33");
	});

	it("Dragging the start-handle pass the end-handle should swap the values", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.setProperty("endValue", 9);

		startHandle.dragAndDrop({ x: 100, y: 1 });

		assert.strictEqual(rangeSlider.getProperty("startValue"), 9, "startValue should swapped with the endValue and should be 9");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 11, "endValue should swapped with the startValue and should be 11");
	});

	it("Dragging the whole range selection should always keep the initially selected range and be within min/max values", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.setProperty("endValue", 30);

		rangeSlider.dragAndDrop({ x: -500, y: 1 });
		
		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "startValue should be 0 as the selected range has reached the start of the Range Slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "endValue should be 21 and no less, the initially selected range should be preserved");

		rangeSlider.dragAndDrop({ x: 600, y: 1 });

		assert.strictEqual(rangeSlider.getProperty("startValue"), 19, "startValue should be 19 and no more, the initially selected range should be preserved");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 40, "endValue should be 40 as the selected range has reached the end of the Range Slider");
	});

	it("Range Slider should not be interactive if the step property is 0", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		rangeSlider.setProperty("step", 0);
		rangeSlider.click();

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "Range Slider endValue should be the same");
	});

	it("Disabled Range Slider is not interactive", () => {
		const rangeSlider = browser.$("#disabled-range-slider");

		assert.strictEqual(rangeSlider.isClickable(), false, "Range Slider should be disabled");
	});
});

describe("Range Slider elements - tooltip, step, tickmarks, labels", () => {

	it("Range Slider tooltips are displayed showing the current value", () => {
		const rangeSlider = browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderStartTooltip = rangeSlider.shadow$(".ui5-slider-tooltip--start");
		const rangeSliderStartTooltipValue = rangeSliderStartTooltip.shadow$(".ui5-slider-tooltip-value");
		const rangeSliderEndTooltip = rangeSlider.shadow$(".ui5-slider-tooltip--end");
		const rangeSliderEndTooltipValue = rangeSliderEndTooltip.shadow$(".ui5-slider-tooltip-value");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.moveTo();

		assert.strictEqual(rangeSlider.getProperty("_tooltipVisibility"), "visible", "Range Slider tooltips visibility property should be 'visible'");
		assert.strictEqual(rangeSliderStartTooltip.getAttribute("style"), "visibility: visible;", "Range Slider start tooltip should be shown");
		assert.strictEqual(rangeSliderEndTooltip.getAttribute("style"), "visibility: visible;", "Range Slider end tooltip should be shown");

		rangeSlider.setProperty("startValue", 65);
		rangeSlider.moveTo();

		assert.strictEqual(rangeSliderStartTooltipValue.getText(), "65", "Range Slider start tooltip should display value of 65");

		rangeSlider.setProperty("endValue", 115);
		rangeSlider.moveTo();

		assert.strictEqual(rangeSliderEndTooltipValue.getText(), "115", "Range Slider end tooltip should display value of 65");
	});

	it("Range Slider have correct number of labels and tickmarks based on the defined step and labelInterval properties", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");
		const labelsContainer = rangeSlider.shadow$(".ui5-slider-labels");
		const numberOfLabels = labelsContainer.$$("li").length;

		assert.strictEqual(numberOfLabels, 12, "12 labels should be rendered, 1 between every 4 tickmarks");
	});
});

describe("Properties synchronization and normalization", () => {

	it("Should fallback to default value of 1 if step property is not a valid number", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("step", "String value");

		assert.strictEqual(rangeSlider.getProperty("step"), 1, "Step value should be its default value");
	});

	it("If a negative number is set to the step property its positive equivalent should be used as effective value", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("step", -7);

		assert.strictEqual(rangeSlider.getProperty("step"), -7, "Step value should be a positive number");

		rangeSlider.click();

		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "The current value should be 'stepified' by 7");
	});

	it("If min property is set to a greater number than the max property their effective values should be swapped, their real ones - not", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("startValue", 2);
		rangeSlider.setProperty("max", 10);
		rangeSlider.setProperty("min", 100);

		assert.strictEqual(rangeSlider.getProperty("min"), 100, "min property itself should not be normalized");
		assert.strictEqual(rangeSlider.getProperty("max"), 10, "max property itself should not be normalized");
		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "startValue property should be within the boundaries of the effective (swapped) min and max props");
	});

	it("Should keep the current values between the boundaries of min and max properties", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("min", 100);
		rangeSlider.setProperty("max", 200);

		rangeSlider.setProperty("endValue", 300);

		assert.strictEqual(rangeSlider.getProperty("endValue"), 200, "value prop should always be lower than the max value");
	
		rangeSlider.setProperty("startValue", 99);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 100, "value prop should always be greater than the min value");
	});

	it("Should not 'stepify' current value if it is not in result of user interaction", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("min", 0);
		rangeSlider.setProperty("max", 44);
		rangeSlider.setProperty("step", 1.25);
		rangeSlider.setProperty("startValue", 14);
		rangeSlider.setProperty("endValue", 24);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 14, "startValue should not be stepped to the next step (15)");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 24, "endValue should not be stepped to the next step (25)");
	});	

	it("If the step property or the labelInterval are changed, the tickmarks and labels must be updated also", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setProperty("max", 0);
		rangeSlider.setProperty("min", 40);
		rangeSlider.setProperty("step", 1);

		assert.strictEqual(rangeSlider.getProperty("_labels").length, 21, "Labels must be 21 - 1 for every 2 tickmarks (and steps)");

		rangeSlider.setProperty("step", 2);

		assert.strictEqual(rangeSlider.getProperty("_labels").length, 11, "Labels must be 12 - 1 for every 2 tickmarks (and 4 current value points)");
		
		rangeSlider.setProperty("labelInterval", 4);

		assert.strictEqual(rangeSlider.getProperty("_labels").length, 6, "Labels must be 6 - 1 for every 4 tickmarks (and 8 current value points)");
	});
});

describe("Testing events", () => {

	it("Should fire input event on use interaction and change event after user interaction finish", () => {
		const rangeSlider = browser.$("#test-slider");
		const eventResultRangeSlider = browser.$("#test-result-slider");

		rangeSlider.click();

		assert.strictEqual(eventResultRangeSlider.getProperty("endValue") , 4, "Both input event and change event are fired after user interaction");
	});

	it("Should not fire change event after user interaction is finished if the current value is the same as the one at the start of the action", () => {
		const rangeSlider = browser.$("#test-slider");
		const eventResultRangeSlider = browser.$("#test-result-slider");

		rangeSlider.click();

		assert.strictEqual(eventResultRangeSlider.getProperty("endValue") , 4, "Change event is not fired if the value is the same as before the start of the action");
	});
});


describe("Accessibility: Testing focus", () => {
	it("Click anywhere in the  Range Slider should focus the closest handle and set the 'focused' property to true", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");

		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderStartHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const rangeSliderEndHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.click();

		let innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(rangeSlider.isFocused(), true, "RangeSlider component is focused");
		assert.strictEqual(rangeSlider.getProperty("focused"), true, "RangeSlider state is focused");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderEndHandle.getAttribute("class"), "RangeSlider second handle has the shadowDom focus");

		rangeSlider.setProperty("startValue", 30);
		rangeSliderStartHandle.click({ x: -200});

		innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderStartHandle.getAttribute("class"), "RangeSlider second handle has the shadowDom focus");
	});

	it("Click currently selected range should focus it and set the 'focused' property to true", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");

		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderSelection = rangeSlider.shadow$(".ui5-slider-progress");

		rangeSlider.setProperty("endValue", 60);
		rangeSlider.click();

		let innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(rangeSlider.isFocused(), true, "RangeSlider component is focused");
		assert.strictEqual(rangeSlider.getProperty("focused"), true, "RangeSlider state is focused");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderSelection.getAttribute("class"), "RangeSlider progress bar has the shadowDom focus");
	});


	it("When not yet focused, 'Tab' should focus the Range Slider and move the focus to the progress bar", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");

		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderSelection = rangeSlider.shadow$(".ui5-slider-progress");

		browser.keys("Tab");

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(rangeSlider.isFocused(), true, "Range Slider component is focused");
		assert.strictEqual(rangeSlider.getProperty("focused"), true, "Range Slider is focused");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderSelection.getAttribute("class"), "Range Slider progress tracker has the shadowDom focus");
	});
	
	it("When progress bar has the focus, 'Tab' should move the focus to the first handle", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderStartHandle = rangeSlider.shadow$(".ui5-slider-handle--start");

		browser.keys("Tab");

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderStartHandle.getAttribute("class"), "Range Slider first handle has the hadowDom focus");
	});

	it("When the first handle has the focus, 'Tab' should focus the second handle", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderEndHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		browser.keys("Tab");

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderEndHandle.getAttribute("class"), "Range Slider second handle has the shadowDom focus");
	});

	it("When the second handle has the focus, 'Tab' should move the focus away from the Range Slider", () => {
		const currentRangeSlider = browser.$("#basic-range-slider");
		const nextRangeSlider = browser.$("#basic-range-slider-with-tooltip");
		const rangeSliderSelection = nextRangeSlider.shadow$(".ui5-slider-progress");

		browser.keys("Tab");

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider-with-tooltip").shadowRoot.activeElement;
		});

		assert.strictEqual(currentRangeSlider.isFocused(), false, "First RangeSlider component is now not focused");
		assert.strictEqual(currentRangeSlider.getProperty("focused"), false, "First RangeSlider state is not focused");

		assert.strictEqual(nextRangeSlider.isFocused(), true, "Next RangeSlider is focused");
		assert.strictEqual(nextRangeSlider.getProperty("focused"), true, "Next RangeSlider's state is focused");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderSelection.getAttribute("class"), "Next Range Slider second handle has the shadowDom focus");
	});

	it("Shift+Tab should focus the previous Range Slider and move the focus to its second handle", () => {
		const currentRangeSlider = browser.$("#basic-range-slider-with-tooltip");
		const previousRangeSlider = browser.$("#basic-range-slider");
		const previousRangeSliderEndHandle = previousRangeSlider.shadow$(".ui5-slider-handle--end");

		browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(currentRangeSlider.isFocused(), false, "First RangeSlider component is now not focused");
		assert.strictEqual(currentRangeSlider.getProperty("focused"), false, "First RangeSlider state is not focused");

		assert.strictEqual(previousRangeSlider.isFocused(), true, "Slider component is focused");
		assert.strictEqual(previousRangeSlider.getProperty("focused"), true, "Slider is focused");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), previousRangeSliderEndHandle.getAttribute("class"), "Previous Range Slider second handle now has the shadowDom focus");
	});

	it("When the second handle has the focus, 'Shift' + 'Tab' should move the focus to the first handle", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderStartHandle = rangeSlider.shadow$(".ui5-slider-handle--start");

		browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderStartHandle.getAttribute("class"), "Range Slider first handle has the shadowDom focus");
	});

	it("When the first handle has the focus, 'Shift' + 'Tab' should move the focus to the progress bar", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const rangeSliderSelection = rangeSlider.shadow$(".ui5-slider-progress");

		browser.keys(["Shift", "Tab"]);

		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), rangeSliderSelection.getAttribute("class"), "Range Slider first handle has the shadowDom focus");
	});

	it("When the progress bar has the focus, 'Shift' + 'Tab' should move the focus away from the Range Slider", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);

		assert.strictEqual(rangeSlider.isFocused(), false, "First RangeSlider component is now not focused");
		assert.strictEqual(rangeSlider.getProperty("focused"), false, "First RangeSlider state is not focused");
	});

	it("When one handle come across the other and the values are swapped the focus must be switched between the handles", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		startHandle.dragAndDrop({ x: 400, y: 1 });
		const innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual($(innerFocusedElement).getAttribute("class"), endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});


describe("Accessibility: Testing keyboard handling", () => {
	it("When progress bar is focused 'Right Arrow' key should increase both values of the Range Slider with a small increment step", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("Tab");
		browser.keys("ArrowRight");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When progress bar is focused 'Left Arrow' key should decrease both values of the Range Slider with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("ArrowLeft");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Up Arrow' key should increase both values of the Range Slider with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("ArrowUp");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When progress bar is focused 'Down' key should decrease both values of the Range Slider with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("ArrowDown");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Control' + 'Right Arrow' key should increase both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Control' + 'Left Arrow' key should decrease both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Control' + 'Up Arrow' key should increase both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Control' + 'Down' key should decrease both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused 'Page Up' key should increase both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("PageUp");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When progress bar is focused 'Page Down' key should decrease both values of the Range Slider with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("PageDown");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused the '+' key should increase both values of the Range Slider with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const numpadAdd = "\uE025";

		browser.keys("+");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is increased");

		browser.keys(numpadAdd);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 2, "start-value is increased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 22, "end-value is increased");
	});

	it("When progress bar is focused the '-' key should decrease both values of the Range Slider with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const numpadSubtract = "\uE027";

		browser.keys("-");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is decreased");

		browser.keys(numpadSubtract);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When progress bar is focused an 'End' key press should offset the selected range to the end of the Range Slider", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("End");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 80, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 100, "end-value is decreased");
	});

	it("When progress bar is focused a 'Home' key press should offset the selected range to the start of the Range Slider", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("Home");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("A 'Esc' key press should return the values of the Range Slider at their initial point at the time of its focusing", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		rangeSlider.setProperty("startValue", 24);
		rangeSlider.setProperty("endValue", 42);

		browser.keys("Escape");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Right Arrow' key should increase its value with a small increment step", () => {
		browser.url("http://localhost:8080/test-resources/pages/RangeSlider.html");

		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("Tab");
		browser.keys("Tab");
		browser.keys("ArrowRight");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		browser.keys("Tab");
		browser.keys("ArrowRight");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is increased");
	});

	it("When a handle is focused 'Left Arrow' key should decrease its value with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys("ArrowLeft");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is increased");

		browser.keys("Tab");
		browser.keys("ArrowLeft");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Up Arrow' key should increase its value with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys("ArrowUp");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		browser.keys("Tab");
		browser.keys("ArrowUp");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is decreased");
	});

	it("When a handle is focused 'Down' key should decrease its value with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys("ArrowDown");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is increased");

		browser.keys("Tab");
		browser.keys("ArrowDown");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Control' + 'Right Arrow' key should increase its value with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		browser.keys("Tab");
		browser.keys(["Control", "ArrowRight"]);

		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When a handle is focused 'Control' + 'Left Arrow' key should decrease its vale with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		browser.keys("Tab");
		browser.keys(["Control", "ArrowLeft"]);

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Control' + 'Up Arrow' key should increase its value with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		browser.keys("Tab");
		browser.keys(["Control", "ArrowUp"]);

		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When handle is focused 'Control' + 'Down' key should decrease its value with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		browser.keys("Tab");
		browser.keys(["Control", "ArrowDown"]);

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle is focused 'Page Up' key should increase its value with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		browser.keys(["Shift", "Tab"]);
		browser.keys("PageUp");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 10, "start-value is increased");

		browser.keys("Tab");
		browser.keys("PageUp");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 30, "end-value is increased");
	});

	it("When a handle is focused 'Page Down' key should decrease its value with a big increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys("PageDown");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		browser.keys("Tab");
		browser.keys("PageDown");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");
	});

	it("When a handle focused the '+' key should increase its value with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const numpadAdd = "\uE025";

		browser.keys(["Shift", "Tab"]);
		browser.keys("+");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is increased");

		browser.keys(numpadAdd);
		assert.strictEqual(rangeSlider.getProperty("startValue"), 2, "start-value is increased");

		browser.keys("Tab");
		browser.keys("+");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is increased");

		browser.keys(numpadAdd);
		assert.strictEqual(rangeSlider.getProperty("endValue"), 22, "end-value is increased");

	});

	it("When a handle focused the '-' key should decrease its value with a small increment step", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const numpadSubtract = "\uE027";

		browser.keys(["Shift", "Tab"]);
		browser.keys("-");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 1, "start-value is decreased");

		browser.keys(numpadSubtract);
		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");

		browser.keys("Tab");
		browser.keys("-");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 21, "end-value is decreased");

		browser.keys(numpadSubtract);
		assert.strictEqual(rangeSlider.getProperty("endValue"), 20, "end-value is decreased");

	});

	it("When a handle is focused an 'End' key press should set its value to the maximum allowed", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys("End");

		assert.strictEqual(rangeSlider.getProperty("endValue"), 100, "end-value is decreased");
	});

	it("When a handle is focused a 'Home' key press should set its value to the start of the Range Slider", () => {
		const rangeSlider = browser.$("#basic-range-slider");

		browser.keys(["Shift", "Tab"]);
		browser.keys("Home");

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "start-value is decreased");
	});

	it("When one handle come across the other and the values are swapped the focus must be switched between the handles", () => {
		const rangeSlider = browser.$("#basic-range-slider");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.setProperty("endValue", 20);
		startHandle.click();
		browser.keys("End");

		let innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(rangeSlider.getProperty("endValue"), 100, "The original end-value is set to min and switched as a start-value");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), endHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");

		browser.keys("Home");

		innerFocusedElement = browser.execute(() => {
			return document.getElementById("basic-range-slider").shadowRoot.activeElement;
		});

		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "The original end-value is set to min and switched as a start-value");
		assert.strictEqual($(innerFocusedElement).getAttribute("class"), startHandle.getAttribute("class"), "Range Slider second handle now has the shadowDom focus");
	});
});

describe("Testing resize handling and RTL support", () => {
	it("Testing RTL support", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");
		const startHandle = rangeSlider.shadow$(".ui5-slider-handle--start");
		const endHandle = rangeSlider.shadow$(".ui5-slider-handle--end");

		rangeSlider.setAttribute("dir", "rtl");
		rangeSlider.setProperty("min", 0);
		rangeSlider.setProperty("max", 10);
		rangeSlider.setProperty("step", 1);
		rangeSlider.setProperty("startValue", 0);
		rangeSlider.setProperty("endValue", 4);

		assert.strictEqual(startHandle.getAttribute("style"), "right: 0%;", "Initially if no value is set, the start-handle is 0% from the right side of the Range Slider");
		assert.strictEqual(endHandle.getAttribute("style"), "right: 40%;", "End-handle should be 40 percent from the right side of the Range Slider");

		rangeSlider.setProperty("startValue", 3);

		assert.strictEqual(startHandle.getAttribute("style"), "right: 30%;", "Start-handle should be 30% from the right end of the Range Slider");

		rangeSlider.click();

		assert.strictEqual(endHandle.getAttribute("style"), "right: 50%;", "End-handle should be at the middle of the Range Slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 5, "endValue should be 5");

		endHandle.dragAndDrop({ x: -200, y: 1 });

		assert.strictEqual(endHandle.getAttribute("style"), "right: 80%;", "End-handle should be 80% from the right of the slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 8, "endValue should be 8");

		endHandle.dragAndDrop({ x: -100, y: 1 });

		assert.strictEqual(endHandle.getAttribute("style"), "right: 90%;", "End-handle should be 90% from the right of the slider");
		assert.strictEqual(rangeSlider.getProperty("endValue"), 9, "endValue should be 9");

		startHandle.dragAndDrop({ x: 350, y: 1 });

		assert.strictEqual(startHandle.getAttribute("style"), "right: 0%;", "Slider handle should be 0% at the right of the Range Slider");
		assert.strictEqual(rangeSlider.getProperty("startValue"), 0, "startValue should be 0");
	});

	it("Should hide all labels except the first and the last one, if there is not enough space for all of them", () => {
		const rangeSlider = browser.$("#range-slider-tickmarks-labels");

		rangeSlider.setAttribute("dir", "ltr");
		rangeSlider.setProperty("min", 0);
		rangeSlider.setProperty("max", 44);
		rangeSlider.setProperty("step", 1.25);

		browser.setWindowSize(400, 2000);

		assert.strictEqual(rangeSlider.getProperty("_labelsOverlapping"), true, "state should reflect if any of the labels is overlapping with another");
		assert.strictEqual(rangeSlider.getProperty("_hiddenTickmarks"), true, "state should reflect if the tickmarks has less than 8px space between each of them");
	});
});
