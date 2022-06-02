import UniversalDate from './UniversalDate.js';
import CalendarType from '../CalendarType.js';
import _Calendars from './_Calendars.js';
var Persian = UniversalDate.extend('sap.ui.core.date.Persian', {
    constructor: function () {
        var aArgs = arguments;
        if (aArgs.length > 1) {
            aArgs = toGregorianArguments(aArgs);
        }
        this.oDate = this.createDate(Date, aArgs);
        this.sCalendarType = CalendarType.Persian;
    }
});
Persian.UTC = function () {
    var aArgs = toGregorianArguments(arguments);
    return Date.UTC.apply(Date, aArgs);
};
Persian.now = function () {
    return Date.now();
};
var BASE_YEAR = 1300;
function toPersian(oGregorian) {
    var iJulianDayNumber = g2d(oGregorian.year, oGregorian.month + 1, oGregorian.day);
    return d2j(iJulianDayNumber);
}
function toGregorian(oPersian) {
    var iJulianDayNumber = j2d(oPersian.year, oPersian.month + 1, oPersian.day);
    return d2g(iJulianDayNumber);
}
function toGregorianArguments(aArgs) {
    var aGregorianArgs = Array.prototype.slice.call(aArgs), oPersian, oGregorian;
    if (typeof aArgs[0] !== 'number' || typeof aArgs[1] !== 'number' || aArgs[2] !== undefined && typeof aArgs[2] != 'number') {
        aGregorianArgs[0] = NaN;
        aGregorianArgs[1] = NaN;
        aGregorianArgs[2] = NaN;
        return aGregorianArgs;
    }
    oPersian = {
        year: aArgs[0],
        month: aArgs[1],
        day: aArgs[2] !== undefined ? aArgs[2] : 1
    };
    oGregorian = toGregorian(oPersian);
    aGregorianArgs[0] = oGregorian.year;
    aGregorianArgs[1] = oGregorian.month;
    aGregorianArgs[2] = oGregorian.day;
    return aGregorianArgs;
}
function jalCal(jy) {
    var breaks = [
            -61,
            9,
            38,
            199,
            426,
            686,
            756,
            818,
            1111,
            1181,
            1210,
            1635,
            2060,
            2097,
            2192,
            2262,
            2324,
            2394,
            2456,
            3178
        ], bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0], jm, jump, leap, leapG, march, n, i;
    for (i = 1; i < bl; i += 1) {
        jm = breaks[i];
        jump = jm - jp;
        if (jy < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return {
        leap: leap,
        gy: gy,
        march: march
    };
}
function j2d(jy, jm, jd) {
    while (jm < 1) {
        jm += 12;
        jy--;
    }
    while (jm > 12) {
        jm -= 12;
        jy++;
    }
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}
function d2j(jdn) {
    var gy = d2g(jdn).year, jy = gy - 621, r = jalCal(jy), jdn1f = g2d(gy, 3, r.march), jd, jm, k;
    k = jdn - jdn1f;
    if (k >= 0) {
        if (k <= 185) {
            jm = 1 + div(k, 31);
            jd = mod(k, 31) + 1;
            return {
                year: jy,
                month: jm - 1,
                day: jd
            };
        } else {
            k -= 186;
        }
    } else {
        jy -= 1;
        k += 179;
        if (r.leap === 1) {
            k += 1;
        }
    }
    jm = 7 + div(k, 30);
    jd = mod(k, 30) + 1;
    return {
        year: jy,
        month: jm - 1,
        day: jd
    };
}
function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
function d2g(jdn) {
    var j, i, gd, gm, gy;
    j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    i = div(mod(j, 1461), 4) * 5 + 308;
    gd = div(mod(i, 153), 5) + 1;
    gm = mod(div(i, 153), 12) + 1;
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return {
        year: gy,
        month: gm - 1,
        day: gd
    };
}
function div(a, b) {
    return ~~(a / b);
}
function mod(a, b) {
    return a - ~~(a / b) * b;
}
Persian.prototype._getPersian = function () {
    return toPersian({
        day: this.oDate.getDate(),
        month: this.oDate.getMonth(),
        year: this.oDate.getFullYear()
    });
};
Persian.prototype._setPersian = function (oPersian) {
    var oGregorian = toGregorian(oPersian);
    return this.oDate.setFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Persian.prototype._getUTCPersian = function () {
    return toPersian({
        day: this.oDate.getUTCDate(),
        month: this.oDate.getUTCMonth(),
        year: this.oDate.getUTCFullYear()
    });
};
Persian.prototype._setUTCPersian = function (oPersian) {
    var oGregorian = toGregorian(oPersian);
    return this.oDate.setUTCFullYear(oGregorian.year, oGregorian.month, oGregorian.day);
};
Persian.prototype.getDate = function (iDate) {
    return this._getPersian().day;
};
Persian.prototype.getMonth = function () {
    return this._getPersian().month;
};
Persian.prototype.getYear = function () {
    return this._getPersian().year - BASE_YEAR;
};
Persian.prototype.getFullYear = function () {
    return this._getPersian().year;
};
Persian.prototype.setDate = function (iDate) {
    var oPersian = this._getPersian();
    oPersian.day = iDate;
    return this._setPersian(oPersian);
};
Persian.prototype.setMonth = function (iMonth, iDay) {
    var oPersian = this._getPersian();
    oPersian.month = iMonth;
    if (iDay !== undefined) {
        oPersian.day = iDay;
    }
    return this._setPersian(oPersian);
};
Persian.prototype.setYear = function (iYear) {
    var oPersian = this._getPersian();
    oPersian.year = iYear + BASE_YEAR;
    return this._setPersian(oPersian);
};
Persian.prototype.setFullYear = function (iYear, iMonth, iDay) {
    var oPersian = this._getPersian();
    oPersian.year = iYear;
    if (iMonth !== undefined) {
        oPersian.month = iMonth;
    }
    if (iDay !== undefined) {
        oPersian.day = iDay;
    }
    return this._setPersian(oPersian);
};
Persian.prototype.getUTCDate = function (iDate) {
    return this._getUTCPersian().day;
};
Persian.prototype.getUTCMonth = function () {
    return this._getUTCPersian().month;
};
Persian.prototype.getUTCFullYear = function () {
    return this._getUTCPersian().year;
};
Persian.prototype.setUTCDate = function (iDate) {
    var oPersian = this._getUTCPersian();
    oPersian.day = iDate;
    return this._setUTCPersian(oPersian);
};
Persian.prototype.setUTCMonth = function (iMonth, iDay) {
    var oPersian = this._getUTCPersian();
    oPersian.month = iMonth;
    if (iDay !== undefined) {
        oPersian.day = iDay;
    }
    return this._setUTCPersian(oPersian);
};
Persian.prototype.setUTCFullYear = function (iYear, iMonth, iDay) {
    var oPersian = this._getUTCPersian();
    oPersian.year = iYear;
    if (iMonth !== undefined) {
        oPersian.month = iMonth;
    }
    if (iDay !== undefined) {
        oPersian.day = iDay;
    }
    return this._setUTCPersian(oPersian);
};
_Calendars.set(CalendarType.Persian, Persian);
export default Persian;