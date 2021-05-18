const assert = require("chai").assert;
const PORT = require("../_port.js");

describe("InvisibleMessage", () => {
	before(() => {
		browser.url(`http://localhost:${PORT}/test-resources/pages/base/InvisibleMessage.html`);
	});

    it("Initial rendering", () => {
        const politeSpan = browser.$(".ui5-invisiblemessage-polite");
        const assertiveSpan = browser.$(".ui5-invisiblemessage-assertive");

        assert.ok(politeSpan, "Polite span is rendered");
        assert.ok(assertiveSpan, "Assertive span is rendered");
    });

    it("String annoucement", () => {
        const politeSpan = browser.$(".ui5-invisiblemessage-polite");
        const assertiveSpan = browser.$(".ui5-invisiblemessage-assertive");
        const button = browser.$("#announce-button");
        const checkBox = browser.$("#announce-checkbox");

        browser.execute(() => {
			document.getElementById("announce-textarea").value = "announcement";
		});

        button.click();
        checkBox.click();
        button.click();

        assert.ok(politeSpan.getHTML().indexOf("announcement") > -1, "Value has been rendered.");
        assert.ok(assertiveSpan.getHTML().indexOf("announcement") > -1, "Value has been rendered.");
    });
});
