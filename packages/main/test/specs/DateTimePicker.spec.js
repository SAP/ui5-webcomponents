const assert = require("chai").assert;

const openPickerById = (id, options) => {
	const res = browser.execute((id, options) => {
		return document.querySelector(`#${id}`).openPicker(options);
	}, id, options);
	browser.pause(1000);
	return res;
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
		return picker.querySelector("ui5-time-selection").shadowRoot.querySelectorAll("ui5-wheelslider").length;
	}, picker);
}

describe("DateTimePicker general interaction", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/DateTimePicker.html");
	});

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

		// assert
		const currentValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(currentValue, PREVIOUS_VALUE,  "The initial date/time is correctly set.");

		// act
		const picker = getPicker("dtSeconds");

		// select the next day (the right from the selected)
		const selectedDay = picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$(".ui5-dp-item--selected");
		selectedDay.click();
		browser.keys("ArrowRight");
		browser.keys("Space");

		// select new time
		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown"); // select 01

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown"); // select 0
		browser.keys("ArrowDown"); browser.keys("ArrowDown"); // select 02

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown"); // select 0
		browser.keys("ArrowDown"); browser.keys("ArrowDown"); browser.keys("ArrowDown"); // select 03

		picker.$("#ok").click();

		// assert
		const newValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "14/04/2020, 01:02:03 AM", "The new date/time is correctly selected.");
	});

	it("tests change event is fired on submit", () => {
		// test submit from empty value to current date/time value
		openPickerById("dt1");

		const picker = getPicker("dt1");
		const inputCounter = browser.$("#input1");
		const submitBtn = getSubmitButton("dt1");

		// act
		picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$("[data-sap-focus-ref]").click(); // select a date to enable the OK button
		submitBtn.click();

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "1", "Changed should be called 1 time.");

		// tests submit on same value
		openPickerById("dt1");

		// act
		submitBtn.click();

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "1", "Changed counter still shows 1.");
		assert.ok(!isPickerOpen("dt1"), "The picker closes after pressing 'Submit'.");
	});

	it("tests change event not fired on cancel", () => {
		openPickerById("dt2");

		const inputCounter = browser.$("#input3");
		const cancelBtn = getCancelButton("dt2");

		// act
		cancelBtn.click();

		// assert
		assert.strictEqual(inputCounter.getProperty("value"), "", "Changed should not be called.");
		assert.ok(!isPickerOpen("dt2"), "The picker closes after pressing 'Cancel'.");
	});

	it("tests time controls displayed according to format", () => {
		const expectedHoursMinSlidersCount = 3;
		const expectedHoursMinSecSlidersCount = 4;

		// act
		openPickerById("dtSeconds");

		// assert
		const hoursMinSecSliders = getTimeSlidersCount("dtSeconds");
		assert.strictEqual(hoursMinSecSliders, expectedHoursMinSecSlidersCount,
			"The picker have 4 sliders - hours, minutes, seconds and periods sliders.");

		closePickerById("dtSeconds");

		// act
		openPickerById("dtMinutes");

		// assert
		const hoursMinSliders = getTimeSlidersCount("dtMinutes");
		assert.strictEqual(hoursMinSliders,	expectedHoursMinSlidersCount,
			"The picker have 3 sliders - hours, minutes and periods sliders.");

		closePickerById("dtMinutes");
	});

	it("tests hours slider is expanded", () => {
		// act
		openPickerById("dt");

		// assert
		const picker = getPicker("dt");
		const expanded = picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).getProperty("expanded");
		assert.strictEqual(expanded, true, "The  hours slider is expanded.");

		closePickerById("dt");
	});

	it("tests selection of 12:00:00 AM", () => {
		const dtPicker = browser.$("#dtTest12AM");

		// act
		openPickerById("dtTest12AM");

		const picker = getPicker("dtTest12AM");

		// select new time
		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageUp"); // select 12

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown");// select 00

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown");// select 00

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="period"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown");// select AM

		picker.$("#ok").click();

		// assert
		const newValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:00:00 AM", "The new date/time is correctly selected.");
	});

	it("tests selection of 12:00:00 PM", () => {
		const dtPicker = browser.$("#dtTest12PM");

		// act
		openPickerById("dtTest12PM");

		const picker = getPicker("dtTest12PM");

		// select new time
		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageUp"); // select 12

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown");// select 00

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown");// select 00

		picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="period"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageUp");// select PM


		picker.$("#ok").click();

		// assert
		const newValue = dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:00:00 PM", "The new date/time is correctly selected.");
	});
});
