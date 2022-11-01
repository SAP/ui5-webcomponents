import DataType from "./DataType.js";

/**
 * @class
 * Integer data type.
 *
 * @constructor
 * @extends sap.ui.webcomponents.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.Integer
 * @public
 * @enum {number}
 */
class Integer extends DataType {
	static isValid(value) {
		return Number.isInteger(value);
	}

	static attributeToProperty(attributeValue) {
		return parseInt(attributeValue);
	}
}

export default Integer;
