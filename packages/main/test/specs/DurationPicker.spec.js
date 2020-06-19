const assert = require("chai").assert;

const closePicker = id => {
	const staticAreaItemClassName = browser.getStaticAreaItemClassName(id);
	const cancelBtn = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$("#close");

	cancelBtn.click();
}


describe("Duration Picker general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/DurationPicker.html");

	it("Tests opening and closing of popover", () => {
		const durationPicker = browser.$("#duration-picker1")
		const duratationPickerIcon = durationPicker.shadow$(".ui5-duration-picker-input-icon-button");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#duration-picker1");
		const popover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").shadow$("ui5-popover");

		duratationPickerIcon.click();

		assert.isOk(durationPicker.getProperty("_isPickerOpen"), "Popover is opened");
		assert.isOk(popover.getProperty("opened"), "Popover is opened.");

		duratationPickerIcon.click();

		assert.isNotOk(durationPicker.getProperty("_isPickerOpen"), "Popover is opened");
		assert.isNotOk(popover.getProperty("opened"), "Popover is opened.");

	});

	it("Tests max value property", () => {
		const durationPicker = browser.$("#duration-picker4")
		const duratationPickerIcon = durationPicker.shadow$(".ui5-duration-picker-input-icon-button");

		duratationPickerIcon.click();

		// The default slot
		assert.strictEqual(durationPicker.getProperty("value"),durationPicker.getProperty("maxValue") , "Popover is opened");
		assert.strictEqual(durationPicker.getProperty("_maxValue")[0], "05", "max value is read correctly");
		assert.strictEqual(durationPicker.getProperty("_maxValue")[1], "10", "max value is read correctly");
		assert.strictEqual(durationPicker.getProperty("_maxValue")[2], "08", "max value is read correctly");

		closePicker("#duration-picker4");
	});

	it("Tests seconds-step property", () => {
		const durationPicker = browser.$("#duration-picker6");

		assert.strictEqual(durationPicker.getProperty("value"), "05:10:00", "The initial value is taking in consideration the seconds-step property");

		durationPicker.click();
		durationPicker.keys("Backspace");
		durationPicker.keys("2");
		durationPicker.keys("Enter");
		
		assert.strictEqual(durationPicker.getProperty("value"), "05:10:00", "Editing the value is taking in consideration the seconds-step property");
	});

	it("Tests minutes-step property", () => {
		const durationPicker = browser.$("#duration-picker7");

		assert.strictEqual(durationPicker.getProperty("value"), "05:10", "The initial value is taking in consideration the minutes-step property");
		
		durationPicker.click();
		durationPicker.keys("Backspace");
		durationPicker.keys("2");
		durationPicker.keys("Enter");
		
		assert.strictEqual(durationPicker.getProperty("value"), "05:10", "Editing the value is taking in consideration the minutes-step property");
	});

	it("Tests hide-seconds property", () => {
		const durationPicker = browser.$("#duration-picker3");

		assert.strictEqual(durationPicker.getProperty("value"), "07:20", "Hours and minutes are considered");
	});

	it("Tests hide-minutes property", () => {
		const durationPicker = browser.$("#duration-picker3-1");

		assert.strictEqual(durationPicker.getProperty("value"), "07:10", "Hours and seconds are considered");
	});

	it("Tests hide-hours property", () => {
		const durationPicker = browser.$("#duration-picker3-2");

		assert.strictEqual(durationPicker.getProperty("value"), "20:10", "Minutes and seconds are considered");
	});

});
