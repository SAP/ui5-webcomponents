import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import CalendarDate from "./CalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-special-date` component defines a special calendar date to be used inside `ui5-calendar`,
 * which is visually distinguished from the rest of the dates.
 * @constructor
 * @abstract
 * @public
 * @since 1.23.0
 */
@customElement("ui5-special-date")
class SpecialCalendarDate extends UI5Element {
	/**
	 * The date formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;
	/**
	 * Defines the type of the special date.
	 * @default "None"
	 * @public
	 */
	@property({ type: CalendarLegendItemType, defaultValue: CalendarLegendItemType.None })
	type!: `${CalendarLegendItemType}`;
}

SpecialCalendarDate.define();

export default SpecialCalendarDate;
