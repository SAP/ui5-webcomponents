import DataType from "./DataType.js";

class Float extends DataType {
	static isValid(value) {
		return Number(value) === value;
	}
}

export default Float;
