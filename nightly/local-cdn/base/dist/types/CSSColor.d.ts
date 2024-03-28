import DataType from "./DataType.js";
/**
 * @class
 * CSSColor data type.
 *
 * @public
 */
declare class CSSColor extends DataType {
    static isValid(value: string): boolean;
}
export default CSSColor;
