import DataType from "./DataType.js";
/**
 * @class
 * DOM Element reference or ID.
 * **Note:** If an ID is passed, it is expected to be part of the same `document` element as the consuming component.
 *
 * @public
 */
class DOMReference extends DataType {
    static isValid(value) {
        return (typeof value === "string" || value instanceof HTMLElement);
    }
    static propertyToAttribute(propertyValue) {
        if (propertyValue instanceof HTMLElement) {
            return null;
        }
        return propertyValue;
    }
}
export default DOMReference;
//# sourceMappingURL=DOMReference.js.map