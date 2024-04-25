import { assert } from "chai";

describe("Calendar general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DateControlsWithTimezone.html`);
	});

    it("The date is with the correct offset in date picker", async () => {

		const datePicker = await browser.$("#datePickerNow");
		const datePickerValue = await datePicker.shadow$("ui5-input").getValue();
		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const datePickerValues = datePickerValue.split("/");

		assert.strictEqual(now.getDate(), Number(datePickerValues[0]), "Date is correct");
		assert.strictEqual(now.getMonth(), Number(datePickerValues[1] - 1), "Month is correct"); // Month is -1 because JSDate starts months count from 0
		assert.strictEqual(now.getFullYear(), Number(datePickerValues[2]), "Year is correct");
	});

	it("The time is with the correct offset in time picker", async () => {

		const timePicker = await browser.$("#timePickerNow");
		const timePickerValue = await timePicker.shadow$("ui5-input").getValue();
		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const timePickerValues = timePickerValue.split(":");

		assert.strictEqual(now.getHours(), Number(timePickerValues[0]), "Hour is correct");
		assert.strictEqual(now.getMinutes(), Number(timePickerValues[1]), "Minute is correct");
	});

	it("The date and time is with the correct offset in datetime picker", async () => {

		const dateTimePicker = await browser.$("#dateTimePickerNow");
		const dateTimePickerValue = await dateTimePicker.shadow$("ui5-input").getValue();
		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const dateTimePickerValues = dateTimePickerValue.split(" ");
		const datePickerValues = dateTimePickerValues[0].split("/");
		const timePickerValues = dateTimePickerValues[1].split(":");

		assert.strictEqual(now.getDate(), Number(datePickerValues[0]), "Date is correct");
		assert.strictEqual(now.getMonth(), Number(datePickerValues[1] - 1), "Month is correct"); // Month is -1 because JSDate starts months count from 0
		assert.strictEqual(now.getFullYear(), Number(datePickerValues[2]), "Year is correct");
		assert.strictEqual(now.getHours(), Number(timePickerValues[0]), "Hour is correct");
		assert.strictEqual(now.getMinutes(), Number(timePickerValues[1]), "Minute is correct");
	});
});