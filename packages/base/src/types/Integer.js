// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import DataType from "./DataType.js";

class Integer extends DataType {
	static isValid(value) {
		return Number.isInteger(value);
	}
}

export default Integer;
