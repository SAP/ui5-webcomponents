import { PropertyValue } from "../UI5ElementMetadata.js";

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DataType
 * @public
 */
class DataType {
	/**
	 * Checks if the value is valid for its data type.
 	 * @public
	 * @abstract
	 * @returns {Boolean}
	 */
	// eslint-disable-next-line
	static isValid(value: any): boolean {
		return false;
	}

	static attributeToProperty(attributeValue: string | null): PropertyValue {
		return attributeValue;
	}

	static propertyToAttribute(propertyValue: PropertyValue): string | null {
		return propertyValue === null ? null : String(propertyValue);
	}

	static valuesAreEqual(value1: any, value2: any) {
		return value1 === value2;
	}

	static generateTypeAccessors(types: Record<string, string>) {
		Object.keys(types).forEach(type => {
			Object.defineProperty(this, type, {
				get() {
					return types[type];
				},
			});
		});
	}

	static get isDataTypeClass() {
		return true;
	}
}

export default DataType;
