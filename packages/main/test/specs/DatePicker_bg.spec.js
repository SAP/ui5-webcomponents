const datepicker = require("../pageobjects/DatePickerTestPage");
const assert = require("assert");

describe("Date Picker Tests", () => {
	before(() => {
		datepicker.page = 'http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_test_page.html';
		datepicker.open();
	});

	it("respect first day of the week - monday", () => {
		browser.url("http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_test_page_bg.html");
		datepicker.id = "#dp";

		datepicker.innerInput.setValue("фев 6, 2019");
		datepicker.valueHelpIcon.click();

		const firstDisplayedDate = datepicker.getFirstDisplayedDate();

		assert.ok(firstDisplayedDate.getProperty("id").indexOf("1548633600") > -1, "28 Jan is the first displayed date for Feb 2019")

		const calendarDate_3_Feb_2019 = datepicker.getPickerDate(1549152000);

		assert.ok(calendarDate_3_Feb_2019.hasClass("sapWCDayPickerWDay6"), "3 Feb 2019 is displayed as last day of the week");
	});
});