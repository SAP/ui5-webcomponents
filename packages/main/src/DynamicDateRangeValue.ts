/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-dynamic-date-range-value` defines a value to be used inside `ui5-dynamic-date-range`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
class DynamicDateRangeValue {
	/**
	 * The key of the option.
	 * @default ""
	 * @public
	 */
	operator = "";

    /**
     * Values of the dynamic date range.
     * @default []
     * @public
     */
    values?: Date[] | number;
}

export default DynamicDateRangeValue;
