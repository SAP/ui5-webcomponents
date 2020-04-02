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
});
