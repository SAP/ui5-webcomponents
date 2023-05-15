import datepicker from "../../pageobjects/DatePickerTestPage.js";
import { assert } from "chai";

describe("Date Picker Tests", () => {
	before(async () => {
		await datepicker.open();
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
});
