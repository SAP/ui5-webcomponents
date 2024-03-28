import { PropertyValue } from "../UI5ElementMetadata.js";
/**
 * @class
 * Base class for all data types.
 *
 * @public
 */
declare class DataType {
    /**
     * Checks if the value is valid for its data type.
     * @public
     */
    static isValid(value: any): boolean;
    static attributeToProperty(attributeValue: string | null): PropertyValue;
    static propertyToAttribute(propertyValue: PropertyValue): string | null;
    static valuesAreEqual(value1: any, value2: any): boolean;
    static generateTypeAccessors(types: Record<string, string>): void;
    static get isDataTypeClass(): boolean;
}
export default DataType;
