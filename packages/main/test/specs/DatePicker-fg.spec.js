const DatePickerFGPage = require("../pageobjects/DatePickerFGPage");
const assert = require('assert');

describe('Date Picker Field Glass modifications', () => {
    it('direct usage for comparison', () => {
        browser.url('http://localhost:8080/test-resources/sap/ui/webcomponents/main/pages/DatePicker_fg.html');

        let popoverContent = browser.findElementDeep("#ui5-datepicker--startDate >>> ui5-popover >>> .sapMPopup");
        assert.ok(!popoverContent.isDisplayedInViewport(), "popover is initially hidden");

        const innerInput = browser.findElementDeep("#ui5-datepicker--startDate >>> ui5-input >>> input");
        innerInput.click();
        assert.ok(popoverContent.isDisplayedInViewport(), "popover is visible");

        innerInput.keys("Tab");
        const dpEnd = browser.$("#ui5-datepicker--endDate");
        assert.ok(!popoverContent.isDisplayedInViewport(), "popover is hidden");
        assert.ok(dpEnd.isFocused(), "focus is on end date");
    });

    it('Input click and tab out', () => {
        DatePickerFGPage.open();
        assert.ok(!DatePickerFGPage.startPopoverContent.isDisplayedInViewport(), "popover is initially hidden");

        DatePickerFGPage.startInnerInput.click();
        assert.ok(DatePickerFGPage.startPopoverContent.isDisplayedInViewport(), "popover is visible after click");

        DatePickerFGPage.startInnerInput.keys("Tab");
        assert.ok(!DatePickerFGPage.startPopoverContent.isDisplayedInViewport(), "popover is hidden after tab out");
        assert.ok(DatePickerFGPage.dpEnd.isFocused(), "focus is on end date");
    });
});
