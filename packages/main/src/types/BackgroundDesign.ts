/**
 * Defines background designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BackgroundDesign
 */
enum BackgroundDesign {
	/**
	 * A solid background color dependent on the theme.
	 * @public
	 * @type {Solid}
	 */
	Solid = "Solid",

	/**
	 * Transparent background.
	 * @public
	 * @type {Transparent}
	 */
	Transparent = "Transparent",

	/**
	 * A translucent background depending on the opacity value of the theme.
	 * @public
	 * @type {Translucent}
	 */
	Translucent = "Translucent",
}

export default BackgroundDesign;
