import Core from '../Core.js';
import UniversalDate from './UniversalDate.js';
import CalendarType from '../CalendarType.js';
import Log from '../../../base/Log.js';
import _Calendars from './_Calendars.js';
var Islamic = UniversalDate.extend('sap.ui.core.date.Islamic', {
    constructor: function () {
        var aArgs = arguments;
        if (aArgs.length > 1) {
            aArgs = toGregorianArguments(aArgs);
        }
        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType.Islamic;
    }
});
Islamic.UTC = function () {
    var aArgs = toGregorianArguments(arguments);
    return Date.UTC.apply(Date, aArgs);
};
Islamic.now = function () {
    return Date.now();
};
var BASE_YEAR = 1400, GREGORIAN_EPOCH_DAYS = 1721425.5, ISLAMIC_EPOCH_DAYS = 1948439.5, ISLAMIC_MILLIS = -42521587200000, ONE_DAY = 86400000;
var oCustomizationMap = null;
var aSupportedIslamicCalendarTypes = [
    'A',
    'B'
];
function toIslamic(oGregorian) {
    var iGregorianYear = oGregorian.year, iGregorianMonth = oGregorian.month, iGregorianDay = oGregorian.day, iIslamicYear, iIslamicMonth, iIslamicDay, iMonths, iDays, iLeapAdj, iJulianDay;
    iLeapAdj = 0;
    if (iGregorianMonth + 1 > 2) {
        iLeapAdj = isGregorianLeapYear(iGregorianYear) ? -1 : -2;
    }
    iJulianDay = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iGregorianYear - 1) + Math.floor((iGregorianYear - 1) / 4) + -Math.floor((iGregorianYear - 1) / 100) + Math.floor((iGregorianYear - 1) / 400) + Math.floor((367 * (iGregorianMonth + 1) - 362) / 12 + iLeapAdj + iGregorianDay);
    iJulianDay = Math.floor(iJulianDay) + 0.5;
    iDays = iJulianDay - ISLAMIC_EPOCH_DAYS;
    iMonths = Math.floor(iDays / 29.530588853);
    if (iMonths < 0) {
        iIslamicYear = Math.floor(iMonths / 12) + 1;
        iIslamicMonth = iMonths % 12;
        if (iIslamicMonth < 0) {
            iIslamicMonth += 12;
        }
        iIslamicDay = iDays - monthStart(iIslamicYear, iIslamicMonth) + 1;
    } else {
        iMonths++;
        while (getCustomMonthStartDays(iMonths) > iDays) {
            iMonths--;
        }
        iIslamicYear = Math.floor(iMonths / 12) + 1;
        iIslamicMonth = iMonths % 12;
        iIslamicDay = iDays - getCustomMonthStartDays(12 * (iIslamicYear - 1) + iIslamicMonth) + 1;
    }
    return {
        day: iIslamicDay,
        month: iIslamicMonth,
        year: iIslamicYear
    };
}
function toGregorian(oIslamic) {
    var iIslamicYear = oIslamic.year, iIslamicMonth = oIslamic.month, iIslamicDate = oIslamic.day, iMonthStart = iIslamicYear < 1 ? monthStart(iIslamicYear, iIslamicMonth) : getCustomMonthStartDays(12 * (iIslamicYear - 1) + iIslamicMonth), iJulianDay = iIslamicDate + iMonthStart + ISLAMIC_EPOCH_DAYS - 1, iJulianDayNoon = Math.floor(iJulianDay - 0.5) + 0.5, iDaysSinceGregorianEpoch = iJulianDayNoon - GREGORIAN_EPOCH_DAYS, iQuadricent = Math.floor(iDaysSinceGregorianEpoch / 146097), iQuadricentNormalized = mod(iDaysSinceGregorianEpoch, 146097), iCent = Math.floor(iQuadricentNormalized / 36524), iCentNormalized = mod(iQuadricentNormalized, 36524), iQuad = Math.floor(iCentNormalized / 1461), iQuadNormalized = mod(iCentNormalized, 1461), iYearIndex = Math.floor(iQuadNormalized / 365), iYear = iQuadricent * 400 + iCent * 100 + iQuad * 4 + iYearIndex, iMonth, iDay, iGregorianYearStartDays, iDayOfYear, tjd, tjd2, iLeapAdj, iLeapAdj2;
    if (!(iCent == 4 || iYearIndex == 4)) {
        iYear++;
    }
    iGregorianYearStartDays = GREGORIAN_EPOCH_DAYS + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400);
    iDayOfYear = iJulianDayNoon - iGregorianYearStartDays;
    tjd = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(iYear) ? -1 : -2) + 1);
    iLeapAdj = 0;
    if (iJulianDayNoon < tjd) {
        iLeapAdj = 0;
    } else {
        iLeapAdj = isGregorianLeapYear(iYear) ? 1 : 2;
    }
    iMonth = Math.floor(((iDayOfYear + iLeapAdj) * 12 + 373) / 367);
    tjd2 = GREGORIAN_EPOCH_DAYS - 1 + 365 * (iYear - 1) + Math.floor((iYear - 1) / 4) - Math.floor((iYear - 1) / 100) + Math.floor((iYear - 1) / 400);
    iLeapAdj2 = 0;
    if (iMonth > 2) {
        iLeapAdj2 = isGregorianLeapYear(iYear) ? -1 : -2;
    }
    tjd2 += Math.floor((367 * iMonth - 362) / 12 + iLeapAdj2 + 1);
    iDay = iJulianDayNoon - tjd2 + 1;
    return {
        day: iDay,
        month: iMonth - 1,
        year: iYear
    };
}
function toGregorianArguments(aArgs) {
    var aGregorianArgs = Array.prototype.slice.call(aArgs), oIslamic, oGregorian;
    oIslamic = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
    };
    oGregorian = toGregorian(oIslamic);
    aGregorianArgs[0] = oGregorian.year;
    aGregorianArgs[1] = oGregorian.month;
    aGregorianArgs[2] = oGregorian.day;
    return aGregorianArgs;
}
function initCustomizationMap() {
    var sDateFormat, oCustomizationJSON;
    oCustomizationMap = {};
    sDateFormat = Core.getConfiguration().getFormatSettings().getLegacyDateFormat();
    sDateFormat = _isSupportedIslamicCalendarType(sDateFormat) ? sDateFormat : 'A';
    oCustomizationJSON = Core.getConfiguration().getFormatSettings().getLegacyDateCalendarCustomizing();
    oCustomizationJSON = oCustomizationJSON || [];
    if (!oCustomizationJSON.length) {
        Log.warning('No calendar customizations.');
        return;
    }
    oCustomizationJSON.forEach(function (oEntry) {
        if (oEntry.dateFormat === sDateFormat) {
            var date = parseDate(oEntry.gregDate);
            var iGregorianDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
            var iMillis = iGregorianDate.getTime();
            var iIslamicMonthStartDays = (iMillis - ISLAMIC_MILLIS) / ONE_DAY;
            date = parseDate(oEntry.islamicMonthStart);
            var iIslamicMonths = (date.year - 1) * 12 + date.month - 1;
            oCustomizationMap[iIslamicMonths] = iIslamicMonthStartDays;
        }
    });
    Log.info('Working with date format: [' + sDateFormat + '] and customization: ' + JSON.stringify(oCustomizationJSON));
}
function parseDate(sDate) {
    return {
        year: parseInt(sDate.substr(0, 4)),
        month: parseInt(sDate.substr(4, 2)),
        day: parseInt(sDate.substr(6, 2))
    };
}
function getCustomMonthStartDays(months) {
    if (!oCustomizationMap) {
        initCustomizationMap();
    }
    var iIslamicMonthStartDays = oCustomizationMap[months];
    if (!iIslamicMonthStartDays) {
        var year = Math.floor(months / 12) + 1;
        var month = months % 12;
        iIslamicMonthStartDays = monthStart(year, month);
    }
    return iIslamicMonthStartDays;
}
function monthStart(year, month) {
    return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30);
}
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
function isGregorianLeapYear(iYear) {
    return !(iYear % 400) || !(iYear % 4) && !!(iYear % 100);
}
function _isSupportedIslamicCalendarType(sCalendarType) {
    return aSupportedIslamicCalendarTypes.indexOf(sCalendarType) !== -1;
}
Islamic.prototype._getIslamic = function () {
    return toIslamic({
        day: this.oDate.getDate(),
        month: this.oDate.getMonth(),
        year: this.oDate.getFullYear()
    });
};
Islamic.prototype._setIslamic = function (oIslamic) {
    var oGregorian = toGregorian(oIslamic);
    return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Islamic.prototype._getUTCIslamic = function () {
    return toIslamic({
        day: this.oDate.getUTCDate(),
        month: this.oDate.getUTCMonth(),
        year: this.oDate.getUTCFullYear()
    });
};
Islamic.prototype._setUTCIslamic = function (oIslamic) {
    var oGregorian = toGregorian(oIslamic);
    return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Islamic.prototype.getDate = function (iDate) {
    return this._getIslamic().day;
};
Islamic.prototype.getMonth = function () {
    return this._getIslamic().month;
};
Islamic.prototype.getYear = function () {
    return this._getIslamic().year - BASE_YEAR;
};
Islamic.prototype.getFullYear = function () {
    return this._getIslamic().year;
};
Islamic.prototype.setDate = function (iDate) {
    var oIslamic = this._getIslamic();
    oIslamic.day = iDate;
    return this._setIslamic(oIslamic);
};
Islamic.prototype.setMonth = function (iMonth, iDay) {
    var oIslamic = this._getIslamic();
    oIslamic.month = iMonth;
    if (iDay !== undefined) {
        oIslamic.day = iDay;
    }
    return this._setIslamic(oIslamic);
};
Islamic.prototype.setYear = function (iYear) {
    var oIslamic = this._getIslamic();
    oIslamic.year = iYear + BASE_YEAR;
    return this._setIslamic(oIslamic);
};
Islamic.prototype.setFullYear = function (iYear, iMonth, iDay) {
    var oIslamic = this._getIslamic();
    oIslamic.year = iYear;
    if (iMonth !== undefined) {
        oIslamic.month = iMonth;
    }
    if (iDay !== undefined) {
        oIslamic.day = iDay;
    }
    return this._setIslamic(oIslamic);
};
Islamic.prototype.getUTCDate = function (iDate) {
    return this._getUTCIslamic().day;
};
Islamic.prototype.getUTCMonth = function () {
    return this._getUTCIslamic().month;
};
Islamic.prototype.getUTCFullYear = function () {
    return this._getUTCIslamic().year;
};
Islamic.prototype.setUTCDate = function (iDate) {
    var oIslamic = this._getUTCIslamic();
    oIslamic.day = iDate;
    return this._setUTCIslamic(oIslamic);
};
Islamic.prototype.setUTCMonth = function (iMonth, iDay) {
    var oIslamic = this._getUTCIslamic();
    oIslamic.month = iMonth;
    if (iDay !== undefined) {
        oIslamic.day = iDay;
    }
    return this._setUTCIslamic(oIslamic);
};
Islamic.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
    var oIslamic = this._getUTCIslamic();
    oIslamic.year = iYear;
    if (iMonth !== undefined) {
        oIslamic.month = iMonth;
    }
    if (iDay !== undefined) {
        oIslamic.day = iDay;
    }
    return this._setUTCIslamic(oIslamic);
};
_Calendars.set(CalendarType.Islamic, Islamic);
export default Islamic;