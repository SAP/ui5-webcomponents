import DataType from "./DataType.js";

class Float extends DataType {
	static isValid(value) {
		// Assuming that integers are floats as well!
		return Number(value) === value;
	}
}

export default Float;
