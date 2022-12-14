import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date</code> component defines a calendar date to be used inside <code>ui5-calendar</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarDate
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-date
 * @implements sap.ui.webc.main.ICalendarDate
 * @public
 */
@customElement("ui5-date")
class CalendarDate extends UI5Element {
	/**
	 * The date formatted according to the <code>formatPattern</code> property
	 * of the <code>ui5-calendar</code> that hosts the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.CalendarDate.prototype.value
	 * @public
	 */
	@property()
	value!: string;
}

CalendarDate.define();

export default CalendarDate;
