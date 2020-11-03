const assert = require("chai").assert;

describe("Calendar general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Calendar.html");

	it("Calendar is rendered", () => {
		const calendar = browser.$("#calendar1").shadow$(".ui5-cal-root");

		assert.ok(calendar, "Calendar is rendered");
	});

	it("Year is set in the header", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const headerText = parseInt(calendarHeader.getAttribute("year-text"));
		const currentYear = new Date().getFullYear();

		assert.equal(headerText, currentYear, "Year is set in the header");
	});

	it("Default year is the current year", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const calendarYear = parseInt(calendarHeader.getAttribute("year-text"));

		assert.strictEqual(calendarYear, new Date().getFullYear(), "Default year is correct");
	});

	it("Month is set in the header", () => {
		const monthMap = new Map();
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, index) => {
			monthMap.set(index, month);
		});

		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const monthText = calendarHeader.getAttribute("month-text");
		const currentMonth = new Date().getMonth();

		assert.strictEqual(monthText.toString(), monthMap.get(currentMonth), "Month is set in the header");
	});

	it("Default month is the current year", () => {
		const calendarHeader = browser.$("#calendar1").shadow$("ui5-calendar-header");
		const monthMap = new Map();
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, index) => {
			monthMap.set(index, month);
		});
		const calendarMonth = calendarHeader.getAttribute("month-text");

		assert.strictEqual(calendarMonth, monthMap.get(new Date().getMonth()), "Default month is correct");
	});

	it("timestamp is propagated to the content part", () => {
		const calendar = browser.$("#calendar1");
		const TIMESTAMP = 1;

		calendar.setProperty("timestamp", TIMESTAMP);

		assert.strictEqual(calendar.getProperty("timestamp"), TIMESTAMP);
	});

	it("Calendar sets the selected year when yearpicker is opened", () => {
		const calendar = browser.$("#calendar1");
		const yearPicker = calendar.shadow$("ui5-yearpicker");
		const YEAR = 1997;

		browser.execute((year) => {
			const calendar = document.getElementById("calendar1");
			var newTimestamp = Date.UTC(year) / 1000;
			calendar.timestamp = newTimestamp;
			calendar._showYearPicker();
		}, YEAR);

		assert.strictEqual(yearPicker.getProperty("_selectedYear"), YEAR, "Year is set");
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", () => {
		const currentElement = browser.execute(() => {
			const calendar = document.getElementById("calendar1");
			calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);
			calendar._showYearPicker();
			const yearPicker = calendar.shadowRoot.querySelector("ui5-yearpicker");
			return yearPicker.shadowRoot.querySelectorAll(".ui5-yp-interval-container > div[data-sap-timestamp='946684800']:not(ui5-yp-item--selected)");
		});

		const activeElement = browser.execute(() => document.activeElement);

		assert.strictEqual(currentElement[0].id, activeElement.id, "Current year element is the acrive element");
		assert.strictEqual(currentElement.length, 1, "Current year element isn't selected");

		browser.execute(() => document.getElementById("calendar1")._hideYearPicker());
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", () => {
		const currentElement = browser.execute(() => {
			const calendar = document.getElementById("calendar1");
			calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);
			calendar._showMonthPicker();
			const monthPicker = calendar.shadowRoot.querySelector("ui5-monthpicker");
			return monthPicker.shadowRoot.querySelectorAll(".ui5-mp-quarter > div[data-sap-timestamp='970358400']:not(ui5-mp-item--selected)");
		});

		const activeElement = browser.execute(() => document.activeElement);
		assert.strictEqual(currentElement[0].id, activeElement.id, "Current year element is the acrive element");
		assert.strictEqual(currentElement.length, 1, "Current year element isn't selected");

		browser.execute(() => document.getElementById("calendar1")._hideMonthPicker());
	});

	it("Page up/down increments/decrements the month value", () => {
		const calendar = browser.$("#calendar1");
		calendar.setProperty("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		browser.execute(() => document.getElementById("calendar1")._hideYearPicker());

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 8, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Shift + Page up/down increments/decrements the year value by one", () => {
		const calendar = browser.$("#calendar1");
		calendar.setProperty("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys(['Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));

		browser.keys(['Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", () => {
		const calendar = browser.$("#calendar1");
		calendar.setProperty("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		calendar.shadow$("ui5-daypicker").shadow$(".ui5-dp-days-names-container").click();
		browser.keys(['Control', 'Shift', 'PageUp']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1990, 9, 1, 0, 0, 0)));

		browser.keys(['Control', 'Shift', 'PageDown']);

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year value in the month picker", () => {
		const calendar = browser.$("#calendar1");
		calendar.setProperty("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		browser.keys(["F4"]);
		browser.keys('PageUp');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));

		browser.keys('PageDown');

		assert.deepEqual(new Date(calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year range in the year picker", () => {
		const calendar = browser.$("#calendar1");
		calendar.setProperty("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

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
	});
});
