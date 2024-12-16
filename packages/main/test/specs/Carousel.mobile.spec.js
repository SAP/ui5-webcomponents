import { assert } from "chai";

describe("Carousel general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Carousel.html`);
		await browser.emulateDevice('iPhone X');
	});


	it("Buttons (navigation arrows) are rendered in the content without hovering", async () => {
		const carousel = await browser.$("#carousel2");
		await carousel.scrollIntoView();

		const buttons = await carousel.shadow$$(".ui5-carousel-navigation-arrows .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)");
		assert.strictEqual(buttons.length, 1, "Navigation arrow is rendered");
	});

	it("Buttons (navigation arrows) are rendered in the navigation without hovering (arrows-placement)", async () => {
		const carousel = await browser.$("#carousel3");
		const carouselNextButton = await carousel.shadow$(".ui5-carousel-navigation-button[data-ui5-arrow-forward]");
		await carouselNextButton.click();

		await carousel.scrollIntoView();
		const buttons = await carousel.shadow$$(".ui5-carousel-navigation-wrapper .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)");

		assert.strictEqual(buttons.length, 2, "Navigation arrows are rendered");
	});

	it("Buttons (navigation arrows) are not rendered on touch devices in the navigation if the page indicator and the arrows are hidden", async () => {
		const carousel = await browser.$("#carouselHiddenPageIndicatorHiddenArrows");
		const carouselNextButton = await carousel.shadow$(".ui5-carousel-navigation-button[data-ui5-arrow-forward]");
		await carouselNextButton.click();

		await carousel.scrollIntoView();
		const buttons = await carousel.shadow$$(".ui5-carousel-navigation-wrapper .ui5-carousel-navigation-button:not(.ui5-carousel-navigation-button--hidden)");

		assert.notOk(buttons.length, "Navigation arrows are not rendered");
	});


	it("Arrows (navigation arrows) and Dots (page indicator) not displayed in case of single page", async () => {
		const carousel = await browser.$("#carousel6");
		const pages = await carousel.getProperty("pagesCount");
		const pageIndicator = await carousel.shadow$(".ui5-carousel-navigation-wrapper");
		const navigationArrows = await carousel.shadow$(".ui5-carousel-navigation-arrows");

		assert.notOk(await pageIndicator.isExisting(), "Page indicator is not rendered");
		assert.notOk(await navigationArrows.isExisting(), "Navigation arrows are not rendered");
		assert.strictEqual(pages, 1, "There is only 1 page.");
	});
});