/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
	/**
	 * Checks if the value is valid for its data type.
 	 * @public
	 * @abstract
	 * @returns {Boolean}
	 */
	static isValid(value: any): boolean {
		return false;
	}

	static attributeToProperty(attributeValue: string | boolean): any {
		return attributeValue;
	}

	static propertyToAttribute(propertyValue: any): string | null {
		return propertyValue === null ? null : `${propertyValue}`;
	}

	static valuesAreEqual(value1: any, value2: any) {
		return value1 === value2;
	}

	static generateTypeAccessors(types: {[key: string]: any}) {
		Object.keys(types).forEach(type => {
			Object.defineProperty(this, type, {
				get() {
					return types[type];
				},
			});
		});
	}
}

export default DataType;
