import { assert } from "chai";

describe("InvisibleMessage", () => {
	before(async () => {
		await browser.url(`test/pages/base/InvisibleMessage.html`);
	});

    it("Initial rendering", async () => {
        const politeSpan = await browser.$(".ui5-invisiblemessage-polite");
        const assertiveSpan = await browser.$(".ui5-invisiblemessage-assertive");

        assert.ok(politeSpan, "Polite span is rendered");
        assert.ok(assertiveSpan, "Assertive span is rendered");
    });

    it("String annoucement", async () => {
        const politeSpan = await browser.$(".ui5-invisiblemessage-polite");
        const assertiveSpan = await browser.$(".ui5-invisiblemessage-assertive");
        const button = await browser.$("#announce-button");
        const checkBox = await browser.$("#announce-checkbox");

        await browser.$("#announce-textarea").setProperty("value", "announcement");

        await button.click();
        await checkBox.click();
        await button.click();

        let politeSpanHtml = await politeSpan.getHTML();
        let assertiveSpanHtml = await assertiveSpan.getHTML();
        assert.include(politeSpanHtml, "announcement", "Value has been rendered.");
        assert.include(assertiveSpanHtml, "announcement", "Value has been rendered.");

        await browser.pause(3000);

        politeSpanHtml = await politeSpan.getHTML();
        assertiveSpanHtml = await assertiveSpan.getHTML();

        assert.notInclude(politeSpanHtml, "announcement", "Value should be cleared.");
        assert.notInclude(assertiveSpanHtml, "announcement", "Value should be cleared.");
    });
});
