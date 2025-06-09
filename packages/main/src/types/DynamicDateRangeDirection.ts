/**
 * Different directions for dynamic date range calculations.
 * @public
 */
enum DynamicDateRangeDirection {
	/**
	 * Direction pointing to the past (e.g., "Last X Days").
	 * @public
	 */
	Last = "last",

	/**
	 * Direction pointing to the future (e.g., "Next X Days").
	 * @public
	 */
	Next = "next",
}

export default DynamicDateRangeDirection;
