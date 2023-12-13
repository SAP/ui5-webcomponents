import { assert } from "chai";

describe("Page general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DynamicPage.html`);
	});

    it("allows toggle the footer", async () => {
        const footer = await browser.$("#page").shadow$(".ui5-dynamic-page-footer");
        const toggleFooterButton = await browser.$("#actionsToolbar").shadow$("#toggleFooterBtn");

        assert.ok(await footer.isDisplayedInViewport(), "Footer should be visible.");

        // act: click to hide the footer
        await toggleFooterButton.click();

        await browser.waitUntil(async () => !(await footer.isDisplayedInViewport()), {
            timeout: 500,
            timeoutMsg: "expected footer to not be visible after 500ms"
        });
    });

    it("snaps the header upon pressing the snap button", async () => {
        const dynamicPage = await browser.$("#page");
        const headerSlot = await dynamicPage.shadow$("slot[name=headerArea]");
        const snapButton = await dynamicPage.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        // check initial state
        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), false, "Header is initially expanded");
        assert.ok(await headerSlot.isExisting(), "Header slot is rendered");
        assert.ok(await snapButton.isExisting(), "Arrow button is found");

        // act: click to snap the header
        await snapButton.click();

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), true, "Header is snapped");
        assert.strictEqual(await dynamicPage.shadow$("slot[name=headerArea]").isExisting(), false, "Header slot is not rendered");
    });

    it("expands the header upon pressing the expand button", async () => {
        const dynamicPage = await browser.$("#page");
        const headerSlot = await dynamicPage.shadow$("slot[name=headerArea]");
        const expandButton = await dynamicPage.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), true, "Header is snapped");
        assert.strictEqual(await dynamicPage.shadow$("slot[name=headerArea]").isExisting(), false, "Header slot is not rendered");

        // act: click to expand the header
        await expandButton.click();

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), false, "Header is expanded");
        assert.ok(await headerSlot.isExisting(), "Header slot is rendered");
    });

    it("snaps the header upon scroll", async () => {
        const dynamicPage = await browser.$("#page");
        const scrollButton = await browser.$("#scrollBtn");

        // Act: scroll to hide the header
        await dynamicPage.setProperty("isExpanding", false);
        await scrollButton.click();

        await browser.waitUntil(async () => (await browser.$("#page").getProperty("headerSnapped")), {
            timeout: 2000,
            timeoutMsg: "The header must be snapped."
        });
    });

    it("expands the header in the sticky area", async () => {
        const page = await browser.$("#page");
        const expandButton = await page.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        assert.strictEqual(await page.shadow$("slot[name=headerArea]").isExisting(), false, "Header slot is not rendered");

        // act: click to expand the header
        await expandButton.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");
        assert.ok(await page.shadow$(".ui5-dynamic-page-title-header-wrapper slot[name=headerArea]").isExisting(),
            "Header slot is rendered in the sticky area");
    });

    it("pins the header", async () => {
        const page = await browser.$("#page");
        const pinButton = await page.shadow$("ui5-dynamic-page-header-actions")
            .shadow$$(".ui5-dynamic-page-header-action")[1];

        // act: pin the header
        await pinButton.click();

        assert.strictEqual(await page.getProperty("headerPinned"), true, "Header is pinned");
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is still expanded");
    });

    it("keeps the pinned header expanded during scroll", async () => {
        const page = await browser.$("#page");
        const scrollTopBeforeScroll = await page.getProperty("iPreviousScrollAmount");
        const scrollButton = await browser.$("#scrollBtn");

        // act: scroll the page down
        await scrollButton.click();

        // wait untill the page processes the scroll event
        await browser.waitUntil(async () => (await browser.$("#page").getProperty("iPreviousScrollAmount")) > scrollTopBeforeScroll, {
            timeout: 2000,
            timeoutMsg: "The scroll handler must me called."
        });

        // check: the header state should remained unchanged
        assert.strictEqual(await page.getProperty("headerPinned"), true, "Header is still pinned");
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is still expanded");
    });

    it("unpins the header upon press of snap button", async () => {
        const page = await browser.$("#page");
        const snaoButton = await page.shadow$("ui5-dynamic-page-header-actions")
            .shadow$(".ui5-dynamic-page-header-action");

        // act: snap the header
        await snaoButton.click();

        assert.strictEqual(await page.getProperty("headerPinned"), false, "Header is not pinned");
        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");
    });
});
