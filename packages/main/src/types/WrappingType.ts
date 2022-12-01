/**
 * Different types of wrapping.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.WrappingType
 */
enum WrappingType {
	/**
	 * The text will be truncated with an ellipsis.
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 * The text will wrap. The words will not be broken based on hyphenation.
	 * @public
	 * @type {Normal}
	 */
	Normal = "Normal",
}

export default WrappingType;
