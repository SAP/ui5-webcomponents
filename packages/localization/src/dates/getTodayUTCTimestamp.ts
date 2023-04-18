import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "./CalendarDate.js";
import UI5Date from "./UI5Date.js";

/**
 * Returns a UTC timestamp representing today
 * @public
 */
const getTodayUTCTimestamp = (primaryCalendarType: CalendarType) => CalendarDate.fromLocalJSDate(UI5Date.getInstance(), primaryCalendarType).valueOf() / 1000;

export default getTodayUTCTimestamp;
