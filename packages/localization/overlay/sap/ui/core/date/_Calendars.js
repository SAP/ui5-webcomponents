// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

/*
 * ${copyright}
 */

sap.ui.define([], function () {
	"use strict";

	/*global Map */
	var mRegistry = new Map();

	/**
	 * @private
	 * @sap-restricted
	 */
	var _Calendars = {
		get: function (sCalendarType) {
			if (!mRegistry.has(sCalendarType)) {
				throw new Error("Required calendar type: " + sCalendarType + " not loaded.");
			}

			return mRegistry.get(sCalendarType);
		},
		set: function (sCalendarType, CalendarClass) {
			mRegistry.set(sCalendarType, CalendarClass);
		}
	};

	return _Calendars;
});
