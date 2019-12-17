/*
 * ${copyright}
 */

/* global Map */

sap.ui.define(["sap/ui/core/CalendarType"], function (CalendarType) {
	"use strict";

	var registry = new Map();

	return {
		getCalendarClass: function (calendarType) {
			return registry.get(calendarType);
		},
		setCalendarClass: function (calendarType, Klass) {
			registry.set(calendarType, Klass);
		}
	};
});