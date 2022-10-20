import DataType from "./DataType.js";

/**
 * @class
 * Float data type.
 *
 * @constructor
 * @extends DataType
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.Integer
 * @public
 * @enum {number}
 */
class Float extends DataType {
	static isValid(value) {
		// Assuming that integers are floats as well!
		return Number(value) === value;
	}

	static attributeToProperty(attributeValue) {
		return parseFloat(attributeValue);
	}
}

export default Float;
