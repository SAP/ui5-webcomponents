class DatePickerFGPage {

	get dpStart() {
		return $('#ui5-datepicker--startDate');
	}

	get startPopoverContent() {
		return browser.$(browser.getStaticAreaRespPopover("#ui5-datepicker--startDate"));
	}

	get startInnerInput() {
		return browser.$("#ui5-datepicker--startDate").shadow$("ui5-input").shadow$("input");
	}

	get dpEnd() {
		return $('#ui5-datepicker--endDate');
	}

	open() {
		browser.url('http://localhost:8080/test-resources/pages/DatePicker_fg.html');
	}

}

module.exports = new DatePickerFGPage();