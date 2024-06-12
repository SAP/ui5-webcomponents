import { assert } from "chai";

const openPickerById = async (id) => {
	await browser.$(`#${id}`).scrollIntoView();

	return browser.executeAsync((id, done) => {
		done(document.querySelector(`[id="${id}"]`).open = true);
	}, id);
};

const closePickerById = async (id) => {
	return browser.executeAsync((id, done) => {
		done(document.querySelector(`[id="${id}"]`).open = false);
	}, id);
};

const isPickerOpen = id => {
	return browser.executeAsync((id, done) => {
		done(document.querySelector(`[id="${id}"]`).open);
	}, id);
};

const getPicker = async id => {
	return browser.$(`#${id}`).shadow$("ui5-responsive-popover");
};

const getSubmitButton = async id => {
	const picker = await getPicker(id);
	return picker.$("#ok");
};

const getCancelButton = async id => {
	const picker = await getPicker(id);
	return picker.$("#cancel");
};

const getTimeSelectionClocksCount = async id => {
	const picker = await getPicker(id);

	return await browser.executeAsync( (picker, done) => {
		done(picker.querySelector("ui5-time-selection-clocks").shadowRoot.querySelectorAll("ui5-time-picker-clock").length);
	}, picker);
};

const getPeriodSegmentedButtonCount = async id => {
	const picker = await getPicker(id);

	return await browser.executeAsync( (picker, done) => {
		done(picker.querySelector("ui5-time-selection-clocks").shadowRoot.querySelectorAll("ui5-segmented-button").length);
	}, picker);
};

describe("DateTimePicker general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DateTimePicker.html?sap-ui-language=en`);
	});

	it("tests picker opens/closes programmatically", async () => {
		// act
		await openPickerById("dt");

		// assert
		assert.ok(await isPickerOpen("dt"), "The picker opens programmatically.");

		// act
		await closePickerById("dt");

		// assert
		assert.notOk(await isPickerOpen("dt"), "The picker closes programmatically.");
	});

	it("tests selection of new date/time", async () => {
		const PREVIOUS_VALUE = "13/04/2020, 03:16:16 AM";
		const dtPicker = await browser.$("#dtSeconds");

		// act
		await openPickerById("dtSeconds");

		// assert
		const currentValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(currentValue, PREVIOUS_VALUE,  "The initial date/time is correctly set.");

		// act
		const picker = await getPicker("dtSeconds");

		// select the next day (the right from the selected)
		const selectedDay = await picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$(".ui5-dp-item--selected");
		await selectedDay.click();
		await browser.keys("ArrowRight");
		await browser.keys("Space");

		// select new time
		await picker.$("ui5-time-selection-clocks").shadow$(`ui5-toggle-spin-button[data-sap-clock="hours"]`).click();
		await browser.keys("ArrowDown"); // select 02

		await picker.$("ui5-time-selection-clocks").shadow$(`ui5-toggle-spin-button[data-sap-clock="minutes"]`).click();
		await browser.keys("ArrowDown"); await browser.keys("ArrowDown"); // select 14

		await picker.$("ui5-time-selection-clocks").shadow$(`ui5-toggle-spin-button[data-sap-clock="seconds"]`).click();
		await browser.keys("ArrowUp"); await browser.keys("ArrowUp"); await browser.keys("ArrowUp"); // select 19

		await browser.keys("p"); // select PM

		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "14/04/2020, 02:14:19 PM", "The new date/time is correctly selected.");
	});

	it("tests selection of new date without changing the time section", async () => {
		const PREVIOUS_VALUE = "14/04/2020, 02:14:19 PM";
		const dtPicker = await browser.$("#dtSeconds");
		// assert
		const currentValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(currentValue, PREVIOUS_VALUE,  "The initial date/time is correctly set.");

		await browser.keys("Tab");
		await browser.keys(["Shift", "Tab"]);
		await browser.keys("Backspace");
		await browser.keys("wrongtext");
		await browser.keys("Tab");

		await openPickerById("dtSeconds");
		// act
		const picker = await getPicker("dtSeconds");
		// select the next day (the right from the selected)
		const selectedDay = await picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$(".ui5-dp-item--now");
		const timestamp = await selectedDay.getAttribute("data-sap-timestamp");
		const date = new Date(timestamp * 1000);
		const selectedDate = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}/${date.getFullYear()}`;
		await selectedDay.click();
		await picker.$("#ok").click();
		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		const result = newValue.indexOf(selectedDate) > -1;
		assert.ok(result, "The new date/time is correctly selected.");
	});

	it("tests change event is fired on submit", async () => {
		// test submit from empty value to current date/time value
		await openPickerById("dt1");

		const picker = await getPicker("dt1");
		const inputCounter = await browser.$("#input1");
		const submitBtn = await getSubmitButton("dt1");

		// act
		await picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$("[data-sap-focus-ref]").click(); // select a date to enable the OK button
		await submitBtn.click();

		// assert
		assert.strictEqual(await inputCounter.getProperty("value"), "1", "Changed should be called 1 time.");

		// tests submit on same value
		await openPickerById("dt1");

		// act
		await submitBtn.click();

		// assert
		assert.strictEqual(await inputCounter.getProperty("value"), "1", "Changed counter still shows 1.");
		assert.notOk(await isPickerOpen("dt1"), "The picker closes after pressing 'Submit'.");
	});

	it("tests change event not fired on cancel", async () => {
		await openPickerById("dt2");

		const inputCounter = await browser.$("#input3");
		const cancelBtn = await getCancelButton("dt2");

		// act
		await cancelBtn.click();

		// assert
		assert.strictEqual(await inputCounter.getProperty("value"), "", "Changed should not be called.");
		assert.notOk(await isPickerOpen("dt2"), "The picker closes after pressing 'Cancel'.");
	});

	it("tests time controls displayed according to format", async () => {
		const expectedHoursMinClocksCount = 2;
		const expectedHoursMinSecClocksCount = 3;
		const expectedHoursMinPeriodCount = 1;
		const expectedHoursMinSecPeriodCount = 1;

		// act
		await openPickerById("dtSeconds");

		// assert
		const hoursMinSecClocks = await getTimeSelectionClocksCount("dtSeconds");
		const hoursMinSecPeriod = await getPeriodSegmentedButtonCount("dtSeconds");
		assert.strictEqual(hoursMinSecClocks, expectedHoursMinSecClocksCount,
			"The picker have 3 clocks - hours, minutes, seconds clocks.");
		assert.strictEqual(hoursMinSecPeriod, expectedHoursMinSecPeriodCount,
			"The picker have 1 Period Selector");

		await closePickerById("dtSeconds");

		// act
		await openPickerById("dtMinutes");

		// assert
		const hoursMinClocks = await getTimeSelectionClocksCount("dtMinutes");
		const hoursMinPeriod = await getPeriodSegmentedButtonCount("dtMinutes");
		assert.strictEqual(hoursMinClocks,	expectedHoursMinClocksCount,
			"The picker have 2 clocks - hours, and minutes clocks.");
		assert.strictEqual(hoursMinPeriod, expectedHoursMinPeriodCount,
				"The picker have 1 Period Selector");

		await closePickerById("dtMinutes");
	});

	it("tests hours clock is active on picker open", async () => {
		// act
		await openPickerById("dt");

		// assert
		const picker = await getPicker("dt");
		const active = await picker.$("ui5-time-selection-clocks").shadow$(`ui5-time-picker-clock[data-sap-clock="hours"]`).getProperty("active");
		assert.ok(active, "The hours clock is active.");

		await closePickerById("dt");
	});

	it("tests selection of 12:34:56 AM", async () => {
		const dtPicker = await browser.$("#dtTest12AM");

		// act
		await openPickerById("dtTest12AM");

		const picker = await getPicker("dtTest12AM");

		// select new time
		await picker.$("ui5-time-selection-clocks").shadow$(`ui5-toggle-spin-button[data-sap-clock="hours"]`).click();
		await browser.keys("123456a"); // select 12:34:56 AM

		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:34:56 AM", "The new date/time is correctly selected.");
	});


	it("tests selection of 12:34:56 PM", async () => {
		const dtPicker = await browser.$("#dtTest12PM");

		// act
		await openPickerById("dtTest12PM");

		const picker = await getPicker("dtTest12PM");

		// select new time
		await picker.$("ui5-time-selection-clocks").shadow$(`ui5-toggle-spin-button[data-sap-clock="hours"]`).click();
		await browser.keys("123456p"); // select 12:34:56 PM

		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:34:56 PM", "The new date/time is correctly selected.");
	});

	it("tests change event is prevented on submit when prevent default is called", async () => {
		// test submit from empty value to current date/time value
		await openPickerById("dtPreventDefault");

		const picker = await getPicker("dtPreventDefault");
		const pickerInput = await browser.$("#dtPreventDefault");
		const submitBtn = await getSubmitButton("dtPreventDefault");

		// act
		await picker.$("ui5-calendar").shadow$("ui5-daypicker").shadow$("[data-sap-focus-ref]").click(); // select a date to enable the OK button
		await submitBtn.click();

		// assert
		assert.strictEqual(await pickerInput.getProperty("value"), "", "Value should not be set");
	});

	it("Min and max dates are set, with no format pattern provided, using valid ISO format", async () => {
		const picker = await getPicker("dtMinMaxDatesISO");

		// get header navigation buttons
		const prevButton = await picker.$("ui5-calendar").shadow$("ui5-calendar-header").shadow$("div[data-ui5-cal-header-btn-prev]");
		const nextButton = await picker.$("ui5-calendar").shadow$("ui5-calendar-header").shadow$("div[data-ui5-cal-header-btn-next]");

		// assert
		assert.strictEqual(await prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), true, "The previous button is disabled.");
		assert.strictEqual(await nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), true, "The next button is disabled.");
	});

	it("picker popover should have accessible name", async () => {
		await openPickerById("dt1");

		const popover = await getPicker("dt1");

		assert.strictEqual(await popover.getAttribute("accessible-name"), "Choose Date and Time", "Picker popover has an accessible name");

		await closePickerById("dt1");
	});

	// TO DO: Create new testing page test secondary calendar type behaviour.
});
