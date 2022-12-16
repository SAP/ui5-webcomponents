import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
// @ts-ignore
import UniversalDateNative from "../sap/ui/core/date/UniversalDate.js";

type UniversalDate = {
    new (time: number): UniversalDate;
    oDate: Date,
    sCalendarType: string,
    getInstance: (oDate: Date, sCalendarType?: CalendarType) => UniversalDate,
    getDate: () => number,
    getMonth: () => number,
    getFullYear: () => number,
    getYear: () => number,
    getDay: () => number,
    getHours: () => number,
    getMinutes: () => number,
    getSeconds: () => number,
    getMilliseconds: () => number,
    getUTCDate: () => number,
    getUTCMonth: () => number,
    getUTCFullYear: () => number,
    getUTCDay: () => number,
    getUTCHours: () => number,
    getUTCMinutes: () => number,
    getUTCSeconds: () => number,
    getUTCMilliseconds: () => number,
    getTime: () => number,
    valueOf: () => number,
    getTimezoneOffset: () => number,
    toString: () => string,
    toDateString: () => string,
    setDate: (dayValue: number) => number,
    setFullYear: (yearValue: number, monthValue?: number, dateValue?: number) => number,
    setYear: (yearValue: number) => number,
    setMonth: (monthValue: number, dayValue?: number) => number,
    setHours: (hoursValue: number, minutesValue?: number, secondsValue?: number, msValue?: number) => number,
    setMinutes: (minutesValue: number, secondsValue?: number, msValue?: number) => number,
    setSeconds: (secondsValue: number, msValue?: number) => number,
    setMilliseconds: (setMilliseconds: number) => number,
    setUTCDate:(dayValue: number) => number,
    setUTCFullYear: (yearValue: number, monthValue?: number, dayValue?: number) => number,
    setUTCMonth: (monthValue: number, dayValue?: number) => number,
    setUTCHours: (hoursValue: number, minutesValue?: number, secondsValue?: number, msValue?: number) => number,
    setUTCMinutes: (minutesValue: number, secondsValue?: number, msValue?: number) => number,
    setUTCSeconds: (secondsValue: number, msValue?: number) => number,
    setUTCMilliseconds: (setMilliseconds: number) => number,
}

const UniversalDate: UniversalDate = UniversalDateNative;

export default UniversalDate;
