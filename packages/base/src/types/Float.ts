import type { PropertyValue } from "../UI5ElementMetadata.js";
import DataType from "./DataType.js";

/**
 * @class
 * Float data type.
 *
 * @constructor
 * @public
 */
class Float extends DataType {
	static override isValid(value: any) {
		return Number(value) === value;
	}

	static override attributeToProperty(attributeValue: string): PropertyValue {
		return parseFloat(attributeValue);
	}
}

export default Float;
