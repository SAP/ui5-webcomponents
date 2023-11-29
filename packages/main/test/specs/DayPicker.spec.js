import daypicker from "../pageobjects/DayPickerTestPage.js";
import { assert } from "chai";

describe("Day Picker Tests", () => {
	before(async () => {
		await browser.url(`test/pages/DayPicker.html`);
	});

	it("Day Picker Renders", async () => {
		daypicker.id = "daypicker";
		const DayPicker = daypicker.getDayPickerRoot();

		assert.ok(DayPicker, "Day Picker is rendered");
	});

	it("Select day with Space", async () => {
		const today = await browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-item--now");

		await today.click();
		await today.keys("ArrowRight");
		await browser.keys("Space");

		const selectedDate = await browser.executeAsync(done => {
			const timestamp = parseInt(document.activeElement.shadowRoot.activeElement.getAttribute("data-sap-timestamp"));

			done(new Date(timestamp * 1000).getDate());
		});

		assert.strictEqual(selectedDate, new Date(Date.now() + 24 * 3600 * 1000).getDate(), "Dates are equal");
	});

	it("Select day with Enter", async () => {
		daypicker.id = "daypicker1";
		const today = await browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-item--now");

		await today.click();
		await today.keys("ArrowRight");
		await browser.keys("Enter");

		const selectedDate = await browser.executeAsync(done => {
			const timestamp = parseInt(document.activeElement.shadowRoot.activeElement.getAttribute("data-sap-timestamp"));

			done(new Date(timestamp * 1000).getDate());
		});

		assert.strictEqual(selectedDate, new Date(Date.now() + 24 * 3600 * 1000).getDate(), "Dates are equal");
	});

	it("Day names are correctly displayed when length is less than 3", async () => {
		const dayPickerFirstDayName = await browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-firstday");
		const dayPickerFirstDayNameText = await dayPickerFirstDayName.getProperty("textContent");

		assert.strictEqual(dayPickerFirstDayNameText, "Sun", "Name is rendered correctly");
	});

	it("Day names are correctly displayed when length is more than 3", async () => {
		browser.url(`test/pages/DayPicker.html?sap-ui-language=pt_PT`);

		const dayPickerFirstDayName = await browser.$(`#${daypicker._sut}`).shadow$(".ui5-dp-firstday");
		const dayPickerFirstDayNameText = await dayPickerFirstDayName.getProperty("textContent");

		assert.strictEqual(dayPickerFirstDayNameText, "D", "Name is rendered correctly");
	});
});
