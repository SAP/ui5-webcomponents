import DataType from "./DataType.js";

/**
 * Different states.
 */
const ValueStates = {
	None: "None",
	Success: "Success",
	Warning: "Warning",
	Error: "Error",
};

class ValueState extends DataType {
	static isValid(value) {
		return !!ValueStates[value];
	}
}

ValueState.generataTypeAcessors(ValueStates);

export default ValueState;
