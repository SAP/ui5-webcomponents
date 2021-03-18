const assert = require('chai').assert;

describe("Page general interaction", () => {
	before(() => {
		browser.url("http://localhost:8081/test-resources/pages/Page.html");
	});

	it("tests initial rendering", () => {
        const page = browser.$("#page");
        const header = page.shadow$(".ui5-page-header-root");
        const content = page.shadow$(".ui5-page-content-root");
        const footer = page.shadow$(".ui5-page-footer-root");

        assert.ok(page.isExisting(), "The component should have a shadow root.");
        assert.ok(header.isExisting(), "Header should be rendered.");
        assert.ok(content.isExisting(), "Content should be rendered.");
        assert.ok(footer.isExisting(), "Footer should be rendered.");
    });

	it("tests footer visibility", () => {
        const footer = browser.$("#page").shadow$(".ui5-page-footer-root");
        const button = $("#toggleVisibility");

        assert.strictEqual(footer.isDisplayedInViewport(), true, "Footer should be visible.");

        button.click();
        browser.pause(500);

        assert.strictEqual(footer.isDisplayedInViewport(), false, "Footer should not be visible.");
	});
});
