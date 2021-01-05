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
		timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();
		// browser.pause(500);

		const hoursSliderValue = timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).getValue();
		const minutesSliderValue = timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).getValue();
		const secondsSliderValue = timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).getValue();

		// assert
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("tests sliders submit value", () => {
		const timepicker = browser.$("#timepicker");
		const staticAreaItemClassName = browser.getStaticAreaItemClassName("#timepicker");
		const picker = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();
		browser.keys("Escape");
		timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();

		// picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown"); // select 00
		for (let i=1; i<= 14; i++) browser.keys("ArrowDown"); // Select 14

		// picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("Tab");
		browser.keys("PageDown");// select 00
		for (let i=1; i<= 15; i++) browser.keys("ArrowDown"); // Select 15

		// picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("Tab");
		browser.keys("PageDown");// select 00
		for (let i=1; i<= 16; i++) browser.keys("ArrowDown"); // Select 16

		browser.keys("Tab"); // Move to submit
		browser.keys("Enter"); // Enter on submit

		const textValue = timepicker.shadow$("ui5-input").getValue();
		assert.strictEqual(textValue.substring(0,2), "14", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "15", "Minutes are equal");
	});

	it("tests submit wrong value", () => {
		const timepicker = browser.$("#timepicker");

		timepicker.click();
		browser.keys("123123123");
		browser.keys("Enter");

		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("tests valueStateMessage slot", () => {
		const timepicker = browser.$("#timepickerValueStateMessage");

		timepicker.click();

		const inputId = timepicker.shadow$("ui5-input").getProperty("_id");
		const inputStaticAreaItem = browser.$(`.${inputId}`);
		const slot = inputStaticAreaItem.shadow$("ui5-popover").$("#customValueStateMessage");

		assert.notOk(slot.error, "Value State message slot is working");
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

		timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("PageDown"); // select 00
		for (let i=1; i<= 10; i++) browser.keys("ArrowDown"); // Select 10

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
		timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		browser.keys("ArrowDown"); // select 11
		timepickerPopover.$("#submit").click(); // click submit (the other test tests Enter, this one tests click)

		// assert
		assert.strictEqual(changeResult.getProperty("value"), "2", "Change fired as expected");
	});

	it("tests value state", () => {
		const timepicker = browser.$("#timepickerEmptyValue");
		const button = browser.$("#testBtn");

		// act
		timepicker.click();
		while(timepicker.shadow$("ui5-input").getProperty("value") !== ""){
			browser.keys("Backspace");
		}
		button.click();

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is None");
	});

	it("tests input keyboard handling", () => {
		const timepicker = browser.$("#timepicker5");

		// act
		timepicker.click();
		browser.keys(['Shift', 'PageUp']);
		browser.keys('Shift');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "12:01:01", "The value of minutes is +1");
		// act
		timepicker.click();
		browser.keys(['Shift', 'PageDown']);
		browser.keys('Shift');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of minutes is -1");

		// act
		timepicker.click();
		browser.keys('PageUp');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "01:00:01", "The value of hours is +1");
		// act
		timepicker.click();
		browser.keys('PageDown');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of hours is -1");

		// act
		timepicker.click();
		browser.keys(['Shift', 'Control', 'PageUp']);
		browser.keys('Shift');
		browser.keys('Control');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "12:00:02", "The value of seconds is +1");
		// act
		timepicker.click();
		browser.keys(['Shift', 'Control', 'PageDown']);
		browser.keys('Shift');
		browser.keys('Control');

		// assert
		assert.strictEqual(timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of seconds is -1");
	});
});
