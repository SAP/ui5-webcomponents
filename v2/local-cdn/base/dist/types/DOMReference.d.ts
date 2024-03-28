import DataType from "./DataType.js";
/**
 * @class
 * DOM Element reference or ID.
 * **Note:** If an ID is passed, it is expected to be part of the same `document` element as the consuming component.
 *
 * @public
 */
declare class DOMReference extends DataType {
    static isValid(value: string | HTMLElement): boolean;
    static propertyToAttribute(propertyValue: string | HTMLElement): string | null;
}
export default DOMReference;
