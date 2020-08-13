// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import DataType from "./DataType.js";

/**
 * Different calendar types.
 */
const CalendarTypes = {
	Gregorian: "Gregorian",
	Islamic: "Islamic",
	Japanese: "Japanese",
	Buddhist: "Buddhist",
	Persian: "Persian",
};

class CalendarType extends DataType {
	static isValid(value) {
		return !!CalendarTypes[value];
	}
}

CalendarType.generataTypeAcessors(CalendarTypes);

export default CalendarType;
