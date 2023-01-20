import DataType from "./DataType.js";

/**
 * @class
 * DOM Element reference or ID.
 * <b>Note:</b> If an ID is passed, it is expected to be part of the same <code>document</code> element as the consuming component.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DOMReference
 * @public
 */
class DOMReference extends DataType {
	static override isValid(value: string | HTMLElement) {
		return (typeof value === "string" || value instanceof HTMLElement);
	}

	static override propertyToAttribute(propertyValue: string | HTMLElement) {
		if (propertyValue instanceof HTMLElement) {
			return null;
		}

		return propertyValue;
	}
}

export default DOMReference;
