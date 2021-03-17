const daypicker = require("../pageobjects/DayPickerTestPage");
const assert = require("chai").assert;

describe("Day Picker Tests", () => {
	before(() => {
		browser.url("http://localhost:8080/test-resources/pages/DayPicker.html");
	});

	it("Day Picker Renders", () => {
		daypicker.id = "daypicker";
		const DayPicker = daypicker.dayPickerRoot;

		assert.ok(DayPicker, "Day Picker is rendered");
	});

	it("Select day with Space", () => {
		const today = browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-item--now");

		today.click();
		today.keys("ArrowRight");
		browser.keys("Space");

		const selectedDate = browser.execute( () => {
			const timestamp = parseInt(document.activeElement.shadowRoot.activeElement.getAttribute("data-sap-timestamp"));

			return new Date(timestamp * 1000).getDate();
		});

		assert.strictEqual(selectedDate, new Date(Date.now() + 24 * 3600 * 1000).getDate(), "Dates are equal");
	});

	it("Select day with Enter", () => {
		daypicker.id = "daypicker1";
		const today = browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-item--now");

		today.click();
		today.keys("ArrowRight");
		browser.keys("Enter");

		const selectedDate = browser.execute( () => {
			const timestamp = parseInt(document.activeElement.shadowRoot.activeElement.getAttribute("data-sap-timestamp"));

			return new Date(timestamp * 1000).getDate();
		});

		assert.strictEqual(selectedDate, new Date(Date.now() + 24 * 3600 * 1000).getDate(), "Dates are equal");
	});
});
