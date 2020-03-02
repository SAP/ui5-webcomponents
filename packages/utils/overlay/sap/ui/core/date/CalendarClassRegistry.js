/*
 * ${copyright}
 */

/* global Map */

sap.ui.define([], function () {
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
