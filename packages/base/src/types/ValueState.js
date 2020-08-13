// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import DataType from "./DataType.js";

/**
 * Different states.
 */
const ValueStates = {
	None: "None",
	Success: "Success",
	Warning: "Warning",
	Error: "Error",
	Information: "Information",
};

class ValueState extends DataType {
	static isValid(value) {
		return !!ValueStates[value];
	}
}

ValueState.generataTypeAcessors(ValueStates);

export default ValueState;
