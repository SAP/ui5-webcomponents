import type { PropertyValue } from "../UI5ElementMetadata.js";
import DataType from "./DataType.js";

/**
 * @class
 * Integer data type.
 *
 * @constructor
 * @public
 */
class Integer extends DataType {
	static override isValid(value: any) {
		return Number.isInteger(value);
	}

	static override attributeToProperty(attributeValue: string): PropertyValue {
		return parseInt(attributeValue);
	}
}

export default Integer;
