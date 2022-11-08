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
	static isValid(value) {
	}

	static attributeToProperty(attributeValue) {
		return attributeValue;
	}

	static propertyToAttribute(propertyValue) {
		return `${propertyValue}`;
	}

	static valuesAreEqual(value1, value2) {
		return value1 === value2;
	}

	static generateTypeAccessors(types) {
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
