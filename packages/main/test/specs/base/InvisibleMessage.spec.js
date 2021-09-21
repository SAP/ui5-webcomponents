const assert = require("chai").assert;
const PORT = require("../_port.js");

describe("InvisibleMessage", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/base/InvisibleMessage.html`);
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

        await browser.executeAsync(done => {
			document.getElementById("announce-textarea").value = "announcement";
			done();
		});

        await button.click();
        await checkBox.click();
        await button.click();

        const politeSpanHtml = await politeSpan.getHTML();
        const assertiveSpanHtml = await assertiveSpan.getHTML();
        assert.ok(politeSpanHtml.includes("announcement"), "Value has been rendered.");
        assert.ok(assertiveSpanHtml.includes("announcement"), "Value has been rendered.");
    });
});
