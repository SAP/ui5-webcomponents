import UniversalDate from './UniversalDate.js';
import CalendarType from '../CalendarType.js';
import _Calendars from './_Calendars.js';
var Buddhist = UniversalDate.extend('sap.ui.core.date.Buddhist', {
    constructor: function () {
        var aArgs = arguments;
        if (aArgs.length > 1) {
            aArgs = toGregorianArguments(aArgs);
        }
        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType.Buddhist;
    }
});
Buddhist.UTC = function () {
    var aArgs = toGregorianArguments(arguments);
    return Date.UTC.apply(Date, aArgs);
};
Buddhist.now = function () {
    return Date.now();
};
function toBuddhist(oGregorian) {
    var iEraStartYear = UniversalDate.getEraStartDate(CalendarType.Buddhist, 0).year, iYear = oGregorian.year - iEraStartYear + 1;
    if (oGregorian.year < 1941 && oGregorian.month < 3) {
        iYear -= 1;
    }
    if (oGregorian.year === null) {
        iYear = undefined;
    }
    return {
        year: iYear,
        month: oGregorian.month,
        day: oGregorian.day
    };
}
function toGregorian(oBuddhist) {
    var iEraStartYear = UniversalDate.getEraStartDate(CalendarType.Buddhist, 0).year, iYear = oBuddhist.year + iEraStartYear - 1;
    if (iYear < 1941 && oBuddhist.month < 3) {
        iYear += 1;
    }
    if (oBuddhist.year === null) {
        iYear = undefined;
    }
    return {
        year: iYear,
        month: oBuddhist.month,
        day: oBuddhist.day
    };
}
function toGregorianArguments(aArgs) {
    var oBuddhist, oGregorian;
    oBuddhist = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
    };
    oGregorian = toGregorian(oBuddhist);
    aArgs[0] = oGregorian.year;
    return aArgs;
}
Buddhist.prototype._getBuddhist = function () {
    var oGregorian = {
        year: this.oDate.getFullYear(),
        month: this.oDate.getMonth(),
        day: this.oDate.getDate()
    };
    return toBuddhist(oGregorian);
};
Buddhist.prototype._setBuddhist = function (oBuddhist) {
    var oGregorian = toGregorian(oBuddhist);
    return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Buddhist.prototype._getUTCBuddhist = function () {
    var oGregorian = {
        year: this.oDate.getUTCFullYear(),
        month: this.oDate.getUTCMonth(),
        day: this.oDate.getUTCDate()
    };
    return toBuddhist(oGregorian);
};
Buddhist.prototype._setUTCBuddhist = function (oBuddhist) {
    var oGregorian = toGregorian(oBuddhist);
    return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Buddhist.prototype.getYear = function () {
    return this._getBuddhist().year;
};
Buddhist.prototype.getFullYear = function () {
    return this._getBuddhist().year;
};
Buddhist.prototype.getUTCFullYear = function () {
    return this._getUTCBuddhist().year;
};
Buddhist.prototype.setYear = function (iYear) {
    var oBuddhist = this._getBuddhist();
    oBuddhist.year = iYear;
    return this._setBuddhist(oBuddhist);
};
Buddhist.prototype.setFullYear = function (iYear, iMonth, iDay) {
    var oBuddhist = this._getBuddhist();
    oBuddhist.year = iYear;
    if (iMonth !== undefined) {
        oBuddhist.month = iMonth;
    }
    if (iDay !== undefined) {
        oBuddhist.day = iDay;
    }
    return this._setBuddhist(oBuddhist);
};
Buddhist.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
    var oBuddhist = this._getUTCBuddhist();
    oBuddhist.year = iYear;
    if (iMonth !== undefined) {
        oBuddhist.month = iMonth;
    }
    if (iDay !== undefined) {
        oBuddhist.day = iDay;
    }
    return this._setUTCBuddhist(oBuddhist);
};
Buddhist.prototype.getWeek = function () {
    return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getFullYear(), this.getMonth(), this.getDate());
};
Buddhist.prototype.getUTCWeek = function () {
    return UniversalDate.getWeekByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
};
_Calendars.set(CalendarType.Buddhist, Buddhist);
export default Buddhist;