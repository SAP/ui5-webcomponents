const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("chai").assert;

describe("Date Picker Tests", () => {
	before(() => {
		datepicker.open();
	});

	it("input renders", () => {
		datepicker.id = "#dp";

		assert.ok(datepicker.input.isDisplayedInViewport(), "input is rendered");
		assert.ok(datepicker.innerInput.isDisplayedInViewport(), "inner input is rendered");
		assert.strictEqual(datepicker.innerInput.getAttribute("aria-roledescription"), "Date Input", "aria-roledescription attribute is added.");
	});

	it("input receives value", () => {
		datepicker.id = "#dp1";

		const date = new Date(datepicker.innerInput.getValue());

		assert.equal(date.getDate(), 11);
		assert.equal(date.getMonth(), 10);
		assert.equal(date.getFullYear(), 2011);
	});

	it("input receives value in format pattern depending on the set language", () => {
		browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=bg");
		datepicker.id = "#dp16";

		const setDateButton = browser.$("#b1");

		setDateButton.click();

		assert.equal(datepicker.innerInput.getValue(), "11 декември 2018 г.");
	});

	it("custom formatting", () => {
		datepicker.open();
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

	it("Value State Message", () => {
		datepicker.id = "#dp17"
		datepicker.input.click();

		const inputStaticAreaItem = datepicker.inputStaticAreaItem;
		const popover = inputStaticAreaItem.shadow$("ui5-popover");

		const slot = popover.$("#coolValueStateMessage");
		assert.notOk(slot.error, "Value State message slot is working");
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

	it("required", () => {
		datepicker.id = "#dp-required";

		assert.ok(datepicker.input.getProperty("required"), "input has required set");
		assert.strictEqual(datepicker.innerInput.getAttribute("aria-required"), "true", "Aria-required attribute is set correctly.");

		datepicker.root.removeAttribute("required");

		assert.notOk(datepicker.input.getProperty("required"), "required property is not set");
		assert.strictEqual(datepicker.innerInput.getAttribute("aria-required"), "false", "Aria-required attribute is set correctly.");
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

		datepicker.input.click();
		datepicker.root.keys("Jan 1, 1999");
		browser.$("#dp1").shadow$("ui5-input").shadow$("input").click(); //click elsewhere to focusout

		assert.equal(browser.$("#lbl").getHTML(false), "1", 'change has fired once');
	});

	it("delete input value then open picker keeps the empty value", () => {
		datepicker.id = "#dp6";

		const timestamp_6_Jan_2015 = 1420502400;
		const timestamp_8_Jan_2015 = timestamp_6_Jan_2015 + 2 * 24 * 60 * 60;

		//type in the input
		datepicker.root.setProperty("value", "Jan 6, 2015");

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

		assert.strictEqual(datepicker.innerInput.getProperty("value"), "Jan 4, 2019", "dp value is correct");
		//restore timezone
		browser.$('#btnRestoreTimezone').click();

		// test needs to end with an assert, otherwise the next test seems to start before the click is finished and it hangs from time to time
		assert.equal($("#inputTimezone").getValue(), "", "timezone is reset");
	});

	it("respect first day of the week - monday", () => {
		browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=bg");
		datepicker.id = "#dp7_1";

		datepicker.root.setProperty("value", "фев 6, 2019");
		datepicker.valueHelpIcon.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		assert.ok(firstDisplayedDate.getAttribute("data-sap-timestamp").indexOf("1548633600") > -1, "28 Jan is the first displayed date for Feb 2019")

		const calendarDate_3_Feb_2019 = datepicker.getPickerDate(1549152000);

		assert.ok(calendarDate_3_Feb_2019.hasClass("ui5-dp-wday6"), "3 Feb 2019 is displayed as last day of the week");
	});

	it("if today is 30 jan, clicking next month does not skip feb", () => {
		datepicker.open();

		datepicker.id = "#dp7_2";

		datepicker.root.setProperty("value", "Jan 30, 2019");
		datepicker.valueHelpIcon.click();
		datepicker.btnNext.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		// first displayed date should be Jan 27, 2019, so this is February
		assert.ok(firstDisplayedDate.getAttribute("data-sap-timestamp").indexOf("1548547200") > -1, "Feb is the displayed month");
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

		assert.ok(!datepicker.isPickerOpen(), "datepicker is closed");

		datepicker.innerInput.click();
		browser.keys("F4");

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");
	});

	it("[Alt] + [UP] toggles the calendar", () => {
		datepicker.id = "#dp9";

		assert.ok(!datepicker.isPickerOpen(), "datepicker is closed");

		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowUp", "NULL"]);

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");

		browser.keys(["Alt", "ArrowUp", "NULL"]);

		assert.notOk(datepicker.isPickerOpen(), "datepicker is closed");
	});

	it("[Alt] + [DOWN] toggles the calendar", () => {
		datepicker.id = "#dp11";

		assert.ok(!datepicker.isPickerOpen(), "datepicker is closed");

		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowDown", "NULL"]);

		assert.ok(datepicker.isPickerOpen(), "datepicker is open");

		browser.keys(["Alt", "ArrowDown", "NULL"]);

		assert.notOk(datepicker.isPickerOpen(), "datepicker is closed");
	});

	it("[F4] shows year picker after date picker is open", () => {
		datepicker.id = "#dp11";

		datepicker.valueHelpIcon.click()
		browser.keys("F4");

		assert.notOk(datepicker.calendar.shadow$("ui5-monthpicker")._hidden, "Month picker is open");
		datepicker.valueHelpIcon.click(); // close the datepicker
	});

	it("[SHIFT] + [F4] shows year picker after date picker is open", () => {
		datepicker.id = "#dp11";

		datepicker.valueHelpIcon.click()
		browser.keys(['Shift', 'F4']);

		assert.notOk(datepicker.calendar.shadow$("ui5-yearpicker")._hidden, "Year picker is open");
		datepicker.valueHelpIcon.click(); // close the datepicker
	});

	it("[F4] shows month picker after year picker is open", () => {
		datepicker.id = "#dp11";

		datepicker.valueHelpIcon.click()
		browser.keys(['Shift', 'F4']);
		browser.keys('F4');

		assert.notOk(datepicker.calendar.shadow$("ui5-monthpicker")._hidden, "Year picker is open");
		datepicker.valueHelpIcon.click(); // close the datepicker
	});


	it("[SHIFT] + [F4] shows year picker after month picker is open", () => {
		datepicker.id = "#dp11";

		datepicker.valueHelpIcon.click()
		browser.keys('F4');
		browser.keys(['Shift', 'F4']);

		assert.notOk(datepicker.calendar.shadow$("ui5-yearpicker")._hidden, "Year picker is open");
		datepicker.valueHelpIcon.click(); // close the datepicker
	});


	it("[F4] on year picker doesn't close the date picker", () => {
		datepicker.id = "#dp11";

		datepicker.valueHelpIcon.click();
		browser.keys("F4");

		browser.keys("F4");

		assert.ok(datepicker.isPickerOpen, "Datepicker remains open");
	});

	it("daypicker extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Dec 31, 9999");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getAttribute("data-sap-timestamp").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("daypicker extreme values min", () => {
		var _31Dec0000 = "-62135683200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0001");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getAttribute("data-sap-timestamp").indexOf(_31Dec0000) > -1, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker prev extreme values min", () => {
		var _31Dec0000 = "-62135683200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Feb 1, 0001");
		datepicker.valueHelpIcon.click();

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedDate().getAttribute("data-sap-timestamp").indexOf(_31Dec0000) > -1, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker next extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Nov 30, 9999");
		datepicker.valueHelpIcon.click();

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedDate().getAttribute("data-sap-timestamp").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("monthpicker next extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Dec 31, 9998");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnNext.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("9999") > -1, "year button's text is correct");
	});

	it("monthpicker prev extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0002");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnPrev.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("0001") > -1, "year button's text is correct");
	});

	it("yearpicker extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Dec 31, 9995");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0003");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("yearpicker prev page extreme values min", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0012");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0002") > -1, "First year in the year picker is correct");

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("yearpicker next page extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Dec 31, 9986");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9976") > -1, "First year in the year picker is correct");

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker click extreme values max", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Dec 31, 9986");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		var tenthYear = datepicker.getDisplayedYear(10);
		assert.ok(tenthYear.getProperty("innerHTML").indexOf("9986") > -1, "Tenth year in the year picker is correct");

		tenthYear.click();
		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9976") > -1, "First year in the year picker is correct");
	});

	it("yearpicker click extreme values min above 10", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0012");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		var thirdYear = datepicker.getDisplayedYear(2);
		assert.ok(thirdYear.getProperty("innerHTML").indexOf("0004") > -1, "Third year in the year picker is correct");
	});

	it("yearpicker click extreme values min below 10", () => {
		datepicker.open();
		datepicker.id = "#dp12";

		datepicker.root.setProperty("value", "Jan 1, 0004");
		datepicker.valueHelpIcon.click();

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

	it("Going under the minimum date changes value state", () => {
		datepicker.id = "#dp33";

		datepicker.input.click();
		datepicker.root.keys("Jan 1, 1999");
		datepicker.root.keys("Enter");

		assert.equal(datepicker.input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Going over the maximum date changes value state", () => {
		datepicker.id = "#dp33";

		datepicker.input.click();
		while(datepicker.root.getValue() !== ""){
			datepicker.root.keys("Backspace");
		}

		datepicker.root.keys("May 5, 2100");
		datepicker.root.keys("Enter");

		assert.equal(datepicker.input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Maximum or minimum date changes value state to none", () => {
		datepicker.id = "#dp33";

		datepicker.input.click();
		while(datepicker.root.getValue() !== ""){
			datepicker.root.keys("Backspace");
		}

		datepicker.root.keys("Jan 8, 2100");
		datepicker.root.keys("Enter");

		assert.equal(datepicker.input.getProperty("valueState"), "None", "value state of the input is valid");

		datepicker.input.click();
		while(datepicker.root.getValue() !== ""){
			datepicker.root.keys("Backspace");
		}

		datepicker.root.keys("Jan 1, 2000");
		datepicker.root.keys("Enter");

		assert.equal(datepicker.input.getProperty("valueState"), "None", "value state of the input is valid");

		const contentWrapper = browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Years are disabled when out of range", () => {
		datepicker.id = "#dp33";

		datepicker.input.click();
		while(datepicker.root.getValue() !== ""){
			datepicker.root.keys("Backspace");
		}
		datepicker.root.keys("Jan 8, 2100");
		datepicker.root.keys("Enter");

		datepicker.openPicker();

		datepicker.btnYear.click();
		assert.ok(datepicker.getDisplayedYear(11).hasClass("ui5-yp-item--disabled"), "Years out of range are disabled");
		datepicker.root.keys("ArrowRight");
		assert.ok(datepicker.getDisplayedYear(10).isFocusedDeep(), "Focus remained on year 2100");
		assert.ok(!datepicker.getDisplayedYear(11).isFocusedDeep(), "Years out of range (2101) can not be reached with keyboard");
	});

	it("Months are disabled when out of range", () => {
		datepicker.id = "#dp33";

		datepicker.openPicker();

		datepicker.btnMonth.click();
		assert.ok(datepicker.getDisplayedMonth(10).hasClass("ui5-mp-item--disabled"), "Months out of range are disabled");

		datepicker.root.keys("ArrowDown");
		assert.ok(datepicker.getDisplayedMonth(0).isFocusedDeep(), "Months out of range  can not be reached with keyboard");
	});

	it("Days are disabled when out of range", () => {
		datepicker.id = "#dp33";

		datepicker.root.keys("Escape");
		datepicker.openPicker();

		assert.ok(datepicker.getDisplayedDay(15).hasClass("ui5-dp-item--disabled"), "Days out of range are disabled");
	});

	it("Days are disabled when out of range", () => {
		datepicker.id = "#dp33";
		datepicker.root.keys("Escape");

		datepicker.id = "#dp34";
		datepicker.openPicker();
		assert.ok(datepicker.getDisplayedDay(14).isFocusedDeep(), "Days out of range are disabled");
	});

	it("Min and Max date are included in the interval", () => {
		datepicker.id = "#dp33";

		datepicker.root.keys("Escape");
		datepicker.openPicker();

		assert.equal(datepicker.getDisplayedDay(9).hasClass("ui5-dp-item--disabled"), false , "Min date is included");
		assert.equal(datepicker.getDisplayedDay(11).hasClass("ui5-dp-item--disabled"), false, "Max date is included");
	});

	it("Tests week numbers column visibility", () => {
		// act
		datepicker.id = "#dp18";
		datepicker.valueHelpIcon.click();

		// assert
		const weekNumbersCol1 = datepicker.dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.equal(weekNumbersCol1.isExisting(), true, "The week numbers column is visible.");

		// close date picker
		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowUp", "NULL"]);

		// act
		datepicker.id = "#dp19";
		datepicker.valueHelpIcon.click();

		// assert
		const weekNumbersCol2 = datepicker.dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.equal(weekNumbersCol2.isExisting(), false, "The week numbers column is hidden.");

		// close date picker
		datepicker.innerInput.click();
		browser.keys(["Alt", "ArrowUp", "NULL"]);
	});

	it("Calendar root have correct attribute", () => {

		datepicker.id = "#dp18";
		datepicker.valueHelpIcon.click();
		const monthpickerContent = datepicker.dayPicker.shadow$(".ui5-dp-content");

		assert.strictEqual(monthpickerContent.getAttribute("role"), "grid", "Calendar root have correct role attribute");
		assert.strictEqual(monthpickerContent.getAttribute("aria-roledescription"), "Calendar", "Calendar root have correct roledescription")

	});

	it("DayPicker content wrapped", ()=>{
		datepicker.id = "#dp19";
		datepicker.open();
		let arr = datepicker.getDayPickerContent();

		arr.forEach(function(el){
			assert.strictEqual(el.getAttribute("role"), "row", "Content wrapper has correct role");
		});
	});

	it("DayPicker day name attribute", ()=>{
		// browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=en");
		// datepicker.root.setAttribute("primary-calendar-type", "Gregorian");
		// datepicker.id = "#dp13";
		// datepicker.openPicker();
		// datepicker.root.keys("May 3, 2100");
		// datepicker.root.keys("Enter");

		// const content = Array.from(datepicker.getDayPickerDayNames());
		// const dayName = ["Week number", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		// content.forEach((element,index) => {
		// 	assert.strictEqual(element.getAttribute("role"), "columnheader", "Each day have column header role");
		// 	assert.strictEqual(element.getAttribute("aria-label"), dayName[index], "Aria-label is correct");
		// });
	});

	it("DayPiker day number attribute", ()=>{
		browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=en");
		datepicker.root.setAttribute("primary-calendar-type", "Gregorian");
		datepicker.id = "#dp13";
		datepicker.openPicker();
		datepicker.root.keys("May 3, 2100");
		datepicker.root.keys("Enter");

		const rows = Array.from(datepicker.getDayPickerNumbers());
		const firstColumn = Array.from(rows[1].$$("div"));
		const lastColumn = Array.from(rows[rows.length - 1].$$("div"));

		assert.strictEqual(firstColumn[0].getAttribute("role"), "rowheader", "The week number have rowheader role");
		assert.strictEqual(firstColumn[1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
		assert.strictEqual(firstColumn[firstColumn.length - 1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");

		assert.strictEqual(lastColumn[0].getAttribute("role"), "rowheader", "The week number have rowheader role");
		assert.strictEqual(lastColumn[1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
		assert.strictEqual(lastColumn[firstColumn.length - 1].getAttribute("role"), "gridcell", "Each day have columnheader role attribute");
	});

	it("DatePicker dates and week number", () => {
		browser.url("http://localhost:8080/test-resources/pages/DatePicker_test_page.html?sap-ui-language=en");
		datepicker.root.setAttribute("primary-calendar-type", "Gregorian");
		datepicker.id = "#dp13";
		datepicker.input.click();
		browser.keys("May 3, 2100");
		browser.keys("Enter");
		// open picker after accepting the date
		datepicker.openPicker();

		const data = Array.from(datepicker.getDayPickerDatesRow(2));
		assert.strictEqual(data[0].getAttribute("aria-label"), "Calendar Week 18", "First columnheader have Week number aria-label");
		assert.strictEqual(data[1].getAttribute("aria-label"), "Non-Working Day May 2, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
		assert.strictEqual(data[2].getAttribute("aria-label"), "May 3, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
		assert.strictEqual(data[3].getAttribute("aria-label"), "May 4, 2100", "Each date have the full date's info in Month Date, Year in aria-label");
	});

	it("Tests aria-label", () => {
		const EXPECTED_ARIA_LABEL = "Hello World";

		datepicker.id = "#dpAriaLabel";

		assert.strictEqual(datepicker.innerInput.getAttribute("aria-label"), EXPECTED_ARIA_LABEL,
			"The aria-label is correct.")
	});

	it("Tests aria-labelledby", () => {
		const EXPECTED_ARIA_LABEL = "info text";

		datepicker.id = "#dpAriaLabelledBy";

		assert.strictEqual(datepicker.innerInput.getAttribute("aria-label"), EXPECTED_ARIA_LABEL,
			"The aria-label is correct.")
	});

	it("Page up/down increments/decrements the day value", () => {
		datepicker.id = "#dp1";
		datepicker.root.setProperty("value", "Jan 1, 2000");
		datepicker.input.click();

		browser.keys('PageDown');

		let date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 31, "Correct day value");
		assert.strictEqual(date.getMonth(), 11, "Correct month value");
		assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

		browser.keys('PageUp');

		date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 1, "Correct day value");
		assert.strictEqual(date.getMonth(), 0, "Correct month value");
		assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
	});

	it("Shift + Page up/down increments/decrements the month value", () => {
		datepicker.id = "#dp1";
		datepicker.root.setProperty("value", "Jan 1, 2000");
		datepicker.input.click();

		browser.keys(['Shift', 'PageDown']);

		let date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 1, "Correct day value");
		assert.strictEqual(date.getMonth(), 11, "Correct month value");
		assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

		browser.keys(['Shift', 'PageUp']);

		date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 1, "Correct day value");
		assert.strictEqual(date.getMonth(), 0, "Correct month value");
		assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value", () => {
		datepicker.id = "#dp1";
		datepicker.root.setProperty("value", "Jan 1, 2000");
		datepicker.input.click();

		browser.keys(['Control', 'Shift', 'PageDown']);

		let date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 1, "Correct day value");
		assert.strictEqual(date.getMonth(), 0, "Correct month value");
		assert.strictEqual(date.getFullYear(), 1999, "Correct year value");

		browser.keys(['Control', 'Shift', 'PageUp']);

		date = new Date(datepicker.innerInput.getValue());
		assert.strictEqual(date.getDate(), 1, "Correct day value");
		assert.strictEqual(date.getMonth(), 0, "Correct month value");
		assert.strictEqual(date.getFullYear(), 2000, "Correct year value");
	});

	it("Keyboard navigation works when there are disabled dates in the calendar grid", () => {
		datepicker.id = "#dp33";
		datepicker.innerInput.click();
		browser.keys("Jan 1, 2000");

		datepicker.valueHelpIcon.click();

		browser.keys("ArrowDown");

		assert.ok(datepicker.getDisplayedDay(13).isFocusedDeep(), "Successfully navigated");

		browser.keys("Escape");
		datepicker.innerInput.click();
		browser.keys(["Control", "A"]);
		browser.keys("Backspace");
	});
});
