/**
 * @class
 * Base class for all data types.
 *
 * @public
 */
class DataType {
    /**
     * Checks if the value is valid for its data type.
     * @public
     */
    // eslint-disable-next-line
    static isValid(value) {
        return false;
    }
    static attributeToProperty(attributeValue) {
        return attributeValue;
    }
    static propertyToAttribute(propertyValue) {
        return propertyValue === null ? null : String(propertyValue);
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
    static get isDataTypeClass() {
        return true;
    }
}
export default DataType;
//# sourceMappingURL=DataType.js.map