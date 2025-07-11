import { assert } from "chai";

describe("API", () => {
    before(async () => {
        await browser.url(`test/pages/DynamicPage_test.html`);
    });

    it("toggles the header-snapped state with 'headerSnapped' property", async () => {
        const page = await browser.$("#page");
        const headerSlot = await page.shadow$("slot[name=headerArea]");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is initially expanded");
        assert.ok(await headerSlot.isExisting(), "Header slot is rendered");

        // act
        await page.setProperty("headerSnapped", true);

        // assert header is no longer rendered
        assert.strictEqual(await headerSlot.isExisting(), false, "Header is not rendered");
    });

    it("propagates-down the 'headerSnapped' property", async () => {
        const page = await browser.$("#page"),
            headerActions = page.shadow$('ui5-dynamic-page-header-actions'),
            title = await browser.$("#page ui5-dynamic-page-title");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");
        assert.strictEqual(await headerActions.getProperty("snapped"), true, "Header action is snapped");
        assert.strictEqual(await title.getProperty("snapped"), true, "Title is snapped");

        // act
        await page.setProperty("headerSnapped", false);

        // assert property is propagated
        assert.strictEqual(await headerActions.getProperty("snapped"), false, "Header action is expanded");
        assert.strictEqual(await title.getProperty("snapped"), false, "Title is expanded");
    });

    it("toggles the header-pinned state with 'headerPinned' property", async () => {
        const page = await browser.$("#page"),
            headerInStickyArea = await page.shadow$('header.ui5-dynamic-page-title-header-wrapper > slot[name=headerArea]'),
            headerInScrollableArea = await page.shadow$('.ui5-dynamic-page-scroll-container > slot[name=headerArea]');;

        // assert init state
        assert.strictEqual(await page.getProperty("headerPinned"), false, "Header is initially not pinned");
        assert.strictEqual( await headerInStickyArea.isExisting(), false, "Header is not in the sticky area");
        assert.strictEqual( await headerInScrollableArea.isExisting(), true, "Header is inside the scrollable area");

        // act
        await page.setProperty("headerPinned", true);

        // assert header is pinned in DOM
        assert.strictEqual(await headerInStickyArea.isExisting(), true, "Header is inside the sticky area");
        assert.strictEqual(await headerInScrollableArea.isExisting(), false, "Header is not in the scrollable area");
    });

    it("propagates-down the 'headerPinned' property", async () => {
        const page = await browser.$("#page"),
            headerActions = page.shadow$('ui5-dynamic-page-header-actions');

        // assert init state
        assert.strictEqual(await page.getProperty("headerPinned"), true, "Header is pinned");
        assert.strictEqual(await headerActions.getProperty("pinned"), true, "Pin header action is initially on");

        // act
        await page.setProperty("headerPinned", false);

        // assert property is propagated
        assert.strictEqual(await headerActions.getProperty("pinned"), false, "Pin header action is off");
    });

    it("toggles the pin-button visibility with 'hidePinButton' property", async () => {
        const page = await browser.$("#page"),
            headerActions = page.shadow$('ui5-dynamic-page-header-actions');

        // assert init state
        assert.strictEqual(await page.getProperty("hidePinButton"), false, "Pin button is initially visible");
        assert.strictEqual(await headerActions.getProperty("hidePinButton"), false, "Pin button is initially visible");

        // act
        await page.setProperty("hidePinButton", true);

        // assert pin button is not rendered
        assert.strictEqual(await headerActions.getProperty("hidePinButton"), true, "Pin button is hidden");
    });
});

describe("Scroll", () => {
    before(async () => {
        await browser.url(`test/pages/DynamicPage_test.html`);
    });

    // this test must be at the end because it messes up with the scroll state
    it("snaps the header upon scroll", async () => {
        const dynamicPage = await browser.$("#page");
        const scrollButton = await browser.$("#scrollDownBtn");

        // Act: scroll to hide the header
        await dynamicPage.setProperty("skipSnapOnScroll", false);
        await scrollButton.click();

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), true, "The header must be snapped");
        await browser.waitUntil(async () => (await browser.$("#page").getProperty("headerSnapped")), {
            timeout: 2000,
            timeoutMsg: "The header must be snapped."
        });
    });

    it("expands the header upon scroll", async () => {
        const dynamicPage = await browser.$("#page");
        const scrollButton = await browser.$("#scrollToTopBtn");

        // Act: scroll to show the header
        await dynamicPage.setProperty("skipSnapOnScroll", false);
        await scrollButton.click();

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), false, "The header must be expanded");
        await browser.waitUntil(async () => !(await browser.$("#page").getProperty("headerSnapped")), {
            timeout: 2000,
            timeoutMsg: "The header must be expanded."
        });
    });
});

describe("Page general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/DynamicPage_test.html`);
	});

    it("toggles the header when scrollTop is between SCROLL_THRESHOLD and headerHeight", async () => {
        const page = await browser.$("#page");
        const scrollContainer = await page.shadow$(".ui5-dynamic-page-scroll-container");
        const snapButton = await page.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        await scrollContainer.setProperty("scrollTop", 20);

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is initially expanded");

        await snapButton.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), true, "The header should be snapped");
        assert.strictEqual(await page.getProperty("showHeaderInStickArea"), true, "Header should be displayed in the sticky area");

        await snapButton.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "The header should be expanded again after unsnapping");
        assert.strictEqual(await page.getProperty("showHeaderInStickArea"), false, "Header should not be in the sticky area when expanded");

        assert.strictEqual(await scrollContainer.getProperty("scrollTop"), 0, "scrollTop should be reset to 0 after unsnapping");
    });

    it("allows toggle the footer", async () => {
        const footer = await browser.$("#page").shadow$(".ui5-dynamic-page-footer");
        const toggleFooterButton = await browser.$("#actionsToolbar").$("#toggleFooterBtn");

        assert.ok(await footer.isDisplayedInViewport(), "Footer should be visible.");

        // act: click to hide the footer
        await toggleFooterButton.click();

        await browser.waitUntil(async () => !(await footer.isDisplayedInViewport()), {
            timeout: 1000,
            timeoutMsg: "expected footer to not be visible after 1000ms"
        });
    });

    it("snaps the header upon pressing the snap button", async () => {
        const dynamicPage = await browser.$("#page");
        const snapButton = await dynamicPage.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        // check initial state
        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), false, "Header is initially expanded");
        assert.ok(await snapButton.isExisting(), "Arrow button is found");

        // act: click to snap the header
        await snapButton.click();

        assert.strictEqual(await dynamicPage.getProperty("headerSnapped"), true, "Header is snapped");
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

    it("expands the header in the sticky area", async () => {
        const dynamicPage = await browser.$("#page");

        dynamicPage.setProperty("headerSnapped", true);
        const page = await browser.$("#page");
        const expandButton = await page.shadow$("ui5-dynamic-page-header-actions").shadow$(".ui5-dynamic-page-header-action");

        assert.strictEqual(await page.getProperty("headerInContent"), false, "Header slot is not rendered");

        // act: click to expand the header
        await expandButton.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");
        assert.ok(await page.shadow$("slot[name=headerArea]").isExisting(),
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
        const scrollTopBeforeScroll = await page.shadow$(".ui5-dynamic-page-scroll-container").getProperty("scrollTop");
        const scrollButton = await browser.$("#scrollDownBtn");

        // act: scroll the page down
        await scrollButton.click();

        // wait untill the page processes the scroll event
        await browser.waitUntil(async () => (await page.shadow$(".ui5-dynamic-page-scroll-container").getProperty("scrollTop")) > scrollTopBeforeScroll, {
            timeout: 2000,
            timeoutMsg: "The scroll handler must me called."
        });

        // check: the header state should remained unchanged
        assert.strictEqual(await page.getProperty("headerPinned"), true, "Header is still pinned");
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is still expanded");
    });

    it("unpins the header upon press of snap button", async () => {
        const page = await browser.$("#page");
        const snapButton = await page.shadow$("ui5-dynamic-page-header-actions")
            .shadow$(".ui5-dynamic-page-header-action");

        // act: snap the header
        await snapButton.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");
    });

    it("expands the title with click", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");

        // assert initial state
        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");

        // act: click to expand
        await title.click();

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");
    });

    it("snaps the title with click", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");
        const focusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");

        // ensure initial state
        await page.setProperty("headerSnapped", false);

        // act: click to snap
        // click at random position to avoid clicking of toolbar buttons
        await focusArea.click({ x: 50, y: 50 });

        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");
    });

    it("expands the title using keyboard", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");

        // act: toggle the title
        await title.keys("Enter")

        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");
    });

    it("snaps the title using keyboard", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");

        // act: toggle the title
        await title.keys("Enter")

        assert.strictEqual(await page.getProperty("headerSnapped"), true, "Header is snapped");
    });
});

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
        await browser.url(`test/pages/DynamicPage_test.html`);
    });

    it("footer does not hide the content", async () => {
        const page = await browser.$("#page");
        const content = await browser.$("#col1list");
        const footer = await browser.$("#footer");
        const scrollTopBeforeScroll = await page.shadow$(".ui5-dynamic-page-scroll-container").getProperty("scrollTop");
        const scrollButton = await browser.$("#scrollToBottomBtn");

        assert.ok(await page.getProperty("showFooter"), "Footer is shown");

        // act: scroll the page down
        await scrollButton.click();

        // wait untill the page processes the scroll event
        await browser.waitUntil(async () => (await page.shadow$(".ui5-dynamic-page-scroll-container").getProperty("scrollTop")) > scrollTopBeforeScroll, {
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
        await browser.url(`test/pages/DynamicPage_test.html`);
    });

    it("sets expanded state attributes", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");
        const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
        const headerWrapper = await page.shadow$(".ui5-dynamic-page-title-header-wrapper");
        const headerRoot = await page.$("ui5-dynamic-page-header").shadow$(".ui5-dynamic-page-header-root");
        const headerActions = await page.shadow$("ui5-dynamic-page-header-actions");
        const expandButton = await headerActions.shadow$("ui5-button.ui5-dynamic-page-header-action-expand");
        const pinButton = await headerActions.shadow$("ui5-toggle-button.ui5-dynamic-page-header-action-pin");

        // assert init state
        assert.strictEqual(await page.getProperty("headerSnapped"), false, "Header is expanded");

        // check ARIA attribute values
        assert.strictEqual(await headerWrapper.getAttribute("aria-label"), "Header Expanded",
            "aria-label value is correct");
        assert.strictEqual(await headerRoot.getAttribute("role"), "region",
            "header role is correct");

        assert.strictEqual(await titleFocusArea.getAttribute("aria-expanded"), "true",
            "aria-expanded value is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("aria-describedby"), `${await title.getProperty("__id")}-toggle-description`,
            "aria-describedby is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("role"), "button",
            "title focus area role is correct");

        assert.strictEqual(await expandButton.getProperty("accessibleName"), "Snap Header",
            "expand button accessible-name is correct");
        assert.strictEqual(await expandButton.getProperty("tooltip"), "Snap Header",
            "expand button accessible-name is correct");

        assert.strictEqual(await pinButton.getProperty("accessibleName"), "Pin Header",
            "pin button accessible-name is correct");
        assert.strictEqual(await pinButton.getProperty("tooltip"), "Pin Header",
            "pin button accessible-name is correct");
    });

    it("sets snapped state attributes", async () => {
        const page = await browser.$("#page");
        const title = await browser.$("#page ui5-dynamic-page-title");
        const titleFocusArea = await title.shadow$(".ui5-dynamic-page-title-focus-area");
        const headerWrapper = await page.shadow$(".ui5-dynamic-page-title-header-wrapper");

        // snap the header
        await page.setProperty("headerSnapped", true);

        // check ARIA attribute values
        assert.strictEqual(await headerWrapper.getAttribute("aria-label"), "Header Snapped",
            "aria-label value is correct");

        assert.strictEqual(await titleFocusArea.getAttribute("aria-expanded"), "false",
            "aria-expanded value is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("aria-describedby"), `${await title.getProperty("__id")}-toggle-description`,
            "aria-describedby is correct");
        assert.strictEqual(await titleFocusArea.getAttribute("role"), "button",
            "title focus area role is correct");

        const headerActions = await page.shadow$("ui5-dynamic-page-header-actions");
        const expandButton = await headerActions.shadow$("ui5-button");

        assert.ok(await expandButton.isExisting(), "expand button is rendered");
        assert.strictEqual(await expandButton.getProperty("accessibleName"), "Expand Header",
            "expand button accessible-name is correct");
        assert.strictEqual(await expandButton.getProperty("tooltip"), "Expand Header",
            "expand button tooltip is correct");
    });
});