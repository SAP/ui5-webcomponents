import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
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
@customElement("ui5-date-range")
class CalendarDateRange extends UI5Element {
	/**
	 * Start of date range formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * End of date range formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default ""
	 * @public
	 */
	@property()
	endValue!: string;
}

CalendarDateRange.define();

export default CalendarDateRange;
