/**
 * Different calendar types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CalendarType
 */
enum CalendarType {
	/**
	 * @public
	 * @type {Gregorian}
	 */
	Gregorian = "Gregorian",
	/**
	 * @public
	 * @type {Islamic}
	 */
	Islamic = "Islamic",
	/**
	 * @public
	 * @type {Japanese}
	 */
	Japanese = "Japanese",
	/**
	 * @public
	 * @type {Buddhist}
	 */
	Buddhist = "Buddhist",
	/**
	 * @public
	 * @type {Persian}
	 */
	Persian = "Persian",
}

export default CalendarType;
