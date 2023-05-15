import datepicker from "../../pageobjects/DatePickerTestPage.js";
import { assert } from "chai";

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
});
