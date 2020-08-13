// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { getFormatSettings } from "../InitialConfiguration.js";

let formatSettings;

const getFirstDayOfWeek = () => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
