import DataType from "./DataType.js";
/**
 * @class
 * CSSSize data type.
 *
 * @public
 */
declare class CSSSize extends DataType {
    static isValid(value: string): boolean;
}
export default CSSSize;
