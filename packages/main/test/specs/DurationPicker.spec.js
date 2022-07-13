const assert = require("chai").assert;


describe("Duration Picker general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DurationPicker.html`);
	});

	it("Tests opening and closing of popover", async () => {
		const durationPicker = await browser.$("#duration-picker1");
		const duratationPickerIcon = await durationPicker.shadow$(".ui5-time-picker-input-icon-button");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#duration-picker1");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		await duratationPickerIcon.click();

		assert.isOk(await durationPicker.getProperty("_isPickerOpen"), "Popover is opened");
		assert.isOk(await popover.getProperty("opened"), "Popover is opened.");

		await duratationPickerIcon.click();

		assert.isNotOk(await durationPicker.getProperty("_isPickerOpen"), "Popover is closed");
		assert.isNotOk(await popover.getProperty("opened"), "Popover is closed.");
	});

	it("Tests max-value", async () => {
		const durationPicker = await browser.$("#duration-picker4");
		const duratationPickerIcon = await durationPicker.shadow$(".ui5-time-picker-input-icon-button");

		// act
		await duratationPickerIcon.click();

		// assert - the custom max-value
		assert.strictEqual(await durationPicker.getProperty("value"), await durationPicker.getProperty("maxValue") ,
			"The value and the max-value are equal.");
		assert.strictEqual(await durationPicker.getProperty("maxHours"), 5, "max hours value is read correctly");
		assert.strictEqual(await durationPicker.getProperty("maxMinutes"), 10, "max minutes value is read correctly");
		assert.strictEqual(await durationPicker.getProperty("maxSeconds"), 8, "max seconds value is read correctly");
	});

	it("Tests seconds-step property", async () => {
		const durationPicker = await browser.$("#duration-picker6");

		assert.strictEqual(await durationPicker.getProperty("value"), "05:10:00", "The initial value is taking in consideration the seconds-step property");

		await durationPicker.click();
		await durationPicker.click(); // On click it's all selected, so lose the selection not to delete everything with backspace
		await durationPicker.keys("Backspace");
		await durationPicker.keys("2");
		await durationPicker.keys("Enter");

		assert.strictEqual(await durationPicker.getProperty("value"), "05:10:00", "Editing the value is taking in consideration the seconds-step property");
	});

	it("Tests minutes-step property", async () => {
		const durationPicker = await browser.$("#duration-picker7");

		assert.strictEqual(await durationPicker.getProperty("value"), "05:10", "The initial value is taking in consideration the minutes-step property");

		await durationPicker.click();
		await durationPicker.click(); // On click it's all selected, so lose the selection not to delete everything with backspace
		await durationPicker.keys("Backspace");
		await durationPicker.keys("2");
		await durationPicker.keys("Enter");

		assert.strictEqual(await durationPicker.getProperty("value"), "05:10", "Editing the value is taking in consideration the minutes-step property");
	});

	it("Tests hide-seconds property", async () => {
		const durationPicker = await browser.$("#duration-picker3");

		assert.strictEqual(await durationPicker.getProperty("value"), "07:20", "Hours and minutes are considered");
	});

	it("Tests hide-minutes property", async () => {
		const durationPicker = await browser.$("#duration-picker3-1");

		assert.strictEqual(await durationPicker.getProperty("value"), "07:10", "Hours and seconds are considered");
	});

	it("Tests hide-hours property", async () => {
		const durationPicker = await browser.$("#duration-picker3-2");

		assert.strictEqual(await durationPicker.getProperty("value"), "20:10", "Minutes and seconds are considered");
	});

	it("Tests default max-value", async () => {
		const durationPicker = await browser.$("#duration-default");
		const duratationPickerIcon = await durationPicker.shadow$(".ui5-time-picker-input-icon-button");

		// act
		await duratationPickerIcon.click();

		// assert - the default max-value
		assert.strictEqual(await durationPicker.getProperty("maxHours"), 23, "max value is read correctly");
		assert.strictEqual(await durationPicker.getProperty("maxMinutes"), 59, "max value is read correctly");
		assert.strictEqual(await durationPicker.getProperty("maxSeconds"), 59, "max value is read correctly");

		// close picker
		await duratationPickerIcon.click();
	});

	it("Tests Keyboard handling", async () => {
		const durationPicker = await browser.$("#duration-default")

		// act
		await durationPicker.click();
		await durationPicker.keys(['Shift', 'PageUp']);
		await durationPicker.keys('Shift');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "00:01:00", "The value of minutes is +1");
		// act
		await durationPicker.click();
		await durationPicker.keys(['Shift', 'PageDown']);
		await durationPicker.keys('Shift');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "00:00:00", "The value of minutes is -1");

		// act
		await durationPicker.click();
		await durationPicker.keys('PageUp');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "01:00:00", "The value of hours is +1");
		// act
		await durationPicker.click();
		await durationPicker.keys('PageDown');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "00:00:00", "The value of hours is -1");

		// act
		await durationPicker.click();
		await durationPicker.keys(['Shift', 'Control', 'PageUp']);
		await durationPicker.keys('Control');
		await durationPicker.keys('Shift');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "00:00:01", "The value of seconds is +1");
		// act
		await durationPicker.click();
		await durationPicker.keys(['Shift', 'Control', 'PageDown']);
		await durationPicker.keys('Shift');
		await durationPicker.keys('Control');

		// assert
		assert.strictEqual(await durationPicker.shadow$("ui5-input").getProperty("value"), "00:00:00", "The value of seconds is +1");
	});

	it("tests valueStateMessage slot", async () => {
		const picker = await browser.$("#pickerValueStateMessage");

		await picker.click();

		const inputId = await picker.shadow$("ui5-input").getProperty("_id");
		const inputStaticAreaItem = await browser.$(`.${inputId}`);
		const slot = await inputStaticAreaItem.shadow$("ui5-popover").$("#customValueStateMessage");

		assert.ok(slot, "The value state message is set.");
	});
});
