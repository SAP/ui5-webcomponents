/**
 * Different Calendar selection mode.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarSelectionMode
 */
enum CalendarSelectionMode {
	/**
	 * Only one date can be selected at a time
	 * @public
	 * @type {Single}
	 */
	Single = "Single",

	/**
	 * Several dates can be selected
	 * @public
	 * @type {Multiple}
	 */
	Multiple = "Multiple",

	/**
	 * A range defined by a start date and an end date can be selected
	 * @public
	 * @type {Range}
	 */
	Range = "Range",
}

export default CalendarSelectionMode;
