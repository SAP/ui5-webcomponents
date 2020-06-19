class DatePickerFGPage {

    get dpStart() { return $('#ui5-datepicker--startDate'); }
    get startPopoverContent() {
        const staticAreaItemClassName = browser.getStaticAreaItemClassName("#ui5-datepicker--startDate");
        return browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
    }

    get popover() {
        return this.startPopoverContent.shadow$("ui5-popover");
    }
    get startInnerInput() { return browser.$("#ui5-datepicker--startDate").shadow$("ui5-input").shadow$("input"); }
    get dpEnd() { return $('#ui5-datepicker--endDate'); }

    open() {
        browser.url('http://localhost:8080/test-resources/pages/DatePicker_fg.html');
    }

}

module.exports = new DatePickerFGPage();
