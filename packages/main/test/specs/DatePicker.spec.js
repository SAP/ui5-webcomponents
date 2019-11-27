
const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("assert");

describe("Date Picker Tests", () => {
	before(() => {
		datepicker.open();
	});

	it("input renders", () => {
		datepicker.id = "#dp";
		assert.ok(datepicker.input.isDisplayedInViewport(), "input is rendered");
		assert.ok(datepicker.innerInput.isDisplayedInViewport(), "inner input is rendered");
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

		const contentWrapper = browser.$("#dp3").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("disabled", () => {
		datepicker.id = "#dp2";
		datepicker.root.setAttribute("disabled", "");

		assert.equal(datepicker.input.getProperty("disabled"), true, "input has disabled property");
	});

	it("readonly", () => {
		datepicker.id = "#dp3";

		datepicker.root.setAttribute("readonly", "");

		assert.equal(datepicker.input.getProperty("readonly"), true, "input has readonly set");
		assert.ok(!datepicker.hasIcon(), "icon is not displayed");
	});

	it("placeholder", () => {
		datepicker.root.setAttribute("placeholder", "test placeholder");

		assert.equal(datepicker.innerInput.getProperty("placeholder"), "test placeholder", "input has correct placeholder");
		assert.equal(datepicker.innerInput.getAttribute("placeholder"), "test placeholder", "has correct placeholder attribute");
	});

	it("primary calendar type", () => {
		datepicker.root.setAttribute("primary-calendar-type", "Islamic");

		assert.equal(datepicker.calendar.getProperty("primaryCalendarType"), "Islamic", "calendar has correct calendar type");
	});

	it("Islamic calendar type input value", () => {
		datepicker.id = "#dp3";

		datepicker.root.setAttribute("primary-calendar-type", "Islamic");
		datepicker.root.setAttribute("format-pattern", "MMM d, y G");

		assert.ok(datepicker.isValid("Rab. I 6, 1440 AH"), "Islamic value is valid");

		datepicker.root.setAttribute("value", "Rab. I 6, 1440 AH");

		assert.equal(datepicker.innerInput.getAttribute("value"), "Rab. I 6, 1440 AH", "input has correct Islamic value");
	});

	it("Can focus the input after open", () => {
		datepicker.id = "#dp1";
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

	it("focusout fires change", () => {
		datepicker.id = "#dp5";

		datepicker.root.click();
		datepicker.innerInput.setValue("Jan 6, 2015");
		browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(browser.$("#lbl").getHTML(false), "1", 'change has fired once');
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

		assert.ok(calendarDate_6_Jan_2015.hasClass('ui5-dp-item--selected'), "calendar selected date is ok");

		//select a date
		calendarDate_8_Jan_2015.click();

		//check if the picker is closed and the datepicker value is correct
		assert.ok(!datepicker.isPickerOpen(), "picker is closed");
		assert.equal(datepicker.input.getProperty("value"), "Jan 8, 2015", "datepicker value is Jan 8, 2015");

		//then delete the value
		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");

		//then open the picker
		datepicker.valueHelpIcon.click();

		//check if the datepicker value is still empty
		assert.equal(datepicker.innerInput.getProperty("value"), "", "datepicker value is empty");

		//check if the picker is open and the selected date in the calendar is correct

		assert.ok(datepicker.isPickerOpen(), "picker is open");
		assert.ok(!calendarDate_6_Jan_2015.hasClass("ui5-dp-item--selected"), "calendar selected dates is ok");
		assert.ok(!calendarDate_8_Jan_2015.hasClass("ui5-dp-item--selected"), "calendar selected dates is ok");

		datepicker.valueHelpIcon.click();
	});

	it("Calendar selection works on different timezones", () => {
		datepicker.id = "#dp7";

		browser.$("#inputTimezone").setValue(-6); //CST
		browser.$("#btnApplyTimezone").click();

		datepicker.valueHelpIcon.click();

		let calendarDate_4_Jan_2019 = datepicker.getPickerDate(1546560000); //Jan 4, 2019
		calendarDate_4_Jan_2019.click();

		assert.equal(datepicker.innerInput.getProperty("value"), "Jan 4, 2019", "dp value is correct");

		//restore timezone
		browser.$('#btnRestoreTimezone').click();

		// test needs to end with an assert, otherwise the next test seems to start before the click is finished and it hangs from time to time
		assert.equal($("#inputTimezone").getValue(), "", "timezone is reset");
	});

	it("respect first day of the week - monday", () => {
		browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=bg");
		datepicker.id = "#dp7_1";

		datepicker.innerInput.setValue("фев 6, 2019");
		datepicker.valueHelpIcon.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		assert.ok(firstDisplayedDate.getProperty("id").indexOf("1548633600") > -1, "28 Jan is the first displayed date for Feb 2019")

		const calendarDate_3_Feb_2019 = datepicker.getPickerDate(1549152000);

		assert.ok(calendarDate_3_Feb_2019.hasClass("ui5-dp-wday6"), "3 Feb 2019 is displayed as last day of the week");
	});

	it("if today is 30 jan, clicking next month does not skip feb", () => {
		datepicker.open();

		datepicker.id = "#dp7_2";

		datepicker.innerInput.setValue("Jan 30, 2019");
		datepicker.valueHelpIcon.click();
		datepicker.btnNext.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		// first displayed date should be Jan 27, 2019, so this is February
		assert.ok(firstDisplayedDate.getProperty("id").indexOf("1548547200") > -1, "Feb is the displayed month");
	});

	it("picker stays open on input click", () => {
		datepicker.open();

		datepicker.id = "#dp6";

		datepicker.valueHelpIcon.click();
		datepicker.innerInput.click();

		assert.ok(datepicker.isPickerOpen(), "picker is open");
		assert.ok(datepicker.innerInput.isFocusedDeep(), "input is focused");
	});

	it("change fires when we change the input back to its original value", () => {
		datepicker.id = "#dp8"; // initial value is Jan 6, 2015

		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		datepicker.innerInput.keys("Jan 8, 2015");
		browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(browser.$("#lbl").getHTML(false), "1", 'change has fired once');

		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		datepicker.innerInput.keys("Jan 6, 2015");
		browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(browser.$("#lbl").getHTML(false), "2", 'change has fired once');
	});

	it("change fires every time tomorrow is typed and normalized", () => {
		let tomorrowDate;
		const lblChangeCounter = browser.$("#lblTomorrow");
		const lblTomorrowDate = browser.$("#lblTomorrowDate");

		datepicker.id = "#dp13";

		// Type tomorrow.
		datepicker.innerInput.click();
		datepicker.innerInput.keys("tomorrow");

		// Press Enter, store the date and delete it.
		datepicker.innerInput.keys("Enter");
		tomorrowDate = lblTomorrowDate.getHTML(false);
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b\b\b");

		// Type tomorrow and press Enter for the second time.
		datepicker.innerInput.keys("tomorrow");
		datepicker.innerInput.keys("Enter");

		// Two change events should be fired and the date should twice normalized
		assert.equal(lblChangeCounter.getHTML(false), "2", 'change event is being fired twice');
		assert.equal(lblTomorrowDate.getHTML(false), tomorrowDate, 'tomorrow is normalazid to date twice as well');
	});

	it("today value is normalized and correctly rounded to 00:00:00", () => {
		datepicker.id = "#dp9";

		let timestampToday = new Date().getTime();
		timestampToday = (timestampToday - timestampToday % (24 * 60 * 60 * 1000)) / 1000;

		assert.equal(datepicker.innerInput.getProperty("value"), "today", "input value is ok");

		datepicker.valueHelpIcon.click();
		assert.equal(datepicker.calendar.getProperty('timestamp'), timestampToday, "calendar selected dates is ok");

		const calendarDateToday = datepicker.getPickerDate(timestampToday);
		assert.ok(calendarDateToday.hasClass('ui5-dp-item--selected'), "calendar selected date is ok");
	});

	it("does not open, if disabled", () => {
		datepicker.id = "#dp10";

		assert.ok(!datepicker.isPickerOpen(), "picker is closed initially.");
		assert.equal(datepicker.valueHelpIcon.getCSSProperty('pointer-events').value, "none", "pointer events are none");
	});

	it("[F4] toggles the calendar", () => {
		datepicker.id = "#dp11";

		assert.ok(!datepicker.isPickerOpen(), "datepicker is open");

		datepicker.innerInput.click();
		browser.keys("F4");

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");
	});

	it("[Alt] + [UP] toggles the calendar", () => {
		datepicker.id = "#dp9";

		assert.ok(!datepicker.isPickerOpen(), "datepicker is open");

		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowUp", "NULL"]);

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");
	});

	it("[Alt] + [DOWN] toggles the calendar", () => {
		datepicker.id = "#dp11";

		assert.ok(!datepicker.isPickerOpen(), "datepicker is open");

		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowDown", "NULL"]);

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");
	});

	it("daypicker extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9999");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("daypicker extreme values min", () => {
		var _1Jan0001 = "-62135596800";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Jan 1, 0001");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");
	});

	it("daypicker prev extreme values min", () => {
		var _1Jan0001 = "-62135596800";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Feb 1, 0001");
		datepicker.valueHelpIcon.click();

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");
	});

	it("daypicker next extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Nov 31, 9999");
		datepicker.valueHelpIcon.click();

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("monthpicker next extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9998");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnNext.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("9999") > -1, "year button's text is correct");

		datepicker.btnNext.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("9999") > -1, "year button's text is correct");
	});

	it("monthpicker prev extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Jan 1, 0002");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnPrev.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("0001") > -1, "year button's text is correct");

		datepicker.btnPrev.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("0001") > -1, "year button's text is correct");
	});

	it("yearpicker extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9995");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Jan 1, 0003");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("yearpicker prev page extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Jan 1, 0009");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0002") > -1, "First year in the year picker is correct");

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("yearpicker next page extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9986");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9979") > -1, "First year in the year picker is correct");

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker click extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9986");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		var tenthYear = datepicker.getDisplayedYear(9);
		assert.ok(tenthYear.getProperty("innerHTML").indexOf("9988") > -1, "Tenth year in the year picker is correct");

		tenthYear.click();
		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker click extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Jan 1, 0009");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		var thirdYear = datepicker.getDisplayedYear(2);
		assert.ok(thirdYear.getProperty("innerHTML").indexOf("0004") > -1, "Third year in the year picker is correct");

		thirdYear.click();
		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("placeholder, based on the formatPattern", () => {
		datepicker.id = "#dp14";

		const pickerFormatPattern = "MMM d, y";
		const innerInputPlaceholder = datepicker.innerInput.getProperty("placeholder");

		// The DatePicker has no placeholder set, in this case a default placeholder, based on the format pattern,
		//  is set to the internal input.
		assert.ok(!datepicker.root.getProperty("placeholder"), "The DatePicker has no placeholder set");
		assert.equal(innerInputPlaceholder, pickerFormatPattern, "By default, the inner input has the formatPattern as placeholder");
	});

	it("placeholder, set by the user", () => {
		datepicker.id = "#dp15";

		const placeholder = "Delivery date";
		const innerInputPlaceholder = datepicker.innerInput.getProperty("placeholder");

		// The DatePicker has placeholder set, in this case the default placeholder, based on the format pattern,
		// is not dipslayed.
		assert.ok(datepicker.root.getProperty("placeholder"), "The DatePicker has placeholder set");
		assert.equal(innerInputPlaceholder, placeholder, "The inner input has the placeholder, set by the user");
	});
});
