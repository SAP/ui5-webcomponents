import { assert } from "chai";

describe("Calendar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Calendar.html`);
	});

	it("Calendar is rendered", async () => {
		const calendar = await browser.$("#calendar1").shadow$(".ui5-cal-root");

		assert.ok(calendar, "Calendar is rendered");
	});

	it("Year is set in the header", async () => {
		const calendarHeader = await browser.$("#calendar1").shadow$("ui5-calendar-header");
		const yearButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`);
		const headerText = parseInt(await yearButton.getText());
		const currentYear = new Date().getFullYear();

		assert.equal(headerText, currentYear, "Year is set in the header");
	});

	it("Month is set in the header", async () => {
		const monthMap = new Map();
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, index) => {
			monthMap.set(index, month);
		});

		const calendarHeader = await browser.$("#calendar1").shadow$("ui5-calendar-header");
		const monthButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`);
		const monthText = await monthButton.getText();
		const currentMonth = new Date().getMonth();

		assert.strictEqual(monthText, monthMap.get(currentMonth), "Month is set in the header");
	});

	it("Focus goes into the current day item of the day picker", async () => {
		const toggleButton = await browser.$("#weekNumbersButton");
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);
		const dayPicker = await calendar.shadow$("ui5-daypicker");
		const header = await calendar.shadow$("ui5-calendar-header");
		const currentDayItem = await dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		const monthButton = await header.shadow$(`[data-ui5-cal-header-btn-month]`);
		const yearButton = await header.shadow$(`[data-ui5-cal-header-btn-year]`);

		await toggleButton.click();
		await toggleButton.click();

		await browser.keys("Tab");
		assert.ok(await currentDayItem.isFocusedDeep(), "Current calendar day item is focused");

		await browser.keys("Tab");
		assert.ok(await monthButton.isFocusedDeep(), "Month picker button is focused");

		await browser.keys("Tab");
		assert.ok(await yearButton.isFocusedDeep(), "Year picker button is focused");

		await browser.keys(["Shift", "Tab"]);
		assert.ok(await monthButton.isFocusedDeep(), "Month picker button is focused");

		await browser.keys(["Shift", "Tab"]);
		assert.ok(await currentDayItem.isFocusedDeep(), "Current calendar day item is focused");
	});

	it("Calendar focuses the selected year when yearpicker is opened", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		const yearPicker = await calendar.shadow$("ui5-yearpicker");
		const YEAR = 1997;
		await calendar.setAttribute("timestamp", Date.UTC(YEAR) / 1000);
		await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`).click();
		const focusedItemTimestamp = await yearPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		const focusedYear = new Date(parseInt(focusedItemTimestamp) * 1000).getUTCFullYear();
		assert.strictEqual(focusedYear, 1997, "The focused year is 1997");
	});

	it("Calendar focuses the selected month when monthpicker is opened with space", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		const dayPicker = await calendar.shadow$("ui5-daypicker");
		const monthPicker = await calendar.shadow$("ui5-monthpicker");
		const currentDayItem = await dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);

		await currentDayItem.click();
		await browser.keys("Tab");
		await browser.keys("Space");

		const focusedItemTimestamp = await monthPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		const isHidden = await monthPicker.getAttribute("hidden");
		assert.notOk(isHidden, "The monthpicker is present");
		const focusedMonth = new Date(parseInt(focusedItemTimestamp) * 1000).getUTCMonth();
		assert.strictEqual(focusedMonth, 10, "The focused month is November");
	});

	it("Calendar focuses the selected year when yearpicker is opened with space", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		const dayPicker = await calendar.shadow$("ui5-daypicker");
		const yearPicker = await calendar.shadow$("ui5-yearpicker");
		const currentDayItem = await dayPicker.shadow$(`div[data-sap-timestamp="974851200"]`);
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 22, 0, 0, 0)).valueOf() / 1000);

		await currentDayItem.click();
		await browser.keys("Tab");
		await browser.keys("Tab");
		await browser.keys("Space");

		const isHidden = await yearPicker.getAttribute("hidden");
		assert.notOk(isHidden, "The yearpicker is present");
		const focusedItemTimestamp = await yearPicker.shadow$(`[tabindex="0"]`).getAttribute("data-sap-timestamp");
		const focusedYear = new Date(parseInt(focusedItemTimestamp) * 1000).getUTCFullYear();
		assert.strictEqual(focusedYear, 2000, "The focused year is 2000");
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`).click();
		const focusedItem = await calendar.shadow$("ui5-yearpicker").shadow$(`[data-sap-timestamp="973036800"]`);

		assert.ok(await focusedItem.isFocusedDeep(), "Current year element is the active element");
		assert.notOk(await focusedItem.hasClass("ui5-yp-item--selected"), "Current year is not selected");
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);
		await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-month]`).click();
		const focusedItem = await calendar.shadow$("ui5-monthpicker").shadow$(`[data-sap-timestamp="973036800"]`);

		assert.ok(await focusedItem.isFocusedDeep(), "Current month element is the active element");
		assert.notOk(await focusedItem.hasClass("ui5-mp-item--selected"), "Current month is not selected");
	});

	it("Page up/down increments/decrements the month value", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");

		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys('PageUp');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));

		await browser.keys('PageDown');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Shift + Page up/down increments/decrements the year value by one", async () => {
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys(['Shift', 'PageUp']);

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 10, 1, 0, 0, 0)));

		await browser.keys(['Shift', 'PageDown']);

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", async () => {
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 10, 1, 0, 0, 0)).valueOf() / 1000);

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys(['Control', 'Shift', 'PageUp']);

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1990, 10, 1, 0, 0, 0)));

		await browser.keys(['Control', 'Shift', 'PageDown']);

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year value in the month picker", async () => {
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys(["F4"]);
		await browser.keys('PageUp');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));

		await browser.keys('PageDown');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("Page up/down increments/decrements the year range in the year picker", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 1, 0, 0, 0)).valueOf() / 1000);

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys(['Shift', 'F4']);
		await browser.keys('PageUp');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(1980, 9, 1, 0, 0, 0)));

		await browser.keys('PageDown');

		assert.deepEqual(new Date(await calendar.getProperty("timestamp") * 1000), new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
	});

	it("When month picker is shown the month button is hidden", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		const calendarHeader = await calendar.shadow$("ui5-calendar-header");

		await calendar.shadow$("ui5-daypicker").shadow$(`[tabindex="0"]`).click();
		await browser.keys(["F4"]);
		await browser.keys('PageUp');

		assert.ok(await calendarHeader.shadow$("[data-ui5-cal-header-btn-month]").getAttribute("hidden"), "The button for month is hidden");
		await browser.keys("Space");
	});

	it("Calendar with 'Multiple' selection type", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("selection-mode", "Multiple");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);

		const dates = [
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971136000"]`),
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971222400"]`),
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971308800"]`),
		];

		await Promise.all(dates.map(async date => {
			await date.click();
			assert.ok(await date.hasClass("ui5-dp-item--selected"), `${await date.getAttribute("data-sap-timestamp")} is selected`);
		}));

		const selectedDates = await calendar.getProperty("selectedDates");
		const expectedDates = [971136000, 971222400, 971308800];

		assert.deepEqual(selectedDates.sort(), expectedDates.sort(), "Change event is fired with proper data");
	});

	it("Keyboard navigation works properly, when calendar selection type is set to 'Multiple'", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const toggleButton = await browser.$("#weekNumbersButton");
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("selection-mode", "Multiple");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);

		await toggleButton.click();
		await toggleButton.click();
		await browser.keys("Tab");
		// Select the focused date
		await browser.keys("Space");

		// Deselect the focused date
		await browser.keys("Space");
		await browser.keys("ArrowRight");

		assert.ok(await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971222400"]`).isFocusedDeep(), "Focus is properly set");
	});

	it("Calendar with 'Range' selection type", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar1");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);
		await calendar.setAttribute("selection-mode", "Range");

		const dates = [
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971740800"]`),
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971827200"]`),
			await calendar.shadow$("ui5-daypicker").shadow$(`[data-sap-timestamp="971913600"]`),
		];

		await dates[0].click();
		await dates[2].click();

		assert.ok(await dates[0].hasClass("ui5-dp-item--selected"), `${await dates[0].getAttribute("data-sap-timestamp")} is selected`);
		assert.ok(await dates[1].hasClass("ui5-dp-item--selected-between"), `${await dates[1].getAttribute("data-sap-timestamp")} is selected between`);
		assert.ok(await dates[2].hasClass("ui5-dp-item--selected"), `${await dates[2].getAttribute("data-sap-timestamp")} is selected`);

		const selectedDates = await calendar.getProperty("selectedDates");
		const expectedDates = [971740800, 971913600];

		assert.deepEqual(selectedDates.sort(), expectedDates.sort(), "Change event is fired with proper data");
	});

	it("Previous and next buttons are disabled when necessary", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendarHeader = await browser.$("#calendar4").shadow$("ui5-calendar-header");
		const prevButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-prev]`);
		const nextButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-next]`);

		assert.ok(await prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is disabled");
		assert.notOk(await nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is enabled");

		await nextButton.click();

		assert.notOk(await prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is enabled");
		assert.notOk(await nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is enabled");

		await nextButton.click();
		await nextButton.click();

		assert.notOk(await prevButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Previous Button is enabled");
		assert.ok(await nextButton.hasClass("ui5-calheader-arrowbtn-disabled"), "Next Button is disabled");
	});

	it("Second month and year are rendered in the header", async () => {
		const calendar = await browser.$("#calendar5");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000);
		const calendarHeader = await browser.$("#calendar5").shadow$("ui5-calendar-header");
		const monthButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`).$$('span');
		const yearButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`).$$('span');

		assert.strictEqual(monthButton.length, 2, "Second month is rendered");
		assert.strictEqual(yearButton.length, 2,"Second year is rendered");
	});

	it("Buttons for month and year in header are rendered with correct value", async () => {
		const calendarHeader = await browser.$("#calendar5").shadow$("ui5-calendar-header");
		const monthButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-month]`).$$('span');
		const yearButton = await calendarHeader.shadow$(`[data-ui5-cal-header-btn-year]`).$$('span');

		assert.strictEqual(await monthButton[0].getText(), "Rajab", "first month set in the header");
		assert.strictEqual(await monthButton[1].getText(), "Sep – Oct", "Second month set in the header");

		assert.strictEqual(await yearButton[0].getText(), "1421 AH", "first year set in the header");
		assert.strictEqual(await yearButton[1].getText(), "2000", "Second year set in the header");
	});

	it("Calendar render two type for Month when MonthPicker is opened", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar5");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).valueOf() / 1000);
		await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-month]`).click();
		const months = await calendar.shadow$("ui5-monthpicker").shadow$$(`.ui5-mp-item`);
		const montInfo = await months[0].$$('span');

		assert.strictEqual(await montInfo.length, 2, "Month is rendered with two text")
		assert.strictEqual(await montInfo[0].getText(), "Muharram", "First text of month set in the button")
		assert.strictEqual(await montInfo[1].getText(), "Apr – May", "Second text of month set in the button")
	});

	it("Calendar render two type for Year when YaerPicker is opened", async () => {
		await browser.url(`test/pages/Calendar.html`);
		const calendar = await browser.$("#calendar5");
		await calendar.setAttribute("timestamp", new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).valueOf() / 1000);
		await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`).click();
		const years = await calendar.shadow$("ui5-yearpicker").shadow$$(`.ui5-yp-item`);
		const yaerInfo = await years[0].$$("span");

		assert.strictEqual(await years.length, 8, "YearPicker with two types only renders 8 years")
		assert.strictEqual(await yaerInfo[0].getText(), "1416 AH", "First text of year set in the button")
		assert.strictEqual(await yaerInfo[1].getText(), "1995 - 1996", "Second text of year set in the button")
	});

	it("Min and max dates are set without format-pattern by using ISO (YYYY-MM-dd) format", async () => {
		await browser.url("test/pages/Calendar.html");

		const calendar = await browser.$("#calendar6");
		await calendar.setAttribute("max-date", new Date(Date.UTC(2024, 9, 4, 0, 0, 0)).toISOString().split("T")[0]); // sets the max date to 2024-10-04
		
		const yearButton = await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`);
		await yearButton.click();

		const year2025 = await calendar.shadow$("ui5-yearpicker").shadow$$(`div[role="gridcell"] span`).find(async span => {
			const text = await span.getText();
			return text === "2025";
		}).parentElement();

		assert.strictEqual(await year2025.hasClass("ui5-yp-item--disabled"), true, "Year 2025 is disabled");
	});

	it("Min and max dates are NOT set without format-pattern, because are not in ISO format (YYYY-MM-dd)", async () => {
		await browser.url("test/pages/Calendar.html");

		const calendar = await browser.$("#calendar1");
		const nextButton = await calendar.shadow$("ui5-calendar-header").shadow$("[data-ui5-cal-header-btn-next]");
		const prevButton = await calendar.shadow$("ui5-calendar-header").shadow$("[data-ui5-cal-header-btn-prev]");
		const yearButton = await calendar.shadow$("ui5-calendar-header").shadow$(`div[data-ui5-cal-header-btn-year]`);
		// setting the min and max dates both to a valid format date, but not in the valid ISO format.
		await calendar.setAttribute("max-date", `${new Date(Date.UTC(2024, 9, 4, 0, 0, 0))}`);
		await calendar.setAttribute("min-date", "25.10.2018");
		console.log(await calendar.getAttribute("max-date"));

		await yearButton.click();
		const year2016 = await calendar.shadow$("ui5-yearpicker").shadow$$(`div[role="gridcell"] span`).find(async span => {
			const text = await span.getText();
			return text === "2016";
		}).parentElement();

		assert.strictEqual(await year2016.hasClass("ui5-yp-item--disabled"), false, "Year 2016 is not disabled");

		const year2024 = await calendar.shadow$("ui5-yearpicker").shadow$$(`div[role="gridcell"] span`).find(async span => {
			const text = await span.getText();
			return text === "2024";
		}).parentElement();

		assert.strictEqual(await year2024.hasClass("ui5-yp-item--disabled"), false, "Year 2024 is not disabled");
	});
});
