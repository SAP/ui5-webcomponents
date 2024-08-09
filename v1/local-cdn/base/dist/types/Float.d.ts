import { PropertyValue } from "../UI5ElementMetadata.js";
import DataType from "./DataType.js";
/**
 * @class
 * Float data type.
 *
 * @constructor
 * @public
 */
declare class Float extends DataType {
    static isValid(value: any): boolean;
    static attributeToProperty(attributeValue: string): PropertyValue;
}
export default Float;
