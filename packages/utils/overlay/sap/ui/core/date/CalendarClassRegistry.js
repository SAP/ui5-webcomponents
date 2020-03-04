/*
 * ${copyright}
 */

/* global Map */

sap.ui.define([], function () {
	"use strict";

	var registry = new Map();

	return {
		get: function (calendarType) {
			return registry.get(calendarType);
		},
		set: function (calendarType, Klass) {
			registry.set(calendarType, Klass);
		}
	};
});
