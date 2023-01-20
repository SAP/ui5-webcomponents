const assert = require("chai").assert;


describe("Carousel general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Carousel.html`);
	});

	it("rendering", async () => {
		const carouselRoot = await browser.$("#carousel1").shadow$(".ui5-carousel-root");
		const carousel = await browser.$("#carousel1");
		const carouselItem1 = await carousel.shadow$(".ui5-carousel-item:nth-child(1)");
		const carouselItem2 = await carousel.shadow$(".ui5-carousel-item:nth-child(2)");

		assert.ok(await carouselRoot.isExisting(), "Carousel is rendered.");

		assert.notOk(await carouselItem1.hasClass("ui5-carousel-item--hidden"), "ui5-carousel-item--hidden class is not set");
		assert.ok(await carouselItem2.hasClass("ui5-carousel-item--hidden"), "ui5-carousel-item--hidden class is set");
	});

	it("Carousel navigates left", async () => {
		const carousel = await browser.$("#carousel1");
		await carousel.scrollIntoView();
		await carousel.moveTo();
		const carouselRightButton = await carousel.shadow$$(".ui5-carousel-navigation-button")[0];

		await carouselRightButton.click();
		assert.equal(await carousel.getProperty("_selectedIndex"), "2", "Second view is in place");
	});

	it("Carousel navigates right", async () => {
		const carousel = await browser.$("#carousel1");
		await carousel.scrollIntoView();
		await carousel.moveTo();
		const carouselLeftButton = await carousel.shadow$$(".ui5-carousel-navigation-button")[1];

		await carouselLeftButton.click();
		assert.equal(await carousel.getProperty("_selectedIndex"), "0", "Second view is in place");
	});

	it("Navigation is rendered for carousel with less than 9 elements", async () => {
		const carousel = await browser.$("#carousel1");
		await carousel.moveTo();

		const navigation = await carousel.shadow$(".ui5-carousel-navigation > div");

		assert.ok(await navigation.isExisting(), "Navigation is rendered");
	});

	it("Navigation is rendered for carousel with more than 9 elements", async () => {
		const carousel = await browser.$("#carousel2");
		await carousel.scrollIntoView();
		await carousel.moveTo();
		const navigation = await carousel.shadow$(".ui5-carousel-navigation > ui5-label");

		assert.ok(await navigation.isExisting(), "Navigation is rendered");
	});

	it("Buttons are rendered in the content only when hovering (arrows-placement)", async () => {
		const carousel = await browser.$("#carousel2");
		await carousel.scrollIntoView();

		// show both arrows by navigating to the right and focus the button
		const carouselNextButton = await carousel.shadow$(".ui5-carousel-navigation-button[arrow-forward]");
		await carouselNextButton.click();
		await carousel.moveTo();

		const buttons = await carousel.shadow$$(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)");
		assert.strictEqual(buttons.length, 2, "Navigation is rendered");
	});

	it("Buttons are rendered in the navigation without hovering (arrows-placement)", async () => {
		const carousel = await browser.$("#carousel3");
		const carouselNextButton = await carousel.shadow$(".ui5-carousel-navigation-button[arrow-forward]");
		await carouselNextButton.click();

		await carousel.scrollIntoView();
		const buttons = await carousel.shadow$$(".ui5-carousel-navigation-wrapper .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)");

		assert.strictEqual(buttons.length, 2, "Navigation is rendered");
	});

	it("ItemsPerPage property is working properly", async () => {
		const carousel = await browser.$("#carousel4");
		const pages = await carousel.getProperty("pagesCount");

		assert.strictEqual(pages, 3, "There are only 3 pages.");
	});

	it("Aria attributes are set", async () => {
		const carousel = await browser.$("#carousel5");
		await carousel.scrollIntoView();
		await carousel.moveTo();
		const pageIndicatorDot1 = await browser.$('#carousel5').shadow$(".ui5-carousel-navigation-dot:first-child");
		const pageIndicatorDot2 = await carousel.shadow$(".ui5-carousel-navigation-dot:nth-child(2)");
		const PAGE_INDICATOR_ARIA_LABEL1 = "Item 1 of 5 displayed";
		const PAGE_INDICATOR_ARIA_LABEL2 = "Item 2 of 5 displayed";

		// assert: check page indicators ARIA
		assert.strictEqual(await pageIndicatorDot1.getAttribute("aria-label"), PAGE_INDICATOR_ARIA_LABEL1, "The aria-label of page indicator is correct.");
		assert.strictEqual(await pageIndicatorDot2.getAttribute("aria-label"), PAGE_INDICATOR_ARIA_LABEL2, "The aria-label of page indicator is correct.");

		const carouselItem3 = await carousel.shadow$(".ui5-carousel-item:nth-child(3)");
		const carouselItem4 = await carousel.shadow$(".ui5-carousel-item:nth-child(4)");
		const CAROUSEL_ITEM3_POS = "3";
		const CAROUSEL_ITEM4_POS = "4";
		const SETSIZE = "8";

		// assert: check random carousel items ARIA
		assert.strictEqual(await carouselItem3.getAttribute("aria-posinset"), CAROUSEL_ITEM3_POS, "The aria-posinset of carousel item is correct.");
		assert.strictEqual(await carouselItem4.getAttribute("aria-posinset"), CAROUSEL_ITEM4_POS, "The aria-posinset of carousel item is correct.");
		assert.strictEqual(await carouselItem3.getAttribute("aria-setsize"), SETSIZE, "The aria-setsize of carousel item  is correct.");
		assert.strictEqual(await carouselItem4.getAttribute("aria-setsize"), SETSIZE, "The aria-setsize of carousel item is correct.");

		const carouselRoot = await carousel.shadow$(".ui5-carousel-root");
		const ACTIVEDESCENDANT_PAGE_1 = `${await carousel.getProperty("_id")}-carousel-item-1`;
		const ACTIVEDESCENDANT_PAGE_2 = `${await carousel.getProperty("_id")}-carousel-item-2`;

		// assert: check root tag ARIA
		assert.strictEqual(await carouselRoot.getAttribute("aria-activedescendant"), ACTIVEDESCENDANT_PAGE_1, "The aria-activedescendant of carousel is correct.");

		// check root tag ARIA after navigating to 2nd page
		await carousel.shadow$(".ui5-carousel-navigation-button:nth-child(2)").click();
		assert.strictEqual(await carouselRoot.getAttribute("aria-activedescendant"), ACTIVEDESCENDANT_PAGE_2, "The aria-activedescendant of carousel is correct.");
	});

	it("all visible elements in the current page have correct tabindex values", async () => {
		const carousel = await browser.$("#carouselCards");

		const visibleItems = [
			await carousel.shadow$(".ui5-carousel-item:nth-child(1) slot"),
			await carousel.shadow$(".ui5-carousel-item:nth-child(2) slot"),
			await carousel.shadow$(".ui5-carousel-item:nth-child(3) slot"),
		];

		assert.strictEqual(
			visibleItems.every(async el => await el.getAttribute("tabindex") === "0"),
			true,
			"all visible items have correct tabindex values"
		);
	});

	it("Arrows and Dots not displayed in case of single page", async () => {
		const carousel = await browser.$("#carousel6");
		const pages = await carousel.getProperty("pagesCount");
		const pageIndicator = await carousel.shadow$(".ui5-carousel-navigation-wrapper");
		const navigationArrows = await carousel.shadow$(".ui5-carousel-navigation-arrows");

		assert.notOk(await pageIndicator.isExisting(), "Page indicator is not rendered");
		assert.notOk(await navigationArrows.isExisting(), "Navigation arrows are not rendered");
		assert.strictEqual(pages, 1, "There is only 1 page.");
	});

	it("Event navigate fired when pressing navigation arrows", async () => {
		const carousel = await browser.$("#carousel8");
		await carousel.scrollIntoView();
		await carousel.moveTo();
		const selectedIndex = await browser.$("#result");
		const eventCounter = await browser.$("#resultCounter");
		const navigationArrowForward = await carousel.shadow$("ui5-button[arrow-forward]");
		const navigationArrowsBack = await carousel.shadow$("ui5-button[arrow-back]");

		// using the navigation arrows
		await navigationArrowForward.click(); // forward
		assert.strictEqual(await selectedIndex.getProperty("value"), "1", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "1", "The navigate event is fired.");

		await navigationArrowForward.click(); // forward
		assert.strictEqual(await selectedIndex.getProperty("value"), "2", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "2", "The navigate event is fired.");

		await navigationArrowsBack.click(); // back
		assert.strictEqual(await selectedIndex.getProperty("value"), "1", "The selectedIndex is correct");
		assert.strictEqual(await eventCounter.getProperty("value"), "3", "The navigate event is fired.");

		await navigationArrowsBack.click(); // back
		assert.strictEqual(await selectedIndex.getProperty("value"), "0", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "4", "The navigate event is fired.");

		// using the keyboard navigation
		await carousel.click();
		await carousel.keys("ArrowRight");
		assert.strictEqual(await selectedIndex.getProperty("value"), "1", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "5", "The navigate event is fired.");

		await carousel.keys("ArrowLeft");
		assert.strictEqual(await selectedIndex.getProperty("value"), "0", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "6", "The navigate event is fired.");

		await carousel.keys("ArrowLeft");
		assert.strictEqual(await selectedIndex.getProperty("value"), "0", "The selectedIndex is correct.");
		assert.strictEqual(await eventCounter.getProperty("value"), "6", "The navigate event is not fired as no previous item.");
	});

	it("page-indicator-style property", async () => {
		const carousel = await browser.$("#carouselNumericPageIndicator");
		await carousel.scrollIntoView();

		assert.strictEqual(await carousel.shadow$(".ui5-carousel-navigation [ui5-label]").getText(), "1 of 2", "carousel is showing numeric page indicator");
	});

	it("hide-page-indicator property", async () => {
		const carousel = await browser.$("#carouselHiddenPageIndicator");
		await carousel.scrollIntoView();

		assert.strictEqual(await carousel.shadow$$(".ui5-carousel-navigation > *").length, 0, "carousel has not rendered a page indicator");
	});

	it("navigateTo method and visibleItemsIndices", async () => {
		const carousel = await browser.$("#carousel9");

		await carousel.scrollIntoView();

		assert.deepEqual(await carousel.getProperty("visibleItemsIndices"), [ 0, 1 ], "The indices before navigation are correct.");

		await browser.executeAsync(done => {
			document.getElementById("carousel9").navigateTo(1);
			done();
		});

		assert.deepEqual(await carousel.getProperty("visibleItemsIndices"), [ 1, 2 ], "The indices after navigation are correct.");
	});

	it("F7 keyboard navigation", async () => {
		const carousel = await browser.$("#carouselF7");
		const button = await browser.$("#carouselF7Button");
		const input = await browser.$("#carouselF7Input");
		await carousel.scrollIntoView();

		await button.click();

		await browser.keys("F7");

		let innerFocusedElement = await browser.custom$("activeElement", "#carouselF7");

		assert.ok(await browser.$(innerFocusedElement).hasClass("ui5-carousel-root"), "Carousel is focused");

		await browser.keys("F7");

		innerFocusedElement = innerFocusedElement = await browser.custom$("activeElement", "#carouselF7Button");

		assert.ok(await browser.$(innerFocusedElement).hasClass("ui5-button-root"), "Button is focused");

		await input.click();

		await browser.keys("F7");

		innerFocusedElement = await browser.custom$("activeElement", "#carouselF7");

		assert.ok(await browser.$(innerFocusedElement).hasClass("ui5-carousel-root"), "Carousel is focused");

		await browser.keys("F7");

		innerFocusedElement = await browser.custom$("activeElement", "#carouselF7Input");

		assert.ok(await browser.$(innerFocusedElement).hasClass("ui5-input-inner"), "Input is focused");

		await button.click();
		await browser.keys("F7");

		await browser.executeAsync(done => {
			document.getElementById("carouselF7").navigateTo(1);
			done();
		});

		await browser.keys("F7");

		innerFocusedElement = await browser.custom$("activeElement", "#carouselF7Input");

		assert.ok(await browser.$(innerFocusedElement).hasClass("ui5-input-inner"), "Input is focused");
	});
});
