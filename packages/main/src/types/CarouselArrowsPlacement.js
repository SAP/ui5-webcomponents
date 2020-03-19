import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.CarouselArrowsPlacement.prototype
 * @public
 */
const CarouselArrowsPlacementTypes = {
	/**
	 * Carousel arrows are placed on the sides of the current Carousel page.
	 * @public
	 * @type {Default}
	 */
	Content: "Content",

	/**
	 * Carousel arrows are placed on the sides of the page indicator of the Carousel.
	 * @public
	 * @type {Positive}
	 */
	Navigation: "Navigation",
};

/**
 * @class
 * Different types of Arrow Placement for <code>ui5-carousel</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.CarouselArrowsPlacement
 * @public
 * @enum {string}
 */
class CarouselArrowsPlacement extends DataType {
	static isValid(value) {
		return !!CarouselArrowsPlacementTypes[value];
	}
}

CarouselArrowsPlacement.generataTypeAcessors(CarouselArrowsPlacementTypes);

export default CarouselArrowsPlacement;
