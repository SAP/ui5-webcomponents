import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of wrapping.
 * @lends sap.ui.webcomponents.main.types.WrappingType.prototype
 * @public
 */
const WrappingTypes = {
	/**
	 * The text will be truncated with an ellipsis.
	 * @public
	 * @type {None}
	 */
	None: "None",

	/**
	 * The text will wrap. The words will not be broken based on hyphenation.
	 * @public
	 * @type {Normal}
	 */
	Normal: "Normal",
};

/**
 * @class
 * Defines how the text of a component will be displayed when there is not enough space.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.WrappingType
 * @public
 * @enum {string}
 */
class WrappingType extends DataType {
	static isValid(value) {
		return !!WrappingTypes[value];
	}
}

WrappingType.generateTypeAccessors(WrappingTypes);

export default WrappingType;
