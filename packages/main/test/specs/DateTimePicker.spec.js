const assert = require("chai").assert;
const PORT = require("./_port.js");

const openPickerById = async (id, options) => {
	await browser.$(`#${id}`).scrollIntoView();

	return browser.executeAsync((id, options, done) => {
		done(document.querySelector(`#${id}`).openPicker(options));
	}, id, options);
};

const closePickerById = id => {
	return browser.executeAsync((id, done) => {
		done(document.querySelector(`#${id}`).closePicker());
	}, id);
};

const isPickerOpen = id => {
	return browser.executeAsync((id, done) => {
		done(document.querySelector(`#${id}`).isOpen());
	}, id);
};

const getPicker = async id => {
	const staticAreaItemClassName = await browser.getStaticAreaItemClassName(`#${id}`);
	return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
};

const getSubmitButton = async id => {
	const picker = await getPicker(id);
	return picker.$("#ok");
};

const getCancelButton = async id => {
	const picker = await getPicker(id);
	return picker.$("#cancel");
};

const getTimeSlidersCount = async id => {
	const picker = await getPicker(id);

	return await browser.executeAsync( (picker, done) => {
		done(picker.querySelector("ui5-time-selection").shadowRoot.querySelectorAll("ui5-wheelslider").length);
	}, picker);
};

describe("DateTimePicker general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/DateTimePicker.html?sap-ui-language=en`);
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
		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown"); // select 01

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown"); // select 0
		await browser.keys("ArrowDown"); await browser.keys("ArrowDown"); // select 02

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown"); // select 0
		await browser.keys("ArrowDown"); await browser.keys("ArrowDown"); await browser.keys("ArrowDown"); // select 03

		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "14/04/2020, 01:02:03 AM", "The new date/time is correctly selected.");
	});

	it("tests selection of new date without changing the time section", async () => {
		const PREVIOUS_VALUE = "14/04/2020, 01:02:03 AM";
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
		const expectedHoursMinSlidersCount = 3;
		const expectedHoursMinSecSlidersCount = 4;

		// act
		await openPickerById("dtSeconds");

		// assert
		const hoursMinSecSliders = await getTimeSlidersCount("dtSeconds");
		assert.strictEqual(hoursMinSecSliders, expectedHoursMinSecSlidersCount,
			"The picker have 4 sliders - hours, minutes, seconds and periods sliders.");

		await closePickerById("dtSeconds");

		// act
		await openPickerById("dtMinutes");

		// assert
		const hoursMinSliders = await getTimeSlidersCount("dtMinutes");
		assert.strictEqual(hoursMinSliders,	expectedHoursMinSlidersCount,
			"The picker have 3 sliders - hours, minutes and periods sliders.");

		await closePickerById("dtMinutes");
	});

	it("tests hours slider is expanded", async () => {
		// act
		await openPickerById("dt");

		// assert
		const picker = await getPicker("dt");
		const expanded = await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).getProperty("expanded");
		assert.ok(expanded, "The  hours slider is expanded.");

		await closePickerById("dt");
	});

	it("tests selection of 12:00:00 AM", async () => {
		const dtPicker = await browser.$("#dtTest12AM");

		// act
		await openPickerById("dtTest12AM");

		const picker = await getPicker("dtTest12AM");

		// select new time
		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageUp"); // select 12

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown");// select 00

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown");// select 00

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="periods"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown");// select AM

		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:00:00 AM", "The new date/time is correctly selected.");
	});

	it("tests selection of 12:00:00 PM", async () => {
		const dtPicker = await browser.$("#dtTest12PM");

		// act
		await openPickerById("dtTest12PM");

		const picker = await getPicker("dtTest12PM");

		// select new time
		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageUp"); // select 12

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown");// select 00

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown");// select 00

		await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="periods"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageUp");// select PM


		await picker.$("#ok").click();

		// assert
		const newValue = await dtPicker.shadow$("ui5-input").getValue();
		assert.strictEqual(newValue.toUpperCase(), "13/04/2020, 12:00:00 PM", "The new date/time is correctly selected.");
	});

	it("Secondary calendar type", async () => {
		const picker = await browser.$("#secondaryCalendar");

		// act
		await openPickerById("secondaryCalendar");
		await browser.keys("ArrowUp");
		await browser.keys("Enter");
		const submitBtn = await getSubmitButton("secondaryCalendar");
		await submitBtn.click();

		// assert
		assert.strictEqual(await picker.shadow$("ui5-input").getValue(), "Sha. 17, 1443 AH, 10:27:26 AM", "Value change is applied.");
	});
});
