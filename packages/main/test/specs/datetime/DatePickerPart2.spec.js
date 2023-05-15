import datepicker from "../../pageobjects/DatePickerTestPage.js";
import { assert } from "chai";

describe("Date Picker Tests", () => {
	before(async () => {
		await datepicker.open();
	});

	it("daypicker extreme values max", async () => {
		var _28Nov9999 = "253399363200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9999");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();

		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _28Nov9999, "28 Nov, 9999 is the first displayed date");
	});

	it("daypicker extreme values min", async () => {
		var _31Dec0000 = "-62135683200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0001");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _31Dec0000, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker prev extreme values min", async () => {
		var _31Dec0000 = "-62135683200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Feb 1, 0001");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _31Dec0000, "Jan 1, 0001 is the second displayed date");
	});

	it("daypicker next extreme values max", async () => {
		var _28Nov9999 = "253399363200";

		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Nov 30, 9999");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		const firstDisplayedDate = await datepicker.getFirstDisplayedDate();
		const timestamp = await firstDisplayedDate.getAttribute("data-sap-timestamp");
		assert.include(timestamp, _28Nov9999, "28 Nov, 9999 is the first displayed date");
	});

	it("monthpicker next extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9998");

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		const btnYear = await datepicker.getBtnYear();
		const innerHTML = await btnYear.getProperty("innerHTML");
		assert.include(innerHTML, "9999", "year button's text is correct");
	});

	it("monthpicker prev extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0002");

		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		const btnYear = await datepicker.getBtnYear();
		const innerHTML = await btnYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "year button's text is correct");
	});

	it("yearpicker extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9995");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9980", "First year in the year picker is correct");
	});

	it("yearpicker extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0003");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("yearpicker prev page extreme values min", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0012");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		let firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		let innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0002", "First year in the year picker is correct");

		const btnPrev = await datepicker.getBtnPrev();
		await btnPrev.click();

		firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("yearpicker next page extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9986");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		let firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		let innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9976", "First year in the year picker is correct");

		const btnNext = await datepicker.getBtnNext();
		await btnNext.click();

		firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9980", "First year in the year picker is correct");
	});

	it("yearpicker click extreme values max", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Dec 31, 9986");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const tenthYear = await datepicker.getDisplayedYear(10);
		let innerHTML = await tenthYear.getProperty("innerHTML");
		assert.include(innerHTML, "9986", "Tenth year in the year picker is correct");

		await tenthYear.click();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "9976", "First year in the year picker is correct");
	});

	it("yearpicker click extreme values min above 10", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0012");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const thirdYear = await datepicker.getDisplayedYear(2);
		const innerHTML = await thirdYear.getProperty("innerHTML");
		assert.include(innerHTML, "0004", "Third year in the year picker is correct");
	});

	it("yearpicker click extreme values min below 10", async () => {
		await datepicker.open();
		datepicker.id = "#dp12";

		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 1, 0004");
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();

		const firstDisplayedYear = await datepicker.getFirstDisplayedYear();
		const innerHTML = await firstDisplayedYear.getProperty("innerHTML");
		assert.include(innerHTML, "0001", "First year in the year picker is correct");
	});

	it("placeholder, based on the formatPattern", async () => {
		datepicker.id = "#dp14";

		const pickerFormatPattern = "MMM d, y";
		const innerInput = await datepicker.getInnerInput();
		const innerInputPlaceholder = await innerInput.getProperty("placeholder");

		// The DatePicker has no placeholder set, in this case a default placeholder, based on the format pattern,
		//  is set to the internal input.
		const root = await datepicker.getRoot()
		assert.notOk(await root.getProperty("placeholder"), "The DatePicker has no placeholder set");
		assert.equal(innerInputPlaceholder, pickerFormatPattern, "By default, the inner input has the formatPattern as placeholder");
	});

	it("placeholder, set by the user", async () => {
		datepicker.id = "#dp15";

		const placeholder = "Delivery date";
		const innerInput = await datepicker.getInnerInput();
		const innerInputPlaceholder = await innerInput.getProperty("placeholder");

		// The DatePicker has placeholder set, in this case the default placeholder, based on the format pattern,
		// is not displayed.
		const root = await datepicker.getRoot();
		assert.ok(await root.getProperty("placeholder"), "The DatePicker has placeholder set");
		assert.equal(innerInputPlaceholder, placeholder, "The inner input has the placeholder, set by the user");
	});

	it("Going under the minimum date changes value state", async () => {
		datepicker.id = "#dp33";

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await innerInput.keys("Jan 1, 1999");
		await innerInput.keys("Enter");

		const input = await datepicker.getInput();
		assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Going over the maximum date changes value state", async () => {
		datepicker.id = "#dp33";

		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		while(await innerInput.getValue() !== ""){
			await innerInput.keys("Backspace");
		}

		await innerInput.keys("May 5, 2100");
		const root = await datepicker.getRoot();
		await root.keys("Enter");

		const input = await datepicker.getInput();
		assert.equal(await input.getProperty("valueState"), "Error", "value state of the input is valid");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Maximum or minimum date changes value state to none", async () => {
		datepicker.id = "#dp33";

		const input = await datepicker.getInput();
		const innerInput = await datepicker.getInnerInput();
		await input.click();
		while(await innerInput.getValue() !== ""){
			await innerInput.keys("Backspace");
		}

		await innerInput.keys("Jan 8, 2100");
		const root = await datepicker.getRoot();
		await root.keys("Enter");

		assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid (1)");

		await input.click();
		await root.setProperty("value", "Jan 1, 2000");
		await root.keys("Enter");

		assert.equal(await input.getProperty("valueState"), "None", "value state of the input is valid (2)");

		const contentWrapper = await browser.$("#dp33").shadow$("ui5-input").shadow$(".ui5-input-content");
		assert.ok(await contentWrapper.isDisplayedInViewport(), "content wrapper has error styles");
	});

	it("Years are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		const input = await datepicker.getInput();
		await input.click();
		const root = await datepicker.getRoot();
		await root.setProperty("value", "Jan 8, 2100");
		await root.keys("Enter");

		await datepicker.openPicker();

		const btnYear = await datepicker.getBtnYear();
		await btnYear.click();
		let displayedYear = await datepicker.getDisplayedYear(11);
		assert.ok(await displayedYear.hasClass("ui5-yp-item--disabled"), "Years out of range are disabled");
		await root.keys("ArrowRight");

		displayedYear = await datepicker.getDisplayedYear(10);
		assert.ok(await displayedYear.isFocusedDeep(), "Focus remained on year 2100");

		displayedYear = await datepicker.getDisplayedYear(11);
		assert.notOk(await displayedYear.isFocusedDeep(), "Years out of range (2101) can not be reached with keyboard");
	});

	it("Months are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		await datepicker.openPicker();

		const btnMonth = await datepicker.getBtnMonth();
		await btnMonth.click();
		let displayedMonth = await datepicker.getDisplayedMonth(10);
		assert.ok(await displayedMonth.hasClass("ui5-mp-item--disabled"), "Months out of range are disabled");

		const root = await datepicker.getRoot();
		await root.keys("ArrowDown");

		displayedMonth = await datepicker.getDisplayedMonth(0);
		assert.ok(await displayedMonth.isFocusedDeep(), "Months out of range  can not be reached with keyboard");
	});

	it("Days are disabled when out of range", async () => {
		datepicker.id = "#dp33";

		const root = await datepicker.getRoot();
		await root.keys("Escape");
		await browser.$("#dp33").scrollIntoView();
		await datepicker.openPicker();

		const displayedDay = await datepicker.getDisplayedDay(15);

		assert.ok(await displayedDay.hasClass("ui5-dp-item--disabled"), "Days out of range are disabled");
	});

	it("Days are enabled when in range", async () => {
		datepicker.id = "#dp33";
		const root = await datepicker.getRoot();
		await root.keys("Escape");

		datepicker.id = "#dp33";
		await datepicker.openPicker();
		const displayedDay = await datepicker.getDisplayedDay(12);

		assert.ok(await displayedDay.isFocusedDeep(), "Days in range are enabled");
	});

	it("Min and Max date are included in the interval", async () => {
		datepicker.id = "#dp33";

		const root = await datepicker.getRoot();
		await root.keys("Escape");
		await datepicker.openPicker();

		let displayedDay = await datepicker.getDisplayedDay(9);
		assert.notOk(await displayedDay.hasClass("ui5-dp-item--disabled"), "Min date is included");

		displayedDay = await datepicker.getDisplayedDay(11);
		assert.notOk(await displayedDay.hasClass("ui5-dp-item--disabled"), "Max date is included");
	});

	it("Tests week numbers column visibility", async () => {
		// act
		datepicker.id = "#dp18";
		const valueHelpIcon = await datepicker.getValueHelpIcon();
		await valueHelpIcon.click();

		// assert
		let dayPicker = await datepicker.getDayPicker();
		const weekNumbersCol1 = await dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.ok(await weekNumbersCol1.isExisting(), "The week numbers column is visible.");

		// close date picker
		const innerInput = await datepicker.getInnerInput();
		await innerInput.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);

		// act
		datepicker.id = "#dp19";
		await valueHelpIcon.click();

		// assert
		dayPicker = await datepicker.getDayPicker();
		const weekNumbersCol2 = await dayPicker.shadow$(".ui5-dp-weekname-container");
		assert.notOk(await weekNumbersCol2.isExisting(), "The week numbers column is hidden.");

		// close date picker
		await innerInput.click();
		await browser.keys(["Alt", "ArrowUp", "NULL"]);
	});

	it("Calendar root have correct attribute", async () => {

		datepicker.id = "#dp18";
		(await datepicker.getValueHelpIcon()).click();
		const monthpickerContent = (await datepicker.getDayPicker()).shadow$(".ui5-dp-content");

		assert.strictEqual(await monthpickerContent.getAttribute("role"), "grid", "Calendar root have correct role attribute");
		assert.strictEqual(await monthpickerContent.getAttribute("aria-roledescription"), "Gregorian calendar", "Calendar root have correct roledescription")
	});

});
