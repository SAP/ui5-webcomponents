const assert = require("chai").assert;

describe("Test for the issue", () => {
before(async () => {
        await browser.url(`test/pages/ComboBox.html`);
        await browser.emulateDevice("iPhone X");
    });

    it ("Clicking X button should not fire change event", async () => {
    const cb = await browser.$("#combo2");
    const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
    
    await cb.click();

    const resPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
    const dialogInput = await resPopover.$(".ui5-input-inner-phone");
    const closeBtn = await resPopover.$(".ui5-responsive-popover-close-btn");
    await dialogInput.click();
    await dialogInput.setValue('Testing');
    await closeBtn.click();

    assert.strictEqual(await cb.getProperty("value"), "", "Value is correct.");

    });

    it ("The combo box should fire change event when the OK button is pressed after interaction in the mobile picker", async ()=> {
        const cb = await browser.$("#combo2");
        const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
        
        await cb.click();
    
        const resPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
        const dialogInput = await resPopover.$(".ui5-input-inner-phone");
        const okBtn = await resPopover.$(".ui5-responsive-popover-footer").$("ui5-button");
        await dialogInput.click();
        await dialogInput.setValue('');
        await dialogInput.keys('A');
        await dialogInput.keys('ArrowDown');
        await okBtn.click();

        assert.strictEqual(await cb.getProperty("value"), "Algeria", "Value should be Algeria.");


    });

    it ("When select an item, then open the dialog again and delete the text, then press OK button, the value should be deleted.", async ()=> {
        const cb = await browser.$("#combo2");
        const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#combo2");
        
        await cb.click();
    
        const resPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
        const dialogInput = await resPopover.$(".ui5-input-inner-phone");
        const okBtn = await resPopover.$(".ui5-responsive-popover-footer").$("ui5-button");
        await dialogInput.click();
        await dialogInput.setValue('');
        await dialogInput.keys('A');
        await dialogInput.keys('ArrowDown');
        await okBtn.click();

        assert.strictEqual(await cb.getProperty("value"), "Algeria", "Value should be Algeria.");
        await cb.click();
        await dialogInput.click();
        await dialogInput.keys('ArrowDown');
        await dialogInput.keys('Backspace');
        await okBtn.click();
        assert.strictEqual(await cb.getProperty("value"), "", "Value should be empty.");


    });

});