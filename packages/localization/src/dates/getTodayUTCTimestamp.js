import CalendarDate from "./CalendarDate.js";

/**
 * Returns a UTC timestamp representing today
 * @public
 */
const getTodayUTCTimestamp = primaryCalendarType => CalendarDate.fromLocalJSDate(new Date(), primaryCalendarType).valueOf() / 1000;

export default getTodayUTCTimestamp;
