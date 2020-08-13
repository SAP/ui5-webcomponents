// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

Number.isInteger = Number.isInteger || function(value) {
	return typeof value === 'number' &&
		isFinite(value) &&
		Math.floor(value) === value;
};
