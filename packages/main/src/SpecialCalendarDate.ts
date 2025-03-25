import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type CalendarLegendItemType from "./types/CalendarLegendItemType.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-special-date` component defines a special calendar date to be used inside `ui5-calendar`,
 * which is visually distinguished from the rest of the dates.
 * @constructor
 * @extends UI5Element
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
	value = "";
	/**
	 * Defines the type of the special date.
	 * @default "None"
	 * @public
	 */
	@property()
	type: `${CalendarLegendItemType}` = "None";

	/**
	 * Defines a tooltip text for the special date.
	 * @default ""
	 * @private
	 */
	@property()
	_tooltip = "";
}

SpecialCalendarDate.define();

export default SpecialCalendarDate;
