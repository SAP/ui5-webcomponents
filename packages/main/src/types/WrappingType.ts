import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of wrapping.
 * @lends sap.ui.webcomponents.main.types.WrappingType.prototype
 * @public
 */
enum WrappingTypes {
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
	static override isValid(value: WrappingTypes) {
		return Object.values(WrappingTypes).includes(value);
	}

	static get None() {
		return "None";
	}

	static get Normal() {
		return "Normal";
	}
}

// WrappingType.generateTypeAccessors(WrappingTypes);

export default WrappingType;
