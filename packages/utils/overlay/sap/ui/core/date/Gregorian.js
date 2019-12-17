/*!
 * ${copyright}
 */

// Provides class sap.ui.core.date.Gregorian
sap.ui.define(['./UniversalDate', '../CalendarType', './CalendarClassRegistry'],
	function(UniversalDate, CalendarType, CalendarClassRegistry) {
	"use strict";


	/**
	 * The Gregorian date class
	 *
	 * @class
	 *
	 * @private
	 * @alias sap.ui.core.date.Gregorian
	 * @extends sap.ui.core.date.UniversalDate
	 */
	var Gregorian = UniversalDate.extend("sap.ui.core.date.Gregorian", /** @lends sap.ui.core.date.Gregorian.prototype */ {
		constructor: function() {
			this.oDate = this.createDate(Date, arguments);
			this.sCalendarType = CalendarType.Gregorian;
		}
	});

	Gregorian.UTC = function() {
		return Date.UTC.apply(Date, arguments);
	};

	Gregorian.now = function() {
		return Date.now();
	};

	CalendarClassRegistry.setCalendarClass(CalendarType.Gregorian, Gregorian);

	return Gregorian;

});