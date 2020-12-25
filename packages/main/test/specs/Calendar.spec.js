const assert = require("chai").assert;

describe("Calendar general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Calendar.html");

	it("Calendar is rendered", () => {
		const calendar = browser.$("#calendar1").shadow$(".ui5-cal-root");

		assert.ok(calendar, "Calendar is rendered");
	});

	it("Year is set in the header", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const yearButton = calendarHeader.$(`[data-sap-show-picker="Year"]`);
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
		const monthButton = calendarHeader.$(`[data-sap-show-picker="Month"]`);
		const monthText = monthButton.getText();
		const currentMonth = new Date().getMonth();

		assert.strictEqual(monthText, monthMap.get(currentMonth), "Month is set in the header");
	});

	it("timestamp is propagated to the content part", () => {
		const calendar = browser.$("#calendar1");
		const TIMESTAMP = 1;

		calendar.setProperty("timestamp", TIMESTAMP);

		assert.strictEqual(calendar.getProperty("timestamp"), TIMESTAMP);
	});

	it("Focus goes into the current day item of the day picker", () => {
		const toggleButton = browser.$("#weekNumbersButton");
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);
		const dayPicker = calendar.shadow$("ui5-daypicker");
		const header  = calendar.shadow$("ui5-calendar-header");
		const currentDayItem = dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		const monthButton = header.shadow$(`[data-sap-show-picker="Month"]`);
		const yearButton = header.shadow$(`[data-sap-show-picker="Year"]`);

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

	it("Calendar sets the selected year when yearpicker is opened", () => {
		const calendar = browser.$("#calendar1");
		const yearPicker = calendar.shadow$("ui5-yearpicker");
		const YEAR = 1997;
		calendar.setAttribute("timestamp", Date.UTC(YEAR) / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-sap-show-picker="Year"]`).click();
		assert.strictEqual(yearPicker.getProperty("_selectedYear"), YEAR, "Year is set");

		calendar.shadow$("ui5-yearpicker").shadow$(`div[data-sap-timestamp="852076800"]`).click();
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-sap-show-picker="Year"]`).click();
		const focusedItem = calendar.shadow$("ui5-yearpicker").shadow$(`[data-sap-timestamp="946684800"]`);

		assert.ok(focusedItem.isFocusedDeep(), "Current year element is the acrive element");
		assert.notOk(focusedItem.hasClass("ui5-mp-item--selected"), "Current year is not selected");
		focusedItem.click();
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		calendar.shadow$("ui5-calendar-header").shadow$(`div[data-sap-show-picker="Month"]`).click();
		const focusedItem = calendar.shadow$("ui5-monthpicker").shadow$(`[data-sap-timestamp="973036800"]`);

		assert.ok(focusedItem.isFocusedDeep(), "Current month element is the acrive element");
		assert.notOk(focusedItem.hasClass("ui5-mp-item--selected"), "Current month is not selected");
		focusedItem.click();
	});

	it("Page up/down increments/decrements the month value", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Shift + Page up/down increments/decrements the year value by one", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys(['Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 10, 1, 0, 0, 0)));

		browser.keys(['Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys(['Control', 'Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1990, 10, 1, 0, 0, 0)));

		browser.keys(['Control', 'Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year value in the month picker", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		browser.keys(["F4"]);
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year range in the year picker", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		browser.keys(['Shift', 'F4']);
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1980, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("When month picker is shown the month button is hidden", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");

		browser.keys(["F4"]);
		browser.keys('PageUp');

		assert.ok(calendarHeader.shadow$(".ui5-calheader-middlebtn").getAttribute("hidden"), "The button for month is hidden");
		browser.keys("Space");
	});

	it("Calendar with 'Multiple' selection type", () => {
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("selection", "Multiple");
		let selectedDates = browser.execute(() => document.getElementById("calendar1").selectedDates );

		// deselect previously selected dates
		selectedDates.forEach(timestamp => {
			const dateDOM = calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="${timestamp}"]`);
			dateDOM.click();
		});

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

		selectedDates = browser.execute(() => document.getElementById("calendar1").selectedDates );

		assert.deepEqual(selectedDates, [971136000, 971222400, 971308800], "Change event is fired with proper data");
	});

	it("Keyboard navigation works properly, when calendar selection type is set to 'Multiple'", () => {
		const toggleButton = browser.$("#weekNumbersButton");
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("selection", "Multiple");
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
		const calendar = browser.$("#calendar1");
		calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);
		calendar.setAttribute("selection", "Range");

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

		const selectedDates = browser.execute(() => document.getElementById("calendar1").selectedDates );

		assert.deepEqual(selectedDates, [971740800, 971913600], "Change event is fired with proper data");
	});
});
