import type Locale from "@ui5/webcomponents-base/dist/locale/Locale.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import type LocaleData from "../LocaleData.js";
import type UI5Date from "./UI5Date.js";
declare const calculateWeekNumber: (confFirstDayOfWeek: number | undefined, oDate: Date | UI5Date, iYear: number, oLocale: Locale, oLocaleData: LocaleData, calendarType: CalendarType) => number;
export default calculateWeekNumber;
