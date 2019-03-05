const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("assert");

describe("Date Picker Tests", () => {
	before(() => {
		datepicker.page = 'http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_test_page_2.html';
		datepicker.open();
	});

	it("focusout fires change", () => {
		datepicker.id = "#dp5";

		datepicker.root.click();
		datepicker.innerInput.setValue("Jan 6, 2015");
		browser.findElementDeep("#dp11 >>> ui5-input >>> input").click(); //click elsewhere to focusout

		assert.equal(browser.findElementDeep("#lbl").getHTML(false), "1", 'change has fired once');
	});

	it("change fires when we change the input back to its original value", () => {
		browser.findElementDeep("#resetCounter").click();
		datepicker.id = "#dp8"; // initial value is Jan 6, 2015

		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		datepicker.innerInput.setValue("Jan 8, 2015");
		browser.findElementDeep("#dp11 >>> ui5-input >>> input").click(); //click elsewhere to focusout

		assert.equal(browser.findElementDeep("#lbl").getHTML(false), "1", 'change has fired once');

		datepicker.innerInput.click();
		browser.keys("\b\b\b\b\b\b\b\b\b\b\b");
		datepicker.innerInput.setValue("Jan 6, 2015");
		browser.findElementDeep("#dp11 >>> ui5-input >>> input").click(); //click elsewhere to focusout

		assert.equal(browser.findElementDeep("#lbl").getHTML(false), "2", 'change has fired once');
	});

	it("today value is normalized and correctly rounded to 00:00:00", () => {
		datepicker.id = "#dp9";

		let timestampToday = new Date().getTime();
		timestampToday = (timestampToday - timestampToday % (24 * 60 * 60 * 1000)) / 1000;

		assert.equal(datepicker.innerInput.getProperty("value"), "today", "input value is ok");

		datepicker.valueHelpIcon.click();
		assert.equal(datepicker.calendar.getProperty('timestamp'), timestampToday, "calendar selected dates is ok");

		const calendarDateToday = datepicker.getPickerDate(timestampToday);
		assert.ok(calendarDateToday.hasClass('sapWCDayPickerItemSel'), "calendar selected date is ok");
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

	it("Scrolling does not close the picker", () => {
		datepicker.id = "#dp9";

		datepicker.valueHelpIcon.click();
		assert.ok(datepicker.isPickerOpen(), "picker is open");

		// scroll down
		browser.findElementDeep("#downThere").moveTo(0, 0);

		browser.pause(1000);
		assert.ok(datepicker.isPickerOpen(), "picker is open");
	});

	it("daypicker extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.id = "#dp12";

		datepicker.innerInput.setValue("Dec 31, 9999");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("daypicker extreme values min", () => {
		var _1Jan0001 = "-62135596800";

		datepicker.id = "#dp13";

		datepicker.innerInput.setValue("Jan 1, 0001");
		datepicker.valueHelpIcon.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");
	});

	it("daypicker prev extreme values min", () => {
		var _1Jan0001 = "-62135596800";

		datepicker.id = "#dp14";

		datepicker.innerInput.setValue("Feb 1, 0001");
		datepicker.valueHelpIcon.click();

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");

		datepicker.btnPrev.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_1Jan0001) > -1, "Jan 1, 0001 is the first displayed date");
	});

	it("daypicker next extreme values max", () => {
		var _28Nov9999 = "253399363200";

		datepicker.id = "#dp15";

		datepicker.innerInput.setValue("Nov 31, 9999");
		datepicker.valueHelpIcon.click();

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");

		datepicker.btnNext.click();

		assert.ok(datepicker.getFirstDisplayedDate().getProperty("id").indexOf(_28Nov9999) > -1, "28 Nov, 9999 is the first displayed date");
	});

	it("monthpicker next extreme values max", () => {
		datepicker.id = "#dp16";

		datepicker.innerInput.setValue("Dec 31, 9998");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnNext.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("9999") > -1, "year button's text is correct");

		datepicker.btnNext.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("9999") > -1, "year button's text is correct");
	});

	it("monthpicker prev extreme values min", () => {
		datepicker.id = "#dp17";

		datepicker.innerInput.setValue("Jan 1, 0002");
		datepicker.valueHelpIcon.click();

		datepicker.btnMonth.click();
		datepicker.btnPrev.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("0001") > -1, "year button's text is correct");

		datepicker.btnPrev.click();

		assert.ok(datepicker.btnYear.getProperty("innerHTML").indexOf("0001") > -1, "year button's text is correct");
	});

	it("yearpicker extreme values max", () => {
		datepicker.id = "#dp18";

		datepicker.innerInput.setValue("Dec 31, 9995");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("9980") > -1, "First year in the year picker is correct");
	});

	it("yearpicker extreme values min", () => {
		datepicker.id = "#dp19";

		datepicker.innerInput.setValue("Jan 1, 0003");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});

	it("yearpicker prev page extreme values min", () => {
		datepicker.id = "#dp20";

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
		
		datepicker.id = "#dp21";

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
		datepicker.id = "#dp22";

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
		datepicker.id = "#dp23";

		datepicker.innerInput.setValue("Jan 1, 0009");
		datepicker.valueHelpIcon.click();

		datepicker.btnYear.click();

		var thirdYear = datepicker.getDisplayedYear(2);
		assert.ok(thirdYear.getProperty("innerHTML").indexOf("0004") > -1, "Third year in the year picker is correct");

		thirdYear.click();
		datepicker.btnYear.click();

		assert.ok(datepicker.getFirstDisplayedYear().getProperty("innerHTML").indexOf("0001") > -1, "First year in the year picker is correct");
	});
});
