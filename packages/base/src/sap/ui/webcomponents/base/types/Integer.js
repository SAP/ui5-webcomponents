import DataType from "./DataType";

class Integer extends DataType {
	static isValid(value) {
		return Number.isInteger(value);
	}
}

export default Integer;
