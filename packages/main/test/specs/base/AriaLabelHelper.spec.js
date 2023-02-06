const assert = require("chai").assert;

describe("AriaLabelHelper", () => {
    before(async () => {
        await browser.url(`test/pages/base/AriaLabelHelper.html`);
    });

    const getErrorMessageAriaLabelNotAsExpected = (actual, expected) => {
        return `aria-label ${actual} is not as expected ${expected}.`
    }

    it("Label-for tests", async () => {
        const btn = await browser.$("#btnChange");
        const input = await browser.$("#myInput");
        const innerInput = await input.shadow$("input");
        const l1 = await browser.$("#lblDesc1");
        const l2 = await browser.$("#lblDesc2");
        const l3 = await browser.$("#lblDesc3");
        const l4 = await browser.$("#lblDesc4");

        const arrTextsBefore = await Promise.all([l1.getText(), l2.getText(), l3.getText(), l4.getText()]);
        const textBefore = arrTextsBefore.join(" ");

        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textBefore,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textBefore)
        );
        await btn.click();

        const arrTextsAfter = await Promise.all([l1.getText(), l4.getText()]);
        const textAfter = arrTextsAfter.join(" ");
        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textAfter,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textAfter)
        );
    });

    it("Input accessibleNameRef Tests", async () => {
        const btnChangeDesc1 = await browser.$("#btnChange2"); //Change Desc lblEnterName1
        const btnChangeDesc2 = await browser.$("#btnChange22"); //Change Desc lblEnterName2
        const btnSwap = await browser.$("#btnChange3"); // Swap Accessible Name Ref 1 and 2
        const btnRemove = await browser.$("#btnChange35"); // Remove lblEnterName3 from accessible-name-ref


        const input = await browser.$("#inputEnterName");
        const innerInput = await input.shadow$("input");
        const l1 = await browser.$("#lblEnterName1");
        const l2 = await browser.$("#lblEnterName2");
        const l3 = await browser.$("#lblEnterName3");

        const arrTextsBefore = await Promise.all([l1.getText(), l3.getText()]);
        const textBefore = arrTextsBefore.join(" ");

        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textBefore,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textBefore)
        );

        await btnChangeDesc1.click();

        const arrTextsAfter = await Promise.all([l1.getText(), l3.getText()]);
        const textAfter = arrTextsAfter.join(" ");
        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textAfter,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textAfter)
        );
        assert.notEqual(textBefore, textAfter, "Description is not changing.");

        await btnSwap.click();
        await btnChangeDesc2.click();
        const arrTextsAfter2 = await Promise.all([l2.getText(), l3.getText()]);
        const textAfter2 = arrTextsAfter2.join(" ");
        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textAfter2,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textAfter2)
        );
        assert.notEqual(textAfter, textAfter2, "Description is not changing.");

        await btnRemove.click();
        const textAfter3 = arrTextsAfter2[0];
        assert.equal(
            await innerInput.getAttribute("aria-label"),
            textAfter3,
            getErrorMessageAriaLabelNotAsExpected(await innerInput.getAttribute("aria-label"), textAfter3)
        );

    });
});
