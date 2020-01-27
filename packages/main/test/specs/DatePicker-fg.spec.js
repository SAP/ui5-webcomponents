const DatePickerFGPage = require("../pageobjects/DatePickerFGPage");
const assert = require("chai").assert;

describe('Date Picker Field Glass modifications', () => {
    it('direct usage for comparison', () => {
        browser.url('http://localhost:8080/test-resources/pages/DatePicker_fg.html');

        const staticAreaItemClassName = browser.getStaticAreaItemClassName("#ui5-datepicker--startDate");
        let popoverContent = browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover")
        assert.ok(!popoverContent.getProperty("opened"), "popover is initially hidden");

        const innerInput = browser.$("#ui5-datepicker--startDate").shadow$("ui5-input").shadow$("input");
        innerInput.click();
        assert.ok(popoverContent.getProperty("opened"), "popover is visible");

        innerInput.keys("Tab");
        const dpEnd = browser.$("#ui5-datepicker--endDate");
        assert.ok(!popoverContent.getProperty("opened"), "popover is hidden");
        assert.ok(dpEnd.isFocused(), "focus is on end date");
    });

    it('Input click and tab out', () => {
        DatePickerFGPage.open();
        assert.ok(!DatePickerFGPage.startPopoverContent.getProperty("opened"), "popover is initially hidden");

        DatePickerFGPage.startInnerInput.click();
        assert.ok(DatePickerFGPage.startPopoverContent.getProperty("opened"), "popover is visible after click");

        DatePickerFGPage.startInnerInput.keys("Tab");
        assert.ok(!DatePickerFGPage.startPopoverContent.getProperty("opened"), "popover is hidden after tab out");
        assert.ok(DatePickerFGPage.dpEnd.isFocused(), "focus is on end date");
    });
});
