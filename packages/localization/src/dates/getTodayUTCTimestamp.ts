import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "./CalendarDate.js";

/**
 * Returns a UTC timestamp representing today
 * @public
 */
const getTodayUTCTimestamp = (primaryCalendarType: CalendarType) => CalendarDate.fromLocalJSDate(new Date(), primaryCalendarType).valueOf() / 1000;

export default getTodayUTCTimestamp;
