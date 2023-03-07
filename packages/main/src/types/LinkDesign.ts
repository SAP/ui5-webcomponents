/**
 * Different link designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.LinkDesign
 */
enum LinkDesign {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Default = "Default",

	/**
	 * subtle type (appears as regular text, rather than a link)
	 * @public
	 * @type {Subtle}
	 */
	Subtle = "Subtle",

	/**
	 * emphasized type
	 * @public
	 * @type {Emphasized}
	 */
	Emphasized = "Emphasized",
}

export default LinkDesign;
