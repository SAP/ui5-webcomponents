/**
 * Different Button designs.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonDesign
 */
enum ButtonDesign {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Default = "Default",

	/**
	 * accept type (green button)
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive",

	/**
	 * reject style (red button)
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * transparent type
	 * @public
	 * @type {Transparent}
	 */
	Transparent = "Transparent",

	/**
	 * emphasized type
	 * @public
	 * @type {Emphasized}
	 */
	Emphasized = "Emphasized",

	/**
	 * attention type
	 * @public
	 * @type {Attention}
	 */
	Attention = "Attention",
}

export default ButtonDesign;
