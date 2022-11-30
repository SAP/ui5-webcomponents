/**
 * Available Page Background Design.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.PageBackgroundDesign
 */
enum PageBackgroundDesign {

	/**
	 * Page background color when a List is set as the Page content.
	 *
	 * @type {List}
	 * @public
	 */
	List = "List",

	/**
	 * A solid background color dependent on the theme.
	 *
	 * @type {Solid}
	 * @public
 	 */
	Solid = "Solid",

	/**
	 * Transparent background for the page.
	 *
	 * @type {Transparent}
	 * @public
	 */
	Transparent = "Transparent",
}

export default PageBackgroundDesign;
