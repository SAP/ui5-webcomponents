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
		const pages = carousel.getProperty("pages").length;

		assert.strictEqual(pages, 3, "There are only 3 pages.");
	});

	it("Arrows and Dots not displayed in case of single page", () => {
		const carousel = browser.$("#carousel6");
		const pages = carousel.getProperty("pages").length;
		const pageIndicator = carousel.shadow$(".ui5-carousel-navigation-wrapper");
		const navigationArrows = carousel.shadow$(".ui5-carousel-navigation-arrows");

		assert.ok(!pageIndicator.isExisting(), "Navigation is rendered");
		assert.ok(!navigationArrows.isExisting(), "Navigation is rendered");
		assert.strictEqual(pages, 1, "There are only 3 pages.");
	});

	it("Event selectedPageChange fired when pressing navigation arrows", () => {
		const carousel = browser.$("#carousel5");
		const selectedIndex = browser.$("#result");
		const eventCounter = browser.$("#resultCounter");
		const navigationArrowForward = carousel.shadow$("ui5-button[arrow-forward]");
		const navigationArrowsBack = carousel.shadow$("ui5-button[arrow-back]");

		navigationArrowForward.click(); // forward
		assert.strictEqual(selectedIndex.getProperty("value"), "1", "The selectedIndex is correct.");
		assert.strictEqual(eventCounter.getProperty("value"), "1", "The selectedPageChange is fired.");
		
		navigationArrowForward.click(); // forward
		assert.strictEqual(selectedIndex.getProperty("value"), "1", "The selectedIndex remains the same as this is the last page.");
		assert.strictEqual(eventCounter.getProperty("value"), "1", "The selectedPageChange not fired as this is last page.");
		
		navigationArrowsBack.click(); // back
		assert.strictEqual(selectedIndex.getProperty("value"), "0", "The selectedIndex is correct");
		assert.strictEqual(eventCounter.getProperty("value"), "2", "The selectedPageChange is fired.");

		navigationArrowsBack.click(); // back
		assert.strictEqual(selectedIndex.getProperty("value"), "0", "The selectedIndex remains the same as this is the first page.");
		assert.strictEqual(eventCounter.getProperty("value"), "2", "The selectedPageChange is not fired as this is the first page.");
	});
});
