import DataType from "./DataType.js";

class Float extends DataType {
	static isValid(value) {
		// Assuming that integers are floats as well!
		return Number(value) === value;
	}

	static attributeToProperty(attributeValue) {
		return parseFloat(attributeValue);
	}
}

export default Float;
