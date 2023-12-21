import { assert } from "chai";

describe("Page layout when content has 100% height", () => {
	before(async () => {
		await browser.url(`test/pages/DynamicPageWithFullscreenContent.html`);
	});

	it("footer does not hide the content", async () => {
        const page = await browser.$("#page");
        const content = await browser.$("#content");
        const footer = await browser.$("#footer");

        assert.ok(await page.getProperty("showFooter"), "Footer is shown");

        const contentBottom = await browser.execute((el) => {
            return el.getBoundingClientRect().bottom;
        }, content);
        const footerTop = await browser.execute((el) => {
            return el.getBoundingClientRect().top;
        }, footer);

        assert.ok(contentBottom <= footerTop, "No overlap");
    });

    it("content expands to fill the space between header and footer", async () => {
        const page = await browser.$("#page");
        const content = await page.shadow$(".ui5-dynamic-page-fit-content");
        const header = await browser.$("#page ui5-dynamic-page-header");
        const footerSpacer = await page.shadow$(".ui5-dynamic-page-spacer");

        assert.ok(await page.getProperty("showFooter"), "Footer is shown");

        const headerBottom = await browser.execute((el) => {
            return el.getBoundingClientRect().bottom;
        }, header);

        const footerTop = await browser.execute((el) => {
            return el.getBoundingClientRect().top;
        }, footerSpacer);

        const contentTop = await browser.execute((el) => {
            return el.getBoundingClientRect().top;
        }, content);

        const contentBottom = await browser.execute((el) => {
            return el.getBoundingClientRect().bottom;
        }, content);

        assert.strictEqual(contentTop, headerBottom, "Content is rendered right below header");
        assert.strictEqual(contentBottom, footerTop, "Content is rendered right above footer");
    });

});

describe("Page layout when content oveflows", () => {
    before(async () => {
        await browser.url(`test/pages/DynamicPage.html`);
    });

    it("footer does not hide the content", async () => {
        const page = await browser.$("#page");
        const content = await browser.$("#col1list");
        const footer = await browser.$("#footer");
        const scrollTopBeforeScroll = await page.getProperty("iPreviousScrollAmount");
        const scrollButton = await browser.$("#scrollBtn");

        assert.ok(await page.getProperty("showFooter"), "Footer is shown");

        // act: scroll the page down
        await scrollButton.click();

        // wait untill the page processes the scroll event
        await browser.waitUntil(async () => (await browser.$("#page").getProperty("iPreviousScrollAmount")) > scrollTopBeforeScroll, {
            timeout: 2000,
            timeoutMsg: "The scroll handler must me called."
        });

        // check if footer overlaps content
        const contentBottom = await browser.execute((el) => {
            return el.getBoundingClientRect().bottom;
        }, content);
        const footerTop = await browser.execute((el) => {
            return el.getBoundingClientRect().top;
        }, footer);

        assert.ok(contentBottom <= footerTop, "No overlap");
    });
});