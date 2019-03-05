const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("assert");

describe("Date Picker Tests", () => {
	before(() => {
		datepicker.page = 'http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_test_page.html';
		datepicker.open();
	});

	it("input renders", () => {
		datepicker.id = "#dp";
		assert.ok(datepicker.input.isDisplayedInViewport(), "input is rendered");
		assert.ok(datepicker.innerInput.isDisplayedInViewport(), "inner input is rendered");
	});

	it("calendar renders inside a popover", () => {
		datepicker.id = "#dp10";
		assert.ok(datepicker.popover.isDisplayedInViewport(), "popover is rendered");
		assert.ok(datepicker.calendar, "calendar is rendered");
	});

	it("input receives value", () => {
		datepicker.id = "#dp1";

		const date = new Date(datepicker.innerInput.getValue());

		assert.equal(date.getDate(), 11);
		assert.equal(date.getMonth(), 10);
		assert.equal(date.getFullYear(), 2011);
	});

	it("custom formatting", () => {
		datepicker.id = "#dp2";

		assert.ok(datepicker.isValid("2018, 05/05"), "custom value is valid");
	});

	it("value state", () => {
		datepicker.id = "#dp3";
		datepicker.root.setAttribute("value-state", "Error");

		assert.equal(datepicker.input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = browser.findElementDeep("#dp3 >>> ui5-input >>> .sapWCInputBaseContentWrapper");
		assert.ok(contentWrapper.hasClass("sapWCInputBaseContentWrapperError"), "has error wrapper class");
		assert.ok(contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("disabled", () => {
		datepicker.id = "#dp12";
		datepicker.root.setAttribute("disabled", "");

		assert.equal(datepicker.input.getProperty("disabled"), true, "input has disabled property");
	});

	it("readonly", () => {
		datepicker.id = "#dp13";

		datepicker.root.setAttribute("readonly", "");

		assert.equal(datepicker.input.getProperty("readonly"), true, "input has readonly set");
		assert.ok(!datepicker.hasIcon(), "icon is not displayed");
	});

	it("placeholder", () => {
		datepicker.id = "#dp15";

		datepicker.root.setAttribute("placeholder", "test placeholder");

		assert.equal(datepicker.innerInput.getProperty("placeholder"), "test placeholder", "input has correct placeholder");
		assert.equal(datepicker.innerInput.getAttribute("placeholder"), "test placeholder", "has correct placeholder attribute");
	});

	it("primary calendar type", () => {
		datepicker.id = "#dp16";

		datepicker.root.setAttribute("primary-calendar-type", "Islamic");

		assert.equal(datepicker.calendar.getProperty("primaryCalendarType"), "Islamic", "calendar has correct calendar type");
	});

	it("Islamic calendar type input value", () => {
		datepicker.id = "#dp14";

		datepicker.root.setAttribute("primary-calendar-type", "Islamic");
		datepicker.root.setAttribute("format-pattern", "MMM d, y G");

		assert.ok(datepicker.isValid("Rab. I 6, 1440 AH"), "Islamic value is valid");

		datepicker.root.setAttribute("value", "Rab. I 6, 1440 AH");

		assert.equal(datepicker.innerInput.getAttribute("value"), "Rab. I 6, 1440 AH", "input has correct Islamic value");
	});

	it("Can focus the input after open", () => {
		datepicker.id = "#dp11";
		datepicker.openPicker({ focusInput: true });

		assert.ok(datepicker.innerInput.isFocusedDeep(), "inner input is focused");
	});

	it("Selected date from daypicker is the same as datepicker date", () => {
		datepicker.id = "#dp4";

		//open picker
		datepicker.valueHelpIcon.click();

		//select a date
		const pickerDate = datepicker.getPickerDate(1547164800); //Jan 11, 2019
		pickerDate.click();

		assert.equal(datepicker.innerInput.getProperty("value"), "Jan 11, 2019", "input has the correct value");
	});

	it("delete input value then open picker keeps the empty value", () => {
		datepicker.id = "#dp6";

		const timestamp_6_Jan_2015 = 1420502400;
		const timestamp_8_Jan_2015 = timestamp_6_Jan_2015 + 2 * 24 * 60 * 60;

		//type in the input
		datepicker.innerInput.setValue("Jan 6, 2015");

		//open picker
		datepicker.valueHelpIcon.click();

		const calendarDate_6_Jan_2015 = datepicker.getPickerDate(timestamp_6_Jan_2015); //Jan 6, 2015
		const calendarDate_8_Jan_2015 = datepicker.getPickerDate(timestamp_8_Jan_2015); //Jan 6, 2015

		assert.ok(calendarDate_6_Jan_2015.hasClass('sapWCDayPickerItemSel'), "calendar selected date is ok");

		//select a date
		calendarDate_8_Jan_2015.click();

		//check if the picker is closed and the datepicker value is correct
		assert.ok(!datepicker.isPickerOpen(), "picker is closed");
		assert.equal(datepicker.input.getProperty("value"), "Jan 8, 2015", "datepicker value is Jan 8, 2015");

		//then delete the value
		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");

		// browser.debug();
		//then open the picker
		datepicker.valueHelpIcon.click();

		//check if the datepicker value is still empty
		assert.equal(datepicker.innerInput.getProperty("value"), "", "datepicker value is empty");

		//check if the picker is open and the selected date in the calendar is correct
		assert.ok(datepicker.isPickerOpen(), "picker is open");
		assert.ok(!calendarDate_6_Jan_2015.hasClass("sapWCDayPickerItemSel"), "calendar selected dates is ok");
		assert.ok(!calendarDate_8_Jan_2015.hasClass("sapWCDayPickerItemSel"), "calendar selected dates is ok");

		datepicker.valueHelpIcon.click();

		assert.ok(!datepicker.isPickerOpen(), "picker is closed");
	});

	it("Calendar selection works on different timezones", () => {
		datepicker.id = "#dp7";

		browser.findElementDeep("#inputTimezone").setValue(-6); //CST
		browser.findElementDeep("#btnApplyTimezone").click();

		datepicker.valueHelpIcon.click();

		let calendarDate_4_Jan_2019 = datepicker.getPickerDate(1546560000); //Jan 4, 2019
		calendarDate_4_Jan_2019.click();

		assert.equal(datepicker.innerInput.getProperty("value"), "Jan 4, 2019", "dp value is correct");

		//restore timezone
		browser.findElementDeep('#btnRestoreTimezone').click();

		// test needs to end with an assert, otherwise the next test seems to start before the click is finished and it hangs from time to time
		assert.equal($("#inputTimezone").getValue(), "", "timezone is reset");
	});

	it("if today is 30 jan, clicking next month does not skip feb", () => {
		datepicker.id = "#dp7_2";

		datepicker.innerInput.setValue("Jan 30, 2019");
		datepicker.valueHelpIcon.click();
		datepicker.btnNext.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		// first displayed date should be Jan 27, 2019, so this is February
		assert.ok(firstDisplayedDate.getProperty("id").indexOf("1548547200") > -1, "Feb is the displayed month");
	});

	it("picker stays open on input click", () => {
		datepicker.id = "#dp17";

		datepicker.valueHelpIcon.click();
		datepicker.innerInput.click();

		assert.ok(datepicker.isPickerOpen(), "picker is open");
		assert.ok(datepicker.innerInput.isFocusedDeep(), "input is focused");
	});
});
