import DataType from "./DataType";

class Function extends DataType {
	static isValid(value) {
		return typeof value === "function";
	}
}

export default Function;
