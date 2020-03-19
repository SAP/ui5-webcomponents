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

		browser.pause(100);

		assert.strictEqual(yearPicker.getProperty("_selectedYear"), YEAR, "Year is set");
	})
});
