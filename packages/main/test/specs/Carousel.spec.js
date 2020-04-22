const assert = require("chai").assert;


describe("Carousel general interaction", () => {
	browser.url("http://localhost:8080/test-resources/pages/Carousel.html");

	it("Carousel is rendered", () => {
		const carouselRoot = browser.$("#carousel1").shadow$(".ui5-carousel-root");

		assert.ok(carouselRoot.isExisting(), "Carousel is rendered.");
	});

	it("Carousel navigates left", () => {
		const carousel = browser.$("#carousel1");
		const carouselRightButton = carousel.shadow$$(".ui5-carousel-navigation-button")[0];

		carouselRightButton.click();
		assert.equal(carousel.getAttribute("selected-index"), "2", "Second view is in place");
	});

	it("Carousel navigates right", () => {
		const carousel = browser.$("#carousel1");
		const carouselLeftButton = carousel.shadow$$(".ui5-carousel-navigation-button")[1];

		carouselLeftButton.click();
		assert.equal(carousel.getAttribute("selected-index"), "0", "Second view is in place");
	});

	it("Navigation is rendered for carousel with less than 9 elements", () => {
		const carousel = browser.$("#carousel1");
		const navigation = carousel.shadow$(".ui5-carousel-navigation > div");

		assert.ok(navigation.isExisting(), "Navigation is rendered");
	});

	it("Navigation is rendered for carousel with more than 9 elements", () => {
		const carousel = browser.$("#carousel2");
		const navigation = carousel.shadow$(".ui5-carousel-navigation > ui5-label");

		assert.ok(navigation.isExisting(), "Navigation is rendered");
	});

	it("Buttons are rendered in the navigation(arrows-placement)", () => {
		const carousel = browser.$("#carousel3");
		const buttons = carousel.shadow$$(".ui5-carousel-navigation-wrapper ui5-button");

		assert.strictEqual(buttons.length, 2, "Navigation is rendered");
	});

	it("ItemsPerPage property is working properly", () => {
		const carousel = browser.$("#carousel4");
		const pages = carousel.getProperty("pagesCount");

		assert.strictEqual(pages, 3, "There are only 3 pages.");
	});

	it("Aria attributes are set", () => {
		const carousel = browser.$("#carousel5");
		const pageIndicatorDot1 = carousel.shadow$(".ui5-carousel-navigation-dot:first-child");
		const pageIndicatorDot2 = carousel.shadow$(".ui5-carousel-navigation-dot:nth-child(2)");
		const PAGE_INDICATOR_ARIA_LABEL1 = "Item 1 of 5 displayed";
		const PAGE_INDICATOR_ARIA_LABEL2 = "Item 2 of 5 displayed";

		// assert: check page indicators ARIA
		assert.strictEqual(pageIndicatorDot1.getAttribute("aria-label"), PAGE_INDICATOR_ARIA_LABEL1, "The aria-label of page indicator is correct.");
		assert.strictEqual(pageIndicatorDot2.getAttribute("aria-label"), PAGE_INDICATOR_ARIA_LABEL2, "The aria-label of page indicator is correct.");


		const carouselItem3 = carousel.shadow$(".ui5-carousel-item:nth-child(3)");
		const carouselItem4 = carousel.shadow$(".ui5-carousel-item:nth-child(4)");
		const CAROUSEL_ITEM3_POS = "3";
		const CAROUSEL_ITEM4_POS = "4";
		const SETSIZE = "8";

		// assert: check random carousel items ARIA
		assert.strictEqual(carouselItem3.getAttribute("aria-posinset"), CAROUSEL_ITEM3_POS, "The aria-posinset of carousel item is correct.");
		assert.strictEqual(carouselItem4.getAttribute("aria-posinset"), CAROUSEL_ITEM4_POS, "The aria-posinset of carousel item is correct.");
		assert.strictEqual(carouselItem3.getAttribute("aria-setsize"), SETSIZE, "The aria-setsize of carousel item  is correct.");
		assert.strictEqual(carouselItem4.getAttribute("aria-setsize"), SETSIZE, "The aria-setsize of carousel item is correct.");

		const carouselRoot = carousel.shadow$(".ui5-carousel-root");
		const ACTIVEDESCENDANT_PAGE_1 = `${carousel.getProperty("_id")}-carousel-item-1`;
		const ACTIVEDESCENDANT_PAGE_2 = `${carousel.getProperty("_id")}-carousel-item-2`;

		// assert: check root tag ARIA
		assert.strictEqual(carouselRoot.getAttribute("aria-activedescendant"), ACTIVEDESCENDANT_PAGE_1, "The aria-activedescendant of carousel is correct.");

		// check root tag ARIA after navigating to 2nd page
		carousel.shadow$(".ui5-carousel-navigation-button:nth-child(2)").click();
		assert.strictEqual(carouselRoot.getAttribute("aria-activedescendant"), ACTIVEDESCENDANT_PAGE_2, "The aria-activedescendant of carousel is correct.");
	});

	it("Arrows and Dots not displayed in case of single page", () => {
		const carousel = browser.$("#carousel6");
		const pages = carousel.getProperty("pagesCount");
		const pageIndicator = carousel.shadow$(".ui5-carousel-navigation-wrapper");
		const navigationArrows = carousel.shadow$(".ui5-carousel-navigation-arrows");

		assert.ok(!pageIndicator.isExisting(), "Page indicator is not srendered");
		assert.ok(!navigationArrows.isExisting(), "Navigation arrows are not rendered");
		assert.strictEqual(pages, 1, "There is only 1 page.");
	});


	it("Invalid selectedIndex normalized", () => {
		const carousel = browser.$("#carousel7");
		const selectedIndex = carousel.getProperty("selectedIndex");
		const NORMALIZED_INDEX = 0;

		assert.strictEqual(selectedIndex, NORMALIZED_INDEX,
			"Although '15' is set, the actual selectedIndex is changed to 0.");
	});
});
