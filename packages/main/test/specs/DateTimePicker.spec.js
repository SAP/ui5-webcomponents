const assert = require("chai").assert;

const openPickerById = (id, options) => {
	return browser.execute((id, options) => {
		return document.querySelector(`#${id}`).openPicker(options);
	}, id, options);
}

const closePickerById = id => {
	return browser.execute(id => {
		return document.querySelector(`#${id}`).closePicker();
	}, id);
}

const isPickerOpen = id => {
	return browser.execute((id) => {
		return document.querySelector(`#${id}`).isOpen();
	}, id);
}

const getPicker = id => {
	const staticAreaItemClassName = browser.getStaticAreaItemClassName(`#${id}`);
	return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
}

const getSubmitButton = id => {
	const picker = getPicker(id);
	return picker.$("#ok");
}

const getCancelButton = id => {
	const picker = getPicker(id);
	return picker.$("#cancel");
}

const getTimeSlidersCount = id => {
	const picker = getPicker(id);

	return browser.execute( picker => {
		return picker.querySelectorAll("ui5-wheelslider").length;
	}, picker);
}

describe("DateTimePicker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/DateTimePicker.html");

	it("tests picker opens/closes programmatically", () => {
		// act
		openPickerById("dt");

		// assert
		assert.ok(isPickerOpen("dt"), "The picker opens programmatically.");

		// act
		closePickerById("dt");

		// assert
		assert.ok(!isPickerOpen("dt"), "The picker closes programmatically.");
	});

	it("tests selection of new date/time", () => {
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";
		const dtPicker = browser.$("#dtSeconds");

		// act
		openPickerById("dtSeconds");
		browser.pause(500);

		// assert
		const currentValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(currentValue, PREVIOUS_VALUE,  "The initial date/time is correctly set.");

		// act
		const picker = getPicker("dtSeconds");

		// select the next day (the right from the selected)
		const selectedDay = picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$(".ui5-dp-item--selected");
		selectedDay.click();
		selectedDay.keys("ArrowRight");
		browser.keys("Space");

		// select new time
		picker.$(".ui5-dt-hours-wheel").setProperty("value","01");
		picker.$(".ui5-dt-minutes-wheel").setProperty("value","02");
		picker.$(".ui5-dt-seconds-wheel").setProperty("value","03");
		picker.$("#ok").click();
		browser.pause(500);

		// assert
		const newValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "14/04/2020, 01:02:03 AM", "The new date/time is correctly selected.");
	});

	it("tests change event is fired on submit", () => {
		// test submit from empty value to current date/time value
		openPickerById("dt1");
		browser.pause(500);

		const inputCounter = browser.$("#input1");
		const submitBtn = getSubmitButton("dt1");

		// act
		submitBtn.click();
		browser.pause(500);

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "1", "Changed should be called 1 time.");

		// tests submit on same value
		openPickerById("dt1");
		browser.pause(500);

		// act
		submitBtn.click();

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "1", "Changed counter still shows 1.");
		assert.ok(!isPickerOpen("dt1"), "The picker closes after pressing 'Submit'.");
	});

	it("tests change event not fired on cancel", () => {
		openPickerById("dt2");
		browser.pause(500);

		const inputCounter = browser.$("#input3");
		const cancelBtn = getCancelButton("dt2");

		// act
		cancelBtn.click();
		browser.pause(500);

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "", "Changed should not be called.");
		assert.ok(!isPickerOpen("dt2"), "The picker closes after pressing 'Cancel'.");
	});

	it("tests time controls displayed according to format", () => {
		const expectedHoursMinSlidersCount = 3;
		const expectedHoursMinSecSlidersCount = 4;

		// act
		openPickerById("dtSeconds");
		browser.pause(500);
		browser.pause(500);

		// assert
		const hoursMinSecSliders = getTimeSlidersCount("dtSeconds");
		assert.strictEqual(hoursMinSecSliders, expectedHoursMinSecSlidersCount,
			"The picker have 4 sliders - hours, minutes, seconds and periods sliders.");

		closePickerById("dtSeconds");

		// act
		openPickerById("dtMinutes");
		browser.pause(500);

		// assert
		const hoursMinSliders = getTimeSlidersCount("dtMinutes");
		assert.strictEqual(hoursMinSliders,	expectedHoursMinSlidersCount,
			"The picker have 3 sliders - hours, minutes and periods sliders.");

		closePickerById("dtMinutes");
	});
});
