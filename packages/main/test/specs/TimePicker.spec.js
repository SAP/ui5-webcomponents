const assert = require("chai").assert;

describe("TimePicker general interaction", () => {
	it("input receives value in format pattern depending on the set language", () => {
		browser.url("http://localhost:8080/test-resources/pages/TimePicker.html?sap-ui-language=bg");

		const timepicker = browser.$("#timepickerSetTime");
		const setTimeButton = browser.$("#setTimeButton");

		setTimeButton.click();

		assert.equal(timepicker.shadow$("ui5-input").getValue(), "3:16:16 ч.");
	});

	it("tests sliders value", () => {
		browser.url("http://localhost:8080/test-resources/pages/TimePicker.html");
		const timepicker = browser.$("#timepicker");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepicker");
		const timepickerPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		timepicker.setProperty("value", "11:12:13");
		timepicker.shadow$("ui5-input").$(".ui5-timepicker-input-icon-button").click();

		const hoursSliderValue = timepickerPopover.$(".ui5-timepicker-hours-wheelslider").getValue();
		const minutesSliderValue = timepickerPopover.$(".ui5-timepicker-minutes-wheelslider").getValue();
		const secondsSliderValue = timepickerPopover.$(".ui5-timepicker-seconds-wheelslider").getValue();

		// assert
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("tests sliders submit value", () => {
		const timepicker = browser.$("#timepicker");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepicker");
		const timepickerPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		timepickerPopover.setProperty("opened", true);
		timepickerPopover.$(".ui5-timepicker-hours-wheelslider").setProperty("value","14");
		timepickerPopover.$(".ui5-timepicker-minutes-wheelslider").setProperty("value","15");
		timepickerPopover.$(".ui5-timepicker-seconds-wheelslider").setProperty("value","16");
		timepickerPopover.$("#submit").click();

		const textValue = timepicker.shadow$("ui5-input").getValue();
		assert.strictEqual(textValue.substring(0,2), "14", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "15", "Minutes are equal");
	});

	it("tests submit wrong value", () => {
		const timepicker = browser.$("#timepicker");

		timepicker.click();
		timepicker.keys("123123123");
		timepicker.keys("Enter");

		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("tests valueStateMessage slot", () => {
		const timepicker = browser.$("#timepickerValueStateMessage");

		timepicker.click();

		const inputId = timepicker.shadow$("ui5-input").getProperty("_id");
		const inputStaticAreaItem = browser.$(`.${inputId}`);
		const slot = inputStaticAreaItem.shadow$("ui5-popover").$("#customValueStateMessage");

		assert.notOk(slot.error, "cValue State message slot is working");
	});

	it("tests change event", () => {
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepickerChange");
		const timepicker = browser.$("#timepickerChange");
		const icon = timepicker.shadow$("ui5-input").$("ui5-icon");
		const changeResult = browser.$("#changeResult");

		// act - submit the same time
		icon.click();
		const timepickerPopover = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(changeResult.getProperty("value"), "0", "Change not fired as expected");

		// act - submit value after changing time
		icon.click();
		timepickerPopover.$(".ui5-timepicker-hours-wheelslider").setProperty("value", "10");
		timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(changeResult.getProperty("value"), "1", "Change fired as expected");

		// act - submit the same time
		icon.click();
		timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(changeResult.getProperty("value"), "1", "Change not fired as expected");

		// act - submit value after changing time
		icon.click();
		timepickerPopover.$(".ui5-timepicker-hours-wheelslider").setProperty("value", "11");
		timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(changeResult.getProperty("value"), "2", "Change fired as expected");
	});

	it("tests value state", () => {
		const timepicker = browser.$("#timepickerEmptyValue");
		const button = browser.$("#testBtn");

		// act
		timepicker.click();
		while(timepicker.shadow$("ui5-input").getProperty("value") !== ""){
			timepicker.keys("Backspace");
		}
		button.click();

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is None");
	});
});