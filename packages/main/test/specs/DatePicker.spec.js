const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("chai").assert;

describe("Date Picker Tests", () => {
	before(async () => {
		await datepicker.open();
	});

	it("input renders", async () => {
		datepicker.id = "#dp";

		const input = await datepicker.getInput();
		const innerInput = await datepicker.getInnerInput();

		assert.ok(await input.isDisplayedInViewport(), "input is rendered");
		assert.ok(await innerInput.isDisplayedInViewport(), "inner input is rendered");
		assert.strictEqual(await innerInput.getAttribute("aria-roledescription"), "Date Input", "aria-roledescription attribute is added.");
		assert.strictEqual(await innerInput.getAttribute("aria-haspopup"), "Grid", "aria-haspopup attribute is added.");
		assert.notOk(await innerInput.getAttribute("aria-controls"), "aria-controls attribute isn't rendered.");
		assert.notOk(await innerInput.getAttribute("aria-expanded"), "aria-expanded attribute isn't rendered.");
	});

	it("input receives value", async () => {
		datepicker.id = "#dp1";

		const innerInput = await datepicker.getInnerInput();
		const date = new Date(await innerInput.getValue());

		assert.equal(date.getDate(), 11);
		assert.equal(date.getMonth(), 10);
		assert.equal(date.getFullYear(), 2011);
	});

	it("input receives value in format pattern depending on the set language", async () => {
		await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=bg`);
		datepicker.id = "#dp16";

		const setDateButton = await browser.$("#b1");

		await setDateButton.click();

		const innerInput = await datepicker.getInnerInput();
		assert.equal(await innerInput.getValue(), "11 декември 2018 г.");
	});

	it("custom formatting", async () => {
		await datepicker.open();
		datepicker.id = "#dp2";

		assert.ok(await datepicker.isValid("2018, 05/05"), "custom value is valid");
	});

	it("value state", async () => {
		datepicker.id = "#dp3";
		const root = await datepicker.getRoot();
		const input = await datepicker.getInput();

		await root.setAttribute("value-state", "Error");

		assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = await browser.$("#dp3").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Value State Message", async () => {
		datepicker.id = "#dp17";
		const input = await datepicker.getInput();
		await input.click();

		const inputStaticAreaItem = await datepicker.getInputStaticAreaItem();
		const popover = await inputStaticAreaItem.shadow$("ui5-popover");

		const slot = await popover.$("#coolValueStateMessage");
		assert.notOk(slot.error, "Value State message slot is working");
	});

	it("disabled", async () => {
		datepicker.id = "#dp2";
		const root = await datepicker.getRoot();
		const input = await datepicker.getInput();

		await root.setAttribute("disabled", "");

		assert.ok(await input.getProperty("disabled"),  "input has disabled property");
	});

	it("readonly", async () => {
		datepicker.id = "#dp3";

		const root = await datepicker.getRoot();
		await root.setAttribute("readonly", "");

		const input = await datepicker.getInput();
		assert.ok(await input.getProperty("readonly"),  "input has readonly set");
		assert.notOk(await datepicker.hasIcon(), "icon is not displayed");
	});

	it("required", async () => {
		datepicker.id = "#dp-required";

		const input = await datepicker.getInput();
		const innerInput = await datepicker.getInnerInput();
		assert.ok(await input.getProperty("required"), "input has required set");
		assert.strictEqual(await innerInput.getAttribute("aria-required"), "true", "Aria-required attribute is set correctly.");

		const root = await datepicker.getRoot();
		await root.removeAttribute("required");

		assert.notOk(await input.getProperty("required"), "required property is not set");
		assert.strictEqual(await innerInput.getAttribute("aria-required"), "false", "Aria-required attribute is set correctly.");
	});

	it("placeholder", async () => {
		const root = await datepicker.getRoot();
		await root.setAttribute("placeholder", "test placeholder");

		const innerInput = await datepicker.getInnerInput();
		assert.equal(await innerInput.getProperty("placeholder"), "test placeholder", "input has correct placeholder");
		assert.equal(await innerInput.getAttribute("placeholder"), "test placeholder", "has correct placeholder attribute");
	});

	it("primary calendar type", async () => {
		const root = await datepicker.getRoot();
		await root.setAttribute("primary-calendar-type", "Islamic");

		const calendar = await datepicker.getCalendar();
		assert.equal(await calendar.getProperty("primaryCalendarType"), "Islamic", "calendar has correct calendar type");
	});

	it("Islamic calendar type input value", async () => {
		datepicker.id = "#dp3";

		const root = await datepicker.getRoot();
		await root.setAttribute("primary-calendar-type", "Islamic");
		await root.setAttribute("format-pattern", "MMM d, y G");

		assert.ok(await datepicker.isValid("Rab. I 6, 1440 AH"), "Islamic value is valid");

		await root.setAttribute("value", "Rab. I 6, 1440 AH");

		const innerInput = await datepicker.getInnerInput();
		assert.equal(await innerInput.getProperty("value"), "Rab. I 6, 1440 AH", "input has correct Islamic value");
	});

	it("Selected date from daypicker is the same as datepicker date", async () => {
		datepicker.id = "#dp4";

		//open picker
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		//select a date
		const pickerDate = await datepicker.getPickerDate(1547164800); //Jan 11, 2019
		await pickerDate.click();

		const innerInput = await datepicker.getInnerInput();
		assert.equal(await innerInput.getProperty("value"), "Jan 11, 2019", "input has the correct value");
	});

	it("focusout fires change", async () => {
		datepicker.id = "#dp5";

		const input = await datepicker.getInput();
		await input.click();
		const root = await datepicker.getRoot();
		await root.keys("Jan 1, 1999");
		await browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(await browser.$("#lbl").getHTML(false), "1", 'change has fired once');
	});

	it("delete input value then open picker keeps the empty value", async () => {
		datepicker.id = "#dp6";

		const timestamp_6_Jan_2015 = 1420502400;
		const timestamp_8_Jan_2015 = timestamp_6_Jan_2015 + 2 * 24 * 60 * 60;

		//type in the input
		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 6, 2015");

		//open picker
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const calendarDate_6_Jan_2015 = await datepicker.getPickerDate(timestamp_6_Jan_2015); //Jan 6, 2015
		const calendarDate_8_Jan_2015 = await datepicker.getPickerDate(timestamp_8_Jan_2015); //Jan 6, 2015
		assert.ok(await calendarDate_6_Jan_2015.hasClass('ui5-dp-item--selected'), "calendar selected date is ok");

		//select a date
		await calendarDate_8_Jan_2015.click();

		//check if the picker is closed and the datepicker value is correct
		assert.notOk(await datepicker.isPickerOpen(), "picker is closed");
		const input = await datepicker.getInput();
		assert.equal(await input.getProperty("value"), "Jan 8, 2015", "datepicker value is Jan 8, 2015");

		//then delete the value
		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys("\b\b\b\b\b\b\b\b\b\b\b");

		//then open the picker
		await valueHelpIcon.click();

		//check if the datepicker value is still empty
		assert.equal(await innerInput.getProperty("value"), "", "datepicker value is empty");

		//check if the picker is open and the selected date in the calendar is correct

		assert.ok(await datepicker.isPickerOpen(), "picker is open");
		assert.notOk(await calendarDate_6_Jan_2015.hasClass("ui5-dp-item--selected"), "calendar selected dates is ok");
		assert.notOk(await calendarDate_8_Jan_2015.hasClass("ui5-dp-item--selected"), "calendar selected dates is ok");

		await valueHelpIcon.click();
	});

	it("respect first day of the week - monday", async () => {
		await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=bg`);
		datepicker.id = "#dp7_1";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "фев 6, 2019");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();

		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, "1548633600", "28 Jan is the first displayed date for Feb 2019")

		const calendarDate_3_Feb_2019 = await datepicker.getPickerDate(1549152000);

		assert.ok(await calendarDate_3_Feb_2019.hasClass("ui5-dp-wday6"), "3 Feb 2019 is displayed as last day of the week");
	});

	it("if today is 30 jan, clicking next month does not skip feb", async () => {
		await datepicker.open();

		datepicker.id = "#dp7_2";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 30, 2019");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		(await datepicker.getBtnNext()).click();

		const firstDisplayedDate = (await datepicker.getFirstDisplayedDate());

		// first displayed date should be Jan 27, 2019, so this is February
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, "1548547200", "Feb is the displayed month");
	});

	it("picker stays open on input click", async () => {
		await datepicker.open();

		datepicker.id = "#dp6";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();

		assert.ok(datepicker.isPickerOpen(), "picker is open");
		assert.ok(await innerInput.isFocusedDeep(), "input is focused");
	});

	it("change fires when we change the input back to its original value", async () => {
		datepicker.id = "#dp8"; // initial value is Jan 6, 2015

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		await innerInput.keys("Jan 8, 2015");
		await browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(await browser.$("#lbl").getHTML(false), "1", 'change has fired once');

		await innerInput.click();
		await browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		await innerInput.keys("Jan 6, 2015");
		await browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(await browser.$("#lbl").getHTML(false), "2", 'change has fired once');
	});

	it("change fires every time tomorrow is typed and normalized", async () => {
		let tomorrowDate;
		const lblChangeCounter = await browser.$("#lblTomorrow");
		const lblTomorrowDate = await browser.$("#lblTomorrowDate");

		datepicker.id = "#dp13";

		// Type tomorrow.
		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await innerInput.keys("tomorrow");

		// Press Enter, store the date and delete it.
		await innerInput.keys("Enter");
		tomorrowDate = await lblTomorrowDate.getHTML(false);
		await browser.keys("\b\b\b\b\b\b\b\b\b\b\b\b\b");
		await innerInput.keys("Enter");

		// Type tomorrow and press Enter for the second time.
		await innerInput.keys("tomorrow");
		await innerInput.keys("Enter");

		// Two change events should be fired and the date should twice normalized
		assert.equal(await lblChangeCounter.getHTML(false), "3", 'change event is being fired twice');
		assert.equal(await lblTomorrowDate.getHTML(false), tomorrowDate, 'tomorrow is normalized to date twice as well');
	});

	it("today value is normalized and correctly rounded to 00:00:00", async () => {
		datepicker.id = "#dp9";

		let timestampToday = new Date().getTime();
		timestampToday = (timestampToday - timestampToday % (24 * 60 * 60 * 1000)) / 1000;

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		const calendar = await datepicker.getCalendar();
		assert.equal(await calendar.getProperty('timestamp'), timestampToday, "calendar selected dates is ok");

		const calendarDateToday = await datepicker.getPickerDate(timestampToday);
		assert.ok(await calendarDateToday.hasClass('ui5-dp-item--selected'), "calendar selected date is ok");
	});

	it("does not open, if disabled", async () => {
		datepicker.id = "#dp10";

		assert.notOk(await datepicker.isPickerOpen(), "picker is closed initially.");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		assert.equal((await valueHelpIcon.getCSSProperty('pointer-events')).value, "none", "pointer events are none");
	});

	it("[F4] toggles the calendar", async () => {
		datepicker.id = "#dp11";

		assert.notOk(await datepicker.isPickerOpen(), "datepicker is closed");

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys("F4");

		assert.ok(await datepicker.isPickerOpen(), "datepicker is open");
	});

	it("[Alt] + [UP] toggles the calendar", async () => {
		datepicker.id = "#dp9";

		assert.notOk(await datepicker.isPickerOpen(), "datepicker is closed");

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);

		assert.ok(await datepicker.isPickerOpen(), "datepicker is open");

		await browser.keys(["Alt", "ArrowUp", "NULL"]);

		assert.notOk(await datepicker.isPickerOpen(), "datepicker is closed");
	});

	it("[Alt] + [DOWN] toggles the calendar", async () => {
		datepicker.id = "#dp11";

		assert.notOk(await datepicker.isPickerOpen(), "datepicker is closed");

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys(["Alt", "ArrowDown", "NULL"]);

		assert.ok(await datepicker.isPickerOpen(), "datepicker is open");

		await browser.keys(["Alt", "ArrowDown", "NULL"]);

		assert.notOk(await datepicker.isPickerOpen(), "datepicker is closed");
	});

	it("[F4] shows year picker after date picker is open", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys("F4");

		const calendar = await datepicker.getCalendar();
		assert.notOk((await calendar.shadow$("ui5-monthpicker"))._hidden, "Month picker is open");
		await valueHelpIcon.click(); // close the datepicker
	});

	it("[SHIFT] + [F4] shows year picker after date picker is open", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys(['Shift', 'F4']);

		const calendar = await datepicker.getCalendar();
		assert.notOk((await calendar.shadow$("ui5-yearpicker"))._hidden, "Year picker is open");
		await valueHelpIcon.click(); // close the datepicker
	});

	it("[F4] shows month picker after year picker is open", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys(['Shift', 'F4']);
		await browser.keys('F4');

		const calendar = await datepicker.getCalendar();
		assert.notOk((await calendar.shadow$("ui5-monthpicker"))._hidden, "Year picker is open");
		await valueHelpIcon.click(); // close the datepicker
	});


	it("[SHIFT] + [F4] shows year picker after month picker is open", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys('F4');
		await browser.keys(['Shift', 'F4']);

		const calendar = await datepicker.getCalendar();
		assert.notOk((await calendar.shadow$("ui5-yearpicker"))._hidden, "Year picker is open");
		await valueHelpIcon.click(); // close the datepicker
	});

	it("DatePicker popover when initially opened displays a day picker", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys('F4'); // show month picker
		await valueHelpIcon.click(); // close the datepicker

		const calendar = await datepicker.getCalendar();
		assert.notOk((await calendar.shadow$("ui5-daypicker"))._hidden, "Day picker is open");

		await browser.keys(['Shift', 'F4']); // show year picker
		await valueHelpIcon.click(); // close the datepicker

		await valueHelpIcon.click(); // open the datepicker
		assert.notOk((await calendar.shadow$("ui5-daypicker"))._hidden, "Day picker is open");

		await valueHelpIcon.click(); // close the datepicker
	});


	it("[F4] on year picker doesn't close the date picker", async () => {
		datepicker.id = "#dp11";

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();
		await browser.keys("F4");

		await browser.keys("F4");

		assert.ok(await datepicker.isPickerOpen(), "Datepicker remains open");
	});

	it("daypicker extreme values max", async () => {
		var _28Nov9999 = "253399363200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9999");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();

		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _28Nov9999, "28 Nov, 9999 is the first displayed date");
	});

	it("daypicker extreme values min", async () => {
		var _31Dec0000 = "-62135683200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0001");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _31Dec0000, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker prev extreme values min", async () => {
		var _31Dec0000 = "-62135683200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Feb 1, 0001");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _31Dec0000, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker next extreme values max", async () => {
		var _28Nov9999 = "253399363200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Nov 30, 9999");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _28Nov9999, "28 Nov, 9999 is the first displayed date");
	});

	it("monthpicker next extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9998");

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		const btnYear = await datepicker.getBtnYear();
		const innerHTML = await btnYear.getProperty("innerHTML");
		assert.include(innerHTML, "9999", "year button's text is correct");
	});

	it("monthpicker prev extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0002");

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		const btnYear = await datepicker.getBtnYear();
		const innerHTML = await btnYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "year button's text is correct");
	});

	it("yearpicker extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9995");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9980", "First year in the year picker is correct");
	});

	it("yearpicker extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0003");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("yearpicker prev page extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0012");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		let firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		let innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0002", "First year in the year picker is correct");

		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("yearpicker next page extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9986");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		let firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		let innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9976", "First year in the year picker is correct");

		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9980", "First year in the year picker is correct");
	});

	it("yearpicker click extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9986");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const tenthYear = await datepicker.getDisplayedYear(10);
		let innerHTML = await tenthYear.getProperty("innerHTML");
		assert.include(innerHTML, "9986", "Tenth year in the year picker is correct");

		await tenthYear.click();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9976", "First year in the year picker is correct");
	});

	it("yearpicker click extreme values min above 10", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0012");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const thirdYear = await datepicker.getDisplayedYear(2);
		const innerHTML = await thirdYear.getProperty("innerHTML");
		assert.include(innerHTML, "0004", "Third year in the year picker is correct");
	});

	it("yearpicker click extreme values min below 10", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0004");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("placeholder, based on the formatPattern", async () => {
		datepicker.id = "#dp14";

		const pickerFormatPattern = "MMM d, y";
		const innerInput = await datepicker.getInnerInput();
		const innerInputPlaceholder = await innerInput.getProperty("placeholder");

		// The DatePicker has no placeholder set, in this case a default placeholder, based on the format pattern,
		//  is set to the internal input.
		const root = await datepicker.getRoot()
		assert.notOk(await root.getProperty("placeholder"), "The DatePicker has no placeholder set");
		assert.equal(innerInputPlaceholder, pickerFormatPattern, "By default, the inner input has the formatPattern as placeholder");
	});

	it("placeholder, set by the user", async () => {
		datepicker.id = "#dp15";

		const placeholder = "Delivery date";
		const innerInput = await datepicker.getInnerInput();
		const innerInputPlaceholder = await innerInput.getProperty("placeholder");

		// The DatePicker has placeholder set, in this case the default placeholder, based on the format pattern,
		// is not displayed.
		const root = await datepicker.getRoot();
		assert.ok(await root.getProperty("placeholder"), "The DatePicker has placeholder set");
		assert.equal(innerInputPlaceholder, placeholder, "The inner input has the placeholder, set by the user");
	});

	it("Going under the minimum date changes value state", async () => {
		datepicker.id = "#dp33";

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await innerInput.keys("Jan 1, 1999");
		await innerInput.keys("Enter");

		const input = await datepicker.getInput();
		assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Going over the maximum date changes value state", async () => {
		datepicker.id = "#dp33";

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		while(await innerInput.getValue() !== ""){
			await innerInput.keys("Backspace");
		}

		await innerInput.keys("May 5, 2100");
		const root = await datepicker.getRoot();
		await root.keys("Enter");

		const input = await datepicker.getInput();
		assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Maximum or minimum date changes value state to none", async () => {
		datepicker.id = "#dp33";

		const input = await datepicker.getInput();
		const innerInput = await datepicker.getInnerInput();
		await input.click();
		while(await innerInput.getValue() !== ""){
			await innerInput.keys("Backspace");
		}

		await innerInput.keys("Jan 8, 2100");
		const root = await datepicker.getRoot();
		await root.keys("Enter");

		assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid (1)");

		await input.click();
		await root.setProperty("value", "Jan 1, 2000");
		await root.keys("Enter");

		assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid (2)");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Years are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		const input = await datepicker.getInput();
		await input.click();
		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 8, 2100");
		await root.keys("Enter");

		await datepicker.openPicker();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();
		let displayedYear = await datepicker.getDisplayedYear(11);
		assert.ok(await displayedYear.hasClass("ui5-yp-item--disabled"), "Years out of range are disabled");
		await root.keys("ArrowRight");

		displayedYear = await datepicker.getDisplayedYear(10);
		assert.ok(await displayedYear.isFocusedDeep(), "Focus remained on year 2100");

		displayedYear = await datepicker.getDisplayedYear(11);
		assert.notOk(await displayedYear.isFocusedDeep(), "Years out of range (2101) can not be reached with keyboard");
	});

	it("Months are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		await datepicker.openPicker();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		let displayedMonth = await datepicker.getDisplayedMonth(10);
		assert.ok(await displayedMonth.hasClass("ui5-mp-item--disabled"), "Months out of range are disabled");

		const root = await datepicker.getRoot();
		await root.keys("ArrowDown");

		displayedMonth = await datepicker.getDisplayedMonth(0);
		assert.ok(await displayedMonth.isFocusedDeep(), "Months out of range  can not be reached with keyboard");
	});

	it("Days are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		const root = await datepicker.getRoot();
		await root.keys("Escape");
		await browser.$("#dp33").scrollIntoView();
		await datepicker.openPicker();

		const displayedDay = await datepicker.getDisplayedDay(15);
		assert.ok(await displayedDay.hasClass("ui5-dp-item--disabled"), "Days out of range are disabled");
	});

	it("Days are disabled when out of range", async () => {
		datepicker.id = "#dp33";
		const root = await datepicker.getRoot();
		await root.keys("Escape");

		datepicker.id = "#dp34";
		await datepicker.openPicker();

		const displayedDay = await datepicker.getDisplayedDay(14);
		assert.ok(await displayedDay.isFocusedDeep(), "Days out of range are disabled");
	});

	it("Min and Max date are included in the interval", async () => {
		datepicker.id = "#dp33";

		const root = await datepicker.getRoot();
		await root.keys("Escape");
		await datepicker.openPicker();

		let displayedDay = await datepicker.getDisplayedDay(9);
		assert.notOk(await displayedDay.hasClass("ui5-dp-item--disabled"), "Min date is included");

		displayedDay = await datepicker.getDisplayedDay(11);
		assert.notOk(await displayedDay.hasClass("ui5-dp-item--disabled"), "Max date is included");
	});

	it("Tests week numbers column visibility", async () => {
		// act
		datepicker.id = "#dp18";
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		// assert
		let dayPicker = await datepicker.getDayPicker();
		const weekNumbersCol1 = await dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.ok(await weekNumbersCol1.isExisting(), "The week numbers column is visible.");

		// close date picker
		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);

		// act
		datepicker.id = "#dp19";
		await valueHelpIcon.click();

		// assert
		dayPicker = await datepicker.getDayPicker();
		const weekNumbersCol2 = await dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.notOk(await weekNumbersCol2.isExisting(), "The week numbers column is hidden.");

		// close date picker
		await innerInput.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);
	});

	it("Calendar root have correct attribute", async () => {

		datepicker.id = "#dp18";
		(await datepicker.getValueHelpIcon()).click();
		const monthpickerContent = (await datepicker.getDayPicker()).shadow$(".ui5-dp-content");

		assert.strictEqual(await monthpickerContent.getAttribute("role"), "grid", "Calendar root have correct role attribute");
		assert.strictEqual(await monthpickerContent.getAttribute("aria-roledescription"), "Gregorian calendar", "Calendar root have correct roledescription")

	});

	it("DayPicker content wrapped", async () => {
		datepicker.id = "#dp19";
		await datepicker.open();
		let arr = await datepicker.getDayPickerContent();

		arr.forEach(async function(el){
			assert.strictEqual(await el.getAttribute("role"), "row", "Content wrapper has correct role");
		});
	});

	it("DayPicker day name attribute", async () => {
		// await browser.url(`test/pages/DatePicker_test_page.html?sap-ui-language=en`);
		const root = await datepicker.getRoot();
		await root.setAttribute("primary-calendar-type", "Gregorian");
		// datepicker.id = "#dp13";
		// datepicker.openPicker();
		// const root = await datepicker.getRoot();
		await root.keys("May 3, 2100");
		// const root = await datepicker.getRoot();
		await root.keys("Enter");

		// const content = Array.from(datepicker.getDayPickerDayNames());
		// const dayName = ["Week number", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		// content.forEach((element,index) => {
		// 	assert.strictEqual(await element.getAttribute("role"), "columnheader", "Each day have column header role");
		// 	assert.strictEqual(await element.getAttribute("aria-label"), dayName[index], "Aria-label is correct");
		// });
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

		assert.equal(await input.getProperty("valueState"), "None", 'the value state is not changed');
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
});
