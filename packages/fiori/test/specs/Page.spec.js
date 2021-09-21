const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Page general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Page.html`);
	});

	it("tests initial rendering", async () => {
        const page = await browser.$("#page");
        const header = await page.shadow$(".ui5-page-header-root");
        const content = await page.shadow$(".ui5-page-content-root");
        const footer = await page.shadow$(".ui5-page-footer-root");

        assert.ok(await page.isExisting(), "The component should have a shadow root.");
        assert.ok(await header.isExisting(), "Header should be rendered.");
        assert.ok(await content.isExisting(), "Content should be rendered.");
        assert.ok(await footer.isExisting(), "Footer should be rendered.");
    });

	it("tests footer visibility", async () => {
        const footer = await browser.$("#page").shadow$(".ui5-page-footer-root");
        const button = await browser.$("#toggleVisibility");

        assert.ok(await footer.isDisplayedInViewport(), "Footer should be visible.");

        await button.click();
        await browser.pause(500);

        assert.notOk(await footer.isDisplayedInViewport(), "Footer should not be visible.");
	});
});
