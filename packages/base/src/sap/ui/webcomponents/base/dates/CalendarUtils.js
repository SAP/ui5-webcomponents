import UniversalDate from "@ui5/webcomponents-core/dist/sap/ui/core/date/UniversalDate";
import Locale from "@ui5/webcomponents-core/dist/sap/ui/core/Locale";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData";
import jQuery from "@ui5/webcomponents-core/dist/sap/ui/thirdparty/jquery";
import CalendarDate from "./CalendarDate";

class CalendarUtils {
	static _createLocalDate(oDate, bTime) {
		let oLocaleDate;

		if (oDate) {
			let oMyDate;

			if (oDate instanceof UniversalDate) {
				oMyDate = oDate.getJSDate();
			} else {
				oMyDate = oDate;
			}

			oLocaleDate = new Date(oMyDate.getUTCFullYear(), oMyDate.getUTCMonth(), oMyDate.getUTCDate());
			if (oMyDate.getFullYear() < 1000) {
				oLocaleDate.setFullYear(oMyDate.getFullYear());
			}

			if (bTime) {
				oLocaleDate.setHours(oMyDate.getUTCHours());
				oLocaleDate.setMinutes(oMyDate.getUTCMinutes());
				oLocaleDate.setSeconds(oMyDate.getUTCSeconds());
				oLocaleDate.setMilliseconds(oMyDate.getUTCMilliseconds());
			}
		}

		return oLocaleDate;
	}

	static _createUTCDate(oDate, bTime) {
		let oUTCDate;

		if (oDate) {
			let oMyDate;

			if (oDate instanceof UniversalDate) {
				oMyDate = oDate.getJSDate();
			} else {
				oMyDate = oDate;
			}

			oUTCDate = new Date(Date.UTC(oMyDate.getFullYear(), oMyDate.getMonth(), oMyDate.getDate()));
			if (oMyDate.getFullYear() < 1000) {
				oUTCDate.setUTCFullYear(oMyDate.getFullYear());
			}

			if (bTime) {
				oUTCDate.setUTCHours(oMyDate.getHours());
				oUTCDate.setUTCMinutes(oMyDate.getMinutes());
				oUTCDate.setUTCSeconds(oMyDate.getSeconds());
				oUTCDate.setUTCMilliseconds(oMyDate.getMilliseconds());
			}
		}

		return oUTCDate;
	}

	static _createUniversalUTCDate(oDate, sCalendarType, bTime) {
		let oUTCDate;

		if (sCalendarType) {
			oUTCDate = UniversalDate.getInstance(this._createUTCDate(oDate, bTime), sCalendarType);
		} else {
			oUTCDate = new UniversalDate(this._createUTCDate(oDate, bTime).getTime()); // use getTime() because IE and FF can not parse dates < 0100.01.01
		}

		return oUTCDate;
	}

	static calculateWeekNumber(oDate, iYear, oLocale, oLocaleData) {
		let iWeekNum = 0;
		let iWeekDay = 0;
		const iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek();

		// search Locale for containing "en-US", since sometimes
		// when any user settings have been defined, subtag "sapufmt" is added to the locale name
		// this is described inside sap.ui.core.Configuration file
		if (oLocale && (oLocale.getLanguage() === "en" && oLocale.getRegion() === "US")) {
			/*
			 * in US the week starts with Sunday
			 * The first week of the year starts with January 1st. But Dec. 31 is still in the last year
			 * So the week beginning in December and ending in January has 2 week numbers
			 */
			const oJanFirst = new UniversalDate(oDate.getTime());
			oJanFirst.setUTCFullYear(iYear, 0, 1);
			iWeekDay = oJanFirst.getUTCDay();

			// get the date for the same weekday like jan 1.
			const oCheckDate = new UniversalDate(oDate.getTime());
			oCheckDate.setUTCDate(oCheckDate.getUTCDate() - oCheckDate.getUTCDay() + iWeekDay);

			iWeekNum = Math.round((oCheckDate.getTime() - oJanFirst.getTime()) / 86400000 / 7) + 1;
		} else {
			// normally the first week of the year is the one where the first Thursday of the year is
			// find Thursday of this week
			// if the checked day is before the 1. day of the week use a day of the previous week to check
			const oThursday = new UniversalDate(oDate.getTime());
			oThursday.setUTCDate(oThursday.getUTCDate() - iFirstDayOfWeek);
			iWeekDay = oThursday.getUTCDay();
			oThursday.setUTCDate(oThursday.getUTCDate() - iWeekDay + 4);

			const oFirstDayOfYear = new UniversalDate(oThursday.getTime());
			oFirstDayOfYear.setUTCMonth(0, 1);
			iWeekDay = oFirstDayOfYear.getUTCDay();
			let iAddDays = 0;
			if (iWeekDay > 4) {
				iAddDays = 7; // first day of year is after Thursday, so first Thursday is in the next week
			}
			const oFirstThursday = new UniversalDate(oFirstDayOfYear.getTime());
			oFirstThursday.setUTCDate(1 - iWeekDay + 4 + iAddDays);

			iWeekNum = Math.round((oThursday.getTime() - oFirstThursday.getTime()) / 86400000 / 7) + 1;
		}

		return iWeekNum;
	}

	static getFirstDateOfWeek(oDate) {
		const oUniversalDate = new UniversalDate(oDate.getTime()),
			oLocaleData = LocaleData.getInstance(new Locale("en")),
			iCLDRFirstWeekDay = oLocaleData.getFirstDayOfWeek();


		const oWeek = UniversalDate.getWeekByDate(oUniversalDate.getCalendarType(), oUniversalDate.getUTCFullYear(),
			oUniversalDate.getUTCMonth(), oUniversalDate.getUTCDate());

		const oFirstDateOfWeek = UniversalDate.getFirstDateOfWeek(oUniversalDate.getCalendarType(), oWeek.year, oWeek.week);
		const oFirstUniversalDateOfWeek = new UniversalDate(Date.UTC(oFirstDateOfWeek.year, oFirstDateOfWeek.month, oFirstDateOfWeek.day));

		// In case the day of the computed weekFirstDate is not as in CLDR(e.g. en_US locales), make sure we align it
		while (oFirstUniversalDateOfWeek.getUTCDay() !== iCLDRFirstWeekDay) {
			oFirstUniversalDateOfWeek.setUTCDate(oFirstUniversalDateOfWeek.getUTCDate() - 1);
		}

		return new UniversalDate(Date.UTC(oFirstUniversalDateOfWeek.getUTCFullYear(), oFirstUniversalDateOfWeek.getUTCMonth(),
			oFirstUniversalDateOfWeek.getUTCDate(), oDate.getUTCHours(), oDate.getUTCMinutes(), oDate.getUTCSeconds())).getJSDate();
	}

	static getFirstDateOfMonth(oDate) {
		const oNewDate = new UniversalDate(oDate.getTime());
		oNewDate.setUTCDate(1);

		return oNewDate;
	}

	static _getNumberOfWeeksForYear(iYear) {
		// MODIFIED
		// var sLocale = sap.ui.getCore().getConfiguration().getFormatLocale(),
		// 	oLocaleData = LocaleData.getInstance(new Locale(sLocale)),
		const oLocaleData = LocaleData.getInstance(new Locale("en")),
			o1stJan = new Date(Date.UTC(iYear, 0, 1)),
			i1stDay = o1stJan.getUTCDay();
		let iNumberOfWeeksInYear = 52;

		// This is valid for all the regions where Sunday is the first day of the week
		if (oLocaleData.getFirstDayOfWeek() === 0) {
			if (i1stDay === 5 || i1stDay === 6) {
				iNumberOfWeeksInYear = 53;
			}
		} else if (i1stDay === 3 || i1stDay === 4) {
			iNumberOfWeeksInYear = 53;
		}

		return iNumberOfWeeksInYear;
	}

	static monthsDiffer(oDate1, oDate2) {
		return (oDate1.getMonth() !== oDate2.getMonth() || oDate1.getFullYear() !== oDate2.getFullYear());
	}

	static isDateLastInMonth(oDate) {
		const oNextDay = new Date(oDate.getTime() + 24 * 60 * 60 * 1000);
		return oNextDay.getUTCDate() < oDate.getUTCDate();
	}

	static _updateUTCDate(oDate, iYear, iMonth, iDate, iHours, iMinutes, iSeconds, iMilliseconds) {
		if (jQuery.isNumeric(iYear)) {
			oDate.setUTCFullYear(iYear);
		}
		if (jQuery.isNumeric(iMonth)) {
			oDate.setUTCMonth(iMonth);
		}
		if (jQuery.isNumeric(iDate)) {
			oDate.setUTCDate(iDate);
		}
		if (jQuery.isNumeric(iHours)) {
			oDate.setUTCHours(iHours);
		}
		if (jQuery.isNumeric(iMinutes)) {
			oDate.setUTCMinutes(iMinutes);
		}
		if (jQuery.isNumeric(iSeconds)) {
			oDate.setUTCSeconds(iSeconds);
		}
		if (jQuery.isNumeric(iMilliseconds)) {
			oDate.setUTCMilliseconds(iMilliseconds);
		}
	}

	static _checkJSDateObject(oDate) {
		// Cross frame check for a date should be performed here otherwise setDateValue would fail in OPA tests
		// because Date object in the test is different than the Date object in the application (due to the iframe).
		// We can use jQuery.type or this method:
		// function isValidDate (date) {
		//	return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
		// }
		if (jQuery.type(oDate) !== "date") {
			throw new Error("Date must be a JavaScript date object.");
		}
	}

	static _checkYearInValidRange(iYear) {
		if (!jQuery.isNumeric(iYear) || (iYear < 1 || iYear > 9999)) {
			throw new Error("Year must be in valid range (between year 0001 and year 9999).");
		}
	}

	static _isNextMonth(oDate1, oDate2) {
		return (oDate1.getMonth() > oDate2.getMonth() && oDate1.getFullYear() === oDate2.getFullYear())
			|| oDate1.getFullYear() > oDate2.getFullYear();
	}

	static _daysInMonth(oCalendarDate) {
		this._checkCalendarDate(oCalendarDate);

		oCalendarDate = new CalendarDate(oCalendarDate);
		oCalendarDate.setDate(1);
		oCalendarDate.setMonth(oCalendarDate.getMonth() + 1);
		oCalendarDate.setDate(0);
		return oCalendarDate.getDate();
	}

	static _isLastDateInMonth(oCalendarDate) {
		return oCalendarDate.getDate() === CalendarUtils._daysInMonth(oCalendarDate);
	}

	static _getFirstDateOfMonth(oCalendarDate) {
		this._checkCalendarDate(oCalendarDate);

		const oJSDate = CalendarUtils.getFirstDateOfMonth(oCalendarDate.toUTCJSDate()).getJSDate();
		oJSDate.setFullYear(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate());

		return CalendarDate.fromLocalJSDate(oJSDate, oCalendarDate.getCalendarType());
	}

	static _minDate(sCalendarType) {
		return new CalendarDate(1, 0, 1, sCalendarType);
	}

	static _maxDate(sCalendarType) {
		const oCalDate = new CalendarDate(9999, 11, 1, sCalendarType);
		oCalDate.setDate(this._daysInMonth(oCalDate));// 31st for Gregorian Calendar
		return new CalendarDate(oCalDate);
	}

	static _isBetween(oDate, oStartDate, oEndDate, inclusive) {
		this._checkCalendarDate(oDate);
		this._checkCalendarDate(oStartDate);
		this._checkCalendarDate(oEndDate);

		if (inclusive) {
			return oDate.isSameOrAfter(oStartDate) && oDate.isSameOrBefore(oEndDate);
		}
		return oDate.isAfter(oStartDate) && oDate.isBefore(oEndDate);
	}

	static _daysBetween(oFirstDate, oSecondDate) {
		this._checkCalendarDate(oFirstDate);
		this._checkCalendarDate(oSecondDate);

		return Math.ceil((oFirstDate.valueOf() - oSecondDate.valueOf()) / (this.HOURS24));
	}

	static _isOutside(oCalendarDate, oStartCalendarDate, oEndCalendarDate) {
		return !this._isBetween(oCalendarDate, oStartCalendarDate, oEndCalendarDate, true);
	}

	static _isSameMonthAndYear(oCalendarDate1, oCalendarDate2) {
		this._checkCalendarDate(oCalendarDate1);
		this._checkCalendarDate(oCalendarDate2);

		return oCalendarDate1.getYear() === oCalendarDate2.getYear() && oCalendarDate1.getMonth() === oCalendarDate2.getMonth();
	}


	static _checkCalendarDate(oCalendarDate) {
		if (!oCalendarDate || !(oCalendarDate instanceof CalendarDate)) {
			throw new Error(`Invalid calendar date: [${oCalendarDate}]. Expected: sap.ui.unified.calendar.CalendarDate`);
		}
	}


	static _getWeek(oCalendarDate) {
		this._checkCalendarDate(oCalendarDate);
		return UniversalDate.getWeekByDate(oCalendarDate.getCalendarType(), oCalendarDate.getYear(), oCalendarDate.getMonth(), oCalendarDate.getDate());
	}
}

CalendarUtils.MAX_MILLISECONDS = 8640000000000000;
CalendarUtils.HOURS24 = 1000 * 3600 * 24;

export default CalendarUtils;
