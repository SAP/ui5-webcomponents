// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import CalendarType from "../types/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType;

const getCalendarType = () => {
	if (calendarType === undefined) {
		calendarType = getConfiguredCalendarType();
	}

	if (CalendarType.isValid(calendarType)) {
		return calendarType;
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
