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

describe("ARIA attributes", () => {
    before(async () => {
        await browser.url(`test/pages/DynamicPage.html`);
    });

    it("sets expanded state attributes", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");
        const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
        const headerWrapper = await page.shadow$(".ui5-dynamic-page-title-header-wrapper");
        const headerActions = await page.shadow$("ui5-dynamic-page-header-actions");
        const expandButton = await headerActions.shadow$("ui5-button.ui5-dynamic-page-header-action-expand");
        const pinButton = await headerActions.shadow$("ui5-toggle-button.ui5-dynamic-page-header-action-pin");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");

        // check ARIA attribute values
        assert.strictEqual(await headerWrapper.getAttribute("aria-label"), "Header Expanded",
            "aria-label value is correct");
        assert.strictEqual(await headerWrapper.getAttribute("aria-expanded"), "true",
            "aria-expanded value is correct");
        assert.strictEqual(await headerWrapper.getAttribute("role"), "region",
            "header role is correct");

        assert.strictEqual(await titleFocusArea.getAttribute("aria-expanded"), "true",
            "aria-expanded value is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("aria-describedby"), "toggle-description",
            "aria-describedby is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("role"), "button",
            "title focus area role is correct");

        assert.strictEqual(await expandButton.getProperty("accessibleName"), "Snap Header",
            "expand button accessible-name is correct");
        assert.strictEqual(await expandButton.getProperty("title"), "Snap Header",
            "expand button accessible-name is correct");

        assert.strictEqual(await pinButton.getProperty("accessibleName"), "Pin Header",
            "pin button accessible-name is correct");
        assert.strictEqual(await pinButton.getProperty("title"), "Pin Header",
            "pin button accessible-name is correct");

        assert.exists(await title.shadow$("#toggle-description"));
    });

    it("sets snapped state attributes", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");
        const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
        const headerWrapper = await page.shadow$(".ui5-dynamic-page-title-header-wrapper");
        const headerActions = await page.shadow$("ui5-dynamic-page-header-actions");
        const expandButton = await headerActions.shadow$("ui5-button.ui5-dynamic-page-header-action-expand");

        // snap the header
        await page.setProperty("headerSnapped", true);

        // check ARIA attribute values
        assert.strictEqual(await headerWrapper.getAttribute("aria-label"), "Header Snapped",
            "aria-label value is correct");
        assert.strictEqual(await headerWrapper.getAttribute("aria-expanded"), "false",
            "aria-expanded value is correct");
        assert.strictEqual(await headerWrapper.getAttribute("role"), "region",
            "role is correct");

        // snap the title
        await title.setProperty("snapped", true);

        assert.strictEqual(await titleFocusArea.getAttribute("aria-expanded"), "false",
            "aria-expanded value is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("aria-describedby"), "toggle-description",
            "aria-describedby is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("role"), "button",
            "title focus area role is correct");

        assert.strictEqual(await expandButton.getProperty("accessibleName"), "Expand Header",
            "expand button accessible-name is correct");
        assert.strictEqual(await expandButton.getProperty("title"), "Expand Header",
            "expand button accessible-name is correct");

        assert.exists(await title.shadow$("#toggle-description"));
    });

});