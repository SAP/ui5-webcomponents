import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Available Page Background Design.
 * @lends sap.ui.webcomponents.fiori.types.PageBackgroundDesign.prototype
 * @public
 */
const PageBackgroundDesigns = {

	/**
	 * Page background color when a List is set as the Page content.
	 *
	 * @type {List}
	 * @public
	 */
	List: "List",

	/**
	 * A solid background color dependent on the theme.
	 *
	 * @type {Solid}
	 * @public
 	 */
	Solid: "Solid",

	/**
	 * Transparent background for the page.
	 *
	 * @type {Transparent}
	 * @public
	 */
	Transparent: "Transparent",
};

/**
 * Available Page Background Design.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.PageBackgroundDesign
 * @public
 * @enum {string}
 */
class PageBackgroundDesign extends DataType {
	static isValid(value) {
		return !!PageBackgroundDesigns[value];
	}
}

PageBackgroundDesign.generateTypeAccessors(PageBackgroundDesigns);

export default PageBackgroundDesign;
