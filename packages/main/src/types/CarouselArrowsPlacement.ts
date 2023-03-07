/**
 * Different Carousel arrows placement.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CarouselArrowsPlacement
 */
enum CarouselArrowsPlacement {
	/**
	 * Carousel arrows are placed on the sides of the current Carousel page.
	 * @public
	 * @type {Content}
	 */
	Content = "Content",

	/**
	 * Carousel arrows are placed on the sides of the page indicator of the Carousel.
	 * @public
	 * @type {Navigation}
	 */
	Navigation = "Navigation",
}

export default CarouselArrowsPlacement;
