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
@customElement("ui5-date")
class CalendarDate extends UI5Element {
	/**
	 * The date formatted according to the `formatPattern` property
	 * of the `ui5-calendar` that hosts the component.
	 * @default undefined
	 * @public
	 */
	@property()
	value?: string;
}

CalendarDate.define();

export default CalendarDate;
