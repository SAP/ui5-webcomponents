class DatePickerFGPage {

    get dpStart() { return $('#ui5-datepicker--startDate'); }
    get startPopoverContent() { return browser.findElementDeep("#ui5-datepicker--startDate >>> ui5-popover >>> .ui5-popup-root"); }
    get startInnerInput() { return browser.findElementDeep("#ui5-datepicker--startDate >>> ui5-input >>> input"); }
    get dpEnd() { return $('#ui5-datepicker--endDate'); }

    open() {
        browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_fg.html');
    }

}

module.exports = new DatePickerFGPage();
