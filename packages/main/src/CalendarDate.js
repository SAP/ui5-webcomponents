import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
* @public
*/
const metadata = {
	tag: "ui5-date",
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.CalendarDate.prototype */ {

		/**
		 * Defines a calendar date
		 *
		 * @type {string}
		 * @public
		 */
		value: {
			type: String,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date</code> component defines a calendar date to be used inside <code>ui5-calendar</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Date
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-date
 * @public
 */
class CalendarDate extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

CalendarDate.define();

export default CalendarDate;
