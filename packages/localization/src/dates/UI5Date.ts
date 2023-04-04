// @ts-ignore
import UI5DateNative from "../sap/ui/core/date/UI5Date.js";

type UI5Date = {
    getInstance: (timeOrYear?: number, month?: number, day?: number) => UI5Date | Date,
    getDate: () => number,
    getMonth: () => number,
    getFullYear: () => number,
    getYear: () => number,
    getDay: () => number,
    getHours: () => number,
    getMinutes: () => number,
    getSeconds: () => number,
    getMilliseconds: () => number,
    getTimezoneOffset: () => number,
    getUTCDate: () => number,
    getUTCMonth: () => number,
    getUTCFullYear: () => number,
    getUTCDay: () => number,
    getUTCHours: () => number,
    getUTCMinutes: () => number,
    getUTCSeconds: () => number,
    getUTCMilliseconds: () => number,
    getTime: () => number,
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

const UI5Date: UI5Date = UI5DateNative;

export default UI5Date;
