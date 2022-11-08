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
	static override isValid(value: any) {
		return Number.isInteger(value);
	}

	static override attributeToProperty(attributeValue: string) {
		return parseInt(attributeValue);
	}
}

export default Integer;
