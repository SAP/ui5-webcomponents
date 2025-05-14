import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import DatePicker from "../../src/DatePicker.js";
import Label from "../../src/Label.js";

describe("Date Picker Tests", () => {
	afterEach(() => {
		// eslint-disable-next-line
		cy.wait(200);
	});

	it("input renders", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("be.visible");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input");

		cy.get("@input")
			.should("be.visible");

		cy.get("@input")
			.should("have.attr", "aria-roledescription", "Date Input")
			.and("have.attr", "aria-haspopup", "grid")
			.and("not.have.attr", "aria-controls");

		cy.get("@input")
			.should("not.have.attr", "aria-expanded");
	});

	it("input receives value in format pattern depending on the set language", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "bg");

		cy.mount(<DatePicker value="11 декември 2018г." formatPattern="long"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker");

		cy.get("@datePicker")
			.should("have.value", "11 декември 2018\u202fг.")
			.and("have.attr", "value-state", "None");

		const timestamp_11_Dec_2018 = 1544486400;

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_11_Dec_2018)
			.should("have.class", "ui5-dp-item--selected");

		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");
	});

	it("custom formatting", () => {
		cy.mount(<DatePicker formatPattern="yyyy, dd/MM"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("2018, 05/05")
			.realPress("Enter");

		cy.get("@datePicker")
			.should("have.attr", "value-state", "None");
	});

	it("value state", () => {
		cy.mount(<DatePicker></DatePicker>);
		cy.get("[ui5-date-picker]")
			.as("datePicker");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Invalid input")
			.realPress("Enter");

		cy.get("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value-state", "Negative");
		
		cy.get("@datePicker")
			.shadow()
			.find("[slot='header']")
			.first()
			.should("have.text", "Invalid entry");

		cy.get("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.shadow()
			.find(".ui5-input-content")
			.should("be.visible");
	});

	it("disabled", () => {
		cy.mount(<DatePicker disabled={true}></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.should("have.css", "pointer-events", "none");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "disabled");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-icon")
			.should("have.css", "pointer-events", "none");
	});

	it("readonly", () => {
		cy.mount(<DatePicker readonly={true}></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "readonly");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-icon")
			.should("not.exist");
	});

	it("required", () => {
		cy.mount(<DatePicker required={true}></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "required");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "aria-required", "true");
	});

	it("placeholder", () => {
		cy.mount(<DatePicker placeholder="test placeholder"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "placeholder", "test placeholder");
	});

	

	it("Selected date from daypicker is the same as datepicker date", () => {
		cy.mount(<DatePicker value="Jan 29, 2019" formatPattern="MMM d, y"></DatePicker>);

		const timestamp_11_Jan_2019 = 1547164800;

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_11_Jan_2019)
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 11, 2019");
	});

	it("focusout fires change", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realType("Jan 1, 1999")
			.realPress("Tab");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value", "Jan 1, 1999");
	});

	it("Select a date from the picker popover", () => {
		cy.mount(<DatePicker value="Jan 6, 2015" formatPattern="MMM d, y"></DatePicker>);

		const timestamp_6_Jan_2015 = 1420502400;
		const timestamp_8_Jan_2015 = timestamp_6_Jan_2015 + 2 * 24 * 60 * 60;

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_6_Jan_2015)
			.should("have.class", "ui5-dp-item--selected");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_8_Jan_2015)
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.should("not.have.attr", "open");

		cy.get("@datePicker")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.have.attr", "open");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 8, 2015");
	});

	it("Clear the input field", () => {
		cy.mount(<DatePicker value="2015" formatPattern="y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "");
	});

	it("respect first day of the week - monday", () => {
		cy.wrap({ setLanguage })
			.invoke("setLanguage", "bg");

		cy.mount(<DatePicker value="фев 6, 2019" formatPattern="MMM d, y"></DatePicker>);

		const timestamp_3_Feb_2019 = 1549152000;
		const timestamp_28_Jan_2019 = 1548633600;

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_28_Jan_2019.toString());

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_3_Feb_2019)
			.should("have.class", "ui5-dp-wday6");

		cy.wrap({ setLanguage })
			.invoke("setLanguage", "en");
	});

	it("if today is 30 jan, clicking next month does not skip feb", () => {
		cy.mount(<DatePicker value="Jan 30, 2019" formatPattern="MMM d, y"></DatePicker>);

		const timestamp_27_Jan_2019 = 1548547200;

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_27_Jan_2019.toString());
	});

	it("picker stays open on input click", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");
	});

	it("change fires when we change the input back to its original value", () => {
		cy.mount(<DatePicker value="2015" formatPattern="y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused");

		cy.get("@input")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "");

		cy.get("@input")
			.should("be.focused")
			.realType("2015")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "2015");
	});

	it("change fires every time tomorrow is typed and normalized", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("tomorrow")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.invoke("attr", "value")
			.should("not.be.empty")
			.and("not.equal", "tomorrow");
	});

	it("today value is normalized and correctly rounded to 00:00:00", () => {
		cy.mount(<DatePicker value="today"></DatePicker>);

		let timestampToday = new Date().getTime();
		timestampToday = (timestampToday - (timestampToday % (24 * 60 * 60 * 1000))) / 1000;

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.should("have.attr", "timestamp", timestampToday.toString());

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestampToday)
			.should("have.class", "ui5-dp-item--selected");
	});

	it("[F4] toggles the calendar", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.should("not.have.attr", "open");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.should("be.visible");
	});

	it("[Alt] + [Up] toggles the calendar", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress(["Alt", "ArrowUp"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");

		cy.get("@input")
			.realPress(["Alt", "ArrowUp"]);

		cy.get<DatePicker>("@datePicker")
			.should("not.have.attr", "open");
	});

	it("[Alt] + [Down] toggles the calendar", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress(["Alt", "ArrowDown"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");

		cy.get("@input")
			.realPress(["Alt", "ArrowDown"]);

		cy.get<DatePicker>("@datePicker")
			.should("not.have.attr", "open");
	});

	it("[F4] shows month picker after date picker is open", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress("F4");

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.should("not.be.visible");

		cy.get("@calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("be.visible");
	});

	it("[Shift] + [F4] shows year picker after date picker is open", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress(["Shift", "F4"]);

		cy.get("@calendar")
			.shadow()
			.find("ui5-yearpicker")
			.should("be.visible");
	});

	it("[F4] shows month picker after year picker is open", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress(["Shift", "F4"])
			.realPress("F4");

		cy.get("@calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("be.visible");
	});

	it("[Shift] + [F4] shows year picker after month picker is open", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress("F4")
			.realPress(["Shift", "F4"]);

		cy.get("@calendar")
			.shadow()
			.find("ui5-yearpicker")
			.should("be.visible");
	});

	it("DatePicker popover when initially opened displays a day picker", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress("F4")
			.realPress("Escape");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.should("be.visible");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.realPress(["Shift", "F4"])
			.realPress("Escape");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.should("be.visible");
	});

	it("daypicker extreme values max", () => {
		const timestamp_28_Nov_9999 = "253399363200";

		cy.mount(<DatePicker value="Dec 31, 9999" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_28_Nov_9999);

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("daypicker extreme values min", () => {
		const timestamp_31_Dec_0000 = "-62135683200";

		cy.mount(<DatePicker value="Jan 1, 0001" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_31_Dec_0000);

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("daypicker prev extreme values min", () => {
		const timestamp_31_Dec_0000 = "-62135683200";

		cy.mount(<DatePicker value="Feb 1, 0001" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_31_Dec_0000);

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("daypicker next extreme values max", () => {
		const timestamp_28_Nov_9999 = "253399363200";

		cy.mount(<DatePicker value="Nov 30, 9999" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_28_Nov_9999);

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("monthpicker next extreme values max", () => {
		cy.mount(<DatePicker value="Dec 31, 9998" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetMonthButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("be.visible");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.should("have.text", "9999");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("monthpicker prev extreme values min", () => {
		cy.mount(<DatePicker value="Jan 1, 0002" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetMonthButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("be.visible");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.should("have.text", "0001");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("yearpicker extreme values max", () => {
		cy.mount(<DatePicker value="Dec 31, 9995" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "9980");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("yearpicker extreme values min", () => {
		cy.mount(<DatePicker value="Jan 1, 0003" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "0001");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("yearpicker prev page extreme values min", () => {
		cy.mount(<DatePicker value="Jan 1, 0012" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "0002");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "0001");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPreviousButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("yearpicker next page extreme values max", () => {
		cy.mount(<DatePicker value="Dec 31, 9986" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "9976");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "9980");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetNextButton()
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("yearpicker click extreme values max", () => {
		cy.mount(<DatePicker value="Dec 31, 9986" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(10)
			.should("have.text", "9986");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(10)
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "9976");
	});

	it("yearpicker click extreme values min year above 10", () => {
		cy.mount(<DatePicker value="Jan 1, 0012" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(2)
			.should("have.text", "0004");
	});

	it("yearpicker click extreme values min year below 10", () => {
		cy.mount(<DatePicker value="Jan 1, 0004" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedYear()
			.should("have.text", "0001");
	});

	it("placeholder, based on the formatPattern", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "placeholder", "MMM d, y");

		cy.get<DatePicker>("@datePicker")
			.should("not.have.attr", "placeholder");
	});

	it("placeholder, set by the user", () => {
		cy.mount(<DatePicker placeholder="Delivery date" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "placeholder", "Delivery date");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "placeholder", "Delivery date");
	});

	it("Going under the minimum date changes value state", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y" minDate="Jan 1, 2000"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Jan 1, 1999")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.shadow()
			.find(".ui5-input-content")
			.should("be.visible");
	});

	it("Going over the maximum date changes value state", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y" maxDate="Jan 8, 2100"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("May 5, 2100")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.shadow()
			.find(".ui5-input-content")
			.should("be.visible");
	});

	it("Maximum or minimum date changes value state to none", () => {
		cy.mount(<DatePicker formatPattern="y" minDate="2000" maxDate="2100"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realType("2000")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "None");

		cy.get("@input")
			.realClick()
			.should("be.focused")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realPress("Backspace")
			.realType("2100")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "None");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.shadow()
			.find(".ui5-input-content")
			.should("be.visible");
	});

	it("Years are disabled when out of range", () => {
		cy.mount(<DatePicker
			value="Jan 8, 2100"
			formatPattern="MMM d, y"
			minDate="Jan 1, 2000"
			maxDate="Jan 8, 2100">
		</DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(11)
			.should("have.class", "ui5-yp-item--disabled")
			.and("not.have.focus");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(10)
			.as("year")
			.should("have.focus");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.realPress("ArrowRight");

		cy.get("@year")
			.should("have.focus");
	});

	it("Months are disabled when out of range", () => {
		cy.mount(<DatePicker
			value="Jan 8, 2100"
			formatPattern="MMM d, y"
			minDate="Jan 1, 2000"
			maxDate="Jan 8, 2100">
		</DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetMonthButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedMonth(10)
			.should("have.class", "ui5-mp-item--disabled");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.realPress("ArrowDown");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedMonth(0)
			.should("have.focus");
	});

	it("Days are disabled when out of range", () => {
		cy.mount(<DatePicker
			value="Jan 1, 2024"
			formatPattern="MMM d, y"
			maxDate="Jan 1, 2024">
		</DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(15)
			.should("have.class", "ui5-dp-item--disabled");
	});

	it("Min and Max dates are included in the interval", () => {
		cy.mount(<DatePicker
			value="Jan 10, 2024"
			formatPattern="MMM d, y"
			minDate="Jan 1, 2024"
			maxDate="Jan 31, 2024"
		></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(9)
			.should("not.have.class", "ui5-dp-item--disabled");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(11)
			.should("not.have.class", "ui5-dp-item--disabled");
	});

	it("Week numbers are visible", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-weekname-container")
			.should("exist");
	});

	it("Week numbers are hidden", () => {
		cy.mount(<DatePicker hideWeekNumbers={true}></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-weekname-container")
			.should("not.exist");
	});

	it("Calendar root have correct attribute", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-content")
			.should("have.attr", "role", "grid")
			.and("have.attr", "aria-roledescription", "Gregorian calendar");
	});

	it("DayPicker content wrapped", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-content")
			.children()
			.each($row => {
				cy.wrap($row)
					.should("have.attr", "role", "row");
			});
	});

	it("DayPicker day number attribute", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-content")
			.children()
			.as("rows");

		cy.get("@rows")
			.first()
			.find(".ui5-dp-dayname")
			.should("have.attr", "role", "columnheader");

		cy.get("@rows")
			.last()
			.find(".ui5-dp-weekname-container")
			.should("have.attr", "role", "rowheader");

		cy.get("@rows")
			.last()
			.find(".ui5-dp-item")
			.should("have.attr", "role", "gridcell");
	});

	it("DatePicker dates and week number", () => {
		cy.mount(<DatePicker
			formatPattern="MMM d, y"
			primaryCalendarType="Gregorian"
			value="May 3, 2100"
		></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-content > div[role='row']:nth-child(3)")
			.as("row");

		cy.get("@row")
			.children()
			.first()
			.should("have.attr", "aria-label", "Calendar Week 19")
			.next()
			.should("have.attr", "aria-label", "May 2, 2100 Non-Working Day")
			.next()
			.should("have.attr", "aria-label", "May 3, 2100")
			.next()
			.should("have.attr", "aria-label", "May 4, 2100");
	});

	it("Tests aria-label", () => {
		const EXPECTED_ARIA_LABEL = "Hello World";

		cy.mount(<DatePicker accessibleName={EXPECTED_ARIA_LABEL}></DatePicker>);

		cy.get("[ui5-date-picker]")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL);
	});

	it("Tests aria-labelledby", () => {
		const EXPECTED_ARIA_LABEL = "info text";

		cy.mount(
			<>
				<Label id="infoText">{EXPECTED_ARIA_LABEL}</Label>
				<DatePicker accessibleNameRef="infoText"></DatePicker>
			</>
		);

		cy.get("[ui5-date-picker]")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL);
	});

	it("Page up/down increments/decrements the day value", () => {
		cy.mount(<DatePicker value="Jan 1, 2000" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress("PageDown");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Dec 31, 1999");

		cy.get("@input")
			.realPress("PageUp");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 1, 2000");
	});

	it("Shift + Page up/down increments/decrements the month value", () => {
		cy.mount(<DatePicker value="Jan 1, 2000" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress(["Shift", "PageDown"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Dec 1, 1999");

		cy.get("@input")
			.realPress(["Shift", "PageUp"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 1, 2000");
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value", () => {
		cy.mount(<DatePicker value="Jan 1, 2000" formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realPress(["Control", "Shift", "PageDown"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 1, 1999");

		cy.get("@input")
			.realPress(["Control", "Shift", "PageUp"]);

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "Jan 1, 2000");
	});

	it("Keyboard navigation works when there are disabled dates in the calendar grid", () => {
		cy.mount(<DatePicker
			value="Jan 1, 2000"
			formatPattern="MMM d, y"
			minDate="Jan 1, 2000">
		</DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.realPress("ArrowDown");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(13)
			.should("have.focus");
	});

	it("Value state changes only on submit", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realType("test");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "None");

		cy.get("@input")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");
	});

	it("Prevent value-state-change event", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.then($datePicker => {
				$datePicker.on("value-state-change", event => {
					event.preventDefault();
				});
			});

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Invalid value")
			.realPress("Enter");

		cy.get("@datePicker")
			.should("have.attr", "value-state", "None");
	});

	it("Prevent change event", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.then($datePicker => {
				$datePicker.on("change", cy.stub().as("changeHandler").callsFake((event: Event) => {
					event.preventDefault();
				}));
			});

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Mar 31, 1995")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.value", "")
			.and("have.attr", "value-state", "None");

		cy.get("@changeHandler")
			.should("have.been.calledOnce")
			.and("have.been.calledWithMatch", {
				detail: {
					value: "Mar 31, 1995",
					valid: true,
				}
			});
	});

	it("DatePicker's formatter has strict parsing enabled", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Jan 60, 2000")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");
	});

	it("Invalid initial value isn't cleared due to formatting", () => {
		cy.mount(<DatePicker value="Invalid value"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetInnerInput()
			.should("have.value", "Invalid value");
	});

	it("Invalid state is refreshed after a value is picked by Calendar and set again", () => {
		cy.mount(<DatePicker formatPattern="MMM d, y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Invalid value")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(15)
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "None");
	});

	it("Min and max dates are set, with no format pattern provided, using valid ISO format", () => {
		cy.mount(<DatePicker minDate="2019-09-01" maxDate="2019-11-01"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Nov 1, 2020")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "Negative");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(3)
			.should("have.class", "ui5-yp-item--disabled");
	});

	it("Min and max dates are NOT set because no format pattern is provided & format used is not ISO", () => {
		cy.mount(<DatePicker minDate="22.10.2020" maxDate="22.10.2021"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("Apr 12, 2024")
			.realPress("Enter");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "value-state", "None");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetYearButton()
			.realClick();

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedYear(11)
			.should("not.have.class", "ui5-yp-item--disabled");
	});

	it("Date picker in month mode", () => {
		cy.mount(<DatePicker formatPattern="MMM y"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.should("have.attr", "_current-picker", "month");

		cy.get("@calendar")
			.shadow()
			.find("ui5-monthpicker")
			.should("be.visible");
	});

	it("Date picker in year mode", () => {
		cy.mount(<DatePicker formatPattern="yyyy"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.should("have.attr", "open");

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-calendar")
			.as("calendar")
			.should("have.attr", "_current-picker", "year");

		cy.get("@calendar")
			.shadow()
			.find("ui5-yearpicker")
			.should("be.visible");
	});

	it("picker popover should have accessible name", () => {
		cy.mount(<DatePicker></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		cy.get<DatePicker>("@datePicker")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.attr", "accessible-name", "Choose Date");
	});
});

describe("Legacy date customization and Islamic calendar type", () => {
	afterEach(() => {
		// eslint-disable-next-line
		cy.wait(200);
	});

	const configurationObject = {
		"formatSettings": {
			"legacyDateCalendarCustomizing": [
				{
					"dateFormat": "A",
					"gregDate": "20240211",
					"islamicMonthStart": "14450801"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240311",
					"islamicMonthStart": "14450901"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240410",
					"islamicMonthStart": "14451001"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240509",
					"islamicMonthStart": "14451101"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240607",
					"islamicMonthStart": "14451201"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240707",
					"islamicMonthStart": "14460101"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240805",
					"islamicMonthStart": "14460201"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240904",
					"islamicMonthStart": "14460301"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241004",
					"islamicMonthStart": "14460401"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241103",
					"islamicMonthStart": "14460501"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241202",
					"islamicMonthStart": "14460601"
				}
			]
		}
	};

	it("Customization of legacy dates in Islamic calendar", () => {
		cy.window()
			.then($el => {
				const scriptElement = document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify(configurationObject);
				return $el.document.head.append(scriptElement);
			})

		// According to the Islamic calendar, Rab. I 9, 1446 AH should be displayed on Thursday,
		// but it needs to be configured using the legacyDateCalendarCustomizing setting.
		cy.mount(<DatePicker value="Rab. I 9, 1446 AH" primaryCalendarType="Islamic"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(11)
			.should("have.text", "9");

		cy.window()
			.then($el => {
				const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");

				scriptElement?.remove();
			})
	});

	it("primary calendar type", () => {
		cy.mount(<DatePicker primaryCalendarType="Islamic"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.shadow()
			.find("ui5-calendar")
			.should("have.attr", "primary-calendar-type", "Islamic");
	});

	it("Islamic calendar type input value", () => {
		cy.mount(<DatePicker primaryCalendarType="Islamic" formatPattern="MMM d, y G"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realType("Rab. I 6, 1440 AH")
			.realPress("Enter");

		cy.get("@datePicker")
			.should("have.value", "Rab. I 6, 1440 AH");

		cy.get("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value-state", "None");
	});
});
