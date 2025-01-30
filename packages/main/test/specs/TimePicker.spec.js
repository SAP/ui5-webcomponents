import { assert } from "chai";

describe("TimePicker general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/TimePicker.html?sap-ui-language=bg`);
	});

	it("input receives value in format pattern depending on the set language", async () => {
		const timepicker = await browser.$("#timepickerSetTime");
		const setTimeButton = await browser.$("#setTimeButton");

		await setTimeButton.click();

		assert.equal(await timepicker.shadow$("ui5-datetime-input").getValue(), "3:16:16 ч.");
	});

	it("tests clocks value", async () => {
		const timepicker = await browser.$("#timepicker");
		const timepickerPopover = await timepicker.shadow$("ui5-responsive-popover");

		// act
		await timepicker.setProperty("value", "11:12:13");
		await timepicker.shadow$("ui5-datetime-input").$(".ui5-time-picker-input-icon-button").click();

		const hoursClockValue = await timepickerPopover.$("ui5-time-selection-clocks").shadow$(`ui5-time-picker-clock[data-ui5-clock="hours"]`).getProperty("selectedValue");
		const minutesClockValue = await timepickerPopover.$("ui5-time-selection-clocks").shadow$(`ui5-time-picker-clock[data-ui5-clock="minutes"]`).getProperty("selectedValue");
		const secondsClockValue = await timepickerPopover.$("ui5-time-selection-clocks").shadow$(`ui5-time-picker-clock[data-ui5-clock="seconds"]`).getProperty("selectedValue");

		// assert
		assert.strictEqual(hoursClockValue, 11, "Hours are equal");
		assert.strictEqual(minutesClockValue, 12, "Minutes are equal");
		assert.strictEqual(secondsClockValue, 13, "Seconds are equal");
	});

	it("tests clocks submit value", async () => {
		const timepicker = await browser.$("#timepicker5");
		const picker = await timepicker.shadow$("ui5-responsive-popover");

		// act
		await timepicker.shadow$("ui5-datetime-input").$(".ui5-time-picker-input-icon-button").click();
		await browser.keys("Escape");
		await timepicker.shadow$("ui5-datetime-input").$(".ui5-time-picker-input-icon-button").click();

		// hours clock is displayed
		for (let i=1; i<= 10; i++) await browser.keys("ArrowDown"); // Select 02

		// switch to minutes clock
		await browser.keys("Space");
		for (let i=1; i<= 20; i++) await browser.keys("ArrowDown"); // Select 40

		// switch to seconds clock
		await browser.keys("Space");
		for (let i=1; i<= 4; i++) await browser.keys("ArrowUp"); // Select 5

		await browser.keys("Tab"); // Move to submit
		await browser.keys("Enter"); // Enter on submit

		const textValue = await timepicker.shadow$("ui5-datetime-input").getValue();
		assert.strictEqual(textValue.substring(0,2), "02", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "40", "Minutes are equal");
		assert.strictEqual(textValue.substring(6,8), "05", "Seconds are equal");
	});

	it("tests submit wrong value", async () => {
		const timepicker = await browser.$("#timepicker");

		await timepicker.click();
		await browser.keys("123123123");
		await browser.keys("Enter");

		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("valueState"), "Negative", "The value state is on error");
	});

	it("tests change event", async () => {
		const timepicker = await browser.$("#timepickerChange");
		const input = await timepicker.shadow$("ui5-datetime-input");
		const icon = await input.$("ui5-icon");
		const changeResult = await browser.$("#changeResult");

		// act - submit the same time
		await icon.click();
		const timepickerPopover = await timepicker.shadow$("ui5-responsive-popover");
		await timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "0", "Change not fired as expected");

		// act - submit value after changing time
		await icon.click();

		await browser.keys("PageDown"); // select 11
		for (let i=1; i<= 10; i++) await browser.keys("ArrowDown"); // Select 1

		await timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "1", "Change fired as expected");

		// act - submit the same time
		await icon.click();
		await timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "1", "Change not fired as expected");

		// act - submit value after changing time
		await icon.click();
		await browser.keys("ArrowDown"); // select 00

		await timepickerPopover.$("#submit").click(); // click submit (the other test tests Enter, this one tests click)

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "2", "Change fired as expected");

		//act
		await input.click();
		await browser.keys("Backspace");
		await browser.keys("7");
		await browser.keys("Enter");

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "3", "Change fired as expected");
	});

	it("tests value state", async () => {
		const timepicker = await browser.$("#timepickerEmptyValue");
		const button = await browser.$("#testBtn");

		// act
		await timepicker.click();
		while(await timepicker.shadow$("ui5-datetime-input").getProperty("value") !== ""){
			await browser.keys("Backspace");
		}
		await button.click();

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("valueState"), "None", "The value state is None");
	});

	it("tests input keyboard handling", async () => {
		const timepicker = await browser.$("#timepicker5");

		// act
		await timepicker.click();
		await browser.keys(['Shift', 'PageUp']);
		await browser.keys('Shift');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "02:41:05", "The value of minutes is +1");
		// act
		await timepicker.click();
		await browser.keys(['Shift', 'PageDown']);
		await browser.keys('Shift');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "02:40:05", "The value of minutes is -1");

		// act
		await timepicker.click();
		await browser.keys('PageUp');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "03:40:05", "The value of hours is +1");
		// act
		await timepicker.click();
		await browser.keys('PageDown');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "02:40:05", "The value of hours is -1");

		// act
		await timepicker.click();
		await browser.keys(['Shift', 'Control', 'PageUp']);
		await browser.keys('Shift');
		await browser.keys('Control');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "02:40:06", "The value of seconds is +1");
		// act
		await timepicker.click();
		await browser.keys(['Shift', 'Control', 'PageDown']);
		await browser.keys('Shift');
		await browser.keys('Control');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "02:40:05", "The value of seconds is -1");
	});

	it("test closing the picker with the keyboard", async () => {
		const timepicker = await browser.$("#timepicker3");

		// act
		await timepicker.shadow$("ui5-datetime-input").$(".ui5-time-picker-input-icon-button").click();
		await browser.keys(["Alt", "ArrowUp"]);

		const timepickerPopover = await timepicker.shadow$("ui5-responsive-popover");

		// assert
		assert.notOk(await timepickerPopover.isDisplayed(), "the picker should be collapsed");
	});

	it("the value 'now' returns the current time, instead of the string 'now'", async () => {
		await browser.url(`test/pages/TimePicker.html`);

		const timepicker = await browser.$("#timepicker");

		// act
		await timepicker.click();
		await browser.keys("now");
		await browser.keys("Enter");

		// assert that the value in the input is different than the string 'now'
		assert.notStrictEqual(await timepicker.shadow$("ui5-datetime-input").getProperty("value"), "now", "the value is not 'now'");
	});

	it("opening time picker's value-help, sets the 'open' property to true", async () => {
		const timepicker = await browser.$("#timepicker");
		const timepickerPopover = await timepicker.shadow$("ui5-responsive-popover");

		// act
		await timepicker.shadow$("ui5-datetime-input").$(".ui5-time-picker-input-icon-button").click();

		assert.strictEqual(await timepicker.getProperty("open"), true, "The timepicker's open property is set to true");
		assert.strictEqual(await timepickerPopover.getProperty("open"), true, "The popover is opened");
	})

	it("setting time picker's open property to true, opens the value-help", async () => {
		const timepicker = await browser.$("#timepicker");
		const timepickerPopover = await timepicker.shadow$("ui5-responsive-popover");

		// act
		await timepicker.setProperty("open", true);

		assert.strictEqual(await timepickerPopover.getProperty("open"), true, "The popover is opened");
	})

	it("picker popover should have accessible name", async () => {
		const timepicker = await browser.$("#timepicker");
		await timepicker.click();
		await browser.keys("F4");

		const popover = await timepicker.shadow$("ui5-responsive-popover");

		assert.strictEqual(await popover.getAttribute("accessible-name"), "Choose Time", "Picker popover has an accessible name");

		await browser.keys("Escape");
	});

	it("input should have accessible name", async () => {
		const timepicker = await browser.$("#timepickerAccessibleNameRef");
		const innerInput = await timepicker.shadow$("ui5-datetime-input").shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-label"), "Pick a time", "Input aria-label attribute is correct.");
	});

	it("should apply aria-label from the accessibleNameRef property", async () => {
		const timepicker = await browser.$("#timepickerAccessibleName");
		const innerInput = await timepicker.shadow$("ui5-datetime-input").shadow$("input");

		assert.strictEqual(await innerInput.getAttribute("aria-label"), "Pick a time", "Input aria-label attribute is correct.");
	});
});
