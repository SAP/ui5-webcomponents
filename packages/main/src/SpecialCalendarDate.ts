import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import CalendarDate from "./CalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-special-date</code> component defines a special calendar date to be used inside <code>ui5-calendar</code>,
 * which is visually distinguished from the rest of the dates.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SpecialCalendarDate
 * @extends sap.ui.webc.main.CalendarDate
 * @abstract
 * @tagname ui5-special-date
 * @implements sap.ui.webc.main.ISpecialCalendarDate
 * @public
 */
@customElement("ui5-special-date")
class SpecialCalendarDate extends CalendarDate {
	/**
	 * Defines the type of the special date.
	 * @type {sap.ui.webc.main.types.CalendarLegendItemType}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.SpecialCalendarDate.prototype.type
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: CalendarLegendItemType })
	type!: `${CalendarLegendItemType}`;
}

SpecialCalendarDate.define();

export default SpecialCalendarDate;
