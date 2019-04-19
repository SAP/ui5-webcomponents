import DataType from "./DataType.js";

class Function extends DataType {
	static isValid(value) {
		return typeof value === "function";
	}
}

export default Function;
