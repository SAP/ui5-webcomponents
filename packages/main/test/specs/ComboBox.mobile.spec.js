const assert = require("chai").assert;

describe("Test for the issue", () => {
before(async () => {
        await browser.url(`test/pages/ComboBox.html`);
        await browser.emulateDevice("iPhone X");
    });

    it ("clicking the close btn should empty the input, if item is not selected or if text is passed without selection", async () => {
    const cb = await browser.$("#combo2");
    const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
    
    await cb.click();

    const resPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
    const dialogInput = await resPopover.$(".ui5-input-inner-phone");
    const closeBtn = await resPopover.$(".ui5-responsive-popover-close-btn");
    await dialogInput.click();
    await dialogInput.keys("c");
    await closeBtn.click();

    assert.strictEqual(await cb.getProperty("value"), "", "Value is empty");

    });
});