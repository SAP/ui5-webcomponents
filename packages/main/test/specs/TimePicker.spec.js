const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("TimePicker general interaction", () => {
	it("input receives value in format pattern depending on the set language", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/TimePicker.html?sap-ui-language=bg`);

		const timepicker = await browser.$("#timepickerSetTime");
		const setTimeButton = await browser.$("#setTimeButton");

		await setTimeButton.click();

		assert.equal(await timepicker.shadow$("ui5-input").getValue(), "3:16:16 ч.");
	});

	it("tests sliders value", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/TimePicker.html?sap-ui-language=en`);
		const timepicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const timepickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		await timepicker.setProperty("value", "11:12:13");
		await timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();

		const hoursSliderValue = await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).getValue();
		const minutesSliderValue = await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).getValue();
		const secondsSliderValue = await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).getValue();

		// assert
		assert.strictEqual(hoursSliderValue, "11", "Hours are equal");
		assert.strictEqual(minutesSliderValue, "12", "Minutes are equal");
		assert.strictEqual(secondsSliderValue, "13", "Minutes are equal");
	});

	it("tests sliders submit value", async () => {
		const timepicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const picker = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// act
		await timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();
		await browser.keys("Escape");
		await timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();

		// await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown"); // select 00
		for (let i=1; i<= 14; i++) await browser.keys("ArrowDown"); // Select 14

		// await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="minutes"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("Tab");
		await browser.keys("PageDown");// select 00
		for (let i=1; i<= 15; i++) await browser.keys("ArrowDown"); // Select 15

		// await picker.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="seconds"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("Tab");
		await browser.keys("PageDown");// select 00
		for (let i=1; i<= 16; i++) await browser.keys("ArrowDown"); // Select 16

		await browser.keys("Tab"); // Move to submit
		await browser.keys("Enter"); // Enter on submit

		const textValue = await timepicker.shadow$("ui5-input").getValue();
		assert.strictEqual(textValue.substring(0,2), "14", "Hours are equal");
		assert.strictEqual(textValue.substring(3,5), "15", "Minutes are equal");
	});

	it("tests submit wrong value", async () => {
		const timepicker = await browser.$("#timepicker");

		await timepicker.click();
		await browser.keys("123123123");
		await browser.keys("Enter");

		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("valueState"), "Error", "The value state is on error");
	});

	it("tests valueStateMessage slot", async () => {
		const timepicker = await browser.$("#timepickerValueStateMessage");

		await timepicker.click();

		const inputId = await timepicker.shadow$("ui5-input").getProperty("_id");
		const inputStaticAreaItem = await browser.$(`.${inputId}`);
		const slot = await inputStaticAreaItem.shadow$("ui5-popover").$("#customValueStateMessage");

		assert.notOk(slot.error, "Value State message slot is working");
	});

	it("tests change event", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepickerChange");
		const timepicker = await browser.$("#timepickerChange");
		const icon = await timepicker.shadow$("ui5-input").$("ui5-icon");
		const changeResult = await browser.$("#changeResult");

		// act - submit the same time
		await icon.click();
		const timepickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await timepickerPopover.$("#submit").click();

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "0", "Change not fired as expected");

		// act - submit value after changing time
		await icon.click();

		await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("PageDown"); // select 00
		for (let i=1; i<= 10; i++) await browser.keys("ArrowDown"); // Select 10

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
		await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="hours"]`).shadow$(`div[tabindex="0"]`).click();
		await browser.keys("ArrowDown"); // select 11
		await timepickerPopover.$("#submit").click(); // click submit (the other test tests Enter, this one tests click)

		// assert
		assert.strictEqual(await changeResult.getProperty("value"), "2", "Change fired as expected");
	});

	it("tests value state", async () => {
		const timepicker = await browser.$("#timepickerEmptyValue");
		const button = await browser.$("#testBtn");

		// act
		await timepicker.click();
		while(await timepicker.shadow$("ui5-input").getProperty("value") !== ""){
			await browser.keys("Backspace");
		}
		await button.click();

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("valueState"), "None", "The value state is None");
	});

	it("tests input keyboard handling", async () => {
		const timepicker = await browser.$("#timepicker5");

		// act
		await timepicker.click();
		await browser.keys(['Shift', 'PageUp']);
		await browser.keys('Shift');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "12:01:01", "The value of minutes is +1");
		// act
		await timepicker.click();
		await browser.keys(['Shift', 'PageDown']);
		await browser.keys('Shift');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of minutes is -1");

		// act
		await timepicker.click();
		await browser.keys('PageUp');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "01:00:01", "The value of hours is +1");
		// act
		await timepicker.click();
		await browser.keys('PageDown');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of hours is -1");

		// act
		await timepicker.click();
		await browser.keys(['Shift', 'Control', 'PageUp']);
		await browser.keys('Shift');
		await browser.keys('Control');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "12:00:02", "The value of seconds is +1");
		// act
		await timepicker.click();
		await browser.keys(['Shift', 'Control', 'PageDown']);
		await browser.keys('Shift');
		await browser.keys('Control');

		// assert
		assert.strictEqual(await timepicker.shadow$("ui5-input").getProperty("value"), "12:00:01", "The value of seconds is -1");
	});

	it("test arrow navigation", async () => {
		// arrange
		await browser.url(`http://localhost:${PORT}/test-resources/pages/TimePicker.html?sap-ui-language=en`);

		const timepicker = await browser.$("#timepicker3"); //picker with 4 sliders
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker3");

		// act
		await timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();

		await browser.keys("ArrowRight");
		await browser.keys("ArrowRight");
		await browser.keys("ArrowRight");

		const timepickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// assert
		assert.strictEqual(await timepickerPopover.$("ui5-time-selection").shadow$(`ui5-wheelslider[data-sap-slider="periods"]`).getAttribute("expanded"),
			"", "the periods slider should be expanded");
	});

	it("test closing the picker with the keyboard", async () => {
		// arrange
		await browser.url(`http://localhost:${PORT}/test-resources/pages/TimePicker.html?sap-ui-language=en`);

		const timepicker = await browser.$("#timepicker3");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker3");

		// act
		await timepicker.shadow$("ui5-input").$(".ui5-time-picker-input-icon-button").click();
		await browser.keys(["Alt", "ArrowUp"]);

		const timepickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// assert
		assert.notOk(await timepickerPopover.isDisplayed(), "the picker should be collapsed");
	});
});
