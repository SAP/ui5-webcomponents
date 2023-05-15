
import datepicker from "../../pageobjects/DatePickerTestPage.js";
import { assert } from "chai";

describe("Date Picker Tests :: Part 2", () => {
	before(async () => {
		await datepicker.open();
	});

    it("DayPiker day number attribute", async () => {
        await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=en`);
        const root = await datepicker.getRoot();
        await root.setAttribute("primary-calendar-type", "Gregorian");
        datepicker.id = "#dp13";
        await datepicker.openPicker();
        await root.keys("May 3, 2100");
        await root.keys("Enter");

        const rows = Array.from(await datepicker.getDayPickerNumbers());
        const firstColumn = Array.from(await rows[1].$$("div"));
        const lastColumn = Array.from(await rows[rows.length - 1].$$("div"));

        assert.strictEqual(await firstColumn[0].getAttribute("role"), "rowheader", "The week number have rowheader role");
        assert.strictEqual(await firstColumn[1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
        assert.strictEqual(await firstColumn[firstColumn.length - 1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");

        assert.strictEqual(await lastColumn[0].getAttribute("role"), "rowheader", "The week number have rowheader role");
        assert.strictEqual(await lastColumn[1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
        assert.strictEqual(await lastColumn[firstColumn.length - 1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
    });

    it("DatePicker dates and week number", async () => {
        await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=en`);
        const root = await datepicker.getRoot();
        await root.setAttribute("primary-calendar-type", "Gregorian");
        datepicker.id = "#dp13";

        const input = await datepicker.getInput();
        await input.click();
        await browser.keys("May 3, 2100");
        await browser.keys("Enter");
        // open picker after accepting the date
        await datepicker.openPicker();

        const data = Array.from(await datepicker.getDayPickerDatesRow(2));
        assert.strictEqual(await data[0].getAttribute("aria-label"), "Calendar Week 18", "First columnheader have Week number aria-label");
        assert.strictEqual(await data[1].getAttribute("aria-label"), "Non-Working Day May 2, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
        assert.strictEqual(await data[2].getAttribute("aria-label"), "May 3, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
        assert.strictEqual(await data[3].getAttribute("aria-label"), "May 4, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
    });

    it("Tests aria-label", async () => {
        const EXPECTED_ARIA_LABEL = "Hello World";

        datepicker.id = "#dpAriaLabel";

        const innerInput = await datepicker.getInnerInput();
        assert.strictEqual(await innerInput.getAttribute("aria-label"), EXPECTED_ARIA_LABEL,
            "The aria-label is correct.")
    });

    it("Tests aria-labelledby", async () => {
        const EXPECTED_ARIA_LABEL = "info text";

        datepicker.id = "#dpAriaLabelledBy";

        const innerInput = await datepicker.getInnerInput();
        assert.strictEqual(await innerInput.getAttribute("aria-label"), EXPECTED_ARIA_LABEL,
            "The aria-label is correct.")
    });

    it("Page up/down increments/decrements the day value", async () => {
        datepicker.id = "#dp1";
        const root = await datepicker.getRoot();
        await root.setProperty("value", "Jan 1, 2000");

        const input = await datepicker.getInput();
        await input.click();

        await browser.keys('PageDown');

        const innerInput = await datepicker.getInnerInput();
        let date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 31, "Correct day value");
        assert.strictEqual(date.getMonth(), 11, "Correct month value");
        assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

        await browser.keys('PageUp');

        date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 1, "Correct day value");
        assert.strictEqual(date.getMonth(), 0, "Correct month value");
        assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
    });

    it("Shift + Page up/down increments/decrements the month value", async () => {
        datepicker.id = "#dp1";
        const root = await datepicker.getRoot();
        await root.setProperty("value", "Jan 1, 2000");

        const input = await datepicker.getInput();
        await input.click();

        await browser.keys(['Shift', 'PageDown']);

        const innerInput = await datepicker.getInnerInput();
        let date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 1, "Correct day value");
        assert.strictEqual(date.getMonth(), 11, "Correct month value");
        assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

        await browser.keys(['Shift', 'PageUp']);

        date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 1, "Correct day value");
        assert.strictEqual(date.getMonth(), 0, "Correct month value");
        assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
    });

    it("Ctrl + Shift + Page up/down increments/decrements the year value", async () => {
        datepicker.id = "#dp1";
        const root = await datepicker.getRoot();
        await root.setProperty("value", "Jan 1, 2000");

        const input = await datepicker.getInput();
        await input.click();

        await browser.keys(['Control', 'Shift', 'PageDown']);

        const innerInput = await datepicker.getInnerInput();
        let date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 1, "Correct day value");
        assert.strictEqual(date.getMonth(), 0, "Correct month value");
        assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

        await browser.keys(['Control', 'Shift', 'PageUp']);

        date = new Date(await innerInput.getValue());
        assert.strictEqual(date.getDate(), 1, "Correct day value");
        assert.strictEqual(date.getMonth(), 0, "Correct month value");
        assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
    });

    // it("Keyboard navigation works when there are disabled dates in the calendar grid", async () => {
    // 	datepicker.id = "#dp33";
    // 	const innerInput = await datepicker.getInnerInput();
    // 	await innerInput.doubleClick();
    // 	await browser.keys("Jan 1, 2000");

    // 	const valueHelpIcon = await datepicker.getValueHelpIcon();
    // 	await valueHelpIcon.click();

    // 	await browser.keys("ArrowDown");

    // 	const displayedDay = await datepicker.getDisplayedDay(13);
    // 	assert.ok(await displayedDay.isFocusedDeep(), "Successfully navigated");

    // 	await browser.keys("Escape");
    // 	await innerInput.doubleClick();
    // 	await browser.keys("Backspace");
    // });

    it("Value state changes only on submit", async () => {
        await browser.url(`test/pages/DatePicker.html?sap-ui-language=en`);
        datepicker.id = "#dp33";

        const innerInput = await datepicker.getInnerInput();
        await innerInput.click();
        await browser.keys("somereallylongtextthatshouldcheckifwevalidateoninput");

        const input = await datepicker.getInput();
        assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid");

        await browser.keys("Enter");

        assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");
    });

    it("focusout fires change but doesn't change the value state if the default behaviour is prevented", async () => {
        datepicker.id = "#dpPrevent";

        const input = await datepicker.getInput();
        await input.click();

        const root = await datepicker.getRoot();
        await root.keys("Jan 1, 1999999");
        await browser.$("#dp5").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

        assert.equal(await input.getProperty("value"), "", 'the value is not changed');
    });

    it("when value is prevented, the target value is restored to previous one", async () => {
        datepicker.id = "#dpPrevent";

        const input = await datepicker.getInput();
        await input.click();

        const root = await datepicker.getRoot();
        await root.keys("Mar 31, 1995");
        await browser.$("#dp5").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

        assert.equal(await input.getProperty("valueState"), "None", 'the value state is not changed');
        assert.equal(await browser.$("#lblChangePreventTargetValue").getHTML(false), "target value on event fire: Mar 31, 1995", 'the value is applied on target before prevention');
    });

    it("DatePicker's formatter has strict parsing enabled", async () => {
        await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=en`);
        datepicker.id = "#dp7_1";

        const input = await datepicker.getInput();
        assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid");

        const innerInput = await datepicker.getInnerInput();
        await innerInput.click();
        await browser.keys("Jan 60, 2000");
        await browser.keys("Enter");

        assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

        await innerInput.doubleClick();
        await browser.keys("Backspace");
        await browser.keys("Enter");
    });

    it("Invalid initial value isn't cleared due to formatting", async () => {
        datepicker.id = "#dp20";
        const input = await datepicker.getInput();

        assert.equal(await input.getProperty("value"), "Invalid value", "the value isn't changed");
    });

    it("Invalid state is refreshed after a value is picked by Calendar and set again", async () => {
        await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=en`);
        datepicker.id = "#dp33";

        const input = await datepicker.getInput();
        const innerInput = await datepicker.getInnerInput();
        await input.click();

        await innerInput.keys("asd")
        await innerInput.keys("Enter");

        assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid (1)");

        await datepicker.openPicker();

        const displayedDay = await datepicker.getDisplayedDay(15);
        await displayedDay.click();

        assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid (2)");

        await input.click();
        while(await innerInput.getValue() !== ""){
            await innerInput.keys("Backspace");
        }
        await innerInput.keys("asd");
        await innerInput.keys("Enter");


        assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid (3)");
    });

    it("should open calendar picker in CalendarMode.DAY_MONTH_YEAR mode", async () => {
        datepicker.id = "#dpCalendarModeDays";
        const innerInput = await datepicker.getInnerInput();
        await innerInput.click();
        await browser.keys("2020, 04/01");
        await browser.keys("Enter");

        await datepicker.openPicker();
        const calendar = await datepicker.getCalendar();

        const currentPicker = await calendar.getProperty("_currentPicker");
        assert.equal(currentPicker, "day", "calendar is opened on days");

        const dayPicker = await calendar.shadow$("ui5-daypicker");
        const monthPicker = await calendar.shadow$("ui5-monthpicker");
        const yearPicker = await calendar.shadow$("ui5-yearpicker");
        assert.notOk(await dayPicker.getAttribute("hidden"));
        assert.ok(await monthPicker.getAttribute("hidden"));
        assert.ok(await yearPicker.getAttribute("hidden"));

        const timestamp_30_Jan_2020 = 1580342400;
        const calendarDate_30_Jan_2020 = await datepicker.getPickerDate(timestamp_30_Jan_2020);
        await calendarDate_30_Jan_2020.click();

        assert.isFalse(await datepicker.isPickerOpen(), "picker is closed after day selection");
    });

    it("should open calendar picker in CalendarMode.MONTH_YEAR mode", async () => {
        datepicker.id = "#dpCalendarModeMonths";
        const innerInput = await datepicker.getInnerInput();
        await innerInput.click();
        await browser.keys("June 2023");
        await browser.keys("Enter");

        const calendar = await datepicker.getCalendar();
        await datepicker.openPicker();

        const currentPicker = await calendar.getProperty("_currentPicker");
        assert.equal(currentPicker, "month", "calendar is opened on months");

        const dayPicker = await calendar.shadow$("ui5-daypicker");
        const monthPicker = await calendar.shadow$("ui5-monthpicker");
        const yearPicker = await calendar.shadow$("ui5-yearpicker");
        assert.ok(await dayPicker.getAttribute("hidden"));
        assert.notOk(await monthPicker.getAttribute("hidden"));
        assert.ok(await yearPicker.getAttribute("hidden"));

        const timestamp_Nov_2023 = 1698796800;
        const calendarDate_Nov_2023 = await datepicker.getPickerMonth(timestamp_Nov_2023);
        await calendarDate_Nov_2023.click();

        assert.isFalse(await datepicker.isPickerOpen(), "picker is closed after month selection");
    });

    it("should open calendar picker in CalendarMode.YEAR mode", async () => {
        datepicker.id = "#dpCalendarModeYears";
        const innerInput = await datepicker.getInnerInput();
        await innerInput.click();
        await browser.keys("2018");
        await browser.keys("Enter");

        await datepicker.openPicker();
        const calendar = await datepicker.getCalendar();

        const currentPicker = await calendar.getProperty("_currentPicker");
        assert.equal(currentPicker, "year", "calendar is opened on months");

        const dayPicker = await calendar.shadow$("ui5-daypicker");
        const monthPicker = await calendar.shadow$("ui5-monthpicker");
        const yearPicker = await calendar.shadow$("ui5-yearpicker");
        assert.ok(await dayPicker.getAttribute("hidden"));
        assert.ok(await monthPicker.getAttribute("hidden"));
        assert.notOk(await yearPicker.getAttribute("hidden"));

        const timestamp_2014 = 1388534400;
        const calendarDate_2014 = await datepicker.getPickerYear(timestamp_2014);
        await calendarDate_2014.click();

        assert.isFalse(await datepicker.isPickerOpen(), "picker is closed after year selection");
    });

    it("Min and max dates are set, with no format pattern provided, using valid ISO format", async () => {
        datepicker.id = "#dpISOMinMaxDates";

        const Input = await datepicker.getInput();
        await Input.click();
        await browser.keys("Nov 1, 2020");
        await browser.keys("Enter");
        assert.equal(await Input.getProperty("valueState"), "Error", "Correct value state");

        await datepicker.openPicker();
        const btnYear = await datepicker.getBtnYear();
        await btnYear.click();
        let displayedYear = await datepicker.getDisplayedYear(3);

        assert.ok(await displayedYear.hasClass("ui5-yp-item--disabled"), "Year 2021 is disabled");
        // close the pickers and revert the datePicker state to initial
        await browser.keys("Enter");
        await browser.keys("Enter");
        await Input.setAttribute("value", "");
    });

    it("Min and max dates are NOT set because no format pattern is provided & format used is not ISO", async () => {
        datepicker.id = "#dpISOMinMaxDates";
        const root = await datepicker.getRoot();
        // set min-date and max-date to valid dates, but not in ISO format
        await root.setAttribute("min-date", "22.10.2020");
        await root.setAttribute("max-date", "22.10.2021");

        const Input = await datepicker.getInput();
        await Input.click();
        await browser.keys("Apr 12, 2024");
        await browser.keys("Enter");
        assert.equal(await Input.getProperty("valueState"), "None", "Correct value state");

        await datepicker.openPicker();
        const btnYear = await datepicker.getBtnYear();
        await btnYear.click();

        let displayedYear = await datepicker.getDisplayedYear(11);
        assert.notOk(await displayedYear.hasClass("ui5-yp-item--disabled"), "Year 2025 is not disabled");
    });
});
