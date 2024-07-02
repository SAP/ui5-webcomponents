import CalendarDate from "./CalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-special-date` component defines a special calendar date to be used inside `ui5-calendar`,
 * which is visually distinguished from the rest of the dates.
 * @constructor
 * @extends CalendarDate
 * @abstract
 * @public
 * @since 1.23.0
 */
declare class SpecialCalendarDate extends CalendarDate {
    /**
     * Defines the type of the special date.
     * @default "None"
     * @public
     */
    type: `${CalendarLegendItemType}`;
}
export default SpecialCalendarDate;
