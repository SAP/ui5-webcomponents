/**
 * Different types of Bar design
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.BarDesign
 */
enum BarDesign {
	/**
	 * Default type
	 * @public
	 * @type {Header}
	 */
	Header = "Header",

	/**
	 * Subheader type
	 * @public
	 * @type {Subheader}
	 */
	Subheader = "Subheader",

	/**
	 * Footer type
	 * @public
	 * @type {Footer}
	 */
	Footer = "Footer",

	/**
	 * Floating Footer type - there is visible border on all sides
	 * @public
	 * @type {FloatingFooter}
	 */
	FloatingFooter = "FloatingFooter",
}

export default BarDesign;
