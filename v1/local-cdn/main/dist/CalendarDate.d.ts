import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-date` component defines a calendar date to be used inside `ui5-calendar`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
declare class CalendarDate extends UI5Element {
    /**
     * The date formatted according to the `formatPattern` property
     * of the `ui5-calendar` that hosts the component.
     * @default ""
     * @public
     */
    value: string;
}
export default CalendarDate;
