import DataType from "./DataType.js";
/**
 * @class
 * Float data type.
 *
 * @constructor
 * @public
 */
class Float extends DataType {
    static isValid(value) {
        return Number(value) === value;
    }
    static attributeToProperty(attributeValue) {
        return parseFloat(attributeValue);
    }
}
export default Float;
//# sourceMappingURL=Float.js.map