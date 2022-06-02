import UniversalDate from './UniversalDate.js';
import CalendarType from '../CalendarType.js';
import _Calendars from './_Calendars.js';
var Gregorian = UniversalDate.extend('sap.ui.core.date.Gregorian', {
    constructor: function () {
        this.oDate = this.createDate(Date, arguments);
        this.sCalendarType = CalendarType.Gregorian;
    }
});
Gregorian.UTC = function () {
    return Date.UTC.apply(Date, arguments);
};
Gregorian.now = function () {
    return Date.now();
};
_Calendars.set(CalendarType.Gregorian, Gregorian);
export default Gregorian;