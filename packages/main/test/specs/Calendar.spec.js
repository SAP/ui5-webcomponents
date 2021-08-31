const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Calendar general interaction", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
	});

	it("Calendar is rendered", () => {
		const calendar = browser.$("#calendar1").shadow$(".ui5-cal-root");

		assert.ok(calendar, "Calendar is rendered");
	});

	it("Year is set in the header", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const yearButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`);
		const headerText = parseInt(yearButton.getText());
		const currentYear = new Date().getFullYear();

		assert.equal(headerText, currentYear, "Year is set in the header");
	});

	it("Month is set in the header", () => {
		const monthMap = new Map();
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, index) => {
			monthMap.set(index, month);
		});

		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const monthButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`);
		const monthText = monthButton.getText();
		const currentMonth = new Date().getMonth();

		assert.strictEqual(monthText, monthMap.get(currentMonth), "Month is set in the header");
	});

	it("Focus goes into the current day item of the day picker", () => {
		const toggleButton = browser.$("#weekNumbersButton");
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);
		const dayPicker = calendar.shadow$("ui5-daypicker");
		const header  = calendar.shadow$("ui5-calendar-header");
		const currentDayItem = dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		const monthButton = header.shadow$(`[data-ui5-cal-header-btn-month]`);
		const yearButton = header.shadow$(`[data-ui5-cal-header-btn-year]`);

		toggleButton.click();
		toggleButton.click();

		browser.keys("Tab");
		assert.ok(currentDayItem.isFocusedDeep(), "Current calendar day item is focused");

		browser.keys("Tab");
		assert.ok(monthButton.isFocusedDeep(), "Month picker button is focused");

		browser.keys("Tab");
		assert.ok(yearButton.isFocusedDeep(), "Year picker button is focused");

		browser.keys(["Shift", "Tab"]);
		assert.ok(monthButton.isFocusedDeep(), "Month picker button is focused");

		browser.keys(["Shift", "Tab"]);
		assert.ok(currentDayItem.isFocusedDeep(), "Current calendar day item is focused");
	});

	it("Calendar focuses the selected year when yearpicker is opened", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		const yearPicker = calendar.shadow$("ui5-yearpicker");
		const YEAR = 1997;
		calendar.setAttribute("timestamp", Date.UTC(YEAR) / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`).click();
		const focusedItemTimestamp = yearPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		assert.ok(new Date(parseInt(focusedItemTimestamp) * 1000).getUTCFullYear() === 1997, "The focused year is 1997");
	});

	it("Calendar focuses the selected month when monthpicker is opened with space", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		const dayPicker = calendar.shadow$("ui5-daypicker");
		const monthPicker = calendar.shadow$("ui5-monthpicker");
		const currentDayItem = dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);

		currentDayItem.click();
		browser.keys("Tab");
		browser.keys("Space");

		const focusedItemTimestamp = monthPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		const isHidden = monthPicker.getAttribute("hidden");
		assert.ok(!isHidden, "The monthpicker is present");
		assert.ok(new Date(parseInt(focusedItemTimestamp) * 1000).getUTCMonth() === 10, "The focused month is November");
	});

	it("Calendar focuses the selected year when yearpicker is opened with space", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		const dayPicker = calendar.shadow$("ui5-daypicker");
		const yearPicker = calendar.shadow$("ui5-yearpicker");
		const currentDayItem = dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);

		currentDayItem.click();
		browser.keys("Tab");
		browser.keys("Tab");
		browser.keys("Space");

		const isHidden = yearPicker.getAttribute("hidden");
		assert.ok(!isHidden, "The yearpicker is present");
		const focusedItemTimestamp = yearPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		assert.ok(new Date(parseInt(focusedItemTimestamp) * 1000).getUTCFullYear() === 2000, "The focused year is 2000");
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`).click();
		const focusedItem = calendar.shadow$("ui5-yearpicker").shadow$(`[data-sap-timestamp="973036800"]`);

		assert.ok(focusedItem.isFocusedDeep(), "Current year element is the active element");
		assert.notOk(focusedItem.hasClass("ui5-yp-item--selected"), "Current year is not selected");
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-month]`).click();
		const focusedItem = calendar.shadow$("ui5-monthpicker").shadow$(`[data-sap-timestamp="973036800"]`);

		assert.ok(focusedItem.isFocusedDeep(), "Current month element is the active element");
		assert.notOk(focusedItem.hasClass("ui5-mp-item--selected"), "Current month is not selected");
	});

	it("Page up/down increments/decrements the month value", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");

		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Shift + Page up/down increments/decrements the year value by one", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys(['Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 10, 1, 0, 0, 0)));

		browser.keys(['Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys(['Control', 'Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1990, 10, 1, 0, 0, 0)));

		browser.keys(['Control', 'Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year value in the month picker", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys(["F4"]);
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year range in the year picker", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys(['Shift', 'F4']);
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1980, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("When month picker is shown the month button is hidden", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		const calendarHeader = calendar.shadow$("ui5-calendar-header");

		calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		browser.keys(["F4"]);
		browser.keys('PageUp');

		assert.ok(calendarHeader.shadow$("[data-ui5-cal-header-btn-month]").getAttribute("hidden"), "The button for month is hidden");
		browser.keys("Space");
	});

	it("Calendar with 'Multiple' selection type", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("selection-mode", "Multiple");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);

		const dates = [
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971136000"]`),
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971222400"]`),
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971308800"]`),
		];

		dates.forEach(date => {
			date.click();
			assert.ok(date.hasClass("ui5-dp-item--selected"), `${date.getAttribute("data-sap-timestamp")} is selected`);
		});

		const selectedDates = calendar.getProperty("selectedDates");

		assert.deepEqual(selectedDates, [971136000, 971222400, 971308800], "Change event is fired with proper data");
	});

	it("Keyboard navigation works properly, when calendar selection type is set to 'Multiple'", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const toggleButton = browser.$("#weekNumbersButton");
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("selection-mode", "Multiple");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);

		toggleButton.click();
		toggleButton.click();
		browser.keys("Tab");
		// Select the focused date
		browser.keys("Space");

		// Deselect the focused date
		browser.keys("Space");
		browser.keys("ArrowRight");

		assert.ok(calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971222400"]`).isFocusedDeep(), "Focus is properly set");
	});

	it("Calendar with 'Range' selection type", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);
		calendar.setAttribute("selection-mode", "Range");

		const dates = [
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971740800"]`),
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971827200"]`),
			calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971913600"]`),
		];

		dates[0].click();
		dates[2].click();

		assert.ok(dates[0].hasClass("ui5-dp-item--selected"), `${dates[0].getAttribute("data-sap-timestamp")} is selected`);
		assert.ok(dates[1].hasClass("ui5-dp-item--selected-between"), `${dates[1].getAttribute("data-sap-timestamp")} is selected between`);
		assert.ok(dates[2].hasClass("ui5-dp-item--selected"), `${dates[2].getAttribute("data-sap-timestamp")} is selected`);

		const selectedDates = calendar.getProperty("selectedDates");

		assert.deepEqual(selectedDates, [971740800, 971913600], "Change event is fired with proper data");
	});

	it("Previous and next buttons are disabled when necessary", () => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/Calendar.html`);
		const calendarHeader = browser.$("#calendar4").shadow$("ui5-calendar-header");
		const prevButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-prev]`);
		const nextButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-next]`);

		assert.ok(prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is disabled");
		assert.notOk(nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is enabled");

		nextButton.click();

		assert.notOk(prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is enabled");
		assert.notOk(nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is enabled");

		nextButton.click();
		nextButton.click();

		assert.notOk(prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is enabled");
		assert.ok(nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is disabled");
	});

	it("Second month and year are rendered in the header", ()=>{
		const calendar = browser.$("#calendar5");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);
		const calendarHeader = browser.$("#calendar5").shadow$("ui5-calendar-header");
		const monthButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`).$$('span');
		const yearButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`).$$('span');

		assert.strictEqual(monthButton.length, 2, "Second month is rendered");
		assert.strictEqual(yearButton.length, 2,"Second year is rendered");
	});

	it("Buttons for month and year in header are rendered with correct value", ()=>{
		const calendarHeader = browser.$("#calendar5").shadow$("ui5-calendar-header");
		const monthButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`).$$('span');
		const yearButton = calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`).$$('span');

		assert.strictEqual(monthButton[0].getText(), "Rajab", "first month set in the header");
		assert.strictEqual(monthButton[1].getText(), "Sep – Oct", "Second month set in the header");

		assert.strictEqual(yearButton[0].getText(), "1421 AH", "first year set in the header");
		assert.strictEqual(yearButton[1].getText(), "2000", "Second year set in the header");
	});
});
